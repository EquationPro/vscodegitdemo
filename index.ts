// // //ts定义方法
// // function printLabel():void{

// // }
// // printLabel();

// // //ts定义方法传入参数
// // function printLabel1(label:string):void{
// //     console.log("printLabel")
// // }
// // printLabel1("hahah");

// // //ts中自定义方法传入参数  对json进行约束
// // //labelInfo: {} 代表要求labelInfo是一个对象 
// // //labelInfo: {label:string}代表要求这个labelinfo对象中要有一个为string的label属性 
// // function printLabel2(labelInfo:{label:string}):void{

// // }
// // printLabel2({label:"hahaha"});
 
// //对批量方法进行约束   =》 通过接口来实现    
// //属性接口 就是对传入对象的约束
// interface FullName{
//       firstName:string; //同java 以分号结束
//       secondName:string;
// }
// function printName(name:FullName){
//   console.log(name.firstName + "--" + name.secondName);
// }

// function printInfo(info:FullName){
//   console.log(info.firstName + "-second-" + info.secondName);
// }

// // printName({firstName:'z',secondName:"s",})   //此写法要求只能传入两个属性，完全符合接口要求
// let obj={
//   age:20,
//   firstName: 'z', 
//   secondName: "s"
// }
// printName(obj)   //此写法先定义对象，在传入对象，本写法只要求传进来的对象中存在接口中的定义的两个属性就可以，可以大于   ===》相当于传入实现接口的实现类

// printInfo(obj)

// interface FullName2{
//   firstName:string;
//   secondName?:string;  //可选参数
// }
// function getName2(name:FullName2){

// }
// getName2({firstName:"fff"})  


// //ajax例子
//  $.ajax({
//    type:'get',
//    url:"test.json",
//    data:{username:$("#username").val(),content:$("#content").val()},
//    dataType:"json"
//  })

//ts封装ajax例子
// interface Config{
//   type:string;
//   url:string;
//   data?:string;
//   dataType:string;
// }

// function ajax(config:Config){
//   var xhr=new XMLHttpRequest();
//   xhr.open(config.type,config.url,true);
//   xhr.send(config.data);
//   xhr.onreadystatechange=function(){
//     if(xhr.readyState==4 && xhr.status==200){
//        console.log("成功")
//        if(config.dataType=='json'){
//          console.log(JSON.parse(xhr.responseText))
//        }else{
//          console.log(xhr.responseText)
//        }
//     }
//   }
// }
// ajax({
//   type: "get",
//   url: "http://a.itying.com/api/productlist",
//   data: 'name=zhangsan',
//   dataType: 'json'
// })


//函数类型接口：对方法传入的参数 以及返回值进行约束
//加密的函数类型接口
// interface encrypt{
//   (key:string,value:string):string;
// }

// let md5:encrypt=function(aKey:string,bValue:string){
//   return aKey+bValue;
// }

// console.log(md5("name","zhangsan")); 

// let sha1: encrypt = function (aKey: string, bValue: string) {
//   return aKey + "-----"+ bValue;
// }

// console.log(sha1("name", "lisi")); 


//可索引接口：数组/对象的约束(不常用)
 //原先定义数组的方式
// var arr:number[]=[123,546]
// var arr1:Array<string>=['123',"asdd"]
//  //对数组的约束
// interface UserArr{
//   //index索引值必须为number ,对应值为string  如[123,123]则不为string错误
//   [index:number]:string;
// }
// var arr:UserArr=["aaa","bbb"]
// console.log(arr[0])
// //对对象的约束(少用)
// interface UserObj{
//   [index:string]:string;
// }
// var obj:UserObj={name:"张三",age:"sex"}



//类类型接口：对类的约束 类似于抽象类  （包含了属性接口和方法接口）
// interface Animal {
//   //属性接口
//   name:string;
//   //方法接口
//   eat(str:string):void;
// }

