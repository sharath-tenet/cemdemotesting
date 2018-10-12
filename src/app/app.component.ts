import { Component, Inject, OnInit, ViewChild, ElementRef} from '@angular/core';
import {ApiService} from './common/api.service';
import {LoginComponent} from './login/login.component';
import { HttpModule } from '@angular/http';
import { Router, NavigationEnd } from '@angular/router';
import {NgForm, FormControl,Validators} from '@angular/forms';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CookieService} from 'angular2-cookie/core';

//import {Idle, DEFAULT_INTERRUPTSOURCES} from '@ng-idle/core';
//import {Keepalive} from '@ng-idle/keepalive';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/timer';
import { NotificationsService } from "angular4-notify";
declare var swal: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [HttpModule,LoginComponent],
})
export class AppComponent {
  eresponse: any=[];
  loading: any = [];
  
  lphone_number: any;
  resendotptime: any;
  tloop: Observable<number>;
  @ViewChild('gotp') gotp: ElementRef;
  @ViewChild('login_modal') login_modal: ElementRef;
  @ViewChild('verify_login_otp_modal') verify_login_otp_modal: ElementRef;
  @ViewChild('loginbtn') loginbtn: ElementRef;
  @ViewChild('getotpclick') getotpclick: ElementRef;
  @ViewChild('btncls2') btncls2: ElementRef;
  @ViewChild('btncls1') btncls1: ElementRef;
  
  
  
  
  pop:any=[];
  crtDrpDown: any="";
  currentUrl: string;
  filterKey: any;
  locdrpdown: boolean;
  loctxt: string;
  _tempTest: any = [];
  city_name: any;
  area_name: any;
  title = 'app';
  b:any;
  a:any;
  tests=[];
  tot:number=0;
  hvc:number=0;
  homoe_visit_charge:number=50;
  colc:number=0;
  public isLoggedIn:boolean;
  showhidecart:boolean;
  //showhidepckgcart:boolean;
  private loginComponent;
  //public _api:ApiService;
  user:any=[];
  userInfo:any=[];
  obj:any=[];
  cartCnt:number=0;
  servicingCities:any=['Hyderabad','Banglore'];
  //idle,keepalive
  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;

  postalCode:string;
  packagesCount:number;
  testsCount:number=0;
  public pckgs=[];

  phoneNumber:number;
  uid:number;
  constructor(private router :Router,LoginComponent:LoginComponent,private _api:ApiService,private _cookie:CookieService,private ns: NotificationsService) {
   this.setCart();
   this.loginComponent=LoginComponent;
   //console.log(this.tests.length);
   /*  this._api=_api;
      this._api.PinByGoogle("https://maps.googleapis.com/maps/api/geocode/json?latlng=17.432671,78.417993&key=AIzaSyCegOtEDutwtUyNWcOOLgoPedUYVob_AGk").subscribe(data=>{
        console.log(data);
      });
  */
    this.setFlag();
 /*  
  console.log(this.tests);
   this.tests.forEach(element => {
            this.tot=this.tot+parseInt(element.test_finalpr); 
          });*/

    //idle,keepalive
  //   idle.setIdle(10);
  //   idle.setTimeout(1800);//1800
  //   idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

  //  idle.onIdleEnd.subscribe(() => this.idleState = 'No longer idle.');
  //   idle.onTimeout.subscribe(() => {
  //     this.idleState = 'Timed out!';
  //     this.timedOut = true;
  //     this.toLogout();
  //   });

  //   idle.onIdleStart.subscribe(() => this.idleState = 'You\'ve gone idle!');
  //   idle.onTimeoutWarning.subscribe((countdown) => this.idleState = 'You will time out in ' + countdown + ' seconds!');

  //   // sets the ping interval to 15 seconds
  //   keepalive.interval(15);

  //   keepalive.onPing.subscribe(() => this.lastPing = new Date());

  //  this.reset();
   //end keepalive,idle
   router.events.subscribe((_: NavigationEnd) =>{
     if((_.url!==undefined)&&(_.url!=='')){
      this.currentUrl = _.url.replace("/","");
      //console.log(this.currentUrl);
     }
   });
   
  }


