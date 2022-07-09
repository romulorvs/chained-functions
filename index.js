var breakVal = {
  val: undefined
}

function breakChain(val){
  breakVal.val = val
  return breakVal
}

function resolveBreakChain(fn){
  if(fn === breakChain){
    throw new TypeError("breakChain function cannot be used as a value. It must be called to work properly.")
  }

  if(fn == breakVal){
    return breakVal.val
  }

  return false
}

function chain(...args) {

  var res = undefined

  for (let i = 0; i < args.length; i++) {
    var fn = args[i]

    var resBrkChn = resolveBreakChain(fn)
    if(resBrkChn){ return resBrkChn }

    if(typeof fn !== "function"){
      if(i !== 0){
        throw new TypeError("Parameter must be a function or the response of the breakChain function calling.")
      }
      res = fn
      continue
    }

    res = fn(res)
    var resBrkChn = resolveBreakChain(res)
    if(resBrkChn){ return resBrkChn }
  }

  return res
}

async function asyncChain(...args) {

  var res = undefined

  for (let i = 0; i < args.length; i++) {
    var fn = args[i]
    
    var resBrkChn = resolveBreakChain(fn)
    if(resBrkChn){ return resBrkChn }

    if(typeof fn !== "function"){
      res = fn
      continue
    }

    if(fn.constructor.name == "AsyncFunction"){
      res = await fn(res);
      var resBrkChn = resolveBreakChain(res)
      if(resBrkChn){ return resBrkChn }
      continue
    }

    res = fn(res)
    var resBrkChn = resolveBreakChain(res)
    if(resBrkChn){ return resBrkChn }
  }

  return res
}

module.exports = { chain, asyncChain, breakChain };