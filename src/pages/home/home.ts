import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera'
import { NativeStorage } from '@ionic-native/native-storage'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public images: string[] = new Array();

  constructor(public navCtrl: NavController, private camera: Camera, private nativeStorage: NativeStorage) {
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
      this.images.push("data:image/png;base64,"+ imageUri);
      let imageUris = this.images.join(',');

      this.nativeStorage.setItem('photos', imageUris)
        .then(
          () => console.log('Stored item!'),
          error => console.error('Error storing item', error)
        );
    }, (err) => {
      console.log("camera error is"+err);
    });
  }
}
