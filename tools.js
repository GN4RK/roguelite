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

function mulberry32(a) {
    return function() {
        let t = a += 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
}
