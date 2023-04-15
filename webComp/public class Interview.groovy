public class Interview
{

 

    // This function takes a double, x, and a positive integer n, and calculates the sum
    //     1       2      3             n
    //    x   +   x   +  x   + ..... + x

    // you can assume that x below will be >=1 (i.e. never negative or zero)
    // you can assume that n below will be >=1 (i.e. never negative or zero)

    public decimal CalculateSum(double x, int n)
    {
        try {
            decimal sum = 0.0;
            for(i = 1; i  <= n; i++){
                decimal mult = 1;
                    for(y = 1; y  <= i; y++){
                        mult *= x;
                    }
                  sum += mult;
            }          
             return sum;
        } catch ( Exceptione ex){
            Console.WriteLine("Number to big" + ex.Message);
        }
    }
}