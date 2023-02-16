
function compute(input,output,count,timeout,beta_in){
        var input_list = [input];
        if (count > 0){                                             // checks if first iteration through to deal with string/list parse issue
            input_list = input;
        }                                               
        if (timeout > 150){                                         // controls timeout through AST depth              
            return "No Solution Timeout Depth: " + (count+1);
        }          

        var next_equations = [];                                    // set of equations to evauate next (next level of the AST)

        var beta = beta_in;                                         // counter for prune function
        var lang = ["1","2","3","4","5","6","7","8","9"];           // list of terminals
        var ops = [" + ", " - "," / "," * "];                       // list of operators

        for(const a of input_list){
            for(const b of lang){
                for(const c of ops){
                    if (c == " / " || c == " * "){                  // adds paraenthesis for clearification
                        var test_value = ("(" + a + c + b + ")");
                    } else {
                        var test_value = (a + c + b);
                    }
                    var test_eval = eval(test_value);               
                    if (test_eval == output){                       // tests if eval gives desired output
                        return test_value + " = " + output + "<br><br>" + "   Depth of Search: " + (count+1);
                    } else if (test_eval > output){ 
                        if ((test_eval - output) < beta){           // prune if value does not decrease towards output value from previous closest value
                            beta = (test_eval - output);            // elminates equivalents in the process
                            next_equations.push(test_value);
                        }
                    } else {                
                        if((output - test_eval) < beta){            // prune if value does not increase towards output value from previous closest value
                            beta = (output - test_eval);            // eliminates equivalents in the process
                            next_equations.push(test_value);
                        }
                    }
                }
            }
        }
        count++;
        timeout++;
        return compute(next_equations,output,count,timeout,beta); 
}