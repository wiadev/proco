package com.hello;

import com.facebook.react.ReactActivity;
import com.oblador.vectoricons.VectorIconsPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;

import android.content.Intent;
import android.os.Bundle;
import com.facebook.FacebookSdk;
import com.facebook.CallbackManager;

import com.BV.LinearGradient.LinearGradientPackage;

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
            new VectorIconsPackage(),
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
