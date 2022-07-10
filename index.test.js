var _chain = require('./index');

function sum1(val) { return val + 1 };
function sum10(val) { return val + 10 };
function sum15(val) { return val + 15 };

var addLink = _chain.addLink;
var chain = _chain.chain;
var asyncChain = _chain.asyncChain;
var breakChain = _chain.breakChain;

test('should get the correct result from a chain of functions', function(){
    var result = chain();
    expect(result).toEqual(undefined);

    var result = chain(addLink(7));
    expect(result).toEqual(7);

    var result = chain(addLink(7), sum1, sum10, sum15);
    expect(result).toEqual(33);

    var result = chain(addLink(9), sum1, sum10, sum15);
    expect(result).toEqual(35);

    var result = chain(() => 7 + sum1(0), sum10, sum15);
    expect(result).toEqual(33);

    var result = chain(() => 9 + sum1(0), sum10, sum15);
    expect(result).toEqual(35);

    var result = chain(() => 7 + sum1(0), sum10, addLink(15), sum15);
    expect(result).toEqual(30);

    var result = chain(() => 9 + sum1(0), sum10, addLink(16), sum15);
    expect(result).toEqual(31);
});

test('should break the chain correctly', function(){
    var result = chain(addLink(7), sum1, sum10, breakChain, sum15);
    expect(result).toEqual(18);
    
    var result = chain(
      addLink(7),
      sum1,
      sum10,
      res => {
        if(res < 20){
          return breakChain
        }else{
          return res
        }
      },
      sum15
    );
    expect(result).toEqual(18);
    
    var result = chain(
      addLink(7),
      sum1,
      sum10,
      res => {
        if(res < 20){
          return breakChain(res)
        }else{
          return res
        }
      },
      sum15
    );
    expect(result).toEqual(18);
});

test('should get the correct result from an async chain of functions', async function(){
  var result = await asyncChain();
  expect(result).toEqual(undefined);

  var result = await asyncChain(addLink(7), sum1, sum10, sum15);
  expect(result).toEqual(33);

  var result = await asyncChain(addLink(9), sum1, sum10, sum15);
  expect(result).toEqual(35);

  var result = await asyncChain(() => 7 + sum1(0), sum10, sum15);
  expect(result).toEqual(33);

  var result = await asyncChain(() => 9 + sum1(0), sum10, sum15);
  expect(result).toEqual(35);

  var result = await asyncChain(() => 7 + sum1(0), sum10, addLink(15), sum15);
  expect(result).toEqual(30);

  var result = await asyncChain(() => 9 + sum1(0), sum10, addLink(16), sum15);
  expect(result).toEqual(31);

  var result = await asyncChain(
    addLink(10),
    async () => {
      const res1 = await new Promise(resolve => {
        setTimeout(() => {
          resolve(46)
        }, 2000)
      })
      return res1
    },
    sum10
  );
  expect(result).toEqual(56);

  var result = await asyncChain(
    async () => {
      const res1 = await new Promise(resolve => {
        setTimeout(() => {
          resolve(6)
        }, 2000)
      })
      return res1
    }
  );
  expect(result).toEqual(6);
});

test('should break the chain correctly in an async chain', async function(){
    var result = await asyncChain(addLink(7), sum1, sum10, breakChain, sum15);
    expect(result).toEqual(18);
    
    var result = await asyncChain(
      addLink(7),
      sum1,
      sum10,
      res => {
        if(res < 20){
          return breakChain
        }else{
          return res
        }
      },
      sum15
    );
    expect(result).toEqual(18);
    
    var result = await asyncChain(
      addLink(7),
      sum1,
      sum10,
      res => {
        if(res < 20){
          return breakChain(res)
        }else{
          return res
        }
      },
      sum15
    );
    expect(result).toEqual(18);
});

test('should get error when passing non-function arguments', function(){
  expect(() => {
    chain(15);
  }).toThrow(TypeError);
})

test('should get error when passing non-function arguments to an async chain', async function(){
  await expect(asyncChain(15))
    .rejects
    .toThrow(TypeError);
})