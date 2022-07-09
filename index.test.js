var chain = require('./index');

function sum1(val) { return val + 1 };
function sum10(val) { return val + 10 };
function sum15(val) { return val + 15 };

test('should get correct result from sum functions', function(){
    var result = chain.chain(7, sum1, sum10, sum15);
    expect(result).toEqual(33);

    var result = chain.chain(() => 9, sum1, sum10, sum15);
    expect(result).toEqual(35);
});

test('should break in the middle of the chain', function(){
    var result = chain.chain(0, sum1, sum10, chain.breakChain());
    expect(result).toEqual(undefined);
});
