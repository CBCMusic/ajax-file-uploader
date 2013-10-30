<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="FileUploadField.ascx.cs" Inherits="FileUploader.controls.FileUploadField" %>

<% if (!OmitIncludes) { %>
<script src="../js/SimpleAjaxUploader.js"></script>
<script src="../js/fileUploader.js"></script>
<script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js"></script>
<link href="../css/fileUploader.css" rel="stylesheet" />
<% } %>

<script>
$(function() {
    fileUploader.create({
        guid: "<%=GUID%>",
        debug: <%=Debug%>,
        uploadURL: "<%=UploadUrl%>",
        allowedExtensions: "<%=AllowedExtensionsJsArray%>",
        allowedExtensionsJsArray: [<%=AllowedExtensionsJsArray%>],
        maxFileSize: <%=MaxFileSize%>,
        extraData: {<%=ExtraData%>}
    });
});
</script>

<div class="uploadField" id="uploadField_<%=GUID%>">
    <div>
        <input type="button" class="uploadFieldSelectFileBtn" id="uploadButton_<%=GUID%>" value="BROWSE" />
        <div class="uploadFieldLoadingRow">
            <div id="progressBar_<%=GUID%>">
                <div class="uploadFieldMsg">Please select a file to upload.</div>
            </div>
        </div>
        <div class="uploadFieldCancel" id="cancelButton_<%=GUID%>"></div>
        <div class="clear"></div>

        <% // populated when the file has been uploaded. Used to pass the filename to the server %>
        <input type="hidden" name="<%=FormFieldName %>" id="uploadFieldNewFile_<%=GUID%>" value="" />        
    </div>
</div>

<div style="clear:both"></div>
