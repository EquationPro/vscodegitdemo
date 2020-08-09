 var dbUrl="xxxx";

 function getData():any[]{
  console.log("获取数据库的数据")
  return [{title:"x1"},{title:"x2"}]
}
 function save(){
  console.log("保存数据成功");
}
// 1.可在上方分别export export var dbUrl="xxxx";；export function xx(){}
//2.统一在对象中进行暴露  export {dbUrl,getData,save}
// 3.export default 默认导出
// 每个模块都可以有一个default导出，默认导出使用default关键字标记，并且一个模块只能够有一个default导出
// export default getData;

export {dbUrl,getData,save}