// class Dog implements Animal {
//   name:string;
//   constructor(name:string){
//     this.name=name;
//   }
//   eat(str:string){
//     console.log(this.name+"吃粮食")
//     console.log(str+"吃粮食")
//   }
// }

//  var d=new Dog("小黑");
// d.eat("小灰");

// class Cat implements Animal {
//   name: string;
//   constructor(name: string) {
//     this.name = name;
//   }
//   eat(food:string) {
//     console.log(this.name + "吃" +food)
//   }
// }

// var c = new Cat("小花");
// c.eat("老鼠");

//接口扩展：接口可以继承接口
// interface Animal {
//   eat():void;
// }
// interface Person extends Animal{
//    work():void;
// }
// class Programmer {
//   public name: string;
//   constructor(name: string) {
//     this.name = name;
//   }
//   coding(code: string) {
//     console.log(this.name + code)
//   }
// }
// class  Web extends Programmer implements Person {
//   constructor(name:string){
//     super(name); 
//   }
//   eat(): void {
//     console.log(this.name+"喜欢吃馒头")
//   }
//   work(): void {
//     console.log(this.name+"写代码")
//   }
// }
// var w=new Web("小李");
// w.eat();
// w.work();
// w.coding("写ts代码");


//泛型
//只能返回string类型的数据
// function getData(value:string):string{
//   return value;
// }
// //同时可以string类型和number类型  重载（多个方法）=》泛型本质就是编译器把代码编译成重载中的方法
// //1.重载多个方法=》代码冗余
// //2.返回any类型 => 放弃了类型检查
// function getDataAny(value:any):string{
//   return value;
// }
// //3.传入什么类型，返回什么类型 泛型方法
// //T标识泛型，具体什么类型是调用这个方法的时候决定的
// function getDataT<T>(value:T):T{
//   return value;
// }
// getDataT<number>(123);

//泛型类
// class MinClass<T> {
//   public list: T[] = [];
//   // constructor(list:number[]){
//   //   this.list=list;
//   // }
//   add(value: T) {
//     this.list.push(value);
//   }

//   min(): T {
//     var minNum = this.list[0];
//     for (var i = 0; i < this.list.length; i++) {
//       if (minNum > this.list[i]) {
//         minNum = this.list[i];
//       }
//     }
//     return minNum;
//   }
// }
// //实例化类，并且指定了类的T代表的类型为number
// var m1 = new MinClass<number>();
// m1.add(7);
// m1.add(223);
// m1.add(27);
// m1.add(3);
// alert(m1.min())

// var m2=new MinClass<string>();
// m2.add("x");
// m2.add("c");
// m2.add("d");
// alert(m2.min())

//4.泛型接口

//函数接口
// interface ConfigFnFun{
//   (value1:string,value2:string):string;
// }
// var setDataFun:ConfigFnFun=function(a:string,b:string):string{
//   return a+b;
// }
// setDataFun("name","zhangsan")

// //（1）第一种方法定义泛型接口
// interface ConfigFn {
//   <T>(value:T):T;
// }
// var getData:ConfigFn=function <T>(value:T):T{
//   return value;
// }
// getData<string>("20");
// （2）第二种方法定义泛型接口
// interface ConfigFn2<T> {
//   (value: T): T;
// }
// function getData2<T>(value: T): T {
//   return value;
// }
// var myGetData: ConfigFn2<string> = function<T>(value: T): T {
//   return value;
// };
// console.log(myGetData("20"));


//把类当作参数的泛型类
// class User{
//   username:string |undefined;
//   password:string |undefined;
// }

// class MysqlDb{
//   add(user:User):boolean{
//     console.log(user);
//     return true;
//   }
// }

// var u =new User();
// u.username="zhangsan";
// u.password="123456";

// var Db=new MysqlDb();
// Db.add(u);

// class ArticleCate {
//   title: string | undefined;
//   desc: string | undefined;
//   status:number |undefined;
// }

// class MysqlDb {
//   add(info: ArticleCate): boolean {
//     console.log(info);
//     return true;
//   }
// }

