function addLink(val){
  return function(){
    return val
  };
}

function breakChain(val){
  return {
    val,
    $$$brkchn$$$: true
  }
}

function chain(...args) {
  var res = undefined

  for (let i = 0; i < args.length; i++) {
    var fn = args[i]

    if(typeof fn !== "function"){
      throw new TypeError("Arguments must all be functions.")
    }

    if(fn === breakChain){
      return res
    }

    var fnres = fn(res)

    if(fnres === breakChain){
      return res
    }

    res = fnres

    if(typeof res === "object" && !Array.isArray(res) && res !== null && res.$$$brkchn$$$){
      return res.val
    }
  }

  return res
}

async function asyncChain(...args) {
  var res = undefined

  for (let i = 0; i < args.length; i++) {
    var fn = args[i]

    if(typeof fn !== "function"){
      throw new TypeError("Arguments must all be functions.")
    }

    if(fn === breakChain){
      return res
    }

    var fnres;

    if(fn.constructor.name == "AsyncFunction"){
      fnres = await fn(res);
    } else {
      fnres = fn(res)
    }

    if(fnres === breakChain){
      return res
    }

    res = fnres
    
    if(typeof res === "object" && !Array.isArray(res) && res !== null && res.$$$brkchn$$$){
      return res.val
    }
  }

  return res
}

module.exports = { chain, asyncChain, addLink, breakChain };