// get the button and make it respond to a click
var theButton = document.getElementById("b1");
theButton.onclick = feedTheButton1;

// var theButton = document.getElementById("b2");
// theButton.onclick = feedTheButton2;

// Note: Import [BigInteger.js](https://github.com/peterolson/BigInteger.js).
// It has a function mod(number) and modInv(mod).
// Exg: bigInt(59).mod(5) => 4; bigInt(3).modInv(11) => 4

function ECdouble(G,a,b,P){
	// G = (x1,y1) where x1,y1 are integers.
  var lambda_mod = bigInt(bigInt(bigInt(bigInt(bigInt(G[0]).pow(2)).multiply(3)).add(a)).multiply(bigInt(bigInt(G[1]).multiply(2)).modInv(P))).mod(P);
  var x2 = bigInt(bigInt(bigInt(bigInt(lambda_mod).square()).minus(G[0])).minus(G[0])).mod(P);
  var y2 = bigInt(bigInt(bigInt(lambda_mod).multiply(bigInt(G[0]).minus(x2))).minus(G[1])).mod(P);
  if (bigInt(x2).lesser(0)){
    x2 = bigInt(x2).add(P);
  }
  if (bigInt(y2).lesser(0)){
    y2 = bigInt(y2).add(P);
  }
  var double = [x2,y2];
  return double
}

function ECadd(A,B,P){
	var lambda_mod2 = bigInt(bigInt(bigInt(B[1]).minus(A[1])).multiply(bigInt(bigInt(B[0]).minus(A[0])).modInv(P))).mod(P);
  var x3 = bigInt(bigInt(bigInt(bigInt(lambda_mod2).square()).minus(A[0])).minus(B[0])).mod(P);
  var y3 = bigInt(bigInt(bigInt(lambda_mod2).multiply(bigInt(bigInt(A[0]).minus(x3)))).minus(A[1])).mod(P);
  if (bigInt(x3).lesser(0)){
    x3 = bigInt(x3).add(P);
  }
  if (bigInt(y3).lesser(0)){
    y3 = bigInt(y3).add(P);
  }
  var add2 = [x3,y3];
  return add2
}

function ECMultiplication(G,a,b,P,N,privateKey){
	/* if (privateKey < 1 || privateKey >= N) {
	  return "ECMultiplication(G,privateKey,a,b,P), privateKey should >0 and <N."
	} */
  var n_binary = bigInt(privateKey).toString(2); //Don't need to remove first two elements like python.
  // var n_binary = bigInt(privateKey).toArray(2).value;
  // return n_binary
  var D = G;
	for (i = 1; i < n_binary.length; i++) {
  	D = ECdouble(D,a,b,P);
    if (n_binary.charAt(i) == 1){  //if (n_binary[i] == 1){
    D = ECadd(G,D,P);  //Don't use ECadd(D, G, P), I don't know why yet.
    }
	}
  return bigInt(D)
}


 // Feed the button
