window.onload = function(){
    tinymce.init({
        selector: 'textarea',
        plugins: 'a11ychecker advcode casechange formatpainter linkchecker autolink lists checklist media mediaembed pageembed permanentpen powerpaste table advtable tinycomments tinymcespellchecker',
        toolbar: 'a11ycheck addcomment showcomments casechange checklist code formatpainter pageembed permanentpen table',
        toolbar_mode: 'floating',
        tinycomments_mode: 'embedded',
        tinycomments_author: 'Author name',
        relative_urls : false,
        height: 300,
        automatic_Uploads: true,
        images_upload_url : '/uploads/postimage',
        images_upload_handler : function(blobInfo,success,failure) {
        let headers = new Header()
        headers.append('Accept','Application/JSON')

        let formData = new FormData()
        formData.append('post-image',blobInfo.blob(),blobInfo.filename())
        let req = new Request('/uploads/postimage',{
            method:'POST',
            headers,
            mode:'cors',
            body:formData
        })
        fetch(req)
            .then(res=>res.json())
            .then(data=>success(data.imgUrl))
            .catch(()=>failure('HTTP Error'))
    }
    });
}