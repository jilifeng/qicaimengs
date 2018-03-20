var Cookie={Get:function(a){var d,b=document.cookie.split("; "),c=[];for(i=0;i<b.length;i++)d=b[i].split("="),c[d[0]]=unescape(d[1]);return a?c[a]:c},Set:function(a,b,c,d,e,f){var g,h;return a&&b?""==a||""==b?!1:(c&&(/^[0-9]+$/.test(c)?(g=new Date,c=new Date(g.getTime()+1e3*c).toGMTString()):/^wed, \d{2} \w{3} \d{4} \d{2}\:\d{2}\:\d{2} GMT$/.test(c)||(c=void 0)),h=a+"="+escape(b)+";"+(c?" expires="+c+";":"")+(d?"path="+d+";":"")+(e?"domain="+e+";":"")+(f&&0!=f?"secure":""),h.length<4096?(document.cookie=h,!0):!1):!1},Del:function(a,b,c){return a?""==a?!1:this.Get(a)?(document.cookie=a+"=;"+(b?"path="+b+";":"")+(c?"domain="+c+";":"")+"expires=Thu, 01-Jan-1970 00:00:01 GMT;",!0):!1:!1}},Cache=function(){var storage,api={},pre="NetCQ_",win=window,doc=win.document,localStorageName="localStorage",globalStorageName="globalStorage",JsonToStr=function(a){var c,b=[];if("string"==typeof a)return'"'+a.replace(/([\'\"\\])/g,"\\$1").replace(/(\n)/g,"\\n").replace(/(\r)/g,"\\r").replace(/(\t)/g,"\\t")+'"';if("undefined"==typeof a)return"undefined";if("object"==typeof a){if(null===a)return"null";if(a.sort){for(c=0;c<a.length;c++)b.push(JsonToStr(a[c]));b="["+b.join()+"]"}else{for(c in a)b.push('"'+c+'":'+JsonToStr(a[c]));b="{"+b.join()+"}"}return b}return a.toString()};return api.set=function(){},api.get=function(){},api.remove=function(){},api.clear=function(){},localStorageName in win&&win[localStorageName]?(storage=win[localStorageName],api.set=function(a,b){"object"==typeof b?storage.setItem(pre+a,JsonToStr(b)):storage.setItem(pre+a,b)},api.get=function(key){var _v,_cache=storage.getItem(pre+key)||"";try{_v=eval("("+_cache+")")}catch(e){_v=_cache}return _v},api.clear=function(a){a?storage.removeItem(pre+a):storage.clear()}):globalStorageName in win&&win[globalStorageName]?(storage=win[globalStorageName][win.location.hostname],api.set=function(a,b){"object"==typeof b?storage[pre+a]=JsonToStr(b):storage[a]=b},api.get=function(key){var _v,_cache=storage[pre+key].value||"";try{_v=eval("("+_cache+")")}catch(e){_v=_cache}return _v},api.clear=function(a){if(a)delete storage[pre+a];else for(var a in storage)delete storage[a]}):(api.set=function(a,b){Cookie.Set(pre+a,b)},api.get=function(a){return Cookie.Get(pre+a)},api.clear=function(a){var b,c;if(a)Cookie.Del(pre+a);else if(b=document.cookie.match(/[^ =;]+(?=\=)/g))for(c=b.length;c--;)document.cookie=b[c]+"=0;expires="+new Date(0).toUTCString()}),api}();
var isVIP='';
function sclient(){
	var token = Cache.get("flag") || "";
	var uri = "http://test.7cai.tv/index.php/api/api/user?t="+token;
	return new hprose.HttpClient(uri);
}

var client = sclient();

function Is_weixn(){  
	var ua = navigator.userAgent.toLowerCase();  
	return (ua.match(/MicroMessenger/i)=="micromessenger");
}
var isWenxin = Is_weixn();
//  获取推荐码
var uniquemark = Cache.get("uniquemark") || null;
var link = !uniquemark ? "http://v.7cai.tv":"http://v.7cai.tv"+"?unique="+uniquemark;
   //微信分享
   if(isWenxin){
    client.invoke("getWxSdkSignInfo",[{"url":window.location.href}],function(result){
    	var result = $.parseJSON(result);
    	if(result.res == 1){
    		 wx.config({
			    debug: false, 
			    appId: result.data.appid, 
			    timestamp:result.data.timestamp, 
			    nonceStr: result.data.noncestr, 
			    signature: result.data.signature,
			    jsApiList: ["onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","chooseImage","previewImage"]
			});		 
	      var title = "欢迎访问七彩梦，海量视频等你哟~"; 
	      var imgurl = "http://v.7cai.tv/images/logo.png";
		  
           wx.ready(function(){ 	     
   	       //分享到朋友圈
   	         	       	       
              wx.onMenuShareTimeline({
              title: title, // 分享标题
              link: link, // 分享链接
			  imgUrl:imgurl, // 分享图标
			  success: function () {
			    	history.go(-1);
			        // 用户确认分享后执行的回调函数
			    },
			    cancel: function () {
			    	history.go(-1);
			        // 用户取消分享后执行的回调函数
			     }
               });
            
			  //分享给朋友
			  wx.onMenuShareAppMessage({
			    title: title, // 分享标题
			    desc: '', // 分享描述
			    link: link, // 分享链接
			    imgUrl: imgurl, // 分享图标
			    type: '', // 分享类型,music、video或link，不填默认为link
			    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
			    success: function () {
			    	history.go(-1);
			        // 用户确认分享后执行的回调函数
			    },
			    cancel: function () {
			    	history.go(-1);
			        // 用户取消分享后执行的回调函数
			    }
			});			
			//分享到qq		
			  wx.onMenuShareQQ({
			    title: title, // 分享标题
			    desc: '', // 分享描述
			    link: link, // 分享链接
			    imgUrl: imgurl, // 分享图标
			    success: function () {
			    	history.go(-1);
			       // 用户确认分享后执行的回调函数
			    },
			    cancel: function () {
			    	history.go(-1);
			       // 用户取消分享后执行的回调函数
			    }
			    });		  
	})			
    	};
   
    })
   };
//登录按钮
$(document).on("pageInit","#login",function(){	
	$("#lg-denglu").on('click',function(){
		$.showIndicator();
		var mobile = $("#lg-mobile").val();
		var passwd = $("#lg-psword").val();		
		if(mobile && passwd && /^1(3|5|7|8)\d{9}$/.test(mobile) && /^(.){6,20}$/.test(passwd)){
			client.invoke("login",[{"mobile":mobile,"passwd":passwd}],function(result){
				$.hideIndicator();
				var result = $.parseJSON(result);
				if (result.res == 1){
					$.toast("欢迎,"+mobile);					
				    Cache.set("flag",result.data.sig);
					Cache.set("whole_mobile",mobile);
					Cache.set("passwd",passwd);
					setTimeout(function(){
							window.location.href="/";
						},1500);
				}else{
					$.toast(result.msg);
				}
			})
		}else{
			$.toast("请填写正确的账户密码！");
		}
	});	
});
//注册按钮
//1-2
$(document).on("pageInit","#mobileRegist",function(){
	
	 if(Cache.get("tuijianma")){
	 	$("#mr-tuijian").val(Cache.get("tuijianma"));
	 	$("#tuijianren").css("display","none");	    
	 }	 	 
	 
	 $("#mr-wc").on("click",function(){
	 		
			var mobile = $("#mr-mobile").val();
			var psword = $("#mr-psword").val()?$("#mr-psword").val():"123456";
			if( /^1(3|5|7|8)\d{9}$/.test(mobile) && /^(.){6,20}$/.test(psword) ){							    	
					client.invoke("register",[{"mobile":mobile,"passwd":psword,"topuser":$("#mr-tuijian").val()}],function(result){
						var result = $.parseJSON(result);
						if (result.res == 1){
							client.invoke("login",[{"mobile":mobile,"passwd":psword}],function(result){			
								var result = $.parseJSON(result);
								if(result.res == 1){
								   $.toast("欢迎,"+mobile);
								    Cache.set("flag",result.data.sig);
				                	Cache.set("whole_mobile",mobile);
				                  	Cache.set("passwd",psword);
								   setTimeout(function(){
								   		window.location.href="../huiyuan/kaiHuiyuan.html";
								   },1500);
								}else{
									$.toast(result.msg);
								}
							});
						}else{
							$.toast(result.msg);
						}
					});					
				}else{
				$.toast("手机号或密码格式不正确!");
			}	
	});
});

//验证码发送	
var mytime;
var mysec=59;
function timeIn1(){
			mysec--;
			$("#bk-sec").html(mysec);
			if(mysec == 0){
				clearInterval(mytime);
				$("#bk-yifa").hide();
				$("#bk-zaici").show();		
			}
	}

//密码找回按钮
$(document).on("pageInit","#backpsword",function(e,id,page){	
	
	//function sendcode(){}
	$("#bk-huoqu").on("click",function(){
			var mobile = $("#bk-mobile").val();
			if(/^1(3|5|7|8)\d{9}$/.test(mobile)){
			  client.invoke("sendCode",[{"mobile":mobile}],function(result){
				var result = $.parseJSON(result);				
				$("#bk-huoqu").hide();
			    $("#bk-yifa").show();
			    mytime = setInterval(timeIn1,1000);
			  });	
			}else{				
				$.toast("请输入正确的手机号！")				
			}			
		})
		$("#bk-zaici").on("click",function(){
			mysec = 60;
			$("#bk-zaici").hide();
			$("#bk-yifa").show();
			mytime = setInterval(timeIn1,1000);
		})
	//
	
	
    $("#bk-commit").on("click",function(){
    	var mobile = $("#bk-mobile").val();
		var code = $("#bk-code").val();
		var passwd = $("#bk-newps").val();
		if(/^1(3|5|7|8)\d{9}$/.test(mobile) && code && passwd){
			client.invoke("findPwd",[{"mobile":mobile,"code":code,"passwd":passwd}],function(result){
				var result = $.parseJSON(result);
				if (result.res == 1){
					$.toast("密码找回成功");
							setTimeout(function(){
								window.location.href="login.html";
							},1500);
				}else{
					$.toast("验证码不正确，请重新输入");
				}
			})
		}else{
			$.toast("请输入正确的资料");
		}
		    })
	});
//ljy
$(document).on("pageInit","#shezhi",function(e,id,page){
	$("#tuichudenglu").on("click",function(){
		$.confirm('您确定要退出登录吗？',
		function(){
		 client.invoke("logout",function(result){
		 	var result = $.parseJSON(result);
		 	if(result.res == 1){
		 		$.toast("成功退出 ！");
		 		Cache.clear("flag");
		 		Cache.clear("Login");
			    Cache.clear("whole_mobile");
			    Cache.clear("passwd");
			    Cache.clear("isVIP");
			    Cache.clear("uniquemark");
			    Cache.clear("tuijianma");
		 		setTimeout(function(){
		 			window.location.href = "/";
		 		},1500)
		 	}else{
		 		$.toast(result.msg);
		 	}
		 })
		},
		function(){}
	    )  	
    });
});

//判断是否登录
var isLogin = function(){
    	if(Cache.get("flag")){
    		if(!Cache.get("Login")){
    			client.invoke("isLogin",[{"mobile":Cache.get("whole_mobile")}],function(result){
	     		var result = $.parseJSON(result);
		  		if(result.res == 0){
		  			$.toast("您还未登录！");
		  			return false;
		  		 }else{
		  		 	Cache.set("Login",1);
		  		 	return true;
		  		 }
	  	 	})   			
    		}else{
    			return true;
    		}
    		
	    }else{
     		$.toast("您还未登录！");
  			return false;
     	}
}

//提示未登录跳转
var noLogin = function(){
			  			setTimeout(function(){
		  				window.location.href = "/templets/gerenzhongxin/login/login.html";		  				
		  			},1500)
}

//是否VIP
var isVip = function(){
	var isVIP = Cache.get("isVIP") || 0;
				if(!isVIP){
			 		client.invoke("getUserInfo",function(result){
			 			var result = $.parseJSON(result);
			 			if(result.res == 1){			 				
			 				Cache.set("isVIP",result.data.isVip);
			 				isVIP = result.data.isVip;
			 				if(isVIP == 1){
							// 已经是会员。		
							  window.location.href = "/templets/gerenzhongxin/personmessage_huiyuan.html";				
							}else{
								window.location.href = "/templets/gerenzhongxin/personmessage.html";	
							}			 				
			 			}else{
			 				$.toast(result.msg);
			 			}
			 		})
			 	}else{
			 		window.location.href = "/templets/gerenzhongxin/personmessage_huiyuan.html";
			 	}
}


//视频登录判断
$(document).on("pageInit","#shouye",function(e,id,page){
	var s = getUrlVars()["unique"];
	Cache.set("tuijianma",s);
   $(".content").on("click","a",function(e){
   		if(isLogin() == false){
   			e.preventDefault();
   			noLogin();
   		}
    });
});


//我的点击判断
$("#nav-wode").on("click",function(e){
	$.showIndicator();
	if(isLogin() == false){
   			e.preventDefault();
   			noLogin();
   		}else{
   			isVip();
   		}
	
})

//播放页鉴权
$(document).on("pageInit","#VideoPlay",function(){
	if(isLogin() == false){
			noLogin();  			
   		}
});

//商城鉴权
$(document).on("pageInit","#shangcheng",function(){
	$(".content").on("click",function(e){
		if(isLogin() == false){
			e.preventDefault();
   			noLogin();
   		}
	})	
});

//  新增收货地址
$(document).on("pageInit","#add-address",function(e,id,page){
	$("#address-commit").on('click',function(){
		var name = $("#sh-name").val();
		var phone = $("#sh-phone").val();
		var sharea = $("#ad-ad-arpicker").val();
		var detail = $("#sh-detail").val();
	    var isdef = $("#sh-moren").attr("checked")?1:0 ;
	    if(name && /^1(3|5|7|8)\d{9}$/.test(phone) && sharea && detail){
	    	$.showIndicator();
	    	client.invoke("addOrEditAddress",[{"name":name,"phone":phone,"area":sharea,"detail":detail,"isdef":isdef,"type":0}],function(result){
	    	$.hideIndicator();	
	    	var result = $.parseJSON(result);
	    	if(result.res == 1){
	    	   $.toast("添加成功");
	    	   setTimeout(function(){
	    	   	 window.location.href = "/templets/gerenzhongxin/personMessage/MyAddress.html";
	    	   },1500)
	    	}else{
	    		$.toast(result.msg);
	    	}
	    });
	    }else{
	    	$.toast("请填写正确的资料(或手机格式)");
	    }
	    

	})
})
//MyAddress   我的地址
$(document).on("pageInit","#myAddress",function(e,id,page){
	
  client.invoke("getAddressList",function(result){
  	var result = $.parseJSON(result);
    if(result.res == 1){
    	if(result.data.length<1){
				window.location.href = "./AdNnewaddress.html";
			}else{						 
		    	for(var i = 0;i<result.data.length;i++){
		    	var newaddress = '<li class="isdef'+result.data[i].isdef+'"><div class="wj_address_tel"><div style="overflow:hidden;"> <span class="wj_name clearfix">'+result.data[i].name+'</span><span class="wj_tel clearfix">'+result.data[i].phone+'</span> </div> <div class="wj_adds">'
		    	+result.data[i].area+result.data[i].detail +'</div></div> <div class="wj_address_opration"><div class="wj_address_opration_left">	<div class="my-select">	<input type="radio" /><i class="iconfont icon-fankui"></i></div>   <span class="setdefault">设为默认<div style="display:none" class="setdefaultbutton">'+result.data[i].id +'</div></span>  </div>   <div class="wj_address_opration_right"><span class="edit-ad"><i class="iconfont  icon-bianji1"></i> 编辑<div class="sh-id" style="display:none">'+result.data[i].id+'</div></span> <span><i class="iconfont icon-shanchu1"></i></span><span class="deleteAddress"> 删除<div class="sh-id" style="display:none">'+result.data[i].id+'</div></span> </div> </div><div class="fenge"></div></li>';
		    	$("#getAddress").append(newaddress);
		    	}
    }
     //默认地址置顶
      var  sm = $(".isdef1");
     $(".isdef1").remove();
     $("#getAddress").prepend(sm);
     $(".isdef1 .my-select").addClass("bg-myse");

    //设置默认地址
      $(".my-select").on("click",function(){
        var morenid =$(this).siblings("span").find(".setdefaultbutton").text();
       client.invoke("setDefaultAddress",[{"id":morenid}],function(result){
       	var result = $.parseJSON(result);
       	 if(result.res == 1){
       	 	$.toast("已设为默认地址！")
       	 }else{
       	 	$.taost(result.msg);
       	 }
       })

      })
     //点击删除事件
       $(".deleteAddress").on("click",function(){
       	var delid  = parseInt(this.childNodes[1].innerHTML);
       	$.confirm("您确定要删除地址吗？",
        function(){

       	client.invoke("delAddress",[{"id":delid}],function(result){
       		var result = $.parseJSON(result);
       		if(result.res == 1){
       			$.toast("成功删除")
       			$("#getAddress .needdelete").remove();
       		}else{
       			$.toast(result.msg);
       		}
       	})
      	},function(){})
       	this.parentNode.parentNode.parentNode.className="needdelete";
       })
    //注册点击事件
    	$(".my-select").on("click",function(){
    	$(".my-select").removeClass("bg-myse");
		$(this).toggleClass("bg-myse");
		$(this).attr("checked",!$(this).attr("checked"));
	     })
	   // 点击编辑地址事件
	    $(".edit-ad").on("click",function(e){
	    Cache.set("editAddressId",$(this).find(".sh-id").text());
	    	window.location.href = "./editaddress.html";
	    })
      }else if(result.res == 0){
//  	window.location.href = "/staticPage/gerenzhongxin/personMessage/AdNnewaddress.html";
      }
   
});
});

//编辑地址 渲染
$(document).on("pageInit","#editaddress",function(e,id,page){	
	client.invoke("getAddress",[{"id":parseInt(Cache.get("editAddressId"))}],function(result){
		var result = $.parseJSON(result);
		$("#adperson").val(result.data.name);
		$("#ed-mobile").val(result.data.phone);
		$("#ed-chosearea").val(result.data.area);
		$("#ed-address").val(result.data.detail);
		$("#item-input input").attr(result.data.isdef?"checked":"none");
	})
});

// 编辑页面的删除地址
$(document).on("pageInit","#deadd",function(e,id,page){
	$("#deadd").on("click",function(){
		$.confirm('您确定要删除该地址吗？',
		function(){
		  client.invoke("delAddress",[{"id":parseInt(Cache.get("editAddressId"))}],function(result){
		  	var result = $.parseJSON(result);
		  	if(result.res == 1){
		  		$.toast("已删除当前地址！")
		  		setTimeout(function(){
		  			window.location.href = "/templets/gerenzhongxin/personMessage/MyAddress.html";
		  		},1500)
		  	}
		  });
		},
		function(){}
		)
	});
});
//普通会员个人中心渲染
$(document).on("pageInit","#personmessage",function(e,id,page){
	$.showIndicator();
     client.invoke("getUserInfo",function(result){
     	$.hideIndicator();
		var result = $.parseJSON(result);
		if(result.data.imgurl){
			$("#p-message  img").attr("src",result.data.imgurl);
		}else{
			$("#p-message  img").attr("src","/images/touxiang-1.png");
		}
		if(result.data.username){
			$("#p-message  .username").html(result.data.username);
		}else{
			$("#p-message  .username").html(result.data.mobile);
		}
		if(result.data.score){
			$("#p-message  .score").html("积分 : "+result.data.score);
		}
		Cache.set("uniquemark",result.data.unique);
		Cache.set("isVIP",result.data.isVip);
	});	
});

//vip会员个人中心渲染
$(document).on("pageInit","#personmessage_huiyuan",function(e,id,page){
	$.showIndicator();
	var txwidth = $(".hybg-touxiang").width();
	$(".hybg-touxiang").css("height",txwidth);
	var u = navigator.userAgent;
		var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
		if (isiOS){
			$(".hybg-touxiang").css("top","17%");
			$(".hybg-down-num").css("bottom","0.6rem");
		}
     client.invoke("getUserInfo",function(result){
     	$.hideIndicator();
		var result = $.parseJSON(result);
		if(result.data.imgurl){
			$(".hybg-touxiang img").attr("src",result.data.imgurl);
		}else{
			$(".hybg-touxiang img").attr("src","/images/head-huiyuan.png");
		}
		if(result.data.username){
			$("#hui-mobile").html(result.data.username);
		}else{
			$("#hui-mobile").html(result.data.mobile);
		}
		if(result.data.score){
			$("#vip-jifen").html("积分 : "+result.data.score);
		}
		Cache.set("uniquemark",result.data.unique);
		Cache.set("isVIP",result.data.isVip);
	});	
});


// 修改基础资料
$(document).on("pageInit","#editmessage",function(e,id,page){
	 client.invoke("getUserInfo",function(result){
		var result = $.parseJSON(result);
    	$("#me-touxiang img").attr("src",result.data.imgurl?result.data.imgurl:"/images/touxiang-1.png");
		$("#mename").html(result.data.username?result.data.username:result.data.mobile);
	    $("#megenger").val(parseInt(result.data.sex)?"女":"男");
		$("#isAuth").html(parseInt(result.data.isAuth)?"已认证":"未认证");
	    $("#brdate").val(result.data.birth !=''?result.data.birth:"");
	    $("#anquanmima").html(result.data.isSafe == 1 ? "去修改":"去设置");
		var phone = result.data.mobile.substr(0,3)+"****"+ result.data.mobile.substr(7);
	    $("#mobilephone").html(phone);
	 });
	 //头像
	 $("#changetx").on("click",function(){
	 	var sendImg;
	 	if(isWenxin){	 			 	
		 	client.invoke("getWxSdkSignInfo",[{"url":window.location.href}],function(result){
					    	var result = $.parseJSON(result);
					    	if(result.res == 1){
					    		 wx.config({
								    debug: false, 
								    appId: result.data.appid, 
								    timestamp:result.data.timestamp , 
								    nonceStr: result.data.noncestr, 
								    signature: result.data.signature,
								    jsApiList: ["chooseImage","previewImage","uploadImage"]
								});							
							}else{
								$.toast(result.msg);
							}
					  });
			    sendImg = function(type){
				wx.chooseImage({
								    count: 1, // 默认9
								    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
								    sourceType: [type], // 可以指定来源是相册还是相机，默认二者都有
								    success: function (res) {
								        var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
								   		wx.uploadImage({
								   			localId:localIds[0],
								   			isShowProgressTips: 1,
								   			success:function(res){
								   				var serverId = res.serverId;
								   				client.invoke("modifyHeadImg",[{"media_id":serverId}],function(res){
								   					var res = $.parseJSON(res);
								   					if(res.res == 1){
								   						$.toast("修改成功");
								   					}else{
								   						$.toast(res.msg);
								   					}
								   				})
								   				
								   			}
								   		})
								   		$("#my-touxiang").attr("src",localIds);
								   		
								    },
								    fail:function(res){
								    	$.toast("图片获取失败");
								    }
								});	
			};
		}else{
			sendImg = function(type){
				//
			}
		}
		
		var buttons1 = [
			{
				text:"修改头像",
				label:true,
				color:"gray"
			},
			{
				text:'拍照',
				bold:true,
				color:'danger',
				onClick:function(){
					sendImg('camera');					
				}
			},
			{
				text:'相册',
				//bold:true,
				color:'warning',
				onClick:function(){
					sendImg('album');
				}
			}		
		];
		var buttons2 = [
        {
          text: '取消'
        }
        ];
        var groups = [buttons1, buttons2];
      	$.actions(groups);
	});

	 //点击我的地址
	 	$("#c-myaddress").on("click",function(){
		  client.invoke("getAddressList",function(result){
			var result = $.parseJSON(result);
			if(result.data.length>0){
				window.location.href = "/templets/gerenzhongxin/personMessage/MyAddress.html";
			}else{
				window.location.href="./AdNnewaddress.html";
			}
		 })
	   })
       ;
	 // 修改完成
	$("#modifymessage").on("click",function(){
			if($("#brdate").val()==""){$.toast("请选择生日！");return}					
			var gender = $("#megenger").val()=="男"?0:1;
			client.invoke("modifyInfo",[{"sex":gender,"birth":$("#brdate").val()}],function(result){
				var result = $.parseJSON(result);
				if(result.res == 1){																																															
					$.toast("修改完成！");
					setInterval(function(){
						 location.reload();
					},1500)
				}else{
					$.toast(result.msg);
				}
			});
		});
});
//修改登陆密码

function ModifyPassword(old,new1,new2){
	$.showIndicator();
	if(/^(.){6,20}$/.test(old)&& /^(.){6,20}$/.test(new1) &&/^(.){6,20}$/.test(new2)){
		if(new1 !=new2){
			$.toast("两次输入密码不一致!")}
		else if(old == new1){
			$.toast("不能与原密码相同！")
		}else{
		client.invoke("modifyPwd",[{"oripasswd":old,"passwd":new1}],function(result){
			$.hideIndicator();
			var result = $.parseJSON(result);
			if(result.res==1){
				$.toast("修改成功！");
				setTimeout(function(){
					window.location.href = "/templets/gerenzhongxin/personMessage/editmessage.html";
				},1500)
			}	else{
				$.toast(result.msg);
			}
		})
		}
	}else{
		$.toast("密码格式不正确！")
	}
}
	
$(document).on("pageInit","#modifypwd",function(e,id,page){
	$("#confirmmodifypwd").on("click",function(){
		ModifyPassword($("#mobile").val(),$("#password1").val(),$("#password2").val());
	})
})
//修改安全密码
$(document).on("pageInit","#modifysecpwd",function(e,id,page){		
	$("#confirmmodifysecpwd").on("click",function(){
		ModifyPassword($("#secmobile").val(),$("#secpassword1").val(), $("#secpassword2").val());
	});
});

//  反馈信息
$(document).on("pageInit","#yijianfankui",function(e,id,page){	
	 $("#tjfk").on("click",function(){
        if(!$("#fk-fklx").val()){
        	$.toast("请选择反馈类型！");
        }
        else if(!$(".yijian-text").val()){
    	    $.toast("请输入反馈内容！");
        }
        else{
        	client.invoke("getFKTypeLists",function(result){
	    	var result = $.parseJSON(result);
      		});
	        var fklx = {"内容问题":1,"播放问题":2,"卡顿问题":3,"会员问题":4,"账号问题":5,"闪退、页面加载问题":6,"产品意见":7}
	        client.invoke("addFkMsg",[{"type":fklx[$("#fk-fklx").val()],"content":$(".yijian-text").val(),"contact":$(".liuyan-input").val()}],function(result){
	           var result = $.parseJSON(result);
	           if(result.res == 1){
	    	       $.toast("已收到您的反馈！");
	    	       setTimeout(function(){
	    		       window.location.href = "/templets/gerenzhongxin/personmessage.html";
	    	        },1500);
	            }
	        });
	    }
      
     });    
});


//修改用户名
$(document).on("pageInit","#changename",function(e,id,page){
	$.showIndicator();
	client.invoke("getUserInfo",function(result){
			$.hideIndicator();
		var result  = $.parseJSON(result);
		if(result.res == 1){
			if(result.data.username){
				$("#cname").val(result.data.username);
			}else{
				$("#cname").val(result.data.mobile);
			}			
		}else{
			$.toast(result.msg);
		}
	});
	
	// 点击修改
	$("#chname").on("click",function(){
			
	  if($("#cname").val()){
	  		$("#chname").on("click",function(){
		    if($("#cname").val().length<6 || $("#cname").val().length>20 || containSpecial($("#cname").val())){
				    $.toast("请按提示重新输入！");
				}
			})	 
			function containSpecial(s)      
			{      
			    var containSpecial = RegExp(/[(\ )(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\-)(\_)(\+)(\=)(\[)(\])(\{)(\})(\|)(\\)(\;)(\:)(\')(\")(\,)(\.)(\/)(\<)(\>)(\?)]/);      
			    return ( containSpecial.test(s) );      
			} 
	  	$.showIndicator();
	  	client.invoke("modifyInfo",[{"username":$("#cname").val()}],function(result){
	  		$.hideIndicator();
	  		var result = $.parseJSON(result);
	  		if(result.res == 1){
	  			$.toast("修改成功");
	  			setTimeout(function(){
	  				window.location.href="./editmessage.html";
	  			},1000)
	  		}else{
	  			$.toast(result.msg);
	  		}
	  	});
	  }
    });
});
//修改手机号

$(document).on("pageInit","#modifynumber",function(e,id,page){	
	$("#bk-huoqu").on("click",function(){		
		if(/^1(3|5|7|8)\d{9}$/.test($("#new-phone").val()) && /^1(3|5|7|8)\d{9}$/.test( $("#old-phone").val()) &&/^(.){6,20}$/.test($("#old-passwd").val())){					
		client.invoke("sendCode",[{"mobile":$("#new-phone").val(),"orimobile":$("#old-phone").val(),"oripasswd":$("#old-passwd").val()}],function(result){
			var result = $.parseJSON(result);
			if(result.res == 1){
		    $("#bk-huoqu").hide();
			$("#bk-yifa").show();
		    $.toast("验证码已发送到您的手机！")
		     mytime = setInterval(timeIn1,1000)	
			}else{
				$.toast(result.msg);
			}
		});
     }else{
     	$.toast("请填写正确的手机号或密码");
     }
	});	
    $("#modifymobile").on("click",function(){
    	if($("#old-phone").val() &&  $("#old-passwd").val() &&  $("#new-phone").val() && $("#Captcha").val()){   		    	
		  client.invoke("modifyMobile",[{"orimobile":$("#old-phone").val(),"oripasswd":$("#old-passwd").val(),"mobile":$("#new-phone").val(),"code":$("#Captcha").val()}],function(result){
			var result = $.parseJSON(result);
			if(result.res == 1){
				$.toast("修改成功！")
			}else{	
				$.toast(result.msg);
			};
		});
	   }else{
	   	$.toast("项目不能为空！")
	   }
    });
});


//实名认证

$(document).on("pageInit","#modifysecpwd",function(e,id,page){	
    $("#shiming").on("click",function(){
    if(!$("#realname").val()){
    	$.toast("请输入姓名");
    }else if(!$("#testid").val()){
    	$.toast("请输入身份证号");
    }else if($("#testid").val().length != 18){
    	$.toast("请输入18位身份证号");
    }else{
    	client.invoke("certification",[{"truename":$("#realname").val(),"cardid":$("#testid").val()}],function(result){
  		var result = $.parseJSON(result);
  		if(result.res == 1){
  			$.toast("您已通过实名认证！");
  		    setTimeout(function(){
  		    	window.location.href = "/templets/gerenzhongxin/personMessage/editmessage.html";
  		    },1500)
  		}else{
  			$.toast(result.msg);
  		}
  	});
    }
  	
  });
});

// 推荐好友
$(document).on("pageInit","#tuijianYouli",function(e,id,page){
	
	//二维码生成
	 var qrcode = new QRCode(document.getElementById("tj-erwei"), {});
//   var uniquemark = Cache.get("uniquemark") || null;
     if(!uniquemark){
        	client.invoke("getUserInfo",function(result){
        		var result = $.parseJSON(result);
        		if(result.res==1){
        			Cache.set("uniquemark",result.data.unique);
        			uniquemark = result.data.unique;
        			 qrcode.makeCode("http://v.7cai.tv"+"?unique="+uniquemark); 
        		}
        	});
        }else{          	       
	     qrcode.makeCode("http://v.7cai.tv"+"?unique="+uniquemark); 
     }

    $("#sinashare").on("click",function(){
	window.location.href="http://service.weibo.com/share/share.php?appkey=&title="+link+"&url=&pic=&searchPic=false&style=simple" ;
    });  
  //点击复制链接1-1
    $("#share-link").on("click",function(){
   	$("#link-address div").html("http://v.7cai.tv"+"?unique="+uniquemark);
   	$("#link-address").show();
   	$("#link-address").on("click",function(){
   	 	$(this).hide();
   	 	})
   })	
});
 //好友页渲染1-1
 $(document).on("pageInit","#yqHaoyou",function(e,id,page){
  		client.invoke("getFriends",function(result){
  			var result = $.parseJSON(result);
  			if(result.res == 1){  				
				if(result.data.length>0){	
  				for(var m=0;m<result.data.length;m++){
  				var friend ='<div class="mid-90"><li class="yq-li"><div><img src="/images/touxiang1.png"/></div><div><p>'+result.data[m].username+'</p><p>'+ result.data[m].time+'</p></div></li></div>';
		        $("#yqHaoyou").prepend(friend);
  				}
			    }else{
  				 $("#yqHaoyou").prepend('<div class="box" id="box"><i class="iconfont icon-xiaoxizhongxin"></i><p>您还没有推荐好友~  赶快点击推荐吧</p></div>');
				}
  		}else{		
  				$.toast(result.msg);
  				setTimeout(function(){
  					window.location.href="./tuijianYouli.html";	
  				},1500)
  				
  			}
  		})
 });

 var getUrlVars = function() {
			 var vars = [],
				 hash;
			 var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
			 for (var i = 0; i < hashes.length; i++) {
				 hash = hashes[i].split('=');
				 vars.push(hash[0]);
				 vars[hash[0]] = hash[1];
			 }
			 return vars;
	}
      
$(document).on("pageInit", "#kaiHuiyuan", function(e, id, page) {
	$.showIndicator();
	client.invoke("getUserInfo",function(result){
		$.hideIndicator();
	 	var result = $.parseJSON(result);
	 	if(result.res == 1){
					if(result.data.imgurl){
						$("#khy-touxiang").attr("src",result.data.imgurl);
					}else{
						$("#khy-touxiang").attr("src","/images/touxiang-1.png");
					}
					if(result.data.username){
						$("#khy-mobile").html(result.data.username);
					}else{
						$("#khy-mobile").html(result.data.mobile);
					}
		    var isVIP = Cache.get("isVIP") || 0;
		 	if(!isVIP){
	 					 						
	 				Cache.set("isVIP",result.data.isVip);
	 				isVIP = result.data.isVip;
	 				if(isVIP == 1){
					// 已经是会员。		
					  $(".user-box").append('<span id="huiyuanlogo"><i class="iconfont icon-huangguan"></i> &nbsp;会员</span>');
						 $(".VIP").css("display","none");						
						}	 				
	 			}else{
			 		  $(".user-box").append('<span id="huiyuanlogo"><i class="iconfont icon-huangguan"></i> &nbsp;会员</span>');
								 $(".VIP").css("display","none");
			 	}
	 	}else{
	 		$.toast(result.msg);
	 		}
	 		
	 	
	}); 	
	 	
	 	
	 
	// 开通会员    1-1
	 var openid = Cache.get("openid")  || null;   	   
   	   if(!openid){
      		var code = getUrlVars()["code"] ||null;
	    	if(code){
	    		$.showIndicator();
		   		 client.invoke("getOpenId",[{"code":code}],function(result){
		   		 	$.hideIndicator();
		   			var result = $.parseJSON(result);
		   			if(result.res == 1){
		   				openid = result.data.openid;
		   				Cache.set("openid",result.data.openid);		   		     
		   			}else{
		   				$.toast(result.msg);
		   			}
		   		})
		   	}else{
		   		  window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx880f0e36a4befaf8&redirect_uri="+encodeURIComponent("http://v.7cai.tv/templets/gerenzhongxin/huiyuan/kaiHuiyuan.html")+"&response_type=code&scope=snsapi_base&state=1#wechat_redirect";
		    }
   		}		  	
   $("#kt-kaitong").on("click",function(){ 
   	   	  	if(openid){
   	   	  		$.showIndicator();
   	   	     	client.invoke("getPayOrderInfo",[{"amount":500,"type":"wx_pay_pub","subject":"超级会员VIP"}],function(result){
   	   	     		$.hideIndicator();
   	   	     		var result = $.parseJSON(result);
   	   	     		if(result.res == 1){
   	   	     			if(result.data.isPay == 1){   //可以支付状态
		   	   	        	 FUQIANLA.init({
								'appId': 'VWT0GaNzbX3Dqesop5zrOg', //应用ID号
								'merchId': 'm1610030006', //商户号
								'orderId': result.data.orderId, //订单号，此处为模拟订单号。具体以接入为准
								'channel': 'wx_pay_pub', //开通的通道简称
								'amount': '500', //支付金额
								'subject': '超级VIP会员', //商品标题
								'notifyUrl': result.data.notifyUrl, //异步支付结果通知地址
								'extra':{
									'openid': openid,
									'cb' : function(){
										$.toast("恭喜您，成功加入VIP会员！")
										 setTimeout(function(){
											window.location.href = "/";
										});
									}
								}
							});
     	   	     			}else{
     	   	     		     $.toast(result.msg);
     	   	     			}
   	   	     		}
   	   	     	})
   	   	  	}	  	   	 
   	   	  
   	   })
});



//前端交互，跳转
function test(){

//点击效果
$(".mytouch").on("touchstart",function(){
	$(this).addClass("myop");
})
$(".mytouch").on("touchend",function(){
	$(this).removeClass("myop");
})
//清除名称输入框
$("#name-guanbi").on("click",function(){
		$("#cname").val("");
	})
//选择性别
$("#megenger").on("click",function(e){
		
		var buttons = [
			{
				text:"男",
				onClick:function(){
					$("#megenger").val("男");
				}
			},
			{
				text:"女",
				onClick:function(){
					$("#megenger").val("女");
				}
			}
		]
		$.actions(buttons);
})


//编辑信息未保存返回
$("#meback").on("click",function(){
		$.confirm('您还未保存已修改的信息，确定现在要返回吗？',
		function(){
			history.back();
		},
		function(){
			
		}
		)
		
})
//头像弹出	

	//至尊页面跳转
		$("#zhizun").on("click",function(){
		window.location.href="http://v.7cai.tv/a/zhizunduxiang.html";
	})
	//注册跳转
	$("#user-re").on("click",function(){
			window.location.href="mobileRegist.html"
	})
	//找回密码跳转
	$("#forget-ps").on("click",function(){
			window.location.href="backpsword.html"
	})
	//更改手机号跳转
	$("#changemobile").on("click",function(){
			window.location.href="./ModifyMobile.html"
	})
	//编辑资料跳转	
	$("#p-message").on("click",function(){
			window.location.href="./personMessage/editmessage.html"
	})
	$("#hy-edit").on("click",function(){
			window.location.href="./personMessage/editmessage.html"
	})
	//更改名称跳转
	$("#c-username").on("click",function(){
			window.location.href="./changename.html"
	})
	//实名跳转
	$("#smrz").on("click",function(){
			window.location.href="./IdOccupied.html"
	})
	//安全密码跳转
	$("#c-secpsword").on("click",function(){
			window.location.href="./ModifySecPassword.html"
	})
	//登录密码跳转
	$("#c-lgpsword").on("click",function(){
			window.location.href="./ModifyPassword.html"
	})
	//推荐页跳转
	$("#tuijian-page").on("click",function(){
			window.location.href="./tuiJian/tuijianYouli.html"
	})
	//好友页
	$("#haoyou-page").on("click",function(){
			window.location.href="./nofriend.html"
	})
	//卡卷页
	$("#kajuan-page").on("click",function(){
			window.location.href="./wodekajuan/wodekajuan.html"
	})
	//在线电影卷
	$("#zxyhj-page").on("click",function(){
			window.location.href="zxyhj.html"
	})
	//门店卡卷
	$("#mendianyouhuiquan").on("click",function(){
			window.location.href="zxyhj.html"
	})
	//播放记录
	$("#bfjl-page").on("click",function(){
			window.location.href="./bofangJilu/bfjl-qs.html"
	})
	//信息中心
	$("#xxzx-page").on("click",function(){
			window.location.href="./xiaoxizhongxin/xiaoxizhongxin.html"
	})
	//系统消息
	$("#xitxx-page").on("click",function(){
			window.location.href="noxiaoxi.html"
	})
	//评论赞
	$("#pinglz-page").on("click",function(){
			window.location.href="noxiaoxi.html"
	})
	//我的电影票
	$("#wddyp-page").on("click",function(){
			window.location.href="./wodedianyingpiao/wddianyingpiao.html"
	})
	//影片分享按钮
	/*$("#button-fenxiang").click(function(){	
		$("#vp-fenxiang").fadeIn();
	})
	//分享关闭按钮
	$("#fenxiang-close").click(function(){
		$("#vp-fenxiang").fadeOut();
	})*/
	//删除地址按钮
	$("#deadd").on("click",function(){
		$.confirm('您确定要删除该地址吗？',
		function(){
			
		},
		function(){
			
		}
		)
		
	})
	//兑换商品按钮
	$(".lijiduihuan").on("click",function(){
		$.confirm('确定兑换此商品？',
		function(){
			$.toast("积分不足，无法兑换");
		},
		function(){
			
		}
	)		
	})
	$("#aa").on("click",function(){
			window.location.href="./AddAddress.html"
	})
	//编辑地址
	$(".edit-ad").on("click",function(){
			window.location.href="./editaddress.html"
	})	
	//会员页面
	$("#huiyuan-page").on("click",function(){
			window.location.href="./huiyuan/kaiHuiyuan.html"
	})
	$("#hytq").on("click",function(){
			window.location.href="./huiyuan/kaiHuiyuan.html"
	})
	//意见反馈
	$("#yjfk-page").on("click",function(){
			window.location.href="./yijianfankui/yijianfankui.html"
	})
	//设置
	$("#shezhi-page").on("click",function(){
			window.location.href="./shezhi/shezhi.html"
	})
	//视频收藏
	$("#spsc-page").on("click",function(){
			window.location.href="./shipinshoucang/ScVideoLack.html"
	})
	//开通会员页返回
	$("#huiyuan-back").on("click",function(){
			window.location.href="../gerenzhongxin/personmessage.html"
	})
	//我的积分
	$("#wdjf-page").on("click",function(){
			window.location.href="./wodejifen/MyPoints.html"
	});
	//我的订单
	$("#dingdan-page").on("click",function(){
			window.location.href="./wodedingdan/wodedingdan.html"
	});
	//首页
	$("#nav-shouye").on("click",function(){
		$.showIndicator();
		$("#nav-shouye span:nth-child(1)").addClass("icon-shouye-tianchong");
		$("#nav-shangcheng span:nth-child(1)").addClass("icon-shangcheng1");
		$("#nav-shangcheng span:nth-child(1)").removeClass("icon-shangcheng-tianchong");
		$("#nav-goupiao span:nth-child(1)").addClass("icon-goupiao1");
		$("#nav-goupiao span:nth-child(1)").removeClass("icon-goupiao-tianchong");
		$("#nav-faxian span:nth-child(1)").removeClass("icon-faxian-tianchong");
		$("#nav-wode span:nth-child(1)").addClass("icon-wode1");
		$("#nav-wode span:nth-child(1)").removeClass("icon-wode-tianchong");
		window.location.href="/"
	});
	//商城
	$("#nav-shangcheng").on("click",function(){
		$.showIndicator();
		$("#nav-shangcheng span:nth-child(1)").addClass("icon-shangcheng-tianchong");
		$("#nav-shouye span:nth-child(1)").removeClass("icon-shouye-tianchong");
		$("#nav-goupiao span:nth-child(1)").addClass("icon-goupiao1");
		$("#nav-goupiao span:nth-child(1)").removeClass("icon-goupiao-tianchong");
		$("#nav-faxian span:nth-child(1)").removeClass("icon-faxian-tianchong");
		$("#nav-wode span:nth-child(1)").addClass("icon-wode1");
		$("#nav-wode span:nth-child(1)").removeClass("icon-wode-tianchong");
		window.location.href="/templets/shangcheng/shangcheng.html"
	});
	//购票
	$("#nav-goupiao").on("click",function(){
		$.showIndicator();
		$("#nav-goupiao span:nth-child(1)").addClass("icon-goupiao-tianchong");
		$("#nav-shouye span:nth-child(1)").removeClass("icon-shouye-tianchong");
		$("#nav-shangcheng span:nth-child(1)").removeClass("icon-shangcheng-tianchong");	
		$("#nav-faxian span:nth-child(1)").removeClass("icon-faxian-tianchong");
		$("#nav-wode span:nth-child(1)").addClass("icon-wode1");
		$("#nav-wode span:nth-child(1)").removeClass("icon-wode-tianchong");
		window.location.href="/templets/goupiao/goupiao.html"
	});
	//发现
	$("#nav-faxian").on("click",function(){
		$.showIndicator();
		$("#nav-faxian span:nth-child(1)").addClass("icon-faxian-tianchong");
		$("#nav-shouye span:nth-child(1)").removeClass("icon-shouye-tianchong");
		$("#nav-shangcheng span:nth-child(1)").removeClass("icon-shangcheng-tianchong");
		$("#nav-goupiao span:nth-child(1)").addClass("icon-goupiao1");
		$("#nav-goupiao span:nth-child(1)").removeClass("icon-goupiao-tianchong");
		$("#nav-wode span:nth-child(1)").addClass("icon-wode1");
		$("#nav-wode span:nth-child(1)").removeClass("icon-wode-tianchong");
		window.location.href="/templets/faxian/faxian.html"
	});
	//我的样式
	$("#nav-wode").on("click",function(){
		$("#nav-wode span:nth-child(1)").removeClass("icon-wode1");
		$("#nav-wode span:nth-child(1)").addClass("icon-wode-tianchong");
		$("#nav-shouye span:nth-child(1)").removeClass("icon-shouye-tianchong");
		$("#nav-shangcheng span:nth-child(1)").removeClass("icon-shangcheng-tianchong");
		$("#nav-goupiao span:nth-child(1)").addClass("icon-goupiao1");
		$("#nav-goupiao span:nth-child(1)").removeClass("icon-goupiao-tianchong");
		$("#nav-faxian span:nth-child(1)").removeClass("icon-faxian-tianchong");	
	});
	//首页消息
	$("#syxiaoxi-page").on("click",function(){
			window.location.href="/templets/gerenzhongxin/xiaoxizhongxin/xiaoxizhongxin.html"
	});
	//首页记录
	$("#syjilu-page").on("click",function(){
			window.location.href="/templets/gerenzhongxin/bofangjilu/bfjl-qs.html"
	});
	//条款跳转
	$(".tiaokuan-tiaozhuan").on("click",function(){
			window.location.href="./agreement.html";
	})
	//选择框
	$(".label-switch").on("click",function(){
		if($(this).children("input").attr("checked") == "checked"){
			$(this).children("input").attr("checked",false);
			$(this).children("div").removeClass("bg-ff8");
			$(this).children("div").addClass("bg-f5");
		}else{
			$(this).children("input").attr("checked",true);
			$(this).children("div").removeClass("bg-f5");
			$(this).children("div").addClass("bg-ff8");
		}
	});
	//选择地区
	$("#ad-ad-arpicker").on("click",function(e){	
		e.preventDefault();
		$("#ad-ad-arpicker").cityPicker({
		toolbarTemplate: '<header class="bar bar-nav">\
						    <button class="button button-link pull-right close-picker">确定</button>\
						    <h1 class="title">选择地区</h1>\
						    </header>'
		})
	});
	//选择地区-编辑地址
	$("#chosearea").on("click",function(e){
		e.preventDefault();
		$("#chosearea").cityPicker({
		toolbarTemplate: '<header class="bar bar-nav">\
						    <button class="button button-link pull-right close-picker">确定</button>\
						    <h1 class="title">选择地区</h1>\
						    </header>'
		});
	})
	//圆圈勾选
//	$(".my-select").on("click",function(){
//		$(this).toggleClass("bg-myse");
//		$(this).attr("checked",!$(this).attr("checked"));
//	})
	//文本展开
	$(".tk-open").on("click",function(){
		$(this).toggleClass("icon-up");
		$(this).toggleClass("icon-down");
		$(this).parent().siblings().toggleClass("danhang");
	})
	//反馈问题选择
	$("#fk-fklx").picker({
		toolbarTemplate: '<header class="bar bar-nav border-no">\
		  <button class="button button-link pull-left no-border"><span class="color-gray"></span></button>\
		  <button class="button button-link pull-right close-picker color-f60"><span class="color-f60">确定</span></button>\
		  </header>',
		  cols: [
		    {
		      textAlign: 'center',
		      values: ['内容问题', '播放问题', '卡顿问题', '会员问题', '账号问题', '闪退、页面加载问题', '产品意见']
		    }
		  ]
	});	
	//退款原因选择
	$("#tuikuanyuanyin").picker({
		toolbarTemplate: '<header class="bar bar-nav border-no">\
		  <button class="button button-link pull-left no-border"><span class="color-gray"></span></button>\
		  <button class="button button-link pull-right close-picker color-f60"><span class="color-f60">确定</span></button>\
		  </header>',
		  cols: [
		    {
		      textAlign: 'center',
		      values: ['内容问题', '播放问题', '卡顿问题', '会员问题', '账号问题', '闪退、页面加载问题', '产品意见']
		    }
		  ]
	});

	//退票按钮
	$(".mybutton-2").on("click",function(){
		$.confirm('确定要放弃观看电影吗？',
		function(){
			window.location.href="wddyp-tp.html"
		},
		function(){
			
		}
		)
	});
	//分页点击效果
	$(".list-module").mousedown(function(){
		$(this).addClass("mouselight");
	});
	$(".list-module").mouseup(function(){
		$(this).removeClass("mouselight");
	});

//清空搜索记录
$("#qingkongjilu").on("click",function(){
	$(".sousuo-list ul li").remove();
})
//影片分享按钮
$("#button-fenxiang").on("click",function(){
	$("#vp-fenxiang").fadeIn();
})
//分享关闭按钮
$("#fenxiang-close").on("click",function(){
	$("#vp-fenxiang").fadeOut();
})
//搜索返回
$("#sousuo-quxiao").on("click",function(){
	console.log("1");
	window.history.go(-1);
})
//查看更多
//$(".chakangengduo").on("click",function(){
//	window.location.href="http://v.7cai.tv/plus/list.php?tid=8";
//})
// JavaScript Document<script>
$(".vpl_Collection").on("click",function()
{	
	if($(".vpl_Collection").attr('index')=="1")
		{
			$(".vpl_Collection").removeClass("icon-weishoucang");
			$(".vpl_Collection").addClass("icon-yishoucang");
			$(".vpl_Collection").css("color","#ff8c24");
			$(".vpl_Collection").attr("index","2");
			$.toast("收藏成功");
		}
		else
		{
			$(".vpl_Collection").removeClass("icon-yishoucang");
			$(".vpl_Collection").addClass("icon-weishoucang");
			$(".vpl_Collection").css("color","#383838");
			$(".vpl_Collection").attr("index","1");
			$.toast("取消收藏");
		}		
		});
		$(".vpl_introduction").on("click",function()
		{	
			$(".vpl_VideoDetail_member").toggle();
			$(".vpl_introduction").toggleClass("icon-up");
			
		});
		$(".vpl_slidemore_go").on("click",function(){
					$(".vpl_box_remonforyou").show();
					$(".vpl_middleline").hide();
					$(".vpl_VideoDetail").hide();
					$(".vpl_remonForyou").hide();
					$(".vpl_remonForyou_list").hide();
					$(".vpl_coment_section").hide();
					$(".vpl_remonForyou2").show();
					$(".vpl_remonForyou_list2").show();
			})
			$(".vpl_remonForyou_close").on("click",function(){
					$(".vpl_box_remonforyou").hide();
					$(".vpl_middleline").show();
					$(".vpl_VideoDetail").show();
					$(".vpl_remonForyou").show();
					$(".vpl_remonForyou_list").show();
					$(".vpl_coment_section").show();
					$(".vpl_remonForyou2").hide();
					$(".vpl_remonForyou_list2").hide();
			})
						
function noscroll(){
    	var content = document.querySelector('.content') || null;
		var startY;
		
		if(content){
			content.addEventListener('touchstart', function (e) {
		    startY = e.touches[0].clientY;
		});
		
			content.addEventListener('touchmove', function (e) {
			    // 高位表示向上滚动
			    // 底位表示向下滚动
			    // 1容许 0禁止
			    var status = '11';
			    var ele = this;
			
			    var currentY = e.touches[0].clientY;
			
			    if (ele.scrollTop === 0) {
			        // 如果内容小于容器则同时禁止上下滚动
			        status = ele.offsetHeight >= ele.scrollHeight ? '00' : '01';
			    } else if (ele.scrollTop + ele.offsetHeight >= ele.scrollHeight) {
			        // 已经滚到底部了只能向上滚动
			        status = '10';
			    }
			
			    if (status != '11') {
			        // 判断当前的滚动方向
			        var direction = currentY - startY > 0 ? '10' : '01';
			        // 操作方向和当前允许状态求与运算，运算结果为0，就说明不允许该方向滚动，则禁止默认事件，阻止滚动
			        if (!(parseInt(status, 2) & parseInt(direction, 2))) {
			            e.preventDefault();
			        }
			    }
			});
		}
		
    }
noscroll();

}

test();
$.init();
