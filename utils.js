import {nanoid} from 'nanoid'
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import {storage} from './firebase'

export async function uploadImage(uri, path, fName){
   try{
    const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function() {
            resolve(xhr.response);
        }
        xhr.onerror = function() {
            reject(new TypeError("Network request failed"));
        }
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
    });
    const fileName = fName || nanoid();
    const imageRef = ref(storage, `${path}/${fileName}.jpeg`); 
    const snapshot = await uploadBytes(imageRef, blob, { contentType: "image/jpeg" });
    
    blob.close();
    const url = await getDownloadURL(snapshot.ref);

    return {url, fileName};
   }catch(error){
      console.log(error)
   }
}
