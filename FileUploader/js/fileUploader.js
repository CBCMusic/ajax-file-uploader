/**
 * sebrojas14 (30/10/2013): 
 *  - ported from prototype to jquery
 *  - added nice units to large files error message (KB and MB)
 */
var fileUploader = {
    MSG_SUCCESS: "success",
    MSG_ERROR: "error",
    MSG_BLANK: "blank",
    GENERAL_ERROR: "<b>ERROR</b><br />Sorry, there was an error uploading your file.",

    /**
     * Creates our uploader with all the appropriate settings.
     */
    create: function (params) {
        var uploadFieldID  = "#uploadField_" + params.guid;
        var uploadButtonID = "#uploadButton_" + params.guid;
        var cancelButtonID = "#cancelButton_" + params.guid;
        var buttonBrowseValue = $(uploadButtonID).val();
        var progressBarEl  = $("#progressBar_" + params.guid);
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
                // detects IE7-
                var isIE7orLess = document.all && !document.querySelector;

                // prevents text "0%" appears over loading image in IE7-
                if (!isIE7orLess) {
                    $(uploadButtonID).val(percent + "%");
				} else {
                    $(uploadButtonID).val("");
				}
            },

            onComplete: function(oldFilename, response) {
                fileUploader.resetUploadButton(uploadButtonID, buttonBrowseValue);
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
                    $("#uploadFieldNewFile_" + params.guid).val(newFilename).trigger("change");

                    // for old IE. This ensures the row goes green
                    fileUploader.setCompleteProgressBar(progressBarEl);
                }
            },

            onError: function(filename, errorType, response, manuallyAborted) {
                fileUploader.resetUploadButton(uploadButtonID, buttonBrowseValue);
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
                var maxSize = params.maxFileSize;
                var sizeUnit = " KB";

                //For files sized more than 1024 KB, should display size in MB
                if (maxSize > 1024) {
                    maxSize = maxSize / 1024;
                    var sizeUnit = " MB";
                }
                var msg = "<b>ERROR: FILE TOO LARGE!</b><br />Please choose a file smaller than " + maxSize + sizeUnit;
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

        $(cancelButtonID).click(function (e) {
            if ($(this).hasClass("uploadFieldCancelEnabled")) {
                uploader.abort();
            }
        });

        return uploader;
    },

    showMessage: function (params) {
        var loadingRow = $(params.uploadFieldID).find(".uploadFieldLoadingRow");

        if (params.msgType === fileUploader.MSG_SUCCESS) {
            loadingRow.removeClass("uploadFieldError");
        } else if (params.msgType === fileUploader.MSG_ERROR) {
            loadingRow.addClass("uploadFieldError");
        }

        $(params.uploadFieldID).find(".uploadFieldMsg").html(params.msg);
        if (params.debug) {
            console.log("fileUploader debug: ", params.debugData);
        }
    },
    /*Now receives buttonBrowseValue for restore value to the one used in FileUploadField.ascx*/
    resetUploadButton: function(uploadFieldID, buttonBrowseValue) {
        $(uploadFieldID).val(buttonBrowseValue);
    },
    
    resetProgressBar: function(el) {
        el.css('width', "0%");
    },

    // for old IE
    setCompleteProgressBar: function (el) {
        el.css('width', "100%");
    },
    
    enableCancelButton: function(buttonID) {
        $(buttonID).addClass("uploadFieldCancelEnabled");
    },

    disableCancelButton: function(buttonID) {
        $(buttonID).removeClass("uploadFieldCancelEnabled");
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
        $(uploadButtonID).addClass("uploadFieldLoadingIcon");
    },
    
    hideLoadingIcon: function(uploadButtonID) {
        $(uploadButtonID).removeClass("uploadFieldLoadingIcon");
    }
};
