function compute(input,output,count){
    var test = [input];
    if (count > 0){
        test = input;
    } else if (count > 4){
        return "No Solution";
    }
    var ne = [];
    var lang = ["1","2","3","4","5","6","7","8","9"];
    var ops = [" + ", " - "," / "," * "];
    var n = 1; 
    for(const a of test){
        for(const x of lang){
            for(const y of ops){
                ne.push(a + y + x);
            }
        }
    }
    for(const z of ne){
        if(eval(z) == output){
            return z + " = " + output;
        }
    }
    n++;
    test = ne;        
    count++;
    return compute(test,output,count);
}