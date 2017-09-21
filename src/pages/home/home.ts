import { Component } from '@angular/core';
import { NavController,Platform } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera'
import { NativeStorage } from '@ionic-native/native-storage'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public images: string[] = new Array();

  constructor(private camera: Camera, private nativeStorage: NativeStorage, public navCtrl: NavController, public platform: Platform ) {
    this.platform.ready().then((readySource) => {
      console.log('Platform ready from', readySource);
      // Platform now ready, execute any required native code
      this.nativeStorage.getItem('photo-book')
        .then(
          data => {
            this.images = data.split(',');
          },
          error => console.error(error)
        );
    });
  }

  takePhoto() {
    const options: CameraOptions = {
      quality: 100,
      allowEdit : true,
      targetWidth: 500,
      targetHeight: 500,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      sourceType : this.camera.PictureSourceType.CAMERA,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: false
    }

    this.camera.getPicture(options).then((imageUri) => {
      console.log("imageUri is "+imageUri);
      this.images.push(imageUri);
      let imageUris = this.images.join(',');

      this.nativeStorage.setItem('photo-book', imageUris)
        .then(
          () => console.log('Stored item!'),
          error => console.error('Error storing item', error)
        );
    }, (err) => {
      console.log("camera error is"+err);
    });
  }
}
