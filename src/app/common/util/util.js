// making a function that will create a delay to make things asynchronous

export function delay(ms){
	return new Promise((resolve)=> setTimeout(resolve,ms))
}


// export function delay(ms){
// 	return new Promise((resolve,reject)=>{
// 		setTimeout(()=>{
// 			resolve
// 		},ms)
// 	})
// }