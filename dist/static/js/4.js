webpackJsonp([4],{193:function(e,t,o){o(235);var s=o(0)(o(212),o(246),null,null);e.exports=s.exports},212:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=o(44),n=o.n(s);t.default={name:"personal_index",data:function(){var e=this;return{userForm:{name:"",cellphone:"",company:"",department:""},uid:"",securityCode:"",phoneHasChanged:!1,save_loading:!1,identifyError:"",editPasswordModal:!1,savePassLoading:!1,oldPassError:"",identifyCodeRight:!1,hasGetIdentifyCode:!1,canGetIdentifyCode:!1,checkIdentifyCodeLoading:!1,inforValidate:{name:[{required:!0,message:"请输入姓名",trigger:"blur"}],cellphone:[{required:!0,message:"请输入手机号码"},{validator:function(e,t,o){/^1[0-9]{10}$/.test(t)?o():o(new Error("请输入正确格式的手机号"))}}]},editPasswordForm:{oldPass:"",newPass:"",rePass:""},passwordValidate:{oldPass:[{required:!0,message:"请输入原密码",trigger:"blur"}],newPass:[{required:!0,message:"请输入新密码",trigger:"blur"},{min:6,message:"请至少输入6个字符",trigger:"blur"},{max:32,message:"最多输入32个字符",trigger:"blur"}],rePass:[{required:!0,message:"请再次输入新密码",trigger:"blur"},{validator:function(t,o,s){o!==e.editPasswordForm.newPass?s(new Error("两次输入密码不一致")):s()},trigger:"blur"}]},inputCodeVisible:!1,initPhone:"",gettingIdentifyCodeBtnContent:"获取验证码"}},methods:{getIdentifyCode:function(){var e=this;this.hasGetIdentifyCode=!0,this.$refs.userForm.validate(function(t){if(t){e.canGetIdentifyCode=!0;var o=60,s=setInterval(function(){o>=0?(e.gettingIdentifyCodeBtnContent=o+"秒后重试",o-=1):(clearInterval(s),e.gettingIdentifyCodeBtnContent="获取验证码",e.canGetIdentifyCode=!1)},1e3);e.inputCodeVisible=!0}})},showEditPassword:function(){this.editPasswordModal=!0},cancelEditUserInfor:function(){this.$store.commit("removeTag","ownspace_index"),localStorage.pageOpenedList=n()(this.$store.state.app.pageOpenedList);var e="";e=this.$store.state.app.pageOpenedList.length>1?this.$store.state.app.pageOpenedList[1].name:this.$store.state.app.pageOpenedList[0].name,this.$router.push({name:e})},saveEdit:function(){var e=this;this.$refs.userForm.validate(function(t){t&&(e.phoneHasChanged&&e.userForm.cellphone!==e.initPhone?e.hasGetIdentifyCode?e.identifyCodeRight?e.saveInfoAjax():e.$Message.error("验证码错误，请重新输入"):e.$Message.warning("请先点击获取验证码"):e.saveInfoAjax())})},cancelEditPass:function(){this.editPasswordModal=!1},saveEditPass:function(){var e=this;this.$refs.editPasswordForm.validate(function(t){t&&(e.savePassLoading=!0)})},init:function(){this.userForm.name="Lison",this.userForm.cellphone="17712345678",this.initPhone="17712345678",this.userForm.company="TalkingData",this.userForm.department="可视化部门"},cancelInputCodeBox:function(){this.inputCodeVisible=!1,this.userForm.cellphone=this.initPhone},submitCode:function(){var e=this;this.checkIdentifyCodeLoading=!0,0===this.securityCode.length?this.$Message.error("请填写短信验证码"):setTimeout(function(){e.$Message.success("验证码正确"),e.inputCodeVisible=!1,e.checkIdentifyCodeLoading=!1},1e3)},hasChangePhone:function(){this.phoneHasChanged=!0,this.hasGetIdentifyCode=!1,this.identifyCodeRight=!1},saveInfoAjax:function(){var e=this;this.save_loading=!0,setTimeout(function(){e.$Message.success("保存成功"),e.save_loading=!1},1e3)}},mounted:function(){this.init()}}},226:function(e,t,o){t=e.exports=o(189)(),t.push([e.i,".own-space-btn-box{margin-bottom:10px}.own-space-btn-box button{padding-left:0}.own-space-btn-box button span{color:#2d8cf0;transition:all .2s}.own-space-btn-box button span:hover{color:#0c25f1;transition:all .2s}.own-space-tra{width:10px;height:10px;transform:rotate(45deg);margin-top:-6px;left:-3px;background-color:#fff;z-index:100}.own-space-input-identifycode-con,.own-space-tra{position:absolute;top:50%;box-shadow:0 0 2px 3px rgba(0,0,0,.1)}.own-space-input-identifycode-con{width:200px;height:100px;right:-220px;margin-top:-50px;border-radius:4px}","",{version:3,sources:["/Users/kongyanzhou/Desktop/kolstore/koldata/webpackFiles/src/components/admin/personal/personal.vue"],names:[],mappings:"AACA,mBACE,kBAAoB,CACrB,AACD,0BACI,cAAgB,CACnB,AACD,+BACM,cAAe,AACf,kBAAoB,CACzB,AACD,qCACM,cAAe,AACf,kBAAoB,CACzB,AACD,eACE,WAAY,AACZ,YAAa,AACb,wBAAyB,AAGzB,gBAAiB,AACjB,UAAW,AAEX,sBAAwB,AACxB,WAAa,CACd,AACD,iDARE,kBAAmB,AACnB,QAAS,AAGT,qCAA2C,CAa5C,AATD,kCAEE,YAAa,AACb,aAAc,AACd,aAAc,AAEd,iBAAkB,AAClB,iBAAmB,CAEpB",file:"personal.vue",sourcesContent:["\n.own-space-btn-box {\n  margin-bottom: 10px;\n}\n.own-space-btn-box button {\n    padding-left: 0;\n}\n.own-space-btn-box button span {\n      color: #2D8CF0;\n      transition: all .2s;\n}\n.own-space-btn-box button span:hover {\n      color: #0C25F1;\n      transition: all .2s;\n}\n.own-space-tra {\n  width: 10px;\n  height: 10px;\n  transform: rotate(45deg);\n  position: absolute;\n  top: 50%;\n  margin-top: -6px;\n  left: -3px;\n  box-shadow: 0 0 2px 3px rgba(0, 0, 0, 0.1);\n  background-color: white;\n  z-index: 100;\n}\n.own-space-input-identifycode-con {\n  position: absolute;\n  width: 200px;\n  height: 100px;\n  right: -220px;\n  top: 50%;\n  margin-top: -50px;\n  border-radius: 4px;\n  box-shadow: 0 0 2px 3px rgba(0, 0, 0, 0.1);\n}\n"],sourceRoot:""}])},235:function(e,t,o){var s=o(226);"string"==typeof s&&(s=[[e.i,s,""]]),s.locals&&(e.exports=s.locals);o(190)("0ff4ba28",s,!0)},246:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",[o("Card",[o("p",{attrs:{slot:"title"},slot:"title"},[o("Icon",{attrs:{type:"person"}}),e._v("\n            个人信息\n        ")],1),e._v(" "),o("div",[o("Form",{ref:"userForm",attrs:{model:e.userForm,"label-width":100,"label-position":"right",rules:e.inforValidate}},[o("FormItem",{attrs:{label:"用户名：",prop:"name"}},[o("div",{staticStyle:{display:"inline-block",width:"300px"}},[o("Input",{model:{value:e.userForm.name,callback:function(t){e.$set(e.userForm,"name",t)},expression:"userForm.name"}})],1)]),e._v(" "),o("FormItem",{attrs:{label:"手机号：",prop:"cellphone"}},[o("div",{staticStyle:{display:"inline-block",width:"204px"}},[o("Input",{on:{"on-keydown":e.hasChangePhone},model:{value:e.userForm.cellphone,callback:function(t){e.$set(e.userForm,"cellphone",t)},expression:"userForm.cellphone"}})],1),e._v(" "),o("div",{staticStyle:{display:"inline-block",position:"relative"}},[o("Button",{attrs:{disabled:e.canGetIdentifyCode},on:{click:e.getIdentifyCode}},[e._v(e._s(e.gettingIdentifyCodeBtnContent))]),e._v(" "),e.inputCodeVisible?o("div",{staticClass:"own-space-input-identifycode-con"},[o("div",{staticStyle:{"background-color":"white","z-index":"110",margin:"10px"}},[o("Input",{attrs:{placeholder:"请填写短信验证码"},model:{value:e.securityCode,callback:function(t){e.securityCode=t},expression:"securityCode"}}),e._v(" "),o("div",{staticStyle:{"margin-top":"10px","text-align":"right"}},[o("Button",{attrs:{type:"ghost"},on:{click:e.cancelInputCodeBox}},[e._v("取消")]),e._v(" "),o("Button",{attrs:{type:"primary",loading:e.checkIdentifyCodeLoading},on:{click:e.submitCode}},[e._v("确定")])],1)],1)]):e._e()],1)]),e._v(" "),o("FormItem",{attrs:{label:"登录密码："}},[o("Button",{attrs:{type:"text",size:"small"},on:{click:e.showEditPassword}},[e._v("修改密码")])],1),e._v(" "),o("div",[o("Button",{staticStyle:{width:"100px"},attrs:{type:"text"},on:{click:e.cancelEditUserInfor}},[e._v("取消")]),e._v(" "),o("Button",{staticStyle:{width:"100px"},attrs:{type:"primary",loading:e.save_loading},on:{click:e.saveEdit}},[e._v("保存")])],1)],1)],1)]),e._v(" "),o("Modal",{attrs:{closable:!1,"mask-closable":!0,width:500},model:{value:e.editPasswordModal,callback:function(t){e.editPasswordModal=t},expression:"editPasswordModal"}},[o("h3",{staticStyle:{color:"#2D8CF0"},attrs:{slot:"header"},slot:"header"},[e._v("修改密码")]),e._v(" "),o("Form",{ref:"editPasswordForm",attrs:{model:e.editPasswordForm,"label-width":100,"label-position":"right",rules:e.passwordValidate}},[o("FormItem",{attrs:{label:"原密码",prop:"oldPass",error:e.oldPassError}},[o("Input",{attrs:{placeholder:"请输入现在使用的密码"},model:{value:e.editPasswordForm.oldPass,callback:function(t){e.$set(e.editPasswordForm,"oldPass",t)},expression:"editPasswordForm.oldPass"}})],1),e._v(" "),o("FormItem",{attrs:{label:"新密码",prop:"newPass"}},[o("Input",{attrs:{placeholder:"请输入新密码，至少6位字符"},model:{value:e.editPasswordForm.newPass,callback:function(t){e.$set(e.editPasswordForm,"newPass",t)},expression:"editPasswordForm.newPass"}})],1),e._v(" "),o("FormItem",{attrs:{label:"确认新密码",prop:"rePass"}},[o("Input",{attrs:{placeholder:"请再次输入新密码"},model:{value:e.editPasswordForm.rePass,callback:function(t){e.$set(e.editPasswordForm,"rePass",t)},expression:"editPasswordForm.rePass"}})],1)],1),e._v(" "),o("div",{attrs:{slot:"footer"},slot:"footer"},[o("Button",{attrs:{type:"text"},on:{click:e.cancelEditPass}},[e._v("取消")]),e._v(" "),o("Button",{attrs:{type:"primary",loading:e.savePassLoading},on:{click:e.saveEditPass}},[e._v("保存")])],1)],1)],1)},staticRenderFns:[]}}});