package com.hello;

import com.facebook.react.ReactActivity;
import com.mybigday.rnmediaplayer.RNMediaPlayerPackage;
import com.rnfs.RNFSPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.github.xinthink.rnmk.ReactMaterialKitPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.imagepicker.ImagePickerPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.microsoft.codepush.react.CodePush;
import com.lwansbrough.RCTCamera.RCTCameraPackage;
import com.cmcewen.blurview.BlurViewPackage;
import com.microsoft.codepush.react.CodePush;
import com.lwansbrough.RCTCamera.RCTCameraPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.github.xinthink.rnmk.ReactMaterialKitPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.lwansbrough.RCTCamera.RCTCameraPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.github.xinthink.rnmk.ReactMaterialKitPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;

import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;

import android.content.Intent;
import android.os.Bundle;
import com.facebook.FacebookSdk;
import com.facebook.CallbackManager;

import java.util.Arrays;
import java.util.List;

public class MainActivity extends ReactActivity {
    CallbackManager mCallbackManager;

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "Hello";
    }

    /**
     * Returns whether dev mode should be enabled.
     * This enables e.g. the dev menu.
     */
    @Override
    protected boolean getUseDeveloperSupport() {
        return BuildConfig.DEBUG;
    }

    /**
     * A list of packages used by the app. If the app uses additional views
     * or modules besides the default ones, add more packages here.
     */
    @Override
    protected List<ReactPackage> getPackages() {
        mCallbackManager = new CallbackManager.Factory().create();
        ReactPackage packages[] = new ReactPackage[]{
          new MainReactPackage(),
            new RNMediaPlayerPackage(),
            new RNFSPackage(),
            new VectorIconsPackage(),
            new ReactMaterialKitPackage(),
            new LinearGradientPackage(),
            new ImagePickerPackage(),
            new FBSDKPackage(),
            new CodePush(null, this, BuildConfig.DEBUG),
            new RCTCameraPackage(),
            new BlurViewPackage(),
            new CodePush(null, this, BuildConfig.DEBUG),
            new RCTCameraPackage(),
            new VectorIconsPackage(),
            new ReactMaterialKitPackage(),
            new LinearGradientPackage(),
            new FBSDKPackage(),
            new RCTCameraPackage(),
            new VectorIconsPackage(),
            new ReactMaterialKitPackage(),
            new LinearGradientPackage(),
          new FBSDKPackage(mCallbackManager),
        };
        return Arrays.<ReactPackage>asList(packages);
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        mCallbackManager.onActivityResult(requestCode, resultCode, data);
    }
}
