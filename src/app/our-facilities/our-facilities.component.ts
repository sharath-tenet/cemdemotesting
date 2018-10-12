import { Component, OnInit, Injectable} from '@angular/core';
import {BookComponent} from '../book/book.component';
import {ApiService} from '../common/api.service';
import {Router} from '@angular/router';
import {AppComponent} from '../app.component';

import {NgForm, FormControl,Validators} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
declare var swal: any;
@Component({
  selector: 'app-our-facilities',
  templateUrl: './our-facilities.component.html',
  styleUrls: ['./our-facilities.component.css'],
  providers:[BookComponent]
})

@Injectable()
export class OurFacilitiesComponent implements OnInit {
   public _bookComponent:any;
  
   public _api:ApiService;

  searchTerm : FormControl = new FormControl('', [Validators.required, Validators.minLength(3)]);
  searchResult = [];
  _packages:any=[];
  public filterKey:any;
  mpckgshow=true;
  ser_string="";

  tokenSet:boolean=false;
  public _appComponent:any;
  _packagesSearchResult:any=[];
  top_tests:string[]=["Complete Blood Picture (CBP), EDTA Whole Blood","Lipid Profile, Serum","Liver Function Test (LFT), Serum","Thyroid Antibodies (TG & TPO), Serum","Thyroid Profile (T3,T4,TSH), Serum","1, 25-Dihydroxy Vitamin D, Serum","25 - Hydroxy Vitamin D, Serum","Urea, Serum","Creatinine, Serum","Triple Marker, Serum","Magnesium, Serum"
  ,"Complete Urine Examination (CUE), Spot Urine","Glucose Fasting (FBS),  Sodium Flouride Plasma","Glycosylated Hemoglobin (HbA1C), EDTA Whole Blood","Uric Acid, Serum","Thyroglobulin (Tg), Serum","Blood Urea Nitrogen (BUN), Serum","Prolactin, Serum","Prothrombin Time With INR, Sodium Citrate Whole Blood","HIV 1 & 2 Antibodies, Serum","Culture And Sensitivity (Aerobic), Urine"];

  constructor(_bookComponent :BookComponent,_api :ApiService,private router :Router,_appComponent :AppComponent) {
      this._appComponent=_appComponent;
      this.tokenSet=this._appComponent.isLoggedIn;
  		this._bookComponent=_bookComponent;
  		this._api=_api;
  		this.router = router;

      //AutoComplete search
     this.searchTerm.valueChanges
        .debounceTime(400) 
        .subscribe(data => {
        let term = new String(data); 
        if(term.length >=3){
          this._api.getToken().subscribe( 
            token => {
        this._api.POST('GetServices', {TokenNo:token,pincode:'' ,test_name:data,test_code:'',test_type:'',condition_id:'',speciality_id:'',sort_by:'',sort_order:'',AlphaSearch:'',user_id:'',is_home_collection:"",organ_id:""}).subscribe(data =>{
                        if(data.status==1){
                          this.searchResult=JSON.parse(data.json).data;
                        }else{
                          this.searchResult=[];
                        }
                         
                       });
                      });
                       this._api.getToken().subscribe( 
                        token => {
                  this._api.POST('GetPackages',{TokenNo:token,"pincode":"","package_name":data,"package_code":"","sort_by":"","sort_order":"","alphaSearch":"",organ_id:""}).subscribe(data =>{
                  if(data.status==1){
                    this._packagesSearchResult=JSON.parse(data.json).data;
                    //this.testsList=[];
                  }else{
                    this._packagesSearchResult=[];
                  }
                
               });
              });
             }      
        })
  		
   }

	  ngOnInit() {
      window.scrollTo(0, 0);
	  }

    
    // //SELCTION ITEM METHOD.
    // select(item){
    //     this.filterKey = item;
    //     this.searchResult = [];
    //     this._packages=[];
    //    // this.filteredItems = [];
    // }

   	search(srt_by:any,searchString:any){
	 //this._bookComponent.serClick(srt_by,strng);
	  this.router.navigate(['./book', {searchString:searchString}]);
	}

  
  //   searchBasedOnString(str:any){
  //   this.router.navigate(['./book', {searchString:str}]);
  // }

  

            loginSubmit(form: NgForm,isValid: boolean){
      //console.log(form.value, isValid);
    
      let data={
          "TokenNo":"",  
          "login_username":form.value.phone,
          "password":form.value.password1
          };
       
        /*  if(rm==true){
           var date = new Date();
           var midnight = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59);
           //Cookies.set('visits', number, { expires: midnight });
    
            this._cookieService.put(newLocal, username, {expires:midnight});
    
            this._cookieService.put('PASSWORD', password, {expires:midnight});
    
            this._cookieService.put('RM', "true", {expires:midnight});
          }else{
            this._cookieService.removeAll();
          }*/
          if(isValid){
            this._api.getToken().subscribe( 
            token => {
              data.TokenNo=token;
              this._api.POST('GetLoginUser',data).subscribe(data =>{
                  let res=JSON.parse(data.json).data;
                    if(res==undefined){
                      swal("<small>Invalid Authentication.</small>");
                      form.resetForm(); 
                    }else{
                        //console.log('res',res);
                        if(res[0].user_token != null){
                          localStorage.setItem('token',res[0].user_token);
                          localStorage.setItem('user',JSON.stringify(res[0]));
                          //get temp cart data
                         // this.getCartData();
                          this.redir('order-history');
                                console.log("logged in successfully");
                                //swal("<small>Logged in successfully</small>");
                        }else{
                          console.log("invalid authentication");
                          //swal("<small>Invalid Authentication.</small>");
                          form.resetForm(); 
                        }
                    }
    
    
              });
    
            })
    
          }else{
              console.log("");
          }
    
      }
      getPopularTests(strng){
        if(strng===''){
          return this.top_tests;
        }else{
          return [];
        }
        
      }
  
      searchBasedOnString(str:any){
      
      if(str != undefined){
          this.router.navigate(['./book', {searchString:str}]);
        }else{
          return false;
        }
  
     }
  
      select(item,type:any){
          this.filterKey = new String(item);
          
          this.searchResult = [];
           this._packages=[];
           let fk;
           var re=/ /gi;
           
           fk=this.filterKey.replace(re,"_"); 
           fk=fk.replace("(","__,_"); 
           fk=fk.replace(")","_,__"); 
          if(type=="test"){
           
            window.location.href="./book/test-details/"+fk;
          }else if(type="package"){
            window.location.href="./package-details/"+fk;
          }
         // this.filteredItems = [];
      }
      //book a test and status blocks
      getBookAnAppointment(){
        
          this.router.navigate(['./book']);
       }
       redir(val:string){
        window.location.href="./"+val;
      }
      getOTP(){
        this._appComponent.toLogin();
      }

}