  reset1(form:NgForm){
    form.resetForm();
    location.reload();
    //this.router.navigate(["./"]);
    //this.fotp=false; 
  }
  resetOnLogin(form:NgForm){
    form.resetForm();
    
  }

  liveLocation(){
    
    let c=this._cookie.get("location_city_name");
  
    if(((localStorage.getItem('location_city_name'))&&(localStorage.getItem('location_city_name')!=='undefined'))||(c!=='undefined'&&c!==undefined)){
      this.loctxt=localStorage.getItem('location_city_name');
     
      if(this.loctxt===null){
        
        this.loctxt=c;
        localStorage.setItem('location_city_name',this.loctxt); 
        this.setLocation(c);
      }
      this.locdrpdown=false;
      
    }else{
      this.loctxt="Select Location";
      this.locdrpdown=true;
    }
    
  }
  setLocation(val){
   //console.log(val);
    localStorage.setItem('location_city_name',val);
    this._cookie.put("location_city_name",val);
    if(this.servicingCities.indexOf(val) > -1){
      // console.log(this.city_name);
       localStorage.setItem("addTocart","true");
     }else{
       localStorage.setItem("addTocart","false"); 
       //this should be un-commented in live
      //localStorage.setItem("addTocart","true");
     }
     this.liveLocation();
     window.location.reload(); //in live this location should be appended
  }
  reset() {
    // this.idle.watch();
    // this.idleState = 'Started.';
    // this.timedOut = false;
  }
  
