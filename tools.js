function removeDuplicatePairs(arr) {
    
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (
                (arr[i][0] === arr[j][1] && arr[i][1] === arr[j][0]) 
                || (arr[i][0] === arr[j][0] && arr[i][1] === arr[j][1])
            ) {
                arr.splice(j, 1);
                j--;
            }
        }
    }
}