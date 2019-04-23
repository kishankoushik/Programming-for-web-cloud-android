package com.umkc.icp4;

import android.content.Intent;
import android.graphics.Bitmap;
import android.provider.MediaStore;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageView;

public class CameraActivity extends AppCompatActivity {
    public static final int CAMERA_REQ = 01;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_camera);
    }
    //Intent to open the camera
    public void openCamera(View view) {
        Intent intent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
        startActivityForResult(intent, CAMERA_REQ); //Starting the camera
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) { //Controll will come here after the camera operation is done since we called startActivityForResult in openCamera method
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == CAMERA_REQ) {
            Bitmap bitmap = (Bitmap) data.getExtras().get("data"); //Getting the image as a bitmap
            ImageView imgV = findViewById(R.id.imgView); //Finding the holder to put the image
            imgV.setImageBitmap(bitmap); //Setting the image in to holder
        }
    }
}
