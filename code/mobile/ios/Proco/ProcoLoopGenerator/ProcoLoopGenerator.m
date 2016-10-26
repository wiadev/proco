#import "ProcoLoopGenerator.h"
@import AVFoundation;
@import UIKit;

@implementation ProcoLoopGenerator

RCT_EXPORT_MODULE();

- (UIImage *)imageFromVideo:(NSURL *)videoURL atTime:(NSTimeInterval)time {

    // courtesy of memmons
    // http://stackoverflow.com/questions/1518668/grabbing-the-first-frame-of-a-video-from-uiimagepickercontroller

    AVURLAsset *asset = [[AVURLAsset alloc] initWithURL:videoURL options:nil];
    NSParameterAssert(asset);
    AVAssetImageGenerator *assetIG =
            [[AVAssetImageGenerator alloc] initWithAsset:asset];
    assetIG.appliesPreferredTrackTransform = YES;
    assetIG.apertureMode = AVAssetImageGeneratorApertureModeEncodedPixels;

    CGImageRef thumbnailImageRef = NULL;
    CFTimeInterval thumbnailImageTime = time;
    NSError *igError = nil;
    thumbnailImageRef =
            [assetIG copyCGImageAtTime:CMTimeMake(thumbnailImageTime, 60)
                            actualTime:NULL
                                 error:&igError];

    if (!thumbnailImageRef)
        NSLog(@"thumbnailImageGenerationError %@", igError);

    UIImage *image = thumbnailImageRef
            ? [[UIImage alloc] initWithCGImage:thumbnailImageRef]
            : nil;

    return image;
}

- (UIImage *)mergeImagesFromArray:(NSArray *)imageArray {

    if ([imageArray count] == 0) return nil;

    UIImage *exampleImage = [imageArray firstObject];
    CGSize imageSize = exampleImage.size;
    CGSize finalSize = CGSizeMake(imageSize.width, imageSize.height * [imageArray count]);

    UIGraphicsBeginImageContext(finalSize);

    for (UIImage *image in imageArray) {
        [image drawInRect:CGRectMake(0, imageSize.height * [imageArray indexOfObject:image],
                imageSize.width, imageSize.height)];
    }

    UIImage *finalImage = UIGraphicsGetImageFromCurrentImageContext();

    UIGraphicsEndImageContext();

    return finalImage;
}

RCT_EXPORT_METHOD(generateLoop:
    (NSURL *) videoURL
            callback:
            (RCTResponseSenderBlock) callback) {

    //400 ms, [0, 100, 200, 300, 400]

    UIImage *finalImage = [self mergeImagesFromArray:@[
            [self imageFromVideo:videoURL atTime:0],
            [self imageFromVideo:videoURL atTime:200],
            [self imageFromVideo:videoURL atTime:300],
            [self imageFromVideo:videoURL atTime:400]
    ]];

    NSString *finalImagePath = [NSTemporaryDirectory() stringByAppendingPathComponent:@"loop_generated.jpg"];
    [UIImageJPEGRepresentation(finalImage, 1.0) writeToFile:finalImagePath atomically:YES];

    UIImageWriteToSavedPhotosAlbum(finalImage, nil, nil, nil);
    callback(@[[NSNull null], finalImagePath]);
}


@end