// var a = new ArticleCate();
// a.title="国内";
// a.desc="国内新闻";
// a.status=1;

// var Db = new MysqlDb();
// Db.add(a);

//用泛型类可以避免mysqldb的重复封装
//操作数据库的泛型类
// class MysqlDb<T> {
//   add(info: T): boolean {
//     console.log(info);
//     return true;
//   }
//   update(info:T,id:number):boolean{
//     console.log(info,id);
//     return true;
//   }
// }
// //想给user表增加数据
// //定义一个user类和数据库字段进行映射
// class User{
//   username:string |undefined;
//   password:string |undefined;
// }
// var u=new User();
// u.username="张三";
// u.password="123456";

// var Db=new MysqlDb<User>();
// Db.add(u);
// //定义一个ArticleCate类和数据库字段进行映射
// class ArticleCate {
//   title: string | undefined;  //或undefined可以令这个参数不需要初始化
//   desc: string | undefined;
//   status:number |undefined;
//   constructor(params: {    //用params来对传入参数进行校验
//     title: string | undefined,
//     desc: string | undefined,
//     status?: number | undefined
//   }){
//       this.title=params.title;
//       this.desc=params.desc;
//       this.status=params.status;
//   }

// }
// var a=new ArticleCate({
//   title:"分类",
//   desc:"111",
// });
// //把类当成参数的泛型类
// var Db2=new MysqlDb<ArticleCate>();
// Db2.add(a);
// Db2.update(a,2)


//例子，定义一个操作数据库的库，支持mysql和mssql和mongodb
//需要约束规范所以要定义接口，需要代码重用所以用到泛型
// interface DBI<T>{
//   add(info:T):boolean;
//   update(info:T,id:number):boolean;
//   delete(id:number):boolean;
//   get(id:number):any[];
// }
// //定义一个操作mysql数据库的类  //注意 要实现泛型接口 这个类也应该是一个泛型类
// class MysqlDb<T> implements DBI<T>{
//   constructor(){
//     console.log("数据库建立连接"); //实例化时进行数据库连接
//   }
//   add(info: T): boolean {
//     console.log(info);
//     return true;
//   }
//   update(info: T, id: number): boolean {
//     throw new Error("Method not implemented.");
//   }
//   delete(id: number): boolean {
//     throw new Error("Method not implemented.");
//   }
//   get(id: number): any[] {
//     var list=[
//       {
//         title:'xxx1',
//         desc:"xxxxx1v"
//       },
//       {
//         title:"xxx2",
//         desc:"xxxxx2v"
//       }
//     ]
//     return list;
//   }
// }
// //定义一个操作mssql数据库的类
// class MssqlDb<T> implements DBI<T>{
//   constructor() {
//     console.log("数据库建立连接"); //实例化时进行数据库连接
//   }
//   add(info: T): boolean {
//     console.log(info);
//     return true;
//   }
//   update(info: T, id: number): boolean {
//     throw new Error("Method not implemented.");
//   }
//   delete(id: number): boolean {
//     throw new Error("Method not implemented.");
//   }
//   get(id: number): any[] {
//     var list = [
//       {
//         title: 'xxx1',
//         desc: "xxxxx1v"
//       },
//       {
//         title: "xxx2",
//         desc: "xxxxx2v"
//       }
//     ]
//     return list;
//   }
// }
// //操作用户表，定义一个User类和数据库表字段做映射
// class User {
//   username:string|undefined;
//   password:string|undefined;
// }
// var u=new User();
// u.username="张三";
// u.password="123456789";
// //使用mysqldb类
// var oMysql=new MysqlDb<User>();
// oMysql.add(u);
// //使用mssqldb类
// var oMssqldb=new MssqlDb<User>();
// oMysql.add(u);
// var data=oMssqldb.get(4);
// console.log(data)

import { getData as get,save,dbUrl } from './modules/db'; 
//import get from './modules/db'; 
get();
save();
console.log(dbUrl)