import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'formWithImage';
  isActiveForm=true;
  form : any = { };
  isSuccessful = false;
  isFailed=false;
  errorMessage = '';
  currentUser : any;
  SelectedImage : File;
  currentIndex = -1;
  retrievedProduct : any;
  base64Data : any;
  retrievedImage : any;

  constructor(private http : HttpClient){

  }

  ngOnInit(){
    this.getListOfProduct();
  }

  onFileSelect(event){
    this.SelectedImage = event.target.files[0];
  }

  onSubmit(){
   console.log(this.form);
   const uploadFormData = new FormData();
   uploadFormData.append('image', this.SelectedImage);
   uploadFormData.append('product', JSON.stringify(this.form));
   return this.http.post('http://localhost:8080/api/saveProduct',uploadFormData).subscribe(
     response => {
       console.log(response);
       window.location.reload();
     }
   );
  }

  getListOfProduct()
  {
    return this.http.get('http://localhost:8080/api/getImages').subscribe(
      response => {
        this.retrievedProduct = response;
        console.log(this.retrievedProduct);
      },
      error =>{
        console.log(error);
      }
    );
  }

}