function feedTheButton1() {
  // Set Bitcoin parameters
  var a = 0; var b = 7;
  var P = bigInt(bigInt(bigInt(bigInt(bigInt((bigInt(bigInt(2**256).minus(2**32)).minus(2**9)).minus(2**8)).minus(2**7))).minus(2**6)).minus(2**4)).minus(1);
  var x1 = bigInt("79BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798",16);
  var y1 = bigInt("483ADA7726A3C4655DA4FBFC0E1108A8FD17B448A68554199C47D08FFB10D4B8",16);
  var G = [bigInt(x1),bigInt(y1)];
  var N = bigInt("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141",16);

	var privateKey1 = privateKeyOutputId1.value;
  var privateKey2 = privateKeyOutputId2.value;
  var privateKey3 = privateKeyOutputId3.value;
  var privateKey4 = privateKeyOutputId4.value;
  var privateKey5 = privateKeyOutputId5.value;
  var privateKey = bigInt(bigInt(bigInt(bigInt(bigInt(bigInt(bigInt(bigInt(privateKey1).multiply(10**16)).add(privateKey2)).multiply(10**16)).add(privateKey3)).multiply(10**16)).add(privateKey4)).multiply(10**16)).add(privateKey5);
  // var result = bigInt(52).modInv(P);
  // var result = bigInt(P).isPrime();
  // var result1 = privateKey2;
  if (bigInt(privateKey).lesser(1)){
    var result1 = "Error";
    var result2 = "Error";
    var result3 = "Error";
    var result4 = "Error";
    // var result5 = "Error";
    var message = "Error: Privatekey must greater than 0.";
  }
  else if (bigInt(privateKey).greater(N)){
    var result1 = "Error";
    var result2 = "Error";
    var message = "Error: Privatekey must less than 115792089237316195423570985008687907852837564279074904382605163141518161494337.";
    var result3 = "Error";
    var result4 = "Error";
    // var result5 = "Error";
  }
  else {
    var result1 = privateKey;
    var result2 = ECMultiplication(G,a,b,P,N,privateKey);
    var result3 = result1.toString(16);
    var result4 = [result2[0].toString(16),result2[1].toString(16)];
    // var result5 = bigInt(privateKey).toString(58);
    var message = "";
  }
  //(G=[3,10],a=1,b=1,P=23,N=27,privateKey)
  // var n_binary = privateKey.toString(2);
  // var result = n_binary.length;
  // var result = ECadd(A=[3,10],B=[7,12],P=23);
  // var result = bigInt(bigInt(bigInt(12).minus(10)).multiply(bigInt(bigInt(7).minus(3)).modInv(23))).mod(23);
  // var result = bigInt(bigInt(bigInt(bigInt(12).square()).minus(3)).minus(7)).mod(23);
  // var result = bigInt(bigInt(bigInt(12).multiply(bigInt(bigInt(3).minus(19)))).minus(10)).mod(23);
  // var result = modular_inverse(A=privateKey,P=23)
  // var result = ECdouble(G,a,b,P)  //(G=[3,10],a=1,b=1,P=23)
  // var result = -26%23;
  // var result = bigInt(2**256 - 2**32 - 2**9 - 2**8 - 2**7 - 2**6 - 2**4 -1);
  // var t = bigInt(6195423570985008687907452837564279074904382605163141518161494337).toString(2);
  // var t = bigInt(3).toArray(2)
  // var result = bigInt(33).toArray(2).value[0] == 1
  // var bigInt = require("big-integer");
  // var result = bigInt("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141",16);
  // var result = bigInt(N).mod(23);
  // var result = bigInt(bigInt(bigInt(bigInt(bigInt(3).pow(2)).multiply(3)).add(1)).multiply(bigInt(bigInt(10).multiply(2)).modInv(23))).mod(23);
  // var result = bigInt(bigInt(bigInt(bigInt(6).pow(2)).minus(3)).minus(3)).mod(23);
  privateKeyId.innerHTML = result1;
  publicKeyId.innerHTML = result2;
  privateKeyHexId.innerHTML = result3;
  publicKeyHexId.innerHTML = result4;
  // privateKeyWIFId.innerHTML = result5;
  errorMessage.innerHTML = message;

  privateKeyHexId0.innerHTML = result3;
  var result31 = 80 + result3;
  privateKeyHexId1.innerHTML = result31;
  var result32 = sjcl.hash.sha256.hash(sjcl.codec.hex.toBits(result31));
  var result33 = sjcl.codec.hex.fromBits(result32);
  privateKeyHexId2.innerHTML = result33;
  var result34 = sjcl.hash.sha256.hash(result32);
  var result35 = sjcl.codec.hex.fromBits(result34);
  privateKeyHexId3.innerHTML = result35;
  var result36 = result35.slice(0,8);
  privateKeyHexId4.innerHTML = result36;
  var result37 = result31 + result36;
  privateKeyHexId5.innerHTML = result37;
  var result38 = bigInt(result37,16).toString(58,"123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz");
  privateKeyHexId6.innerHTML = result38;

  publicKeyHexId0.innerHTML = result4;
  var result41 = "04"+result4[0]+result4[1];
  publicKeyHexId1.innerHTML = result41;
  var result42 = sjcl.hash.sha256.hash(sjcl.codec.hex.toBits(result41));
  var result43 = sjcl.codec.hex.fromBits(result42);
  publicKeyHexId2.innerHTML = result43;
  var result44 = sjcl.hash.ripemd160.hash(sjcl.codec.hex.toBits(result43));
  var result45 = sjcl.codec.hex.fromBits(result44);
  publicKeyHexId3.innerHTML = result45;
  var result46 = "00"+result45;
  publicKeyHexId4.innerHTML = result46;
  var result47 = sjcl.hash.sha256.hash(sjcl.codec.hex.toBits(result46));
  var result48 = sjcl.codec.hex.fromBits(result47);
  publicKeyHexId5.innerHTML = result48;
  var result49 = sjcl.hash.sha256.hash(result47);
  var result50 = sjcl.codec.hex.fromBits(result49);
  publicKeyHexId6.innerHTML = result50;
  var result51 = result50.slice(0,8);
  publicKeyHexId7.innerHTML = result51;
  var result52 = result46 + result51;
  publicKeyHexId8.innerHTML = result52;
  var result53 = bigInt(result52,16).toString(58,"123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz");
  publicKeyHexId9.innerHTML = 1+result53;
}
