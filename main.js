const fileInput = document.querySelector('input'), 
downloadBtn = document.querySelector('button');

downloadBtn.addEventListener("click", e => {
    e.preventDefault();     // preventing form from submitting
    downloadBtn.innerText = "Downloading file...";
    fetchFile(fileInput.value);
});


function fetchFile(url){
    // Fetching file and returning response as blob
    fetch(url).then(res => res.blob()).then(file => {
        // URL.createObjectURL creates a url of passed object
        let tempUrl = URL.createObjectURL(file);

        let aTag = document.createElement("a");
        aTag.href = tempUrl;        // Passing tempUrl as href value of <a> tag

        // Passing file name as download value of <a> tag
        // aTag.download = "filename";
        // Passing file last name & extension as download value of <a> tag
        aTag.download = url.replace(/^.*[\\\/]/, '');

        document.body.appendChild(aTag); // Adding <a> tag inside body

        aTag.click();       // Clicking <a> tag so that file download
        aTag.remove();      // Removing <a> tag once file downloaded
        URL.revokeObjectURL(tempUrl);
        downloadBtn.innerText = "Download file";
    }).catch(() => {
        // Catch method wil call if any error comes during downloading
        downloadBtn.innerText = "Download file";
        alert("Failed to download fil!e");
    })
}