  OnInIt(){
   // this.a = localStorage.getItem('showCart');
   //console.log(this.testsCount);
   this.loading['getotp']=false;
   window.scrollTo(0, 0);
   if(localStorage.getItem('tests')){
    this.b=JSON.parse(localStorage.getItem('tests'));
      if(this.b.length > 0){
        this.tests= this.b;
      }else{
        this.showhidecart=false;
      }

    if(localStorage.getItem('showcart')=="true"){
      this.showhidecart=true;
    }
   }
 
  }
  getPostalCode(data:any){
    // console.log(data.longitude);
    let req_url="https://maps.googleapis.com/maps/api/geocode/json?latlng="+data.latitude+","+data.longitude+"&key=AIzaSyCegOtEDutwtUyNWcOOLgoPedUYVob_AGk";
   this._api.PinByGoogle(req_url).subscribe(data=>{
    this.postalCode = data[5].address_components[0].long_name;
    
    this.area_name=data[3].address_components[0].long_name;
    this.city_name=data[3].address_components[0].long_name;
    localStorage.setItem('location_area_name',this.area_name);
    localStorage.setItem('location_city_name',this.city_name);
     //  if(this.servicingCities.indexOf(this.city_name) > -1){
      console.log(this.city_name);
     this.setLocation(this.city_name);
    //   localStorage.setItem("addTocart","true");
    // }else{
    //  // localStorage.setItem("addTocart","false"); this should be un-commented in live
    //  localStorage.setItem("addTocart","true");
    // }
     // console.log("Postalcode",data[5].address_components[0].long_name);
      localStorage.setItem('postalCode',this.postalCode);
    }); 
  }
  setCart(){ 
      //this.getPostalCode();
      this.postalCode = localStorage.getItem('postalCode');
      this.area_name = localStorage.getItem('location_area_name');
      this.liveLocation();
      //console.log("pc=",this.postalCode);
        this.tests= JSON.parse(localStorage.getItem('tests'));
        this.tot=0;

        if(this.tests===null){
          this.showhidecart=false;
         // return false;
         this.tests=[];
         
        }else{    
          this.tests.forEach(element => {
            //this._tempTest.push(element);  
            this.tot=this.tot+(element.quant*parseInt(element.test_finalpr)); 
          });
            this.showhidecart=true;
        }
      
       //packages
        this.pckgs= JSON.parse(localStorage.getItem('packages'));  
        if((this.pckgs===null)){
            this.pckgs=[]; 
                 }else{
          this.pckgs.forEach(element => {
          this.tot=this.tot+parseInt(element.package_finalpr); 
        });
          this.showhidecart=true;
           
         }

         this.cartCnt=this.tests.length+this.pckgs.length;
         this.postcheckOut();
    return false;
  }
  getOnlyTestByTid(tid){
    let a;
    let stest=JSON.parse(localStorage.getItem('tests'));
    //console.log(stest);
        if(stest){
          stest.forEach(element => {
            if(element.tid===tid){
              a=element;
              
            }
        });
        }
        return a;
  }
  quantAddByIndex(tid){
    
        this.getAddTestCart(this.getOnlyTestByTid(tid));
  }
  quantMinusByIndex(tid){
    
        this.getRemoveTestCart(this.getOnlyTestByTid(tid));
  }
  myIndexOf(o) {
    
         for (var i = 0; i < this.tests.length; i++) {
           let a=this.tests[i];
           let b=o;
          
             if (a.tid===b.tid) {
 
                 return i;
             }
         }
         return -1;
     }
     getAddTestCart(test){
      this.setCart();
      let i=this.myIndexOf(test);
      
      let t=this.tests[i].quant;
     
        t=t+1;
        this.tests[i].quant=t;
        localStorage.setItem('tests',JSON.stringify(this.tests));
        this.setCart();
     
     }
  getRemoveTestCart(test:any){
    this.setCart();
    let i=this.myIndexOf(test);
    
    let t=this.tests[i].quant;
    if(t>1){
      t=t-1;
      this.tests[i].quant=t;
      localStorage.setItem('tests',JSON.stringify(this.tests));
      this.setCart();
    }else{
      this.deleteCartItem(this.user.user_id,test.tid);
    }
  
  }
   setFlag(){
      if(localStorage.getItem('user')!=null){
        this.user=JSON.parse(localStorage.getItem('user'));
        this.isLoggedIn=true;
      }else{
        this.isLoggedIn=false;
      }
    }
    saveCartClearData(){
      if(localStorage.getItem('user')){
        let req_data={
          "TokenNo":"",
          "test_id":"0",
          "uid":JSON.parse(localStorage.getItem('user')).uid,
          "loc_id":"1",
          "status":"C",
          "is_wishlist":2
        }
        this._api.getToken().subscribe( 
          token => {
            req_data.TokenNo=token;
        this._api.POST('AddtoWishList',req_data).subscribe(data =>{
          let resp=(JSON.parse(data.json).data);
        //console.log(resp);
          });
        });
      }
  

    }
  clearCart(){ 
      localStorage.removeItem('tests');
      localStorage.removeItem('packages');
      this.saveCartClearData();
      this.setCart();
      // this.router.navigate(['./book']);
    //  window.location.href="./book";
    // window.location.reload();

  }
  hideCart(){
      localStorage.setItem('showcart',"false");
      this.showhidecart=false;  
  }
  userValidDetailsCheck(){
     console.log(this.user.uid);
    let k=1
    if(this.user.uid>0){
      if(!isNaN(this.user.user_name)){
        k=2
      }
      if(this.user.user_address==="NA"){
        k=2
      }

     return k;
    }else{
     return k=0;
    }
  }
  checkOut(){
      this.hideCart();
      let a={"tot":this.tot,"hvc":this.hvc,"colc":this.colc};
      localStorage.setItem("cartValues",JSON.stringify(a));
    //console.log(this.user);
      //return;
      console.log(this.userValidDetailsCheck());
      if(this.userValidDetailsCheck()==1){
         this.router.navigate(['./cart']);
        // window.location.href="./cart" 
      }else if(this.userValidDetailsCheck()==2){
        
        this.router.navigate(['./account']);
      //  window.location.href="./account"
      }else{
        //this.router.navigate(['./login']);
      //  window.location.href="./login"
     // this.toLogin();
     this.loginbtn.nativeElement.click();
      }
       // 
  }
  postcheckOut(){
    
    let a={"tot":this.tot,"hvc":this.hvc,"colc":this.colc};
    localStorage.setItem("cartValues",JSON.stringify(a));
  }
  toLogin(){
    console.log("click on login");
  this.loginbtn.nativeElement.click();
    
    //this.login_modal.nativeElement.click();
  }

