package com.umkc.icp4;

import android.Manifest;
import android.content.Context;
import android.content.pm.PackageManager;
import android.location.Location;
import android.support.annotation.NonNull;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Toast;

import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.common.api.GoogleApiClient;
import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationListener;
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.maps.CameraUpdate;
import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.MarkerOptions;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;

public class MapsActivity extends AppCompatActivity implements OnMapReadyCallback {
    //Declaring the variables
    private GoogleMap mMap;
    private static final String TAG = "MainActivity";
    private boolean mLocationPermission = false;
    private FusedLocationProviderClient mFusedLocationProviderClient;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_maps);
        checkLocationPermission();
    }

    /*
     * This method will call after Map is ready.
     * In this we will call the current location of the device.
     */
    @Override
    public void onMapReady(GoogleMap googleMap) {
        mMap = googleMap;
        if (mLocationPermission) {
            getCurrentLocation();
            if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED
                    && ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {

                return;
            }
            mMap.setMyLocationEnabled(true);
        }
    }

    /*
     * This method will call once the user select the permission either allow or deny.
     * Once the permission is allow then we are initializing the map.
     */
    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {//After requestPermission is called in the method checkLocationPermission of this class the controll gets here after the permission granted/denied
        mLocationPermission = false;
        switch (requestCode) {
            case 2345: // Request code that we have sent in the checkLocationPermission method of this class. Since there can be multiple permission requests we send a code before requesting and we will match the code here.
                if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                    mLocationPermission = true;
                    initMap();//Initializing the map fragment
                }
        }
    }

    /*
     * In this method we will initialize the map settings.
     */
    private void initMap() {
        SupportMapFragment mapFragment = (SupportMapFragment) getSupportFragmentManager()
                .findFragmentById(R.id.map);//Starting the fragment
        mapFragment.getMapAsync(this); //Sending a call back onMapReady method in this activity will be called after the map is loaded
    }


    /*
     * In this method we will check the location permission.
     */
    private void checkLocationPermission() {
        String[] permissions = {Manifest.permission.ACCESS_FINE_LOCATION, Manifest.permission.ACCESS_COARSE_LOCATION};
        if (ContextCompat.checkSelfPermission(this.getApplicationContext(),
                Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED) {
            if (ContextCompat.checkSelfPermission(this.getApplicationContext(),
                    Manifest.permission.ACCESS_COARSE_LOCATION) == PackageManager.PERMISSION_GRANTED) {
                mLocationPermission = true;
                initMap();
            } else {
                ActivityCompat.requestPermissions(this, permissions, 2345);
            }
        } else {
            ActivityCompat.requestPermissions(this, permissions, 2345);
        }
    }

    /*
     * In this method we will get the current location details.
     */
    private void getCurrentLocation() {
        mFusedLocationProviderClient = LocationServices.getFusedLocationProviderClient(this); //Getting the fused location service provider by sending the context of the activity
        try{
            if(mLocationPermission){ //Checking if we already have permission for location
                final Task location = mFusedLocationProviderClient.getLastLocation(); //Getting the last location of the user
                location.addOnCompleteListener(new OnCompleteListener() { //Adding listener to location (Task object) to notify when it is done fetching the location data
                    @Override
                    public void onComplete(@NonNull Task task) {
                        if(task.isSuccessful()) //If fetching the data is successful
                        {
                            Log.i(TAG,"Location found");
                            Location currentLocation = (Location) task.getResult();
                            try{
                                double altitude = ((Location) task.getResult()).getAltitude();
                                double longitude = ((Location) task.getResult()).getLongitude();
                                updateLocation(new LatLng(altitude ,longitude),0f); //Setting the location on to the GoogleMap after the map is loaded
                            }catch (Exception e){
                                Toast.makeText(MapsActivity.this, "Turn on the location on the phone", Toast.LENGTH_SHORT).show();
                            }
                        } else{
                            Log.e(TAG,"Location not found");
                        }
                    }
                });
            }
        }catch (SecurityException e)
        {
            Log.e(TAG,e.getMessage());
        }
    }

    /*
     * In this method we will update the marker and latitude and longitude details.
     */
    private void updateLocation(LatLng latlng, float zoom){
        mMap.moveCamera(CameraUpdateFactory.newLatLngZoom(latlng,zoom));
        // Add a marker in Sydney and move the camera
        mMap.addMarker(new MarkerOptions().position(latlng).title("Latitude : "+latlng.latitude+" "+"Longitude : "+latlng.longitude));
    }
}
