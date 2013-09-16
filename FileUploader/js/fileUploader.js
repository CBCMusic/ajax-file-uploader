var fileUploader = {  
    MSG_SUCCESS: "success",
    MSG_ERROR: "error",
    MSG_BLANK: "blank",
    GENERAL_ERROR: "<b>ERROR</b><br />Sorry, there was an error uploading your file.",

    /**
     * Creates our uploader with all the appropriate settings.
     */
    create: function(params) {
        var uploadFieldID  = "uploadField_" + params.guid;
        var uploadButtonID = "uploadButton_" + params.guid;
        var cancelButtonID = "cancelButton_" + params.guid;
        var progressBarEl  = document.getElementById("progressBar_" + params.guid);
        var supportsXhr = fileUploader.browserSupportsXhrFileUpload();

        var config = {
            url: params.uploadURL,
            allowedExtensions: params.allowedExtensionsJsArray,
            maxSize: params.maxFileSize,
            data: params.extraData,
            button: uploadButtonID,
            cancelButton: cancelButtonID,
            debug: params.debug,
            responseType: "", // plain text
            name: "uploadfile",
            multipart: true,
            onSubmit: function(filename) {
                this.setProgressBar(progressBarEl);
                this.originalFilename = filename;
                if (!supportsXhr) {
                    fileUploader.showLoadingIcon(uploadButtonID);
                }
                fileUploader.enableCancelButton(cancelButtonID);
                fileUploader.showMessage({
                    uploadFieldID: uploadFieldID,
                    msg: filename,
                    msgType: fileUploader.MSG_SUCCESS
                });
            },

            onProgress: function(percent) {
                $(uploadButtonID).writeAttribute("value", percent + "%");
            },

            onComplete: function(oldFilename, response) {
                fileUploader.resetUploadButton(uploadButtonID);
                fileUploader.disableCancelButton(cancelButtonID);

                if (!supportsXhr) {
                    fileUploader.hideLoadingIcon(uploadButtonID);
                }

                // for IE, to strip 
                var div = document.createElement("div");
                div.innerHTML = response;
                var cleanResponse = div.textContent || div.innerText || "";

                if (!response || !(/^filename\:/.test(cleanResponse))) {
                    fileUploader.showMessage({
                        uploadFieldID: uploadFieldID,
                        msg: fileUploader.GENERAL_ERROR,
                        msgType: fileUploader.MSG_ERROR,
                        debug: params.debug,
                        debugData: [oldFilename, response]
                    });
                } else {
                    var newFilename = cleanResponse.replace(/^filename\:/, "");

                    // display the original filename - not the new one. They don't need to know about that
                    fileUploader.showMessage({
                        uploadFieldID: uploadFieldID,
                        msg: "<b>Upload Complete</b><br />" + this.originalFilename,
                        msgType: fileUploader.MSG_SUCCESS
                    });
                    $("uploadFieldNewFile_" + params.guid).writeAttribute("value", newFilename);

                    // for old IE. This ensures the row goes green
                    fileUploader.setCompleteProgressBar(progressBarEl);
                }
            },

            onError: function(filename, errorType, response, manuallyAborted) {
                fileUploader.resetUploadButton(uploadButtonID);
                fileUploader.disableCancelButton(cancelButtonID);
                fileUploader.resetProgressBar(progressBarEl);

                var msg = fileUploader.GENERAL_ERROR;
                var msgType = fileUploader.MSG_ERROR;
                if (manuallyAborted) {
                    msg = "The upload was cancelled.";
                    msgType = fileUploader.MSG_BLANK;
                }

                fileUploader.showMessage({
                    uploadFieldID: uploadFieldID,
                    msg: msg,
                    msgType: msgType,
                    debug: params.debug,
                    debugData: [filename, errorType, response]
                });
            },
            onSizeError: function() {
                
                // TODO this could be improved to show a more human friendly file size
                var msg = "<b>ERROR: FILE TOO LARGE!</b><br />Please choose a file smaller than " + params.maxFileSize + "KB";
                fileUploader.showMessage({
                    uploadFieldID: uploadFieldID,
                    msg: msg,
                    msgType: fileUploader.MSG_ERROR
                });
            },
            onExtError: function() {
                fileUploader.showMessage({
                    uploadFieldID: uploadFieldID,
                    msg: "Sorry, invalid file type. Please only upload files of the following<br />formats: " + params.allowedExtensions,
                    msgType: fileUploader.MSG_ERROR
                });
            }
        };

        var uploader = new ss.SimpleUpload(config);

        $("cancelButton_" + params.guid).observe("click", function (e) {
            var element = Event.element(e);
            if (element.hasClassName("uploadFieldCancelEnabled")) {
                uploader.abort();
            }
        });

        return uploader;
    },

    showMessage: function(params) {
        var loadingRow = $(params.uploadFieldID).down(".uploadFieldLoadingRow");
        
        if (params.msgType === fileUploader.MSG_SUCCESS) {
            loadingRow.removeClassName("uploadFieldError");
        } else if (params.msgType === fileUploader.MSG_ERROR) {
            loadingRow.addClassName("uploadFieldError");
        }

        $(params.uploadFieldID).down(".uploadFieldMsg").update(params.msg);
        if (params.debug) {
            console.log("fileUploader debug: ", params.debugData);
        }
    },

    resetUploadButton: function(uploadFieldID) {
        $(uploadFieldID).writeAttribute("value", "BROWSE");
    },
    
    resetProgressBar: function(el) {
        $(el).setStyle({ width: "0%" });
    },

    // for old IE
    setCompleteProgressBar: function (el) {
        $(el).setStyle({ width: "100%" });
    },
    
    enableCancelButton: function(buttonID) {
        $(buttonID).addClassName("uploadFieldCancelEnabled");
    },

    disableCancelButton: function(buttonID) {
        $(buttonID).removeClassName("uploadFieldCancelEnabled");
    },
    
    browserSupportsXhrFileUpload: function() {
        var input = document.createElement('input');
        input.type = 'file';
        return (
            'multiple' in input &&
            typeof File != 'undefined' &&
            typeof (new XMLHttpRequest()).upload != 'undefined'
        );
    },
    
    showLoadingIcon: function(uploadButtonID) {
        $(uploadButtonID).addClassName("uploadFieldLoadingIcon");
    },
    
    hideLoadingIcon: function(uploadButtonID) {
        $(uploadButtonID).removeClassName("uploadFieldLoadingIcon");
    }
};