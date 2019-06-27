appService.factory('UploadService', function($http) {

    var service = this;

    service.camera = function($cordovaFileTransfer, $cordovaCamera, type, callback) {

        var optionSourceType;

        if(type === "camera") {
            optionSourceType = Camera.PictureSourceType.CAMERA;
        } else if(type === 'library') {
            optionSourceType = Camera.PictureSourceType.PHOTOLIBRARY;
        }

        var options = {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: optionSourceType,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };

        console.log("options", options);

        $cordovaCamera.getPicture(options).then(function(imageData) {

            console.log('imageData', imageData);

            if(imageData.substr(imageData.length - 3) !== 'jpg' && imageData.substr(imageData.length - 3) !== 'png') {
                imageData += ".jpg";
            }

            service.upload($cordovaFileTransfer, imageData, function(imgPath) {
                if(callback) callback(imgPath);
            });

        }, function(err) {
            console.log('error get picture', err);
        });
    };

    service.upload = function ($cordovaFileTransfer, targetPath, callback) {

        var url = TipeekConfig.apiUrl+"users/upload";

        // File name only
        var filename = targetPath.split("/").pop();
        filename = 'test'+filename;

        var options = {
            fileKey: "file",
            fileName: filename,
            chunkedMode: false,
            mimeType: "image/jpg",
            params : {'directory':'upload', 'fileName': filename}
            // directory represents remote directory,  fileName represents final remote file name
        };

        $cordovaFileTransfer.upload(url, targetPath, options).then(function (result) {
            console.log("SUCCESS: " + JSON.stringify(result.response));
            callback(filename);
        }, function (err) {
            console.log("ERROR: " + JSON.stringify(err));
            callback(filename);
        }, function (progress) {
            console.log('progress', progress);
            // PROGRESS HANDLING GOES HERE
        });
    };

    return service;
});
