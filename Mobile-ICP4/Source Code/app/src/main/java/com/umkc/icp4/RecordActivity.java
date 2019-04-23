package com.umkc.icp4;

import android.Manifest;
import android.content.pm.PackageManager;
import android.media.MediaPlayer;
import android.media.MediaRecorder;
import android.support.annotation.NonNull;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * The type Record activity.
 */
public class RecordActivity extends AppCompatActivity {
    /**
     * The Btn start record.
     */
    Button btnStartRecord, /**
     * The Btn stop record.
     */
    btnStopRecord, /**
     * The Btn start play.
     */
    btnStartPlay, /**
     * The Btn stop play.
     */
    btnStopPlay;
    /**
     * The Media recorder.
     */
    MediaRecorder mediaRecorder;
    /**
     * The Media player.
     */
    MediaPlayer mediaPlayer;
    /**
     * The Path to save media to.
     */
    String pathSave = "";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_record);
        btnStartRecord = findViewById(R.id.btnStartRecord);
        btnStopRecord = findViewById(R.id.btnStopRecord);
        btnStartPlay = findViewById(R.id.btnStartPlay);
        btnStopPlay = findViewById(R.id.btnStopPlay);
        if (!checkPermission()) {
            requestPermission();
        }
    }

    /**
     * Startrecord method will start the recording
     *
     * @param view the view
     */
    public void startrecord(View view) {
        String timeStamp = new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date());
        String filename = "sample" + timeStamp + ".3gp";
        pathSave = getFilesDir() + filename;

        setupMediaRecord();
        try {
            mediaRecorder.prepare();
            mediaRecorder.start();//Starting the media recorder will stop in stop record
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

    private void requestPermission() {
        ActivityCompat.requestPermissions(this, new String[]{
                Manifest.permission.RECORD_AUDIO
        }, 1000);
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        switch (requestCode) {
            case 1000:
                break;
        }
    }

    private boolean checkPermission() {
        int recordPermission = ContextCompat.checkSelfPermission(this, Manifest.permission.RECORD_AUDIO);
        return recordPermission == PackageManager.PERMISSION_GRANTED;
    }

    private void setupMediaRecord() {
        mediaRecorder = new MediaRecorder();
        mediaRecorder.setAudioSource(MediaRecorder.AudioSource.MIC);
        mediaRecorder.setOutputFormat(MediaRecorder.OutputFormat.THREE_GPP);
        mediaRecorder.setAudioEncoder(MediaRecorder.OutputFormat.AMR_NB);
        mediaRecorder.setOutputFile(pathSave);
    }

    /**
     * Stop record.
     *
     * @param view the view
     */
    public void stopRecord(View view) {
        mediaRecorder.stop();
        mediaRecorder.release(); //After this the recording will be saved in the specified path in start record
    }

    /**
     * Play the recorded media
     *
     * @param view the view
     */
    public void playRecord(View view) {
        mediaPlayer = new MediaPlayer();
        try {
            mediaPlayer.setDataSource(pathSave); // Path to the file to play
            mediaPlayer.prepare();
            mediaPlayer.start();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * Stop play.
     *
     * @param view the view
     */
    public void stopPlay(View view) {
        mediaPlayer.stop();
        mediaPlayer.release();
        setupMediaRecord();
    }
}
