(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.PoplarApp = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var io = require('./lib/io');
var run = require('./lib/run')(io);


module.exports = run;

},{"./lib/io":20,"./lib/run":21}],2:[function(require,module,exports){
module.exports = {
    description: "These are constants.",
    value: {
        days_per_month: {
            value: 30.4,
            units: "days/mo",
            description: "Number of Days in an average month"
        },
        e20: {
            value: 2.2,
            units: "vp/t",
            description: "Rate of change of saturated VP with T at 20C"
        },
        rhoAir: {
            value: 1.2,
            units: "kg/m^3",
            description: "Density of air"
        },
        lambda: {
            value: 2460000,
            units: "J/kg",
            description: "Latent heat of vapourisation of h2o"
        },
        VPDconv: {
            value: 0.000622,
            units: "",
            description: "Convert VPD to saturation deficit = 18/29/1000"
        },
        Qa: {
            value: -90,
            units: "W/m^2",
            description: "Intercept of net radiation versus solar radiation relationship"
        },
        Qb: {
            value: 0.8,
            units: "unitless",
            description: "slope of net vs. solar radiation relationship"
        },
        gDM_mol: {
            value: 24,
            units: "g/mol(C)",
            description: "Molecular weight of dry matter"
        },
        molPAR_MJ: {
            value: 2.3,
            units: "mol(C)/MJ",
            description: "Conversion of solar radiation to PAR"
        }
    }
};

},{}],3:[function(require,module,exports){
module.exports = {
  tree : require('./tree'),
  plantation : require('./plantation'),
  plantation_state : require('./plantation_state'),
  soil : require('./soil'),
  weather : require('./weather'),
  manage : require('./manage'),
  constats : require('./constants')
};

},{"./constants":2,"./manage":4,"./plantation":5,"./plantation_state":6,"./soil":7,"./tree":11,"./weather":18}],4:[function(require,module,exports){
module.exports = {
  description : "Crop Management Parameters",
  value : {
    irrigFrac : {
      value : 1,
      units : "",
      description : "Irrigation fraction: 1 = fully irrigated, 0 = no irrigation. Any values between 0 and 1 are acceptable"
    },
    fertility : {
      value : 0.7,
      units : "",
      description : "Soil fertility"
    },
    datePlanted : {
        value : "_date_",
        units : "date",
        description : "Date the crop was planted"
    },
    dateCoppiced : {
        required : false,
        value : "_date_",
        units : "date",
        description : "Date of the first coppice"
    },
    coppiceInterval : {
        required : false,
        value : 3,
        units : "Years",
        description : "How after the crop is coppiced after the first coppice"
    },
    coppiceDates : {
        required : false,
        value : "",
        units : "date",
        description : "How after the crop is coppiced after the first coppice"
    },
    dateFinalHarvest : {
        required : false,
        value : "_date_",
        units : "date",
        description : "Date when the crop is completely harvested"
    }
  }
};

},{}],5:[function(require,module,exports){
module.exports = {
    description: "Greenwood PG Values (default)",
    value: {
        type: {
            value: "",
            description: "",
            required : false
        },
        StockingDensity: {
            value: 3587,
            units: "Trees/hectar",
            description: "Number of trees planted per hectar"
        },
        SeedlingMass: {
            value: 0.0004,
            units: "kG",
            description: "Mass of the seedling"
        },
        pS: {
            value: 0.1,
            units: "unitless",
            description: "Proportion of seedling mass going into stem"
        },
        pF: {
            value: 0,
            units: "unitless",
            description: "Proportion of seedling mass going into foliage"
        },
        pR: {
            value: 0.9,
            units: "unitless",
            description: "Proportion of seedling mass going into root"
        }
    }
};

},{}],6:[function(require,module,exports){
module.exports = {
    description: "Plantation state class, containing all intemediate values at every timestep of the model",
    value: {
        feedstockHarvest: {
            value: -1,
            units: "",
            description: ""
        },
        coppiceCount: {
            value: -1,
            units: "",
            description: ""
        },
        coppiceAge: {
            value: -1,
            units: "month",
            description: "Age of tree at the time of coppice"
        },
        VPD: {
            value: -1,
            units:"kPA",
            description:"Mean vapor pressure deficit"
        },
        fVPD: {
            value: -1,
            units : "unitless",
            description:"Vapor Pressure Deficit Modifier (Poplar)"
        },
        fT: {
            value: -1,
            units:"unitless",
            description:"Temperature modifier"
        },
        fFrost: {
            value: -1,
            units : "unitless",
            description : "Number of Freeze Days Modifier"
        },
        fNutr: {
            value: -1,
            units:"unitless",
            description:"Nutritional Fraction, might be based on soil and fertilizer at some point"
        },
        fSW: {
            value: -1,
            units: "",
            description: "Soil water modifier"
        },
        fAge: {
            value: -1,
            units: "",
            description: ""
        },
        PAR: {
            value: -1,
            units:"mols",
            description:"Monthly PAR in mols / m^2 month"
        },
        xPP: {
            value: -1,
            units: "metric tons Dry Matter/ha",
            description: "maximum potential Primary Production"
        },
        Intcptn: {
            value: -1,
            units: "unitless",
            description: "Canopy rainfall interception"
        },
        ASW: {
            value: -1,
            units: "mm",
            description: "Available soil water"
        },
        CumIrrig: {
            value: -1,
            units: "mm",
            description: "Cumulative irrigation"
        },
        Irrig: {
            value: -1,
            units: "mm/mon",
            description: "Required irrigation"
        },
        StandAge: {
            value: -1,
            units: "month",
            description: "Age of the tree"
        },
        LAI: {
            value: -1,
            units: "",
            description: "Leaf area index"
        },
        CanCond: {
            value: -1,
            units: "",
            description: "Canopy conductance"
        },
        Transp: {
            value: -1,
            units: "mm/mon",
            description: "Canopy monthly transpiration"
        },
        PhysMod: {
            value: -1,
            units: "unitless",
            description: "Physiological Modifier to conductance and APARu"
        },
        pfs: {
            value: -1,
            units: "",
            description: "Ratio of foliage to stem partitioning"
        },
        pR: {
            value: -1,
            units: "",
            description: ""
        },
        pS: {
            value: -1,
            units: "",
            description: ""
        },
        pF: {
            value: -1,
            units: "",
            description: ""
        },
        litterfall: {
            value: -1,
            units: "",
            description: ""
        },
        NPP: {
            value: -1,
            units: "metric tons Dry Matter/ha",
            description: "Net Primary Productivity"
        },
        RootP: {
            value: -1,
            units: "",
            description: "Root productivity"
        },
        dW: {
            value: -1,
            units: "",
            description: ""
        },
        WF: {
            value: -1,
            units: "bdt/ha",
            description: "Foliage yield"
        },
        WR: {
            value: -1,
            units: "bdt/ha",
            description: "Root yield"
        },
        WS: {
            value: -1,
            units: "bdt/ha",
            description: "Stem yield"
        },
        W: {
            value: -1,
            units: "bdt/ha",
            description: "Total yield: root + stem + foliage"
        }
    }
};

},{}],7:[function(require,module,exports){
module.exports = {
    description: "Soil information based on current location",
    value: {
        maxAWS: {
            value: -1,
            units: "",
            description: "Maximum available soil water"
        },
        swpower: {
            value: -1,
            units: "",
            description: "power parameter based on clay content of soil"
        },
        swconst: {
            value: -1,
            units: "",
            description: "constant parameter based on clay content of soil"
        }
    }
};

},{}],8:[function(require,module,exports){
module.exports = {
    units: "[gc m/s]?",
    description: "Along with a Physiological modifer, specifies the canopy conductance.  Used in calculation of transpiration",
    value: {
        mn: {
            description: "Minimum value, when lai=0",
            value: 0.0001
        },
        mx: {
            description: "Maximum value",
            value: 0.02
        },
        lai: {
            units: "[m^2/m^2]",
            description: "Leaf Area Index where parameter reaches a maximum value.",
            value: 2.6
        }
    }
};

},{}],9:[function(require,module,exports){
module.exports = {
    units: "fraction",
    description: "Specifies the growth limiter as a function of the tree age.  This is a time dependancy parameter.  The graph of the function is available at: https://www.desmos.com/calculator/wa0q2ih18h",
    value: {
        f0: {
            description: "Value at Initial Time",
            value: 1
        },
        f1: {
            description: "Value at Infinite Time",
            value: 0
        },
        tm: {
            units: "[y]",
            description: "Time in years where value is the average of f0 and f1",
            value: 47.5
        },
        n: {
            description: "n>=1; Parameter specifing the rate of change around tm.  n=1 is approximately a linear change, as n increases, change becomes more localized around tm.",
            value: 3.5
        }
    }
};

},{}],10:[function(require,module,exports){
module.exports = {
    description: "Specifies the parameters affecting temperature modifier, fT. A graph of how these parameters affect the temperature modifier is found here: https://www.desmos.com/calculator/69iwqtnl28",
    value: {
        mn: {
            units: "[C]",
            description: "Specifies the minimum temperature of respiration",
            value: 0
        },
        opt: {
            units: "[C]",
            description: "Specifies the optimum temperature of respiration",
            value: 20
        },
        mx: {
            units: "[C]",
            description: "Specifies the maximum temperature of respiration",
            value: 50
        }
    }
};

},{}],11:[function(require,module,exports){
module.exports = {
    description: "These specify growth parameters specific to the species of tree.",
    value : {
        k: {
            units: "unitless",
            description: "Radiation Extinction Coefficient.",
            value: 0.5
        },
        fullCanAge: {
            units: "[y]",
            description: "Year where tree reaches full Canopy Cover.",
            value: 1.5
        },
        kG: {
            units: "[kPA^-1]",
            description: "Determines the response of the canopy conductance to the vapor pressure deficit.",
            value: 0.5
        },
        alpha: {
            units: "[kg/mol ?]",
            description: "Canopy quantum efficiency.",
            value: 0.08
        },
        fT : require('./ft'),
        BLcond: {
            units: "[]",
            description: "Canopy boundary layer conductance. Used in the calcuation of transpiration",
            value: 0.04
        },
        fAge: require('./fage'),
        fN0: {
            units: "fraction",
            description: "Used in the calculation of the nutritional modifier,fNutr.  fNutr ranges from [fNO,1) based on the fertility index which ranges from 0 to 1.  When fN0=1 indicates fNutr is 1",
            value: 0.26
        },
        SLA: require('./sla'),
        //CheckUnitsChangetolinearFunction
        Conductance: require('./conductance'),
        Intcptn: require('./intcptn'),
        y: {
            description: "Assimilation use efficiency.  Used in calculation of the NPP.",
            value: 0.47
        },
        pfs: require('./pfs'),
        pR: require('./pr'),
        rootP: require('./rootp'),
        litterfall: require('./litterfall')
    }
};

},{"./conductance":8,"./fage":9,"./ft":10,"./intcptn":12,"./litterfall":13,"./pfs":14,"./pr":15,"./rootp":16,"./sla":17}],12:[function(require,module,exports){
module.exports = {
    units: "fraction",
    description: "Rainfall interception fraction.  A linear function w.r.t. LAI",
    value: {
        mn: {
            description: "Minimum value, when lai=0",
            value: 0
        },
        mx: {
            description: "Maximum value",
            value: 0.24
        },
        lai: {
            units: "[m^2/m^2]",
            description: "Leaf Area Index where parameter reaches a maximum value.",
            value: 7.3
        }
    }
};

},{}],13:[function(require,module,exports){
module.exports = {
    units: "fraction",
    description: "Specifies the fractional monthly loss of foliage. This is a time dependany parameter.  The graph of the function is available at: https://www.desmos.com/calculator/6iq9ppdqs7",
    value: {
        f0: {
            description: "Value at Initial Time",
            value: 0.0015
        },
        f1: {
            description: "Value at Infinite Time",
            value: 0.03
        },
        tm: {
            units: "[y]",
            description: "Time in years where value is the average of f0 and f1",
            value: 2
        },
        n: {
            description: "n>=1; Parameter specifing the rate of change around tm.  n=1 is approximately a linear change, as n increases, change becomes more localized around tm.",
            value: 2.5
        }
    }
};

},{}],14:[function(require,module,exports){
module.exports = {
    units: "fraction",
    description: "This defines the foliage to stem (WF/WS) fraction in allocating aboveground biomass of the tree. This is calculated with a pair of allometric power equations.  The first relates basal diameter, (DOB) to total woody biomass, while the second relates DOB to pfs.  The parameterization of the relationship between DOB and woody biomass is inverted to determine the DOB from the modeled woody fraction.  This relation is plotted at: .  The model allocates the appropriate fraction of wood based on the Stocking density of the plantation. DOB rather than DBH is used for comparison of trees with a high stemCnt and rapid coppicing value.",
    value: {
        stemCnt: {
            description: "Average number of stems per stump",
            value: 2.8
        },
        stemC: {
            units: "[cm^-1]",
            description: "Constant in relation of DOB to woody biomass",
            value: 0.18
        },
        stemP: {
            description: "Power in relation of DOB to woody biomass.",
            value: 2.4
        },
        pfsMx: {
            description: "Maximum possible pfs value allowed",
            value: 2
        },
        pfsP: {
            description: "Power in relation of DBO to pfs",
            value: -0.772
        },
        pfsC: {
            units: "[cm^-1]",
            description: "Constant in relation of DOB to pfs.",
            value: 1.3
        }
    }
};

},{}],15:[function(require,module,exports){
module.exports = {
    units: "fraction",
    description: "Along with a Physiologial parameter, specifies the amount of new growth allocated to the root system, and the turnover rate.",
    value: {
        mn: {
            description: "Minimum allocation to the root, when the physiologal parameter is 1.",
            value: 0.17
        },
        mx: {
            description: "Maximum allocation to the root, when m0.",
            value: 0.7
        },
        m0: {
            description: "Dependance on the fertility index. 0 indicates full dependance on fertility, 1 indicates a constant allocation, independant of fertility",
            value: 0.5
        },
        turnover: {
            units: "[month^-1]",
            description: "Specifies the monthly root turnover rate.",
            value: 0.02
        }
    }
};

},{}],16:[function(require,module,exports){
module.exports = {
    description: "These parameters specify root allocation to growth after coppicing.",
    value : {
      frac: {
          units: "[month^1]",
          description: "Specifies the fractional amount of root biomass that exceeds the aboveground requirements that can be supplied in a given month.",
          value: 0.2
      },
      LAITarget: {
          units: "[m^2/m^2]",
          description: "Specifies a target LAI rate.  The Target LAI is included in the calculation of a target NPP, based on weather paramaters.  Below this target, the roots will contribute biomass if the below ground root mass exceeds the requirements of the aboveground biomass. The target is specified in LAI to time root contributions to periods of growth",
          value: 10
      },
      efficiency: {
          units: "[kg/kg]",
          description: "Specifies the efficiency in converting root biomass into aboveground biomass.",
          value: 0.7
      }
    }
};

},{}],17:[function(require,module,exports){
module.exports = {
    units: "[m^2/kg]",
    description: "Specifies the Specific Leaf Area as a function of the tree age.  This is a time dependancy parameter.  Used in the calculation of LAI.  The graph of the function is available at: https://www.desmos.com/calculator/wa0q2ih18h",
    value: {
        f0: {
            description: "Value at Initial Time",
            value: 19
        },
        f1: {
            description: "Value at Infinite Time",
            value: 10.8
        },
        tm: {
            units: "[y]",
            description: "Time in years where value is the average of f0 and f1",
            value: 5
        },
        n: {
            description: "n>=1; Parameter specifing the rate of change around tm.  n=1 is approximately a linear change, as n increases, change becomes more localized around tm.",
            value: 2
        }
    }
};

},{}],18:[function(require,module,exports){
module.exports = {
    month: {
        value: -1,
        units: "unitless",
        description: "The month number since planting"
    },
    tmin: {
        value: -1,
        units: "Celcius",
        description: "Minimum temperature for growth"
    },
    tmax: {
        value: -1,
        units: "Celcius",
        description: "Maximum temperature for growth"
    },
    tdmean: {
        value: -1,
        units: "Celcius",
        description: "Dew point temperature"
    },
    ppt: {
        value: -1,
        units: "",
        description: "Precipitation"
    },
    rad: {
        value: -1,
        units: "",
        description: "Solar radiation"
    },
    nrel: {
        required : false, // calcuated
        value: -1,
        units: "",
        description: ""
    },
    daylight: {
        value: -1,
        units: "",
        description: ""
    }
};

},{}],19:[function(require,module,exports){
'use strict';
/**
@module 3PG Module
**/


/**
Class for all the functions that run in a single step of the model

@class module.exports
**/


/**
list of constants used for computations

@attribute constant
**/
var constants = {
  days_per_month:{
      value:30.4,
      units:'days/mo',
      description:'Number of Days in an average month'
  },
  e20:{
      value:2.2,
      units:'vp/t',
      description:'Rate of change of saturated VP with T at 20C'
  },
  rhoAir:{
      value:1.2,
      units:'kg/m^3',
      description:'Density of air'
  },
  lambda:{
      value:2460000,
      units:'J/kg',
      description:'Latent heat of vapourisation of h2o'
  },
  VPDconv:{
      value:0.000622,
      units:'?',
      description:'Convert VPD to saturation deficit = 18/29/1000'
  },
  Qa:{
      value:-90,
      units:'W/m^2',
      description:'Intercept of net radiation versus solar radiation relationship'
  },
  Qb:{
      value:0.8,
      units:'unitless',
      description:'slope of net vs. solar radiation relationship'
  },
  gDM_mol:{
      value:24,
      units:'g/mol(C)',
      description:'Molecular weight of dry matter'
  },
  molPAR_MJ:{
      value:2.3,
      units:'mol(C)/MJ',
      description:'Conversion of solar radiation to PAR'
  }
};

module.exports.constant = constant;
function constant(c) {
    return constants[c].value;
}

/**
Time Dependant Attribute,
units='various',
description='This function creates a time dependant function that decays
(or rises from f0 to f1.  The value (f0+f1)/2 is reached at tm,
and the slope of the line at tm is given by p.
@method tdp
@param x
@param f
**/
module.exports.tdp = function(x,f) {
  var p=f.f1 + (f.f0-f.f1)*Math.exp(-Math.log(2)*Math.pow((x/f.tm),f.n));
  return p;
};

/**
@method lin
@param x
@param p
*/
module.exports.lin = function(x, p){
  if( x < 0 ) {
    return p.mn;
  }
  if( x > p.xmax ) {
    return p.xmax;
  }
  return p.mn + (p.mx-p.mn)*(x/p.xmax);
};

/**
units='unitless',
description='Canopy Rainfall interception'
@method Intcptn
@param cur_LAI
@param c
*/
module.exports.Intcptn = function(cur_LAI, c){
  return Math.max(c.mn,c.mn + (c.mx - c.mn) * Math.min(1 , cur_LAI / c.lai));
};

/**
units='mm',
description='Available Soil Water'
@method ASW
@param maxASW
@param prev_ASW
@param date_ppt
@param cur_Transp
@param cur_Intcptn
@param cur_Irrig
*/
module.exports.ASW = function(maxASW, prev_ASW, date_ppt, cur_Transp, cur_Intcptn, cur_Irrig){
  return Math.min(maxASW*10, Math.max(prev_ASW + date_ppt - (cur_Transp + cur_Intcptn * date_ppt) + cur_Irrig, 0));
};

//TODO: double check the appropriate use of tdmean (dew point temp)
//TODO: take constants out
/**
units='kPA',
description='Mean vapor pressure deficit'
@method VPD
@param date_tmin
@param date_tmax
@param date_tdmean
*/
module.exports.VPD = function(date_tmin, date_tmax, date_tdmean){
  return (0.6108 / 2 * (Math.exp(date_tmin * 17.27 / (date_tmin + 237.3) ) + Math.exp(date_tmax * 17.27 / (date_tmax + 237.3) ) ) ) - (0.6108 * Math.exp(date_tdmean * 17.27 / (date_tdmean + 237.3) ) );
};


/**
units = unitless,
description='Vapor Pressure Deficit Modifier (Poplar)'
@method fVPD
@param kG
@param cur_VPD
*/
module.exports.fVPD = function(kG, cur_VPD){
  return Math.exp(-1 * kG * cur_VPD);
};

//TODO: take constants out
// make a meaningful tempvar name
/**
units = unitless,
description = 'Number of Freeze Days Modifier'
@method fFrost
@param date_tmin
*/
module.exports.fFrost = function(date_tmin) {
  var tempVar = -1.0;

  if( date_tmin >= 0 ){
    tempVar = 1.0;
  } //else -1.0

  return 0.5 * (1.0 + tempVar * Math.sqrt(1 - Math.exp(-1 * Math.pow((0.17 * date_tmin) , 2) * (4 / 3.14159 + 0.14 * Math.pow( (0.17 * date_tmin) , 2) ) / (1 + 0.14 * Math.pow((0.17 * date_tmin) , 2) ) ) ) );
};

//TODO - better naming?: tmin, tmax = weather Topt, Tmax, Tmin = tree params
/**
units=unitless,
description='Temperature modifier'
@method fT
@param tavg
@param fT
*/
module.exports.fT = function(tavg, fT){
  var f;
  if(tavg <= fT.mn || tavg >= fT.mx){
    f = 0;
  } else {
    f = ( (tavg - fT.mn) / (fT.opt - fT.mn) )  *
           Math.pow ( ( (fT.mx - tavg) / (fT.mx - fT.opt) ),
                      ( (fT.mx - fT.opt) / (fT.opt - fT.mn) )
                    );
  }
  return(f);
};

/**
units='mm/mon',
description='Required Irrigation'
@method Irrig
@param irrigFrac
@param cur_Transp
@param cur_Intcptn
@param date_ppt
*/
module.exports.Irrig = function(irrigFrac, cur_Transp, cur_Intcptn, date_ppt){
    return Math.max(0, irrigFrac * (cur_Transp - (1 - cur_Intcptn) * date_ppt) );
};

//TODO: get units and description
/**
@method fSW
@param ASW
@param maxAWS
@param swconst
@param swpower
*/
module.exports.fSW = function(ASW, maxAWS, swconst, swpower) {
  var fSW;
  if( swconst === 0 || maxAWS === 0 ) {
    fSW = 0;
  } else {
    var omr = 1 - (ASW/10) / maxAWS; // One Minus Ratio

    if(omr < 0.001) {
      fSW = 1;
    } else {
      fSW = (1-Math.pow(omr,swpower))/(1+Math.pow(omr/swconst,swpower));
    }
  }
  return fSW;
};

/**
units='unitless',
description='Nutritional Fraction, might be based on soil and fertilizer at some point'
@method fNutr
@param fN0
@param FR
*/
module.exports.fNutr = function(fN0, FR){
  return fN0 + (1 - fN0) * FR;
};

/**
TODO: why $3 in makefile - ask about it
units=unitless
description='Physiological Modifier to conductance and APARu'
@method PhysMod
@param cur_fVPD
@param cur_fSW
@param cur_fAge
*/
module.exports.PhysMod = function(cur_fVPD, cur_fSW, cur_fAge){
   return Math.min(cur_fVPD , cur_fSW) * cur_fAge;
};

/**
units='gc,m/s',
description='Canopy Conductance'
@method CanCond
@param PhysMod
@param LAI
@param cond
*/
module.exports.CanCond = function(PhysMod, LAI, cond){
   return Math.max(cond.mn , cond.mx * PhysMod * Math.min(1 , LAI / cond.lai) );
};

/**
units='mm/mon' which is also kg/m2/mon
description='Canopy Monthly Transpiration'
@method Transp
@param date_nrel
@param date_daylight
@param cur_VPD
@param BLcond
@param cur_CanCond
*/
module.exports.Transp = function(date_nrel, date_daylight, cur_VPD, BLcond, cur_CanCond){
  var VPDconv = constant('VPDconv');
  var lambda = constant('lambda');
  var rhoAir = constant('rhoAir');
  var e20 = constant('e20');
  var Qa = constant('Qa');
  var Qb = constant('Qb');

  // date_daylight = hours
  // nrel is in MJ/m^2/day convert to Wh/m^2/day
  var netRad = Qa + Qb * ((date_nrel * 277.778) / date_daylight);
  var defTerm = rhoAir * lambda * VPDconv * cur_VPD * BLcond;
  var div = 1 + e20 + BLcond / cur_CanCond;

  // Convert daylight to secs.
  return constant('days_per_month') * ( (e20 * netRad + defTerm ) / div ) * date_daylight * 3600 / lambda;
};

//TODO: description
/**
units='metric tons Dry Matter/ha',
@method NPP
@param prev_StandAge
@param fullCanAge
@param xPP
@param k
@param prev_LAI
@param fVPD
@param fSW
@param fAge
@param alpha
@param fNutr
@param fT
@param fFrost
*/
module.exports.NPP = function(prev_StandAge, fullCanAge, xPP, k, prev_LAI, fVPD, fSW, fAge, alpha, fNutr, fT, fFrost){
  var CanCover = 1;
  if( prev_StandAge < fullCanAge ){
    CanCover = prev_StandAge / fullCanAge;
  }

  return xPP * (1 - (Math.exp(-k * prev_LAI) ) ) * CanCover * Math.min(fVPD , fSW) * fAge * alpha * fNutr * fT * fFrost;
};

//TODO: units and description
/**
@method pR
@param cur_PhysMod
@param cur_pR
@param FR
@param pR
*/
module.exports.pR = function(cur_PhysMod, cur_pR,FR,pR){
  var p =(pR.mx * pR.mn) /
         (pR.mn + (pR.mx - pR.mn) * cur_PhysMod * (pR.m0 + (1 - pR.m0) * FR) );

  // This was added by quinn to limit root growth.
  return p * Math.pow(p/cur_pR,2);
};


//TODO: mols or mols per m^2?
/**
units=mols
description='Monthly PAR in mols / m^2 month'
molPAR_MJ [mol/MJ] is a constant Conversion of solar radiation to PAR
@method PAR
@param date_rad
@param molPAR_MJ
*/
module.exports.PAR = function(date_rad, molPAR_MJ) {
  if( molPAR_MJ === null || molPAR_MJ === undefined ) {
    molPAR_MJ = constant('molPAR_MJ');
  }

  return date_rad * molPAR_MJ * constant('days_per_month');
};

/**
units='metric tons Dry Matter/ha',
description='maximum potential Primary Production [tDM / ha month],
NOTE: 10000/10^6 [ha/m2][tDm/gDM]
gGM_mol [g/mol] is the molecular weight of dry matter
@method xPP
@param y
@param cur_PAR
@param gDM_mol
*/
module.exports.xPP = function(y, cur_PAR, gDM_mol){
    if( gDM_mol === null || gDM_mol === undefined ) {
      gDM_mol = constant('gDM_mol');
    }

    return y * cur_PAR * gDM_mol / 100;
};

/*** FUNCTIONS FOR COPPICING */
/**
coppice related functions
@method coppice
*/
module.exports.coppice = {
  // Coppice Functions are based on Diameter on Stump, NOT DBH.
  // Calculates the pfs based on the stem weight in KG
  pfs : function(stem, p) {
    var avDOB = Math.pow( ( stem / p.stemCnt / p.stemC) , (1 / p.stemP) );
    var ppfs= p.pfsC * Math.pow(avDOB , p.pfsP);

    return Math.min(p.pfsMx,ppfs);
  },

  // Calculates the pfs based on stem with in G.  Uses volume Index as guide
  pfs_via_VI : function (stemG, wsVI, laVI, SLA) {
    if (stemG < 10) {
      stemG = 10;
    }
    var VI = Math.pow( (stemG / wsVI.stems_per_stump / wsVI.constant),(1 / wsVI.power) );

    // Add up for all stems
    var la = laVI.constant * Math.pow(VI,laVI.power) * wsVI.stems_per_stump;
    var wf = 1000 * (la / SLA);  // Foilage Weight in g;
    var pfs = wf/stemG;
    return pfs;
  },

  RootP : function(cur_npp, cur_nppTarget, WR,W,pRx,frac) {
    var nppRes = cur_nppTarget - cur_npp;
    var rootPP;
    if( nppRes > 0 && WR/W > pRx ) {
        rootPP = Math.min(nppRes, WR*(WR/W - pRx)*frac);
    } else {
      rootPP = 0;
    }

    return rootPP;
  }
};

},{}],20:[function(require,module,exports){
module.exports = {
  read : function(model) {
    // TODO : implement
    // You need to set your IO here and make sure all parameters for model are correctly set
  },
  dump : function() {
    // TODO : implement
  }
};

},{}],21:[function(require,module,exports){
'use strict';

var fn = require('./fn');
var utils = require('./utils');
var dataModel = require('./dataModel');
var validate = require('./validate');

function run(lengthOfGrowth) {

    var yearToCoppice; //year of the first or subsequent harvests
    var coppiceInterval; //the # of months in a single coppice cycle
    var monthToCoppice; //at which month the harvest is to be performed :: currently the tree will be cut at the beginning of that month
    var coppiceDates;

    // helper, not required.  you can register callback to set parameters whenever run is called
    this.io.read(this);

    // make sure model inputs are valid before we proceed any further
    validate(this);

    this.currentDate = this.manage.datePlanted;
    //var plantedMonth = this.currentDate.getMonth();
    //var currentMonth = this.currentDate.getMonth();

    //TODO: test no datecoppice as input
    if ( this.manage.dateCoppiced !== undefined ){
      yearToCoppice = this.manage.dateCoppiced.getYear();
      monthToCoppice = this.manage.dateCoppiced.getMonth();
      coppiceInterval = this.manage.yearsPerCoppice;
    }

    if( this.manage.coppiceDates !== undefined ) {
      coppiceDates = [];

      for( var i = 0; i < this.manage.coppiceDates.length; i++ ) {
        var parts = this.manage.coppiceDates[i].split('-');

        var d = 15;
        if( parts.length > 2 ) {
          d = parseInt(parts[2]);
        }

        coppiceDates.push(new Date(parseInt(parts[0]), parseInt(parts[1])-1, d));
      }
    }


    // init manage ns
    this.manage.coppice = false;

    if( this.debug ) {
      console.log(this.currentDate);
    }

    var setup = {
      lengthOfGrowth : lengthOfGrowth,
      yearToCoppice : yearToCoppice,
      monthToCoppice : monthToCoppice,
      coppiceInterval : coppiceInterval,
      coppiceDates : coppiceDates,
      dailyStep : this.dailyStep
    };

    return this.runSetup(setup);
}

function runSetup(setup){
    var i, key, currentWeather, step, t;

    if( this.debug ) {
      t = new Date().getTime();
      console.log('DailyStep: '+setup.dailyStep);
    }

    var m = (this.currentDate.getMonth()+1)+'';
    if( m.length === 1 ) {
      m = '0'+m;
    }

    var d = (this.currentDate.getDate())+'';
    if( d.length === 1 ) {
      d = '0'+d;
    }

    //var currentWeather = getWeather(this, setup, m, d);
    var firstStepResults = init(this.plantation, this.soil);

    var keysInOrder = [];
    var header = ['date'];
    for( key in dataModel.plantation_state.value ) {
      keysInOrder.push(key);
      header.push(key);
    }

    firstStepResults.Date = this.currentDate.getFullYear()+'-'+m;
    if( setup.dailyStep ) {
      firstStepResults.Date += '-'+d;
    }

    var rows = []; //these will become rows
    rows.push(header);

    var firstRow = [firstStepResults.Date];
    for( i = 0; i < keysInOrder.length; i++){
      key = keysInOrder[i];
      firstRow.push(firstStepResults[key]);
    }
    rows.push(firstRow);

    var currentStepResults = firstStepResults;
    var nextStepResults;

    for(step = 1; step < setup.lengthOfGrowth; step++) {
      if( setup.dailyStep ) {
        this.currentDate.setDate(this.currentDate.getDate() + 1); // add a day to current date
      } else {
        this.currentDate.setMonth(this.currentDate.getMonth() + 1); // add a month to current date
      }

      if( shouldCoppice(this, setup) ) {
        if( this.debug ) {
          console.log('Time to Coppice!');
          console.log(this.currentDate);
        }

        this.manage.coppice = true;
      } else {
        this.manage.coppice = false;
      }

      m = (this.currentDate.getMonth()+1)+'';
      if( m.length === 1 ) {
        m = '0'+m;
      }

      d = this.currentDate.getDate()+'';
      if( d.length === 1 ) {
        d = '0'+d;
      }

      currentWeather = getWeather(this, setup, m, d);

      //TODO: switch up trees here when after the first harvest
      nextStepResults = singleStep(this.plantation, this.soil, currentWeather, this.manage, currentStepResults, this.dailyStep);
      nextStepResults.Date = this.currentDate.getFullYear()+'-'+m;
      if( setup.dailyStep ) {
        nextStepResults.Date += '-'+d;
      }

      var thisRow = [nextStepResults.Date];
      for( i = 0; i < keysInOrder.length; i++) {
        key = keysInOrder[i];
        thisRow.push(nextStepResults[key]);
      }

      currentStepResults = nextStepResults;
      rows.push(thisRow);
    }

    this.io.dump(rows);

    if( this.debug ) {
      console.log(step);
      console.log(this.currentDate);
      console.log((new Date().getTime()-t)+'ms');
    }

    return rows;
}

function singleStep(plantation, soil, weather, manage, p, dailyStep) { //p = previous state
  var c = {}; //current state

  dailyStep = dailyStep === true ? true : false;
  var stepDivision = dailyStep ? 365 : 12;

  if( manage.coppice === true ) { //change this guy for the month when coppice
    // Add in a stump margin....
    c.feedstockHarvest = p.feedstockHarvest + p.WS;
    c.coppiceCount = p.coppiceCount + 1;
    c.coppiceAge = 0;
    p.LAI = 0;
    p.WS = 0;
    p.WF = 0;
    p.W = p.WR;
  } else {
    c.feedstockHarvest = p.feedstockHarvest;
    c.coppiceCount = p.coppiceCount;
    c.coppiceAge = p.coppiceAge + 1.0/stepDivision;
  }

  var tree; //tree
  if( c.coppiceCount === 0 ) { //TODO: check the case where we start with a coppiced multi stump tree
      tree = plantation.seedlingTree;
  } else {
      tree = plantation.coppicedTree;
  }

  c.StandAge = p.StandAge + 1.0/stepDivision;
  var sla = fn.tdp(p.StandAge, tree.SLA);
  c.LAI = p.WF * 0.1 * sla; // Landsburg eq 9.5
  c.VPD = fn.VPD(weather.tmin, weather.tmax, weather.tdmean);
  c.fVPD = fn.fVPD(tree.kG, c.VPD);

  c.fSW = fn.fSW(p.ASW, soil.maxAWS, soil.swconst, soil.swpower);
  c.fAge = fn.tdp(p.StandAge, tree.fAge);

  c.fFrost = fn.fFrost(weather.tmin);
  if( dailyStep ) {
  // HACK for now
    c.fFrost = 1;
  //  c.fFrost = c.fFrost / fn.constant('days_per_month');
  }

  c.PAR = fn.PAR(weather.rad); // Monthly PAR in mols
  if( dailyStep ) {
    c.PAR = c.PAR / fn.constant('days_per_month');
  }

  c.fT = fn.fT((weather.tmin + weather.tmax)/2, tree.fT);

  c.xPP = fn.xPP(tree.y, c.PAR); // maximum potential Primary Production per month
  //if( dailyStep ) { // per day
  //  c.xPP = c.xPP / fn.constant('days_per_month');
  //}


  c.PhysMod = fn.PhysMod(c.fVPD, c.fSW, c.fAge);
  c.fNutr = fn.fNutr(tree.fN0, manage.fertility);

  c.NPP = fn.NPP(p.coppiceAge, tree.fullCanAge, c.xPP, tree.k, p.LAI, c.fVPD, c.fSW, c.fAge, tree.alpha, c.fNutr, c.fT, c.fFrost);
  //if( dailyStep ) { // per day
  //  c.NPP = c.NPP / fn.constant('days_per_month');
  //}

  var NPP_target = fn.NPP(tree.fullCanAge, tree.fullCanAge, c.xPP, tree.k, tree.rootP.LAITarget, c.fVPD, c.fSW, c.fAge, tree.alpha, c.fNutr, c.fT, c.fFrost);
  c.RootP = fn.coppice.RootP(c.NPP, NPP_target, p.WR, p.W, tree.pR.mx, tree.rootP.frac);

  if (tree.laVI && tree.laVI.constant ) { // Test for that function
    c.pfs = fn.coppice.pfs_via_VI(p.WS*1000000/plantation.StockingDensity, tree.wsVI,tree.laVI,sla);
  } else {
    c.pfs = fn.coppice.pfs(p.WS*1000/plantation.StockingDensity, tree.pfs);
  }

  c.dW = c.NPP + tree.rootP.efficiency * c.RootP;

  c.Intcptn = fn.Intcptn(c.LAI, tree.Intcptn);
  c.CanCond = fn.CanCond(c.PhysMod, c.LAI, tree.Conductance);

  c.pR = fn.pR(c.PhysMod, p.WR/p.W, manage.fertility, tree.pR);
  c.litterfall = fn.tdp(p.StandAge, tree.litterfall);

  c.Transp = fn.Transp(weather.rad, weather.daylight, c.VPD, tree.BLcond, c.CanCond);
  if( dailyStep ) {
    c.Transp = c.Transp / fn.constant('days_per_month');
  }

  // Calculated from pfs
  c.pS = (1 - c.pR) / (1 + c.pfs );
  c.pF = (1 - c.pR) / (1 + 1/c.pfs );

  c.Irrig = fn.Irrig(manage.irrigFrac, c.Transp, c.Intcptn, weather.ppt);
  c.CumIrrig = p.CumIrrig + c.Irrig;

  c.ASW = fn.ASW(soil.maxAWS, p.ASW, weather.ppt, c.Transp, c.Intcptn, c.Irrig); //for some reason spelled maxAWS

  c.WF = p.WF + c.dW * c.pF - c.litterfall * p.WF;
  // Include contribution of RootP // Error in old code !
  c.WR = p.WR + c.dW * c.pR - tree.pR.turnover * p.WR - c.RootP;
  c.WS = p.WS + c.dW * c.pS;
  c.W = c.WF+c.WR+c.WS;

  return c;
}

function init(plantation, soil) {
  var p = {};
  var tree = plantation.seedlingTree; //TODO: decide the case where we start with a coppiced tree?

  p.feedstockHarvest=0;
  p.coppiceCount=0;
  p.coppiceAge = 0;

  p.CumIrrig = 0;
  p.dW = 0;
  p.W = plantation.StockingDensity * plantation.SeedlingMass;
  p.WF = plantation.pF * p.W;
  p.WS = plantation.pS * p.W;
  p.WR = plantation.pR * p.W;
  p.ASW = 0.8 * 10 * soil.maxAWS; // The 10 is because maxAWS is in cm and ASW in mm (?) Why (?)
  p.StandAge = 0;

  tree = plantation.seedlingTree;

  // sla = Specific Leaf Area
  var sla = fn.tdp(p.StandAge,tree.SLA);

  p.LAI = p.WF * 0.1 * sla; // Landsburg eq 9.5

  // These aren't used so can be set to anything;  They are set to match the postgres type
  p.VPD        = 0;
  p.fVPD       = 0;
  p.fT         = 0;
  p.fFrost     = 0;
  p.fNutr      = 0;
  p.fSW        = 0;
  p.fAge       = 0;
  p.PAR        = 0;
  p.xPP        = 0;
  p.Intcptn    = 0;
  p.Irrig      = 0;
  p.CanCond    = 0;
  p.Transp     = 0;
  p.PhysMod    = 0;
  p.pfs        = 0;
  p.pR         = 0;
  p.pS         = 0;
  p.pF         = 0;
  p.litterfall = 0;
  p.NPP        = 0;
  p.RootP      = 0;

  return p;
}

function getWeather(model, setup, month, day) {

  if( setup.dailyStep ) {
    // actual
    if( model.weather[model.currentDate.getFullYear()+'-'+month+'-'+day] !== undefined ) {
      return model.weather[model.currentDate.getFullYear()+'-'+month+'-'+day];
    }

    // modelled daily
    if( model.weather[month+'-'+day] !== undefined ) {
      return model.weather[month+'-'+day];
    }

  } else {
    // actual
    if( model.weather[model.currentDate.getFullYear()+'-'+month] !== undefined ) {
      return model.weather[model.currentDate.getFullYear()+'-'+month];
    }
  }

  // modelled Monthly
  if( model.weather[month] !== undefined ) {
    return model.weather[month];
  }

  throw 'Runtime Error: no weather found for month: '+month;
}

function shouldCoppice(model, setup) {
  // do we have specific coppice dates set?
  if( setup.coppiceDates ) {
    for( var i = 0; i < setup.coppiceDates.length; i++ ) {
      var d = setup.coppiceDates[i];

      if( setup.dailyStep ) {
        if( d.getYear() === this.currentDate.getYear() &&
            d.getMonth() === this.currentDate.getMonth() &&
            d.getDate() === this.currentDate.getDate() ) {
              return true;
        }
      } else {
        if( d.getYear() === this.currentDate.getYear() &&
            d.getMonth() === this.currentDate.getMonth() ) {
              return true;
        }
      }

    }
  } else {

    // do we have an interval set?
    // TODO: this currently only works on 1st of month
    if( model.currentDate.getYear() === setup.yearToCoppice &&
      model.currentDate.getMonth() === setup.monthToCoppice ){

      setup.yearToCoppice = setup.yearToCoppice + setup.coppiceInterval; //next coppice year

      return true;
    }

  }

  return false;
}

function getFunction(name) {
  if( fn[name] ) {
    return fn[name];
  } else if( fn.coppice[name] ) {
    return fn.coppice[name];
  }
  return null;
}

module.exports = function(io) {
  return {
    io : io,
    run : run,
    singleStep : singleStep,
    runSetup : runSetup,
    init : init,
    getFunction : getFunction,
    setIO : function(io) {
      this.io = io;
    },
    getDataModel : function() {
      return dataModel;
    }
  };
};

},{"./dataModel":3,"./fn":19,"./utils":22,"./validate":23}],22:[function(require,module,exports){
function env() {
  if( typeof plv8 !== 'undefined' ) return "plv8";
  if( typeof Logger !== 'undefined' ) return "appscript";
  if( typeof module !== 'undefined' && module.exports) return "node";
}

function log(msg) {
  var e = env();
  if( e == "plv8" ) plv8.elog(NOTICE, 'notice', msg);
  else if( e == "appscript" ) Logger.log(msg);
  else console.log(msg);
}

function clone(obj) {
  if (null == obj || "object" != typeof obj) return obj;
  var copy = obj.constructor();
  for (var attr in obj) {
    if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
  }
  return copy;
}

module.exports = {
  env : env,
  log : log,
  clone : clone
}

},{}],23:[function(require,module,exports){
'use strict';

/*
 * Validate a model run setup.  throw error is badness.
 */
var dataModel = require('./dataModel');
var paramError = 'Validation Error: ';

var validWeatherKeys = [
  /^\d\d\d\d-\d\d$/, // specific weather YYYY-MM for monthly timestep
  /^\d\d$/, // modelled or average weather MM for monthly timestep
  /^\d\d\d\d-\d\d-\d\d$/, // specific weather YYYY-MM-DD for daily timestep
  /^\d\d-\d\d$/ // modelled or average weather MM-DD for daily timestep
];

module.exports = function(model) {
  validatePlantation(model);
  validateManage(model);
  validateWeather(model);
  validateSoil(model);
};

function validateManage(model) {
  if( !model.manage ) {
    throw paramError+'manage is not definied';
  }

  validateModel(dataModel.manage, model.manage, 'manage');

  if( model.manage.coppiceDates ) {
    if( !Array.isArray(model.manage.coppiceDates) ) {
      throw paramError+'manage.coppiceDates should be an array of date strings.';
    }

    for( var i = 0; i < model.manage.coppiceDates.length; i++ ) {
      if( model.manage.coppiceDates[i].match('^\d\d\d\d-\d\d$') || model.manage.coppiceDates[i].match('^\d\d\d\d-\d\d-\d\d$') ) {
        throw paramError+' invalid manage.coppiceDates format '+model.manage.coppiceDates[i]+'. should be YYYY-MM format.';
      }
    }
  } else {

    if( model.manage.dateCoppiced === undefined ) {
      throw paramError+' manage.dateCoppiced required if manage.coppiceDates not provided';
    }
    if( model.manage.yearsPerCoppice === undefined ) {
      throw paramError+' manage.yearsPerCoppice required if manage.coppiceDates not provided';
    }

  }
}

function validateWeather(model) {
  if( !model.weather ) {
    throw paramError+'No weather defined';
  }

  for( var key in model.weather ) {
    var found = false;
    for( var i = 0; i < validWeatherKeys.length; i++ ) {
      if( key.match(validWeatherKeys[i]) ) {
        found = true;
        break;
      }
    }

    if( !found ) {
      throw paramError+' invalid weather key: '+key;
    }

    validateModel(dataModel.weather, model.weather[key], 'weather');
  }
}


function validateSoil(model) {
  if( !model.soil ) {
    throw paramError+'soil is not definied';
  }

  validateModel(dataModel.soil, model.soil, 'soil');
}

function validatePlantation(model) {
  if( !model.plantation ) {
    throw paramError+'plantation is not definied';
  }
  validateModel(dataModel.plantation, model.plantation, 'plantation');

  if( !model.plantation.seedlingTree ) {
    throw paramError+'plantation.seedlingTree is not definied';
  }
  validateModel(dataModel.tree, model.plantation.seedlingTree, 'plantation.seedlingTree');

  if( !model.plantation.coppicedTree ) {
    throw paramError+'plantation.coppicedTree is not definied';
  }
  validateModel(dataModel.tree, model.plantation.coppicedTree, 'plantation.coppicedTree');
}

function validateModel(dataModel, model, name) {
  var key, item;

  for( key in dataModel.value ) {
    item = dataModel.value[key];
    if( item.required === false ) {
      continue;
    }

    if( model[key] === undefined ) {
      throw paramError+name+'.'+key+' is missing '+
            (item.description ? '('+item.description+')' : '');
    }

    if( typeof item.value === 'object' ) {
      validateModel(item, model[key], name+'.'+key);
    }
  }
}

},{"./dataModel":3}],24:[function(require,module,exports){
var gdrive = require('./gdrive');
var charts;
var inputForm;
var exporter = require('./export');
var offline = require('./offline');

// import model stuff
var model = require('../../poplar-3pg-model');
var modelIO = require('./modelIO');
model.setIO(modelIO);

var daily = false;

var runCallback = null;
var _3pgModel = null;

var inputs = {
  weather : ["month","tmin","tmax","tdmean","ppt","rad","daylight"]
};
var outputs = ["VPD","fVPD","fT","fFrost","PAR","xPP","Intcptn","ASW","CumIrrig",
           "Irrig","StandAge","LAI","CanCond","Transp","fSW","fAge",
           "PhysMod","pR","pS","litterfall","NPP","WF","WR","WS","W"];
var debug = false;
var devmode = false;

var weatherCustomChart = null;

// row raw data does a lot of processing of the results and the current state of what's
// being displayed.  Go ahead an setup the csv data at this point, then if the user
// decides to export, we are all set to to;
var csvResults = null;

var getModel = function() {
  return model;
}

var getOutputs = function() {
  return outputs;
}



var outputDefinitions = require('./outputDefinitions');


function qs(key) {
  key = key.replace(/[*+?^$.\[\]{}()|\\\/]/g, "\\$&");
  var match = location.search.match(new RegExp("[?&]" + key + "=([^&]+)(&|$)"));
  return match && decodeURIComponent(match[1].replace(/\+/g, " "));
}

var init = function(callback) {
  inputForm = require('./inputForm')(this);
  charts = require('./charts');
  charts.setApp(this);

  modelIO.app = this;
  modelIO.model = model;
  modelIO.charts = charts;
  modelIO.inputForm = inputForm;

  // check if flash is installed.  If not, hide the chart type toggle.
  require('./flashblock-detector')(function(val){
      if( val > 0 ) $("#chart-type-btn-group").hide();
  });

  // setup export modal
  exporter.init();
  $("#export-csv").on('click', function(){
      exporter.exportCsv(csvResults);
  });

  var ele = $("#inputs-content");
  inputForm.create(ele);

  $("#runbtn, #runbtn-sm").on('click', function() {
      runModel();
  });

  // initialize the charts
  charts.init();

  // set default config
  $("#input-manage-datePlanted").val(new Date().toISOString().replace(/T.*/,''));
  $("#input-manage-dateCoppiced").val(new Date(new Date().getTime()+(86400000*2*365)).toISOString().replace(/T.*/,''));
  $("#input-manage-dateFinalHarvest").val(new Date(new Date().getTime()+(86400000*10*365)).toISOString().replace(/T.*/,''));

  // setup nice scrolling
  $('.app-nav').on('click', function(e) {
      e.preventDefault();
      $('html, body').animate({
          scrollTop: $(this.hash).offset().top-55
       }, 700);
 });

  $(window).resize(function(){
      charts.resize();

      if( weatherCustomChart ) {
          weatherCustomChart = charts.createWeatherChart($('#custom-weather-chart')[0], model.custom_weather);
      }
  });

  callback();
}


var runComplete = function(rows) {
  if ( runCallback ) runCallback(rows);
  if( hideInitLoading ) hideInitLoading();
  runCallback = null;
};

var monthsToRun = function() {
  var d1 = $("#input-manage-datePlanted").val();
  if (d1 && d1 !== "") {
      d1 = new Date($("#input-manage-datePlanted").val());
  } else {
      d1 = new Date();
  }

  var d2 = $("#input-manage-dateFinalHarvest").val();
  if (d2 && d2 !== "") {
      d2 = new Date($("#input-manage-dateFinalHarvest").val());
  } else {
      d2 = new Date();
  }

  var months;
  months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth() + 1;
  months += d2.getMonth();
  return months <= 0 ? 1 : months+1;
}


var runModel = function(isRt) {

  if ($("#runbtn, #runbtn-sm").hasClass("disabled")) return;
  $("#runbtn, #runbtn-sm").addClass("disabled").html("Running...");

  if( !checkWeather() ) return;

  // let UI process for a sec before we tank it
  // TODO: this should be preformed w/ a webworker
  setTimeout(function() {
      ga('send', 'event', 'ui', 'interaction', 'model-run', 1);

      // read everything so the variations are set
      model.variations = {};
      modelIO.readFromInputs();

      // make sure we are only setting 2 variation parameters
      var params = [];
      for( var key in model.variations ) params.push(key);
      if( params.length > 2 ) {
          alert("There is a limit of 2 variation parameters per run.  Currently you are varying "+
                "the following parameters:\n\n -"+params.join("\n -"));
          $("#runbtn, #runbtn-sm").removeClass("disabled").html("<i class='icon-play'></i> Run");
          return;
      }

      // let the world know what we are doing
      if( !isRt ) gdrive.runModelRt();

      // show what we are doing
      $("#variationAnalysisStatus").html("<b>"+(params.length == 0 ? "None" : params.join(", "))+"</b>");

      // we are only running once
      if ( params.length === 0 ) {
          ga('send', 'event', 'ui', 'interaction', 'model-run-singleParam', 1);

          runCallback = function(rows) {
              showResults(rows);
          };

          model.dailyStep = daily;
          var months = monthsToRun();
          if( daily ) months = months * 30;

          model.run(months);

      } else {
          ga('send', 'event', 'ui', 'interaction', 'model-run-variation', 1);

          // set variation order
          var runs = [];
          for( var i = 0; i < model.variations[params[0]].length; i++ ) {
              var obj = {
                  inputs : {},
                  output : null
              };
              obj.inputs[params[0]] = model.variations[params[0]][i];
              if( params.length > 1 ) {
                  for( var j = 0; j < model.variations[params[1]].length; j++ ) {
                      var t = $.extend(true, {}, obj);
                      t.inputs[params[1]] = model.variations[params[1]][j];
                      runs.push(t);
                  }
              } else {
                  runs.push(obj);
              }
          }

          runVariation(0, runs);
      }
  }, 250);
}

var runVariation = function(index, runs) {
  // set input variables for run
  var run = runs[index];
  for( var key in run.inputs ) {
      $("#input-"+key.replace(/\./g, '-')).val(run.inputs[key]);
  }

  runCallback = function(data) {
      runs[index].output = data;
      index++;

      if (runs.length == index) {
          // reset the constant to the first value
          for( var key in model.variations ) {
              $("#input-"+key.replace(/\./g, '-')).val(model.variations[key].join(", "));
          }
          showResults(runs);
      } else {
          runVariation(index, runs);
      }
  };

  var months = monthsToRun();
  if( daily ) months = months * 30;

  model.run(months);
};


var showResults = function(result) {
  var currentResults;
  if( result[0] instanceof Array ) {
      currentResults = [{
          singleRun : true,
          inputs : {},
          output : result
      }]
  } else {
    currentResults = result;
  }


  showRawOutput(currentResults);
  charts.updateCharts(currentResults, true);

  setTimeout(function() {
      $("#runbtn, #runbtn-sm").removeClass("disabled").html("<i class='icon-play'></i> Run");
  }, 250);

}

// make sure all the weather is set.  #1 thing people will mess up
var checkWeather = function() {
  // first get current months we are going to run,
  var start = $("#input-manage-datePlanted").val();

  var end = $("#input-manage-dateFinalHarvest").val().split("-");
  var eMonth = parseInt(end[1]);
  var eYear = parseInt(end[0]);

  var cDate = new Date(start);

  // now see if we have custom weather coverage
  var hasCoverage = true;
  var count = 0;
  while( count < 10000 ) {
      if( !model.custom_weather ) {
          hasCoverage = false;
          break;
      }

      var m = (cDate.getMonth()+1)+'';
      var y = cDate.getFullYear();
      if( m.length == 1 ) m = '0'+m;

      if( cDate.getMonth()+1 == eMonth && y == eYear ) {
          break;
      } else if( !model.custom_weather[y+'-'+m] ) {
          hasCoverage = false;
          break;
      }

      cDate.setMonth(cDate.getMonth()+1);
      count++;
  }

  if( hasCoverage ) return true;

  // if not make sure we have averages selected
  for ( var i = 0; i < 12; i++) {
    var m = (i+1)+'';
    if( m.length == 1 ) m = '0'+m;

      for ( var j = 1; j < inputs.weather.length; j++) {
          var c = inputs.weather[j];
          var val = parseFloat($("#input-weather-" + c + "-" + m).val());
          if( !val && val != 0 ) {
              alert("Missing weather data: "+c+" for month "+m+"\n\n"+
                    "Did you select a location (Setup) and/or are all weather/soil fields filled out?");
              $("#runbtn, #runbtn-sm").removeClass("disabled").html("<i class='icon-play'></i> Run");
              return false;
          }
      }
  }

  return true;
}

var setWeather = function(data) {
  if( !model.custom_weather ) model.custom_weather = {};

  if( data ) {
      for( var key in data ) {

          // clean up date format
          var date = key.replace(/[^\d-]/,'');
          var parts = date.split('-');

          if( parts.length < 2 ) {
              return alert('Invalid Date Format.  Dates should be in YYYY-MM format');
          }
          if ( parts[1].length != 2 ) {
              date = parts[0]+"-0"+parts[1];
          }

          model.custom_weather[date] = data[key];
      }
  }

  // create array so we can sort
  var arr = [];
  var headers = ['date'];
  for( var date in model.custom_weather ) {

      var t = [date];
      for( var key in model.custom_weather[date] ) {
          if( key == 'nrel' ) continue;
          if( arr.length == 0 ) headers.push(key);
          t.push(model.custom_weather[date][key]);
      }

      arr.push(t);
  }

  if( arr.length == 0 ) {
      $('#custom-weather-panel').html("No weather data has been uploaded.");
      return;
  }

  var html = '<div style="overflow:auto;max-height:600px"><table class="table table-striped"><tr>';

  arr.sort(function(a, b){
      var d1 = new Date(a[0]+"-01").getTime();
      var d2 = new Date(b[0]+"-01").getTime();

      if( d1 < d2 ) {
          return 1;
      } else if( d1 > d2 ) {
          return -1;
      }

      return 0;
  });

  for( var i = 0; i < headers.length; i++ ) {
      html += '<th>'+headers[i]+'</th>';
  }
  html += '</tr>';

  for( var i = 0; i < arr.length; i++ ) {
      html += '<tr><td>'+arr[i].join('</td><td>')+'</td></tr>';
  }

  $('#custom-weather-panel').html(html+'</table></div><div id="custom-weather-chart"></div>');

  setTimeout(function(){
      weatherCustomChart = charts.createWeatherChart($('#custom-weather-chart')[0], model.custom_weather);
  }, 1000);

};

var showRawOutput = function(results) {

  // selected in the charts output
  var vars = $("#chartTypeInput").val();

  // find the rows we care about
  var chartRows = {};
  for( var i = 0; i < results[0].output[0].length; i++ ) {
      if( vars.indexOf(results[0].output[0][i]) > -1 ) chartRows[results[0].output[0][i]] = i;
  }

  var tabs = $('<ul class="nav nav-pills" id="rawOutputTabs"  data-tabs="pill"></ul>');
  var contents = $('<div class="pill-content" style="overflow:auto;margin-top:15px"></div>');

  for ( var i = 0; i < vars.length; i++) {
      tabs.append($('<li '+(i == 0 ? 'class="active"' : "")+'><a href="#rawout'
          +vars[i]+'" data-toggle="tab">'+vars[i]+'</a></li>'));

      contents.append($('<div class="pill-pane ' + (i == 0 ? 'active' : "")
          + '" id="rawout' + vars[i] + '"></div>'));
  }

  $("#output-content").html("").append(tabs).append(contents);
  $("#rawOutputTabs").tab();

  csvResults = {
      config : modelIO.exportSetup(),
      data : {}
  };

  // some rows have strings, we don't want these
  // ignore string rows
  /*for( var i = 0; i < results.length; i++ ) {
      var clean = [results[i].output[0]];
      for( var j = 1; j < results[i].output.length; j++ ) {
          if( typeof results[i].output[j][0] != 'string' ) clean.push(results[i].output[j]);
      }
      results[i].output = clean;
  }*/

  var cDate = new Date($("#input-manage-datePlanted").val());

  var table, row;
  for( var key in chartRows ) {
      table = "<table class='table table-striped'>";

      csvResults.data[key] = [];

      for( var j = 0; j < results[0].output.length; j++ ){
          csvResults.data[key][j] = [];

          // set header row
          if( j == 0 ) {
              csvResults.data[key][j].push('month');
              csvResults.data[key][j].push('date');

              table += "<tr><th>Step</th><th>Date</th>";
              for( var z = 0; z < results.length; z++ ) {
                  table += "<th>";
                  var tmp = [];

                  for( var mType in results[z].inputs ) {
                      tmp.push(mType+"="+results[z].inputs[mType]);
                      table += "<div>"+mType+"="+results[z].inputs[mType]+"</div>";
                  }

                  if( tmp.length == 0 ) {
                      csvResults.data[key][j].push(key);
                      table += key;
                  } else {
                      csvResults.data[key][j].push(tmp.join(" "));
                  }
                  table += "</th>";
              }

              table += "</tr>";
          } else {
              //var date = new Date(cDate.getYear()+1900, cDate.getMonth()+j, cDate.getDate());
              //var m = date.getMonth()+1;
              //if( m < 10 ) m = '0'+m;

              table += "<tr><td>"+j+"</td><td>"+results[0].output[j][0]+'</td>';

              csvResults.data[key][j].push(j);
              csvResults.data[key][j].push(results[0].output[j][0]);

              var v;
              for( var z = 0; z < results.length; z++ ) {
                  v = results[z].output[j][chartRows[key]];
                  table += "<td>"+v+"</td>";
                  csvResults.data[key][j].push(v);
              }
              table += "</tr>";
          }

      }
      $("#rawout" + key).html(table+"</table>");
  }

  // make sure we can see the export btn
  if( !offlineMode ) $("#show-export-csv").show();
};

module.exports = {
  init : init,
  outputs : outputs,
  inputs : inputs,
  getModel : getModel,
  runModel : runModel,
  showRawOutput : showRawOutput,
  monthsToRun : monthsToRun,
  outputDefinitions : outputDefinitions,
  qs : qs,
  setWeather : setWeather,
  gdrive : gdrive,
  runComplete : runComplete,
  getModelIO : function() {
    return modelIO;
  }
};

},{"../../poplar-3pg-model":1,"./charts":25,"./export":26,"./flashblock-detector":27,"./gdrive":28,"./inputForm":30,"./modelIO":31,"./offline":33,"./outputDefinitions":34}],25:[function(require,module,exports){
var app;

// only draw charts if width has changed
var cWidth = 0;

// there is no way to get the colors for the legends (to make your own)
// this post:
// gives these values.  This is a HACK, if they ever change, we need to update
var googleChartColors = ["#3366cc","#dc3912","#ff9900","#109618","#990099","#0099c6",
                      "#dd4477","#66aa00","#b82e2e","#316395","#994499","#22aa99",
                      "#aaaa11","#6633cc","#e67300","#8b0707","#651067","#329262",
                      "#5574a6","#3b3eac","#b77322","#16d620","#b91383","#f4359e",
                      "#9c5935","#a9c413","#2a778d","#668d1c","#bea413","#0c5922"
                      ,"#743411"];

var weatherChartOptions = {
  title : 'Weather',
  height : 300,
  vAxes: [{
          title: "Radiation (MJ/day); Temperature (^C); Dew Point (^C); Daylight (h)",
          minValue : -5,
          maxValue : 35
        },{
          title: "Precipitation (mm)",
          minValue : -50,
          maxValue : 350
        }],
  hAxis: {title: "Month"},
  seriesType: "bars",
  series: {
      0: {type: "line", targetAxisIndex:0},
      1: {type: "line", targetAxisIndex:0},
      2: {type: "line", targetAxisIndex:0},
      3: {type: "area", targetAxisIndex:1},
      4: {targetAxisIndex:0}
  }
}

// template for the popup
var sliderPopup = $(
      "<div class='slide-popup'>" +
          "<i class='icon-remove-circle pull-right slide-popup-close'></i>"+
          "<div id='carousel' class='owl-carousel owl-theme' style='margin-top:15px'></div>" +
	"</div>");

var sliderPopupBg = $("<div class='slide-popup-bg'>&nbsp;</div>");

// only draw charts if someone has click a checkbox
var changes = false;

// when sizing, wait a ~300ms before triggering redraw
var resizeTimer = -1;

var chartTypeSelector, chartCheckboxes, cData;

function init() {

  $("#show-chartspopup-btn").on('click',function() {
      showPopup();
  });

  // setup chart selectors
  $("#chart-modal").modal({show:false});

  // set popup click handlers
  $("#chartType-selectAll").on('click',selectAll);
  $("#chartType-unselectAll").on('click',unselectAll);

  chartTypeSelector = $("#chartTypeInput");
  chartCheckboxes = $("#chartSelections");

  var c1 = $("#chartSelections-c1");
  var c2 = $("#chartSelections-c2");
  for( var i = 0; i < app.outputs.length; i++) {
      var val = app.outputs[i];
      chartTypeSelector.append($("<option value='" + val + "' "
              + (val == 'WR' || val == 'WS' || val == 'WF' ? 'selected' : '')
              + ">" + val + "</option>"));

      if( i % 2 == 0 ) {
          c1.append($('<div class="checkbox"><label><input type="checkbox"'
                  + (val == 'WR' || val == 'WS' || val == 'WF' ? 'checked="checked"' : '')
                  + ' value="'+val+'"> '+_createDescription(val)+'</div>'));
      } else {
          c2.append($('<div class="checkbox"><label><input type="checkbox"'
                  + (val == 'WR' || val == 'WS' || val == 'WF' ? 'checked="checked"' : '')
                  + ' value="'+val+'"> '+_createDescription(val)+'</div>'));
      }
  }

  chartCheckboxes.find(".fn-toggle").on('click',function(){
      $("#"+$(this).attr("datatarget")).toggle('slow');
  });

  chartCheckboxes.find("input[type=checkbox]").on('change', function(){
      if( $(this).is(":checked") ) select($(this).attr("value"));
      else unselect($(this).attr("value"));
  });

  $("#select-charts-btn, #select-charts-title-btn").on('click', function(){
      $("#chart-modal").modal('show');
      changes = false;
  });

  $(".chart-modal-close").on('click', function(){
      $("#chart-modal").modal('hide');
      if( changes && cData ) {
          setTimeout(function(){
              updateCharts();
              // update raw data as well
              app.showRawOutput(cData);
          },400);

      }
  });

  $(".chart-type-toggle").on('click', function(){
      if( !$(this).hasClass("active") ) {
          $(".chart-type-toggle.active").removeClass("active");
          $(this).toggleClass("active");
          updateCharts();
      }
  });
}

// make sure and end label tag
function _createDescription(val) {
  if( !app.outputDefinitions[val] ) return "<b>"+val+"</b></label>";

  var desc = app.outputDefinitions[val];
  var label = desc.label && desc.label.length > 0 ? " - "+desc.label : "";
  var units = desc.units && desc.units.length > 0 ? " ["+desc.units+"]" : "";

  var label = "<b>"+val+"</b><span style='font-size:12px'>"+label+units+"</span></label>";
  var hasDesc = desc.description && desc.description.length > 0;
  if( hasDesc ) {
      label += "<div style='font-size:11px;color:#888;font-style:italic'>"+desc.description;
  }

  var fName = desc.altFnName || val;
  var fn = app.getModel().getFunction(fName);

  if( fn || desc.fn ) {
      if( !hasDesc ) label += "<div style='font-size:11px'>";
      label += " <a style='font-style:normal;cursor:pointer' datatarget='fn-desc-"+val+"' class='fn-toggle'>fn()</a></div>";

      label += "<div id='fn-desc-"+val+"' style='display:none;font-size:11px;overflow:auto' class='well well-sm'>"+
                  (fn||desc.fn).toString().replace(/ /g,'&nbsp;').replace(/\n/g,'<br />')+"</div>";
  } else if ( hasDesc ) {
      label += "</div>";
  }

  // TODO: add fn well
  return label+"<br />";
}

function select(val) {
  chartTypeSelector.find("option[value="+val+"]").attr("selected","selected");
  chartCheckboxes.find("input[value="+val+"]").prop("checked",true);
  changes = true;
}

function unselect(val) {
  chartTypeSelector.find("option[value="+val+"]").removeAttr("selected");
  chartCheckboxes.find("input[value="+val+"]").prop("checked",false);
  changes = true;
}

function selectAll() {
  for( var i = 0; i < app.outputs.length; i++) select(app.outputs[i]);
}

function unselectAll() {
  for( var i = 0; i < app.outputs.length; i++) unselect(app.outputs[i]);
}

function remove(ele) {
  ele.parent().hide('slow', function(){
      ele.parent().remove();
      unselect(ele.attr('type'));
  });

}

function print(chartContainer) {
  ga('send', 'event', 'ui', 'interaction', 'print-chart', 1);


var disp_setting="toolbar=yes,location=no,directories=yes,menubar=yes,";
  disp_setting+="scrollbars=yes,width=800, height=600, left=25, top=25";

  var svg = chartContainer.find("svg");
  var html = chartContainer.find("div").html();

  var docprint=window.open("","",disp_setting);
  docprint.document.open();
  docprint.document.write('<html><head><title></title>');
  docprint.document.write('</head><body marginwidth="0" marginheight="0" onLoad="self.print()"><center>');
  docprint.document.write(html);
  docprint.document.write('</center></body></html>');
  docprint.document.close();
  docprint.focus();

}


function setData(data) {
  cData = data;
}

// basically redraw everything
function resize() {
  // require more than a 30 pixel width change (so we don't redraw w/ scroll bars added)
  var winWidth = $(window).width();
  if( cWidth > winWidth - 15 && cWidth < winWidth + 15 ) return;
  cWidth = winWidth;

  if( resizeTimer != -1 ) clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function() {
      resizeTimer = -1;
      updateCharts();
  },300);
}

function updateCharts(results, animate) {
  if( results ) setData(results);
  if( !cData ) return;

  $("#show-chartspopup-btn").show();

  // create a legend if there is more than one run
  var legend = "";
  if( !cData[0].singleRun ) {
      var c1 = "";
      var c2 = "";
      for( var i = 0; i < cData.length; i++ ) {
          var ele = "<div style='min-height:40px;margin-bottom:10px'><div class='legend-square' style='background-color:"+googleChartColors[i]+"'>&nbsp;</div>";
          for( var mType in cData[i].inputs ) {
              ele += "<div class='legend-text'>"+mType+"="+cData[i].inputs[mType]+"</div>";
          }

          if( i % 2 == 0 ) c1 += ele + "</div>"
          else c2 += ele + "</div>"
      }
      legend = "<div><a id='legend-panel-toggle' style='margin-left:5px;cursor:pointer'>Legend</a></div>"+
               "<div style='border-bottom:1px solid #eee;padding-bottom:5px;margin-bottom:15px'>"+
               "<div class='row' id='legend-panel'><div class='col-sm-6'>"+c1+"</div>"+
               "<div class='col-sm-6'>"+c2+"</div>"+
               "</div></div>";
  }
  $("#chart-content").html(legend);
  $("#legend-panel-toggle").on('click', function(){
      $("#legend-panel").toggle("slow");
  });


  var types = chartTypeSelector.val();
  for ( var i = 0; i < types.length; i++) {
      _showMainChart(types[i], animate);
  }
}

function showPopup() {
  ga('send', 'event', 'ui', 'interaction', 'show-chart-popup', 1);


  sliderPopup.find(".owl-theme").html("");
  $('body').scrollTop(0).css('overflow','hidden').append(sliderPopupBg).append(sliderPopup);

  // this could case badness....  why doesn't it live when removed from DOM?
  sliderPopup.find('.slide-popup-close').on('click',function(){
      hidePopup();
  });

  var types = chartTypeSelector.val();
  for ( var i = 0; i < types.length; i++) {
      _showPopupChart(types[i]);
  }

  $('#carousel').owlCarousel({
      navigation : true, // Show next and prev buttons
      slideSpeed : 300,
      paginationSpeed : 400,
      singleItem:true
  });
}

function hidePopup() {
  sliderPopupBg.remove();
  sliderPopup.remove();
  $('body').css('overflow','auto');
}

function _showMainChart(type, animate) {
  var chartType = $(".chart-type-toggle.active").attr("value");
  var panel = $("<div />");
  var outerPanel = $("<div>"+
  	"<a class='btn btn-xs btn-default' style='"+(chartType != "timeline" ? "position:absolute;z-index:10;margin:0 0 -20px 20px" : "margin-bottom:5px")+
      "' type='"+type+"'>" +
  	"<i class='icon-remove'></i> "+type+"</a></div>");
  outerPanel.find("a").on('click', function(){
          remove($(this));
  });
  if( chartType == "timeline" ) outerPanel.css("margin-bottom","20px");
  $("#chart-content").append(outerPanel.append(panel));
  _createChart(type, chartType, panel, false, null, animate);
}

function _showPopupChart(type) {
  var panel = $("<div class='item'></div>");

  var printBtn = $("<a class='btn btn-sm btn-default' style='margin-left:16px'><i class='icon-print'></i> Print</a>").on('click',function(){
     print(chartPanel);
  });
  panel.append(printBtn);

  var chartPanel = $("<div></div>");
  panel.append(chartPanel);

  sliderPopup.find(".owl-theme").append(panel);
  _createChart(type, 'line', chartPanel, true, [Math.round($(window).width()*.88), Math.round(($(window).height()*.90)-125)]);
}

function _createChart(type, chartType, panel, showLegend, size, animate) {
  var col = 0;

  var dt = new google.visualization.DataTable();

  if( chartType == 'timeline' ) {
      dt.addColumn('date', 'Month');
  } else {
      //dt.addColumn('number', 'Month');
      dt.addColumn('string', 'Month');
  }

  // set the first column
  if( !cData[0].singleRun ) {
      for( var i = 0; i < cData.length; i++ ) {
          var label = "";
          for( var key in cData[i].inputs ) {
              label += key.replace(/.*\./,'')+"="+cData[i].inputs[key]+" \n";
          }
          label = label.replace(/,\s$/,'');
          dt.addColumn('number', label);
      }
  } else {
      dt.addColumn('number', type);
  }

  // find the column we want to chart
  for ( var i = 0; i < cData[0].output[0].length; i++) {
      if (cData[0].output[0][i] == type) {
          col = i;
          break;
      }
  }

  var cDate = new Date($("#input-manage-datePlanted").val());

  var data = [];
  var max = 0;
  // create the [][] array for the google chart
  for ( var i = 1; i < cData[0].output.length; i++) {
      //if (typeof cData[0].output[i][col] === 'string') continue;

      var row = [];

      //var date = new Date(cDate.getYear()+1900, cDate.getMonth()+i, cDate.getDate());
      if( chartType == "timeline" ) {
          // add on month
          row.push(new Date(cData[0].output[i][0]));
      } else {
          row.push(cData[0].output[i][0]);
      }

      for ( var j = 0; j < cData.length; j++) {
          if( cData[j].output[i][col] > max ) max = cData[j].output[i][col];
          row.push(cData[j].output[i][col]);
      }

      data.push(row);
  }

  dt.addRows(data);

  if( app.outputDefinitions[type] ) {
      var desc = app.outputDefinitions[type];
      var label = desc.label && desc.label.length > 0 ? " - "+desc.label : "";
      var units = desc.units && desc.units.length > 0 ? " ["+desc.units+"]" : "";
      type = type+label+units;
  }


  var options = {
          vAxis : {
              title : type
          },
          hAxis : {
              title : "Month"
          }
  }
  if( !showLegend ) options.legend = {position:"none"};

  if( size ) {
      options.width = size[0];
      options.height = size[1];
  } else {
      options.width = panel.width();
      options.height = options.width*.4;
  }
  panel.width(options.width).height(options.height);

  if( chartType == 'timeline' ) {
      options.displayAnnotations = true;
      var chart = new google.visualization.AnnotatedTimeLine(panel[0]);
      chart.draw(dt, options);
  } else {
      var chart = new google.visualization.LineChart(panel[0]);
      chart.draw(dt, options);
  }
}

function createWeatherChart(root, data) {
  $(root).html('');

  var dt = new google.visualization.DataTable();
  dt.addColumn('string', 'Month');
  dt.addColumn('number', 'Min Temperature');
  dt.addColumn('number', 'Max Temperature');
  dt.addColumn('number', 'Dew Point');
  dt.addColumn('number', 'Precipitation');
  dt.addColumn('number', 'Radiation');
  dt.addColumn('number', 'Daylight');

  for( var date in data ) {
      var obj = data[date];
      dt.addRow([
          date+'',
          obj.tmin || 0,
          obj.tmax || 0,
          obj.tdmean || 0,
          obj.ppt || 0,
          obj.rad || 0,
          obj.daylight || 0
      ]);
  }

  var chart = new google.visualization.ComboChart(root);
  chart.draw(dt, weatherChartOptions);

  return chart;
}


module.exports = {
  setApp : function(a) {
    app = a;
  },
    init : init,
    setData : setData,
    select : select,
    unselect : unselect,
    selectAll : selectAll,
    unselectAll : unselectAll,
    updateCharts : updateCharts,
    remove : remove,
    showPopup: showPopup,
    hidePopup: hidePopup,
    resize : resize,
    createWeatherChart : createWeatherChart
}

},{}],26:[function(require,module,exports){
var gdrive = require('./gdrive');

function init() {
  $("#export-modal").modal({
          show : false
      });

      $("#show-export-csv").on('click', function(){
        _setMessage(null);

        $("#export-name").val("3PG Model Results ("+new Date().toISOString().replace(/T/,' ').replace(/\.\d*Z/,'')+")");
          $("#export-modal").modal('show');
      });
}

function _setMessage(msg, type, progress) {
  if( !msg ) {
    return $("#export-msg").hide();
  }
  $("#export-msg").show();

  if( progress ) {
    $("#export-msg-progress").show();
  } else {
    $("#export-msg-progress").hide();
  }

  $('#export-msg').attr("class",'alert alert-'+type);
  $('#export-msg-text').html(msg);
}

function _updateProgress(index, total) {
  percent = 100 * ( index / total );
  $("#export-msg-progress-bar").attr("aria-valuenow", percent).css("width",percent+"%");
}

// see if an error exists, if so, set state
function _checkError(file) {
  var errorMessage = null;
  if( !file ) errorMessage = "Error creating file on Google Drive :(";
  if( file.error ) errorMessage = file.message;

  if( errorMessage ) {
    _setMessage(errorMessage, "danger");
    $("#export-csv").removeClass("disabled").html("Export");
    return true;
  }
  return false;
}

  // export as csv
function exportCsv(results) {
  ga('send', 'event', 'ui', 'interaction', 'export-drive-csv', 1);

  $("#export-csv").addClass("disabled").html("Exporting...");

  var name = $("#export-name").val();
  if( name.length == 0 ) {
    _setMessage("Please provide a folder name", "danger")
    $("#export-csv").removeClass("disabled").html("Export");
    return;
  }

  var data = results.data;

  // create a list so we can recursively iterate
  var keys = [];
  for( var key in data ) keys.push(key);

  // create folder
  _setMessage("Creating export folder...", "info", true);
  _updateProgress(1, keys.length+2);
  gdrive.saveFile(name,"AHB 3PG Model Results","application/vnd.google-apps.folder","",function(file){
    if( _checkError(file) ) return;
    var parent = file.id;
    _updateProgress(2, keys.length+2);

    // create a nice file describing the current export
    _setMessage("Creating config file...", "info", true);
    delete results.config.plantation_state;
    var config = JSON.stringify(results.config,null,"  ");
    gdrive.saveFile("config.txt","AHB 3PG Model - Run Configuration","text/plain",config,function(file){
      if( _checkError(file) ) return;
      _updateProgress(3, keys.length+2);

      _createExport(0, keys, data, parent);
    },{parent: parent})
  });
}

function _createExport(index, keys, data, parent) {

  // we are all done :)
  if( index == keys.length ) {
    _updateProgress(1, 1);
    _setMessage("Export Successful.<br /><a href='https://drive.google.com/#folders/" + parent +
          "' target='_blank'><i class='icon-external-link-sign'></i> Open in Google Drive</a>", "success");
    $("#export-csv").removeClass("disabled").html("Export");
  } else {

    var key = keys[index];
    var csv = "";

    // TODO: add month and date

    for( var i = 0; i < data[key].length; i++ ) {
      if( data[key][i].length == 0 ) continue; // ignore the blank rows

      for( var j = 0; j < data[key][i].length; j++ ) csv += data[key][i][j]+",";
      csv = csv.replace(/,$/,'')+"\n";
    }

    _setMessage("Creating "+keys[index]+".csv... ", "info", true);
    gdrive.saveFile(keys[index]+".csv","","text/csv",csv,function(file){
      if( _checkError(file) ) return;

      _updateProgress(index+4, keys.length+2);

      index++;
      _createExport(index, keys, data, parent);
    },{convert: true, parent: parent});
  }
};

module.exports = {
  exportCsv : exportCsv,
  init      : init
};

},{"./gdrive":28}],27:[function(require,module,exports){
// https://github.com/browserstack/flashblock-detector

module.exports = function(callbackMethod){
    var return_value = 0;

    if(navigator.plugins["Shockwave Flash"]) {
          embed_length = $('embed').length;
          object_length = $('object').length;

          if((embed_length > 0) || (object_length > 0)) {
              /* Mac / Chrome using FlashBlock + Mac / Safari using AdBlock */
              $('object, embed').each(function() {
                    if($(this).css('display') === 'none'){
                        return_value = 2;
                    }
              });
          } else {
              /* Mac / Firefox using FlashBlock */
              if( $('div[bginactive]').length > 0 ){
                    return_value = 2;
              }
          }
    } else if(navigator.userAgent.indexOf('MSIE') > -1) {
          try {
              new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
          } catch(e) {
              return_value = 2;
          }
    } else {
          /* If flash is not installed */
          return_value = 1;
    }

    if(callbackMethod && typeof(callbackMethod) === "function") {
          callbackMethod(return_value);
    } else {
          return return_value;
    }
};

},{}],28:[function(require,module,exports){
var Oauth = require('./oauth');
var gdriveRT = require('./gdriveRT');
var app;


var MIME_TYPE = "application/vnd.ahb-3pg.run";
var TREE_MIME_TYPE = "application/vnd.ahb-3pg.tree";
var DRIVE_API_VERSION = "v2";

// google oauth access token
var token = "";

// currently loaded gdrive file id
var loadedFile = null;
// list of currently loaded files (metadata)
var fileList = [];
// google drive share client
var client = null;

// loaded tree and management
var loadedTree = null;
// list of currently loaded tree files (metadata)
var treeList = [];

// current MIME TYPE we are saving
var saveMimeType = "";

/***
 *  Initialize google drive panels, btns and login
 ***/
function init(application, callback) {
  app = application;
  gdriveRT.setApp(app);

  // init bootstrap modal
  $("#save-modal").modal({
    show : false
  });

  // init bootstrap modal
  $("#load-modal").modal({
    show : false
  });

  // the about modal link is created below, so why not...
  $("#about-modal").modal({
    show : false
  });

  // the about modal link is created below, so why not...
  $("#help-modal").modal({
    show : false
  });

  // set the 'update' btn click handler
  $("#save-update-btn").on('click', function() {
    _updateCurrentFile();
  });

  // set the 'new' btn click handler
  $("#save-new-btn").on('click', function() {
    _saveNewFile();
  });

  // create the top right menu
  _createLoginBtn();

  // load the google auth and drive api's
  _loadApi(function() {
    // if the user is authorized grab the refresh token
    Oauth.isAuthorized(function(refreshToken){
      // if there is no refresh token, leave, we are initialized
      if( !refreshToken ) return callback();

      // if we have a refesh token, then user is all set,
      // get a new access token so we can start using the api's
      // grab their information and display
      Oauth.getAccessToken(function(t){
        token = t;
        if( token ) _setUserInfo();
        callback();
      });
    });

    // check if access token has expired
    setInterval(function() {
      _checkToken();
    }, 1000 * 5 * 60);
  });

  // setup the tree 'share' btn
  $("#share-tree-btn").on('click', function(){
    // see if we have a share client
    if( client == null ) {
      // no client, load api
      gapi.load('drive-share', function(){
        // on load, show the share popup with the current tree
         client = new gapi.drive.share.ShareClient(Oauth.APP_ID);
          client.setItemIds([loadedTree]);
         client.showSettingsDialog();
       });
    } else {
      // we have a client, show the share popup with current tree
      client.setItemIds([loadedFile]);
       client.showSettingsDialog();
    }
  });

}

/***
 * Save the current model as a new google drive file
 ***/
function _saveNewFile() {
  ga('send', 'event', 'ui', 'interaction', 'save-drive-file', 1);

  // grab the name of the new file
  var name = $("#save-name-input").val();
  if( name.length == 0 ) { // we always want a name, alert and quit
    _setSaveMessage('Please provide a filename.','info');
    return;
  }

  // see what kind of file we are creating based on the saveMimeType var
  if( saveMimeType == MIME_TYPE ) {
    data = app.getModelIO().exportSetup();
  } else if ( saveMimeType == TREE_MIME_TYPE ) {
    data = app.getModelIO().exportSetup().tree;
  } else { // badness
    alert("Unknown MIME_TYPE: "+saveMimeType);
    return;
  }

  // set the user know what we are doing
  _setSaveMessage('<i class="icon-spinner icon-spin"></i> Saving File...','info');

  // save the file
  saveFile(name,
      $("#save-description-input").val(),
      saveMimeType,
      data,
      function(resp) {
        // let the user know what happened
        if( resp.error ) return _setSaveMessage('Failed to save to Google Drive :(','danger');
        else _setSaveMessage('Sucessfully saved.','success');

        // wait a tick to hide the popup, so user sees success message
        setTimeout(function(){
          $("#save-modal").modal('hide');
        },1500);

        // show the share btn
        if( saveMimeType == MIME_TYPE ) {
          // we have a new file, update our list
          _updateFileList();

          // show the share btns
          $("#share-btn").parent().show();
          $("#open-in-drive").attr("href","https://docs.google.com/file/d/"+resp.id).parent().show();

          // set the loaded file id
          loadedFile = resp.id;
        } else if ( saveMimeType == TREE_MIME_TYPE ) {
          // we have a new tree, update the list
          _updateTreeList();

          // show the tree share btns
          $("#share-tree-btn").show();
          $("#loaded-tree-name").html(name).parent().show();

          // set the loaded trees
          loadedTree = resp.id;
        }
      }
  );
}

/***
 * Update the currently loaded google drive file
 ***/
function _updateCurrentFile() {
  ga('send', 'event', 'ui', 'interaction', 'update-drive-file', 1);

  // let the user know what we are doing
  _setSaveMessage('<i class="icon-spinner icon-spin"></i> Updating...','info');

  var file = {};
  var data = {};

  // grab the corrent data and fileid based on mimeType
  if( saveMimeType == MIME_TYPE ) {
    file = loadedFile;
    data = app.getModelIO().exportSetup();
  } else if ( saveMimeType == TREE_MIME_TYPE ) {
    file = loadedTree;
    data = app.getModelIO().exportSetup().tree;
  } else { // badness
    alert("Unknown MIME_TYPE: "+saveMimeType);
    return;
  }

  // update the google drive file
  updateFile(file,
      data,
      function(resp){
        // let the user know what happened
        if( resp.error ) return _setSaveMessage('Failed to update on Google Drive :(','danger');
        else _setSaveMessage('Update Successful.','success');

        // wait a tick so the user knows update was success
        setTimeout(function(){
          $("#save-modal").modal('hide');
        },1500);

        // update the list for whatever type was updated
        if( saveMimeType == MIME_TYPE ) {
          _updateFileList();
        } else if ( saveMimeType == TREE_MIME_TYPE ) {
          _updateTreeList();
        }
      }
  );
}

/***
 * set a message for the 'load from drive' popup.
 *  type - boostrap alert type
 ***/
function _setLoadMessage(msg, type) {
  if( !msg ) return $("#gdrive-file-msg").html("");
  $('#gdrive-file-msg').html('<div class="alert alert-'+type+'">'+msg+'</div>');
}

/***
 * set a message for the 'save to drive' popup
 * type - boostrap alert type
 ***/
function _setSaveMessage(msg, type) {
  if( !msg ) return $("#gdrive-save-msg").html("");
  $('#gdrive-save-msg').html('<div class="alert alert-'+type+'">'+msg+'</div>');
}

/***
 * create the top right menu. This menu is for when the user is not logged in
 ***/
function _createLoginBtn() {
  var btn = $('<li class="dropdown">'
      + '<a class="dropdown-toggle" style="cursor:pointer">Login<b class="caret"></b></a>'
      + '<ul class="dropdown-menu">'
      + '<li><a id="help"><i class="icon-question-sign"></i> Help</a></li>'
      + '<li><a id="about"><i class="icon-info-sign"></i> About</a></li>'
      + '<li><a id="login-with-google"><i class="icon-signin"></i> Login with Google</a></li>'
      + '</ul></li>');

  // set click handlers for popup
  btn.find('a.dropdown-toggle').on('click', function(){
    $(this).parent().toggleClass('open');
  });

  // about click handler
  btn.find('#about').on('click', function() {
    btn.toggleClass('open');
    $("#about-modal").modal('show');
  });

  btn.find('#help').on('click', function() {
    btn.toggleClass('open');
    showHelp();
  });

  // login click handler
  btn.find('#login-with-google').on('click',function() {
    ga('send', 'event', 'ui', 'interaction', 'user-login', 1);
    btn.toggleClass('open');
    signIn(function(token) {
      _setUserInfo();
    });
  });

  // add menu
  $("#login-header").html("").append(btn);
};

/***
 * Create the top right menu for when the user is logged in
 ***/
function _createLogoutBtn(userdata) {
  // set btn html
  var btn = $('<li class="dropdown">'
      + '<a class="dropdown-toggle" style="cursor:pointer"><img class="img-rounded" src="'+userdata.picture
      + '" style="margin:-5px 5px -5px 0;width:28px;height:28px;border:1px solid white" /> ' + userdata.name
      + '<b class="caret"></b></a>' + '<ul class="dropdown-menu">'
      + '<li><a id="save"><i class="icon-cloud-upload"></i> Save Model</a></li>'
      + '<li style="display:none"><a id="share-btn"><i class="icon-share"></i> Share Model</a></li>'
      + '<li style="display:none"><a id="open-in-drive" target="_blank"><i class="icon-external-link-sign"></i> Open in Google Drive</a></li>'
      + '<li><a id="load"><i class="icon-cloud-download"></i> Load Model</a></li>'
      + '<li><a id="help"><i class="icon-question-sign"></i> Help</a></li>'
      + '<li><a id="about"><i class="icon-info-sign"></i> About</a></li>'
      + '<li><a id="logout"><i class="icon-signout"></i> Logout</a></li>'
      + '</ul></li>');

  // add click handler to show menu
  btn.find('a.dropdown-toggle').on('click', function(){
    $(this).parent().toggleClass('open');
  });

  // show the save popup
  btn.find('#save').on('click', function() {
    // set the current save mimeType
    saveMimeType = MIME_TYPE;

    // let the user know what typ they are saving
    $("#gdrive-save-subheader").html("<h5>Save Model</h5>");

    btn.toggleClass('open');

    // if the file is loaded, show the update panel
    if( loadedFile != null) {
      // grab the current files metadata
      var file = {};
      for( var i = 0; i < fileList.length; i++ ) {
        if( fileList[i].id == loadedFile) {
          file = fileList[i];
          break;
        }
      }

      // show the update panel
      $("#save-update-panel").show();

      // render the files metadata in the update panel
      var d = new Date(file.modifiedDate);
      $("#save-update-panel-inner").html("<b>"+file.title+"</b><br />" +
          "<span style='color:#888'>"+file.description+"</span><br />"+
          "<span style='font-style:italic;font-size:11px;'>Last Modified: " +
          d.toDateString()+" "+d.toLocaleTimeString()+" by "+file.lastModifyingUserName+"</span><br />"+
          "<a href='https://drive.google.com/file/d/"+file.id+"'' target='_blank'><i class='icon-link'></i> " +
          "Link to Share</a> <span style='color:#888'>(must have permission)</span><br /><br />");
    } else {
      $("#save-update-panel").hide();
    }

    // clear any message
    _setSaveMessage(null);

    // show the save popup
    $("#save-modal").modal('show');
  });

  // click handler for share btn
  btn.find("#share-btn").on('click', function(){
    ga('send', 'event', 'ui', 'interaction', 'open-drive-share', 1);

    // has the share client been loaded
    if( client == null ) {
      // load the share popup
      gapi.load('drive-share', function(){
        // create and show the share popup
         client = new gapi.drive.share.ShareClient(Oauth.APP_ID);
          client.setItemIds([loadedFile]);
         client.showSettingsDialog();
       });
    } else {
      // show the share popup
      client.setItemIds([loadedFile]);
       client.showSettingsDialog();
    }
  });

  // show about panel
  btn.find('#about').on('click', function() {
    btn.toggleClass('open');
    $("#about-modal").modal('show');
  });

  btn.find('#help').on('click', function() {
    btn.toggleClass('open');
    showHelp();
  });

  // show the 'load from drive' panel
  btn.find('#load').on('click', function() {
    btn.toggleClass('open');

    // hide any existing message
    _setLoadMessage(null);

    // render the model files in the popup files
    _showDriveFiles();

    // show the modal
    $("#load-modal").modal('show');
  });

  // load the user out
  btn.find('#logout').on('click', function() {
    ga('send', 'event', 'ui', 'interaction', 'user-logout', 1);

    btn.toggleClass('open');

    // kill the access token
    token = null;

    // update the menu panel
    _createLoginBtn();
  });

  // attach the menu
  $("#login-header").html("").append(btn);
};

/***
 *  Request the user's information.  When loaded, update the top right menu
 ***/
function _setUserInfo() {
  // load user name
  $.ajax({
    url : "https://www.googleapis.com/oauth2/v1/userinfo",
    beforeSend : function(request) {
      // always set your access stoken
      request.setRequestHeader("Authorization",'Bearer '+ token.access_token);
    },
    success : function(data, status,xhr) {
      // parse your json response
      try {
        data = JSON.parse(data);
      } catch (e) {}

      // update top right menu
      _createLogoutBtn(data);

      // set to window scope
      window.userinfo = data;
    },
    error : function() {
      // TODO: should we alert this?
    }
  });

  // load user files, trees
  _updateFileList();
  _updateTreeList();
}

/***
 *  Search for the users models
 *
 * TODO: add search to the following functions,
 *  limit to 10 results
 ***/
function _updateFileList() {
  listFiles("mimeType = '"+MIME_TYPE+"'", function(resp){
    fileList = resp.result.items;
  });
}

/***
 *  Search for the users trees
 *
 * TODO: add search to the following functions,
 *  limit to 10 results
 ***/
function _updateTreeList() {
  listFiles("mimeType = '"+TREE_MIME_TYPE+"'", function(resp){
    treeList = resp.result.items;
  });
}

/***
 *  Render the users current models onto the 'load from drive' popup
 ***/
function _showDriveFiles() {
  // if they have no files, say so and get out of here
  if( !fileList ) return $("#gdrive-file-list").html("<li>No Files</li>");
  if( fileList.length == 0 ) return $("#gdrive-file-list").html("<li>No Files</li>");

  // show a title, there are multiple types that can be loaded from drive
  $("#gdrive-file-list").html("<h4>Select File</h4>");

  // create the list elements for each files metadata
  for( var i = 0; i < fileList.length; i++ ) {
    var item = fileList[i];
    var d = new Date(item.modifiedDate);
    $("#gdrive-file-list").append(
      $("<li class='list-group-item'><a id='"+item.id+"' url='"+item.downloadUrl+"' style='cursor:pointer'><i class='icon-file'></i> "+item.title+"</a>" +
        "<div style='color:#888;padding: 5px 0 0 10px'>"+item.description+"</div>"+
        "<div style='font-style:italic;font-size:11px;padding-left:10px'>Last Modified: "+d.toDateString()+" "+d.toLocaleTimeString()+" by "+item.lastModifyingUserName+"<div></li>"
        )
    );
  }

  // add click handler for each file
  $("#gdrive-file-list a").on('click', function(){
    ga('send', 'event', 'ui', 'interaction', 'load-drive-model', 1);

    var id = $(this).attr("id");

    // let the user know what we are doing
    _setLoadMessage('<i class="icon-spinner icon-spin"></i> Loading File...','info');

    // grab the five from drive
    getFile(id, $(this).attr("url"), function(file) {
      // if badness, let the user know
      if( !file  ) return _setLoadMessage('Failed to load file from Google Drive :(','danger');
      if( file.error  ) return _setLoadMessage('Failed to load file from Google Drive :(','danger');

      // hide any loaded trees,
      $("#share-tree-btn").hide();
      $("#loaded-tree-name").html("").parent().hide();
      loadedTree = null;

      // let the user know we are all good
      _setLoadMessage('File Loaded.','success');

      // set the loaded file id
      loadedFile = id;

      // set the loaded file name
      for( var i = 0; i < fileList.length; i++ ) {
        if( id == fileList[i].id ) {
          $("#loaded-model-title").html("<span style='color:#333'>Loaded Model </span> "+fileList[i].title);
        }
      }

      // show the share btn
      $("#share-btn").parent().show();
      $("#open-in-drive").attr("href","https://docs.google.com/file/d/"+id).parent().show();

      // setup model
      app.getModelIO().loadSetup(id, file);

      // setup realtime events
      gdriveRT.initRtApi(loadedFile);

      // wait a tick so user can see success message
      setTimeout(function(){
        // hide the modal
        $("#load-modal").modal('hide');
      },1500);

    });
  });
}

/***
 *  Render the users current trees onto the 'load from drive' popup
 ***/
function _showTreeFiles() {
  // update the list header, let user know what they are selecting
  $("#gdrive-file-list").html("");
  $("#gdrive-file-list").append($("<li class='list-group-item'><h5>Select Tree</h5></li>"));

  // if there are no trees, say so and get out of here
  if( !treeList ) return $("#gdrive-file-list").append($("<li class='list-group-item'>No Trees Available</li>"));
  if( treeList.length == 0 ) return $("#gdrive-file-list").append($("<li class='list-group-item'>No Trees Available</li>"));

  // create the tree list elements
  for( var i = 0; i < treeList.length; i++ ) {
    var item = treeList[i];
    var d = new Date(item.modifiedDate);
    $("#gdrive-file-list").append(
      $("<li class='list-group-item'><a id='"+item.id+"' name='"+item.title+"' url='"+item.downloadUrl+"' style='cursor:pointer'><i class='icon-leaf'></i> "+item.title+"</a>" +
        "<div style='color:#888;padding: 5px 0 0 10px'>"+item.description+"</div>"+
        "<div style='font-style:italic;font-size:11px;padding-left:10px'>Last Modified: "+d.toDateString()+" "+d.toLocaleTimeString()+" by "+item.lastModifyingUserName+"<div></li>"
        )
    );
  }

  // add click handler for titles
  $("#gdrive-file-list a").on('click', function(){
    ga('send', 'event', 'ui', 'interaction', 'load-drive-tree', 1);

    var id = $(this).attr("id");
    var name = $(this).attr("name");

    // tell the user we are loading
    _setLoadMessage('<i class="icon-spinner icon-spin"></i> Loading Tree...','info');

    // load file from drive
    getFile(id, $(this).attr("url"), function(file) {
      // if badness, let user know
      if( !file  ) return _setLoadMessage('Failed to load tree from Google Drive :(','danger');
      if( file.error  ) return _setLoadMessage('Failed to load tree from Google Drive :(','danger');

      // show the tree sharing btns
      $("#share-tree-btn").show();
      $("#loaded-tree-name").html(name).parent().show();

      // let the user know we are succesfull
      _setLoadMessage('Tree Loaded.','success');

      // set the loaded tree id
      loadedTree = id;

      // loaded tree into model / UI
      app.getModelIO().loadTree(file);

      // wait a sec so user can see success message
      setTimeout(function(){
        $("#load-modal").modal('hide');
      },1500);

    });
  });
}

/***
 *  show the user the load tree popup
 ***/
function showLoadTreePanel() {
  // render the trees into the popup list
  _showTreeFiles();
  // clear any messages
  _setLoadMessage(null);
  // show the popup
  $("#load-modal").modal('show');
}

/***
 *  show the user the save tree popup
 ***/
function showSaveTreePanel() {
  // set the current mimeType we are saving
  saveMimeType = TREE_MIME_TYPE;

  // set the header so user knows what type they are saving
  $("#gdrive-save-subheader").html("<h5>Save Tree</h5>");

  // if there is a current tree, show the update panel
  if( loadedTree != null) {
    // find the current tree based on id
    var tree = {};
    for( var i = 0; i < treeList.length; i++ ) {
      if( treeList[i].id == loadedTree) {
        tree = treeList[i];
        break;
      }
    }

    // show the update panel
    $("#save-update-panel").show();

    // render tree metadata on update panel
    var d = new Date(tree.modifiedDate);
    $("#save-update-panel-inner").html("<b>"+tree.title+"</b><br />" +
        "<span style='color:#888'>"+tree.description+"</span><br />"+
        "<span style='font-style:italic;font-size:11px;'>Last Modified: " +
        d.toDateString()+" "+d.toLocaleTimeString()+" by "+tree.lastModifyingUserName+"</span><br />"+
        "<a href='https://drive.google.com/file/d/"+tree.id+"'' target='_blank'><i class='icon-link'></i> Open in Google Drive</a>");
  } else {
    // don't show the update panel, this is a new tree
    $("#save-update-panel").hide();
  }

  // clear any message
  _setSaveMessage(null);

  // show the popup
  $("#save-modal").modal('show');
}

/***
 * Load a model based on passed id.  This function is really only for loading model on start, when a file id
 * has been passed in the url either from google drive or from the ?file=id url.
 ***/
var loginModalInit = false;
function load(id, loadFn) {
  // if we don't have an access token, we need to sign in first
  // TODO: if this is a public file, there is no reason to sign in... solution?
  if( !token ) {

    if( !loginModalInit ) {
      $('#google-modal-login').on('click', function(){
        // sign the user in (force oauth popup)
        signIn(function(token) {
          $('#login-modal').modal('hide');

          // set the user information in top left
          _setUserInfo();

          if( loadFn ) loadFn();

          getFileMetadata(id, function(metadata){
            getFile(id, metadata.downloadUrl, function(file) {
              _onInitFileLoaded(metadata,file);
            });
          });

        });
      });

      $('#login-modal').modal();
      loginModalInit = true;
    } else {
      $('#login-modal').modal('show');
    }

  } else {
    if( loadFn ) loadFn();

    getFileMetadata(id, function(metadata){
      getFile(id, metadata.downloadUrl, function(file) {
        _onInitFileLoaded(metadata,file);
      });
    });
  }
}

/***
 * Initialize UI / model when a file is loaded at start
 ***/
function _onInitFileLoaded(metadata, file) {
  // baddness, let the user know
  if( !file ) {
    if( hideInitLoading ) hideInitLoading();
    return alert("Failed to load from Google Drive :/");
  }

  // metadata failed to load, more badness
  if( metadata.code == 404 ) {
    if( hideInitLoading ) hideInitLoading();
    return alert("Google Drive: "+metadata.message);
  }

  // we loaded a model, setup and run
  if( metadata.mimeType == MIME_TYPE ) {
    // set the currently loaded file id
    loadedFile = metadata.id;

    // show the share btn
    $("#share-btn").parent().show();
    $("#open-in-drive").attr("href","https://docs.google.com/file/d/"+metadata.id).parent().show();

    // show title
    $("#loaded-model-title").html("<span style='color:#333'>Loaded Model </span> "+metadata.title);

    // setup model
    app.getModelIO().loadSetup(metadata.id, file);

    // setup realtime events
    gdriveRT.initRtApi(loadedFile);
  } else if ( metadata.mimeType == TREE_MIME_TYPE ) { // we loaded a tree
    // set the loaded tree id
    loadedTree = metadata.id;

    // show the share btn
    $("#share-tree-btn").show();
    $("#loaded-tree-name").html(metadata.title).parent().show();

    // set the loaded tree
    app.getModelIO().loadTree(file);

    // hide the loading popup
    if( hideInitLoading ) hideInitLoading();
  } else {
    alert("Loaded unknown file type from Google Drive: "+metadata.mimeType);
  }
}

/***
 * tokens expire, every once in awhile check the current token hasn't
 * if it has, then update
 ***/
function _checkToken() {
  // ignore if there is no token
  if (!token) return;

  // otherwise, look to update the access token
  Oauth.getAccessToken(function(t) {
    if( t != null ) token = t;
  });
};

/***
 * is the current user signed in?
 ***/
function checkSignedIn(callback) {
  // if isAutherized returns a token, user is logged in
  Oauth.isAuthorized(function(token){
    if (token != null) callback(true);
    else callback(false);
  });
};

/***
 * Sign a user in using the Oauth class
 ***/
function signIn(callback) {
  Oauth.authorize(function(t){
    token = t;
    if (token != null) {
      if( t.error ) return callback(false);
      callback(true);
    } else {
      callback(false);
    }
  })
};

/***
 * Access method for token
 ***/
function getToken() {
  return token;
};

/***
 * Load the google drive api code
 ***/
function _loadApi(callback) {
  gapi.client.load("drive", DRIVE_API_VERSION, function() {
    callback();
  });
};

/***
 * Get a list of file metadata from google drive based on query
 ***/
function listFiles(query, callback) {
  gapi.client.drive.files.list({
    q : query + " and trashed = false"
  }).execute(function(resp) {
    callback(resp);
  });
};

/***
 * Get a single files metadata based on id
 ***/
function getFileMetadata(id, callback) {
  gapi.client.drive.files.get({
    'fileId' : id
  }).execute(function(resp) {
    callback(resp);
  });
};

/***
 *  Actually load a files data.  The url to do this is provided in a files metadata.
 ***/
function getFile(id, downloadUrl, callback) {
  $.ajax({
    url : downloadUrl,
    beforeSend : function(request) {
      // set access token in header
      request.setRequestHeader("Authorization", 'Bearer '+ token.access_token);
    },
    success : function(data, status, xhr) {
      // parse the response (we only store json in the google drive)
      try {
        data = JSON.parse(data);
      } catch (e) {}

      callback(data, id);
    },
    error : function() {
      callback({
        error : true,
        message : "Failed to load file from Google Drive"
      });

    }
  });
};

/***
 * Save json to google drive
 ***/
function saveFile(name, description, mimeType, json, callback, options) {
  if( !options ) options = {}

  var boundary = '-------314159265358979323846';
  var delimiter = "\r\n--" + boundary + "\r\n";
  var close_delim = "\r\n--" + boundary + "--";

  var metadata = {
    'title' : name,
    'description' : description,
    'mimeType' : mimeType
  };

  // if we want to save the file to a specified folder
  if( options.parent ) {
    metadata.parents = [{id: options.parent}];
  }

  // if the json is really an object, turn it to a string
  if (typeof json == 'object') json = JSON.stringify(json);

  // data needs to be base64 encoded for the POST
  var base64Data = btoa(json);

  // create our multipart POST request
  var multipartRequestBody = delimiter
      + 'Content-Type: application/json\r\n\r\n'
      + JSON.stringify(metadata);

  if( json.length > 0 ) {
    multipartRequestBody += delimiter + 'Content-Type: '
      + mimeType + '\r\n' + 'Content-Transfer-Encoding: base64\r\n'
      + '\r\n' + base64Data;
  }
  multipartRequestBody += close_delim;

     // setup POST request
     // if the options.conver=true flag is set, google attempts to convert the file to
     // a google doc file.  Mostly, we use this for exporting csv -> Google Spreadsheets
  var request = gapi.client.request({
    'path' : '/upload/drive/v2/files' + ( options.convert ? '?convert=true' : ''),
    'method' : 'POST',
    'params' : {
      'uploadType' : 'multipart'
    },
    'headers' : {
      'Content-Type' : 'multipart/mixed; boundary="' + boundary + '"'
    },
    'body' : multipartRequestBody
  });

  // send the request
  request.execute(function(resp) {
    if (resp.id)
      callback(resp);
    else
      callback({
        error : true,
        message : "Failed to save"
      });
  });
};

/***
 * Update a file based on id and given json data
 ***/
function updateFile(fileId, json, callback) {
  // start creating the multipart POST request
  var boundary = '-------314159265358979323846';
  var delimiter = "\r\n--" + boundary + "\r\n";
  var close_delim = "\r\n--" + boundary + "--";

  var metadata = {};

  // strinify then base64 encode then object
    var base64Data = btoa(JSON.stringify(json));

    // set up the POST body
    var multipartRequestBody =
      delimiter +
        'Content-Type: application/json\r\n\r\n' +
        JSON.stringify(metadata) +
        delimiter +
        'Content-Type: ' + MIME_TYPE + '\r\n' +
        'Content-Transfer-Encoding: base64\r\n' +
        '\r\n' +
        base64Data +
        close_delim;

  // setup POST request
    var request = gapi.client.request({
        'path': '/upload/drive/v2/files/'+fileId,
        'method': 'PUT',
        'params': {'uploadType': 'multipart'},
        'headers': {
          'Content-Type': 'multipart/mixed; boundary="' + boundary + '"'
        },
        'body': multipartRequestBody});

    // set request
    request.execute(function(resp){
      if( resp.id ) {
        callback(resp);
      } else {
        callback({
        error : true,
        message : "Failed to update"
      });
      }
    });
}

function runModelRt() {
  if( offlineMode ) return;
  ga('send', 'event', 'ui', 'interaction', 'run-model-remote', 1);
  gdriveRT.runModelRt();
}

module.exports = {
  init : init,
  checkSignedIn : checkSignedIn,
  signIn : signIn,
  getToken : getToken,
  listFiles : listFiles,
  getFileMetadata : getFileMetadata,
  load : load,
  saveFile: saveFile,
  showLoadTreePanel : showLoadTreePanel,
  showSaveTreePanel : showSaveTreePanel,
  runModelRt : runModelRt,

  MIME_TYPE : MIME_TYPE
}

},{"./gdriveRT":29,"./oauth":32}],29:[function(require,module,exports){
// REALTIME (rt) Objects
// rt json field, used to send updates to peers
var rtJson = null;
// rt document
var rtDoc = null;
// has the rt api been loaded?
var _rtLoaded = false;
// timer to buffer the firing of updates from rt events
var _rtTimer = -1;

// list of current rt edits to input files
var rtEdits = {};
// google drive rt model - map
var liveEdits = null;
// local lock on an element
var lock = {};

var app;

// loaded file id
var loadedFile;

/***
 * Setup the rt api for the current file.  This will actually load the api if needed
 ***/
function initRtApi(file) {
  rtJson = null; // kill off any old listners
  loadedFile = file;

  // close any old connection
  if( rtDoc ) rtDoc.close();

  // get out of here if we don't have a loaded file
  if( loadedFile == null ) return;

  // load api if needed
  if( !_rtLoaded ) {
    gapi.load('drive-realtime', function(){
      // setup rt hooks
      _rtLoaded = true;
      _loadRtFile();
    });
  } else {
    // setup rt hooks
    _loadRtFile();
  }

  // setup input handlers
  $('#inputs input').on('focus',function(e){
    var ele = $(e.target);
    _setLocalLock({
      id        : ele.attr("id"),
      value     : ele.val(),
      timestamp : new Date().getTime(),
      user      : window.userinfo ? window.userinfo.name : "unknown"
    });
  });
  $('#inputs input').on('blur',function(e){
    _removeLocalLock($(e.target).attr("id"));
  });
  $('#inputs input').on('keyup',function(e){
    if( e.which == 13 ) return;
    var ele = $(e.target);
    _updateLocalLock(ele.attr("id"), ele.val());
  });
}

function _setLocalLock(lock) {
  // TODO: this should mark the current lock
  if( liveEdits.has[lock.id] ) return;
  liveEdits.set(lock.id, lock);
}

function _updateLocalLock(id, val) {
  var lock = {
    id : id,
    value : val,
    timestamp : new Date().getTime(),
    user      : window.userinfo ? window.userinfo.name : "unknown"
  }

  liveEdits.set(id, lock);
}

function _removeLocalLock(id) {
  liveEdits.delete(id);
}

function _removeRemoteLock(lock) {
  $("#"+lock.id).removeAttr("disabled");
  $("#"+lock.id+"-editing").remove();
  delete rtEdits[lock.id];
}

function _updateLock(lock) {
  $("#"+lock.id).val(lock.value).attr("disabled","disabled");
  if( $("#"+lock.id+"-editing").length == 0 ) {
    $("#"+lock.id).parent().after("<span id='"+lock.id+"-editing' class='label label-warning'></span>");
  }
  $("#"+lock.id+"-editing").html(lock.user);
  rtEdits[lock.id] = lock;
}

/***
 * Update the list of realtime edits as well as the input UI based on the rtDoc event
 * TODO: this is a bit nasty right now
 **/
function _updateRtEdits(e) {
  if( e.isLocal ) return;

  var keys = liveEdits.keys();

  // remove old timestamps TODO
  /*for( var i = 0; i < values.length; i++ ) {
    if( now - values[i].timestamp > 1000 * 60 ) {
      _removeLock(values[i]); // does this fire updates?
    }
  }*/


  // set new edits
  for( var i = 0; i < keys.length; i++ ) {
    _updateLock(liveEdits.get(keys[i]));
  }

  // remove old edits
  for( var key in rtEdits ) {
    if( keys.indexOf(key) == -1 ) {
      _removeRemoteLock(rtEdits[key]);
    }
  }
}

/***
 *  Setup the rt hooks for the current file.  The api needs to already be loaded
 ***/
function _loadRtFile() {
  // get the rt doc
  gapi.drive.realtime.load(loadedFile,
    // rt doc loaded
    function(file){
      rtDoc = file;

      // get our rt attribute.  Triggering changes on rtJson will push events
      // to all listening clients
      var json = file.getModel().getRoot().get("json");
      liveEdits = file.getModel().getRoot().get("liveEdits");

      // if there is no json attr, we need to initialize the model
      if( json == null || liveEdits == null) {
        // initialize our rt model
        _onRtModelLoad(file.getModel());
        // grab rt json attr now that we are initialized
        json = file.getModel().getRoot().get("json");
        liveEdits = file.getModel().getRoot().get("liveEdits");
      }

      // badness happened :(
      if( !json ) return console.log("Failed to connect to rt json");
      // set that attr global to class
      rtJson = json;

      // get current list of users
      var users = file.getCollaborators();

      // add event listeners for when people come and go
      file.addEventListener(gapi.drive.realtime.EventType.COLLABORATOR_JOINED, function(e){
        users = file.getCollaborators();
        _updateActiveUsers(users);
      });
      file.addEventListener(gapi.drive.realtime.EventType.COLLABORATOR_LEFT, function(e){
        users = file.getCollaborators();
        _updateActiveUsers(users);
      });

      // add event listeners for the rtJson object
      // when this updates, we want to re-run the model
      json.addEventListener(gapi.drive.realtime.EventType.TEXT_INSERTED, function(e){
        if( e.isLocal ) return;
        _rerunRt(users, e.userId);
        });
        json.addEventListener(gapi.drive.realtime.EventType.TEXT_DELETED, function(e){
          if( e.isLocal ) return;
          _rerunRt(users, e.userId);
        });

        // live edit updates
              liveEdits.addEventListener(gapi.drive.realtime.EventType.VALUE_CHANGED, function(e){
                   _updateRtEdits(e);
              });

        // show who is listening
        _updateActiveUsers(users);

        // set input handlers for rt events
    },
    // model loaded
    function(model){
      _onRtModelLoad(model);
    },
    // errors
    function(err) {
      console.log("RT ERRORS: ");
      console.log(err);
    }
  );
}


/***
 * Update the display of active users for the model.
 ***/
function _updateActiveUsers(users) {
  // if it's just us, don't show anything
  if( !users ) return $("#active-users").html("");
  if( users.length <= 1 ) return $("#active-users").html("");

  // we only want unique users
  var unique = [];
  var uusers = [];
  for( var i = 0; i < users.length; i++ ) {
    if( unique.indexOf(users[i].userId) == -1 ) {
      unique.push(users[i].userId);
      uusers.push(users[i]);
    }
  }
  if( uusers.length <= 1 ) return $("#active-users").html("");

  // add pic of user to display panel
  var html = "Active Users ";
  for( var i = 0; i < uusers.length; i++ ) {
    if( uusers[i].photoUrl ) {
      html += "<img src='"+uusers[i].photoUrl+"' title='"+uusers[i].displayName+"' style='margin:0 5px;width:32px;height:32px' class='img-rounded' /> ";
    } else {
      html += "<span style='width:32px;height:32px;margin:0 5px;background-color:"+uusers[i].color+"' title='"+uusers[i].displayName+"' ></span> ";
    }
  }
  $("#active-users").html(html);
}

/***
   *  Re-run the model.  Events can come in quickly in many parts.  Buffer the events so we don't re-run the model too many times.
   ***/
function _rerunRt(users, userId) {
  // this is badness
  if( !rtJson ) return;

  // clear any queued run
  if( _rtTimer != -1 ) clearTimeout(_rtTimer);

  // queue up a run and wait to make sure there are no updates
  _rtTimer = setTimeout(function(){
    _rtTimer = -1;

    // find the user who is running the model and diplay popup of that users information
    for( var i = 0; i < users.length; i++ ) {
      if( users[i].userId == userId ) {
        var panel = $("<div class='init-loading-outer' ><div class='init-loading' style='width:400px'> "+
                (users[i].photoUrl ? "<img src='"+users[i].photoUrl+"' /> " : "")+users[i].displayName+" is updating the model...</div></div>");
            $("body").append(panel);
            setTimeout(function(){
                panel.css("opacity",".9");
            },50);
            setTimeout(function(){
                panel.remove();
            }, 3500);
            break;
      }
    }

    // parse the new model data and load it as our current setup
    var data = JSON.parse(rtJson.getText());
    app.getModelIO().loadSetup(loadedFile, data, true);
  }, 300);
}

/***
 * initialize a new rt model
 ***/
function _onRtModelLoad(model) {
  // currently we just want to use this single attribute to broadcast events
  var json = model.getRoot().get("json");
  if( json == null ) {
    var string = model.createString("{}");
    model.getRoot().set("json", string);
  }

  var liveEdits = model.getRoot().get("liveEdits");
  if( liveEdits == null ) {
    var field = model.createMap();
    model.getRoot().set("liveEdits", field);
  }

}

/***
 * let the world know what we are doing :)
 * This should be called when a local user runs the model.  It updates the 'json'
 * attribute which is then broadcast to all listening parties
 ***/
function runModelRt() {
  if( rtJson ) rtJson.setText(JSON.stringify( app.getModelIO().exportSetup() ));
}

module.exports = {
  runModelRt : runModelRt,
  initRtApi  : initRtApi,
  setApp : function(application) {
    app = application;
  }
};

},{}],30:[function(require,module,exports){
var offline = require('./offline');
var gdrive = require('./gdrive');
var charts = require('./charts');
var weatherFileReader = require('./weatherFileReader');

module.exports = function(app) {

var weatherAverageChart = null;
var weatherAverageChartData = {};

var SETUP_TEMPLATE =
  '<div>'+
  '<h4>Chart Options</h4>'+
  '<div>'+
      '<table class="table">'+
          '<tr>'+
              '<td style="width:50%">Output variable(s) to chart </td>'+
              '<td> <a id="select-charts-btn" class="btn btn-default">Select Charts</a></td>'+
          '</tr>'+
          '<tr>'+
              '<td style="width:50%">Variation analysis parameter(s) </td>'+
              '<td><div id="variationAnalysisStatus">None</div></td>'+
          '</tr>'+
      '</table>'+
  '</div>'+
  '<h4>Location</h4>'+
   '<div style="border-top:1px solid #ddd;padding:8px;height:60px">'+
     '<span id="current-location" style="color:#888"></span>'+
     '<a class="btn btn-default pull-right select-weather-location"><i class="icon-map-marker"></i> Select Location</a>'+
     '</div>'+
     '<div>';

var GOOLEDRIVE_TREE_TEMPLATE =
  '<div style="padding:15px 0 5px 0;margin-bottom:5px;height: 50px">'+
    '<div class="btn-group pull-right" id="tree-sub-menu">'+
      '<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">'+
        '<span id="loaded-tree-name">Default Tree</span> <span class="caret"></span>'+
      '</button>'+
      '<ul class="dropdown-menu" role="menu">'+
        '<li><a id="gdrive-treepanel-load"><i class="icon-cloud-download"></i> Load Tree</a></li>'+
        '<li><a id="gdrive-treepanel-save"><i class="icon-cloud-upload"></i> Save Tree</a></li>'+
        '<li style="display:none"><a id="share-tree-btn" class="btn btn-default" style="display:none;margin-left:10px"><i class="icon-share"></i> Share Tree</a></li>'+
      '</ul>'+
  '</div>'+
  '<div style="display:none"><input type="checkbox" id="compare-trees" /> Compare Trees</div>'+
'</div>';

var INPUT_TEMPLATE =
  '<div class="form-group">'+
    '<label for="{{id}}" class="col-lg-4 control-label">{{label}}</label>'+
    '<div class="col-lg-8">'+
      '<input type="{{type}}" class="form-control" id="{{id}}" style="width:200px;display:inline-block" value="{{value}}">&nbsp;&nbsp;{{units}}'+
      '<p class="help-block">{{description}}</p>' +
    '</div>'+
  '</div>';

var ARRAY_INPUT_TEMPLATE =
  '<div class="col-lg-6"><div class="form-group">'+
    '<label for="{{id}}" class="col-lg-4 control-label">{{label}}</label>'+
    '<div class="col-lg-8">'+
      '{{inputs}}'+
      '<p class="help-block">{{description}}</p>' +
    '</div>'+
  '</div></div>';

var tabHeader = '<ul class="nav nav-pills" id="input_pills">';
var content = '<div class="pill-content">';

var treeHeader = '<div class="panel-group" id="tree-accordion">';
var TREE_PANEL_TEMPLATE = '<div class="panel panel-default">'+
        '<div class="panel-heading">'+
            '<h4 class="panel-title">'+
                '<a class="accordion-toggle" data-toggle="collapse" data-parent="#tree-accordion" href="#collapse{{id}}">'+
                    '{{title}}'+
                '</a>'+
            '</h4>'+
        '</div>'+
        '<div id="collapse{{id}}" class="panel-collapse collapse">'+
            '<div class="panel-body">{{body}}</div>'+
        '</div>'+
     '</div>';

var inputs = {};

// for weather data
var cols = [];

var map = null;

/**
 * Options :
 *   model - type of model to append to
 *   label - attribute label
 *   value - default value
 *   description - description of attribute
 *   units - attribute units
 */
function _addInput(options) {
  if( !inputs[options.model] ) inputs[options.model] = [];
  inputs[options.model].push(options);
}

function _createWeatherInputs() {
  for( var attr in app.getModel().getDataModel().weather ) {
    if( attr != "nrel" ) cols.push(attr);
  }

  var table = '<div style="padding-top:25px"><a class="btn btn-default pull-right" id="load-weather-btn"><i class="icon-upload-alt"></i> Upload</a>'+
        '<div class="btn-group" id="weather-input-toggle">'+
          '<button type="button" class="btn btn-default active">Averages</button>'+
          '<button type="button" class="btn btn-default">Actual</button>'+
        '</div>'+
        '</div>'+
        '<div id="custom-weather-panel" style="display:none;margin-top:20px"></div>'+
        '<div id="average-weather-panel">'+
        '<div style="padding:10px;color:#888">Select location to set the average weather data</div>'+
        '<table class="table table-striped table-condensed weather-table" style="margin-top:20px">';

  table += "<tr>";
  for( var i = 0; i < cols.length; i++ ) {
    table += "<td>"+cols[i]+"</td>";
  }
  table += "</tr>";

  for( var i = 0; i < 12; i++ ) {
    var m = (i+1)+'';
    if( m.length == 1 ) m = '0'+m;

    table += "<tr>";
    for( var j = 0; j < cols.length; j++ ) {
      if( j == 0 ) {
        table += "<td>"+(i+1)+"</td>";
      } else {
        table += "<td><input class='form-control' id='input-weather-"+cols[j]+"-"+m+"' type='text' /></td>";
      }
    }
    table += "</tr>";
  }
  return table+'</table><div id="average-weather-chart"></div></div>';

}

function _setWeatherData() {
  var ll = app.qs("ll");
  if( ll ) {
    ll = ll.split(",");
    _queryWeatherData(ll[0], ll[1], function() {
        app.runModel();
    });
  } else {
    $("#current-location").html("Not Set");
  }
}

function _queryWeatherData(lng, lat, callback) {
  ga('send', 'event', 'ui', 'interaction', 'weather-data-query', 1);

  var url = "http://alder.bioenergy.casil.ucdavis.edu:8080/vizsource/rest?view=pointToWeather("+lng+","+lat+",8192)"
  var q = new google.visualization.Query(url);
  var resps = 0;

  function checkDone() {
      resps++;
      if( resps == 2 && callback ) callback();
  }

  q.setQuery('SELECT *');
  q.send(function(response){
    var table = JSON.parse(response.getDataTable().toJSON());

    for( var i = 0; i < table.rows.length; i++ ) {
      var m = (i+1)+'';
      if( m.length == 1 ) m = '0'+m;

      weatherAverageChartData[m] = {};
      for( var j = 1; j < table.cols.length; j++ ) {
        $("#input-weather-"+cols[j]+"-"+m).val(table.rows[i].c[j] ? table.rows[i].c[j].v : "");
      }
    }

    updateAverageChart();
    checkDone();
  });

  var url = "http://alder.bioenergy.casil.ucdavis.edu:8080/vizsource/rest?view=pointToSOIL("+lng+","+lat+",8192)"
  var q = new google.visualization.Query(url);
  q.setQuery('SELECT *');
  q.send(function(response){
    var error = false;
    var table = JSON.parse(response.getDataTable().toJSON());
    for( var i = 0; i < table.cols.length; i++ ) {
      if( table.rows[0] == null ) {
        error = true;
        alert("Invalid location selected");
        break;
      }

      var key = table.cols[i].id;
      if( key === 'maxaws' ) key = 'maxAWS';

      $("#input-soil-"+key).val(table.rows[0].c[i].v);
    }

    if( !error ) checkDone();
  });

  $("#current-location").html(lng+", "+lat+" <a href='"+window.location.href.replace(/#.*/,'')+
                              "?ll="+lng+","+lat+"' target='_blank'><i class='icon-link'></i></a>");
}

function updateAverageChart() {
  weatherAverageChartData = {};

  for( var i = 0; i < 12; i++ ) {
    var m = (i+1)+'';
    if( m.length == 1 ) m = '0'+m;

    weatherAverageChartData[m] = {};
    for( var j = 1; j < cols.length; j++ ) {
      var val = $("#input-weather-"+cols[j]+"-"+m).val();
      if( val && val.length > 0 ) weatherAverageChartData[m][cols[j]] = parseInt(val);
      else weatherAverageChartData[m][cols[j]] = 0;
    }
  }
  weatherAverageChart = charts.createWeatherChart($('#average-weather-chart')[0], weatherAverageChartData);
}

function _selectWeatherLocation() {
  if( !map ) {
    $("#select-weather-modal").modal({});

    $("#locate-button").on('click', _getLocation);


    // wait for the modal to init
    setTimeout(function(){
      if( offlineMode ) return;

      map = new google.maps.Map($("#gmap")[0], {
        center : new google.maps.LatLng(35, -121),
        zoom: 5,
        mapTypeId : google.maps.MapTypeId.ROADMAP
      });

      var defaultStyle = {
            polygonOptions: {
              strokeColor   : "#0000FF",
              strokeOpacity : 0.5,
              fillColor     : '#FEFEFE',
              fillOpacity   : 0.2
            },
      };


      var defaultOptions = {
          query: {
            select: 'boundary',
            from: '1hV9vQG3Sc0JLPduFpWJztfLK-ex6ccyMg_ptE_s'
          },
          styles: [defaultStyle],
          suppressInfoWindows : true
      };

      var fusionLayer = new google.maps.FusionTablesLayer(defaultOptions);
      fusionLayer.opacity = .8;
      fusionLayer.setMap(map);

      google.maps.event.addListener(map, 'click', function(e) {
        if( $('#locate-cache-mode').is(':checked') ) {
          alert('You must click on a geometry to cache');
          return;
        }

        _queryWeatherData(e.latLng.lng(), e.latLng.lat(), function() {
                  app.runModel();
              });
        $("#select-weather-modal").modal('hide');
      });
      google.maps.event.addListener(fusionLayer, 'click', function(e) {
        if( $('#locate-cache-mode').is(':checked') ) {
          offline.cacheTile(e, fusionLayer, defaultOptions, defaultStyle);
          return;
        }

        _queryWeatherData(e.latLng.lng(), e.latLng.lat(), function() {
                  app.runModel();
              });
        $("#select-weather-modal").modal('hide');
      });

      // setup input for clearing cache
          $('#clear-cached-tiles').on('click', function(){
              offline.clearCache();
              offline.renderCachedTilesOnMap(fusionLayer, defaultOptions, defaultStyle);
          });

      offline.renderCachedTilesOnMap(fusionLayer, defaultOptions, defaultStyle);

    },500);
  } else {
    $("#select-weather-modal").modal('show');

    // we seem to be hanging sometimes....
    setTimeout(function(){
      google.maps.event.trigger(map, "resize");
    }, 500);
  }
}

function _getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
    $("#locate-button").addClass("btn-warning");
  } else{
    window.alert("Geolocation is not supported by this browser.");
  }
  function showPosition(position) {
    $("#locate-button").removeClass("btn-warn").addClass("btn-success");
    map.setZoom(10);
    map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
    //_queryWeatherData(position.coords.longitude, position.coords.latitude);
  }
}

function _generateInputs(i, type, prefix, name, attrs) {
  var id = prefix.length > 0 ? prefix+'-'+name : 'input-'+name;
  var input = '<div class="form-group" style="margin-left:'+(i*20)+'px;margin-top:0px;margin-right:5px">';

  var treebody = "";

  if( !(i == 1) ) {
      if( i != 0 ) input += '<label for="'+id+'" class="control-label">'+name +'</label>';
      input += '<div>';
  }


      if ( typeof attrs.value == 'object' && i == 1  ) { // && type == 'tree' ) {
      for( var key in attrs.value ) {
              treebody += _generateInputs(i+1, type, id, key, attrs.value[key]);
          }
  } else if ( typeof attrs.value == 'object' ) {
      if( attrs.description ) input += '<p class="help-block">'+attrs.description+'</p>';
          for( var key in attrs.value ) {
              input += _generateInputs(i+1, type, id, key, attrs.value[key]);
          }
  } else if ( (typeof attrs.value == 'number' || typeof attrs.value == 'string') && i == 1 ) { // && type == 'tree' ) {

      treebody +=
          '<div><input type="'+(attrs.value == '_date_' ? 'date' : 'text')+'" '+
          (type=='constants'?'disabled':'')+' class="form-control '+type+'" id="'+
          id+'" style="width:200px;display:inline-block" value="'
              +(attrs.value == '_date_' ? '' : attrs.value)+'">&nbsp;&nbsp;'
              +(attrs.units ? attrs.units : '')+'</div>';

  } else if (  typeof attrs.value == 'string' || typeof attrs.value == 'number' ) {

    input += '<div><input type="'+(attrs.value == '_date_' ? 'date' : 'text')+'" '
          +(type=='constants'?'disabled':'')+' class="form-control '+type+
           '" id="'+id+'" style="width:200px;display:inline-block" value="'
          +(attrs.value == '_date_' ? '' : attrs.value)+'">&nbsp;&nbsp;'
          +(attrs.units ? attrs.units : '')+'</div>';

    if( attrs.description ) input += '<p class="help-block">'+attrs.description+'</p>';
  }

  if( !(i == 1 /*&& type == 'tree'*/) ) {
      input += '</div></div>';
  } else {
      input += TREE_PANEL_TEMPLATE
                  .replace(/{{id}}/g,id)
                  .replace('{{title}}',name+" <span style='color:#888;font-size:12px'> - "+attrs.description+"</span>")
                  .replace('{{body}}',treebody)+'</div>'
  }

  return input;
}

function create(ele) {
  weatherFileReader.init();
  var model, m, attr, config;

  var inputs = $.extend(true, {}, app.getModel().getDataModel());

  inputs['setup'] = {};
  for( model in inputs ) {
    m = inputs[model];
    for( attr in m ) {
      config = m[attr];

      if( typeof config == 'object' ) {
        _addInput({
          model       : model,
          label       : attr,
          description : config.description,
          value       : config.value,
          units       : config.units
        });
      } else {
        _addInput({
          model       : model,
          label       : attr
        });
      }
    }
  }


  for( model in inputs ) {
    if( model == "plantation_state" ) continue;

    tabHeader += '<li><a href="#inputs_'+model+'" id="tab_inputs_'+model+'" data-toggle="pill">'
                +model.substr(0,1).toUpperCase()+model.substr(1).toLowerCase()+'</a></li>';
    var attributes = inputs[model];

    content += ' <div class="pill-pane" id="inputs_'+model+'">';

    var row1 = "";
    var row2 = "<div class='col-lg-6>";

    if( model == 'weather' ) {
      content += _createWeatherInputs();
    } else if( model == 'setup' ) {
      content += SETUP_TEMPLATE;
    } else {
        content += treeHeader;

        // add the google drive btn from trees
        if( model =='tree' ) {
          content += _createTreeInput(model, inputs);
        } else {
          content += _generateInputs(0, model, '', model, inputs[model]);
        }

      content += '</div>';
    }


    content += '</div>';
  }
  content += '</div>';
  tabHeader += "</ul>";

  ele.html(tabHeader+"<div class='form-horizontal'>"+content+"</div>");

  // run the model whenever some hits 'enter'
  ele.find('input').on('keyup',function(e){
    if( e.which == 13 ) app.runModel();
  });

  // add click handler for loading a tree
  ele.find("#gdrive-treepanel-load").on('click', function(){
    gdrive.showLoadTreePanel();
  });
  ele.find("#gdrive-treepanel-save").on('click', function(){
    gdrive.showSaveTreePanel();
  });

  // set tree input handlers
  $("#compare-trees").on('click', function(){
    if( $(this).is(':checked') ) {
      $("#single-tree-content").hide();
      $("#compare-tree-content").show();
      $("#tree-sub-menu").hide();
    } else {
      $("#single-tree-content").show();
      $("#compare-tree-content").hide();
      $("#tree-sub-menu").show();
    }
  });

  // set pill click handlers
  $('#input_tabs a').click(function (e) {
      e.preventDefault()
      $(this).tab('show')
  });
  $('#tab_inputs_weather').tab('show');

  $('.select-weather-location').on('click', _selectWeatherLocation);


  $('#weatherReader-modal').modal({show:false});
  $('#load-weather-btn').on('click', function(){
    $('#weatherReader-modal').modal('show');
  });

  $("#weather-input-toggle .btn").on('click', function(){
    $('#weather-input-toggle .btn.active').removeClass('active');
    $(this).addClass('active');

    if( $(this).html() == 'Averages' ) {
      $('#average-weather-panel').show();
      $('#custom-weather-panel').hide();
    } else {
      app.setWeather();
      $('#average-weather-panel').hide();
      $('#custom-weather-panel').show();
    }
  });

  $(window).on('resize', function(){
    if( weatherAverageChart ){
      weatherAverageChart = charts.createWeatherChart($('#average-weather-chart')[0], weatherAverageChartData);
    }
  });

  _setWeatherData();
}

function _createTreeInput(model, inputs) {
  var content = "";
  content += GOOLEDRIVE_TREE_TEMPLATE;

  content += '<div id="single-tree-content">';
  content += _generateInputs(0, model, '', model, inputs[model]);
  content += '</div>';

  content += '<div id="compare-tree-content" style="display:none">'+
        '<ul class="nav nav-tabs">'+
          '<li class="active"><a href="#tree1" data-toggle="tab">Tree 1</a></li>'+
            '<li><a href="#tree2" data-toggle="tab">Tree 2</a></li>'+
        '</ul>'+
        '<div class="tab-content">'+
            '<div class="tab-pane active" id="tree1">'+
              '<div class="well" style="text-align:center;margin-top:10px">'+
                '<div class="btn-group">'+
                '<button type="button" class="btn btn-default active">Custom</button>'+
                '<button type="button" class="btn btn-default">Select Tree</button>'+
              '</div>'+
              '</div>'+
              _generateInputs(0, model, 't1', model, inputs[model])+
            '</div>'+
            '<div class="tab-pane active" id="tree2">'+
              '<div class="well" style="text-align:center;margin-top:10px" >'+
                '<div class="btn-group">'+
                '<button type="button" class="btn btn-default active">Custom</button>'+
                '<button type="button" class="btn btn-default">Select Tree</button>'+
              '</div>'+
              '</div>'+
              _generateInputs(0, model, 't2', model, inputs[model])+
            '</div>'+
          '</div>'+
         '</div>';

  return content;
}


return {
  create : create,
  updateAverageChart: updateAverageChart
};

};

},{"./charts":25,"./gdrive":28,"./offline":33,"./weatherFileReader":35}],31:[function(require,module,exports){
// Special Sauce...
// basically the code loaded from GitHub expects the following to exists in the window scope
//   m3PGIO
//     - readAllContants
//     - readWeather
//     - dump
//     - readFromInputs
// So we inject functions that interact w/ our UI, model in no way cares
module.exports = {
  read : function(model) {
    this.model = model;

    model.debug = true;

    if( !model.plantation ) model.plantation = {};
    this.readAllConstants(model.plantation);

    if( !model.weather ) model.weather = {};
    if( !model.manage ) model.manage = {};
    if( !model.custom_weather ) model.custom_weather = {};

    this.readWeather(model.weather, model.manage, model.custom_weather);

    delete this.model.manage.coppiceDates;
  },
  readAllConstants : function(plantation) {
      this.readFromInputs();

      //for ( var key in this.model.plantation) {
      //    plantation[key] = this.model.plantation[key];
      //}

      plantation.coppicedTree = this.model.tree;

      // setup seedling Tree
      // TODO: hardcoded for now, this shouldn't be
      plantation.seedlingTree = $.extend(true, {}, this.model.tree);
      plantation.seedlingTree.stemsPerStump = 1;
      plantation.seedlingTree.pfs.stemCnt = 1;
      plantation.seedlingTree.rootP = {
          LAITarget : 10,
          efficiency : 0.6,
          frac : 0.01
      };
  },

  readWeather : function(weatherMap, manage, customWeatherMap) {
      var datePlanted = $("#input-manage-datePlanted").val();
      if (datePlanted && datePlanted != "") {
          manage.datePlanted = new Date($("#input-manage-datePlanted").val());
      } else {
          manage.datePlanted = new Date();
      }

      var dateCoppiced = $("#input-manage-dateCoppiced").val();
      if (dateCoppiced && dateCoppiced != "") {
          manage.dateCoppiced = new Date($("#input-manage-dateCoppiced").val());
      } else {
         // set error condition : TODO
      }

      var DateFinalHarvest = $("#input-manage-dateFinalHarvest").val();
      if (DateFinalHarvest && DateFinalHarvest != "") {
          manage.DateFinalHarvest = new Date($("#input-manage-dateFinalHarvest").val());
      } else {
         // set error condition : TODO
      }

      var yearsPerCoppice = $("#input-manage-coppiceInterval").val();
      if (yearsPerCoppice && yearsPerCoppice != "") {
          manage.yearsPerCoppice = parseInt($("#input-manage-coppiceInterval").val());
      }


      for ( var i = 0; i < 12; i++) {
          var item = {
              month : (i + 1)
          };
          var m = (i+1)+'';
          if( m.length === 1 ) m = '0'+m;

          for ( var j = 1; j < this.app.inputs.weather.length; j++) {
              var c = this.app.inputs.weather[j];
              item[c] = this._readVal($("#input-weather-" + c + "-" + m));
          }
          item.nrel = item.rad / 0.0036;

          weatherMap[m] = item;
      }

      if( this.model.custom_weather ) {
          for( var date in this.model.custom_weather ) {
              this.model.custom_weather[date].nrel = this.model.custom_weather[date].rad / 0.0036;
              //customWeatherMap[date] = custom_weather[date];
          }
      }
      return weatherMap;
  },
  dump : function(rows, sheet) {
      // set the raw output
      this.app.runComplete(rows);
  },

  // read a value from the input
  // it has a ',' is set for variation
  _readVal : function(ele) {
      var val = ele.val();
      if( val.match(/\d*-\d*-\d*$/) ) {
          return val;
      } else if( val.match(/.*,.*/) ) {
          val = val.replace(/\s/g,'').split(",");
          var id = ele.attr("id").replace(/^input-/,'').replace(/-/g,'.');
          this.model.variations[id] = [];
          for( var i = 0; i < val.length; i++ ) {
              this.model.variations[id].push(parseFloat(val[i]));
          }
          return this.model.variations[id][0];
      }
      return parseFloat(val);
  },

  readFromInputs : function() {
      // read soil
      this.model.soil = {};
      this.model.soil.maxAWS = this._readVal($("#input-soil-maxAWS"));
      this.model.soil.swpower = this._readVal($("#input-soil-swpower"));
      this.model.soil.swconst = this._readVal($("#input-soil-swconst"));

      // read manage
      this.model.manage = {
          coppice : false
      };
      var eles = $(".manage");
      for ( var i = 0; i < eles.length; i++) {
          var ele = $(eles[i]);
          this.model.manage[ele.attr("id").replace("input-manage-", "")] = this._readVal(ele);
      }

      // read plantation
      if( !this.model.plantation ) this.model.plantation = {};
      eles = $(".plantation");
      for ( var i = 0; i < eles.length; i++) {
          var ele = $(eles[i]);
          this.model.plantation[ele.attr("id").replace("input-plantation-", "")] = this._readVal(ele);
      }

      // read tree
      var treeInputs = $(".tree");
      this.model.tree = {};
      for ( var i = 0; i < treeInputs.length; i++) {
          var ele = $(treeInputs[i]);

          var parts = ele.attr("id").replace("input-tree-", "").split("-");
          if (parts.length == 1) {
              this.model.tree[parts[0]] = this._readVal(ele);
          } else {
              if (!this.model.tree[parts[0]])
                  this.model.tree[parts[0]] = {};
              this.model.tree[parts[0]][parts[1]] = this._readVal(ele);
          }
      }

      // read plantation state
      if( !this.model.plantation_state ) this.model.plantation_state = {};
      for ( var key in this.model.getDataModel().plantation_state.value ) {
          this.model.plantation_state[key] = -1;
      }

  },
  exportSetup : function() {
      this.model.variations = {};
      this.readFromInputs();
      this.readWeather([], {}, {});

      var ex = {
          weather : this.model.weather,
          custom_weather : this.model.custom_weather,
          tree : this.model.tree,
          plantation : this.model.plantation,
          manage : this.model.manage,
          soil : this.model.soil,
          manage : this.model.manage,
          plantation_state : this.model.plantation_state,
          config : {
              chartTypeInput : $("#chartTypeInput").val(),
              monthsToRun : this.app.monthsToRun(),
              currentLocation : $("#current-location").html(),
              loadedTree : $("#loaded-tree-name").html(),
              version : this.app.qs("version") ? this.app.qs("version") : "master"
          }
      }

      // by default the read function set the variations variables but only
      // returns the first, set the variation params to their correct values
      for( var key in this.model.variations ) {
          var parts = key.split(".");
          var param = ex;
          for( var i = 0; i < parts.length-1; i++ ) {
              param = param[parts[i]];
          }
          param[parts[parts.length-1]] = this.model.variations[key].join(", ");
      }

      return ex;
  },
  loadTree : function(tree) {
      for ( var rootKey in tree) {
          if (typeof tree[rootKey] != 'object') {
              $("#input-tree-" + rootKey).val(tree[rootKey]);
          } else {
              for ( var childKey in tree[rootKey]) {
                  $("#input-tree-" + rootKey + "-" + childKey).val(tree[rootKey][childKey]);
              }
          }
      }
  },
  loadSetup : function(fileid, setup, isRt) {

      // load config
      if (setup.config.chartTypeInput) {
          this.charts.unselectAll();
          for ( var i = 0; i < setup.config.chartTypeInput.length; i++) {
              this.charts.select(setup.config.chartTypeInput[i]);
          }
      }
      if (setup.config.currentLocation) {
          $("#current-location").html(setup.config.currentLocation);
      }
      if( setup.config.loadedTree ) {
          $("#loaded-tree-name").html(setup.config.loadedTree).parent().show();
      }

      // load weather
      if( Array.isArray(setup.weather) ) {
        for ( var i = 0; i < setup.weather.length; i++) {
            for ( var key in setup.weather[i]) {
                if (key == 'month')
                    continue;
                if (setup.weather[i][key] != null)
                    $("#input-weather-" + key + "-" + i).val(setup.weather[i][key])
                else
                    $("#input-weather-" + key + "-" + i).val("");
            }
        }
      } else {
        for ( var i in setup.weather ) {
            for ( var key in setup.weather[i]) {
                if (key == 'month')
                    continue;
                if (setup.weather[i][key] != null)
                    $("#input-weather-" + key + "-" + i).val(setup.weather[i][key])
                else
                    $("#input-weather-" + key + "-" + i).val("");
            }
        }
      }

      if( setup.custom_weather ) {
          this.model.custom_weather = setup.custom_weather;
      } else {
          this.model.custom_weather = {};
      }

      // create the chart
      this.inputForm.updateAverageChart();

      // load tree
      this.loadTree(setup.tree);

      // load planting params
      // Now part of manage....
      // fo
      if (setup.manage) {
          var map = {
              "datePlanted" : "DatePlanted",
              "dateCoppiced" : "DateCoppiced",
              "yearsPerCoppice" : "CoppiceInterval"
          }

          for ( var key in setup.manage) {
              var newKey = key;
              if( map[key] ) newKey = map[key];

              if (typeof setup.manage[key] == 'string')
                  $("#input-manage-" + newKey).val(setup.manage[key].replace(/T.*/, ''));
              else
                  $("#input-manage-" + newKey).val(setup.manage[key]);
          }
      }

      // this value is deprecated, set to new input
      if( setup.config.monthsToRun ) {
          var d = new Date(setup.manage.datePlanted);
          d = new Date(new Date(d).setMonth(d.getMonth()+parseInt(setup.config.monthsToRun)));
          $("#input-manage-dateFinalHarvest").val(d.toISOString().replace(/T.*/, ''));
      }


      // load rest
      var inputs = [ "plantation", "soil", "manage" ];
      for ( var i = 0; i < inputs.length; i++) {
          for ( var key in setup[inputs[i]]) {
              if (key == 'maxAWS') {
                  $("#input-soil-maxAWS").val(setup.soil.maxAWS);
              } else if ( typeof setup[inputs[i]][key] == 'string' && setup[inputs[i]][key].match(/.*T.*Z$/) ) {
                  $("#input-" + inputs[i] + "-" + key).val(setup[inputs[i]][key].replace(/T.*/, ''));
              } else {
                  $("#input-" + inputs[i] + "-" + key).val(setup[inputs[i]][key]);
              }
          }
      }
      this.app.runModel(isRt);
  }
};

},{}],32:[function(require,module,exports){

  // must install this for native phonegap support:
  // https://github.com/phonegap-build/ChildBrowser

var win = null;

/* the key for refresh Token in local Storage */
var tokenKey = 'refresh_token';

/* stores the accessToken after retrieval from google server */
var accessToken = null;

/* stores the Time when access token was last received from server */
var accessTokenTime = null;

/* stores access Token's Expiry Limit. Uses 58 min. instead of 60 min. */
var accessTokenExpiryLimit = 58 * 60 * 1000;

/* A temporary variable storing callback function */
var callbackFunc = false;

// are we running native or browser mode?
var isNative = window.location.href.match(/^file.*/) ? true : false;

var CLIENT_ID = isNative ?
        "344190713465-diimtferh4tjb03169bkl9mkoqvq2ru9.apps.googleusercontent.com" :
         "344190713465.apps.googleusercontent.com";

var APP_ID = "344190713465";

var OAUTH_SCOPES = 'https://www.googleapis.com/auth/drive.file '
  + 'https://www.googleapis.com/auth/drive.install '
  + 'https://www.googleapis.com/auth/userinfo.profile';

/* config values for Google API (gapi) */
var gapiConfig = {
  endpoint: "https://accounts.google.com/o/oauth2/auth",
  endtoken: "https://accounts.google.com/o/oauth2/token", // token endpoint
  redirect_uri : "http://localhost",
  client_secret : '6rOQ9l0fynh137MRXGK-G_Zg',
  response_type : "code",
  client_id : CLIENT_ID,
  state : "gdriveinit",
  access_type : "offline",
  scope : OAUTH_SCOPES,

  /* As defined in the OAuth 2.0 specification, this field must contain a value
     * of "authorization_code" or "refresh_token" */
    grantTypes: { AUTHORIZE: "authorization_code", REFRESH: "refresh_token" },
 };

/**
 * Enum for Status values
 *
 * @enum {number}
 *
 * SUCCESS - Successfully data received from server
 * ERROR - Error occurred when trying to receive from server
 * NOT_DETERMINED - undetermined
 */
var status = {
        SUCESS: 1,
        ERROR: -1,
        NOT_DETERMINED: 0
}

requestStatus = 0;

/* stores the authorization Code internally */
authCode = false;

/* stores the error message when an error happens from google server */
errorMessage = false;

var log = function(msg) {
  console.log("***OAUTH***: "+msg);
}

/**
 * Attempts to authorize user using OAuth
 * Opens up Another window where user allows access or denies it.
 *
 * @param {function} callBack   A callback function which is invoked
 */
var authorize = function(callBack) {
  log("attempting to authorize");

    var authUri = gapiConfig.endpoint + '?'
    + 'scope=' + encodeURIComponent(gapiConfig.scope)
    + '&' + 'redirect_uri=' + encodeURIComponent(gapiConfig.redirect_uri)
    + '&' + 'response_type=' + encodeURIComponent(gapiConfig.response_type)
    + '&' + 'client_id=' + encodeURIComponent(gapiConfig.client_id);
    //+ '&' + 'state=' + encodeURIComponent(gapiConfig.state)
    //+ '&' + 'access_type=' + encodeURIComponent(gapiConfig.access_type)
    //+ '&' + 'approval_prompt=force'; // @TODO - check if we really need this param

    callbackFunc = callBack;
    requestStatus = status.NOT_DETERMINED;




    log("opening InAppBrowser");

    try {

      // Now open new browser
      win = window.open(authUri, '_blank', 'location=no,toolbar=no');

      $(win).on('loadstart',function(e){
        log("InAppBrowser loadstart");
        console.log(e.originalEvent.url);
        onAuthUrlChange(e.originalEvent.url);
      });

      //window.plugins.childBrowser.showWebPage(authUri, {showLocationBar : true});
      //window.plugins.childBrowser.onClose = onAuthClose;
      //window.plugins.childBrowser.onLocationChange = onAuthUrlChange;
    } catch(e) {
      log("Error opening InAppBrowser");
      log(e);
    }

};

if( !isNative ) {
  authorize = function(callback, immediate) {
  gapi.auth.authorize({
    client_id : CLIENT_ID,
    scope : OAUTH_SCOPES,
    immediate : immediate
  }, function() {
    authCode = gapi.auth.getToken();
    callback(authCode);
  });

  }
}

/* Auth Window closed */
var onAuthClose = function() {
        //console.log("Auth window closed");
};

/* OAuth Successfully done */
var onAuthSuccess = function() {
        //console.log('Auth Success?');
};

/**
 * Gets Invoked when the URL changes on OAuth authorization process
 *
 * Success URL Pattern:
 * "redirect_uri" + "?code=" [secret code val]
 *
 * Success Sample URL:
 * http://localhost/?code=4/WOpRLQfvvhHE0tuMUDDqnn76lCTT.8nXC4IebMEAUuJJVnL49Cc8AQGr8cQI
 *
 * Denied Access URL Pattern: "redirect_uri" + ?error=access_denied
 * Denied Access Sample: http://localhost/?error=access_denied
 *
 * @param {string} uriLocation The URI Location
 */
var onAuthUrlChange = function(uriLocation) {
    console.log("InAppBrowser url changed "+uriLocation);
    if(uriLocation.indexOf("code=") != -1) {
        requestStatus = status.SUCCESS;

        /* Store the authCode temporarily */
        authCode = getParameterByName("code", uriLocation);
        log("Found auth code: "+authCode);

        getRefreshToken(callbackFunc);

        // close the childBrowser
        win.close();
    } else if(uriLocation.indexOf("error=") != -1)  {
        requestStatus = status.ERROR;
        errorMessage = getParameterByName("error", uriLocation);
        callbackFunc();
        win.close();
    } else {
        requestStatus = status.NOT_DETERMINED;
        //callbackFunc();
    }
};


/**
* Gets the Refresh from Access Token. This method is only called internally,
* and once, only after when authorization of Application happens.
*
* @param paramObj An Object containing authorization code
* @param paramObj.auth_code The Authorization Code for getting Refresh Token
*
* @param {Function} callback callback function which is to be invoked after
*                            successful retrieval of data from google's server
*
*/
var getRefreshToken = function(callback) {
  console.log("access refresh token");
   $.ajax({
          type: "POST",
          url: gapiConfig.endtoken,
          data: {
                   client_id    : gapiConfig.client_id,
                   client_secret: gapiConfig.client_secret,
                   code         : authCode,
                   redirect_uri : gapiConfig.redirect_uri,
                   grant_type   : gapiConfig.grantTypes.AUTHORIZE
           }
    })
    .done(function(data) {
        console.log("success getting refresh token");

        /* upon sucess, do a callback with the data received */
        // temporary storing access token
        accessToken     = data.access_token;
        accessTokenTime = (new Date()).getTime();

        // set the token for the js api
        gapi.auth.setToken(data);

        /* set the error of data to false, as it was successful */
        data.error = false;

        window.localStorage.setItem(tokenKey, data.refresh_token);

        /* now invoke the callback */
        callback({access_token: accessToken});
    })
    .fail(function(xhr, textStatus) {
            callback({
                    error: true,
                    message: xhr.responseText
            });
    })
    .always(function() {
            //console.log("Token request complete");
    });
};

if( !isNative ) {
  getRefreshToken = function(callback) {
  gapi.auth.authorize({
    client_id : CLIENT_ID,
    scope : OAUTH_SCOPES,
    immediate : true
  }, function() {
    token = gapi.auth.getToken();
    if( callback ) callback(token);
  });
  }
}


/**
* This method should ONLY be called locally from within this class.
* Returns the Refresh Token from the local database.
*
* @return {String} The refresh Token
*
*/
var getToken = function() {
    return window.localStorage.getItem(tokenKey);
};


/**
* This method is invoked externally. It retrieves the Access Token by at first
* checking if current access token has expired or not. If its not expired, it
* simply returns that, otherwise, it gets the refresh Token from the local database
* (by invoking getToken) and then connecting with Google's Server (using OAuth)
* to get the Access Token.
*
* @param {Function} callback   A callBack function which is to be invoked after
*                             data is retrieved from the google's server. The data
*                             from google server is passed to callback as args.
*
*/
var getAccessToken = function(callback) {
   var currentTime = (new Date()).getTime();

   console.log("getting access token");

   /* check if current Token has not expired (still valid) */
   if (accessToken && accessToken != false &&
           currentTime < (accessTokenTime + accessTokenExpiryLimit)) {
           callback({ access_token: accessToken });

           return;
   }

   console.log("ACCESS TOKEN PARAMS: "+accessToken+" "+accessTokenTime+" "+accessTokenExpiryLimit);

   /* else, get the refreshToken from local storage and get a new access Token */
   var refreshToken = getToken();

   //   console.log("Refresh Token >> " + refreshToken);
   $.ajax({
          type: "POST",
          url: gapiConfig.endtoken,
          data: {
                  client_id    : gapiConfig.client_id,
                  client_secret: gapiConfig.client_secret,
                  refresh_token: refreshToken,
                  grant_type   : gapiConfig.grantTypes.REFRESH,
          }
    })
    .done(function(data) {
            /* upon sucess, do a callback with the data received */
            // temporary storing access token
            accessToken = data.access_token;
            accessTokenTime = (new Date()).getTime();

            // set the token for the js api
            gapi.auth.setToken(data);

            /* set the error to false */
            data.error = false;
            callback(data);
           })
    .fail(function(xhr, textStatus) {
            console.log("Token request error ?? >>" + xhr.responseText);
            callback({
                    error: true,
                    message: xhr.responseText
            });
    })
    .always(function() { //console.log("Token request complete");
    });
};

if( !isNative ) {
  getAccessToken = function(callback) {
     var currentTime = (new Date()).getTime();

     if (accessToken &&
             currentTime < (accessTokenTime + accessTokenExpiryLimit)) {
             callback(accessToken);

             return;
     }

    gapi.auth.authorize({
    client_id : CLIENT_ID,
    scope : OAUTH_SCOPES,
    immediate : true
  }, function() {
    token = gapi.auth.getToken();
    accessToken = token;
    accessTokenTime = (new Date()).getTime();
    if( callback ) callback(token);
  });
  }
}



/**
* Saves the Refresh Token in a local database or localStorage
* This method shall be invoked from externally only <b>once</b> after an
* authorization code is received from google's server. This method
* calls the other method (getRefreshToken) to get the refresh Token and
* then saves it locally on database and invokes a callback function
*
* @param tokenObj A Object containing authorization code
* @param {String} tokenObj.auth_code The authorization code from google's server
*
* @param {Function} callback The function to be invoked with parameters
*/
var saveRefreshToken = function(tokenObj, callback) {
     getRefreshToken(tokenObj, function(data) {

             /* if there's no error */
             if (!data.error) {
                    // @TODO: make another method saveToken to abstract the storing of token
                window.localStorage.setItem(tokenKey, data.refresh_token);
             }
             callback(data);
     });
};



/**
* Checks if user has authorized the App or not
* It does so by checking if there's a refresh_token
* available on the current database table.
*
* @return {Boolean} true if authorized, false otherwise
*/
var isAuthorized = function(callback) {
      var tokenValue = window.localStorage.getItem(tokenKey);

      callback(((tokenValue !== null) && (typeof tokenValue !== 'undefined')));
};

if( !isNative ) {
  isAuthorized = function(callback) {
    gapi.auth.authorize({
    client_id : CLIENT_ID,
    scope : OAUTH_SCOPES,
    immediate : true
  }, function() {
    token = gapi.auth.getToken();
    if( callback ) callback(token);
  });
  }
}


/**
* Extracts the code from the url. Copied from online
* @TODO needs to be simplified.
*
* @param name The parameter whose value is to be grabbed from url
* @param url  The url to be grabbed from.
*
* @return Returns the Value corresponding to the name passed
*/
var getParameterByName = function(name, url) {
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regexS = "[\\?&]" + name + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(url);

  if(results == null) {
    return false;
  }
  else
    return decodeURIComponent(results[1].replace(/\+/g, " "));
};


module.exports = {
  authorize : authorize,
  isAuthorized : isAuthorized,
  getAccessToken : getAccessToken,
  APP_ID : APP_ID
};

},{}],33:[function(require,module,exports){
var app = require('./app');

var cachedTileStyle = {
  where: "pid in ()",
  polygonOptions: {
    fillColor: "#000000",
    strokeColor: "#FF0000",
    strokeWeight: 3
  }
}

var cachedTiles = [];
var cachedTilesLoaded = false;
var cachedTilePrefix = 'cached_title_';
var caching = false;
var saveCacheOnClickSet = false;
var cMapData = {};

var cols = [];
var app = null;

function init() {
  _loadFromCache();
  _loadCachedTiles();
}

function clearCache() {
  if( !confirm('Are you sure you want to clear all tile data from the cache?') ) return;

  for( var key in window.localStorage ) {
    if( key.indexOf(cachedTilePrefix) > -1 ) {
      window.localStorage.removeItem(key);
    }
  }
  cachedTiles = [];
}

// e is the event object from google maps
function cacheTile(e, fusionLayer, defaultOptions, defaultStyle) {
  if( !saveCacheOnClickSet ) {
    saveCacheOnClickSet = true;
    $('#locate-cache-save-btn').on('click', function(){
      _saveTile();
    });
    $('#locate-cache-mode').on('click', function(){
      if( !$(this).is('checked') ) $('#locate-cache-save-panel').hide();
    });
  }

  if( caching ) return;
  caching = true;

  cMapData = {
    fusionLayer : fusionLayer,
    defaultOptions : defaultOptions,
    defaultStyle : defaultStyle,
    pid :  e.row.pid.value
  }

  $('#locate-cache-save-name').val('');
  $('#locate-cache-mode-loading').show();
  $('#locate-cache-save-panel').hide();

  _loadTile(e.latLng.lng(), e.latLng.lat(), function(data){
    $('#locate-cache-save-panel').show();
    $('#locate-cache-mode-loading').hide();

    $('#locate-cache-save-pid').html(cMapData.pid);
    cMapData.data = data;
    caching = false;
  });
}

function render() {
  for( var attr in app.getModel().weather ) {
    if( attr != "nrel" ) cols.push(attr);
  }

  // the about modal link is created below, so why not...
  $("#about-modal").modal({
    show : false
  });

  // the about modal link is created below, so why not...
  $("#help-modal").modal({
    show : false
  });

  _createNavMenu();

  // hide the select tree button
  $('#tree-sub-menu').parent().hide();

  // hide the selector for uploading weather data from a google spreadsheet
  $('#weatherReader-spreadsheet').parent().hide();

  // show the cache version of the location selector
  $('#select-location-online').hide();
  $('#select-location-offline').show();

  // set the location selector ui list based on cached tiles
  _updateCacheTileUiList();
}

function renderCachedTilesOnMap(fusionLayer, defaultOptions, defaultStyle) {
  if( !cachedTilesLoaded ) _loadCachedTiles();

  defaultOptions.styles = [defaultStyle];

  if( cachedTiles.length > 0 ) {
    cachedTileStyle.where = 'pid in ('+cachedTiles.join(',')+')';
    defaultOptions.styles.push(cachedTileStyle);
  }

  fusionLayer.setOptions(defaultOptions);
}

function _saveTile() {
  var name = $('#locate-cache-save-name').val();
  if( name.length == 0 ) return alert('Please provide a name');

  cMapData.data.name = name;

  window.localStorage.setItem(cachedTilePrefix+cMapData.pid, JSON.stringify(cMapData.data));

  cachedTiles.push(cMapData.pid);
  renderCachedTilesOnMap(cMapData.fusionLayer, cMapData.defaultOptions, cMapData.defaultStyle);
  $('#locate-cache-save-panel').hide();
}

function _loadTile(lng, lat, callback) {
  ga('send', 'event', 'ui', 'interaction', 'tile-data-cache', 1);

  var url = "http://alder.bioenergy.casil.ucdavis.edu:8080/vizsource/rest?view=pointToWeather("+lng+","+lat+",8192)"
  var q = new google.visualization.Query(url);
  var resps = 0;
  var weatherTable = {};
  var soilTable = {};

  function checkDone() {
      resps++;
      if( resps == 2 && callback ) callback({weather:weatherTable, soil:soilTable});
  }

  q.setQuery('SELECT *');
  q.send(function(response){
    weatherTable = JSON.parse(response.getDataTable().toJSON());
    checkDone();
  });

  var url = "http://alder.bioenergy.casil.ucdavis.edu:8080/vizsource/rest?view=pointToSOIL("+lng+","+lat+",8192)"
  var q = new google.visualization.Query(url);
  q.setQuery('SELECT *');
  q.send(function(response){
    soilTable = JSON.parse(response.getDataTable().toJSON());
    checkDone();
  });
}

function _updateCacheTileUiList() {
  if( cachedTiles.length == 0 ) {
    $('#select-location-offline-none').show();
    return;
  }

  var listEle = $('#select-location-offline-list').html('<div>Select Cached Tile</div>'), ele;
  $('#select-location-offline-none');
  for( var i = 0; i < cachedTiles.length; i++ ) {
    var json = window.localStorage.getItem(cachedTilePrefix+cachedTiles[i]);
    json = JSON.parse(json);

    ele = $('<div><a cacheid="'+i+'" style="cursor:pointer">'+cachedTiles[i]+': '+json.name+'</a></div>');
    ele.find('a').on('click', function() {
      _runCachedTile(parseInt($(this).attr('cacheid')));
    });
    listEle.append(ele)
  }
}

function _runCachedTile(index) {
  var json = window.localStorage.getItem(cachedTilePrefix+cachedTiles[index]);
  json = JSON.parse(json);

  for( var i = 0; i < json.weather.rows.length; i++ ) {
    var m = i+'';
    for( var j = 1; j < json.weather.cols.length; j++ ) {
      $("#input-weather-"+cols[j]+"-"+i).val(json.weather.rows[i].c[j] ? json.weather.rows[i].c[j].v : "");
    }
  }


  for( var i = 0; i < json.soil.cols.length; i++ ) {
    if( json.soil.rows[0] == null ) continue;
    $("#input-soil-"+json.soil.cols[i].id).val(json.soil.rows[0].c[i].v);
  }

  $("#select-weather-modal").modal('hide');

  setTimeout(function(){
    app.runModel();
  }, 500);
}

function _loadCachedTiles() {
  cachedTiles = [];
  for( var key in window.localStorage ) {
    if( key.indexOf(cachedTilePrefix) > -1 ) {
      cachedTiles.push(key.replace(cachedTilePrefix,''));
    }
  }
  cachedTilesLoaded = true;
}

function _createNavMenu() {
  var btn = $('<li class="dropdown">'
      + '<a class="dropdown-toggle">OFFLINE MODE<b class="caret"></b></a>'
      + '<ul class="dropdown-menu">'
      + '<li><a id="help"><i class="icon-question-sign"></i> Help</a></li>'
      + '<li><a id="about"><i class="icon-info-sign"></i> About</a></li>'
      + '</ul></li>');

  // set click handlers for popup
  btn.find('a.dropdown-toggle').on('click', function(){
    $(this).parent().toggleClass('open');
  });

  // about click handler
  btn.find('#about').on('click', function() {
    btn.toggleClass('open');
    $("#about-modal").modal('show');
  });

  btn.find('#help').on('click', function() {
    btn.toggleClass('open');
    showHelp();
  });

  // add menu
  $("#login-header").html("").append(btn);
};

function _loadFromCache() {
      $.ajax({
        url: 'cache/jsapi',
        dataType: "script",
        cache : true,
        success: function(){
          $('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', 'cache/chart.css') );
          $('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', 'cache/annotatedtimeline.css') );
          $.ajax({
            url: 'cache/chart.js',
            dataType: "script",
            cache : true,
            success: function(){
              chartsLoaded = true;
              if( chartsCallback ) chartsCallback();
            }
          });
        }
      });
}

module.exports = {
  init : init,
  render : render,
  cacheTile : cacheTile,
  renderCachedTilesOnMap : renderCachedTilesOnMap,
  clearCache : clearCache
};

},{"./app":24}],34:[function(require,module,exports){
module.exports = {
  VPD : {
      label : "Mean Vapor Pressure Deficit",
      units : "kPA",
      description : "the difference (deficit) between the amount of moisture in the air and how much " +
      		"moisture the air can hold when it is saturated"
  },
  fVPD : {
      label : "Vapor Pressure Deficit Modifier",
      units : "unitless",
      description : "A environmental factor growth modifier"
  },
  fT : {
      label : "Temperature Modifier",
      units : "unitless",
      description : "A environmental factor growth modifier"
  },
  fFrost : {
      label : "Frost Modifier",
      units : "unitless",
      description : "Number of frost days growth modifier"
  },
  PAR : {
      label : "Monthly Photosynthetically Active Radiation",
      units : "mols / m^2 month",
      description : "Designates the spectral range (wave band) of solar radiation from 400 to 700 nanometers " +
      		"that photosynthetic organisms are able to use in the process of photosynthesis"
  },
  xPP : {
      label : "Maximum Potential Primary Production",
      units : "Metric Tons Dry Matter/ha",
      description : ""
  },
  Intcptn : {
      label : "Canopy Rainfall Interception",
      units : "",
      description : "Precipitation that does not reach the soil, but is instead intercepted by the leaves and branches of plants and the forest floor."
  },
  ASW : {
      label : "Available Soil Water",
      units : "mm",
      description : ""
  },
  CumIrrig : {
      label : "Cumulative Required Irrigation",
      units : "mm/mon",
      description : ""
  },
  Irrig : {
      label : "Required Irrigation",
      units : "mm/mon",
      description : ""
  },
  StandAge : {
      label : "Stand Age",
      units : "",
      description : ""
  },
  LAI : {
      label : "Leaf Area Index",
      units : "m2 / m2",
      description : "The one-sided green leaf area per unit ground surface area"
  },
  CanCond : {
      label : "Canopy Conductance",
      units : "gc,m/s",
      description : ""
  },
  Transp : {
      label : "Canopy Monthly Transpiration",
      units : "mm/mon",
      description : "Water movement through a plant and its evaporation from aerial parts"
  },
  fSW : {
      label : "Soil Water Modifier",
      units : "unitless",
      description : "A environmental factor growth modifier"
  },
  fAge : {
      label : "Stand age",
      units : "unitless",
      description : "A environmental factor growth modifier"
  },
  PhysMod : {
      label : "",
      units : "unitless",
      description : "Physiological Modifier to Canopy Conductance"
  },
  pR : {
      label : "",
      units : "",
      description : "Along with a Physiologial parameter, specifies the amount of new growth allocated to the root system, and the turnover rate."
  },
  pS : {
      label : "",
      units : "",
      description : "Defines the foliage to stem (WF/WS) fraction in allocating aboveground biomass of the tree"
  },
  litterfall : {
      label : "",
      units : "",
      descrition : "",
      altFnName : "tdp"
  },
  NPP : {
      label : "Net Canopy Production",
      units : "Mg/ha",
      description : ""
  },
  WF : {
      label : "Leaf Biomass",
      units : "Mg/ha",
      description : "",
      fn : function(pre_WF, cur_dW, cur_pF, cur_litterfall, prev_WF) {
          return prev_WF + cur_dW * cur_pF - cur_litterfall * prev_WF
      }
  },
  WR : {
      label : "Root Biomass",
      units : "Mg/ha",
      description : "",
      fn : function(prev_WR, cur_dW, cur_pR, turnover, prev_WR, cur_RootP) {
          return prev_WR + cur_dW * cur_pR - tree.pR.turnover * prev_WR - cur_RootP;
      }
  },
  WS : {
      label : "Stem Biomass",
      units : "Mg/ha",
      description : "",
      fn : function(prev_WS, cur_dW, cur_pS) { return prev_WS + cur_dW * cur_pS }
  },
  W : {
      label : "Total Biomass",
      units : "Mg/ha",
      description : "",
      fn : function(cur_WF, cur_WR, cur_WS) { return cur_WF+cur_WR+cur_WS }
  }
}

},{}],35:[function(require,module,exports){
var app = require('./app');

// add spreadsheet viz source
// https://spreadsheets.google.com/tq?tq=select%20*&key=0Av7cUV-o2QQYdHZFYWJNNWpRS1hIVWhGQThlLWZwZWc&usp=drive_web#gid=0

function init() {
var dropZone = document.getElementById('drop_zone');
dropZone.addEventListener('dragover', _handleDragOver, false);
dropZone.addEventListener('drop', _handleFileSelect, false);

document.getElementById('files').addEventListener('change', _handleFileSelect, false);

    $('#spreadsheet-weather-input-btn').on('click', function(){
        _handleGoogleSpreadsheet();
    });
    $('#spreadsheet-weather-input').on('keyup', function(e){
        if( e.which == 13 ) _handleGoogleSpreadsheet();
    });

    $('#weatherReader-localfile').on('click', function(){
        $('#weatherReader-localfile-panel').toggle('slow');
    });
    $('#weatherReader-spreadsheet').on('click', function(){
        $('#weatherReader-spreadsheet-panel').toggle('slow');
    });

}

function _handleGoogleSpreadsheet() {
    ga('send', 'event', 'ui', 'interaction', 'load-weather-drive-file', 1);

    var val = $('#spreadsheet-weather-input').val();
    if( val.length == 0 ) return;

    if( !val.match(/^http.*/ ) ) val = 'https://'+val;

    var filePanel = new WeatherFile();
    var root = $("#file_list");
    filePanel.initFromUrl(val, root);
    $('#spreadsheet-weather-input').val('');
}

function _handleFileSelect(evt) {
    ga('send', 'event', 'ui', 'interaction', 'load-weather-local-file', 1);

  evt.stopPropagation();
  evt.preventDefault();

  var files = evt.dataTransfer ? evt.dataTransfer.files : evt.target.files; // FileList object.

  // files is a FileList of File objects. List some properties.
  var root = $("#file_list");
  for (var i = 0, f; f = files[i]; i++) {
    var filePanel = new WeatherFile();
    filePanel.init(f, root);
  }
}

function _handleDragOver(evt) {
evt.stopPropagation();
evt.preventDefault();
evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}

// on add, if the list is empty, let's close the popup
function _onComplete() {
    if( $("#file_list").children().length == 0 ) {
        $('#weatherReader-modal').modal('hide');
    }
}

var WeatherFile = function() {
  var headers = {
        date     : {
            label : 'Date',
            units : 'Date',
            col   : -1
        },
        tmin     : {
            label : 'Min Temperature',
            units : 'C',
            col   : -1
        },
        tmax     : {
            label : 'Max Temperature',
            units : 'C',
            col   : -1
        },
        tdmean   : {
            label : 'Mean Temperature',
            units : 'C',
            col   : -1
        },
        ppt      : {
            label : 'Precipition',
            units : 'mm',
            col   : -1
        },
        rad      : {
            label : 'Radiation',
            units : 'MJ m-2 day-1',
            col   : -1
        },
        daylight : {
            lanel : 'Daylight Hours',
            units : 'hours',
            col   : -1
        }
    };


  var ele = $('<div style="text-align: left">'+
            '<button type="button" class="close" aria-hidden="true">&times;</button>'+
      '<div class="filename"></div>'+
      '<div class="progress">'+
      '<div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;">'+
        '<span class="sr-only">0% Complete</span>'+
      '</div>'+
    '</div>'+
      '<div class="status">'+
                '<div class="date-range"></div>'+
                '<div class="preview-data" style="display:none">'+
                    '<div><a class="btn btn-link preview-data-btn">Preview Data</a></div>'+
                    '<div class="preview-data-table" style="display:none"></div>'+
                '</div>'+
                '<div class="col-status" style="display:none"></div>'+
                '<div style="height:50px">'+
                    '<a class="btn btn-link map-data-btn">Map CSV Columns</a>'+
                    '<a class="btn btn-success disabled pull-right">Add Data</a>'+
                '</div>'+
            '</div>'+
    '</div>');

  var data = {};
    var csvTable = [];

    // only auto hide the first time
    var autoHide = true;

  // the file reader object and the element
  function init(file, rootEle) {
    var reader = new FileReader();
    reader.onerror = errorHandler;
    reader.onprogress = updateProgress;
    reader.onloadstart = function(e) {};
    reader.onload = function(e) {
      ele.find('.progress').remove();
      parse(e.target.result);
    }
    reader.readAsText(file)

    ele.find('.filename').html(getName(file));
    rootEle.append(ele);

        _setHandlers();
  }

    function initFromUrl(url, rootEle) {
        var q = new google.visualization.Query(url);
        ele.find('.progress').html('Querying spreadsheet...');

        var key = getKey(url);
        ele.find('.filename').html('<h3 style="border-bottom:1px solid #eee;padding:15px 0 4px 0"><i class="icon-tint"></i> '+
            'Google Spreadsheet'+(key.length > 0 ? '<br /><span style="color:#888;font-size:14px">'+key+'</span>' : '')+'</h3>');

        rootEle.append(ele);

        q.setQuery('SELECT *');
        q.send(function(response){
            ele.find('.progress').remove();

            if (response.isError()) {
                setError('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
                return;
            }

            parse(dtToCsv(response.getDataTable()));
        });

        _setHandlers();
    }

    function _setHandlers() {
        ele.find('.map-data-btn').on('click', function(){
            ele.find('.col-status').toggle('slow');
        });

        ele.find('.preview-data-btn').on('click', function(){
            ele.find('.preview-data-table').toggle('slow');
        });

        ele.find('.close').on('click', function(){
            ele.remove();
        });

        ele.find('.btn-success').on('click', function(){
            app.setWeather(data);
            ele.remove();
            _onComplete();
        });
    }

    function dtToCsv(dt) {
        var arr = [[]];

        dt = JSON.parse(dt.toJSON());
        for( var i = 0; i < dt.cols.length; i++ ) {
            arr[0].push(dt.cols[i].label);
        }

        for( var i = 0; i < dt.rows.length; i++ ) {
            arr.push([]);
            for( var j = 0; j < dt.rows[i].c.length; j++ ) {
                if( !dt.rows[i].c[j] ) arr[i+1].push('');
                else arr[i+1].push(dt.rows[i].c[j].v);
            }
        }

        var csv = '';
        for( var i = 0; i < arr.length; i++ ) {
            csv += arr[i].join(',')+'\n';
        }

        return csv;
    }

    function getKey(url) {
        var parts = url.split('?');
        if( parts.length == 1 ) return '';

        parts = parts[1].split('&');
        for( var i = 0; i < parts.length; i++ ) {
            if( parts[i].split('=')[0] == 'key' ) return parts[i].split('=')[1];
        }
        return '';
    }

  function getName(f) {
    return ['<h3 style="border-bottom:1px solid #eee;padding:15px 0 4px 0"><i class="icon-tint"></i> ', f.name,
                ' <span style="color:#888;font-size:16px">(', f.type || 'n/a',
                ')</span> - <span style="font-size:16px">', f.size, ' bytes</span>', '</h3>'].join('');
  }

  function parse(data) {
    data = data.replace(/^\s*\n/g,'').split('\n');

    var table = [];
    for( var i = 0; i < data.length; i++ ) {
      table.push(data[i].split(','));
    }

        if( table.length == 0 ) return setError('File did not contain any information.');
        csvTable = table;

        parseHeader(table[0]);
        getDateRange();
    }

    function getDateRange() {
        ele.find('.date-range').html('');
        if( headers.date.col == -1 ) return ele.find('.date-range').html('Date column needs to be matched.');
        if( typeof headers.date.col == 'string' ) headers.date.col = parseInt(headers.date.col);

        var dates = {};
        var displayDates = [];
        for( var i = 1; i < csvTable.length; i++ ) {
            if( headers.date.col < csvTable[i].length && csvTable[i].length >= 7 ) {
                var p = csvTable[i][headers.date.col].split("-");
                if( p.length != 3 && p.length != 2 ) return setError("Date: "+csvTable[i][headers.date.col]+" is not a valid format (yyyy-mm-dd or yyyy-mm)");

                if( !dates[p[0]] ) dates[p[0]] = [];
                var mmdd = p[1];

                if( dates[p[0]].indexOf(mmdd) != -1 ) return setError("Date: "+csvTable[i][headers.date.col]+" is in dataset twice");
                dates[p[0]].push(mmdd);
            }
        }

        for( var year in dates ) {
            if( dates[year].length == 12) {
                displayDates.push(year);
            } else {
                displayDates.push(year+' ['+dates[year].join(', ')+']');
            }
        }

        ele.find('.date-range').html('<b>Date Range:</b> '+displayDates.join(', '));
    }

    function parseHeader(headerRow) {
        var matched = [];

        var html = '<table class="table table-striped">';
        html += '<tr><th>Key</th><th>Column #</th></tr>';

        for( var key in headers ) {
            if( headerRow.indexOf(key) != -1 ) {
                headers[key].col = headerRow.indexOf(key);
                matched.push(key);
                html += '<tr><td>'+key+'</td><td><span class="label label-success">'+headers[key].col+' <i class="icon-ok"></i></span></td></tr>';
            } else {
                html += '<tr><td>'+key+'</td><td><select class="select-'+key+'""></select></td></tr>';
            }
        }
        ele.find('.col-status').html(html+'</table>');


        if( matched.length != 7 ) {
            // create select element for missing col's
            ele.find('.status select').append($('<option value="">[Select Column]</option>'));

            // if it's radiation, add option for calculating
            // TODO

            // append missing cols
            for( var i = 0; i < headerRow.length; i++ ) {
                if( matched.indexOf(headerRow[i]) == -1 ) {
                    ele.find('.status select').append($('<option value="'+i+'">'+i+' - '+headerRow[i]+'</option>'));
                }
            }

            // set the change handlers for the selectors
            ele.find('.status select').on('change', function(e){
                var val = $(this).find('option:selected').attr('value');
                if( val != '' ) headers[this.className.replace(/select-/,'')].col = val;

                // if all columns are set, remove disabled from btn
                var ready = true;
                for( var key in headers ) {
                    if( headers[key].col == -1 ) {
                        ready = false;
                        break;
                    }
                }

                if( ready ) {
                    if( autoHide ) ele.find('.col-status').hide('slow');
                    onReady();
                } else {
                    data = {};
                    ele.find('.btn-success').addClass('disabled');
                    ele.find('.preview-data').hide();
                }
            });

            // show the table
            ele.find('.col-status').show('slow');
        } else {
            onReady();
        }
    }

    function onReady() {
        autoHide = false;
        ele.find('.btn-success').removeClass('disabled');
        setData();
        setPreview();
    }

    function setPreview() {
        ele.find('.preview-data').show();

        var html = '<table class="table table-striped"><tr><th>date</th>';
        for( var key in headers ){
            if( key == 'date' ) continue;
            html += '<th>'+key+'</th>';
        }

        var c = 0;
        for( var date in data ){
            if( c == 10 ) {
                html += '<tr><td colspan="7" style="text-align:center">...</td></tr>';
                break;
            }

            html += '<tr><td>'+date+'</td>';
            for( var key in headers ){
                if( key == 'date' ) continue;
                html += '<td>'+data[date][key]+'</td>';
            }
            html += '</tr>';

            c++;
        }

        ele.find('.preview-data-table').html(html);
    }

  // set the map of csv headers
  function setData() {
        data = {};
        for( var i = 1; i < csvTable.length; i++ ) {
            if( csvTable[i].length < 7 ) continue; // bad row

            var date = csvTable[i][headers.date.col];

            if( !date ) continue; // bad row

            if( date.split('-').length == 3 ) date = date.split("-").splice(0,2).join("-");
            data[date] = {};

            for( var key in headers ) {
                if( key == 'date' ) continue;

                data[date][key] = parseFloat(csvTable[i][headers[key].col]);
            }
        }
  }

  function updateProgress(evt) {
    // evt is an ProgressEvent.
    if (evt.lengthComputable) {
        var percentLoaded = Math.round((evt.loaded / evt.total) * 100);
        ele.find('.progress-bar').attr('aria-valuenow',percentLoaded).width(percentLoaded+"%");
        ele.find('.sr-only').html(Math.ceil(percentLoaded)+'% Complete');
    }
}

  function errorHandler(evt) {
    switch(evt.target.error.code) {
      case evt.target.error.NOT_FOUND_ERR:
        setError('File Not Found!');
        break;
      case evt.target.error.NOT_READABLE_ERR:
        setError('File is not readable');
        break;
      case evt.target.error.ABORT_ERR:
        break; // noop
      default:
        setError('An error occurred reading this file.');
    };
  }

  function setError(msg) {
      ele.find('.status').html('<div class="alert alert-danger">'+msg+'</div>');
  }

  return {
    init : init,
    initFromUrl : initFromUrl
  };

};

module.exports = {
  init : init
};

},{"./app":24}]},{},[24])(24)
});
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9wb3BsYXItM3BnLW1vZGVsL2luZGV4LmpzIiwiLi4vcG9wbGFyLTNwZy1tb2RlbC9saWIvZGF0YU1vZGVsL2NvbnN0YW50cy9pbmRleC5qcyIsIi4uL3BvcGxhci0zcGctbW9kZWwvbGliL2RhdGFNb2RlbC9pbmRleC5qcyIsIi4uL3BvcGxhci0zcGctbW9kZWwvbGliL2RhdGFNb2RlbC9tYW5hZ2UvaW5kZXguanMiLCIuLi9wb3BsYXItM3BnLW1vZGVsL2xpYi9kYXRhTW9kZWwvcGxhbnRhdGlvbi9pbmRleC5qcyIsIi4uL3BvcGxhci0zcGctbW9kZWwvbGliL2RhdGFNb2RlbC9wbGFudGF0aW9uX3N0YXRlL2luZGV4LmpzIiwiLi4vcG9wbGFyLTNwZy1tb2RlbC9saWIvZGF0YU1vZGVsL3NvaWwvaW5kZXguanMiLCIuLi9wb3BsYXItM3BnLW1vZGVsL2xpYi9kYXRhTW9kZWwvdHJlZS9jb25kdWN0YW5jZS5qcyIsIi4uL3BvcGxhci0zcGctbW9kZWwvbGliL2RhdGFNb2RlbC90cmVlL2ZhZ2UuanMiLCIuLi9wb3BsYXItM3BnLW1vZGVsL2xpYi9kYXRhTW9kZWwvdHJlZS9mdC5qcyIsIi4uL3BvcGxhci0zcGctbW9kZWwvbGliL2RhdGFNb2RlbC90cmVlL2luZGV4LmpzIiwiLi4vcG9wbGFyLTNwZy1tb2RlbC9saWIvZGF0YU1vZGVsL3RyZWUvaW50Y3B0bi5qcyIsIi4uL3BvcGxhci0zcGctbW9kZWwvbGliL2RhdGFNb2RlbC90cmVlL2xpdHRlcmZhbGwuanMiLCIuLi9wb3BsYXItM3BnLW1vZGVsL2xpYi9kYXRhTW9kZWwvdHJlZS9wZnMuanMiLCIuLi9wb3BsYXItM3BnLW1vZGVsL2xpYi9kYXRhTW9kZWwvdHJlZS9wci5qcyIsIi4uL3BvcGxhci0zcGctbW9kZWwvbGliL2RhdGFNb2RlbC90cmVlL3Jvb3RwLmpzIiwiLi4vcG9wbGFyLTNwZy1tb2RlbC9saWIvZGF0YU1vZGVsL3RyZWUvc2xhLmpzIiwiLi4vcG9wbGFyLTNwZy1tb2RlbC9saWIvZGF0YU1vZGVsL3dlYXRoZXIvaW5kZXguanMiLCIuLi9wb3BsYXItM3BnLW1vZGVsL2xpYi9mbi5qcyIsIi4uL3BvcGxhci0zcGctbW9kZWwvbGliL2lvLmpzIiwiLi4vcG9wbGFyLTNwZy1tb2RlbC9saWIvcnVuLmpzIiwiLi4vcG9wbGFyLTNwZy1tb2RlbC9saWIvdXRpbHMuanMiLCIuLi9wb3BsYXItM3BnLW1vZGVsL2xpYi92YWxpZGF0ZS5qcyIsImpzbGliL2FwcC5qcyIsImpzbGliL2NoYXJ0cy5qcyIsImpzbGliL2V4cG9ydC5qcyIsImpzbGliL2ZsYXNoYmxvY2stZGV0ZWN0b3IuanMiLCJqc2xpYi9nZHJpdmUuanMiLCJqc2xpYi9nZHJpdmVSVC5qcyIsImpzbGliL2lucHV0Rm9ybS5qcyIsImpzbGliL21vZGVsSU8uanMiLCJqc2xpYi9vYXV0aC5qcyIsImpzbGliL29mZmxpbmUuanMiLCJqc2xpYi9vdXRwdXREZWZpbml0aW9ucy5qcyIsImpzbGliL3dlYXRoZXJGaWxlUmVhZGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNVpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5ZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdmRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6K0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2VEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6aUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDemJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3UUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBpbyA9IHJlcXVpcmUoJy4vbGliL2lvJyk7XG52YXIgcnVuID0gcmVxdWlyZSgnLi9saWIvcnVuJykoaW8pO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gcnVuO1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZGVzY3JpcHRpb246IFwiVGhlc2UgYXJlIGNvbnN0YW50cy5cIixcbiAgICB2YWx1ZToge1xuICAgICAgICBkYXlzX3Blcl9tb250aDoge1xuICAgICAgICAgICAgdmFsdWU6IDMwLjQsXG4gICAgICAgICAgICB1bml0czogXCJkYXlzL21vXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJOdW1iZXIgb2YgRGF5cyBpbiBhbiBhdmVyYWdlIG1vbnRoXCJcbiAgICAgICAgfSxcbiAgICAgICAgZTIwOiB7XG4gICAgICAgICAgICB2YWx1ZTogMi4yLFxuICAgICAgICAgICAgdW5pdHM6IFwidnAvdFwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiUmF0ZSBvZiBjaGFuZ2Ugb2Ygc2F0dXJhdGVkIFZQIHdpdGggVCBhdCAyMENcIlxuICAgICAgICB9LFxuICAgICAgICByaG9BaXI6IHtcbiAgICAgICAgICAgIHZhbHVlOiAxLjIsXG4gICAgICAgICAgICB1bml0czogXCJrZy9tXjNcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkRlbnNpdHkgb2YgYWlyXCJcbiAgICAgICAgfSxcbiAgICAgICAgbGFtYmRhOiB7XG4gICAgICAgICAgICB2YWx1ZTogMjQ2MDAwMCxcbiAgICAgICAgICAgIHVuaXRzOiBcIkova2dcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkxhdGVudCBoZWF0IG9mIHZhcG91cmlzYXRpb24gb2YgaDJvXCJcbiAgICAgICAgfSxcbiAgICAgICAgVlBEY29udjoge1xuICAgICAgICAgICAgdmFsdWU6IDAuMDAwNjIyLFxuICAgICAgICAgICAgdW5pdHM6IFwiXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJDb252ZXJ0IFZQRCB0byBzYXR1cmF0aW9uIGRlZmljaXQgPSAxOC8yOS8xMDAwXCJcbiAgICAgICAgfSxcbiAgICAgICAgUWE6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtOTAsXG4gICAgICAgICAgICB1bml0czogXCJXL21eMlwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiSW50ZXJjZXB0IG9mIG5ldCByYWRpYXRpb24gdmVyc3VzIHNvbGFyIHJhZGlhdGlvbiByZWxhdGlvbnNoaXBcIlxuICAgICAgICB9LFxuICAgICAgICBRYjoge1xuICAgICAgICAgICAgdmFsdWU6IDAuOCxcbiAgICAgICAgICAgIHVuaXRzOiBcInVuaXRsZXNzXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJzbG9wZSBvZiBuZXQgdnMuIHNvbGFyIHJhZGlhdGlvbiByZWxhdGlvbnNoaXBcIlxuICAgICAgICB9LFxuICAgICAgICBnRE1fbW9sOiB7XG4gICAgICAgICAgICB2YWx1ZTogMjQsXG4gICAgICAgICAgICB1bml0czogXCJnL21vbChDKVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiTW9sZWN1bGFyIHdlaWdodCBvZiBkcnkgbWF0dGVyXCJcbiAgICAgICAgfSxcbiAgICAgICAgbW9sUEFSX01KOiB7XG4gICAgICAgICAgICB2YWx1ZTogMi4zLFxuICAgICAgICAgICAgdW5pdHM6IFwibW9sKEMpL01KXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJDb252ZXJzaW9uIG9mIHNvbGFyIHJhZGlhdGlvbiB0byBQQVJcIlxuICAgICAgICB9XG4gICAgfVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICB0cmVlIDogcmVxdWlyZSgnLi90cmVlJyksXG4gIHBsYW50YXRpb24gOiByZXF1aXJlKCcuL3BsYW50YXRpb24nKSxcbiAgcGxhbnRhdGlvbl9zdGF0ZSA6IHJlcXVpcmUoJy4vcGxhbnRhdGlvbl9zdGF0ZScpLFxuICBzb2lsIDogcmVxdWlyZSgnLi9zb2lsJyksXG4gIHdlYXRoZXIgOiByZXF1aXJlKCcuL3dlYXRoZXInKSxcbiAgbWFuYWdlIDogcmVxdWlyZSgnLi9tYW5hZ2UnKSxcbiAgY29uc3RhdHMgOiByZXF1aXJlKCcuL2NvbnN0YW50cycpXG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIGRlc2NyaXB0aW9uIDogXCJDcm9wIE1hbmFnZW1lbnQgUGFyYW1ldGVyc1wiLFxuICB2YWx1ZSA6IHtcbiAgICBpcnJpZ0ZyYWMgOiB7XG4gICAgICB2YWx1ZSA6IDEsXG4gICAgICB1bml0cyA6IFwiXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiSXJyaWdhdGlvbiBmcmFjdGlvbjogMSA9IGZ1bGx5IGlycmlnYXRlZCwgMCA9IG5vIGlycmlnYXRpb24uIEFueSB2YWx1ZXMgYmV0d2VlbiAwIGFuZCAxIGFyZSBhY2NlcHRhYmxlXCJcbiAgICB9LFxuICAgIGZlcnRpbGl0eSA6IHtcbiAgICAgIHZhbHVlIDogMC43LFxuICAgICAgdW5pdHMgOiBcIlwiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIlNvaWwgZmVydGlsaXR5XCJcbiAgICB9LFxuICAgIGRhdGVQbGFudGVkIDoge1xuICAgICAgICB2YWx1ZSA6IFwiX2RhdGVfXCIsXG4gICAgICAgIHVuaXRzIDogXCJkYXRlXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uIDogXCJEYXRlIHRoZSBjcm9wIHdhcyBwbGFudGVkXCJcbiAgICB9LFxuICAgIGRhdGVDb3BwaWNlZCA6IHtcbiAgICAgICAgcmVxdWlyZWQgOiBmYWxzZSxcbiAgICAgICAgdmFsdWUgOiBcIl9kYXRlX1wiLFxuICAgICAgICB1bml0cyA6IFwiZGF0ZVwiLFxuICAgICAgICBkZXNjcmlwdGlvbiA6IFwiRGF0ZSBvZiB0aGUgZmlyc3QgY29wcGljZVwiXG4gICAgfSxcbiAgICBjb3BwaWNlSW50ZXJ2YWwgOiB7XG4gICAgICAgIHJlcXVpcmVkIDogZmFsc2UsXG4gICAgICAgIHZhbHVlIDogMyxcbiAgICAgICAgdW5pdHMgOiBcIlllYXJzXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uIDogXCJIb3cgYWZ0ZXIgdGhlIGNyb3AgaXMgY29wcGljZWQgYWZ0ZXIgdGhlIGZpcnN0IGNvcHBpY2VcIlxuICAgIH0sXG4gICAgY29wcGljZURhdGVzIDoge1xuICAgICAgICByZXF1aXJlZCA6IGZhbHNlLFxuICAgICAgICB2YWx1ZSA6IFwiXCIsXG4gICAgICAgIHVuaXRzIDogXCJkYXRlXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uIDogXCJIb3cgYWZ0ZXIgdGhlIGNyb3AgaXMgY29wcGljZWQgYWZ0ZXIgdGhlIGZpcnN0IGNvcHBpY2VcIlxuICAgIH0sXG4gICAgZGF0ZUZpbmFsSGFydmVzdCA6IHtcbiAgICAgICAgcmVxdWlyZWQgOiBmYWxzZSxcbiAgICAgICAgdmFsdWUgOiBcIl9kYXRlX1wiLFxuICAgICAgICB1bml0cyA6IFwiZGF0ZVwiLFxuICAgICAgICBkZXNjcmlwdGlvbiA6IFwiRGF0ZSB3aGVuIHRoZSBjcm9wIGlzIGNvbXBsZXRlbHkgaGFydmVzdGVkXCJcbiAgICB9XG4gIH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBkZXNjcmlwdGlvbjogXCJHcmVlbndvb2QgUEcgVmFsdWVzIChkZWZhdWx0KVwiLFxuICAgIHZhbHVlOiB7XG4gICAgICAgIHR5cGU6IHtcbiAgICAgICAgICAgIHZhbHVlOiBcIlwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiXCIsXG4gICAgICAgICAgICByZXF1aXJlZCA6IGZhbHNlXG4gICAgICAgIH0sXG4gICAgICAgIFN0b2NraW5nRGVuc2l0eToge1xuICAgICAgICAgICAgdmFsdWU6IDM1ODcsXG4gICAgICAgICAgICB1bml0czogXCJUcmVlcy9oZWN0YXJcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIk51bWJlciBvZiB0cmVlcyBwbGFudGVkIHBlciBoZWN0YXJcIlxuICAgICAgICB9LFxuICAgICAgICBTZWVkbGluZ01hc3M6IHtcbiAgICAgICAgICAgIHZhbHVlOiAwLjAwMDQsXG4gICAgICAgICAgICB1bml0czogXCJrR1wiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiTWFzcyBvZiB0aGUgc2VlZGxpbmdcIlxuICAgICAgICB9LFxuICAgICAgICBwUzoge1xuICAgICAgICAgICAgdmFsdWU6IDAuMSxcbiAgICAgICAgICAgIHVuaXRzOiBcInVuaXRsZXNzXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJQcm9wb3J0aW9uIG9mIHNlZWRsaW5nIG1hc3MgZ29pbmcgaW50byBzdGVtXCJcbiAgICAgICAgfSxcbiAgICAgICAgcEY6IHtcbiAgICAgICAgICAgIHZhbHVlOiAwLFxuICAgICAgICAgICAgdW5pdHM6IFwidW5pdGxlc3NcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlByb3BvcnRpb24gb2Ygc2VlZGxpbmcgbWFzcyBnb2luZyBpbnRvIGZvbGlhZ2VcIlxuICAgICAgICB9LFxuICAgICAgICBwUjoge1xuICAgICAgICAgICAgdmFsdWU6IDAuOSxcbiAgICAgICAgICAgIHVuaXRzOiBcInVuaXRsZXNzXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJQcm9wb3J0aW9uIG9mIHNlZWRsaW5nIG1hc3MgZ29pbmcgaW50byByb290XCJcbiAgICAgICAgfVxuICAgIH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBkZXNjcmlwdGlvbjogXCJQbGFudGF0aW9uIHN0YXRlIGNsYXNzLCBjb250YWluaW5nIGFsbCBpbnRlbWVkaWF0ZSB2YWx1ZXMgYXQgZXZlcnkgdGltZXN0ZXAgb2YgdGhlIG1vZGVsXCIsXG4gICAgdmFsdWU6IHtcbiAgICAgICAgZmVlZHN0b2NrSGFydmVzdDoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwiXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJcIlxuICAgICAgICB9LFxuICAgICAgICBjb3BwaWNlQ291bnQ6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIlwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiXCJcbiAgICAgICAgfSxcbiAgICAgICAgY29wcGljZUFnZToge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwibW9udGhcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkFnZSBvZiB0cmVlIGF0IHRoZSB0aW1lIG9mIGNvcHBpY2VcIlxuICAgICAgICB9LFxuICAgICAgICBWUEQ6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOlwia1BBXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjpcIk1lYW4gdmFwb3IgcHJlc3N1cmUgZGVmaWNpdFwiXG4gICAgICAgIH0sXG4gICAgICAgIGZWUEQ6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzIDogXCJ1bml0bGVzc1wiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246XCJWYXBvciBQcmVzc3VyZSBEZWZpY2l0IE1vZGlmaWVyIChQb3BsYXIpXCJcbiAgICAgICAgfSxcbiAgICAgICAgZlQ6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOlwidW5pdGxlc3NcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOlwiVGVtcGVyYXR1cmUgbW9kaWZpZXJcIlxuICAgICAgICB9LFxuICAgICAgICBmRnJvc3Q6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzIDogXCJ1bml0bGVzc1wiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb24gOiBcIk51bWJlciBvZiBGcmVlemUgRGF5cyBNb2RpZmllclwiXG4gICAgICAgIH0sXG4gICAgICAgIGZOdXRyOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czpcInVuaXRsZXNzXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjpcIk51dHJpdGlvbmFsIEZyYWN0aW9uLCBtaWdodCBiZSBiYXNlZCBvbiBzb2lsIGFuZCBmZXJ0aWxpemVyIGF0IHNvbWUgcG9pbnRcIlxuICAgICAgICB9LFxuICAgICAgICBmU1c6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIlwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiU29pbCB3YXRlciBtb2RpZmllclwiXG4gICAgICAgIH0sXG4gICAgICAgIGZBZ2U6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIlwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiXCJcbiAgICAgICAgfSxcbiAgICAgICAgUEFSOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czpcIm1vbHNcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOlwiTW9udGhseSBQQVIgaW4gbW9scyAvIG1eMiBtb250aFwiXG4gICAgICAgIH0sXG4gICAgICAgIHhQUDoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwibWV0cmljIHRvbnMgRHJ5IE1hdHRlci9oYVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwibWF4aW11bSBwb3RlbnRpYWwgUHJpbWFyeSBQcm9kdWN0aW9uXCJcbiAgICAgICAgfSxcbiAgICAgICAgSW50Y3B0bjoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwidW5pdGxlc3NcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkNhbm9weSByYWluZmFsbCBpbnRlcmNlcHRpb25cIlxuICAgICAgICB9LFxuICAgICAgICBBU1c6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIm1tXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJBdmFpbGFibGUgc29pbCB3YXRlclwiXG4gICAgICAgIH0sXG4gICAgICAgIEN1bUlycmlnOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJtbVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQ3VtdWxhdGl2ZSBpcnJpZ2F0aW9uXCJcbiAgICAgICAgfSxcbiAgICAgICAgSXJyaWc6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIm1tL21vblwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiUmVxdWlyZWQgaXJyaWdhdGlvblwiXG4gICAgICAgIH0sXG4gICAgICAgIFN0YW5kQWdlOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJtb250aFwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQWdlIG9mIHRoZSB0cmVlXCJcbiAgICAgICAgfSxcbiAgICAgICAgTEFJOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkxlYWYgYXJlYSBpbmRleFwiXG4gICAgICAgIH0sXG4gICAgICAgIENhbkNvbmQ6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIlwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQ2Fub3B5IGNvbmR1Y3RhbmNlXCJcbiAgICAgICAgfSxcbiAgICAgICAgVHJhbnNwOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJtbS9tb25cIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkNhbm9weSBtb250aGx5IHRyYW5zcGlyYXRpb25cIlxuICAgICAgICB9LFxuICAgICAgICBQaHlzTW9kOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJ1bml0bGVzc1wiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiUGh5c2lvbG9naWNhbCBNb2RpZmllciB0byBjb25kdWN0YW5jZSBhbmQgQVBBUnVcIlxuICAgICAgICB9LFxuICAgICAgICBwZnM6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIlwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiUmF0aW8gb2YgZm9saWFnZSB0byBzdGVtIHBhcnRpdGlvbmluZ1wiXG4gICAgICAgIH0sXG4gICAgICAgIHBSOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlwiXG4gICAgICAgIH0sXG4gICAgICAgIHBTOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlwiXG4gICAgICAgIH0sXG4gICAgICAgIHBGOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlwiXG4gICAgICAgIH0sXG4gICAgICAgIGxpdHRlcmZhbGw6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIlwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiXCJcbiAgICAgICAgfSxcbiAgICAgICAgTlBQOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJtZXRyaWMgdG9ucyBEcnkgTWF0dGVyL2hhXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJOZXQgUHJpbWFyeSBQcm9kdWN0aXZpdHlcIlxuICAgICAgICB9LFxuICAgICAgICBSb290UDoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwiXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJSb290IHByb2R1Y3Rpdml0eVwiXG4gICAgICAgIH0sXG4gICAgICAgIGRXOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlwiXG4gICAgICAgIH0sXG4gICAgICAgIFdGOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJiZHQvaGFcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkZvbGlhZ2UgeWllbGRcIlxuICAgICAgICB9LFxuICAgICAgICBXUjoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwiYmR0L2hhXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJSb290IHlpZWxkXCJcbiAgICAgICAgfSxcbiAgICAgICAgV1M6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcImJkdC9oYVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiU3RlbSB5aWVsZFwiXG4gICAgICAgIH0sXG4gICAgICAgIFc6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcImJkdC9oYVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiVG90YWwgeWllbGQ6IHJvb3QgKyBzdGVtICsgZm9saWFnZVwiXG4gICAgICAgIH1cbiAgICB9XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZGVzY3JpcHRpb246IFwiU29pbCBpbmZvcm1hdGlvbiBiYXNlZCBvbiBjdXJyZW50IGxvY2F0aW9uXCIsXG4gICAgdmFsdWU6IHtcbiAgICAgICAgbWF4QVdTOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIk1heGltdW0gYXZhaWxhYmxlIHNvaWwgd2F0ZXJcIlxuICAgICAgICB9LFxuICAgICAgICBzd3Bvd2VyOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcInBvd2VyIHBhcmFtZXRlciBiYXNlZCBvbiBjbGF5IGNvbnRlbnQgb2Ygc29pbFwiXG4gICAgICAgIH0sXG4gICAgICAgIHN3Y29uc3Q6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIlwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiY29uc3RhbnQgcGFyYW1ldGVyIGJhc2VkIG9uIGNsYXkgY29udGVudCBvZiBzb2lsXCJcbiAgICAgICAgfVxuICAgIH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICB1bml0czogXCJbZ2MgbS9zXT9cIixcbiAgICBkZXNjcmlwdGlvbjogXCJBbG9uZyB3aXRoIGEgUGh5c2lvbG9naWNhbCBtb2RpZmVyLCBzcGVjaWZpZXMgdGhlIGNhbm9weSBjb25kdWN0YW5jZS4gIFVzZWQgaW4gY2FsY3VsYXRpb24gb2YgdHJhbnNwaXJhdGlvblwiLFxuICAgIHZhbHVlOiB7XG4gICAgICAgIG1uOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJNaW5pbXVtIHZhbHVlLCB3aGVuIGxhaT0wXCIsXG4gICAgICAgICAgICB2YWx1ZTogMC4wMDAxXG4gICAgICAgIH0sXG4gICAgICAgIG14OiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJNYXhpbXVtIHZhbHVlXCIsXG4gICAgICAgICAgICB2YWx1ZTogMC4wMlxuICAgICAgICB9LFxuICAgICAgICBsYWk6IHtcbiAgICAgICAgICAgIHVuaXRzOiBcIlttXjIvbV4yXVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiTGVhZiBBcmVhIEluZGV4IHdoZXJlIHBhcmFtZXRlciByZWFjaGVzIGEgbWF4aW11bSB2YWx1ZS5cIixcbiAgICAgICAgICAgIHZhbHVlOiAyLjZcbiAgICAgICAgfVxuICAgIH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICB1bml0czogXCJmcmFjdGlvblwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIlNwZWNpZmllcyB0aGUgZ3Jvd3RoIGxpbWl0ZXIgYXMgYSBmdW5jdGlvbiBvZiB0aGUgdHJlZSBhZ2UuICBUaGlzIGlzIGEgdGltZSBkZXBlbmRhbmN5IHBhcmFtZXRlci4gIFRoZSBncmFwaCBvZiB0aGUgZnVuY3Rpb24gaXMgYXZhaWxhYmxlIGF0OiBodHRwczovL3d3dy5kZXNtb3MuY29tL2NhbGN1bGF0b3Ivd2EwcTJpaDE4aFwiLFxuICAgIHZhbHVlOiB7XG4gICAgICAgIGYwOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJWYWx1ZSBhdCBJbml0aWFsIFRpbWVcIixcbiAgICAgICAgICAgIHZhbHVlOiAxXG4gICAgICAgIH0sXG4gICAgICAgIGYxOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJWYWx1ZSBhdCBJbmZpbml0ZSBUaW1lXCIsXG4gICAgICAgICAgICB2YWx1ZTogMFxuICAgICAgICB9LFxuICAgICAgICB0bToge1xuICAgICAgICAgICAgdW5pdHM6IFwiW3ldXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJUaW1lIGluIHllYXJzIHdoZXJlIHZhbHVlIGlzIHRoZSBhdmVyYWdlIG9mIGYwIGFuZCBmMVwiLFxuICAgICAgICAgICAgdmFsdWU6IDQ3LjVcbiAgICAgICAgfSxcbiAgICAgICAgbjoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwibj49MTsgUGFyYW1ldGVyIHNwZWNpZmluZyB0aGUgcmF0ZSBvZiBjaGFuZ2UgYXJvdW5kIHRtLiAgbj0xIGlzIGFwcHJveGltYXRlbHkgYSBsaW5lYXIgY2hhbmdlLCBhcyBuIGluY3JlYXNlcywgY2hhbmdlIGJlY29tZXMgbW9yZSBsb2NhbGl6ZWQgYXJvdW5kIHRtLlwiLFxuICAgICAgICAgICAgdmFsdWU6IDMuNVxuICAgICAgICB9XG4gICAgfVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGRlc2NyaXB0aW9uOiBcIlNwZWNpZmllcyB0aGUgcGFyYW1ldGVycyBhZmZlY3RpbmcgdGVtcGVyYXR1cmUgbW9kaWZpZXIsIGZULiBBIGdyYXBoIG9mIGhvdyB0aGVzZSBwYXJhbWV0ZXJzIGFmZmVjdCB0aGUgdGVtcGVyYXR1cmUgbW9kaWZpZXIgaXMgZm91bmQgaGVyZTogaHR0cHM6Ly93d3cuZGVzbW9zLmNvbS9jYWxjdWxhdG9yLzY5aXdxdG5sMjhcIixcbiAgICB2YWx1ZToge1xuICAgICAgICBtbjoge1xuICAgICAgICAgICAgdW5pdHM6IFwiW0NdXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJTcGVjaWZpZXMgdGhlIG1pbmltdW0gdGVtcGVyYXR1cmUgb2YgcmVzcGlyYXRpb25cIixcbiAgICAgICAgICAgIHZhbHVlOiAwXG4gICAgICAgIH0sXG4gICAgICAgIG9wdDoge1xuICAgICAgICAgICAgdW5pdHM6IFwiW0NdXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJTcGVjaWZpZXMgdGhlIG9wdGltdW0gdGVtcGVyYXR1cmUgb2YgcmVzcGlyYXRpb25cIixcbiAgICAgICAgICAgIHZhbHVlOiAyMFxuICAgICAgICB9LFxuICAgICAgICBteDoge1xuICAgICAgICAgICAgdW5pdHM6IFwiW0NdXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJTcGVjaWZpZXMgdGhlIG1heGltdW0gdGVtcGVyYXR1cmUgb2YgcmVzcGlyYXRpb25cIixcbiAgICAgICAgICAgIHZhbHVlOiA1MFxuICAgICAgICB9XG4gICAgfVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGRlc2NyaXB0aW9uOiBcIlRoZXNlIHNwZWNpZnkgZ3Jvd3RoIHBhcmFtZXRlcnMgc3BlY2lmaWMgdG8gdGhlIHNwZWNpZXMgb2YgdHJlZS5cIixcbiAgICB2YWx1ZSA6IHtcbiAgICAgICAgazoge1xuICAgICAgICAgICAgdW5pdHM6IFwidW5pdGxlc3NcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlJhZGlhdGlvbiBFeHRpbmN0aW9uIENvZWZmaWNpZW50LlwiLFxuICAgICAgICAgICAgdmFsdWU6IDAuNVxuICAgICAgICB9LFxuICAgICAgICBmdWxsQ2FuQWdlOiB7XG4gICAgICAgICAgICB1bml0czogXCJbeV1cIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlllYXIgd2hlcmUgdHJlZSByZWFjaGVzIGZ1bGwgQ2Fub3B5IENvdmVyLlwiLFxuICAgICAgICAgICAgdmFsdWU6IDEuNVxuICAgICAgICB9LFxuICAgICAgICBrRzoge1xuICAgICAgICAgICAgdW5pdHM6IFwiW2tQQV4tMV1cIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkRldGVybWluZXMgdGhlIHJlc3BvbnNlIG9mIHRoZSBjYW5vcHkgY29uZHVjdGFuY2UgdG8gdGhlIHZhcG9yIHByZXNzdXJlIGRlZmljaXQuXCIsXG4gICAgICAgICAgICB2YWx1ZTogMC41XG4gICAgICAgIH0sXG4gICAgICAgIGFscGhhOiB7XG4gICAgICAgICAgICB1bml0czogXCJba2cvbW9sID9dXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJDYW5vcHkgcXVhbnR1bSBlZmZpY2llbmN5LlwiLFxuICAgICAgICAgICAgdmFsdWU6IDAuMDhcbiAgICAgICAgfSxcbiAgICAgICAgZlQgOiByZXF1aXJlKCcuL2Z0JyksXG4gICAgICAgIEJMY29uZDoge1xuICAgICAgICAgICAgdW5pdHM6IFwiW11cIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkNhbm9weSBib3VuZGFyeSBsYXllciBjb25kdWN0YW5jZS4gVXNlZCBpbiB0aGUgY2FsY3VhdGlvbiBvZiB0cmFuc3BpcmF0aW9uXCIsXG4gICAgICAgICAgICB2YWx1ZTogMC4wNFxuICAgICAgICB9LFxuICAgICAgICBmQWdlOiByZXF1aXJlKCcuL2ZhZ2UnKSxcbiAgICAgICAgZk4wOiB7XG4gICAgICAgICAgICB1bml0czogXCJmcmFjdGlvblwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiVXNlZCBpbiB0aGUgY2FsY3VsYXRpb24gb2YgdGhlIG51dHJpdGlvbmFsIG1vZGlmaWVyLGZOdXRyLiAgZk51dHIgcmFuZ2VzIGZyb20gW2ZOTywxKSBiYXNlZCBvbiB0aGUgZmVydGlsaXR5IGluZGV4IHdoaWNoIHJhbmdlcyBmcm9tIDAgdG8gMS4gIFdoZW4gZk4wPTEgaW5kaWNhdGVzIGZOdXRyIGlzIDFcIixcbiAgICAgICAgICAgIHZhbHVlOiAwLjI2XG4gICAgICAgIH0sXG4gICAgICAgIFNMQTogcmVxdWlyZSgnLi9zbGEnKSxcbiAgICAgICAgLy9DaGVja1VuaXRzQ2hhbmdldG9saW5lYXJGdW5jdGlvblxuICAgICAgICBDb25kdWN0YW5jZTogcmVxdWlyZSgnLi9jb25kdWN0YW5jZScpLFxuICAgICAgICBJbnRjcHRuOiByZXF1aXJlKCcuL2ludGNwdG4nKSxcbiAgICAgICAgeToge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQXNzaW1pbGF0aW9uIHVzZSBlZmZpY2llbmN5LiAgVXNlZCBpbiBjYWxjdWxhdGlvbiBvZiB0aGUgTlBQLlwiLFxuICAgICAgICAgICAgdmFsdWU6IDAuNDdcbiAgICAgICAgfSxcbiAgICAgICAgcGZzOiByZXF1aXJlKCcuL3BmcycpLFxuICAgICAgICBwUjogcmVxdWlyZSgnLi9wcicpLFxuICAgICAgICByb290UDogcmVxdWlyZSgnLi9yb290cCcpLFxuICAgICAgICBsaXR0ZXJmYWxsOiByZXF1aXJlKCcuL2xpdHRlcmZhbGwnKVxuICAgIH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICB1bml0czogXCJmcmFjdGlvblwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIlJhaW5mYWxsIGludGVyY2VwdGlvbiBmcmFjdGlvbi4gIEEgbGluZWFyIGZ1bmN0aW9uIHcuci50LiBMQUlcIixcbiAgICB2YWx1ZToge1xuICAgICAgICBtbjoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiTWluaW11bSB2YWx1ZSwgd2hlbiBsYWk9MFwiLFxuICAgICAgICAgICAgdmFsdWU6IDBcbiAgICAgICAgfSxcbiAgICAgICAgbXg6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIk1heGltdW0gdmFsdWVcIixcbiAgICAgICAgICAgIHZhbHVlOiAwLjI0XG4gICAgICAgIH0sXG4gICAgICAgIGxhaToge1xuICAgICAgICAgICAgdW5pdHM6IFwiW21eMi9tXjJdXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJMZWFmIEFyZWEgSW5kZXggd2hlcmUgcGFyYW1ldGVyIHJlYWNoZXMgYSBtYXhpbXVtIHZhbHVlLlwiLFxuICAgICAgICAgICAgdmFsdWU6IDcuM1xuICAgICAgICB9XG4gICAgfVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHVuaXRzOiBcImZyYWN0aW9uXCIsXG4gICAgZGVzY3JpcHRpb246IFwiU3BlY2lmaWVzIHRoZSBmcmFjdGlvbmFsIG1vbnRobHkgbG9zcyBvZiBmb2xpYWdlLiBUaGlzIGlzIGEgdGltZSBkZXBlbmRhbnkgcGFyYW1ldGVyLiAgVGhlIGdyYXBoIG9mIHRoZSBmdW5jdGlvbiBpcyBhdmFpbGFibGUgYXQ6IGh0dHBzOi8vd3d3LmRlc21vcy5jb20vY2FsY3VsYXRvci82aXE5cHBkcXM3XCIsXG4gICAgdmFsdWU6IHtcbiAgICAgICAgZjA6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlZhbHVlIGF0IEluaXRpYWwgVGltZVwiLFxuICAgICAgICAgICAgdmFsdWU6IDAuMDAxNVxuICAgICAgICB9LFxuICAgICAgICBmMToge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiVmFsdWUgYXQgSW5maW5pdGUgVGltZVwiLFxuICAgICAgICAgICAgdmFsdWU6IDAuMDNcbiAgICAgICAgfSxcbiAgICAgICAgdG06IHtcbiAgICAgICAgICAgIHVuaXRzOiBcIlt5XVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiVGltZSBpbiB5ZWFycyB3aGVyZSB2YWx1ZSBpcyB0aGUgYXZlcmFnZSBvZiBmMCBhbmQgZjFcIixcbiAgICAgICAgICAgIHZhbHVlOiAyXG4gICAgICAgIH0sXG4gICAgICAgIG46IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIm4+PTE7IFBhcmFtZXRlciBzcGVjaWZpbmcgdGhlIHJhdGUgb2YgY2hhbmdlIGFyb3VuZCB0bS4gIG49MSBpcyBhcHByb3hpbWF0ZWx5IGEgbGluZWFyIGNoYW5nZSwgYXMgbiBpbmNyZWFzZXMsIGNoYW5nZSBiZWNvbWVzIG1vcmUgbG9jYWxpemVkIGFyb3VuZCB0bS5cIixcbiAgICAgICAgICAgIHZhbHVlOiAyLjVcbiAgICAgICAgfVxuICAgIH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICB1bml0czogXCJmcmFjdGlvblwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIlRoaXMgZGVmaW5lcyB0aGUgZm9saWFnZSB0byBzdGVtIChXRi9XUykgZnJhY3Rpb24gaW4gYWxsb2NhdGluZyBhYm92ZWdyb3VuZCBiaW9tYXNzIG9mIHRoZSB0cmVlLiBUaGlzIGlzIGNhbGN1bGF0ZWQgd2l0aCBhIHBhaXIgb2YgYWxsb21ldHJpYyBwb3dlciBlcXVhdGlvbnMuICBUaGUgZmlyc3QgcmVsYXRlcyBiYXNhbCBkaWFtZXRlciwgKERPQikgdG8gdG90YWwgd29vZHkgYmlvbWFzcywgd2hpbGUgdGhlIHNlY29uZCByZWxhdGVzIERPQiB0byBwZnMuICBUaGUgcGFyYW1ldGVyaXphdGlvbiBvZiB0aGUgcmVsYXRpb25zaGlwIGJldHdlZW4gRE9CIGFuZCB3b29keSBiaW9tYXNzIGlzIGludmVydGVkIHRvIGRldGVybWluZSB0aGUgRE9CIGZyb20gdGhlIG1vZGVsZWQgd29vZHkgZnJhY3Rpb24uICBUaGlzIHJlbGF0aW9uIGlzIHBsb3R0ZWQgYXQ6IC4gIFRoZSBtb2RlbCBhbGxvY2F0ZXMgdGhlIGFwcHJvcHJpYXRlIGZyYWN0aW9uIG9mIHdvb2QgYmFzZWQgb24gdGhlIFN0b2NraW5nIGRlbnNpdHkgb2YgdGhlIHBsYW50YXRpb24uIERPQiByYXRoZXIgdGhhbiBEQkggaXMgdXNlZCBmb3IgY29tcGFyaXNvbiBvZiB0cmVlcyB3aXRoIGEgaGlnaCBzdGVtQ250IGFuZCByYXBpZCBjb3BwaWNpbmcgdmFsdWUuXCIsXG4gICAgdmFsdWU6IHtcbiAgICAgICAgc3RlbUNudDoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQXZlcmFnZSBudW1iZXIgb2Ygc3RlbXMgcGVyIHN0dW1wXCIsXG4gICAgICAgICAgICB2YWx1ZTogMi44XG4gICAgICAgIH0sXG4gICAgICAgIHN0ZW1DOiB7XG4gICAgICAgICAgICB1bml0czogXCJbY21eLTFdXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJDb25zdGFudCBpbiByZWxhdGlvbiBvZiBET0IgdG8gd29vZHkgYmlvbWFzc1wiLFxuICAgICAgICAgICAgdmFsdWU6IDAuMThcbiAgICAgICAgfSxcbiAgICAgICAgc3RlbVA6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlBvd2VyIGluIHJlbGF0aW9uIG9mIERPQiB0byB3b29keSBiaW9tYXNzLlwiLFxuICAgICAgICAgICAgdmFsdWU6IDIuNFxuICAgICAgICB9LFxuICAgICAgICBwZnNNeDoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiTWF4aW11bSBwb3NzaWJsZSBwZnMgdmFsdWUgYWxsb3dlZFwiLFxuICAgICAgICAgICAgdmFsdWU6IDJcbiAgICAgICAgfSxcbiAgICAgICAgcGZzUDoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiUG93ZXIgaW4gcmVsYXRpb24gb2YgREJPIHRvIHBmc1wiLFxuICAgICAgICAgICAgdmFsdWU6IC0wLjc3MlxuICAgICAgICB9LFxuICAgICAgICBwZnNDOiB7XG4gICAgICAgICAgICB1bml0czogXCJbY21eLTFdXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJDb25zdGFudCBpbiByZWxhdGlvbiBvZiBET0IgdG8gcGZzLlwiLFxuICAgICAgICAgICAgdmFsdWU6IDEuM1xuICAgICAgICB9XG4gICAgfVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHVuaXRzOiBcImZyYWN0aW9uXCIsXG4gICAgZGVzY3JpcHRpb246IFwiQWxvbmcgd2l0aCBhIFBoeXNpb2xvZ2lhbCBwYXJhbWV0ZXIsIHNwZWNpZmllcyB0aGUgYW1vdW50IG9mIG5ldyBncm93dGggYWxsb2NhdGVkIHRvIHRoZSByb290IHN5c3RlbSwgYW5kIHRoZSB0dXJub3ZlciByYXRlLlwiLFxuICAgIHZhbHVlOiB7XG4gICAgICAgIG1uOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJNaW5pbXVtIGFsbG9jYXRpb24gdG8gdGhlIHJvb3QsIHdoZW4gdGhlIHBoeXNpb2xvZ2FsIHBhcmFtZXRlciBpcyAxLlwiLFxuICAgICAgICAgICAgdmFsdWU6IDAuMTdcbiAgICAgICAgfSxcbiAgICAgICAgbXg6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIk1heGltdW0gYWxsb2NhdGlvbiB0byB0aGUgcm9vdCwgd2hlbiBtMC5cIixcbiAgICAgICAgICAgIHZhbHVlOiAwLjdcbiAgICAgICAgfSxcbiAgICAgICAgbTA6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkRlcGVuZGFuY2Ugb24gdGhlIGZlcnRpbGl0eSBpbmRleC4gMCBpbmRpY2F0ZXMgZnVsbCBkZXBlbmRhbmNlIG9uIGZlcnRpbGl0eSwgMSBpbmRpY2F0ZXMgYSBjb25zdGFudCBhbGxvY2F0aW9uLCBpbmRlcGVuZGFudCBvZiBmZXJ0aWxpdHlcIixcbiAgICAgICAgICAgIHZhbHVlOiAwLjVcbiAgICAgICAgfSxcbiAgICAgICAgdHVybm92ZXI6IHtcbiAgICAgICAgICAgIHVuaXRzOiBcIlttb250aF4tMV1cIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlNwZWNpZmllcyB0aGUgbW9udGhseSByb290IHR1cm5vdmVyIHJhdGUuXCIsXG4gICAgICAgICAgICB2YWx1ZTogMC4wMlxuICAgICAgICB9XG4gICAgfVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGRlc2NyaXB0aW9uOiBcIlRoZXNlIHBhcmFtZXRlcnMgc3BlY2lmeSByb290IGFsbG9jYXRpb24gdG8gZ3Jvd3RoIGFmdGVyIGNvcHBpY2luZy5cIixcbiAgICB2YWx1ZSA6IHtcbiAgICAgIGZyYWM6IHtcbiAgICAgICAgICB1bml0czogXCJbbW9udGheMV1cIixcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJTcGVjaWZpZXMgdGhlIGZyYWN0aW9uYWwgYW1vdW50IG9mIHJvb3QgYmlvbWFzcyB0aGF0IGV4Y2VlZHMgdGhlIGFib3ZlZ3JvdW5kIHJlcXVpcmVtZW50cyB0aGF0IGNhbiBiZSBzdXBwbGllZCBpbiBhIGdpdmVuIG1vbnRoLlwiLFxuICAgICAgICAgIHZhbHVlOiAwLjJcbiAgICAgIH0sXG4gICAgICBMQUlUYXJnZXQ6IHtcbiAgICAgICAgICB1bml0czogXCJbbV4yL21eMl1cIixcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJTcGVjaWZpZXMgYSB0YXJnZXQgTEFJIHJhdGUuICBUaGUgVGFyZ2V0IExBSSBpcyBpbmNsdWRlZCBpbiB0aGUgY2FsY3VsYXRpb24gb2YgYSB0YXJnZXQgTlBQLCBiYXNlZCBvbiB3ZWF0aGVyIHBhcmFtYXRlcnMuICBCZWxvdyB0aGlzIHRhcmdldCwgdGhlIHJvb3RzIHdpbGwgY29udHJpYnV0ZSBiaW9tYXNzIGlmIHRoZSBiZWxvdyBncm91bmQgcm9vdCBtYXNzIGV4Y2VlZHMgdGhlIHJlcXVpcmVtZW50cyBvZiB0aGUgYWJvdmVncm91bmQgYmlvbWFzcy4gVGhlIHRhcmdldCBpcyBzcGVjaWZpZWQgaW4gTEFJIHRvIHRpbWUgcm9vdCBjb250cmlidXRpb25zIHRvIHBlcmlvZHMgb2YgZ3Jvd3RoXCIsXG4gICAgICAgICAgdmFsdWU6IDEwXG4gICAgICB9LFxuICAgICAgZWZmaWNpZW5jeToge1xuICAgICAgICAgIHVuaXRzOiBcIltrZy9rZ11cIixcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJTcGVjaWZpZXMgdGhlIGVmZmljaWVuY3kgaW4gY29udmVydGluZyByb290IGJpb21hc3MgaW50byBhYm92ZWdyb3VuZCBiaW9tYXNzLlwiLFxuICAgICAgICAgIHZhbHVlOiAwLjdcbiAgICAgIH1cbiAgICB9XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgdW5pdHM6IFwiW21eMi9rZ11cIixcbiAgICBkZXNjcmlwdGlvbjogXCJTcGVjaWZpZXMgdGhlIFNwZWNpZmljIExlYWYgQXJlYSBhcyBhIGZ1bmN0aW9uIG9mIHRoZSB0cmVlIGFnZS4gIFRoaXMgaXMgYSB0aW1lIGRlcGVuZGFuY3kgcGFyYW1ldGVyLiAgVXNlZCBpbiB0aGUgY2FsY3VsYXRpb24gb2YgTEFJLiAgVGhlIGdyYXBoIG9mIHRoZSBmdW5jdGlvbiBpcyBhdmFpbGFibGUgYXQ6IGh0dHBzOi8vd3d3LmRlc21vcy5jb20vY2FsY3VsYXRvci93YTBxMmloMThoXCIsXG4gICAgdmFsdWU6IHtcbiAgICAgICAgZjA6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlZhbHVlIGF0IEluaXRpYWwgVGltZVwiLFxuICAgICAgICAgICAgdmFsdWU6IDE5XG4gICAgICAgIH0sXG4gICAgICAgIGYxOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJWYWx1ZSBhdCBJbmZpbml0ZSBUaW1lXCIsXG4gICAgICAgICAgICB2YWx1ZTogMTAuOFxuICAgICAgICB9LFxuICAgICAgICB0bToge1xuICAgICAgICAgICAgdW5pdHM6IFwiW3ldXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJUaW1lIGluIHllYXJzIHdoZXJlIHZhbHVlIGlzIHRoZSBhdmVyYWdlIG9mIGYwIGFuZCBmMVwiLFxuICAgICAgICAgICAgdmFsdWU6IDVcbiAgICAgICAgfSxcbiAgICAgICAgbjoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwibj49MTsgUGFyYW1ldGVyIHNwZWNpZmluZyB0aGUgcmF0ZSBvZiBjaGFuZ2UgYXJvdW5kIHRtLiAgbj0xIGlzIGFwcHJveGltYXRlbHkgYSBsaW5lYXIgY2hhbmdlLCBhcyBuIGluY3JlYXNlcywgY2hhbmdlIGJlY29tZXMgbW9yZSBsb2NhbGl6ZWQgYXJvdW5kIHRtLlwiLFxuICAgICAgICAgICAgdmFsdWU6IDJcbiAgICAgICAgfVxuICAgIH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBtb250aDoge1xuICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgIHVuaXRzOiBcInVuaXRsZXNzXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIlRoZSBtb250aCBudW1iZXIgc2luY2UgcGxhbnRpbmdcIlxuICAgIH0sXG4gICAgdG1pbjoge1xuICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgIHVuaXRzOiBcIkNlbGNpdXNcIixcbiAgICAgICAgZGVzY3JpcHRpb246IFwiTWluaW11bSB0ZW1wZXJhdHVyZSBmb3IgZ3Jvd3RoXCJcbiAgICB9LFxuICAgIHRtYXg6IHtcbiAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICB1bml0czogXCJDZWxjaXVzXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIk1heGltdW0gdGVtcGVyYXR1cmUgZm9yIGdyb3d0aFwiXG4gICAgfSxcbiAgICB0ZG1lYW46IHtcbiAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICB1bml0czogXCJDZWxjaXVzXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIkRldyBwb2ludCB0ZW1wZXJhdHVyZVwiXG4gICAgfSxcbiAgICBwcHQ6IHtcbiAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICB1bml0czogXCJcIixcbiAgICAgICAgZGVzY3JpcHRpb246IFwiUHJlY2lwaXRhdGlvblwiXG4gICAgfSxcbiAgICByYWQ6IHtcbiAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICB1bml0czogXCJcIixcbiAgICAgICAgZGVzY3JpcHRpb246IFwiU29sYXIgcmFkaWF0aW9uXCJcbiAgICB9LFxuICAgIG5yZWw6IHtcbiAgICAgICAgcmVxdWlyZWQgOiBmYWxzZSwgLy8gY2FsY3VhdGVkXG4gICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgdW5pdHM6IFwiXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIlwiXG4gICAgfSxcbiAgICBkYXlsaWdodDoge1xuICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgIHVuaXRzOiBcIlwiLFxuICAgICAgICBkZXNjcmlwdGlvbjogXCJcIlxuICAgIH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG4vKipcbkBtb2R1bGUgM1BHIE1vZHVsZVxuKiovXG5cblxuLyoqXG5DbGFzcyBmb3IgYWxsIHRoZSBmdW5jdGlvbnMgdGhhdCBydW4gaW4gYSBzaW5nbGUgc3RlcCBvZiB0aGUgbW9kZWxcblxuQGNsYXNzIG1vZHVsZS5leHBvcnRzXG4qKi9cblxuXG4vKipcbmxpc3Qgb2YgY29uc3RhbnRzIHVzZWQgZm9yIGNvbXB1dGF0aW9uc1xuXG5AYXR0cmlidXRlIGNvbnN0YW50XG4qKi9cbnZhciBjb25zdGFudHMgPSB7XG4gIGRheXNfcGVyX21vbnRoOntcbiAgICAgIHZhbHVlOjMwLjQsXG4gICAgICB1bml0czonZGF5cy9tbycsXG4gICAgICBkZXNjcmlwdGlvbjonTnVtYmVyIG9mIERheXMgaW4gYW4gYXZlcmFnZSBtb250aCdcbiAgfSxcbiAgZTIwOntcbiAgICAgIHZhbHVlOjIuMixcbiAgICAgIHVuaXRzOid2cC90JyxcbiAgICAgIGRlc2NyaXB0aW9uOidSYXRlIG9mIGNoYW5nZSBvZiBzYXR1cmF0ZWQgVlAgd2l0aCBUIGF0IDIwQydcbiAgfSxcbiAgcmhvQWlyOntcbiAgICAgIHZhbHVlOjEuMixcbiAgICAgIHVuaXRzOidrZy9tXjMnLFxuICAgICAgZGVzY3JpcHRpb246J0RlbnNpdHkgb2YgYWlyJ1xuICB9LFxuICBsYW1iZGE6e1xuICAgICAgdmFsdWU6MjQ2MDAwMCxcbiAgICAgIHVuaXRzOidKL2tnJyxcbiAgICAgIGRlc2NyaXB0aW9uOidMYXRlbnQgaGVhdCBvZiB2YXBvdXJpc2F0aW9uIG9mIGgybydcbiAgfSxcbiAgVlBEY29udjp7XG4gICAgICB2YWx1ZTowLjAwMDYyMixcbiAgICAgIHVuaXRzOic/JyxcbiAgICAgIGRlc2NyaXB0aW9uOidDb252ZXJ0IFZQRCB0byBzYXR1cmF0aW9uIGRlZmljaXQgPSAxOC8yOS8xMDAwJ1xuICB9LFxuICBRYTp7XG4gICAgICB2YWx1ZTotOTAsXG4gICAgICB1bml0czonVy9tXjInLFxuICAgICAgZGVzY3JpcHRpb246J0ludGVyY2VwdCBvZiBuZXQgcmFkaWF0aW9uIHZlcnN1cyBzb2xhciByYWRpYXRpb24gcmVsYXRpb25zaGlwJ1xuICB9LFxuICBRYjp7XG4gICAgICB2YWx1ZTowLjgsXG4gICAgICB1bml0czondW5pdGxlc3MnLFxuICAgICAgZGVzY3JpcHRpb246J3Nsb3BlIG9mIG5ldCB2cy4gc29sYXIgcmFkaWF0aW9uIHJlbGF0aW9uc2hpcCdcbiAgfSxcbiAgZ0RNX21vbDp7XG4gICAgICB2YWx1ZToyNCxcbiAgICAgIHVuaXRzOidnL21vbChDKScsXG4gICAgICBkZXNjcmlwdGlvbjonTW9sZWN1bGFyIHdlaWdodCBvZiBkcnkgbWF0dGVyJ1xuICB9LFxuICBtb2xQQVJfTUo6e1xuICAgICAgdmFsdWU6Mi4zLFxuICAgICAgdW5pdHM6J21vbChDKS9NSicsXG4gICAgICBkZXNjcmlwdGlvbjonQ29udmVyc2lvbiBvZiBzb2xhciByYWRpYXRpb24gdG8gUEFSJ1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cy5jb25zdGFudCA9IGNvbnN0YW50O1xuZnVuY3Rpb24gY29uc3RhbnQoYykge1xuICAgIHJldHVybiBjb25zdGFudHNbY10udmFsdWU7XG59XG5cbi8qKlxuVGltZSBEZXBlbmRhbnQgQXR0cmlidXRlLFxudW5pdHM9J3ZhcmlvdXMnLFxuZGVzY3JpcHRpb249J1RoaXMgZnVuY3Rpb24gY3JlYXRlcyBhIHRpbWUgZGVwZW5kYW50IGZ1bmN0aW9uIHRoYXQgZGVjYXlzXG4ob3IgcmlzZXMgZnJvbSBmMCB0byBmMS4gIFRoZSB2YWx1ZSAoZjArZjEpLzIgaXMgcmVhY2hlZCBhdCB0bSxcbmFuZCB0aGUgc2xvcGUgb2YgdGhlIGxpbmUgYXQgdG0gaXMgZ2l2ZW4gYnkgcC5cbkBtZXRob2QgdGRwXG5AcGFyYW0geFxuQHBhcmFtIGZcbioqL1xubW9kdWxlLmV4cG9ydHMudGRwID0gZnVuY3Rpb24oeCxmKSB7XG4gIHZhciBwPWYuZjEgKyAoZi5mMC1mLmYxKSpNYXRoLmV4cCgtTWF0aC5sb2coMikqTWF0aC5wb3coKHgvZi50bSksZi5uKSk7XG4gIHJldHVybiBwO1xufTtcblxuLyoqXG5AbWV0aG9kIGxpblxuQHBhcmFtIHhcbkBwYXJhbSBwXG4qL1xubW9kdWxlLmV4cG9ydHMubGluID0gZnVuY3Rpb24oeCwgcCl7XG4gIGlmKCB4IDwgMCApIHtcbiAgICByZXR1cm4gcC5tbjtcbiAgfVxuICBpZiggeCA+IHAueG1heCApIHtcbiAgICByZXR1cm4gcC54bWF4O1xuICB9XG4gIHJldHVybiBwLm1uICsgKHAubXgtcC5tbikqKHgvcC54bWF4KTtcbn07XG5cbi8qKlxudW5pdHM9J3VuaXRsZXNzJyxcbmRlc2NyaXB0aW9uPSdDYW5vcHkgUmFpbmZhbGwgaW50ZXJjZXB0aW9uJ1xuQG1ldGhvZCBJbnRjcHRuXG5AcGFyYW0gY3VyX0xBSVxuQHBhcmFtIGNcbiovXG5tb2R1bGUuZXhwb3J0cy5JbnRjcHRuID0gZnVuY3Rpb24oY3VyX0xBSSwgYyl7XG4gIHJldHVybiBNYXRoLm1heChjLm1uLGMubW4gKyAoYy5teCAtIGMubW4pICogTWF0aC5taW4oMSAsIGN1cl9MQUkgLyBjLmxhaSkpO1xufTtcblxuLyoqXG51bml0cz0nbW0nLFxuZGVzY3JpcHRpb249J0F2YWlsYWJsZSBTb2lsIFdhdGVyJ1xuQG1ldGhvZCBBU1dcbkBwYXJhbSBtYXhBU1dcbkBwYXJhbSBwcmV2X0FTV1xuQHBhcmFtIGRhdGVfcHB0XG5AcGFyYW0gY3VyX1RyYW5zcFxuQHBhcmFtIGN1cl9JbnRjcHRuXG5AcGFyYW0gY3VyX0lycmlnXG4qL1xubW9kdWxlLmV4cG9ydHMuQVNXID0gZnVuY3Rpb24obWF4QVNXLCBwcmV2X0FTVywgZGF0ZV9wcHQsIGN1cl9UcmFuc3AsIGN1cl9JbnRjcHRuLCBjdXJfSXJyaWcpe1xuICByZXR1cm4gTWF0aC5taW4obWF4QVNXKjEwLCBNYXRoLm1heChwcmV2X0FTVyArIGRhdGVfcHB0IC0gKGN1cl9UcmFuc3AgKyBjdXJfSW50Y3B0biAqIGRhdGVfcHB0KSArIGN1cl9JcnJpZywgMCkpO1xufTtcblxuLy9UT0RPOiBkb3VibGUgY2hlY2sgdGhlIGFwcHJvcHJpYXRlIHVzZSBvZiB0ZG1lYW4gKGRldyBwb2ludCB0ZW1wKVxuLy9UT0RPOiB0YWtlIGNvbnN0YW50cyBvdXRcbi8qKlxudW5pdHM9J2tQQScsXG5kZXNjcmlwdGlvbj0nTWVhbiB2YXBvciBwcmVzc3VyZSBkZWZpY2l0J1xuQG1ldGhvZCBWUERcbkBwYXJhbSBkYXRlX3RtaW5cbkBwYXJhbSBkYXRlX3RtYXhcbkBwYXJhbSBkYXRlX3RkbWVhblxuKi9cbm1vZHVsZS5leHBvcnRzLlZQRCA9IGZ1bmN0aW9uKGRhdGVfdG1pbiwgZGF0ZV90bWF4LCBkYXRlX3RkbWVhbil7XG4gIHJldHVybiAoMC42MTA4IC8gMiAqIChNYXRoLmV4cChkYXRlX3RtaW4gKiAxNy4yNyAvIChkYXRlX3RtaW4gKyAyMzcuMykgKSArIE1hdGguZXhwKGRhdGVfdG1heCAqIDE3LjI3IC8gKGRhdGVfdG1heCArIDIzNy4zKSApICkgKSAtICgwLjYxMDggKiBNYXRoLmV4cChkYXRlX3RkbWVhbiAqIDE3LjI3IC8gKGRhdGVfdGRtZWFuICsgMjM3LjMpICkgKTtcbn07XG5cblxuLyoqXG51bml0cyA9IHVuaXRsZXNzLFxuZGVzY3JpcHRpb249J1ZhcG9yIFByZXNzdXJlIERlZmljaXQgTW9kaWZpZXIgKFBvcGxhciknXG5AbWV0aG9kIGZWUERcbkBwYXJhbSBrR1xuQHBhcmFtIGN1cl9WUERcbiovXG5tb2R1bGUuZXhwb3J0cy5mVlBEID0gZnVuY3Rpb24oa0csIGN1cl9WUEQpe1xuICByZXR1cm4gTWF0aC5leHAoLTEgKiBrRyAqIGN1cl9WUEQpO1xufTtcblxuLy9UT0RPOiB0YWtlIGNvbnN0YW50cyBvdXRcbi8vIG1ha2UgYSBtZWFuaW5nZnVsIHRlbXB2YXIgbmFtZVxuLyoqXG51bml0cyA9IHVuaXRsZXNzLFxuZGVzY3JpcHRpb24gPSAnTnVtYmVyIG9mIEZyZWV6ZSBEYXlzIE1vZGlmaWVyJ1xuQG1ldGhvZCBmRnJvc3RcbkBwYXJhbSBkYXRlX3RtaW5cbiovXG5tb2R1bGUuZXhwb3J0cy5mRnJvc3QgPSBmdW5jdGlvbihkYXRlX3RtaW4pIHtcbiAgdmFyIHRlbXBWYXIgPSAtMS4wO1xuXG4gIGlmKCBkYXRlX3RtaW4gPj0gMCApe1xuICAgIHRlbXBWYXIgPSAxLjA7XG4gIH0gLy9lbHNlIC0xLjBcblxuICByZXR1cm4gMC41ICogKDEuMCArIHRlbXBWYXIgKiBNYXRoLnNxcnQoMSAtIE1hdGguZXhwKC0xICogTWF0aC5wb3coKDAuMTcgKiBkYXRlX3RtaW4pICwgMikgKiAoNCAvIDMuMTQxNTkgKyAwLjE0ICogTWF0aC5wb3coICgwLjE3ICogZGF0ZV90bWluKSAsIDIpICkgLyAoMSArIDAuMTQgKiBNYXRoLnBvdygoMC4xNyAqIGRhdGVfdG1pbikgLCAyKSApICkgKSApO1xufTtcblxuLy9UT0RPIC0gYmV0dGVyIG5hbWluZz86IHRtaW4sIHRtYXggPSB3ZWF0aGVyIFRvcHQsIFRtYXgsIFRtaW4gPSB0cmVlIHBhcmFtc1xuLyoqXG51bml0cz11bml0bGVzcyxcbmRlc2NyaXB0aW9uPSdUZW1wZXJhdHVyZSBtb2RpZmllcidcbkBtZXRob2QgZlRcbkBwYXJhbSB0YXZnXG5AcGFyYW0gZlRcbiovXG5tb2R1bGUuZXhwb3J0cy5mVCA9IGZ1bmN0aW9uKHRhdmcsIGZUKXtcbiAgdmFyIGY7XG4gIGlmKHRhdmcgPD0gZlQubW4gfHwgdGF2ZyA+PSBmVC5teCl7XG4gICAgZiA9IDA7XG4gIH0gZWxzZSB7XG4gICAgZiA9ICggKHRhdmcgLSBmVC5tbikgLyAoZlQub3B0IC0gZlQubW4pICkgICpcbiAgICAgICAgICAgTWF0aC5wb3cgKCAoIChmVC5teCAtIHRhdmcpIC8gKGZULm14IC0gZlQub3B0KSApLFxuICAgICAgICAgICAgICAgICAgICAgICggKGZULm14IC0gZlQub3B0KSAvIChmVC5vcHQgLSBmVC5tbikgKVxuICAgICAgICAgICAgICAgICAgICApO1xuICB9XG4gIHJldHVybihmKTtcbn07XG5cbi8qKlxudW5pdHM9J21tL21vbicsXG5kZXNjcmlwdGlvbj0nUmVxdWlyZWQgSXJyaWdhdGlvbidcbkBtZXRob2QgSXJyaWdcbkBwYXJhbSBpcnJpZ0ZyYWNcbkBwYXJhbSBjdXJfVHJhbnNwXG5AcGFyYW0gY3VyX0ludGNwdG5cbkBwYXJhbSBkYXRlX3BwdFxuKi9cbm1vZHVsZS5leHBvcnRzLklycmlnID0gZnVuY3Rpb24oaXJyaWdGcmFjLCBjdXJfVHJhbnNwLCBjdXJfSW50Y3B0biwgZGF0ZV9wcHQpe1xuICAgIHJldHVybiBNYXRoLm1heCgwLCBpcnJpZ0ZyYWMgKiAoY3VyX1RyYW5zcCAtICgxIC0gY3VyX0ludGNwdG4pICogZGF0ZV9wcHQpICk7XG59O1xuXG4vL1RPRE86IGdldCB1bml0cyBhbmQgZGVzY3JpcHRpb25cbi8qKlxuQG1ldGhvZCBmU1dcbkBwYXJhbSBBU1dcbkBwYXJhbSBtYXhBV1NcbkBwYXJhbSBzd2NvbnN0XG5AcGFyYW0gc3dwb3dlclxuKi9cbm1vZHVsZS5leHBvcnRzLmZTVyA9IGZ1bmN0aW9uKEFTVywgbWF4QVdTLCBzd2NvbnN0LCBzd3Bvd2VyKSB7XG4gIHZhciBmU1c7XG4gIGlmKCBzd2NvbnN0ID09PSAwIHx8IG1heEFXUyA9PT0gMCApIHtcbiAgICBmU1cgPSAwO1xuICB9IGVsc2Uge1xuICAgIHZhciBvbXIgPSAxIC0gKEFTVy8xMCkgLyBtYXhBV1M7IC8vIE9uZSBNaW51cyBSYXRpb1xuXG4gICAgaWYob21yIDwgMC4wMDEpIHtcbiAgICAgIGZTVyA9IDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZTVyA9ICgxLU1hdGgucG93KG9tcixzd3Bvd2VyKSkvKDErTWF0aC5wb3cob21yL3N3Y29uc3Qsc3dwb3dlcikpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZlNXO1xufTtcblxuLyoqXG51bml0cz0ndW5pdGxlc3MnLFxuZGVzY3JpcHRpb249J051dHJpdGlvbmFsIEZyYWN0aW9uLCBtaWdodCBiZSBiYXNlZCBvbiBzb2lsIGFuZCBmZXJ0aWxpemVyIGF0IHNvbWUgcG9pbnQnXG5AbWV0aG9kIGZOdXRyXG5AcGFyYW0gZk4wXG5AcGFyYW0gRlJcbiovXG5tb2R1bGUuZXhwb3J0cy5mTnV0ciA9IGZ1bmN0aW9uKGZOMCwgRlIpe1xuICByZXR1cm4gZk4wICsgKDEgLSBmTjApICogRlI7XG59O1xuXG4vKipcblRPRE86IHdoeSAkMyBpbiBtYWtlZmlsZSAtIGFzayBhYm91dCBpdFxudW5pdHM9dW5pdGxlc3NcbmRlc2NyaXB0aW9uPSdQaHlzaW9sb2dpY2FsIE1vZGlmaWVyIHRvIGNvbmR1Y3RhbmNlIGFuZCBBUEFSdSdcbkBtZXRob2QgUGh5c01vZFxuQHBhcmFtIGN1cl9mVlBEXG5AcGFyYW0gY3VyX2ZTV1xuQHBhcmFtIGN1cl9mQWdlXG4qL1xubW9kdWxlLmV4cG9ydHMuUGh5c01vZCA9IGZ1bmN0aW9uKGN1cl9mVlBELCBjdXJfZlNXLCBjdXJfZkFnZSl7XG4gICByZXR1cm4gTWF0aC5taW4oY3VyX2ZWUEQgLCBjdXJfZlNXKSAqIGN1cl9mQWdlO1xufTtcblxuLyoqXG51bml0cz0nZ2MsbS9zJyxcbmRlc2NyaXB0aW9uPSdDYW5vcHkgQ29uZHVjdGFuY2UnXG5AbWV0aG9kIENhbkNvbmRcbkBwYXJhbSBQaHlzTW9kXG5AcGFyYW0gTEFJXG5AcGFyYW0gY29uZFxuKi9cbm1vZHVsZS5leHBvcnRzLkNhbkNvbmQgPSBmdW5jdGlvbihQaHlzTW9kLCBMQUksIGNvbmQpe1xuICAgcmV0dXJuIE1hdGgubWF4KGNvbmQubW4gLCBjb25kLm14ICogUGh5c01vZCAqIE1hdGgubWluKDEgLCBMQUkgLyBjb25kLmxhaSkgKTtcbn07XG5cbi8qKlxudW5pdHM9J21tL21vbicgd2hpY2ggaXMgYWxzbyBrZy9tMi9tb25cbmRlc2NyaXB0aW9uPSdDYW5vcHkgTW9udGhseSBUcmFuc3BpcmF0aW9uJ1xuQG1ldGhvZCBUcmFuc3BcbkBwYXJhbSBkYXRlX25yZWxcbkBwYXJhbSBkYXRlX2RheWxpZ2h0XG5AcGFyYW0gY3VyX1ZQRFxuQHBhcmFtIEJMY29uZFxuQHBhcmFtIGN1cl9DYW5Db25kXG4qL1xubW9kdWxlLmV4cG9ydHMuVHJhbnNwID0gZnVuY3Rpb24oZGF0ZV9ucmVsLCBkYXRlX2RheWxpZ2h0LCBjdXJfVlBELCBCTGNvbmQsIGN1cl9DYW5Db25kKXtcbiAgdmFyIFZQRGNvbnYgPSBjb25zdGFudCgnVlBEY29udicpO1xuICB2YXIgbGFtYmRhID0gY29uc3RhbnQoJ2xhbWJkYScpO1xuICB2YXIgcmhvQWlyID0gY29uc3RhbnQoJ3Job0FpcicpO1xuICB2YXIgZTIwID0gY29uc3RhbnQoJ2UyMCcpO1xuICB2YXIgUWEgPSBjb25zdGFudCgnUWEnKTtcbiAgdmFyIFFiID0gY29uc3RhbnQoJ1FiJyk7XG5cbiAgLy8gZGF0ZV9kYXlsaWdodCA9IGhvdXJzXG4gIC8vIG5yZWwgaXMgaW4gTUovbV4yL2RheSBjb252ZXJ0IHRvIFdoL21eMi9kYXlcbiAgdmFyIG5ldFJhZCA9IFFhICsgUWIgKiAoKGRhdGVfbnJlbCAqIDI3Ny43NzgpIC8gZGF0ZV9kYXlsaWdodCk7XG4gIHZhciBkZWZUZXJtID0gcmhvQWlyICogbGFtYmRhICogVlBEY29udiAqIGN1cl9WUEQgKiBCTGNvbmQ7XG4gIHZhciBkaXYgPSAxICsgZTIwICsgQkxjb25kIC8gY3VyX0NhbkNvbmQ7XG5cbiAgLy8gQ29udmVydCBkYXlsaWdodCB0byBzZWNzLlxuICByZXR1cm4gY29uc3RhbnQoJ2RheXNfcGVyX21vbnRoJykgKiAoIChlMjAgKiBuZXRSYWQgKyBkZWZUZXJtICkgLyBkaXYgKSAqIGRhdGVfZGF5bGlnaHQgKiAzNjAwIC8gbGFtYmRhO1xufTtcblxuLy9UT0RPOiBkZXNjcmlwdGlvblxuLyoqXG51bml0cz0nbWV0cmljIHRvbnMgRHJ5IE1hdHRlci9oYScsXG5AbWV0aG9kIE5QUFxuQHBhcmFtIHByZXZfU3RhbmRBZ2VcbkBwYXJhbSBmdWxsQ2FuQWdlXG5AcGFyYW0geFBQXG5AcGFyYW0ga1xuQHBhcmFtIHByZXZfTEFJXG5AcGFyYW0gZlZQRFxuQHBhcmFtIGZTV1xuQHBhcmFtIGZBZ2VcbkBwYXJhbSBhbHBoYVxuQHBhcmFtIGZOdXRyXG5AcGFyYW0gZlRcbkBwYXJhbSBmRnJvc3RcbiovXG5tb2R1bGUuZXhwb3J0cy5OUFAgPSBmdW5jdGlvbihwcmV2X1N0YW5kQWdlLCBmdWxsQ2FuQWdlLCB4UFAsIGssIHByZXZfTEFJLCBmVlBELCBmU1csIGZBZ2UsIGFscGhhLCBmTnV0ciwgZlQsIGZGcm9zdCl7XG4gIHZhciBDYW5Db3ZlciA9IDE7XG4gIGlmKCBwcmV2X1N0YW5kQWdlIDwgZnVsbENhbkFnZSApe1xuICAgIENhbkNvdmVyID0gcHJldl9TdGFuZEFnZSAvIGZ1bGxDYW5BZ2U7XG4gIH1cblxuICByZXR1cm4geFBQICogKDEgLSAoTWF0aC5leHAoLWsgKiBwcmV2X0xBSSkgKSApICogQ2FuQ292ZXIgKiBNYXRoLm1pbihmVlBEICwgZlNXKSAqIGZBZ2UgKiBhbHBoYSAqIGZOdXRyICogZlQgKiBmRnJvc3Q7XG59O1xuXG4vL1RPRE86IHVuaXRzIGFuZCBkZXNjcmlwdGlvblxuLyoqXG5AbWV0aG9kIHBSXG5AcGFyYW0gY3VyX1BoeXNNb2RcbkBwYXJhbSBjdXJfcFJcbkBwYXJhbSBGUlxuQHBhcmFtIHBSXG4qL1xubW9kdWxlLmV4cG9ydHMucFIgPSBmdW5jdGlvbihjdXJfUGh5c01vZCwgY3VyX3BSLEZSLHBSKXtcbiAgdmFyIHAgPShwUi5teCAqIHBSLm1uKSAvXG4gICAgICAgICAocFIubW4gKyAocFIubXggLSBwUi5tbikgKiBjdXJfUGh5c01vZCAqIChwUi5tMCArICgxIC0gcFIubTApICogRlIpICk7XG5cbiAgLy8gVGhpcyB3YXMgYWRkZWQgYnkgcXVpbm4gdG8gbGltaXQgcm9vdCBncm93dGguXG4gIHJldHVybiBwICogTWF0aC5wb3cocC9jdXJfcFIsMik7XG59O1xuXG5cbi8vVE9ETzogbW9scyBvciBtb2xzIHBlciBtXjI/XG4vKipcbnVuaXRzPW1vbHNcbmRlc2NyaXB0aW9uPSdNb250aGx5IFBBUiBpbiBtb2xzIC8gbV4yIG1vbnRoJ1xubW9sUEFSX01KIFttb2wvTUpdIGlzIGEgY29uc3RhbnQgQ29udmVyc2lvbiBvZiBzb2xhciByYWRpYXRpb24gdG8gUEFSXG5AbWV0aG9kIFBBUlxuQHBhcmFtIGRhdGVfcmFkXG5AcGFyYW0gbW9sUEFSX01KXG4qL1xubW9kdWxlLmV4cG9ydHMuUEFSID0gZnVuY3Rpb24oZGF0ZV9yYWQsIG1vbFBBUl9NSikge1xuICBpZiggbW9sUEFSX01KID09PSBudWxsIHx8IG1vbFBBUl9NSiA9PT0gdW5kZWZpbmVkICkge1xuICAgIG1vbFBBUl9NSiA9IGNvbnN0YW50KCdtb2xQQVJfTUonKTtcbiAgfVxuXG4gIHJldHVybiBkYXRlX3JhZCAqIG1vbFBBUl9NSiAqIGNvbnN0YW50KCdkYXlzX3Blcl9tb250aCcpO1xufTtcblxuLyoqXG51bml0cz0nbWV0cmljIHRvbnMgRHJ5IE1hdHRlci9oYScsXG5kZXNjcmlwdGlvbj0nbWF4aW11bSBwb3RlbnRpYWwgUHJpbWFyeSBQcm9kdWN0aW9uIFt0RE0gLyBoYSBtb250aF0sXG5OT1RFOiAxMDAwMC8xMF42IFtoYS9tMl1bdERtL2dETV1cbmdHTV9tb2wgW2cvbW9sXSBpcyB0aGUgbW9sZWN1bGFyIHdlaWdodCBvZiBkcnkgbWF0dGVyXG5AbWV0aG9kIHhQUFxuQHBhcmFtIHlcbkBwYXJhbSBjdXJfUEFSXG5AcGFyYW0gZ0RNX21vbFxuKi9cbm1vZHVsZS5leHBvcnRzLnhQUCA9IGZ1bmN0aW9uKHksIGN1cl9QQVIsIGdETV9tb2wpe1xuICAgIGlmKCBnRE1fbW9sID09PSBudWxsIHx8IGdETV9tb2wgPT09IHVuZGVmaW5lZCApIHtcbiAgICAgIGdETV9tb2wgPSBjb25zdGFudCgnZ0RNX21vbCcpO1xuICAgIH1cblxuICAgIHJldHVybiB5ICogY3VyX1BBUiAqIGdETV9tb2wgLyAxMDA7XG59O1xuXG4vKioqIEZVTkNUSU9OUyBGT1IgQ09QUElDSU5HICovXG4vKipcbmNvcHBpY2UgcmVsYXRlZCBmdW5jdGlvbnNcbkBtZXRob2QgY29wcGljZVxuKi9cbm1vZHVsZS5leHBvcnRzLmNvcHBpY2UgPSB7XG4gIC8vIENvcHBpY2UgRnVuY3Rpb25zIGFyZSBiYXNlZCBvbiBEaWFtZXRlciBvbiBTdHVtcCwgTk9UIERCSC5cbiAgLy8gQ2FsY3VsYXRlcyB0aGUgcGZzIGJhc2VkIG9uIHRoZSBzdGVtIHdlaWdodCBpbiBLR1xuICBwZnMgOiBmdW5jdGlvbihzdGVtLCBwKSB7XG4gICAgdmFyIGF2RE9CID0gTWF0aC5wb3coICggc3RlbSAvIHAuc3RlbUNudCAvIHAuc3RlbUMpICwgKDEgLyBwLnN0ZW1QKSApO1xuICAgIHZhciBwcGZzPSBwLnBmc0MgKiBNYXRoLnBvdyhhdkRPQiAsIHAucGZzUCk7XG5cbiAgICByZXR1cm4gTWF0aC5taW4ocC5wZnNNeCxwcGZzKTtcbiAgfSxcblxuICAvLyBDYWxjdWxhdGVzIHRoZSBwZnMgYmFzZWQgb24gc3RlbSB3aXRoIGluIEcuICBVc2VzIHZvbHVtZSBJbmRleCBhcyBndWlkZVxuICBwZnNfdmlhX1ZJIDogZnVuY3Rpb24gKHN0ZW1HLCB3c1ZJLCBsYVZJLCBTTEEpIHtcbiAgICBpZiAoc3RlbUcgPCAxMCkge1xuICAgICAgc3RlbUcgPSAxMDtcbiAgICB9XG4gICAgdmFyIFZJID0gTWF0aC5wb3coIChzdGVtRyAvIHdzVkkuc3RlbXNfcGVyX3N0dW1wIC8gd3NWSS5jb25zdGFudCksKDEgLyB3c1ZJLnBvd2VyKSApO1xuXG4gICAgLy8gQWRkIHVwIGZvciBhbGwgc3RlbXNcbiAgICB2YXIgbGEgPSBsYVZJLmNvbnN0YW50ICogTWF0aC5wb3coVkksbGFWSS5wb3dlcikgKiB3c1ZJLnN0ZW1zX3Blcl9zdHVtcDtcbiAgICB2YXIgd2YgPSAxMDAwICogKGxhIC8gU0xBKTsgIC8vIEZvaWxhZ2UgV2VpZ2h0IGluIGc7XG4gICAgdmFyIHBmcyA9IHdmL3N0ZW1HO1xuICAgIHJldHVybiBwZnM7XG4gIH0sXG5cbiAgUm9vdFAgOiBmdW5jdGlvbihjdXJfbnBwLCBjdXJfbnBwVGFyZ2V0LCBXUixXLHBSeCxmcmFjKSB7XG4gICAgdmFyIG5wcFJlcyA9IGN1cl9ucHBUYXJnZXQgLSBjdXJfbnBwO1xuICAgIHZhciByb290UFA7XG4gICAgaWYoIG5wcFJlcyA+IDAgJiYgV1IvVyA+IHBSeCApIHtcbiAgICAgICAgcm9vdFBQID0gTWF0aC5taW4obnBwUmVzLCBXUiooV1IvVyAtIHBSeCkqZnJhYyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJvb3RQUCA9IDA7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJvb3RQUDtcbiAgfVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICByZWFkIDogZnVuY3Rpb24obW9kZWwpIHtcbiAgICAvLyBUT0RPIDogaW1wbGVtZW50XG4gICAgLy8gWW91IG5lZWQgdG8gc2V0IHlvdXIgSU8gaGVyZSBhbmQgbWFrZSBzdXJlIGFsbCBwYXJhbWV0ZXJzIGZvciBtb2RlbCBhcmUgY29ycmVjdGx5IHNldFxuICB9LFxuICBkdW1wIDogZnVuY3Rpb24oKSB7XG4gICAgLy8gVE9ETyA6IGltcGxlbWVudFxuICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZm4gPSByZXF1aXJlKCcuL2ZuJyk7XG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIgZGF0YU1vZGVsID0gcmVxdWlyZSgnLi9kYXRhTW9kZWwnKTtcbnZhciB2YWxpZGF0ZSA9IHJlcXVpcmUoJy4vdmFsaWRhdGUnKTtcblxuZnVuY3Rpb24gcnVuKGxlbmd0aE9mR3Jvd3RoKSB7XG5cbiAgICB2YXIgeWVhclRvQ29wcGljZTsgLy95ZWFyIG9mIHRoZSBmaXJzdCBvciBzdWJzZXF1ZW50IGhhcnZlc3RzXG4gICAgdmFyIGNvcHBpY2VJbnRlcnZhbDsgLy90aGUgIyBvZiBtb250aHMgaW4gYSBzaW5nbGUgY29wcGljZSBjeWNsZVxuICAgIHZhciBtb250aFRvQ29wcGljZTsgLy9hdCB3aGljaCBtb250aCB0aGUgaGFydmVzdCBpcyB0byBiZSBwZXJmb3JtZWQgOjogY3VycmVudGx5IHRoZSB0cmVlIHdpbGwgYmUgY3V0IGF0IHRoZSBiZWdpbm5pbmcgb2YgdGhhdCBtb250aFxuICAgIHZhciBjb3BwaWNlRGF0ZXM7XG5cbiAgICAvLyBoZWxwZXIsIG5vdCByZXF1aXJlZC4gIHlvdSBjYW4gcmVnaXN0ZXIgY2FsbGJhY2sgdG8gc2V0IHBhcmFtZXRlcnMgd2hlbmV2ZXIgcnVuIGlzIGNhbGxlZFxuICAgIHRoaXMuaW8ucmVhZCh0aGlzKTtcblxuICAgIC8vIG1ha2Ugc3VyZSBtb2RlbCBpbnB1dHMgYXJlIHZhbGlkIGJlZm9yZSB3ZSBwcm9jZWVkIGFueSBmdXJ0aGVyXG4gICAgdmFsaWRhdGUodGhpcyk7XG5cbiAgICB0aGlzLmN1cnJlbnREYXRlID0gdGhpcy5tYW5hZ2UuZGF0ZVBsYW50ZWQ7XG4gICAgLy92YXIgcGxhbnRlZE1vbnRoID0gdGhpcy5jdXJyZW50RGF0ZS5nZXRNb250aCgpO1xuICAgIC8vdmFyIGN1cnJlbnRNb250aCA9IHRoaXMuY3VycmVudERhdGUuZ2V0TW9udGgoKTtcblxuICAgIC8vVE9ETzogdGVzdCBubyBkYXRlY29wcGljZSBhcyBpbnB1dFxuICAgIGlmICggdGhpcy5tYW5hZ2UuZGF0ZUNvcHBpY2VkICE9PSB1bmRlZmluZWQgKXtcbiAgICAgIHllYXJUb0NvcHBpY2UgPSB0aGlzLm1hbmFnZS5kYXRlQ29wcGljZWQuZ2V0WWVhcigpO1xuICAgICAgbW9udGhUb0NvcHBpY2UgPSB0aGlzLm1hbmFnZS5kYXRlQ29wcGljZWQuZ2V0TW9udGgoKTtcbiAgICAgIGNvcHBpY2VJbnRlcnZhbCA9IHRoaXMubWFuYWdlLnllYXJzUGVyQ29wcGljZTtcbiAgICB9XG5cbiAgICBpZiggdGhpcy5tYW5hZ2UuY29wcGljZURhdGVzICE9PSB1bmRlZmluZWQgKSB7XG4gICAgICBjb3BwaWNlRGF0ZXMgPSBbXTtcblxuICAgICAgZm9yKCB2YXIgaSA9IDA7IGkgPCB0aGlzLm1hbmFnZS5jb3BwaWNlRGF0ZXMubGVuZ3RoOyBpKysgKSB7XG4gICAgICAgIHZhciBwYXJ0cyA9IHRoaXMubWFuYWdlLmNvcHBpY2VEYXRlc1tpXS5zcGxpdCgnLScpO1xuXG4gICAgICAgIHZhciBkID0gMTU7XG4gICAgICAgIGlmKCBwYXJ0cy5sZW5ndGggPiAyICkge1xuICAgICAgICAgIGQgPSBwYXJzZUludChwYXJ0c1syXSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb3BwaWNlRGF0ZXMucHVzaChuZXcgRGF0ZShwYXJzZUludChwYXJ0c1swXSksIHBhcnNlSW50KHBhcnRzWzFdKS0xLCBkKSk7XG4gICAgICB9XG4gICAgfVxuXG5cbiAgICAvLyBpbml0IG1hbmFnZSBuc1xuICAgIHRoaXMubWFuYWdlLmNvcHBpY2UgPSBmYWxzZTtcblxuICAgIGlmKCB0aGlzLmRlYnVnICkge1xuICAgICAgY29uc29sZS5sb2codGhpcy5jdXJyZW50RGF0ZSk7XG4gICAgfVxuXG4gICAgdmFyIHNldHVwID0ge1xuICAgICAgbGVuZ3RoT2ZHcm93dGggOiBsZW5ndGhPZkdyb3d0aCxcbiAgICAgIHllYXJUb0NvcHBpY2UgOiB5ZWFyVG9Db3BwaWNlLFxuICAgICAgbW9udGhUb0NvcHBpY2UgOiBtb250aFRvQ29wcGljZSxcbiAgICAgIGNvcHBpY2VJbnRlcnZhbCA6IGNvcHBpY2VJbnRlcnZhbCxcbiAgICAgIGNvcHBpY2VEYXRlcyA6IGNvcHBpY2VEYXRlcyxcbiAgICAgIGRhaWx5U3RlcCA6IHRoaXMuZGFpbHlTdGVwXG4gICAgfTtcblxuICAgIHJldHVybiB0aGlzLnJ1blNldHVwKHNldHVwKTtcbn1cblxuZnVuY3Rpb24gcnVuU2V0dXAoc2V0dXApe1xuICAgIHZhciBpLCBrZXksIGN1cnJlbnRXZWF0aGVyLCBzdGVwLCB0O1xuXG4gICAgaWYoIHRoaXMuZGVidWcgKSB7XG4gICAgICB0ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICBjb25zb2xlLmxvZygnRGFpbHlTdGVwOiAnK3NldHVwLmRhaWx5U3RlcCk7XG4gICAgfVxuXG4gICAgdmFyIG0gPSAodGhpcy5jdXJyZW50RGF0ZS5nZXRNb250aCgpKzEpKycnO1xuICAgIGlmKCBtLmxlbmd0aCA9PT0gMSApIHtcbiAgICAgIG0gPSAnMCcrbTtcbiAgICB9XG5cbiAgICB2YXIgZCA9ICh0aGlzLmN1cnJlbnREYXRlLmdldERhdGUoKSkrJyc7XG4gICAgaWYoIGQubGVuZ3RoID09PSAxICkge1xuICAgICAgZCA9ICcwJytkO1xuICAgIH1cblxuICAgIC8vdmFyIGN1cnJlbnRXZWF0aGVyID0gZ2V0V2VhdGhlcih0aGlzLCBzZXR1cCwgbSwgZCk7XG4gICAgdmFyIGZpcnN0U3RlcFJlc3VsdHMgPSBpbml0KHRoaXMucGxhbnRhdGlvbiwgdGhpcy5zb2lsKTtcblxuICAgIHZhciBrZXlzSW5PcmRlciA9IFtdO1xuICAgIHZhciBoZWFkZXIgPSBbJ2RhdGUnXTtcbiAgICBmb3IoIGtleSBpbiBkYXRhTW9kZWwucGxhbnRhdGlvbl9zdGF0ZS52YWx1ZSApIHtcbiAgICAgIGtleXNJbk9yZGVyLnB1c2goa2V5KTtcbiAgICAgIGhlYWRlci5wdXNoKGtleSk7XG4gICAgfVxuXG4gICAgZmlyc3RTdGVwUmVzdWx0cy5EYXRlID0gdGhpcy5jdXJyZW50RGF0ZS5nZXRGdWxsWWVhcigpKyctJyttO1xuICAgIGlmKCBzZXR1cC5kYWlseVN0ZXAgKSB7XG4gICAgICBmaXJzdFN0ZXBSZXN1bHRzLkRhdGUgKz0gJy0nK2Q7XG4gICAgfVxuXG4gICAgdmFyIHJvd3MgPSBbXTsgLy90aGVzZSB3aWxsIGJlY29tZSByb3dzXG4gICAgcm93cy5wdXNoKGhlYWRlcik7XG5cbiAgICB2YXIgZmlyc3RSb3cgPSBbZmlyc3RTdGVwUmVzdWx0cy5EYXRlXTtcbiAgICBmb3IoIGkgPSAwOyBpIDwga2V5c0luT3JkZXIubGVuZ3RoOyBpKyspe1xuICAgICAga2V5ID0ga2V5c0luT3JkZXJbaV07XG4gICAgICBmaXJzdFJvdy5wdXNoKGZpcnN0U3RlcFJlc3VsdHNba2V5XSk7XG4gICAgfVxuICAgIHJvd3MucHVzaChmaXJzdFJvdyk7XG5cbiAgICB2YXIgY3VycmVudFN0ZXBSZXN1bHRzID0gZmlyc3RTdGVwUmVzdWx0cztcbiAgICB2YXIgbmV4dFN0ZXBSZXN1bHRzO1xuXG4gICAgZm9yKHN0ZXAgPSAxOyBzdGVwIDwgc2V0dXAubGVuZ3RoT2ZHcm93dGg7IHN0ZXArKykge1xuICAgICAgaWYoIHNldHVwLmRhaWx5U3RlcCApIHtcbiAgICAgICAgdGhpcy5jdXJyZW50RGF0ZS5zZXREYXRlKHRoaXMuY3VycmVudERhdGUuZ2V0RGF0ZSgpICsgMSk7IC8vIGFkZCBhIGRheSB0byBjdXJyZW50IGRhdGVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY3VycmVudERhdGUuc2V0TW9udGgodGhpcy5jdXJyZW50RGF0ZS5nZXRNb250aCgpICsgMSk7IC8vIGFkZCBhIG1vbnRoIHRvIGN1cnJlbnQgZGF0ZVxuICAgICAgfVxuXG4gICAgICBpZiggc2hvdWxkQ29wcGljZSh0aGlzLCBzZXR1cCkgKSB7XG4gICAgICAgIGlmKCB0aGlzLmRlYnVnICkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdUaW1lIHRvIENvcHBpY2UhJyk7XG4gICAgICAgICAgY29uc29sZS5sb2codGhpcy5jdXJyZW50RGF0ZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm1hbmFnZS5jb3BwaWNlID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubWFuYWdlLmNvcHBpY2UgPSBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgbSA9ICh0aGlzLmN1cnJlbnREYXRlLmdldE1vbnRoKCkrMSkrJyc7XG4gICAgICBpZiggbS5sZW5ndGggPT09IDEgKSB7XG4gICAgICAgIG0gPSAnMCcrbTtcbiAgICAgIH1cblxuICAgICAgZCA9IHRoaXMuY3VycmVudERhdGUuZ2V0RGF0ZSgpKycnO1xuICAgICAgaWYoIGQubGVuZ3RoID09PSAxICkge1xuICAgICAgICBkID0gJzAnK2Q7XG4gICAgICB9XG5cbiAgICAgIGN1cnJlbnRXZWF0aGVyID0gZ2V0V2VhdGhlcih0aGlzLCBzZXR1cCwgbSwgZCk7XG5cbiAgICAgIC8vVE9ETzogc3dpdGNoIHVwIHRyZWVzIGhlcmUgd2hlbiBhZnRlciB0aGUgZmlyc3QgaGFydmVzdFxuICAgICAgbmV4dFN0ZXBSZXN1bHRzID0gc2luZ2xlU3RlcCh0aGlzLnBsYW50YXRpb24sIHRoaXMuc29pbCwgY3VycmVudFdlYXRoZXIsIHRoaXMubWFuYWdlLCBjdXJyZW50U3RlcFJlc3VsdHMsIHRoaXMuZGFpbHlTdGVwKTtcbiAgICAgIG5leHRTdGVwUmVzdWx0cy5EYXRlID0gdGhpcy5jdXJyZW50RGF0ZS5nZXRGdWxsWWVhcigpKyctJyttO1xuICAgICAgaWYoIHNldHVwLmRhaWx5U3RlcCApIHtcbiAgICAgICAgbmV4dFN0ZXBSZXN1bHRzLkRhdGUgKz0gJy0nK2Q7XG4gICAgICB9XG5cbiAgICAgIHZhciB0aGlzUm93ID0gW25leHRTdGVwUmVzdWx0cy5EYXRlXTtcbiAgICAgIGZvciggaSA9IDA7IGkgPCBrZXlzSW5PcmRlci5sZW5ndGg7IGkrKykge1xuICAgICAgICBrZXkgPSBrZXlzSW5PcmRlcltpXTtcbiAgICAgICAgdGhpc1Jvdy5wdXNoKG5leHRTdGVwUmVzdWx0c1trZXldKTtcbiAgICAgIH1cblxuICAgICAgY3VycmVudFN0ZXBSZXN1bHRzID0gbmV4dFN0ZXBSZXN1bHRzO1xuICAgICAgcm93cy5wdXNoKHRoaXNSb3cpO1xuICAgIH1cblxuICAgIHRoaXMuaW8uZHVtcChyb3dzKTtcblxuICAgIGlmKCB0aGlzLmRlYnVnICkge1xuICAgICAgY29uc29sZS5sb2coc3RlcCk7XG4gICAgICBjb25zb2xlLmxvZyh0aGlzLmN1cnJlbnREYXRlKTtcbiAgICAgIGNvbnNvbGUubG9nKChuZXcgRGF0ZSgpLmdldFRpbWUoKS10KSsnbXMnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcm93cztcbn1cblxuZnVuY3Rpb24gc2luZ2xlU3RlcChwbGFudGF0aW9uLCBzb2lsLCB3ZWF0aGVyLCBtYW5hZ2UsIHAsIGRhaWx5U3RlcCkgeyAvL3AgPSBwcmV2aW91cyBzdGF0ZVxuICB2YXIgYyA9IHt9OyAvL2N1cnJlbnQgc3RhdGVcblxuICBkYWlseVN0ZXAgPSBkYWlseVN0ZXAgPT09IHRydWUgPyB0cnVlIDogZmFsc2U7XG4gIHZhciBzdGVwRGl2aXNpb24gPSBkYWlseVN0ZXAgPyAzNjUgOiAxMjtcblxuICBpZiggbWFuYWdlLmNvcHBpY2UgPT09IHRydWUgKSB7IC8vY2hhbmdlIHRoaXMgZ3V5IGZvciB0aGUgbW9udGggd2hlbiBjb3BwaWNlXG4gICAgLy8gQWRkIGluIGEgc3R1bXAgbWFyZ2luLi4uLlxuICAgIGMuZmVlZHN0b2NrSGFydmVzdCA9IHAuZmVlZHN0b2NrSGFydmVzdCArIHAuV1M7XG4gICAgYy5jb3BwaWNlQ291bnQgPSBwLmNvcHBpY2VDb3VudCArIDE7XG4gICAgYy5jb3BwaWNlQWdlID0gMDtcbiAgICBwLkxBSSA9IDA7XG4gICAgcC5XUyA9IDA7XG4gICAgcC5XRiA9IDA7XG4gICAgcC5XID0gcC5XUjtcbiAgfSBlbHNlIHtcbiAgICBjLmZlZWRzdG9ja0hhcnZlc3QgPSBwLmZlZWRzdG9ja0hhcnZlc3Q7XG4gICAgYy5jb3BwaWNlQ291bnQgPSBwLmNvcHBpY2VDb3VudDtcbiAgICBjLmNvcHBpY2VBZ2UgPSBwLmNvcHBpY2VBZ2UgKyAxLjAvc3RlcERpdmlzaW9uO1xuICB9XG5cbiAgdmFyIHRyZWU7IC8vdHJlZVxuICBpZiggYy5jb3BwaWNlQ291bnQgPT09IDAgKSB7IC8vVE9ETzogY2hlY2sgdGhlIGNhc2Ugd2hlcmUgd2Ugc3RhcnQgd2l0aCBhIGNvcHBpY2VkIG11bHRpIHN0dW1wIHRyZWVcbiAgICAgIHRyZWUgPSBwbGFudGF0aW9uLnNlZWRsaW5nVHJlZTtcbiAgfSBlbHNlIHtcbiAgICAgIHRyZWUgPSBwbGFudGF0aW9uLmNvcHBpY2VkVHJlZTtcbiAgfVxuXG4gIGMuU3RhbmRBZ2UgPSBwLlN0YW5kQWdlICsgMS4wL3N0ZXBEaXZpc2lvbjtcbiAgdmFyIHNsYSA9IGZuLnRkcChwLlN0YW5kQWdlLCB0cmVlLlNMQSk7XG4gIGMuTEFJID0gcC5XRiAqIDAuMSAqIHNsYTsgLy8gTGFuZHNidXJnIGVxIDkuNVxuICBjLlZQRCA9IGZuLlZQRCh3ZWF0aGVyLnRtaW4sIHdlYXRoZXIudG1heCwgd2VhdGhlci50ZG1lYW4pO1xuICBjLmZWUEQgPSBmbi5mVlBEKHRyZWUua0csIGMuVlBEKTtcblxuICBjLmZTVyA9IGZuLmZTVyhwLkFTVywgc29pbC5tYXhBV1MsIHNvaWwuc3djb25zdCwgc29pbC5zd3Bvd2VyKTtcbiAgYy5mQWdlID0gZm4udGRwKHAuU3RhbmRBZ2UsIHRyZWUuZkFnZSk7XG5cbiAgYy5mRnJvc3QgPSBmbi5mRnJvc3Qod2VhdGhlci50bWluKTtcbiAgaWYoIGRhaWx5U3RlcCApIHtcbiAgLy8gSEFDSyBmb3Igbm93XG4gICAgYy5mRnJvc3QgPSAxO1xuICAvLyAgYy5mRnJvc3QgPSBjLmZGcm9zdCAvIGZuLmNvbnN0YW50KCdkYXlzX3Blcl9tb250aCcpO1xuICB9XG5cbiAgYy5QQVIgPSBmbi5QQVIod2VhdGhlci5yYWQpOyAvLyBNb250aGx5IFBBUiBpbiBtb2xzXG4gIGlmKCBkYWlseVN0ZXAgKSB7XG4gICAgYy5QQVIgPSBjLlBBUiAvIGZuLmNvbnN0YW50KCdkYXlzX3Blcl9tb250aCcpO1xuICB9XG5cbiAgYy5mVCA9IGZuLmZUKCh3ZWF0aGVyLnRtaW4gKyB3ZWF0aGVyLnRtYXgpLzIsIHRyZWUuZlQpO1xuXG4gIGMueFBQID0gZm4ueFBQKHRyZWUueSwgYy5QQVIpOyAvLyBtYXhpbXVtIHBvdGVudGlhbCBQcmltYXJ5IFByb2R1Y3Rpb24gcGVyIG1vbnRoXG4gIC8vaWYoIGRhaWx5U3RlcCApIHsgLy8gcGVyIGRheVxuICAvLyAgYy54UFAgPSBjLnhQUCAvIGZuLmNvbnN0YW50KCdkYXlzX3Blcl9tb250aCcpO1xuICAvL31cblxuXG4gIGMuUGh5c01vZCA9IGZuLlBoeXNNb2QoYy5mVlBELCBjLmZTVywgYy5mQWdlKTtcbiAgYy5mTnV0ciA9IGZuLmZOdXRyKHRyZWUuZk4wLCBtYW5hZ2UuZmVydGlsaXR5KTtcblxuICBjLk5QUCA9IGZuLk5QUChwLmNvcHBpY2VBZ2UsIHRyZWUuZnVsbENhbkFnZSwgYy54UFAsIHRyZWUuaywgcC5MQUksIGMuZlZQRCwgYy5mU1csIGMuZkFnZSwgdHJlZS5hbHBoYSwgYy5mTnV0ciwgYy5mVCwgYy5mRnJvc3QpO1xuICAvL2lmKCBkYWlseVN0ZXAgKSB7IC8vIHBlciBkYXlcbiAgLy8gIGMuTlBQID0gYy5OUFAgLyBmbi5jb25zdGFudCgnZGF5c19wZXJfbW9udGgnKTtcbiAgLy99XG5cbiAgdmFyIE5QUF90YXJnZXQgPSBmbi5OUFAodHJlZS5mdWxsQ2FuQWdlLCB0cmVlLmZ1bGxDYW5BZ2UsIGMueFBQLCB0cmVlLmssIHRyZWUucm9vdFAuTEFJVGFyZ2V0LCBjLmZWUEQsIGMuZlNXLCBjLmZBZ2UsIHRyZWUuYWxwaGEsIGMuZk51dHIsIGMuZlQsIGMuZkZyb3N0KTtcbiAgYy5Sb290UCA9IGZuLmNvcHBpY2UuUm9vdFAoYy5OUFAsIE5QUF90YXJnZXQsIHAuV1IsIHAuVywgdHJlZS5wUi5teCwgdHJlZS5yb290UC5mcmFjKTtcblxuICBpZiAodHJlZS5sYVZJICYmIHRyZWUubGFWSS5jb25zdGFudCApIHsgLy8gVGVzdCBmb3IgdGhhdCBmdW5jdGlvblxuICAgIGMucGZzID0gZm4uY29wcGljZS5wZnNfdmlhX1ZJKHAuV1MqMTAwMDAwMC9wbGFudGF0aW9uLlN0b2NraW5nRGVuc2l0eSwgdHJlZS53c1ZJLHRyZWUubGFWSSxzbGEpO1xuICB9IGVsc2Uge1xuICAgIGMucGZzID0gZm4uY29wcGljZS5wZnMocC5XUyoxMDAwL3BsYW50YXRpb24uU3RvY2tpbmdEZW5zaXR5LCB0cmVlLnBmcyk7XG4gIH1cblxuICBjLmRXID0gYy5OUFAgKyB0cmVlLnJvb3RQLmVmZmljaWVuY3kgKiBjLlJvb3RQO1xuXG4gIGMuSW50Y3B0biA9IGZuLkludGNwdG4oYy5MQUksIHRyZWUuSW50Y3B0bik7XG4gIGMuQ2FuQ29uZCA9IGZuLkNhbkNvbmQoYy5QaHlzTW9kLCBjLkxBSSwgdHJlZS5Db25kdWN0YW5jZSk7XG5cbiAgYy5wUiA9IGZuLnBSKGMuUGh5c01vZCwgcC5XUi9wLlcsIG1hbmFnZS5mZXJ0aWxpdHksIHRyZWUucFIpO1xuICBjLmxpdHRlcmZhbGwgPSBmbi50ZHAocC5TdGFuZEFnZSwgdHJlZS5saXR0ZXJmYWxsKTtcblxuICBjLlRyYW5zcCA9IGZuLlRyYW5zcCh3ZWF0aGVyLnJhZCwgd2VhdGhlci5kYXlsaWdodCwgYy5WUEQsIHRyZWUuQkxjb25kLCBjLkNhbkNvbmQpO1xuICBpZiggZGFpbHlTdGVwICkge1xuICAgIGMuVHJhbnNwID0gYy5UcmFuc3AgLyBmbi5jb25zdGFudCgnZGF5c19wZXJfbW9udGgnKTtcbiAgfVxuXG4gIC8vIENhbGN1bGF0ZWQgZnJvbSBwZnNcbiAgYy5wUyA9ICgxIC0gYy5wUikgLyAoMSArIGMucGZzICk7XG4gIGMucEYgPSAoMSAtIGMucFIpIC8gKDEgKyAxL2MucGZzICk7XG5cbiAgYy5JcnJpZyA9IGZuLklycmlnKG1hbmFnZS5pcnJpZ0ZyYWMsIGMuVHJhbnNwLCBjLkludGNwdG4sIHdlYXRoZXIucHB0KTtcbiAgYy5DdW1JcnJpZyA9IHAuQ3VtSXJyaWcgKyBjLklycmlnO1xuXG4gIGMuQVNXID0gZm4uQVNXKHNvaWwubWF4QVdTLCBwLkFTVywgd2VhdGhlci5wcHQsIGMuVHJhbnNwLCBjLkludGNwdG4sIGMuSXJyaWcpOyAvL2ZvciBzb21lIHJlYXNvbiBzcGVsbGVkIG1heEFXU1xuXG4gIGMuV0YgPSBwLldGICsgYy5kVyAqIGMucEYgLSBjLmxpdHRlcmZhbGwgKiBwLldGO1xuICAvLyBJbmNsdWRlIGNvbnRyaWJ1dGlvbiBvZiBSb290UCAvLyBFcnJvciBpbiBvbGQgY29kZSAhXG4gIGMuV1IgPSBwLldSICsgYy5kVyAqIGMucFIgLSB0cmVlLnBSLnR1cm5vdmVyICogcC5XUiAtIGMuUm9vdFA7XG4gIGMuV1MgPSBwLldTICsgYy5kVyAqIGMucFM7XG4gIGMuVyA9IGMuV0YrYy5XUitjLldTO1xuXG4gIHJldHVybiBjO1xufVxuXG5mdW5jdGlvbiBpbml0KHBsYW50YXRpb24sIHNvaWwpIHtcbiAgdmFyIHAgPSB7fTtcbiAgdmFyIHRyZWUgPSBwbGFudGF0aW9uLnNlZWRsaW5nVHJlZTsgLy9UT0RPOiBkZWNpZGUgdGhlIGNhc2Ugd2hlcmUgd2Ugc3RhcnQgd2l0aCBhIGNvcHBpY2VkIHRyZWU/XG5cbiAgcC5mZWVkc3RvY2tIYXJ2ZXN0PTA7XG4gIHAuY29wcGljZUNvdW50PTA7XG4gIHAuY29wcGljZUFnZSA9IDA7XG5cbiAgcC5DdW1JcnJpZyA9IDA7XG4gIHAuZFcgPSAwO1xuICBwLlcgPSBwbGFudGF0aW9uLlN0b2NraW5nRGVuc2l0eSAqIHBsYW50YXRpb24uU2VlZGxpbmdNYXNzO1xuICBwLldGID0gcGxhbnRhdGlvbi5wRiAqIHAuVztcbiAgcC5XUyA9IHBsYW50YXRpb24ucFMgKiBwLlc7XG4gIHAuV1IgPSBwbGFudGF0aW9uLnBSICogcC5XO1xuICBwLkFTVyA9IDAuOCAqIDEwICogc29pbC5tYXhBV1M7IC8vIFRoZSAxMCBpcyBiZWNhdXNlIG1heEFXUyBpcyBpbiBjbSBhbmQgQVNXIGluIG1tICg/KSBXaHkgKD8pXG4gIHAuU3RhbmRBZ2UgPSAwO1xuXG4gIHRyZWUgPSBwbGFudGF0aW9uLnNlZWRsaW5nVHJlZTtcblxuICAvLyBzbGEgPSBTcGVjaWZpYyBMZWFmIEFyZWFcbiAgdmFyIHNsYSA9IGZuLnRkcChwLlN0YW5kQWdlLHRyZWUuU0xBKTtcblxuICBwLkxBSSA9IHAuV0YgKiAwLjEgKiBzbGE7IC8vIExhbmRzYnVyZyBlcSA5LjVcblxuICAvLyBUaGVzZSBhcmVuJ3QgdXNlZCBzbyBjYW4gYmUgc2V0IHRvIGFueXRoaW5nOyAgVGhleSBhcmUgc2V0IHRvIG1hdGNoIHRoZSBwb3N0Z3JlcyB0eXBlXG4gIHAuVlBEICAgICAgICA9IDA7XG4gIHAuZlZQRCAgICAgICA9IDA7XG4gIHAuZlQgICAgICAgICA9IDA7XG4gIHAuZkZyb3N0ICAgICA9IDA7XG4gIHAuZk51dHIgICAgICA9IDA7XG4gIHAuZlNXICAgICAgICA9IDA7XG4gIHAuZkFnZSAgICAgICA9IDA7XG4gIHAuUEFSICAgICAgICA9IDA7XG4gIHAueFBQICAgICAgICA9IDA7XG4gIHAuSW50Y3B0biAgICA9IDA7XG4gIHAuSXJyaWcgICAgICA9IDA7XG4gIHAuQ2FuQ29uZCAgICA9IDA7XG4gIHAuVHJhbnNwICAgICA9IDA7XG4gIHAuUGh5c01vZCAgICA9IDA7XG4gIHAucGZzICAgICAgICA9IDA7XG4gIHAucFIgICAgICAgICA9IDA7XG4gIHAucFMgICAgICAgICA9IDA7XG4gIHAucEYgICAgICAgICA9IDA7XG4gIHAubGl0dGVyZmFsbCA9IDA7XG4gIHAuTlBQICAgICAgICA9IDA7XG4gIHAuUm9vdFAgICAgICA9IDA7XG5cbiAgcmV0dXJuIHA7XG59XG5cbmZ1bmN0aW9uIGdldFdlYXRoZXIobW9kZWwsIHNldHVwLCBtb250aCwgZGF5KSB7XG5cbiAgaWYoIHNldHVwLmRhaWx5U3RlcCApIHtcbiAgICAvLyBhY3R1YWxcbiAgICBpZiggbW9kZWwud2VhdGhlclttb2RlbC5jdXJyZW50RGF0ZS5nZXRGdWxsWWVhcigpKyctJyttb250aCsnLScrZGF5XSAhPT0gdW5kZWZpbmVkICkge1xuICAgICAgcmV0dXJuIG1vZGVsLndlYXRoZXJbbW9kZWwuY3VycmVudERhdGUuZ2V0RnVsbFllYXIoKSsnLScrbW9udGgrJy0nK2RheV07XG4gICAgfVxuXG4gICAgLy8gbW9kZWxsZWQgZGFpbHlcbiAgICBpZiggbW9kZWwud2VhdGhlclttb250aCsnLScrZGF5XSAhPT0gdW5kZWZpbmVkICkge1xuICAgICAgcmV0dXJuIG1vZGVsLndlYXRoZXJbbW9udGgrJy0nK2RheV07XG4gICAgfVxuXG4gIH0gZWxzZSB7XG4gICAgLy8gYWN0dWFsXG4gICAgaWYoIG1vZGVsLndlYXRoZXJbbW9kZWwuY3VycmVudERhdGUuZ2V0RnVsbFllYXIoKSsnLScrbW9udGhdICE9PSB1bmRlZmluZWQgKSB7XG4gICAgICByZXR1cm4gbW9kZWwud2VhdGhlclttb2RlbC5jdXJyZW50RGF0ZS5nZXRGdWxsWWVhcigpKyctJyttb250aF07XG4gICAgfVxuICB9XG5cbiAgLy8gbW9kZWxsZWQgTW9udGhseVxuICBpZiggbW9kZWwud2VhdGhlclttb250aF0gIT09IHVuZGVmaW5lZCApIHtcbiAgICByZXR1cm4gbW9kZWwud2VhdGhlclttb250aF07XG4gIH1cblxuICB0aHJvdyAnUnVudGltZSBFcnJvcjogbm8gd2VhdGhlciBmb3VuZCBmb3IgbW9udGg6ICcrbW9udGg7XG59XG5cbmZ1bmN0aW9uIHNob3VsZENvcHBpY2UobW9kZWwsIHNldHVwKSB7XG4gIC8vIGRvIHdlIGhhdmUgc3BlY2lmaWMgY29wcGljZSBkYXRlcyBzZXQ/XG4gIGlmKCBzZXR1cC5jb3BwaWNlRGF0ZXMgKSB7XG4gICAgZm9yKCB2YXIgaSA9IDA7IGkgPCBzZXR1cC5jb3BwaWNlRGF0ZXMubGVuZ3RoOyBpKysgKSB7XG4gICAgICB2YXIgZCA9IHNldHVwLmNvcHBpY2VEYXRlc1tpXTtcblxuICAgICAgaWYoIHNldHVwLmRhaWx5U3RlcCApIHtcbiAgICAgICAgaWYoIGQuZ2V0WWVhcigpID09PSB0aGlzLmN1cnJlbnREYXRlLmdldFllYXIoKSAmJlxuICAgICAgICAgICAgZC5nZXRNb250aCgpID09PSB0aGlzLmN1cnJlbnREYXRlLmdldE1vbnRoKCkgJiZcbiAgICAgICAgICAgIGQuZ2V0RGF0ZSgpID09PSB0aGlzLmN1cnJlbnREYXRlLmdldERhdGUoKSApIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmKCBkLmdldFllYXIoKSA9PT0gdGhpcy5jdXJyZW50RGF0ZS5nZXRZZWFyKCkgJiZcbiAgICAgICAgICAgIGQuZ2V0TW9udGgoKSA9PT0gdGhpcy5jdXJyZW50RGF0ZS5nZXRNb250aCgpICkge1xuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgfVxuICB9IGVsc2Uge1xuXG4gICAgLy8gZG8gd2UgaGF2ZSBhbiBpbnRlcnZhbCBzZXQ/XG4gICAgLy8gVE9ETzogdGhpcyBjdXJyZW50bHkgb25seSB3b3JrcyBvbiAxc3Qgb2YgbW9udGhcbiAgICBpZiggbW9kZWwuY3VycmVudERhdGUuZ2V0WWVhcigpID09PSBzZXR1cC55ZWFyVG9Db3BwaWNlICYmXG4gICAgICBtb2RlbC5jdXJyZW50RGF0ZS5nZXRNb250aCgpID09PSBzZXR1cC5tb250aFRvQ29wcGljZSApe1xuXG4gICAgICBzZXR1cC55ZWFyVG9Db3BwaWNlID0gc2V0dXAueWVhclRvQ29wcGljZSArIHNldHVwLmNvcHBpY2VJbnRlcnZhbDsgLy9uZXh0IGNvcHBpY2UgeWVhclxuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gZ2V0RnVuY3Rpb24obmFtZSkge1xuICBpZiggZm5bbmFtZV0gKSB7XG4gICAgcmV0dXJuIGZuW25hbWVdO1xuICB9IGVsc2UgaWYoIGZuLmNvcHBpY2VbbmFtZV0gKSB7XG4gICAgcmV0dXJuIGZuLmNvcHBpY2VbbmFtZV07XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaW8pIHtcbiAgcmV0dXJuIHtcbiAgICBpbyA6IGlvLFxuICAgIHJ1biA6IHJ1bixcbiAgICBzaW5nbGVTdGVwIDogc2luZ2xlU3RlcCxcbiAgICBydW5TZXR1cCA6IHJ1blNldHVwLFxuICAgIGluaXQgOiBpbml0LFxuICAgIGdldEZ1bmN0aW9uIDogZ2V0RnVuY3Rpb24sXG4gICAgc2V0SU8gOiBmdW5jdGlvbihpbykge1xuICAgICAgdGhpcy5pbyA9IGlvO1xuICAgIH0sXG4gICAgZ2V0RGF0YU1vZGVsIDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gZGF0YU1vZGVsO1xuICAgIH1cbiAgfTtcbn07XG4iLCJmdW5jdGlvbiBlbnYoKSB7XG4gIGlmKCB0eXBlb2YgcGx2OCAhPT0gJ3VuZGVmaW5lZCcgKSByZXR1cm4gXCJwbHY4XCI7XG4gIGlmKCB0eXBlb2YgTG9nZ2VyICE9PSAndW5kZWZpbmVkJyApIHJldHVybiBcImFwcHNjcmlwdFwiO1xuICBpZiggdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHJldHVybiBcIm5vZGVcIjtcbn1cblxuZnVuY3Rpb24gbG9nKG1zZykge1xuICB2YXIgZSA9IGVudigpO1xuICBpZiggZSA9PSBcInBsdjhcIiApIHBsdjguZWxvZyhOT1RJQ0UsICdub3RpY2UnLCBtc2cpO1xuICBlbHNlIGlmKCBlID09IFwiYXBwc2NyaXB0XCIgKSBMb2dnZXIubG9nKG1zZyk7XG4gIGVsc2UgY29uc29sZS5sb2cobXNnKTtcbn1cblxuZnVuY3Rpb24gY2xvbmUob2JqKSB7XG4gIGlmIChudWxsID09IG9iaiB8fCBcIm9iamVjdFwiICE9IHR5cGVvZiBvYmopIHJldHVybiBvYmo7XG4gIHZhciBjb3B5ID0gb2JqLmNvbnN0cnVjdG9yKCk7XG4gIGZvciAodmFyIGF0dHIgaW4gb2JqKSB7XG4gICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShhdHRyKSkgY29weVthdHRyXSA9IG9ialthdHRyXTtcbiAgfVxuICByZXR1cm4gY29weTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGVudiA6IGVudixcbiAgbG9nIDogbG9nLFxuICBjbG9uZSA6IGNsb25lXG59XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qXG4gKiBWYWxpZGF0ZSBhIG1vZGVsIHJ1biBzZXR1cC4gIHRocm93IGVycm9yIGlzIGJhZG5lc3MuXG4gKi9cbnZhciBkYXRhTW9kZWwgPSByZXF1aXJlKCcuL2RhdGFNb2RlbCcpO1xudmFyIHBhcmFtRXJyb3IgPSAnVmFsaWRhdGlvbiBFcnJvcjogJztcblxudmFyIHZhbGlkV2VhdGhlcktleXMgPSBbXG4gIC9eXFxkXFxkXFxkXFxkLVxcZFxcZCQvLCAvLyBzcGVjaWZpYyB3ZWF0aGVyIFlZWVktTU0gZm9yIG1vbnRobHkgdGltZXN0ZXBcbiAgL15cXGRcXGQkLywgLy8gbW9kZWxsZWQgb3IgYXZlcmFnZSB3ZWF0aGVyIE1NIGZvciBtb250aGx5IHRpbWVzdGVwXG4gIC9eXFxkXFxkXFxkXFxkLVxcZFxcZC1cXGRcXGQkLywgLy8gc3BlY2lmaWMgd2VhdGhlciBZWVlZLU1NLUREIGZvciBkYWlseSB0aW1lc3RlcFxuICAvXlxcZFxcZC1cXGRcXGQkLyAvLyBtb2RlbGxlZCBvciBhdmVyYWdlIHdlYXRoZXIgTU0tREQgZm9yIGRhaWx5IHRpbWVzdGVwXG5dO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG1vZGVsKSB7XG4gIHZhbGlkYXRlUGxhbnRhdGlvbihtb2RlbCk7XG4gIHZhbGlkYXRlTWFuYWdlKG1vZGVsKTtcbiAgdmFsaWRhdGVXZWF0aGVyKG1vZGVsKTtcbiAgdmFsaWRhdGVTb2lsKG1vZGVsKTtcbn07XG5cbmZ1bmN0aW9uIHZhbGlkYXRlTWFuYWdlKG1vZGVsKSB7XG4gIGlmKCAhbW9kZWwubWFuYWdlICkge1xuICAgIHRocm93IHBhcmFtRXJyb3IrJ21hbmFnZSBpcyBub3QgZGVmaW5pZWQnO1xuICB9XG5cbiAgdmFsaWRhdGVNb2RlbChkYXRhTW9kZWwubWFuYWdlLCBtb2RlbC5tYW5hZ2UsICdtYW5hZ2UnKTtcblxuICBpZiggbW9kZWwubWFuYWdlLmNvcHBpY2VEYXRlcyApIHtcbiAgICBpZiggIUFycmF5LmlzQXJyYXkobW9kZWwubWFuYWdlLmNvcHBpY2VEYXRlcykgKSB7XG4gICAgICB0aHJvdyBwYXJhbUVycm9yKydtYW5hZ2UuY29wcGljZURhdGVzIHNob3VsZCBiZSBhbiBhcnJheSBvZiBkYXRlIHN0cmluZ3MuJztcbiAgICB9XG5cbiAgICBmb3IoIHZhciBpID0gMDsgaSA8IG1vZGVsLm1hbmFnZS5jb3BwaWNlRGF0ZXMubGVuZ3RoOyBpKysgKSB7XG4gICAgICBpZiggbW9kZWwubWFuYWdlLmNvcHBpY2VEYXRlc1tpXS5tYXRjaCgnXlxcZFxcZFxcZFxcZC1cXGRcXGQkJykgfHwgbW9kZWwubWFuYWdlLmNvcHBpY2VEYXRlc1tpXS5tYXRjaCgnXlxcZFxcZFxcZFxcZC1cXGRcXGQtXFxkXFxkJCcpICkge1xuICAgICAgICB0aHJvdyBwYXJhbUVycm9yKycgaW52YWxpZCBtYW5hZ2UuY29wcGljZURhdGVzIGZvcm1hdCAnK21vZGVsLm1hbmFnZS5jb3BwaWNlRGF0ZXNbaV0rJy4gc2hvdWxkIGJlIFlZWVktTU0gZm9ybWF0Lic7XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2Uge1xuXG4gICAgaWYoIG1vZGVsLm1hbmFnZS5kYXRlQ29wcGljZWQgPT09IHVuZGVmaW5lZCApIHtcbiAgICAgIHRocm93IHBhcmFtRXJyb3IrJyBtYW5hZ2UuZGF0ZUNvcHBpY2VkIHJlcXVpcmVkIGlmIG1hbmFnZS5jb3BwaWNlRGF0ZXMgbm90IHByb3ZpZGVkJztcbiAgICB9XG4gICAgaWYoIG1vZGVsLm1hbmFnZS55ZWFyc1BlckNvcHBpY2UgPT09IHVuZGVmaW5lZCApIHtcbiAgICAgIHRocm93IHBhcmFtRXJyb3IrJyBtYW5hZ2UueWVhcnNQZXJDb3BwaWNlIHJlcXVpcmVkIGlmIG1hbmFnZS5jb3BwaWNlRGF0ZXMgbm90IHByb3ZpZGVkJztcbiAgICB9XG5cbiAgfVxufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZVdlYXRoZXIobW9kZWwpIHtcbiAgaWYoICFtb2RlbC53ZWF0aGVyICkge1xuICAgIHRocm93IHBhcmFtRXJyb3IrJ05vIHdlYXRoZXIgZGVmaW5lZCc7XG4gIH1cblxuICBmb3IoIHZhciBrZXkgaW4gbW9kZWwud2VhdGhlciApIHtcbiAgICB2YXIgZm91bmQgPSBmYWxzZTtcbiAgICBmb3IoIHZhciBpID0gMDsgaSA8IHZhbGlkV2VhdGhlcktleXMubGVuZ3RoOyBpKysgKSB7XG4gICAgICBpZigga2V5Lm1hdGNoKHZhbGlkV2VhdGhlcktleXNbaV0pICkge1xuICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmKCAhZm91bmQgKSB7XG4gICAgICB0aHJvdyBwYXJhbUVycm9yKycgaW52YWxpZCB3ZWF0aGVyIGtleTogJytrZXk7XG4gICAgfVxuXG4gICAgdmFsaWRhdGVNb2RlbChkYXRhTW9kZWwud2VhdGhlciwgbW9kZWwud2VhdGhlcltrZXldLCAnd2VhdGhlcicpO1xuICB9XG59XG5cblxuZnVuY3Rpb24gdmFsaWRhdGVTb2lsKG1vZGVsKSB7XG4gIGlmKCAhbW9kZWwuc29pbCApIHtcbiAgICB0aHJvdyBwYXJhbUVycm9yKydzb2lsIGlzIG5vdCBkZWZpbmllZCc7XG4gIH1cblxuICB2YWxpZGF0ZU1vZGVsKGRhdGFNb2RlbC5zb2lsLCBtb2RlbC5zb2lsLCAnc29pbCcpO1xufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZVBsYW50YXRpb24obW9kZWwpIHtcbiAgaWYoICFtb2RlbC5wbGFudGF0aW9uICkge1xuICAgIHRocm93IHBhcmFtRXJyb3IrJ3BsYW50YXRpb24gaXMgbm90IGRlZmluaWVkJztcbiAgfVxuICB2YWxpZGF0ZU1vZGVsKGRhdGFNb2RlbC5wbGFudGF0aW9uLCBtb2RlbC5wbGFudGF0aW9uLCAncGxhbnRhdGlvbicpO1xuXG4gIGlmKCAhbW9kZWwucGxhbnRhdGlvbi5zZWVkbGluZ1RyZWUgKSB7XG4gICAgdGhyb3cgcGFyYW1FcnJvcisncGxhbnRhdGlvbi5zZWVkbGluZ1RyZWUgaXMgbm90IGRlZmluaWVkJztcbiAgfVxuICB2YWxpZGF0ZU1vZGVsKGRhdGFNb2RlbC50cmVlLCBtb2RlbC5wbGFudGF0aW9uLnNlZWRsaW5nVHJlZSwgJ3BsYW50YXRpb24uc2VlZGxpbmdUcmVlJyk7XG5cbiAgaWYoICFtb2RlbC5wbGFudGF0aW9uLmNvcHBpY2VkVHJlZSApIHtcbiAgICB0aHJvdyBwYXJhbUVycm9yKydwbGFudGF0aW9uLmNvcHBpY2VkVHJlZSBpcyBub3QgZGVmaW5pZWQnO1xuICB9XG4gIHZhbGlkYXRlTW9kZWwoZGF0YU1vZGVsLnRyZWUsIG1vZGVsLnBsYW50YXRpb24uY29wcGljZWRUcmVlLCAncGxhbnRhdGlvbi5jb3BwaWNlZFRyZWUnKTtcbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVNb2RlbChkYXRhTW9kZWwsIG1vZGVsLCBuYW1lKSB7XG4gIHZhciBrZXksIGl0ZW07XG5cbiAgZm9yKCBrZXkgaW4gZGF0YU1vZGVsLnZhbHVlICkge1xuICAgIGl0ZW0gPSBkYXRhTW9kZWwudmFsdWVba2V5XTtcbiAgICBpZiggaXRlbS5yZXF1aXJlZCA9PT0gZmFsc2UgKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiggbW9kZWxba2V5XSA9PT0gdW5kZWZpbmVkICkge1xuICAgICAgdGhyb3cgcGFyYW1FcnJvcituYW1lKycuJytrZXkrJyBpcyBtaXNzaW5nICcrXG4gICAgICAgICAgICAoaXRlbS5kZXNjcmlwdGlvbiA/ICcoJytpdGVtLmRlc2NyaXB0aW9uKycpJyA6ICcnKTtcbiAgICB9XG5cbiAgICBpZiggdHlwZW9mIGl0ZW0udmFsdWUgPT09ICdvYmplY3QnICkge1xuICAgICAgdmFsaWRhdGVNb2RlbChpdGVtLCBtb2RlbFtrZXldLCBuYW1lKycuJytrZXkpO1xuICAgIH1cbiAgfVxufVxuIiwidmFyIGdkcml2ZSA9IHJlcXVpcmUoJy4vZ2RyaXZlJyk7XG52YXIgY2hhcnRzO1xudmFyIGlucHV0Rm9ybTtcbnZhciBleHBvcnRlciA9IHJlcXVpcmUoJy4vZXhwb3J0Jyk7XG52YXIgb2ZmbGluZSA9IHJlcXVpcmUoJy4vb2ZmbGluZScpO1xuXG4vLyBpbXBvcnQgbW9kZWwgc3R1ZmZcbnZhciBtb2RlbCA9IHJlcXVpcmUoJy4uLy4uL3BvcGxhci0zcGctbW9kZWwnKTtcbnZhciBtb2RlbElPID0gcmVxdWlyZSgnLi9tb2RlbElPJyk7XG5tb2RlbC5zZXRJTyhtb2RlbElPKTtcblxudmFyIGRhaWx5ID0gZmFsc2U7XG5cbnZhciBydW5DYWxsYmFjayA9IG51bGw7XG52YXIgXzNwZ01vZGVsID0gbnVsbDtcblxudmFyIGlucHV0cyA9IHtcbiAgd2VhdGhlciA6IFtcIm1vbnRoXCIsXCJ0bWluXCIsXCJ0bWF4XCIsXCJ0ZG1lYW5cIixcInBwdFwiLFwicmFkXCIsXCJkYXlsaWdodFwiXVxufTtcbnZhciBvdXRwdXRzID0gW1wiVlBEXCIsXCJmVlBEXCIsXCJmVFwiLFwiZkZyb3N0XCIsXCJQQVJcIixcInhQUFwiLFwiSW50Y3B0blwiLFwiQVNXXCIsXCJDdW1JcnJpZ1wiLFxuICAgICAgICAgICBcIklycmlnXCIsXCJTdGFuZEFnZVwiLFwiTEFJXCIsXCJDYW5Db25kXCIsXCJUcmFuc3BcIixcImZTV1wiLFwiZkFnZVwiLFxuICAgICAgICAgICBcIlBoeXNNb2RcIixcInBSXCIsXCJwU1wiLFwibGl0dGVyZmFsbFwiLFwiTlBQXCIsXCJXRlwiLFwiV1JcIixcIldTXCIsXCJXXCJdO1xudmFyIGRlYnVnID0gZmFsc2U7XG52YXIgZGV2bW9kZSA9IGZhbHNlO1xuXG52YXIgd2VhdGhlckN1c3RvbUNoYXJ0ID0gbnVsbDtcblxuLy8gcm93IHJhdyBkYXRhIGRvZXMgYSBsb3Qgb2YgcHJvY2Vzc2luZyBvZiB0aGUgcmVzdWx0cyBhbmQgdGhlIGN1cnJlbnQgc3RhdGUgb2Ygd2hhdCdzXG4vLyBiZWluZyBkaXNwbGF5ZWQuICBHbyBhaGVhZCBhbiBzZXR1cCB0aGUgY3N2IGRhdGEgYXQgdGhpcyBwb2ludCwgdGhlbiBpZiB0aGUgdXNlclxuLy8gZGVjaWRlcyB0byBleHBvcnQsIHdlIGFyZSBhbGwgc2V0IHRvIHRvO1xudmFyIGNzdlJlc3VsdHMgPSBudWxsO1xuXG52YXIgZ2V0TW9kZWwgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIG1vZGVsO1xufVxuXG52YXIgZ2V0T3V0cHV0cyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gb3V0cHV0cztcbn1cblxuXG5cbnZhciBvdXRwdXREZWZpbml0aW9ucyA9IHJlcXVpcmUoJy4vb3V0cHV0RGVmaW5pdGlvbnMnKTtcblxuXG5mdW5jdGlvbiBxcyhrZXkpIHtcbiAga2V5ID0ga2V5LnJlcGxhY2UoL1sqKz9eJC5cXFtcXF17fSgpfFxcXFxcXC9dL2csIFwiXFxcXCQmXCIpO1xuICB2YXIgbWF0Y2ggPSBsb2NhdGlvbi5zZWFyY2gubWF0Y2gobmV3IFJlZ0V4cChcIls/Jl1cIiArIGtleSArIFwiPShbXiZdKykoJnwkKVwiKSk7XG4gIHJldHVybiBtYXRjaCAmJiBkZWNvZGVVUklDb21wb25lbnQobWF0Y2hbMV0ucmVwbGFjZSgvXFwrL2csIFwiIFwiKSk7XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgaW5wdXRGb3JtID0gcmVxdWlyZSgnLi9pbnB1dEZvcm0nKSh0aGlzKTtcbiAgY2hhcnRzID0gcmVxdWlyZSgnLi9jaGFydHMnKTtcbiAgY2hhcnRzLnNldEFwcCh0aGlzKTtcblxuICBtb2RlbElPLmFwcCA9IHRoaXM7XG4gIG1vZGVsSU8ubW9kZWwgPSBtb2RlbDtcbiAgbW9kZWxJTy5jaGFydHMgPSBjaGFydHM7XG4gIG1vZGVsSU8uaW5wdXRGb3JtID0gaW5wdXRGb3JtO1xuXG4gIC8vIGNoZWNrIGlmIGZsYXNoIGlzIGluc3RhbGxlZC4gIElmIG5vdCwgaGlkZSB0aGUgY2hhcnQgdHlwZSB0b2dnbGUuXG4gIHJlcXVpcmUoJy4vZmxhc2hibG9jay1kZXRlY3RvcicpKGZ1bmN0aW9uKHZhbCl7XG4gICAgICBpZiggdmFsID4gMCApICQoXCIjY2hhcnQtdHlwZS1idG4tZ3JvdXBcIikuaGlkZSgpO1xuICB9KTtcblxuICAvLyBzZXR1cCBleHBvcnQgbW9kYWxcbiAgZXhwb3J0ZXIuaW5pdCgpO1xuICAkKFwiI2V4cG9ydC1jc3ZcIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgIGV4cG9ydGVyLmV4cG9ydENzdihjc3ZSZXN1bHRzKTtcbiAgfSk7XG5cbiAgdmFyIGVsZSA9ICQoXCIjaW5wdXRzLWNvbnRlbnRcIik7XG4gIGlucHV0Rm9ybS5jcmVhdGUoZWxlKTtcblxuICAkKFwiI3J1bmJ0biwgI3J1bmJ0bi1zbVwiKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgIHJ1bk1vZGVsKCk7XG4gIH0pO1xuXG4gIC8vIGluaXRpYWxpemUgdGhlIGNoYXJ0c1xuICBjaGFydHMuaW5pdCgpO1xuXG4gIC8vIHNldCBkZWZhdWx0IGNvbmZpZ1xuICAkKFwiI2lucHV0LW1hbmFnZS1kYXRlUGxhbnRlZFwiKS52YWwobmV3IERhdGUoKS50b0lTT1N0cmluZygpLnJlcGxhY2UoL1QuKi8sJycpKTtcbiAgJChcIiNpbnB1dC1tYW5hZ2UtZGF0ZUNvcHBpY2VkXCIpLnZhbChuZXcgRGF0ZShuZXcgRGF0ZSgpLmdldFRpbWUoKSsoODY0MDAwMDAqMiozNjUpKS50b0lTT1N0cmluZygpLnJlcGxhY2UoL1QuKi8sJycpKTtcbiAgJChcIiNpbnB1dC1tYW5hZ2UtZGF0ZUZpbmFsSGFydmVzdFwiKS52YWwobmV3IERhdGUobmV3IERhdGUoKS5nZXRUaW1lKCkrKDg2NDAwMDAwKjEwKjM2NSkpLnRvSVNPU3RyaW5nKCkucmVwbGFjZSgvVC4qLywnJykpO1xuXG4gIC8vIHNldHVwIG5pY2Ugc2Nyb2xsaW5nXG4gICQoJy5hcHAtbmF2Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuICAgICAgICAgIHNjcm9sbFRvcDogJCh0aGlzLmhhc2gpLm9mZnNldCgpLnRvcC01NVxuICAgICAgIH0sIDcwMCk7XG4gfSk7XG5cbiAgJCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbigpe1xuICAgICAgY2hhcnRzLnJlc2l6ZSgpO1xuXG4gICAgICBpZiggd2VhdGhlckN1c3RvbUNoYXJ0ICkge1xuICAgICAgICAgIHdlYXRoZXJDdXN0b21DaGFydCA9IGNoYXJ0cy5jcmVhdGVXZWF0aGVyQ2hhcnQoJCgnI2N1c3RvbS13ZWF0aGVyLWNoYXJ0JylbMF0sIG1vZGVsLmN1c3RvbV93ZWF0aGVyKTtcbiAgICAgIH1cbiAgfSk7XG5cbiAgY2FsbGJhY2soKTtcbn1cblxuXG52YXIgcnVuQ29tcGxldGUgPSBmdW5jdGlvbihyb3dzKSB7XG4gIGlmICggcnVuQ2FsbGJhY2sgKSBydW5DYWxsYmFjayhyb3dzKTtcbiAgaWYoIGhpZGVJbml0TG9hZGluZyApIGhpZGVJbml0TG9hZGluZygpO1xuICBydW5DYWxsYmFjayA9IG51bGw7XG59O1xuXG52YXIgbW9udGhzVG9SdW4gPSBmdW5jdGlvbigpIHtcbiAgdmFyIGQxID0gJChcIiNpbnB1dC1tYW5hZ2UtZGF0ZVBsYW50ZWRcIikudmFsKCk7XG4gIGlmIChkMSAmJiBkMSAhPT0gXCJcIikge1xuICAgICAgZDEgPSBuZXcgRGF0ZSgkKFwiI2lucHV0LW1hbmFnZS1kYXRlUGxhbnRlZFwiKS52YWwoKSk7XG4gIH0gZWxzZSB7XG4gICAgICBkMSA9IG5ldyBEYXRlKCk7XG4gIH1cblxuICB2YXIgZDIgPSAkKFwiI2lucHV0LW1hbmFnZS1kYXRlRmluYWxIYXJ2ZXN0XCIpLnZhbCgpO1xuICBpZiAoZDIgJiYgZDIgIT09IFwiXCIpIHtcbiAgICAgIGQyID0gbmV3IERhdGUoJChcIiNpbnB1dC1tYW5hZ2UtZGF0ZUZpbmFsSGFydmVzdFwiKS52YWwoKSk7XG4gIH0gZWxzZSB7XG4gICAgICBkMiA9IG5ldyBEYXRlKCk7XG4gIH1cblxuICB2YXIgbW9udGhzO1xuICBtb250aHMgPSAoZDIuZ2V0RnVsbFllYXIoKSAtIGQxLmdldEZ1bGxZZWFyKCkpICogMTI7XG4gIG1vbnRocyAtPSBkMS5nZXRNb250aCgpICsgMTtcbiAgbW9udGhzICs9IGQyLmdldE1vbnRoKCk7XG4gIHJldHVybiBtb250aHMgPD0gMCA/IDEgOiBtb250aHMrMTtcbn1cblxuXG52YXIgcnVuTW9kZWwgPSBmdW5jdGlvbihpc1J0KSB7XG5cbiAgaWYgKCQoXCIjcnVuYnRuLCAjcnVuYnRuLXNtXCIpLmhhc0NsYXNzKFwiZGlzYWJsZWRcIikpIHJldHVybjtcbiAgJChcIiNydW5idG4sICNydW5idG4tc21cIikuYWRkQ2xhc3MoXCJkaXNhYmxlZFwiKS5odG1sKFwiUnVubmluZy4uLlwiKTtcblxuICBpZiggIWNoZWNrV2VhdGhlcigpICkgcmV0dXJuO1xuXG4gIC8vIGxldCBVSSBwcm9jZXNzIGZvciBhIHNlYyBiZWZvcmUgd2UgdGFuayBpdFxuICAvLyBUT0RPOiB0aGlzIHNob3VsZCBiZSBwcmVmb3JtZWQgdy8gYSB3ZWJ3b3JrZXJcbiAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgIGdhKCdzZW5kJywgJ2V2ZW50JywgJ3VpJywgJ2ludGVyYWN0aW9uJywgJ21vZGVsLXJ1bicsIDEpO1xuXG4gICAgICAvLyByZWFkIGV2ZXJ5dGhpbmcgc28gdGhlIHZhcmlhdGlvbnMgYXJlIHNldFxuICAgICAgbW9kZWwudmFyaWF0aW9ucyA9IHt9O1xuICAgICAgbW9kZWxJTy5yZWFkRnJvbUlucHV0cygpO1xuXG4gICAgICAvLyBtYWtlIHN1cmUgd2UgYXJlIG9ubHkgc2V0dGluZyAyIHZhcmlhdGlvbiBwYXJhbWV0ZXJzXG4gICAgICB2YXIgcGFyYW1zID0gW107XG4gICAgICBmb3IoIHZhciBrZXkgaW4gbW9kZWwudmFyaWF0aW9ucyApIHBhcmFtcy5wdXNoKGtleSk7XG4gICAgICBpZiggcGFyYW1zLmxlbmd0aCA+IDIgKSB7XG4gICAgICAgICAgYWxlcnQoXCJUaGVyZSBpcyBhIGxpbWl0IG9mIDIgdmFyaWF0aW9uIHBhcmFtZXRlcnMgcGVyIHJ1bi4gIEN1cnJlbnRseSB5b3UgYXJlIHZhcnlpbmcgXCIrXG4gICAgICAgICAgICAgICAgXCJ0aGUgZm9sbG93aW5nIHBhcmFtZXRlcnM6XFxuXFxuIC1cIitwYXJhbXMuam9pbihcIlxcbiAtXCIpKTtcbiAgICAgICAgICAkKFwiI3J1bmJ0biwgI3J1bmJ0bi1zbVwiKS5yZW1vdmVDbGFzcyhcImRpc2FibGVkXCIpLmh0bWwoXCI8aSBjbGFzcz0naWNvbi1wbGF5Jz48L2k+IFJ1blwiKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIGxldCB0aGUgd29ybGQga25vdyB3aGF0IHdlIGFyZSBkb2luZ1xuICAgICAgaWYoICFpc1J0ICkgZ2RyaXZlLnJ1bk1vZGVsUnQoKTtcblxuICAgICAgLy8gc2hvdyB3aGF0IHdlIGFyZSBkb2luZ1xuICAgICAgJChcIiN2YXJpYXRpb25BbmFseXNpc1N0YXR1c1wiKS5odG1sKFwiPGI+XCIrKHBhcmFtcy5sZW5ndGggPT0gMCA/IFwiTm9uZVwiIDogcGFyYW1zLmpvaW4oXCIsIFwiKSkrXCI8L2I+XCIpO1xuXG4gICAgICAvLyB3ZSBhcmUgb25seSBydW5uaW5nIG9uY2VcbiAgICAgIGlmICggcGFyYW1zLmxlbmd0aCA9PT0gMCApIHtcbiAgICAgICAgICBnYSgnc2VuZCcsICdldmVudCcsICd1aScsICdpbnRlcmFjdGlvbicsICdtb2RlbC1ydW4tc2luZ2xlUGFyYW0nLCAxKTtcblxuICAgICAgICAgIHJ1bkNhbGxiYWNrID0gZnVuY3Rpb24ocm93cykge1xuICAgICAgICAgICAgICBzaG93UmVzdWx0cyhyb3dzKTtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgbW9kZWwuZGFpbHlTdGVwID0gZGFpbHk7XG4gICAgICAgICAgdmFyIG1vbnRocyA9IG1vbnRoc1RvUnVuKCk7XG4gICAgICAgICAgaWYoIGRhaWx5ICkgbW9udGhzID0gbW9udGhzICogMzA7XG5cbiAgICAgICAgICBtb2RlbC5ydW4obW9udGhzKTtcblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBnYSgnc2VuZCcsICdldmVudCcsICd1aScsICdpbnRlcmFjdGlvbicsICdtb2RlbC1ydW4tdmFyaWF0aW9uJywgMSk7XG5cbiAgICAgICAgICAvLyBzZXQgdmFyaWF0aW9uIG9yZGVyXG4gICAgICAgICAgdmFyIHJ1bnMgPSBbXTtcbiAgICAgICAgICBmb3IoIHZhciBpID0gMDsgaSA8IG1vZGVsLnZhcmlhdGlvbnNbcGFyYW1zWzBdXS5sZW5ndGg7IGkrKyApIHtcbiAgICAgICAgICAgICAgdmFyIG9iaiA9IHtcbiAgICAgICAgICAgICAgICAgIGlucHV0cyA6IHt9LFxuICAgICAgICAgICAgICAgICAgb3V0cHV0IDogbnVsbFxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICBvYmouaW5wdXRzW3BhcmFtc1swXV0gPSBtb2RlbC52YXJpYXRpb25zW3BhcmFtc1swXV1baV07XG4gICAgICAgICAgICAgIGlmKCBwYXJhbXMubGVuZ3RoID4gMSApIHtcbiAgICAgICAgICAgICAgICAgIGZvciggdmFyIGogPSAwOyBqIDwgbW9kZWwudmFyaWF0aW9uc1twYXJhbXNbMV1dLmxlbmd0aDsgaisrICkge1xuICAgICAgICAgICAgICAgICAgICAgIHZhciB0ID0gJC5leHRlbmQodHJ1ZSwge30sIG9iaik7XG4gICAgICAgICAgICAgICAgICAgICAgdC5pbnB1dHNbcGFyYW1zWzFdXSA9IG1vZGVsLnZhcmlhdGlvbnNbcGFyYW1zWzFdXVtqXTtcbiAgICAgICAgICAgICAgICAgICAgICBydW5zLnB1c2godCk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBydW5zLnB1c2gob2JqKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHJ1blZhcmlhdGlvbigwLCBydW5zKTtcbiAgICAgIH1cbiAgfSwgMjUwKTtcbn1cblxudmFyIHJ1blZhcmlhdGlvbiA9IGZ1bmN0aW9uKGluZGV4LCBydW5zKSB7XG4gIC8vIHNldCBpbnB1dCB2YXJpYWJsZXMgZm9yIHJ1blxuICB2YXIgcnVuID0gcnVuc1tpbmRleF07XG4gIGZvciggdmFyIGtleSBpbiBydW4uaW5wdXRzICkge1xuICAgICAgJChcIiNpbnB1dC1cIitrZXkucmVwbGFjZSgvXFwuL2csICctJykpLnZhbChydW4uaW5wdXRzW2tleV0pO1xuICB9XG5cbiAgcnVuQ2FsbGJhY2sgPSBmdW5jdGlvbihkYXRhKSB7XG4gICAgICBydW5zW2luZGV4XS5vdXRwdXQgPSBkYXRhO1xuICAgICAgaW5kZXgrKztcblxuICAgICAgaWYgKHJ1bnMubGVuZ3RoID09IGluZGV4KSB7XG4gICAgICAgICAgLy8gcmVzZXQgdGhlIGNvbnN0YW50IHRvIHRoZSBmaXJzdCB2YWx1ZVxuICAgICAgICAgIGZvciggdmFyIGtleSBpbiBtb2RlbC52YXJpYXRpb25zICkge1xuICAgICAgICAgICAgICAkKFwiI2lucHV0LVwiK2tleS5yZXBsYWNlKC9cXC4vZywgJy0nKSkudmFsKG1vZGVsLnZhcmlhdGlvbnNba2V5XS5qb2luKFwiLCBcIikpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBzaG93UmVzdWx0cyhydW5zKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcnVuVmFyaWF0aW9uKGluZGV4LCBydW5zKTtcbiAgICAgIH1cbiAgfTtcblxuICB2YXIgbW9udGhzID0gbW9udGhzVG9SdW4oKTtcbiAgaWYoIGRhaWx5ICkgbW9udGhzID0gbW9udGhzICogMzA7XG5cbiAgbW9kZWwucnVuKG1vbnRocyk7XG59O1xuXG5cbnZhciBzaG93UmVzdWx0cyA9IGZ1bmN0aW9uKHJlc3VsdCkge1xuICB2YXIgY3VycmVudFJlc3VsdHM7XG4gIGlmKCByZXN1bHRbMF0gaW5zdGFuY2VvZiBBcnJheSApIHtcbiAgICAgIGN1cnJlbnRSZXN1bHRzID0gW3tcbiAgICAgICAgICBzaW5nbGVSdW4gOiB0cnVlLFxuICAgICAgICAgIGlucHV0cyA6IHt9LFxuICAgICAgICAgIG91dHB1dCA6IHJlc3VsdFxuICAgICAgfV1cbiAgfSBlbHNlIHtcbiAgICBjdXJyZW50UmVzdWx0cyA9IHJlc3VsdDtcbiAgfVxuXG5cbiAgc2hvd1Jhd091dHB1dChjdXJyZW50UmVzdWx0cyk7XG4gIGNoYXJ0cy51cGRhdGVDaGFydHMoY3VycmVudFJlc3VsdHMsIHRydWUpO1xuXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAkKFwiI3J1bmJ0biwgI3J1bmJ0bi1zbVwiKS5yZW1vdmVDbGFzcyhcImRpc2FibGVkXCIpLmh0bWwoXCI8aSBjbGFzcz0naWNvbi1wbGF5Jz48L2k+IFJ1blwiKTtcbiAgfSwgMjUwKTtcblxufVxuXG4vLyBtYWtlIHN1cmUgYWxsIHRoZSB3ZWF0aGVyIGlzIHNldC4gICMxIHRoaW5nIHBlb3BsZSB3aWxsIG1lc3MgdXBcbnZhciBjaGVja1dlYXRoZXIgPSBmdW5jdGlvbigpIHtcbiAgLy8gZmlyc3QgZ2V0IGN1cnJlbnQgbW9udGhzIHdlIGFyZSBnb2luZyB0byBydW4sXG4gIHZhciBzdGFydCA9ICQoXCIjaW5wdXQtbWFuYWdlLWRhdGVQbGFudGVkXCIpLnZhbCgpO1xuXG4gIHZhciBlbmQgPSAkKFwiI2lucHV0LW1hbmFnZS1kYXRlRmluYWxIYXJ2ZXN0XCIpLnZhbCgpLnNwbGl0KFwiLVwiKTtcbiAgdmFyIGVNb250aCA9IHBhcnNlSW50KGVuZFsxXSk7XG4gIHZhciBlWWVhciA9IHBhcnNlSW50KGVuZFswXSk7XG5cbiAgdmFyIGNEYXRlID0gbmV3IERhdGUoc3RhcnQpO1xuXG4gIC8vIG5vdyBzZWUgaWYgd2UgaGF2ZSBjdXN0b20gd2VhdGhlciBjb3ZlcmFnZVxuICB2YXIgaGFzQ292ZXJhZ2UgPSB0cnVlO1xuICB2YXIgY291bnQgPSAwO1xuICB3aGlsZSggY291bnQgPCAxMDAwMCApIHtcbiAgICAgIGlmKCAhbW9kZWwuY3VzdG9tX3dlYXRoZXIgKSB7XG4gICAgICAgICAgaGFzQ292ZXJhZ2UgPSBmYWxzZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgdmFyIG0gPSAoY0RhdGUuZ2V0TW9udGgoKSsxKSsnJztcbiAgICAgIHZhciB5ID0gY0RhdGUuZ2V0RnVsbFllYXIoKTtcbiAgICAgIGlmKCBtLmxlbmd0aCA9PSAxICkgbSA9ICcwJyttO1xuXG4gICAgICBpZiggY0RhdGUuZ2V0TW9udGgoKSsxID09IGVNb250aCAmJiB5ID09IGVZZWFyICkge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfSBlbHNlIGlmKCAhbW9kZWwuY3VzdG9tX3dlYXRoZXJbeSsnLScrbV0gKSB7XG4gICAgICAgICAgaGFzQ292ZXJhZ2UgPSBmYWxzZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgY0RhdGUuc2V0TW9udGgoY0RhdGUuZ2V0TW9udGgoKSsxKTtcbiAgICAgIGNvdW50Kys7XG4gIH1cblxuICBpZiggaGFzQ292ZXJhZ2UgKSByZXR1cm4gdHJ1ZTtcblxuICAvLyBpZiBub3QgbWFrZSBzdXJlIHdlIGhhdmUgYXZlcmFnZXMgc2VsZWN0ZWRcbiAgZm9yICggdmFyIGkgPSAwOyBpIDwgMTI7IGkrKykge1xuICAgIHZhciBtID0gKGkrMSkrJyc7XG4gICAgaWYoIG0ubGVuZ3RoID09IDEgKSBtID0gJzAnK207XG5cbiAgICAgIGZvciAoIHZhciBqID0gMTsgaiA8IGlucHV0cy53ZWF0aGVyLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgdmFyIGMgPSBpbnB1dHMud2VhdGhlcltqXTtcbiAgICAgICAgICB2YXIgdmFsID0gcGFyc2VGbG9hdCgkKFwiI2lucHV0LXdlYXRoZXItXCIgKyBjICsgXCItXCIgKyBtKS52YWwoKSk7XG4gICAgICAgICAgaWYoICF2YWwgJiYgdmFsICE9IDAgKSB7XG4gICAgICAgICAgICAgIGFsZXJ0KFwiTWlzc2luZyB3ZWF0aGVyIGRhdGE6IFwiK2MrXCIgZm9yIG1vbnRoIFwiK20rXCJcXG5cXG5cIitcbiAgICAgICAgICAgICAgICAgICAgXCJEaWQgeW91IHNlbGVjdCBhIGxvY2F0aW9uIChTZXR1cCkgYW5kL29yIGFyZSBhbGwgd2VhdGhlci9zb2lsIGZpZWxkcyBmaWxsZWQgb3V0P1wiKTtcbiAgICAgICAgICAgICAgJChcIiNydW5idG4sICNydW5idG4tc21cIikucmVtb3ZlQ2xhc3MoXCJkaXNhYmxlZFwiKS5odG1sKFwiPGkgY2xhc3M9J2ljb24tcGxheSc+PC9pPiBSdW5cIik7XG4gICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxudmFyIHNldFdlYXRoZXIgPSBmdW5jdGlvbihkYXRhKSB7XG4gIGlmKCAhbW9kZWwuY3VzdG9tX3dlYXRoZXIgKSBtb2RlbC5jdXN0b21fd2VhdGhlciA9IHt9O1xuXG4gIGlmKCBkYXRhICkge1xuICAgICAgZm9yKCB2YXIga2V5IGluIGRhdGEgKSB7XG5cbiAgICAgICAgICAvLyBjbGVhbiB1cCBkYXRlIGZvcm1hdFxuICAgICAgICAgIHZhciBkYXRlID0ga2V5LnJlcGxhY2UoL1teXFxkLV0vLCcnKTtcbiAgICAgICAgICB2YXIgcGFydHMgPSBkYXRlLnNwbGl0KCctJyk7XG5cbiAgICAgICAgICBpZiggcGFydHMubGVuZ3RoIDwgMiApIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGFsZXJ0KCdJbnZhbGlkIERhdGUgRm9ybWF0LiAgRGF0ZXMgc2hvdWxkIGJlIGluIFlZWVktTU0gZm9ybWF0Jyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICggcGFydHNbMV0ubGVuZ3RoICE9IDIgKSB7XG4gICAgICAgICAgICAgIGRhdGUgPSBwYXJ0c1swXStcIi0wXCIrcGFydHNbMV07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbW9kZWwuY3VzdG9tX3dlYXRoZXJbZGF0ZV0gPSBkYXRhW2tleV07XG4gICAgICB9XG4gIH1cblxuICAvLyBjcmVhdGUgYXJyYXkgc28gd2UgY2FuIHNvcnRcbiAgdmFyIGFyciA9IFtdO1xuICB2YXIgaGVhZGVycyA9IFsnZGF0ZSddO1xuICBmb3IoIHZhciBkYXRlIGluIG1vZGVsLmN1c3RvbV93ZWF0aGVyICkge1xuXG4gICAgICB2YXIgdCA9IFtkYXRlXTtcbiAgICAgIGZvciggdmFyIGtleSBpbiBtb2RlbC5jdXN0b21fd2VhdGhlcltkYXRlXSApIHtcbiAgICAgICAgICBpZigga2V5ID09ICducmVsJyApIGNvbnRpbnVlO1xuICAgICAgICAgIGlmKCBhcnIubGVuZ3RoID09IDAgKSBoZWFkZXJzLnB1c2goa2V5KTtcbiAgICAgICAgICB0LnB1c2gobW9kZWwuY3VzdG9tX3dlYXRoZXJbZGF0ZV1ba2V5XSk7XG4gICAgICB9XG5cbiAgICAgIGFyci5wdXNoKHQpO1xuICB9XG5cbiAgaWYoIGFyci5sZW5ndGggPT0gMCApIHtcbiAgICAgICQoJyNjdXN0b20td2VhdGhlci1wYW5lbCcpLmh0bWwoXCJObyB3ZWF0aGVyIGRhdGEgaGFzIGJlZW4gdXBsb2FkZWQuXCIpO1xuICAgICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIGh0bWwgPSAnPGRpdiBzdHlsZT1cIm92ZXJmbG93OmF1dG87bWF4LWhlaWdodDo2MDBweFwiPjx0YWJsZSBjbGFzcz1cInRhYmxlIHRhYmxlLXN0cmlwZWRcIj48dHI+JztcblxuICBhcnIuc29ydChmdW5jdGlvbihhLCBiKXtcbiAgICAgIHZhciBkMSA9IG5ldyBEYXRlKGFbMF0rXCItMDFcIikuZ2V0VGltZSgpO1xuICAgICAgdmFyIGQyID0gbmV3IERhdGUoYlswXStcIi0wMVwiKS5nZXRUaW1lKCk7XG5cbiAgICAgIGlmKCBkMSA8IGQyICkge1xuICAgICAgICAgIHJldHVybiAxO1xuICAgICAgfSBlbHNlIGlmKCBkMSA+IGQyICkge1xuICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIDA7XG4gIH0pO1xuXG4gIGZvciggdmFyIGkgPSAwOyBpIDwgaGVhZGVycy5sZW5ndGg7IGkrKyApIHtcbiAgICAgIGh0bWwgKz0gJzx0aD4nK2hlYWRlcnNbaV0rJzwvdGg+JztcbiAgfVxuICBodG1sICs9ICc8L3RyPic7XG5cbiAgZm9yKCB2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKysgKSB7XG4gICAgICBodG1sICs9ICc8dHI+PHRkPicrYXJyW2ldLmpvaW4oJzwvdGQ+PHRkPicpKyc8L3RkPjwvdHI+JztcbiAgfVxuXG4gICQoJyNjdXN0b20td2VhdGhlci1wYW5lbCcpLmh0bWwoaHRtbCsnPC90YWJsZT48L2Rpdj48ZGl2IGlkPVwiY3VzdG9tLXdlYXRoZXItY2hhcnRcIj48L2Rpdj4nKTtcblxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICB3ZWF0aGVyQ3VzdG9tQ2hhcnQgPSBjaGFydHMuY3JlYXRlV2VhdGhlckNoYXJ0KCQoJyNjdXN0b20td2VhdGhlci1jaGFydCcpWzBdLCBtb2RlbC5jdXN0b21fd2VhdGhlcik7XG4gIH0sIDEwMDApO1xuXG59O1xuXG52YXIgc2hvd1Jhd091dHB1dCA9IGZ1bmN0aW9uKHJlc3VsdHMpIHtcblxuICAvLyBzZWxlY3RlZCBpbiB0aGUgY2hhcnRzIG91dHB1dFxuICB2YXIgdmFycyA9ICQoXCIjY2hhcnRUeXBlSW5wdXRcIikudmFsKCk7XG5cbiAgLy8gZmluZCB0aGUgcm93cyB3ZSBjYXJlIGFib3V0XG4gIHZhciBjaGFydFJvd3MgPSB7fTtcbiAgZm9yKCB2YXIgaSA9IDA7IGkgPCByZXN1bHRzWzBdLm91dHB1dFswXS5sZW5ndGg7IGkrKyApIHtcbiAgICAgIGlmKCB2YXJzLmluZGV4T2YocmVzdWx0c1swXS5vdXRwdXRbMF1baV0pID4gLTEgKSBjaGFydFJvd3NbcmVzdWx0c1swXS5vdXRwdXRbMF1baV1dID0gaTtcbiAgfVxuXG4gIHZhciB0YWJzID0gJCgnPHVsIGNsYXNzPVwibmF2IG5hdi1waWxsc1wiIGlkPVwicmF3T3V0cHV0VGFic1wiICBkYXRhLXRhYnM9XCJwaWxsXCI+PC91bD4nKTtcbiAgdmFyIGNvbnRlbnRzID0gJCgnPGRpdiBjbGFzcz1cInBpbGwtY29udGVudFwiIHN0eWxlPVwib3ZlcmZsb3c6YXV0bzttYXJnaW4tdG9wOjE1cHhcIj48L2Rpdj4nKTtcblxuICBmb3IgKCB2YXIgaSA9IDA7IGkgPCB2YXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0YWJzLmFwcGVuZCgkKCc8bGkgJysoaSA9PSAwID8gJ2NsYXNzPVwiYWN0aXZlXCInIDogXCJcIikrJz48YSBocmVmPVwiI3Jhd291dCdcbiAgICAgICAgICArdmFyc1tpXSsnXCIgZGF0YS10b2dnbGU9XCJ0YWJcIj4nK3ZhcnNbaV0rJzwvYT48L2xpPicpKTtcblxuICAgICAgY29udGVudHMuYXBwZW5kKCQoJzxkaXYgY2xhc3M9XCJwaWxsLXBhbmUgJyArIChpID09IDAgPyAnYWN0aXZlJyA6IFwiXCIpXG4gICAgICAgICAgKyAnXCIgaWQ9XCJyYXdvdXQnICsgdmFyc1tpXSArICdcIj48L2Rpdj4nKSk7XG4gIH1cblxuICAkKFwiI291dHB1dC1jb250ZW50XCIpLmh0bWwoXCJcIikuYXBwZW5kKHRhYnMpLmFwcGVuZChjb250ZW50cyk7XG4gICQoXCIjcmF3T3V0cHV0VGFic1wiKS50YWIoKTtcblxuICBjc3ZSZXN1bHRzID0ge1xuICAgICAgY29uZmlnIDogbW9kZWxJTy5leHBvcnRTZXR1cCgpLFxuICAgICAgZGF0YSA6IHt9XG4gIH07XG5cbiAgLy8gc29tZSByb3dzIGhhdmUgc3RyaW5ncywgd2UgZG9uJ3Qgd2FudCB0aGVzZVxuICAvLyBpZ25vcmUgc3RyaW5nIHJvd3NcbiAgLypmb3IoIHZhciBpID0gMDsgaSA8IHJlc3VsdHMubGVuZ3RoOyBpKysgKSB7XG4gICAgICB2YXIgY2xlYW4gPSBbcmVzdWx0c1tpXS5vdXRwdXRbMF1dO1xuICAgICAgZm9yKCB2YXIgaiA9IDE7IGogPCByZXN1bHRzW2ldLm91dHB1dC5sZW5ndGg7IGorKyApIHtcbiAgICAgICAgICBpZiggdHlwZW9mIHJlc3VsdHNbaV0ub3V0cHV0W2pdWzBdICE9ICdzdHJpbmcnICkgY2xlYW4ucHVzaChyZXN1bHRzW2ldLm91dHB1dFtqXSk7XG4gICAgICB9XG4gICAgICByZXN1bHRzW2ldLm91dHB1dCA9IGNsZWFuO1xuICB9Ki9cblxuICB2YXIgY0RhdGUgPSBuZXcgRGF0ZSgkKFwiI2lucHV0LW1hbmFnZS1kYXRlUGxhbnRlZFwiKS52YWwoKSk7XG5cbiAgdmFyIHRhYmxlLCByb3c7XG4gIGZvciggdmFyIGtleSBpbiBjaGFydFJvd3MgKSB7XG4gICAgICB0YWJsZSA9IFwiPHRhYmxlIGNsYXNzPSd0YWJsZSB0YWJsZS1zdHJpcGVkJz5cIjtcblxuICAgICAgY3N2UmVzdWx0cy5kYXRhW2tleV0gPSBbXTtcblxuICAgICAgZm9yKCB2YXIgaiA9IDA7IGogPCByZXN1bHRzWzBdLm91dHB1dC5sZW5ndGg7IGorKyApe1xuICAgICAgICAgIGNzdlJlc3VsdHMuZGF0YVtrZXldW2pdID0gW107XG5cbiAgICAgICAgICAvLyBzZXQgaGVhZGVyIHJvd1xuICAgICAgICAgIGlmKCBqID09IDAgKSB7XG4gICAgICAgICAgICAgIGNzdlJlc3VsdHMuZGF0YVtrZXldW2pdLnB1c2goJ21vbnRoJyk7XG4gICAgICAgICAgICAgIGNzdlJlc3VsdHMuZGF0YVtrZXldW2pdLnB1c2goJ2RhdGUnKTtcblxuICAgICAgICAgICAgICB0YWJsZSArPSBcIjx0cj48dGg+U3RlcDwvdGg+PHRoPkRhdGU8L3RoPlwiO1xuICAgICAgICAgICAgICBmb3IoIHZhciB6ID0gMDsgeiA8IHJlc3VsdHMubGVuZ3RoOyB6KysgKSB7XG4gICAgICAgICAgICAgICAgICB0YWJsZSArPSBcIjx0aD5cIjtcbiAgICAgICAgICAgICAgICAgIHZhciB0bXAgPSBbXTtcblxuICAgICAgICAgICAgICAgICAgZm9yKCB2YXIgbVR5cGUgaW4gcmVzdWx0c1t6XS5pbnB1dHMgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgdG1wLnB1c2gobVR5cGUrXCI9XCIrcmVzdWx0c1t6XS5pbnB1dHNbbVR5cGVdKTtcbiAgICAgICAgICAgICAgICAgICAgICB0YWJsZSArPSBcIjxkaXY+XCIrbVR5cGUrXCI9XCIrcmVzdWx0c1t6XS5pbnB1dHNbbVR5cGVdK1wiPC9kaXY+XCI7XG4gICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgIGlmKCB0bXAubGVuZ3RoID09IDAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgY3N2UmVzdWx0cy5kYXRhW2tleV1bal0ucHVzaChrZXkpO1xuICAgICAgICAgICAgICAgICAgICAgIHRhYmxlICs9IGtleTtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgY3N2UmVzdWx0cy5kYXRhW2tleV1bal0ucHVzaCh0bXAuam9pbihcIiBcIikpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgdGFibGUgKz0gXCI8L3RoPlwiO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgdGFibGUgKz0gXCI8L3RyPlwiO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8vdmFyIGRhdGUgPSBuZXcgRGF0ZShjRGF0ZS5nZXRZZWFyKCkrMTkwMCwgY0RhdGUuZ2V0TW9udGgoKStqLCBjRGF0ZS5nZXREYXRlKCkpO1xuICAgICAgICAgICAgICAvL3ZhciBtID0gZGF0ZS5nZXRNb250aCgpKzE7XG4gICAgICAgICAgICAgIC8vaWYoIG0gPCAxMCApIG0gPSAnMCcrbTtcblxuICAgICAgICAgICAgICB0YWJsZSArPSBcIjx0cj48dGQ+XCIraitcIjwvdGQ+PHRkPlwiK3Jlc3VsdHNbMF0ub3V0cHV0W2pdWzBdKyc8L3RkPic7XG5cbiAgICAgICAgICAgICAgY3N2UmVzdWx0cy5kYXRhW2tleV1bal0ucHVzaChqKTtcbiAgICAgICAgICAgICAgY3N2UmVzdWx0cy5kYXRhW2tleV1bal0ucHVzaChyZXN1bHRzWzBdLm91dHB1dFtqXVswXSk7XG5cbiAgICAgICAgICAgICAgdmFyIHY7XG4gICAgICAgICAgICAgIGZvciggdmFyIHogPSAwOyB6IDwgcmVzdWx0cy5sZW5ndGg7IHorKyApIHtcbiAgICAgICAgICAgICAgICAgIHYgPSByZXN1bHRzW3pdLm91dHB1dFtqXVtjaGFydFJvd3Nba2V5XV07XG4gICAgICAgICAgICAgICAgICB0YWJsZSArPSBcIjx0ZD5cIit2K1wiPC90ZD5cIjtcbiAgICAgICAgICAgICAgICAgIGNzdlJlc3VsdHMuZGF0YVtrZXldW2pdLnB1c2godik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdGFibGUgKz0gXCI8L3RyPlwiO1xuICAgICAgICAgIH1cblxuICAgICAgfVxuICAgICAgJChcIiNyYXdvdXRcIiArIGtleSkuaHRtbCh0YWJsZStcIjwvdGFibGU+XCIpO1xuICB9XG5cbiAgLy8gbWFrZSBzdXJlIHdlIGNhbiBzZWUgdGhlIGV4cG9ydCBidG5cbiAgaWYoICFvZmZsaW5lTW9kZSApICQoXCIjc2hvdy1leHBvcnQtY3N2XCIpLnNob3coKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBpbml0IDogaW5pdCxcbiAgb3V0cHV0cyA6IG91dHB1dHMsXG4gIGlucHV0cyA6IGlucHV0cyxcbiAgZ2V0TW9kZWwgOiBnZXRNb2RlbCxcbiAgcnVuTW9kZWwgOiBydW5Nb2RlbCxcbiAgc2hvd1Jhd091dHB1dCA6IHNob3dSYXdPdXRwdXQsXG4gIG1vbnRoc1RvUnVuIDogbW9udGhzVG9SdW4sXG4gIG91dHB1dERlZmluaXRpb25zIDogb3V0cHV0RGVmaW5pdGlvbnMsXG4gIHFzIDogcXMsXG4gIHNldFdlYXRoZXIgOiBzZXRXZWF0aGVyLFxuICBnZHJpdmUgOiBnZHJpdmUsXG4gIHJ1bkNvbXBsZXRlIDogcnVuQ29tcGxldGUsXG4gIGdldE1vZGVsSU8gOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gbW9kZWxJTztcbiAgfVxufTtcbiIsInZhciBhcHA7XG5cbi8vIG9ubHkgZHJhdyBjaGFydHMgaWYgd2lkdGggaGFzIGNoYW5nZWRcbnZhciBjV2lkdGggPSAwO1xuXG4vLyB0aGVyZSBpcyBubyB3YXkgdG8gZ2V0IHRoZSBjb2xvcnMgZm9yIHRoZSBsZWdlbmRzICh0byBtYWtlIHlvdXIgb3duKVxuLy8gdGhpcyBwb3N0OlxuLy8gZ2l2ZXMgdGhlc2UgdmFsdWVzLiAgVGhpcyBpcyBhIEhBQ0ssIGlmIHRoZXkgZXZlciBjaGFuZ2UsIHdlIG5lZWQgdG8gdXBkYXRlXG52YXIgZ29vZ2xlQ2hhcnRDb2xvcnMgPSBbXCIjMzM2NmNjXCIsXCIjZGMzOTEyXCIsXCIjZmY5OTAwXCIsXCIjMTA5NjE4XCIsXCIjOTkwMDk5XCIsXCIjMDA5OWM2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCIjZGQ0NDc3XCIsXCIjNjZhYTAwXCIsXCIjYjgyZTJlXCIsXCIjMzE2Mzk1XCIsXCIjOTk0NDk5XCIsXCIjMjJhYTk5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCIjYWFhYTExXCIsXCIjNjYzM2NjXCIsXCIjZTY3MzAwXCIsXCIjOGIwNzA3XCIsXCIjNjUxMDY3XCIsXCIjMzI5MjYyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCIjNTU3NGE2XCIsXCIjM2IzZWFjXCIsXCIjYjc3MzIyXCIsXCIjMTZkNjIwXCIsXCIjYjkxMzgzXCIsXCIjZjQzNTllXCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCIjOWM1OTM1XCIsXCIjYTljNDEzXCIsXCIjMmE3NzhkXCIsXCIjNjY4ZDFjXCIsXCIjYmVhNDEzXCIsXCIjMGM1OTIyXCJcbiAgICAgICAgICAgICAgICAgICAgICAsXCIjNzQzNDExXCJdO1xuXG52YXIgd2VhdGhlckNoYXJ0T3B0aW9ucyA9IHtcbiAgdGl0bGUgOiAnV2VhdGhlcicsXG4gIGhlaWdodCA6IDMwMCxcbiAgdkF4ZXM6IFt7XG4gICAgICAgICAgdGl0bGU6IFwiUmFkaWF0aW9uIChNSi9kYXkpOyBUZW1wZXJhdHVyZSAoXkMpOyBEZXcgUG9pbnQgKF5DKTsgRGF5bGlnaHQgKGgpXCIsXG4gICAgICAgICAgbWluVmFsdWUgOiAtNSxcbiAgICAgICAgICBtYXhWYWx1ZSA6IDM1XG4gICAgICAgIH0se1xuICAgICAgICAgIHRpdGxlOiBcIlByZWNpcGl0YXRpb24gKG1tKVwiLFxuICAgICAgICAgIG1pblZhbHVlIDogLTUwLFxuICAgICAgICAgIG1heFZhbHVlIDogMzUwXG4gICAgICAgIH1dLFxuICBoQXhpczoge3RpdGxlOiBcIk1vbnRoXCJ9LFxuICBzZXJpZXNUeXBlOiBcImJhcnNcIixcbiAgc2VyaWVzOiB7XG4gICAgICAwOiB7dHlwZTogXCJsaW5lXCIsIHRhcmdldEF4aXNJbmRleDowfSxcbiAgICAgIDE6IHt0eXBlOiBcImxpbmVcIiwgdGFyZ2V0QXhpc0luZGV4OjB9LFxuICAgICAgMjoge3R5cGU6IFwibGluZVwiLCB0YXJnZXRBeGlzSW5kZXg6MH0sXG4gICAgICAzOiB7dHlwZTogXCJhcmVhXCIsIHRhcmdldEF4aXNJbmRleDoxfSxcbiAgICAgIDQ6IHt0YXJnZXRBeGlzSW5kZXg6MH1cbiAgfVxufVxuXG4vLyB0ZW1wbGF0ZSBmb3IgdGhlIHBvcHVwXG52YXIgc2xpZGVyUG9wdXAgPSAkKFxuICAgICAgXCI8ZGl2IGNsYXNzPSdzbGlkZS1wb3B1cCc+XCIgK1xuICAgICAgICAgIFwiPGkgY2xhc3M9J2ljb24tcmVtb3ZlLWNpcmNsZSBwdWxsLXJpZ2h0IHNsaWRlLXBvcHVwLWNsb3NlJz48L2k+XCIrXG4gICAgICAgICAgXCI8ZGl2IGlkPSdjYXJvdXNlbCcgY2xhc3M9J293bC1jYXJvdXNlbCBvd2wtdGhlbWUnIHN0eWxlPSdtYXJnaW4tdG9wOjE1cHgnPjwvZGl2PlwiICtcblx0XCI8L2Rpdj5cIik7XG5cbnZhciBzbGlkZXJQb3B1cEJnID0gJChcIjxkaXYgY2xhc3M9J3NsaWRlLXBvcHVwLWJnJz4mbmJzcDs8L2Rpdj5cIik7XG5cbi8vIG9ubHkgZHJhdyBjaGFydHMgaWYgc29tZW9uZSBoYXMgY2xpY2sgYSBjaGVja2JveFxudmFyIGNoYW5nZXMgPSBmYWxzZTtcblxuLy8gd2hlbiBzaXppbmcsIHdhaXQgYSB+MzAwbXMgYmVmb3JlIHRyaWdnZXJpbmcgcmVkcmF3XG52YXIgcmVzaXplVGltZXIgPSAtMTtcblxudmFyIGNoYXJ0VHlwZVNlbGVjdG9yLCBjaGFydENoZWNrYm94ZXMsIGNEYXRhO1xuXG5mdW5jdGlvbiBpbml0KCkge1xuXG4gICQoXCIjc2hvdy1jaGFydHNwb3B1cC1idG5cIikub24oJ2NsaWNrJyxmdW5jdGlvbigpIHtcbiAgICAgIHNob3dQb3B1cCgpO1xuICB9KTtcblxuICAvLyBzZXR1cCBjaGFydCBzZWxlY3RvcnNcbiAgJChcIiNjaGFydC1tb2RhbFwiKS5tb2RhbCh7c2hvdzpmYWxzZX0pO1xuXG4gIC8vIHNldCBwb3B1cCBjbGljayBoYW5kbGVyc1xuICAkKFwiI2NoYXJ0VHlwZS1zZWxlY3RBbGxcIikub24oJ2NsaWNrJyxzZWxlY3RBbGwpO1xuICAkKFwiI2NoYXJ0VHlwZS11bnNlbGVjdEFsbFwiKS5vbignY2xpY2snLHVuc2VsZWN0QWxsKTtcblxuICBjaGFydFR5cGVTZWxlY3RvciA9ICQoXCIjY2hhcnRUeXBlSW5wdXRcIik7XG4gIGNoYXJ0Q2hlY2tib3hlcyA9ICQoXCIjY2hhcnRTZWxlY3Rpb25zXCIpO1xuXG4gIHZhciBjMSA9ICQoXCIjY2hhcnRTZWxlY3Rpb25zLWMxXCIpO1xuICB2YXIgYzIgPSAkKFwiI2NoYXJ0U2VsZWN0aW9ucy1jMlwiKTtcbiAgZm9yKCB2YXIgaSA9IDA7IGkgPCBhcHAub3V0cHV0cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHZhbCA9IGFwcC5vdXRwdXRzW2ldO1xuICAgICAgY2hhcnRUeXBlU2VsZWN0b3IuYXBwZW5kKCQoXCI8b3B0aW9uIHZhbHVlPSdcIiArIHZhbCArIFwiJyBcIlxuICAgICAgICAgICAgICArICh2YWwgPT0gJ1dSJyB8fCB2YWwgPT0gJ1dTJyB8fCB2YWwgPT0gJ1dGJyA/ICdzZWxlY3RlZCcgOiAnJylcbiAgICAgICAgICAgICAgKyBcIj5cIiArIHZhbCArIFwiPC9vcHRpb24+XCIpKTtcblxuICAgICAgaWYoIGkgJSAyID09IDAgKSB7XG4gICAgICAgICAgYzEuYXBwZW5kKCQoJzxkaXYgY2xhc3M9XCJjaGVja2JveFwiPjxsYWJlbD48aW5wdXQgdHlwZT1cImNoZWNrYm94XCInXG4gICAgICAgICAgICAgICAgICArICh2YWwgPT0gJ1dSJyB8fCB2YWwgPT0gJ1dTJyB8fCB2YWwgPT0gJ1dGJyA/ICdjaGVja2VkPVwiY2hlY2tlZFwiJyA6ICcnKVxuICAgICAgICAgICAgICAgICAgKyAnIHZhbHVlPVwiJyt2YWwrJ1wiPiAnK19jcmVhdGVEZXNjcmlwdGlvbih2YWwpKyc8L2Rpdj4nKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgIGMyLmFwcGVuZCgkKCc8ZGl2IGNsYXNzPVwiY2hlY2tib3hcIj48bGFiZWw+PGlucHV0IHR5cGU9XCJjaGVja2JveFwiJ1xuICAgICAgICAgICAgICAgICAgKyAodmFsID09ICdXUicgfHwgdmFsID09ICdXUycgfHwgdmFsID09ICdXRicgPyAnY2hlY2tlZD1cImNoZWNrZWRcIicgOiAnJylcbiAgICAgICAgICAgICAgICAgICsgJyB2YWx1ZT1cIicrdmFsKydcIj4gJytfY3JlYXRlRGVzY3JpcHRpb24odmFsKSsnPC9kaXY+JykpO1xuICAgICAgfVxuICB9XG5cbiAgY2hhcnRDaGVja2JveGVzLmZpbmQoXCIuZm4tdG9nZ2xlXCIpLm9uKCdjbGljaycsZnVuY3Rpb24oKXtcbiAgICAgICQoXCIjXCIrJCh0aGlzKS5hdHRyKFwiZGF0YXRhcmdldFwiKSkudG9nZ2xlKCdzbG93Jyk7XG4gIH0pO1xuXG4gIGNoYXJ0Q2hlY2tib3hlcy5maW5kKFwiaW5wdXRbdHlwZT1jaGVja2JveF1cIikub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICBpZiggJCh0aGlzKS5pcyhcIjpjaGVja2VkXCIpICkgc2VsZWN0KCQodGhpcykuYXR0cihcInZhbHVlXCIpKTtcbiAgICAgIGVsc2UgdW5zZWxlY3QoJCh0aGlzKS5hdHRyKFwidmFsdWVcIikpO1xuICB9KTtcblxuICAkKFwiI3NlbGVjdC1jaGFydHMtYnRuLCAjc2VsZWN0LWNoYXJ0cy10aXRsZS1idG5cIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICQoXCIjY2hhcnQtbW9kYWxcIikubW9kYWwoJ3Nob3cnKTtcbiAgICAgIGNoYW5nZXMgPSBmYWxzZTtcbiAgfSk7XG5cbiAgJChcIi5jaGFydC1tb2RhbC1jbG9zZVwiKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgJChcIiNjaGFydC1tb2RhbFwiKS5tb2RhbCgnaGlkZScpO1xuICAgICAgaWYoIGNoYW5nZXMgJiYgY0RhdGEgKSB7XG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICB1cGRhdGVDaGFydHMoKTtcbiAgICAgICAgICAgICAgLy8gdXBkYXRlIHJhdyBkYXRhIGFzIHdlbGxcbiAgICAgICAgICAgICAgYXBwLnNob3dSYXdPdXRwdXQoY0RhdGEpO1xuICAgICAgICAgIH0sNDAwKTtcblxuICAgICAgfVxuICB9KTtcblxuICAkKFwiLmNoYXJ0LXR5cGUtdG9nZ2xlXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICBpZiggISQodGhpcykuaGFzQ2xhc3MoXCJhY3RpdmVcIikgKSB7XG4gICAgICAgICAgJChcIi5jaGFydC10eXBlLXRvZ2dsZS5hY3RpdmVcIikucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XG4gICAgICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcyhcImFjdGl2ZVwiKTtcbiAgICAgICAgICB1cGRhdGVDaGFydHMoKTtcbiAgICAgIH1cbiAgfSk7XG59XG5cbi8vIG1ha2Ugc3VyZSBhbmQgZW5kIGxhYmVsIHRhZ1xuZnVuY3Rpb24gX2NyZWF0ZURlc2NyaXB0aW9uKHZhbCkge1xuICBpZiggIWFwcC5vdXRwdXREZWZpbml0aW9uc1t2YWxdICkgcmV0dXJuIFwiPGI+XCIrdmFsK1wiPC9iPjwvbGFiZWw+XCI7XG5cbiAgdmFyIGRlc2MgPSBhcHAub3V0cHV0RGVmaW5pdGlvbnNbdmFsXTtcbiAgdmFyIGxhYmVsID0gZGVzYy5sYWJlbCAmJiBkZXNjLmxhYmVsLmxlbmd0aCA+IDAgPyBcIiAtIFwiK2Rlc2MubGFiZWwgOiBcIlwiO1xuICB2YXIgdW5pdHMgPSBkZXNjLnVuaXRzICYmIGRlc2MudW5pdHMubGVuZ3RoID4gMCA/IFwiIFtcIitkZXNjLnVuaXRzK1wiXVwiIDogXCJcIjtcblxuICB2YXIgbGFiZWwgPSBcIjxiPlwiK3ZhbCtcIjwvYj48c3BhbiBzdHlsZT0nZm9udC1zaXplOjEycHgnPlwiK2xhYmVsK3VuaXRzK1wiPC9zcGFuPjwvbGFiZWw+XCI7XG4gIHZhciBoYXNEZXNjID0gZGVzYy5kZXNjcmlwdGlvbiAmJiBkZXNjLmRlc2NyaXB0aW9uLmxlbmd0aCA+IDA7XG4gIGlmKCBoYXNEZXNjICkge1xuICAgICAgbGFiZWwgKz0gXCI8ZGl2IHN0eWxlPSdmb250LXNpemU6MTFweDtjb2xvcjojODg4O2ZvbnQtc3R5bGU6aXRhbGljJz5cIitkZXNjLmRlc2NyaXB0aW9uO1xuICB9XG5cbiAgdmFyIGZOYW1lID0gZGVzYy5hbHRGbk5hbWUgfHwgdmFsO1xuICB2YXIgZm4gPSBhcHAuZ2V0TW9kZWwoKS5nZXRGdW5jdGlvbihmTmFtZSk7XG5cbiAgaWYoIGZuIHx8IGRlc2MuZm4gKSB7XG4gICAgICBpZiggIWhhc0Rlc2MgKSBsYWJlbCArPSBcIjxkaXYgc3R5bGU9J2ZvbnQtc2l6ZToxMXB4Jz5cIjtcbiAgICAgIGxhYmVsICs9IFwiIDxhIHN0eWxlPSdmb250LXN0eWxlOm5vcm1hbDtjdXJzb3I6cG9pbnRlcicgZGF0YXRhcmdldD0nZm4tZGVzYy1cIit2YWwrXCInIGNsYXNzPSdmbi10b2dnbGUnPmZuKCk8L2E+PC9kaXY+XCI7XG5cbiAgICAgIGxhYmVsICs9IFwiPGRpdiBpZD0nZm4tZGVzYy1cIit2YWwrXCInIHN0eWxlPSdkaXNwbGF5Om5vbmU7Zm9udC1zaXplOjExcHg7b3ZlcmZsb3c6YXV0bycgY2xhc3M9J3dlbGwgd2VsbC1zbSc+XCIrXG4gICAgICAgICAgICAgICAgICAoZm58fGRlc2MuZm4pLnRvU3RyaW5nKCkucmVwbGFjZSgvIC9nLCcmbmJzcDsnKS5yZXBsYWNlKC9cXG4vZywnPGJyIC8+JykrXCI8L2Rpdj5cIjtcbiAgfSBlbHNlIGlmICggaGFzRGVzYyApIHtcbiAgICAgIGxhYmVsICs9IFwiPC9kaXY+XCI7XG4gIH1cblxuICAvLyBUT0RPOiBhZGQgZm4gd2VsbFxuICByZXR1cm4gbGFiZWwrXCI8YnIgLz5cIjtcbn1cblxuZnVuY3Rpb24gc2VsZWN0KHZhbCkge1xuICBjaGFydFR5cGVTZWxlY3Rvci5maW5kKFwib3B0aW9uW3ZhbHVlPVwiK3ZhbCtcIl1cIikuYXR0cihcInNlbGVjdGVkXCIsXCJzZWxlY3RlZFwiKTtcbiAgY2hhcnRDaGVja2JveGVzLmZpbmQoXCJpbnB1dFt2YWx1ZT1cIit2YWwrXCJdXCIpLnByb3AoXCJjaGVja2VkXCIsdHJ1ZSk7XG4gIGNoYW5nZXMgPSB0cnVlO1xufVxuXG5mdW5jdGlvbiB1bnNlbGVjdCh2YWwpIHtcbiAgY2hhcnRUeXBlU2VsZWN0b3IuZmluZChcIm9wdGlvblt2YWx1ZT1cIit2YWwrXCJdXCIpLnJlbW92ZUF0dHIoXCJzZWxlY3RlZFwiKTtcbiAgY2hhcnRDaGVja2JveGVzLmZpbmQoXCJpbnB1dFt2YWx1ZT1cIit2YWwrXCJdXCIpLnByb3AoXCJjaGVja2VkXCIsZmFsc2UpO1xuICBjaGFuZ2VzID0gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gc2VsZWN0QWxsKCkge1xuICBmb3IoIHZhciBpID0gMDsgaSA8IGFwcC5vdXRwdXRzLmxlbmd0aDsgaSsrKSBzZWxlY3QoYXBwLm91dHB1dHNbaV0pO1xufVxuXG5mdW5jdGlvbiB1bnNlbGVjdEFsbCgpIHtcbiAgZm9yKCB2YXIgaSA9IDA7IGkgPCBhcHAub3V0cHV0cy5sZW5ndGg7IGkrKykgdW5zZWxlY3QoYXBwLm91dHB1dHNbaV0pO1xufVxuXG5mdW5jdGlvbiByZW1vdmUoZWxlKSB7XG4gIGVsZS5wYXJlbnQoKS5oaWRlKCdzbG93JywgZnVuY3Rpb24oKXtcbiAgICAgIGVsZS5wYXJlbnQoKS5yZW1vdmUoKTtcbiAgICAgIHVuc2VsZWN0KGVsZS5hdHRyKCd0eXBlJykpO1xuICB9KTtcblxufVxuXG5mdW5jdGlvbiBwcmludChjaGFydENvbnRhaW5lcikge1xuICBnYSgnc2VuZCcsICdldmVudCcsICd1aScsICdpbnRlcmFjdGlvbicsICdwcmludC1jaGFydCcsIDEpO1xuXG5cbnZhciBkaXNwX3NldHRpbmc9XCJ0b29sYmFyPXllcyxsb2NhdGlvbj1ubyxkaXJlY3Rvcmllcz15ZXMsbWVudWJhcj15ZXMsXCI7XG4gIGRpc3Bfc2V0dGluZys9XCJzY3JvbGxiYXJzPXllcyx3aWR0aD04MDAsIGhlaWdodD02MDAsIGxlZnQ9MjUsIHRvcD0yNVwiO1xuXG4gIHZhciBzdmcgPSBjaGFydENvbnRhaW5lci5maW5kKFwic3ZnXCIpO1xuICB2YXIgaHRtbCA9IGNoYXJ0Q29udGFpbmVyLmZpbmQoXCJkaXZcIikuaHRtbCgpO1xuXG4gIHZhciBkb2NwcmludD13aW5kb3cub3BlbihcIlwiLFwiXCIsZGlzcF9zZXR0aW5nKTtcbiAgZG9jcHJpbnQuZG9jdW1lbnQub3BlbigpO1xuICBkb2NwcmludC5kb2N1bWVudC53cml0ZSgnPGh0bWw+PGhlYWQ+PHRpdGxlPjwvdGl0bGU+Jyk7XG4gIGRvY3ByaW50LmRvY3VtZW50LndyaXRlKCc8L2hlYWQ+PGJvZHkgbWFyZ2lud2lkdGg9XCIwXCIgbWFyZ2luaGVpZ2h0PVwiMFwiIG9uTG9hZD1cInNlbGYucHJpbnQoKVwiPjxjZW50ZXI+Jyk7XG4gIGRvY3ByaW50LmRvY3VtZW50LndyaXRlKGh0bWwpO1xuICBkb2NwcmludC5kb2N1bWVudC53cml0ZSgnPC9jZW50ZXI+PC9ib2R5PjwvaHRtbD4nKTtcbiAgZG9jcHJpbnQuZG9jdW1lbnQuY2xvc2UoKTtcbiAgZG9jcHJpbnQuZm9jdXMoKTtcblxufVxuXG5cbmZ1bmN0aW9uIHNldERhdGEoZGF0YSkge1xuICBjRGF0YSA9IGRhdGE7XG59XG5cbi8vIGJhc2ljYWxseSByZWRyYXcgZXZlcnl0aGluZ1xuZnVuY3Rpb24gcmVzaXplKCkge1xuICAvLyByZXF1aXJlIG1vcmUgdGhhbiBhIDMwIHBpeGVsIHdpZHRoIGNoYW5nZSAoc28gd2UgZG9uJ3QgcmVkcmF3IHcvIHNjcm9sbCBiYXJzIGFkZGVkKVxuICB2YXIgd2luV2lkdGggPSAkKHdpbmRvdykud2lkdGgoKTtcbiAgaWYoIGNXaWR0aCA+IHdpbldpZHRoIC0gMTUgJiYgY1dpZHRoIDwgd2luV2lkdGggKyAxNSApIHJldHVybjtcbiAgY1dpZHRoID0gd2luV2lkdGg7XG5cbiAgaWYoIHJlc2l6ZVRpbWVyICE9IC0xICkgY2xlYXJUaW1lb3V0KHJlc2l6ZVRpbWVyKTtcbiAgcmVzaXplVGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgcmVzaXplVGltZXIgPSAtMTtcbiAgICAgIHVwZGF0ZUNoYXJ0cygpO1xuICB9LDMwMCk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUNoYXJ0cyhyZXN1bHRzLCBhbmltYXRlKSB7XG4gIGlmKCByZXN1bHRzICkgc2V0RGF0YShyZXN1bHRzKTtcbiAgaWYoICFjRGF0YSApIHJldHVybjtcblxuICAkKFwiI3Nob3ctY2hhcnRzcG9wdXAtYnRuXCIpLnNob3coKTtcblxuICAvLyBjcmVhdGUgYSBsZWdlbmQgaWYgdGhlcmUgaXMgbW9yZSB0aGFuIG9uZSBydW5cbiAgdmFyIGxlZ2VuZCA9IFwiXCI7XG4gIGlmKCAhY0RhdGFbMF0uc2luZ2xlUnVuICkge1xuICAgICAgdmFyIGMxID0gXCJcIjtcbiAgICAgIHZhciBjMiA9IFwiXCI7XG4gICAgICBmb3IoIHZhciBpID0gMDsgaSA8IGNEYXRhLmxlbmd0aDsgaSsrICkge1xuICAgICAgICAgIHZhciBlbGUgPSBcIjxkaXYgc3R5bGU9J21pbi1oZWlnaHQ6NDBweDttYXJnaW4tYm90dG9tOjEwcHgnPjxkaXYgY2xhc3M9J2xlZ2VuZC1zcXVhcmUnIHN0eWxlPSdiYWNrZ3JvdW5kLWNvbG9yOlwiK2dvb2dsZUNoYXJ0Q29sb3JzW2ldK1wiJz4mbmJzcDs8L2Rpdj5cIjtcbiAgICAgICAgICBmb3IoIHZhciBtVHlwZSBpbiBjRGF0YVtpXS5pbnB1dHMgKSB7XG4gICAgICAgICAgICAgIGVsZSArPSBcIjxkaXYgY2xhc3M9J2xlZ2VuZC10ZXh0Jz5cIittVHlwZStcIj1cIitjRGF0YVtpXS5pbnB1dHNbbVR5cGVdK1wiPC9kaXY+XCI7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYoIGkgJSAyID09IDAgKSBjMSArPSBlbGUgKyBcIjwvZGl2PlwiXG4gICAgICAgICAgZWxzZSBjMiArPSBlbGUgKyBcIjwvZGl2PlwiXG4gICAgICB9XG4gICAgICBsZWdlbmQgPSBcIjxkaXY+PGEgaWQ9J2xlZ2VuZC1wYW5lbC10b2dnbGUnIHN0eWxlPSdtYXJnaW4tbGVmdDo1cHg7Y3Vyc29yOnBvaW50ZXInPkxlZ2VuZDwvYT48L2Rpdj5cIitcbiAgICAgICAgICAgICAgIFwiPGRpdiBzdHlsZT0nYm9yZGVyLWJvdHRvbToxcHggc29saWQgI2VlZTtwYWRkaW5nLWJvdHRvbTo1cHg7bWFyZ2luLWJvdHRvbToxNXB4Jz5cIitcbiAgICAgICAgICAgICAgIFwiPGRpdiBjbGFzcz0ncm93JyBpZD0nbGVnZW5kLXBhbmVsJz48ZGl2IGNsYXNzPSdjb2wtc20tNic+XCIrYzErXCI8L2Rpdj5cIitcbiAgICAgICAgICAgICAgIFwiPGRpdiBjbGFzcz0nY29sLXNtLTYnPlwiK2MyK1wiPC9kaXY+XCIrXG4gICAgICAgICAgICAgICBcIjwvZGl2PjwvZGl2PlwiO1xuICB9XG4gICQoXCIjY2hhcnQtY29udGVudFwiKS5odG1sKGxlZ2VuZCk7XG4gICQoXCIjbGVnZW5kLXBhbmVsLXRvZ2dsZVwiKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgJChcIiNsZWdlbmQtcGFuZWxcIikudG9nZ2xlKFwic2xvd1wiKTtcbiAgfSk7XG5cblxuICB2YXIgdHlwZXMgPSBjaGFydFR5cGVTZWxlY3Rvci52YWwoKTtcbiAgZm9yICggdmFyIGkgPSAwOyBpIDwgdHlwZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIF9zaG93TWFpbkNoYXJ0KHR5cGVzW2ldLCBhbmltYXRlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBzaG93UG9wdXAoKSB7XG4gIGdhKCdzZW5kJywgJ2V2ZW50JywgJ3VpJywgJ2ludGVyYWN0aW9uJywgJ3Nob3ctY2hhcnQtcG9wdXAnLCAxKTtcblxuXG4gIHNsaWRlclBvcHVwLmZpbmQoXCIub3dsLXRoZW1lXCIpLmh0bWwoXCJcIik7XG4gICQoJ2JvZHknKS5zY3JvbGxUb3AoMCkuY3NzKCdvdmVyZmxvdycsJ2hpZGRlbicpLmFwcGVuZChzbGlkZXJQb3B1cEJnKS5hcHBlbmQoc2xpZGVyUG9wdXApO1xuXG4gIC8vIHRoaXMgY291bGQgY2FzZSBiYWRuZXNzLi4uLiAgd2h5IGRvZXNuJ3QgaXQgbGl2ZSB3aGVuIHJlbW92ZWQgZnJvbSBET00/XG4gIHNsaWRlclBvcHVwLmZpbmQoJy5zbGlkZS1wb3B1cC1jbG9zZScpLm9uKCdjbGljaycsZnVuY3Rpb24oKXtcbiAgICAgIGhpZGVQb3B1cCgpO1xuICB9KTtcblxuICB2YXIgdHlwZXMgPSBjaGFydFR5cGVTZWxlY3Rvci52YWwoKTtcbiAgZm9yICggdmFyIGkgPSAwOyBpIDwgdHlwZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIF9zaG93UG9wdXBDaGFydCh0eXBlc1tpXSk7XG4gIH1cblxuICAkKCcjY2Fyb3VzZWwnKS5vd2xDYXJvdXNlbCh7XG4gICAgICBuYXZpZ2F0aW9uIDogdHJ1ZSwgLy8gU2hvdyBuZXh0IGFuZCBwcmV2IGJ1dHRvbnNcbiAgICAgIHNsaWRlU3BlZWQgOiAzMDAsXG4gICAgICBwYWdpbmF0aW9uU3BlZWQgOiA0MDAsXG4gICAgICBzaW5nbGVJdGVtOnRydWVcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGhpZGVQb3B1cCgpIHtcbiAgc2xpZGVyUG9wdXBCZy5yZW1vdmUoKTtcbiAgc2xpZGVyUG9wdXAucmVtb3ZlKCk7XG4gICQoJ2JvZHknKS5jc3MoJ292ZXJmbG93JywnYXV0bycpO1xufVxuXG5mdW5jdGlvbiBfc2hvd01haW5DaGFydCh0eXBlLCBhbmltYXRlKSB7XG4gIHZhciBjaGFydFR5cGUgPSAkKFwiLmNoYXJ0LXR5cGUtdG9nZ2xlLmFjdGl2ZVwiKS5hdHRyKFwidmFsdWVcIik7XG4gIHZhciBwYW5lbCA9ICQoXCI8ZGl2IC8+XCIpO1xuICB2YXIgb3V0ZXJQYW5lbCA9ICQoXCI8ZGl2PlwiK1xuICBcdFwiPGEgY2xhc3M9J2J0biBidG4teHMgYnRuLWRlZmF1bHQnIHN0eWxlPSdcIisoY2hhcnRUeXBlICE9IFwidGltZWxpbmVcIiA/IFwicG9zaXRpb246YWJzb2x1dGU7ei1pbmRleDoxMDttYXJnaW46MCAwIC0yMHB4IDIwcHhcIiA6IFwibWFyZ2luLWJvdHRvbTo1cHhcIikrXG4gICAgICBcIicgdHlwZT0nXCIrdHlwZStcIic+XCIgK1xuICBcdFwiPGkgY2xhc3M9J2ljb24tcmVtb3ZlJz48L2k+IFwiK3R5cGUrXCI8L2E+PC9kaXY+XCIpO1xuICBvdXRlclBhbmVsLmZpbmQoXCJhXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgcmVtb3ZlKCQodGhpcykpO1xuICB9KTtcbiAgaWYoIGNoYXJ0VHlwZSA9PSBcInRpbWVsaW5lXCIgKSBvdXRlclBhbmVsLmNzcyhcIm1hcmdpbi1ib3R0b21cIixcIjIwcHhcIik7XG4gICQoXCIjY2hhcnQtY29udGVudFwiKS5hcHBlbmQob3V0ZXJQYW5lbC5hcHBlbmQocGFuZWwpKTtcbiAgX2NyZWF0ZUNoYXJ0KHR5cGUsIGNoYXJ0VHlwZSwgcGFuZWwsIGZhbHNlLCBudWxsLCBhbmltYXRlKTtcbn1cblxuZnVuY3Rpb24gX3Nob3dQb3B1cENoYXJ0KHR5cGUpIHtcbiAgdmFyIHBhbmVsID0gJChcIjxkaXYgY2xhc3M9J2l0ZW0nPjwvZGl2PlwiKTtcblxuICB2YXIgcHJpbnRCdG4gPSAkKFwiPGEgY2xhc3M9J2J0biBidG4tc20gYnRuLWRlZmF1bHQnIHN0eWxlPSdtYXJnaW4tbGVmdDoxNnB4Jz48aSBjbGFzcz0naWNvbi1wcmludCc+PC9pPiBQcmludDwvYT5cIikub24oJ2NsaWNrJyxmdW5jdGlvbigpe1xuICAgICBwcmludChjaGFydFBhbmVsKTtcbiAgfSk7XG4gIHBhbmVsLmFwcGVuZChwcmludEJ0bik7XG5cbiAgdmFyIGNoYXJ0UGFuZWwgPSAkKFwiPGRpdj48L2Rpdj5cIik7XG4gIHBhbmVsLmFwcGVuZChjaGFydFBhbmVsKTtcblxuICBzbGlkZXJQb3B1cC5maW5kKFwiLm93bC10aGVtZVwiKS5hcHBlbmQocGFuZWwpO1xuICBfY3JlYXRlQ2hhcnQodHlwZSwgJ2xpbmUnLCBjaGFydFBhbmVsLCB0cnVlLCBbTWF0aC5yb3VuZCgkKHdpbmRvdykud2lkdGgoKSouODgpLCBNYXRoLnJvdW5kKCgkKHdpbmRvdykuaGVpZ2h0KCkqLjkwKS0xMjUpXSk7XG59XG5cbmZ1bmN0aW9uIF9jcmVhdGVDaGFydCh0eXBlLCBjaGFydFR5cGUsIHBhbmVsLCBzaG93TGVnZW5kLCBzaXplLCBhbmltYXRlKSB7XG4gIHZhciBjb2wgPSAwO1xuXG4gIHZhciBkdCA9IG5ldyBnb29nbGUudmlzdWFsaXphdGlvbi5EYXRhVGFibGUoKTtcblxuICBpZiggY2hhcnRUeXBlID09ICd0aW1lbGluZScgKSB7XG4gICAgICBkdC5hZGRDb2x1bW4oJ2RhdGUnLCAnTW9udGgnKTtcbiAgfSBlbHNlIHtcbiAgICAgIC8vZHQuYWRkQ29sdW1uKCdudW1iZXInLCAnTW9udGgnKTtcbiAgICAgIGR0LmFkZENvbHVtbignc3RyaW5nJywgJ01vbnRoJyk7XG4gIH1cblxuICAvLyBzZXQgdGhlIGZpcnN0IGNvbHVtblxuICBpZiggIWNEYXRhWzBdLnNpbmdsZVJ1biApIHtcbiAgICAgIGZvciggdmFyIGkgPSAwOyBpIDwgY0RhdGEubGVuZ3RoOyBpKysgKSB7XG4gICAgICAgICAgdmFyIGxhYmVsID0gXCJcIjtcbiAgICAgICAgICBmb3IoIHZhciBrZXkgaW4gY0RhdGFbaV0uaW5wdXRzICkge1xuICAgICAgICAgICAgICBsYWJlbCArPSBrZXkucmVwbGFjZSgvLipcXC4vLCcnKStcIj1cIitjRGF0YVtpXS5pbnB1dHNba2V5XStcIiBcXG5cIjtcbiAgICAgICAgICB9XG4gICAgICAgICAgbGFiZWwgPSBsYWJlbC5yZXBsYWNlKC8sXFxzJC8sJycpO1xuICAgICAgICAgIGR0LmFkZENvbHVtbignbnVtYmVyJywgbGFiZWwpO1xuICAgICAgfVxuICB9IGVsc2Uge1xuICAgICAgZHQuYWRkQ29sdW1uKCdudW1iZXInLCB0eXBlKTtcbiAgfVxuXG4gIC8vIGZpbmQgdGhlIGNvbHVtbiB3ZSB3YW50IHRvIGNoYXJ0XG4gIGZvciAoIHZhciBpID0gMDsgaSA8IGNEYXRhWzBdLm91dHB1dFswXS5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGNEYXRhWzBdLm91dHB1dFswXVtpXSA9PSB0eXBlKSB7XG4gICAgICAgICAgY29sID0gaTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgfVxuXG4gIHZhciBjRGF0ZSA9IG5ldyBEYXRlKCQoXCIjaW5wdXQtbWFuYWdlLWRhdGVQbGFudGVkXCIpLnZhbCgpKTtcblxuICB2YXIgZGF0YSA9IFtdO1xuICB2YXIgbWF4ID0gMDtcbiAgLy8gY3JlYXRlIHRoZSBbXVtdIGFycmF5IGZvciB0aGUgZ29vZ2xlIGNoYXJ0XG4gIGZvciAoIHZhciBpID0gMTsgaSA8IGNEYXRhWzBdLm91dHB1dC5sZW5ndGg7IGkrKykge1xuICAgICAgLy9pZiAodHlwZW9mIGNEYXRhWzBdLm91dHB1dFtpXVtjb2xdID09PSAnc3RyaW5nJykgY29udGludWU7XG5cbiAgICAgIHZhciByb3cgPSBbXTtcblxuICAgICAgLy92YXIgZGF0ZSA9IG5ldyBEYXRlKGNEYXRlLmdldFllYXIoKSsxOTAwLCBjRGF0ZS5nZXRNb250aCgpK2ksIGNEYXRlLmdldERhdGUoKSk7XG4gICAgICBpZiggY2hhcnRUeXBlID09IFwidGltZWxpbmVcIiApIHtcbiAgICAgICAgICAvLyBhZGQgb24gbW9udGhcbiAgICAgICAgICByb3cucHVzaChuZXcgRGF0ZShjRGF0YVswXS5vdXRwdXRbaV1bMF0pKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcm93LnB1c2goY0RhdGFbMF0ub3V0cHV0W2ldWzBdKTtcbiAgICAgIH1cblxuICAgICAgZm9yICggdmFyIGogPSAwOyBqIDwgY0RhdGEubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICBpZiggY0RhdGFbal0ub3V0cHV0W2ldW2NvbF0gPiBtYXggKSBtYXggPSBjRGF0YVtqXS5vdXRwdXRbaV1bY29sXTtcbiAgICAgICAgICByb3cucHVzaChjRGF0YVtqXS5vdXRwdXRbaV1bY29sXSk7XG4gICAgICB9XG5cbiAgICAgIGRhdGEucHVzaChyb3cpO1xuICB9XG5cbiAgZHQuYWRkUm93cyhkYXRhKTtcblxuICBpZiggYXBwLm91dHB1dERlZmluaXRpb25zW3R5cGVdICkge1xuICAgICAgdmFyIGRlc2MgPSBhcHAub3V0cHV0RGVmaW5pdGlvbnNbdHlwZV07XG4gICAgICB2YXIgbGFiZWwgPSBkZXNjLmxhYmVsICYmIGRlc2MubGFiZWwubGVuZ3RoID4gMCA/IFwiIC0gXCIrZGVzYy5sYWJlbCA6IFwiXCI7XG4gICAgICB2YXIgdW5pdHMgPSBkZXNjLnVuaXRzICYmIGRlc2MudW5pdHMubGVuZ3RoID4gMCA/IFwiIFtcIitkZXNjLnVuaXRzK1wiXVwiIDogXCJcIjtcbiAgICAgIHR5cGUgPSB0eXBlK2xhYmVsK3VuaXRzO1xuICB9XG5cblxuICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgICAgICB2QXhpcyA6IHtcbiAgICAgICAgICAgICAgdGl0bGUgOiB0eXBlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBoQXhpcyA6IHtcbiAgICAgICAgICAgICAgdGl0bGUgOiBcIk1vbnRoXCJcbiAgICAgICAgICB9XG4gIH1cbiAgaWYoICFzaG93TGVnZW5kICkgb3B0aW9ucy5sZWdlbmQgPSB7cG9zaXRpb246XCJub25lXCJ9O1xuXG4gIGlmKCBzaXplICkge1xuICAgICAgb3B0aW9ucy53aWR0aCA9IHNpemVbMF07XG4gICAgICBvcHRpb25zLmhlaWdodCA9IHNpemVbMV07XG4gIH0gZWxzZSB7XG4gICAgICBvcHRpb25zLndpZHRoID0gcGFuZWwud2lkdGgoKTtcbiAgICAgIG9wdGlvbnMuaGVpZ2h0ID0gb3B0aW9ucy53aWR0aCouNDtcbiAgfVxuICBwYW5lbC53aWR0aChvcHRpb25zLndpZHRoKS5oZWlnaHQob3B0aW9ucy5oZWlnaHQpO1xuXG4gIGlmKCBjaGFydFR5cGUgPT0gJ3RpbWVsaW5lJyApIHtcbiAgICAgIG9wdGlvbnMuZGlzcGxheUFubm90YXRpb25zID0gdHJ1ZTtcbiAgICAgIHZhciBjaGFydCA9IG5ldyBnb29nbGUudmlzdWFsaXphdGlvbi5Bbm5vdGF0ZWRUaW1lTGluZShwYW5lbFswXSk7XG4gICAgICBjaGFydC5kcmF3KGR0LCBvcHRpb25zKTtcbiAgfSBlbHNlIHtcbiAgICAgIHZhciBjaGFydCA9IG5ldyBnb29nbGUudmlzdWFsaXphdGlvbi5MaW5lQ2hhcnQocGFuZWxbMF0pO1xuICAgICAgY2hhcnQuZHJhdyhkdCwgb3B0aW9ucyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlV2VhdGhlckNoYXJ0KHJvb3QsIGRhdGEpIHtcbiAgJChyb290KS5odG1sKCcnKTtcblxuICB2YXIgZHQgPSBuZXcgZ29vZ2xlLnZpc3VhbGl6YXRpb24uRGF0YVRhYmxlKCk7XG4gIGR0LmFkZENvbHVtbignc3RyaW5nJywgJ01vbnRoJyk7XG4gIGR0LmFkZENvbHVtbignbnVtYmVyJywgJ01pbiBUZW1wZXJhdHVyZScpO1xuICBkdC5hZGRDb2x1bW4oJ251bWJlcicsICdNYXggVGVtcGVyYXR1cmUnKTtcbiAgZHQuYWRkQ29sdW1uKCdudW1iZXInLCAnRGV3IFBvaW50Jyk7XG4gIGR0LmFkZENvbHVtbignbnVtYmVyJywgJ1ByZWNpcGl0YXRpb24nKTtcbiAgZHQuYWRkQ29sdW1uKCdudW1iZXInLCAnUmFkaWF0aW9uJyk7XG4gIGR0LmFkZENvbHVtbignbnVtYmVyJywgJ0RheWxpZ2h0Jyk7XG5cbiAgZm9yKCB2YXIgZGF0ZSBpbiBkYXRhICkge1xuICAgICAgdmFyIG9iaiA9IGRhdGFbZGF0ZV07XG4gICAgICBkdC5hZGRSb3coW1xuICAgICAgICAgIGRhdGUrJycsXG4gICAgICAgICAgb2JqLnRtaW4gfHwgMCxcbiAgICAgICAgICBvYmoudG1heCB8fCAwLFxuICAgICAgICAgIG9iai50ZG1lYW4gfHwgMCxcbiAgICAgICAgICBvYmoucHB0IHx8IDAsXG4gICAgICAgICAgb2JqLnJhZCB8fCAwLFxuICAgICAgICAgIG9iai5kYXlsaWdodCB8fCAwXG4gICAgICBdKTtcbiAgfVxuXG4gIHZhciBjaGFydCA9IG5ldyBnb29nbGUudmlzdWFsaXphdGlvbi5Db21ib0NoYXJ0KHJvb3QpO1xuICBjaGFydC5kcmF3KGR0LCB3ZWF0aGVyQ2hhcnRPcHRpb25zKTtcblxuICByZXR1cm4gY2hhcnQ7XG59XG5cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNldEFwcCA6IGZ1bmN0aW9uKGEpIHtcbiAgICBhcHAgPSBhO1xuICB9LFxuICAgIGluaXQgOiBpbml0LFxuICAgIHNldERhdGEgOiBzZXREYXRhLFxuICAgIHNlbGVjdCA6IHNlbGVjdCxcbiAgICB1bnNlbGVjdCA6IHVuc2VsZWN0LFxuICAgIHNlbGVjdEFsbCA6IHNlbGVjdEFsbCxcbiAgICB1bnNlbGVjdEFsbCA6IHVuc2VsZWN0QWxsLFxuICAgIHVwZGF0ZUNoYXJ0cyA6IHVwZGF0ZUNoYXJ0cyxcbiAgICByZW1vdmUgOiByZW1vdmUsXG4gICAgc2hvd1BvcHVwOiBzaG93UG9wdXAsXG4gICAgaGlkZVBvcHVwOiBoaWRlUG9wdXAsXG4gICAgcmVzaXplIDogcmVzaXplLFxuICAgIGNyZWF0ZVdlYXRoZXJDaGFydCA6IGNyZWF0ZVdlYXRoZXJDaGFydFxufVxuIiwidmFyIGdkcml2ZSA9IHJlcXVpcmUoJy4vZ2RyaXZlJyk7XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gICQoXCIjZXhwb3J0LW1vZGFsXCIpLm1vZGFsKHtcbiAgICAgICAgICBzaG93IDogZmFsc2VcbiAgICAgIH0pO1xuXG4gICAgICAkKFwiI3Nob3ctZXhwb3J0LWNzdlwiKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICBfc2V0TWVzc2FnZShudWxsKTtcblxuICAgICAgICAkKFwiI2V4cG9ydC1uYW1lXCIpLnZhbChcIjNQRyBNb2RlbCBSZXN1bHRzIChcIituZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkucmVwbGFjZSgvVC8sJyAnKS5yZXBsYWNlKC9cXC5cXGQqWi8sJycpK1wiKVwiKTtcbiAgICAgICAgICAkKFwiI2V4cG9ydC1tb2RhbFwiKS5tb2RhbCgnc2hvdycpO1xuICAgICAgfSk7XG59XG5cbmZ1bmN0aW9uIF9zZXRNZXNzYWdlKG1zZywgdHlwZSwgcHJvZ3Jlc3MpIHtcbiAgaWYoICFtc2cgKSB7XG4gICAgcmV0dXJuICQoXCIjZXhwb3J0LW1zZ1wiKS5oaWRlKCk7XG4gIH1cbiAgJChcIiNleHBvcnQtbXNnXCIpLnNob3coKTtcblxuICBpZiggcHJvZ3Jlc3MgKSB7XG4gICAgJChcIiNleHBvcnQtbXNnLXByb2dyZXNzXCIpLnNob3coKTtcbiAgfSBlbHNlIHtcbiAgICAkKFwiI2V4cG9ydC1tc2ctcHJvZ3Jlc3NcIikuaGlkZSgpO1xuICB9XG5cbiAgJCgnI2V4cG9ydC1tc2cnKS5hdHRyKFwiY2xhc3NcIiwnYWxlcnQgYWxlcnQtJyt0eXBlKTtcbiAgJCgnI2V4cG9ydC1tc2ctdGV4dCcpLmh0bWwobXNnKTtcbn1cblxuZnVuY3Rpb24gX3VwZGF0ZVByb2dyZXNzKGluZGV4LCB0b3RhbCkge1xuICBwZXJjZW50ID0gMTAwICogKCBpbmRleCAvIHRvdGFsICk7XG4gICQoXCIjZXhwb3J0LW1zZy1wcm9ncmVzcy1iYXJcIikuYXR0cihcImFyaWEtdmFsdWVub3dcIiwgcGVyY2VudCkuY3NzKFwid2lkdGhcIixwZXJjZW50K1wiJVwiKTtcbn1cblxuLy8gc2VlIGlmIGFuIGVycm9yIGV4aXN0cywgaWYgc28sIHNldCBzdGF0ZVxuZnVuY3Rpb24gX2NoZWNrRXJyb3IoZmlsZSkge1xuICB2YXIgZXJyb3JNZXNzYWdlID0gbnVsbDtcbiAgaWYoICFmaWxlICkgZXJyb3JNZXNzYWdlID0gXCJFcnJvciBjcmVhdGluZyBmaWxlIG9uIEdvb2dsZSBEcml2ZSA6KFwiO1xuICBpZiggZmlsZS5lcnJvciApIGVycm9yTWVzc2FnZSA9IGZpbGUubWVzc2FnZTtcblxuICBpZiggZXJyb3JNZXNzYWdlICkge1xuICAgIF9zZXRNZXNzYWdlKGVycm9yTWVzc2FnZSwgXCJkYW5nZXJcIik7XG4gICAgJChcIiNleHBvcnQtY3N2XCIpLnJlbW92ZUNsYXNzKFwiZGlzYWJsZWRcIikuaHRtbChcIkV4cG9ydFwiKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbiAgLy8gZXhwb3J0IGFzIGNzdlxuZnVuY3Rpb24gZXhwb3J0Q3N2KHJlc3VsdHMpIHtcbiAgZ2EoJ3NlbmQnLCAnZXZlbnQnLCAndWknLCAnaW50ZXJhY3Rpb24nLCAnZXhwb3J0LWRyaXZlLWNzdicsIDEpO1xuXG4gICQoXCIjZXhwb3J0LWNzdlwiKS5hZGRDbGFzcyhcImRpc2FibGVkXCIpLmh0bWwoXCJFeHBvcnRpbmcuLi5cIik7XG5cbiAgdmFyIG5hbWUgPSAkKFwiI2V4cG9ydC1uYW1lXCIpLnZhbCgpO1xuICBpZiggbmFtZS5sZW5ndGggPT0gMCApIHtcbiAgICBfc2V0TWVzc2FnZShcIlBsZWFzZSBwcm92aWRlIGEgZm9sZGVyIG5hbWVcIiwgXCJkYW5nZXJcIilcbiAgICAkKFwiI2V4cG9ydC1jc3ZcIikucmVtb3ZlQ2xhc3MoXCJkaXNhYmxlZFwiKS5odG1sKFwiRXhwb3J0XCIpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBkYXRhID0gcmVzdWx0cy5kYXRhO1xuXG4gIC8vIGNyZWF0ZSBhIGxpc3Qgc28gd2UgY2FuIHJlY3Vyc2l2ZWx5IGl0ZXJhdGVcbiAgdmFyIGtleXMgPSBbXTtcbiAgZm9yKCB2YXIga2V5IGluIGRhdGEgKSBrZXlzLnB1c2goa2V5KTtcblxuICAvLyBjcmVhdGUgZm9sZGVyXG4gIF9zZXRNZXNzYWdlKFwiQ3JlYXRpbmcgZXhwb3J0IGZvbGRlci4uLlwiLCBcImluZm9cIiwgdHJ1ZSk7XG4gIF91cGRhdGVQcm9ncmVzcygxLCBrZXlzLmxlbmd0aCsyKTtcbiAgZ2RyaXZlLnNhdmVGaWxlKG5hbWUsXCJBSEIgM1BHIE1vZGVsIFJlc3VsdHNcIixcImFwcGxpY2F0aW9uL3ZuZC5nb29nbGUtYXBwcy5mb2xkZXJcIixcIlwiLGZ1bmN0aW9uKGZpbGUpe1xuICAgIGlmKCBfY2hlY2tFcnJvcihmaWxlKSApIHJldHVybjtcbiAgICB2YXIgcGFyZW50ID0gZmlsZS5pZDtcbiAgICBfdXBkYXRlUHJvZ3Jlc3MoMiwga2V5cy5sZW5ndGgrMik7XG5cbiAgICAvLyBjcmVhdGUgYSBuaWNlIGZpbGUgZGVzY3JpYmluZyB0aGUgY3VycmVudCBleHBvcnRcbiAgICBfc2V0TWVzc2FnZShcIkNyZWF0aW5nIGNvbmZpZyBmaWxlLi4uXCIsIFwiaW5mb1wiLCB0cnVlKTtcbiAgICBkZWxldGUgcmVzdWx0cy5jb25maWcucGxhbnRhdGlvbl9zdGF0ZTtcbiAgICB2YXIgY29uZmlnID0gSlNPTi5zdHJpbmdpZnkocmVzdWx0cy5jb25maWcsbnVsbCxcIiAgXCIpO1xuICAgIGdkcml2ZS5zYXZlRmlsZShcImNvbmZpZy50eHRcIixcIkFIQiAzUEcgTW9kZWwgLSBSdW4gQ29uZmlndXJhdGlvblwiLFwidGV4dC9wbGFpblwiLGNvbmZpZyxmdW5jdGlvbihmaWxlKXtcbiAgICAgIGlmKCBfY2hlY2tFcnJvcihmaWxlKSApIHJldHVybjtcbiAgICAgIF91cGRhdGVQcm9ncmVzcygzLCBrZXlzLmxlbmd0aCsyKTtcblxuICAgICAgX2NyZWF0ZUV4cG9ydCgwLCBrZXlzLCBkYXRhLCBwYXJlbnQpO1xuICAgIH0se3BhcmVudDogcGFyZW50fSlcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIF9jcmVhdGVFeHBvcnQoaW5kZXgsIGtleXMsIGRhdGEsIHBhcmVudCkge1xuXG4gIC8vIHdlIGFyZSBhbGwgZG9uZSA6KVxuICBpZiggaW5kZXggPT0ga2V5cy5sZW5ndGggKSB7XG4gICAgX3VwZGF0ZVByb2dyZXNzKDEsIDEpO1xuICAgIF9zZXRNZXNzYWdlKFwiRXhwb3J0IFN1Y2Nlc3NmdWwuPGJyIC8+PGEgaHJlZj0naHR0cHM6Ly9kcml2ZS5nb29nbGUuY29tLyNmb2xkZXJzL1wiICsgcGFyZW50ICtcbiAgICAgICAgICBcIicgdGFyZ2V0PSdfYmxhbmsnPjxpIGNsYXNzPSdpY29uLWV4dGVybmFsLWxpbmstc2lnbic+PC9pPiBPcGVuIGluIEdvb2dsZSBEcml2ZTwvYT5cIiwgXCJzdWNjZXNzXCIpO1xuICAgICQoXCIjZXhwb3J0LWNzdlwiKS5yZW1vdmVDbGFzcyhcImRpc2FibGVkXCIpLmh0bWwoXCJFeHBvcnRcIik7XG4gIH0gZWxzZSB7XG5cbiAgICB2YXIga2V5ID0ga2V5c1tpbmRleF07XG4gICAgdmFyIGNzdiA9IFwiXCI7XG5cbiAgICAvLyBUT0RPOiBhZGQgbW9udGggYW5kIGRhdGVcblxuICAgIGZvciggdmFyIGkgPSAwOyBpIDwgZGF0YVtrZXldLmxlbmd0aDsgaSsrICkge1xuICAgICAgaWYoIGRhdGFba2V5XVtpXS5sZW5ndGggPT0gMCApIGNvbnRpbnVlOyAvLyBpZ25vcmUgdGhlIGJsYW5rIHJvd3NcblxuICAgICAgZm9yKCB2YXIgaiA9IDA7IGogPCBkYXRhW2tleV1baV0ubGVuZ3RoOyBqKysgKSBjc3YgKz0gZGF0YVtrZXldW2ldW2pdK1wiLFwiO1xuICAgICAgY3N2ID0gY3N2LnJlcGxhY2UoLywkLywnJykrXCJcXG5cIjtcbiAgICB9XG5cbiAgICBfc2V0TWVzc2FnZShcIkNyZWF0aW5nIFwiK2tleXNbaW5kZXhdK1wiLmNzdi4uLiBcIiwgXCJpbmZvXCIsIHRydWUpO1xuICAgIGdkcml2ZS5zYXZlRmlsZShrZXlzW2luZGV4XStcIi5jc3ZcIixcIlwiLFwidGV4dC9jc3ZcIixjc3YsZnVuY3Rpb24oZmlsZSl7XG4gICAgICBpZiggX2NoZWNrRXJyb3IoZmlsZSkgKSByZXR1cm47XG5cbiAgICAgIF91cGRhdGVQcm9ncmVzcyhpbmRleCs0LCBrZXlzLmxlbmd0aCsyKTtcblxuICAgICAgaW5kZXgrKztcbiAgICAgIF9jcmVhdGVFeHBvcnQoaW5kZXgsIGtleXMsIGRhdGEsIHBhcmVudCk7XG4gICAgfSx7Y29udmVydDogdHJ1ZSwgcGFyZW50OiBwYXJlbnR9KTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGV4cG9ydENzdiA6IGV4cG9ydENzdixcbiAgaW5pdCAgICAgIDogaW5pdFxufTtcbiIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9icm93c2Vyc3RhY2svZmxhc2hibG9jay1kZXRlY3RvclxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGNhbGxiYWNrTWV0aG9kKXtcbiAgICB2YXIgcmV0dXJuX3ZhbHVlID0gMDtcblxuICAgIGlmKG5hdmlnYXRvci5wbHVnaW5zW1wiU2hvY2t3YXZlIEZsYXNoXCJdKSB7XG4gICAgICAgICAgZW1iZWRfbGVuZ3RoID0gJCgnZW1iZWQnKS5sZW5ndGg7XG4gICAgICAgICAgb2JqZWN0X2xlbmd0aCA9ICQoJ29iamVjdCcpLmxlbmd0aDtcblxuICAgICAgICAgIGlmKChlbWJlZF9sZW5ndGggPiAwKSB8fCAob2JqZWN0X2xlbmd0aCA+IDApKSB7XG4gICAgICAgICAgICAgIC8qIE1hYyAvIENocm9tZSB1c2luZyBGbGFzaEJsb2NrICsgTWFjIC8gU2FmYXJpIHVzaW5nIEFkQmxvY2sgKi9cbiAgICAgICAgICAgICAgJCgnb2JqZWN0LCBlbWJlZCcpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKCQodGhpcykuY3NzKCdkaXNwbGF5JykgPT09ICdub25lJyl7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5fdmFsdWUgPSAyO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8qIE1hYyAvIEZpcmVmb3ggdXNpbmcgRmxhc2hCbG9jayAqL1xuICAgICAgICAgICAgICBpZiggJCgnZGl2W2JnaW5hY3RpdmVdJykubGVuZ3RoID4gMCApe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm5fdmFsdWUgPSAyO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgIH0gZWxzZSBpZihuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ01TSUUnKSA+IC0xKSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgbmV3IEFjdGl2ZVhPYmplY3QoJ1Nob2Nrd2F2ZUZsYXNoLlNob2Nrd2F2ZUZsYXNoJyk7XG4gICAgICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgICAgICAgIHJldHVybl92YWx1ZSA9IDI7XG4gICAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgICAgLyogSWYgZmxhc2ggaXMgbm90IGluc3RhbGxlZCAqL1xuICAgICAgICAgIHJldHVybl92YWx1ZSA9IDE7XG4gICAgfVxuXG4gICAgaWYoY2FsbGJhY2tNZXRob2QgJiYgdHlwZW9mKGNhbGxiYWNrTWV0aG9kKSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgY2FsbGJhY2tNZXRob2QocmV0dXJuX3ZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiByZXR1cm5fdmFsdWU7XG4gICAgfVxufTtcbiIsInZhciBPYXV0aCA9IHJlcXVpcmUoJy4vb2F1dGgnKTtcbnZhciBnZHJpdmVSVCA9IHJlcXVpcmUoJy4vZ2RyaXZlUlQnKTtcbnZhciBhcHA7XG5cblxudmFyIE1JTUVfVFlQRSA9IFwiYXBwbGljYXRpb24vdm5kLmFoYi0zcGcucnVuXCI7XG52YXIgVFJFRV9NSU1FX1RZUEUgPSBcImFwcGxpY2F0aW9uL3ZuZC5haGItM3BnLnRyZWVcIjtcbnZhciBEUklWRV9BUElfVkVSU0lPTiA9IFwidjJcIjtcblxuLy8gZ29vZ2xlIG9hdXRoIGFjY2VzcyB0b2tlblxudmFyIHRva2VuID0gXCJcIjtcblxuLy8gY3VycmVudGx5IGxvYWRlZCBnZHJpdmUgZmlsZSBpZFxudmFyIGxvYWRlZEZpbGUgPSBudWxsO1xuLy8gbGlzdCBvZiBjdXJyZW50bHkgbG9hZGVkIGZpbGVzIChtZXRhZGF0YSlcbnZhciBmaWxlTGlzdCA9IFtdO1xuLy8gZ29vZ2xlIGRyaXZlIHNoYXJlIGNsaWVudFxudmFyIGNsaWVudCA9IG51bGw7XG5cbi8vIGxvYWRlZCB0cmVlIGFuZCBtYW5hZ2VtZW50XG52YXIgbG9hZGVkVHJlZSA9IG51bGw7XG4vLyBsaXN0IG9mIGN1cnJlbnRseSBsb2FkZWQgdHJlZSBmaWxlcyAobWV0YWRhdGEpXG52YXIgdHJlZUxpc3QgPSBbXTtcblxuLy8gY3VycmVudCBNSU1FIFRZUEUgd2UgYXJlIHNhdmluZ1xudmFyIHNhdmVNaW1lVHlwZSA9IFwiXCI7XG5cbi8qKipcbiAqICBJbml0aWFsaXplIGdvb2dsZSBkcml2ZSBwYW5lbHMsIGJ0bnMgYW5kIGxvZ2luXG4gKioqL1xuZnVuY3Rpb24gaW5pdChhcHBsaWNhdGlvbiwgY2FsbGJhY2spIHtcbiAgYXBwID0gYXBwbGljYXRpb247XG4gIGdkcml2ZVJULnNldEFwcChhcHApO1xuXG4gIC8vIGluaXQgYm9vdHN0cmFwIG1vZGFsXG4gICQoXCIjc2F2ZS1tb2RhbFwiKS5tb2RhbCh7XG4gICAgc2hvdyA6IGZhbHNlXG4gIH0pO1xuXG4gIC8vIGluaXQgYm9vdHN0cmFwIG1vZGFsXG4gICQoXCIjbG9hZC1tb2RhbFwiKS5tb2RhbCh7XG4gICAgc2hvdyA6IGZhbHNlXG4gIH0pO1xuXG4gIC8vIHRoZSBhYm91dCBtb2RhbCBsaW5rIGlzIGNyZWF0ZWQgYmVsb3csIHNvIHdoeSBub3QuLi5cbiAgJChcIiNhYm91dC1tb2RhbFwiKS5tb2RhbCh7XG4gICAgc2hvdyA6IGZhbHNlXG4gIH0pO1xuXG4gIC8vIHRoZSBhYm91dCBtb2RhbCBsaW5rIGlzIGNyZWF0ZWQgYmVsb3csIHNvIHdoeSBub3QuLi5cbiAgJChcIiNoZWxwLW1vZGFsXCIpLm1vZGFsKHtcbiAgICBzaG93IDogZmFsc2VcbiAgfSk7XG5cbiAgLy8gc2V0IHRoZSAndXBkYXRlJyBidG4gY2xpY2sgaGFuZGxlclxuICAkKFwiI3NhdmUtdXBkYXRlLWJ0blwiKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICBfdXBkYXRlQ3VycmVudEZpbGUoKTtcbiAgfSk7XG5cbiAgLy8gc2V0IHRoZSAnbmV3JyBidG4gY2xpY2sgaGFuZGxlclxuICAkKFwiI3NhdmUtbmV3LWJ0blwiKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICBfc2F2ZU5ld0ZpbGUoKTtcbiAgfSk7XG5cbiAgLy8gY3JlYXRlIHRoZSB0b3AgcmlnaHQgbWVudVxuICBfY3JlYXRlTG9naW5CdG4oKTtcblxuICAvLyBsb2FkIHRoZSBnb29nbGUgYXV0aCBhbmQgZHJpdmUgYXBpJ3NcbiAgX2xvYWRBcGkoZnVuY3Rpb24oKSB7XG4gICAgLy8gaWYgdGhlIHVzZXIgaXMgYXV0aG9yaXplZCBncmFiIHRoZSByZWZyZXNoIHRva2VuXG4gICAgT2F1dGguaXNBdXRob3JpemVkKGZ1bmN0aW9uKHJlZnJlc2hUb2tlbil7XG4gICAgICAvLyBpZiB0aGVyZSBpcyBubyByZWZyZXNoIHRva2VuLCBsZWF2ZSwgd2UgYXJlIGluaXRpYWxpemVkXG4gICAgICBpZiggIXJlZnJlc2hUb2tlbiApIHJldHVybiBjYWxsYmFjaygpO1xuXG4gICAgICAvLyBpZiB3ZSBoYXZlIGEgcmVmZXNoIHRva2VuLCB0aGVuIHVzZXIgaXMgYWxsIHNldCxcbiAgICAgIC8vIGdldCBhIG5ldyBhY2Nlc3MgdG9rZW4gc28gd2UgY2FuIHN0YXJ0IHVzaW5nIHRoZSBhcGknc1xuICAgICAgLy8gZ3JhYiB0aGVpciBpbmZvcm1hdGlvbiBhbmQgZGlzcGxheVxuICAgICAgT2F1dGguZ2V0QWNjZXNzVG9rZW4oZnVuY3Rpb24odCl7XG4gICAgICAgIHRva2VuID0gdDtcbiAgICAgICAgaWYoIHRva2VuICkgX3NldFVzZXJJbmZvKCk7XG4gICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vIGNoZWNrIGlmIGFjY2VzcyB0b2tlbiBoYXMgZXhwaXJlZFxuICAgIHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgX2NoZWNrVG9rZW4oKTtcbiAgICB9LCAxMDAwICogNSAqIDYwKTtcbiAgfSk7XG5cbiAgLy8gc2V0dXAgdGhlIHRyZWUgJ3NoYXJlJyBidG5cbiAgJChcIiNzaGFyZS10cmVlLWJ0blwiKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgIC8vIHNlZSBpZiB3ZSBoYXZlIGEgc2hhcmUgY2xpZW50XG4gICAgaWYoIGNsaWVudCA9PSBudWxsICkge1xuICAgICAgLy8gbm8gY2xpZW50LCBsb2FkIGFwaVxuICAgICAgZ2FwaS5sb2FkKCdkcml2ZS1zaGFyZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgIC8vIG9uIGxvYWQsIHNob3cgdGhlIHNoYXJlIHBvcHVwIHdpdGggdGhlIGN1cnJlbnQgdHJlZVxuICAgICAgICAgY2xpZW50ID0gbmV3IGdhcGkuZHJpdmUuc2hhcmUuU2hhcmVDbGllbnQoT2F1dGguQVBQX0lEKTtcbiAgICAgICAgICBjbGllbnQuc2V0SXRlbUlkcyhbbG9hZGVkVHJlZV0pO1xuICAgICAgICAgY2xpZW50LnNob3dTZXR0aW5nc0RpYWxvZygpO1xuICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyB3ZSBoYXZlIGEgY2xpZW50LCBzaG93IHRoZSBzaGFyZSBwb3B1cCB3aXRoIGN1cnJlbnQgdHJlZVxuICAgICAgY2xpZW50LnNldEl0ZW1JZHMoW2xvYWRlZEZpbGVdKTtcbiAgICAgICBjbGllbnQuc2hvd1NldHRpbmdzRGlhbG9nKCk7XG4gICAgfVxuICB9KTtcblxufVxuXG4vKioqXG4gKiBTYXZlIHRoZSBjdXJyZW50IG1vZGVsIGFzIGEgbmV3IGdvb2dsZSBkcml2ZSBmaWxlXG4gKioqL1xuZnVuY3Rpb24gX3NhdmVOZXdGaWxlKCkge1xuICBnYSgnc2VuZCcsICdldmVudCcsICd1aScsICdpbnRlcmFjdGlvbicsICdzYXZlLWRyaXZlLWZpbGUnLCAxKTtcblxuICAvLyBncmFiIHRoZSBuYW1lIG9mIHRoZSBuZXcgZmlsZVxuICB2YXIgbmFtZSA9ICQoXCIjc2F2ZS1uYW1lLWlucHV0XCIpLnZhbCgpO1xuICBpZiggbmFtZS5sZW5ndGggPT0gMCApIHsgLy8gd2UgYWx3YXlzIHdhbnQgYSBuYW1lLCBhbGVydCBhbmQgcXVpdFxuICAgIF9zZXRTYXZlTWVzc2FnZSgnUGxlYXNlIHByb3ZpZGUgYSBmaWxlbmFtZS4nLCdpbmZvJyk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gc2VlIHdoYXQga2luZCBvZiBmaWxlIHdlIGFyZSBjcmVhdGluZyBiYXNlZCBvbiB0aGUgc2F2ZU1pbWVUeXBlIHZhclxuICBpZiggc2F2ZU1pbWVUeXBlID09IE1JTUVfVFlQRSApIHtcbiAgICBkYXRhID0gYXBwLmdldE1vZGVsSU8oKS5leHBvcnRTZXR1cCgpO1xuICB9IGVsc2UgaWYgKCBzYXZlTWltZVR5cGUgPT0gVFJFRV9NSU1FX1RZUEUgKSB7XG4gICAgZGF0YSA9IGFwcC5nZXRNb2RlbElPKCkuZXhwb3J0U2V0dXAoKS50cmVlO1xuICB9IGVsc2UgeyAvLyBiYWRuZXNzXG4gICAgYWxlcnQoXCJVbmtub3duIE1JTUVfVFlQRTogXCIrc2F2ZU1pbWVUeXBlKTtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBzZXQgdGhlIHVzZXIga25vdyB3aGF0IHdlIGFyZSBkb2luZ1xuICBfc2V0U2F2ZU1lc3NhZ2UoJzxpIGNsYXNzPVwiaWNvbi1zcGlubmVyIGljb24tc3BpblwiPjwvaT4gU2F2aW5nIEZpbGUuLi4nLCdpbmZvJyk7XG5cbiAgLy8gc2F2ZSB0aGUgZmlsZVxuICBzYXZlRmlsZShuYW1lLFxuICAgICAgJChcIiNzYXZlLWRlc2NyaXB0aW9uLWlucHV0XCIpLnZhbCgpLFxuICAgICAgc2F2ZU1pbWVUeXBlLFxuICAgICAgZGF0YSxcbiAgICAgIGZ1bmN0aW9uKHJlc3ApIHtcbiAgICAgICAgLy8gbGV0IHRoZSB1c2VyIGtub3cgd2hhdCBoYXBwZW5lZFxuICAgICAgICBpZiggcmVzcC5lcnJvciApIHJldHVybiBfc2V0U2F2ZU1lc3NhZ2UoJ0ZhaWxlZCB0byBzYXZlIHRvIEdvb2dsZSBEcml2ZSA6KCcsJ2RhbmdlcicpO1xuICAgICAgICBlbHNlIF9zZXRTYXZlTWVzc2FnZSgnU3VjZXNzZnVsbHkgc2F2ZWQuJywnc3VjY2VzcycpO1xuXG4gICAgICAgIC8vIHdhaXQgYSB0aWNrIHRvIGhpZGUgdGhlIHBvcHVwLCBzbyB1c2VyIHNlZXMgc3VjY2VzcyBtZXNzYWdlXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAkKFwiI3NhdmUtbW9kYWxcIikubW9kYWwoJ2hpZGUnKTtcbiAgICAgICAgfSwxNTAwKTtcblxuICAgICAgICAvLyBzaG93IHRoZSBzaGFyZSBidG5cbiAgICAgICAgaWYoIHNhdmVNaW1lVHlwZSA9PSBNSU1FX1RZUEUgKSB7XG4gICAgICAgICAgLy8gd2UgaGF2ZSBhIG5ldyBmaWxlLCB1cGRhdGUgb3VyIGxpc3RcbiAgICAgICAgICBfdXBkYXRlRmlsZUxpc3QoKTtcblxuICAgICAgICAgIC8vIHNob3cgdGhlIHNoYXJlIGJ0bnNcbiAgICAgICAgICAkKFwiI3NoYXJlLWJ0blwiKS5wYXJlbnQoKS5zaG93KCk7XG4gICAgICAgICAgJChcIiNvcGVuLWluLWRyaXZlXCIpLmF0dHIoXCJocmVmXCIsXCJodHRwczovL2RvY3MuZ29vZ2xlLmNvbS9maWxlL2QvXCIrcmVzcC5pZCkucGFyZW50KCkuc2hvdygpO1xuXG4gICAgICAgICAgLy8gc2V0IHRoZSBsb2FkZWQgZmlsZSBpZFxuICAgICAgICAgIGxvYWRlZEZpbGUgPSByZXNwLmlkO1xuICAgICAgICB9IGVsc2UgaWYgKCBzYXZlTWltZVR5cGUgPT0gVFJFRV9NSU1FX1RZUEUgKSB7XG4gICAgICAgICAgLy8gd2UgaGF2ZSBhIG5ldyB0cmVlLCB1cGRhdGUgdGhlIGxpc3RcbiAgICAgICAgICBfdXBkYXRlVHJlZUxpc3QoKTtcblxuICAgICAgICAgIC8vIHNob3cgdGhlIHRyZWUgc2hhcmUgYnRuc1xuICAgICAgICAgICQoXCIjc2hhcmUtdHJlZS1idG5cIikuc2hvdygpO1xuICAgICAgICAgICQoXCIjbG9hZGVkLXRyZWUtbmFtZVwiKS5odG1sKG5hbWUpLnBhcmVudCgpLnNob3coKTtcblxuICAgICAgICAgIC8vIHNldCB0aGUgbG9hZGVkIHRyZWVzXG4gICAgICAgICAgbG9hZGVkVHJlZSA9IHJlc3AuaWQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgKTtcbn1cblxuLyoqKlxuICogVXBkYXRlIHRoZSBjdXJyZW50bHkgbG9hZGVkIGdvb2dsZSBkcml2ZSBmaWxlXG4gKioqL1xuZnVuY3Rpb24gX3VwZGF0ZUN1cnJlbnRGaWxlKCkge1xuICBnYSgnc2VuZCcsICdldmVudCcsICd1aScsICdpbnRlcmFjdGlvbicsICd1cGRhdGUtZHJpdmUtZmlsZScsIDEpO1xuXG4gIC8vIGxldCB0aGUgdXNlciBrbm93IHdoYXQgd2UgYXJlIGRvaW5nXG4gIF9zZXRTYXZlTWVzc2FnZSgnPGkgY2xhc3M9XCJpY29uLXNwaW5uZXIgaWNvbi1zcGluXCI+PC9pPiBVcGRhdGluZy4uLicsJ2luZm8nKTtcblxuICB2YXIgZmlsZSA9IHt9O1xuICB2YXIgZGF0YSA9IHt9O1xuXG4gIC8vIGdyYWIgdGhlIGNvcnJlbnQgZGF0YSBhbmQgZmlsZWlkIGJhc2VkIG9uIG1pbWVUeXBlXG4gIGlmKCBzYXZlTWltZVR5cGUgPT0gTUlNRV9UWVBFICkge1xuICAgIGZpbGUgPSBsb2FkZWRGaWxlO1xuICAgIGRhdGEgPSBhcHAuZ2V0TW9kZWxJTygpLmV4cG9ydFNldHVwKCk7XG4gIH0gZWxzZSBpZiAoIHNhdmVNaW1lVHlwZSA9PSBUUkVFX01JTUVfVFlQRSApIHtcbiAgICBmaWxlID0gbG9hZGVkVHJlZTtcbiAgICBkYXRhID0gYXBwLmdldE1vZGVsSU8oKS5leHBvcnRTZXR1cCgpLnRyZWU7XG4gIH0gZWxzZSB7IC8vIGJhZG5lc3NcbiAgICBhbGVydChcIlVua25vd24gTUlNRV9UWVBFOiBcIitzYXZlTWltZVR5cGUpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIHVwZGF0ZSB0aGUgZ29vZ2xlIGRyaXZlIGZpbGVcbiAgdXBkYXRlRmlsZShmaWxlLFxuICAgICAgZGF0YSxcbiAgICAgIGZ1bmN0aW9uKHJlc3Ape1xuICAgICAgICAvLyBsZXQgdGhlIHVzZXIga25vdyB3aGF0IGhhcHBlbmVkXG4gICAgICAgIGlmKCByZXNwLmVycm9yICkgcmV0dXJuIF9zZXRTYXZlTWVzc2FnZSgnRmFpbGVkIHRvIHVwZGF0ZSBvbiBHb29nbGUgRHJpdmUgOignLCdkYW5nZXInKTtcbiAgICAgICAgZWxzZSBfc2V0U2F2ZU1lc3NhZ2UoJ1VwZGF0ZSBTdWNjZXNzZnVsLicsJ3N1Y2Nlc3MnKTtcblxuICAgICAgICAvLyB3YWl0IGEgdGljayBzbyB0aGUgdXNlciBrbm93cyB1cGRhdGUgd2FzIHN1Y2Nlc3NcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICQoXCIjc2F2ZS1tb2RhbFwiKS5tb2RhbCgnaGlkZScpO1xuICAgICAgICB9LDE1MDApO1xuXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgbGlzdCBmb3Igd2hhdGV2ZXIgdHlwZSB3YXMgdXBkYXRlZFxuICAgICAgICBpZiggc2F2ZU1pbWVUeXBlID09IE1JTUVfVFlQRSApIHtcbiAgICAgICAgICBfdXBkYXRlRmlsZUxpc3QoKTtcbiAgICAgICAgfSBlbHNlIGlmICggc2F2ZU1pbWVUeXBlID09IFRSRUVfTUlNRV9UWVBFICkge1xuICAgICAgICAgIF91cGRhdGVUcmVlTGlzdCgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICk7XG59XG5cbi8qKipcbiAqIHNldCBhIG1lc3NhZ2UgZm9yIHRoZSAnbG9hZCBmcm9tIGRyaXZlJyBwb3B1cC5cbiAqICB0eXBlIC0gYm9vc3RyYXAgYWxlcnQgdHlwZVxuICoqKi9cbmZ1bmN0aW9uIF9zZXRMb2FkTWVzc2FnZShtc2csIHR5cGUpIHtcbiAgaWYoICFtc2cgKSByZXR1cm4gJChcIiNnZHJpdmUtZmlsZS1tc2dcIikuaHRtbChcIlwiKTtcbiAgJCgnI2dkcml2ZS1maWxlLW1zZycpLmh0bWwoJzxkaXYgY2xhc3M9XCJhbGVydCBhbGVydC0nK3R5cGUrJ1wiPicrbXNnKyc8L2Rpdj4nKTtcbn1cblxuLyoqKlxuICogc2V0IGEgbWVzc2FnZSBmb3IgdGhlICdzYXZlIHRvIGRyaXZlJyBwb3B1cFxuICogdHlwZSAtIGJvb3N0cmFwIGFsZXJ0IHR5cGVcbiAqKiovXG5mdW5jdGlvbiBfc2V0U2F2ZU1lc3NhZ2UobXNnLCB0eXBlKSB7XG4gIGlmKCAhbXNnICkgcmV0dXJuICQoXCIjZ2RyaXZlLXNhdmUtbXNnXCIpLmh0bWwoXCJcIik7XG4gICQoJyNnZHJpdmUtc2F2ZS1tc2cnKS5odG1sKCc8ZGl2IGNsYXNzPVwiYWxlcnQgYWxlcnQtJyt0eXBlKydcIj4nK21zZysnPC9kaXY+Jyk7XG59XG5cbi8qKipcbiAqIGNyZWF0ZSB0aGUgdG9wIHJpZ2h0IG1lbnUuIFRoaXMgbWVudSBpcyBmb3Igd2hlbiB0aGUgdXNlciBpcyBub3QgbG9nZ2VkIGluXG4gKioqL1xuZnVuY3Rpb24gX2NyZWF0ZUxvZ2luQnRuKCkge1xuICB2YXIgYnRuID0gJCgnPGxpIGNsYXNzPVwiZHJvcGRvd25cIj4nXG4gICAgICArICc8YSBjbGFzcz1cImRyb3Bkb3duLXRvZ2dsZVwiIHN0eWxlPVwiY3Vyc29yOnBvaW50ZXJcIj5Mb2dpbjxiIGNsYXNzPVwiY2FyZXRcIj48L2I+PC9hPidcbiAgICAgICsgJzx1bCBjbGFzcz1cImRyb3Bkb3duLW1lbnVcIj4nXG4gICAgICArICc8bGk+PGEgaWQ9XCJoZWxwXCI+PGkgY2xhc3M9XCJpY29uLXF1ZXN0aW9uLXNpZ25cIj48L2k+IEhlbHA8L2E+PC9saT4nXG4gICAgICArICc8bGk+PGEgaWQ9XCJhYm91dFwiPjxpIGNsYXNzPVwiaWNvbi1pbmZvLXNpZ25cIj48L2k+IEFib3V0PC9hPjwvbGk+J1xuICAgICAgKyAnPGxpPjxhIGlkPVwibG9naW4td2l0aC1nb29nbGVcIj48aSBjbGFzcz1cImljb24tc2lnbmluXCI+PC9pPiBMb2dpbiB3aXRoIEdvb2dsZTwvYT48L2xpPidcbiAgICAgICsgJzwvdWw+PC9saT4nKTtcblxuICAvLyBzZXQgY2xpY2sgaGFuZGxlcnMgZm9yIHBvcHVwXG4gIGJ0bi5maW5kKCdhLmRyb3Bkb3duLXRvZ2dsZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgJCh0aGlzKS5wYXJlbnQoKS50b2dnbGVDbGFzcygnb3BlbicpO1xuICB9KTtcblxuICAvLyBhYm91dCBjbGljayBoYW5kbGVyXG4gIGJ0bi5maW5kKCcjYWJvdXQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICBidG4udG9nZ2xlQ2xhc3MoJ29wZW4nKTtcbiAgICAkKFwiI2Fib3V0LW1vZGFsXCIpLm1vZGFsKCdzaG93Jyk7XG4gIH0pO1xuXG4gIGJ0bi5maW5kKCcjaGVscCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgIGJ0bi50b2dnbGVDbGFzcygnb3BlbicpO1xuICAgIHNob3dIZWxwKCk7XG4gIH0pO1xuXG4gIC8vIGxvZ2luIGNsaWNrIGhhbmRsZXJcbiAgYnRuLmZpbmQoJyNsb2dpbi13aXRoLWdvb2dsZScpLm9uKCdjbGljaycsZnVuY3Rpb24oKSB7XG4gICAgZ2EoJ3NlbmQnLCAnZXZlbnQnLCAndWknLCAnaW50ZXJhY3Rpb24nLCAndXNlci1sb2dpbicsIDEpO1xuICAgIGJ0bi50b2dnbGVDbGFzcygnb3BlbicpO1xuICAgIHNpZ25JbihmdW5jdGlvbih0b2tlbikge1xuICAgICAgX3NldFVzZXJJbmZvKCk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIC8vIGFkZCBtZW51XG4gICQoXCIjbG9naW4taGVhZGVyXCIpLmh0bWwoXCJcIikuYXBwZW5kKGJ0bik7XG59O1xuXG4vKioqXG4gKiBDcmVhdGUgdGhlIHRvcCByaWdodCBtZW51IGZvciB3aGVuIHRoZSB1c2VyIGlzIGxvZ2dlZCBpblxuICoqKi9cbmZ1bmN0aW9uIF9jcmVhdGVMb2dvdXRCdG4odXNlcmRhdGEpIHtcbiAgLy8gc2V0IGJ0biBodG1sXG4gIHZhciBidG4gPSAkKCc8bGkgY2xhc3M9XCJkcm9wZG93blwiPidcbiAgICAgICsgJzxhIGNsYXNzPVwiZHJvcGRvd24tdG9nZ2xlXCIgc3R5bGU9XCJjdXJzb3I6cG9pbnRlclwiPjxpbWcgY2xhc3M9XCJpbWctcm91bmRlZFwiIHNyYz1cIicrdXNlcmRhdGEucGljdHVyZVxuICAgICAgKyAnXCIgc3R5bGU9XCJtYXJnaW46LTVweCA1cHggLTVweCAwO3dpZHRoOjI4cHg7aGVpZ2h0OjI4cHg7Ym9yZGVyOjFweCBzb2xpZCB3aGl0ZVwiIC8+ICcgKyB1c2VyZGF0YS5uYW1lXG4gICAgICArICc8YiBjbGFzcz1cImNhcmV0XCI+PC9iPjwvYT4nICsgJzx1bCBjbGFzcz1cImRyb3Bkb3duLW1lbnVcIj4nXG4gICAgICArICc8bGk+PGEgaWQ9XCJzYXZlXCI+PGkgY2xhc3M9XCJpY29uLWNsb3VkLXVwbG9hZFwiPjwvaT4gU2F2ZSBNb2RlbDwvYT48L2xpPidcbiAgICAgICsgJzxsaSBzdHlsZT1cImRpc3BsYXk6bm9uZVwiPjxhIGlkPVwic2hhcmUtYnRuXCI+PGkgY2xhc3M9XCJpY29uLXNoYXJlXCI+PC9pPiBTaGFyZSBNb2RlbDwvYT48L2xpPidcbiAgICAgICsgJzxsaSBzdHlsZT1cImRpc3BsYXk6bm9uZVwiPjxhIGlkPVwib3Blbi1pbi1kcml2ZVwiIHRhcmdldD1cIl9ibGFua1wiPjxpIGNsYXNzPVwiaWNvbi1leHRlcm5hbC1saW5rLXNpZ25cIj48L2k+IE9wZW4gaW4gR29vZ2xlIERyaXZlPC9hPjwvbGk+J1xuICAgICAgKyAnPGxpPjxhIGlkPVwibG9hZFwiPjxpIGNsYXNzPVwiaWNvbi1jbG91ZC1kb3dubG9hZFwiPjwvaT4gTG9hZCBNb2RlbDwvYT48L2xpPidcbiAgICAgICsgJzxsaT48YSBpZD1cImhlbHBcIj48aSBjbGFzcz1cImljb24tcXVlc3Rpb24tc2lnblwiPjwvaT4gSGVscDwvYT48L2xpPidcbiAgICAgICsgJzxsaT48YSBpZD1cImFib3V0XCI+PGkgY2xhc3M9XCJpY29uLWluZm8tc2lnblwiPjwvaT4gQWJvdXQ8L2E+PC9saT4nXG4gICAgICArICc8bGk+PGEgaWQ9XCJsb2dvdXRcIj48aSBjbGFzcz1cImljb24tc2lnbm91dFwiPjwvaT4gTG9nb3V0PC9hPjwvbGk+J1xuICAgICAgKyAnPC91bD48L2xpPicpO1xuXG4gIC8vIGFkZCBjbGljayBoYW5kbGVyIHRvIHNob3cgbWVudVxuICBidG4uZmluZCgnYS5kcm9wZG93bi10b2dnbGUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICQodGhpcykucGFyZW50KCkudG9nZ2xlQ2xhc3MoJ29wZW4nKTtcbiAgfSk7XG5cbiAgLy8gc2hvdyB0aGUgc2F2ZSBwb3B1cFxuICBidG4uZmluZCgnI3NhdmUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAvLyBzZXQgdGhlIGN1cnJlbnQgc2F2ZSBtaW1lVHlwZVxuICAgIHNhdmVNaW1lVHlwZSA9IE1JTUVfVFlQRTtcblxuICAgIC8vIGxldCB0aGUgdXNlciBrbm93IHdoYXQgdHlwIHRoZXkgYXJlIHNhdmluZ1xuICAgICQoXCIjZ2RyaXZlLXNhdmUtc3ViaGVhZGVyXCIpLmh0bWwoXCI8aDU+U2F2ZSBNb2RlbDwvaDU+XCIpO1xuXG4gICAgYnRuLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XG5cbiAgICAvLyBpZiB0aGUgZmlsZSBpcyBsb2FkZWQsIHNob3cgdGhlIHVwZGF0ZSBwYW5lbFxuICAgIGlmKCBsb2FkZWRGaWxlICE9IG51bGwpIHtcbiAgICAgIC8vIGdyYWIgdGhlIGN1cnJlbnQgZmlsZXMgbWV0YWRhdGFcbiAgICAgIHZhciBmaWxlID0ge307XG4gICAgICBmb3IoIHZhciBpID0gMDsgaSA8IGZpbGVMaXN0Lmxlbmd0aDsgaSsrICkge1xuICAgICAgICBpZiggZmlsZUxpc3RbaV0uaWQgPT0gbG9hZGVkRmlsZSkge1xuICAgICAgICAgIGZpbGUgPSBmaWxlTGlzdFtpXTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBzaG93IHRoZSB1cGRhdGUgcGFuZWxcbiAgICAgICQoXCIjc2F2ZS11cGRhdGUtcGFuZWxcIikuc2hvdygpO1xuXG4gICAgICAvLyByZW5kZXIgdGhlIGZpbGVzIG1ldGFkYXRhIGluIHRoZSB1cGRhdGUgcGFuZWxcbiAgICAgIHZhciBkID0gbmV3IERhdGUoZmlsZS5tb2RpZmllZERhdGUpO1xuICAgICAgJChcIiNzYXZlLXVwZGF0ZS1wYW5lbC1pbm5lclwiKS5odG1sKFwiPGI+XCIrZmlsZS50aXRsZStcIjwvYj48YnIgLz5cIiArXG4gICAgICAgICAgXCI8c3BhbiBzdHlsZT0nY29sb3I6Izg4OCc+XCIrZmlsZS5kZXNjcmlwdGlvbitcIjwvc3Bhbj48YnIgLz5cIitcbiAgICAgICAgICBcIjxzcGFuIHN0eWxlPSdmb250LXN0eWxlOml0YWxpYztmb250LXNpemU6MTFweDsnPkxhc3QgTW9kaWZpZWQ6IFwiICtcbiAgICAgICAgICBkLnRvRGF0ZVN0cmluZygpK1wiIFwiK2QudG9Mb2NhbGVUaW1lU3RyaW5nKCkrXCIgYnkgXCIrZmlsZS5sYXN0TW9kaWZ5aW5nVXNlck5hbWUrXCI8L3NwYW4+PGJyIC8+XCIrXG4gICAgICAgICAgXCI8YSBocmVmPSdodHRwczovL2RyaXZlLmdvb2dsZS5jb20vZmlsZS9kL1wiK2ZpbGUuaWQrXCInJyB0YXJnZXQ9J19ibGFuayc+PGkgY2xhc3M9J2ljb24tbGluayc+PC9pPiBcIiArXG4gICAgICAgICAgXCJMaW5rIHRvIFNoYXJlPC9hPiA8c3BhbiBzdHlsZT0nY29sb3I6Izg4OCc+KG11c3QgaGF2ZSBwZXJtaXNzaW9uKTwvc3Bhbj48YnIgLz48YnIgLz5cIik7XG4gICAgfSBlbHNlIHtcbiAgICAgICQoXCIjc2F2ZS11cGRhdGUtcGFuZWxcIikuaGlkZSgpO1xuICAgIH1cblxuICAgIC8vIGNsZWFyIGFueSBtZXNzYWdlXG4gICAgX3NldFNhdmVNZXNzYWdlKG51bGwpO1xuXG4gICAgLy8gc2hvdyB0aGUgc2F2ZSBwb3B1cFxuICAgICQoXCIjc2F2ZS1tb2RhbFwiKS5tb2RhbCgnc2hvdycpO1xuICB9KTtcblxuICAvLyBjbGljayBoYW5kbGVyIGZvciBzaGFyZSBidG5cbiAgYnRuLmZpbmQoXCIjc2hhcmUtYnRuXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgZ2EoJ3NlbmQnLCAnZXZlbnQnLCAndWknLCAnaW50ZXJhY3Rpb24nLCAnb3Blbi1kcml2ZS1zaGFyZScsIDEpO1xuXG4gICAgLy8gaGFzIHRoZSBzaGFyZSBjbGllbnQgYmVlbiBsb2FkZWRcbiAgICBpZiggY2xpZW50ID09IG51bGwgKSB7XG4gICAgICAvLyBsb2FkIHRoZSBzaGFyZSBwb3B1cFxuICAgICAgZ2FwaS5sb2FkKCdkcml2ZS1zaGFyZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgIC8vIGNyZWF0ZSBhbmQgc2hvdyB0aGUgc2hhcmUgcG9wdXBcbiAgICAgICAgIGNsaWVudCA9IG5ldyBnYXBpLmRyaXZlLnNoYXJlLlNoYXJlQ2xpZW50KE9hdXRoLkFQUF9JRCk7XG4gICAgICAgICAgY2xpZW50LnNldEl0ZW1JZHMoW2xvYWRlZEZpbGVdKTtcbiAgICAgICAgIGNsaWVudC5zaG93U2V0dGluZ3NEaWFsb2coKTtcbiAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gc2hvdyB0aGUgc2hhcmUgcG9wdXBcbiAgICAgIGNsaWVudC5zZXRJdGVtSWRzKFtsb2FkZWRGaWxlXSk7XG4gICAgICAgY2xpZW50LnNob3dTZXR0aW5nc0RpYWxvZygpO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gc2hvdyBhYm91dCBwYW5lbFxuICBidG4uZmluZCgnI2Fib3V0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgYnRuLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XG4gICAgJChcIiNhYm91dC1tb2RhbFwiKS5tb2RhbCgnc2hvdycpO1xuICB9KTtcblxuICBidG4uZmluZCgnI2hlbHAnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICBidG4udG9nZ2xlQ2xhc3MoJ29wZW4nKTtcbiAgICBzaG93SGVscCgpO1xuICB9KTtcblxuICAvLyBzaG93IHRoZSAnbG9hZCBmcm9tIGRyaXZlJyBwYW5lbFxuICBidG4uZmluZCgnI2xvYWQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICBidG4udG9nZ2xlQ2xhc3MoJ29wZW4nKTtcblxuICAgIC8vIGhpZGUgYW55IGV4aXN0aW5nIG1lc3NhZ2VcbiAgICBfc2V0TG9hZE1lc3NhZ2UobnVsbCk7XG5cbiAgICAvLyByZW5kZXIgdGhlIG1vZGVsIGZpbGVzIGluIHRoZSBwb3B1cCBmaWxlc1xuICAgIF9zaG93RHJpdmVGaWxlcygpO1xuXG4gICAgLy8gc2hvdyB0aGUgbW9kYWxcbiAgICAkKFwiI2xvYWQtbW9kYWxcIikubW9kYWwoJ3Nob3cnKTtcbiAgfSk7XG5cbiAgLy8gbG9hZCB0aGUgdXNlciBvdXRcbiAgYnRuLmZpbmQoJyNsb2dvdXQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICBnYSgnc2VuZCcsICdldmVudCcsICd1aScsICdpbnRlcmFjdGlvbicsICd1c2VyLWxvZ291dCcsIDEpO1xuXG4gICAgYnRuLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XG5cbiAgICAvLyBraWxsIHRoZSBhY2Nlc3MgdG9rZW5cbiAgICB0b2tlbiA9IG51bGw7XG5cbiAgICAvLyB1cGRhdGUgdGhlIG1lbnUgcGFuZWxcbiAgICBfY3JlYXRlTG9naW5CdG4oKTtcbiAgfSk7XG5cbiAgLy8gYXR0YWNoIHRoZSBtZW51XG4gICQoXCIjbG9naW4taGVhZGVyXCIpLmh0bWwoXCJcIikuYXBwZW5kKGJ0bik7XG59O1xuXG4vKioqXG4gKiAgUmVxdWVzdCB0aGUgdXNlcidzIGluZm9ybWF0aW9uLiAgV2hlbiBsb2FkZWQsIHVwZGF0ZSB0aGUgdG9wIHJpZ2h0IG1lbnVcbiAqKiovXG5mdW5jdGlvbiBfc2V0VXNlckluZm8oKSB7XG4gIC8vIGxvYWQgdXNlciBuYW1lXG4gICQuYWpheCh7XG4gICAgdXJsIDogXCJodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9vYXV0aDIvdjEvdXNlcmluZm9cIixcbiAgICBiZWZvcmVTZW5kIDogZnVuY3Rpb24ocmVxdWVzdCkge1xuICAgICAgLy8gYWx3YXlzIHNldCB5b3VyIGFjY2VzcyBzdG9rZW5cbiAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihcIkF1dGhvcml6YXRpb25cIiwnQmVhcmVyICcrIHRva2VuLmFjY2Vzc190b2tlbik7XG4gICAgfSxcbiAgICBzdWNjZXNzIDogZnVuY3Rpb24oZGF0YSwgc3RhdHVzLHhocikge1xuICAgICAgLy8gcGFyc2UgeW91ciBqc29uIHJlc3BvbnNlXG4gICAgICB0cnkge1xuICAgICAgICBkYXRhID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHt9XG5cbiAgICAgIC8vIHVwZGF0ZSB0b3AgcmlnaHQgbWVudVxuICAgICAgX2NyZWF0ZUxvZ291dEJ0bihkYXRhKTtcblxuICAgICAgLy8gc2V0IHRvIHdpbmRvdyBzY29wZVxuICAgICAgd2luZG93LnVzZXJpbmZvID0gZGF0YTtcbiAgICB9LFxuICAgIGVycm9yIDogZnVuY3Rpb24oKSB7XG4gICAgICAvLyBUT0RPOiBzaG91bGQgd2UgYWxlcnQgdGhpcz9cbiAgICB9XG4gIH0pO1xuXG4gIC8vIGxvYWQgdXNlciBmaWxlcywgdHJlZXNcbiAgX3VwZGF0ZUZpbGVMaXN0KCk7XG4gIF91cGRhdGVUcmVlTGlzdCgpO1xufVxuXG4vKioqXG4gKiAgU2VhcmNoIGZvciB0aGUgdXNlcnMgbW9kZWxzXG4gKlxuICogVE9ETzogYWRkIHNlYXJjaCB0byB0aGUgZm9sbG93aW5nIGZ1bmN0aW9ucyxcbiAqICBsaW1pdCB0byAxMCByZXN1bHRzXG4gKioqL1xuZnVuY3Rpb24gX3VwZGF0ZUZpbGVMaXN0KCkge1xuICBsaXN0RmlsZXMoXCJtaW1lVHlwZSA9ICdcIitNSU1FX1RZUEUrXCInXCIsIGZ1bmN0aW9uKHJlc3Ape1xuICAgIGZpbGVMaXN0ID0gcmVzcC5yZXN1bHQuaXRlbXM7XG4gIH0pO1xufVxuXG4vKioqXG4gKiAgU2VhcmNoIGZvciB0aGUgdXNlcnMgdHJlZXNcbiAqXG4gKiBUT0RPOiBhZGQgc2VhcmNoIHRvIHRoZSBmb2xsb3dpbmcgZnVuY3Rpb25zLFxuICogIGxpbWl0IHRvIDEwIHJlc3VsdHNcbiAqKiovXG5mdW5jdGlvbiBfdXBkYXRlVHJlZUxpc3QoKSB7XG4gIGxpc3RGaWxlcyhcIm1pbWVUeXBlID0gJ1wiK1RSRUVfTUlNRV9UWVBFK1wiJ1wiLCBmdW5jdGlvbihyZXNwKXtcbiAgICB0cmVlTGlzdCA9IHJlc3AucmVzdWx0Lml0ZW1zO1xuICB9KTtcbn1cblxuLyoqKlxuICogIFJlbmRlciB0aGUgdXNlcnMgY3VycmVudCBtb2RlbHMgb250byB0aGUgJ2xvYWQgZnJvbSBkcml2ZScgcG9wdXBcbiAqKiovXG5mdW5jdGlvbiBfc2hvd0RyaXZlRmlsZXMoKSB7XG4gIC8vIGlmIHRoZXkgaGF2ZSBubyBmaWxlcywgc2F5IHNvIGFuZCBnZXQgb3V0IG9mIGhlcmVcbiAgaWYoICFmaWxlTGlzdCApIHJldHVybiAkKFwiI2dkcml2ZS1maWxlLWxpc3RcIikuaHRtbChcIjxsaT5ObyBGaWxlczwvbGk+XCIpO1xuICBpZiggZmlsZUxpc3QubGVuZ3RoID09IDAgKSByZXR1cm4gJChcIiNnZHJpdmUtZmlsZS1saXN0XCIpLmh0bWwoXCI8bGk+Tm8gRmlsZXM8L2xpPlwiKTtcblxuICAvLyBzaG93IGEgdGl0bGUsIHRoZXJlIGFyZSBtdWx0aXBsZSB0eXBlcyB0aGF0IGNhbiBiZSBsb2FkZWQgZnJvbSBkcml2ZVxuICAkKFwiI2dkcml2ZS1maWxlLWxpc3RcIikuaHRtbChcIjxoND5TZWxlY3QgRmlsZTwvaDQ+XCIpO1xuXG4gIC8vIGNyZWF0ZSB0aGUgbGlzdCBlbGVtZW50cyBmb3IgZWFjaCBmaWxlcyBtZXRhZGF0YVxuICBmb3IoIHZhciBpID0gMDsgaSA8IGZpbGVMaXN0Lmxlbmd0aDsgaSsrICkge1xuICAgIHZhciBpdGVtID0gZmlsZUxpc3RbaV07XG4gICAgdmFyIGQgPSBuZXcgRGF0ZShpdGVtLm1vZGlmaWVkRGF0ZSk7XG4gICAgJChcIiNnZHJpdmUtZmlsZS1saXN0XCIpLmFwcGVuZChcbiAgICAgICQoXCI8bGkgY2xhc3M9J2xpc3QtZ3JvdXAtaXRlbSc+PGEgaWQ9J1wiK2l0ZW0uaWQrXCInIHVybD0nXCIraXRlbS5kb3dubG9hZFVybCtcIicgc3R5bGU9J2N1cnNvcjpwb2ludGVyJz48aSBjbGFzcz0naWNvbi1maWxlJz48L2k+IFwiK2l0ZW0udGl0bGUrXCI8L2E+XCIgK1xuICAgICAgICBcIjxkaXYgc3R5bGU9J2NvbG9yOiM4ODg7cGFkZGluZzogNXB4IDAgMCAxMHB4Jz5cIitpdGVtLmRlc2NyaXB0aW9uK1wiPC9kaXY+XCIrXG4gICAgICAgIFwiPGRpdiBzdHlsZT0nZm9udC1zdHlsZTppdGFsaWM7Zm9udC1zaXplOjExcHg7cGFkZGluZy1sZWZ0OjEwcHgnPkxhc3QgTW9kaWZpZWQ6IFwiK2QudG9EYXRlU3RyaW5nKCkrXCIgXCIrZC50b0xvY2FsZVRpbWVTdHJpbmcoKStcIiBieSBcIitpdGVtLmxhc3RNb2RpZnlpbmdVc2VyTmFtZStcIjxkaXY+PC9saT5cIlxuICAgICAgICApXG4gICAgKTtcbiAgfVxuXG4gIC8vIGFkZCBjbGljayBoYW5kbGVyIGZvciBlYWNoIGZpbGVcbiAgJChcIiNnZHJpdmUtZmlsZS1saXN0IGFcIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICBnYSgnc2VuZCcsICdldmVudCcsICd1aScsICdpbnRlcmFjdGlvbicsICdsb2FkLWRyaXZlLW1vZGVsJywgMSk7XG5cbiAgICB2YXIgaWQgPSAkKHRoaXMpLmF0dHIoXCJpZFwiKTtcblxuICAgIC8vIGxldCB0aGUgdXNlciBrbm93IHdoYXQgd2UgYXJlIGRvaW5nXG4gICAgX3NldExvYWRNZXNzYWdlKCc8aSBjbGFzcz1cImljb24tc3Bpbm5lciBpY29uLXNwaW5cIj48L2k+IExvYWRpbmcgRmlsZS4uLicsJ2luZm8nKTtcblxuICAgIC8vIGdyYWIgdGhlIGZpdmUgZnJvbSBkcml2ZVxuICAgIGdldEZpbGUoaWQsICQodGhpcykuYXR0cihcInVybFwiKSwgZnVuY3Rpb24oZmlsZSkge1xuICAgICAgLy8gaWYgYmFkbmVzcywgbGV0IHRoZSB1c2VyIGtub3dcbiAgICAgIGlmKCAhZmlsZSAgKSByZXR1cm4gX3NldExvYWRNZXNzYWdlKCdGYWlsZWQgdG8gbG9hZCBmaWxlIGZyb20gR29vZ2xlIERyaXZlIDooJywnZGFuZ2VyJyk7XG4gICAgICBpZiggZmlsZS5lcnJvciAgKSByZXR1cm4gX3NldExvYWRNZXNzYWdlKCdGYWlsZWQgdG8gbG9hZCBmaWxlIGZyb20gR29vZ2xlIERyaXZlIDooJywnZGFuZ2VyJyk7XG5cbiAgICAgIC8vIGhpZGUgYW55IGxvYWRlZCB0cmVlcyxcbiAgICAgICQoXCIjc2hhcmUtdHJlZS1idG5cIikuaGlkZSgpO1xuICAgICAgJChcIiNsb2FkZWQtdHJlZS1uYW1lXCIpLmh0bWwoXCJcIikucGFyZW50KCkuaGlkZSgpO1xuICAgICAgbG9hZGVkVHJlZSA9IG51bGw7XG5cbiAgICAgIC8vIGxldCB0aGUgdXNlciBrbm93IHdlIGFyZSBhbGwgZ29vZFxuICAgICAgX3NldExvYWRNZXNzYWdlKCdGaWxlIExvYWRlZC4nLCdzdWNjZXNzJyk7XG5cbiAgICAgIC8vIHNldCB0aGUgbG9hZGVkIGZpbGUgaWRcbiAgICAgIGxvYWRlZEZpbGUgPSBpZDtcblxuICAgICAgLy8gc2V0IHRoZSBsb2FkZWQgZmlsZSBuYW1lXG4gICAgICBmb3IoIHZhciBpID0gMDsgaSA8IGZpbGVMaXN0Lmxlbmd0aDsgaSsrICkge1xuICAgICAgICBpZiggaWQgPT0gZmlsZUxpc3RbaV0uaWQgKSB7XG4gICAgICAgICAgJChcIiNsb2FkZWQtbW9kZWwtdGl0bGVcIikuaHRtbChcIjxzcGFuIHN0eWxlPSdjb2xvcjojMzMzJz5Mb2FkZWQgTW9kZWwgPC9zcGFuPiBcIitmaWxlTGlzdFtpXS50aXRsZSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gc2hvdyB0aGUgc2hhcmUgYnRuXG4gICAgICAkKFwiI3NoYXJlLWJ0blwiKS5wYXJlbnQoKS5zaG93KCk7XG4gICAgICAkKFwiI29wZW4taW4tZHJpdmVcIikuYXR0cihcImhyZWZcIixcImh0dHBzOi8vZG9jcy5nb29nbGUuY29tL2ZpbGUvZC9cIitpZCkucGFyZW50KCkuc2hvdygpO1xuXG4gICAgICAvLyBzZXR1cCBtb2RlbFxuICAgICAgYXBwLmdldE1vZGVsSU8oKS5sb2FkU2V0dXAoaWQsIGZpbGUpO1xuXG4gICAgICAvLyBzZXR1cCByZWFsdGltZSBldmVudHNcbiAgICAgIGdkcml2ZVJULmluaXRSdEFwaShsb2FkZWRGaWxlKTtcblxuICAgICAgLy8gd2FpdCBhIHRpY2sgc28gdXNlciBjYW4gc2VlIHN1Y2Nlc3MgbWVzc2FnZVxuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAvLyBoaWRlIHRoZSBtb2RhbFxuICAgICAgICAkKFwiI2xvYWQtbW9kYWxcIikubW9kYWwoJ2hpZGUnKTtcbiAgICAgIH0sMTUwMCk7XG5cbiAgICB9KTtcbiAgfSk7XG59XG5cbi8qKipcbiAqICBSZW5kZXIgdGhlIHVzZXJzIGN1cnJlbnQgdHJlZXMgb250byB0aGUgJ2xvYWQgZnJvbSBkcml2ZScgcG9wdXBcbiAqKiovXG5mdW5jdGlvbiBfc2hvd1RyZWVGaWxlcygpIHtcbiAgLy8gdXBkYXRlIHRoZSBsaXN0IGhlYWRlciwgbGV0IHVzZXIga25vdyB3aGF0IHRoZXkgYXJlIHNlbGVjdGluZ1xuICAkKFwiI2dkcml2ZS1maWxlLWxpc3RcIikuaHRtbChcIlwiKTtcbiAgJChcIiNnZHJpdmUtZmlsZS1saXN0XCIpLmFwcGVuZCgkKFwiPGxpIGNsYXNzPSdsaXN0LWdyb3VwLWl0ZW0nPjxoNT5TZWxlY3QgVHJlZTwvaDU+PC9saT5cIikpO1xuXG4gIC8vIGlmIHRoZXJlIGFyZSBubyB0cmVlcywgc2F5IHNvIGFuZCBnZXQgb3V0IG9mIGhlcmVcbiAgaWYoICF0cmVlTGlzdCApIHJldHVybiAkKFwiI2dkcml2ZS1maWxlLWxpc3RcIikuYXBwZW5kKCQoXCI8bGkgY2xhc3M9J2xpc3QtZ3JvdXAtaXRlbSc+Tm8gVHJlZXMgQXZhaWxhYmxlPC9saT5cIikpO1xuICBpZiggdHJlZUxpc3QubGVuZ3RoID09IDAgKSByZXR1cm4gJChcIiNnZHJpdmUtZmlsZS1saXN0XCIpLmFwcGVuZCgkKFwiPGxpIGNsYXNzPSdsaXN0LWdyb3VwLWl0ZW0nPk5vIFRyZWVzIEF2YWlsYWJsZTwvbGk+XCIpKTtcblxuICAvLyBjcmVhdGUgdGhlIHRyZWUgbGlzdCBlbGVtZW50c1xuICBmb3IoIHZhciBpID0gMDsgaSA8IHRyZWVMaXN0Lmxlbmd0aDsgaSsrICkge1xuICAgIHZhciBpdGVtID0gdHJlZUxpc3RbaV07XG4gICAgdmFyIGQgPSBuZXcgRGF0ZShpdGVtLm1vZGlmaWVkRGF0ZSk7XG4gICAgJChcIiNnZHJpdmUtZmlsZS1saXN0XCIpLmFwcGVuZChcbiAgICAgICQoXCI8bGkgY2xhc3M9J2xpc3QtZ3JvdXAtaXRlbSc+PGEgaWQ9J1wiK2l0ZW0uaWQrXCInIG5hbWU9J1wiK2l0ZW0udGl0bGUrXCInIHVybD0nXCIraXRlbS5kb3dubG9hZFVybCtcIicgc3R5bGU9J2N1cnNvcjpwb2ludGVyJz48aSBjbGFzcz0naWNvbi1sZWFmJz48L2k+IFwiK2l0ZW0udGl0bGUrXCI8L2E+XCIgK1xuICAgICAgICBcIjxkaXYgc3R5bGU9J2NvbG9yOiM4ODg7cGFkZGluZzogNXB4IDAgMCAxMHB4Jz5cIitpdGVtLmRlc2NyaXB0aW9uK1wiPC9kaXY+XCIrXG4gICAgICAgIFwiPGRpdiBzdHlsZT0nZm9udC1zdHlsZTppdGFsaWM7Zm9udC1zaXplOjExcHg7cGFkZGluZy1sZWZ0OjEwcHgnPkxhc3QgTW9kaWZpZWQ6IFwiK2QudG9EYXRlU3RyaW5nKCkrXCIgXCIrZC50b0xvY2FsZVRpbWVTdHJpbmcoKStcIiBieSBcIitpdGVtLmxhc3RNb2RpZnlpbmdVc2VyTmFtZStcIjxkaXY+PC9saT5cIlxuICAgICAgICApXG4gICAgKTtcbiAgfVxuXG4gIC8vIGFkZCBjbGljayBoYW5kbGVyIGZvciB0aXRsZXNcbiAgJChcIiNnZHJpdmUtZmlsZS1saXN0IGFcIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICBnYSgnc2VuZCcsICdldmVudCcsICd1aScsICdpbnRlcmFjdGlvbicsICdsb2FkLWRyaXZlLXRyZWUnLCAxKTtcblxuICAgIHZhciBpZCA9ICQodGhpcykuYXR0cihcImlkXCIpO1xuICAgIHZhciBuYW1lID0gJCh0aGlzKS5hdHRyKFwibmFtZVwiKTtcblxuICAgIC8vIHRlbGwgdGhlIHVzZXIgd2UgYXJlIGxvYWRpbmdcbiAgICBfc2V0TG9hZE1lc3NhZ2UoJzxpIGNsYXNzPVwiaWNvbi1zcGlubmVyIGljb24tc3BpblwiPjwvaT4gTG9hZGluZyBUcmVlLi4uJywnaW5mbycpO1xuXG4gICAgLy8gbG9hZCBmaWxlIGZyb20gZHJpdmVcbiAgICBnZXRGaWxlKGlkLCAkKHRoaXMpLmF0dHIoXCJ1cmxcIiksIGZ1bmN0aW9uKGZpbGUpIHtcbiAgICAgIC8vIGlmIGJhZG5lc3MsIGxldCB1c2VyIGtub3dcbiAgICAgIGlmKCAhZmlsZSAgKSByZXR1cm4gX3NldExvYWRNZXNzYWdlKCdGYWlsZWQgdG8gbG9hZCB0cmVlIGZyb20gR29vZ2xlIERyaXZlIDooJywnZGFuZ2VyJyk7XG4gICAgICBpZiggZmlsZS5lcnJvciAgKSByZXR1cm4gX3NldExvYWRNZXNzYWdlKCdGYWlsZWQgdG8gbG9hZCB0cmVlIGZyb20gR29vZ2xlIERyaXZlIDooJywnZGFuZ2VyJyk7XG5cbiAgICAgIC8vIHNob3cgdGhlIHRyZWUgc2hhcmluZyBidG5zXG4gICAgICAkKFwiI3NoYXJlLXRyZWUtYnRuXCIpLnNob3coKTtcbiAgICAgICQoXCIjbG9hZGVkLXRyZWUtbmFtZVwiKS5odG1sKG5hbWUpLnBhcmVudCgpLnNob3coKTtcblxuICAgICAgLy8gbGV0IHRoZSB1c2VyIGtub3cgd2UgYXJlIHN1Y2Nlc2Z1bGxcbiAgICAgIF9zZXRMb2FkTWVzc2FnZSgnVHJlZSBMb2FkZWQuJywnc3VjY2VzcycpO1xuXG4gICAgICAvLyBzZXQgdGhlIGxvYWRlZCB0cmVlIGlkXG4gICAgICBsb2FkZWRUcmVlID0gaWQ7XG5cbiAgICAgIC8vIGxvYWRlZCB0cmVlIGludG8gbW9kZWwgLyBVSVxuICAgICAgYXBwLmdldE1vZGVsSU8oKS5sb2FkVHJlZShmaWxlKTtcblxuICAgICAgLy8gd2FpdCBhIHNlYyBzbyB1c2VyIGNhbiBzZWUgc3VjY2VzcyBtZXNzYWdlXG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICQoXCIjbG9hZC1tb2RhbFwiKS5tb2RhbCgnaGlkZScpO1xuICAgICAgfSwxNTAwKTtcblxuICAgIH0pO1xuICB9KTtcbn1cblxuLyoqKlxuICogIHNob3cgdGhlIHVzZXIgdGhlIGxvYWQgdHJlZSBwb3B1cFxuICoqKi9cbmZ1bmN0aW9uIHNob3dMb2FkVHJlZVBhbmVsKCkge1xuICAvLyByZW5kZXIgdGhlIHRyZWVzIGludG8gdGhlIHBvcHVwIGxpc3RcbiAgX3Nob3dUcmVlRmlsZXMoKTtcbiAgLy8gY2xlYXIgYW55IG1lc3NhZ2VzXG4gIF9zZXRMb2FkTWVzc2FnZShudWxsKTtcbiAgLy8gc2hvdyB0aGUgcG9wdXBcbiAgJChcIiNsb2FkLW1vZGFsXCIpLm1vZGFsKCdzaG93Jyk7XG59XG5cbi8qKipcbiAqICBzaG93IHRoZSB1c2VyIHRoZSBzYXZlIHRyZWUgcG9wdXBcbiAqKiovXG5mdW5jdGlvbiBzaG93U2F2ZVRyZWVQYW5lbCgpIHtcbiAgLy8gc2V0IHRoZSBjdXJyZW50IG1pbWVUeXBlIHdlIGFyZSBzYXZpbmdcbiAgc2F2ZU1pbWVUeXBlID0gVFJFRV9NSU1FX1RZUEU7XG5cbiAgLy8gc2V0IHRoZSBoZWFkZXIgc28gdXNlciBrbm93cyB3aGF0IHR5cGUgdGhleSBhcmUgc2F2aW5nXG4gICQoXCIjZ2RyaXZlLXNhdmUtc3ViaGVhZGVyXCIpLmh0bWwoXCI8aDU+U2F2ZSBUcmVlPC9oNT5cIik7XG5cbiAgLy8gaWYgdGhlcmUgaXMgYSBjdXJyZW50IHRyZWUsIHNob3cgdGhlIHVwZGF0ZSBwYW5lbFxuICBpZiggbG9hZGVkVHJlZSAhPSBudWxsKSB7XG4gICAgLy8gZmluZCB0aGUgY3VycmVudCB0cmVlIGJhc2VkIG9uIGlkXG4gICAgdmFyIHRyZWUgPSB7fTtcbiAgICBmb3IoIHZhciBpID0gMDsgaSA8IHRyZWVMaXN0Lmxlbmd0aDsgaSsrICkge1xuICAgICAgaWYoIHRyZWVMaXN0W2ldLmlkID09IGxvYWRlZFRyZWUpIHtcbiAgICAgICAgdHJlZSA9IHRyZWVMaXN0W2ldO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBzaG93IHRoZSB1cGRhdGUgcGFuZWxcbiAgICAkKFwiI3NhdmUtdXBkYXRlLXBhbmVsXCIpLnNob3coKTtcblxuICAgIC8vIHJlbmRlciB0cmVlIG1ldGFkYXRhIG9uIHVwZGF0ZSBwYW5lbFxuICAgIHZhciBkID0gbmV3IERhdGUodHJlZS5tb2RpZmllZERhdGUpO1xuICAgICQoXCIjc2F2ZS11cGRhdGUtcGFuZWwtaW5uZXJcIikuaHRtbChcIjxiPlwiK3RyZWUudGl0bGUrXCI8L2I+PGJyIC8+XCIgK1xuICAgICAgICBcIjxzcGFuIHN0eWxlPSdjb2xvcjojODg4Jz5cIit0cmVlLmRlc2NyaXB0aW9uK1wiPC9zcGFuPjxiciAvPlwiK1xuICAgICAgICBcIjxzcGFuIHN0eWxlPSdmb250LXN0eWxlOml0YWxpYztmb250LXNpemU6MTFweDsnPkxhc3QgTW9kaWZpZWQ6IFwiICtcbiAgICAgICAgZC50b0RhdGVTdHJpbmcoKStcIiBcIitkLnRvTG9jYWxlVGltZVN0cmluZygpK1wiIGJ5IFwiK3RyZWUubGFzdE1vZGlmeWluZ1VzZXJOYW1lK1wiPC9zcGFuPjxiciAvPlwiK1xuICAgICAgICBcIjxhIGhyZWY9J2h0dHBzOi8vZHJpdmUuZ29vZ2xlLmNvbS9maWxlL2QvXCIrdHJlZS5pZCtcIicnIHRhcmdldD0nX2JsYW5rJz48aSBjbGFzcz0naWNvbi1saW5rJz48L2k+IE9wZW4gaW4gR29vZ2xlIERyaXZlPC9hPlwiKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBkb24ndCBzaG93IHRoZSB1cGRhdGUgcGFuZWwsIHRoaXMgaXMgYSBuZXcgdHJlZVxuICAgICQoXCIjc2F2ZS11cGRhdGUtcGFuZWxcIikuaGlkZSgpO1xuICB9XG5cbiAgLy8gY2xlYXIgYW55IG1lc3NhZ2VcbiAgX3NldFNhdmVNZXNzYWdlKG51bGwpO1xuXG4gIC8vIHNob3cgdGhlIHBvcHVwXG4gICQoXCIjc2F2ZS1tb2RhbFwiKS5tb2RhbCgnc2hvdycpO1xufVxuXG4vKioqXG4gKiBMb2FkIGEgbW9kZWwgYmFzZWQgb24gcGFzc2VkIGlkLiAgVGhpcyBmdW5jdGlvbiBpcyByZWFsbHkgb25seSBmb3IgbG9hZGluZyBtb2RlbCBvbiBzdGFydCwgd2hlbiBhIGZpbGUgaWRcbiAqIGhhcyBiZWVuIHBhc3NlZCBpbiB0aGUgdXJsIGVpdGhlciBmcm9tIGdvb2dsZSBkcml2ZSBvciBmcm9tIHRoZSA/ZmlsZT1pZCB1cmwuXG4gKioqL1xudmFyIGxvZ2luTW9kYWxJbml0ID0gZmFsc2U7XG5mdW5jdGlvbiBsb2FkKGlkLCBsb2FkRm4pIHtcbiAgLy8gaWYgd2UgZG9uJ3QgaGF2ZSBhbiBhY2Nlc3MgdG9rZW4sIHdlIG5lZWQgdG8gc2lnbiBpbiBmaXJzdFxuICAvLyBUT0RPOiBpZiB0aGlzIGlzIGEgcHVibGljIGZpbGUsIHRoZXJlIGlzIG5vIHJlYXNvbiB0byBzaWduIGluLi4uIHNvbHV0aW9uP1xuICBpZiggIXRva2VuICkge1xuXG4gICAgaWYoICFsb2dpbk1vZGFsSW5pdCApIHtcbiAgICAgICQoJyNnb29nbGUtbW9kYWwtbG9naW4nKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICAvLyBzaWduIHRoZSB1c2VyIGluIChmb3JjZSBvYXV0aCBwb3B1cClcbiAgICAgICAgc2lnbkluKGZ1bmN0aW9uKHRva2VuKSB7XG4gICAgICAgICAgJCgnI2xvZ2luLW1vZGFsJykubW9kYWwoJ2hpZGUnKTtcblxuICAgICAgICAgIC8vIHNldCB0aGUgdXNlciBpbmZvcm1hdGlvbiBpbiB0b3AgbGVmdFxuICAgICAgICAgIF9zZXRVc2VySW5mbygpO1xuXG4gICAgICAgICAgaWYoIGxvYWRGbiApIGxvYWRGbigpO1xuXG4gICAgICAgICAgZ2V0RmlsZU1ldGFkYXRhKGlkLCBmdW5jdGlvbihtZXRhZGF0YSl7XG4gICAgICAgICAgICBnZXRGaWxlKGlkLCBtZXRhZGF0YS5kb3dubG9hZFVybCwgZnVuY3Rpb24oZmlsZSkge1xuICAgICAgICAgICAgICBfb25Jbml0RmlsZUxvYWRlZChtZXRhZGF0YSxmaWxlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgICQoJyNsb2dpbi1tb2RhbCcpLm1vZGFsKCk7XG4gICAgICBsb2dpbk1vZGFsSW5pdCA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgICQoJyNsb2dpbi1tb2RhbCcpLm1vZGFsKCdzaG93Jyk7XG4gICAgfVxuXG4gIH0gZWxzZSB7XG4gICAgaWYoIGxvYWRGbiApIGxvYWRGbigpO1xuXG4gICAgZ2V0RmlsZU1ldGFkYXRhKGlkLCBmdW5jdGlvbihtZXRhZGF0YSl7XG4gICAgICBnZXRGaWxlKGlkLCBtZXRhZGF0YS5kb3dubG9hZFVybCwgZnVuY3Rpb24oZmlsZSkge1xuICAgICAgICBfb25Jbml0RmlsZUxvYWRlZChtZXRhZGF0YSxmaWxlKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG5cbi8qKipcbiAqIEluaXRpYWxpemUgVUkgLyBtb2RlbCB3aGVuIGEgZmlsZSBpcyBsb2FkZWQgYXQgc3RhcnRcbiAqKiovXG5mdW5jdGlvbiBfb25Jbml0RmlsZUxvYWRlZChtZXRhZGF0YSwgZmlsZSkge1xuICAvLyBiYWRkbmVzcywgbGV0IHRoZSB1c2VyIGtub3dcbiAgaWYoICFmaWxlICkge1xuICAgIGlmKCBoaWRlSW5pdExvYWRpbmcgKSBoaWRlSW5pdExvYWRpbmcoKTtcbiAgICByZXR1cm4gYWxlcnQoXCJGYWlsZWQgdG8gbG9hZCBmcm9tIEdvb2dsZSBEcml2ZSA6L1wiKTtcbiAgfVxuXG4gIC8vIG1ldGFkYXRhIGZhaWxlZCB0byBsb2FkLCBtb3JlIGJhZG5lc3NcbiAgaWYoIG1ldGFkYXRhLmNvZGUgPT0gNDA0ICkge1xuICAgIGlmKCBoaWRlSW5pdExvYWRpbmcgKSBoaWRlSW5pdExvYWRpbmcoKTtcbiAgICByZXR1cm4gYWxlcnQoXCJHb29nbGUgRHJpdmU6IFwiK21ldGFkYXRhLm1lc3NhZ2UpO1xuICB9XG5cbiAgLy8gd2UgbG9hZGVkIGEgbW9kZWwsIHNldHVwIGFuZCBydW5cbiAgaWYoIG1ldGFkYXRhLm1pbWVUeXBlID09IE1JTUVfVFlQRSApIHtcbiAgICAvLyBzZXQgdGhlIGN1cnJlbnRseSBsb2FkZWQgZmlsZSBpZFxuICAgIGxvYWRlZEZpbGUgPSBtZXRhZGF0YS5pZDtcblxuICAgIC8vIHNob3cgdGhlIHNoYXJlIGJ0blxuICAgICQoXCIjc2hhcmUtYnRuXCIpLnBhcmVudCgpLnNob3coKTtcbiAgICAkKFwiI29wZW4taW4tZHJpdmVcIikuYXR0cihcImhyZWZcIixcImh0dHBzOi8vZG9jcy5nb29nbGUuY29tL2ZpbGUvZC9cIittZXRhZGF0YS5pZCkucGFyZW50KCkuc2hvdygpO1xuXG4gICAgLy8gc2hvdyB0aXRsZVxuICAgICQoXCIjbG9hZGVkLW1vZGVsLXRpdGxlXCIpLmh0bWwoXCI8c3BhbiBzdHlsZT0nY29sb3I6IzMzMyc+TG9hZGVkIE1vZGVsIDwvc3Bhbj4gXCIrbWV0YWRhdGEudGl0bGUpO1xuXG4gICAgLy8gc2V0dXAgbW9kZWxcbiAgICBhcHAuZ2V0TW9kZWxJTygpLmxvYWRTZXR1cChtZXRhZGF0YS5pZCwgZmlsZSk7XG5cbiAgICAvLyBzZXR1cCByZWFsdGltZSBldmVudHNcbiAgICBnZHJpdmVSVC5pbml0UnRBcGkobG9hZGVkRmlsZSk7XG4gIH0gZWxzZSBpZiAoIG1ldGFkYXRhLm1pbWVUeXBlID09IFRSRUVfTUlNRV9UWVBFICkgeyAvLyB3ZSBsb2FkZWQgYSB0cmVlXG4gICAgLy8gc2V0IHRoZSBsb2FkZWQgdHJlZSBpZFxuICAgIGxvYWRlZFRyZWUgPSBtZXRhZGF0YS5pZDtcblxuICAgIC8vIHNob3cgdGhlIHNoYXJlIGJ0blxuICAgICQoXCIjc2hhcmUtdHJlZS1idG5cIikuc2hvdygpO1xuICAgICQoXCIjbG9hZGVkLXRyZWUtbmFtZVwiKS5odG1sKG1ldGFkYXRhLnRpdGxlKS5wYXJlbnQoKS5zaG93KCk7XG5cbiAgICAvLyBzZXQgdGhlIGxvYWRlZCB0cmVlXG4gICAgYXBwLmdldE1vZGVsSU8oKS5sb2FkVHJlZShmaWxlKTtcblxuICAgIC8vIGhpZGUgdGhlIGxvYWRpbmcgcG9wdXBcbiAgICBpZiggaGlkZUluaXRMb2FkaW5nICkgaGlkZUluaXRMb2FkaW5nKCk7XG4gIH0gZWxzZSB7XG4gICAgYWxlcnQoXCJMb2FkZWQgdW5rbm93biBmaWxlIHR5cGUgZnJvbSBHb29nbGUgRHJpdmU6IFwiK21ldGFkYXRhLm1pbWVUeXBlKTtcbiAgfVxufVxuXG4vKioqXG4gKiB0b2tlbnMgZXhwaXJlLCBldmVyeSBvbmNlIGluIGF3aGlsZSBjaGVjayB0aGUgY3VycmVudCB0b2tlbiBoYXNuJ3RcbiAqIGlmIGl0IGhhcywgdGhlbiB1cGRhdGVcbiAqKiovXG5mdW5jdGlvbiBfY2hlY2tUb2tlbigpIHtcbiAgLy8gaWdub3JlIGlmIHRoZXJlIGlzIG5vIHRva2VuXG4gIGlmICghdG9rZW4pIHJldHVybjtcblxuICAvLyBvdGhlcndpc2UsIGxvb2sgdG8gdXBkYXRlIHRoZSBhY2Nlc3MgdG9rZW5cbiAgT2F1dGguZ2V0QWNjZXNzVG9rZW4oZnVuY3Rpb24odCkge1xuICAgIGlmKCB0ICE9IG51bGwgKSB0b2tlbiA9IHQ7XG4gIH0pO1xufTtcblxuLyoqKlxuICogaXMgdGhlIGN1cnJlbnQgdXNlciBzaWduZWQgaW4/XG4gKioqL1xuZnVuY3Rpb24gY2hlY2tTaWduZWRJbihjYWxsYmFjaykge1xuICAvLyBpZiBpc0F1dGhlcml6ZWQgcmV0dXJucyBhIHRva2VuLCB1c2VyIGlzIGxvZ2dlZCBpblxuICBPYXV0aC5pc0F1dGhvcml6ZWQoZnVuY3Rpb24odG9rZW4pe1xuICAgIGlmICh0b2tlbiAhPSBudWxsKSBjYWxsYmFjayh0cnVlKTtcbiAgICBlbHNlIGNhbGxiYWNrKGZhbHNlKTtcbiAgfSk7XG59O1xuXG4vKioqXG4gKiBTaWduIGEgdXNlciBpbiB1c2luZyB0aGUgT2F1dGggY2xhc3NcbiAqKiovXG5mdW5jdGlvbiBzaWduSW4oY2FsbGJhY2spIHtcbiAgT2F1dGguYXV0aG9yaXplKGZ1bmN0aW9uKHQpe1xuICAgIHRva2VuID0gdDtcbiAgICBpZiAodG9rZW4gIT0gbnVsbCkge1xuICAgICAgaWYoIHQuZXJyb3IgKSByZXR1cm4gY2FsbGJhY2soZmFsc2UpO1xuICAgICAgY2FsbGJhY2sodHJ1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNhbGxiYWNrKGZhbHNlKTtcbiAgICB9XG4gIH0pXG59O1xuXG4vKioqXG4gKiBBY2Nlc3MgbWV0aG9kIGZvciB0b2tlblxuICoqKi9cbmZ1bmN0aW9uIGdldFRva2VuKCkge1xuICByZXR1cm4gdG9rZW47XG59O1xuXG4vKioqXG4gKiBMb2FkIHRoZSBnb29nbGUgZHJpdmUgYXBpIGNvZGVcbiAqKiovXG5mdW5jdGlvbiBfbG9hZEFwaShjYWxsYmFjaykge1xuICBnYXBpLmNsaWVudC5sb2FkKFwiZHJpdmVcIiwgRFJJVkVfQVBJX1ZFUlNJT04sIGZ1bmN0aW9uKCkge1xuICAgIGNhbGxiYWNrKCk7XG4gIH0pO1xufTtcblxuLyoqKlxuICogR2V0IGEgbGlzdCBvZiBmaWxlIG1ldGFkYXRhIGZyb20gZ29vZ2xlIGRyaXZlIGJhc2VkIG9uIHF1ZXJ5XG4gKioqL1xuZnVuY3Rpb24gbGlzdEZpbGVzKHF1ZXJ5LCBjYWxsYmFjaykge1xuICBnYXBpLmNsaWVudC5kcml2ZS5maWxlcy5saXN0KHtcbiAgICBxIDogcXVlcnkgKyBcIiBhbmQgdHJhc2hlZCA9IGZhbHNlXCJcbiAgfSkuZXhlY3V0ZShmdW5jdGlvbihyZXNwKSB7XG4gICAgY2FsbGJhY2socmVzcCk7XG4gIH0pO1xufTtcblxuLyoqKlxuICogR2V0IGEgc2luZ2xlIGZpbGVzIG1ldGFkYXRhIGJhc2VkIG9uIGlkXG4gKioqL1xuZnVuY3Rpb24gZ2V0RmlsZU1ldGFkYXRhKGlkLCBjYWxsYmFjaykge1xuICBnYXBpLmNsaWVudC5kcml2ZS5maWxlcy5nZXQoe1xuICAgICdmaWxlSWQnIDogaWRcbiAgfSkuZXhlY3V0ZShmdW5jdGlvbihyZXNwKSB7XG4gICAgY2FsbGJhY2socmVzcCk7XG4gIH0pO1xufTtcblxuLyoqKlxuICogIEFjdHVhbGx5IGxvYWQgYSBmaWxlcyBkYXRhLiAgVGhlIHVybCB0byBkbyB0aGlzIGlzIHByb3ZpZGVkIGluIGEgZmlsZXMgbWV0YWRhdGEuXG4gKioqL1xuZnVuY3Rpb24gZ2V0RmlsZShpZCwgZG93bmxvYWRVcmwsIGNhbGxiYWNrKSB7XG4gICQuYWpheCh7XG4gICAgdXJsIDogZG93bmxvYWRVcmwsXG4gICAgYmVmb3JlU2VuZCA6IGZ1bmN0aW9uKHJlcXVlc3QpIHtcbiAgICAgIC8vIHNldCBhY2Nlc3MgdG9rZW4gaW4gaGVhZGVyXG4gICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoXCJBdXRob3JpemF0aW9uXCIsICdCZWFyZXIgJysgdG9rZW4uYWNjZXNzX3Rva2VuKTtcbiAgICB9LFxuICAgIHN1Y2Nlc3MgOiBmdW5jdGlvbihkYXRhLCBzdGF0dXMsIHhocikge1xuICAgICAgLy8gcGFyc2UgdGhlIHJlc3BvbnNlICh3ZSBvbmx5IHN0b3JlIGpzb24gaW4gdGhlIGdvb2dsZSBkcml2ZSlcbiAgICAgIHRyeSB7XG4gICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgfSBjYXRjaCAoZSkge31cblxuICAgICAgY2FsbGJhY2soZGF0YSwgaWQpO1xuICAgIH0sXG4gICAgZXJyb3IgOiBmdW5jdGlvbigpIHtcbiAgICAgIGNhbGxiYWNrKHtcbiAgICAgICAgZXJyb3IgOiB0cnVlLFxuICAgICAgICBtZXNzYWdlIDogXCJGYWlsZWQgdG8gbG9hZCBmaWxlIGZyb20gR29vZ2xlIERyaXZlXCJcbiAgICAgIH0pO1xuXG4gICAgfVxuICB9KTtcbn07XG5cbi8qKipcbiAqIFNhdmUganNvbiB0byBnb29nbGUgZHJpdmVcbiAqKiovXG5mdW5jdGlvbiBzYXZlRmlsZShuYW1lLCBkZXNjcmlwdGlvbiwgbWltZVR5cGUsIGpzb24sIGNhbGxiYWNrLCBvcHRpb25zKSB7XG4gIGlmKCAhb3B0aW9ucyApIG9wdGlvbnMgPSB7fVxuXG4gIHZhciBib3VuZGFyeSA9ICctLS0tLS0tMzE0MTU5MjY1MzU4OTc5MzIzODQ2JztcbiAgdmFyIGRlbGltaXRlciA9IFwiXFxyXFxuLS1cIiArIGJvdW5kYXJ5ICsgXCJcXHJcXG5cIjtcbiAgdmFyIGNsb3NlX2RlbGltID0gXCJcXHJcXG4tLVwiICsgYm91bmRhcnkgKyBcIi0tXCI7XG5cbiAgdmFyIG1ldGFkYXRhID0ge1xuICAgICd0aXRsZScgOiBuYW1lLFxuICAgICdkZXNjcmlwdGlvbicgOiBkZXNjcmlwdGlvbixcbiAgICAnbWltZVR5cGUnIDogbWltZVR5cGVcbiAgfTtcblxuICAvLyBpZiB3ZSB3YW50IHRvIHNhdmUgdGhlIGZpbGUgdG8gYSBzcGVjaWZpZWQgZm9sZGVyXG4gIGlmKCBvcHRpb25zLnBhcmVudCApIHtcbiAgICBtZXRhZGF0YS5wYXJlbnRzID0gW3tpZDogb3B0aW9ucy5wYXJlbnR9XTtcbiAgfVxuXG4gIC8vIGlmIHRoZSBqc29uIGlzIHJlYWxseSBhbiBvYmplY3QsIHR1cm4gaXQgdG8gYSBzdHJpbmdcbiAgaWYgKHR5cGVvZiBqc29uID09ICdvYmplY3QnKSBqc29uID0gSlNPTi5zdHJpbmdpZnkoanNvbik7XG5cbiAgLy8gZGF0YSBuZWVkcyB0byBiZSBiYXNlNjQgZW5jb2RlZCBmb3IgdGhlIFBPU1RcbiAgdmFyIGJhc2U2NERhdGEgPSBidG9hKGpzb24pO1xuXG4gIC8vIGNyZWF0ZSBvdXIgbXVsdGlwYXJ0IFBPU1QgcmVxdWVzdFxuICB2YXIgbXVsdGlwYXJ0UmVxdWVzdEJvZHkgPSBkZWxpbWl0ZXJcbiAgICAgICsgJ0NvbnRlbnQtVHlwZTogYXBwbGljYXRpb24vanNvblxcclxcblxcclxcbidcbiAgICAgICsgSlNPTi5zdHJpbmdpZnkobWV0YWRhdGEpO1xuXG4gIGlmKCBqc29uLmxlbmd0aCA+IDAgKSB7XG4gICAgbXVsdGlwYXJ0UmVxdWVzdEJvZHkgKz0gZGVsaW1pdGVyICsgJ0NvbnRlbnQtVHlwZTogJ1xuICAgICAgKyBtaW1lVHlwZSArICdcXHJcXG4nICsgJ0NvbnRlbnQtVHJhbnNmZXItRW5jb2Rpbmc6IGJhc2U2NFxcclxcbidcbiAgICAgICsgJ1xcclxcbicgKyBiYXNlNjREYXRhO1xuICB9XG4gIG11bHRpcGFydFJlcXVlc3RCb2R5ICs9IGNsb3NlX2RlbGltO1xuXG4gICAgIC8vIHNldHVwIFBPU1QgcmVxdWVzdFxuICAgICAvLyBpZiB0aGUgb3B0aW9ucy5jb252ZXI9dHJ1ZSBmbGFnIGlzIHNldCwgZ29vZ2xlIGF0dGVtcHRzIHRvIGNvbnZlcnQgdGhlIGZpbGUgdG9cbiAgICAgLy8gYSBnb29nbGUgZG9jIGZpbGUuICBNb3N0bHksIHdlIHVzZSB0aGlzIGZvciBleHBvcnRpbmcgY3N2IC0+IEdvb2dsZSBTcHJlYWRzaGVldHNcbiAgdmFyIHJlcXVlc3QgPSBnYXBpLmNsaWVudC5yZXF1ZXN0KHtcbiAgICAncGF0aCcgOiAnL3VwbG9hZC9kcml2ZS92Mi9maWxlcycgKyAoIG9wdGlvbnMuY29udmVydCA/ICc/Y29udmVydD10cnVlJyA6ICcnKSxcbiAgICAnbWV0aG9kJyA6ICdQT1NUJyxcbiAgICAncGFyYW1zJyA6IHtcbiAgICAgICd1cGxvYWRUeXBlJyA6ICdtdWx0aXBhcnQnXG4gICAgfSxcbiAgICAnaGVhZGVycycgOiB7XG4gICAgICAnQ29udGVudC1UeXBlJyA6ICdtdWx0aXBhcnQvbWl4ZWQ7IGJvdW5kYXJ5PVwiJyArIGJvdW5kYXJ5ICsgJ1wiJ1xuICAgIH0sXG4gICAgJ2JvZHknIDogbXVsdGlwYXJ0UmVxdWVzdEJvZHlcbiAgfSk7XG5cbiAgLy8gc2VuZCB0aGUgcmVxdWVzdFxuICByZXF1ZXN0LmV4ZWN1dGUoZnVuY3Rpb24ocmVzcCkge1xuICAgIGlmIChyZXNwLmlkKVxuICAgICAgY2FsbGJhY2socmVzcCk7XG4gICAgZWxzZVxuICAgICAgY2FsbGJhY2soe1xuICAgICAgICBlcnJvciA6IHRydWUsXG4gICAgICAgIG1lc3NhZ2UgOiBcIkZhaWxlZCB0byBzYXZlXCJcbiAgICAgIH0pO1xuICB9KTtcbn07XG5cbi8qKipcbiAqIFVwZGF0ZSBhIGZpbGUgYmFzZWQgb24gaWQgYW5kIGdpdmVuIGpzb24gZGF0YVxuICoqKi9cbmZ1bmN0aW9uIHVwZGF0ZUZpbGUoZmlsZUlkLCBqc29uLCBjYWxsYmFjaykge1xuICAvLyBzdGFydCBjcmVhdGluZyB0aGUgbXVsdGlwYXJ0IFBPU1QgcmVxdWVzdFxuICB2YXIgYm91bmRhcnkgPSAnLS0tLS0tLTMxNDE1OTI2NTM1ODk3OTMyMzg0Nic7XG4gIHZhciBkZWxpbWl0ZXIgPSBcIlxcclxcbi0tXCIgKyBib3VuZGFyeSArIFwiXFxyXFxuXCI7XG4gIHZhciBjbG9zZV9kZWxpbSA9IFwiXFxyXFxuLS1cIiArIGJvdW5kYXJ5ICsgXCItLVwiO1xuXG4gIHZhciBtZXRhZGF0YSA9IHt9O1xuXG4gIC8vIHN0cmluaWZ5IHRoZW4gYmFzZTY0IGVuY29kZSB0aGVuIG9iamVjdFxuICAgIHZhciBiYXNlNjREYXRhID0gYnRvYShKU09OLnN0cmluZ2lmeShqc29uKSk7XG5cbiAgICAvLyBzZXQgdXAgdGhlIFBPU1QgYm9keVxuICAgIHZhciBtdWx0aXBhcnRSZXF1ZXN0Qm9keSA9XG4gICAgICBkZWxpbWl0ZXIgK1xuICAgICAgICAnQ29udGVudC1UeXBlOiBhcHBsaWNhdGlvbi9qc29uXFxyXFxuXFxyXFxuJyArXG4gICAgICAgIEpTT04uc3RyaW5naWZ5KG1ldGFkYXRhKSArXG4gICAgICAgIGRlbGltaXRlciArXG4gICAgICAgICdDb250ZW50LVR5cGU6ICcgKyBNSU1FX1RZUEUgKyAnXFxyXFxuJyArXG4gICAgICAgICdDb250ZW50LVRyYW5zZmVyLUVuY29kaW5nOiBiYXNlNjRcXHJcXG4nICtcbiAgICAgICAgJ1xcclxcbicgK1xuICAgICAgICBiYXNlNjREYXRhICtcbiAgICAgICAgY2xvc2VfZGVsaW07XG5cbiAgLy8gc2V0dXAgUE9TVCByZXF1ZXN0XG4gICAgdmFyIHJlcXVlc3QgPSBnYXBpLmNsaWVudC5yZXF1ZXN0KHtcbiAgICAgICAgJ3BhdGgnOiAnL3VwbG9hZC9kcml2ZS92Mi9maWxlcy8nK2ZpbGVJZCxcbiAgICAgICAgJ21ldGhvZCc6ICdQVVQnLFxuICAgICAgICAncGFyYW1zJzogeyd1cGxvYWRUeXBlJzogJ211bHRpcGFydCd9LFxuICAgICAgICAnaGVhZGVycyc6IHtcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ211bHRpcGFydC9taXhlZDsgYm91bmRhcnk9XCInICsgYm91bmRhcnkgKyAnXCInXG4gICAgICAgIH0sXG4gICAgICAgICdib2R5JzogbXVsdGlwYXJ0UmVxdWVzdEJvZHl9KTtcblxuICAgIC8vIHNldCByZXF1ZXN0XG4gICAgcmVxdWVzdC5leGVjdXRlKGZ1bmN0aW9uKHJlc3Ape1xuICAgICAgaWYoIHJlc3AuaWQgKSB7XG4gICAgICAgIGNhbGxiYWNrKHJlc3ApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2FsbGJhY2soe1xuICAgICAgICBlcnJvciA6IHRydWUsXG4gICAgICAgIG1lc3NhZ2UgOiBcIkZhaWxlZCB0byB1cGRhdGVcIlxuICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIHJ1bk1vZGVsUnQoKSB7XG4gIGlmKCBvZmZsaW5lTW9kZSApIHJldHVybjtcbiAgZ2EoJ3NlbmQnLCAnZXZlbnQnLCAndWknLCAnaW50ZXJhY3Rpb24nLCAncnVuLW1vZGVsLXJlbW90ZScsIDEpO1xuICBnZHJpdmVSVC5ydW5Nb2RlbFJ0KCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBpbml0IDogaW5pdCxcbiAgY2hlY2tTaWduZWRJbiA6IGNoZWNrU2lnbmVkSW4sXG4gIHNpZ25JbiA6IHNpZ25JbixcbiAgZ2V0VG9rZW4gOiBnZXRUb2tlbixcbiAgbGlzdEZpbGVzIDogbGlzdEZpbGVzLFxuICBnZXRGaWxlTWV0YWRhdGEgOiBnZXRGaWxlTWV0YWRhdGEsXG4gIGxvYWQgOiBsb2FkLFxuICBzYXZlRmlsZTogc2F2ZUZpbGUsXG4gIHNob3dMb2FkVHJlZVBhbmVsIDogc2hvd0xvYWRUcmVlUGFuZWwsXG4gIHNob3dTYXZlVHJlZVBhbmVsIDogc2hvd1NhdmVUcmVlUGFuZWwsXG4gIHJ1bk1vZGVsUnQgOiBydW5Nb2RlbFJ0LFxuXG4gIE1JTUVfVFlQRSA6IE1JTUVfVFlQRVxufVxuIiwiLy8gUkVBTFRJTUUgKHJ0KSBPYmplY3RzXG4vLyBydCBqc29uIGZpZWxkLCB1c2VkIHRvIHNlbmQgdXBkYXRlcyB0byBwZWVyc1xudmFyIHJ0SnNvbiA9IG51bGw7XG4vLyBydCBkb2N1bWVudFxudmFyIHJ0RG9jID0gbnVsbDtcbi8vIGhhcyB0aGUgcnQgYXBpIGJlZW4gbG9hZGVkP1xudmFyIF9ydExvYWRlZCA9IGZhbHNlO1xuLy8gdGltZXIgdG8gYnVmZmVyIHRoZSBmaXJpbmcgb2YgdXBkYXRlcyBmcm9tIHJ0IGV2ZW50c1xudmFyIF9ydFRpbWVyID0gLTE7XG5cbi8vIGxpc3Qgb2YgY3VycmVudCBydCBlZGl0cyB0byBpbnB1dCBmaWxlc1xudmFyIHJ0RWRpdHMgPSB7fTtcbi8vIGdvb2dsZSBkcml2ZSBydCBtb2RlbCAtIG1hcFxudmFyIGxpdmVFZGl0cyA9IG51bGw7XG4vLyBsb2NhbCBsb2NrIG9uIGFuIGVsZW1lbnRcbnZhciBsb2NrID0ge307XG5cbnZhciBhcHA7XG5cbi8vIGxvYWRlZCBmaWxlIGlkXG52YXIgbG9hZGVkRmlsZTtcblxuLyoqKlxuICogU2V0dXAgdGhlIHJ0IGFwaSBmb3IgdGhlIGN1cnJlbnQgZmlsZS4gIFRoaXMgd2lsbCBhY3R1YWxseSBsb2FkIHRoZSBhcGkgaWYgbmVlZGVkXG4gKioqL1xuZnVuY3Rpb24gaW5pdFJ0QXBpKGZpbGUpIHtcbiAgcnRKc29uID0gbnVsbDsgLy8ga2lsbCBvZmYgYW55IG9sZCBsaXN0bmVyc1xuICBsb2FkZWRGaWxlID0gZmlsZTtcblxuICAvLyBjbG9zZSBhbnkgb2xkIGNvbm5lY3Rpb25cbiAgaWYoIHJ0RG9jICkgcnREb2MuY2xvc2UoKTtcblxuICAvLyBnZXQgb3V0IG9mIGhlcmUgaWYgd2UgZG9uJ3QgaGF2ZSBhIGxvYWRlZCBmaWxlXG4gIGlmKCBsb2FkZWRGaWxlID09IG51bGwgKSByZXR1cm47XG5cbiAgLy8gbG9hZCBhcGkgaWYgbmVlZGVkXG4gIGlmKCAhX3J0TG9hZGVkICkge1xuICAgIGdhcGkubG9hZCgnZHJpdmUtcmVhbHRpbWUnLCBmdW5jdGlvbigpe1xuICAgICAgLy8gc2V0dXAgcnQgaG9va3NcbiAgICAgIF9ydExvYWRlZCA9IHRydWU7XG4gICAgICBfbG9hZFJ0RmlsZSgpO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIC8vIHNldHVwIHJ0IGhvb2tzXG4gICAgX2xvYWRSdEZpbGUoKTtcbiAgfVxuXG4gIC8vIHNldHVwIGlucHV0IGhhbmRsZXJzXG4gICQoJyNpbnB1dHMgaW5wdXQnKS5vbignZm9jdXMnLGZ1bmN0aW9uKGUpe1xuICAgIHZhciBlbGUgPSAkKGUudGFyZ2V0KTtcbiAgICBfc2V0TG9jYWxMb2NrKHtcbiAgICAgIGlkICAgICAgICA6IGVsZS5hdHRyKFwiaWRcIiksXG4gICAgICB2YWx1ZSAgICAgOiBlbGUudmFsKCksXG4gICAgICB0aW1lc3RhbXAgOiBuZXcgRGF0ZSgpLmdldFRpbWUoKSxcbiAgICAgIHVzZXIgICAgICA6IHdpbmRvdy51c2VyaW5mbyA/IHdpbmRvdy51c2VyaW5mby5uYW1lIDogXCJ1bmtub3duXCJcbiAgICB9KTtcbiAgfSk7XG4gICQoJyNpbnB1dHMgaW5wdXQnKS5vbignYmx1cicsZnVuY3Rpb24oZSl7XG4gICAgX3JlbW92ZUxvY2FsTG9jaygkKGUudGFyZ2V0KS5hdHRyKFwiaWRcIikpO1xuICB9KTtcbiAgJCgnI2lucHV0cyBpbnB1dCcpLm9uKCdrZXl1cCcsZnVuY3Rpb24oZSl7XG4gICAgaWYoIGUud2hpY2ggPT0gMTMgKSByZXR1cm47XG4gICAgdmFyIGVsZSA9ICQoZS50YXJnZXQpO1xuICAgIF91cGRhdGVMb2NhbExvY2soZWxlLmF0dHIoXCJpZFwiKSwgZWxlLnZhbCgpKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIF9zZXRMb2NhbExvY2sobG9jaykge1xuICAvLyBUT0RPOiB0aGlzIHNob3VsZCBtYXJrIHRoZSBjdXJyZW50IGxvY2tcbiAgaWYoIGxpdmVFZGl0cy5oYXNbbG9jay5pZF0gKSByZXR1cm47XG4gIGxpdmVFZGl0cy5zZXQobG9jay5pZCwgbG9jayk7XG59XG5cbmZ1bmN0aW9uIF91cGRhdGVMb2NhbExvY2soaWQsIHZhbCkge1xuICB2YXIgbG9jayA9IHtcbiAgICBpZCA6IGlkLFxuICAgIHZhbHVlIDogdmFsLFxuICAgIHRpbWVzdGFtcCA6IG5ldyBEYXRlKCkuZ2V0VGltZSgpLFxuICAgIHVzZXIgICAgICA6IHdpbmRvdy51c2VyaW5mbyA/IHdpbmRvdy51c2VyaW5mby5uYW1lIDogXCJ1bmtub3duXCJcbiAgfVxuXG4gIGxpdmVFZGl0cy5zZXQoaWQsIGxvY2spO1xufVxuXG5mdW5jdGlvbiBfcmVtb3ZlTG9jYWxMb2NrKGlkKSB7XG4gIGxpdmVFZGl0cy5kZWxldGUoaWQpO1xufVxuXG5mdW5jdGlvbiBfcmVtb3ZlUmVtb3RlTG9jayhsb2NrKSB7XG4gICQoXCIjXCIrbG9jay5pZCkucmVtb3ZlQXR0cihcImRpc2FibGVkXCIpO1xuICAkKFwiI1wiK2xvY2suaWQrXCItZWRpdGluZ1wiKS5yZW1vdmUoKTtcbiAgZGVsZXRlIHJ0RWRpdHNbbG9jay5pZF07XG59XG5cbmZ1bmN0aW9uIF91cGRhdGVMb2NrKGxvY2spIHtcbiAgJChcIiNcIitsb2NrLmlkKS52YWwobG9jay52YWx1ZSkuYXR0cihcImRpc2FibGVkXCIsXCJkaXNhYmxlZFwiKTtcbiAgaWYoICQoXCIjXCIrbG9jay5pZCtcIi1lZGl0aW5nXCIpLmxlbmd0aCA9PSAwICkge1xuICAgICQoXCIjXCIrbG9jay5pZCkucGFyZW50KCkuYWZ0ZXIoXCI8c3BhbiBpZD0nXCIrbG9jay5pZCtcIi1lZGl0aW5nJyBjbGFzcz0nbGFiZWwgbGFiZWwtd2FybmluZyc+PC9zcGFuPlwiKTtcbiAgfVxuICAkKFwiI1wiK2xvY2suaWQrXCItZWRpdGluZ1wiKS5odG1sKGxvY2sudXNlcik7XG4gIHJ0RWRpdHNbbG9jay5pZF0gPSBsb2NrO1xufVxuXG4vKioqXG4gKiBVcGRhdGUgdGhlIGxpc3Qgb2YgcmVhbHRpbWUgZWRpdHMgYXMgd2VsbCBhcyB0aGUgaW5wdXQgVUkgYmFzZWQgb24gdGhlIHJ0RG9jIGV2ZW50XG4gKiBUT0RPOiB0aGlzIGlzIGEgYml0IG5hc3R5IHJpZ2h0IG5vd1xuICoqL1xuZnVuY3Rpb24gX3VwZGF0ZVJ0RWRpdHMoZSkge1xuICBpZiggZS5pc0xvY2FsICkgcmV0dXJuO1xuXG4gIHZhciBrZXlzID0gbGl2ZUVkaXRzLmtleXMoKTtcblxuICAvLyByZW1vdmUgb2xkIHRpbWVzdGFtcHMgVE9ET1xuICAvKmZvciggdmFyIGkgPSAwOyBpIDwgdmFsdWVzLmxlbmd0aDsgaSsrICkge1xuICAgIGlmKCBub3cgLSB2YWx1ZXNbaV0udGltZXN0YW1wID4gMTAwMCAqIDYwICkge1xuICAgICAgX3JlbW92ZUxvY2sodmFsdWVzW2ldKTsgLy8gZG9lcyB0aGlzIGZpcmUgdXBkYXRlcz9cbiAgICB9XG4gIH0qL1xuXG5cbiAgLy8gc2V0IG5ldyBlZGl0c1xuICBmb3IoIHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKysgKSB7XG4gICAgX3VwZGF0ZUxvY2sobGl2ZUVkaXRzLmdldChrZXlzW2ldKSk7XG4gIH1cblxuICAvLyByZW1vdmUgb2xkIGVkaXRzXG4gIGZvciggdmFyIGtleSBpbiBydEVkaXRzICkge1xuICAgIGlmKCBrZXlzLmluZGV4T2Yoa2V5KSA9PSAtMSApIHtcbiAgICAgIF9yZW1vdmVSZW1vdGVMb2NrKHJ0RWRpdHNba2V5XSk7XG4gICAgfVxuICB9XG59XG5cbi8qKipcbiAqICBTZXR1cCB0aGUgcnQgaG9va3MgZm9yIHRoZSBjdXJyZW50IGZpbGUuICBUaGUgYXBpIG5lZWRzIHRvIGFscmVhZHkgYmUgbG9hZGVkXG4gKioqL1xuZnVuY3Rpb24gX2xvYWRSdEZpbGUoKSB7XG4gIC8vIGdldCB0aGUgcnQgZG9jXG4gIGdhcGkuZHJpdmUucmVhbHRpbWUubG9hZChsb2FkZWRGaWxlLFxuICAgIC8vIHJ0IGRvYyBsb2FkZWRcbiAgICBmdW5jdGlvbihmaWxlKXtcbiAgICAgIHJ0RG9jID0gZmlsZTtcblxuICAgICAgLy8gZ2V0IG91ciBydCBhdHRyaWJ1dGUuICBUcmlnZ2VyaW5nIGNoYW5nZXMgb24gcnRKc29uIHdpbGwgcHVzaCBldmVudHNcbiAgICAgIC8vIHRvIGFsbCBsaXN0ZW5pbmcgY2xpZW50c1xuICAgICAgdmFyIGpzb24gPSBmaWxlLmdldE1vZGVsKCkuZ2V0Um9vdCgpLmdldChcImpzb25cIik7XG4gICAgICBsaXZlRWRpdHMgPSBmaWxlLmdldE1vZGVsKCkuZ2V0Um9vdCgpLmdldChcImxpdmVFZGl0c1wiKTtcblxuICAgICAgLy8gaWYgdGhlcmUgaXMgbm8ganNvbiBhdHRyLCB3ZSBuZWVkIHRvIGluaXRpYWxpemUgdGhlIG1vZGVsXG4gICAgICBpZigganNvbiA9PSBudWxsIHx8IGxpdmVFZGl0cyA9PSBudWxsKSB7XG4gICAgICAgIC8vIGluaXRpYWxpemUgb3VyIHJ0IG1vZGVsXG4gICAgICAgIF9vblJ0TW9kZWxMb2FkKGZpbGUuZ2V0TW9kZWwoKSk7XG4gICAgICAgIC8vIGdyYWIgcnQganNvbiBhdHRyIG5vdyB0aGF0IHdlIGFyZSBpbml0aWFsaXplZFxuICAgICAgICBqc29uID0gZmlsZS5nZXRNb2RlbCgpLmdldFJvb3QoKS5nZXQoXCJqc29uXCIpO1xuICAgICAgICBsaXZlRWRpdHMgPSBmaWxlLmdldE1vZGVsKCkuZ2V0Um9vdCgpLmdldChcImxpdmVFZGl0c1wiKTtcbiAgICAgIH1cblxuICAgICAgLy8gYmFkbmVzcyBoYXBwZW5lZCA6KFxuICAgICAgaWYoICFqc29uICkgcmV0dXJuIGNvbnNvbGUubG9nKFwiRmFpbGVkIHRvIGNvbm5lY3QgdG8gcnQganNvblwiKTtcbiAgICAgIC8vIHNldCB0aGF0IGF0dHIgZ2xvYmFsIHRvIGNsYXNzXG4gICAgICBydEpzb24gPSBqc29uO1xuXG4gICAgICAvLyBnZXQgY3VycmVudCBsaXN0IG9mIHVzZXJzXG4gICAgICB2YXIgdXNlcnMgPSBmaWxlLmdldENvbGxhYm9yYXRvcnMoKTtcblxuICAgICAgLy8gYWRkIGV2ZW50IGxpc3RlbmVycyBmb3Igd2hlbiBwZW9wbGUgY29tZSBhbmQgZ29cbiAgICAgIGZpbGUuYWRkRXZlbnRMaXN0ZW5lcihnYXBpLmRyaXZlLnJlYWx0aW1lLkV2ZW50VHlwZS5DT0xMQUJPUkFUT1JfSk9JTkVELCBmdW5jdGlvbihlKXtcbiAgICAgICAgdXNlcnMgPSBmaWxlLmdldENvbGxhYm9yYXRvcnMoKTtcbiAgICAgICAgX3VwZGF0ZUFjdGl2ZVVzZXJzKHVzZXJzKTtcbiAgICAgIH0pO1xuICAgICAgZmlsZS5hZGRFdmVudExpc3RlbmVyKGdhcGkuZHJpdmUucmVhbHRpbWUuRXZlbnRUeXBlLkNPTExBQk9SQVRPUl9MRUZULCBmdW5jdGlvbihlKXtcbiAgICAgICAgdXNlcnMgPSBmaWxlLmdldENvbGxhYm9yYXRvcnMoKTtcbiAgICAgICAgX3VwZGF0ZUFjdGl2ZVVzZXJzKHVzZXJzKTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyBhZGQgZXZlbnQgbGlzdGVuZXJzIGZvciB0aGUgcnRKc29uIG9iamVjdFxuICAgICAgLy8gd2hlbiB0aGlzIHVwZGF0ZXMsIHdlIHdhbnQgdG8gcmUtcnVuIHRoZSBtb2RlbFxuICAgICAganNvbi5hZGRFdmVudExpc3RlbmVyKGdhcGkuZHJpdmUucmVhbHRpbWUuRXZlbnRUeXBlLlRFWFRfSU5TRVJURUQsIGZ1bmN0aW9uKGUpe1xuICAgICAgICBpZiggZS5pc0xvY2FsICkgcmV0dXJuO1xuICAgICAgICBfcmVydW5SdCh1c2VycywgZS51c2VySWQpO1xuICAgICAgICB9KTtcbiAgICAgICAganNvbi5hZGRFdmVudExpc3RlbmVyKGdhcGkuZHJpdmUucmVhbHRpbWUuRXZlbnRUeXBlLlRFWFRfREVMRVRFRCwgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgaWYoIGUuaXNMb2NhbCApIHJldHVybjtcbiAgICAgICAgICBfcmVydW5SdCh1c2VycywgZS51c2VySWQpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBsaXZlIGVkaXQgdXBkYXRlc1xuICAgICAgICAgICAgICBsaXZlRWRpdHMuYWRkRXZlbnRMaXN0ZW5lcihnYXBpLmRyaXZlLnJlYWx0aW1lLkV2ZW50VHlwZS5WQUxVRV9DSEFOR0VELCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgICAgICAgICBfdXBkYXRlUnRFZGl0cyhlKTtcbiAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gc2hvdyB3aG8gaXMgbGlzdGVuaW5nXG4gICAgICAgIF91cGRhdGVBY3RpdmVVc2Vycyh1c2Vycyk7XG5cbiAgICAgICAgLy8gc2V0IGlucHV0IGhhbmRsZXJzIGZvciBydCBldmVudHNcbiAgICB9LFxuICAgIC8vIG1vZGVsIGxvYWRlZFxuICAgIGZ1bmN0aW9uKG1vZGVsKXtcbiAgICAgIF9vblJ0TW9kZWxMb2FkKG1vZGVsKTtcbiAgICB9LFxuICAgIC8vIGVycm9yc1xuICAgIGZ1bmN0aW9uKGVycikge1xuICAgICAgY29uc29sZS5sb2coXCJSVCBFUlJPUlM6IFwiKTtcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgfVxuICApO1xufVxuXG5cbi8qKipcbiAqIFVwZGF0ZSB0aGUgZGlzcGxheSBvZiBhY3RpdmUgdXNlcnMgZm9yIHRoZSBtb2RlbC5cbiAqKiovXG5mdW5jdGlvbiBfdXBkYXRlQWN0aXZlVXNlcnModXNlcnMpIHtcbiAgLy8gaWYgaXQncyBqdXN0IHVzLCBkb24ndCBzaG93IGFueXRoaW5nXG4gIGlmKCAhdXNlcnMgKSByZXR1cm4gJChcIiNhY3RpdmUtdXNlcnNcIikuaHRtbChcIlwiKTtcbiAgaWYoIHVzZXJzLmxlbmd0aCA8PSAxICkgcmV0dXJuICQoXCIjYWN0aXZlLXVzZXJzXCIpLmh0bWwoXCJcIik7XG5cbiAgLy8gd2Ugb25seSB3YW50IHVuaXF1ZSB1c2Vyc1xuICB2YXIgdW5pcXVlID0gW107XG4gIHZhciB1dXNlcnMgPSBbXTtcbiAgZm9yKCB2YXIgaSA9IDA7IGkgPCB1c2Vycy5sZW5ndGg7IGkrKyApIHtcbiAgICBpZiggdW5pcXVlLmluZGV4T2YodXNlcnNbaV0udXNlcklkKSA9PSAtMSApIHtcbiAgICAgIHVuaXF1ZS5wdXNoKHVzZXJzW2ldLnVzZXJJZCk7XG4gICAgICB1dXNlcnMucHVzaCh1c2Vyc1tpXSk7XG4gICAgfVxuICB9XG4gIGlmKCB1dXNlcnMubGVuZ3RoIDw9IDEgKSByZXR1cm4gJChcIiNhY3RpdmUtdXNlcnNcIikuaHRtbChcIlwiKTtcblxuICAvLyBhZGQgcGljIG9mIHVzZXIgdG8gZGlzcGxheSBwYW5lbFxuICB2YXIgaHRtbCA9IFwiQWN0aXZlIFVzZXJzIFwiO1xuICBmb3IoIHZhciBpID0gMDsgaSA8IHV1c2Vycy5sZW5ndGg7IGkrKyApIHtcbiAgICBpZiggdXVzZXJzW2ldLnBob3RvVXJsICkge1xuICAgICAgaHRtbCArPSBcIjxpbWcgc3JjPSdcIit1dXNlcnNbaV0ucGhvdG9VcmwrXCInIHRpdGxlPSdcIit1dXNlcnNbaV0uZGlzcGxheU5hbWUrXCInIHN0eWxlPSdtYXJnaW46MCA1cHg7d2lkdGg6MzJweDtoZWlnaHQ6MzJweCcgY2xhc3M9J2ltZy1yb3VuZGVkJyAvPiBcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgaHRtbCArPSBcIjxzcGFuIHN0eWxlPSd3aWR0aDozMnB4O2hlaWdodDozMnB4O21hcmdpbjowIDVweDtiYWNrZ3JvdW5kLWNvbG9yOlwiK3V1c2Vyc1tpXS5jb2xvcitcIicgdGl0bGU9J1wiK3V1c2Vyc1tpXS5kaXNwbGF5TmFtZStcIicgPjwvc3Bhbj4gXCI7XG4gICAgfVxuICB9XG4gICQoXCIjYWN0aXZlLXVzZXJzXCIpLmh0bWwoaHRtbCk7XG59XG5cbi8qKipcbiAgICogIFJlLXJ1biB0aGUgbW9kZWwuICBFdmVudHMgY2FuIGNvbWUgaW4gcXVpY2tseSBpbiBtYW55IHBhcnRzLiAgQnVmZmVyIHRoZSBldmVudHMgc28gd2UgZG9uJ3QgcmUtcnVuIHRoZSBtb2RlbCB0b28gbWFueSB0aW1lcy5cbiAgICoqKi9cbmZ1bmN0aW9uIF9yZXJ1blJ0KHVzZXJzLCB1c2VySWQpIHtcbiAgLy8gdGhpcyBpcyBiYWRuZXNzXG4gIGlmKCAhcnRKc29uICkgcmV0dXJuO1xuXG4gIC8vIGNsZWFyIGFueSBxdWV1ZWQgcnVuXG4gIGlmKCBfcnRUaW1lciAhPSAtMSApIGNsZWFyVGltZW91dChfcnRUaW1lcik7XG5cbiAgLy8gcXVldWUgdXAgYSBydW4gYW5kIHdhaXQgdG8gbWFrZSBzdXJlIHRoZXJlIGFyZSBubyB1cGRhdGVzXG4gIF9ydFRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgIF9ydFRpbWVyID0gLTE7XG5cbiAgICAvLyBmaW5kIHRoZSB1c2VyIHdobyBpcyBydW5uaW5nIHRoZSBtb2RlbCBhbmQgZGlwbGF5IHBvcHVwIG9mIHRoYXQgdXNlcnMgaW5mb3JtYXRpb25cbiAgICBmb3IoIHZhciBpID0gMDsgaSA8IHVzZXJzLmxlbmd0aDsgaSsrICkge1xuICAgICAgaWYoIHVzZXJzW2ldLnVzZXJJZCA9PSB1c2VySWQgKSB7XG4gICAgICAgIHZhciBwYW5lbCA9ICQoXCI8ZGl2IGNsYXNzPSdpbml0LWxvYWRpbmctb3V0ZXInID48ZGl2IGNsYXNzPSdpbml0LWxvYWRpbmcnIHN0eWxlPSd3aWR0aDo0MDBweCc+IFwiK1xuICAgICAgICAgICAgICAgICh1c2Vyc1tpXS5waG90b1VybCA/IFwiPGltZyBzcmM9J1wiK3VzZXJzW2ldLnBob3RvVXJsK1wiJyAvPiBcIiA6IFwiXCIpK3VzZXJzW2ldLmRpc3BsYXlOYW1lK1wiIGlzIHVwZGF0aW5nIHRoZSBtb2RlbC4uLjwvZGl2PjwvZGl2PlwiKTtcbiAgICAgICAgICAgICQoXCJib2R5XCIpLmFwcGVuZChwYW5lbCk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgcGFuZWwuY3NzKFwib3BhY2l0eVwiLFwiLjlcIik7XG4gICAgICAgICAgICB9LDUwKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBwYW5lbC5yZW1vdmUoKTtcbiAgICAgICAgICAgIH0sIDM1MDApO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gcGFyc2UgdGhlIG5ldyBtb2RlbCBkYXRhIGFuZCBsb2FkIGl0IGFzIG91ciBjdXJyZW50IHNldHVwXG4gICAgdmFyIGRhdGEgPSBKU09OLnBhcnNlKHJ0SnNvbi5nZXRUZXh0KCkpO1xuICAgIGFwcC5nZXRNb2RlbElPKCkubG9hZFNldHVwKGxvYWRlZEZpbGUsIGRhdGEsIHRydWUpO1xuICB9LCAzMDApO1xufVxuXG4vKioqXG4gKiBpbml0aWFsaXplIGEgbmV3IHJ0IG1vZGVsXG4gKioqL1xuZnVuY3Rpb24gX29uUnRNb2RlbExvYWQobW9kZWwpIHtcbiAgLy8gY3VycmVudGx5IHdlIGp1c3Qgd2FudCB0byB1c2UgdGhpcyBzaW5nbGUgYXR0cmlidXRlIHRvIGJyb2FkY2FzdCBldmVudHNcbiAgdmFyIGpzb24gPSBtb2RlbC5nZXRSb290KCkuZ2V0KFwianNvblwiKTtcbiAgaWYoIGpzb24gPT0gbnVsbCApIHtcbiAgICB2YXIgc3RyaW5nID0gbW9kZWwuY3JlYXRlU3RyaW5nKFwie31cIik7XG4gICAgbW9kZWwuZ2V0Um9vdCgpLnNldChcImpzb25cIiwgc3RyaW5nKTtcbiAgfVxuXG4gIHZhciBsaXZlRWRpdHMgPSBtb2RlbC5nZXRSb290KCkuZ2V0KFwibGl2ZUVkaXRzXCIpO1xuICBpZiggbGl2ZUVkaXRzID09IG51bGwgKSB7XG4gICAgdmFyIGZpZWxkID0gbW9kZWwuY3JlYXRlTWFwKCk7XG4gICAgbW9kZWwuZ2V0Um9vdCgpLnNldChcImxpdmVFZGl0c1wiLCBmaWVsZCk7XG4gIH1cblxufVxuXG4vKioqXG4gKiBsZXQgdGhlIHdvcmxkIGtub3cgd2hhdCB3ZSBhcmUgZG9pbmcgOilcbiAqIFRoaXMgc2hvdWxkIGJlIGNhbGxlZCB3aGVuIGEgbG9jYWwgdXNlciBydW5zIHRoZSBtb2RlbC4gIEl0IHVwZGF0ZXMgdGhlICdqc29uJ1xuICogYXR0cmlidXRlIHdoaWNoIGlzIHRoZW4gYnJvYWRjYXN0IHRvIGFsbCBsaXN0ZW5pbmcgcGFydGllc1xuICoqKi9cbmZ1bmN0aW9uIHJ1bk1vZGVsUnQoKSB7XG4gIGlmKCBydEpzb24gKSBydEpzb24uc2V0VGV4dChKU09OLnN0cmluZ2lmeSggYXBwLmdldE1vZGVsSU8oKS5leHBvcnRTZXR1cCgpICkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgcnVuTW9kZWxSdCA6IHJ1bk1vZGVsUnQsXG4gIGluaXRSdEFwaSAgOiBpbml0UnRBcGksXG4gIHNldEFwcCA6IGZ1bmN0aW9uKGFwcGxpY2F0aW9uKSB7XG4gICAgYXBwID0gYXBwbGljYXRpb247XG4gIH1cbn07XG4iLCJ2YXIgb2ZmbGluZSA9IHJlcXVpcmUoJy4vb2ZmbGluZScpO1xudmFyIGdkcml2ZSA9IHJlcXVpcmUoJy4vZ2RyaXZlJyk7XG52YXIgY2hhcnRzID0gcmVxdWlyZSgnLi9jaGFydHMnKTtcbnZhciB3ZWF0aGVyRmlsZVJlYWRlciA9IHJlcXVpcmUoJy4vd2VhdGhlckZpbGVSZWFkZXInKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihhcHApIHtcblxudmFyIHdlYXRoZXJBdmVyYWdlQ2hhcnQgPSBudWxsO1xudmFyIHdlYXRoZXJBdmVyYWdlQ2hhcnREYXRhID0ge307XG5cbnZhciBTRVRVUF9URU1QTEFURSA9XG4gICc8ZGl2PicrXG4gICc8aDQ+Q2hhcnQgT3B0aW9uczwvaDQ+JytcbiAgJzxkaXY+JytcbiAgICAgICc8dGFibGUgY2xhc3M9XCJ0YWJsZVwiPicrXG4gICAgICAgICAgJzx0cj4nK1xuICAgICAgICAgICAgICAnPHRkIHN0eWxlPVwid2lkdGg6NTAlXCI+T3V0cHV0IHZhcmlhYmxlKHMpIHRvIGNoYXJ0IDwvdGQ+JytcbiAgICAgICAgICAgICAgJzx0ZD4gPGEgaWQ9XCJzZWxlY3QtY2hhcnRzLWJ0blwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCI+U2VsZWN0IENoYXJ0czwvYT48L3RkPicrXG4gICAgICAgICAgJzwvdHI+JytcbiAgICAgICAgICAnPHRyPicrXG4gICAgICAgICAgICAgICc8dGQgc3R5bGU9XCJ3aWR0aDo1MCVcIj5WYXJpYXRpb24gYW5hbHlzaXMgcGFyYW1ldGVyKHMpIDwvdGQ+JytcbiAgICAgICAgICAgICAgJzx0ZD48ZGl2IGlkPVwidmFyaWF0aW9uQW5hbHlzaXNTdGF0dXNcIj5Ob25lPC9kaXY+PC90ZD4nK1xuICAgICAgICAgICc8L3RyPicrXG4gICAgICAnPC90YWJsZT4nK1xuICAnPC9kaXY+JytcbiAgJzxoND5Mb2NhdGlvbjwvaDQ+JytcbiAgICc8ZGl2IHN0eWxlPVwiYm9yZGVyLXRvcDoxcHggc29saWQgI2RkZDtwYWRkaW5nOjhweDtoZWlnaHQ6NjBweFwiPicrXG4gICAgICc8c3BhbiBpZD1cImN1cnJlbnQtbG9jYXRpb25cIiBzdHlsZT1cImNvbG9yOiM4ODhcIj48L3NwYW4+JytcbiAgICAgJzxhIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IHB1bGwtcmlnaHQgc2VsZWN0LXdlYXRoZXItbG9jYXRpb25cIj48aSBjbGFzcz1cImljb24tbWFwLW1hcmtlclwiPjwvaT4gU2VsZWN0IExvY2F0aW9uPC9hPicrXG4gICAgICc8L2Rpdj4nK1xuICAgICAnPGRpdj4nO1xuXG52YXIgR09PTEVEUklWRV9UUkVFX1RFTVBMQVRFID1cbiAgJzxkaXYgc3R5bGU9XCJwYWRkaW5nOjE1cHggMCA1cHggMDttYXJnaW4tYm90dG9tOjVweDtoZWlnaHQ6IDUwcHhcIj4nK1xuICAgICc8ZGl2IGNsYXNzPVwiYnRuLWdyb3VwIHB1bGwtcmlnaHRcIiBpZD1cInRyZWUtc3ViLW1lbnVcIj4nK1xuICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGRyb3Bkb3duLXRvZ2dsZVwiIGRhdGEtdG9nZ2xlPVwiZHJvcGRvd25cIj4nK1xuICAgICAgICAnPHNwYW4gaWQ9XCJsb2FkZWQtdHJlZS1uYW1lXCI+RGVmYXVsdCBUcmVlPC9zcGFuPiA8c3BhbiBjbGFzcz1cImNhcmV0XCI+PC9zcGFuPicrXG4gICAgICAnPC9idXR0b24+JytcbiAgICAgICc8dWwgY2xhc3M9XCJkcm9wZG93bi1tZW51XCIgcm9sZT1cIm1lbnVcIj4nK1xuICAgICAgICAnPGxpPjxhIGlkPVwiZ2RyaXZlLXRyZWVwYW5lbC1sb2FkXCI+PGkgY2xhc3M9XCJpY29uLWNsb3VkLWRvd25sb2FkXCI+PC9pPiBMb2FkIFRyZWU8L2E+PC9saT4nK1xuICAgICAgICAnPGxpPjxhIGlkPVwiZ2RyaXZlLXRyZWVwYW5lbC1zYXZlXCI+PGkgY2xhc3M9XCJpY29uLWNsb3VkLXVwbG9hZFwiPjwvaT4gU2F2ZSBUcmVlPC9hPjwvbGk+JytcbiAgICAgICAgJzxsaSBzdHlsZT1cImRpc3BsYXk6bm9uZVwiPjxhIGlkPVwic2hhcmUtdHJlZS1idG5cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiIHN0eWxlPVwiZGlzcGxheTpub25lO21hcmdpbi1sZWZ0OjEwcHhcIj48aSBjbGFzcz1cImljb24tc2hhcmVcIj48L2k+IFNoYXJlIFRyZWU8L2E+PC9saT4nK1xuICAgICAgJzwvdWw+JytcbiAgJzwvZGl2PicrXG4gICc8ZGl2IHN0eWxlPVwiZGlzcGxheTpub25lXCI+PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGlkPVwiY29tcGFyZS10cmVlc1wiIC8+IENvbXBhcmUgVHJlZXM8L2Rpdj4nK1xuJzwvZGl2Pic7XG5cbnZhciBJTlBVVF9URU1QTEFURSA9XG4gICc8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPicrXG4gICAgJzxsYWJlbCBmb3I9XCJ7e2lkfX1cIiBjbGFzcz1cImNvbC1sZy00IGNvbnRyb2wtbGFiZWxcIj57e2xhYmVsfX08L2xhYmVsPicrXG4gICAgJzxkaXYgY2xhc3M9XCJjb2wtbGctOFwiPicrXG4gICAgICAnPGlucHV0IHR5cGU9XCJ7e3R5cGV9fVwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgaWQ9XCJ7e2lkfX1cIiBzdHlsZT1cIndpZHRoOjIwMHB4O2Rpc3BsYXk6aW5saW5lLWJsb2NrXCIgdmFsdWU9XCJ7e3ZhbHVlfX1cIj4mbmJzcDsmbmJzcDt7e3VuaXRzfX0nK1xuICAgICAgJzxwIGNsYXNzPVwiaGVscC1ibG9ja1wiPnt7ZGVzY3JpcHRpb259fTwvcD4nICtcbiAgICAnPC9kaXY+JytcbiAgJzwvZGl2Pic7XG5cbnZhciBBUlJBWV9JTlBVVF9URU1QTEFURSA9XG4gICc8ZGl2IGNsYXNzPVwiY29sLWxnLTZcIj48ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPicrXG4gICAgJzxsYWJlbCBmb3I9XCJ7e2lkfX1cIiBjbGFzcz1cImNvbC1sZy00IGNvbnRyb2wtbGFiZWxcIj57e2xhYmVsfX08L2xhYmVsPicrXG4gICAgJzxkaXYgY2xhc3M9XCJjb2wtbGctOFwiPicrXG4gICAgICAne3tpbnB1dHN9fScrXG4gICAgICAnPHAgY2xhc3M9XCJoZWxwLWJsb2NrXCI+e3tkZXNjcmlwdGlvbn19PC9wPicgK1xuICAgICc8L2Rpdj4nK1xuICAnPC9kaXY+PC9kaXY+JztcblxudmFyIHRhYkhlYWRlciA9ICc8dWwgY2xhc3M9XCJuYXYgbmF2LXBpbGxzXCIgaWQ9XCJpbnB1dF9waWxsc1wiPic7XG52YXIgY29udGVudCA9ICc8ZGl2IGNsYXNzPVwicGlsbC1jb250ZW50XCI+JztcblxudmFyIHRyZWVIZWFkZXIgPSAnPGRpdiBjbGFzcz1cInBhbmVsLWdyb3VwXCIgaWQ9XCJ0cmVlLWFjY29yZGlvblwiPic7XG52YXIgVFJFRV9QQU5FTF9URU1QTEFURSA9ICc8ZGl2IGNsYXNzPVwicGFuZWwgcGFuZWwtZGVmYXVsdFwiPicrXG4gICAgICAgICc8ZGl2IGNsYXNzPVwicGFuZWwtaGVhZGluZ1wiPicrXG4gICAgICAgICAgICAnPGg0IGNsYXNzPVwicGFuZWwtdGl0bGVcIj4nK1xuICAgICAgICAgICAgICAgICc8YSBjbGFzcz1cImFjY29yZGlvbi10b2dnbGVcIiBkYXRhLXRvZ2dsZT1cImNvbGxhcHNlXCIgZGF0YS1wYXJlbnQ9XCIjdHJlZS1hY2NvcmRpb25cIiBocmVmPVwiI2NvbGxhcHNle3tpZH19XCI+JytcbiAgICAgICAgICAgICAgICAgICAgJ3t7dGl0bGV9fScrXG4gICAgICAgICAgICAgICAgJzwvYT4nK1xuICAgICAgICAgICAgJzwvaDQ+JytcbiAgICAgICAgJzwvZGl2PicrXG4gICAgICAgICc8ZGl2IGlkPVwiY29sbGFwc2V7e2lkfX1cIiBjbGFzcz1cInBhbmVsLWNvbGxhcHNlIGNvbGxhcHNlXCI+JytcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwicGFuZWwtYm9keVwiPnt7Ym9keX19PC9kaXY+JytcbiAgICAgICAgJzwvZGl2PicrXG4gICAgICc8L2Rpdj4nO1xuXG52YXIgaW5wdXRzID0ge307XG5cbi8vIGZvciB3ZWF0aGVyIGRhdGFcbnZhciBjb2xzID0gW107XG5cbnZhciBtYXAgPSBudWxsO1xuXG4vKipcbiAqIE9wdGlvbnMgOlxuICogICBtb2RlbCAtIHR5cGUgb2YgbW9kZWwgdG8gYXBwZW5kIHRvXG4gKiAgIGxhYmVsIC0gYXR0cmlidXRlIGxhYmVsXG4gKiAgIHZhbHVlIC0gZGVmYXVsdCB2YWx1ZVxuICogICBkZXNjcmlwdGlvbiAtIGRlc2NyaXB0aW9uIG9mIGF0dHJpYnV0ZVxuICogICB1bml0cyAtIGF0dHJpYnV0ZSB1bml0c1xuICovXG5mdW5jdGlvbiBfYWRkSW5wdXQob3B0aW9ucykge1xuICBpZiggIWlucHV0c1tvcHRpb25zLm1vZGVsXSApIGlucHV0c1tvcHRpb25zLm1vZGVsXSA9IFtdO1xuICBpbnB1dHNbb3B0aW9ucy5tb2RlbF0ucHVzaChvcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gX2NyZWF0ZVdlYXRoZXJJbnB1dHMoKSB7XG4gIGZvciggdmFyIGF0dHIgaW4gYXBwLmdldE1vZGVsKCkuZ2V0RGF0YU1vZGVsKCkud2VhdGhlciApIHtcbiAgICBpZiggYXR0ciAhPSBcIm5yZWxcIiApIGNvbHMucHVzaChhdHRyKTtcbiAgfVxuXG4gIHZhciB0YWJsZSA9ICc8ZGl2IHN0eWxlPVwicGFkZGluZy10b3A6MjVweFwiPjxhIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IHB1bGwtcmlnaHRcIiBpZD1cImxvYWQtd2VhdGhlci1idG5cIj48aSBjbGFzcz1cImljb24tdXBsb2FkLWFsdFwiPjwvaT4gVXBsb2FkPC9hPicrXG4gICAgICAgICc8ZGl2IGNsYXNzPVwiYnRuLWdyb3VwXCIgaWQ9XCJ3ZWF0aGVyLWlucHV0LXRvZ2dsZVwiPicrXG4gICAgICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGFjdGl2ZVwiPkF2ZXJhZ2VzPC9idXR0b24+JytcbiAgICAgICAgICAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIj5BY3R1YWw8L2J1dHRvbj4nK1xuICAgICAgICAnPC9kaXY+JytcbiAgICAgICAgJzwvZGl2PicrXG4gICAgICAgICc8ZGl2IGlkPVwiY3VzdG9tLXdlYXRoZXItcGFuZWxcIiBzdHlsZT1cImRpc3BsYXk6bm9uZTttYXJnaW4tdG9wOjIwcHhcIj48L2Rpdj4nK1xuICAgICAgICAnPGRpdiBpZD1cImF2ZXJhZ2Utd2VhdGhlci1wYW5lbFwiPicrXG4gICAgICAgICc8ZGl2IHN0eWxlPVwicGFkZGluZzoxMHB4O2NvbG9yOiM4ODhcIj5TZWxlY3QgbG9jYXRpb24gdG8gc2V0IHRoZSBhdmVyYWdlIHdlYXRoZXIgZGF0YTwvZGl2PicrXG4gICAgICAgICc8dGFibGUgY2xhc3M9XCJ0YWJsZSB0YWJsZS1zdHJpcGVkIHRhYmxlLWNvbmRlbnNlZCB3ZWF0aGVyLXRhYmxlXCIgc3R5bGU9XCJtYXJnaW4tdG9wOjIwcHhcIj4nO1xuXG4gIHRhYmxlICs9IFwiPHRyPlwiO1xuICBmb3IoIHZhciBpID0gMDsgaSA8IGNvbHMubGVuZ3RoOyBpKysgKSB7XG4gICAgdGFibGUgKz0gXCI8dGQ+XCIrY29sc1tpXStcIjwvdGQ+XCI7XG4gIH1cbiAgdGFibGUgKz0gXCI8L3RyPlwiO1xuXG4gIGZvciggdmFyIGkgPSAwOyBpIDwgMTI7IGkrKyApIHtcbiAgICB2YXIgbSA9IChpKzEpKycnO1xuICAgIGlmKCBtLmxlbmd0aCA9PSAxICkgbSA9ICcwJyttO1xuXG4gICAgdGFibGUgKz0gXCI8dHI+XCI7XG4gICAgZm9yKCB2YXIgaiA9IDA7IGogPCBjb2xzLmxlbmd0aDsgaisrICkge1xuICAgICAgaWYoIGogPT0gMCApIHtcbiAgICAgICAgdGFibGUgKz0gXCI8dGQ+XCIrKGkrMSkrXCI8L3RkPlwiO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGFibGUgKz0gXCI8dGQ+PGlucHV0IGNsYXNzPSdmb3JtLWNvbnRyb2wnIGlkPSdpbnB1dC13ZWF0aGVyLVwiK2NvbHNbal0rXCItXCIrbStcIicgdHlwZT0ndGV4dCcgLz48L3RkPlwiO1xuICAgICAgfVxuICAgIH1cbiAgICB0YWJsZSArPSBcIjwvdHI+XCI7XG4gIH1cbiAgcmV0dXJuIHRhYmxlKyc8L3RhYmxlPjxkaXYgaWQ9XCJhdmVyYWdlLXdlYXRoZXItY2hhcnRcIj48L2Rpdj48L2Rpdj4nO1xuXG59XG5cbmZ1bmN0aW9uIF9zZXRXZWF0aGVyRGF0YSgpIHtcbiAgdmFyIGxsID0gYXBwLnFzKFwibGxcIik7XG4gIGlmKCBsbCApIHtcbiAgICBsbCA9IGxsLnNwbGl0KFwiLFwiKTtcbiAgICBfcXVlcnlXZWF0aGVyRGF0YShsbFswXSwgbGxbMV0sIGZ1bmN0aW9uKCkge1xuICAgICAgICBhcHAucnVuTW9kZWwoKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICAkKFwiI2N1cnJlbnQtbG9jYXRpb25cIikuaHRtbChcIk5vdCBTZXRcIik7XG4gIH1cbn1cblxuZnVuY3Rpb24gX3F1ZXJ5V2VhdGhlckRhdGEobG5nLCBsYXQsIGNhbGxiYWNrKSB7XG4gIGdhKCdzZW5kJywgJ2V2ZW50JywgJ3VpJywgJ2ludGVyYWN0aW9uJywgJ3dlYXRoZXItZGF0YS1xdWVyeScsIDEpO1xuXG4gIHZhciB1cmwgPSBcImh0dHA6Ly9hbGRlci5iaW9lbmVyZ3kuY2FzaWwudWNkYXZpcy5lZHU6ODA4MC92aXpzb3VyY2UvcmVzdD92aWV3PXBvaW50VG9XZWF0aGVyKFwiK2xuZytcIixcIitsYXQrXCIsODE5MilcIlxuICB2YXIgcSA9IG5ldyBnb29nbGUudmlzdWFsaXphdGlvbi5RdWVyeSh1cmwpO1xuICB2YXIgcmVzcHMgPSAwO1xuXG4gIGZ1bmN0aW9uIGNoZWNrRG9uZSgpIHtcbiAgICAgIHJlc3BzKys7XG4gICAgICBpZiggcmVzcHMgPT0gMiAmJiBjYWxsYmFjayApIGNhbGxiYWNrKCk7XG4gIH1cblxuICBxLnNldFF1ZXJ5KCdTRUxFQ1QgKicpO1xuICBxLnNlbmQoZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgIHZhciB0YWJsZSA9IEpTT04ucGFyc2UocmVzcG9uc2UuZ2V0RGF0YVRhYmxlKCkudG9KU09OKCkpO1xuXG4gICAgZm9yKCB2YXIgaSA9IDA7IGkgPCB0YWJsZS5yb3dzLmxlbmd0aDsgaSsrICkge1xuICAgICAgdmFyIG0gPSAoaSsxKSsnJztcbiAgICAgIGlmKCBtLmxlbmd0aCA9PSAxICkgbSA9ICcwJyttO1xuXG4gICAgICB3ZWF0aGVyQXZlcmFnZUNoYXJ0RGF0YVttXSA9IHt9O1xuICAgICAgZm9yKCB2YXIgaiA9IDE7IGogPCB0YWJsZS5jb2xzLmxlbmd0aDsgaisrICkge1xuICAgICAgICAkKFwiI2lucHV0LXdlYXRoZXItXCIrY29sc1tqXStcIi1cIittKS52YWwodGFibGUucm93c1tpXS5jW2pdID8gdGFibGUucm93c1tpXS5jW2pdLnYgOiBcIlwiKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVBdmVyYWdlQ2hhcnQoKTtcbiAgICBjaGVja0RvbmUoKTtcbiAgfSk7XG5cbiAgdmFyIHVybCA9IFwiaHR0cDovL2FsZGVyLmJpb2VuZXJneS5jYXNpbC51Y2RhdmlzLmVkdTo4MDgwL3ZpenNvdXJjZS9yZXN0P3ZpZXc9cG9pbnRUb1NPSUwoXCIrbG5nK1wiLFwiK2xhdCtcIiw4MTkyKVwiXG4gIHZhciBxID0gbmV3IGdvb2dsZS52aXN1YWxpemF0aW9uLlF1ZXJ5KHVybCk7XG4gIHEuc2V0UXVlcnkoJ1NFTEVDVCAqJyk7XG4gIHEuc2VuZChmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgdmFyIGVycm9yID0gZmFsc2U7XG4gICAgdmFyIHRhYmxlID0gSlNPTi5wYXJzZShyZXNwb25zZS5nZXREYXRhVGFibGUoKS50b0pTT04oKSk7XG4gICAgZm9yKCB2YXIgaSA9IDA7IGkgPCB0YWJsZS5jb2xzLmxlbmd0aDsgaSsrICkge1xuICAgICAgaWYoIHRhYmxlLnJvd3NbMF0gPT0gbnVsbCApIHtcbiAgICAgICAgZXJyb3IgPSB0cnVlO1xuICAgICAgICBhbGVydChcIkludmFsaWQgbG9jYXRpb24gc2VsZWN0ZWRcIik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICB2YXIga2V5ID0gdGFibGUuY29sc1tpXS5pZDtcbiAgICAgIGlmKCBrZXkgPT09ICdtYXhhd3MnICkga2V5ID0gJ21heEFXUyc7XG5cbiAgICAgICQoXCIjaW5wdXQtc29pbC1cIitrZXkpLnZhbCh0YWJsZS5yb3dzWzBdLmNbaV0udik7XG4gICAgfVxuXG4gICAgaWYoICFlcnJvciApIGNoZWNrRG9uZSgpO1xuICB9KTtcblxuICAkKFwiI2N1cnJlbnQtbG9jYXRpb25cIikuaHRtbChsbmcrXCIsIFwiK2xhdCtcIiA8YSBocmVmPSdcIit3aW5kb3cubG9jYXRpb24uaHJlZi5yZXBsYWNlKC8jLiovLCcnKStcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiP2xsPVwiK2xuZytcIixcIitsYXQrXCInIHRhcmdldD0nX2JsYW5rJz48aSBjbGFzcz0naWNvbi1saW5rJz48L2k+PC9hPlwiKTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlQXZlcmFnZUNoYXJ0KCkge1xuICB3ZWF0aGVyQXZlcmFnZUNoYXJ0RGF0YSA9IHt9O1xuXG4gIGZvciggdmFyIGkgPSAwOyBpIDwgMTI7IGkrKyApIHtcbiAgICB2YXIgbSA9IChpKzEpKycnO1xuICAgIGlmKCBtLmxlbmd0aCA9PSAxICkgbSA9ICcwJyttO1xuXG4gICAgd2VhdGhlckF2ZXJhZ2VDaGFydERhdGFbbV0gPSB7fTtcbiAgICBmb3IoIHZhciBqID0gMTsgaiA8IGNvbHMubGVuZ3RoOyBqKysgKSB7XG4gICAgICB2YXIgdmFsID0gJChcIiNpbnB1dC13ZWF0aGVyLVwiK2NvbHNbal0rXCItXCIrbSkudmFsKCk7XG4gICAgICBpZiggdmFsICYmIHZhbC5sZW5ndGggPiAwICkgd2VhdGhlckF2ZXJhZ2VDaGFydERhdGFbbV1bY29sc1tqXV0gPSBwYXJzZUludCh2YWwpO1xuICAgICAgZWxzZSB3ZWF0aGVyQXZlcmFnZUNoYXJ0RGF0YVttXVtjb2xzW2pdXSA9IDA7XG4gICAgfVxuICB9XG4gIHdlYXRoZXJBdmVyYWdlQ2hhcnQgPSBjaGFydHMuY3JlYXRlV2VhdGhlckNoYXJ0KCQoJyNhdmVyYWdlLXdlYXRoZXItY2hhcnQnKVswXSwgd2VhdGhlckF2ZXJhZ2VDaGFydERhdGEpO1xufVxuXG5mdW5jdGlvbiBfc2VsZWN0V2VhdGhlckxvY2F0aW9uKCkge1xuICBpZiggIW1hcCApIHtcbiAgICAkKFwiI3NlbGVjdC13ZWF0aGVyLW1vZGFsXCIpLm1vZGFsKHt9KTtcblxuICAgICQoXCIjbG9jYXRlLWJ1dHRvblwiKS5vbignY2xpY2snLCBfZ2V0TG9jYXRpb24pO1xuXG5cbiAgICAvLyB3YWl0IGZvciB0aGUgbW9kYWwgdG8gaW5pdFxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgIGlmKCBvZmZsaW5lTW9kZSApIHJldHVybjtcblxuICAgICAgbWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcCgkKFwiI2dtYXBcIilbMF0sIHtcbiAgICAgICAgY2VudGVyIDogbmV3IGdvb2dsZS5tYXBzLkxhdExuZygzNSwgLTEyMSksXG4gICAgICAgIHpvb206IDUsXG4gICAgICAgIG1hcFR5cGVJZCA6IGdvb2dsZS5tYXBzLk1hcFR5cGVJZC5ST0FETUFQXG4gICAgICB9KTtcblxuICAgICAgdmFyIGRlZmF1bHRTdHlsZSA9IHtcbiAgICAgICAgICAgIHBvbHlnb25PcHRpb25zOiB7XG4gICAgICAgICAgICAgIHN0cm9rZUNvbG9yICAgOiBcIiMwMDAwRkZcIixcbiAgICAgICAgICAgICAgc3Ryb2tlT3BhY2l0eSA6IDAuNSxcbiAgICAgICAgICAgICAgZmlsbENvbG9yICAgICA6ICcjRkVGRUZFJyxcbiAgICAgICAgICAgICAgZmlsbE9wYWNpdHkgICA6IDAuMlxuICAgICAgICAgICAgfSxcbiAgICAgIH07XG5cblxuICAgICAgdmFyIGRlZmF1bHRPcHRpb25zID0ge1xuICAgICAgICAgIHF1ZXJ5OiB7XG4gICAgICAgICAgICBzZWxlY3Q6ICdib3VuZGFyeScsXG4gICAgICAgICAgICBmcm9tOiAnMWhWOXZRRzNTYzBKTFBkdUZwV0p6dGZMSy1leDZjY3lNZ19wdEVfcydcbiAgICAgICAgICB9LFxuICAgICAgICAgIHN0eWxlczogW2RlZmF1bHRTdHlsZV0sXG4gICAgICAgICAgc3VwcHJlc3NJbmZvV2luZG93cyA6IHRydWVcbiAgICAgIH07XG5cbiAgICAgIHZhciBmdXNpb25MYXllciA9IG5ldyBnb29nbGUubWFwcy5GdXNpb25UYWJsZXNMYXllcihkZWZhdWx0T3B0aW9ucyk7XG4gICAgICBmdXNpb25MYXllci5vcGFjaXR5ID0gLjg7XG4gICAgICBmdXNpb25MYXllci5zZXRNYXAobWFwKTtcblxuICAgICAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIobWFwLCAnY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmKCAkKCcjbG9jYXRlLWNhY2hlLW1vZGUnKS5pcygnOmNoZWNrZWQnKSApIHtcbiAgICAgICAgICBhbGVydCgnWW91IG11c3QgY2xpY2sgb24gYSBnZW9tZXRyeSB0byBjYWNoZScpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIF9xdWVyeVdlYXRoZXJEYXRhKGUubGF0TG5nLmxuZygpLCBlLmxhdExuZy5sYXQoKSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICBhcHAucnVuTW9kZWwoKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICQoXCIjc2VsZWN0LXdlYXRoZXItbW9kYWxcIikubW9kYWwoJ2hpZGUnKTtcbiAgICAgIH0pO1xuICAgICAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIoZnVzaW9uTGF5ZXIsICdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYoICQoJyNsb2NhdGUtY2FjaGUtbW9kZScpLmlzKCc6Y2hlY2tlZCcpICkge1xuICAgICAgICAgIG9mZmxpbmUuY2FjaGVUaWxlKGUsIGZ1c2lvbkxheWVyLCBkZWZhdWx0T3B0aW9ucywgZGVmYXVsdFN0eWxlKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBfcXVlcnlXZWF0aGVyRGF0YShlLmxhdExuZy5sbmcoKSwgZS5sYXRMbmcubGF0KCksIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgYXBwLnJ1bk1vZGVsKCk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAkKFwiI3NlbGVjdC13ZWF0aGVyLW1vZGFsXCIpLm1vZGFsKCdoaWRlJyk7XG4gICAgICB9KTtcblxuICAgICAgLy8gc2V0dXAgaW5wdXQgZm9yIGNsZWFyaW5nIGNhY2hlXG4gICAgICAgICAgJCgnI2NsZWFyLWNhY2hlZC10aWxlcycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgIG9mZmxpbmUuY2xlYXJDYWNoZSgpO1xuICAgICAgICAgICAgICBvZmZsaW5lLnJlbmRlckNhY2hlZFRpbGVzT25NYXAoZnVzaW9uTGF5ZXIsIGRlZmF1bHRPcHRpb25zLCBkZWZhdWx0U3R5bGUpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICBvZmZsaW5lLnJlbmRlckNhY2hlZFRpbGVzT25NYXAoZnVzaW9uTGF5ZXIsIGRlZmF1bHRPcHRpb25zLCBkZWZhdWx0U3R5bGUpO1xuXG4gICAgfSw1MDApO1xuICB9IGVsc2Uge1xuICAgICQoXCIjc2VsZWN0LXdlYXRoZXItbW9kYWxcIikubW9kYWwoJ3Nob3cnKTtcblxuICAgIC8vIHdlIHNlZW0gdG8gYmUgaGFuZ2luZyBzb21ldGltZXMuLi4uXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgZ29vZ2xlLm1hcHMuZXZlbnQudHJpZ2dlcihtYXAsIFwicmVzaXplXCIpO1xuICAgIH0sIDUwMCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gX2dldExvY2F0aW9uKCkge1xuICBpZiAobmF2aWdhdG9yLmdlb2xvY2F0aW9uKSB7XG4gICAgbmF2aWdhdG9yLmdlb2xvY2F0aW9uLmdldEN1cnJlbnRQb3NpdGlvbihzaG93UG9zaXRpb24pO1xuICAgICQoXCIjbG9jYXRlLWJ1dHRvblwiKS5hZGRDbGFzcyhcImJ0bi13YXJuaW5nXCIpO1xuICB9IGVsc2V7XG4gICAgd2luZG93LmFsZXJ0KFwiR2VvbG9jYXRpb24gaXMgbm90IHN1cHBvcnRlZCBieSB0aGlzIGJyb3dzZXIuXCIpO1xuICB9XG4gIGZ1bmN0aW9uIHNob3dQb3NpdGlvbihwb3NpdGlvbikge1xuICAgICQoXCIjbG9jYXRlLWJ1dHRvblwiKS5yZW1vdmVDbGFzcyhcImJ0bi13YXJuXCIpLmFkZENsYXNzKFwiYnRuLXN1Y2Nlc3NcIik7XG4gICAgbWFwLnNldFpvb20oMTApO1xuICAgIG1hcC5zZXRDZW50ZXIobmV3IGdvb2dsZS5tYXBzLkxhdExuZyhwb3NpdGlvbi5jb29yZHMubGF0aXR1ZGUsIHBvc2l0aW9uLmNvb3Jkcy5sb25naXR1ZGUpKTtcbiAgICAvL19xdWVyeVdlYXRoZXJEYXRhKHBvc2l0aW9uLmNvb3Jkcy5sb25naXR1ZGUsIHBvc2l0aW9uLmNvb3Jkcy5sYXRpdHVkZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gX2dlbmVyYXRlSW5wdXRzKGksIHR5cGUsIHByZWZpeCwgbmFtZSwgYXR0cnMpIHtcbiAgdmFyIGlkID0gcHJlZml4Lmxlbmd0aCA+IDAgPyBwcmVmaXgrJy0nK25hbWUgOiAnaW5wdXQtJytuYW1lO1xuICB2YXIgaW5wdXQgPSAnPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIiBzdHlsZT1cIm1hcmdpbi1sZWZ0OicrKGkqMjApKydweDttYXJnaW4tdG9wOjBweDttYXJnaW4tcmlnaHQ6NXB4XCI+JztcblxuICB2YXIgdHJlZWJvZHkgPSBcIlwiO1xuXG4gIGlmKCAhKGkgPT0gMSkgKSB7XG4gICAgICBpZiggaSAhPSAwICkgaW5wdXQgKz0gJzxsYWJlbCBmb3I9XCInK2lkKydcIiBjbGFzcz1cImNvbnRyb2wtbGFiZWxcIj4nK25hbWUgKyc8L2xhYmVsPic7XG4gICAgICBpbnB1dCArPSAnPGRpdj4nO1xuICB9XG5cblxuICAgICAgaWYgKCB0eXBlb2YgYXR0cnMudmFsdWUgPT0gJ29iamVjdCcgJiYgaSA9PSAxICApIHsgLy8gJiYgdHlwZSA9PSAndHJlZScgKSB7XG4gICAgICBmb3IoIHZhciBrZXkgaW4gYXR0cnMudmFsdWUgKSB7XG4gICAgICAgICAgICAgIHRyZWVib2R5ICs9IF9nZW5lcmF0ZUlucHV0cyhpKzEsIHR5cGUsIGlkLCBrZXksIGF0dHJzLnZhbHVlW2tleV0pO1xuICAgICAgICAgIH1cbiAgfSBlbHNlIGlmICggdHlwZW9mIGF0dHJzLnZhbHVlID09ICdvYmplY3QnICkge1xuICAgICAgaWYoIGF0dHJzLmRlc2NyaXB0aW9uICkgaW5wdXQgKz0gJzxwIGNsYXNzPVwiaGVscC1ibG9ja1wiPicrYXR0cnMuZGVzY3JpcHRpb24rJzwvcD4nO1xuICAgICAgICAgIGZvciggdmFyIGtleSBpbiBhdHRycy52YWx1ZSApIHtcbiAgICAgICAgICAgICAgaW5wdXQgKz0gX2dlbmVyYXRlSW5wdXRzKGkrMSwgdHlwZSwgaWQsIGtleSwgYXR0cnMudmFsdWVba2V5XSk7XG4gICAgICAgICAgfVxuICB9IGVsc2UgaWYgKCAodHlwZW9mIGF0dHJzLnZhbHVlID09ICdudW1iZXInIHx8IHR5cGVvZiBhdHRycy52YWx1ZSA9PSAnc3RyaW5nJykgJiYgaSA9PSAxICkgeyAvLyAmJiB0eXBlID09ICd0cmVlJyApIHtcblxuICAgICAgdHJlZWJvZHkgKz1cbiAgICAgICAgICAnPGRpdj48aW5wdXQgdHlwZT1cIicrKGF0dHJzLnZhbHVlID09ICdfZGF0ZV8nID8gJ2RhdGUnIDogJ3RleHQnKSsnXCIgJytcbiAgICAgICAgICAodHlwZT09J2NvbnN0YW50cyc/J2Rpc2FibGVkJzonJykrJyBjbGFzcz1cImZvcm0tY29udHJvbCAnK3R5cGUrJ1wiIGlkPVwiJytcbiAgICAgICAgICBpZCsnXCIgc3R5bGU9XCJ3aWR0aDoyMDBweDtkaXNwbGF5OmlubGluZS1ibG9ja1wiIHZhbHVlPVwiJ1xuICAgICAgICAgICAgICArKGF0dHJzLnZhbHVlID09ICdfZGF0ZV8nID8gJycgOiBhdHRycy52YWx1ZSkrJ1wiPiZuYnNwOyZuYnNwOydcbiAgICAgICAgICAgICAgKyhhdHRycy51bml0cyA/IGF0dHJzLnVuaXRzIDogJycpKyc8L2Rpdj4nO1xuXG4gIH0gZWxzZSBpZiAoICB0eXBlb2YgYXR0cnMudmFsdWUgPT0gJ3N0cmluZycgfHwgdHlwZW9mIGF0dHJzLnZhbHVlID09ICdudW1iZXInICkge1xuXG4gICAgaW5wdXQgKz0gJzxkaXY+PGlucHV0IHR5cGU9XCInKyhhdHRycy52YWx1ZSA9PSAnX2RhdGVfJyA/ICdkYXRlJyA6ICd0ZXh0JykrJ1wiICdcbiAgICAgICAgICArKHR5cGU9PSdjb25zdGFudHMnPydkaXNhYmxlZCc6JycpKycgY2xhc3M9XCJmb3JtLWNvbnRyb2wgJyt0eXBlK1xuICAgICAgICAgICAnXCIgaWQ9XCInK2lkKydcIiBzdHlsZT1cIndpZHRoOjIwMHB4O2Rpc3BsYXk6aW5saW5lLWJsb2NrXCIgdmFsdWU9XCInXG4gICAgICAgICAgKyhhdHRycy52YWx1ZSA9PSAnX2RhdGVfJyA/ICcnIDogYXR0cnMudmFsdWUpKydcIj4mbmJzcDsmbmJzcDsnXG4gICAgICAgICAgKyhhdHRycy51bml0cyA/IGF0dHJzLnVuaXRzIDogJycpKyc8L2Rpdj4nO1xuXG4gICAgaWYoIGF0dHJzLmRlc2NyaXB0aW9uICkgaW5wdXQgKz0gJzxwIGNsYXNzPVwiaGVscC1ibG9ja1wiPicrYXR0cnMuZGVzY3JpcHRpb24rJzwvcD4nO1xuICB9XG5cbiAgaWYoICEoaSA9PSAxIC8qJiYgdHlwZSA9PSAndHJlZScqLykgKSB7XG4gICAgICBpbnB1dCArPSAnPC9kaXY+PC9kaXY+JztcbiAgfSBlbHNlIHtcbiAgICAgIGlucHV0ICs9IFRSRUVfUEFORUxfVEVNUExBVEVcbiAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC97e2lkfX0vZyxpZClcbiAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKCd7e3RpdGxlfX0nLG5hbWUrXCIgPHNwYW4gc3R5bGU9J2NvbG9yOiM4ODg7Zm9udC1zaXplOjEycHgnPiAtIFwiK2F0dHJzLmRlc2NyaXB0aW9uK1wiPC9zcGFuPlwiKVxuICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoJ3t7Ym9keX19Jyx0cmVlYm9keSkrJzwvZGl2PidcbiAgfVxuXG4gIHJldHVybiBpbnB1dDtcbn1cblxuZnVuY3Rpb24gY3JlYXRlKGVsZSkge1xuICB3ZWF0aGVyRmlsZVJlYWRlci5pbml0KCk7XG4gIHZhciBtb2RlbCwgbSwgYXR0ciwgY29uZmlnO1xuXG4gIHZhciBpbnB1dHMgPSAkLmV4dGVuZCh0cnVlLCB7fSwgYXBwLmdldE1vZGVsKCkuZ2V0RGF0YU1vZGVsKCkpO1xuXG4gIGlucHV0c1snc2V0dXAnXSA9IHt9O1xuICBmb3IoIG1vZGVsIGluIGlucHV0cyApIHtcbiAgICBtID0gaW5wdXRzW21vZGVsXTtcbiAgICBmb3IoIGF0dHIgaW4gbSApIHtcbiAgICAgIGNvbmZpZyA9IG1bYXR0cl07XG5cbiAgICAgIGlmKCB0eXBlb2YgY29uZmlnID09ICdvYmplY3QnICkge1xuICAgICAgICBfYWRkSW5wdXQoe1xuICAgICAgICAgIG1vZGVsICAgICAgIDogbW9kZWwsXG4gICAgICAgICAgbGFiZWwgICAgICAgOiBhdHRyLFxuICAgICAgICAgIGRlc2NyaXB0aW9uIDogY29uZmlnLmRlc2NyaXB0aW9uLFxuICAgICAgICAgIHZhbHVlICAgICAgIDogY29uZmlnLnZhbHVlLFxuICAgICAgICAgIHVuaXRzICAgICAgIDogY29uZmlnLnVuaXRzXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgX2FkZElucHV0KHtcbiAgICAgICAgICBtb2RlbCAgICAgICA6IG1vZGVsLFxuICAgICAgICAgIGxhYmVsICAgICAgIDogYXR0clxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuXG4gIGZvciggbW9kZWwgaW4gaW5wdXRzICkge1xuICAgIGlmKCBtb2RlbCA9PSBcInBsYW50YXRpb25fc3RhdGVcIiApIGNvbnRpbnVlO1xuXG4gICAgdGFiSGVhZGVyICs9ICc8bGk+PGEgaHJlZj1cIiNpbnB1dHNfJyttb2RlbCsnXCIgaWQ9XCJ0YWJfaW5wdXRzXycrbW9kZWwrJ1wiIGRhdGEtdG9nZ2xlPVwicGlsbFwiPidcbiAgICAgICAgICAgICAgICArbW9kZWwuc3Vic3RyKDAsMSkudG9VcHBlckNhc2UoKSttb2RlbC5zdWJzdHIoMSkudG9Mb3dlckNhc2UoKSsnPC9hPjwvbGk+JztcbiAgICB2YXIgYXR0cmlidXRlcyA9IGlucHV0c1ttb2RlbF07XG5cbiAgICBjb250ZW50ICs9ICcgPGRpdiBjbGFzcz1cInBpbGwtcGFuZVwiIGlkPVwiaW5wdXRzXycrbW9kZWwrJ1wiPic7XG5cbiAgICB2YXIgcm93MSA9IFwiXCI7XG4gICAgdmFyIHJvdzIgPSBcIjxkaXYgY2xhc3M9J2NvbC1sZy02PlwiO1xuXG4gICAgaWYoIG1vZGVsID09ICd3ZWF0aGVyJyApIHtcbiAgICAgIGNvbnRlbnQgKz0gX2NyZWF0ZVdlYXRoZXJJbnB1dHMoKTtcbiAgICB9IGVsc2UgaWYoIG1vZGVsID09ICdzZXR1cCcgKSB7XG4gICAgICBjb250ZW50ICs9IFNFVFVQX1RFTVBMQVRFO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnRlbnQgKz0gdHJlZUhlYWRlcjtcblxuICAgICAgICAvLyBhZGQgdGhlIGdvb2dsZSBkcml2ZSBidG4gZnJvbSB0cmVlc1xuICAgICAgICBpZiggbW9kZWwgPT0ndHJlZScgKSB7XG4gICAgICAgICAgY29udGVudCArPSBfY3JlYXRlVHJlZUlucHV0KG1vZGVsLCBpbnB1dHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnRlbnQgKz0gX2dlbmVyYXRlSW5wdXRzKDAsIG1vZGVsLCAnJywgbW9kZWwsIGlucHV0c1ttb2RlbF0pO1xuICAgICAgICB9XG5cbiAgICAgIGNvbnRlbnQgKz0gJzwvZGl2Pic7XG4gICAgfVxuXG5cbiAgICBjb250ZW50ICs9ICc8L2Rpdj4nO1xuICB9XG4gIGNvbnRlbnQgKz0gJzwvZGl2Pic7XG4gIHRhYkhlYWRlciArPSBcIjwvdWw+XCI7XG5cbiAgZWxlLmh0bWwodGFiSGVhZGVyK1wiPGRpdiBjbGFzcz0nZm9ybS1ob3Jpem9udGFsJz5cIitjb250ZW50K1wiPC9kaXY+XCIpO1xuXG4gIC8vIHJ1biB0aGUgbW9kZWwgd2hlbmV2ZXIgc29tZSBoaXRzICdlbnRlcidcbiAgZWxlLmZpbmQoJ2lucHV0Jykub24oJ2tleXVwJyxmdW5jdGlvbihlKXtcbiAgICBpZiggZS53aGljaCA9PSAxMyApIGFwcC5ydW5Nb2RlbCgpO1xuICB9KTtcblxuICAvLyBhZGQgY2xpY2sgaGFuZGxlciBmb3IgbG9hZGluZyBhIHRyZWVcbiAgZWxlLmZpbmQoXCIjZ2RyaXZlLXRyZWVwYW5lbC1sb2FkXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgZ2RyaXZlLnNob3dMb2FkVHJlZVBhbmVsKCk7XG4gIH0pO1xuICBlbGUuZmluZChcIiNnZHJpdmUtdHJlZXBhbmVsLXNhdmVcIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICBnZHJpdmUuc2hvd1NhdmVUcmVlUGFuZWwoKTtcbiAgfSk7XG5cbiAgLy8gc2V0IHRyZWUgaW5wdXQgaGFuZGxlcnNcbiAgJChcIiNjb21wYXJlLXRyZWVzXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgaWYoICQodGhpcykuaXMoJzpjaGVja2VkJykgKSB7XG4gICAgICAkKFwiI3NpbmdsZS10cmVlLWNvbnRlbnRcIikuaGlkZSgpO1xuICAgICAgJChcIiNjb21wYXJlLXRyZWUtY29udGVudFwiKS5zaG93KCk7XG4gICAgICAkKFwiI3RyZWUtc3ViLW1lbnVcIikuaGlkZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAkKFwiI3NpbmdsZS10cmVlLWNvbnRlbnRcIikuc2hvdygpO1xuICAgICAgJChcIiNjb21wYXJlLXRyZWUtY29udGVudFwiKS5oaWRlKCk7XG4gICAgICAkKFwiI3RyZWUtc3ViLW1lbnVcIikuc2hvdygpO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gc2V0IHBpbGwgY2xpY2sgaGFuZGxlcnNcbiAgJCgnI2lucHV0X3RhYnMgYScpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICQodGhpcykudGFiKCdzaG93JylcbiAgfSk7XG4gICQoJyN0YWJfaW5wdXRzX3dlYXRoZXInKS50YWIoJ3Nob3cnKTtcblxuICAkKCcuc2VsZWN0LXdlYXRoZXItbG9jYXRpb24nKS5vbignY2xpY2snLCBfc2VsZWN0V2VhdGhlckxvY2F0aW9uKTtcblxuXG4gICQoJyN3ZWF0aGVyUmVhZGVyLW1vZGFsJykubW9kYWwoe3Nob3c6ZmFsc2V9KTtcbiAgJCgnI2xvYWQtd2VhdGhlci1idG4nKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICQoJyN3ZWF0aGVyUmVhZGVyLW1vZGFsJykubW9kYWwoJ3Nob3cnKTtcbiAgfSk7XG5cbiAgJChcIiN3ZWF0aGVyLWlucHV0LXRvZ2dsZSAuYnRuXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgJCgnI3dlYXRoZXItaW5wdXQtdG9nZ2xlIC5idG4uYWN0aXZlJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuXG4gICAgaWYoICQodGhpcykuaHRtbCgpID09ICdBdmVyYWdlcycgKSB7XG4gICAgICAkKCcjYXZlcmFnZS13ZWF0aGVyLXBhbmVsJykuc2hvdygpO1xuICAgICAgJCgnI2N1c3RvbS13ZWF0aGVyLXBhbmVsJykuaGlkZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcHAuc2V0V2VhdGhlcigpO1xuICAgICAgJCgnI2F2ZXJhZ2Utd2VhdGhlci1wYW5lbCcpLmhpZGUoKTtcbiAgICAgICQoJyNjdXN0b20td2VhdGhlci1wYW5lbCcpLnNob3coKTtcbiAgICB9XG4gIH0pO1xuXG4gICQod2luZG93KS5vbigncmVzaXplJywgZnVuY3Rpb24oKXtcbiAgICBpZiggd2VhdGhlckF2ZXJhZ2VDaGFydCApe1xuICAgICAgd2VhdGhlckF2ZXJhZ2VDaGFydCA9IGNoYXJ0cy5jcmVhdGVXZWF0aGVyQ2hhcnQoJCgnI2F2ZXJhZ2Utd2VhdGhlci1jaGFydCcpWzBdLCB3ZWF0aGVyQXZlcmFnZUNoYXJ0RGF0YSk7XG4gICAgfVxuICB9KTtcblxuICBfc2V0V2VhdGhlckRhdGEoKTtcbn1cblxuZnVuY3Rpb24gX2NyZWF0ZVRyZWVJbnB1dChtb2RlbCwgaW5wdXRzKSB7XG4gIHZhciBjb250ZW50ID0gXCJcIjtcbiAgY29udGVudCArPSBHT09MRURSSVZFX1RSRUVfVEVNUExBVEU7XG5cbiAgY29udGVudCArPSAnPGRpdiBpZD1cInNpbmdsZS10cmVlLWNvbnRlbnRcIj4nO1xuICBjb250ZW50ICs9IF9nZW5lcmF0ZUlucHV0cygwLCBtb2RlbCwgJycsIG1vZGVsLCBpbnB1dHNbbW9kZWxdKTtcbiAgY29udGVudCArPSAnPC9kaXY+JztcblxuICBjb250ZW50ICs9ICc8ZGl2IGlkPVwiY29tcGFyZS10cmVlLWNvbnRlbnRcIiBzdHlsZT1cImRpc3BsYXk6bm9uZVwiPicrXG4gICAgICAgICc8dWwgY2xhc3M9XCJuYXYgbmF2LXRhYnNcIj4nK1xuICAgICAgICAgICc8bGkgY2xhc3M9XCJhY3RpdmVcIj48YSBocmVmPVwiI3RyZWUxXCIgZGF0YS10b2dnbGU9XCJ0YWJcIj5UcmVlIDE8L2E+PC9saT4nK1xuICAgICAgICAgICAgJzxsaT48YSBocmVmPVwiI3RyZWUyXCIgZGF0YS10b2dnbGU9XCJ0YWJcIj5UcmVlIDI8L2E+PC9saT4nK1xuICAgICAgICAnPC91bD4nK1xuICAgICAgICAnPGRpdiBjbGFzcz1cInRhYi1jb250ZW50XCI+JytcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwidGFiLXBhbmUgYWN0aXZlXCIgaWQ9XCJ0cmVlMVwiPicrXG4gICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwid2VsbFwiIHN0eWxlPVwidGV4dC1hbGlnbjpjZW50ZXI7bWFyZ2luLXRvcDoxMHB4XCI+JytcbiAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImJ0bi1ncm91cFwiPicrXG4gICAgICAgICAgICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGFjdGl2ZVwiPkN1c3RvbTwvYnV0dG9uPicrXG4gICAgICAgICAgICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCI+U2VsZWN0IFRyZWU8L2J1dHRvbj4nK1xuICAgICAgICAgICAgICAnPC9kaXY+JytcbiAgICAgICAgICAgICAgJzwvZGl2PicrXG4gICAgICAgICAgICAgIF9nZW5lcmF0ZUlucHV0cygwLCBtb2RlbCwgJ3QxJywgbW9kZWwsIGlucHV0c1ttb2RlbF0pK1xuICAgICAgICAgICAgJzwvZGl2PicrXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cInRhYi1wYW5lIGFjdGl2ZVwiIGlkPVwidHJlZTJcIj4nK1xuICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cIndlbGxcIiBzdHlsZT1cInRleHQtYWxpZ246Y2VudGVyO21hcmdpbi10b3A6MTBweFwiID4nK1xuICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiYnRuLWdyb3VwXCI+JytcbiAgICAgICAgICAgICAgICAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgYWN0aXZlXCI+Q3VzdG9tPC9idXR0b24+JytcbiAgICAgICAgICAgICAgICAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIj5TZWxlY3QgVHJlZTwvYnV0dG9uPicrXG4gICAgICAgICAgICAgICc8L2Rpdj4nK1xuICAgICAgICAgICAgICAnPC9kaXY+JytcbiAgICAgICAgICAgICAgX2dlbmVyYXRlSW5wdXRzKDAsIG1vZGVsLCAndDInLCBtb2RlbCwgaW5wdXRzW21vZGVsXSkrXG4gICAgICAgICAgICAnPC9kaXY+JytcbiAgICAgICAgICAnPC9kaXY+JytcbiAgICAgICAgICc8L2Rpdj4nO1xuXG4gIHJldHVybiBjb250ZW50O1xufVxuXG5cbnJldHVybiB7XG4gIGNyZWF0ZSA6IGNyZWF0ZSxcbiAgdXBkYXRlQXZlcmFnZUNoYXJ0OiB1cGRhdGVBdmVyYWdlQ2hhcnRcbn07XG5cbn07XG4iLCIvLyBTcGVjaWFsIFNhdWNlLi4uXG4vLyBiYXNpY2FsbHkgdGhlIGNvZGUgbG9hZGVkIGZyb20gR2l0SHViIGV4cGVjdHMgdGhlIGZvbGxvd2luZyB0byBleGlzdHMgaW4gdGhlIHdpbmRvdyBzY29wZVxuLy8gICBtM1BHSU9cbi8vICAgICAtIHJlYWRBbGxDb250YW50c1xuLy8gICAgIC0gcmVhZFdlYXRoZXJcbi8vICAgICAtIGR1bXBcbi8vICAgICAtIHJlYWRGcm9tSW5wdXRzXG4vLyBTbyB3ZSBpbmplY3QgZnVuY3Rpb25zIHRoYXQgaW50ZXJhY3Qgdy8gb3VyIFVJLCBtb2RlbCBpbiBubyB3YXkgY2FyZXNcbm1vZHVsZS5leHBvcnRzID0ge1xuICByZWFkIDogZnVuY3Rpb24obW9kZWwpIHtcbiAgICB0aGlzLm1vZGVsID0gbW9kZWw7XG5cbiAgICBtb2RlbC5kZWJ1ZyA9IHRydWU7XG5cbiAgICBpZiggIW1vZGVsLnBsYW50YXRpb24gKSBtb2RlbC5wbGFudGF0aW9uID0ge307XG4gICAgdGhpcy5yZWFkQWxsQ29uc3RhbnRzKG1vZGVsLnBsYW50YXRpb24pO1xuXG4gICAgaWYoICFtb2RlbC53ZWF0aGVyICkgbW9kZWwud2VhdGhlciA9IHt9O1xuICAgIGlmKCAhbW9kZWwubWFuYWdlICkgbW9kZWwubWFuYWdlID0ge307XG4gICAgaWYoICFtb2RlbC5jdXN0b21fd2VhdGhlciApIG1vZGVsLmN1c3RvbV93ZWF0aGVyID0ge307XG5cbiAgICB0aGlzLnJlYWRXZWF0aGVyKG1vZGVsLndlYXRoZXIsIG1vZGVsLm1hbmFnZSwgbW9kZWwuY3VzdG9tX3dlYXRoZXIpO1xuXG4gICAgZGVsZXRlIHRoaXMubW9kZWwubWFuYWdlLmNvcHBpY2VEYXRlcztcbiAgfSxcbiAgcmVhZEFsbENvbnN0YW50cyA6IGZ1bmN0aW9uKHBsYW50YXRpb24pIHtcbiAgICAgIHRoaXMucmVhZEZyb21JbnB1dHMoKTtcblxuICAgICAgLy9mb3IgKCB2YXIga2V5IGluIHRoaXMubW9kZWwucGxhbnRhdGlvbikge1xuICAgICAgLy8gICAgcGxhbnRhdGlvbltrZXldID0gdGhpcy5tb2RlbC5wbGFudGF0aW9uW2tleV07XG4gICAgICAvL31cblxuICAgICAgcGxhbnRhdGlvbi5jb3BwaWNlZFRyZWUgPSB0aGlzLm1vZGVsLnRyZWU7XG5cbiAgICAgIC8vIHNldHVwIHNlZWRsaW5nIFRyZWVcbiAgICAgIC8vIFRPRE86IGhhcmRjb2RlZCBmb3Igbm93LCB0aGlzIHNob3VsZG4ndCBiZVxuICAgICAgcGxhbnRhdGlvbi5zZWVkbGluZ1RyZWUgPSAkLmV4dGVuZCh0cnVlLCB7fSwgdGhpcy5tb2RlbC50cmVlKTtcbiAgICAgIHBsYW50YXRpb24uc2VlZGxpbmdUcmVlLnN0ZW1zUGVyU3R1bXAgPSAxO1xuICAgICAgcGxhbnRhdGlvbi5zZWVkbGluZ1RyZWUucGZzLnN0ZW1DbnQgPSAxO1xuICAgICAgcGxhbnRhdGlvbi5zZWVkbGluZ1RyZWUucm9vdFAgPSB7XG4gICAgICAgICAgTEFJVGFyZ2V0IDogMTAsXG4gICAgICAgICAgZWZmaWNpZW5jeSA6IDAuNixcbiAgICAgICAgICBmcmFjIDogMC4wMVxuICAgICAgfTtcbiAgfSxcblxuICByZWFkV2VhdGhlciA6IGZ1bmN0aW9uKHdlYXRoZXJNYXAsIG1hbmFnZSwgY3VzdG9tV2VhdGhlck1hcCkge1xuICAgICAgdmFyIGRhdGVQbGFudGVkID0gJChcIiNpbnB1dC1tYW5hZ2UtZGF0ZVBsYW50ZWRcIikudmFsKCk7XG4gICAgICBpZiAoZGF0ZVBsYW50ZWQgJiYgZGF0ZVBsYW50ZWQgIT0gXCJcIikge1xuICAgICAgICAgIG1hbmFnZS5kYXRlUGxhbnRlZCA9IG5ldyBEYXRlKCQoXCIjaW5wdXQtbWFuYWdlLWRhdGVQbGFudGVkXCIpLnZhbCgpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbWFuYWdlLmRhdGVQbGFudGVkID0gbmV3IERhdGUoKTtcbiAgICAgIH1cblxuICAgICAgdmFyIGRhdGVDb3BwaWNlZCA9ICQoXCIjaW5wdXQtbWFuYWdlLWRhdGVDb3BwaWNlZFwiKS52YWwoKTtcbiAgICAgIGlmIChkYXRlQ29wcGljZWQgJiYgZGF0ZUNvcHBpY2VkICE9IFwiXCIpIHtcbiAgICAgICAgICBtYW5hZ2UuZGF0ZUNvcHBpY2VkID0gbmV3IERhdGUoJChcIiNpbnB1dC1tYW5hZ2UtZGF0ZUNvcHBpY2VkXCIpLnZhbCgpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICAvLyBzZXQgZXJyb3IgY29uZGl0aW9uIDogVE9ET1xuICAgICAgfVxuXG4gICAgICB2YXIgRGF0ZUZpbmFsSGFydmVzdCA9ICQoXCIjaW5wdXQtbWFuYWdlLWRhdGVGaW5hbEhhcnZlc3RcIikudmFsKCk7XG4gICAgICBpZiAoRGF0ZUZpbmFsSGFydmVzdCAmJiBEYXRlRmluYWxIYXJ2ZXN0ICE9IFwiXCIpIHtcbiAgICAgICAgICBtYW5hZ2UuRGF0ZUZpbmFsSGFydmVzdCA9IG5ldyBEYXRlKCQoXCIjaW5wdXQtbWFuYWdlLWRhdGVGaW5hbEhhcnZlc3RcIikudmFsKCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgIC8vIHNldCBlcnJvciBjb25kaXRpb24gOiBUT0RPXG4gICAgICB9XG5cbiAgICAgIHZhciB5ZWFyc1BlckNvcHBpY2UgPSAkKFwiI2lucHV0LW1hbmFnZS1jb3BwaWNlSW50ZXJ2YWxcIikudmFsKCk7XG4gICAgICBpZiAoeWVhcnNQZXJDb3BwaWNlICYmIHllYXJzUGVyQ29wcGljZSAhPSBcIlwiKSB7XG4gICAgICAgICAgbWFuYWdlLnllYXJzUGVyQ29wcGljZSA9IHBhcnNlSW50KCQoXCIjaW5wdXQtbWFuYWdlLWNvcHBpY2VJbnRlcnZhbFwiKS52YWwoKSk7XG4gICAgICB9XG5cblxuICAgICAgZm9yICggdmFyIGkgPSAwOyBpIDwgMTI7IGkrKykge1xuICAgICAgICAgIHZhciBpdGVtID0ge1xuICAgICAgICAgICAgICBtb250aCA6IChpICsgMSlcbiAgICAgICAgICB9O1xuICAgICAgICAgIHZhciBtID0gKGkrMSkrJyc7XG4gICAgICAgICAgaWYoIG0ubGVuZ3RoID09PSAxICkgbSA9ICcwJyttO1xuXG4gICAgICAgICAgZm9yICggdmFyIGogPSAxOyBqIDwgdGhpcy5hcHAuaW5wdXRzLndlYXRoZXIubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgdmFyIGMgPSB0aGlzLmFwcC5pbnB1dHMud2VhdGhlcltqXTtcbiAgICAgICAgICAgICAgaXRlbVtjXSA9IHRoaXMuX3JlYWRWYWwoJChcIiNpbnB1dC13ZWF0aGVyLVwiICsgYyArIFwiLVwiICsgbSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpdGVtLm5yZWwgPSBpdGVtLnJhZCAvIDAuMDAzNjtcblxuICAgICAgICAgIHdlYXRoZXJNYXBbbV0gPSBpdGVtO1xuICAgICAgfVxuXG4gICAgICBpZiggdGhpcy5tb2RlbC5jdXN0b21fd2VhdGhlciApIHtcbiAgICAgICAgICBmb3IoIHZhciBkYXRlIGluIHRoaXMubW9kZWwuY3VzdG9tX3dlYXRoZXIgKSB7XG4gICAgICAgICAgICAgIHRoaXMubW9kZWwuY3VzdG9tX3dlYXRoZXJbZGF0ZV0ubnJlbCA9IHRoaXMubW9kZWwuY3VzdG9tX3dlYXRoZXJbZGF0ZV0ucmFkIC8gMC4wMDM2O1xuICAgICAgICAgICAgICAvL2N1c3RvbVdlYXRoZXJNYXBbZGF0ZV0gPSBjdXN0b21fd2VhdGhlcltkYXRlXTtcbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gd2VhdGhlck1hcDtcbiAgfSxcbiAgZHVtcCA6IGZ1bmN0aW9uKHJvd3MsIHNoZWV0KSB7XG4gICAgICAvLyBzZXQgdGhlIHJhdyBvdXRwdXRcbiAgICAgIHRoaXMuYXBwLnJ1bkNvbXBsZXRlKHJvd3MpO1xuICB9LFxuXG4gIC8vIHJlYWQgYSB2YWx1ZSBmcm9tIHRoZSBpbnB1dFxuICAvLyBpdCBoYXMgYSAnLCcgaXMgc2V0IGZvciB2YXJpYXRpb25cbiAgX3JlYWRWYWwgOiBmdW5jdGlvbihlbGUpIHtcbiAgICAgIHZhciB2YWwgPSBlbGUudmFsKCk7XG4gICAgICBpZiggdmFsLm1hdGNoKC9cXGQqLVxcZCotXFxkKiQvKSApIHtcbiAgICAgICAgICByZXR1cm4gdmFsO1xuICAgICAgfSBlbHNlIGlmKCB2YWwubWF0Y2goLy4qLC4qLykgKSB7XG4gICAgICAgICAgdmFsID0gdmFsLnJlcGxhY2UoL1xccy9nLCcnKS5zcGxpdChcIixcIik7XG4gICAgICAgICAgdmFyIGlkID0gZWxlLmF0dHIoXCJpZFwiKS5yZXBsYWNlKC9eaW5wdXQtLywnJykucmVwbGFjZSgvLS9nLCcuJyk7XG4gICAgICAgICAgdGhpcy5tb2RlbC52YXJpYXRpb25zW2lkXSA9IFtdO1xuICAgICAgICAgIGZvciggdmFyIGkgPSAwOyBpIDwgdmFsLmxlbmd0aDsgaSsrICkge1xuICAgICAgICAgICAgICB0aGlzLm1vZGVsLnZhcmlhdGlvbnNbaWRdLnB1c2gocGFyc2VGbG9hdCh2YWxbaV0pKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRoaXMubW9kZWwudmFyaWF0aW9uc1tpZF1bMF07XG4gICAgICB9XG4gICAgICByZXR1cm4gcGFyc2VGbG9hdCh2YWwpO1xuICB9LFxuXG4gIHJlYWRGcm9tSW5wdXRzIDogZnVuY3Rpb24oKSB7XG4gICAgICAvLyByZWFkIHNvaWxcbiAgICAgIHRoaXMubW9kZWwuc29pbCA9IHt9O1xuICAgICAgdGhpcy5tb2RlbC5zb2lsLm1heEFXUyA9IHRoaXMuX3JlYWRWYWwoJChcIiNpbnB1dC1zb2lsLW1heEFXU1wiKSk7XG4gICAgICB0aGlzLm1vZGVsLnNvaWwuc3dwb3dlciA9IHRoaXMuX3JlYWRWYWwoJChcIiNpbnB1dC1zb2lsLXN3cG93ZXJcIikpO1xuICAgICAgdGhpcy5tb2RlbC5zb2lsLnN3Y29uc3QgPSB0aGlzLl9yZWFkVmFsKCQoXCIjaW5wdXQtc29pbC1zd2NvbnN0XCIpKTtcblxuICAgICAgLy8gcmVhZCBtYW5hZ2VcbiAgICAgIHRoaXMubW9kZWwubWFuYWdlID0ge1xuICAgICAgICAgIGNvcHBpY2UgOiBmYWxzZVxuICAgICAgfTtcbiAgICAgIHZhciBlbGVzID0gJChcIi5tYW5hZ2VcIik7XG4gICAgICBmb3IgKCB2YXIgaSA9IDA7IGkgPCBlbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdmFyIGVsZSA9ICQoZWxlc1tpXSk7XG4gICAgICAgICAgdGhpcy5tb2RlbC5tYW5hZ2VbZWxlLmF0dHIoXCJpZFwiKS5yZXBsYWNlKFwiaW5wdXQtbWFuYWdlLVwiLCBcIlwiKV0gPSB0aGlzLl9yZWFkVmFsKGVsZSk7XG4gICAgICB9XG5cbiAgICAgIC8vIHJlYWQgcGxhbnRhdGlvblxuICAgICAgaWYoICF0aGlzLm1vZGVsLnBsYW50YXRpb24gKSB0aGlzLm1vZGVsLnBsYW50YXRpb24gPSB7fTtcbiAgICAgIGVsZXMgPSAkKFwiLnBsYW50YXRpb25cIik7XG4gICAgICBmb3IgKCB2YXIgaSA9IDA7IGkgPCBlbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdmFyIGVsZSA9ICQoZWxlc1tpXSk7XG4gICAgICAgICAgdGhpcy5tb2RlbC5wbGFudGF0aW9uW2VsZS5hdHRyKFwiaWRcIikucmVwbGFjZShcImlucHV0LXBsYW50YXRpb24tXCIsIFwiXCIpXSA9IHRoaXMuX3JlYWRWYWwoZWxlKTtcbiAgICAgIH1cblxuICAgICAgLy8gcmVhZCB0cmVlXG4gICAgICB2YXIgdHJlZUlucHV0cyA9ICQoXCIudHJlZVwiKTtcbiAgICAgIHRoaXMubW9kZWwudHJlZSA9IHt9O1xuICAgICAgZm9yICggdmFyIGkgPSAwOyBpIDwgdHJlZUlucHV0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHZhciBlbGUgPSAkKHRyZWVJbnB1dHNbaV0pO1xuXG4gICAgICAgICAgdmFyIHBhcnRzID0gZWxlLmF0dHIoXCJpZFwiKS5yZXBsYWNlKFwiaW5wdXQtdHJlZS1cIiwgXCJcIikuc3BsaXQoXCItXCIpO1xuICAgICAgICAgIGlmIChwYXJ0cy5sZW5ndGggPT0gMSkge1xuICAgICAgICAgICAgICB0aGlzLm1vZGVsLnRyZWVbcGFydHNbMF1dID0gdGhpcy5fcmVhZFZhbChlbGUpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGlmICghdGhpcy5tb2RlbC50cmVlW3BhcnRzWzBdXSlcbiAgICAgICAgICAgICAgICAgIHRoaXMubW9kZWwudHJlZVtwYXJ0c1swXV0gPSB7fTtcbiAgICAgICAgICAgICAgdGhpcy5tb2RlbC50cmVlW3BhcnRzWzBdXVtwYXJ0c1sxXV0gPSB0aGlzLl9yZWFkVmFsKGVsZSk7XG4gICAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyByZWFkIHBsYW50YXRpb24gc3RhdGVcbiAgICAgIGlmKCAhdGhpcy5tb2RlbC5wbGFudGF0aW9uX3N0YXRlICkgdGhpcy5tb2RlbC5wbGFudGF0aW9uX3N0YXRlID0ge307XG4gICAgICBmb3IgKCB2YXIga2V5IGluIHRoaXMubW9kZWwuZ2V0RGF0YU1vZGVsKCkucGxhbnRhdGlvbl9zdGF0ZS52YWx1ZSApIHtcbiAgICAgICAgICB0aGlzLm1vZGVsLnBsYW50YXRpb25fc3RhdGVba2V5XSA9IC0xO1xuICAgICAgfVxuXG4gIH0sXG4gIGV4cG9ydFNldHVwIDogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLm1vZGVsLnZhcmlhdGlvbnMgPSB7fTtcbiAgICAgIHRoaXMucmVhZEZyb21JbnB1dHMoKTtcbiAgICAgIHRoaXMucmVhZFdlYXRoZXIoW10sIHt9LCB7fSk7XG5cbiAgICAgIHZhciBleCA9IHtcbiAgICAgICAgICB3ZWF0aGVyIDogdGhpcy5tb2RlbC53ZWF0aGVyLFxuICAgICAgICAgIGN1c3RvbV93ZWF0aGVyIDogdGhpcy5tb2RlbC5jdXN0b21fd2VhdGhlcixcbiAgICAgICAgICB0cmVlIDogdGhpcy5tb2RlbC50cmVlLFxuICAgICAgICAgIHBsYW50YXRpb24gOiB0aGlzLm1vZGVsLnBsYW50YXRpb24sXG4gICAgICAgICAgbWFuYWdlIDogdGhpcy5tb2RlbC5tYW5hZ2UsXG4gICAgICAgICAgc29pbCA6IHRoaXMubW9kZWwuc29pbCxcbiAgICAgICAgICBtYW5hZ2UgOiB0aGlzLm1vZGVsLm1hbmFnZSxcbiAgICAgICAgICBwbGFudGF0aW9uX3N0YXRlIDogdGhpcy5tb2RlbC5wbGFudGF0aW9uX3N0YXRlLFxuICAgICAgICAgIGNvbmZpZyA6IHtcbiAgICAgICAgICAgICAgY2hhcnRUeXBlSW5wdXQgOiAkKFwiI2NoYXJ0VHlwZUlucHV0XCIpLnZhbCgpLFxuICAgICAgICAgICAgICBtb250aHNUb1J1biA6IHRoaXMuYXBwLm1vbnRoc1RvUnVuKCksXG4gICAgICAgICAgICAgIGN1cnJlbnRMb2NhdGlvbiA6ICQoXCIjY3VycmVudC1sb2NhdGlvblwiKS5odG1sKCksXG4gICAgICAgICAgICAgIGxvYWRlZFRyZWUgOiAkKFwiI2xvYWRlZC10cmVlLW5hbWVcIikuaHRtbCgpLFxuICAgICAgICAgICAgICB2ZXJzaW9uIDogdGhpcy5hcHAucXMoXCJ2ZXJzaW9uXCIpID8gdGhpcy5hcHAucXMoXCJ2ZXJzaW9uXCIpIDogXCJtYXN0ZXJcIlxuICAgICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gYnkgZGVmYXVsdCB0aGUgcmVhZCBmdW5jdGlvbiBzZXQgdGhlIHZhcmlhdGlvbnMgdmFyaWFibGVzIGJ1dCBvbmx5XG4gICAgICAvLyByZXR1cm5zIHRoZSBmaXJzdCwgc2V0IHRoZSB2YXJpYXRpb24gcGFyYW1zIHRvIHRoZWlyIGNvcnJlY3QgdmFsdWVzXG4gICAgICBmb3IoIHZhciBrZXkgaW4gdGhpcy5tb2RlbC52YXJpYXRpb25zICkge1xuICAgICAgICAgIHZhciBwYXJ0cyA9IGtleS5zcGxpdChcIi5cIik7XG4gICAgICAgICAgdmFyIHBhcmFtID0gZXg7XG4gICAgICAgICAgZm9yKCB2YXIgaSA9IDA7IGkgPCBwYXJ0cy5sZW5ndGgtMTsgaSsrICkge1xuICAgICAgICAgICAgICBwYXJhbSA9IHBhcmFtW3BhcnRzW2ldXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcGFyYW1bcGFydHNbcGFydHMubGVuZ3RoLTFdXSA9IHRoaXMubW9kZWwudmFyaWF0aW9uc1trZXldLmpvaW4oXCIsIFwiKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGV4O1xuICB9LFxuICBsb2FkVHJlZSA6IGZ1bmN0aW9uKHRyZWUpIHtcbiAgICAgIGZvciAoIHZhciByb290S2V5IGluIHRyZWUpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIHRyZWVbcm9vdEtleV0gIT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgJChcIiNpbnB1dC10cmVlLVwiICsgcm9vdEtleSkudmFsKHRyZWVbcm9vdEtleV0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGZvciAoIHZhciBjaGlsZEtleSBpbiB0cmVlW3Jvb3RLZXldKSB7XG4gICAgICAgICAgICAgICAgICAkKFwiI2lucHV0LXRyZWUtXCIgKyByb290S2V5ICsgXCItXCIgKyBjaGlsZEtleSkudmFsKHRyZWVbcm9vdEtleV1bY2hpbGRLZXldKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgIH1cbiAgfSxcbiAgbG9hZFNldHVwIDogZnVuY3Rpb24oZmlsZWlkLCBzZXR1cCwgaXNSdCkge1xuXG4gICAgICAvLyBsb2FkIGNvbmZpZ1xuICAgICAgaWYgKHNldHVwLmNvbmZpZy5jaGFydFR5cGVJbnB1dCkge1xuICAgICAgICAgIHRoaXMuY2hhcnRzLnVuc2VsZWN0QWxsKCk7XG4gICAgICAgICAgZm9yICggdmFyIGkgPSAwOyBpIDwgc2V0dXAuY29uZmlnLmNoYXJ0VHlwZUlucHV0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgIHRoaXMuY2hhcnRzLnNlbGVjdChzZXR1cC5jb25maWcuY2hhcnRUeXBlSW5wdXRbaV0pO1xuICAgICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzZXR1cC5jb25maWcuY3VycmVudExvY2F0aW9uKSB7XG4gICAgICAgICAgJChcIiNjdXJyZW50LWxvY2F0aW9uXCIpLmh0bWwoc2V0dXAuY29uZmlnLmN1cnJlbnRMb2NhdGlvbik7XG4gICAgICB9XG4gICAgICBpZiggc2V0dXAuY29uZmlnLmxvYWRlZFRyZWUgKSB7XG4gICAgICAgICAgJChcIiNsb2FkZWQtdHJlZS1uYW1lXCIpLmh0bWwoc2V0dXAuY29uZmlnLmxvYWRlZFRyZWUpLnBhcmVudCgpLnNob3coKTtcbiAgICAgIH1cblxuICAgICAgLy8gbG9hZCB3ZWF0aGVyXG4gICAgICBpZiggQXJyYXkuaXNBcnJheShzZXR1cC53ZWF0aGVyKSApIHtcbiAgICAgICAgZm9yICggdmFyIGkgPSAwOyBpIDwgc2V0dXAud2VhdGhlci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgZm9yICggdmFyIGtleSBpbiBzZXR1cC53ZWF0aGVyW2ldKSB7XG4gICAgICAgICAgICAgICAgaWYgKGtleSA9PSAnbW9udGgnKVxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBpZiAoc2V0dXAud2VhdGhlcltpXVtrZXldICE9IG51bGwpXG4gICAgICAgICAgICAgICAgICAgICQoXCIjaW5wdXQtd2VhdGhlci1cIiArIGtleSArIFwiLVwiICsgaSkudmFsKHNldHVwLndlYXRoZXJbaV1ba2V5XSlcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICQoXCIjaW5wdXQtd2VhdGhlci1cIiArIGtleSArIFwiLVwiICsgaSkudmFsKFwiXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmb3IgKCB2YXIgaSBpbiBzZXR1cC53ZWF0aGVyICkge1xuICAgICAgICAgICAgZm9yICggdmFyIGtleSBpbiBzZXR1cC53ZWF0aGVyW2ldKSB7XG4gICAgICAgICAgICAgICAgaWYgKGtleSA9PSAnbW9udGgnKVxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBpZiAoc2V0dXAud2VhdGhlcltpXVtrZXldICE9IG51bGwpXG4gICAgICAgICAgICAgICAgICAgICQoXCIjaW5wdXQtd2VhdGhlci1cIiArIGtleSArIFwiLVwiICsgaSkudmFsKHNldHVwLndlYXRoZXJbaV1ba2V5XSlcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICQoXCIjaW5wdXQtd2VhdGhlci1cIiArIGtleSArIFwiLVwiICsgaSkudmFsKFwiXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmKCBzZXR1cC5jdXN0b21fd2VhdGhlciApIHtcbiAgICAgICAgICB0aGlzLm1vZGVsLmN1c3RvbV93ZWF0aGVyID0gc2V0dXAuY3VzdG9tX3dlYXRoZXI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMubW9kZWwuY3VzdG9tX3dlYXRoZXIgPSB7fTtcbiAgICAgIH1cblxuICAgICAgLy8gY3JlYXRlIHRoZSBjaGFydFxuICAgICAgdGhpcy5pbnB1dEZvcm0udXBkYXRlQXZlcmFnZUNoYXJ0KCk7XG5cbiAgICAgIC8vIGxvYWQgdHJlZVxuICAgICAgdGhpcy5sb2FkVHJlZShzZXR1cC50cmVlKTtcblxuICAgICAgLy8gbG9hZCBwbGFudGluZyBwYXJhbXNcbiAgICAgIC8vIE5vdyBwYXJ0IG9mIG1hbmFnZS4uLi5cbiAgICAgIC8vIGZvXG4gICAgICBpZiAoc2V0dXAubWFuYWdlKSB7XG4gICAgICAgICAgdmFyIG1hcCA9IHtcbiAgICAgICAgICAgICAgXCJkYXRlUGxhbnRlZFwiIDogXCJEYXRlUGxhbnRlZFwiLFxuICAgICAgICAgICAgICBcImRhdGVDb3BwaWNlZFwiIDogXCJEYXRlQ29wcGljZWRcIixcbiAgICAgICAgICAgICAgXCJ5ZWFyc1BlckNvcHBpY2VcIiA6IFwiQ29wcGljZUludGVydmFsXCJcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBmb3IgKCB2YXIga2V5IGluIHNldHVwLm1hbmFnZSkge1xuICAgICAgICAgICAgICB2YXIgbmV3S2V5ID0ga2V5O1xuICAgICAgICAgICAgICBpZiggbWFwW2tleV0gKSBuZXdLZXkgPSBtYXBba2V5XTtcblxuICAgICAgICAgICAgICBpZiAodHlwZW9mIHNldHVwLm1hbmFnZVtrZXldID09ICdzdHJpbmcnKVxuICAgICAgICAgICAgICAgICAgJChcIiNpbnB1dC1tYW5hZ2UtXCIgKyBuZXdLZXkpLnZhbChzZXR1cC5tYW5hZ2Vba2V5XS5yZXBsYWNlKC9ULiovLCAnJykpO1xuICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAkKFwiI2lucHV0LW1hbmFnZS1cIiArIG5ld0tleSkudmFsKHNldHVwLm1hbmFnZVtrZXldKTtcbiAgICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIHRoaXMgdmFsdWUgaXMgZGVwcmVjYXRlZCwgc2V0IHRvIG5ldyBpbnB1dFxuICAgICAgaWYoIHNldHVwLmNvbmZpZy5tb250aHNUb1J1biApIHtcbiAgICAgICAgICB2YXIgZCA9IG5ldyBEYXRlKHNldHVwLm1hbmFnZS5kYXRlUGxhbnRlZCk7XG4gICAgICAgICAgZCA9IG5ldyBEYXRlKG5ldyBEYXRlKGQpLnNldE1vbnRoKGQuZ2V0TW9udGgoKStwYXJzZUludChzZXR1cC5jb25maWcubW9udGhzVG9SdW4pKSk7XG4gICAgICAgICAgJChcIiNpbnB1dC1tYW5hZ2UtZGF0ZUZpbmFsSGFydmVzdFwiKS52YWwoZC50b0lTT1N0cmluZygpLnJlcGxhY2UoL1QuKi8sICcnKSk7XG4gICAgICB9XG5cblxuICAgICAgLy8gbG9hZCByZXN0XG4gICAgICB2YXIgaW5wdXRzID0gWyBcInBsYW50YXRpb25cIiwgXCJzb2lsXCIsIFwibWFuYWdlXCIgXTtcbiAgICAgIGZvciAoIHZhciBpID0gMDsgaSA8IGlucHV0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGZvciAoIHZhciBrZXkgaW4gc2V0dXBbaW5wdXRzW2ldXSkge1xuICAgICAgICAgICAgICBpZiAoa2V5ID09ICdtYXhBV1MnKSB7XG4gICAgICAgICAgICAgICAgICAkKFwiI2lucHV0LXNvaWwtbWF4QVdTXCIpLnZhbChzZXR1cC5zb2lsLm1heEFXUyk7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoIHR5cGVvZiBzZXR1cFtpbnB1dHNbaV1dW2tleV0gPT0gJ3N0cmluZycgJiYgc2V0dXBbaW5wdXRzW2ldXVtrZXldLm1hdGNoKC8uKlQuKlokLykgKSB7XG4gICAgICAgICAgICAgICAgICAkKFwiI2lucHV0LVwiICsgaW5wdXRzW2ldICsgXCItXCIgKyBrZXkpLnZhbChzZXR1cFtpbnB1dHNbaV1dW2tleV0ucmVwbGFjZSgvVC4qLywgJycpKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICQoXCIjaW5wdXQtXCIgKyBpbnB1dHNbaV0gKyBcIi1cIiArIGtleSkudmFsKHNldHVwW2lucHV0c1tpXV1ba2V5XSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLmFwcC5ydW5Nb2RlbChpc1J0KTtcbiAgfVxufTtcbiIsIlxuICAvLyBtdXN0IGluc3RhbGwgdGhpcyBmb3IgbmF0aXZlIHBob25lZ2FwIHN1cHBvcnQ6XG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9waG9uZWdhcC1idWlsZC9DaGlsZEJyb3dzZXJcblxudmFyIHdpbiA9IG51bGw7XG5cbi8qIHRoZSBrZXkgZm9yIHJlZnJlc2ggVG9rZW4gaW4gbG9jYWwgU3RvcmFnZSAqL1xudmFyIHRva2VuS2V5ID0gJ3JlZnJlc2hfdG9rZW4nO1xuXG4vKiBzdG9yZXMgdGhlIGFjY2Vzc1Rva2VuIGFmdGVyIHJldHJpZXZhbCBmcm9tIGdvb2dsZSBzZXJ2ZXIgKi9cbnZhciBhY2Nlc3NUb2tlbiA9IG51bGw7XG5cbi8qIHN0b3JlcyB0aGUgVGltZSB3aGVuIGFjY2VzcyB0b2tlbiB3YXMgbGFzdCByZWNlaXZlZCBmcm9tIHNlcnZlciAqL1xudmFyIGFjY2Vzc1Rva2VuVGltZSA9IG51bGw7XG5cbi8qIHN0b3JlcyBhY2Nlc3MgVG9rZW4ncyBFeHBpcnkgTGltaXQuIFVzZXMgNTggbWluLiBpbnN0ZWFkIG9mIDYwIG1pbi4gKi9cbnZhciBhY2Nlc3NUb2tlbkV4cGlyeUxpbWl0ID0gNTggKiA2MCAqIDEwMDA7XG5cbi8qIEEgdGVtcG9yYXJ5IHZhcmlhYmxlIHN0b3JpbmcgY2FsbGJhY2sgZnVuY3Rpb24gKi9cbnZhciBjYWxsYmFja0Z1bmMgPSBmYWxzZTtcblxuLy8gYXJlIHdlIHJ1bm5pbmcgbmF0aXZlIG9yIGJyb3dzZXIgbW9kZT9cbnZhciBpc05hdGl2ZSA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmLm1hdGNoKC9eZmlsZS4qLykgPyB0cnVlIDogZmFsc2U7XG5cbnZhciBDTElFTlRfSUQgPSBpc05hdGl2ZSA/XG4gICAgICAgIFwiMzQ0MTkwNzEzNDY1LWRpaW10ZmVyaDR0amIwMzE2OWJrbDlta29xdnEycnU5LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tXCIgOlxuICAgICAgICAgXCIzNDQxOTA3MTM0NjUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb21cIjtcblxudmFyIEFQUF9JRCA9IFwiMzQ0MTkwNzEzNDY1XCI7XG5cbnZhciBPQVVUSF9TQ09QRVMgPSAnaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vYXV0aC9kcml2ZS5maWxlICdcbiAgKyAnaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vYXV0aC9kcml2ZS5pbnN0YWxsICdcbiAgKyAnaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vYXV0aC91c2VyaW5mby5wcm9maWxlJztcblxuLyogY29uZmlnIHZhbHVlcyBmb3IgR29vZ2xlIEFQSSAoZ2FwaSkgKi9cbnZhciBnYXBpQ29uZmlnID0ge1xuICBlbmRwb2ludDogXCJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20vby9vYXV0aDIvYXV0aFwiLFxuICBlbmR0b2tlbjogXCJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20vby9vYXV0aDIvdG9rZW5cIiwgLy8gdG9rZW4gZW5kcG9pbnRcbiAgcmVkaXJlY3RfdXJpIDogXCJodHRwOi8vbG9jYWxob3N0XCIsXG4gIGNsaWVudF9zZWNyZXQgOiAnNnJPUTlsMGZ5bmgxMzdNUlhHSy1HX1pnJyxcbiAgcmVzcG9uc2VfdHlwZSA6IFwiY29kZVwiLFxuICBjbGllbnRfaWQgOiBDTElFTlRfSUQsXG4gIHN0YXRlIDogXCJnZHJpdmVpbml0XCIsXG4gIGFjY2Vzc190eXBlIDogXCJvZmZsaW5lXCIsXG4gIHNjb3BlIDogT0FVVEhfU0NPUEVTLFxuXG4gIC8qIEFzIGRlZmluZWQgaW4gdGhlIE9BdXRoIDIuMCBzcGVjaWZpY2F0aW9uLCB0aGlzIGZpZWxkIG11c3QgY29udGFpbiBhIHZhbHVlXG4gICAgICogb2YgXCJhdXRob3JpemF0aW9uX2NvZGVcIiBvciBcInJlZnJlc2hfdG9rZW5cIiAqL1xuICAgIGdyYW50VHlwZXM6IHsgQVVUSE9SSVpFOiBcImF1dGhvcml6YXRpb25fY29kZVwiLCBSRUZSRVNIOiBcInJlZnJlc2hfdG9rZW5cIiB9LFxuIH07XG5cbi8qKlxuICogRW51bSBmb3IgU3RhdHVzIHZhbHVlc1xuICpcbiAqIEBlbnVtIHtudW1iZXJ9XG4gKlxuICogU1VDQ0VTUyAtIFN1Y2Nlc3NmdWxseSBkYXRhIHJlY2VpdmVkIGZyb20gc2VydmVyXG4gKiBFUlJPUiAtIEVycm9yIG9jY3VycmVkIHdoZW4gdHJ5aW5nIHRvIHJlY2VpdmUgZnJvbSBzZXJ2ZXJcbiAqIE5PVF9ERVRFUk1JTkVEIC0gdW5kZXRlcm1pbmVkXG4gKi9cbnZhciBzdGF0dXMgPSB7XG4gICAgICAgIFNVQ0VTUzogMSxcbiAgICAgICAgRVJST1I6IC0xLFxuICAgICAgICBOT1RfREVURVJNSU5FRDogMFxufVxuXG5yZXF1ZXN0U3RhdHVzID0gMDtcblxuLyogc3RvcmVzIHRoZSBhdXRob3JpemF0aW9uIENvZGUgaW50ZXJuYWxseSAqL1xuYXV0aENvZGUgPSBmYWxzZTtcblxuLyogc3RvcmVzIHRoZSBlcnJvciBtZXNzYWdlIHdoZW4gYW4gZXJyb3IgaGFwcGVucyBmcm9tIGdvb2dsZSBzZXJ2ZXIgKi9cbmVycm9yTWVzc2FnZSA9IGZhbHNlO1xuXG52YXIgbG9nID0gZnVuY3Rpb24obXNnKSB7XG4gIGNvbnNvbGUubG9nKFwiKioqT0FVVEgqKio6IFwiK21zZyk7XG59XG5cbi8qKlxuICogQXR0ZW1wdHMgdG8gYXV0aG9yaXplIHVzZXIgdXNpbmcgT0F1dGhcbiAqIE9wZW5zIHVwIEFub3RoZXIgd2luZG93IHdoZXJlIHVzZXIgYWxsb3dzIGFjY2VzcyBvciBkZW5pZXMgaXQuXG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbEJhY2sgICBBIGNhbGxiYWNrIGZ1bmN0aW9uIHdoaWNoIGlzIGludm9rZWRcbiAqL1xudmFyIGF1dGhvcml6ZSA9IGZ1bmN0aW9uKGNhbGxCYWNrKSB7XG4gIGxvZyhcImF0dGVtcHRpbmcgdG8gYXV0aG9yaXplXCIpO1xuXG4gICAgdmFyIGF1dGhVcmkgPSBnYXBpQ29uZmlnLmVuZHBvaW50ICsgJz8nXG4gICAgKyAnc2NvcGU9JyArIGVuY29kZVVSSUNvbXBvbmVudChnYXBpQ29uZmlnLnNjb3BlKVxuICAgICsgJyYnICsgJ3JlZGlyZWN0X3VyaT0nICsgZW5jb2RlVVJJQ29tcG9uZW50KGdhcGlDb25maWcucmVkaXJlY3RfdXJpKVxuICAgICsgJyYnICsgJ3Jlc3BvbnNlX3R5cGU9JyArIGVuY29kZVVSSUNvbXBvbmVudChnYXBpQ29uZmlnLnJlc3BvbnNlX3R5cGUpXG4gICAgKyAnJicgKyAnY2xpZW50X2lkPScgKyBlbmNvZGVVUklDb21wb25lbnQoZ2FwaUNvbmZpZy5jbGllbnRfaWQpO1xuICAgIC8vKyAnJicgKyAnc3RhdGU9JyArIGVuY29kZVVSSUNvbXBvbmVudChnYXBpQ29uZmlnLnN0YXRlKVxuICAgIC8vKyAnJicgKyAnYWNjZXNzX3R5cGU9JyArIGVuY29kZVVSSUNvbXBvbmVudChnYXBpQ29uZmlnLmFjY2Vzc190eXBlKVxuICAgIC8vKyAnJicgKyAnYXBwcm92YWxfcHJvbXB0PWZvcmNlJzsgLy8gQFRPRE8gLSBjaGVjayBpZiB3ZSByZWFsbHkgbmVlZCB0aGlzIHBhcmFtXG5cbiAgICBjYWxsYmFja0Z1bmMgPSBjYWxsQmFjaztcbiAgICByZXF1ZXN0U3RhdHVzID0gc3RhdHVzLk5PVF9ERVRFUk1JTkVEO1xuXG5cblxuXG4gICAgbG9nKFwib3BlbmluZyBJbkFwcEJyb3dzZXJcIik7XG5cbiAgICB0cnkge1xuXG4gICAgICAvLyBOb3cgb3BlbiBuZXcgYnJvd3NlclxuICAgICAgd2luID0gd2luZG93Lm9wZW4oYXV0aFVyaSwgJ19ibGFuaycsICdsb2NhdGlvbj1ubyx0b29sYmFyPW5vJyk7XG5cbiAgICAgICQod2luKS5vbignbG9hZHN0YXJ0JyxmdW5jdGlvbihlKXtcbiAgICAgICAgbG9nKFwiSW5BcHBCcm93c2VyIGxvYWRzdGFydFwiKTtcbiAgICAgICAgY29uc29sZS5sb2coZS5vcmlnaW5hbEV2ZW50LnVybCk7XG4gICAgICAgIG9uQXV0aFVybENoYW5nZShlLm9yaWdpbmFsRXZlbnQudXJsKTtcbiAgICAgIH0pO1xuXG4gICAgICAvL3dpbmRvdy5wbHVnaW5zLmNoaWxkQnJvd3Nlci5zaG93V2ViUGFnZShhdXRoVXJpLCB7c2hvd0xvY2F0aW9uQmFyIDogdHJ1ZX0pO1xuICAgICAgLy93aW5kb3cucGx1Z2lucy5jaGlsZEJyb3dzZXIub25DbG9zZSA9IG9uQXV0aENsb3NlO1xuICAgICAgLy93aW5kb3cucGx1Z2lucy5jaGlsZEJyb3dzZXIub25Mb2NhdGlvbkNoYW5nZSA9IG9uQXV0aFVybENoYW5nZTtcbiAgICB9IGNhdGNoKGUpIHtcbiAgICAgIGxvZyhcIkVycm9yIG9wZW5pbmcgSW5BcHBCcm93c2VyXCIpO1xuICAgICAgbG9nKGUpO1xuICAgIH1cblxufTtcblxuaWYoICFpc05hdGl2ZSApIHtcbiAgYXV0aG9yaXplID0gZnVuY3Rpb24oY2FsbGJhY2ssIGltbWVkaWF0ZSkge1xuICBnYXBpLmF1dGguYXV0aG9yaXplKHtcbiAgICBjbGllbnRfaWQgOiBDTElFTlRfSUQsXG4gICAgc2NvcGUgOiBPQVVUSF9TQ09QRVMsXG4gICAgaW1tZWRpYXRlIDogaW1tZWRpYXRlXG4gIH0sIGZ1bmN0aW9uKCkge1xuICAgIGF1dGhDb2RlID0gZ2FwaS5hdXRoLmdldFRva2VuKCk7XG4gICAgY2FsbGJhY2soYXV0aENvZGUpO1xuICB9KTtcblxuICB9XG59XG5cbi8qIEF1dGggV2luZG93IGNsb3NlZCAqL1xudmFyIG9uQXV0aENsb3NlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJBdXRoIHdpbmRvdyBjbG9zZWRcIik7XG59O1xuXG4vKiBPQXV0aCBTdWNjZXNzZnVsbHkgZG9uZSAqL1xudmFyIG9uQXV0aFN1Y2Nlc3MgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgLy9jb25zb2xlLmxvZygnQXV0aCBTdWNjZXNzPycpO1xufTtcblxuLyoqXG4gKiBHZXRzIEludm9rZWQgd2hlbiB0aGUgVVJMIGNoYW5nZXMgb24gT0F1dGggYXV0aG9yaXphdGlvbiBwcm9jZXNzXG4gKlxuICogU3VjY2VzcyBVUkwgUGF0dGVybjpcbiAqIFwicmVkaXJlY3RfdXJpXCIgKyBcIj9jb2RlPVwiIFtzZWNyZXQgY29kZSB2YWxdXG4gKlxuICogU3VjY2VzcyBTYW1wbGUgVVJMOlxuICogaHR0cDovL2xvY2FsaG9zdC8/Y29kZT00L1dPcFJMUWZ2dmhIRTB0dU1VRERxbm43NmxDVFQuOG5YQzRJZWJNRUFVdUpKVm5MNDlDYzhBUUdyOGNRSVxuICpcbiAqIERlbmllZCBBY2Nlc3MgVVJMIFBhdHRlcm46IFwicmVkaXJlY3RfdXJpXCIgKyA/ZXJyb3I9YWNjZXNzX2RlbmllZFxuICogRGVuaWVkIEFjY2VzcyBTYW1wbGU6IGh0dHA6Ly9sb2NhbGhvc3QvP2Vycm9yPWFjY2Vzc19kZW5pZWRcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJpTG9jYXRpb24gVGhlIFVSSSBMb2NhdGlvblxuICovXG52YXIgb25BdXRoVXJsQ2hhbmdlID0gZnVuY3Rpb24odXJpTG9jYXRpb24pIHtcbiAgICBjb25zb2xlLmxvZyhcIkluQXBwQnJvd3NlciB1cmwgY2hhbmdlZCBcIit1cmlMb2NhdGlvbik7XG4gICAgaWYodXJpTG9jYXRpb24uaW5kZXhPZihcImNvZGU9XCIpICE9IC0xKSB7XG4gICAgICAgIHJlcXVlc3RTdGF0dXMgPSBzdGF0dXMuU1VDQ0VTUztcblxuICAgICAgICAvKiBTdG9yZSB0aGUgYXV0aENvZGUgdGVtcG9yYXJpbHkgKi9cbiAgICAgICAgYXV0aENvZGUgPSBnZXRQYXJhbWV0ZXJCeU5hbWUoXCJjb2RlXCIsIHVyaUxvY2F0aW9uKTtcbiAgICAgICAgbG9nKFwiRm91bmQgYXV0aCBjb2RlOiBcIithdXRoQ29kZSk7XG5cbiAgICAgICAgZ2V0UmVmcmVzaFRva2VuKGNhbGxiYWNrRnVuYyk7XG5cbiAgICAgICAgLy8gY2xvc2UgdGhlIGNoaWxkQnJvd3NlclxuICAgICAgICB3aW4uY2xvc2UoKTtcbiAgICB9IGVsc2UgaWYodXJpTG9jYXRpb24uaW5kZXhPZihcImVycm9yPVwiKSAhPSAtMSkgIHtcbiAgICAgICAgcmVxdWVzdFN0YXR1cyA9IHN0YXR1cy5FUlJPUjtcbiAgICAgICAgZXJyb3JNZXNzYWdlID0gZ2V0UGFyYW1ldGVyQnlOYW1lKFwiZXJyb3JcIiwgdXJpTG9jYXRpb24pO1xuICAgICAgICBjYWxsYmFja0Z1bmMoKTtcbiAgICAgICAgd2luLmNsb3NlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmVxdWVzdFN0YXR1cyA9IHN0YXR1cy5OT1RfREVURVJNSU5FRDtcbiAgICAgICAgLy9jYWxsYmFja0Z1bmMoKTtcbiAgICB9XG59O1xuXG5cbi8qKlxuKiBHZXRzIHRoZSBSZWZyZXNoIGZyb20gQWNjZXNzIFRva2VuLiBUaGlzIG1ldGhvZCBpcyBvbmx5IGNhbGxlZCBpbnRlcm5hbGx5LFxuKiBhbmQgb25jZSwgb25seSBhZnRlciB3aGVuIGF1dGhvcml6YXRpb24gb2YgQXBwbGljYXRpb24gaGFwcGVucy5cbipcbiogQHBhcmFtIHBhcmFtT2JqIEFuIE9iamVjdCBjb250YWluaW5nIGF1dGhvcml6YXRpb24gY29kZVxuKiBAcGFyYW0gcGFyYW1PYmouYXV0aF9jb2RlIFRoZSBBdXRob3JpemF0aW9uIENvZGUgZm9yIGdldHRpbmcgUmVmcmVzaCBUb2tlblxuKlxuKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBjYWxsYmFjayBmdW5jdGlvbiB3aGljaCBpcyB0byBiZSBpbnZva2VkIGFmdGVyXG4qICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3NmdWwgcmV0cmlldmFsIG9mIGRhdGEgZnJvbSBnb29nbGUncyBzZXJ2ZXJcbipcbiovXG52YXIgZ2V0UmVmcmVzaFRva2VuID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgY29uc29sZS5sb2coXCJhY2Nlc3MgcmVmcmVzaCB0b2tlblwiKTtcbiAgICQuYWpheCh7XG4gICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgdXJsOiBnYXBpQ29uZmlnLmVuZHRva2VuLFxuICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICBjbGllbnRfaWQgICAgOiBnYXBpQ29uZmlnLmNsaWVudF9pZCxcbiAgICAgICAgICAgICAgICAgICBjbGllbnRfc2VjcmV0OiBnYXBpQ29uZmlnLmNsaWVudF9zZWNyZXQsXG4gICAgICAgICAgICAgICAgICAgY29kZSAgICAgICAgIDogYXV0aENvZGUsXG4gICAgICAgICAgICAgICAgICAgcmVkaXJlY3RfdXJpIDogZ2FwaUNvbmZpZy5yZWRpcmVjdF91cmksXG4gICAgICAgICAgICAgICAgICAgZ3JhbnRfdHlwZSAgIDogZ2FwaUNvbmZpZy5ncmFudFR5cGVzLkFVVEhPUklaRVxuICAgICAgICAgICB9XG4gICAgfSlcbiAgICAuZG9uZShmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwic3VjY2VzcyBnZXR0aW5nIHJlZnJlc2ggdG9rZW5cIik7XG5cbiAgICAgICAgLyogdXBvbiBzdWNlc3MsIGRvIGEgY2FsbGJhY2sgd2l0aCB0aGUgZGF0YSByZWNlaXZlZCAqL1xuICAgICAgICAvLyB0ZW1wb3Jhcnkgc3RvcmluZyBhY2Nlc3MgdG9rZW5cbiAgICAgICAgYWNjZXNzVG9rZW4gICAgID0gZGF0YS5hY2Nlc3NfdG9rZW47XG4gICAgICAgIGFjY2Vzc1Rva2VuVGltZSA9IChuZXcgRGF0ZSgpKS5nZXRUaW1lKCk7XG5cbiAgICAgICAgLy8gc2V0IHRoZSB0b2tlbiBmb3IgdGhlIGpzIGFwaVxuICAgICAgICBnYXBpLmF1dGguc2V0VG9rZW4oZGF0YSk7XG5cbiAgICAgICAgLyogc2V0IHRoZSBlcnJvciBvZiBkYXRhIHRvIGZhbHNlLCBhcyBpdCB3YXMgc3VjY2Vzc2Z1bCAqL1xuICAgICAgICBkYXRhLmVycm9yID0gZmFsc2U7XG5cbiAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKHRva2VuS2V5LCBkYXRhLnJlZnJlc2hfdG9rZW4pO1xuXG4gICAgICAgIC8qIG5vdyBpbnZva2UgdGhlIGNhbGxiYWNrICovXG4gICAgICAgIGNhbGxiYWNrKHthY2Nlc3NfdG9rZW46IGFjY2Vzc1Rva2VufSk7XG4gICAgfSlcbiAgICAuZmFpbChmdW5jdGlvbih4aHIsIHRleHRTdGF0dXMpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKHtcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IHhoci5yZXNwb25zZVRleHRcbiAgICAgICAgICAgIH0pO1xuICAgIH0pXG4gICAgLmFsd2F5cyhmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJUb2tlbiByZXF1ZXN0IGNvbXBsZXRlXCIpO1xuICAgIH0pO1xufTtcblxuaWYoICFpc05hdGl2ZSApIHtcbiAgZ2V0UmVmcmVzaFRva2VuID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgZ2FwaS5hdXRoLmF1dGhvcml6ZSh7XG4gICAgY2xpZW50X2lkIDogQ0xJRU5UX0lELFxuICAgIHNjb3BlIDogT0FVVEhfU0NPUEVTLFxuICAgIGltbWVkaWF0ZSA6IHRydWVcbiAgfSwgZnVuY3Rpb24oKSB7XG4gICAgdG9rZW4gPSBnYXBpLmF1dGguZ2V0VG9rZW4oKTtcbiAgICBpZiggY2FsbGJhY2sgKSBjYWxsYmFjayh0b2tlbik7XG4gIH0pO1xuICB9XG59XG5cblxuLyoqXG4qIFRoaXMgbWV0aG9kIHNob3VsZCBPTkxZIGJlIGNhbGxlZCBsb2NhbGx5IGZyb20gd2l0aGluIHRoaXMgY2xhc3MuXG4qIFJldHVybnMgdGhlIFJlZnJlc2ggVG9rZW4gZnJvbSB0aGUgbG9jYWwgZGF0YWJhc2UuXG4qXG4qIEByZXR1cm4ge1N0cmluZ30gVGhlIHJlZnJlc2ggVG9rZW5cbipcbiovXG52YXIgZ2V0VG9rZW4gPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKHRva2VuS2V5KTtcbn07XG5cblxuLyoqXG4qIFRoaXMgbWV0aG9kIGlzIGludm9rZWQgZXh0ZXJuYWxseS4gSXQgcmV0cmlldmVzIHRoZSBBY2Nlc3MgVG9rZW4gYnkgYXQgZmlyc3RcbiogY2hlY2tpbmcgaWYgY3VycmVudCBhY2Nlc3MgdG9rZW4gaGFzIGV4cGlyZWQgb3Igbm90LiBJZiBpdHMgbm90IGV4cGlyZWQsIGl0XG4qIHNpbXBseSByZXR1cm5zIHRoYXQsIG90aGVyd2lzZSwgaXQgZ2V0cyB0aGUgcmVmcmVzaCBUb2tlbiBmcm9tIHRoZSBsb2NhbCBkYXRhYmFzZVxuKiAoYnkgaW52b2tpbmcgZ2V0VG9rZW4pIGFuZCB0aGVuIGNvbm5lY3Rpbmcgd2l0aCBHb29nbGUncyBTZXJ2ZXIgKHVzaW5nIE9BdXRoKVxuKiB0byBnZXQgdGhlIEFjY2VzcyBUb2tlbi5cbipcbiogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgICBBIGNhbGxCYWNrIGZ1bmN0aW9uIHdoaWNoIGlzIHRvIGJlIGludm9rZWQgYWZ0ZXJcbiogICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEgaXMgcmV0cmlldmVkIGZyb20gdGhlIGdvb2dsZSdzIHNlcnZlci4gVGhlIGRhdGFcbiogICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gZ29vZ2xlIHNlcnZlciBpcyBwYXNzZWQgdG8gY2FsbGJhY2sgYXMgYXJncy5cbipcbiovXG52YXIgZ2V0QWNjZXNzVG9rZW4gPSBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgdmFyIGN1cnJlbnRUaW1lID0gKG5ldyBEYXRlKCkpLmdldFRpbWUoKTtcblxuICAgY29uc29sZS5sb2coXCJnZXR0aW5nIGFjY2VzcyB0b2tlblwiKTtcblxuICAgLyogY2hlY2sgaWYgY3VycmVudCBUb2tlbiBoYXMgbm90IGV4cGlyZWQgKHN0aWxsIHZhbGlkKSAqL1xuICAgaWYgKGFjY2Vzc1Rva2VuICYmIGFjY2Vzc1Rva2VuICE9IGZhbHNlICYmXG4gICAgICAgICAgIGN1cnJlbnRUaW1lIDwgKGFjY2Vzc1Rva2VuVGltZSArIGFjY2Vzc1Rva2VuRXhwaXJ5TGltaXQpKSB7XG4gICAgICAgICAgIGNhbGxiYWNrKHsgYWNjZXNzX3Rva2VuOiBhY2Nlc3NUb2tlbiB9KTtcblxuICAgICAgICAgICByZXR1cm47XG4gICB9XG5cbiAgIGNvbnNvbGUubG9nKFwiQUNDRVNTIFRPS0VOIFBBUkFNUzogXCIrYWNjZXNzVG9rZW4rXCIgXCIrYWNjZXNzVG9rZW5UaW1lK1wiIFwiK2FjY2Vzc1Rva2VuRXhwaXJ5TGltaXQpO1xuXG4gICAvKiBlbHNlLCBnZXQgdGhlIHJlZnJlc2hUb2tlbiBmcm9tIGxvY2FsIHN0b3JhZ2UgYW5kIGdldCBhIG5ldyBhY2Nlc3MgVG9rZW4gKi9cbiAgIHZhciByZWZyZXNoVG9rZW4gPSBnZXRUb2tlbigpO1xuXG4gICAvLyAgIGNvbnNvbGUubG9nKFwiUmVmcmVzaCBUb2tlbiA+PiBcIiArIHJlZnJlc2hUb2tlbik7XG4gICAkLmFqYXgoe1xuICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgIHVybDogZ2FwaUNvbmZpZy5lbmR0b2tlbixcbiAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICBjbGllbnRfaWQgICAgOiBnYXBpQ29uZmlnLmNsaWVudF9pZCxcbiAgICAgICAgICAgICAgICAgIGNsaWVudF9zZWNyZXQ6IGdhcGlDb25maWcuY2xpZW50X3NlY3JldCxcbiAgICAgICAgICAgICAgICAgIHJlZnJlc2hfdG9rZW46IHJlZnJlc2hUb2tlbixcbiAgICAgICAgICAgICAgICAgIGdyYW50X3R5cGUgICA6IGdhcGlDb25maWcuZ3JhbnRUeXBlcy5SRUZSRVNILFxuICAgICAgICAgIH1cbiAgICB9KVxuICAgIC5kb25lKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIC8qIHVwb24gc3VjZXNzLCBkbyBhIGNhbGxiYWNrIHdpdGggdGhlIGRhdGEgcmVjZWl2ZWQgKi9cbiAgICAgICAgICAgIC8vIHRlbXBvcmFyeSBzdG9yaW5nIGFjY2VzcyB0b2tlblxuICAgICAgICAgICAgYWNjZXNzVG9rZW4gPSBkYXRhLmFjY2Vzc190b2tlbjtcbiAgICAgICAgICAgIGFjY2Vzc1Rva2VuVGltZSA9IChuZXcgRGF0ZSgpKS5nZXRUaW1lKCk7XG5cbiAgICAgICAgICAgIC8vIHNldCB0aGUgdG9rZW4gZm9yIHRoZSBqcyBhcGlcbiAgICAgICAgICAgIGdhcGkuYXV0aC5zZXRUb2tlbihkYXRhKTtcblxuICAgICAgICAgICAgLyogc2V0IHRoZSBlcnJvciB0byBmYWxzZSAqL1xuICAgICAgICAgICAgZGF0YS5lcnJvciA9IGZhbHNlO1xuICAgICAgICAgICAgY2FsbGJhY2soZGF0YSk7XG4gICAgICAgICAgIH0pXG4gICAgLmZhaWwoZnVuY3Rpb24oeGhyLCB0ZXh0U3RhdHVzKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlRva2VuIHJlcXVlc3QgZXJyb3IgPz8gPj5cIiArIHhoci5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgY2FsbGJhY2soe1xuICAgICAgICAgICAgICAgICAgICBlcnJvcjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogeGhyLnJlc3BvbnNlVGV4dFxuICAgICAgICAgICAgfSk7XG4gICAgfSlcbiAgICAuYWx3YXlzKGZ1bmN0aW9uKCkgeyAvL2NvbnNvbGUubG9nKFwiVG9rZW4gcmVxdWVzdCBjb21wbGV0ZVwiKTtcbiAgICB9KTtcbn07XG5cbmlmKCAhaXNOYXRpdmUgKSB7XG4gIGdldEFjY2Vzc1Rva2VuID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICAgdmFyIGN1cnJlbnRUaW1lID0gKG5ldyBEYXRlKCkpLmdldFRpbWUoKTtcblxuICAgICBpZiAoYWNjZXNzVG9rZW4gJiZcbiAgICAgICAgICAgICBjdXJyZW50VGltZSA8IChhY2Nlc3NUb2tlblRpbWUgKyBhY2Nlc3NUb2tlbkV4cGlyeUxpbWl0KSkge1xuICAgICAgICAgICAgIGNhbGxiYWNrKGFjY2Vzc1Rva2VuKTtcblxuICAgICAgICAgICAgIHJldHVybjtcbiAgICAgfVxuXG4gICAgZ2FwaS5hdXRoLmF1dGhvcml6ZSh7XG4gICAgY2xpZW50X2lkIDogQ0xJRU5UX0lELFxuICAgIHNjb3BlIDogT0FVVEhfU0NPUEVTLFxuICAgIGltbWVkaWF0ZSA6IHRydWVcbiAgfSwgZnVuY3Rpb24oKSB7XG4gICAgdG9rZW4gPSBnYXBpLmF1dGguZ2V0VG9rZW4oKTtcbiAgICBhY2Nlc3NUb2tlbiA9IHRva2VuO1xuICAgIGFjY2Vzc1Rva2VuVGltZSA9IChuZXcgRGF0ZSgpKS5nZXRUaW1lKCk7XG4gICAgaWYoIGNhbGxiYWNrICkgY2FsbGJhY2sodG9rZW4pO1xuICB9KTtcbiAgfVxufVxuXG5cblxuLyoqXG4qIFNhdmVzIHRoZSBSZWZyZXNoIFRva2VuIGluIGEgbG9jYWwgZGF0YWJhc2Ugb3IgbG9jYWxTdG9yYWdlXG4qIFRoaXMgbWV0aG9kIHNoYWxsIGJlIGludm9rZWQgZnJvbSBleHRlcm5hbGx5IG9ubHkgPGI+b25jZTwvYj4gYWZ0ZXIgYW5cbiogYXV0aG9yaXphdGlvbiBjb2RlIGlzIHJlY2VpdmVkIGZyb20gZ29vZ2xlJ3Mgc2VydmVyLiBUaGlzIG1ldGhvZFxuKiBjYWxscyB0aGUgb3RoZXIgbWV0aG9kIChnZXRSZWZyZXNoVG9rZW4pIHRvIGdldCB0aGUgcmVmcmVzaCBUb2tlbiBhbmRcbiogdGhlbiBzYXZlcyBpdCBsb2NhbGx5IG9uIGRhdGFiYXNlIGFuZCBpbnZva2VzIGEgY2FsbGJhY2sgZnVuY3Rpb25cbipcbiogQHBhcmFtIHRva2VuT2JqIEEgT2JqZWN0IGNvbnRhaW5pbmcgYXV0aG9yaXphdGlvbiBjb2RlXG4qIEBwYXJhbSB7U3RyaW5nfSB0b2tlbk9iai5hdXRoX2NvZGUgVGhlIGF1dGhvcml6YXRpb24gY29kZSBmcm9tIGdvb2dsZSdzIHNlcnZlclxuKlxuKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBUaGUgZnVuY3Rpb24gdG8gYmUgaW52b2tlZCB3aXRoIHBhcmFtZXRlcnNcbiovXG52YXIgc2F2ZVJlZnJlc2hUb2tlbiA9IGZ1bmN0aW9uKHRva2VuT2JqLCBjYWxsYmFjaykge1xuICAgICBnZXRSZWZyZXNoVG9rZW4odG9rZW5PYmosIGZ1bmN0aW9uKGRhdGEpIHtcblxuICAgICAgICAgICAgIC8qIGlmIHRoZXJlJ3Mgbm8gZXJyb3IgKi9cbiAgICAgICAgICAgICBpZiAoIWRhdGEuZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQFRPRE86IG1ha2UgYW5vdGhlciBtZXRob2Qgc2F2ZVRva2VuIHRvIGFic3RyYWN0IHRoZSBzdG9yaW5nIG9mIHRva2VuXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKHRva2VuS2V5LCBkYXRhLnJlZnJlc2hfdG9rZW4pO1xuICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICBjYWxsYmFjayhkYXRhKTtcbiAgICAgfSk7XG59O1xuXG5cblxuLyoqXG4qIENoZWNrcyBpZiB1c2VyIGhhcyBhdXRob3JpemVkIHRoZSBBcHAgb3Igbm90XG4qIEl0IGRvZXMgc28gYnkgY2hlY2tpbmcgaWYgdGhlcmUncyBhIHJlZnJlc2hfdG9rZW5cbiogYXZhaWxhYmxlIG9uIHRoZSBjdXJyZW50IGRhdGFiYXNlIHRhYmxlLlxuKlxuKiBAcmV0dXJuIHtCb29sZWFufSB0cnVlIGlmIGF1dGhvcml6ZWQsIGZhbHNlIG90aGVyd2lzZVxuKi9cbnZhciBpc0F1dGhvcml6ZWQgPSBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAgdmFyIHRva2VuVmFsdWUgPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0odG9rZW5LZXkpO1xuXG4gICAgICBjYWxsYmFjaygoKHRva2VuVmFsdWUgIT09IG51bGwpICYmICh0eXBlb2YgdG9rZW5WYWx1ZSAhPT0gJ3VuZGVmaW5lZCcpKSk7XG59O1xuXG5pZiggIWlzTmF0aXZlICkge1xuICBpc0F1dGhvcml6ZWQgPSBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgIGdhcGkuYXV0aC5hdXRob3JpemUoe1xuICAgIGNsaWVudF9pZCA6IENMSUVOVF9JRCxcbiAgICBzY29wZSA6IE9BVVRIX1NDT1BFUyxcbiAgICBpbW1lZGlhdGUgOiB0cnVlXG4gIH0sIGZ1bmN0aW9uKCkge1xuICAgIHRva2VuID0gZ2FwaS5hdXRoLmdldFRva2VuKCk7XG4gICAgaWYoIGNhbGxiYWNrICkgY2FsbGJhY2sodG9rZW4pO1xuICB9KTtcbiAgfVxufVxuXG5cbi8qKlxuKiBFeHRyYWN0cyB0aGUgY29kZSBmcm9tIHRoZSB1cmwuIENvcGllZCBmcm9tIG9ubGluZVxuKiBAVE9ETyBuZWVkcyB0byBiZSBzaW1wbGlmaWVkLlxuKlxuKiBAcGFyYW0gbmFtZSBUaGUgcGFyYW1ldGVyIHdob3NlIHZhbHVlIGlzIHRvIGJlIGdyYWJiZWQgZnJvbSB1cmxcbiogQHBhcmFtIHVybCAgVGhlIHVybCB0byBiZSBncmFiYmVkIGZyb20uXG4qXG4qIEByZXR1cm4gUmV0dXJucyB0aGUgVmFsdWUgY29ycmVzcG9uZGluZyB0byB0aGUgbmFtZSBwYXNzZWRcbiovXG52YXIgZ2V0UGFyYW1ldGVyQnlOYW1lID0gZnVuY3Rpb24obmFtZSwgdXJsKSB7XG4gIG5hbWUgPSBuYW1lLnJlcGxhY2UoL1tcXFtdLywgXCJcXFxcXFxbXCIpLnJlcGxhY2UoL1tcXF1dLywgXCJcXFxcXFxdXCIpO1xuICB2YXIgcmVnZXhTID0gXCJbXFxcXD8mXVwiICsgbmFtZSArIFwiPShbXiYjXSopXCI7XG4gIHZhciByZWdleCA9IG5ldyBSZWdFeHAocmVnZXhTKTtcbiAgdmFyIHJlc3VsdHMgPSByZWdleC5leGVjKHVybCk7XG5cbiAgaWYocmVzdWx0cyA9PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGVsc2VcbiAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KHJlc3VsdHNbMV0ucmVwbGFjZSgvXFwrL2csIFwiIFwiKSk7XG59O1xuXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBhdXRob3JpemUgOiBhdXRob3JpemUsXG4gIGlzQXV0aG9yaXplZCA6IGlzQXV0aG9yaXplZCxcbiAgZ2V0QWNjZXNzVG9rZW4gOiBnZXRBY2Nlc3NUb2tlbixcbiAgQVBQX0lEIDogQVBQX0lEXG59O1xuIiwidmFyIGFwcCA9IHJlcXVpcmUoJy4vYXBwJyk7XG5cbnZhciBjYWNoZWRUaWxlU3R5bGUgPSB7XG4gIHdoZXJlOiBcInBpZCBpbiAoKVwiLFxuICBwb2x5Z29uT3B0aW9uczoge1xuICAgIGZpbGxDb2xvcjogXCIjMDAwMDAwXCIsXG4gICAgc3Ryb2tlQ29sb3I6IFwiI0ZGMDAwMFwiLFxuICAgIHN0cm9rZVdlaWdodDogM1xuICB9XG59XG5cbnZhciBjYWNoZWRUaWxlcyA9IFtdO1xudmFyIGNhY2hlZFRpbGVzTG9hZGVkID0gZmFsc2U7XG52YXIgY2FjaGVkVGlsZVByZWZpeCA9ICdjYWNoZWRfdGl0bGVfJztcbnZhciBjYWNoaW5nID0gZmFsc2U7XG52YXIgc2F2ZUNhY2hlT25DbGlja1NldCA9IGZhbHNlO1xudmFyIGNNYXBEYXRhID0ge307XG5cbnZhciBjb2xzID0gW107XG52YXIgYXBwID0gbnVsbDtcblxuZnVuY3Rpb24gaW5pdCgpIHtcbiAgX2xvYWRGcm9tQ2FjaGUoKTtcbiAgX2xvYWRDYWNoZWRUaWxlcygpO1xufVxuXG5mdW5jdGlvbiBjbGVhckNhY2hlKCkge1xuICBpZiggIWNvbmZpcm0oJ0FyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBjbGVhciBhbGwgdGlsZSBkYXRhIGZyb20gdGhlIGNhY2hlPycpICkgcmV0dXJuO1xuXG4gIGZvciggdmFyIGtleSBpbiB3aW5kb3cubG9jYWxTdG9yYWdlICkge1xuICAgIGlmKCBrZXkuaW5kZXhPZihjYWNoZWRUaWxlUHJlZml4KSA+IC0xICkge1xuICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGtleSk7XG4gICAgfVxuICB9XG4gIGNhY2hlZFRpbGVzID0gW107XG59XG5cbi8vIGUgaXMgdGhlIGV2ZW50IG9iamVjdCBmcm9tIGdvb2dsZSBtYXBzXG5mdW5jdGlvbiBjYWNoZVRpbGUoZSwgZnVzaW9uTGF5ZXIsIGRlZmF1bHRPcHRpb25zLCBkZWZhdWx0U3R5bGUpIHtcbiAgaWYoICFzYXZlQ2FjaGVPbkNsaWNrU2V0ICkge1xuICAgIHNhdmVDYWNoZU9uQ2xpY2tTZXQgPSB0cnVlO1xuICAgICQoJyNsb2NhdGUtY2FjaGUtc2F2ZS1idG4nKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgX3NhdmVUaWxlKCk7XG4gICAgfSk7XG4gICAgJCgnI2xvY2F0ZS1jYWNoZS1tb2RlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgIGlmKCAhJCh0aGlzKS5pcygnY2hlY2tlZCcpICkgJCgnI2xvY2F0ZS1jYWNoZS1zYXZlLXBhbmVsJykuaGlkZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgaWYoIGNhY2hpbmcgKSByZXR1cm47XG4gIGNhY2hpbmcgPSB0cnVlO1xuXG4gIGNNYXBEYXRhID0ge1xuICAgIGZ1c2lvbkxheWVyIDogZnVzaW9uTGF5ZXIsXG4gICAgZGVmYXVsdE9wdGlvbnMgOiBkZWZhdWx0T3B0aW9ucyxcbiAgICBkZWZhdWx0U3R5bGUgOiBkZWZhdWx0U3R5bGUsXG4gICAgcGlkIDogIGUucm93LnBpZC52YWx1ZVxuICB9XG5cbiAgJCgnI2xvY2F0ZS1jYWNoZS1zYXZlLW5hbWUnKS52YWwoJycpO1xuICAkKCcjbG9jYXRlLWNhY2hlLW1vZGUtbG9hZGluZycpLnNob3coKTtcbiAgJCgnI2xvY2F0ZS1jYWNoZS1zYXZlLXBhbmVsJykuaGlkZSgpO1xuXG4gIF9sb2FkVGlsZShlLmxhdExuZy5sbmcoKSwgZS5sYXRMbmcubGF0KCksIGZ1bmN0aW9uKGRhdGEpe1xuICAgICQoJyNsb2NhdGUtY2FjaGUtc2F2ZS1wYW5lbCcpLnNob3coKTtcbiAgICAkKCcjbG9jYXRlLWNhY2hlLW1vZGUtbG9hZGluZycpLmhpZGUoKTtcblxuICAgICQoJyNsb2NhdGUtY2FjaGUtc2F2ZS1waWQnKS5odG1sKGNNYXBEYXRhLnBpZCk7XG4gICAgY01hcERhdGEuZGF0YSA9IGRhdGE7XG4gICAgY2FjaGluZyA9IGZhbHNlO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gcmVuZGVyKCkge1xuICBmb3IoIHZhciBhdHRyIGluIGFwcC5nZXRNb2RlbCgpLndlYXRoZXIgKSB7XG4gICAgaWYoIGF0dHIgIT0gXCJucmVsXCIgKSBjb2xzLnB1c2goYXR0cik7XG4gIH1cblxuICAvLyB0aGUgYWJvdXQgbW9kYWwgbGluayBpcyBjcmVhdGVkIGJlbG93LCBzbyB3aHkgbm90Li4uXG4gICQoXCIjYWJvdXQtbW9kYWxcIikubW9kYWwoe1xuICAgIHNob3cgOiBmYWxzZVxuICB9KTtcblxuICAvLyB0aGUgYWJvdXQgbW9kYWwgbGluayBpcyBjcmVhdGVkIGJlbG93LCBzbyB3aHkgbm90Li4uXG4gICQoXCIjaGVscC1tb2RhbFwiKS5tb2RhbCh7XG4gICAgc2hvdyA6IGZhbHNlXG4gIH0pO1xuXG4gIF9jcmVhdGVOYXZNZW51KCk7XG5cbiAgLy8gaGlkZSB0aGUgc2VsZWN0IHRyZWUgYnV0dG9uXG4gICQoJyN0cmVlLXN1Yi1tZW51JykucGFyZW50KCkuaGlkZSgpO1xuXG4gIC8vIGhpZGUgdGhlIHNlbGVjdG9yIGZvciB1cGxvYWRpbmcgd2VhdGhlciBkYXRhIGZyb20gYSBnb29nbGUgc3ByZWFkc2hlZXRcbiAgJCgnI3dlYXRoZXJSZWFkZXItc3ByZWFkc2hlZXQnKS5wYXJlbnQoKS5oaWRlKCk7XG5cbiAgLy8gc2hvdyB0aGUgY2FjaGUgdmVyc2lvbiBvZiB0aGUgbG9jYXRpb24gc2VsZWN0b3JcbiAgJCgnI3NlbGVjdC1sb2NhdGlvbi1vbmxpbmUnKS5oaWRlKCk7XG4gICQoJyNzZWxlY3QtbG9jYXRpb24tb2ZmbGluZScpLnNob3coKTtcblxuICAvLyBzZXQgdGhlIGxvY2F0aW9uIHNlbGVjdG9yIHVpIGxpc3QgYmFzZWQgb24gY2FjaGVkIHRpbGVzXG4gIF91cGRhdGVDYWNoZVRpbGVVaUxpc3QoKTtcbn1cblxuZnVuY3Rpb24gcmVuZGVyQ2FjaGVkVGlsZXNPbk1hcChmdXNpb25MYXllciwgZGVmYXVsdE9wdGlvbnMsIGRlZmF1bHRTdHlsZSkge1xuICBpZiggIWNhY2hlZFRpbGVzTG9hZGVkICkgX2xvYWRDYWNoZWRUaWxlcygpO1xuXG4gIGRlZmF1bHRPcHRpb25zLnN0eWxlcyA9IFtkZWZhdWx0U3R5bGVdO1xuXG4gIGlmKCBjYWNoZWRUaWxlcy5sZW5ndGggPiAwICkge1xuICAgIGNhY2hlZFRpbGVTdHlsZS53aGVyZSA9ICdwaWQgaW4gKCcrY2FjaGVkVGlsZXMuam9pbignLCcpKycpJztcbiAgICBkZWZhdWx0T3B0aW9ucy5zdHlsZXMucHVzaChjYWNoZWRUaWxlU3R5bGUpO1xuICB9XG5cbiAgZnVzaW9uTGF5ZXIuc2V0T3B0aW9ucyhkZWZhdWx0T3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIF9zYXZlVGlsZSgpIHtcbiAgdmFyIG5hbWUgPSAkKCcjbG9jYXRlLWNhY2hlLXNhdmUtbmFtZScpLnZhbCgpO1xuICBpZiggbmFtZS5sZW5ndGggPT0gMCApIHJldHVybiBhbGVydCgnUGxlYXNlIHByb3ZpZGUgYSBuYW1lJyk7XG5cbiAgY01hcERhdGEuZGF0YS5uYW1lID0gbmFtZTtcblxuICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oY2FjaGVkVGlsZVByZWZpeCtjTWFwRGF0YS5waWQsIEpTT04uc3RyaW5naWZ5KGNNYXBEYXRhLmRhdGEpKTtcblxuICBjYWNoZWRUaWxlcy5wdXNoKGNNYXBEYXRhLnBpZCk7XG4gIHJlbmRlckNhY2hlZFRpbGVzT25NYXAoY01hcERhdGEuZnVzaW9uTGF5ZXIsIGNNYXBEYXRhLmRlZmF1bHRPcHRpb25zLCBjTWFwRGF0YS5kZWZhdWx0U3R5bGUpO1xuICAkKCcjbG9jYXRlLWNhY2hlLXNhdmUtcGFuZWwnKS5oaWRlKCk7XG59XG5cbmZ1bmN0aW9uIF9sb2FkVGlsZShsbmcsIGxhdCwgY2FsbGJhY2spIHtcbiAgZ2EoJ3NlbmQnLCAnZXZlbnQnLCAndWknLCAnaW50ZXJhY3Rpb24nLCAndGlsZS1kYXRhLWNhY2hlJywgMSk7XG5cbiAgdmFyIHVybCA9IFwiaHR0cDovL2FsZGVyLmJpb2VuZXJneS5jYXNpbC51Y2RhdmlzLmVkdTo4MDgwL3ZpenNvdXJjZS9yZXN0P3ZpZXc9cG9pbnRUb1dlYXRoZXIoXCIrbG5nK1wiLFwiK2xhdCtcIiw4MTkyKVwiXG4gIHZhciBxID0gbmV3IGdvb2dsZS52aXN1YWxpemF0aW9uLlF1ZXJ5KHVybCk7XG4gIHZhciByZXNwcyA9IDA7XG4gIHZhciB3ZWF0aGVyVGFibGUgPSB7fTtcbiAgdmFyIHNvaWxUYWJsZSA9IHt9O1xuXG4gIGZ1bmN0aW9uIGNoZWNrRG9uZSgpIHtcbiAgICAgIHJlc3BzKys7XG4gICAgICBpZiggcmVzcHMgPT0gMiAmJiBjYWxsYmFjayApIGNhbGxiYWNrKHt3ZWF0aGVyOndlYXRoZXJUYWJsZSwgc29pbDpzb2lsVGFibGV9KTtcbiAgfVxuXG4gIHEuc2V0UXVlcnkoJ1NFTEVDVCAqJyk7XG4gIHEuc2VuZChmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgd2VhdGhlclRhYmxlID0gSlNPTi5wYXJzZShyZXNwb25zZS5nZXREYXRhVGFibGUoKS50b0pTT04oKSk7XG4gICAgY2hlY2tEb25lKCk7XG4gIH0pO1xuXG4gIHZhciB1cmwgPSBcImh0dHA6Ly9hbGRlci5iaW9lbmVyZ3kuY2FzaWwudWNkYXZpcy5lZHU6ODA4MC92aXpzb3VyY2UvcmVzdD92aWV3PXBvaW50VG9TT0lMKFwiK2xuZytcIixcIitsYXQrXCIsODE5MilcIlxuICB2YXIgcSA9IG5ldyBnb29nbGUudmlzdWFsaXphdGlvbi5RdWVyeSh1cmwpO1xuICBxLnNldFF1ZXJ5KCdTRUxFQ1QgKicpO1xuICBxLnNlbmQoZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgIHNvaWxUYWJsZSA9IEpTT04ucGFyc2UocmVzcG9uc2UuZ2V0RGF0YVRhYmxlKCkudG9KU09OKCkpO1xuICAgIGNoZWNrRG9uZSgpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gX3VwZGF0ZUNhY2hlVGlsZVVpTGlzdCgpIHtcbiAgaWYoIGNhY2hlZFRpbGVzLmxlbmd0aCA9PSAwICkge1xuICAgICQoJyNzZWxlY3QtbG9jYXRpb24tb2ZmbGluZS1ub25lJykuc2hvdygpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBsaXN0RWxlID0gJCgnI3NlbGVjdC1sb2NhdGlvbi1vZmZsaW5lLWxpc3QnKS5odG1sKCc8ZGl2PlNlbGVjdCBDYWNoZWQgVGlsZTwvZGl2PicpLCBlbGU7XG4gICQoJyNzZWxlY3QtbG9jYXRpb24tb2ZmbGluZS1ub25lJyk7XG4gIGZvciggdmFyIGkgPSAwOyBpIDwgY2FjaGVkVGlsZXMubGVuZ3RoOyBpKysgKSB7XG4gICAgdmFyIGpzb24gPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oY2FjaGVkVGlsZVByZWZpeCtjYWNoZWRUaWxlc1tpXSk7XG4gICAganNvbiA9IEpTT04ucGFyc2UoanNvbik7XG5cbiAgICBlbGUgPSAkKCc8ZGl2PjxhIGNhY2hlaWQ9XCInK2krJ1wiIHN0eWxlPVwiY3Vyc29yOnBvaW50ZXJcIj4nK2NhY2hlZFRpbGVzW2ldKyc6ICcranNvbi5uYW1lKyc8L2E+PC9kaXY+Jyk7XG4gICAgZWxlLmZpbmQoJ2EnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgIF9ydW5DYWNoZWRUaWxlKHBhcnNlSW50KCQodGhpcykuYXR0cignY2FjaGVpZCcpKSk7XG4gICAgfSk7XG4gICAgbGlzdEVsZS5hcHBlbmQoZWxlKVxuICB9XG59XG5cbmZ1bmN0aW9uIF9ydW5DYWNoZWRUaWxlKGluZGV4KSB7XG4gIHZhciBqc29uID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKGNhY2hlZFRpbGVQcmVmaXgrY2FjaGVkVGlsZXNbaW5kZXhdKTtcbiAganNvbiA9IEpTT04ucGFyc2UoanNvbik7XG5cbiAgZm9yKCB2YXIgaSA9IDA7IGkgPCBqc29uLndlYXRoZXIucm93cy5sZW5ndGg7IGkrKyApIHtcbiAgICB2YXIgbSA9IGkrJyc7XG4gICAgZm9yKCB2YXIgaiA9IDE7IGogPCBqc29uLndlYXRoZXIuY29scy5sZW5ndGg7IGorKyApIHtcbiAgICAgICQoXCIjaW5wdXQtd2VhdGhlci1cIitjb2xzW2pdK1wiLVwiK2kpLnZhbChqc29uLndlYXRoZXIucm93c1tpXS5jW2pdID8ganNvbi53ZWF0aGVyLnJvd3NbaV0uY1tqXS52IDogXCJcIik7XG4gICAgfVxuICB9XG5cblxuICBmb3IoIHZhciBpID0gMDsgaSA8IGpzb24uc29pbC5jb2xzLmxlbmd0aDsgaSsrICkge1xuICAgIGlmKCBqc29uLnNvaWwucm93c1swXSA9PSBudWxsICkgY29udGludWU7XG4gICAgJChcIiNpbnB1dC1zb2lsLVwiK2pzb24uc29pbC5jb2xzW2ldLmlkKS52YWwoanNvbi5zb2lsLnJvd3NbMF0uY1tpXS52KTtcbiAgfVxuXG4gICQoXCIjc2VsZWN0LXdlYXRoZXItbW9kYWxcIikubW9kYWwoJ2hpZGUnKTtcblxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgYXBwLnJ1bk1vZGVsKCk7XG4gIH0sIDUwMCk7XG59XG5cbmZ1bmN0aW9uIF9sb2FkQ2FjaGVkVGlsZXMoKSB7XG4gIGNhY2hlZFRpbGVzID0gW107XG4gIGZvciggdmFyIGtleSBpbiB3aW5kb3cubG9jYWxTdG9yYWdlICkge1xuICAgIGlmKCBrZXkuaW5kZXhPZihjYWNoZWRUaWxlUHJlZml4KSA+IC0xICkge1xuICAgICAgY2FjaGVkVGlsZXMucHVzaChrZXkucmVwbGFjZShjYWNoZWRUaWxlUHJlZml4LCcnKSk7XG4gICAgfVxuICB9XG4gIGNhY2hlZFRpbGVzTG9hZGVkID0gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gX2NyZWF0ZU5hdk1lbnUoKSB7XG4gIHZhciBidG4gPSAkKCc8bGkgY2xhc3M9XCJkcm9wZG93blwiPidcbiAgICAgICsgJzxhIGNsYXNzPVwiZHJvcGRvd24tdG9nZ2xlXCI+T0ZGTElORSBNT0RFPGIgY2xhc3M9XCJjYXJldFwiPjwvYj48L2E+J1xuICAgICAgKyAnPHVsIGNsYXNzPVwiZHJvcGRvd24tbWVudVwiPidcbiAgICAgICsgJzxsaT48YSBpZD1cImhlbHBcIj48aSBjbGFzcz1cImljb24tcXVlc3Rpb24tc2lnblwiPjwvaT4gSGVscDwvYT48L2xpPidcbiAgICAgICsgJzxsaT48YSBpZD1cImFib3V0XCI+PGkgY2xhc3M9XCJpY29uLWluZm8tc2lnblwiPjwvaT4gQWJvdXQ8L2E+PC9saT4nXG4gICAgICArICc8L3VsPjwvbGk+Jyk7XG5cbiAgLy8gc2V0IGNsaWNrIGhhbmRsZXJzIGZvciBwb3B1cFxuICBidG4uZmluZCgnYS5kcm9wZG93bi10b2dnbGUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICQodGhpcykucGFyZW50KCkudG9nZ2xlQ2xhc3MoJ29wZW4nKTtcbiAgfSk7XG5cbiAgLy8gYWJvdXQgY2xpY2sgaGFuZGxlclxuICBidG4uZmluZCgnI2Fib3V0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgYnRuLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XG4gICAgJChcIiNhYm91dC1tb2RhbFwiKS5tb2RhbCgnc2hvdycpO1xuICB9KTtcblxuICBidG4uZmluZCgnI2hlbHAnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICBidG4udG9nZ2xlQ2xhc3MoJ29wZW4nKTtcbiAgICBzaG93SGVscCgpO1xuICB9KTtcblxuICAvLyBhZGQgbWVudVxuICAkKFwiI2xvZ2luLWhlYWRlclwiKS5odG1sKFwiXCIpLmFwcGVuZChidG4pO1xufTtcblxuZnVuY3Rpb24gX2xvYWRGcm9tQ2FjaGUoKSB7XG4gICAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6ICdjYWNoZS9qc2FwaScsXG4gICAgICAgIGRhdGFUeXBlOiBcInNjcmlwdFwiLFxuICAgICAgICBjYWNoZSA6IHRydWUsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgJCgnaGVhZCcpLmFwcGVuZCggJCgnPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIHR5cGU9XCJ0ZXh0L2Nzc1wiIC8+JykuYXR0cignaHJlZicsICdjYWNoZS9jaGFydC5jc3MnKSApO1xuICAgICAgICAgICQoJ2hlYWQnKS5hcHBlbmQoICQoJzxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiB0eXBlPVwidGV4dC9jc3NcIiAvPicpLmF0dHIoJ2hyZWYnLCAnY2FjaGUvYW5ub3RhdGVkdGltZWxpbmUuY3NzJykgKTtcbiAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiAnY2FjaGUvY2hhcnQuanMnLFxuICAgICAgICAgICAgZGF0YVR5cGU6IFwic2NyaXB0XCIsXG4gICAgICAgICAgICBjYWNoZSA6IHRydWUsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICBjaGFydHNMb2FkZWQgPSB0cnVlO1xuICAgICAgICAgICAgICBpZiggY2hhcnRzQ2FsbGJhY2sgKSBjaGFydHNDYWxsYmFjaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGluaXQgOiBpbml0LFxuICByZW5kZXIgOiByZW5kZXIsXG4gIGNhY2hlVGlsZSA6IGNhY2hlVGlsZSxcbiAgcmVuZGVyQ2FjaGVkVGlsZXNPbk1hcCA6IHJlbmRlckNhY2hlZFRpbGVzT25NYXAsXG4gIGNsZWFyQ2FjaGUgOiBjbGVhckNhY2hlXG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIFZQRCA6IHtcbiAgICAgIGxhYmVsIDogXCJNZWFuIFZhcG9yIFByZXNzdXJlIERlZmljaXRcIixcbiAgICAgIHVuaXRzIDogXCJrUEFcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJ0aGUgZGlmZmVyZW5jZSAoZGVmaWNpdCkgYmV0d2VlbiB0aGUgYW1vdW50IG9mIG1vaXN0dXJlIGluIHRoZSBhaXIgYW5kIGhvdyBtdWNoIFwiICtcbiAgICAgIFx0XHRcIm1vaXN0dXJlIHRoZSBhaXIgY2FuIGhvbGQgd2hlbiBpdCBpcyBzYXR1cmF0ZWRcIlxuICB9LFxuICBmVlBEIDoge1xuICAgICAgbGFiZWwgOiBcIlZhcG9yIFByZXNzdXJlIERlZmljaXQgTW9kaWZpZXJcIixcbiAgICAgIHVuaXRzIDogXCJ1bml0bGVzc1wiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIkEgZW52aXJvbm1lbnRhbCBmYWN0b3IgZ3Jvd3RoIG1vZGlmaWVyXCJcbiAgfSxcbiAgZlQgOiB7XG4gICAgICBsYWJlbCA6IFwiVGVtcGVyYXR1cmUgTW9kaWZpZXJcIixcbiAgICAgIHVuaXRzIDogXCJ1bml0bGVzc1wiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIkEgZW52aXJvbm1lbnRhbCBmYWN0b3IgZ3Jvd3RoIG1vZGlmaWVyXCJcbiAgfSxcbiAgZkZyb3N0IDoge1xuICAgICAgbGFiZWwgOiBcIkZyb3N0IE1vZGlmaWVyXCIsXG4gICAgICB1bml0cyA6IFwidW5pdGxlc3NcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJOdW1iZXIgb2YgZnJvc3QgZGF5cyBncm93dGggbW9kaWZpZXJcIlxuICB9LFxuICBQQVIgOiB7XG4gICAgICBsYWJlbCA6IFwiTW9udGhseSBQaG90b3N5bnRoZXRpY2FsbHkgQWN0aXZlIFJhZGlhdGlvblwiLFxuICAgICAgdW5pdHMgOiBcIm1vbHMgLyBtXjIgbW9udGhcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJEZXNpZ25hdGVzIHRoZSBzcGVjdHJhbCByYW5nZSAod2F2ZSBiYW5kKSBvZiBzb2xhciByYWRpYXRpb24gZnJvbSA0MDAgdG8gNzAwIG5hbm9tZXRlcnMgXCIgK1xuICAgICAgXHRcdFwidGhhdCBwaG90b3N5bnRoZXRpYyBvcmdhbmlzbXMgYXJlIGFibGUgdG8gdXNlIGluIHRoZSBwcm9jZXNzIG9mIHBob3Rvc3ludGhlc2lzXCJcbiAgfSxcbiAgeFBQIDoge1xuICAgICAgbGFiZWwgOiBcIk1heGltdW0gUG90ZW50aWFsIFByaW1hcnkgUHJvZHVjdGlvblwiLFxuICAgICAgdW5pdHMgOiBcIk1ldHJpYyBUb25zIERyeSBNYXR0ZXIvaGFcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJcIlxuICB9LFxuICBJbnRjcHRuIDoge1xuICAgICAgbGFiZWwgOiBcIkNhbm9weSBSYWluZmFsbCBJbnRlcmNlcHRpb25cIixcbiAgICAgIHVuaXRzIDogXCJcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJQcmVjaXBpdGF0aW9uIHRoYXQgZG9lcyBub3QgcmVhY2ggdGhlIHNvaWwsIGJ1dCBpcyBpbnN0ZWFkIGludGVyY2VwdGVkIGJ5IHRoZSBsZWF2ZXMgYW5kIGJyYW5jaGVzIG9mIHBsYW50cyBhbmQgdGhlIGZvcmVzdCBmbG9vci5cIlxuICB9LFxuICBBU1cgOiB7XG4gICAgICBsYWJlbCA6IFwiQXZhaWxhYmxlIFNvaWwgV2F0ZXJcIixcbiAgICAgIHVuaXRzIDogXCJtbVwiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIlwiXG4gIH0sXG4gIEN1bUlycmlnIDoge1xuICAgICAgbGFiZWwgOiBcIkN1bXVsYXRpdmUgUmVxdWlyZWQgSXJyaWdhdGlvblwiLFxuICAgICAgdW5pdHMgOiBcIm1tL21vblwiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIlwiXG4gIH0sXG4gIElycmlnIDoge1xuICAgICAgbGFiZWwgOiBcIlJlcXVpcmVkIElycmlnYXRpb25cIixcbiAgICAgIHVuaXRzIDogXCJtbS9tb25cIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJcIlxuICB9LFxuICBTdGFuZEFnZSA6IHtcbiAgICAgIGxhYmVsIDogXCJTdGFuZCBBZ2VcIixcbiAgICAgIHVuaXRzIDogXCJcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJcIlxuICB9LFxuICBMQUkgOiB7XG4gICAgICBsYWJlbCA6IFwiTGVhZiBBcmVhIEluZGV4XCIsXG4gICAgICB1bml0cyA6IFwibTIgLyBtMlwiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIlRoZSBvbmUtc2lkZWQgZ3JlZW4gbGVhZiBhcmVhIHBlciB1bml0IGdyb3VuZCBzdXJmYWNlIGFyZWFcIlxuICB9LFxuICBDYW5Db25kIDoge1xuICAgICAgbGFiZWwgOiBcIkNhbm9weSBDb25kdWN0YW5jZVwiLFxuICAgICAgdW5pdHMgOiBcImdjLG0vc1wiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIlwiXG4gIH0sXG4gIFRyYW5zcCA6IHtcbiAgICAgIGxhYmVsIDogXCJDYW5vcHkgTW9udGhseSBUcmFuc3BpcmF0aW9uXCIsXG4gICAgICB1bml0cyA6IFwibW0vbW9uXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiV2F0ZXIgbW92ZW1lbnQgdGhyb3VnaCBhIHBsYW50IGFuZCBpdHMgZXZhcG9yYXRpb24gZnJvbSBhZXJpYWwgcGFydHNcIlxuICB9LFxuICBmU1cgOiB7XG4gICAgICBsYWJlbCA6IFwiU29pbCBXYXRlciBNb2RpZmllclwiLFxuICAgICAgdW5pdHMgOiBcInVuaXRsZXNzXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiQSBlbnZpcm9ubWVudGFsIGZhY3RvciBncm93dGggbW9kaWZpZXJcIlxuICB9LFxuICBmQWdlIDoge1xuICAgICAgbGFiZWwgOiBcIlN0YW5kIGFnZVwiLFxuICAgICAgdW5pdHMgOiBcInVuaXRsZXNzXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiQSBlbnZpcm9ubWVudGFsIGZhY3RvciBncm93dGggbW9kaWZpZXJcIlxuICB9LFxuICBQaHlzTW9kIDoge1xuICAgICAgbGFiZWwgOiBcIlwiLFxuICAgICAgdW5pdHMgOiBcInVuaXRsZXNzXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiUGh5c2lvbG9naWNhbCBNb2RpZmllciB0byBDYW5vcHkgQ29uZHVjdGFuY2VcIlxuICB9LFxuICBwUiA6IHtcbiAgICAgIGxhYmVsIDogXCJcIixcbiAgICAgIHVuaXRzIDogXCJcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJBbG9uZyB3aXRoIGEgUGh5c2lvbG9naWFsIHBhcmFtZXRlciwgc3BlY2lmaWVzIHRoZSBhbW91bnQgb2YgbmV3IGdyb3d0aCBhbGxvY2F0ZWQgdG8gdGhlIHJvb3Qgc3lzdGVtLCBhbmQgdGhlIHR1cm5vdmVyIHJhdGUuXCJcbiAgfSxcbiAgcFMgOiB7XG4gICAgICBsYWJlbCA6IFwiXCIsXG4gICAgICB1bml0cyA6IFwiXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiRGVmaW5lcyB0aGUgZm9saWFnZSB0byBzdGVtIChXRi9XUykgZnJhY3Rpb24gaW4gYWxsb2NhdGluZyBhYm92ZWdyb3VuZCBiaW9tYXNzIG9mIHRoZSB0cmVlXCJcbiAgfSxcbiAgbGl0dGVyZmFsbCA6IHtcbiAgICAgIGxhYmVsIDogXCJcIixcbiAgICAgIHVuaXRzIDogXCJcIixcbiAgICAgIGRlc2NyaXRpb24gOiBcIlwiLFxuICAgICAgYWx0Rm5OYW1lIDogXCJ0ZHBcIlxuICB9LFxuICBOUFAgOiB7XG4gICAgICBsYWJlbCA6IFwiTmV0IENhbm9weSBQcm9kdWN0aW9uXCIsXG4gICAgICB1bml0cyA6IFwiTWcvaGFcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJcIlxuICB9LFxuICBXRiA6IHtcbiAgICAgIGxhYmVsIDogXCJMZWFmIEJpb21hc3NcIixcbiAgICAgIHVuaXRzIDogXCJNZy9oYVwiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIlwiLFxuICAgICAgZm4gOiBmdW5jdGlvbihwcmVfV0YsIGN1cl9kVywgY3VyX3BGLCBjdXJfbGl0dGVyZmFsbCwgcHJldl9XRikge1xuICAgICAgICAgIHJldHVybiBwcmV2X1dGICsgY3VyX2RXICogY3VyX3BGIC0gY3VyX2xpdHRlcmZhbGwgKiBwcmV2X1dGXG4gICAgICB9XG4gIH0sXG4gIFdSIDoge1xuICAgICAgbGFiZWwgOiBcIlJvb3QgQmlvbWFzc1wiLFxuICAgICAgdW5pdHMgOiBcIk1nL2hhXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiXCIsXG4gICAgICBmbiA6IGZ1bmN0aW9uKHByZXZfV1IsIGN1cl9kVywgY3VyX3BSLCB0dXJub3ZlciwgcHJldl9XUiwgY3VyX1Jvb3RQKSB7XG4gICAgICAgICAgcmV0dXJuIHByZXZfV1IgKyBjdXJfZFcgKiBjdXJfcFIgLSB0cmVlLnBSLnR1cm5vdmVyICogcHJldl9XUiAtIGN1cl9Sb290UDtcbiAgICAgIH1cbiAgfSxcbiAgV1MgOiB7XG4gICAgICBsYWJlbCA6IFwiU3RlbSBCaW9tYXNzXCIsXG4gICAgICB1bml0cyA6IFwiTWcvaGFcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJcIixcbiAgICAgIGZuIDogZnVuY3Rpb24ocHJldl9XUywgY3VyX2RXLCBjdXJfcFMpIHsgcmV0dXJuIHByZXZfV1MgKyBjdXJfZFcgKiBjdXJfcFMgfVxuICB9LFxuICBXIDoge1xuICAgICAgbGFiZWwgOiBcIlRvdGFsIEJpb21hc3NcIixcbiAgICAgIHVuaXRzIDogXCJNZy9oYVwiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIlwiLFxuICAgICAgZm4gOiBmdW5jdGlvbihjdXJfV0YsIGN1cl9XUiwgY3VyX1dTKSB7IHJldHVybiBjdXJfV0YrY3VyX1dSK2N1cl9XUyB9XG4gIH1cbn1cbiIsInZhciBhcHAgPSByZXF1aXJlKCcuL2FwcCcpO1xuXG4vLyBhZGQgc3ByZWFkc2hlZXQgdml6IHNvdXJjZVxuLy8gaHR0cHM6Ly9zcHJlYWRzaGVldHMuZ29vZ2xlLmNvbS90cT90cT1zZWxlY3QlMjAqJmtleT0wQXY3Y1VWLW8yUVFZZEhaRllXSk5OV3BSUzFoSVZXaEdRVGhsTFdad1pXYyZ1c3A9ZHJpdmVfd2ViI2dpZD0wXG5cbmZ1bmN0aW9uIGluaXQoKSB7XG52YXIgZHJvcFpvbmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZHJvcF96b25lJyk7XG5kcm9wWm9uZS5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIF9oYW5kbGVEcmFnT3ZlciwgZmFsc2UpO1xuZHJvcFpvbmUuYWRkRXZlbnRMaXN0ZW5lcignZHJvcCcsIF9oYW5kbGVGaWxlU2VsZWN0LCBmYWxzZSk7XG5cbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaWxlcycpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIF9oYW5kbGVGaWxlU2VsZWN0LCBmYWxzZSk7XG5cbiAgICAkKCcjc3ByZWFkc2hlZXQtd2VhdGhlci1pbnB1dC1idG4nKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICBfaGFuZGxlR29vZ2xlU3ByZWFkc2hlZXQoKTtcbiAgICB9KTtcbiAgICAkKCcjc3ByZWFkc2hlZXQtd2VhdGhlci1pbnB1dCcpLm9uKCdrZXl1cCcsIGZ1bmN0aW9uKGUpe1xuICAgICAgICBpZiggZS53aGljaCA9PSAxMyApIF9oYW5kbGVHb29nbGVTcHJlYWRzaGVldCgpO1xuICAgIH0pO1xuXG4gICAgJCgnI3dlYXRoZXJSZWFkZXItbG9jYWxmaWxlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgJCgnI3dlYXRoZXJSZWFkZXItbG9jYWxmaWxlLXBhbmVsJykudG9nZ2xlKCdzbG93Jyk7XG4gICAgfSk7XG4gICAgJCgnI3dlYXRoZXJSZWFkZXItc3ByZWFkc2hlZXQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICAkKCcjd2VhdGhlclJlYWRlci1zcHJlYWRzaGVldC1wYW5lbCcpLnRvZ2dsZSgnc2xvdycpO1xuICAgIH0pO1xuXG59XG5cbmZ1bmN0aW9uIF9oYW5kbGVHb29nbGVTcHJlYWRzaGVldCgpIHtcbiAgICBnYSgnc2VuZCcsICdldmVudCcsICd1aScsICdpbnRlcmFjdGlvbicsICdsb2FkLXdlYXRoZXItZHJpdmUtZmlsZScsIDEpO1xuXG4gICAgdmFyIHZhbCA9ICQoJyNzcHJlYWRzaGVldC13ZWF0aGVyLWlucHV0JykudmFsKCk7XG4gICAgaWYoIHZhbC5sZW5ndGggPT0gMCApIHJldHVybjtcblxuICAgIGlmKCAhdmFsLm1hdGNoKC9eaHR0cC4qLyApICkgdmFsID0gJ2h0dHBzOi8vJyt2YWw7XG5cbiAgICB2YXIgZmlsZVBhbmVsID0gbmV3IFdlYXRoZXJGaWxlKCk7XG4gICAgdmFyIHJvb3QgPSAkKFwiI2ZpbGVfbGlzdFwiKTtcbiAgICBmaWxlUGFuZWwuaW5pdEZyb21VcmwodmFsLCByb290KTtcbiAgICAkKCcjc3ByZWFkc2hlZXQtd2VhdGhlci1pbnB1dCcpLnZhbCgnJyk7XG59XG5cbmZ1bmN0aW9uIF9oYW5kbGVGaWxlU2VsZWN0KGV2dCkge1xuICAgIGdhKCdzZW5kJywgJ2V2ZW50JywgJ3VpJywgJ2ludGVyYWN0aW9uJywgJ2xvYWQtd2VhdGhlci1sb2NhbC1maWxlJywgMSk7XG5cbiAgZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xuICBldnQucHJldmVudERlZmF1bHQoKTtcblxuICB2YXIgZmlsZXMgPSBldnQuZGF0YVRyYW5zZmVyID8gZXZ0LmRhdGFUcmFuc2Zlci5maWxlcyA6IGV2dC50YXJnZXQuZmlsZXM7IC8vIEZpbGVMaXN0IG9iamVjdC5cblxuICAvLyBmaWxlcyBpcyBhIEZpbGVMaXN0IG9mIEZpbGUgb2JqZWN0cy4gTGlzdCBzb21lIHByb3BlcnRpZXMuXG4gIHZhciByb290ID0gJChcIiNmaWxlX2xpc3RcIik7XG4gIGZvciAodmFyIGkgPSAwLCBmOyBmID0gZmlsZXNbaV07IGkrKykge1xuICAgIHZhciBmaWxlUGFuZWwgPSBuZXcgV2VhdGhlckZpbGUoKTtcbiAgICBmaWxlUGFuZWwuaW5pdChmLCByb290KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfaGFuZGxlRHJhZ092ZXIoZXZ0KSB7XG5ldnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5ldnQucHJldmVudERlZmF1bHQoKTtcbmV2dC5kYXRhVHJhbnNmZXIuZHJvcEVmZmVjdCA9ICdjb3B5JzsgLy8gRXhwbGljaXRseSBzaG93IHRoaXMgaXMgYSBjb3B5LlxufVxuXG4vLyBvbiBhZGQsIGlmIHRoZSBsaXN0IGlzIGVtcHR5LCBsZXQncyBjbG9zZSB0aGUgcG9wdXBcbmZ1bmN0aW9uIF9vbkNvbXBsZXRlKCkge1xuICAgIGlmKCAkKFwiI2ZpbGVfbGlzdFwiKS5jaGlsZHJlbigpLmxlbmd0aCA9PSAwICkge1xuICAgICAgICAkKCcjd2VhdGhlclJlYWRlci1tb2RhbCcpLm1vZGFsKCdoaWRlJyk7XG4gICAgfVxufVxuXG52YXIgV2VhdGhlckZpbGUgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGhlYWRlcnMgPSB7XG4gICAgICAgIGRhdGUgICAgIDoge1xuICAgICAgICAgICAgbGFiZWwgOiAnRGF0ZScsXG4gICAgICAgICAgICB1bml0cyA6ICdEYXRlJyxcbiAgICAgICAgICAgIGNvbCAgIDogLTFcbiAgICAgICAgfSxcbiAgICAgICAgdG1pbiAgICAgOiB7XG4gICAgICAgICAgICBsYWJlbCA6ICdNaW4gVGVtcGVyYXR1cmUnLFxuICAgICAgICAgICAgdW5pdHMgOiAnQycsXG4gICAgICAgICAgICBjb2wgICA6IC0xXG4gICAgICAgIH0sXG4gICAgICAgIHRtYXggICAgIDoge1xuICAgICAgICAgICAgbGFiZWwgOiAnTWF4IFRlbXBlcmF0dXJlJyxcbiAgICAgICAgICAgIHVuaXRzIDogJ0MnLFxuICAgICAgICAgICAgY29sICAgOiAtMVxuICAgICAgICB9LFxuICAgICAgICB0ZG1lYW4gICA6IHtcbiAgICAgICAgICAgIGxhYmVsIDogJ01lYW4gVGVtcGVyYXR1cmUnLFxuICAgICAgICAgICAgdW5pdHMgOiAnQycsXG4gICAgICAgICAgICBjb2wgICA6IC0xXG4gICAgICAgIH0sXG4gICAgICAgIHBwdCAgICAgIDoge1xuICAgICAgICAgICAgbGFiZWwgOiAnUHJlY2lwaXRpb24nLFxuICAgICAgICAgICAgdW5pdHMgOiAnbW0nLFxuICAgICAgICAgICAgY29sICAgOiAtMVxuICAgICAgICB9LFxuICAgICAgICByYWQgICAgICA6IHtcbiAgICAgICAgICAgIGxhYmVsIDogJ1JhZGlhdGlvbicsXG4gICAgICAgICAgICB1bml0cyA6ICdNSiBtLTIgZGF5LTEnLFxuICAgICAgICAgICAgY29sICAgOiAtMVxuICAgICAgICB9LFxuICAgICAgICBkYXlsaWdodCA6IHtcbiAgICAgICAgICAgIGxhbmVsIDogJ0RheWxpZ2h0IEhvdXJzJyxcbiAgICAgICAgICAgIHVuaXRzIDogJ2hvdXJzJyxcbiAgICAgICAgICAgIGNvbCAgIDogLTFcbiAgICAgICAgfVxuICAgIH07XG5cblxuICB2YXIgZWxlID0gJCgnPGRpdiBzdHlsZT1cInRleHQtYWxpZ246IGxlZnRcIj4nK1xuICAgICAgICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiY2xvc2VcIiBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9idXR0b24+JytcbiAgICAgICc8ZGl2IGNsYXNzPVwiZmlsZW5hbWVcIj48L2Rpdj4nK1xuICAgICAgJzxkaXYgY2xhc3M9XCJwcm9ncmVzc1wiPicrXG4gICAgICAnPGRpdiBjbGFzcz1cInByb2dyZXNzLWJhclwiIHJvbGU9XCJwcm9ncmVzc2JhclwiIGFyaWEtdmFsdWVub3c9XCIwXCIgYXJpYS12YWx1ZW1pbj1cIjBcIiBhcmlhLXZhbHVlbWF4PVwiMTAwXCIgc3R5bGU9XCJ3aWR0aDogMCU7XCI+JytcbiAgICAgICAgJzxzcGFuIGNsYXNzPVwic3Itb25seVwiPjAlIENvbXBsZXRlPC9zcGFuPicrXG4gICAgICAnPC9kaXY+JytcbiAgICAnPC9kaXY+JytcbiAgICAgICc8ZGl2IGNsYXNzPVwic3RhdHVzXCI+JytcbiAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImRhdGUtcmFuZ2VcIj48L2Rpdj4nK1xuICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwicHJldmlldy1kYXRhXCIgc3R5bGU9XCJkaXNwbGF5Om5vbmVcIj4nK1xuICAgICAgICAgICAgICAgICAgICAnPGRpdj48YSBjbGFzcz1cImJ0biBidG4tbGluayBwcmV2aWV3LWRhdGEtYnRuXCI+UHJldmlldyBEYXRhPC9hPjwvZGl2PicrXG4gICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwicHJldmlldy1kYXRhLXRhYmxlXCIgc3R5bGU9XCJkaXNwbGF5Om5vbmVcIj48L2Rpdj4nK1xuICAgICAgICAgICAgICAgICc8L2Rpdj4nK1xuICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiY29sLXN0YXR1c1wiIHN0eWxlPVwiZGlzcGxheTpub25lXCI+PC9kaXY+JytcbiAgICAgICAgICAgICAgICAnPGRpdiBzdHlsZT1cImhlaWdodDo1MHB4XCI+JytcbiAgICAgICAgICAgICAgICAgICAgJzxhIGNsYXNzPVwiYnRuIGJ0bi1saW5rIG1hcC1kYXRhLWJ0blwiPk1hcCBDU1YgQ29sdW1uczwvYT4nK1xuICAgICAgICAgICAgICAgICAgICAnPGEgY2xhc3M9XCJidG4gYnRuLXN1Y2Nlc3MgZGlzYWJsZWQgcHVsbC1yaWdodFwiPkFkZCBEYXRhPC9hPicrXG4gICAgICAgICAgICAgICAgJzwvZGl2PicrXG4gICAgICAgICAgICAnPC9kaXY+JytcbiAgICAnPC9kaXY+Jyk7XG5cbiAgdmFyIGRhdGEgPSB7fTtcbiAgICB2YXIgY3N2VGFibGUgPSBbXTtcblxuICAgIC8vIG9ubHkgYXV0byBoaWRlIHRoZSBmaXJzdCB0aW1lXG4gICAgdmFyIGF1dG9IaWRlID0gdHJ1ZTtcblxuICAvLyB0aGUgZmlsZSByZWFkZXIgb2JqZWN0IGFuZCB0aGUgZWxlbWVudFxuICBmdW5jdGlvbiBpbml0KGZpbGUsIHJvb3RFbGUpIHtcbiAgICB2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICByZWFkZXIub25lcnJvciA9IGVycm9ySGFuZGxlcjtcbiAgICByZWFkZXIub25wcm9ncmVzcyA9IHVwZGF0ZVByb2dyZXNzO1xuICAgIHJlYWRlci5vbmxvYWRzdGFydCA9IGZ1bmN0aW9uKGUpIHt9O1xuICAgIHJlYWRlci5vbmxvYWQgPSBmdW5jdGlvbihlKSB7XG4gICAgICBlbGUuZmluZCgnLnByb2dyZXNzJykucmVtb3ZlKCk7XG4gICAgICBwYXJzZShlLnRhcmdldC5yZXN1bHQpO1xuICAgIH1cbiAgICByZWFkZXIucmVhZEFzVGV4dChmaWxlKVxuXG4gICAgZWxlLmZpbmQoJy5maWxlbmFtZScpLmh0bWwoZ2V0TmFtZShmaWxlKSk7XG4gICAgcm9vdEVsZS5hcHBlbmQoZWxlKTtcblxuICAgICAgICBfc2V0SGFuZGxlcnMoKTtcbiAgfVxuXG4gICAgZnVuY3Rpb24gaW5pdEZyb21VcmwodXJsLCByb290RWxlKSB7XG4gICAgICAgIHZhciBxID0gbmV3IGdvb2dsZS52aXN1YWxpemF0aW9uLlF1ZXJ5KHVybCk7XG4gICAgICAgIGVsZS5maW5kKCcucHJvZ3Jlc3MnKS5odG1sKCdRdWVyeWluZyBzcHJlYWRzaGVldC4uLicpO1xuXG4gICAgICAgIHZhciBrZXkgPSBnZXRLZXkodXJsKTtcbiAgICAgICAgZWxlLmZpbmQoJy5maWxlbmFtZScpLmh0bWwoJzxoMyBzdHlsZT1cImJvcmRlci1ib3R0b206MXB4IHNvbGlkICNlZWU7cGFkZGluZzoxNXB4IDAgNHB4IDBcIj48aSBjbGFzcz1cImljb24tdGludFwiPjwvaT4gJytcbiAgICAgICAgICAgICdHb29nbGUgU3ByZWFkc2hlZXQnKyhrZXkubGVuZ3RoID4gMCA/ICc8YnIgLz48c3BhbiBzdHlsZT1cImNvbG9yOiM4ODg7Zm9udC1zaXplOjE0cHhcIj4nK2tleSsnPC9zcGFuPicgOiAnJykrJzwvaDM+Jyk7XG5cbiAgICAgICAgcm9vdEVsZS5hcHBlbmQoZWxlKTtcblxuICAgICAgICBxLnNldFF1ZXJ5KCdTRUxFQ1QgKicpO1xuICAgICAgICBxLnNlbmQoZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgICAgICAgICAgZWxlLmZpbmQoJy5wcm9ncmVzcycpLnJlbW92ZSgpO1xuXG4gICAgICAgICAgICBpZiAocmVzcG9uc2UuaXNFcnJvcigpKSB7XG4gICAgICAgICAgICAgICAgc2V0RXJyb3IoJ0Vycm9yIGluIHF1ZXJ5OiAnICsgcmVzcG9uc2UuZ2V0TWVzc2FnZSgpICsgJyAnICsgcmVzcG9uc2UuZ2V0RGV0YWlsZWRNZXNzYWdlKCkpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcGFyc2UoZHRUb0NzdihyZXNwb25zZS5nZXREYXRhVGFibGUoKSkpO1xuICAgICAgICB9KTtcblxuICAgICAgICBfc2V0SGFuZGxlcnMoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBfc2V0SGFuZGxlcnMoKSB7XG4gICAgICAgIGVsZS5maW5kKCcubWFwLWRhdGEtYnRuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGVsZS5maW5kKCcuY29sLXN0YXR1cycpLnRvZ2dsZSgnc2xvdycpO1xuICAgICAgICB9KTtcblxuICAgICAgICBlbGUuZmluZCgnLnByZXZpZXctZGF0YS1idG4nKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgZWxlLmZpbmQoJy5wcmV2aWV3LWRhdGEtdGFibGUnKS50b2dnbGUoJ3Nsb3cnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZWxlLmZpbmQoJy5jbG9zZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBlbGUucmVtb3ZlKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGVsZS5maW5kKCcuYnRuLXN1Y2Nlc3MnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgYXBwLnNldFdlYXRoZXIoZGF0YSk7XG4gICAgICAgICAgICBlbGUucmVtb3ZlKCk7XG4gICAgICAgICAgICBfb25Db21wbGV0ZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkdFRvQ3N2KGR0KSB7XG4gICAgICAgIHZhciBhcnIgPSBbW11dO1xuXG4gICAgICAgIGR0ID0gSlNPTi5wYXJzZShkdC50b0pTT04oKSk7XG4gICAgICAgIGZvciggdmFyIGkgPSAwOyBpIDwgZHQuY29scy5sZW5ndGg7IGkrKyApIHtcbiAgICAgICAgICAgIGFyclswXS5wdXNoKGR0LmNvbHNbaV0ubGFiZWwpO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yKCB2YXIgaSA9IDA7IGkgPCBkdC5yb3dzLmxlbmd0aDsgaSsrICkge1xuICAgICAgICAgICAgYXJyLnB1c2goW10pO1xuICAgICAgICAgICAgZm9yKCB2YXIgaiA9IDA7IGogPCBkdC5yb3dzW2ldLmMubGVuZ3RoOyBqKysgKSB7XG4gICAgICAgICAgICAgICAgaWYoICFkdC5yb3dzW2ldLmNbal0gKSBhcnJbaSsxXS5wdXNoKCcnKTtcbiAgICAgICAgICAgICAgICBlbHNlIGFycltpKzFdLnB1c2goZHQucm93c1tpXS5jW2pdLnYpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGNzdiA9ICcnO1xuICAgICAgICBmb3IoIHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKyApIHtcbiAgICAgICAgICAgIGNzdiArPSBhcnJbaV0uam9pbignLCcpKydcXG4nO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNzdjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRLZXkodXJsKSB7XG4gICAgICAgIHZhciBwYXJ0cyA9IHVybC5zcGxpdCgnPycpO1xuICAgICAgICBpZiggcGFydHMubGVuZ3RoID09IDEgKSByZXR1cm4gJyc7XG5cbiAgICAgICAgcGFydHMgPSBwYXJ0c1sxXS5zcGxpdCgnJicpO1xuICAgICAgICBmb3IoIHZhciBpID0gMDsgaSA8IHBhcnRzLmxlbmd0aDsgaSsrICkge1xuICAgICAgICAgICAgaWYoIHBhcnRzW2ldLnNwbGl0KCc9JylbMF0gPT0gJ2tleScgKSByZXR1cm4gcGFydHNbaV0uc3BsaXQoJz0nKVsxXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gIGZ1bmN0aW9uIGdldE5hbWUoZikge1xuICAgIHJldHVybiBbJzxoMyBzdHlsZT1cImJvcmRlci1ib3R0b206MXB4IHNvbGlkICNlZWU7cGFkZGluZzoxNXB4IDAgNHB4IDBcIj48aSBjbGFzcz1cImljb24tdGludFwiPjwvaT4gJywgZi5uYW1lLFxuICAgICAgICAgICAgICAgICcgPHNwYW4gc3R5bGU9XCJjb2xvcjojODg4O2ZvbnQtc2l6ZToxNnB4XCI+KCcsIGYudHlwZSB8fCAnbi9hJyxcbiAgICAgICAgICAgICAgICAnKTwvc3Bhbj4gLSA8c3BhbiBzdHlsZT1cImZvbnQtc2l6ZToxNnB4XCI+JywgZi5zaXplLCAnIGJ5dGVzPC9zcGFuPicsICc8L2gzPiddLmpvaW4oJycpO1xuICB9XG5cbiAgZnVuY3Rpb24gcGFyc2UoZGF0YSkge1xuICAgIGRhdGEgPSBkYXRhLnJlcGxhY2UoL15cXHMqXFxuL2csJycpLnNwbGl0KCdcXG4nKTtcblxuICAgIHZhciB0YWJsZSA9IFtdO1xuICAgIGZvciggdmFyIGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKyApIHtcbiAgICAgIHRhYmxlLnB1c2goZGF0YVtpXS5zcGxpdCgnLCcpKTtcbiAgICB9XG5cbiAgICAgICAgaWYoIHRhYmxlLmxlbmd0aCA9PSAwICkgcmV0dXJuIHNldEVycm9yKCdGaWxlIGRpZCBub3QgY29udGFpbiBhbnkgaW5mb3JtYXRpb24uJyk7XG4gICAgICAgIGNzdlRhYmxlID0gdGFibGU7XG5cbiAgICAgICAgcGFyc2VIZWFkZXIodGFibGVbMF0pO1xuICAgICAgICBnZXREYXRlUmFuZ2UoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXREYXRlUmFuZ2UoKSB7XG4gICAgICAgIGVsZS5maW5kKCcuZGF0ZS1yYW5nZScpLmh0bWwoJycpO1xuICAgICAgICBpZiggaGVhZGVycy5kYXRlLmNvbCA9PSAtMSApIHJldHVybiBlbGUuZmluZCgnLmRhdGUtcmFuZ2UnKS5odG1sKCdEYXRlIGNvbHVtbiBuZWVkcyB0byBiZSBtYXRjaGVkLicpO1xuICAgICAgICBpZiggdHlwZW9mIGhlYWRlcnMuZGF0ZS5jb2wgPT0gJ3N0cmluZycgKSBoZWFkZXJzLmRhdGUuY29sID0gcGFyc2VJbnQoaGVhZGVycy5kYXRlLmNvbCk7XG5cbiAgICAgICAgdmFyIGRhdGVzID0ge307XG4gICAgICAgIHZhciBkaXNwbGF5RGF0ZXMgPSBbXTtcbiAgICAgICAgZm9yKCB2YXIgaSA9IDE7IGkgPCBjc3ZUYWJsZS5sZW5ndGg7IGkrKyApIHtcbiAgICAgICAgICAgIGlmKCBoZWFkZXJzLmRhdGUuY29sIDwgY3N2VGFibGVbaV0ubGVuZ3RoICYmIGNzdlRhYmxlW2ldLmxlbmd0aCA+PSA3ICnCoHtcbiAgICAgICAgICAgICAgICB2YXIgcCA9IGNzdlRhYmxlW2ldW2hlYWRlcnMuZGF0ZS5jb2xdLnNwbGl0KFwiLVwiKTtcbiAgICAgICAgICAgICAgICBpZiggcC5sZW5ndGggIT0gMyAmJiBwLmxlbmd0aCAhPSAyICkgcmV0dXJuIHNldEVycm9yKFwiRGF0ZTogXCIrY3N2VGFibGVbaV1baGVhZGVycy5kYXRlLmNvbF0rXCIgaXMgbm90IGEgdmFsaWQgZm9ybWF0ICh5eXl5LW1tLWRkIG9yIHl5eXktbW0pXCIpO1xuXG4gICAgICAgICAgICAgICAgaWYoICFkYXRlc1twWzBdXSApIGRhdGVzW3BbMF1dID0gW107XG4gICAgICAgICAgICAgICAgdmFyIG1tZGQgPSBwWzFdO1xuXG4gICAgICAgICAgICAgICAgaWYoIGRhdGVzW3BbMF1dLmluZGV4T2YobW1kZCkgIT0gLTEgKSByZXR1cm4gc2V0RXJyb3IoXCJEYXRlOiBcIitjc3ZUYWJsZVtpXVtoZWFkZXJzLmRhdGUuY29sXStcIiBpcyBpbiBkYXRhc2V0IHR3aWNlXCIpO1xuICAgICAgICAgICAgICAgIGRhdGVzW3BbMF1dLnB1c2gobW1kZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmb3IoIHZhciB5ZWFyIGluIGRhdGVzICkge1xuICAgICAgICAgICAgaWYoIGRhdGVzW3llYXJdLmxlbmd0aCA9PSAxMikge1xuICAgICAgICAgICAgICAgIGRpc3BsYXlEYXRlcy5wdXNoKHllYXIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5RGF0ZXMucHVzaCh5ZWFyKycgWycrZGF0ZXNbeWVhcl0uam9pbignLCAnKSsnXScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZWxlLmZpbmQoJy5kYXRlLXJhbmdlJykuaHRtbCgnPGI+RGF0ZSBSYW5nZTo8L2I+ICcrZGlzcGxheURhdGVzLmpvaW4oJywgJykpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhcnNlSGVhZGVyKGhlYWRlclJvdykge1xuICAgICAgICB2YXIgbWF0Y2hlZCA9IFtdO1xuXG4gICAgICAgIHZhciBodG1sID0gJzx0YWJsZSBjbGFzcz1cInRhYmxlIHRhYmxlLXN0cmlwZWRcIj4nO1xuICAgICAgICBodG1sICs9ICc8dHI+PHRoPktleTwvdGg+PHRoPkNvbHVtbiAjPC90aD48L3RyPic7XG5cbiAgICAgICAgZm9yKCB2YXIga2V5IGluIGhlYWRlcnMgKSB7XG4gICAgICAgICAgICBpZiggaGVhZGVyUm93LmluZGV4T2Yoa2V5KSAhPSAtMSApIHtcbiAgICAgICAgICAgICAgICBoZWFkZXJzW2tleV0uY29sID0gaGVhZGVyUm93LmluZGV4T2Yoa2V5KTtcbiAgICAgICAgICAgICAgICBtYXRjaGVkLnB1c2goa2V5KTtcbiAgICAgICAgICAgICAgICBodG1sICs9ICc8dHI+PHRkPicra2V5Kyc8L3RkPjx0ZD48c3BhbiBjbGFzcz1cImxhYmVsIGxhYmVsLXN1Y2Nlc3NcIj4nK2hlYWRlcnNba2V5XS5jb2wrJyA8aSBjbGFzcz1cImljb24tb2tcIj48L2k+PC9zcGFuPjwvdGQ+PC90cj4nO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBodG1sICs9ICc8dHI+PHRkPicra2V5Kyc8L3RkPjx0ZD48c2VsZWN0IGNsYXNzPVwic2VsZWN0LScra2V5KydcIlwiPjwvc2VsZWN0PjwvdGQ+PC90cj4nO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsZS5maW5kKCcuY29sLXN0YXR1cycpLmh0bWwoaHRtbCsnPC90YWJsZT4nKTtcblxuXG4gICAgICAgIGlmKCBtYXRjaGVkLmxlbmd0aCAhPSA3ICkge1xuICAgICAgICAgICAgLy8gY3JlYXRlIHNlbGVjdCBlbGVtZW50IGZvciBtaXNzaW5nIGNvbCdzXG4gICAgICAgICAgICBlbGUuZmluZCgnLnN0YXR1cyBzZWxlY3QnKS5hcHBlbmQoJCgnPG9wdGlvbiB2YWx1ZT1cIlwiPltTZWxlY3QgQ29sdW1uXTwvb3B0aW9uPicpKTtcblxuICAgICAgICAgICAgLy8gaWYgaXQncyByYWRpYXRpb24sIGFkZCBvcHRpb24gZm9yIGNhbGN1bGF0aW5nXG4gICAgICAgICAgICAvLyBUT0RPXG5cbiAgICAgICAgICAgIC8vIGFwcGVuZCBtaXNzaW5nIGNvbHNcbiAgICAgICAgICAgIGZvciggdmFyIGkgPSAwOyBpIDwgaGVhZGVyUm93Lmxlbmd0aDsgaSsrICkge1xuICAgICAgICAgICAgICAgIGlmKCBtYXRjaGVkLmluZGV4T2YoaGVhZGVyUm93W2ldKSA9PSAtMSApIHtcbiAgICAgICAgICAgICAgICAgICAgZWxlLmZpbmQoJy5zdGF0dXMgc2VsZWN0JykuYXBwZW5kKCQoJzxvcHRpb24gdmFsdWU9XCInK2krJ1wiPicraSsnIC0gJytoZWFkZXJSb3dbaV0rJzwvb3B0aW9uPicpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHNldCB0aGUgY2hhbmdlIGhhbmRsZXJzIGZvciB0aGUgc2VsZWN0b3JzXG4gICAgICAgICAgICBlbGUuZmluZCgnLnN0YXR1cyBzZWxlY3QnKS5vbignY2hhbmdlJywgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICAgICAgdmFyIHZhbCA9ICQodGhpcykuZmluZCgnb3B0aW9uOnNlbGVjdGVkJykuYXR0cigndmFsdWUnKTtcbiAgICAgICAgICAgICAgICBpZiggdmFsICE9ICcnICkgaGVhZGVyc1t0aGlzLmNsYXNzTmFtZS5yZXBsYWNlKC9zZWxlY3QtLywnJyldLmNvbCA9IHZhbDtcblxuICAgICAgICAgICAgICAgIC8vIGlmIGFsbCBjb2x1bW5zIGFyZSBzZXQsIHJlbW92ZSBkaXNhYmxlZCBmcm9tIGJ0blxuICAgICAgICAgICAgICAgIHZhciByZWFkeSA9IHRydWU7XG4gICAgICAgICAgICAgICAgZm9yKCB2YXIga2V5IGluIGhlYWRlcnMgKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKCBoZWFkZXJzW2tleV0uY29sID09IC0xICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVhZHkgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYoIHJlYWR5ICkge1xuICAgICAgICAgICAgICAgICAgICBpZiggYXV0b0hpZGUgKSBlbGUuZmluZCgnLmNvbC1zdGF0dXMnKS5oaWRlKCdzbG93Jyk7XG4gICAgICAgICAgICAgICAgICAgIG9uUmVhZHkoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBkYXRhID0ge307XG4gICAgICAgICAgICAgICAgICAgIGVsZS5maW5kKCcuYnRuLXN1Y2Nlc3MnKS5hZGRDbGFzcygnZGlzYWJsZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgZWxlLmZpbmQoJy5wcmV2aWV3LWRhdGEnKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIHNob3cgdGhlIHRhYmxlXG4gICAgICAgICAgICBlbGUuZmluZCgnLmNvbC1zdGF0dXMnKS5zaG93KCdzbG93Jyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvblJlYWR5KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvblJlYWR5KCkge1xuICAgICAgICBhdXRvSGlkZSA9IGZhbHNlO1xuICAgICAgICBlbGUuZmluZCgnLmJ0bi1zdWNjZXNzJykucmVtb3ZlQ2xhc3MoJ2Rpc2FibGVkJyk7XG4gICAgICAgIHNldERhdGEoKTtcbiAgICAgICAgc2V0UHJldmlldygpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldFByZXZpZXcoKSB7XG4gICAgICAgIGVsZS5maW5kKCcucHJldmlldy1kYXRhJykuc2hvdygpO1xuXG4gICAgICAgIHZhciBodG1sID0gJzx0YWJsZSBjbGFzcz1cInRhYmxlIHRhYmxlLXN0cmlwZWRcIj48dHI+PHRoPmRhdGU8L3RoPic7XG4gICAgICAgIGZvciggdmFyIGtleSBpbiBoZWFkZXJzICl7XG4gICAgICAgICAgICBpZigga2V5ID09ICdkYXRlJyApIGNvbnRpbnVlO1xuICAgICAgICAgICAgaHRtbCArPSAnPHRoPicra2V5Kyc8L3RoPic7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgYyA9IDA7XG4gICAgICAgIGZvciggdmFyIGRhdGUgaW4gZGF0YSApe1xuICAgICAgICAgICAgaWYoIGMgPT0gMTAgKSB7XG4gICAgICAgICAgICAgICAgaHRtbCArPSAnPHRyPjx0ZCBjb2xzcGFuPVwiN1wiIHN0eWxlPVwidGV4dC1hbGlnbjpjZW50ZXJcIj4uLi48L3RkPjwvdHI+JztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaHRtbCArPSAnPHRyPjx0ZD4nK2RhdGUrJzwvdGQ+JztcbiAgICAgICAgICAgIGZvciggdmFyIGtleSBpbiBoZWFkZXJzICl7XG4gICAgICAgICAgICAgICAgaWYoIGtleSA9PSAnZGF0ZScgKSBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBodG1sICs9ICc8dGQ+JytkYXRhW2RhdGVdW2tleV0rJzwvdGQ+JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGh0bWwgKz0gJzwvdHI+JztcblxuICAgICAgICAgICAgYysrO1xuICAgICAgICB9XG5cbiAgICAgICAgZWxlLmZpbmQoJy5wcmV2aWV3LWRhdGEtdGFibGUnKS5odG1sKGh0bWwpO1xuICAgIH1cblxuICAvLyBzZXQgdGhlIG1hcCBvZiBjc3YgaGVhZGVyc1xuICBmdW5jdGlvbiBzZXREYXRhKCkge1xuICAgICAgICBkYXRhID0ge307XG4gICAgICAgIGZvciggdmFyIGkgPSAxOyBpIDwgY3N2VGFibGUubGVuZ3RoOyBpKysgKSB7XG4gICAgICAgICAgICBpZiggY3N2VGFibGVbaV0ubGVuZ3RoIDwgNyApIGNvbnRpbnVlOyAvLyBiYWQgcm93XG5cbiAgICAgICAgICAgIHZhciBkYXRlID0gY3N2VGFibGVbaV1baGVhZGVycy5kYXRlLmNvbF07XG5cbiAgICAgICAgICAgIGlmKCAhZGF0ZSApIGNvbnRpbnVlOyAvLyBiYWQgcm93XG5cbiAgICAgICAgICAgIGlmKCBkYXRlLnNwbGl0KCctJykubGVuZ3RoID09IDMgKSBkYXRlID0gZGF0ZS5zcGxpdChcIi1cIikuc3BsaWNlKDAsMikuam9pbihcIi1cIik7XG4gICAgICAgICAgICBkYXRhW2RhdGVdID0ge307XG5cbiAgICAgICAgICAgIGZvciggdmFyIGtleSBpbiBoZWFkZXJzICkge1xuICAgICAgICAgICAgICAgIGlmKCBrZXkgPT0gJ2RhdGUnICkgY29udGludWU7XG5cbiAgICAgICAgICAgICAgICBkYXRhW2RhdGVdW2tleV0gPSBwYXJzZUZsb2F0KGNzdlRhYmxlW2ldW2hlYWRlcnNba2V5XS5jb2xdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlUHJvZ3Jlc3MoZXZ0KSB7XG4gICAgLy8gZXZ0IGlzIGFuIFByb2dyZXNzRXZlbnQuXG4gICAgaWYgKGV2dC5sZW5ndGhDb21wdXRhYmxlKSB7XG4gICAgICAgIHZhciBwZXJjZW50TG9hZGVkID0gTWF0aC5yb3VuZCgoZXZ0LmxvYWRlZCAvIGV2dC50b3RhbCkgKiAxMDApO1xuICAgICAgICBlbGUuZmluZCgnLnByb2dyZXNzLWJhcicpLmF0dHIoJ2FyaWEtdmFsdWVub3cnLHBlcmNlbnRMb2FkZWQpLndpZHRoKHBlcmNlbnRMb2FkZWQrXCIlXCIpO1xuICAgICAgICBlbGUuZmluZCgnLnNyLW9ubHknKS5odG1sKE1hdGguY2VpbChwZXJjZW50TG9hZGVkKSsnJSBDb21wbGV0ZScpO1xuICAgIH1cbn1cblxuICBmdW5jdGlvbiBlcnJvckhhbmRsZXIoZXZ0KSB7XG4gICAgc3dpdGNoKGV2dC50YXJnZXQuZXJyb3IuY29kZSkge1xuICAgICAgY2FzZSBldnQudGFyZ2V0LmVycm9yLk5PVF9GT1VORF9FUlI6XG4gICAgICAgIHNldEVycm9yKCdGaWxlIE5vdCBGb3VuZCEnKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGV2dC50YXJnZXQuZXJyb3IuTk9UX1JFQURBQkxFX0VSUjpcbiAgICAgICAgc2V0RXJyb3IoJ0ZpbGUgaXMgbm90IHJlYWRhYmxlJyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBldnQudGFyZ2V0LmVycm9yLkFCT1JUX0VSUjpcbiAgICAgICAgYnJlYWs7IC8vIG5vb3BcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHNldEVycm9yKCdBbiBlcnJvciBvY2N1cnJlZCByZWFkaW5nIHRoaXMgZmlsZS4nKTtcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gc2V0RXJyb3IobXNnKSB7XG4gICAgICBlbGUuZmluZCgnLnN0YXR1cycpLmh0bWwoJzxkaXYgY2xhc3M9XCJhbGVydCBhbGVydC1kYW5nZXJcIj4nK21zZysnPC9kaXY+Jyk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGluaXQgOiBpbml0LFxuICAgIGluaXRGcm9tVXJsIDogaW5pdEZyb21VcmxcbiAgfTtcblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGluaXQgOiBpbml0XG59O1xuIl19
