// making a function that will create a delay to make things asynchronous

export function delay(ms){
	return new Promise((resolve)=> setTimeout(resolve,ms))
}

export function createDataTree(dataset){
	let hashTable = Object.create(null);
	dataset.forEach(a=> hashTable[a.id] = {...a,childNodes:[]})
	let dataTree = []
	dataset.forEach(a=>{
		if(a.parentId) hashTable[a.parentId].childNodes.push(hashTable[a.id])
		else dataTree.push(hashTable[a.id])
	})
	return dataTree;
}
// export function delay(ms){
// 	return new Promise((resolve,reject)=>{
// 		setTimeout(()=>{
// 			resolve
// 		},ms)
// 	})
// }