  toLogout(){
      this.isLoggedIn=false;
      this.user=[]; 
      this.loginComponent.loggedOut();
      this.setCart();
      this.router.navigate(['./home']);
  }

  profile(){
    this.router.navigate(['./account']);
  }

  getHumanDate(dt:any){
    dt=dt.replace("/Date(","");
    dt=dt.replace(")/","");
    dt=dt.split("+");
    let hr=dt[1].substring(0,2)*60*1000;
    let min=dt[1].substring(2,4)*60*1000;
    let fdt=parseInt(dt[0])+hr+min;
    let theDate = new Date(fdt);
    let dateString = theDate.toUTCString();
    let date1 = (theDate.getMonth()+1).toString()+'/'+theDate.getDate().toString()+'/'+theDate.getFullYear().toString();
    return date1;
  }

 /* deleteCartItem(uid:number,tid:number){
    this.tests= JSON.parse(localStorage.getItem('tests'));
     //console.log(this.tests);
      this.tests.forEach( (item, index) => {
       if(item.tid === tid) this.tests.splice(index,1);
       
     });
      this.pckgs= JSON.parse(localStorage.getItem('packages'));
     //console.log(this.tests);
      this.pckgs.forEach( (item, index) => {
        if(item.id === tid) this.pckgs.splice(index,1);
     });

     //this.hideCart();
     localStorage.setItem("tests", JSON.stringify(this.tests));
     //console.log(JSON.parse(localStorage.getItem('tests')));
     localStorage.setItem("packages", JSON.stringify(this.pckgs));
     
   }*/


deleteCartItem(uid:number,tid:number){

    this.tests= JSON.parse(localStorage.getItem('tests'));
      if(this.tests!=null){
              this.tests.forEach( (item, index) => {
              //console.log(this.sel_members[item.tid]['uid']);
                  if(item.tid === tid) this.tests.splice(index,1);
             });

       }

      this.pckgs= JSON.parse(localStorage.getItem('packages'));
           if(this.pckgs!=null){
            this.pckgs.forEach( (item, index) => {
              if(item.id === tid) this.pckgs.splice(index,1);
           });
      }

      localStorage.setItem("tests", JSON.stringify(this.tests));
      localStorage.setItem("packages", JSON.stringify(this.pckgs));
      // console.log(this.tests);
       this.tests = JSON.parse(localStorage.getItem('tests'));
       this.pckgs = JSON.parse(localStorage.getItem('packages'));
       this.tot=0;
      /* if(this.tests!==null){
         this.tests.forEach(element => {
                this.tot=this.tot+parseInt(element.test_finalpr); 
              });
         this.testsCount=this.tests.length;

       }else{
        this.testsCount=0;
       }*/
            if(this.tests){
                this.tests.forEach(element => {
                    this.tot=this.tot+(parseInt(element.quant)*parseInt(element.test_finalpr)); 
                });
                this.testsCount=this.tests.length;
                
            }else{
                 this.testsCount=0;
            }
        
       /* if(this.pckgs!==null){
           this.pckgs.forEach(element => {
                this.tot=this.tot+parseInt(element.package_finalpr); 
              });
           this.packagesCount = this.pckgs.length;
          }else{
            this.packagesCount=0;
          }
          this.cartCnt=this.testsCount+this.packagesCount;*/ 
              if(this.pckgs){
                this.pckgs.forEach(element => {
                    this.tot=this.tot+parseInt(element.package_finalpr); 
                });
                 this.packagesCount = this.pckgs.length;
                
            }else{
                this.packagesCount=0;
            }
            let a={"tot":this.tot,"hvc":this.hvc,"colc":this.colc};
            localStorage.setItem("cartValues",JSON.stringify(a));
          // this.cartCnt=this.tests.length+this.pckgs.length;
          this.cartCnt=this.testsCount+this.packagesCount;
          
  
   }
   select(item,temp){

    this.filterKey = new String(item);
    var re=/ /gi;
    this.filterKey=this.filterKey.replace(re,"_"); 
    this.filterKey=this.filterKey.replace("(","__,_"); 
    this.filterKey=this.filterKey.replace(")","_,__");
       if(temp=="test"){        
        // window.location.href="./test-details/"+this.filterKey;
        if(this.currentUrl.indexOf('test-details')>=0){
          
          window.location.href="./test-details/"+this.filterKey;
          //debugger;
          //this.router.navigate(["./test-details/"+this.filterKey]);
         // window.location.reload();
        }else{
          this.router.navigate(["./test-details/"+this.filterKey]);
        }
        
       }else if(temp=="organ"){
   
        this.router.navigate(['./book', {organ:this.filterKey}]);
       }else if(temp=="spl"){

        this.router.navigate(['./book', {speciality:this.filterKey}]);
       }else if(temp=="cond"){
        
                this.router.navigate(['./book', {condition:this.filterKey}]);
               }else if(temp="package"){

                    let base_url="";
                     base_url="package-details";
                   /*if( this.ptype=="H"){
                    base_url="package-details";
                   }else if(this.ptype=="P"){
                    base_url="profile-details";
                   }*/
                   window.location.href="./"+base_url+"/"+this.filterKey; 

               }   
   // this.filteredItems = [];
}
getTestForCart(){
  //console.log(this.tests);
  if(localStorage.getItem("tests")!==null){
    if(this.tests.length!==JSON.parse(localStorage.getItem("tests")).length){
      this.tests=JSON.parse(localStorage.getItem("tests"));
    }
  }
  
  return this.tests;
}
getCartDropDown(){

 return this.crtDrpDown;
}

redir(dir){
  this.router.navigate(['./'+dir]);
}
getOTP(form:any,isValid:any){
  //debugger;
  this.loading['getotp']=true;
  console.log('getOTPForm',form.value);
  if(isValid){
    this.lphone_number=form.value.Mobile;
      this._api.getToken().subscribe( 
      token => {
          let data ={
            'TokenNo':token,
            'login_username':form.value.Mobile
           }
             this._api.POST('ExpressLogin', data).subscribe(data =>{
             let response=(JSON.parse(data.json).data);
                //debugger;
                 if(response == undefined){
                  //    form.resetForm();
                     alert("undefined");
                 }else{
                    if(response[0].uid!=null){ 
                     this.eresponse=response;
                    //  form.resetForm();   
                      this.gotp.nativeElement.setAttribute("data-target", "#verify_login_otp_modal");
                      this.gotp.nativeElement.setAttribute("type","button");
                      this.gotp.nativeElement.click();
                     // this.login_modal.nativeElement.click(); 
                      
                      this.uid=response[0].uid;
                     
                      this.timerless(29);
                    }else{
                     swal("<small>Failed to send OTP</small>");
                     form.resetForm();
                    }

                   
                 }
                 this.loading['getotp']=false;

             });
      });
  }else{
    console.log("here");
  }


}//getOTP
timerless(t){
  this.resendotptime=t;
  this.tloop=Observable.timer(1000);
  this.tloop.subscribe(()=>{
    
    if(t>0){
      this.timerless(t-1);
    }
  })
}
getresendotptime(){
  return this.resendotptime;
}
resendOTP(mob){
let form={"value":{"Mobile":mob}};

this.getOTP(form,true);

}

autoTab(event:any){
      if ( event.target.value.length >= event.target.maxLength && event.target.nextElementSibling ) 
       event.target.nextElementSibling.focus(); 

    }

loginByOTP(form: NgForm,isValid: boolean,uid:number,ph:number){

  //console.log('otpform',form.value);
  if(isValid){
          this._api.getToken().subscribe( 
          token => { 
              let data = {
                "TokenNo":token,
                "otp":form.value.term1+form.value.term2+form.value.term3+form.value.term4,
                "user_id":this.uid
              }
           
        this._api.POST('ExpressloginOtpVerification', data).subscribe(data =>{
           let resp=(JSON.parse(data.json).data);
           
          // console.log('Login BY OTP',resp);
           let res=resp;
           if(resp ==undefined){
              form.resetForm();
           }else{

            if(resp[0].uid!=null){ 
                  swal("<small>OTP verified successfully</small>");
                 
                  //console.log(res);
                  if(res[0].user_token==null){
                    res[0].user_token="sometokenhere007";
                  }
                  if(res[0].user_token != null){
                    localStorage.setItem('token',res[0].user_token);
                    let nk=[];
                    if(res[0].user_name==null){
                      nk[0]="";
                      nk[1]="";
                    }else{
                      nk=res[0].user_name.split(" ");
                    }
                    res[0].firstname=nk[0];
                    res[0].lastname=nk[1];
                    localStorage.setItem('user',JSON.stringify(res[0]));
                    //get temp cart data
                    // this.getCartData();
                    //debugger;
                        if(res[0].user_address=="NA"){
                          this.router.navigate(['./account']);
                          this.btncls2.nativeElement.click();
                          this.btncls1.nativeElement.click();
                          
                        }else {
                          this.getCartData();
                        }
                          console.log("logged in successfully");
                          //swal("<small>Logged in successfully</small>");
                  }else{
                    console.log("invalid authentication");
                    //swal("<small>Invalid Authentication.</small>");
                    form.resetForm(); 
                  }
                  //login logic
                          
                  }else{
                 
                   swal("OTP verification failed");
                   form.resetForm();
                  }

           }
            
           });
          });


      }

}

  getOtpVerification(form:any,isValid: boolean){

    this._api.getToken().subscribe( 
      token => {  
          let data = {
            "TokenNo":token,
            "otp":form.value.term1+form.value.term2+form.value.term3+form.value.term4,
            "user_id":form.value.user_id
          }
       
          this._api.POST('GetOtpVerification', data).subscribe(data =>{
             let resp=(JSON.parse(data.json).data);
             //console.log(resp);
             if(resp ==undefined){
                form.resetForm();
             }else{

               if(resp[0].uid!=null){
               // swal("<small>OTP verified successfully</small>");
                 form.resetForm();
                }else{
                 swal("OTP verification failed");
                 form.resetForm();
                }

             }
              
             });
      });
  }
getPhoneSubStr(mi,mx){
if(this.lphone_number){
  return this.lphone_number.substring(mi,mx);
}else{
  return "";
}
}
getCartData(){
  let req_data={
    "TokenNo":"",
    "uid":JSON.parse(localStorage.getItem('user')).uid,
    "Flag":2

  }
  this._api.getToken().subscribe( 
    token => {
      req_data.TokenNo=token;
  this._api.POST('GetTestWishList',req_data).subscribe(data =>{
    let resp=(JSON.parse(data.json).data);
   // console.log(resp);
    let k=[];
    if(JSON.parse(localStorage.getItem('tests'))!== null){
      k=JSON.parse(localStorage.getItem('tests'));
      }
    if((resp!==null)&&(resp!==undefined)){
      if(resp.length > 0){
        
        resp.forEach(element => {
          k.push(element);
        });
      //  console.log(k);

        localStorage.setItem('tests',JSON.stringify(k));
        this.btncls2.nativeElement.click();
        this.btncls1.nativeElement.click();
        this.router.navigate(['./cart']);
      }
    }else if(k.length>0){
        localStorage.setItem('tests',JSON.stringify(k));
        this.btncls2.nativeElement.click();
        this.btncls1.nativeElement.click();
        this.router.navigate(['./cart']);          
    }else{
      this.btncls2.nativeElement.click();
      this.btncls1.nativeElement.click();
      this.router.navigate(['./book']);
    }
//     if(JSON.parse(localStorage.getItem('tests'))=== null){
//       this.router.navigate(['./book']);
// }else{
    

//      this.router.navigate(['./cart']);
// }
  
  
    });
  });

}
setELuid(evnt){
  
this.uid=evnt.target.value;
}
getNotify(msg){
  this.ns.addError(msg);
 }



}
