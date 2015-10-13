(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.PoplarApp = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var io = require('./lib/io');
var run = require('./lib/run')(io);


module.exports = run;

},{"./lib/io":20,"./lib/run":21}],2:[function(require,module,exports){
module.exports = {
    description: "These are constants.",
    value: {
        asce_etr_windspeed : {
            value: 2,
            units: "m/s",
            description: "Default Wind Speed used to calculate ETr (and resultant Kc) for Model."
        },
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
        ETr: {
            value: -1,
            units: "mm",
            description: "Reference (Alfalfa) transpiration"
        },
        Kc: {
            value: -1,
            units: "",
            description: "Crop Coefficient"
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
  asce_etr_elevation: {
    value:500,
    units:'m/s',
    description:'Estimated Elevation of calculation of ETr (and Kc)'
  },
  asce_etr_windspeed: {
    value:2,
    units:'m/s',
    description:'Constant wind speed for calculation of ETr (and Kc)'
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
module.exports.tdp = function(x, f) {
  var p = f.f1 +
          (f.f0 - f.f1) *
          Math.exp( -Math.log(2) * Math.pow( (x/f.tm), f.n ));
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
  var t = (0.6108 /
            2 *
            (
              Math.exp(date_tmin * 17.27 / (date_tmin + 237.3) ) +
              Math.exp(date_tmax * 17.27 / (date_tmax + 237.3) )
            )
          ) -
          ( 0.6108 *
            Math.exp(date_tdmean * 17.27 / (date_tdmean + 237.3) )
          );
  return t;
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
@param days
@param date_daylight
@param cur_VPD
@param BLcond
@param cur_CanCond
*/
module.exports.Transp = function(date_nrel, days, date_daylight, cur_VPD, BLcond, cur_CanCond){
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
  return days * ( (e20 * netRad + defTerm ) / div ) * date_daylight * 3600 / lambda;
};

/**
units='mm/mon' which is also kg/m2/mon
description='ETr'
@method ETr
@param Rs (MJ/m2/day)
@param days
@param Tm (tmin+tmax)/2
@param cur_VPD = (es-ea)
@param elevation (m)
@param wind_speed (m/s)
*/

module.exports.ETr = function(Rs,tmin,tmax,tdmean,days,Z,u2){
  u2 = typeof u2 !== 'undefined' ? u2 : constant('asce_etr_windspeed');
  Z = typeof Z !== 'undefined' ? Z : constant('asce_etr_elevation');

  // FAO 56 Crop Evaporation
  var psychrometric_constant = function(z) {
    var P=101.3 * Math.pow((293 - (0.0065)*z)/293,5.26);
    g = 0.665* Math.pow(10,-3)*P;
    return g;
  };

  var slope_of_saturation_vapor_pressure= function(Tm) {
    return 4098.17 * 0.6108 * Math.exp(Tm * 17.27 / (Tm + 237.3)) / Math.pow((Tm +237.3),2)
  };

  var vp = function(T) {
    return 0.6108 * Math.exp(T * 17.27 / (T + 237.3));
  };

  var Rnl = function(tmin,tmax,tdmean,K) {
    return -(1.35 * K - 0.35) * (0.34 - 0.14 * Math.sqrt(vp(tdmean))) * Math.pow(4.93,-09) * ((Math.pow(tmin +273.16,4) + Math.pow(tmax + 273.16,4)) / 2);
  }
  //0.408 * delta * ( Rn - G) + psych * (Cn / (T + 273)) * u2 * (es -ea ) / (delta + psych * (1 + Cd * u2 ))
  // ETr:{Cn:1600,Cd:0.38},ETo:{Cn:900,Cd=0.34}
  //Rn = MJ / m2 day => date_nrel (MJ/m^2/day)
  //G=0
  //u2 = m/s
  // T = mean T (C)
  // (es-ea) = saturation Vapor Pressure (Kpa) => cur_VPD
  var Tm=(tmin+tmax)/2;
  var Cn=1600;
  var Cd=0.38;
  var VPD = ((vp(tmin)+vp(tmax))/2)-vp(tdmean);
  var g = psychrometric_constant(Z);
  var D = slope_of_saturation_vapor_pressure(Tm);
  var Rnl = Rnl(tmin,tmax,tdmean,1.0);
  Rnl =-90 / 277.0;
  var rad = 0.408 * D * (Rs * (1 - 0.23) + Rnl);
  var def = g * (Cn/(Tm+273)) * u2 * VPD;
  var div = D + g * (1 + Cd*u2);
  var ETr = (rad+def)/div;
 // console.log({Tm:Tm,D:D,Rnl:Rnl,Rs:Rs,ETr:ETr})
  // Convert daylight to secs.
  return days * ETr;
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
module.exports.PAR = function(date_rad, days, molPAR_MJ) {
  if( molPAR_MJ === null || molPAR_MJ === undefined ) {
    molPAR_MJ = constant('molPAR_MJ');
  }

  return date_rad * molPAR_MJ * days;
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

    this.currentDate = new Date(this.manage.datePlanted);
    //var plantedMonth = this.currentDate.getMonth();
    //var currentMonth = this.currentDate.getMonth();

    //TODO: test no datecoppice as input
    if ( this.manage.dateCoppiced !== undefined ){
      yearToCoppice = this.manage.dateCoppiced.getFullYear();
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
      coppiceDates : coppiceDates
    };

    return this.runSetup(setup);
}

function runSetup(setup){
    var i, key, currentWeather, step, t;

    var days_in_interval = (this.setup && this.setup.days_in_interval) ? this.setup.days_in_interval : 1;

    if( this.debug ) {
      t = new Date().getTime();
      console.log('days_in_interval: '+ days_in_interval);
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

    firstStepResults.Date = this.currentDate.getFullYear()+'-'+m+'-'+d;

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
      this.currentDate = new Date(this.manage.datePlanted);
      this.currentDate.setDate(this.manage.datePlanted.getDate() + step * days_in_interval); // add a day to current date
//      this.currentDate.setDate(this.manage.datePlanted.getDate() + step*setup.days_in_interval); // add a day to current date

      if( shouldCoppice(this, setup, days_in_interval) ) {
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
      nextStepResults = singleStep(this.plantation, this.soil, currentWeather,
                                   this.manage, currentStepResults, days_in_interval);
      nextStepResults.Date = this.currentDate.getFullYear()+'-'+m+'-'+d;

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

function singleStep(plantation, soil, weather, manage, p, days_in_interval) { //p = previous state
  var c = {}; //current state

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
    c.coppiceAge = p.coppiceAge + days_in_interval/365.0;
  }

  var tree; //tree
  if( c.coppiceCount === 0 ) { //TODO: check the case where we start with a coppiced multi stump tree
      tree = plantation.seedlingTree;
  } else {
      tree = plantation.coppicedTree;
  }

  c.StandAge = p.StandAge + days_in_interval/365.0;
  var sla = fn.tdp(p.StandAge, tree.SLA);
  c.LAI = p.WF * 0.1 * sla; // Landsburg eq 9.5

  // JM - Per section 2.1  Landsberg/Waring
  c.VPD = fn.VPD(weather.tmin, weather.tmax, weather.tdmean);
  //c.VPD = fn.VPD(weather.tmin, weather.tmax, weather.tdmean, days_in_interval);


  c.fVPD = fn.fVPD(tree.kG, c.VPD);

  c.fSW = fn.fSW(p.ASW, soil.maxAWS, soil.swconst, soil.swpower);
  c.fAge = fn.tdp(p.StandAge, tree.fAge);

  // fFrost is a cumulative Normal distribution, that approixmates the number of days (or parts of days) that
  // will be below 0, given a minimum temperature
  c.fFrost = fn.fFrost(weather.tmin);

  c.PAR = fn.PAR(weather.rad, days_in_interval); //  PAR in mols

  c.fT = fn.fT((weather.tmin + weather.tmax)/2, tree.fT);

  c.PhysMod = fn.PhysMod(c.fVPD, c.fSW, c.fAge);
  c.fNutr = fn.fNutr(tree.fN0, manage.fertility);
  c.xPP = fn.xPP(tree.y, c.PAR); // maximum potential Primary Production per month
  c.NPP = fn.NPP(p.coppiceAge, tree.fullCanAge, c.xPP, tree.k, p.LAI, c.fVPD, c.fSW, c.fAge, tree.alpha, c.fNutr, c.fT, c.fFrost);

  var NPP_target = fn.NPP(tree.fullCanAge, tree.fullCanAge, c.xPP, tree.k, tree.rootP.LAITarget, c.fVPD, c.fSW, c.fAge, tree.alpha, c.fNutr, c.fT, c.fFrost);
// JM
  c.RootP = fn.coppice.RootP(c.NPP, NPP_target, p.WR, p.W, tree.pR.mx, tree.rootP.frac * (days_in_interval / 30.4));

  if (tree.laVI && tree.laVI.constant ) { // Test for that function
    c.pfs = fn.coppice.pfs_via_VI(p.WS*1000000/plantation.StockingDensity, tree.wsVI,tree.laVI,sla);
  } else {
    c.pfs = fn.coppice.pfs(p.WS*1000/plantation.StockingDensity, tree.pfs);
  }

  c.dW = c.NPP + tree.rootP.efficiency * c.RootP;

  c.Intcptn = fn.Intcptn(c.LAI, tree.Intcptn);
  c.CanCond = fn.CanCond(c.PhysMod, c.LAI, tree.Conductance);

  c.pR = fn.pR(c.PhysMod, p.WR/p.W, manage.fertility, tree.pR);

  // JM - tree litterfall is a monthly parameter.
  c.litterfall = fn.tdp(p.StandAge, tree.litterfall) * (days_in_interval / 30.4);

  c.Transp = fn.Transp(weather.rad, days_in_interval, weather.daylight, c.VPD, tree.BLcond, c.CanCond);
  c.ETr = fn.ETr(weather.rad, weather.tmin, weather.tmax, weather.tdmean, days_in_interval);
  c.Kc = c.Transp/c.ETr;


  // Calculated from pfs
  c.pS = (1 - c.pR) / (1 + c.pfs );
  c.pF = (1 - c.pR) / (1 + 1/c.pfs );

  c.Irrig = fn.Irrig(manage.irrigFrac, c.Transp, c.Intcptn, weather.ppt);
  c.CumIrrig = p.CumIrrig + c.Irrig;

  c.ASW = fn.ASW(soil.maxAWS, p.ASW, weather.ppt, c.Transp, c.Intcptn, c.Irrig); //for some reason spelled maxAWS

  c.WF = p.WF + c.dW * c.pF - c.litterfall * p.WF;
  // Include contribution of RootP // Error in old code !
  c.WR = p.WR + c.dW * c.pR - (tree.pR.turnover * (days_in_interval / 30.4)) * p.WR - c.RootP;
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

// This actually need to work better.  If the weather doesn't match
// the steps, we need to find the closest value to what we are looking for
function getWeather(model, setup, month, day) {

    if( model.weather[model.currentDate.getFullYear()+'-'+month+'-'+day] !== undefined ) {
      return model.weather[model.currentDate.getFullYear()+'-'+month+'-'+day];
    }

    // modelled daily
    if( model.weather[month+'-'+day] !== undefined ) {
      return model.weather[month+'-'+day];
    }

    // actual
    if( model.weather[model.currentDate.getFullYear()+'-'+month] !== undefined ) {
      return model.weather[model.currentDate.getFullYear()+'-'+month];
    }

  // modelled Monthly
  if( model.weather[month] !== undefined ) {
    return model.weather[month];
  }

  throw 'Runtime Error: no weather found for month: '+month;
}

function shouldCoppice(model, setup, days_in_interval) {
  var next;
  var coppice_on;
  // do we have specific coppice dates set?
  if( setup.coppiceDates ) {

    for( var i = 0; i < setup.coppiceDates.length; i++ ) {
      var d = setup.coppiceDates[i];

      if (model.currentDate < d) {
        next = model.currentDate;
        next.setDate(next.getDate + days_in_interval);
        if ( d < next) {
          return true;
        }
      }
    }
  } else {
    coppice_on = new Date();
    coppice_on.setYear(setup.yearToCoppice);
    coppice_on.setMonth(setup.monthToCoppice);
    coppice_on.setDate(15);

    if( model.currentDate.getTime() < coppice_on.getTime() ) {
      next = new Date(model.currentDate);
      next.setDate(model.currentDate.getDate() + days_in_interval);

      if ( coppice_on.getTime() < next.getTime()) {
        setup.yearToCoppice = setup.yearToCoppice + setup.coppiceInterval;
        return true;
      }
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
var gdrive = require('./googleDrive');
var exportToCsv = require('./googleDrive/exportToCsv');
var offline = require('./offline');
var config = require('./config');
var utils = require('./utils');
var rawOutput = require('./output/raw');
var weather = require('./weather');
var weatherChart = require('./weather/chart');
var flashblockDetector = require('./flashblock-detector');
var inputForm = require('./inputForm');
var charts = require('./charts');

// import 3pg model
var model = require('../../poplar-3pg-model');

// wire in app handlers to model
var modelIO = require('./modelRunHandler');
model.setIO(modelIO);

var runCallback, weatherCustomChart;


// row raw data does a lot of processing of the results and the current state of what's
// being displayed.  Go ahead an setup the csv data at this point, then if the user
// decides to export, we are all set to to;
var csvResults = null;


var init = function(callback) {
  // these we don't want to setup until dom is ready
  inputForm = inputForm(this);

  charts.setApp(this);
  gdrive.setApp(this);

  modelIO.app = this;
  modelIO.model = model;
  modelIO.charts = charts;
  modelIO.inputForm = inputForm;

  // check if flash is installed.  If not, hide the chart type toggle.
  flashblockDetector(function(val){
      if( val > 0 ) $("#chart-type-btn-group").hide();
  });

  rawOutput.init(this);

  // setup export modal
  exportToCsv.init();
  $("#export-csv").on('click', function(){
      exportToCsv.run(csvResults);
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

  // make sure everything fits to screen
  $(window).resize(function(){
      charts.resize();

      if( weatherCustomChart ) {
          weatherCustomChart = weatherChart.create($('#custom-weather-chart')[0], model.custom_weather);
      }
  });

  callback();
};

var getModel = function() {
  return model;
};

var getOutputs = function() {
  return outputs;
};

var runComplete = function(rows) {
  if ( runCallback ) runCallback(rows);
  if( hideInitLoading ) hideInitLoading();
  runCallback = null;
};
modelIO.dump = runComplete;

var daysToRun = function(days_in_interval) {
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

  var oneDay = 24*60*60*1000;
  var days = Math.round(Math.abs((d1.getTime() - d2.getTime())/(oneDay)));
  days = days <= 0 ? 1 : days;

  return days / days_in_interval;
};


var runModel = function(isRt) {

  if ($("#runbtn, #runbtn-sm").hasClass("disabled")) return;
  $("#runbtn, #runbtn-sm").addClass("disabled").html("Running...");

  if( !weather.check(model) ) return;

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


          var days = daysToRun(model.setup.days_in_interval);

          try {
            model.run(days);
          } catch(e) {
            debugger;
            alert(e);
          }


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
};

// run a single variation, when multiple inputs for a single parameter have
// been given
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

  var days = daysToRun(parseFloat($('#input-setup-days_in_interval').val()));

  try {
    model.run(days);
  } catch(e) {
    debugger;
    alert(e);
  }
};


var showResults = function(result) {
  var currentResults;
  if( result[0] instanceof Array ) {
      currentResults = [{
          singleRun : true,
          inputs : {},
          output : result
      }];
  } else {
    currentResults = result;
  }

  // transpose all results to hash by date
  for( var i = 0; i < currentResults.length; i++ ) {
    var dateHash = {};
    var r = currentResults[i];

    r.totalSteps = r.output.length;
    for( var j = 1; j < r.output.length; j++ ) {
      dateHash[r.output[j][0]] = r.output[j];
    }
    r.header = r.output[0];
    r.output = dateHash;
  }

  // sort by most to least steps
  currentResults.sort(function(a, b){
    if( a.totalSteps > b.totalSteps ) return 1;
    if( a.totalSteps < b.totalSteps ) return -1;
    return 0;
  });

  rawOutput.show(currentResults);
  charts.updateCharts(csvResults, true);

  setTimeout(function() {
      $("#runbtn, #runbtn-sm").removeClass("disabled").html("<i class='icon-play'></i> Run");
  }, 250);
};

module.exports = {
  init : init,
  googleDrive : gdrive,
  getModel : getModel,
  runModel : runModel,
  daysToRun : daysToRun,
  // the raw module actually creates this setup
  setCsvResults : function(csv) {
    csvResults = csv;
  },
  qs : utils.qs,
  getModelIO : function() {
    return modelIO;
  }
};

},{"../../poplar-3pg-model":1,"./charts":25,"./config":26,"./flashblock-detector":27,"./googleDrive":29,"./googleDrive/exportToCsv":28,"./inputForm":31,"./modelRunHandler":32,"./offline":34,"./output/raw":36,"./utils":37,"./weather":40,"./weather/chart":38}],25:[function(require,module,exports){
var outputDefinitions = require('./output/definitions');
var raw = require('./output/raw');
var config = require('./config');
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
  for( var i = 0; i < config.outputs.length; i++) {
      var val = config.outputs[i];
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
              raw.show(cData);
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
  if( !outputDefinitions[val] ) return "<b>"+val+"</b></label>";

  var desc = outputDefinitions[val];
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
  for( var i = 0; i < config.outputs.length; i++) select(config.outputs[i]);
}

function unselectAll() {
  for( var i = 0; i < config.outputs.length; i++) unselect(config.outputs[i]);
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
  if( cData.inputs.length > 1 ) {
      var c1 = "";
      var c2 = "";
      for( var i = 0; i < cData.inputs.length; i++ ) {
          var ele = "<div style='min-height:40px;margin-bottom:10px'><div class='legend-square' style='background-color:"+googleChartColors[i]+"'>&nbsp;</div>";
          for( var mType in cData.inputs[i] ) {
              ele += "<div class='legend-text'>"+mType+"="+cData.inputs[i][mType]+"</div>";
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

  /*var dt = new google.visualization.DataTable();

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
  }*/

  /*var cDate = new Date($("#input-manage-datePlanted").val());

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

  dt.addRows(data);*/



  var dt = google.visualization.arrayToDataTable(cData.data[type]);


  if( outputDefinitions[type] ) {
      var desc = outputDefinitions[type];
      var label = desc.label && desc.label.length > 0 ? " - "+desc.label : "";
      var units = desc.units && desc.units.length > 0 ? " ["+desc.units+"]" : "";
      type = type+label+units;
  }


  var options = {
      vAxis : {
          title : type
      },
      hAxis : {
          title : ""
      },
      interpolateNulls : true
  };
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
    resize : resize
};

},{"./config":26,"./output/definitions":35,"./output/raw":36}],26:[function(require,module,exports){
module.exports = {
  inputs : {
    weather : ['month','tmin','tmax','tdmean','ppt','rad','daylight']
  },
  outputs : ['VPD','fVPD','fT','fFrost','PAR','Intcptn','ASW','CumIrrig',
             'Irrig','StandAge','LAI','CanCond','Transp','ETr','Kc','fSW','fAge',
             'PhysMod','pR','pS','litterfall','xPP','NPP','WF','WR','WS','W'],
  debug : false,
  devmode : false,
  daily : true
};

},{}],27:[function(require,module,exports){
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
/*
 * Save to google drive (export as CSV)
 */

var gdrive = require('./index');

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
function run(results) {
  ga('send', 'event', 'ui', 'interaction', 'export-drive-csv', 1);

  $("#export-csv").addClass("disabled").html("Exporting...");

  var name = $("#export-name").val();
  if( name.length === 0 ) {
    _setMessage("Please provide a folder name", "danger");
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
      if( data[key][i].length === 0 ) continue; // ignore the blank rows

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
}

module.exports = {
  run : run,
  init : init
};

},{"./index":29}],29:[function(require,module,exports){
var Oauth = require('../oauth');
var gdriveRT = require('./realtime');
var modelIO = require('../modelRunHandler');
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

function setApp(a) {
  app = a;
  gdriveRT.setApp(app);
}

/***
 *  Initialize google drive panels, btns and login
 ***/
function init(callback) {
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
    data = modelIO.exportSetup();
  } else if ( saveMimeType == TREE_MIME_TYPE ) {
    data = modelIO.exportSetup().tree;
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
    data = modelIO.exportSetup();
  } else if ( saveMimeType == TREE_MIME_TYPE ) {
    file = loadedTree;
    data = modelIO.exportSetup().tree;
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
      modelIO.loadSetup(id, file);

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
      modelIO.loadTree(file);

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
    modelIO.loadSetup(metadata.id, file);

    // setup realtime events
    gdriveRT.initRtApi(loadedFile);
  } else if ( metadata.mimeType == TREE_MIME_TYPE ) { // we loaded a tree
    // set the loaded tree id
    loadedTree = metadata.id;

    // show the share btn
    $("#share-tree-btn").show();
    $("#loaded-tree-name").html(metadata.title).parent().show();

    // set the loaded tree
    modelIO.loadTree(file);

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
  setApp : setApp,

  MIME_TYPE : MIME_TYPE
};

},{"../modelRunHandler":32,"../oauth":33,"./realtime":30}],30:[function(require,module,exports){
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

},{}],31:[function(require,module,exports){
var offline = require('./offline');
var gdrive = require('./googleDrive');
var charts = require('./charts');
var weatherChart = require('./weather/chart');
var weatherFileReader = require('./weather/fileReader');

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
  '<h4>Time Step</h4>'+
   '<div style="border-top:1px solid #ddd;padding:8px;height:60px">'+
     '<div class="form-group">'+
       '<label for="input-setup-days_in_interval" class="col-lg-4 control-label">Days in Interval</label>'+
       '<div class="col-lg-8">'+
         '<input type="text" id="input-setup-days_in_interval"  class="form-control" value="1"/>'+
         '<p class="help-block">How many days are in each step of the model</p>' +
       '</div>'+
     '</div>'+
   '</div>'+
   '<h4>Location</h4>'+
   '<div style="border-top:1px solid #ddd;padding:8px;height:60px">'+
     '<span id="current-location" style="color:#888"></span>'+
     '<a class="btn btn-default pull-right select-weather-location"><i class="icon-map-marker"></i> Select Location</a>'+
    '</div>'+
  '</div>';

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
var content = '<div class="tab-content">';

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
  weatherAverageChart = weatherChart.create($('#average-weather-chart')[0], weatherAverageChartData);
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

    content += ' <div class="tab-pane fade" id="inputs_'+model+'">';

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
  $('#input_pills a').click(function (e) {
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
      weatherAverageChart = weatherChart.create($('#average-weather-chart')[0], weatherAverageChartData);
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

},{"./charts":25,"./googleDrive":29,"./offline":34,"./weather/chart":38,"./weather/fileReader":39}],32:[function(require,module,exports){
var config = require('./config');
var app = require('./app');

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

          for ( var j = 1; j < config.inputs.weather.length; j++) {
              var c = config.inputs.weather[j];
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

  dump : function(data) {
    // should be overwritten in app
  },

  readFromInputs : function() {
      // read soil
      this.model.soil = {};
      this.model.soil.maxAWS = this._readVal($("#input-soil-maxAWS"));
      this.model.soil.swpower = this._readVal($("#input-soil-swpower"));
      this.model.soil.swconst = this._readVal($("#input-soil-swconst"));

      this.model.setup = {
        days_in_interval : this._readVal($("#input-setup-days_in_interval"))
      };

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

  // this is the snapshot we save to google drive
  exportSetup : function() {
      this.model.variations = {};
      this.readFromInputs();
      this.readWeather([], {}, {});

      var ex = {
          weather : this.model.weather,
          custom_weather : this.model.custom_weather,
          setup : this.model.setup,
          tree : this.model.tree,
          plantation : this.model.plantation,
          manage : this.model.manage,
          soil : this.model.soil,
          manage : this.model.manage,
          plantation_state : this.model.plantation_state,
          config : {
              chartTypeInput : $("#chartTypeInput").val(),
              daysToRun : this.app.daysToRun(),
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

      if( setup.setup && setup.setup.days_in_interval ) {
        $('#input-setup-days_in_interval').val(setup.setup.days_in_interval);
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
        var incIndex = false, index;
        if( setup.weather[0] !== undefined || setup.weather['0'] !== undefined ) {
          incIndex = true;
        }

        for ( var i in setup.weather ) {
            for ( var key in setup.weather[i]) {
                if (key == 'month') continue;


                if( incIndex ) index = (parseInt(i)+1)+'';
                else index = i+'';

                if( index.length === 1 ) index = '0'+index;

                if (setup.weather[i][key] !== null) {
                    $("#input-weather-" + key + "-" + index).val(setup.weather[i][key])
                } else {
                    $("#input-weather-" + key + "-" + index).val("");
                }
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
      if( setup.config.daysToRun ) {
          var d = new Date(setup.manage.datePlanted || setup.manage.DatePlanted);
          d = new Date(new Date(d).setMonth(d.getMonth()+parseInt(setup.config.daysToRun)));
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

},{"./app":24,"./config":26}],33:[function(require,module,exports){

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

},{}],34:[function(require,module,exports){
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

},{"./app":24}],35:[function(require,module,exports){
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
  ETr : {
      label : "ETr",
      units : "mm",
      description : "Reference evapotranspiration for Alfalfa"
  },
  Kc : {
      label : "Kc",
      units : "",
      description : "Crop coefficients"
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

},{}],36:[function(require,module,exports){
var modelIO = require('../modelRunHandler');
var app;

var show = function(results) {
  var i, z;

  // selected in the charts output
  var vars = $("#chartTypeInput").val();

  // find the rows we care about
  var chartRows = {};
  for( i = 0; i < results[0].header.length; i++ ) {
      if( vars.indexOf(results[0].header[i]) > -1 ) chartRows[results[0].header[i]] = i;
  }

  var tabs = $('<ul class="nav nav-pills" id="rawOutputTabs"  data-tabs="pill"></ul>');
  var contents = $('<div class="tab-content" style="overflow:auto;margin-top:15px"></div>');

  for( i = 0; i < vars.length; i++) {
      tabs.append($('<li '+(i === 0 ? 'class="active"' : "")+'><a href="#rawout'
          +vars[i]+'" data-toggle="tab">'+vars[i]+'</a></li>'));

      contents.append($('<div class="tab-pane ' + (i === 0 ? 'active' : "")
          + '" id="rawout' + vars[i] + '"></div>'));
  }

  $("#output-content").html("").append(tabs).append(contents);
  $("#rawOutputTabs").tab();

  csvResults = {
      config : modelIO.exportSetup(),
      inputs : [],
      header : results[0].header,
      data : {}
  };
  for( var i = 0; i < results.length; i++ ) {
    csvResults.inputs.push(results[i].inputs);
  }

  var cDate = new Date($("#input-manage-datePlanted").val());

  var table, row;
  for( var key in chartRows ) {
      table = "<table class='table table-striped'>";

      csvResults.data[key] = [];


      // set header row
      var currentRow = [];
      currentRow.push('date');
      //currentRow.push('step');

      table += "<tr><th>Date</th><th>Step</th>";

      for( z = 0; z < results.length; z++ ) {
          table += "<th>";
          var tmp = [];

          for( var mType in results[z].inputs ) {
              tmp.push(mType+"="+results[z].inputs[mType]);
              table += "<div>"+mType+"="+results[z].inputs[mType]+"</div>";
          }

          if( tmp.length === 0 ) {
              currentRow.push(key);
              table += key;
          } else {
              currentRow.push(tmp.join(" "));
          }
          table += "</th>";
      }
      table += "</tr>";
      csvResults.data[key].push(currentRow);
      var c = 0;

      for( var date in results[0].output ) {
        c++;
        currentRow = [];

        table += "<tr><td>"+date+"</td><td>"+c+"</td>";

        currentRow.push(date);
        //currentRow.push(c);

        var v;
        for( z = 0; z < results.length; z++ ) {
          if( !results[z].output[date] ) {
            table += "<td></td>";
            currentRow.push(null);
          } else {
            v = results[z].output[date][chartRows[key]];
            table += "<td>"+v+"</td>";
            currentRow.push(v);
          }
        }
        table += "</tr>";

        csvResults.data[key].push(currentRow);
      }
      $("#rawout" + key).html(table+"</table>");
  }

  app.setCsvResults(csvResults);

  // make sure we can see the export btn
  if( !offlineMode ) $("#show-export-csv").show();

  return csvResults;
};

module.exports = {
  show : show,
  init : function(a) {
    app = a;
  }
};

},{"../modelRunHandler":32}],37:[function(require,module,exports){
function qs(key) {
  key = key.replace(/[*+?^$.\[\]{}()|\\\/]/g, "\\$&");
  var match = location.search.match(new RegExp("[?&]" + key + "=([^&]+)(&|$)"));
  return match && decodeURIComponent(match[1].replace(/\+/g, " "));
}

module.exports = {
  qs : qs
};

},{}],38:[function(require,module,exports){
var options = {
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
};

function create(root, data) {
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
  chart.draw(dt, options);

  return chart;
}

module.exports = {
  create : create
};

},{}],39:[function(require,module,exports){
var app = require('../app');

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

},{"../app":24}],40:[function(require,module,exports){
var config = require('../config');

// make sure all the weather is set.  #1 thing people will mess up
function check(model) {
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

      for ( var j = 1; j < config.inputs.weather.length; j++) {
          var c = config.inputs.weather[j];
          var val = parseFloat($("#input-weather-" + c + "-" + m).val());
          if( !val && val !== 0 ) {
              alert("Missing weather data: "+c+" for month "+m+"\n\n"+
                    "Did you select a location (Setup) and/or are all weather/soil fields filled out?");
              $("#runbtn, #runbtn-sm").removeClass("disabled").html("<i class='icon-play'></i> Run");
              return false;
          }
      }
  }

  return true;
}

function set(model, data) {
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
          if( arr.length === 0 ) headers.push(key);
          t.push(model.custom_weather[date][key]);
      }

      arr.push(t);
  }

  if( arr.length === 0 ) {
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
}

module.exports = {
  set : set,
  check : check
};

},{"../config":26}]},{},[24])(24)
});
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9wb3BsYXItM3BnLW1vZGVsL2luZGV4LmpzIiwiLi4vcG9wbGFyLTNwZy1tb2RlbC9saWIvZGF0YU1vZGVsL2NvbnN0YW50cy9pbmRleC5qcyIsIi4uL3BvcGxhci0zcGctbW9kZWwvbGliL2RhdGFNb2RlbC9pbmRleC5qcyIsIi4uL3BvcGxhci0zcGctbW9kZWwvbGliL2RhdGFNb2RlbC9tYW5hZ2UvaW5kZXguanMiLCIuLi9wb3BsYXItM3BnLW1vZGVsL2xpYi9kYXRhTW9kZWwvcGxhbnRhdGlvbi9pbmRleC5qcyIsIi4uL3BvcGxhci0zcGctbW9kZWwvbGliL2RhdGFNb2RlbC9wbGFudGF0aW9uX3N0YXRlL2luZGV4LmpzIiwiLi4vcG9wbGFyLTNwZy1tb2RlbC9saWIvZGF0YU1vZGVsL3NvaWwvaW5kZXguanMiLCIuLi9wb3BsYXItM3BnLW1vZGVsL2xpYi9kYXRhTW9kZWwvdHJlZS9jb25kdWN0YW5jZS5qcyIsIi4uL3BvcGxhci0zcGctbW9kZWwvbGliL2RhdGFNb2RlbC90cmVlL2ZhZ2UuanMiLCIuLi9wb3BsYXItM3BnLW1vZGVsL2xpYi9kYXRhTW9kZWwvdHJlZS9mdC5qcyIsIi4uL3BvcGxhci0zcGctbW9kZWwvbGliL2RhdGFNb2RlbC90cmVlL2luZGV4LmpzIiwiLi4vcG9wbGFyLTNwZy1tb2RlbC9saWIvZGF0YU1vZGVsL3RyZWUvaW50Y3B0bi5qcyIsIi4uL3BvcGxhci0zcGctbW9kZWwvbGliL2RhdGFNb2RlbC90cmVlL2xpdHRlcmZhbGwuanMiLCIuLi9wb3BsYXItM3BnLW1vZGVsL2xpYi9kYXRhTW9kZWwvdHJlZS9wZnMuanMiLCIuLi9wb3BsYXItM3BnLW1vZGVsL2xpYi9kYXRhTW9kZWwvdHJlZS9wci5qcyIsIi4uL3BvcGxhci0zcGctbW9kZWwvbGliL2RhdGFNb2RlbC90cmVlL3Jvb3RwLmpzIiwiLi4vcG9wbGFyLTNwZy1tb2RlbC9saWIvZGF0YU1vZGVsL3RyZWUvc2xhLmpzIiwiLi4vcG9wbGFyLTNwZy1tb2RlbC9saWIvZGF0YU1vZGVsL3dlYXRoZXIvaW5kZXguanMiLCIuLi9wb3BsYXItM3BnLW1vZGVsL2xpYi9mbi5qcyIsIi4uL3BvcGxhci0zcGctbW9kZWwvbGliL2lvLmpzIiwiLi4vcG9wbGFyLTNwZy1tb2RlbC9saWIvcnVuLmpzIiwiLi4vcG9wbGFyLTNwZy1tb2RlbC9saWIvdXRpbHMuanMiLCIuLi9wb3BsYXItM3BnLW1vZGVsL2xpYi92YWxpZGF0ZS5qcyIsImpzbGliL2FwcC5qcyIsImpzbGliL2NoYXJ0cy5qcyIsImpzbGliL2NvbmZpZy5qcyIsImpzbGliL2ZsYXNoYmxvY2stZGV0ZWN0b3IuanMiLCJqc2xpYi9nb29nbGVEcml2ZS9leHBvcnRUb0Nzdi5qcyIsImpzbGliL2dvb2dsZURyaXZlL2luZGV4LmpzIiwianNsaWIvZ29vZ2xlRHJpdmUvcmVhbHRpbWUuanMiLCJqc2xpYi9pbnB1dEZvcm0uanMiLCJqc2xpYi9tb2RlbFJ1bkhhbmRsZXIuanMiLCJqc2xpYi9vYXV0aC5qcyIsImpzbGliL29mZmxpbmUuanMiLCJqc2xpYi9vdXRwdXQvZGVmaW5pdGlvbnMuanMiLCJqc2xpYi9vdXRwdXQvcmF3LmpzIiwianNsaWIvdXRpbHMuanMiLCJqc2xpYi93ZWF0aGVyL2NoYXJ0LmpzIiwianNsaWIvd2VhdGhlci9maWxlUmVhZGVyLmpzIiwianNsaWIvd2VhdGhlci9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcExBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZlQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1WUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4U0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4YUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5K0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2VEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcGpCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6YkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNySEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9iQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgaW8gPSByZXF1aXJlKCcuL2xpYi9pbycpO1xudmFyIHJ1biA9IHJlcXVpcmUoJy4vbGliL3J1bicpKGlvKTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IHJ1bjtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGRlc2NyaXB0aW9uOiBcIlRoZXNlIGFyZSBjb25zdGFudHMuXCIsXG4gICAgdmFsdWU6IHtcbiAgICAgICAgYXNjZV9ldHJfd2luZHNwZWVkIDoge1xuICAgICAgICAgICAgdmFsdWU6IDIsXG4gICAgICAgICAgICB1bml0czogXCJtL3NcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkRlZmF1bHQgV2luZCBTcGVlZCB1c2VkIHRvIGNhbGN1bGF0ZSBFVHIgKGFuZCByZXN1bHRhbnQgS2MpIGZvciBNb2RlbC5cIlxuICAgICAgICB9LFxuICAgICAgICBkYXlzX3Blcl9tb250aDoge1xuICAgICAgICAgICAgdmFsdWU6IDMwLjQsXG4gICAgICAgICAgICB1bml0czogXCJkYXlzL21vXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJOdW1iZXIgb2YgRGF5cyBpbiBhbiBhdmVyYWdlIG1vbnRoXCJcbiAgICAgICAgfSxcbiAgICAgICAgZTIwOiB7XG4gICAgICAgICAgICB2YWx1ZTogMi4yLFxuICAgICAgICAgICAgdW5pdHM6IFwidnAvdFwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiUmF0ZSBvZiBjaGFuZ2Ugb2Ygc2F0dXJhdGVkIFZQIHdpdGggVCBhdCAyMENcIlxuICAgICAgICB9LFxuICAgICAgICByaG9BaXI6IHtcbiAgICAgICAgICAgIHZhbHVlOiAxLjIsXG4gICAgICAgICAgICB1bml0czogXCJrZy9tXjNcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkRlbnNpdHkgb2YgYWlyXCJcbiAgICAgICAgfSxcbiAgICAgICAgbGFtYmRhOiB7XG4gICAgICAgICAgICB2YWx1ZTogMjQ2MDAwMCxcbiAgICAgICAgICAgIHVuaXRzOiBcIkova2dcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkxhdGVudCBoZWF0IG9mIHZhcG91cmlzYXRpb24gb2YgaDJvXCJcbiAgICAgICAgfSxcbiAgICAgICAgVlBEY29udjoge1xuICAgICAgICAgICAgdmFsdWU6IDAuMDAwNjIyLFxuICAgICAgICAgICAgdW5pdHM6IFwiXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJDb252ZXJ0IFZQRCB0byBzYXR1cmF0aW9uIGRlZmljaXQgPSAxOC8yOS8xMDAwXCJcbiAgICAgICAgfSxcbiAgICAgICAgUWE6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtOTAsXG4gICAgICAgICAgICB1bml0czogXCJXL21eMlwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiSW50ZXJjZXB0IG9mIG5ldCByYWRpYXRpb24gdmVyc3VzIHNvbGFyIHJhZGlhdGlvbiByZWxhdGlvbnNoaXBcIlxuICAgICAgICB9LFxuICAgICAgICBRYjoge1xuICAgICAgICAgICAgdmFsdWU6IDAuOCxcbiAgICAgICAgICAgIHVuaXRzOiBcInVuaXRsZXNzXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJzbG9wZSBvZiBuZXQgdnMuIHNvbGFyIHJhZGlhdGlvbiByZWxhdGlvbnNoaXBcIlxuICAgICAgICB9LFxuICAgICAgICBnRE1fbW9sOiB7XG4gICAgICAgICAgICB2YWx1ZTogMjQsXG4gICAgICAgICAgICB1bml0czogXCJnL21vbChDKVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiTW9sZWN1bGFyIHdlaWdodCBvZiBkcnkgbWF0dGVyXCJcbiAgICAgICAgfSxcbiAgICAgICAgbW9sUEFSX01KOiB7XG4gICAgICAgICAgICB2YWx1ZTogMi4zLFxuICAgICAgICAgICAgdW5pdHM6IFwibW9sKEMpL01KXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJDb252ZXJzaW9uIG9mIHNvbGFyIHJhZGlhdGlvbiB0byBQQVJcIlxuICAgICAgICB9XG4gICAgfVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICB0cmVlIDogcmVxdWlyZSgnLi90cmVlJyksXG4gIHBsYW50YXRpb24gOiByZXF1aXJlKCcuL3BsYW50YXRpb24nKSxcbiAgcGxhbnRhdGlvbl9zdGF0ZSA6IHJlcXVpcmUoJy4vcGxhbnRhdGlvbl9zdGF0ZScpLFxuICBzb2lsIDogcmVxdWlyZSgnLi9zb2lsJyksXG4gIHdlYXRoZXIgOiByZXF1aXJlKCcuL3dlYXRoZXInKSxcbiAgbWFuYWdlIDogcmVxdWlyZSgnLi9tYW5hZ2UnKSxcbiAgY29uc3RhdHMgOiByZXF1aXJlKCcuL2NvbnN0YW50cycpXG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIGRlc2NyaXB0aW9uIDogXCJDcm9wIE1hbmFnZW1lbnQgUGFyYW1ldGVyc1wiLFxuICB2YWx1ZSA6IHtcbiAgICBpcnJpZ0ZyYWMgOiB7XG4gICAgICB2YWx1ZSA6IDEsXG4gICAgICB1bml0cyA6IFwiXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiSXJyaWdhdGlvbiBmcmFjdGlvbjogMSA9IGZ1bGx5IGlycmlnYXRlZCwgMCA9IG5vIGlycmlnYXRpb24uIEFueSB2YWx1ZXMgYmV0d2VlbiAwIGFuZCAxIGFyZSBhY2NlcHRhYmxlXCJcbiAgICB9LFxuICAgIGZlcnRpbGl0eSA6IHtcbiAgICAgIHZhbHVlIDogMC43LFxuICAgICAgdW5pdHMgOiBcIlwiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIlNvaWwgZmVydGlsaXR5XCJcbiAgICB9LFxuICAgIGRhdGVQbGFudGVkIDoge1xuICAgICAgICB2YWx1ZSA6IFwiX2RhdGVfXCIsXG4gICAgICAgIHVuaXRzIDogXCJkYXRlXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uIDogXCJEYXRlIHRoZSBjcm9wIHdhcyBwbGFudGVkXCJcbiAgICB9LFxuICAgIGRhdGVDb3BwaWNlZCA6IHtcbiAgICAgICAgcmVxdWlyZWQgOiBmYWxzZSxcbiAgICAgICAgdmFsdWUgOiBcIl9kYXRlX1wiLFxuICAgICAgICB1bml0cyA6IFwiZGF0ZVwiLFxuICAgICAgICBkZXNjcmlwdGlvbiA6IFwiRGF0ZSBvZiB0aGUgZmlyc3QgY29wcGljZVwiXG4gICAgfSxcbiAgICBjb3BwaWNlSW50ZXJ2YWwgOiB7XG4gICAgICAgIHJlcXVpcmVkIDogZmFsc2UsXG4gICAgICAgIHZhbHVlIDogMyxcbiAgICAgICAgdW5pdHMgOiBcIlllYXJzXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uIDogXCJIb3cgYWZ0ZXIgdGhlIGNyb3AgaXMgY29wcGljZWQgYWZ0ZXIgdGhlIGZpcnN0IGNvcHBpY2VcIlxuICAgIH0sXG4gICAgY29wcGljZURhdGVzIDoge1xuICAgICAgICByZXF1aXJlZCA6IGZhbHNlLFxuICAgICAgICB2YWx1ZSA6IFwiXCIsXG4gICAgICAgIHVuaXRzIDogXCJkYXRlXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uIDogXCJIb3cgYWZ0ZXIgdGhlIGNyb3AgaXMgY29wcGljZWQgYWZ0ZXIgdGhlIGZpcnN0IGNvcHBpY2VcIlxuICAgIH0sXG4gICAgZGF0ZUZpbmFsSGFydmVzdCA6IHtcbiAgICAgICAgcmVxdWlyZWQgOiBmYWxzZSxcbiAgICAgICAgdmFsdWUgOiBcIl9kYXRlX1wiLFxuICAgICAgICB1bml0cyA6IFwiZGF0ZVwiLFxuICAgICAgICBkZXNjcmlwdGlvbiA6IFwiRGF0ZSB3aGVuIHRoZSBjcm9wIGlzIGNvbXBsZXRlbHkgaGFydmVzdGVkXCJcbiAgICB9XG4gIH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBkZXNjcmlwdGlvbjogXCJHcmVlbndvb2QgUEcgVmFsdWVzIChkZWZhdWx0KVwiLFxuICAgIHZhbHVlOiB7XG4gICAgICAgIHR5cGU6IHtcbiAgICAgICAgICAgIHZhbHVlOiBcIlwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiXCIsXG4gICAgICAgICAgICByZXF1aXJlZCA6IGZhbHNlXG4gICAgICAgIH0sXG4gICAgICAgIFN0b2NraW5nRGVuc2l0eToge1xuICAgICAgICAgICAgdmFsdWU6IDM1ODcsXG4gICAgICAgICAgICB1bml0czogXCJUcmVlcy9oZWN0YXJcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIk51bWJlciBvZiB0cmVlcyBwbGFudGVkIHBlciBoZWN0YXJcIlxuICAgICAgICB9LFxuICAgICAgICBTZWVkbGluZ01hc3M6IHtcbiAgICAgICAgICAgIHZhbHVlOiAwLjAwMDQsXG4gICAgICAgICAgICB1bml0czogXCJrR1wiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiTWFzcyBvZiB0aGUgc2VlZGxpbmdcIlxuICAgICAgICB9LFxuICAgICAgICBwUzoge1xuICAgICAgICAgICAgdmFsdWU6IDAuMSxcbiAgICAgICAgICAgIHVuaXRzOiBcInVuaXRsZXNzXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJQcm9wb3J0aW9uIG9mIHNlZWRsaW5nIG1hc3MgZ29pbmcgaW50byBzdGVtXCJcbiAgICAgICAgfSxcbiAgICAgICAgcEY6IHtcbiAgICAgICAgICAgIHZhbHVlOiAwLFxuICAgICAgICAgICAgdW5pdHM6IFwidW5pdGxlc3NcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlByb3BvcnRpb24gb2Ygc2VlZGxpbmcgbWFzcyBnb2luZyBpbnRvIGZvbGlhZ2VcIlxuICAgICAgICB9LFxuICAgICAgICBwUjoge1xuICAgICAgICAgICAgdmFsdWU6IDAuOSxcbiAgICAgICAgICAgIHVuaXRzOiBcInVuaXRsZXNzXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJQcm9wb3J0aW9uIG9mIHNlZWRsaW5nIG1hc3MgZ29pbmcgaW50byByb290XCJcbiAgICAgICAgfVxuICAgIH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBkZXNjcmlwdGlvbjogXCJQbGFudGF0aW9uIHN0YXRlIGNsYXNzLCBjb250YWluaW5nIGFsbCBpbnRlbWVkaWF0ZSB2YWx1ZXMgYXQgZXZlcnkgdGltZXN0ZXAgb2YgdGhlIG1vZGVsXCIsXG4gICAgdmFsdWU6IHtcbiAgICAgICAgZmVlZHN0b2NrSGFydmVzdDoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwiXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJcIlxuICAgICAgICB9LFxuICAgICAgICBjb3BwaWNlQ291bnQ6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIlwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiXCJcbiAgICAgICAgfSxcbiAgICAgICAgY29wcGljZUFnZToge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwibW9udGhcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkFnZSBvZiB0cmVlIGF0IHRoZSB0aW1lIG9mIGNvcHBpY2VcIlxuICAgICAgICB9LFxuICAgICAgICBWUEQ6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOlwia1BBXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjpcIk1lYW4gdmFwb3IgcHJlc3N1cmUgZGVmaWNpdFwiXG4gICAgICAgIH0sXG4gICAgICAgIGZWUEQ6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzIDogXCJ1bml0bGVzc1wiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246XCJWYXBvciBQcmVzc3VyZSBEZWZpY2l0IE1vZGlmaWVyIChQb3BsYXIpXCJcbiAgICAgICAgfSxcbiAgICAgICAgZlQ6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOlwidW5pdGxlc3NcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOlwiVGVtcGVyYXR1cmUgbW9kaWZpZXJcIlxuICAgICAgICB9LFxuICAgICAgICBmRnJvc3Q6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzIDogXCJ1bml0bGVzc1wiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb24gOiBcIk51bWJlciBvZiBGcmVlemUgRGF5cyBNb2RpZmllclwiXG4gICAgICAgIH0sXG4gICAgICAgIGZOdXRyOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czpcInVuaXRsZXNzXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjpcIk51dHJpdGlvbmFsIEZyYWN0aW9uLCBtaWdodCBiZSBiYXNlZCBvbiBzb2lsIGFuZCBmZXJ0aWxpemVyIGF0IHNvbWUgcG9pbnRcIlxuICAgICAgICB9LFxuICAgICAgICBmU1c6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIlwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiU29pbCB3YXRlciBtb2RpZmllclwiXG4gICAgICAgIH0sXG4gICAgICAgIGZBZ2U6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIlwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiXCJcbiAgICAgICAgfSxcbiAgICAgICAgUEFSOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czpcIm1vbHNcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOlwiTW9udGhseSBQQVIgaW4gbW9scyAvIG1eMiBtb250aFwiXG4gICAgICAgIH0sXG4gICAgICAgIHhQUDoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwibWV0cmljIHRvbnMgRHJ5IE1hdHRlci9oYVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwibWF4aW11bSBwb3RlbnRpYWwgUHJpbWFyeSBQcm9kdWN0aW9uXCJcbiAgICAgICAgfSxcbiAgICAgICAgSW50Y3B0bjoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwidW5pdGxlc3NcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkNhbm9weSByYWluZmFsbCBpbnRlcmNlcHRpb25cIlxuICAgICAgICB9LFxuICAgICAgICBBU1c6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIm1tXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJBdmFpbGFibGUgc29pbCB3YXRlclwiXG4gICAgICAgIH0sXG4gICAgICAgIEN1bUlycmlnOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJtbVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQ3VtdWxhdGl2ZSBpcnJpZ2F0aW9uXCJcbiAgICAgICAgfSxcbiAgICAgICAgSXJyaWc6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIm1tL21vblwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiUmVxdWlyZWQgaXJyaWdhdGlvblwiXG4gICAgICAgIH0sXG4gICAgICAgIFN0YW5kQWdlOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJtb250aFwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQWdlIG9mIHRoZSB0cmVlXCJcbiAgICAgICAgfSxcbiAgICAgICAgTEFJOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkxlYWYgYXJlYSBpbmRleFwiXG4gICAgICAgIH0sXG4gICAgICAgIENhbkNvbmQ6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIlwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQ2Fub3B5IGNvbmR1Y3RhbmNlXCJcbiAgICAgICAgfSxcbiAgICAgICAgVHJhbnNwOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJtbS9tb25cIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkNhbm9weSBtb250aGx5IHRyYW5zcGlyYXRpb25cIlxuICAgICAgICB9LFxuICAgICAgICBFVHI6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIm1tXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJSZWZlcmVuY2UgKEFsZmFsZmEpIHRyYW5zcGlyYXRpb25cIlxuICAgICAgICB9LFxuICAgICAgICBLYzoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwiXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJDcm9wIENvZWZmaWNpZW50XCJcbiAgICAgICAgfSxcbiAgICAgICAgUGh5c01vZDoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwidW5pdGxlc3NcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlBoeXNpb2xvZ2ljYWwgTW9kaWZpZXIgdG8gY29uZHVjdGFuY2UgYW5kIEFQQVJ1XCJcbiAgICAgICAgfSxcbiAgICAgICAgcGZzOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlJhdGlvIG9mIGZvbGlhZ2UgdG8gc3RlbSBwYXJ0aXRpb25pbmdcIlxuICAgICAgICB9LFxuICAgICAgICBwUjoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwiXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJcIlxuICAgICAgICB9LFxuICAgICAgICBwUzoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwiXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJcIlxuICAgICAgICB9LFxuICAgICAgICBwRjoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwiXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJcIlxuICAgICAgICB9LFxuICAgICAgICBsaXR0ZXJmYWxsOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlwiXG4gICAgICAgIH0sXG4gICAgICAgIE5QUDoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwibWV0cmljIHRvbnMgRHJ5IE1hdHRlci9oYVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiTmV0IFByaW1hcnkgUHJvZHVjdGl2aXR5XCJcbiAgICAgICAgfSxcbiAgICAgICAgUm9vdFA6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIlwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiUm9vdCBwcm9kdWN0aXZpdHlcIlxuICAgICAgICB9LFxuICAgICAgICBkVzoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwiXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJcIlxuICAgICAgICB9LFxuICAgICAgICBXRjoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwiYmR0L2hhXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJGb2xpYWdlIHlpZWxkXCJcbiAgICAgICAgfSxcbiAgICAgICAgV1I6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcImJkdC9oYVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiUm9vdCB5aWVsZFwiXG4gICAgICAgIH0sXG4gICAgICAgIFdTOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJiZHQvaGFcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlN0ZW0geWllbGRcIlxuICAgICAgICB9LFxuICAgICAgICBXOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJiZHQvaGFcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlRvdGFsIHlpZWxkOiByb290ICsgc3RlbSArIGZvbGlhZ2VcIlxuICAgICAgICB9XG4gICAgfVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGRlc2NyaXB0aW9uOiBcIlNvaWwgaW5mb3JtYXRpb24gYmFzZWQgb24gY3VycmVudCBsb2NhdGlvblwiLFxuICAgIHZhbHVlOiB7XG4gICAgICAgIG1heEFXUzoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwiXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJNYXhpbXVtIGF2YWlsYWJsZSBzb2lsIHdhdGVyXCJcbiAgICAgICAgfSxcbiAgICAgICAgc3dwb3dlcjoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwiXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJwb3dlciBwYXJhbWV0ZXIgYmFzZWQgb24gY2xheSBjb250ZW50IG9mIHNvaWxcIlxuICAgICAgICB9LFxuICAgICAgICBzd2NvbnN0OiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImNvbnN0YW50IHBhcmFtZXRlciBiYXNlZCBvbiBjbGF5IGNvbnRlbnQgb2Ygc29pbFwiXG4gICAgICAgIH1cbiAgICB9XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgdW5pdHM6IFwiW2djIG0vc10/XCIsXG4gICAgZGVzY3JpcHRpb246IFwiQWxvbmcgd2l0aCBhIFBoeXNpb2xvZ2ljYWwgbW9kaWZlciwgc3BlY2lmaWVzIHRoZSBjYW5vcHkgY29uZHVjdGFuY2UuICBVc2VkIGluIGNhbGN1bGF0aW9uIG9mIHRyYW5zcGlyYXRpb25cIixcbiAgICB2YWx1ZToge1xuICAgICAgICBtbjoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiTWluaW11bSB2YWx1ZSwgd2hlbiBsYWk9MFwiLFxuICAgICAgICAgICAgdmFsdWU6IDAuMDAwMVxuICAgICAgICB9LFxuICAgICAgICBteDoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiTWF4aW11bSB2YWx1ZVwiLFxuICAgICAgICAgICAgdmFsdWU6IDAuMDJcbiAgICAgICAgfSxcbiAgICAgICAgbGFpOiB7XG4gICAgICAgICAgICB1bml0czogXCJbbV4yL21eMl1cIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkxlYWYgQXJlYSBJbmRleCB3aGVyZSBwYXJhbWV0ZXIgcmVhY2hlcyBhIG1heGltdW0gdmFsdWUuXCIsXG4gICAgICAgICAgICB2YWx1ZTogMi42XG4gICAgICAgIH1cbiAgICB9XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgdW5pdHM6IFwiZnJhY3Rpb25cIixcbiAgICBkZXNjcmlwdGlvbjogXCJTcGVjaWZpZXMgdGhlIGdyb3d0aCBsaW1pdGVyIGFzIGEgZnVuY3Rpb24gb2YgdGhlIHRyZWUgYWdlLiAgVGhpcyBpcyBhIHRpbWUgZGVwZW5kYW5jeSBwYXJhbWV0ZXIuICBUaGUgZ3JhcGggb2YgdGhlIGZ1bmN0aW9uIGlzIGF2YWlsYWJsZSBhdDogaHR0cHM6Ly93d3cuZGVzbW9zLmNvbS9jYWxjdWxhdG9yL3dhMHEyaWgxOGhcIixcbiAgICB2YWx1ZToge1xuICAgICAgICBmMDoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiVmFsdWUgYXQgSW5pdGlhbCBUaW1lXCIsXG4gICAgICAgICAgICB2YWx1ZTogMVxuICAgICAgICB9LFxuICAgICAgICBmMToge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiVmFsdWUgYXQgSW5maW5pdGUgVGltZVwiLFxuICAgICAgICAgICAgdmFsdWU6IDBcbiAgICAgICAgfSxcbiAgICAgICAgdG06IHtcbiAgICAgICAgICAgIHVuaXRzOiBcIlt5XVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiVGltZSBpbiB5ZWFycyB3aGVyZSB2YWx1ZSBpcyB0aGUgYXZlcmFnZSBvZiBmMCBhbmQgZjFcIixcbiAgICAgICAgICAgIHZhbHVlOiA0Ny41XG4gICAgICAgIH0sXG4gICAgICAgIG46IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIm4+PTE7IFBhcmFtZXRlciBzcGVjaWZpbmcgdGhlIHJhdGUgb2YgY2hhbmdlIGFyb3VuZCB0bS4gIG49MSBpcyBhcHByb3hpbWF0ZWx5IGEgbGluZWFyIGNoYW5nZSwgYXMgbiBpbmNyZWFzZXMsIGNoYW5nZSBiZWNvbWVzIG1vcmUgbG9jYWxpemVkIGFyb3VuZCB0bS5cIixcbiAgICAgICAgICAgIHZhbHVlOiAzLjVcbiAgICAgICAgfVxuICAgIH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBkZXNjcmlwdGlvbjogXCJTcGVjaWZpZXMgdGhlIHBhcmFtZXRlcnMgYWZmZWN0aW5nIHRlbXBlcmF0dXJlIG1vZGlmaWVyLCBmVC4gQSBncmFwaCBvZiBob3cgdGhlc2UgcGFyYW1ldGVycyBhZmZlY3QgdGhlIHRlbXBlcmF0dXJlIG1vZGlmaWVyIGlzIGZvdW5kIGhlcmU6IGh0dHBzOi8vd3d3LmRlc21vcy5jb20vY2FsY3VsYXRvci82OWl3cXRubDI4XCIsXG4gICAgdmFsdWU6IHtcbiAgICAgICAgbW46IHtcbiAgICAgICAgICAgIHVuaXRzOiBcIltDXVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiU3BlY2lmaWVzIHRoZSBtaW5pbXVtIHRlbXBlcmF0dXJlIG9mIHJlc3BpcmF0aW9uXCIsXG4gICAgICAgICAgICB2YWx1ZTogMFxuICAgICAgICB9LFxuICAgICAgICBvcHQ6IHtcbiAgICAgICAgICAgIHVuaXRzOiBcIltDXVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiU3BlY2lmaWVzIHRoZSBvcHRpbXVtIHRlbXBlcmF0dXJlIG9mIHJlc3BpcmF0aW9uXCIsXG4gICAgICAgICAgICB2YWx1ZTogMjBcbiAgICAgICAgfSxcbiAgICAgICAgbXg6IHtcbiAgICAgICAgICAgIHVuaXRzOiBcIltDXVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiU3BlY2lmaWVzIHRoZSBtYXhpbXVtIHRlbXBlcmF0dXJlIG9mIHJlc3BpcmF0aW9uXCIsXG4gICAgICAgICAgICB2YWx1ZTogNTBcbiAgICAgICAgfVxuICAgIH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBkZXNjcmlwdGlvbjogXCJUaGVzZSBzcGVjaWZ5IGdyb3d0aCBwYXJhbWV0ZXJzIHNwZWNpZmljIHRvIHRoZSBzcGVjaWVzIG9mIHRyZWUuXCIsXG4gICAgdmFsdWUgOiB7XG4gICAgICAgIGs6IHtcbiAgICAgICAgICAgIHVuaXRzOiBcInVuaXRsZXNzXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJSYWRpYXRpb24gRXh0aW5jdGlvbiBDb2VmZmljaWVudC5cIixcbiAgICAgICAgICAgIHZhbHVlOiAwLjVcbiAgICAgICAgfSxcbiAgICAgICAgZnVsbENhbkFnZToge1xuICAgICAgICAgICAgdW5pdHM6IFwiW3ldXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJZZWFyIHdoZXJlIHRyZWUgcmVhY2hlcyBmdWxsIENhbm9weSBDb3Zlci5cIixcbiAgICAgICAgICAgIHZhbHVlOiAxLjVcbiAgICAgICAgfSxcbiAgICAgICAga0c6IHtcbiAgICAgICAgICAgIHVuaXRzOiBcIltrUEFeLTFdXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJEZXRlcm1pbmVzIHRoZSByZXNwb25zZSBvZiB0aGUgY2Fub3B5IGNvbmR1Y3RhbmNlIHRvIHRoZSB2YXBvciBwcmVzc3VyZSBkZWZpY2l0LlwiLFxuICAgICAgICAgICAgdmFsdWU6IDAuNVxuICAgICAgICB9LFxuICAgICAgICBhbHBoYToge1xuICAgICAgICAgICAgdW5pdHM6IFwiW2tnL21vbCA/XVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQ2Fub3B5IHF1YW50dW0gZWZmaWNpZW5jeS5cIixcbiAgICAgICAgICAgIHZhbHVlOiAwLjA4XG4gICAgICAgIH0sXG4gICAgICAgIGZUIDogcmVxdWlyZSgnLi9mdCcpLFxuICAgICAgICBCTGNvbmQ6IHtcbiAgICAgICAgICAgIHVuaXRzOiBcIltdXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJDYW5vcHkgYm91bmRhcnkgbGF5ZXIgY29uZHVjdGFuY2UuIFVzZWQgaW4gdGhlIGNhbGN1YXRpb24gb2YgdHJhbnNwaXJhdGlvblwiLFxuICAgICAgICAgICAgdmFsdWU6IDAuMDRcbiAgICAgICAgfSxcbiAgICAgICAgZkFnZTogcmVxdWlyZSgnLi9mYWdlJyksXG4gICAgICAgIGZOMDoge1xuICAgICAgICAgICAgdW5pdHM6IFwiZnJhY3Rpb25cIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlVzZWQgaW4gdGhlIGNhbGN1bGF0aW9uIG9mIHRoZSBudXRyaXRpb25hbCBtb2RpZmllcixmTnV0ci4gIGZOdXRyIHJhbmdlcyBmcm9tIFtmTk8sMSkgYmFzZWQgb24gdGhlIGZlcnRpbGl0eSBpbmRleCB3aGljaCByYW5nZXMgZnJvbSAwIHRvIDEuICBXaGVuIGZOMD0xIGluZGljYXRlcyBmTnV0ciBpcyAxXCIsXG4gICAgICAgICAgICB2YWx1ZTogMC4yNlxuICAgICAgICB9LFxuICAgICAgICBTTEE6IHJlcXVpcmUoJy4vc2xhJyksXG4gICAgICAgIC8vQ2hlY2tVbml0c0NoYW5nZXRvbGluZWFyRnVuY3Rpb25cbiAgICAgICAgQ29uZHVjdGFuY2U6IHJlcXVpcmUoJy4vY29uZHVjdGFuY2UnKSxcbiAgICAgICAgSW50Y3B0bjogcmVxdWlyZSgnLi9pbnRjcHRuJyksXG4gICAgICAgIHk6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkFzc2ltaWxhdGlvbiB1c2UgZWZmaWNpZW5jeS4gIFVzZWQgaW4gY2FsY3VsYXRpb24gb2YgdGhlIE5QUC5cIixcbiAgICAgICAgICAgIHZhbHVlOiAwLjQ3XG4gICAgICAgIH0sXG4gICAgICAgIHBmczogcmVxdWlyZSgnLi9wZnMnKSxcbiAgICAgICAgcFI6IHJlcXVpcmUoJy4vcHInKSxcbiAgICAgICAgcm9vdFA6IHJlcXVpcmUoJy4vcm9vdHAnKSxcbiAgICAgICAgbGl0dGVyZmFsbDogcmVxdWlyZSgnLi9saXR0ZXJmYWxsJylcbiAgICB9XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgdW5pdHM6IFwiZnJhY3Rpb25cIixcbiAgICBkZXNjcmlwdGlvbjogXCJSYWluZmFsbCBpbnRlcmNlcHRpb24gZnJhY3Rpb24uICBBIGxpbmVhciBmdW5jdGlvbiB3LnIudC4gTEFJXCIsXG4gICAgdmFsdWU6IHtcbiAgICAgICAgbW46IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIk1pbmltdW0gdmFsdWUsIHdoZW4gbGFpPTBcIixcbiAgICAgICAgICAgIHZhbHVlOiAwXG4gICAgICAgIH0sXG4gICAgICAgIG14OiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJNYXhpbXVtIHZhbHVlXCIsXG4gICAgICAgICAgICB2YWx1ZTogMC4yNFxuICAgICAgICB9LFxuICAgICAgICBsYWk6IHtcbiAgICAgICAgICAgIHVuaXRzOiBcIlttXjIvbV4yXVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiTGVhZiBBcmVhIEluZGV4IHdoZXJlIHBhcmFtZXRlciByZWFjaGVzIGEgbWF4aW11bSB2YWx1ZS5cIixcbiAgICAgICAgICAgIHZhbHVlOiA3LjNcbiAgICAgICAgfVxuICAgIH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICB1bml0czogXCJmcmFjdGlvblwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIlNwZWNpZmllcyB0aGUgZnJhY3Rpb25hbCBtb250aGx5IGxvc3Mgb2YgZm9saWFnZS4gVGhpcyBpcyBhIHRpbWUgZGVwZW5kYW55IHBhcmFtZXRlci4gIFRoZSBncmFwaCBvZiB0aGUgZnVuY3Rpb24gaXMgYXZhaWxhYmxlIGF0OiBodHRwczovL3d3dy5kZXNtb3MuY29tL2NhbGN1bGF0b3IvNmlxOXBwZHFzN1wiLFxuICAgIHZhbHVlOiB7XG4gICAgICAgIGYwOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJWYWx1ZSBhdCBJbml0aWFsIFRpbWVcIixcbiAgICAgICAgICAgIHZhbHVlOiAwLjAwMTVcbiAgICAgICAgfSxcbiAgICAgICAgZjE6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlZhbHVlIGF0IEluZmluaXRlIFRpbWVcIixcbiAgICAgICAgICAgIHZhbHVlOiAwLjAzXG4gICAgICAgIH0sXG4gICAgICAgIHRtOiB7XG4gICAgICAgICAgICB1bml0czogXCJbeV1cIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlRpbWUgaW4geWVhcnMgd2hlcmUgdmFsdWUgaXMgdGhlIGF2ZXJhZ2Ugb2YgZjAgYW5kIGYxXCIsXG4gICAgICAgICAgICB2YWx1ZTogMlxuICAgICAgICB9LFxuICAgICAgICBuOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJuPj0xOyBQYXJhbWV0ZXIgc3BlY2lmaW5nIHRoZSByYXRlIG9mIGNoYW5nZSBhcm91bmQgdG0uICBuPTEgaXMgYXBwcm94aW1hdGVseSBhIGxpbmVhciBjaGFuZ2UsIGFzIG4gaW5jcmVhc2VzLCBjaGFuZ2UgYmVjb21lcyBtb3JlIGxvY2FsaXplZCBhcm91bmQgdG0uXCIsXG4gICAgICAgICAgICB2YWx1ZTogMi41XG4gICAgICAgIH1cbiAgICB9XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgdW5pdHM6IFwiZnJhY3Rpb25cIixcbiAgICBkZXNjcmlwdGlvbjogXCJUaGlzIGRlZmluZXMgdGhlIGZvbGlhZ2UgdG8gc3RlbSAoV0YvV1MpIGZyYWN0aW9uIGluIGFsbG9jYXRpbmcgYWJvdmVncm91bmQgYmlvbWFzcyBvZiB0aGUgdHJlZS4gVGhpcyBpcyBjYWxjdWxhdGVkIHdpdGggYSBwYWlyIG9mIGFsbG9tZXRyaWMgcG93ZXIgZXF1YXRpb25zLiAgVGhlIGZpcnN0IHJlbGF0ZXMgYmFzYWwgZGlhbWV0ZXIsIChET0IpIHRvIHRvdGFsIHdvb2R5IGJpb21hc3MsIHdoaWxlIHRoZSBzZWNvbmQgcmVsYXRlcyBET0IgdG8gcGZzLiAgVGhlIHBhcmFtZXRlcml6YXRpb24gb2YgdGhlIHJlbGF0aW9uc2hpcCBiZXR3ZWVuIERPQiBhbmQgd29vZHkgYmlvbWFzcyBpcyBpbnZlcnRlZCB0byBkZXRlcm1pbmUgdGhlIERPQiBmcm9tIHRoZSBtb2RlbGVkIHdvb2R5IGZyYWN0aW9uLiAgVGhpcyByZWxhdGlvbiBpcyBwbG90dGVkIGF0OiAuICBUaGUgbW9kZWwgYWxsb2NhdGVzIHRoZSBhcHByb3ByaWF0ZSBmcmFjdGlvbiBvZiB3b29kIGJhc2VkIG9uIHRoZSBTdG9ja2luZyBkZW5zaXR5IG9mIHRoZSBwbGFudGF0aW9uLiBET0IgcmF0aGVyIHRoYW4gREJIIGlzIHVzZWQgZm9yIGNvbXBhcmlzb24gb2YgdHJlZXMgd2l0aCBhIGhpZ2ggc3RlbUNudCBhbmQgcmFwaWQgY29wcGljaW5nIHZhbHVlLlwiLFxuICAgIHZhbHVlOiB7XG4gICAgICAgIHN0ZW1DbnQ6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkF2ZXJhZ2UgbnVtYmVyIG9mIHN0ZW1zIHBlciBzdHVtcFwiLFxuICAgICAgICAgICAgdmFsdWU6IDIuOFxuICAgICAgICB9LFxuICAgICAgICBzdGVtQzoge1xuICAgICAgICAgICAgdW5pdHM6IFwiW2NtXi0xXVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQ29uc3RhbnQgaW4gcmVsYXRpb24gb2YgRE9CIHRvIHdvb2R5IGJpb21hc3NcIixcbiAgICAgICAgICAgIHZhbHVlOiAwLjE4XG4gICAgICAgIH0sXG4gICAgICAgIHN0ZW1QOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJQb3dlciBpbiByZWxhdGlvbiBvZiBET0IgdG8gd29vZHkgYmlvbWFzcy5cIixcbiAgICAgICAgICAgIHZhbHVlOiAyLjRcbiAgICAgICAgfSxcbiAgICAgICAgcGZzTXg6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIk1heGltdW0gcG9zc2libGUgcGZzIHZhbHVlIGFsbG93ZWRcIixcbiAgICAgICAgICAgIHZhbHVlOiAyXG4gICAgICAgIH0sXG4gICAgICAgIHBmc1A6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlBvd2VyIGluIHJlbGF0aW9uIG9mIERCTyB0byBwZnNcIixcbiAgICAgICAgICAgIHZhbHVlOiAtMC43NzJcbiAgICAgICAgfSxcbiAgICAgICAgcGZzQzoge1xuICAgICAgICAgICAgdW5pdHM6IFwiW2NtXi0xXVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQ29uc3RhbnQgaW4gcmVsYXRpb24gb2YgRE9CIHRvIHBmcy5cIixcbiAgICAgICAgICAgIHZhbHVlOiAxLjNcbiAgICAgICAgfVxuICAgIH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICB1bml0czogXCJmcmFjdGlvblwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkFsb25nIHdpdGggYSBQaHlzaW9sb2dpYWwgcGFyYW1ldGVyLCBzcGVjaWZpZXMgdGhlIGFtb3VudCBvZiBuZXcgZ3Jvd3RoIGFsbG9jYXRlZCB0byB0aGUgcm9vdCBzeXN0ZW0sIGFuZCB0aGUgdHVybm92ZXIgcmF0ZS5cIixcbiAgICB2YWx1ZToge1xuICAgICAgICBtbjoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiTWluaW11bSBhbGxvY2F0aW9uIHRvIHRoZSByb290LCB3aGVuIHRoZSBwaHlzaW9sb2dhbCBwYXJhbWV0ZXIgaXMgMS5cIixcbiAgICAgICAgICAgIHZhbHVlOiAwLjE3XG4gICAgICAgIH0sXG4gICAgICAgIG14OiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJNYXhpbXVtIGFsbG9jYXRpb24gdG8gdGhlIHJvb3QsIHdoZW4gbTAuXCIsXG4gICAgICAgICAgICB2YWx1ZTogMC43XG4gICAgICAgIH0sXG4gICAgICAgIG0wOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJEZXBlbmRhbmNlIG9uIHRoZSBmZXJ0aWxpdHkgaW5kZXguIDAgaW5kaWNhdGVzIGZ1bGwgZGVwZW5kYW5jZSBvbiBmZXJ0aWxpdHksIDEgaW5kaWNhdGVzIGEgY29uc3RhbnQgYWxsb2NhdGlvbiwgaW5kZXBlbmRhbnQgb2YgZmVydGlsaXR5XCIsXG4gICAgICAgICAgICB2YWx1ZTogMC41XG4gICAgICAgIH0sXG4gICAgICAgIHR1cm5vdmVyOiB7XG4gICAgICAgICAgICB1bml0czogXCJbbW9udGheLTFdXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJTcGVjaWZpZXMgdGhlIG1vbnRobHkgcm9vdCB0dXJub3ZlciByYXRlLlwiLFxuICAgICAgICAgICAgdmFsdWU6IDAuMDJcbiAgICAgICAgfVxuICAgIH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBkZXNjcmlwdGlvbjogXCJUaGVzZSBwYXJhbWV0ZXJzIHNwZWNpZnkgcm9vdCBhbGxvY2F0aW9uIHRvIGdyb3d0aCBhZnRlciBjb3BwaWNpbmcuXCIsXG4gICAgdmFsdWUgOiB7XG4gICAgICBmcmFjOiB7XG4gICAgICAgICAgdW5pdHM6IFwiW21vbnRoXjFdXCIsXG4gICAgICAgICAgZGVzY3JpcHRpb246IFwiU3BlY2lmaWVzIHRoZSBmcmFjdGlvbmFsIGFtb3VudCBvZiByb290IGJpb21hc3MgdGhhdCBleGNlZWRzIHRoZSBhYm92ZWdyb3VuZCByZXF1aXJlbWVudHMgdGhhdCBjYW4gYmUgc3VwcGxpZWQgaW4gYSBnaXZlbiBtb250aC5cIixcbiAgICAgICAgICB2YWx1ZTogMC4yXG4gICAgICB9LFxuICAgICAgTEFJVGFyZ2V0OiB7XG4gICAgICAgICAgdW5pdHM6IFwiW21eMi9tXjJdXCIsXG4gICAgICAgICAgZGVzY3JpcHRpb246IFwiU3BlY2lmaWVzIGEgdGFyZ2V0IExBSSByYXRlLiAgVGhlIFRhcmdldCBMQUkgaXMgaW5jbHVkZWQgaW4gdGhlIGNhbGN1bGF0aW9uIG9mIGEgdGFyZ2V0IE5QUCwgYmFzZWQgb24gd2VhdGhlciBwYXJhbWF0ZXJzLiAgQmVsb3cgdGhpcyB0YXJnZXQsIHRoZSByb290cyB3aWxsIGNvbnRyaWJ1dGUgYmlvbWFzcyBpZiB0aGUgYmVsb3cgZ3JvdW5kIHJvb3QgbWFzcyBleGNlZWRzIHRoZSByZXF1aXJlbWVudHMgb2YgdGhlIGFib3ZlZ3JvdW5kIGJpb21hc3MuIFRoZSB0YXJnZXQgaXMgc3BlY2lmaWVkIGluIExBSSB0byB0aW1lIHJvb3QgY29udHJpYnV0aW9ucyB0byBwZXJpb2RzIG9mIGdyb3d0aFwiLFxuICAgICAgICAgIHZhbHVlOiAxMFxuICAgICAgfSxcbiAgICAgIGVmZmljaWVuY3k6IHtcbiAgICAgICAgICB1bml0czogXCJba2cva2ddXCIsXG4gICAgICAgICAgZGVzY3JpcHRpb246IFwiU3BlY2lmaWVzIHRoZSBlZmZpY2llbmN5IGluIGNvbnZlcnRpbmcgcm9vdCBiaW9tYXNzIGludG8gYWJvdmVncm91bmQgYmlvbWFzcy5cIixcbiAgICAgICAgICB2YWx1ZTogMC43XG4gICAgICB9XG4gICAgfVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHVuaXRzOiBcIlttXjIva2ddXCIsXG4gICAgZGVzY3JpcHRpb246IFwiU3BlY2lmaWVzIHRoZSBTcGVjaWZpYyBMZWFmIEFyZWEgYXMgYSBmdW5jdGlvbiBvZiB0aGUgdHJlZSBhZ2UuICBUaGlzIGlzIGEgdGltZSBkZXBlbmRhbmN5IHBhcmFtZXRlci4gIFVzZWQgaW4gdGhlIGNhbGN1bGF0aW9uIG9mIExBSS4gIFRoZSBncmFwaCBvZiB0aGUgZnVuY3Rpb24gaXMgYXZhaWxhYmxlIGF0OiBodHRwczovL3d3dy5kZXNtb3MuY29tL2NhbGN1bGF0b3Ivd2EwcTJpaDE4aFwiLFxuICAgIHZhbHVlOiB7XG4gICAgICAgIGYwOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJWYWx1ZSBhdCBJbml0aWFsIFRpbWVcIixcbiAgICAgICAgICAgIHZhbHVlOiAxOVxuICAgICAgICB9LFxuICAgICAgICBmMToge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiVmFsdWUgYXQgSW5maW5pdGUgVGltZVwiLFxuICAgICAgICAgICAgdmFsdWU6IDEwLjhcbiAgICAgICAgfSxcbiAgICAgICAgdG06IHtcbiAgICAgICAgICAgIHVuaXRzOiBcIlt5XVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiVGltZSBpbiB5ZWFycyB3aGVyZSB2YWx1ZSBpcyB0aGUgYXZlcmFnZSBvZiBmMCBhbmQgZjFcIixcbiAgICAgICAgICAgIHZhbHVlOiA1XG4gICAgICAgIH0sXG4gICAgICAgIG46IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIm4+PTE7IFBhcmFtZXRlciBzcGVjaWZpbmcgdGhlIHJhdGUgb2YgY2hhbmdlIGFyb3VuZCB0bS4gIG49MSBpcyBhcHByb3hpbWF0ZWx5IGEgbGluZWFyIGNoYW5nZSwgYXMgbiBpbmNyZWFzZXMsIGNoYW5nZSBiZWNvbWVzIG1vcmUgbG9jYWxpemVkIGFyb3VuZCB0bS5cIixcbiAgICAgICAgICAgIHZhbHVlOiAyXG4gICAgICAgIH1cbiAgICB9XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgbW9udGg6IHtcbiAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICB1bml0czogXCJ1bml0bGVzc1wiLFxuICAgICAgICBkZXNjcmlwdGlvbjogXCJUaGUgbW9udGggbnVtYmVyIHNpbmNlIHBsYW50aW5nXCJcbiAgICB9LFxuICAgIHRtaW46IHtcbiAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICB1bml0czogXCJDZWxjaXVzXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIk1pbmltdW0gdGVtcGVyYXR1cmUgZm9yIGdyb3d0aFwiXG4gICAgfSxcbiAgICB0bWF4OiB7XG4gICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgdW5pdHM6IFwiQ2VsY2l1c1wiLFxuICAgICAgICBkZXNjcmlwdGlvbjogXCJNYXhpbXVtIHRlbXBlcmF0dXJlIGZvciBncm93dGhcIlxuICAgIH0sXG4gICAgdGRtZWFuOiB7XG4gICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgdW5pdHM6IFwiQ2VsY2l1c1wiLFxuICAgICAgICBkZXNjcmlwdGlvbjogXCJEZXcgcG9pbnQgdGVtcGVyYXR1cmVcIlxuICAgIH0sXG4gICAgcHB0OiB7XG4gICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgdW5pdHM6IFwiXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIlByZWNpcGl0YXRpb25cIlxuICAgIH0sXG4gICAgcmFkOiB7XG4gICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgdW5pdHM6IFwiXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIlNvbGFyIHJhZGlhdGlvblwiXG4gICAgfSxcbiAgICBucmVsOiB7XG4gICAgICAgIHJlcXVpcmVkIDogZmFsc2UsIC8vIGNhbGN1YXRlZFxuICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgIHVuaXRzOiBcIlwiLFxuICAgICAgICBkZXNjcmlwdGlvbjogXCJcIlxuICAgIH0sXG4gICAgZGF5bGlnaHQ6IHtcbiAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICB1bml0czogXCJcIixcbiAgICAgICAgZGVzY3JpcHRpb246IFwiXCJcbiAgICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuLyoqXG5AbW9kdWxlIDNQRyBNb2R1bGVcbioqL1xuXG5cbi8qKlxuQ2xhc3MgZm9yIGFsbCB0aGUgZnVuY3Rpb25zIHRoYXQgcnVuIGluIGEgc2luZ2xlIHN0ZXAgb2YgdGhlIG1vZGVsXG5cbkBjbGFzcyBtb2R1bGUuZXhwb3J0c1xuKiovXG5cblxuLyoqXG5saXN0IG9mIGNvbnN0YW50cyB1c2VkIGZvciBjb21wdXRhdGlvbnNcblxuQGF0dHJpYnV0ZSBjb25zdGFudFxuKiovXG52YXIgY29uc3RhbnRzID0ge1xuICBhc2NlX2V0cl9lbGV2YXRpb246IHtcbiAgICB2YWx1ZTo1MDAsXG4gICAgdW5pdHM6J20vcycsXG4gICAgZGVzY3JpcHRpb246J0VzdGltYXRlZCBFbGV2YXRpb24gb2YgY2FsY3VsYXRpb24gb2YgRVRyIChhbmQgS2MpJ1xuICB9LFxuICBhc2NlX2V0cl93aW5kc3BlZWQ6IHtcbiAgICB2YWx1ZToyLFxuICAgIHVuaXRzOidtL3MnLFxuICAgIGRlc2NyaXB0aW9uOidDb25zdGFudCB3aW5kIHNwZWVkIGZvciBjYWxjdWxhdGlvbiBvZiBFVHIgKGFuZCBLYyknXG4gIH0sXG4gIGUyMDp7XG4gICAgICB2YWx1ZToyLjIsXG4gICAgICB1bml0czondnAvdCcsXG4gICAgICBkZXNjcmlwdGlvbjonUmF0ZSBvZiBjaGFuZ2Ugb2Ygc2F0dXJhdGVkIFZQIHdpdGggVCBhdCAyMEMnXG4gIH0sXG4gIHJob0Fpcjp7XG4gICAgICB2YWx1ZToxLjIsXG4gICAgICB1bml0czona2cvbV4zJyxcbiAgICAgIGRlc2NyaXB0aW9uOidEZW5zaXR5IG9mIGFpcidcbiAgfSxcbiAgbGFtYmRhOntcbiAgICAgIHZhbHVlOjI0NjAwMDAsXG4gICAgICB1bml0czonSi9rZycsXG4gICAgICBkZXNjcmlwdGlvbjonTGF0ZW50IGhlYXQgb2YgdmFwb3VyaXNhdGlvbiBvZiBoMm8nXG4gIH0sXG4gIFZQRGNvbnY6e1xuICAgICAgdmFsdWU6MC4wMDA2MjIsXG4gICAgICB1bml0czonPycsXG4gICAgICBkZXNjcmlwdGlvbjonQ29udmVydCBWUEQgdG8gc2F0dXJhdGlvbiBkZWZpY2l0ID0gMTgvMjkvMTAwMCdcbiAgfSxcbiAgUWE6e1xuICAgICAgdmFsdWU6LTkwLFxuICAgICAgdW5pdHM6J1cvbV4yJyxcbiAgICAgIGRlc2NyaXB0aW9uOidJbnRlcmNlcHQgb2YgbmV0IHJhZGlhdGlvbiB2ZXJzdXMgc29sYXIgcmFkaWF0aW9uIHJlbGF0aW9uc2hpcCdcbiAgfSxcbiAgUWI6e1xuICAgICAgdmFsdWU6MC44LFxuICAgICAgdW5pdHM6J3VuaXRsZXNzJyxcbiAgICAgIGRlc2NyaXB0aW9uOidzbG9wZSBvZiBuZXQgdnMuIHNvbGFyIHJhZGlhdGlvbiByZWxhdGlvbnNoaXAnXG4gIH0sXG4gIGdETV9tb2w6e1xuICAgICAgdmFsdWU6MjQsXG4gICAgICB1bml0czonZy9tb2woQyknLFxuICAgICAgZGVzY3JpcHRpb246J01vbGVjdWxhciB3ZWlnaHQgb2YgZHJ5IG1hdHRlcidcbiAgfSxcbiAgbW9sUEFSX01KOntcbiAgICAgIHZhbHVlOjIuMyxcbiAgICAgIHVuaXRzOidtb2woQykvTUonLFxuICAgICAgZGVzY3JpcHRpb246J0NvbnZlcnNpb24gb2Ygc29sYXIgcmFkaWF0aW9uIHRvIFBBUidcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMuY29uc3RhbnQgPSBjb25zdGFudDtcbmZ1bmN0aW9uIGNvbnN0YW50KGMpIHtcbiAgICByZXR1cm4gY29uc3RhbnRzW2NdLnZhbHVlO1xufVxuXG4vKipcblRpbWUgRGVwZW5kYW50IEF0dHJpYnV0ZSxcbnVuaXRzPSd2YXJpb3VzJyxcbmRlc2NyaXB0aW9uPSdUaGlzIGZ1bmN0aW9uIGNyZWF0ZXMgYSB0aW1lIGRlcGVuZGFudCBmdW5jdGlvbiB0aGF0IGRlY2F5c1xuKG9yIHJpc2VzIGZyb20gZjAgdG8gZjEuICBUaGUgdmFsdWUgKGYwK2YxKS8yIGlzIHJlYWNoZWQgYXQgdG0sXG5hbmQgdGhlIHNsb3BlIG9mIHRoZSBsaW5lIGF0IHRtIGlzIGdpdmVuIGJ5IHAuXG5AbWV0aG9kIHRkcFxuQHBhcmFtIHhcbkBwYXJhbSBmXG4qKi9cbm1vZHVsZS5leHBvcnRzLnRkcCA9IGZ1bmN0aW9uKHgsIGYpIHtcbiAgdmFyIHAgPSBmLmYxICtcbiAgICAgICAgICAoZi5mMCAtIGYuZjEpICpcbiAgICAgICAgICBNYXRoLmV4cCggLU1hdGgubG9nKDIpICogTWF0aC5wb3coICh4L2YudG0pLCBmLm4gKSk7XG4gIHJldHVybiBwO1xufTtcblxuLyoqXG5AbWV0aG9kIGxpblxuQHBhcmFtIHhcbkBwYXJhbSBwXG4qL1xubW9kdWxlLmV4cG9ydHMubGluID0gZnVuY3Rpb24oeCwgcCl7XG4gIGlmKCB4IDwgMCApIHtcbiAgICByZXR1cm4gcC5tbjtcbiAgfVxuICBpZiggeCA+IHAueG1heCApIHtcbiAgICByZXR1cm4gcC54bWF4O1xuICB9XG4gIHJldHVybiBwLm1uICsgKHAubXgtcC5tbikqKHgvcC54bWF4KTtcbn07XG5cbi8qKlxudW5pdHM9J3VuaXRsZXNzJyxcbmRlc2NyaXB0aW9uPSdDYW5vcHkgUmFpbmZhbGwgaW50ZXJjZXB0aW9uJ1xuQG1ldGhvZCBJbnRjcHRuXG5AcGFyYW0gY3VyX0xBSVxuQHBhcmFtIGNcbiovXG5tb2R1bGUuZXhwb3J0cy5JbnRjcHRuID0gZnVuY3Rpb24oY3VyX0xBSSwgYyl7XG4gIHJldHVybiBNYXRoLm1heChjLm1uLGMubW4gKyAoYy5teCAtIGMubW4pICogTWF0aC5taW4oMSAsIGN1cl9MQUkgLyBjLmxhaSkpO1xufTtcblxuLyoqXG51bml0cz0nbW0nLFxuZGVzY3JpcHRpb249J0F2YWlsYWJsZSBTb2lsIFdhdGVyJ1xuQG1ldGhvZCBBU1dcbkBwYXJhbSBtYXhBU1dcbkBwYXJhbSBwcmV2X0FTV1xuQHBhcmFtIGRhdGVfcHB0XG5AcGFyYW0gY3VyX1RyYW5zcFxuQHBhcmFtIGN1cl9JbnRjcHRuXG5AcGFyYW0gY3VyX0lycmlnXG4qL1xubW9kdWxlLmV4cG9ydHMuQVNXID0gZnVuY3Rpb24obWF4QVNXLCBwcmV2X0FTVywgZGF0ZV9wcHQsIGN1cl9UcmFuc3AsIGN1cl9JbnRjcHRuLCBjdXJfSXJyaWcpe1xuICByZXR1cm4gTWF0aC5taW4obWF4QVNXKjEwLCBNYXRoLm1heChwcmV2X0FTVyArIGRhdGVfcHB0IC0gKGN1cl9UcmFuc3AgKyBjdXJfSW50Y3B0biAqIGRhdGVfcHB0KSArIGN1cl9JcnJpZywgMCkpO1xufTtcblxuLy9UT0RPOiBkb3VibGUgY2hlY2sgdGhlIGFwcHJvcHJpYXRlIHVzZSBvZiB0ZG1lYW4gKGRldyBwb2ludCB0ZW1wKVxuLy9UT0RPOiB0YWtlIGNvbnN0YW50cyBvdXRcbi8qKlxudW5pdHM9J2tQQScsXG5kZXNjcmlwdGlvbj0nTWVhbiB2YXBvciBwcmVzc3VyZSBkZWZpY2l0J1xuQG1ldGhvZCBWUERcbkBwYXJhbSBkYXRlX3RtaW5cbkBwYXJhbSBkYXRlX3RtYXhcbkBwYXJhbSBkYXRlX3RkbWVhblxuKi9cbm1vZHVsZS5leHBvcnRzLlZQRCA9IGZ1bmN0aW9uKGRhdGVfdG1pbiwgZGF0ZV90bWF4LCBkYXRlX3RkbWVhbil7XG4gIHZhciB0ID0gKDAuNjEwOCAvXG4gICAgICAgICAgICAyICpcbiAgICAgICAgICAgIChcbiAgICAgICAgICAgICAgTWF0aC5leHAoZGF0ZV90bWluICogMTcuMjcgLyAoZGF0ZV90bWluICsgMjM3LjMpICkgK1xuICAgICAgICAgICAgICBNYXRoLmV4cChkYXRlX3RtYXggKiAxNy4yNyAvIChkYXRlX3RtYXggKyAyMzcuMykgKVxuICAgICAgICAgICAgKVxuICAgICAgICAgICkgLVxuICAgICAgICAgICggMC42MTA4ICpcbiAgICAgICAgICAgIE1hdGguZXhwKGRhdGVfdGRtZWFuICogMTcuMjcgLyAoZGF0ZV90ZG1lYW4gKyAyMzcuMykgKVxuICAgICAgICAgICk7XG4gIHJldHVybiB0O1xufTtcblxuLyoqXG51bml0cyA9IHVuaXRsZXNzLFxuZGVzY3JpcHRpb249J1ZhcG9yIFByZXNzdXJlIERlZmljaXQgTW9kaWZpZXIgKFBvcGxhciknXG5AbWV0aG9kIGZWUERcbkBwYXJhbSBrR1xuQHBhcmFtIGN1cl9WUERcbiovXG5tb2R1bGUuZXhwb3J0cy5mVlBEID0gZnVuY3Rpb24oa0csIGN1cl9WUEQpe1xuICByZXR1cm4gTWF0aC5leHAoLTEgKiBrRyAqIGN1cl9WUEQpO1xufTtcblxuLy9UT0RPOiB0YWtlIGNvbnN0YW50cyBvdXRcbi8vIG1ha2UgYSBtZWFuaW5nZnVsIHRlbXB2YXIgbmFtZVxuLyoqXG51bml0cyA9IHVuaXRsZXNzLFxuZGVzY3JpcHRpb24gPSAnTnVtYmVyIG9mIEZyZWV6ZSBEYXlzIE1vZGlmaWVyJ1xuQG1ldGhvZCBmRnJvc3RcbkBwYXJhbSBkYXRlX3RtaW5cbiovXG5tb2R1bGUuZXhwb3J0cy5mRnJvc3QgPSBmdW5jdGlvbihkYXRlX3RtaW4pIHtcbiAgdmFyIHRlbXBWYXIgPSAtMS4wO1xuXG4gIGlmKCBkYXRlX3RtaW4gPj0gMCApe1xuICAgIHRlbXBWYXIgPSAxLjA7XG4gIH0gLy9lbHNlIC0xLjBcblxuICByZXR1cm4gMC41ICogKDEuMCArIHRlbXBWYXIgKiBNYXRoLnNxcnQoMSAtIE1hdGguZXhwKC0xICogTWF0aC5wb3coKDAuMTcgKiBkYXRlX3RtaW4pICwgMikgKiAoNCAvIDMuMTQxNTkgKyAwLjE0ICogTWF0aC5wb3coICgwLjE3ICogZGF0ZV90bWluKSAsIDIpICkgLyAoMSArIDAuMTQgKiBNYXRoLnBvdygoMC4xNyAqIGRhdGVfdG1pbikgLCAyKSApICkgKSApO1xufTtcblxuLy9UT0RPIC0gYmV0dGVyIG5hbWluZz86IHRtaW4sIHRtYXggPSB3ZWF0aGVyIFRvcHQsIFRtYXgsIFRtaW4gPSB0cmVlIHBhcmFtc1xuLyoqXG51bml0cz11bml0bGVzcyxcbmRlc2NyaXB0aW9uPSdUZW1wZXJhdHVyZSBtb2RpZmllcidcbkBtZXRob2QgZlRcbkBwYXJhbSB0YXZnXG5AcGFyYW0gZlRcbiovXG5tb2R1bGUuZXhwb3J0cy5mVCA9IGZ1bmN0aW9uKHRhdmcsIGZUKXtcbiAgdmFyIGY7XG4gIGlmKHRhdmcgPD0gZlQubW4gfHwgdGF2ZyA+PSBmVC5teCl7XG4gICAgZiA9IDA7XG4gIH0gZWxzZSB7XG4gICAgZiA9ICggKHRhdmcgLSBmVC5tbikgLyAoZlQub3B0IC0gZlQubW4pICkgICpcbiAgICAgICAgICAgTWF0aC5wb3cgKCAoIChmVC5teCAtIHRhdmcpIC8gKGZULm14IC0gZlQub3B0KSApLFxuICAgICAgICAgICAgICAgICAgICAgICggKGZULm14IC0gZlQub3B0KSAvIChmVC5vcHQgLSBmVC5tbikgKVxuICAgICAgICAgICAgICAgICAgICApO1xuICB9XG4gIHJldHVybihmKTtcbn07XG5cbi8qKlxudW5pdHM9J21tL21vbicsXG5kZXNjcmlwdGlvbj0nUmVxdWlyZWQgSXJyaWdhdGlvbidcbkBtZXRob2QgSXJyaWdcbkBwYXJhbSBpcnJpZ0ZyYWNcbkBwYXJhbSBjdXJfVHJhbnNwXG5AcGFyYW0gY3VyX0ludGNwdG5cbkBwYXJhbSBkYXRlX3BwdFxuKi9cbm1vZHVsZS5leHBvcnRzLklycmlnID0gZnVuY3Rpb24oaXJyaWdGcmFjLCBjdXJfVHJhbnNwLCBjdXJfSW50Y3B0biwgZGF0ZV9wcHQpe1xuICAgIHJldHVybiBNYXRoLm1heCgwLCBpcnJpZ0ZyYWMgKiAoY3VyX1RyYW5zcCAtICgxIC0gY3VyX0ludGNwdG4pICogZGF0ZV9wcHQpICk7XG59O1xuXG4vL1RPRE86IGdldCB1bml0cyBhbmQgZGVzY3JpcHRpb25cbi8qKlxuQG1ldGhvZCBmU1dcbkBwYXJhbSBBU1dcbkBwYXJhbSBtYXhBV1NcbkBwYXJhbSBzd2NvbnN0XG5AcGFyYW0gc3dwb3dlclxuKi9cbm1vZHVsZS5leHBvcnRzLmZTVyA9IGZ1bmN0aW9uKEFTVywgbWF4QVdTLCBzd2NvbnN0LCBzd3Bvd2VyKSB7XG4gIHZhciBmU1c7XG4gIGlmKCBzd2NvbnN0ID09PSAwIHx8IG1heEFXUyA9PT0gMCApIHtcbiAgICBmU1cgPSAwO1xuICB9IGVsc2Uge1xuICAgIHZhciBvbXIgPSAxIC0gKEFTVy8xMCkgLyBtYXhBV1M7IC8vIE9uZSBNaW51cyBSYXRpb1xuXG4gICAgaWYob21yIDwgMC4wMDEpIHtcbiAgICAgIGZTVyA9IDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZTVyA9ICgxLU1hdGgucG93KG9tcixzd3Bvd2VyKSkvKDErTWF0aC5wb3cob21yL3N3Y29uc3Qsc3dwb3dlcikpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZlNXO1xufTtcblxuLyoqXG51bml0cz0ndW5pdGxlc3MnLFxuZGVzY3JpcHRpb249J051dHJpdGlvbmFsIEZyYWN0aW9uLCBtaWdodCBiZSBiYXNlZCBvbiBzb2lsIGFuZCBmZXJ0aWxpemVyIGF0IHNvbWUgcG9pbnQnXG5AbWV0aG9kIGZOdXRyXG5AcGFyYW0gZk4wXG5AcGFyYW0gRlJcbiovXG5tb2R1bGUuZXhwb3J0cy5mTnV0ciA9IGZ1bmN0aW9uKGZOMCwgRlIpe1xuICByZXR1cm4gZk4wICsgKDEgLSBmTjApICogRlI7XG59O1xuXG4vKipcblRPRE86IHdoeSAkMyBpbiBtYWtlZmlsZSAtIGFzayBhYm91dCBpdFxudW5pdHM9dW5pdGxlc3NcbmRlc2NyaXB0aW9uPSdQaHlzaW9sb2dpY2FsIE1vZGlmaWVyIHRvIGNvbmR1Y3RhbmNlIGFuZCBBUEFSdSdcbkBtZXRob2QgUGh5c01vZFxuQHBhcmFtIGN1cl9mVlBEXG5AcGFyYW0gY3VyX2ZTV1xuQHBhcmFtIGN1cl9mQWdlXG4qL1xubW9kdWxlLmV4cG9ydHMuUGh5c01vZCA9IGZ1bmN0aW9uKGN1cl9mVlBELCBjdXJfZlNXLCBjdXJfZkFnZSl7XG4gICByZXR1cm4gTWF0aC5taW4oY3VyX2ZWUEQgLCBjdXJfZlNXKSAqIGN1cl9mQWdlO1xufTtcblxuLyoqXG51bml0cz0nZ2MsbS9zJyxcbmRlc2NyaXB0aW9uPSdDYW5vcHkgQ29uZHVjdGFuY2UnXG5AbWV0aG9kIENhbkNvbmRcbkBwYXJhbSBQaHlzTW9kXG5AcGFyYW0gTEFJXG5AcGFyYW0gY29uZFxuKi9cbm1vZHVsZS5leHBvcnRzLkNhbkNvbmQgPSBmdW5jdGlvbihQaHlzTW9kLCBMQUksIGNvbmQpe1xuICAgcmV0dXJuIE1hdGgubWF4KGNvbmQubW4gLCBjb25kLm14ICogUGh5c01vZCAqIE1hdGgubWluKDEgLCBMQUkgLyBjb25kLmxhaSkgKTtcbn07XG5cbi8qKlxudW5pdHM9J21tL21vbicgd2hpY2ggaXMgYWxzbyBrZy9tMi9tb25cbmRlc2NyaXB0aW9uPSdDYW5vcHkgTW9udGhseSBUcmFuc3BpcmF0aW9uJ1xuQG1ldGhvZCBUcmFuc3BcbkBwYXJhbSBkYXRlX25yZWxcbkBwYXJhbSBkYXlzXG5AcGFyYW0gZGF0ZV9kYXlsaWdodFxuQHBhcmFtIGN1cl9WUERcbkBwYXJhbSBCTGNvbmRcbkBwYXJhbSBjdXJfQ2FuQ29uZFxuKi9cbm1vZHVsZS5leHBvcnRzLlRyYW5zcCA9IGZ1bmN0aW9uKGRhdGVfbnJlbCwgZGF5cywgZGF0ZV9kYXlsaWdodCwgY3VyX1ZQRCwgQkxjb25kLCBjdXJfQ2FuQ29uZCl7XG4gIHZhciBWUERjb252ID0gY29uc3RhbnQoJ1ZQRGNvbnYnKTtcbiAgdmFyIGxhbWJkYSA9IGNvbnN0YW50KCdsYW1iZGEnKTtcbiAgdmFyIHJob0FpciA9IGNvbnN0YW50KCdyaG9BaXInKTtcbiAgdmFyIGUyMCA9IGNvbnN0YW50KCdlMjAnKTtcbiAgdmFyIFFhID0gY29uc3RhbnQoJ1FhJyk7XG4gIHZhciBRYiA9IGNvbnN0YW50KCdRYicpO1xuXG4gIC8vIGRhdGVfZGF5bGlnaHQgPSBob3Vyc1xuICAvLyBucmVsIGlzIGluIE1KL21eMi9kYXkgY29udmVydCB0byBXaC9tXjIvZGF5XG4gIHZhciBuZXRSYWQgPSBRYSArIFFiICogKChkYXRlX25yZWwgKiAyNzcuNzc4KSAvIGRhdGVfZGF5bGlnaHQpO1xuICB2YXIgZGVmVGVybSA9IHJob0FpciAqIGxhbWJkYSAqIFZQRGNvbnYgKiBjdXJfVlBEICogQkxjb25kO1xuICB2YXIgZGl2ID0gMSArIGUyMCArIEJMY29uZCAvIGN1cl9DYW5Db25kO1xuXG4gIC8vIENvbnZlcnQgZGF5bGlnaHQgdG8gc2Vjcy5cbiAgcmV0dXJuIGRheXMgKiAoIChlMjAgKiBuZXRSYWQgKyBkZWZUZXJtICkgLyBkaXYgKSAqIGRhdGVfZGF5bGlnaHQgKiAzNjAwIC8gbGFtYmRhO1xufTtcblxuLyoqXG51bml0cz0nbW0vbW9uJyB3aGljaCBpcyBhbHNvIGtnL20yL21vblxuZGVzY3JpcHRpb249J0VUcidcbkBtZXRob2QgRVRyXG5AcGFyYW0gUnMgKE1KL20yL2RheSlcbkBwYXJhbSBkYXlzXG5AcGFyYW0gVG0gKHRtaW4rdG1heCkvMlxuQHBhcmFtIGN1cl9WUEQgPSAoZXMtZWEpXG5AcGFyYW0gZWxldmF0aW9uIChtKVxuQHBhcmFtIHdpbmRfc3BlZWQgKG0vcylcbiovXG5cbm1vZHVsZS5leHBvcnRzLkVUciA9IGZ1bmN0aW9uKFJzLHRtaW4sdG1heCx0ZG1lYW4sZGF5cyxaLHUyKXtcbiAgdTIgPSB0eXBlb2YgdTIgIT09ICd1bmRlZmluZWQnID8gdTIgOiBjb25zdGFudCgnYXNjZV9ldHJfd2luZHNwZWVkJyk7XG4gIFogPSB0eXBlb2YgWiAhPT0gJ3VuZGVmaW5lZCcgPyBaIDogY29uc3RhbnQoJ2FzY2VfZXRyX2VsZXZhdGlvbicpO1xuXG4gIC8vIEZBTyA1NiBDcm9wIEV2YXBvcmF0aW9uXG4gIHZhciBwc3ljaHJvbWV0cmljX2NvbnN0YW50ID0gZnVuY3Rpb24oeikge1xuICAgIHZhciBQPTEwMS4zICogTWF0aC5wb3coKDI5MyAtICgwLjAwNjUpKnopLzI5Myw1LjI2KTtcbiAgICBnID0gMC42NjUqIE1hdGgucG93KDEwLC0zKSpQO1xuICAgIHJldHVybiBnO1xuICB9O1xuXG4gIHZhciBzbG9wZV9vZl9zYXR1cmF0aW9uX3ZhcG9yX3ByZXNzdXJlPSBmdW5jdGlvbihUbSkge1xuICAgIHJldHVybiA0MDk4LjE3ICogMC42MTA4ICogTWF0aC5leHAoVG0gKiAxNy4yNyAvIChUbSArIDIzNy4zKSkgLyBNYXRoLnBvdygoVG0gKzIzNy4zKSwyKVxuICB9O1xuXG4gIHZhciB2cCA9IGZ1bmN0aW9uKFQpIHtcbiAgICByZXR1cm4gMC42MTA4ICogTWF0aC5leHAoVCAqIDE3LjI3IC8gKFQgKyAyMzcuMykpO1xuICB9O1xuXG4gIHZhciBSbmwgPSBmdW5jdGlvbih0bWluLHRtYXgsdGRtZWFuLEspIHtcbiAgICByZXR1cm4gLSgxLjM1ICogSyAtIDAuMzUpICogKDAuMzQgLSAwLjE0ICogTWF0aC5zcXJ0KHZwKHRkbWVhbikpKSAqIE1hdGgucG93KDQuOTMsLTA5KSAqICgoTWF0aC5wb3codG1pbiArMjczLjE2LDQpICsgTWF0aC5wb3codG1heCArIDI3My4xNiw0KSkgLyAyKTtcbiAgfVxuICAvLzAuNDA4ICogZGVsdGEgKiAoIFJuIC0gRykgKyBwc3ljaCAqIChDbiAvIChUICsgMjczKSkgKiB1MiAqIChlcyAtZWEgKSAvIChkZWx0YSArIHBzeWNoICogKDEgKyBDZCAqIHUyICkpXG4gIC8vIEVUcjp7Q246MTYwMCxDZDowLjM4fSxFVG86e0NuOjkwMCxDZD0wLjM0fVxuICAvL1JuID0gTUogLyBtMiBkYXkgPT4gZGF0ZV9ucmVsIChNSi9tXjIvZGF5KVxuICAvL0c9MFxuICAvL3UyID0gbS9zXG4gIC8vIFQgPSBtZWFuIFQgKEMpXG4gIC8vIChlcy1lYSkgPSBzYXR1cmF0aW9uIFZhcG9yIFByZXNzdXJlIChLcGEpID0+IGN1cl9WUERcbiAgdmFyIFRtPSh0bWluK3RtYXgpLzI7XG4gIHZhciBDbj0xNjAwO1xuICB2YXIgQ2Q9MC4zODtcbiAgdmFyIFZQRCA9ICgodnAodG1pbikrdnAodG1heCkpLzIpLXZwKHRkbWVhbik7XG4gIHZhciBnID0gcHN5Y2hyb21ldHJpY19jb25zdGFudChaKTtcbiAgdmFyIEQgPSBzbG9wZV9vZl9zYXR1cmF0aW9uX3ZhcG9yX3ByZXNzdXJlKFRtKTtcbiAgdmFyIFJubCA9IFJubCh0bWluLHRtYXgsdGRtZWFuLDEuMCk7XG4gIFJubCA9LTkwIC8gMjc3LjA7XG4gIHZhciByYWQgPSAwLjQwOCAqIEQgKiAoUnMgKiAoMSAtIDAuMjMpICsgUm5sKTtcbiAgdmFyIGRlZiA9IGcgKiAoQ24vKFRtKzI3MykpICogdTIgKiBWUEQ7XG4gIHZhciBkaXYgPSBEICsgZyAqICgxICsgQ2QqdTIpO1xuICB2YXIgRVRyID0gKHJhZCtkZWYpL2RpdjtcbiAvLyBjb25zb2xlLmxvZyh7VG06VG0sRDpELFJubDpSbmwsUnM6UnMsRVRyOkVUcn0pXG4gIC8vIENvbnZlcnQgZGF5bGlnaHQgdG8gc2Vjcy5cbiAgcmV0dXJuIGRheXMgKiBFVHI7XG59O1xuXG4vL1RPRE86IGRlc2NyaXB0aW9uXG4vKipcbnVuaXRzPSdtZXRyaWMgdG9ucyBEcnkgTWF0dGVyL2hhJyxcbkBtZXRob2QgTlBQXG5AcGFyYW0gcHJldl9TdGFuZEFnZVxuQHBhcmFtIGZ1bGxDYW5BZ2VcbkBwYXJhbSB4UFBcbkBwYXJhbSBrXG5AcGFyYW0gcHJldl9MQUlcbkBwYXJhbSBmVlBEXG5AcGFyYW0gZlNXXG5AcGFyYW0gZkFnZVxuQHBhcmFtIGFscGhhXG5AcGFyYW0gZk51dHJcbkBwYXJhbSBmVFxuQHBhcmFtIGZGcm9zdFxuKi9cbm1vZHVsZS5leHBvcnRzLk5QUCA9IGZ1bmN0aW9uKHByZXZfU3RhbmRBZ2UsIGZ1bGxDYW5BZ2UsIHhQUCwgaywgcHJldl9MQUksIGZWUEQsIGZTVywgZkFnZSwgYWxwaGEsIGZOdXRyLCBmVCwgZkZyb3N0KXtcbiAgdmFyIENhbkNvdmVyID0gMTtcbiAgaWYoIHByZXZfU3RhbmRBZ2UgPCBmdWxsQ2FuQWdlICl7XG4gICAgQ2FuQ292ZXIgPSBwcmV2X1N0YW5kQWdlIC8gZnVsbENhbkFnZTtcbiAgfVxuXG4gIHJldHVybiB4UFAgKiAoMSAtIChNYXRoLmV4cCgtayAqIHByZXZfTEFJKSApICkgKiBDYW5Db3ZlciAqIE1hdGgubWluKGZWUEQgLCBmU1cpICogZkFnZSAqIGFscGhhICogZk51dHIgKiBmVCAqIGZGcm9zdDtcbn07XG5cbi8vVE9ETzogdW5pdHMgYW5kIGRlc2NyaXB0aW9uXG4vKipcbkBtZXRob2QgcFJcbkBwYXJhbSBjdXJfUGh5c01vZFxuQHBhcmFtIGN1cl9wUlxuQHBhcmFtIEZSXG5AcGFyYW0gcFJcbiovXG5tb2R1bGUuZXhwb3J0cy5wUiA9IGZ1bmN0aW9uKGN1cl9QaHlzTW9kLCBjdXJfcFIsRlIscFIpe1xuICB2YXIgcCA9KHBSLm14ICogcFIubW4pIC9cbiAgICAgICAgIChwUi5tbiArIChwUi5teCAtIHBSLm1uKSAqIGN1cl9QaHlzTW9kICogKHBSLm0wICsgKDEgLSBwUi5tMCkgKiBGUikgKTtcblxuICAvLyBUaGlzIHdhcyBhZGRlZCBieSBxdWlubiB0byBsaW1pdCByb290IGdyb3d0aC5cbiAgcmV0dXJuIHAgKiBNYXRoLnBvdyhwL2N1cl9wUiwyKTtcbn07XG5cblxuLy9UT0RPOiBtb2xzIG9yIG1vbHMgcGVyIG1eMj9cbi8qKlxudW5pdHM9bW9sc1xuZGVzY3JpcHRpb249J01vbnRobHkgUEFSIGluIG1vbHMgLyBtXjIgbW9udGgnXG5tb2xQQVJfTUogW21vbC9NSl0gaXMgYSBjb25zdGFudCBDb252ZXJzaW9uIG9mIHNvbGFyIHJhZGlhdGlvbiB0byBQQVJcbkBtZXRob2QgUEFSXG5AcGFyYW0gZGF0ZV9yYWRcbkBwYXJhbSBtb2xQQVJfTUpcbiovXG5tb2R1bGUuZXhwb3J0cy5QQVIgPSBmdW5jdGlvbihkYXRlX3JhZCwgZGF5cywgbW9sUEFSX01KKSB7XG4gIGlmKCBtb2xQQVJfTUogPT09IG51bGwgfHwgbW9sUEFSX01KID09PSB1bmRlZmluZWQgKSB7XG4gICAgbW9sUEFSX01KID0gY29uc3RhbnQoJ21vbFBBUl9NSicpO1xuICB9XG5cbiAgcmV0dXJuIGRhdGVfcmFkICogbW9sUEFSX01KICogZGF5cztcbn07XG5cbi8qKlxudW5pdHM9J21ldHJpYyB0b25zIERyeSBNYXR0ZXIvaGEnLFxuZGVzY3JpcHRpb249J21heGltdW0gcG90ZW50aWFsIFByaW1hcnkgUHJvZHVjdGlvbiBbdERNIC8gaGEgbW9udGhdLFxuTk9URTogMTAwMDAvMTBeNiBbaGEvbTJdW3REbS9nRE1dXG5nR01fbW9sIFtnL21vbF0gaXMgdGhlIG1vbGVjdWxhciB3ZWlnaHQgb2YgZHJ5IG1hdHRlclxuQG1ldGhvZCB4UFBcbkBwYXJhbSB5XG5AcGFyYW0gY3VyX1BBUlxuQHBhcmFtIGdETV9tb2xcbiovXG5tb2R1bGUuZXhwb3J0cy54UFAgPSBmdW5jdGlvbih5LCBjdXJfUEFSLCBnRE1fbW9sKXtcbiAgICBpZiggZ0RNX21vbCA9PT0gbnVsbCB8fCBnRE1fbW9sID09PSB1bmRlZmluZWQgKSB7XG4gICAgICBnRE1fbW9sID0gY29uc3RhbnQoJ2dETV9tb2wnKTtcbiAgICB9XG5cbiAgICByZXR1cm4geSAqIGN1cl9QQVIgKiBnRE1fbW9sIC8gMTAwO1xufTtcblxuLyoqKiBGVU5DVElPTlMgRk9SIENPUFBJQ0lORyAqL1xuLyoqXG5jb3BwaWNlIHJlbGF0ZWQgZnVuY3Rpb25zXG5AbWV0aG9kIGNvcHBpY2VcbiovXG5tb2R1bGUuZXhwb3J0cy5jb3BwaWNlID0ge1xuICAvLyBDb3BwaWNlIEZ1bmN0aW9ucyBhcmUgYmFzZWQgb24gRGlhbWV0ZXIgb24gU3R1bXAsIE5PVCBEQkguXG4gIC8vIENhbGN1bGF0ZXMgdGhlIHBmcyBiYXNlZCBvbiB0aGUgc3RlbSB3ZWlnaHQgaW4gS0dcbiAgcGZzIDogZnVuY3Rpb24oc3RlbSwgcCkge1xuICAgIHZhciBhdkRPQiA9IE1hdGgucG93KCAoIHN0ZW0gLyBwLnN0ZW1DbnQgLyBwLnN0ZW1DKSAsICgxIC8gcC5zdGVtUCkgKTtcbiAgICB2YXIgcHBmcz0gcC5wZnNDICogTWF0aC5wb3coYXZET0IgLCBwLnBmc1ApO1xuXG4gICAgcmV0dXJuIE1hdGgubWluKHAucGZzTXgscHBmcyk7XG4gIH0sXG5cbiAgLy8gQ2FsY3VsYXRlcyB0aGUgcGZzIGJhc2VkIG9uIHN0ZW0gd2l0aCBpbiBHLiAgVXNlcyB2b2x1bWUgSW5kZXggYXMgZ3VpZGVcbiAgcGZzX3ZpYV9WSSA6IGZ1bmN0aW9uIChzdGVtRywgd3NWSSwgbGFWSSwgU0xBKSB7XG4gICAgaWYgKHN0ZW1HIDwgMTApIHtcbiAgICAgIHN0ZW1HID0gMTA7XG4gICAgfVxuICAgIHZhciBWSSA9IE1hdGgucG93KCAoc3RlbUcgLyB3c1ZJLnN0ZW1zX3Blcl9zdHVtcCAvIHdzVkkuY29uc3RhbnQpLCgxIC8gd3NWSS5wb3dlcikgKTtcblxuICAgIC8vIEFkZCB1cCBmb3IgYWxsIHN0ZW1zXG4gICAgdmFyIGxhID0gbGFWSS5jb25zdGFudCAqIE1hdGgucG93KFZJLGxhVkkucG93ZXIpICogd3NWSS5zdGVtc19wZXJfc3R1bXA7XG4gICAgdmFyIHdmID0gMTAwMCAqIChsYSAvIFNMQSk7ICAvLyBGb2lsYWdlIFdlaWdodCBpbiBnO1xuICAgIHZhciBwZnMgPSB3Zi9zdGVtRztcbiAgICByZXR1cm4gcGZzO1xuICB9LFxuXG4gIFJvb3RQIDogZnVuY3Rpb24oY3VyX25wcCwgY3VyX25wcFRhcmdldCwgV1IsVyxwUngsZnJhYykge1xuICAgIHZhciBucHBSZXMgPSBjdXJfbnBwVGFyZ2V0IC0gY3VyX25wcDtcbiAgICB2YXIgcm9vdFBQO1xuICAgIGlmKCBucHBSZXMgPiAwICYmIFdSL1cgPiBwUnggKSB7XG4gICAgICAgIHJvb3RQUCA9IE1hdGgubWluKG5wcFJlcywgV1IqKFdSL1cgLSBwUngpKmZyYWMpO1xuICAgIH0gZWxzZSB7XG4gICAgICByb290UFAgPSAwO1xuICAgIH1cblxuICAgIHJldHVybiByb290UFA7XG4gIH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgcmVhZCA6IGZ1bmN0aW9uKG1vZGVsKSB7XG4gICAgLy8gVE9ETyA6IGltcGxlbWVudFxuICAgIC8vIFlvdSBuZWVkIHRvIHNldCB5b3VyIElPIGhlcmUgYW5kIG1ha2Ugc3VyZSBhbGwgcGFyYW1ldGVycyBmb3IgbW9kZWwgYXJlIGNvcnJlY3RseSBzZXRcbiAgfSxcbiAgZHVtcCA6IGZ1bmN0aW9uKCkge1xuICAgIC8vIFRPRE8gOiBpbXBsZW1lbnRcbiAgfVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGZuID0gcmVxdWlyZSgnLi9mbicpO1xudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xudmFyIGRhdGFNb2RlbCA9IHJlcXVpcmUoJy4vZGF0YU1vZGVsJyk7XG52YXIgdmFsaWRhdGUgPSByZXF1aXJlKCcuL3ZhbGlkYXRlJyk7XG5cbmZ1bmN0aW9uIHJ1bihsZW5ndGhPZkdyb3d0aCkge1xuXG4gICAgdmFyIHllYXJUb0NvcHBpY2U7IC8veWVhciBvZiB0aGUgZmlyc3Qgb3Igc3Vic2VxdWVudCBoYXJ2ZXN0c1xuICAgIHZhciBjb3BwaWNlSW50ZXJ2YWw7IC8vdGhlICMgb2YgbW9udGhzIGluIGEgc2luZ2xlIGNvcHBpY2UgY3ljbGVcbiAgICB2YXIgbW9udGhUb0NvcHBpY2U7IC8vYXQgd2hpY2ggbW9udGggdGhlIGhhcnZlc3QgaXMgdG8gYmUgcGVyZm9ybWVkIDo6IGN1cnJlbnRseSB0aGUgdHJlZSB3aWxsIGJlIGN1dCBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoYXQgbW9udGhcbiAgICB2YXIgY29wcGljZURhdGVzO1xuXG4gICAgLy8gaGVscGVyLCBub3QgcmVxdWlyZWQuICB5b3UgY2FuIHJlZ2lzdGVyIGNhbGxiYWNrIHRvIHNldCBwYXJhbWV0ZXJzIHdoZW5ldmVyIHJ1biBpcyBjYWxsZWRcbiAgICB0aGlzLmlvLnJlYWQodGhpcyk7XG5cbiAgICAvLyBtYWtlIHN1cmUgbW9kZWwgaW5wdXRzIGFyZSB2YWxpZCBiZWZvcmUgd2UgcHJvY2VlZCBhbnkgZnVydGhlclxuICAgIHZhbGlkYXRlKHRoaXMpO1xuXG4gICAgdGhpcy5jdXJyZW50RGF0ZSA9IG5ldyBEYXRlKHRoaXMubWFuYWdlLmRhdGVQbGFudGVkKTtcbiAgICAvL3ZhciBwbGFudGVkTW9udGggPSB0aGlzLmN1cnJlbnREYXRlLmdldE1vbnRoKCk7XG4gICAgLy92YXIgY3VycmVudE1vbnRoID0gdGhpcy5jdXJyZW50RGF0ZS5nZXRNb250aCgpO1xuXG4gICAgLy9UT0RPOiB0ZXN0IG5vIGRhdGVjb3BwaWNlIGFzIGlucHV0XG4gICAgaWYgKCB0aGlzLm1hbmFnZS5kYXRlQ29wcGljZWQgIT09IHVuZGVmaW5lZCApe1xuICAgICAgeWVhclRvQ29wcGljZSA9IHRoaXMubWFuYWdlLmRhdGVDb3BwaWNlZC5nZXRGdWxsWWVhcigpO1xuICAgICAgbW9udGhUb0NvcHBpY2UgPSB0aGlzLm1hbmFnZS5kYXRlQ29wcGljZWQuZ2V0TW9udGgoKTtcbiAgICAgIGNvcHBpY2VJbnRlcnZhbCA9IHRoaXMubWFuYWdlLnllYXJzUGVyQ29wcGljZTtcbiAgICB9XG5cbiAgICBpZiggdGhpcy5tYW5hZ2UuY29wcGljZURhdGVzICE9PSB1bmRlZmluZWQgKSB7XG4gICAgICBjb3BwaWNlRGF0ZXMgPSBbXTtcblxuICAgICAgZm9yKCB2YXIgaSA9IDA7IGkgPCB0aGlzLm1hbmFnZS5jb3BwaWNlRGF0ZXMubGVuZ3RoOyBpKysgKSB7XG4gICAgICAgIHZhciBwYXJ0cyA9IHRoaXMubWFuYWdlLmNvcHBpY2VEYXRlc1tpXS5zcGxpdCgnLScpO1xuXG4gICAgICAgIHZhciBkID0gMTU7XG4gICAgICAgIGlmKCBwYXJ0cy5sZW5ndGggPiAyICkge1xuICAgICAgICAgIGQgPSBwYXJzZUludChwYXJ0c1syXSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb3BwaWNlRGF0ZXMucHVzaChuZXcgRGF0ZShwYXJzZUludChwYXJ0c1swXSksIHBhcnNlSW50KHBhcnRzWzFdKS0xLCBkKSk7XG4gICAgICB9XG4gICAgfVxuXG5cbiAgICAvLyBpbml0IG1hbmFnZSBuc1xuICAgIHRoaXMubWFuYWdlLmNvcHBpY2UgPSBmYWxzZTtcblxuICAgIGlmKCB0aGlzLmRlYnVnICkge1xuICAgICAgY29uc29sZS5sb2codGhpcy5jdXJyZW50RGF0ZSk7XG4gICAgfVxuXG4gICAgdmFyIHNldHVwID0ge1xuICAgICAgbGVuZ3RoT2ZHcm93dGggOiBsZW5ndGhPZkdyb3d0aCxcbiAgICAgIHllYXJUb0NvcHBpY2UgOiB5ZWFyVG9Db3BwaWNlLFxuICAgICAgbW9udGhUb0NvcHBpY2UgOiBtb250aFRvQ29wcGljZSxcbiAgICAgIGNvcHBpY2VJbnRlcnZhbCA6IGNvcHBpY2VJbnRlcnZhbCxcbiAgICAgIGNvcHBpY2VEYXRlcyA6IGNvcHBpY2VEYXRlc1xuICAgIH07XG5cbiAgICByZXR1cm4gdGhpcy5ydW5TZXR1cChzZXR1cCk7XG59XG5cbmZ1bmN0aW9uIHJ1blNldHVwKHNldHVwKXtcbiAgICB2YXIgaSwga2V5LCBjdXJyZW50V2VhdGhlciwgc3RlcCwgdDtcblxuICAgIHZhciBkYXlzX2luX2ludGVydmFsID0gKHRoaXMuc2V0dXAgJiYgdGhpcy5zZXR1cC5kYXlzX2luX2ludGVydmFsKSA/IHRoaXMuc2V0dXAuZGF5c19pbl9pbnRlcnZhbCA6IDE7XG5cbiAgICBpZiggdGhpcy5kZWJ1ZyApIHtcbiAgICAgIHQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgIGNvbnNvbGUubG9nKCdkYXlzX2luX2ludGVydmFsOiAnKyBkYXlzX2luX2ludGVydmFsKTtcbiAgICB9XG5cbiAgICB2YXIgbSA9ICh0aGlzLmN1cnJlbnREYXRlLmdldE1vbnRoKCkrMSkrJyc7XG4gICAgaWYoIG0ubGVuZ3RoID09PSAxICkge1xuICAgICAgbSA9ICcwJyttO1xuICAgIH1cblxuICAgIHZhciBkID0gKHRoaXMuY3VycmVudERhdGUuZ2V0RGF0ZSgpKSsnJztcbiAgICBpZiggZC5sZW5ndGggPT09IDEgKSB7XG4gICAgICBkID0gJzAnK2Q7XG4gICAgfVxuXG4gICAgLy92YXIgY3VycmVudFdlYXRoZXIgPSBnZXRXZWF0aGVyKHRoaXMsIHNldHVwLCBtLCBkKTtcbiAgICB2YXIgZmlyc3RTdGVwUmVzdWx0cyA9IGluaXQodGhpcy5wbGFudGF0aW9uLCB0aGlzLnNvaWwpO1xuXG4gICAgdmFyIGtleXNJbk9yZGVyID0gW107XG4gICAgdmFyIGhlYWRlciA9IFsnZGF0ZSddO1xuICAgIGZvcigga2V5IGluIGRhdGFNb2RlbC5wbGFudGF0aW9uX3N0YXRlLnZhbHVlICkge1xuICAgICAga2V5c0luT3JkZXIucHVzaChrZXkpO1xuICAgICAgaGVhZGVyLnB1c2goa2V5KTtcbiAgICB9XG5cbiAgICBmaXJzdFN0ZXBSZXN1bHRzLkRhdGUgPSB0aGlzLmN1cnJlbnREYXRlLmdldEZ1bGxZZWFyKCkrJy0nK20rJy0nK2Q7XG5cbiAgICB2YXIgcm93cyA9IFtdOyAvL3RoZXNlIHdpbGwgYmVjb21lIHJvd3NcbiAgICByb3dzLnB1c2goaGVhZGVyKTtcblxuICAgIHZhciBmaXJzdFJvdyA9IFtmaXJzdFN0ZXBSZXN1bHRzLkRhdGVdO1xuICAgIGZvciggaSA9IDA7IGkgPCBrZXlzSW5PcmRlci5sZW5ndGg7IGkrKyl7XG4gICAgICBrZXkgPSBrZXlzSW5PcmRlcltpXTtcbiAgICAgIGZpcnN0Um93LnB1c2goZmlyc3RTdGVwUmVzdWx0c1trZXldKTtcbiAgICB9XG4gICAgcm93cy5wdXNoKGZpcnN0Um93KTtcblxuICAgIHZhciBjdXJyZW50U3RlcFJlc3VsdHMgPSBmaXJzdFN0ZXBSZXN1bHRzO1xuICAgIHZhciBuZXh0U3RlcFJlc3VsdHM7XG5cbiAgICBmb3Ioc3RlcCA9IDE7IHN0ZXAgPCBzZXR1cC5sZW5ndGhPZkdyb3d0aDsgc3RlcCsrKSB7XG4gICAgICB0aGlzLmN1cnJlbnREYXRlID0gbmV3IERhdGUodGhpcy5tYW5hZ2UuZGF0ZVBsYW50ZWQpO1xuICAgICAgdGhpcy5jdXJyZW50RGF0ZS5zZXREYXRlKHRoaXMubWFuYWdlLmRhdGVQbGFudGVkLmdldERhdGUoKSArIHN0ZXAgKiBkYXlzX2luX2ludGVydmFsKTsgLy8gYWRkIGEgZGF5IHRvIGN1cnJlbnQgZGF0ZVxuLy8gICAgICB0aGlzLmN1cnJlbnREYXRlLnNldERhdGUodGhpcy5tYW5hZ2UuZGF0ZVBsYW50ZWQuZ2V0RGF0ZSgpICsgc3RlcCpzZXR1cC5kYXlzX2luX2ludGVydmFsKTsgLy8gYWRkIGEgZGF5IHRvIGN1cnJlbnQgZGF0ZVxuXG4gICAgICBpZiggc2hvdWxkQ29wcGljZSh0aGlzLCBzZXR1cCwgZGF5c19pbl9pbnRlcnZhbCkgKSB7XG4gICAgICAgIGlmKCB0aGlzLmRlYnVnICkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdUaW1lIHRvIENvcHBpY2UhJyk7XG4gICAgICAgICAgY29uc29sZS5sb2codGhpcy5jdXJyZW50RGF0ZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm1hbmFnZS5jb3BwaWNlID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubWFuYWdlLmNvcHBpY2UgPSBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgbSA9ICh0aGlzLmN1cnJlbnREYXRlLmdldE1vbnRoKCkrMSkrJyc7XG4gICAgICBpZiggbS5sZW5ndGggPT09IDEgKSB7XG4gICAgICAgIG0gPSAnMCcrbTtcbiAgICAgIH1cblxuICAgICAgZCA9IHRoaXMuY3VycmVudERhdGUuZ2V0RGF0ZSgpKycnO1xuICAgICAgaWYoIGQubGVuZ3RoID09PSAxICkge1xuICAgICAgICBkID0gJzAnK2Q7XG4gICAgICB9XG5cbiAgICAgIGN1cnJlbnRXZWF0aGVyID0gZ2V0V2VhdGhlcih0aGlzLCBzZXR1cCwgbSwgZCk7XG5cbiAgICAgIC8vVE9ETzogc3dpdGNoIHVwIHRyZWVzIGhlcmUgd2hlbiBhZnRlciB0aGUgZmlyc3QgaGFydmVzdFxuICAgICAgbmV4dFN0ZXBSZXN1bHRzID0gc2luZ2xlU3RlcCh0aGlzLnBsYW50YXRpb24sIHRoaXMuc29pbCwgY3VycmVudFdlYXRoZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFuYWdlLCBjdXJyZW50U3RlcFJlc3VsdHMsIGRheXNfaW5faW50ZXJ2YWwpO1xuICAgICAgbmV4dFN0ZXBSZXN1bHRzLkRhdGUgPSB0aGlzLmN1cnJlbnREYXRlLmdldEZ1bGxZZWFyKCkrJy0nK20rJy0nK2Q7XG5cbiAgICAgIHZhciB0aGlzUm93ID0gW25leHRTdGVwUmVzdWx0cy5EYXRlXTtcbiAgICAgIGZvciggaSA9IDA7IGkgPCBrZXlzSW5PcmRlci5sZW5ndGg7IGkrKykge1xuICAgICAgICBrZXkgPSBrZXlzSW5PcmRlcltpXTtcbiAgICAgICAgdGhpc1Jvdy5wdXNoKG5leHRTdGVwUmVzdWx0c1trZXldKTtcbiAgICAgIH1cblxuICAgICAgY3VycmVudFN0ZXBSZXN1bHRzID0gbmV4dFN0ZXBSZXN1bHRzO1xuICAgICAgcm93cy5wdXNoKHRoaXNSb3cpO1xuICAgIH1cblxuICAgIHRoaXMuaW8uZHVtcChyb3dzKTtcblxuICAgIGlmKCB0aGlzLmRlYnVnICkge1xuICAgICAgY29uc29sZS5sb2coc3RlcCk7XG4gICAgICBjb25zb2xlLmxvZyh0aGlzLmN1cnJlbnREYXRlKTtcbiAgICAgIGNvbnNvbGUubG9nKChuZXcgRGF0ZSgpLmdldFRpbWUoKS10KSsnbXMnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcm93cztcbn1cblxuZnVuY3Rpb24gc2luZ2xlU3RlcChwbGFudGF0aW9uLCBzb2lsLCB3ZWF0aGVyLCBtYW5hZ2UsIHAsIGRheXNfaW5faW50ZXJ2YWwpIHsgLy9wID0gcHJldmlvdXMgc3RhdGVcbiAgdmFyIGMgPSB7fTsgLy9jdXJyZW50IHN0YXRlXG5cbiAgaWYoIG1hbmFnZS5jb3BwaWNlID09PSB0cnVlICkgeyAvL2NoYW5nZSB0aGlzIGd1eSBmb3IgdGhlIG1vbnRoIHdoZW4gY29wcGljZVxuICAgIC8vIEFkZCBpbiBhIHN0dW1wIG1hcmdpbi4uLi5cbiAgICBjLmZlZWRzdG9ja0hhcnZlc3QgPSBwLmZlZWRzdG9ja0hhcnZlc3QgKyBwLldTO1xuICAgIGMuY29wcGljZUNvdW50ID0gcC5jb3BwaWNlQ291bnQgKyAxO1xuICAgIGMuY29wcGljZUFnZSA9IDA7XG4gICAgcC5MQUkgPSAwO1xuICAgIHAuV1MgPSAwO1xuICAgIHAuV0YgPSAwO1xuICAgIHAuVyA9IHAuV1I7XG4gIH0gZWxzZSB7XG4gICAgYy5mZWVkc3RvY2tIYXJ2ZXN0ID0gcC5mZWVkc3RvY2tIYXJ2ZXN0O1xuICAgIGMuY29wcGljZUNvdW50ID0gcC5jb3BwaWNlQ291bnQ7XG4gICAgYy5jb3BwaWNlQWdlID0gcC5jb3BwaWNlQWdlICsgZGF5c19pbl9pbnRlcnZhbC8zNjUuMDtcbiAgfVxuXG4gIHZhciB0cmVlOyAvL3RyZWVcbiAgaWYoIGMuY29wcGljZUNvdW50ID09PSAwICkgeyAvL1RPRE86IGNoZWNrIHRoZSBjYXNlIHdoZXJlIHdlIHN0YXJ0IHdpdGggYSBjb3BwaWNlZCBtdWx0aSBzdHVtcCB0cmVlXG4gICAgICB0cmVlID0gcGxhbnRhdGlvbi5zZWVkbGluZ1RyZWU7XG4gIH0gZWxzZSB7XG4gICAgICB0cmVlID0gcGxhbnRhdGlvbi5jb3BwaWNlZFRyZWU7XG4gIH1cblxuICBjLlN0YW5kQWdlID0gcC5TdGFuZEFnZSArIGRheXNfaW5faW50ZXJ2YWwvMzY1LjA7XG4gIHZhciBzbGEgPSBmbi50ZHAocC5TdGFuZEFnZSwgdHJlZS5TTEEpO1xuICBjLkxBSSA9IHAuV0YgKiAwLjEgKiBzbGE7IC8vIExhbmRzYnVyZyBlcSA5LjVcblxuICAvLyBKTSAtIFBlciBzZWN0aW9uIDIuMSAgTGFuZHNiZXJnL1dhcmluZ1xuICBjLlZQRCA9IGZuLlZQRCh3ZWF0aGVyLnRtaW4sIHdlYXRoZXIudG1heCwgd2VhdGhlci50ZG1lYW4pO1xuICAvL2MuVlBEID0gZm4uVlBEKHdlYXRoZXIudG1pbiwgd2VhdGhlci50bWF4LCB3ZWF0aGVyLnRkbWVhbiwgZGF5c19pbl9pbnRlcnZhbCk7XG5cblxuICBjLmZWUEQgPSBmbi5mVlBEKHRyZWUua0csIGMuVlBEKTtcblxuICBjLmZTVyA9IGZuLmZTVyhwLkFTVywgc29pbC5tYXhBV1MsIHNvaWwuc3djb25zdCwgc29pbC5zd3Bvd2VyKTtcbiAgYy5mQWdlID0gZm4udGRwKHAuU3RhbmRBZ2UsIHRyZWUuZkFnZSk7XG5cbiAgLy8gZkZyb3N0IGlzIGEgY3VtdWxhdGl2ZSBOb3JtYWwgZGlzdHJpYnV0aW9uLCB0aGF0IGFwcHJvaXhtYXRlcyB0aGUgbnVtYmVyIG9mIGRheXMgKG9yIHBhcnRzIG9mIGRheXMpIHRoYXRcbiAgLy8gd2lsbCBiZSBiZWxvdyAwLCBnaXZlbiBhIG1pbmltdW0gdGVtcGVyYXR1cmVcbiAgYy5mRnJvc3QgPSBmbi5mRnJvc3Qod2VhdGhlci50bWluKTtcblxuICBjLlBBUiA9IGZuLlBBUih3ZWF0aGVyLnJhZCwgZGF5c19pbl9pbnRlcnZhbCk7IC8vICBQQVIgaW4gbW9sc1xuXG4gIGMuZlQgPSBmbi5mVCgod2VhdGhlci50bWluICsgd2VhdGhlci50bWF4KS8yLCB0cmVlLmZUKTtcblxuICBjLlBoeXNNb2QgPSBmbi5QaHlzTW9kKGMuZlZQRCwgYy5mU1csIGMuZkFnZSk7XG4gIGMuZk51dHIgPSBmbi5mTnV0cih0cmVlLmZOMCwgbWFuYWdlLmZlcnRpbGl0eSk7XG4gIGMueFBQID0gZm4ueFBQKHRyZWUueSwgYy5QQVIpOyAvLyBtYXhpbXVtIHBvdGVudGlhbCBQcmltYXJ5IFByb2R1Y3Rpb24gcGVyIG1vbnRoXG4gIGMuTlBQID0gZm4uTlBQKHAuY29wcGljZUFnZSwgdHJlZS5mdWxsQ2FuQWdlLCBjLnhQUCwgdHJlZS5rLCBwLkxBSSwgYy5mVlBELCBjLmZTVywgYy5mQWdlLCB0cmVlLmFscGhhLCBjLmZOdXRyLCBjLmZULCBjLmZGcm9zdCk7XG5cbiAgdmFyIE5QUF90YXJnZXQgPSBmbi5OUFAodHJlZS5mdWxsQ2FuQWdlLCB0cmVlLmZ1bGxDYW5BZ2UsIGMueFBQLCB0cmVlLmssIHRyZWUucm9vdFAuTEFJVGFyZ2V0LCBjLmZWUEQsIGMuZlNXLCBjLmZBZ2UsIHRyZWUuYWxwaGEsIGMuZk51dHIsIGMuZlQsIGMuZkZyb3N0KTtcbi8vIEpNXG4gIGMuUm9vdFAgPSBmbi5jb3BwaWNlLlJvb3RQKGMuTlBQLCBOUFBfdGFyZ2V0LCBwLldSLCBwLlcsIHRyZWUucFIubXgsIHRyZWUucm9vdFAuZnJhYyAqIChkYXlzX2luX2ludGVydmFsIC8gMzAuNCkpO1xuXG4gIGlmICh0cmVlLmxhVkkgJiYgdHJlZS5sYVZJLmNvbnN0YW50ICkgeyAvLyBUZXN0IGZvciB0aGF0IGZ1bmN0aW9uXG4gICAgYy5wZnMgPSBmbi5jb3BwaWNlLnBmc192aWFfVkkocC5XUyoxMDAwMDAwL3BsYW50YXRpb24uU3RvY2tpbmdEZW5zaXR5LCB0cmVlLndzVkksdHJlZS5sYVZJLHNsYSk7XG4gIH0gZWxzZSB7XG4gICAgYy5wZnMgPSBmbi5jb3BwaWNlLnBmcyhwLldTKjEwMDAvcGxhbnRhdGlvbi5TdG9ja2luZ0RlbnNpdHksIHRyZWUucGZzKTtcbiAgfVxuXG4gIGMuZFcgPSBjLk5QUCArIHRyZWUucm9vdFAuZWZmaWNpZW5jeSAqIGMuUm9vdFA7XG5cbiAgYy5JbnRjcHRuID0gZm4uSW50Y3B0bihjLkxBSSwgdHJlZS5JbnRjcHRuKTtcbiAgYy5DYW5Db25kID0gZm4uQ2FuQ29uZChjLlBoeXNNb2QsIGMuTEFJLCB0cmVlLkNvbmR1Y3RhbmNlKTtcblxuICBjLnBSID0gZm4ucFIoYy5QaHlzTW9kLCBwLldSL3AuVywgbWFuYWdlLmZlcnRpbGl0eSwgdHJlZS5wUik7XG5cbiAgLy8gSk0gLSB0cmVlIGxpdHRlcmZhbGwgaXMgYSBtb250aGx5IHBhcmFtZXRlci5cbiAgYy5saXR0ZXJmYWxsID0gZm4udGRwKHAuU3RhbmRBZ2UsIHRyZWUubGl0dGVyZmFsbCkgKiAoZGF5c19pbl9pbnRlcnZhbCAvIDMwLjQpO1xuXG4gIGMuVHJhbnNwID0gZm4uVHJhbnNwKHdlYXRoZXIucmFkLCBkYXlzX2luX2ludGVydmFsLCB3ZWF0aGVyLmRheWxpZ2h0LCBjLlZQRCwgdHJlZS5CTGNvbmQsIGMuQ2FuQ29uZCk7XG4gIGMuRVRyID0gZm4uRVRyKHdlYXRoZXIucmFkLCB3ZWF0aGVyLnRtaW4sIHdlYXRoZXIudG1heCwgd2VhdGhlci50ZG1lYW4sIGRheXNfaW5faW50ZXJ2YWwpO1xuICBjLktjID0gYy5UcmFuc3AvYy5FVHI7XG5cblxuICAvLyBDYWxjdWxhdGVkIGZyb20gcGZzXG4gIGMucFMgPSAoMSAtIGMucFIpIC8gKDEgKyBjLnBmcyApO1xuICBjLnBGID0gKDEgLSBjLnBSKSAvICgxICsgMS9jLnBmcyApO1xuXG4gIGMuSXJyaWcgPSBmbi5JcnJpZyhtYW5hZ2UuaXJyaWdGcmFjLCBjLlRyYW5zcCwgYy5JbnRjcHRuLCB3ZWF0aGVyLnBwdCk7XG4gIGMuQ3VtSXJyaWcgPSBwLkN1bUlycmlnICsgYy5JcnJpZztcblxuICBjLkFTVyA9IGZuLkFTVyhzb2lsLm1heEFXUywgcC5BU1csIHdlYXRoZXIucHB0LCBjLlRyYW5zcCwgYy5JbnRjcHRuLCBjLklycmlnKTsgLy9mb3Igc29tZSByZWFzb24gc3BlbGxlZCBtYXhBV1NcblxuICBjLldGID0gcC5XRiArIGMuZFcgKiBjLnBGIC0gYy5saXR0ZXJmYWxsICogcC5XRjtcbiAgLy8gSW5jbHVkZSBjb250cmlidXRpb24gb2YgUm9vdFAgLy8gRXJyb3IgaW4gb2xkIGNvZGUgIVxuICBjLldSID0gcC5XUiArIGMuZFcgKiBjLnBSIC0gKHRyZWUucFIudHVybm92ZXIgKiAoZGF5c19pbl9pbnRlcnZhbCAvIDMwLjQpKSAqIHAuV1IgLSBjLlJvb3RQO1xuICBjLldTID0gcC5XUyArIGMuZFcgKiBjLnBTO1xuICBjLlcgPSBjLldGK2MuV1IrYy5XUztcblxuICByZXR1cm4gYztcbn1cblxuZnVuY3Rpb24gaW5pdChwbGFudGF0aW9uLCBzb2lsKSB7XG4gIHZhciBwID0ge307XG4gIHZhciB0cmVlID0gcGxhbnRhdGlvbi5zZWVkbGluZ1RyZWU7IC8vVE9ETzogZGVjaWRlIHRoZSBjYXNlIHdoZXJlIHdlIHN0YXJ0IHdpdGggYSBjb3BwaWNlZCB0cmVlP1xuXG4gIHAuZmVlZHN0b2NrSGFydmVzdD0wO1xuICBwLmNvcHBpY2VDb3VudD0wO1xuICBwLmNvcHBpY2VBZ2UgPSAwO1xuXG4gIHAuQ3VtSXJyaWcgPSAwO1xuICBwLmRXID0gMDtcbiAgcC5XID0gcGxhbnRhdGlvbi5TdG9ja2luZ0RlbnNpdHkgKiBwbGFudGF0aW9uLlNlZWRsaW5nTWFzcztcbiAgcC5XRiA9IHBsYW50YXRpb24ucEYgKiBwLlc7XG4gIHAuV1MgPSBwbGFudGF0aW9uLnBTICogcC5XO1xuICBwLldSID0gcGxhbnRhdGlvbi5wUiAqIHAuVztcbiAgcC5BU1cgPSAwLjggKiAxMCAqIHNvaWwubWF4QVdTOyAvLyBUaGUgMTAgaXMgYmVjYXVzZSBtYXhBV1MgaXMgaW4gY20gYW5kIEFTVyBpbiBtbSAoPykgV2h5ICg/KVxuICBwLlN0YW5kQWdlID0gMDtcblxuICB0cmVlID0gcGxhbnRhdGlvbi5zZWVkbGluZ1RyZWU7XG5cbiAgLy8gc2xhID0gU3BlY2lmaWMgTGVhZiBBcmVhXG4gIHZhciBzbGEgPSBmbi50ZHAocC5TdGFuZEFnZSx0cmVlLlNMQSk7XG5cbiAgcC5MQUkgPSBwLldGICogMC4xICogc2xhOyAvLyBMYW5kc2J1cmcgZXEgOS41XG5cbiAgLy8gVGhlc2UgYXJlbid0IHVzZWQgc28gY2FuIGJlIHNldCB0byBhbnl0aGluZzsgIFRoZXkgYXJlIHNldCB0byBtYXRjaCB0aGUgcG9zdGdyZXMgdHlwZVxuICBwLlZQRCAgICAgICAgPSAwO1xuICBwLmZWUEQgICAgICAgPSAwO1xuICBwLmZUICAgICAgICAgPSAwO1xuICBwLmZGcm9zdCAgICAgPSAwO1xuICBwLmZOdXRyICAgICAgPSAwO1xuICBwLmZTVyAgICAgICAgPSAwO1xuICBwLmZBZ2UgICAgICAgPSAwO1xuICBwLlBBUiAgICAgICAgPSAwO1xuICBwLnhQUCAgICAgICAgPSAwO1xuICBwLkludGNwdG4gICAgPSAwO1xuICBwLklycmlnICAgICAgPSAwO1xuICBwLkNhbkNvbmQgICAgPSAwO1xuICBwLlRyYW5zcCAgICAgPSAwO1xuICBwLlBoeXNNb2QgICAgPSAwO1xuICBwLnBmcyAgICAgICAgPSAwO1xuICBwLnBSICAgICAgICAgPSAwO1xuICBwLnBTICAgICAgICAgPSAwO1xuICBwLnBGICAgICAgICAgPSAwO1xuICBwLmxpdHRlcmZhbGwgPSAwO1xuICBwLk5QUCAgICAgICAgPSAwO1xuICBwLlJvb3RQICAgICAgPSAwO1xuXG4gIHJldHVybiBwO1xufVxuXG4vLyBUaGlzIGFjdHVhbGx5IG5lZWQgdG8gd29yayBiZXR0ZXIuICBJZiB0aGUgd2VhdGhlciBkb2Vzbid0IG1hdGNoXG4vLyB0aGUgc3RlcHMsIHdlIG5lZWQgdG8gZmluZCB0aGUgY2xvc2VzdCB2YWx1ZSB0byB3aGF0IHdlIGFyZSBsb29raW5nIGZvclxuZnVuY3Rpb24gZ2V0V2VhdGhlcihtb2RlbCwgc2V0dXAsIG1vbnRoLCBkYXkpIHtcblxuICAgIGlmKCBtb2RlbC53ZWF0aGVyW21vZGVsLmN1cnJlbnREYXRlLmdldEZ1bGxZZWFyKCkrJy0nK21vbnRoKyctJytkYXldICE9PSB1bmRlZmluZWQgKSB7XG4gICAgICByZXR1cm4gbW9kZWwud2VhdGhlclttb2RlbC5jdXJyZW50RGF0ZS5nZXRGdWxsWWVhcigpKyctJyttb250aCsnLScrZGF5XTtcbiAgICB9XG5cbiAgICAvLyBtb2RlbGxlZCBkYWlseVxuICAgIGlmKCBtb2RlbC53ZWF0aGVyW21vbnRoKyctJytkYXldICE9PSB1bmRlZmluZWQgKSB7XG4gICAgICByZXR1cm4gbW9kZWwud2VhdGhlclttb250aCsnLScrZGF5XTtcbiAgICB9XG5cbiAgICAvLyBhY3R1YWxcbiAgICBpZiggbW9kZWwud2VhdGhlclttb2RlbC5jdXJyZW50RGF0ZS5nZXRGdWxsWWVhcigpKyctJyttb250aF0gIT09IHVuZGVmaW5lZCApIHtcbiAgICAgIHJldHVybiBtb2RlbC53ZWF0aGVyW21vZGVsLmN1cnJlbnREYXRlLmdldEZ1bGxZZWFyKCkrJy0nK21vbnRoXTtcbiAgICB9XG5cbiAgLy8gbW9kZWxsZWQgTW9udGhseVxuICBpZiggbW9kZWwud2VhdGhlclttb250aF0gIT09IHVuZGVmaW5lZCApIHtcbiAgICByZXR1cm4gbW9kZWwud2VhdGhlclttb250aF07XG4gIH1cblxuICB0aHJvdyAnUnVudGltZSBFcnJvcjogbm8gd2VhdGhlciBmb3VuZCBmb3IgbW9udGg6ICcrbW9udGg7XG59XG5cbmZ1bmN0aW9uIHNob3VsZENvcHBpY2UobW9kZWwsIHNldHVwLCBkYXlzX2luX2ludGVydmFsKSB7XG4gIHZhciBuZXh0O1xuICB2YXIgY29wcGljZV9vbjtcbiAgLy8gZG8gd2UgaGF2ZSBzcGVjaWZpYyBjb3BwaWNlIGRhdGVzIHNldD9cbiAgaWYoIHNldHVwLmNvcHBpY2VEYXRlcyApIHtcblxuICAgIGZvciggdmFyIGkgPSAwOyBpIDwgc2V0dXAuY29wcGljZURhdGVzLmxlbmd0aDsgaSsrICkge1xuICAgICAgdmFyIGQgPSBzZXR1cC5jb3BwaWNlRGF0ZXNbaV07XG5cbiAgICAgIGlmIChtb2RlbC5jdXJyZW50RGF0ZSA8IGQpIHtcbiAgICAgICAgbmV4dCA9IG1vZGVsLmN1cnJlbnREYXRlO1xuICAgICAgICBuZXh0LnNldERhdGUobmV4dC5nZXREYXRlICsgZGF5c19pbl9pbnRlcnZhbCk7XG4gICAgICAgIGlmICggZCA8IG5leHQpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBjb3BwaWNlX29uID0gbmV3IERhdGUoKTtcbiAgICBjb3BwaWNlX29uLnNldFllYXIoc2V0dXAueWVhclRvQ29wcGljZSk7XG4gICAgY29wcGljZV9vbi5zZXRNb250aChzZXR1cC5tb250aFRvQ29wcGljZSk7XG4gICAgY29wcGljZV9vbi5zZXREYXRlKDE1KTtcblxuICAgIGlmKCBtb2RlbC5jdXJyZW50RGF0ZS5nZXRUaW1lKCkgPCBjb3BwaWNlX29uLmdldFRpbWUoKSApIHtcbiAgICAgIG5leHQgPSBuZXcgRGF0ZShtb2RlbC5jdXJyZW50RGF0ZSk7XG4gICAgICBuZXh0LnNldERhdGUobW9kZWwuY3VycmVudERhdGUuZ2V0RGF0ZSgpICsgZGF5c19pbl9pbnRlcnZhbCk7XG5cbiAgICAgIGlmICggY29wcGljZV9vbi5nZXRUaW1lKCkgPCBuZXh0LmdldFRpbWUoKSkge1xuICAgICAgICBzZXR1cC55ZWFyVG9Db3BwaWNlID0gc2V0dXAueWVhclRvQ29wcGljZSArIHNldHVwLmNvcHBpY2VJbnRlcnZhbDtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gZ2V0RnVuY3Rpb24obmFtZSkge1xuICBpZiggZm5bbmFtZV0gKSB7XG4gICAgcmV0dXJuIGZuW25hbWVdO1xuICB9IGVsc2UgaWYoIGZuLmNvcHBpY2VbbmFtZV0gKSB7XG4gICAgcmV0dXJuIGZuLmNvcHBpY2VbbmFtZV07XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaW8pIHtcbiAgcmV0dXJuIHtcbiAgICBpbyA6IGlvLFxuICAgIHJ1biA6IHJ1bixcbiAgICBzaW5nbGVTdGVwIDogc2luZ2xlU3RlcCxcbiAgICBydW5TZXR1cCA6IHJ1blNldHVwLFxuICAgIGluaXQgOiBpbml0LFxuICAgIGdldEZ1bmN0aW9uIDogZ2V0RnVuY3Rpb24sXG4gICAgc2V0SU8gOiBmdW5jdGlvbihpbykge1xuICAgICAgdGhpcy5pbyA9IGlvO1xuICAgIH0sXG4gICAgZ2V0RGF0YU1vZGVsIDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gZGF0YU1vZGVsO1xuICAgIH1cbiAgfTtcbn07XG4iLCJmdW5jdGlvbiBlbnYoKSB7XG4gIGlmKCB0eXBlb2YgcGx2OCAhPT0gJ3VuZGVmaW5lZCcgKSByZXR1cm4gXCJwbHY4XCI7XG4gIGlmKCB0eXBlb2YgTG9nZ2VyICE9PSAndW5kZWZpbmVkJyApIHJldHVybiBcImFwcHNjcmlwdFwiO1xuICBpZiggdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHJldHVybiBcIm5vZGVcIjtcbn1cblxuZnVuY3Rpb24gbG9nKG1zZykge1xuICB2YXIgZSA9IGVudigpO1xuICBpZiggZSA9PSBcInBsdjhcIiApIHBsdjguZWxvZyhOT1RJQ0UsICdub3RpY2UnLCBtc2cpO1xuICBlbHNlIGlmKCBlID09IFwiYXBwc2NyaXB0XCIgKSBMb2dnZXIubG9nKG1zZyk7XG4gIGVsc2UgY29uc29sZS5sb2cobXNnKTtcbn1cblxuZnVuY3Rpb24gY2xvbmUob2JqKSB7XG4gIGlmIChudWxsID09IG9iaiB8fCBcIm9iamVjdFwiICE9IHR5cGVvZiBvYmopIHJldHVybiBvYmo7XG4gIHZhciBjb3B5ID0gb2JqLmNvbnN0cnVjdG9yKCk7XG4gIGZvciAodmFyIGF0dHIgaW4gb2JqKSB7XG4gICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShhdHRyKSkgY29weVthdHRyXSA9IG9ialthdHRyXTtcbiAgfVxuICByZXR1cm4gY29weTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGVudiA6IGVudixcbiAgbG9nIDogbG9nLFxuICBjbG9uZSA6IGNsb25lXG59XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qXG4gKiBWYWxpZGF0ZSBhIG1vZGVsIHJ1biBzZXR1cC4gIHRocm93IGVycm9yIGlzIGJhZG5lc3MuXG4gKi9cbnZhciBkYXRhTW9kZWwgPSByZXF1aXJlKCcuL2RhdGFNb2RlbCcpO1xudmFyIHBhcmFtRXJyb3IgPSAnVmFsaWRhdGlvbiBFcnJvcjogJztcblxudmFyIHZhbGlkV2VhdGhlcktleXMgPSBbXG4gIC9eXFxkXFxkXFxkXFxkLVxcZFxcZCQvLCAvLyBzcGVjaWZpYyB3ZWF0aGVyIFlZWVktTU0gZm9yIG1vbnRobHkgdGltZXN0ZXBcbiAgL15cXGRcXGQkLywgLy8gbW9kZWxsZWQgb3IgYXZlcmFnZSB3ZWF0aGVyIE1NIGZvciBtb250aGx5IHRpbWVzdGVwXG4gIC9eXFxkXFxkXFxkXFxkLVxcZFxcZC1cXGRcXGQkLywgLy8gc3BlY2lmaWMgd2VhdGhlciBZWVlZLU1NLUREIGZvciBkYWlseSB0aW1lc3RlcFxuICAvXlxcZFxcZC1cXGRcXGQkLyAvLyBtb2RlbGxlZCBvciBhdmVyYWdlIHdlYXRoZXIgTU0tREQgZm9yIGRhaWx5IHRpbWVzdGVwXG5dO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG1vZGVsKSB7XG4gIHZhbGlkYXRlUGxhbnRhdGlvbihtb2RlbCk7XG4gIHZhbGlkYXRlTWFuYWdlKG1vZGVsKTtcbiAgdmFsaWRhdGVXZWF0aGVyKG1vZGVsKTtcbiAgdmFsaWRhdGVTb2lsKG1vZGVsKTtcbn07XG5cbmZ1bmN0aW9uIHZhbGlkYXRlTWFuYWdlKG1vZGVsKSB7XG4gIGlmKCAhbW9kZWwubWFuYWdlICkge1xuICAgIHRocm93IHBhcmFtRXJyb3IrJ21hbmFnZSBpcyBub3QgZGVmaW5pZWQnO1xuICB9XG5cbiAgdmFsaWRhdGVNb2RlbChkYXRhTW9kZWwubWFuYWdlLCBtb2RlbC5tYW5hZ2UsICdtYW5hZ2UnKTtcblxuICBpZiggbW9kZWwubWFuYWdlLmNvcHBpY2VEYXRlcyApIHtcbiAgICBpZiggIUFycmF5LmlzQXJyYXkobW9kZWwubWFuYWdlLmNvcHBpY2VEYXRlcykgKSB7XG4gICAgICB0aHJvdyBwYXJhbUVycm9yKydtYW5hZ2UuY29wcGljZURhdGVzIHNob3VsZCBiZSBhbiBhcnJheSBvZiBkYXRlIHN0cmluZ3MuJztcbiAgICB9XG5cbiAgICBmb3IoIHZhciBpID0gMDsgaSA8IG1vZGVsLm1hbmFnZS5jb3BwaWNlRGF0ZXMubGVuZ3RoOyBpKysgKSB7XG4gICAgICBpZiggbW9kZWwubWFuYWdlLmNvcHBpY2VEYXRlc1tpXS5tYXRjaCgnXlxcZFxcZFxcZFxcZC1cXGRcXGQkJykgfHwgbW9kZWwubWFuYWdlLmNvcHBpY2VEYXRlc1tpXS5tYXRjaCgnXlxcZFxcZFxcZFxcZC1cXGRcXGQtXFxkXFxkJCcpICkge1xuICAgICAgICB0aHJvdyBwYXJhbUVycm9yKycgaW52YWxpZCBtYW5hZ2UuY29wcGljZURhdGVzIGZvcm1hdCAnK21vZGVsLm1hbmFnZS5jb3BwaWNlRGF0ZXNbaV0rJy4gc2hvdWxkIGJlIFlZWVktTU0gZm9ybWF0Lic7XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2Uge1xuXG4gICAgaWYoIG1vZGVsLm1hbmFnZS5kYXRlQ29wcGljZWQgPT09IHVuZGVmaW5lZCApIHtcbiAgICAgIHRocm93IHBhcmFtRXJyb3IrJyBtYW5hZ2UuZGF0ZUNvcHBpY2VkIHJlcXVpcmVkIGlmIG1hbmFnZS5jb3BwaWNlRGF0ZXMgbm90IHByb3ZpZGVkJztcbiAgICB9XG4gICAgaWYoIG1vZGVsLm1hbmFnZS55ZWFyc1BlckNvcHBpY2UgPT09IHVuZGVmaW5lZCApIHtcbiAgICAgIHRocm93IHBhcmFtRXJyb3IrJyBtYW5hZ2UueWVhcnNQZXJDb3BwaWNlIHJlcXVpcmVkIGlmIG1hbmFnZS5jb3BwaWNlRGF0ZXMgbm90IHByb3ZpZGVkJztcbiAgICB9XG5cbiAgfVxufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZVdlYXRoZXIobW9kZWwpIHtcbiAgaWYoICFtb2RlbC53ZWF0aGVyICkge1xuICAgIHRocm93IHBhcmFtRXJyb3IrJ05vIHdlYXRoZXIgZGVmaW5lZCc7XG4gIH1cblxuICBmb3IoIHZhciBrZXkgaW4gbW9kZWwud2VhdGhlciApIHtcbiAgICB2YXIgZm91bmQgPSBmYWxzZTtcbiAgICBmb3IoIHZhciBpID0gMDsgaSA8IHZhbGlkV2VhdGhlcktleXMubGVuZ3RoOyBpKysgKSB7XG4gICAgICBpZigga2V5Lm1hdGNoKHZhbGlkV2VhdGhlcktleXNbaV0pICkge1xuICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmKCAhZm91bmQgKSB7XG4gICAgICB0aHJvdyBwYXJhbUVycm9yKycgaW52YWxpZCB3ZWF0aGVyIGtleTogJytrZXk7XG4gICAgfVxuXG4gICAgdmFsaWRhdGVNb2RlbChkYXRhTW9kZWwud2VhdGhlciwgbW9kZWwud2VhdGhlcltrZXldLCAnd2VhdGhlcicpO1xuICB9XG59XG5cblxuZnVuY3Rpb24gdmFsaWRhdGVTb2lsKG1vZGVsKSB7XG4gIGlmKCAhbW9kZWwuc29pbCApIHtcbiAgICB0aHJvdyBwYXJhbUVycm9yKydzb2lsIGlzIG5vdCBkZWZpbmllZCc7XG4gIH1cblxuICB2YWxpZGF0ZU1vZGVsKGRhdGFNb2RlbC5zb2lsLCBtb2RlbC5zb2lsLCAnc29pbCcpO1xufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZVBsYW50YXRpb24obW9kZWwpIHtcbiAgaWYoICFtb2RlbC5wbGFudGF0aW9uICkge1xuICAgIHRocm93IHBhcmFtRXJyb3IrJ3BsYW50YXRpb24gaXMgbm90IGRlZmluaWVkJztcbiAgfVxuICB2YWxpZGF0ZU1vZGVsKGRhdGFNb2RlbC5wbGFudGF0aW9uLCBtb2RlbC5wbGFudGF0aW9uLCAncGxhbnRhdGlvbicpO1xuXG4gIGlmKCAhbW9kZWwucGxhbnRhdGlvbi5zZWVkbGluZ1RyZWUgKSB7XG4gICAgdGhyb3cgcGFyYW1FcnJvcisncGxhbnRhdGlvbi5zZWVkbGluZ1RyZWUgaXMgbm90IGRlZmluaWVkJztcbiAgfVxuICB2YWxpZGF0ZU1vZGVsKGRhdGFNb2RlbC50cmVlLCBtb2RlbC5wbGFudGF0aW9uLnNlZWRsaW5nVHJlZSwgJ3BsYW50YXRpb24uc2VlZGxpbmdUcmVlJyk7XG5cbiAgaWYoICFtb2RlbC5wbGFudGF0aW9uLmNvcHBpY2VkVHJlZSApIHtcbiAgICB0aHJvdyBwYXJhbUVycm9yKydwbGFudGF0aW9uLmNvcHBpY2VkVHJlZSBpcyBub3QgZGVmaW5pZWQnO1xuICB9XG4gIHZhbGlkYXRlTW9kZWwoZGF0YU1vZGVsLnRyZWUsIG1vZGVsLnBsYW50YXRpb24uY29wcGljZWRUcmVlLCAncGxhbnRhdGlvbi5jb3BwaWNlZFRyZWUnKTtcbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVNb2RlbChkYXRhTW9kZWwsIG1vZGVsLCBuYW1lKSB7XG4gIHZhciBrZXksIGl0ZW07XG5cbiAgZm9yKCBrZXkgaW4gZGF0YU1vZGVsLnZhbHVlICkge1xuICAgIGl0ZW0gPSBkYXRhTW9kZWwudmFsdWVba2V5XTtcbiAgICBpZiggaXRlbS5yZXF1aXJlZCA9PT0gZmFsc2UgKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiggbW9kZWxba2V5XSA9PT0gdW5kZWZpbmVkICkge1xuICAgICAgdGhyb3cgcGFyYW1FcnJvcituYW1lKycuJytrZXkrJyBpcyBtaXNzaW5nICcrXG4gICAgICAgICAgICAoaXRlbS5kZXNjcmlwdGlvbiA/ICcoJytpdGVtLmRlc2NyaXB0aW9uKycpJyA6ICcnKTtcbiAgICB9XG5cbiAgICBpZiggdHlwZW9mIGl0ZW0udmFsdWUgPT09ICdvYmplY3QnICkge1xuICAgICAgdmFsaWRhdGVNb2RlbChpdGVtLCBtb2RlbFtrZXldLCBuYW1lKycuJytrZXkpO1xuICAgIH1cbiAgfVxufVxuIiwidmFyIGdkcml2ZSA9IHJlcXVpcmUoJy4vZ29vZ2xlRHJpdmUnKTtcbnZhciBleHBvcnRUb0NzdiA9IHJlcXVpcmUoJy4vZ29vZ2xlRHJpdmUvZXhwb3J0VG9Dc3YnKTtcbnZhciBvZmZsaW5lID0gcmVxdWlyZSgnLi9vZmZsaW5lJyk7XG52YXIgY29uZmlnID0gcmVxdWlyZSgnLi9jb25maWcnKTtcbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbnZhciByYXdPdXRwdXQgPSByZXF1aXJlKCcuL291dHB1dC9yYXcnKTtcbnZhciB3ZWF0aGVyID0gcmVxdWlyZSgnLi93ZWF0aGVyJyk7XG52YXIgd2VhdGhlckNoYXJ0ID0gcmVxdWlyZSgnLi93ZWF0aGVyL2NoYXJ0Jyk7XG52YXIgZmxhc2hibG9ja0RldGVjdG9yID0gcmVxdWlyZSgnLi9mbGFzaGJsb2NrLWRldGVjdG9yJyk7XG52YXIgaW5wdXRGb3JtID0gcmVxdWlyZSgnLi9pbnB1dEZvcm0nKTtcbnZhciBjaGFydHMgPSByZXF1aXJlKCcuL2NoYXJ0cycpO1xuXG4vLyBpbXBvcnQgM3BnIG1vZGVsXG52YXIgbW9kZWwgPSByZXF1aXJlKCcuLi8uLi9wb3BsYXItM3BnLW1vZGVsJyk7XG5cbi8vIHdpcmUgaW4gYXBwIGhhbmRsZXJzIHRvIG1vZGVsXG52YXIgbW9kZWxJTyA9IHJlcXVpcmUoJy4vbW9kZWxSdW5IYW5kbGVyJyk7XG5tb2RlbC5zZXRJTyhtb2RlbElPKTtcblxudmFyIHJ1bkNhbGxiYWNrLCB3ZWF0aGVyQ3VzdG9tQ2hhcnQ7XG5cblxuLy8gcm93IHJhdyBkYXRhIGRvZXMgYSBsb3Qgb2YgcHJvY2Vzc2luZyBvZiB0aGUgcmVzdWx0cyBhbmQgdGhlIGN1cnJlbnQgc3RhdGUgb2Ygd2hhdCdzXG4vLyBiZWluZyBkaXNwbGF5ZWQuICBHbyBhaGVhZCBhbiBzZXR1cCB0aGUgY3N2IGRhdGEgYXQgdGhpcyBwb2ludCwgdGhlbiBpZiB0aGUgdXNlclxuLy8gZGVjaWRlcyB0byBleHBvcnQsIHdlIGFyZSBhbGwgc2V0IHRvIHRvO1xudmFyIGNzdlJlc3VsdHMgPSBudWxsO1xuXG5cbnZhciBpbml0ID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgLy8gdGhlc2Ugd2UgZG9uJ3Qgd2FudCB0byBzZXR1cCB1bnRpbCBkb20gaXMgcmVhZHlcbiAgaW5wdXRGb3JtID0gaW5wdXRGb3JtKHRoaXMpO1xuXG4gIGNoYXJ0cy5zZXRBcHAodGhpcyk7XG4gIGdkcml2ZS5zZXRBcHAodGhpcyk7XG5cbiAgbW9kZWxJTy5hcHAgPSB0aGlzO1xuICBtb2RlbElPLm1vZGVsID0gbW9kZWw7XG4gIG1vZGVsSU8uY2hhcnRzID0gY2hhcnRzO1xuICBtb2RlbElPLmlucHV0Rm9ybSA9IGlucHV0Rm9ybTtcblxuICAvLyBjaGVjayBpZiBmbGFzaCBpcyBpbnN0YWxsZWQuICBJZiBub3QsIGhpZGUgdGhlIGNoYXJ0IHR5cGUgdG9nZ2xlLlxuICBmbGFzaGJsb2NrRGV0ZWN0b3IoZnVuY3Rpb24odmFsKXtcbiAgICAgIGlmKCB2YWwgPiAwICkgJChcIiNjaGFydC10eXBlLWJ0bi1ncm91cFwiKS5oaWRlKCk7XG4gIH0pO1xuXG4gIHJhd091dHB1dC5pbml0KHRoaXMpO1xuXG4gIC8vIHNldHVwIGV4cG9ydCBtb2RhbFxuICBleHBvcnRUb0Nzdi5pbml0KCk7XG4gICQoXCIjZXhwb3J0LWNzdlwiKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgZXhwb3J0VG9Dc3YucnVuKGNzdlJlc3VsdHMpO1xuICB9KTtcblxuICB2YXIgZWxlID0gJChcIiNpbnB1dHMtY29udGVudFwiKTtcbiAgaW5wdXRGb3JtLmNyZWF0ZShlbGUpO1xuXG4gICQoXCIjcnVuYnRuLCAjcnVuYnRuLXNtXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgcnVuTW9kZWwoKTtcbiAgfSk7XG5cbiAgLy8gaW5pdGlhbGl6ZSB0aGUgY2hhcnRzXG4gIGNoYXJ0cy5pbml0KCk7XG5cbiAgLy8gc2V0IGRlZmF1bHQgY29uZmlnXG4gICQoXCIjaW5wdXQtbWFuYWdlLWRhdGVQbGFudGVkXCIpLnZhbChuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkucmVwbGFjZSgvVC4qLywnJykpO1xuICAkKFwiI2lucHV0LW1hbmFnZS1kYXRlQ29wcGljZWRcIikudmFsKG5ldyBEYXRlKG5ldyBEYXRlKCkuZ2V0VGltZSgpKyg4NjQwMDAwMCoyKjM2NSkpLnRvSVNPU3RyaW5nKCkucmVwbGFjZSgvVC4qLywnJykpO1xuICAkKFwiI2lucHV0LW1hbmFnZS1kYXRlRmluYWxIYXJ2ZXN0XCIpLnZhbChuZXcgRGF0ZShuZXcgRGF0ZSgpLmdldFRpbWUoKSsoODY0MDAwMDAqMTAqMzY1KSkudG9JU09TdHJpbmcoKS5yZXBsYWNlKC9ULiovLCcnKSk7XG5cbiAgLy8gc2V0dXAgbmljZSBzY3JvbGxpbmdcbiAgJCgnLmFwcC1uYXYnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgICAgc2Nyb2xsVG9wOiAkKHRoaXMuaGFzaCkub2Zmc2V0KCkudG9wLTU1XG4gICAgICAgfSwgNzAwKTtcbiAgfSk7XG5cbiAgLy8gbWFrZSBzdXJlIGV2ZXJ5dGhpbmcgZml0cyB0byBzY3JlZW5cbiAgJCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbigpe1xuICAgICAgY2hhcnRzLnJlc2l6ZSgpO1xuXG4gICAgICBpZiggd2VhdGhlckN1c3RvbUNoYXJ0ICkge1xuICAgICAgICAgIHdlYXRoZXJDdXN0b21DaGFydCA9IHdlYXRoZXJDaGFydC5jcmVhdGUoJCgnI2N1c3RvbS13ZWF0aGVyLWNoYXJ0JylbMF0sIG1vZGVsLmN1c3RvbV93ZWF0aGVyKTtcbiAgICAgIH1cbiAgfSk7XG5cbiAgY2FsbGJhY2soKTtcbn07XG5cbnZhciBnZXRNb2RlbCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gbW9kZWw7XG59O1xuXG52YXIgZ2V0T3V0cHV0cyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gb3V0cHV0cztcbn07XG5cbnZhciBydW5Db21wbGV0ZSA9IGZ1bmN0aW9uKHJvd3MpIHtcbiAgaWYgKCBydW5DYWxsYmFjayApIHJ1bkNhbGxiYWNrKHJvd3MpO1xuICBpZiggaGlkZUluaXRMb2FkaW5nICkgaGlkZUluaXRMb2FkaW5nKCk7XG4gIHJ1bkNhbGxiYWNrID0gbnVsbDtcbn07XG5tb2RlbElPLmR1bXAgPSBydW5Db21wbGV0ZTtcblxudmFyIGRheXNUb1J1biA9IGZ1bmN0aW9uKGRheXNfaW5faW50ZXJ2YWwpIHtcbiAgdmFyIGQxID0gJChcIiNpbnB1dC1tYW5hZ2UtZGF0ZVBsYW50ZWRcIikudmFsKCk7XG4gIGlmIChkMSAmJiBkMSAhPT0gXCJcIikge1xuICAgICAgZDEgPSBuZXcgRGF0ZSgkKFwiI2lucHV0LW1hbmFnZS1kYXRlUGxhbnRlZFwiKS52YWwoKSk7XG4gIH0gZWxzZSB7XG4gICAgICBkMSA9IG5ldyBEYXRlKCk7XG4gIH1cblxuICB2YXIgZDIgPSAkKFwiI2lucHV0LW1hbmFnZS1kYXRlRmluYWxIYXJ2ZXN0XCIpLnZhbCgpO1xuICBpZiAoZDIgJiYgZDIgIT09IFwiXCIpIHtcbiAgICAgIGQyID0gbmV3IERhdGUoJChcIiNpbnB1dC1tYW5hZ2UtZGF0ZUZpbmFsSGFydmVzdFwiKS52YWwoKSk7XG4gIH0gZWxzZSB7XG4gICAgICBkMiA9IG5ldyBEYXRlKCk7XG4gIH1cblxuICB2YXIgb25lRGF5ID0gMjQqNjAqNjAqMTAwMDtcbiAgdmFyIGRheXMgPSBNYXRoLnJvdW5kKE1hdGguYWJzKChkMS5nZXRUaW1lKCkgLSBkMi5nZXRUaW1lKCkpLyhvbmVEYXkpKSk7XG4gIGRheXMgPSBkYXlzIDw9IDAgPyAxIDogZGF5cztcblxuICByZXR1cm4gZGF5cyAvIGRheXNfaW5faW50ZXJ2YWw7XG59O1xuXG5cbnZhciBydW5Nb2RlbCA9IGZ1bmN0aW9uKGlzUnQpIHtcblxuICBpZiAoJChcIiNydW5idG4sICNydW5idG4tc21cIikuaGFzQ2xhc3MoXCJkaXNhYmxlZFwiKSkgcmV0dXJuO1xuICAkKFwiI3J1bmJ0biwgI3J1bmJ0bi1zbVwiKS5hZGRDbGFzcyhcImRpc2FibGVkXCIpLmh0bWwoXCJSdW5uaW5nLi4uXCIpO1xuXG4gIGlmKCAhd2VhdGhlci5jaGVjayhtb2RlbCkgKSByZXR1cm47XG5cbiAgLy8gbGV0IFVJIHByb2Nlc3MgZm9yIGEgc2VjIGJlZm9yZSB3ZSB0YW5rIGl0XG4gIC8vIFRPRE86IHRoaXMgc2hvdWxkIGJlIHByZWZvcm1lZCB3LyBhIHdlYndvcmtlclxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgZ2EoJ3NlbmQnLCAnZXZlbnQnLCAndWknLCAnaW50ZXJhY3Rpb24nLCAnbW9kZWwtcnVuJywgMSk7XG5cbiAgICAgIC8vIHJlYWQgZXZlcnl0aGluZyBzbyB0aGUgdmFyaWF0aW9ucyBhcmUgc2V0XG4gICAgICBtb2RlbC52YXJpYXRpb25zID0ge307XG4gICAgICBtb2RlbElPLnJlYWRGcm9tSW5wdXRzKCk7XG5cbiAgICAgIC8vIG1ha2Ugc3VyZSB3ZSBhcmUgb25seSBzZXR0aW5nIDIgdmFyaWF0aW9uIHBhcmFtZXRlcnNcbiAgICAgIHZhciBwYXJhbXMgPSBbXTtcbiAgICAgIGZvciggdmFyIGtleSBpbiBtb2RlbC52YXJpYXRpb25zICkgcGFyYW1zLnB1c2goa2V5KTtcbiAgICAgIGlmKCBwYXJhbXMubGVuZ3RoID4gMiApIHtcbiAgICAgICAgICBhbGVydChcIlRoZXJlIGlzIGEgbGltaXQgb2YgMiB2YXJpYXRpb24gcGFyYW1ldGVycyBwZXIgcnVuLiAgQ3VycmVudGx5IHlvdSBhcmUgdmFyeWluZyBcIitcbiAgICAgICAgICAgICAgICBcInRoZSBmb2xsb3dpbmcgcGFyYW1ldGVyczpcXG5cXG4gLVwiK3BhcmFtcy5qb2luKFwiXFxuIC1cIikpO1xuICAgICAgICAgICQoXCIjcnVuYnRuLCAjcnVuYnRuLXNtXCIpLnJlbW92ZUNsYXNzKFwiZGlzYWJsZWRcIikuaHRtbChcIjxpIGNsYXNzPSdpY29uLXBsYXknPjwvaT4gUnVuXCIpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gbGV0IHRoZSB3b3JsZCBrbm93IHdoYXQgd2UgYXJlIGRvaW5nXG4gICAgICBpZiggIWlzUnQgKSBnZHJpdmUucnVuTW9kZWxSdCgpO1xuXG4gICAgICAvLyBzaG93IHdoYXQgd2UgYXJlIGRvaW5nXG4gICAgICAkKFwiI3ZhcmlhdGlvbkFuYWx5c2lzU3RhdHVzXCIpLmh0bWwoXCI8Yj5cIisocGFyYW1zLmxlbmd0aCA9PSAwID8gXCJOb25lXCIgOiBwYXJhbXMuam9pbihcIiwgXCIpKStcIjwvYj5cIik7XG5cbiAgICAgIC8vIHdlIGFyZSBvbmx5IHJ1bm5pbmcgb25jZVxuICAgICAgaWYgKCBwYXJhbXMubGVuZ3RoID09PSAwICkge1xuICAgICAgICAgIGdhKCdzZW5kJywgJ2V2ZW50JywgJ3VpJywgJ2ludGVyYWN0aW9uJywgJ21vZGVsLXJ1bi1zaW5nbGVQYXJhbScsIDEpO1xuXG4gICAgICAgICAgcnVuQ2FsbGJhY2sgPSBmdW5jdGlvbihyb3dzKSB7XG4gICAgICAgICAgICAgIHNob3dSZXN1bHRzKHJvd3MpO1xuICAgICAgICAgIH07XG5cblxuICAgICAgICAgIHZhciBkYXlzID0gZGF5c1RvUnVuKG1vZGVsLnNldHVwLmRheXNfaW5faW50ZXJ2YWwpO1xuXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIG1vZGVsLnJ1bihkYXlzKTtcbiAgICAgICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgICAgIGRlYnVnZ2VyO1xuICAgICAgICAgICAgYWxlcnQoZSk7XG4gICAgICAgICAgfVxuXG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZ2EoJ3NlbmQnLCAnZXZlbnQnLCAndWknLCAnaW50ZXJhY3Rpb24nLCAnbW9kZWwtcnVuLXZhcmlhdGlvbicsIDEpO1xuXG4gICAgICAgICAgLy8gc2V0IHZhcmlhdGlvbiBvcmRlclxuICAgICAgICAgIHZhciBydW5zID0gW107XG4gICAgICAgICAgZm9yKCB2YXIgaSA9IDA7IGkgPCBtb2RlbC52YXJpYXRpb25zW3BhcmFtc1swXV0ubGVuZ3RoOyBpKysgKSB7XG4gICAgICAgICAgICAgIHZhciBvYmogPSB7XG4gICAgICAgICAgICAgICAgICBpbnB1dHMgOiB7fSxcbiAgICAgICAgICAgICAgICAgIG91dHB1dCA6IG51bGxcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgb2JqLmlucHV0c1twYXJhbXNbMF1dID0gbW9kZWwudmFyaWF0aW9uc1twYXJhbXNbMF1dW2ldO1xuICAgICAgICAgICAgICBpZiggcGFyYW1zLmxlbmd0aCA+IDEgKSB7XG4gICAgICAgICAgICAgICAgICBmb3IoIHZhciBqID0gMDsgaiA8IG1vZGVsLnZhcmlhdGlvbnNbcGFyYW1zWzFdXS5sZW5ndGg7IGorKyApIHtcbiAgICAgICAgICAgICAgICAgICAgICB2YXIgdCA9ICQuZXh0ZW5kKHRydWUsIHt9LCBvYmopO1xuICAgICAgICAgICAgICAgICAgICAgIHQuaW5wdXRzW3BhcmFtc1sxXV0gPSBtb2RlbC52YXJpYXRpb25zW3BhcmFtc1sxXV1bal07XG4gICAgICAgICAgICAgICAgICAgICAgcnVucy5wdXNoKHQpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgcnVucy5wdXNoKG9iaik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBydW5WYXJpYXRpb24oMCwgcnVucyk7XG4gICAgICB9XG4gIH0sIDI1MCk7XG59O1xuXG4vLyBydW4gYSBzaW5nbGUgdmFyaWF0aW9uLCB3aGVuIG11bHRpcGxlIGlucHV0cyBmb3IgYSBzaW5nbGUgcGFyYW1ldGVyIGhhdmVcbi8vIGJlZW4gZ2l2ZW5cbnZhciBydW5WYXJpYXRpb24gPSBmdW5jdGlvbihpbmRleCwgcnVucykge1xuXG4gIC8vIHNldCBpbnB1dCB2YXJpYWJsZXMgZm9yIHJ1blxuICB2YXIgcnVuID0gcnVuc1tpbmRleF07XG4gIGZvciggdmFyIGtleSBpbiBydW4uaW5wdXRzICkge1xuICAgICAgJChcIiNpbnB1dC1cIitrZXkucmVwbGFjZSgvXFwuL2csICctJykpLnZhbChydW4uaW5wdXRzW2tleV0pO1xuICB9XG5cbiAgcnVuQ2FsbGJhY2sgPSBmdW5jdGlvbihkYXRhKSB7XG4gICAgICBydW5zW2luZGV4XS5vdXRwdXQgPSBkYXRhO1xuICAgICAgaW5kZXgrKztcblxuXG4gICAgICBpZiAocnVucy5sZW5ndGggPT0gaW5kZXgpIHtcbiAgICAgICAgICAvLyByZXNldCB0aGUgY29uc3RhbnQgdG8gdGhlIGZpcnN0IHZhbHVlXG4gICAgICAgICAgZm9yKCB2YXIga2V5IGluIG1vZGVsLnZhcmlhdGlvbnMgKSB7XG4gICAgICAgICAgICAgICQoXCIjaW5wdXQtXCIra2V5LnJlcGxhY2UoL1xcLi9nLCAnLScpKS52YWwobW9kZWwudmFyaWF0aW9uc1trZXldLmpvaW4oXCIsIFwiKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHNob3dSZXN1bHRzKHJ1bnMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBydW5WYXJpYXRpb24oaW5kZXgsIHJ1bnMpO1xuICAgICAgfVxuICB9O1xuXG4gIHZhciBkYXlzID0gZGF5c1RvUnVuKHBhcnNlRmxvYXQoJCgnI2lucHV0LXNldHVwLWRheXNfaW5faW50ZXJ2YWwnKS52YWwoKSkpO1xuXG4gIHRyeSB7XG4gICAgbW9kZWwucnVuKGRheXMpO1xuICB9IGNhdGNoKGUpIHtcbiAgICBkZWJ1Z2dlcjtcbiAgICBhbGVydChlKTtcbiAgfVxufTtcblxuXG52YXIgc2hvd1Jlc3VsdHMgPSBmdW5jdGlvbihyZXN1bHQpIHtcbiAgdmFyIGN1cnJlbnRSZXN1bHRzO1xuICBpZiggcmVzdWx0WzBdIGluc3RhbmNlb2YgQXJyYXkgKSB7XG4gICAgICBjdXJyZW50UmVzdWx0cyA9IFt7XG4gICAgICAgICAgc2luZ2xlUnVuIDogdHJ1ZSxcbiAgICAgICAgICBpbnB1dHMgOiB7fSxcbiAgICAgICAgICBvdXRwdXQgOiByZXN1bHRcbiAgICAgIH1dO1xuICB9IGVsc2Uge1xuICAgIGN1cnJlbnRSZXN1bHRzID0gcmVzdWx0O1xuICB9XG5cbiAgLy8gdHJhbnNwb3NlIGFsbCByZXN1bHRzIHRvIGhhc2ggYnkgZGF0ZVxuICBmb3IoIHZhciBpID0gMDsgaSA8IGN1cnJlbnRSZXN1bHRzLmxlbmd0aDsgaSsrICkge1xuICAgIHZhciBkYXRlSGFzaCA9IHt9O1xuICAgIHZhciByID0gY3VycmVudFJlc3VsdHNbaV07XG5cbiAgICByLnRvdGFsU3RlcHMgPSByLm91dHB1dC5sZW5ndGg7XG4gICAgZm9yKCB2YXIgaiA9IDE7IGogPCByLm91dHB1dC5sZW5ndGg7IGorKyApIHtcbiAgICAgIGRhdGVIYXNoW3Iub3V0cHV0W2pdWzBdXSA9IHIub3V0cHV0W2pdO1xuICAgIH1cbiAgICByLmhlYWRlciA9IHIub3V0cHV0WzBdO1xuICAgIHIub3V0cHV0ID0gZGF0ZUhhc2g7XG4gIH1cblxuICAvLyBzb3J0IGJ5IG1vc3QgdG8gbGVhc3Qgc3RlcHNcbiAgY3VycmVudFJlc3VsdHMuc29ydChmdW5jdGlvbihhLCBiKXtcbiAgICBpZiggYS50b3RhbFN0ZXBzID4gYi50b3RhbFN0ZXBzICkgcmV0dXJuIDE7XG4gICAgaWYoIGEudG90YWxTdGVwcyA8IGIudG90YWxTdGVwcyApIHJldHVybiAtMTtcbiAgICByZXR1cm4gMDtcbiAgfSk7XG5cbiAgcmF3T3V0cHV0LnNob3coY3VycmVudFJlc3VsdHMpO1xuICBjaGFydHMudXBkYXRlQ2hhcnRzKGNzdlJlc3VsdHMsIHRydWUpO1xuXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAkKFwiI3J1bmJ0biwgI3J1bmJ0bi1zbVwiKS5yZW1vdmVDbGFzcyhcImRpc2FibGVkXCIpLmh0bWwoXCI8aSBjbGFzcz0naWNvbi1wbGF5Jz48L2k+IFJ1blwiKTtcbiAgfSwgMjUwKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBpbml0IDogaW5pdCxcbiAgZ29vZ2xlRHJpdmUgOiBnZHJpdmUsXG4gIGdldE1vZGVsIDogZ2V0TW9kZWwsXG4gIHJ1bk1vZGVsIDogcnVuTW9kZWwsXG4gIGRheXNUb1J1biA6IGRheXNUb1J1bixcbiAgLy8gdGhlIHJhdyBtb2R1bGUgYWN0dWFsbHkgY3JlYXRlcyB0aGlzIHNldHVwXG4gIHNldENzdlJlc3VsdHMgOiBmdW5jdGlvbihjc3YpIHtcbiAgICBjc3ZSZXN1bHRzID0gY3N2O1xuICB9LFxuICBxcyA6IHV0aWxzLnFzLFxuICBnZXRNb2RlbElPIDogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG1vZGVsSU87XG4gIH1cbn07XG4iLCJ2YXIgb3V0cHV0RGVmaW5pdGlvbnMgPSByZXF1aXJlKCcuL291dHB1dC9kZWZpbml0aW9ucycpO1xudmFyIHJhdyA9IHJlcXVpcmUoJy4vb3V0cHV0L3JhdycpO1xudmFyIGNvbmZpZyA9IHJlcXVpcmUoJy4vY29uZmlnJyk7XG52YXIgYXBwO1xuXG4vLyBvbmx5IGRyYXcgY2hhcnRzIGlmIHdpZHRoIGhhcyBjaGFuZ2VkXG52YXIgY1dpZHRoID0gMDtcblxuLy8gdGhlcmUgaXMgbm8gd2F5IHRvIGdldCB0aGUgY29sb3JzIGZvciB0aGUgbGVnZW5kcyAodG8gbWFrZSB5b3VyIG93bilcbi8vIHRoaXMgcG9zdDpcbi8vIGdpdmVzIHRoZXNlIHZhbHVlcy4gIFRoaXMgaXMgYSBIQUNLLCBpZiB0aGV5IGV2ZXIgY2hhbmdlLCB3ZSBuZWVkIHRvIHVwZGF0ZVxudmFyIGdvb2dsZUNoYXJ0Q29sb3JzID0gW1wiIzMzNjZjY1wiLFwiI2RjMzkxMlwiLFwiI2ZmOTkwMFwiLFwiIzEwOTYxOFwiLFwiIzk5MDA5OVwiLFwiIzAwOTljNlwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiI2RkNDQ3N1wiLFwiIzY2YWEwMFwiLFwiI2I4MmUyZVwiLFwiIzMxNjM5NVwiLFwiIzk5NDQ5OVwiLFwiIzIyYWE5OVwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiI2FhYWExMVwiLFwiIzY2MzNjY1wiLFwiI2U2NzMwMFwiLFwiIzhiMDcwN1wiLFwiIzY1MTA2N1wiLFwiIzMyOTI2MlwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiIzU1NzRhNlwiLFwiIzNiM2VhY1wiLFwiI2I3NzMyMlwiLFwiIzE2ZDYyMFwiLFwiI2I5MTM4M1wiLFwiI2Y0MzU5ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiIzljNTkzNVwiLFwiI2E5YzQxM1wiLFwiIzJhNzc4ZFwiLFwiIzY2OGQxY1wiLFwiI2JlYTQxM1wiLFwiIzBjNTkyMlwiXG4gICAgICAgICAgICAgICAgICAgICAgLFwiIzc0MzQxMVwiXTtcblxuLy8gdGVtcGxhdGUgZm9yIHRoZSBwb3B1cFxudmFyIHNsaWRlclBvcHVwID0gJChcbiAgICAgIFwiPGRpdiBjbGFzcz0nc2xpZGUtcG9wdXAnPlwiICtcbiAgICAgICAgICBcIjxpIGNsYXNzPSdpY29uLXJlbW92ZS1jaXJjbGUgcHVsbC1yaWdodCBzbGlkZS1wb3B1cC1jbG9zZSc+PC9pPlwiK1xuICAgICAgICAgIFwiPGRpdiBpZD0nY2Fyb3VzZWwnIGNsYXNzPSdvd2wtY2Fyb3VzZWwgb3dsLXRoZW1lJyBzdHlsZT0nbWFyZ2luLXRvcDoxNXB4Jz48L2Rpdj5cIiArXG5cdFwiPC9kaXY+XCIpO1xuXG52YXIgc2xpZGVyUG9wdXBCZyA9ICQoXCI8ZGl2IGNsYXNzPSdzbGlkZS1wb3B1cC1iZyc+Jm5ic3A7PC9kaXY+XCIpO1xuXG4vLyBvbmx5IGRyYXcgY2hhcnRzIGlmIHNvbWVvbmUgaGFzIGNsaWNrIGEgY2hlY2tib3hcbnZhciBjaGFuZ2VzID0gZmFsc2U7XG5cbi8vIHdoZW4gc2l6aW5nLCB3YWl0IGEgfjMwMG1zIGJlZm9yZSB0cmlnZ2VyaW5nIHJlZHJhd1xudmFyIHJlc2l6ZVRpbWVyID0gLTE7XG5cbnZhciBjaGFydFR5cGVTZWxlY3RvciwgY2hhcnRDaGVja2JveGVzLCBjRGF0YTtcblxuZnVuY3Rpb24gaW5pdCgpIHtcblxuICAkKFwiI3Nob3ctY2hhcnRzcG9wdXAtYnRuXCIpLm9uKCdjbGljaycsZnVuY3Rpb24oKSB7XG4gICAgICBzaG93UG9wdXAoKTtcbiAgfSk7XG5cbiAgLy8gc2V0dXAgY2hhcnQgc2VsZWN0b3JzXG4gICQoXCIjY2hhcnQtbW9kYWxcIikubW9kYWwoe3Nob3c6ZmFsc2V9KTtcblxuICAvLyBzZXQgcG9wdXAgY2xpY2sgaGFuZGxlcnNcbiAgJChcIiNjaGFydFR5cGUtc2VsZWN0QWxsXCIpLm9uKCdjbGljaycsc2VsZWN0QWxsKTtcbiAgJChcIiNjaGFydFR5cGUtdW5zZWxlY3RBbGxcIikub24oJ2NsaWNrJyx1bnNlbGVjdEFsbCk7XG5cbiAgY2hhcnRUeXBlU2VsZWN0b3IgPSAkKFwiI2NoYXJ0VHlwZUlucHV0XCIpO1xuICBjaGFydENoZWNrYm94ZXMgPSAkKFwiI2NoYXJ0U2VsZWN0aW9uc1wiKTtcblxuICB2YXIgYzEgPSAkKFwiI2NoYXJ0U2VsZWN0aW9ucy1jMVwiKTtcbiAgdmFyIGMyID0gJChcIiNjaGFydFNlbGVjdGlvbnMtYzJcIik7XG4gIGZvciggdmFyIGkgPSAwOyBpIDwgY29uZmlnLm91dHB1dHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciB2YWwgPSBjb25maWcub3V0cHV0c1tpXTtcbiAgICAgIGNoYXJ0VHlwZVNlbGVjdG9yLmFwcGVuZCgkKFwiPG9wdGlvbiB2YWx1ZT0nXCIgKyB2YWwgKyBcIicgXCJcbiAgICAgICAgICAgICAgKyAodmFsID09ICdXUicgfHwgdmFsID09ICdXUycgfHwgdmFsID09ICdXRicgPyAnc2VsZWN0ZWQnIDogJycpXG4gICAgICAgICAgICAgICsgXCI+XCIgKyB2YWwgKyBcIjwvb3B0aW9uPlwiKSk7XG5cbiAgICAgIGlmKCBpICUgMiA9PSAwICkge1xuICAgICAgICAgIGMxLmFwcGVuZCgkKCc8ZGl2IGNsYXNzPVwiY2hlY2tib3hcIj48bGFiZWw+PGlucHV0IHR5cGU9XCJjaGVja2JveFwiJ1xuICAgICAgICAgICAgICAgICAgKyAodmFsID09ICdXUicgfHwgdmFsID09ICdXUycgfHwgdmFsID09ICdXRicgPyAnY2hlY2tlZD1cImNoZWNrZWRcIicgOiAnJylcbiAgICAgICAgICAgICAgICAgICsgJyB2YWx1ZT1cIicrdmFsKydcIj4gJytfY3JlYXRlRGVzY3JpcHRpb24odmFsKSsnPC9kaXY+JykpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjMi5hcHBlbmQoJCgnPGRpdiBjbGFzcz1cImNoZWNrYm94XCI+PGxhYmVsPjxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIidcbiAgICAgICAgICAgICAgICAgICsgKHZhbCA9PSAnV1InIHx8IHZhbCA9PSAnV1MnIHx8IHZhbCA9PSAnV0YnID8gJ2NoZWNrZWQ9XCJjaGVja2VkXCInIDogJycpXG4gICAgICAgICAgICAgICAgICArICcgdmFsdWU9XCInK3ZhbCsnXCI+ICcrX2NyZWF0ZURlc2NyaXB0aW9uKHZhbCkrJzwvZGl2PicpKTtcbiAgICAgIH1cbiAgfVxuXG4gIGNoYXJ0Q2hlY2tib3hlcy5maW5kKFwiLmZuLXRvZ2dsZVwiKS5vbignY2xpY2snLGZ1bmN0aW9uKCl7XG4gICAgICAkKFwiI1wiKyQodGhpcykuYXR0cihcImRhdGF0YXJnZXRcIikpLnRvZ2dsZSgnc2xvdycpO1xuICB9KTtcblxuICBjaGFydENoZWNrYm94ZXMuZmluZChcImlucHV0W3R5cGU9Y2hlY2tib3hdXCIpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgaWYoICQodGhpcykuaXMoXCI6Y2hlY2tlZFwiKSApIHNlbGVjdCgkKHRoaXMpLmF0dHIoXCJ2YWx1ZVwiKSk7XG4gICAgICBlbHNlIHVuc2VsZWN0KCQodGhpcykuYXR0cihcInZhbHVlXCIpKTtcbiAgfSk7XG5cbiAgJChcIiNzZWxlY3QtY2hhcnRzLWJ0biwgI3NlbGVjdC1jaGFydHMtdGl0bGUtYnRuXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAkKFwiI2NoYXJ0LW1vZGFsXCIpLm1vZGFsKCdzaG93Jyk7XG4gICAgICBjaGFuZ2VzID0gZmFsc2U7XG4gIH0pO1xuXG4gICQoXCIuY2hhcnQtbW9kYWwtY2xvc2VcIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICQoXCIjY2hhcnQtbW9kYWxcIikubW9kYWwoJ2hpZGUnKTtcbiAgICAgIGlmKCBjaGFuZ2VzICYmIGNEYXRhICkge1xuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgdXBkYXRlQ2hhcnRzKCk7XG4gICAgICAgICAgICAgIC8vIHVwZGF0ZSByYXcgZGF0YSBhcyB3ZWxsXG4gICAgICAgICAgICAgIHJhdy5zaG93KGNEYXRhKTtcbiAgICAgICAgICB9LDQwMCk7XG5cbiAgICAgIH1cbiAgfSk7XG5cbiAgJChcIi5jaGFydC10eXBlLXRvZ2dsZVwiKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgaWYoICEkKHRoaXMpLmhhc0NsYXNzKFwiYWN0aXZlXCIpICkge1xuICAgICAgICAgICQoXCIuY2hhcnQtdHlwZS10b2dnbGUuYWN0aXZlXCIpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xuICAgICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoXCJhY3RpdmVcIik7XG4gICAgICAgICAgdXBkYXRlQ2hhcnRzKCk7XG4gICAgICB9XG4gIH0pO1xufVxuXG4vLyBtYWtlIHN1cmUgYW5kIGVuZCBsYWJlbCB0YWdcbmZ1bmN0aW9uIF9jcmVhdGVEZXNjcmlwdGlvbih2YWwpIHtcbiAgaWYoICFvdXRwdXREZWZpbml0aW9uc1t2YWxdICkgcmV0dXJuIFwiPGI+XCIrdmFsK1wiPC9iPjwvbGFiZWw+XCI7XG5cbiAgdmFyIGRlc2MgPSBvdXRwdXREZWZpbml0aW9uc1t2YWxdO1xuICB2YXIgbGFiZWwgPSBkZXNjLmxhYmVsICYmIGRlc2MubGFiZWwubGVuZ3RoID4gMCA/IFwiIC0gXCIrZGVzYy5sYWJlbCA6IFwiXCI7XG4gIHZhciB1bml0cyA9IGRlc2MudW5pdHMgJiYgZGVzYy51bml0cy5sZW5ndGggPiAwID8gXCIgW1wiK2Rlc2MudW5pdHMrXCJdXCIgOiBcIlwiO1xuXG4gIHZhciBsYWJlbCA9IFwiPGI+XCIrdmFsK1wiPC9iPjxzcGFuIHN0eWxlPSdmb250LXNpemU6MTJweCc+XCIrbGFiZWwrdW5pdHMrXCI8L3NwYW4+PC9sYWJlbD5cIjtcbiAgdmFyIGhhc0Rlc2MgPSBkZXNjLmRlc2NyaXB0aW9uICYmIGRlc2MuZGVzY3JpcHRpb24ubGVuZ3RoID4gMDtcbiAgaWYoIGhhc0Rlc2MgKSB7XG4gICAgICBsYWJlbCArPSBcIjxkaXYgc3R5bGU9J2ZvbnQtc2l6ZToxMXB4O2NvbG9yOiM4ODg7Zm9udC1zdHlsZTppdGFsaWMnPlwiK2Rlc2MuZGVzY3JpcHRpb247XG4gIH1cblxuICB2YXIgZk5hbWUgPSBkZXNjLmFsdEZuTmFtZSB8fCB2YWw7XG4gIHZhciBmbiA9IGFwcC5nZXRNb2RlbCgpLmdldEZ1bmN0aW9uKGZOYW1lKTtcblxuICBpZiggZm4gfHwgZGVzYy5mbiApIHtcbiAgICAgIGlmKCAhaGFzRGVzYyApIGxhYmVsICs9IFwiPGRpdiBzdHlsZT0nZm9udC1zaXplOjExcHgnPlwiO1xuICAgICAgbGFiZWwgKz0gXCIgPGEgc3R5bGU9J2ZvbnQtc3R5bGU6bm9ybWFsO2N1cnNvcjpwb2ludGVyJyBkYXRhdGFyZ2V0PSdmbi1kZXNjLVwiK3ZhbCtcIicgY2xhc3M9J2ZuLXRvZ2dsZSc+Zm4oKTwvYT48L2Rpdj5cIjtcblxuICAgICAgbGFiZWwgKz0gXCI8ZGl2IGlkPSdmbi1kZXNjLVwiK3ZhbCtcIicgc3R5bGU9J2Rpc3BsYXk6bm9uZTtmb250LXNpemU6MTFweDtvdmVyZmxvdzphdXRvJyBjbGFzcz0nd2VsbCB3ZWxsLXNtJz5cIitcbiAgICAgICAgICAgICAgICAgIChmbnx8ZGVzYy5mbikudG9TdHJpbmcoKS5yZXBsYWNlKC8gL2csJyZuYnNwOycpLnJlcGxhY2UoL1xcbi9nLCc8YnIgLz4nKStcIjwvZGl2PlwiO1xuICB9IGVsc2UgaWYgKCBoYXNEZXNjICkge1xuICAgICAgbGFiZWwgKz0gXCI8L2Rpdj5cIjtcbiAgfVxuXG4gIC8vIFRPRE86IGFkZCBmbiB3ZWxsXG4gIHJldHVybiBsYWJlbCtcIjxiciAvPlwiO1xufVxuXG5mdW5jdGlvbiBzZWxlY3QodmFsKSB7XG4gIGNoYXJ0VHlwZVNlbGVjdG9yLmZpbmQoXCJvcHRpb25bdmFsdWU9XCIrdmFsK1wiXVwiKS5hdHRyKFwic2VsZWN0ZWRcIixcInNlbGVjdGVkXCIpO1xuICBjaGFydENoZWNrYm94ZXMuZmluZChcImlucHV0W3ZhbHVlPVwiK3ZhbCtcIl1cIikucHJvcChcImNoZWNrZWRcIix0cnVlKTtcbiAgY2hhbmdlcyA9IHRydWU7XG59XG5cbmZ1bmN0aW9uIHVuc2VsZWN0KHZhbCkge1xuICBjaGFydFR5cGVTZWxlY3Rvci5maW5kKFwib3B0aW9uW3ZhbHVlPVwiK3ZhbCtcIl1cIikucmVtb3ZlQXR0cihcInNlbGVjdGVkXCIpO1xuICBjaGFydENoZWNrYm94ZXMuZmluZChcImlucHV0W3ZhbHVlPVwiK3ZhbCtcIl1cIikucHJvcChcImNoZWNrZWRcIixmYWxzZSk7XG4gIGNoYW5nZXMgPSB0cnVlO1xufVxuXG5mdW5jdGlvbiBzZWxlY3RBbGwoKSB7XG4gIGZvciggdmFyIGkgPSAwOyBpIDwgY29uZmlnLm91dHB1dHMubGVuZ3RoOyBpKyspIHNlbGVjdChjb25maWcub3V0cHV0c1tpXSk7XG59XG5cbmZ1bmN0aW9uIHVuc2VsZWN0QWxsKCkge1xuICBmb3IoIHZhciBpID0gMDsgaSA8IGNvbmZpZy5vdXRwdXRzLmxlbmd0aDsgaSsrKSB1bnNlbGVjdChjb25maWcub3V0cHV0c1tpXSk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZShlbGUpIHtcbiAgZWxlLnBhcmVudCgpLmhpZGUoJ3Nsb3cnLCBmdW5jdGlvbigpe1xuICAgICAgZWxlLnBhcmVudCgpLnJlbW92ZSgpO1xuICAgICAgdW5zZWxlY3QoZWxlLmF0dHIoJ3R5cGUnKSk7XG4gIH0pO1xuXG59XG5cbmZ1bmN0aW9uIHByaW50KGNoYXJ0Q29udGFpbmVyKSB7XG4gIGdhKCdzZW5kJywgJ2V2ZW50JywgJ3VpJywgJ2ludGVyYWN0aW9uJywgJ3ByaW50LWNoYXJ0JywgMSk7XG5cblxudmFyIGRpc3Bfc2V0dGluZz1cInRvb2xiYXI9eWVzLGxvY2F0aW9uPW5vLGRpcmVjdG9yaWVzPXllcyxtZW51YmFyPXllcyxcIjtcbiAgZGlzcF9zZXR0aW5nKz1cInNjcm9sbGJhcnM9eWVzLHdpZHRoPTgwMCwgaGVpZ2h0PTYwMCwgbGVmdD0yNSwgdG9wPTI1XCI7XG5cbiAgdmFyIHN2ZyA9IGNoYXJ0Q29udGFpbmVyLmZpbmQoXCJzdmdcIik7XG4gIHZhciBodG1sID0gY2hhcnRDb250YWluZXIuZmluZChcImRpdlwiKS5odG1sKCk7XG5cbiAgdmFyIGRvY3ByaW50PXdpbmRvdy5vcGVuKFwiXCIsXCJcIixkaXNwX3NldHRpbmcpO1xuICBkb2NwcmludC5kb2N1bWVudC5vcGVuKCk7XG4gIGRvY3ByaW50LmRvY3VtZW50LndyaXRlKCc8aHRtbD48aGVhZD48dGl0bGU+PC90aXRsZT4nKTtcbiAgZG9jcHJpbnQuZG9jdW1lbnQud3JpdGUoJzwvaGVhZD48Ym9keSBtYXJnaW53aWR0aD1cIjBcIiBtYXJnaW5oZWlnaHQ9XCIwXCIgb25Mb2FkPVwic2VsZi5wcmludCgpXCI+PGNlbnRlcj4nKTtcbiAgZG9jcHJpbnQuZG9jdW1lbnQud3JpdGUoaHRtbCk7XG4gIGRvY3ByaW50LmRvY3VtZW50LndyaXRlKCc8L2NlbnRlcj48L2JvZHk+PC9odG1sPicpO1xuICBkb2NwcmludC5kb2N1bWVudC5jbG9zZSgpO1xuICBkb2NwcmludC5mb2N1cygpO1xuXG59XG5cblxuZnVuY3Rpb24gc2V0RGF0YShkYXRhKSB7XG4gIGNEYXRhID0gZGF0YTtcbn1cblxuLy8gYmFzaWNhbGx5IHJlZHJhdyBldmVyeXRoaW5nXG5mdW5jdGlvbiByZXNpemUoKSB7XG4gIC8vIHJlcXVpcmUgbW9yZSB0aGFuIGEgMzAgcGl4ZWwgd2lkdGggY2hhbmdlIChzbyB3ZSBkb24ndCByZWRyYXcgdy8gc2Nyb2xsIGJhcnMgYWRkZWQpXG4gIHZhciB3aW5XaWR0aCA9ICQod2luZG93KS53aWR0aCgpO1xuICBpZiggY1dpZHRoID4gd2luV2lkdGggLSAxNSAmJiBjV2lkdGggPCB3aW5XaWR0aCArIDE1ICkgcmV0dXJuO1xuICBjV2lkdGggPSB3aW5XaWR0aDtcblxuICBpZiggcmVzaXplVGltZXIgIT0gLTEgKSBjbGVhclRpbWVvdXQocmVzaXplVGltZXIpO1xuICByZXNpemVUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICByZXNpemVUaW1lciA9IC0xO1xuICAgICAgdXBkYXRlQ2hhcnRzKCk7XG4gIH0sMzAwKTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlQ2hhcnRzKHJlc3VsdHMsIGFuaW1hdGUpIHtcbiAgaWYoIHJlc3VsdHMgKSBzZXREYXRhKHJlc3VsdHMpO1xuICBpZiggIWNEYXRhICkgcmV0dXJuO1xuXG4gICQoXCIjc2hvdy1jaGFydHNwb3B1cC1idG5cIikuc2hvdygpO1xuXG4gIC8vIGNyZWF0ZSBhIGxlZ2VuZCBpZiB0aGVyZSBpcyBtb3JlIHRoYW4gb25lIHJ1blxuICB2YXIgbGVnZW5kID0gXCJcIjtcbiAgaWYoIGNEYXRhLmlucHV0cy5sZW5ndGggPiAxICkge1xuICAgICAgdmFyIGMxID0gXCJcIjtcbiAgICAgIHZhciBjMiA9IFwiXCI7XG4gICAgICBmb3IoIHZhciBpID0gMDsgaSA8IGNEYXRhLmlucHV0cy5sZW5ndGg7IGkrKyApIHtcbiAgICAgICAgICB2YXIgZWxlID0gXCI8ZGl2IHN0eWxlPSdtaW4taGVpZ2h0OjQwcHg7bWFyZ2luLWJvdHRvbToxMHB4Jz48ZGl2IGNsYXNzPSdsZWdlbmQtc3F1YXJlJyBzdHlsZT0nYmFja2dyb3VuZC1jb2xvcjpcIitnb29nbGVDaGFydENvbG9yc1tpXStcIic+Jm5ic3A7PC9kaXY+XCI7XG4gICAgICAgICAgZm9yKCB2YXIgbVR5cGUgaW4gY0RhdGEuaW5wdXRzW2ldICkge1xuICAgICAgICAgICAgICBlbGUgKz0gXCI8ZGl2IGNsYXNzPSdsZWdlbmQtdGV4dCc+XCIrbVR5cGUrXCI9XCIrY0RhdGEuaW5wdXRzW2ldW21UeXBlXStcIjwvZGl2PlwiO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmKCBpICUgMiA9PSAwICkgYzEgKz0gZWxlICsgXCI8L2Rpdj5cIlxuICAgICAgICAgIGVsc2UgYzIgKz0gZWxlICsgXCI8L2Rpdj5cIlxuICAgICAgfVxuICAgICAgbGVnZW5kID0gXCI8ZGl2PjxhIGlkPSdsZWdlbmQtcGFuZWwtdG9nZ2xlJyBzdHlsZT0nbWFyZ2luLWxlZnQ6NXB4O2N1cnNvcjpwb2ludGVyJz5MZWdlbmQ8L2E+PC9kaXY+XCIrXG4gICAgICAgICAgICAgICBcIjxkaXYgc3R5bGU9J2JvcmRlci1ib3R0b206MXB4IHNvbGlkICNlZWU7cGFkZGluZy1ib3R0b206NXB4O21hcmdpbi1ib3R0b206MTVweCc+XCIrXG4gICAgICAgICAgICAgICBcIjxkaXYgY2xhc3M9J3JvdycgaWQ9J2xlZ2VuZC1wYW5lbCc+PGRpdiBjbGFzcz0nY29sLXNtLTYnPlwiK2MxK1wiPC9kaXY+XCIrXG4gICAgICAgICAgICAgICBcIjxkaXYgY2xhc3M9J2NvbC1zbS02Jz5cIitjMitcIjwvZGl2PlwiK1xuICAgICAgICAgICAgICAgXCI8L2Rpdj48L2Rpdj5cIjtcbiAgfVxuICAkKFwiI2NoYXJ0LWNvbnRlbnRcIikuaHRtbChsZWdlbmQpO1xuICAkKFwiI2xlZ2VuZC1wYW5lbC10b2dnbGVcIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICQoXCIjbGVnZW5kLXBhbmVsXCIpLnRvZ2dsZShcInNsb3dcIik7XG4gIH0pO1xuXG5cbiAgdmFyIHR5cGVzID0gY2hhcnRUeXBlU2VsZWN0b3IudmFsKCk7XG4gIGZvciAoIHZhciBpID0gMDsgaSA8IHR5cGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBfc2hvd01haW5DaGFydCh0eXBlc1tpXSwgYW5pbWF0ZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gc2hvd1BvcHVwKCkge1xuICBnYSgnc2VuZCcsICdldmVudCcsICd1aScsICdpbnRlcmFjdGlvbicsICdzaG93LWNoYXJ0LXBvcHVwJywgMSk7XG5cblxuICBzbGlkZXJQb3B1cC5maW5kKFwiLm93bC10aGVtZVwiKS5odG1sKFwiXCIpO1xuICAkKCdib2R5Jykuc2Nyb2xsVG9wKDApLmNzcygnb3ZlcmZsb3cnLCdoaWRkZW4nKS5hcHBlbmQoc2xpZGVyUG9wdXBCZykuYXBwZW5kKHNsaWRlclBvcHVwKTtcblxuICAvLyB0aGlzIGNvdWxkIGNhc2UgYmFkbmVzcy4uLi4gIHdoeSBkb2Vzbid0IGl0IGxpdmUgd2hlbiByZW1vdmVkIGZyb20gRE9NP1xuICBzbGlkZXJQb3B1cC5maW5kKCcuc2xpZGUtcG9wdXAtY2xvc2UnKS5vbignY2xpY2snLGZ1bmN0aW9uKCl7XG4gICAgICBoaWRlUG9wdXAoKTtcbiAgfSk7XG5cbiAgdmFyIHR5cGVzID0gY2hhcnRUeXBlU2VsZWN0b3IudmFsKCk7XG4gIGZvciAoIHZhciBpID0gMDsgaSA8IHR5cGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBfc2hvd1BvcHVwQ2hhcnQodHlwZXNbaV0pO1xuICB9XG5cbiAgJCgnI2Nhcm91c2VsJykub3dsQ2Fyb3VzZWwoe1xuICAgICAgbmF2aWdhdGlvbiA6IHRydWUsIC8vIFNob3cgbmV4dCBhbmQgcHJldiBidXR0b25zXG4gICAgICBzbGlkZVNwZWVkIDogMzAwLFxuICAgICAgcGFnaW5hdGlvblNwZWVkIDogNDAwLFxuICAgICAgc2luZ2xlSXRlbTp0cnVlXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBoaWRlUG9wdXAoKSB7XG4gIHNsaWRlclBvcHVwQmcucmVtb3ZlKCk7XG4gIHNsaWRlclBvcHVwLnJlbW92ZSgpO1xuICAkKCdib2R5JykuY3NzKCdvdmVyZmxvdycsJ2F1dG8nKTtcbn1cblxuZnVuY3Rpb24gX3Nob3dNYWluQ2hhcnQodHlwZSwgYW5pbWF0ZSkge1xuICB2YXIgY2hhcnRUeXBlID0gJChcIi5jaGFydC10eXBlLXRvZ2dsZS5hY3RpdmVcIikuYXR0cihcInZhbHVlXCIpO1xuICB2YXIgcGFuZWwgPSAkKFwiPGRpdiAvPlwiKTtcbiAgdmFyIG91dGVyUGFuZWwgPSAkKFwiPGRpdj5cIitcbiAgXHRcIjxhIGNsYXNzPSdidG4gYnRuLXhzIGJ0bi1kZWZhdWx0JyBzdHlsZT0nXCIrKGNoYXJ0VHlwZSAhPSBcInRpbWVsaW5lXCIgPyBcInBvc2l0aW9uOmFic29sdXRlO3otaW5kZXg6MTA7bWFyZ2luOjAgMCAtMjBweCAyMHB4XCIgOiBcIm1hcmdpbi1ib3R0b206NXB4XCIpK1xuICAgICAgXCInIHR5cGU9J1wiK3R5cGUrXCInPlwiICtcbiAgXHRcIjxpIGNsYXNzPSdpY29uLXJlbW92ZSc+PC9pPiBcIit0eXBlK1wiPC9hPjwvZGl2PlwiKTtcbiAgb3V0ZXJQYW5lbC5maW5kKFwiYVwiKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICAgIHJlbW92ZSgkKHRoaXMpKTtcbiAgfSk7XG4gIGlmKCBjaGFydFR5cGUgPT0gXCJ0aW1lbGluZVwiICkgb3V0ZXJQYW5lbC5jc3MoXCJtYXJnaW4tYm90dG9tXCIsXCIyMHB4XCIpO1xuICAkKFwiI2NoYXJ0LWNvbnRlbnRcIikuYXBwZW5kKG91dGVyUGFuZWwuYXBwZW5kKHBhbmVsKSk7XG4gIF9jcmVhdGVDaGFydCh0eXBlLCBjaGFydFR5cGUsIHBhbmVsLCBmYWxzZSwgbnVsbCwgYW5pbWF0ZSk7XG59XG5cbmZ1bmN0aW9uIF9zaG93UG9wdXBDaGFydCh0eXBlKSB7XG4gIHZhciBwYW5lbCA9ICQoXCI8ZGl2IGNsYXNzPSdpdGVtJz48L2Rpdj5cIik7XG5cbiAgdmFyIHByaW50QnRuID0gJChcIjxhIGNsYXNzPSdidG4gYnRuLXNtIGJ0bi1kZWZhdWx0JyBzdHlsZT0nbWFyZ2luLWxlZnQ6MTZweCc+PGkgY2xhc3M9J2ljb24tcHJpbnQnPjwvaT4gUHJpbnQ8L2E+XCIpLm9uKCdjbGljaycsZnVuY3Rpb24oKXtcbiAgICAgcHJpbnQoY2hhcnRQYW5lbCk7XG4gIH0pO1xuICBwYW5lbC5hcHBlbmQocHJpbnRCdG4pO1xuXG4gIHZhciBjaGFydFBhbmVsID0gJChcIjxkaXY+PC9kaXY+XCIpO1xuICBwYW5lbC5hcHBlbmQoY2hhcnRQYW5lbCk7XG5cbiAgc2xpZGVyUG9wdXAuZmluZChcIi5vd2wtdGhlbWVcIikuYXBwZW5kKHBhbmVsKTtcbiAgX2NyZWF0ZUNoYXJ0KHR5cGUsICdsaW5lJywgY2hhcnRQYW5lbCwgdHJ1ZSwgW01hdGgucm91bmQoJCh3aW5kb3cpLndpZHRoKCkqLjg4KSwgTWF0aC5yb3VuZCgoJCh3aW5kb3cpLmhlaWdodCgpKi45MCktMTI1KV0pO1xufVxuXG5mdW5jdGlvbiBfY3JlYXRlQ2hhcnQodHlwZSwgY2hhcnRUeXBlLCBwYW5lbCwgc2hvd0xlZ2VuZCwgc2l6ZSwgYW5pbWF0ZSkge1xuICB2YXIgY29sID0gMDtcblxuICAvKnZhciBkdCA9IG5ldyBnb29nbGUudmlzdWFsaXphdGlvbi5EYXRhVGFibGUoKTtcblxuICBpZiggY2hhcnRUeXBlID09ICd0aW1lbGluZScgKSB7XG4gICAgICBkdC5hZGRDb2x1bW4oJ2RhdGUnLCAnTW9udGgnKTtcbiAgfSBlbHNlIHtcbiAgICAgIC8vZHQuYWRkQ29sdW1uKCdudW1iZXInLCAnTW9udGgnKTtcbiAgICAgIGR0LmFkZENvbHVtbignc3RyaW5nJywgJ01vbnRoJyk7XG4gIH1cblxuICAvLyBzZXQgdGhlIGZpcnN0IGNvbHVtblxuICBpZiggIWNEYXRhWzBdLnNpbmdsZVJ1biApIHtcbiAgICAgIGZvciggdmFyIGkgPSAwOyBpIDwgY0RhdGEubGVuZ3RoOyBpKysgKSB7XG4gICAgICAgICAgdmFyIGxhYmVsID0gXCJcIjtcbiAgICAgICAgICBmb3IoIHZhciBrZXkgaW4gY0RhdGFbaV0uaW5wdXRzICkge1xuICAgICAgICAgICAgICBsYWJlbCArPSBrZXkucmVwbGFjZSgvLipcXC4vLCcnKStcIj1cIitjRGF0YVtpXS5pbnB1dHNba2V5XStcIiBcXG5cIjtcbiAgICAgICAgICB9XG4gICAgICAgICAgbGFiZWwgPSBsYWJlbC5yZXBsYWNlKC8sXFxzJC8sJycpO1xuICAgICAgICAgIGR0LmFkZENvbHVtbignbnVtYmVyJywgbGFiZWwpO1xuICAgICAgfVxuICB9IGVsc2Uge1xuICAgICAgZHQuYWRkQ29sdW1uKCdudW1iZXInLCB0eXBlKTtcbiAgfVxuXG4gIC8vIGZpbmQgdGhlIGNvbHVtbiB3ZSB3YW50IHRvIGNoYXJ0XG4gIGZvciAoIHZhciBpID0gMDsgaSA8IGNEYXRhWzBdLm91dHB1dFswXS5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGNEYXRhWzBdLm91dHB1dFswXVtpXSA9PSB0eXBlKSB7XG4gICAgICAgICAgY29sID0gaTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgfSovXG5cbiAgLyp2YXIgY0RhdGUgPSBuZXcgRGF0ZSgkKFwiI2lucHV0LW1hbmFnZS1kYXRlUGxhbnRlZFwiKS52YWwoKSk7XG5cbiAgdmFyIGRhdGEgPSBbXTtcbiAgdmFyIG1heCA9IDA7XG4gIC8vIGNyZWF0ZSB0aGUgW11bXSBhcnJheSBmb3IgdGhlIGdvb2dsZSBjaGFydFxuICBmb3IgKCB2YXIgaSA9IDE7IGkgPCBjRGF0YVswXS5vdXRwdXQubGVuZ3RoOyBpKyspIHtcbiAgICAgIC8vaWYgKHR5cGVvZiBjRGF0YVswXS5vdXRwdXRbaV1bY29sXSA9PT0gJ3N0cmluZycpIGNvbnRpbnVlO1xuXG4gICAgICB2YXIgcm93ID0gW107XG5cbiAgICAgIC8vdmFyIGRhdGUgPSBuZXcgRGF0ZShjRGF0ZS5nZXRZZWFyKCkrMTkwMCwgY0RhdGUuZ2V0TW9udGgoKStpLCBjRGF0ZS5nZXREYXRlKCkpO1xuICAgICAgaWYoIGNoYXJ0VHlwZSA9PSBcInRpbWVsaW5lXCIgKSB7XG4gICAgICAgICAgLy8gYWRkIG9uIG1vbnRoXG4gICAgICAgICAgcm93LnB1c2gobmV3IERhdGUoY0RhdGFbMF0ub3V0cHV0W2ldWzBdKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJvdy5wdXNoKGNEYXRhWzBdLm91dHB1dFtpXVswXSk7XG4gICAgICB9XG5cbiAgICAgIGZvciAoIHZhciBqID0gMDsgaiA8IGNEYXRhLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgaWYoIGNEYXRhW2pdLm91dHB1dFtpXVtjb2xdID4gbWF4ICkgbWF4ID0gY0RhdGFbal0ub3V0cHV0W2ldW2NvbF07XG4gICAgICAgICAgcm93LnB1c2goY0RhdGFbal0ub3V0cHV0W2ldW2NvbF0pO1xuICAgICAgfVxuXG4gICAgICBkYXRhLnB1c2gocm93KTtcbiAgfVxuXG4gIGR0LmFkZFJvd3MoZGF0YSk7Ki9cblxuXG5cbiAgdmFyIGR0ID0gZ29vZ2xlLnZpc3VhbGl6YXRpb24uYXJyYXlUb0RhdGFUYWJsZShjRGF0YS5kYXRhW3R5cGVdKTtcblxuXG4gIGlmKCBvdXRwdXREZWZpbml0aW9uc1t0eXBlXSApIHtcbiAgICAgIHZhciBkZXNjID0gb3V0cHV0RGVmaW5pdGlvbnNbdHlwZV07XG4gICAgICB2YXIgbGFiZWwgPSBkZXNjLmxhYmVsICYmIGRlc2MubGFiZWwubGVuZ3RoID4gMCA/IFwiIC0gXCIrZGVzYy5sYWJlbCA6IFwiXCI7XG4gICAgICB2YXIgdW5pdHMgPSBkZXNjLnVuaXRzICYmIGRlc2MudW5pdHMubGVuZ3RoID4gMCA/IFwiIFtcIitkZXNjLnVuaXRzK1wiXVwiIDogXCJcIjtcbiAgICAgIHR5cGUgPSB0eXBlK2xhYmVsK3VuaXRzO1xuICB9XG5cblxuICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgIHZBeGlzIDoge1xuICAgICAgICAgIHRpdGxlIDogdHlwZVxuICAgICAgfSxcbiAgICAgIGhBeGlzIDoge1xuICAgICAgICAgIHRpdGxlIDogXCJcIlxuICAgICAgfSxcbiAgICAgIGludGVycG9sYXRlTnVsbHMgOiB0cnVlXG4gIH07XG4gIGlmKCAhc2hvd0xlZ2VuZCApIG9wdGlvbnMubGVnZW5kID0ge3Bvc2l0aW9uOlwibm9uZVwifTtcblxuICBpZiggc2l6ZSApIHtcbiAgICAgIG9wdGlvbnMud2lkdGggPSBzaXplWzBdO1xuICAgICAgb3B0aW9ucy5oZWlnaHQgPSBzaXplWzFdO1xuICB9IGVsc2Uge1xuICAgICAgb3B0aW9ucy53aWR0aCA9IHBhbmVsLndpZHRoKCk7XG4gICAgICBvcHRpb25zLmhlaWdodCA9IG9wdGlvbnMud2lkdGgqLjQ7XG4gIH1cbiAgcGFuZWwud2lkdGgob3B0aW9ucy53aWR0aCkuaGVpZ2h0KG9wdGlvbnMuaGVpZ2h0KTtcblxuICBpZiggY2hhcnRUeXBlID09ICd0aW1lbGluZScgKSB7XG4gICAgICBvcHRpb25zLmRpc3BsYXlBbm5vdGF0aW9ucyA9IHRydWU7XG4gICAgICB2YXIgY2hhcnQgPSBuZXcgZ29vZ2xlLnZpc3VhbGl6YXRpb24uQW5ub3RhdGVkVGltZUxpbmUocGFuZWxbMF0pO1xuICAgICAgY2hhcnQuZHJhdyhkdCwgb3B0aW9ucyk7XG4gIH0gZWxzZSB7XG4gICAgICB2YXIgY2hhcnQgPSBuZXcgZ29vZ2xlLnZpc3VhbGl6YXRpb24uTGluZUNoYXJ0KHBhbmVsWzBdKTtcbiAgICAgIGNoYXJ0LmRyYXcoZHQsIG9wdGlvbnMpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBzZXRBcHAgOiBmdW5jdGlvbihhKSB7XG4gICAgYXBwID0gYTtcbiAgfSxcbiAgICBpbml0IDogaW5pdCxcbiAgICBzZXREYXRhIDogc2V0RGF0YSxcbiAgICBzZWxlY3QgOiBzZWxlY3QsXG4gICAgdW5zZWxlY3QgOiB1bnNlbGVjdCxcbiAgICBzZWxlY3RBbGwgOiBzZWxlY3RBbGwsXG4gICAgdW5zZWxlY3RBbGwgOiB1bnNlbGVjdEFsbCxcbiAgICB1cGRhdGVDaGFydHMgOiB1cGRhdGVDaGFydHMsXG4gICAgcmVtb3ZlIDogcmVtb3ZlLFxuICAgIHNob3dQb3B1cDogc2hvd1BvcHVwLFxuICAgIGhpZGVQb3B1cDogaGlkZVBvcHVwLFxuICAgIHJlc2l6ZSA6IHJlc2l6ZVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBpbnB1dHMgOiB7XG4gICAgd2VhdGhlciA6IFsnbW9udGgnLCd0bWluJywndG1heCcsJ3RkbWVhbicsJ3BwdCcsJ3JhZCcsJ2RheWxpZ2h0J11cbiAgfSxcbiAgb3V0cHV0cyA6IFsnVlBEJywnZlZQRCcsJ2ZUJywnZkZyb3N0JywnUEFSJywnSW50Y3B0bicsJ0FTVycsJ0N1bUlycmlnJyxcbiAgICAgICAgICAgICAnSXJyaWcnLCdTdGFuZEFnZScsJ0xBSScsJ0NhbkNvbmQnLCdUcmFuc3AnLCdFVHInLCdLYycsJ2ZTVycsJ2ZBZ2UnLFxuICAgICAgICAgICAgICdQaHlzTW9kJywncFInLCdwUycsJ2xpdHRlcmZhbGwnLCd4UFAnLCdOUFAnLCdXRicsJ1dSJywnV1MnLCdXJ10sXG4gIGRlYnVnIDogZmFsc2UsXG4gIGRldm1vZGUgOiBmYWxzZSxcbiAgZGFpbHkgOiB0cnVlXG59O1xuIiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL2Jyb3dzZXJzdGFjay9mbGFzaGJsb2NrLWRldGVjdG9yXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oY2FsbGJhY2tNZXRob2Qpe1xuICAgIHZhciByZXR1cm5fdmFsdWUgPSAwO1xuXG4gICAgaWYobmF2aWdhdG9yLnBsdWdpbnNbXCJTaG9ja3dhdmUgRmxhc2hcIl0pIHtcbiAgICAgICAgICBlbWJlZF9sZW5ndGggPSAkKCdlbWJlZCcpLmxlbmd0aDtcbiAgICAgICAgICBvYmplY3RfbGVuZ3RoID0gJCgnb2JqZWN0JykubGVuZ3RoO1xuXG4gICAgICAgICAgaWYoKGVtYmVkX2xlbmd0aCA+IDApIHx8IChvYmplY3RfbGVuZ3RoID4gMCkpIHtcbiAgICAgICAgICAgICAgLyogTWFjIC8gQ2hyb21lIHVzaW5nIEZsYXNoQmxvY2sgKyBNYWMgLyBTYWZhcmkgdXNpbmcgQWRCbG9jayAqL1xuICAgICAgICAgICAgICAkKCdvYmplY3QsIGVtYmVkJykuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYoJCh0aGlzKS5jc3MoJ2Rpc3BsYXknKSA9PT0gJ25vbmUnKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybl92YWx1ZSA9IDI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgLyogTWFjIC8gRmlyZWZveCB1c2luZyBGbGFzaEJsb2NrICovXG4gICAgICAgICAgICAgIGlmKCAkKCdkaXZbYmdpbmFjdGl2ZV0nKS5sZW5ndGggPiAwICl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybl92YWx1ZSA9IDI7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgfSBlbHNlIGlmKG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignTVNJRScpID4gLTEpIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBuZXcgQWN0aXZlWE9iamVjdCgnU2hvY2t3YXZlRmxhc2guU2hvY2t3YXZlRmxhc2gnKTtcbiAgICAgICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuX3ZhbHVlID0gMjtcbiAgICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgICAvKiBJZiBmbGFzaCBpcyBub3QgaW5zdGFsbGVkICovXG4gICAgICAgICAgcmV0dXJuX3ZhbHVlID0gMTtcbiAgICB9XG5cbiAgICBpZihjYWxsYmFja01ldGhvZCAmJiB0eXBlb2YoY2FsbGJhY2tNZXRob2QpID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICBjYWxsYmFja01ldGhvZChyZXR1cm5fdmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHJldHVybl92YWx1ZTtcbiAgICB9XG59O1xuIiwiLypcbiAqIFNhdmUgdG8gZ29vZ2xlIGRyaXZlIChleHBvcnQgYXMgQ1NWKVxuICovXG5cbnZhciBnZHJpdmUgPSByZXF1aXJlKCcuL2luZGV4Jyk7XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gICQoXCIjZXhwb3J0LW1vZGFsXCIpLm1vZGFsKHtcbiAgICBzaG93IDogZmFsc2VcbiAgfSk7XG5cbiAgJChcIiNzaG93LWV4cG9ydC1jc3ZcIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICBfc2V0TWVzc2FnZShudWxsKTtcblxuICAgICQoXCIjZXhwb3J0LW5hbWVcIikudmFsKFwiM1BHIE1vZGVsIFJlc3VsdHMgKFwiK25ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5yZXBsYWNlKC9ULywnICcpLnJlcGxhY2UoL1xcLlxcZCpaLywnJykrXCIpXCIpO1xuICAgICQoXCIjZXhwb3J0LW1vZGFsXCIpLm1vZGFsKCdzaG93Jyk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBfc2V0TWVzc2FnZShtc2csIHR5cGUsIHByb2dyZXNzKSB7XG4gIGlmKCAhbXNnICkge1xuICAgIHJldHVybiAkKFwiI2V4cG9ydC1tc2dcIikuaGlkZSgpO1xuICB9XG4gICQoXCIjZXhwb3J0LW1zZ1wiKS5zaG93KCk7XG5cbiAgaWYoIHByb2dyZXNzICkge1xuICAgICQoXCIjZXhwb3J0LW1zZy1wcm9ncmVzc1wiKS5zaG93KCk7XG4gIH0gZWxzZSB7XG4gICAgJChcIiNleHBvcnQtbXNnLXByb2dyZXNzXCIpLmhpZGUoKTtcbiAgfVxuXG4gICQoJyNleHBvcnQtbXNnJykuYXR0cihcImNsYXNzXCIsJ2FsZXJ0IGFsZXJ0LScrdHlwZSk7XG4gICQoJyNleHBvcnQtbXNnLXRleHQnKS5odG1sKG1zZyk7XG59XG5cbmZ1bmN0aW9uIF91cGRhdGVQcm9ncmVzcyhpbmRleCwgdG90YWwpIHtcbiAgcGVyY2VudCA9IDEwMCAqICggaW5kZXggLyB0b3RhbCApO1xuICAkKFwiI2V4cG9ydC1tc2ctcHJvZ3Jlc3MtYmFyXCIpLmF0dHIoXCJhcmlhLXZhbHVlbm93XCIsIHBlcmNlbnQpLmNzcyhcIndpZHRoXCIscGVyY2VudCtcIiVcIik7XG59XG5cbi8vIHNlZSBpZiBhbiBlcnJvciBleGlzdHMsIGlmIHNvLCBzZXQgc3RhdGVcbmZ1bmN0aW9uIF9jaGVja0Vycm9yKGZpbGUpIHtcbiAgdmFyIGVycm9yTWVzc2FnZSA9IG51bGw7XG4gIGlmKCAhZmlsZSApIGVycm9yTWVzc2FnZSA9IFwiRXJyb3IgY3JlYXRpbmcgZmlsZSBvbiBHb29nbGUgRHJpdmUgOihcIjtcbiAgaWYoIGZpbGUuZXJyb3IgKSBlcnJvck1lc3NhZ2UgPSBmaWxlLm1lc3NhZ2U7XG5cbiAgaWYoIGVycm9yTWVzc2FnZSApIHtcbiAgICBfc2V0TWVzc2FnZShlcnJvck1lc3NhZ2UsIFwiZGFuZ2VyXCIpO1xuICAgICQoXCIjZXhwb3J0LWNzdlwiKS5yZW1vdmVDbGFzcyhcImRpc2FibGVkXCIpLmh0bWwoXCJFeHBvcnRcIik7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4gIC8vIGV4cG9ydCBhcyBjc3ZcbmZ1bmN0aW9uIHJ1bihyZXN1bHRzKSB7XG4gIGdhKCdzZW5kJywgJ2V2ZW50JywgJ3VpJywgJ2ludGVyYWN0aW9uJywgJ2V4cG9ydC1kcml2ZS1jc3YnLCAxKTtcblxuICAkKFwiI2V4cG9ydC1jc3ZcIikuYWRkQ2xhc3MoXCJkaXNhYmxlZFwiKS5odG1sKFwiRXhwb3J0aW5nLi4uXCIpO1xuXG4gIHZhciBuYW1lID0gJChcIiNleHBvcnQtbmFtZVwiKS52YWwoKTtcbiAgaWYoIG5hbWUubGVuZ3RoID09PSAwICkge1xuICAgIF9zZXRNZXNzYWdlKFwiUGxlYXNlIHByb3ZpZGUgYSBmb2xkZXIgbmFtZVwiLCBcImRhbmdlclwiKTtcbiAgICAkKFwiI2V4cG9ydC1jc3ZcIikucmVtb3ZlQ2xhc3MoXCJkaXNhYmxlZFwiKS5odG1sKFwiRXhwb3J0XCIpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBkYXRhID0gcmVzdWx0cy5kYXRhO1xuXG4gIC8vIGNyZWF0ZSBhIGxpc3Qgc28gd2UgY2FuIHJlY3Vyc2l2ZWx5IGl0ZXJhdGVcbiAgdmFyIGtleXMgPSBbXTtcbiAgZm9yKCB2YXIga2V5IGluIGRhdGEgKSBrZXlzLnB1c2goa2V5KTtcblxuICAvLyBjcmVhdGUgZm9sZGVyXG4gIF9zZXRNZXNzYWdlKFwiQ3JlYXRpbmcgZXhwb3J0IGZvbGRlci4uLlwiLCBcImluZm9cIiwgdHJ1ZSk7XG4gIF91cGRhdGVQcm9ncmVzcygxLCBrZXlzLmxlbmd0aCsyKTtcbiAgZ2RyaXZlLnNhdmVGaWxlKG5hbWUsXCJBSEIgM1BHIE1vZGVsIFJlc3VsdHNcIixcImFwcGxpY2F0aW9uL3ZuZC5nb29nbGUtYXBwcy5mb2xkZXJcIixcIlwiLGZ1bmN0aW9uKGZpbGUpe1xuICAgIGlmKCBfY2hlY2tFcnJvcihmaWxlKSApIHJldHVybjtcbiAgICB2YXIgcGFyZW50ID0gZmlsZS5pZDtcbiAgICBfdXBkYXRlUHJvZ3Jlc3MoMiwga2V5cy5sZW5ndGgrMik7XG5cbiAgICAvLyBjcmVhdGUgYSBuaWNlIGZpbGUgZGVzY3JpYmluZyB0aGUgY3VycmVudCBleHBvcnRcbiAgICBfc2V0TWVzc2FnZShcIkNyZWF0aW5nIGNvbmZpZyBmaWxlLi4uXCIsIFwiaW5mb1wiLCB0cnVlKTtcbiAgICBkZWxldGUgcmVzdWx0cy5jb25maWcucGxhbnRhdGlvbl9zdGF0ZTtcbiAgICB2YXIgY29uZmlnID0gSlNPTi5zdHJpbmdpZnkocmVzdWx0cy5jb25maWcsbnVsbCxcIiAgXCIpO1xuICAgIGdkcml2ZS5zYXZlRmlsZShcImNvbmZpZy50eHRcIixcIkFIQiAzUEcgTW9kZWwgLSBSdW4gQ29uZmlndXJhdGlvblwiLFwidGV4dC9wbGFpblwiLGNvbmZpZyxmdW5jdGlvbihmaWxlKXtcbiAgICAgIGlmKCBfY2hlY2tFcnJvcihmaWxlKSApIHJldHVybjtcbiAgICAgIF91cGRhdGVQcm9ncmVzcygzLCBrZXlzLmxlbmd0aCsyKTtcblxuICAgICAgX2NyZWF0ZUV4cG9ydCgwLCBrZXlzLCBkYXRhLCBwYXJlbnQpO1xuICAgIH0se3BhcmVudDogcGFyZW50fSlcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIF9jcmVhdGVFeHBvcnQoaW5kZXgsIGtleXMsIGRhdGEsIHBhcmVudCkge1xuXG4gIC8vIHdlIGFyZSBhbGwgZG9uZSA6KVxuICBpZiggaW5kZXggPT0ga2V5cy5sZW5ndGggKSB7XG4gICAgX3VwZGF0ZVByb2dyZXNzKDEsIDEpO1xuICAgIF9zZXRNZXNzYWdlKFwiRXhwb3J0IFN1Y2Nlc3NmdWwuPGJyIC8+PGEgaHJlZj0naHR0cHM6Ly9kcml2ZS5nb29nbGUuY29tLyNmb2xkZXJzL1wiICsgcGFyZW50ICtcbiAgICAgICAgICBcIicgdGFyZ2V0PSdfYmxhbmsnPjxpIGNsYXNzPSdpY29uLWV4dGVybmFsLWxpbmstc2lnbic+PC9pPiBPcGVuIGluIEdvb2dsZSBEcml2ZTwvYT5cIiwgXCJzdWNjZXNzXCIpO1xuICAgICQoXCIjZXhwb3J0LWNzdlwiKS5yZW1vdmVDbGFzcyhcImRpc2FibGVkXCIpLmh0bWwoXCJFeHBvcnRcIik7XG4gIH0gZWxzZSB7XG5cbiAgICB2YXIga2V5ID0ga2V5c1tpbmRleF07XG4gICAgdmFyIGNzdiA9IFwiXCI7XG5cbiAgICAvLyBUT0RPOiBhZGQgbW9udGggYW5kIGRhdGVcblxuICAgIGZvciggdmFyIGkgPSAwOyBpIDwgZGF0YVtrZXldLmxlbmd0aDsgaSsrICkge1xuICAgICAgaWYoIGRhdGFba2V5XVtpXS5sZW5ndGggPT09IDAgKSBjb250aW51ZTsgLy8gaWdub3JlIHRoZSBibGFuayByb3dzXG5cbiAgICAgIGZvciggdmFyIGogPSAwOyBqIDwgZGF0YVtrZXldW2ldLmxlbmd0aDsgaisrICkgY3N2ICs9IGRhdGFba2V5XVtpXVtqXStcIixcIjtcbiAgICAgIGNzdiA9IGNzdi5yZXBsYWNlKC8sJC8sJycpK1wiXFxuXCI7XG4gICAgfVxuXG4gICAgX3NldE1lc3NhZ2UoXCJDcmVhdGluZyBcIitrZXlzW2luZGV4XStcIi5jc3YuLi4gXCIsIFwiaW5mb1wiLCB0cnVlKTtcbiAgICBnZHJpdmUuc2F2ZUZpbGUoa2V5c1tpbmRleF0rXCIuY3N2XCIsXCJcIixcInRleHQvY3N2XCIsY3N2LGZ1bmN0aW9uKGZpbGUpe1xuICAgICAgaWYoIF9jaGVja0Vycm9yKGZpbGUpICkgcmV0dXJuO1xuXG4gICAgICBfdXBkYXRlUHJvZ3Jlc3MoaW5kZXgrNCwga2V5cy5sZW5ndGgrMik7XG5cbiAgICAgIGluZGV4Kys7XG4gICAgICBfY3JlYXRlRXhwb3J0KGluZGV4LCBrZXlzLCBkYXRhLCBwYXJlbnQpO1xuICAgIH0se2NvbnZlcnQ6IHRydWUsIHBhcmVudDogcGFyZW50fSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHJ1biA6IHJ1bixcbiAgaW5pdCA6IGluaXRcbn07XG4iLCJ2YXIgT2F1dGggPSByZXF1aXJlKCcuLi9vYXV0aCcpO1xudmFyIGdkcml2ZVJUID0gcmVxdWlyZSgnLi9yZWFsdGltZScpO1xudmFyIG1vZGVsSU8gPSByZXF1aXJlKCcuLi9tb2RlbFJ1bkhhbmRsZXInKTtcbnZhciBhcHA7XG5cblxudmFyIE1JTUVfVFlQRSA9IFwiYXBwbGljYXRpb24vdm5kLmFoYi0zcGcucnVuXCI7XG52YXIgVFJFRV9NSU1FX1RZUEUgPSBcImFwcGxpY2F0aW9uL3ZuZC5haGItM3BnLnRyZWVcIjtcbnZhciBEUklWRV9BUElfVkVSU0lPTiA9IFwidjJcIjtcblxuLy8gZ29vZ2xlIG9hdXRoIGFjY2VzcyB0b2tlblxudmFyIHRva2VuID0gXCJcIjtcblxuLy8gY3VycmVudGx5IGxvYWRlZCBnZHJpdmUgZmlsZSBpZFxudmFyIGxvYWRlZEZpbGUgPSBudWxsO1xuLy8gbGlzdCBvZiBjdXJyZW50bHkgbG9hZGVkIGZpbGVzIChtZXRhZGF0YSlcbnZhciBmaWxlTGlzdCA9IFtdO1xuLy8gZ29vZ2xlIGRyaXZlIHNoYXJlIGNsaWVudFxudmFyIGNsaWVudCA9IG51bGw7XG5cbi8vIGxvYWRlZCB0cmVlIGFuZCBtYW5hZ2VtZW50XG52YXIgbG9hZGVkVHJlZSA9IG51bGw7XG4vLyBsaXN0IG9mIGN1cnJlbnRseSBsb2FkZWQgdHJlZSBmaWxlcyAobWV0YWRhdGEpXG52YXIgdHJlZUxpc3QgPSBbXTtcblxuLy8gY3VycmVudCBNSU1FIFRZUEUgd2UgYXJlIHNhdmluZ1xudmFyIHNhdmVNaW1lVHlwZSA9IFwiXCI7XG5cbmZ1bmN0aW9uIHNldEFwcChhKSB7XG4gIGFwcCA9IGE7XG4gIGdkcml2ZVJULnNldEFwcChhcHApO1xufVxuXG4vKioqXG4gKiAgSW5pdGlhbGl6ZSBnb29nbGUgZHJpdmUgcGFuZWxzLCBidG5zIGFuZCBsb2dpblxuICoqKi9cbmZ1bmN0aW9uIGluaXQoY2FsbGJhY2spIHtcbiAgLy8gaW5pdCBib290c3RyYXAgbW9kYWxcbiAgJChcIiNzYXZlLW1vZGFsXCIpLm1vZGFsKHtcbiAgICBzaG93IDogZmFsc2VcbiAgfSk7XG5cbiAgLy8gaW5pdCBib290c3RyYXAgbW9kYWxcbiAgJChcIiNsb2FkLW1vZGFsXCIpLm1vZGFsKHtcbiAgICBzaG93IDogZmFsc2VcbiAgfSk7XG5cbiAgLy8gdGhlIGFib3V0IG1vZGFsIGxpbmsgaXMgY3JlYXRlZCBiZWxvdywgc28gd2h5IG5vdC4uLlxuICAkKFwiI2Fib3V0LW1vZGFsXCIpLm1vZGFsKHtcbiAgICBzaG93IDogZmFsc2VcbiAgfSk7XG5cbiAgLy8gdGhlIGFib3V0IG1vZGFsIGxpbmsgaXMgY3JlYXRlZCBiZWxvdywgc28gd2h5IG5vdC4uLlxuICAkKFwiI2hlbHAtbW9kYWxcIikubW9kYWwoe1xuICAgIHNob3cgOiBmYWxzZVxuICB9KTtcblxuICAvLyBzZXQgdGhlICd1cGRhdGUnIGJ0biBjbGljayBoYW5kbGVyXG4gICQoXCIjc2F2ZS11cGRhdGUtYnRuXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgIF91cGRhdGVDdXJyZW50RmlsZSgpO1xuICB9KTtcblxuICAvLyBzZXQgdGhlICduZXcnIGJ0biBjbGljayBoYW5kbGVyXG4gICQoXCIjc2F2ZS1uZXctYnRuXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgIF9zYXZlTmV3RmlsZSgpO1xuICB9KTtcblxuICAvLyBjcmVhdGUgdGhlIHRvcCByaWdodCBtZW51XG4gIF9jcmVhdGVMb2dpbkJ0bigpO1xuXG4gIC8vIGxvYWQgdGhlIGdvb2dsZSBhdXRoIGFuZCBkcml2ZSBhcGknc1xuICBfbG9hZEFwaShmdW5jdGlvbigpIHtcbiAgICAvLyBpZiB0aGUgdXNlciBpcyBhdXRob3JpemVkIGdyYWIgdGhlIHJlZnJlc2ggdG9rZW5cbiAgICBPYXV0aC5pc0F1dGhvcml6ZWQoZnVuY3Rpb24ocmVmcmVzaFRva2VuKXtcbiAgICAgIC8vIGlmIHRoZXJlIGlzIG5vIHJlZnJlc2ggdG9rZW4sIGxlYXZlLCB3ZSBhcmUgaW5pdGlhbGl6ZWRcbiAgICAgIGlmKCAhcmVmcmVzaFRva2VuICkgcmV0dXJuIGNhbGxiYWNrKCk7XG5cbiAgICAgIC8vIGlmIHdlIGhhdmUgYSByZWZlc2ggdG9rZW4sIHRoZW4gdXNlciBpcyBhbGwgc2V0LFxuICAgICAgLy8gZ2V0IGEgbmV3IGFjY2VzcyB0b2tlbiBzbyB3ZSBjYW4gc3RhcnQgdXNpbmcgdGhlIGFwaSdzXG4gICAgICAvLyBncmFiIHRoZWlyIGluZm9ybWF0aW9uIGFuZCBkaXNwbGF5XG4gICAgICBPYXV0aC5nZXRBY2Nlc3NUb2tlbihmdW5jdGlvbih0KXtcbiAgICAgICAgdG9rZW4gPSB0O1xuICAgICAgICBpZiggdG9rZW4gKSBfc2V0VXNlckluZm8oKTtcbiAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgLy8gY2hlY2sgaWYgYWNjZXNzIHRva2VuIGhhcyBleHBpcmVkXG4gICAgc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICBfY2hlY2tUb2tlbigpO1xuICAgIH0sIDEwMDAgKiA1ICogNjApO1xuICB9KTtcblxuICAvLyBzZXR1cCB0aGUgdHJlZSAnc2hhcmUnIGJ0blxuICAkKFwiI3NoYXJlLXRyZWUtYnRuXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgLy8gc2VlIGlmIHdlIGhhdmUgYSBzaGFyZSBjbGllbnRcbiAgICBpZiggY2xpZW50ID09IG51bGwgKSB7XG4gICAgICAvLyBubyBjbGllbnQsIGxvYWQgYXBpXG4gICAgICBnYXBpLmxvYWQoJ2RyaXZlLXNoYXJlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgLy8gb24gbG9hZCwgc2hvdyB0aGUgc2hhcmUgcG9wdXAgd2l0aCB0aGUgY3VycmVudCB0cmVlXG4gICAgICAgICBjbGllbnQgPSBuZXcgZ2FwaS5kcml2ZS5zaGFyZS5TaGFyZUNsaWVudChPYXV0aC5BUFBfSUQpO1xuICAgICAgICAgIGNsaWVudC5zZXRJdGVtSWRzKFtsb2FkZWRUcmVlXSk7XG4gICAgICAgICBjbGllbnQuc2hvd1NldHRpbmdzRGlhbG9nKCk7XG4gICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHdlIGhhdmUgYSBjbGllbnQsIHNob3cgdGhlIHNoYXJlIHBvcHVwIHdpdGggY3VycmVudCB0cmVlXG4gICAgICBjbGllbnQuc2V0SXRlbUlkcyhbbG9hZGVkRmlsZV0pO1xuICAgICAgIGNsaWVudC5zaG93U2V0dGluZ3NEaWFsb2coKTtcbiAgICB9XG4gIH0pO1xuXG59XG5cbi8qKipcbiAqIFNhdmUgdGhlIGN1cnJlbnQgbW9kZWwgYXMgYSBuZXcgZ29vZ2xlIGRyaXZlIGZpbGVcbiAqKiovXG5mdW5jdGlvbiBfc2F2ZU5ld0ZpbGUoKSB7XG4gIGdhKCdzZW5kJywgJ2V2ZW50JywgJ3VpJywgJ2ludGVyYWN0aW9uJywgJ3NhdmUtZHJpdmUtZmlsZScsIDEpO1xuXG4gIC8vIGdyYWIgdGhlIG5hbWUgb2YgdGhlIG5ldyBmaWxlXG4gIHZhciBuYW1lID0gJChcIiNzYXZlLW5hbWUtaW5wdXRcIikudmFsKCk7XG4gIGlmKCBuYW1lLmxlbmd0aCA9PSAwICkgeyAvLyB3ZSBhbHdheXMgd2FudCBhIG5hbWUsIGFsZXJ0IGFuZCBxdWl0XG4gICAgX3NldFNhdmVNZXNzYWdlKCdQbGVhc2UgcHJvdmlkZSBhIGZpbGVuYW1lLicsJ2luZm8nKTtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBzZWUgd2hhdCBraW5kIG9mIGZpbGUgd2UgYXJlIGNyZWF0aW5nIGJhc2VkIG9uIHRoZSBzYXZlTWltZVR5cGUgdmFyXG4gIGlmKCBzYXZlTWltZVR5cGUgPT0gTUlNRV9UWVBFICkge1xuICAgIGRhdGEgPSBtb2RlbElPLmV4cG9ydFNldHVwKCk7XG4gIH0gZWxzZSBpZiAoIHNhdmVNaW1lVHlwZSA9PSBUUkVFX01JTUVfVFlQRSApIHtcbiAgICBkYXRhID0gbW9kZWxJTy5leHBvcnRTZXR1cCgpLnRyZWU7XG4gIH0gZWxzZSB7IC8vIGJhZG5lc3NcbiAgICBhbGVydChcIlVua25vd24gTUlNRV9UWVBFOiBcIitzYXZlTWltZVR5cGUpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIHNldCB0aGUgdXNlciBrbm93IHdoYXQgd2UgYXJlIGRvaW5nXG4gIF9zZXRTYXZlTWVzc2FnZSgnPGkgY2xhc3M9XCJpY29uLXNwaW5uZXIgaWNvbi1zcGluXCI+PC9pPiBTYXZpbmcgRmlsZS4uLicsJ2luZm8nKTtcblxuICAvLyBzYXZlIHRoZSBmaWxlXG4gIHNhdmVGaWxlKG5hbWUsXG4gICAgICAkKFwiI3NhdmUtZGVzY3JpcHRpb24taW5wdXRcIikudmFsKCksXG4gICAgICBzYXZlTWltZVR5cGUsXG4gICAgICBkYXRhLFxuICAgICAgZnVuY3Rpb24ocmVzcCkge1xuICAgICAgICAvLyBsZXQgdGhlIHVzZXIga25vdyB3aGF0IGhhcHBlbmVkXG4gICAgICAgIGlmKCByZXNwLmVycm9yICkgcmV0dXJuIF9zZXRTYXZlTWVzc2FnZSgnRmFpbGVkIHRvIHNhdmUgdG8gR29vZ2xlIERyaXZlIDooJywnZGFuZ2VyJyk7XG4gICAgICAgIGVsc2UgX3NldFNhdmVNZXNzYWdlKCdTdWNlc3NmdWxseSBzYXZlZC4nLCdzdWNjZXNzJyk7XG5cbiAgICAgICAgLy8gd2FpdCBhIHRpY2sgdG8gaGlkZSB0aGUgcG9wdXAsIHNvIHVzZXIgc2VlcyBzdWNjZXNzIG1lc3NhZ2VcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICQoXCIjc2F2ZS1tb2RhbFwiKS5tb2RhbCgnaGlkZScpO1xuICAgICAgICB9LDE1MDApO1xuXG4gICAgICAgIC8vIHNob3cgdGhlIHNoYXJlIGJ0blxuICAgICAgICBpZiggc2F2ZU1pbWVUeXBlID09IE1JTUVfVFlQRSApIHtcbiAgICAgICAgICAvLyB3ZSBoYXZlIGEgbmV3IGZpbGUsIHVwZGF0ZSBvdXIgbGlzdFxuICAgICAgICAgIF91cGRhdGVGaWxlTGlzdCgpO1xuXG4gICAgICAgICAgLy8gc2hvdyB0aGUgc2hhcmUgYnRuc1xuICAgICAgICAgICQoXCIjc2hhcmUtYnRuXCIpLnBhcmVudCgpLnNob3coKTtcbiAgICAgICAgICAkKFwiI29wZW4taW4tZHJpdmVcIikuYXR0cihcImhyZWZcIixcImh0dHBzOi8vZG9jcy5nb29nbGUuY29tL2ZpbGUvZC9cIityZXNwLmlkKS5wYXJlbnQoKS5zaG93KCk7XG5cbiAgICAgICAgICAvLyBzZXQgdGhlIGxvYWRlZCBmaWxlIGlkXG4gICAgICAgICAgbG9hZGVkRmlsZSA9IHJlc3AuaWQ7XG4gICAgICAgIH0gZWxzZSBpZiAoIHNhdmVNaW1lVHlwZSA9PSBUUkVFX01JTUVfVFlQRSApIHtcbiAgICAgICAgICAvLyB3ZSBoYXZlIGEgbmV3IHRyZWUsIHVwZGF0ZSB0aGUgbGlzdFxuICAgICAgICAgIF91cGRhdGVUcmVlTGlzdCgpO1xuXG4gICAgICAgICAgLy8gc2hvdyB0aGUgdHJlZSBzaGFyZSBidG5zXG4gICAgICAgICAgJChcIiNzaGFyZS10cmVlLWJ0blwiKS5zaG93KCk7XG4gICAgICAgICAgJChcIiNsb2FkZWQtdHJlZS1uYW1lXCIpLmh0bWwobmFtZSkucGFyZW50KCkuc2hvdygpO1xuXG4gICAgICAgICAgLy8gc2V0IHRoZSBsb2FkZWQgdHJlZXNcbiAgICAgICAgICBsb2FkZWRUcmVlID0gcmVzcC5pZDtcbiAgICAgICAgfVxuICAgICAgfVxuICApO1xufVxuXG4vKioqXG4gKiBVcGRhdGUgdGhlIGN1cnJlbnRseSBsb2FkZWQgZ29vZ2xlIGRyaXZlIGZpbGVcbiAqKiovXG5mdW5jdGlvbiBfdXBkYXRlQ3VycmVudEZpbGUoKSB7XG4gIGdhKCdzZW5kJywgJ2V2ZW50JywgJ3VpJywgJ2ludGVyYWN0aW9uJywgJ3VwZGF0ZS1kcml2ZS1maWxlJywgMSk7XG5cbiAgLy8gbGV0IHRoZSB1c2VyIGtub3cgd2hhdCB3ZSBhcmUgZG9pbmdcbiAgX3NldFNhdmVNZXNzYWdlKCc8aSBjbGFzcz1cImljb24tc3Bpbm5lciBpY29uLXNwaW5cIj48L2k+IFVwZGF0aW5nLi4uJywnaW5mbycpO1xuXG4gIHZhciBmaWxlID0ge307XG4gIHZhciBkYXRhID0ge307XG5cbiAgLy8gZ3JhYiB0aGUgY29ycmVudCBkYXRhIGFuZCBmaWxlaWQgYmFzZWQgb24gbWltZVR5cGVcbiAgaWYoIHNhdmVNaW1lVHlwZSA9PSBNSU1FX1RZUEUgKSB7XG4gICAgZmlsZSA9IGxvYWRlZEZpbGU7XG4gICAgZGF0YSA9IG1vZGVsSU8uZXhwb3J0U2V0dXAoKTtcbiAgfSBlbHNlIGlmICggc2F2ZU1pbWVUeXBlID09IFRSRUVfTUlNRV9UWVBFICkge1xuICAgIGZpbGUgPSBsb2FkZWRUcmVlO1xuICAgIGRhdGEgPSBtb2RlbElPLmV4cG9ydFNldHVwKCkudHJlZTtcbiAgfSBlbHNlIHsgLy8gYmFkbmVzc1xuICAgIGFsZXJ0KFwiVW5rbm93biBNSU1FX1RZUEU6IFwiK3NhdmVNaW1lVHlwZSk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gdXBkYXRlIHRoZSBnb29nbGUgZHJpdmUgZmlsZVxuICB1cGRhdGVGaWxlKGZpbGUsXG4gICAgICBkYXRhLFxuICAgICAgZnVuY3Rpb24ocmVzcCl7XG4gICAgICAgIC8vIGxldCB0aGUgdXNlciBrbm93IHdoYXQgaGFwcGVuZWRcbiAgICAgICAgaWYoIHJlc3AuZXJyb3IgKSByZXR1cm4gX3NldFNhdmVNZXNzYWdlKCdGYWlsZWQgdG8gdXBkYXRlIG9uIEdvb2dsZSBEcml2ZSA6KCcsJ2RhbmdlcicpO1xuICAgICAgICBlbHNlIF9zZXRTYXZlTWVzc2FnZSgnVXBkYXRlIFN1Y2Nlc3NmdWwuJywnc3VjY2VzcycpO1xuXG4gICAgICAgIC8vIHdhaXQgYSB0aWNrIHNvIHRoZSB1c2VyIGtub3dzIHVwZGF0ZSB3YXMgc3VjY2Vzc1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgJChcIiNzYXZlLW1vZGFsXCIpLm1vZGFsKCdoaWRlJyk7XG4gICAgICAgIH0sMTUwMCk7XG5cbiAgICAgICAgLy8gdXBkYXRlIHRoZSBsaXN0IGZvciB3aGF0ZXZlciB0eXBlIHdhcyB1cGRhdGVkXG4gICAgICAgIGlmKCBzYXZlTWltZVR5cGUgPT0gTUlNRV9UWVBFICkge1xuICAgICAgICAgIF91cGRhdGVGaWxlTGlzdCgpO1xuICAgICAgICB9IGVsc2UgaWYgKCBzYXZlTWltZVR5cGUgPT0gVFJFRV9NSU1FX1RZUEUgKSB7XG4gICAgICAgICAgX3VwZGF0ZVRyZWVMaXN0KCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgKTtcbn1cblxuLyoqKlxuICogc2V0IGEgbWVzc2FnZSBmb3IgdGhlICdsb2FkIGZyb20gZHJpdmUnIHBvcHVwLlxuICogIHR5cGUgLSBib29zdHJhcCBhbGVydCB0eXBlXG4gKioqL1xuZnVuY3Rpb24gX3NldExvYWRNZXNzYWdlKG1zZywgdHlwZSkge1xuICBpZiggIW1zZyApIHJldHVybiAkKFwiI2dkcml2ZS1maWxlLW1zZ1wiKS5odG1sKFwiXCIpO1xuICAkKCcjZ2RyaXZlLWZpbGUtbXNnJykuaHRtbCgnPGRpdiBjbGFzcz1cImFsZXJ0IGFsZXJ0LScrdHlwZSsnXCI+Jyttc2crJzwvZGl2PicpO1xufVxuXG4vKioqXG4gKiBzZXQgYSBtZXNzYWdlIGZvciB0aGUgJ3NhdmUgdG8gZHJpdmUnIHBvcHVwXG4gKiB0eXBlIC0gYm9vc3RyYXAgYWxlcnQgdHlwZVxuICoqKi9cbmZ1bmN0aW9uIF9zZXRTYXZlTWVzc2FnZShtc2csIHR5cGUpIHtcbiAgaWYoICFtc2cgKSByZXR1cm4gJChcIiNnZHJpdmUtc2F2ZS1tc2dcIikuaHRtbChcIlwiKTtcbiAgJCgnI2dkcml2ZS1zYXZlLW1zZycpLmh0bWwoJzxkaXYgY2xhc3M9XCJhbGVydCBhbGVydC0nK3R5cGUrJ1wiPicrbXNnKyc8L2Rpdj4nKTtcbn1cblxuLyoqKlxuICogY3JlYXRlIHRoZSB0b3AgcmlnaHQgbWVudS4gVGhpcyBtZW51IGlzIGZvciB3aGVuIHRoZSB1c2VyIGlzIG5vdCBsb2dnZWQgaW5cbiAqKiovXG5mdW5jdGlvbiBfY3JlYXRlTG9naW5CdG4oKSB7XG4gIHZhciBidG4gPSAkKCc8bGkgY2xhc3M9XCJkcm9wZG93blwiPidcbiAgICAgICsgJzxhIGNsYXNzPVwiZHJvcGRvd24tdG9nZ2xlXCIgc3R5bGU9XCJjdXJzb3I6cG9pbnRlclwiPkxvZ2luPGIgY2xhc3M9XCJjYXJldFwiPjwvYj48L2E+J1xuICAgICAgKyAnPHVsIGNsYXNzPVwiZHJvcGRvd24tbWVudVwiPidcbiAgICAgICsgJzxsaT48YSBpZD1cImhlbHBcIj48aSBjbGFzcz1cImljb24tcXVlc3Rpb24tc2lnblwiPjwvaT4gSGVscDwvYT48L2xpPidcbiAgICAgICsgJzxsaT48YSBpZD1cImFib3V0XCI+PGkgY2xhc3M9XCJpY29uLWluZm8tc2lnblwiPjwvaT4gQWJvdXQ8L2E+PC9saT4nXG4gICAgICArICc8bGk+PGEgaWQ9XCJsb2dpbi13aXRoLWdvb2dsZVwiPjxpIGNsYXNzPVwiaWNvbi1zaWduaW5cIj48L2k+IExvZ2luIHdpdGggR29vZ2xlPC9hPjwvbGk+J1xuICAgICAgKyAnPC91bD48L2xpPicpO1xuXG4gIC8vIHNldCBjbGljayBoYW5kbGVycyBmb3IgcG9wdXBcbiAgYnRuLmZpbmQoJ2EuZHJvcGRvd24tdG9nZ2xlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAkKHRoaXMpLnBhcmVudCgpLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XG4gIH0pO1xuXG4gIC8vIGFib3V0IGNsaWNrIGhhbmRsZXJcbiAgYnRuLmZpbmQoJyNhYm91dCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgIGJ0bi50b2dnbGVDbGFzcygnb3BlbicpO1xuICAgICQoXCIjYWJvdXQtbW9kYWxcIikubW9kYWwoJ3Nob3cnKTtcbiAgfSk7XG5cbiAgYnRuLmZpbmQoJyNoZWxwJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgYnRuLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XG4gICAgc2hvd0hlbHAoKTtcbiAgfSk7XG5cbiAgLy8gbG9naW4gY2xpY2sgaGFuZGxlclxuICBidG4uZmluZCgnI2xvZ2luLXdpdGgtZ29vZ2xlJykub24oJ2NsaWNrJyxmdW5jdGlvbigpIHtcbiAgICBnYSgnc2VuZCcsICdldmVudCcsICd1aScsICdpbnRlcmFjdGlvbicsICd1c2VyLWxvZ2luJywgMSk7XG4gICAgYnRuLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XG4gICAgc2lnbkluKGZ1bmN0aW9uKHRva2VuKSB7XG4gICAgICBfc2V0VXNlckluZm8oKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgLy8gYWRkIG1lbnVcbiAgJChcIiNsb2dpbi1oZWFkZXJcIikuaHRtbChcIlwiKS5hcHBlbmQoYnRuKTtcbn07XG5cbi8qKipcbiAqIENyZWF0ZSB0aGUgdG9wIHJpZ2h0IG1lbnUgZm9yIHdoZW4gdGhlIHVzZXIgaXMgbG9nZ2VkIGluXG4gKioqL1xuZnVuY3Rpb24gX2NyZWF0ZUxvZ291dEJ0bih1c2VyZGF0YSkge1xuICAvLyBzZXQgYnRuIGh0bWxcbiAgdmFyIGJ0biA9ICQoJzxsaSBjbGFzcz1cImRyb3Bkb3duXCI+J1xuICAgICAgKyAnPGEgY2xhc3M9XCJkcm9wZG93bi10b2dnbGVcIiBzdHlsZT1cImN1cnNvcjpwb2ludGVyXCI+PGltZyBjbGFzcz1cImltZy1yb3VuZGVkXCIgc3JjPVwiJyt1c2VyZGF0YS5waWN0dXJlXG4gICAgICArICdcIiBzdHlsZT1cIm1hcmdpbjotNXB4IDVweCAtNXB4IDA7d2lkdGg6MjhweDtoZWlnaHQ6MjhweDtib3JkZXI6MXB4IHNvbGlkIHdoaXRlXCIgLz4gJyArIHVzZXJkYXRhLm5hbWVcbiAgICAgICsgJzxiIGNsYXNzPVwiY2FyZXRcIj48L2I+PC9hPicgKyAnPHVsIGNsYXNzPVwiZHJvcGRvd24tbWVudVwiPidcbiAgICAgICsgJzxsaT48YSBpZD1cInNhdmVcIj48aSBjbGFzcz1cImljb24tY2xvdWQtdXBsb2FkXCI+PC9pPiBTYXZlIE1vZGVsPC9hPjwvbGk+J1xuICAgICAgKyAnPGxpIHN0eWxlPVwiZGlzcGxheTpub25lXCI+PGEgaWQ9XCJzaGFyZS1idG5cIj48aSBjbGFzcz1cImljb24tc2hhcmVcIj48L2k+IFNoYXJlIE1vZGVsPC9hPjwvbGk+J1xuICAgICAgKyAnPGxpIHN0eWxlPVwiZGlzcGxheTpub25lXCI+PGEgaWQ9XCJvcGVuLWluLWRyaXZlXCIgdGFyZ2V0PVwiX2JsYW5rXCI+PGkgY2xhc3M9XCJpY29uLWV4dGVybmFsLWxpbmstc2lnblwiPjwvaT4gT3BlbiBpbiBHb29nbGUgRHJpdmU8L2E+PC9saT4nXG4gICAgICArICc8bGk+PGEgaWQ9XCJsb2FkXCI+PGkgY2xhc3M9XCJpY29uLWNsb3VkLWRvd25sb2FkXCI+PC9pPiBMb2FkIE1vZGVsPC9hPjwvbGk+J1xuICAgICAgKyAnPGxpPjxhIGlkPVwiaGVscFwiPjxpIGNsYXNzPVwiaWNvbi1xdWVzdGlvbi1zaWduXCI+PC9pPiBIZWxwPC9hPjwvbGk+J1xuICAgICAgKyAnPGxpPjxhIGlkPVwiYWJvdXRcIj48aSBjbGFzcz1cImljb24taW5mby1zaWduXCI+PC9pPiBBYm91dDwvYT48L2xpPidcbiAgICAgICsgJzxsaT48YSBpZD1cImxvZ291dFwiPjxpIGNsYXNzPVwiaWNvbi1zaWdub3V0XCI+PC9pPiBMb2dvdXQ8L2E+PC9saT4nXG4gICAgICArICc8L3VsPjwvbGk+Jyk7XG5cbiAgLy8gYWRkIGNsaWNrIGhhbmRsZXIgdG8gc2hvdyBtZW51XG4gIGJ0bi5maW5kKCdhLmRyb3Bkb3duLXRvZ2dsZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgJCh0aGlzKS5wYXJlbnQoKS50b2dnbGVDbGFzcygnb3BlbicpO1xuICB9KTtcblxuICAvLyBzaG93IHRoZSBzYXZlIHBvcHVwXG4gIGJ0bi5maW5kKCcjc2F2ZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgIC8vIHNldCB0aGUgY3VycmVudCBzYXZlIG1pbWVUeXBlXG4gICAgc2F2ZU1pbWVUeXBlID0gTUlNRV9UWVBFO1xuXG4gICAgLy8gbGV0IHRoZSB1c2VyIGtub3cgd2hhdCB0eXAgdGhleSBhcmUgc2F2aW5nXG4gICAgJChcIiNnZHJpdmUtc2F2ZS1zdWJoZWFkZXJcIikuaHRtbChcIjxoNT5TYXZlIE1vZGVsPC9oNT5cIik7XG5cbiAgICBidG4udG9nZ2xlQ2xhc3MoJ29wZW4nKTtcblxuICAgIC8vIGlmIHRoZSBmaWxlIGlzIGxvYWRlZCwgc2hvdyB0aGUgdXBkYXRlIHBhbmVsXG4gICAgaWYoIGxvYWRlZEZpbGUgIT0gbnVsbCkge1xuICAgICAgLy8gZ3JhYiB0aGUgY3VycmVudCBmaWxlcyBtZXRhZGF0YVxuICAgICAgdmFyIGZpbGUgPSB7fTtcbiAgICAgIGZvciggdmFyIGkgPSAwOyBpIDwgZmlsZUxpc3QubGVuZ3RoOyBpKysgKSB7XG4gICAgICAgIGlmKCBmaWxlTGlzdFtpXS5pZCA9PSBsb2FkZWRGaWxlKSB7XG4gICAgICAgICAgZmlsZSA9IGZpbGVMaXN0W2ldO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIHNob3cgdGhlIHVwZGF0ZSBwYW5lbFxuICAgICAgJChcIiNzYXZlLXVwZGF0ZS1wYW5lbFwiKS5zaG93KCk7XG5cbiAgICAgIC8vIHJlbmRlciB0aGUgZmlsZXMgbWV0YWRhdGEgaW4gdGhlIHVwZGF0ZSBwYW5lbFxuICAgICAgdmFyIGQgPSBuZXcgRGF0ZShmaWxlLm1vZGlmaWVkRGF0ZSk7XG4gICAgICAkKFwiI3NhdmUtdXBkYXRlLXBhbmVsLWlubmVyXCIpLmh0bWwoXCI8Yj5cIitmaWxlLnRpdGxlK1wiPC9iPjxiciAvPlwiICtcbiAgICAgICAgICBcIjxzcGFuIHN0eWxlPSdjb2xvcjojODg4Jz5cIitmaWxlLmRlc2NyaXB0aW9uK1wiPC9zcGFuPjxiciAvPlwiK1xuICAgICAgICAgIFwiPHNwYW4gc3R5bGU9J2ZvbnQtc3R5bGU6aXRhbGljO2ZvbnQtc2l6ZToxMXB4Oyc+TGFzdCBNb2RpZmllZDogXCIgK1xuICAgICAgICAgIGQudG9EYXRlU3RyaW5nKCkrXCIgXCIrZC50b0xvY2FsZVRpbWVTdHJpbmcoKStcIiBieSBcIitmaWxlLmxhc3RNb2RpZnlpbmdVc2VyTmFtZStcIjwvc3Bhbj48YnIgLz5cIitcbiAgICAgICAgICBcIjxhIGhyZWY9J2h0dHBzOi8vZHJpdmUuZ29vZ2xlLmNvbS9maWxlL2QvXCIrZmlsZS5pZCtcIicnIHRhcmdldD0nX2JsYW5rJz48aSBjbGFzcz0naWNvbi1saW5rJz48L2k+IFwiICtcbiAgICAgICAgICBcIkxpbmsgdG8gU2hhcmU8L2E+IDxzcGFuIHN0eWxlPSdjb2xvcjojODg4Jz4obXVzdCBoYXZlIHBlcm1pc3Npb24pPC9zcGFuPjxiciAvPjxiciAvPlwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgJChcIiNzYXZlLXVwZGF0ZS1wYW5lbFwiKS5oaWRlKCk7XG4gICAgfVxuXG4gICAgLy8gY2xlYXIgYW55IG1lc3NhZ2VcbiAgICBfc2V0U2F2ZU1lc3NhZ2UobnVsbCk7XG5cbiAgICAvLyBzaG93IHRoZSBzYXZlIHBvcHVwXG4gICAgJChcIiNzYXZlLW1vZGFsXCIpLm1vZGFsKCdzaG93Jyk7XG4gIH0pO1xuXG4gIC8vIGNsaWNrIGhhbmRsZXIgZm9yIHNoYXJlIGJ0blxuICBidG4uZmluZChcIiNzaGFyZS1idG5cIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICBnYSgnc2VuZCcsICdldmVudCcsICd1aScsICdpbnRlcmFjdGlvbicsICdvcGVuLWRyaXZlLXNoYXJlJywgMSk7XG5cbiAgICAvLyBoYXMgdGhlIHNoYXJlIGNsaWVudCBiZWVuIGxvYWRlZFxuICAgIGlmKCBjbGllbnQgPT0gbnVsbCApIHtcbiAgICAgIC8vIGxvYWQgdGhlIHNoYXJlIHBvcHVwXG4gICAgICBnYXBpLmxvYWQoJ2RyaXZlLXNoYXJlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgLy8gY3JlYXRlIGFuZCBzaG93IHRoZSBzaGFyZSBwb3B1cFxuICAgICAgICAgY2xpZW50ID0gbmV3IGdhcGkuZHJpdmUuc2hhcmUuU2hhcmVDbGllbnQoT2F1dGguQVBQX0lEKTtcbiAgICAgICAgICBjbGllbnQuc2V0SXRlbUlkcyhbbG9hZGVkRmlsZV0pO1xuICAgICAgICAgY2xpZW50LnNob3dTZXR0aW5nc0RpYWxvZygpO1xuICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBzaG93IHRoZSBzaGFyZSBwb3B1cFxuICAgICAgY2xpZW50LnNldEl0ZW1JZHMoW2xvYWRlZEZpbGVdKTtcbiAgICAgICBjbGllbnQuc2hvd1NldHRpbmdzRGlhbG9nKCk7XG4gICAgfVxuICB9KTtcblxuICAvLyBzaG93IGFib3V0IHBhbmVsXG4gIGJ0bi5maW5kKCcjYWJvdXQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICBidG4udG9nZ2xlQ2xhc3MoJ29wZW4nKTtcbiAgICAkKFwiI2Fib3V0LW1vZGFsXCIpLm1vZGFsKCdzaG93Jyk7XG4gIH0pO1xuXG4gIGJ0bi5maW5kKCcjaGVscCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgIGJ0bi50b2dnbGVDbGFzcygnb3BlbicpO1xuICAgIHNob3dIZWxwKCk7XG4gIH0pO1xuXG4gIC8vIHNob3cgdGhlICdsb2FkIGZyb20gZHJpdmUnIHBhbmVsXG4gIGJ0bi5maW5kKCcjbG9hZCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgIGJ0bi50b2dnbGVDbGFzcygnb3BlbicpO1xuXG4gICAgLy8gaGlkZSBhbnkgZXhpc3RpbmcgbWVzc2FnZVxuICAgIF9zZXRMb2FkTWVzc2FnZShudWxsKTtcblxuICAgIC8vIHJlbmRlciB0aGUgbW9kZWwgZmlsZXMgaW4gdGhlIHBvcHVwIGZpbGVzXG4gICAgX3Nob3dEcml2ZUZpbGVzKCk7XG5cbiAgICAvLyBzaG93IHRoZSBtb2RhbFxuICAgICQoXCIjbG9hZC1tb2RhbFwiKS5tb2RhbCgnc2hvdycpO1xuICB9KTtcblxuICAvLyBsb2FkIHRoZSB1c2VyIG91dFxuICBidG4uZmluZCgnI2xvZ291dCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgIGdhKCdzZW5kJywgJ2V2ZW50JywgJ3VpJywgJ2ludGVyYWN0aW9uJywgJ3VzZXItbG9nb3V0JywgMSk7XG5cbiAgICBidG4udG9nZ2xlQ2xhc3MoJ29wZW4nKTtcblxuICAgIC8vIGtpbGwgdGhlIGFjY2VzcyB0b2tlblxuICAgIHRva2VuID0gbnVsbDtcblxuICAgIC8vIHVwZGF0ZSB0aGUgbWVudSBwYW5lbFxuICAgIF9jcmVhdGVMb2dpbkJ0bigpO1xuICB9KTtcblxuICAvLyBhdHRhY2ggdGhlIG1lbnVcbiAgJChcIiNsb2dpbi1oZWFkZXJcIikuaHRtbChcIlwiKS5hcHBlbmQoYnRuKTtcbn07XG5cbi8qKipcbiAqICBSZXF1ZXN0IHRoZSB1c2VyJ3MgaW5mb3JtYXRpb24uICBXaGVuIGxvYWRlZCwgdXBkYXRlIHRoZSB0b3AgcmlnaHQgbWVudVxuICoqKi9cbmZ1bmN0aW9uIF9zZXRVc2VySW5mbygpIHtcbiAgLy8gbG9hZCB1c2VyIG5hbWVcbiAgJC5hamF4KHtcbiAgICB1cmwgOiBcImh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL29hdXRoMi92MS91c2VyaW5mb1wiLFxuICAgIGJlZm9yZVNlbmQgOiBmdW5jdGlvbihyZXF1ZXN0KSB7XG4gICAgICAvLyBhbHdheXMgc2V0IHlvdXIgYWNjZXNzIHN0b2tlblxuICAgICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKFwiQXV0aG9yaXphdGlvblwiLCdCZWFyZXIgJysgdG9rZW4uYWNjZXNzX3Rva2VuKTtcbiAgICB9LFxuICAgIHN1Y2Nlc3MgOiBmdW5jdGlvbihkYXRhLCBzdGF0dXMseGhyKSB7XG4gICAgICAvLyBwYXJzZSB5b3VyIGpzb24gcmVzcG9uc2VcbiAgICAgIHRyeSB7XG4gICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgfSBjYXRjaCAoZSkge31cblxuICAgICAgLy8gdXBkYXRlIHRvcCByaWdodCBtZW51XG4gICAgICBfY3JlYXRlTG9nb3V0QnRuKGRhdGEpO1xuXG4gICAgICAvLyBzZXQgdG8gd2luZG93IHNjb3BlXG4gICAgICB3aW5kb3cudXNlcmluZm8gPSBkYXRhO1xuICAgIH0sXG4gICAgZXJyb3IgOiBmdW5jdGlvbigpIHtcbiAgICAgIC8vIFRPRE86IHNob3VsZCB3ZSBhbGVydCB0aGlzP1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gbG9hZCB1c2VyIGZpbGVzLCB0cmVlc1xuICBfdXBkYXRlRmlsZUxpc3QoKTtcbiAgX3VwZGF0ZVRyZWVMaXN0KCk7XG59XG5cbi8qKipcbiAqICBTZWFyY2ggZm9yIHRoZSB1c2VycyBtb2RlbHNcbiAqXG4gKiBUT0RPOiBhZGQgc2VhcmNoIHRvIHRoZSBmb2xsb3dpbmcgZnVuY3Rpb25zLFxuICogIGxpbWl0IHRvIDEwIHJlc3VsdHNcbiAqKiovXG5mdW5jdGlvbiBfdXBkYXRlRmlsZUxpc3QoKSB7XG4gIGxpc3RGaWxlcyhcIm1pbWVUeXBlID0gJ1wiK01JTUVfVFlQRStcIidcIiwgZnVuY3Rpb24ocmVzcCl7XG4gICAgZmlsZUxpc3QgPSByZXNwLnJlc3VsdC5pdGVtcztcbiAgfSk7XG59XG5cbi8qKipcbiAqICBTZWFyY2ggZm9yIHRoZSB1c2VycyB0cmVlc1xuICpcbiAqIFRPRE86IGFkZCBzZWFyY2ggdG8gdGhlIGZvbGxvd2luZyBmdW5jdGlvbnMsXG4gKiAgbGltaXQgdG8gMTAgcmVzdWx0c1xuICoqKi9cbmZ1bmN0aW9uIF91cGRhdGVUcmVlTGlzdCgpIHtcbiAgbGlzdEZpbGVzKFwibWltZVR5cGUgPSAnXCIrVFJFRV9NSU1FX1RZUEUrXCInXCIsIGZ1bmN0aW9uKHJlc3Ape1xuICAgIHRyZWVMaXN0ID0gcmVzcC5yZXN1bHQuaXRlbXM7XG4gIH0pO1xufVxuXG4vKioqXG4gKiAgUmVuZGVyIHRoZSB1c2VycyBjdXJyZW50IG1vZGVscyBvbnRvIHRoZSAnbG9hZCBmcm9tIGRyaXZlJyBwb3B1cFxuICoqKi9cbmZ1bmN0aW9uIF9zaG93RHJpdmVGaWxlcygpIHtcbiAgLy8gaWYgdGhleSBoYXZlIG5vIGZpbGVzLCBzYXkgc28gYW5kIGdldCBvdXQgb2YgaGVyZVxuICBpZiggIWZpbGVMaXN0ICkgcmV0dXJuICQoXCIjZ2RyaXZlLWZpbGUtbGlzdFwiKS5odG1sKFwiPGxpPk5vIEZpbGVzPC9saT5cIik7XG4gIGlmKCBmaWxlTGlzdC5sZW5ndGggPT0gMCApIHJldHVybiAkKFwiI2dkcml2ZS1maWxlLWxpc3RcIikuaHRtbChcIjxsaT5ObyBGaWxlczwvbGk+XCIpO1xuXG4gIC8vIHNob3cgYSB0aXRsZSwgdGhlcmUgYXJlIG11bHRpcGxlIHR5cGVzIHRoYXQgY2FuIGJlIGxvYWRlZCBmcm9tIGRyaXZlXG4gICQoXCIjZ2RyaXZlLWZpbGUtbGlzdFwiKS5odG1sKFwiPGg0PlNlbGVjdCBGaWxlPC9oND5cIik7XG5cbiAgLy8gY3JlYXRlIHRoZSBsaXN0IGVsZW1lbnRzIGZvciBlYWNoIGZpbGVzIG1ldGFkYXRhXG4gIGZvciggdmFyIGkgPSAwOyBpIDwgZmlsZUxpc3QubGVuZ3RoOyBpKysgKSB7XG4gICAgdmFyIGl0ZW0gPSBmaWxlTGlzdFtpXTtcbiAgICB2YXIgZCA9IG5ldyBEYXRlKGl0ZW0ubW9kaWZpZWREYXRlKTtcbiAgICAkKFwiI2dkcml2ZS1maWxlLWxpc3RcIikuYXBwZW5kKFxuICAgICAgJChcIjxsaSBjbGFzcz0nbGlzdC1ncm91cC1pdGVtJz48YSBpZD0nXCIraXRlbS5pZCtcIicgdXJsPSdcIitpdGVtLmRvd25sb2FkVXJsK1wiJyBzdHlsZT0nY3Vyc29yOnBvaW50ZXInPjxpIGNsYXNzPSdpY29uLWZpbGUnPjwvaT4gXCIraXRlbS50aXRsZStcIjwvYT5cIiArXG4gICAgICAgIFwiPGRpdiBzdHlsZT0nY29sb3I6Izg4ODtwYWRkaW5nOiA1cHggMCAwIDEwcHgnPlwiK2l0ZW0uZGVzY3JpcHRpb24rXCI8L2Rpdj5cIitcbiAgICAgICAgXCI8ZGl2IHN0eWxlPSdmb250LXN0eWxlOml0YWxpYztmb250LXNpemU6MTFweDtwYWRkaW5nLWxlZnQ6MTBweCc+TGFzdCBNb2RpZmllZDogXCIrZC50b0RhdGVTdHJpbmcoKStcIiBcIitkLnRvTG9jYWxlVGltZVN0cmluZygpK1wiIGJ5IFwiK2l0ZW0ubGFzdE1vZGlmeWluZ1VzZXJOYW1lK1wiPGRpdj48L2xpPlwiXG4gICAgICAgIClcbiAgICApO1xuICB9XG5cbiAgLy8gYWRkIGNsaWNrIGhhbmRsZXIgZm9yIGVhY2ggZmlsZVxuICAkKFwiI2dkcml2ZS1maWxlLWxpc3QgYVwiKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgIGdhKCdzZW5kJywgJ2V2ZW50JywgJ3VpJywgJ2ludGVyYWN0aW9uJywgJ2xvYWQtZHJpdmUtbW9kZWwnLCAxKTtcblxuICAgIHZhciBpZCA9ICQodGhpcykuYXR0cihcImlkXCIpO1xuXG4gICAgLy8gbGV0IHRoZSB1c2VyIGtub3cgd2hhdCB3ZSBhcmUgZG9pbmdcbiAgICBfc2V0TG9hZE1lc3NhZ2UoJzxpIGNsYXNzPVwiaWNvbi1zcGlubmVyIGljb24tc3BpblwiPjwvaT4gTG9hZGluZyBGaWxlLi4uJywnaW5mbycpO1xuXG4gICAgLy8gZ3JhYiB0aGUgZml2ZSBmcm9tIGRyaXZlXG4gICAgZ2V0RmlsZShpZCwgJCh0aGlzKS5hdHRyKFwidXJsXCIpLCBmdW5jdGlvbihmaWxlKSB7XG4gICAgICAvLyBpZiBiYWRuZXNzLCBsZXQgdGhlIHVzZXIga25vd1xuICAgICAgaWYoICFmaWxlICApIHJldHVybiBfc2V0TG9hZE1lc3NhZ2UoJ0ZhaWxlZCB0byBsb2FkIGZpbGUgZnJvbSBHb29nbGUgRHJpdmUgOignLCdkYW5nZXInKTtcbiAgICAgIGlmKCBmaWxlLmVycm9yICApIHJldHVybiBfc2V0TG9hZE1lc3NhZ2UoJ0ZhaWxlZCB0byBsb2FkIGZpbGUgZnJvbSBHb29nbGUgRHJpdmUgOignLCdkYW5nZXInKTtcblxuICAgICAgLy8gaGlkZSBhbnkgbG9hZGVkIHRyZWVzLFxuICAgICAgJChcIiNzaGFyZS10cmVlLWJ0blwiKS5oaWRlKCk7XG4gICAgICAkKFwiI2xvYWRlZC10cmVlLW5hbWVcIikuaHRtbChcIlwiKS5wYXJlbnQoKS5oaWRlKCk7XG4gICAgICBsb2FkZWRUcmVlID0gbnVsbDtcblxuICAgICAgLy8gbGV0IHRoZSB1c2VyIGtub3cgd2UgYXJlIGFsbCBnb29kXG4gICAgICBfc2V0TG9hZE1lc3NhZ2UoJ0ZpbGUgTG9hZGVkLicsJ3N1Y2Nlc3MnKTtcblxuICAgICAgLy8gc2V0IHRoZSBsb2FkZWQgZmlsZSBpZFxuICAgICAgbG9hZGVkRmlsZSA9IGlkO1xuXG4gICAgICAvLyBzZXQgdGhlIGxvYWRlZCBmaWxlIG5hbWVcbiAgICAgIGZvciggdmFyIGkgPSAwOyBpIDwgZmlsZUxpc3QubGVuZ3RoOyBpKysgKSB7XG4gICAgICAgIGlmKCBpZCA9PSBmaWxlTGlzdFtpXS5pZCApIHtcbiAgICAgICAgICAkKFwiI2xvYWRlZC1tb2RlbC10aXRsZVwiKS5odG1sKFwiPHNwYW4gc3R5bGU9J2NvbG9yOiMzMzMnPkxvYWRlZCBNb2RlbCA8L3NwYW4+IFwiK2ZpbGVMaXN0W2ldLnRpdGxlKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBzaG93IHRoZSBzaGFyZSBidG5cbiAgICAgICQoXCIjc2hhcmUtYnRuXCIpLnBhcmVudCgpLnNob3coKTtcbiAgICAgICQoXCIjb3Blbi1pbi1kcml2ZVwiKS5hdHRyKFwiaHJlZlwiLFwiaHR0cHM6Ly9kb2NzLmdvb2dsZS5jb20vZmlsZS9kL1wiK2lkKS5wYXJlbnQoKS5zaG93KCk7XG5cbiAgICAgIC8vIHNldHVwIG1vZGVsXG4gICAgICBtb2RlbElPLmxvYWRTZXR1cChpZCwgZmlsZSk7XG5cbiAgICAgIC8vIHNldHVwIHJlYWx0aW1lIGV2ZW50c1xuICAgICAgZ2RyaXZlUlQuaW5pdFJ0QXBpKGxvYWRlZEZpbGUpO1xuXG4gICAgICAvLyB3YWl0IGEgdGljayBzbyB1c2VyIGNhbiBzZWUgc3VjY2VzcyBtZXNzYWdlXG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgIC8vIGhpZGUgdGhlIG1vZGFsXG4gICAgICAgICQoXCIjbG9hZC1tb2RhbFwiKS5tb2RhbCgnaGlkZScpO1xuICAgICAgfSwxNTAwKTtcblxuICAgIH0pO1xuICB9KTtcbn1cblxuLyoqKlxuICogIFJlbmRlciB0aGUgdXNlcnMgY3VycmVudCB0cmVlcyBvbnRvIHRoZSAnbG9hZCBmcm9tIGRyaXZlJyBwb3B1cFxuICoqKi9cbmZ1bmN0aW9uIF9zaG93VHJlZUZpbGVzKCkge1xuICAvLyB1cGRhdGUgdGhlIGxpc3QgaGVhZGVyLCBsZXQgdXNlciBrbm93IHdoYXQgdGhleSBhcmUgc2VsZWN0aW5nXG4gICQoXCIjZ2RyaXZlLWZpbGUtbGlzdFwiKS5odG1sKFwiXCIpO1xuICAkKFwiI2dkcml2ZS1maWxlLWxpc3RcIikuYXBwZW5kKCQoXCI8bGkgY2xhc3M9J2xpc3QtZ3JvdXAtaXRlbSc+PGg1PlNlbGVjdCBUcmVlPC9oNT48L2xpPlwiKSk7XG5cbiAgLy8gaWYgdGhlcmUgYXJlIG5vIHRyZWVzLCBzYXkgc28gYW5kIGdldCBvdXQgb2YgaGVyZVxuICBpZiggIXRyZWVMaXN0ICkgcmV0dXJuICQoXCIjZ2RyaXZlLWZpbGUtbGlzdFwiKS5hcHBlbmQoJChcIjxsaSBjbGFzcz0nbGlzdC1ncm91cC1pdGVtJz5ObyBUcmVlcyBBdmFpbGFibGU8L2xpPlwiKSk7XG4gIGlmKCB0cmVlTGlzdC5sZW5ndGggPT0gMCApIHJldHVybiAkKFwiI2dkcml2ZS1maWxlLWxpc3RcIikuYXBwZW5kKCQoXCI8bGkgY2xhc3M9J2xpc3QtZ3JvdXAtaXRlbSc+Tm8gVHJlZXMgQXZhaWxhYmxlPC9saT5cIikpO1xuXG4gIC8vIGNyZWF0ZSB0aGUgdHJlZSBsaXN0IGVsZW1lbnRzXG4gIGZvciggdmFyIGkgPSAwOyBpIDwgdHJlZUxpc3QubGVuZ3RoOyBpKysgKSB7XG4gICAgdmFyIGl0ZW0gPSB0cmVlTGlzdFtpXTtcbiAgICB2YXIgZCA9IG5ldyBEYXRlKGl0ZW0ubW9kaWZpZWREYXRlKTtcbiAgICAkKFwiI2dkcml2ZS1maWxlLWxpc3RcIikuYXBwZW5kKFxuICAgICAgJChcIjxsaSBjbGFzcz0nbGlzdC1ncm91cC1pdGVtJz48YSBpZD0nXCIraXRlbS5pZCtcIicgbmFtZT0nXCIraXRlbS50aXRsZStcIicgdXJsPSdcIitpdGVtLmRvd25sb2FkVXJsK1wiJyBzdHlsZT0nY3Vyc29yOnBvaW50ZXInPjxpIGNsYXNzPSdpY29uLWxlYWYnPjwvaT4gXCIraXRlbS50aXRsZStcIjwvYT5cIiArXG4gICAgICAgIFwiPGRpdiBzdHlsZT0nY29sb3I6Izg4ODtwYWRkaW5nOiA1cHggMCAwIDEwcHgnPlwiK2l0ZW0uZGVzY3JpcHRpb24rXCI8L2Rpdj5cIitcbiAgICAgICAgXCI8ZGl2IHN0eWxlPSdmb250LXN0eWxlOml0YWxpYztmb250LXNpemU6MTFweDtwYWRkaW5nLWxlZnQ6MTBweCc+TGFzdCBNb2RpZmllZDogXCIrZC50b0RhdGVTdHJpbmcoKStcIiBcIitkLnRvTG9jYWxlVGltZVN0cmluZygpK1wiIGJ5IFwiK2l0ZW0ubGFzdE1vZGlmeWluZ1VzZXJOYW1lK1wiPGRpdj48L2xpPlwiXG4gICAgICAgIClcbiAgICApO1xuICB9XG5cbiAgLy8gYWRkIGNsaWNrIGhhbmRsZXIgZm9yIHRpdGxlc1xuICAkKFwiI2dkcml2ZS1maWxlLWxpc3QgYVwiKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgIGdhKCdzZW5kJywgJ2V2ZW50JywgJ3VpJywgJ2ludGVyYWN0aW9uJywgJ2xvYWQtZHJpdmUtdHJlZScsIDEpO1xuXG4gICAgdmFyIGlkID0gJCh0aGlzKS5hdHRyKFwiaWRcIik7XG4gICAgdmFyIG5hbWUgPSAkKHRoaXMpLmF0dHIoXCJuYW1lXCIpO1xuXG4gICAgLy8gdGVsbCB0aGUgdXNlciB3ZSBhcmUgbG9hZGluZ1xuICAgIF9zZXRMb2FkTWVzc2FnZSgnPGkgY2xhc3M9XCJpY29uLXNwaW5uZXIgaWNvbi1zcGluXCI+PC9pPiBMb2FkaW5nIFRyZWUuLi4nLCdpbmZvJyk7XG5cbiAgICAvLyBsb2FkIGZpbGUgZnJvbSBkcml2ZVxuICAgIGdldEZpbGUoaWQsICQodGhpcykuYXR0cihcInVybFwiKSwgZnVuY3Rpb24oZmlsZSkge1xuICAgICAgLy8gaWYgYmFkbmVzcywgbGV0IHVzZXIga25vd1xuICAgICAgaWYoICFmaWxlICApIHJldHVybiBfc2V0TG9hZE1lc3NhZ2UoJ0ZhaWxlZCB0byBsb2FkIHRyZWUgZnJvbSBHb29nbGUgRHJpdmUgOignLCdkYW5nZXInKTtcbiAgICAgIGlmKCBmaWxlLmVycm9yICApIHJldHVybiBfc2V0TG9hZE1lc3NhZ2UoJ0ZhaWxlZCB0byBsb2FkIHRyZWUgZnJvbSBHb29nbGUgRHJpdmUgOignLCdkYW5nZXInKTtcblxuICAgICAgLy8gc2hvdyB0aGUgdHJlZSBzaGFyaW5nIGJ0bnNcbiAgICAgICQoXCIjc2hhcmUtdHJlZS1idG5cIikuc2hvdygpO1xuICAgICAgJChcIiNsb2FkZWQtdHJlZS1uYW1lXCIpLmh0bWwobmFtZSkucGFyZW50KCkuc2hvdygpO1xuXG4gICAgICAvLyBsZXQgdGhlIHVzZXIga25vdyB3ZSBhcmUgc3VjY2VzZnVsbFxuICAgICAgX3NldExvYWRNZXNzYWdlKCdUcmVlIExvYWRlZC4nLCdzdWNjZXNzJyk7XG5cbiAgICAgIC8vIHNldCB0aGUgbG9hZGVkIHRyZWUgaWRcbiAgICAgIGxvYWRlZFRyZWUgPSBpZDtcblxuICAgICAgLy8gbG9hZGVkIHRyZWUgaW50byBtb2RlbCAvIFVJXG4gICAgICBtb2RlbElPLmxvYWRUcmVlKGZpbGUpO1xuXG4gICAgICAvLyB3YWl0IGEgc2VjIHNvIHVzZXIgY2FuIHNlZSBzdWNjZXNzIG1lc3NhZ2VcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgJChcIiNsb2FkLW1vZGFsXCIpLm1vZGFsKCdoaWRlJyk7XG4gICAgICB9LDE1MDApO1xuXG4gICAgfSk7XG4gIH0pO1xufVxuXG4vKioqXG4gKiAgc2hvdyB0aGUgdXNlciB0aGUgbG9hZCB0cmVlIHBvcHVwXG4gKioqL1xuZnVuY3Rpb24gc2hvd0xvYWRUcmVlUGFuZWwoKSB7XG4gIC8vIHJlbmRlciB0aGUgdHJlZXMgaW50byB0aGUgcG9wdXAgbGlzdFxuICBfc2hvd1RyZWVGaWxlcygpO1xuICAvLyBjbGVhciBhbnkgbWVzc2FnZXNcbiAgX3NldExvYWRNZXNzYWdlKG51bGwpO1xuICAvLyBzaG93IHRoZSBwb3B1cFxuICAkKFwiI2xvYWQtbW9kYWxcIikubW9kYWwoJ3Nob3cnKTtcbn1cblxuLyoqKlxuICogIHNob3cgdGhlIHVzZXIgdGhlIHNhdmUgdHJlZSBwb3B1cFxuICoqKi9cbmZ1bmN0aW9uIHNob3dTYXZlVHJlZVBhbmVsKCkge1xuICAvLyBzZXQgdGhlIGN1cnJlbnQgbWltZVR5cGUgd2UgYXJlIHNhdmluZ1xuICBzYXZlTWltZVR5cGUgPSBUUkVFX01JTUVfVFlQRTtcblxuICAvLyBzZXQgdGhlIGhlYWRlciBzbyB1c2VyIGtub3dzIHdoYXQgdHlwZSB0aGV5IGFyZSBzYXZpbmdcbiAgJChcIiNnZHJpdmUtc2F2ZS1zdWJoZWFkZXJcIikuaHRtbChcIjxoNT5TYXZlIFRyZWU8L2g1PlwiKTtcblxuICAvLyBpZiB0aGVyZSBpcyBhIGN1cnJlbnQgdHJlZSwgc2hvdyB0aGUgdXBkYXRlIHBhbmVsXG4gIGlmKCBsb2FkZWRUcmVlICE9IG51bGwpIHtcbiAgICAvLyBmaW5kIHRoZSBjdXJyZW50IHRyZWUgYmFzZWQgb24gaWRcbiAgICB2YXIgdHJlZSA9IHt9O1xuICAgIGZvciggdmFyIGkgPSAwOyBpIDwgdHJlZUxpc3QubGVuZ3RoOyBpKysgKSB7XG4gICAgICBpZiggdHJlZUxpc3RbaV0uaWQgPT0gbG9hZGVkVHJlZSkge1xuICAgICAgICB0cmVlID0gdHJlZUxpc3RbaV07XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIHNob3cgdGhlIHVwZGF0ZSBwYW5lbFxuICAgICQoXCIjc2F2ZS11cGRhdGUtcGFuZWxcIikuc2hvdygpO1xuXG4gICAgLy8gcmVuZGVyIHRyZWUgbWV0YWRhdGEgb24gdXBkYXRlIHBhbmVsXG4gICAgdmFyIGQgPSBuZXcgRGF0ZSh0cmVlLm1vZGlmaWVkRGF0ZSk7XG4gICAgJChcIiNzYXZlLXVwZGF0ZS1wYW5lbC1pbm5lclwiKS5odG1sKFwiPGI+XCIrdHJlZS50aXRsZStcIjwvYj48YnIgLz5cIiArXG4gICAgICAgIFwiPHNwYW4gc3R5bGU9J2NvbG9yOiM4ODgnPlwiK3RyZWUuZGVzY3JpcHRpb24rXCI8L3NwYW4+PGJyIC8+XCIrXG4gICAgICAgIFwiPHNwYW4gc3R5bGU9J2ZvbnQtc3R5bGU6aXRhbGljO2ZvbnQtc2l6ZToxMXB4Oyc+TGFzdCBNb2RpZmllZDogXCIgK1xuICAgICAgICBkLnRvRGF0ZVN0cmluZygpK1wiIFwiK2QudG9Mb2NhbGVUaW1lU3RyaW5nKCkrXCIgYnkgXCIrdHJlZS5sYXN0TW9kaWZ5aW5nVXNlck5hbWUrXCI8L3NwYW4+PGJyIC8+XCIrXG4gICAgICAgIFwiPGEgaHJlZj0naHR0cHM6Ly9kcml2ZS5nb29nbGUuY29tL2ZpbGUvZC9cIit0cmVlLmlkK1wiJycgdGFyZ2V0PSdfYmxhbmsnPjxpIGNsYXNzPSdpY29uLWxpbmsnPjwvaT4gT3BlbiBpbiBHb29nbGUgRHJpdmU8L2E+XCIpO1xuICB9IGVsc2Uge1xuICAgIC8vIGRvbid0IHNob3cgdGhlIHVwZGF0ZSBwYW5lbCwgdGhpcyBpcyBhIG5ldyB0cmVlXG4gICAgJChcIiNzYXZlLXVwZGF0ZS1wYW5lbFwiKS5oaWRlKCk7XG4gIH1cblxuICAvLyBjbGVhciBhbnkgbWVzc2FnZVxuICBfc2V0U2F2ZU1lc3NhZ2UobnVsbCk7XG5cbiAgLy8gc2hvdyB0aGUgcG9wdXBcbiAgJChcIiNzYXZlLW1vZGFsXCIpLm1vZGFsKCdzaG93Jyk7XG59XG5cbi8qKipcbiAqIExvYWQgYSBtb2RlbCBiYXNlZCBvbiBwYXNzZWQgaWQuICBUaGlzIGZ1bmN0aW9uIGlzIHJlYWxseSBvbmx5IGZvciBsb2FkaW5nIG1vZGVsIG9uIHN0YXJ0LCB3aGVuIGEgZmlsZSBpZFxuICogaGFzIGJlZW4gcGFzc2VkIGluIHRoZSB1cmwgZWl0aGVyIGZyb20gZ29vZ2xlIGRyaXZlIG9yIGZyb20gdGhlID9maWxlPWlkIHVybC5cbiAqKiovXG52YXIgbG9naW5Nb2RhbEluaXQgPSBmYWxzZTtcbmZ1bmN0aW9uIGxvYWQoaWQsIGxvYWRGbikge1xuXG4gIC8vIGlmIHdlIGRvbid0IGhhdmUgYW4gYWNjZXNzIHRva2VuLCB3ZSBuZWVkIHRvIHNpZ24gaW4gZmlyc3RcbiAgLy8gVE9ETzogaWYgdGhpcyBpcyBhIHB1YmxpYyBmaWxlLCB0aGVyZSBpcyBubyByZWFzb24gdG8gc2lnbiBpbi4uLiBzb2x1dGlvbj9cbiAgaWYoICF0b2tlbiApIHtcblxuICAgIGlmKCAhbG9naW5Nb2RhbEluaXQgKSB7XG4gICAgICAkKCcjZ29vZ2xlLW1vZGFsLWxvZ2luJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgLy8gc2lnbiB0aGUgdXNlciBpbiAoZm9yY2Ugb2F1dGggcG9wdXApXG4gICAgICAgIHNpZ25JbihmdW5jdGlvbih0b2tlbikge1xuICAgICAgICAgICQoJyNsb2dpbi1tb2RhbCcpLm1vZGFsKCdoaWRlJyk7XG5cbiAgICAgICAgICAvLyBzZXQgdGhlIHVzZXIgaW5mb3JtYXRpb24gaW4gdG9wIGxlZnRcbiAgICAgICAgICBfc2V0VXNlckluZm8oKTtcblxuICAgICAgICAgIGlmKCBsb2FkRm4gKSBsb2FkRm4oKTtcblxuICAgICAgICAgIGdldEZpbGVNZXRhZGF0YShpZCwgZnVuY3Rpb24obWV0YWRhdGEpe1xuICAgICAgICAgICAgZ2V0RmlsZShpZCwgbWV0YWRhdGEuZG93bmxvYWRVcmwsIGZ1bmN0aW9uKGZpbGUpIHtcbiAgICAgICAgICAgICAgX29uSW5pdEZpbGVMb2FkZWQobWV0YWRhdGEsZmlsZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICAkKCcjbG9naW4tbW9kYWwnKS5tb2RhbCgpO1xuICAgICAgbG9naW5Nb2RhbEluaXQgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICAkKCcjbG9naW4tbW9kYWwnKS5tb2RhbCgnc2hvdycpO1xuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIGlmKCBsb2FkRm4gKSBsb2FkRm4oKTtcblxuICAgIGdldEZpbGVNZXRhZGF0YShpZCwgZnVuY3Rpb24obWV0YWRhdGEpe1xuICAgICAgZ2V0RmlsZShpZCwgbWV0YWRhdGEuZG93bmxvYWRVcmwsIGZ1bmN0aW9uKGZpbGUpIHtcbiAgICAgICAgX29uSW5pdEZpbGVMb2FkZWQobWV0YWRhdGEsZmlsZSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuXG4vKioqXG4gKiBJbml0aWFsaXplIFVJIC8gbW9kZWwgd2hlbiBhIGZpbGUgaXMgbG9hZGVkIGF0IHN0YXJ0XG4gKioqL1xuZnVuY3Rpb24gX29uSW5pdEZpbGVMb2FkZWQobWV0YWRhdGEsIGZpbGUpIHtcbiAgLy8gYmFkZG5lc3MsIGxldCB0aGUgdXNlciBrbm93XG4gIGlmKCAhZmlsZSApIHtcbiAgICBpZiggaGlkZUluaXRMb2FkaW5nICkgaGlkZUluaXRMb2FkaW5nKCk7XG4gICAgcmV0dXJuIGFsZXJ0KFwiRmFpbGVkIHRvIGxvYWQgZnJvbSBHb29nbGUgRHJpdmUgOi9cIik7XG4gIH1cblxuICAvLyBtZXRhZGF0YSBmYWlsZWQgdG8gbG9hZCwgbW9yZSBiYWRuZXNzXG4gIGlmKCBtZXRhZGF0YS5jb2RlID09IDQwNCApIHtcbiAgICBpZiggaGlkZUluaXRMb2FkaW5nICkgaGlkZUluaXRMb2FkaW5nKCk7XG4gICAgcmV0dXJuIGFsZXJ0KFwiR29vZ2xlIERyaXZlOiBcIittZXRhZGF0YS5tZXNzYWdlKTtcbiAgfVxuXG4gIC8vIHdlIGxvYWRlZCBhIG1vZGVsLCBzZXR1cCBhbmQgcnVuXG4gIGlmKCBtZXRhZGF0YS5taW1lVHlwZSA9PSBNSU1FX1RZUEUgKSB7XG4gICAgLy8gc2V0IHRoZSBjdXJyZW50bHkgbG9hZGVkIGZpbGUgaWRcbiAgICBsb2FkZWRGaWxlID0gbWV0YWRhdGEuaWQ7XG5cbiAgICAvLyBzaG93IHRoZSBzaGFyZSBidG5cbiAgICAkKFwiI3NoYXJlLWJ0blwiKS5wYXJlbnQoKS5zaG93KCk7XG4gICAgJChcIiNvcGVuLWluLWRyaXZlXCIpLmF0dHIoXCJocmVmXCIsXCJodHRwczovL2RvY3MuZ29vZ2xlLmNvbS9maWxlL2QvXCIrbWV0YWRhdGEuaWQpLnBhcmVudCgpLnNob3coKTtcblxuICAgIC8vIHNob3cgdGl0bGVcbiAgICAkKFwiI2xvYWRlZC1tb2RlbC10aXRsZVwiKS5odG1sKFwiPHNwYW4gc3R5bGU9J2NvbG9yOiMzMzMnPkxvYWRlZCBNb2RlbCA8L3NwYW4+IFwiK21ldGFkYXRhLnRpdGxlKTtcblxuICAgIC8vIHNldHVwIG1vZGVsXG4gICAgbW9kZWxJTy5sb2FkU2V0dXAobWV0YWRhdGEuaWQsIGZpbGUpO1xuXG4gICAgLy8gc2V0dXAgcmVhbHRpbWUgZXZlbnRzXG4gICAgZ2RyaXZlUlQuaW5pdFJ0QXBpKGxvYWRlZEZpbGUpO1xuICB9IGVsc2UgaWYgKCBtZXRhZGF0YS5taW1lVHlwZSA9PSBUUkVFX01JTUVfVFlQRSApIHsgLy8gd2UgbG9hZGVkIGEgdHJlZVxuICAgIC8vIHNldCB0aGUgbG9hZGVkIHRyZWUgaWRcbiAgICBsb2FkZWRUcmVlID0gbWV0YWRhdGEuaWQ7XG5cbiAgICAvLyBzaG93IHRoZSBzaGFyZSBidG5cbiAgICAkKFwiI3NoYXJlLXRyZWUtYnRuXCIpLnNob3coKTtcbiAgICAkKFwiI2xvYWRlZC10cmVlLW5hbWVcIikuaHRtbChtZXRhZGF0YS50aXRsZSkucGFyZW50KCkuc2hvdygpO1xuXG4gICAgLy8gc2V0IHRoZSBsb2FkZWQgdHJlZVxuICAgIG1vZGVsSU8ubG9hZFRyZWUoZmlsZSk7XG5cbiAgICAvLyBoaWRlIHRoZSBsb2FkaW5nIHBvcHVwXG4gICAgaWYoIGhpZGVJbml0TG9hZGluZyApIGhpZGVJbml0TG9hZGluZygpO1xuICB9IGVsc2Uge1xuICAgIGFsZXJ0KFwiTG9hZGVkIHVua25vd24gZmlsZSB0eXBlIGZyb20gR29vZ2xlIERyaXZlOiBcIittZXRhZGF0YS5taW1lVHlwZSk7XG4gIH1cbn1cblxuLyoqKlxuICogdG9rZW5zIGV4cGlyZSwgZXZlcnkgb25jZSBpbiBhd2hpbGUgY2hlY2sgdGhlIGN1cnJlbnQgdG9rZW4gaGFzbid0XG4gKiBpZiBpdCBoYXMsIHRoZW4gdXBkYXRlXG4gKioqL1xuZnVuY3Rpb24gX2NoZWNrVG9rZW4oKSB7XG4gIC8vIGlnbm9yZSBpZiB0aGVyZSBpcyBubyB0b2tlblxuICBpZiAoIXRva2VuKSByZXR1cm47XG5cbiAgLy8gb3RoZXJ3aXNlLCBsb29rIHRvIHVwZGF0ZSB0aGUgYWNjZXNzIHRva2VuXG4gIE9hdXRoLmdldEFjY2Vzc1Rva2VuKGZ1bmN0aW9uKHQpIHtcbiAgICBpZiggdCAhPSBudWxsICkgdG9rZW4gPSB0O1xuICB9KTtcbn07XG5cbi8qKipcbiAqIGlzIHRoZSBjdXJyZW50IHVzZXIgc2lnbmVkIGluP1xuICoqKi9cbmZ1bmN0aW9uIGNoZWNrU2lnbmVkSW4oY2FsbGJhY2spIHtcbiAgLy8gaWYgaXNBdXRoZXJpemVkIHJldHVybnMgYSB0b2tlbiwgdXNlciBpcyBsb2dnZWQgaW5cbiAgT2F1dGguaXNBdXRob3JpemVkKGZ1bmN0aW9uKHRva2VuKXtcbiAgICBpZiAodG9rZW4gIT0gbnVsbCkgY2FsbGJhY2sodHJ1ZSk7XG4gICAgZWxzZSBjYWxsYmFjayhmYWxzZSk7XG4gIH0pO1xufTtcblxuLyoqKlxuICogU2lnbiBhIHVzZXIgaW4gdXNpbmcgdGhlIE9hdXRoIGNsYXNzXG4gKioqL1xuZnVuY3Rpb24gc2lnbkluKGNhbGxiYWNrKSB7XG4gIE9hdXRoLmF1dGhvcml6ZShmdW5jdGlvbih0KXtcbiAgICB0b2tlbiA9IHQ7XG4gICAgaWYgKHRva2VuICE9IG51bGwpIHtcbiAgICAgIGlmKCB0LmVycm9yICkgcmV0dXJuIGNhbGxiYWNrKGZhbHNlKTtcbiAgICAgIGNhbGxiYWNrKHRydWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjYWxsYmFjayhmYWxzZSk7XG4gICAgfVxuICB9KVxufTtcblxuLyoqKlxuICogQWNjZXNzIG1ldGhvZCBmb3IgdG9rZW5cbiAqKiovXG5mdW5jdGlvbiBnZXRUb2tlbigpIHtcbiAgcmV0dXJuIHRva2VuO1xufTtcblxuLyoqKlxuICogTG9hZCB0aGUgZ29vZ2xlIGRyaXZlIGFwaSBjb2RlXG4gKioqL1xuZnVuY3Rpb24gX2xvYWRBcGkoY2FsbGJhY2spIHtcbiAgZ2FwaS5jbGllbnQubG9hZChcImRyaXZlXCIsIERSSVZFX0FQSV9WRVJTSU9OLCBmdW5jdGlvbigpIHtcbiAgICBjYWxsYmFjaygpO1xuICB9KTtcbn07XG5cbi8qKipcbiAqIEdldCBhIGxpc3Qgb2YgZmlsZSBtZXRhZGF0YSBmcm9tIGdvb2dsZSBkcml2ZSBiYXNlZCBvbiBxdWVyeVxuICoqKi9cbmZ1bmN0aW9uIGxpc3RGaWxlcyhxdWVyeSwgY2FsbGJhY2spIHtcbiAgZ2FwaS5jbGllbnQuZHJpdmUuZmlsZXMubGlzdCh7XG4gICAgcSA6IHF1ZXJ5ICsgXCIgYW5kIHRyYXNoZWQgPSBmYWxzZVwiXG4gIH0pLmV4ZWN1dGUoZnVuY3Rpb24ocmVzcCkge1xuICAgIGNhbGxiYWNrKHJlc3ApO1xuICB9KTtcbn07XG5cbi8qKipcbiAqIEdldCBhIHNpbmdsZSBmaWxlcyBtZXRhZGF0YSBiYXNlZCBvbiBpZFxuICoqKi9cbmZ1bmN0aW9uIGdldEZpbGVNZXRhZGF0YShpZCwgY2FsbGJhY2spIHtcbiAgZ2FwaS5jbGllbnQuZHJpdmUuZmlsZXMuZ2V0KHtcbiAgICAnZmlsZUlkJyA6IGlkXG4gIH0pLmV4ZWN1dGUoZnVuY3Rpb24ocmVzcCkge1xuICAgIGNhbGxiYWNrKHJlc3ApO1xuICB9KTtcbn07XG5cbi8qKipcbiAqICBBY3R1YWxseSBsb2FkIGEgZmlsZXMgZGF0YS4gIFRoZSB1cmwgdG8gZG8gdGhpcyBpcyBwcm92aWRlZCBpbiBhIGZpbGVzIG1ldGFkYXRhLlxuICoqKi9cbmZ1bmN0aW9uIGdldEZpbGUoaWQsIGRvd25sb2FkVXJsLCBjYWxsYmFjaykge1xuICAkLmFqYXgoe1xuICAgIHVybCA6IGRvd25sb2FkVXJsLFxuICAgIGJlZm9yZVNlbmQgOiBmdW5jdGlvbihyZXF1ZXN0KSB7XG4gICAgICAvLyBzZXQgYWNjZXNzIHRva2VuIGluIGhlYWRlclxuICAgICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKFwiQXV0aG9yaXphdGlvblwiLCAnQmVhcmVyICcrIHRva2VuLmFjY2Vzc190b2tlbik7XG4gICAgfSxcbiAgICBzdWNjZXNzIDogZnVuY3Rpb24oZGF0YSwgc3RhdHVzLCB4aHIpIHtcbiAgICAgIC8vIHBhcnNlIHRoZSByZXNwb25zZSAod2Ugb25seSBzdG9yZSBqc29uIGluIHRoZSBnb29nbGUgZHJpdmUpXG4gICAgICB0cnkge1xuICAgICAgICBkYXRhID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHt9XG5cbiAgICAgIGNhbGxiYWNrKGRhdGEsIGlkKTtcbiAgICB9LFxuICAgIGVycm9yIDogZnVuY3Rpb24oKSB7XG4gICAgICBjYWxsYmFjayh7XG4gICAgICAgIGVycm9yIDogdHJ1ZSxcbiAgICAgICAgbWVzc2FnZSA6IFwiRmFpbGVkIHRvIGxvYWQgZmlsZSBmcm9tIEdvb2dsZSBEcml2ZVwiXG4gICAgICB9KTtcblxuICAgIH1cbiAgfSk7XG59O1xuXG4vKioqXG4gKiBTYXZlIGpzb24gdG8gZ29vZ2xlIGRyaXZlXG4gKioqL1xuZnVuY3Rpb24gc2F2ZUZpbGUobmFtZSwgZGVzY3JpcHRpb24sIG1pbWVUeXBlLCBqc29uLCBjYWxsYmFjaywgb3B0aW9ucykge1xuICBpZiggIW9wdGlvbnMgKSBvcHRpb25zID0ge31cblxuICB2YXIgYm91bmRhcnkgPSAnLS0tLS0tLTMxNDE1OTI2NTM1ODk3OTMyMzg0Nic7XG4gIHZhciBkZWxpbWl0ZXIgPSBcIlxcclxcbi0tXCIgKyBib3VuZGFyeSArIFwiXFxyXFxuXCI7XG4gIHZhciBjbG9zZV9kZWxpbSA9IFwiXFxyXFxuLS1cIiArIGJvdW5kYXJ5ICsgXCItLVwiO1xuXG4gIHZhciBtZXRhZGF0YSA9IHtcbiAgICAndGl0bGUnIDogbmFtZSxcbiAgICAnZGVzY3JpcHRpb24nIDogZGVzY3JpcHRpb24sXG4gICAgJ21pbWVUeXBlJyA6IG1pbWVUeXBlXG4gIH07XG5cbiAgLy8gaWYgd2Ugd2FudCB0byBzYXZlIHRoZSBmaWxlIHRvIGEgc3BlY2lmaWVkIGZvbGRlclxuICBpZiggb3B0aW9ucy5wYXJlbnQgKSB7XG4gICAgbWV0YWRhdGEucGFyZW50cyA9IFt7aWQ6IG9wdGlvbnMucGFyZW50fV07XG4gIH1cblxuICAvLyBpZiB0aGUganNvbiBpcyByZWFsbHkgYW4gb2JqZWN0LCB0dXJuIGl0IHRvIGEgc3RyaW5nXG4gIGlmICh0eXBlb2YganNvbiA9PSAnb2JqZWN0JykganNvbiA9IEpTT04uc3RyaW5naWZ5KGpzb24pO1xuXG4gIC8vIGRhdGEgbmVlZHMgdG8gYmUgYmFzZTY0IGVuY29kZWQgZm9yIHRoZSBQT1NUXG4gIHZhciBiYXNlNjREYXRhID0gYnRvYShqc29uKTtcblxuICAvLyBjcmVhdGUgb3VyIG11bHRpcGFydCBQT1NUIHJlcXVlc3RcbiAgdmFyIG11bHRpcGFydFJlcXVlc3RCb2R5ID0gZGVsaW1pdGVyXG4gICAgICArICdDb250ZW50LVR5cGU6IGFwcGxpY2F0aW9uL2pzb25cXHJcXG5cXHJcXG4nXG4gICAgICArIEpTT04uc3RyaW5naWZ5KG1ldGFkYXRhKTtcblxuICBpZigganNvbi5sZW5ndGggPiAwICkge1xuICAgIG11bHRpcGFydFJlcXVlc3RCb2R5ICs9IGRlbGltaXRlciArICdDb250ZW50LVR5cGU6ICdcbiAgICAgICsgbWltZVR5cGUgKyAnXFxyXFxuJyArICdDb250ZW50LVRyYW5zZmVyLUVuY29kaW5nOiBiYXNlNjRcXHJcXG4nXG4gICAgICArICdcXHJcXG4nICsgYmFzZTY0RGF0YTtcbiAgfVxuICBtdWx0aXBhcnRSZXF1ZXN0Qm9keSArPSBjbG9zZV9kZWxpbTtcblxuICAgICAvLyBzZXR1cCBQT1NUIHJlcXVlc3RcbiAgICAgLy8gaWYgdGhlIG9wdGlvbnMuY29udmVyPXRydWUgZmxhZyBpcyBzZXQsIGdvb2dsZSBhdHRlbXB0cyB0byBjb252ZXJ0IHRoZSBmaWxlIHRvXG4gICAgIC8vIGEgZ29vZ2xlIGRvYyBmaWxlLiAgTW9zdGx5LCB3ZSB1c2UgdGhpcyBmb3IgZXhwb3J0aW5nIGNzdiAtPiBHb29nbGUgU3ByZWFkc2hlZXRzXG4gIHZhciByZXF1ZXN0ID0gZ2FwaS5jbGllbnQucmVxdWVzdCh7XG4gICAgJ3BhdGgnIDogJy91cGxvYWQvZHJpdmUvdjIvZmlsZXMnICsgKCBvcHRpb25zLmNvbnZlcnQgPyAnP2NvbnZlcnQ9dHJ1ZScgOiAnJyksXG4gICAgJ21ldGhvZCcgOiAnUE9TVCcsXG4gICAgJ3BhcmFtcycgOiB7XG4gICAgICAndXBsb2FkVHlwZScgOiAnbXVsdGlwYXJ0J1xuICAgIH0sXG4gICAgJ2hlYWRlcnMnIDoge1xuICAgICAgJ0NvbnRlbnQtVHlwZScgOiAnbXVsdGlwYXJ0L21peGVkOyBib3VuZGFyeT1cIicgKyBib3VuZGFyeSArICdcIidcbiAgICB9LFxuICAgICdib2R5JyA6IG11bHRpcGFydFJlcXVlc3RCb2R5XG4gIH0pO1xuXG4gIC8vIHNlbmQgdGhlIHJlcXVlc3RcbiAgcmVxdWVzdC5leGVjdXRlKGZ1bmN0aW9uKHJlc3ApIHtcbiAgICBpZiAocmVzcC5pZClcbiAgICAgIGNhbGxiYWNrKHJlc3ApO1xuICAgIGVsc2VcbiAgICAgIGNhbGxiYWNrKHtcbiAgICAgICAgZXJyb3IgOiB0cnVlLFxuICAgICAgICBtZXNzYWdlIDogXCJGYWlsZWQgdG8gc2F2ZVwiXG4gICAgICB9KTtcbiAgfSk7XG59O1xuXG4vKioqXG4gKiBVcGRhdGUgYSBmaWxlIGJhc2VkIG9uIGlkIGFuZCBnaXZlbiBqc29uIGRhdGFcbiAqKiovXG5mdW5jdGlvbiB1cGRhdGVGaWxlKGZpbGVJZCwganNvbiwgY2FsbGJhY2spIHtcbiAgLy8gc3RhcnQgY3JlYXRpbmcgdGhlIG11bHRpcGFydCBQT1NUIHJlcXVlc3RcbiAgdmFyIGJvdW5kYXJ5ID0gJy0tLS0tLS0zMTQxNTkyNjUzNTg5NzkzMjM4NDYnO1xuICB2YXIgZGVsaW1pdGVyID0gXCJcXHJcXG4tLVwiICsgYm91bmRhcnkgKyBcIlxcclxcblwiO1xuICB2YXIgY2xvc2VfZGVsaW0gPSBcIlxcclxcbi0tXCIgKyBib3VuZGFyeSArIFwiLS1cIjtcblxuICB2YXIgbWV0YWRhdGEgPSB7fTtcblxuICAvLyBzdHJpbmlmeSB0aGVuIGJhc2U2NCBlbmNvZGUgdGhlbiBvYmplY3RcbiAgICB2YXIgYmFzZTY0RGF0YSA9IGJ0b2EoSlNPTi5zdHJpbmdpZnkoanNvbikpO1xuXG4gICAgLy8gc2V0IHVwIHRoZSBQT1NUIGJvZHlcbiAgICB2YXIgbXVsdGlwYXJ0UmVxdWVzdEJvZHkgPVxuICAgICAgZGVsaW1pdGVyICtcbiAgICAgICAgJ0NvbnRlbnQtVHlwZTogYXBwbGljYXRpb24vanNvblxcclxcblxcclxcbicgK1xuICAgICAgICBKU09OLnN0cmluZ2lmeShtZXRhZGF0YSkgK1xuICAgICAgICBkZWxpbWl0ZXIgK1xuICAgICAgICAnQ29udGVudC1UeXBlOiAnICsgTUlNRV9UWVBFICsgJ1xcclxcbicgK1xuICAgICAgICAnQ29udGVudC1UcmFuc2Zlci1FbmNvZGluZzogYmFzZTY0XFxyXFxuJyArXG4gICAgICAgICdcXHJcXG4nICtcbiAgICAgICAgYmFzZTY0RGF0YSArXG4gICAgICAgIGNsb3NlX2RlbGltO1xuXG4gIC8vIHNldHVwIFBPU1QgcmVxdWVzdFxuICAgIHZhciByZXF1ZXN0ID0gZ2FwaS5jbGllbnQucmVxdWVzdCh7XG4gICAgICAgICdwYXRoJzogJy91cGxvYWQvZHJpdmUvdjIvZmlsZXMvJytmaWxlSWQsXG4gICAgICAgICdtZXRob2QnOiAnUFVUJyxcbiAgICAgICAgJ3BhcmFtcyc6IHsndXBsb2FkVHlwZSc6ICdtdWx0aXBhcnQnfSxcbiAgICAgICAgJ2hlYWRlcnMnOiB7XG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdtdWx0aXBhcnQvbWl4ZWQ7IGJvdW5kYXJ5PVwiJyArIGJvdW5kYXJ5ICsgJ1wiJ1xuICAgICAgICB9LFxuICAgICAgICAnYm9keSc6IG11bHRpcGFydFJlcXVlc3RCb2R5fSk7XG5cbiAgICAvLyBzZXQgcmVxdWVzdFxuICAgIHJlcXVlc3QuZXhlY3V0ZShmdW5jdGlvbihyZXNwKXtcbiAgICAgIGlmKCByZXNwLmlkICkge1xuICAgICAgICBjYWxsYmFjayhyZXNwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNhbGxiYWNrKHtcbiAgICAgICAgZXJyb3IgOiB0cnVlLFxuICAgICAgICBtZXNzYWdlIDogXCJGYWlsZWQgdG8gdXBkYXRlXCJcbiAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBydW5Nb2RlbFJ0KCkge1xuICBpZiggb2ZmbGluZU1vZGUgKSByZXR1cm47XG4gIGdhKCdzZW5kJywgJ2V2ZW50JywgJ3VpJywgJ2ludGVyYWN0aW9uJywgJ3J1bi1tb2RlbC1yZW1vdGUnLCAxKTtcbiAgZ2RyaXZlUlQucnVuTW9kZWxSdCgpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgaW5pdCA6IGluaXQsXG4gIGNoZWNrU2lnbmVkSW4gOiBjaGVja1NpZ25lZEluLFxuICBzaWduSW4gOiBzaWduSW4sXG4gIGdldFRva2VuIDogZ2V0VG9rZW4sXG4gIGxpc3RGaWxlcyA6IGxpc3RGaWxlcyxcbiAgZ2V0RmlsZU1ldGFkYXRhIDogZ2V0RmlsZU1ldGFkYXRhLFxuICBsb2FkIDogbG9hZCxcbiAgc2F2ZUZpbGU6IHNhdmVGaWxlLFxuICBzaG93TG9hZFRyZWVQYW5lbCA6IHNob3dMb2FkVHJlZVBhbmVsLFxuICBzaG93U2F2ZVRyZWVQYW5lbCA6IHNob3dTYXZlVHJlZVBhbmVsLFxuICBydW5Nb2RlbFJ0IDogcnVuTW9kZWxSdCxcbiAgc2V0QXBwIDogc2V0QXBwLFxuXG4gIE1JTUVfVFlQRSA6IE1JTUVfVFlQRVxufTtcbiIsIi8vIFJFQUxUSU1FIChydCkgT2JqZWN0c1xuLy8gcnQganNvbiBmaWVsZCwgdXNlZCB0byBzZW5kIHVwZGF0ZXMgdG8gcGVlcnNcbnZhciBydEpzb24gPSBudWxsO1xuLy8gcnQgZG9jdW1lbnRcbnZhciBydERvYyA9IG51bGw7XG4vLyBoYXMgdGhlIHJ0IGFwaSBiZWVuIGxvYWRlZD9cbnZhciBfcnRMb2FkZWQgPSBmYWxzZTtcbi8vIHRpbWVyIHRvIGJ1ZmZlciB0aGUgZmlyaW5nIG9mIHVwZGF0ZXMgZnJvbSBydCBldmVudHNcbnZhciBfcnRUaW1lciA9IC0xO1xuXG4vLyBsaXN0IG9mIGN1cnJlbnQgcnQgZWRpdHMgdG8gaW5wdXQgZmlsZXNcbnZhciBydEVkaXRzID0ge307XG4vLyBnb29nbGUgZHJpdmUgcnQgbW9kZWwgLSBtYXBcbnZhciBsaXZlRWRpdHMgPSBudWxsO1xuLy8gbG9jYWwgbG9jayBvbiBhbiBlbGVtZW50XG52YXIgbG9jayA9IHt9O1xuXG52YXIgYXBwO1xuXG4vLyBsb2FkZWQgZmlsZSBpZFxudmFyIGxvYWRlZEZpbGU7XG5cbi8qKipcbiAqIFNldHVwIHRoZSBydCBhcGkgZm9yIHRoZSBjdXJyZW50IGZpbGUuICBUaGlzIHdpbGwgYWN0dWFsbHkgbG9hZCB0aGUgYXBpIGlmIG5lZWRlZFxuICoqKi9cbmZ1bmN0aW9uIGluaXRSdEFwaShmaWxlKSB7XG4gIHJ0SnNvbiA9IG51bGw7IC8vIGtpbGwgb2ZmIGFueSBvbGQgbGlzdG5lcnNcbiAgbG9hZGVkRmlsZSA9IGZpbGU7XG5cbiAgLy8gY2xvc2UgYW55IG9sZCBjb25uZWN0aW9uXG4gIGlmKCBydERvYyApIHJ0RG9jLmNsb3NlKCk7XG5cbiAgLy8gZ2V0IG91dCBvZiBoZXJlIGlmIHdlIGRvbid0IGhhdmUgYSBsb2FkZWQgZmlsZVxuICBpZiggbG9hZGVkRmlsZSA9PSBudWxsICkgcmV0dXJuO1xuXG4gIC8vIGxvYWQgYXBpIGlmIG5lZWRlZFxuICBpZiggIV9ydExvYWRlZCApIHtcbiAgICBnYXBpLmxvYWQoJ2RyaXZlLXJlYWx0aW1lJywgZnVuY3Rpb24oKXtcbiAgICAgIC8vIHNldHVwIHJ0IGhvb2tzXG4gICAgICBfcnRMb2FkZWQgPSB0cnVlO1xuICAgICAgX2xvYWRSdEZpbGUoKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICAvLyBzZXR1cCBydCBob29rc1xuICAgIF9sb2FkUnRGaWxlKCk7XG4gIH1cblxuICAvLyBzZXR1cCBpbnB1dCBoYW5kbGVyc1xuICAkKCcjaW5wdXRzIGlucHV0Jykub24oJ2ZvY3VzJyxmdW5jdGlvbihlKXtcbiAgICB2YXIgZWxlID0gJChlLnRhcmdldCk7XG4gICAgX3NldExvY2FsTG9jayh7XG4gICAgICBpZCAgICAgICAgOiBlbGUuYXR0cihcImlkXCIpLFxuICAgICAgdmFsdWUgICAgIDogZWxlLnZhbCgpLFxuICAgICAgdGltZXN0YW1wIDogbmV3IERhdGUoKS5nZXRUaW1lKCksXG4gICAgICB1c2VyICAgICAgOiB3aW5kb3cudXNlcmluZm8gPyB3aW5kb3cudXNlcmluZm8ubmFtZSA6IFwidW5rbm93blwiXG4gICAgfSk7XG4gIH0pO1xuICAkKCcjaW5wdXRzIGlucHV0Jykub24oJ2JsdXInLGZ1bmN0aW9uKGUpe1xuICAgIF9yZW1vdmVMb2NhbExvY2soJChlLnRhcmdldCkuYXR0cihcImlkXCIpKTtcbiAgfSk7XG4gICQoJyNpbnB1dHMgaW5wdXQnKS5vbigna2V5dXAnLGZ1bmN0aW9uKGUpe1xuICAgIGlmKCBlLndoaWNoID09IDEzICkgcmV0dXJuO1xuICAgIHZhciBlbGUgPSAkKGUudGFyZ2V0KTtcbiAgICBfdXBkYXRlTG9jYWxMb2NrKGVsZS5hdHRyKFwiaWRcIiksIGVsZS52YWwoKSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBfc2V0TG9jYWxMb2NrKGxvY2spIHtcbiAgLy8gVE9ETzogdGhpcyBzaG91bGQgbWFyayB0aGUgY3VycmVudCBsb2NrXG4gIGlmKCBsaXZlRWRpdHMuaGFzW2xvY2suaWRdICkgcmV0dXJuO1xuICBsaXZlRWRpdHMuc2V0KGxvY2suaWQsIGxvY2spO1xufVxuXG5mdW5jdGlvbiBfdXBkYXRlTG9jYWxMb2NrKGlkLCB2YWwpIHtcbiAgdmFyIGxvY2sgPSB7XG4gICAgaWQgOiBpZCxcbiAgICB2YWx1ZSA6IHZhbCxcbiAgICB0aW1lc3RhbXAgOiBuZXcgRGF0ZSgpLmdldFRpbWUoKSxcbiAgICB1c2VyICAgICAgOiB3aW5kb3cudXNlcmluZm8gPyB3aW5kb3cudXNlcmluZm8ubmFtZSA6IFwidW5rbm93blwiXG4gIH1cblxuICBsaXZlRWRpdHMuc2V0KGlkLCBsb2NrKTtcbn1cblxuZnVuY3Rpb24gX3JlbW92ZUxvY2FsTG9jayhpZCkge1xuICBsaXZlRWRpdHMuZGVsZXRlKGlkKTtcbn1cblxuZnVuY3Rpb24gX3JlbW92ZVJlbW90ZUxvY2sobG9jaykge1xuICAkKFwiI1wiK2xvY2suaWQpLnJlbW92ZUF0dHIoXCJkaXNhYmxlZFwiKTtcbiAgJChcIiNcIitsb2NrLmlkK1wiLWVkaXRpbmdcIikucmVtb3ZlKCk7XG4gIGRlbGV0ZSBydEVkaXRzW2xvY2suaWRdO1xufVxuXG5mdW5jdGlvbiBfdXBkYXRlTG9jayhsb2NrKSB7XG4gICQoXCIjXCIrbG9jay5pZCkudmFsKGxvY2sudmFsdWUpLmF0dHIoXCJkaXNhYmxlZFwiLFwiZGlzYWJsZWRcIik7XG4gIGlmKCAkKFwiI1wiK2xvY2suaWQrXCItZWRpdGluZ1wiKS5sZW5ndGggPT0gMCApIHtcbiAgICAkKFwiI1wiK2xvY2suaWQpLnBhcmVudCgpLmFmdGVyKFwiPHNwYW4gaWQ9J1wiK2xvY2suaWQrXCItZWRpdGluZycgY2xhc3M9J2xhYmVsIGxhYmVsLXdhcm5pbmcnPjwvc3Bhbj5cIik7XG4gIH1cbiAgJChcIiNcIitsb2NrLmlkK1wiLWVkaXRpbmdcIikuaHRtbChsb2NrLnVzZXIpO1xuICBydEVkaXRzW2xvY2suaWRdID0gbG9jaztcbn1cblxuLyoqKlxuICogVXBkYXRlIHRoZSBsaXN0IG9mIHJlYWx0aW1lIGVkaXRzIGFzIHdlbGwgYXMgdGhlIGlucHV0IFVJIGJhc2VkIG9uIHRoZSBydERvYyBldmVudFxuICogVE9ETzogdGhpcyBpcyBhIGJpdCBuYXN0eSByaWdodCBub3dcbiAqKi9cbmZ1bmN0aW9uIF91cGRhdGVSdEVkaXRzKGUpIHtcbiAgaWYoIGUuaXNMb2NhbCApIHJldHVybjtcblxuICB2YXIga2V5cyA9IGxpdmVFZGl0cy5rZXlzKCk7XG5cbiAgLy8gcmVtb3ZlIG9sZCB0aW1lc3RhbXBzIFRPRE9cbiAgLypmb3IoIHZhciBpID0gMDsgaSA8IHZhbHVlcy5sZW5ndGg7IGkrKyApIHtcbiAgICBpZiggbm93IC0gdmFsdWVzW2ldLnRpbWVzdGFtcCA+IDEwMDAgKiA2MCApIHtcbiAgICAgIF9yZW1vdmVMb2NrKHZhbHVlc1tpXSk7IC8vIGRvZXMgdGhpcyBmaXJlIHVwZGF0ZXM/XG4gICAgfVxuICB9Ki9cblxuXG4gIC8vIHNldCBuZXcgZWRpdHNcbiAgZm9yKCB2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrICkge1xuICAgIF91cGRhdGVMb2NrKGxpdmVFZGl0cy5nZXQoa2V5c1tpXSkpO1xuICB9XG5cbiAgLy8gcmVtb3ZlIG9sZCBlZGl0c1xuICBmb3IoIHZhciBrZXkgaW4gcnRFZGl0cyApIHtcbiAgICBpZigga2V5cy5pbmRleE9mKGtleSkgPT0gLTEgKSB7XG4gICAgICBfcmVtb3ZlUmVtb3RlTG9jayhydEVkaXRzW2tleV0pO1xuICAgIH1cbiAgfVxufVxuXG4vKioqXG4gKiAgU2V0dXAgdGhlIHJ0IGhvb2tzIGZvciB0aGUgY3VycmVudCBmaWxlLiAgVGhlIGFwaSBuZWVkcyB0byBhbHJlYWR5IGJlIGxvYWRlZFxuICoqKi9cbmZ1bmN0aW9uIF9sb2FkUnRGaWxlKCkge1xuICAvLyBnZXQgdGhlIHJ0IGRvY1xuICBnYXBpLmRyaXZlLnJlYWx0aW1lLmxvYWQobG9hZGVkRmlsZSxcbiAgICAvLyBydCBkb2MgbG9hZGVkXG4gICAgZnVuY3Rpb24oZmlsZSl7XG4gICAgICBydERvYyA9IGZpbGU7XG5cbiAgICAgIC8vIGdldCBvdXIgcnQgYXR0cmlidXRlLiAgVHJpZ2dlcmluZyBjaGFuZ2VzIG9uIHJ0SnNvbiB3aWxsIHB1c2ggZXZlbnRzXG4gICAgICAvLyB0byBhbGwgbGlzdGVuaW5nIGNsaWVudHNcbiAgICAgIHZhciBqc29uID0gZmlsZS5nZXRNb2RlbCgpLmdldFJvb3QoKS5nZXQoXCJqc29uXCIpO1xuICAgICAgbGl2ZUVkaXRzID0gZmlsZS5nZXRNb2RlbCgpLmdldFJvb3QoKS5nZXQoXCJsaXZlRWRpdHNcIik7XG5cbiAgICAgIC8vIGlmIHRoZXJlIGlzIG5vIGpzb24gYXR0ciwgd2UgbmVlZCB0byBpbml0aWFsaXplIHRoZSBtb2RlbFxuICAgICAgaWYoIGpzb24gPT0gbnVsbCB8fCBsaXZlRWRpdHMgPT0gbnVsbCkge1xuICAgICAgICAvLyBpbml0aWFsaXplIG91ciBydCBtb2RlbFxuICAgICAgICBfb25SdE1vZGVsTG9hZChmaWxlLmdldE1vZGVsKCkpO1xuICAgICAgICAvLyBncmFiIHJ0IGpzb24gYXR0ciBub3cgdGhhdCB3ZSBhcmUgaW5pdGlhbGl6ZWRcbiAgICAgICAganNvbiA9IGZpbGUuZ2V0TW9kZWwoKS5nZXRSb290KCkuZ2V0KFwianNvblwiKTtcbiAgICAgICAgbGl2ZUVkaXRzID0gZmlsZS5nZXRNb2RlbCgpLmdldFJvb3QoKS5nZXQoXCJsaXZlRWRpdHNcIik7XG4gICAgICB9XG5cbiAgICAgIC8vIGJhZG5lc3MgaGFwcGVuZWQgOihcbiAgICAgIGlmKCAhanNvbiApIHJldHVybiBjb25zb2xlLmxvZyhcIkZhaWxlZCB0byBjb25uZWN0IHRvIHJ0IGpzb25cIik7XG4gICAgICAvLyBzZXQgdGhhdCBhdHRyIGdsb2JhbCB0byBjbGFzc1xuICAgICAgcnRKc29uID0ganNvbjtcblxuICAgICAgLy8gZ2V0IGN1cnJlbnQgbGlzdCBvZiB1c2Vyc1xuICAgICAgdmFyIHVzZXJzID0gZmlsZS5nZXRDb2xsYWJvcmF0b3JzKCk7XG5cbiAgICAgIC8vIGFkZCBldmVudCBsaXN0ZW5lcnMgZm9yIHdoZW4gcGVvcGxlIGNvbWUgYW5kIGdvXG4gICAgICBmaWxlLmFkZEV2ZW50TGlzdGVuZXIoZ2FwaS5kcml2ZS5yZWFsdGltZS5FdmVudFR5cGUuQ09MTEFCT1JBVE9SX0pPSU5FRCwgZnVuY3Rpb24oZSl7XG4gICAgICAgIHVzZXJzID0gZmlsZS5nZXRDb2xsYWJvcmF0b3JzKCk7XG4gICAgICAgIF91cGRhdGVBY3RpdmVVc2Vycyh1c2Vycyk7XG4gICAgICB9KTtcbiAgICAgIGZpbGUuYWRkRXZlbnRMaXN0ZW5lcihnYXBpLmRyaXZlLnJlYWx0aW1lLkV2ZW50VHlwZS5DT0xMQUJPUkFUT1JfTEVGVCwgZnVuY3Rpb24oZSl7XG4gICAgICAgIHVzZXJzID0gZmlsZS5nZXRDb2xsYWJvcmF0b3JzKCk7XG4gICAgICAgIF91cGRhdGVBY3RpdmVVc2Vycyh1c2Vycyk7XG4gICAgICB9KTtcblxuICAgICAgLy8gYWRkIGV2ZW50IGxpc3RlbmVycyBmb3IgdGhlIHJ0SnNvbiBvYmplY3RcbiAgICAgIC8vIHdoZW4gdGhpcyB1cGRhdGVzLCB3ZSB3YW50IHRvIHJlLXJ1biB0aGUgbW9kZWxcbiAgICAgIGpzb24uYWRkRXZlbnRMaXN0ZW5lcihnYXBpLmRyaXZlLnJlYWx0aW1lLkV2ZW50VHlwZS5URVhUX0lOU0VSVEVELCBmdW5jdGlvbihlKXtcbiAgICAgICAgaWYoIGUuaXNMb2NhbCApIHJldHVybjtcbiAgICAgICAgX3JlcnVuUnQodXNlcnMsIGUudXNlcklkKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGpzb24uYWRkRXZlbnRMaXN0ZW5lcihnYXBpLmRyaXZlLnJlYWx0aW1lLkV2ZW50VHlwZS5URVhUX0RFTEVURUQsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgIGlmKCBlLmlzTG9jYWwgKSByZXR1cm47XG4gICAgICAgICAgX3JlcnVuUnQodXNlcnMsIGUudXNlcklkKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gbGl2ZSBlZGl0IHVwZGF0ZXNcbiAgICAgICAgICAgICAgbGl2ZUVkaXRzLmFkZEV2ZW50TGlzdGVuZXIoZ2FwaS5kcml2ZS5yZWFsdGltZS5FdmVudFR5cGUuVkFMVUVfQ0hBTkdFRCwgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICAgICAgICAgX3VwZGF0ZVJ0RWRpdHMoZSk7XG4gICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIC8vIHNob3cgd2hvIGlzIGxpc3RlbmluZ1xuICAgICAgICBfdXBkYXRlQWN0aXZlVXNlcnModXNlcnMpO1xuXG4gICAgICAgIC8vIHNldCBpbnB1dCBoYW5kbGVycyBmb3IgcnQgZXZlbnRzXG4gICAgfSxcbiAgICAvLyBtb2RlbCBsb2FkZWRcbiAgICBmdW5jdGlvbihtb2RlbCl7XG4gICAgICBfb25SdE1vZGVsTG9hZChtb2RlbCk7XG4gICAgfSxcbiAgICAvLyBlcnJvcnNcbiAgICBmdW5jdGlvbihlcnIpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiUlQgRVJST1JTOiBcIik7XG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgIH1cbiAgKTtcbn1cblxuXG4vKioqXG4gKiBVcGRhdGUgdGhlIGRpc3BsYXkgb2YgYWN0aXZlIHVzZXJzIGZvciB0aGUgbW9kZWwuXG4gKioqL1xuZnVuY3Rpb24gX3VwZGF0ZUFjdGl2ZVVzZXJzKHVzZXJzKSB7XG4gIC8vIGlmIGl0J3MganVzdCB1cywgZG9uJ3Qgc2hvdyBhbnl0aGluZ1xuICBpZiggIXVzZXJzICkgcmV0dXJuICQoXCIjYWN0aXZlLXVzZXJzXCIpLmh0bWwoXCJcIik7XG4gIGlmKCB1c2Vycy5sZW5ndGggPD0gMSApIHJldHVybiAkKFwiI2FjdGl2ZS11c2Vyc1wiKS5odG1sKFwiXCIpO1xuXG4gIC8vIHdlIG9ubHkgd2FudCB1bmlxdWUgdXNlcnNcbiAgdmFyIHVuaXF1ZSA9IFtdO1xuICB2YXIgdXVzZXJzID0gW107XG4gIGZvciggdmFyIGkgPSAwOyBpIDwgdXNlcnMubGVuZ3RoOyBpKysgKSB7XG4gICAgaWYoIHVuaXF1ZS5pbmRleE9mKHVzZXJzW2ldLnVzZXJJZCkgPT0gLTEgKSB7XG4gICAgICB1bmlxdWUucHVzaCh1c2Vyc1tpXS51c2VySWQpO1xuICAgICAgdXVzZXJzLnB1c2godXNlcnNbaV0pO1xuICAgIH1cbiAgfVxuICBpZiggdXVzZXJzLmxlbmd0aCA8PSAxICkgcmV0dXJuICQoXCIjYWN0aXZlLXVzZXJzXCIpLmh0bWwoXCJcIik7XG5cbiAgLy8gYWRkIHBpYyBvZiB1c2VyIHRvIGRpc3BsYXkgcGFuZWxcbiAgdmFyIGh0bWwgPSBcIkFjdGl2ZSBVc2VycyBcIjtcbiAgZm9yKCB2YXIgaSA9IDA7IGkgPCB1dXNlcnMubGVuZ3RoOyBpKysgKSB7XG4gICAgaWYoIHV1c2Vyc1tpXS5waG90b1VybCApIHtcbiAgICAgIGh0bWwgKz0gXCI8aW1nIHNyYz0nXCIrdXVzZXJzW2ldLnBob3RvVXJsK1wiJyB0aXRsZT0nXCIrdXVzZXJzW2ldLmRpc3BsYXlOYW1lK1wiJyBzdHlsZT0nbWFyZ2luOjAgNXB4O3dpZHRoOjMycHg7aGVpZ2h0OjMycHgnIGNsYXNzPSdpbWctcm91bmRlZCcgLz4gXCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGh0bWwgKz0gXCI8c3BhbiBzdHlsZT0nd2lkdGg6MzJweDtoZWlnaHQ6MzJweDttYXJnaW46MCA1cHg7YmFja2dyb3VuZC1jb2xvcjpcIit1dXNlcnNbaV0uY29sb3IrXCInIHRpdGxlPSdcIit1dXNlcnNbaV0uZGlzcGxheU5hbWUrXCInID48L3NwYW4+IFwiO1xuICAgIH1cbiAgfVxuICAkKFwiI2FjdGl2ZS11c2Vyc1wiKS5odG1sKGh0bWwpO1xufVxuXG4vKioqXG4gICAqICBSZS1ydW4gdGhlIG1vZGVsLiAgRXZlbnRzIGNhbiBjb21lIGluIHF1aWNrbHkgaW4gbWFueSBwYXJ0cy4gIEJ1ZmZlciB0aGUgZXZlbnRzIHNvIHdlIGRvbid0IHJlLXJ1biB0aGUgbW9kZWwgdG9vIG1hbnkgdGltZXMuXG4gICAqKiovXG5mdW5jdGlvbiBfcmVydW5SdCh1c2VycywgdXNlcklkKSB7XG4gIC8vIHRoaXMgaXMgYmFkbmVzc1xuICBpZiggIXJ0SnNvbiApIHJldHVybjtcblxuICAvLyBjbGVhciBhbnkgcXVldWVkIHJ1blxuICBpZiggX3J0VGltZXIgIT0gLTEgKSBjbGVhclRpbWVvdXQoX3J0VGltZXIpO1xuXG4gIC8vIHF1ZXVlIHVwIGEgcnVuIGFuZCB3YWl0IHRvIG1ha2Ugc3VyZSB0aGVyZSBhcmUgbm8gdXBkYXRlc1xuICBfcnRUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICBfcnRUaW1lciA9IC0xO1xuXG4gICAgLy8gZmluZCB0aGUgdXNlciB3aG8gaXMgcnVubmluZyB0aGUgbW9kZWwgYW5kIGRpcGxheSBwb3B1cCBvZiB0aGF0IHVzZXJzIGluZm9ybWF0aW9uXG4gICAgZm9yKCB2YXIgaSA9IDA7IGkgPCB1c2Vycy5sZW5ndGg7IGkrKyApIHtcbiAgICAgIGlmKCB1c2Vyc1tpXS51c2VySWQgPT0gdXNlcklkICkge1xuICAgICAgICB2YXIgcGFuZWwgPSAkKFwiPGRpdiBjbGFzcz0naW5pdC1sb2FkaW5nLW91dGVyJyA+PGRpdiBjbGFzcz0naW5pdC1sb2FkaW5nJyBzdHlsZT0nd2lkdGg6NDAwcHgnPiBcIitcbiAgICAgICAgICAgICAgICAodXNlcnNbaV0ucGhvdG9VcmwgPyBcIjxpbWcgc3JjPSdcIit1c2Vyc1tpXS5waG90b1VybCtcIicgLz4gXCIgOiBcIlwiKSt1c2Vyc1tpXS5kaXNwbGF5TmFtZStcIiBpcyB1cGRhdGluZyB0aGUgbW9kZWwuLi48L2Rpdj48L2Rpdj5cIik7XG4gICAgICAgICAgICAkKFwiYm9keVwiKS5hcHBlbmQocGFuZWwpO1xuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHBhbmVsLmNzcyhcIm9wYWNpdHlcIixcIi45XCIpO1xuICAgICAgICAgICAgfSw1MCk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgcGFuZWwucmVtb3ZlKCk7XG4gICAgICAgICAgICB9LCAzNTAwKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIHBhcnNlIHRoZSBuZXcgbW9kZWwgZGF0YSBhbmQgbG9hZCBpdCBhcyBvdXIgY3VycmVudCBzZXR1cFxuICAgIHZhciBkYXRhID0gSlNPTi5wYXJzZShydEpzb24uZ2V0VGV4dCgpKTtcbiAgICBhcHAuZ2V0TW9kZWxJTygpLmxvYWRTZXR1cChsb2FkZWRGaWxlLCBkYXRhLCB0cnVlKTtcbiAgfSwgMzAwKTtcbn1cblxuLyoqKlxuICogaW5pdGlhbGl6ZSBhIG5ldyBydCBtb2RlbFxuICoqKi9cbmZ1bmN0aW9uIF9vblJ0TW9kZWxMb2FkKG1vZGVsKSB7XG4gIC8vIGN1cnJlbnRseSB3ZSBqdXN0IHdhbnQgdG8gdXNlIHRoaXMgc2luZ2xlIGF0dHJpYnV0ZSB0byBicm9hZGNhc3QgZXZlbnRzXG4gIHZhciBqc29uID0gbW9kZWwuZ2V0Um9vdCgpLmdldChcImpzb25cIik7XG4gIGlmKCBqc29uID09IG51bGwgKSB7XG4gICAgdmFyIHN0cmluZyA9IG1vZGVsLmNyZWF0ZVN0cmluZyhcInt9XCIpO1xuICAgIG1vZGVsLmdldFJvb3QoKS5zZXQoXCJqc29uXCIsIHN0cmluZyk7XG4gIH1cblxuICB2YXIgbGl2ZUVkaXRzID0gbW9kZWwuZ2V0Um9vdCgpLmdldChcImxpdmVFZGl0c1wiKTtcbiAgaWYoIGxpdmVFZGl0cyA9PSBudWxsICkge1xuICAgIHZhciBmaWVsZCA9IG1vZGVsLmNyZWF0ZU1hcCgpO1xuICAgIG1vZGVsLmdldFJvb3QoKS5zZXQoXCJsaXZlRWRpdHNcIiwgZmllbGQpO1xuICB9XG5cbn1cblxuLyoqKlxuICogbGV0IHRoZSB3b3JsZCBrbm93IHdoYXQgd2UgYXJlIGRvaW5nIDopXG4gKiBUaGlzIHNob3VsZCBiZSBjYWxsZWQgd2hlbiBhIGxvY2FsIHVzZXIgcnVucyB0aGUgbW9kZWwuICBJdCB1cGRhdGVzIHRoZSAnanNvbidcbiAqIGF0dHJpYnV0ZSB3aGljaCBpcyB0aGVuIGJyb2FkY2FzdCB0byBhbGwgbGlzdGVuaW5nIHBhcnRpZXNcbiAqKiovXG5mdW5jdGlvbiBydW5Nb2RlbFJ0KCkge1xuICBpZiggcnRKc29uICkgcnRKc29uLnNldFRleHQoSlNPTi5zdHJpbmdpZnkoIGFwcC5nZXRNb2RlbElPKCkuZXhwb3J0U2V0dXAoKSApKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHJ1bk1vZGVsUnQgOiBydW5Nb2RlbFJ0LFxuICBpbml0UnRBcGkgIDogaW5pdFJ0QXBpLFxuICBzZXRBcHAgOiBmdW5jdGlvbihhcHBsaWNhdGlvbikge1xuICAgIGFwcCA9IGFwcGxpY2F0aW9uO1xuICB9XG59O1xuIiwidmFyIG9mZmxpbmUgPSByZXF1aXJlKCcuL29mZmxpbmUnKTtcbnZhciBnZHJpdmUgPSByZXF1aXJlKCcuL2dvb2dsZURyaXZlJyk7XG52YXIgY2hhcnRzID0gcmVxdWlyZSgnLi9jaGFydHMnKTtcbnZhciB3ZWF0aGVyQ2hhcnQgPSByZXF1aXJlKCcuL3dlYXRoZXIvY2hhcnQnKTtcbnZhciB3ZWF0aGVyRmlsZVJlYWRlciA9IHJlcXVpcmUoJy4vd2VhdGhlci9maWxlUmVhZGVyJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYXBwKSB7XG5cbnZhciB3ZWF0aGVyQXZlcmFnZUNoYXJ0ID0gbnVsbDtcbnZhciB3ZWF0aGVyQXZlcmFnZUNoYXJ0RGF0YSA9IHt9O1xuXG52YXIgU0VUVVBfVEVNUExBVEUgPVxuICAnPGRpdj4nK1xuICAnPGg0PkNoYXJ0IE9wdGlvbnM8L2g0PicrXG4gICc8ZGl2PicrXG4gICAgICAnPHRhYmxlIGNsYXNzPVwidGFibGVcIj4nK1xuICAgICAgICAgICc8dHI+JytcbiAgICAgICAgICAgICAgJzx0ZCBzdHlsZT1cIndpZHRoOjUwJVwiPk91dHB1dCB2YXJpYWJsZShzKSB0byBjaGFydCA8L3RkPicrXG4gICAgICAgICAgICAgICc8dGQ+IDxhIGlkPVwic2VsZWN0LWNoYXJ0cy1idG5cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiPlNlbGVjdCBDaGFydHM8L2E+PC90ZD4nK1xuICAgICAgICAgICc8L3RyPicrXG4gICAgICAgICAgJzx0cj4nK1xuICAgICAgICAgICAgICAnPHRkIHN0eWxlPVwid2lkdGg6NTAlXCI+VmFyaWF0aW9uIGFuYWx5c2lzIHBhcmFtZXRlcihzKSA8L3RkPicrXG4gICAgICAgICAgICAgICc8dGQ+PGRpdiBpZD1cInZhcmlhdGlvbkFuYWx5c2lzU3RhdHVzXCI+Tm9uZTwvZGl2PjwvdGQ+JytcbiAgICAgICAgICAnPC90cj4nK1xuICAgICAgJzwvdGFibGU+JytcbiAgJzwvZGl2PicrXG4gICc8aDQ+VGltZSBTdGVwPC9oND4nK1xuICAgJzxkaXYgc3R5bGU9XCJib3JkZXItdG9wOjFweCBzb2xpZCAjZGRkO3BhZGRpbmc6OHB4O2hlaWdodDo2MHB4XCI+JytcbiAgICAgJzxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+JytcbiAgICAgICAnPGxhYmVsIGZvcj1cImlucHV0LXNldHVwLWRheXNfaW5faW50ZXJ2YWxcIiBjbGFzcz1cImNvbC1sZy00IGNvbnRyb2wtbGFiZWxcIj5EYXlzIGluIEludGVydmFsPC9sYWJlbD4nK1xuICAgICAgICc8ZGl2IGNsYXNzPVwiY29sLWxnLThcIj4nK1xuICAgICAgICAgJzxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwiaW5wdXQtc2V0dXAtZGF5c19pbl9pbnRlcnZhbFwiICBjbGFzcz1cImZvcm0tY29udHJvbFwiIHZhbHVlPVwiMVwiLz4nK1xuICAgICAgICAgJzxwIGNsYXNzPVwiaGVscC1ibG9ja1wiPkhvdyBtYW55IGRheXMgYXJlIGluIGVhY2ggc3RlcCBvZiB0aGUgbW9kZWw8L3A+JyArXG4gICAgICAgJzwvZGl2PicrXG4gICAgICc8L2Rpdj4nK1xuICAgJzwvZGl2PicrXG4gICAnPGg0PkxvY2F0aW9uPC9oND4nK1xuICAgJzxkaXYgc3R5bGU9XCJib3JkZXItdG9wOjFweCBzb2xpZCAjZGRkO3BhZGRpbmc6OHB4O2hlaWdodDo2MHB4XCI+JytcbiAgICAgJzxzcGFuIGlkPVwiY3VycmVudC1sb2NhdGlvblwiIHN0eWxlPVwiY29sb3I6Izg4OFwiPjwvc3Bhbj4nK1xuICAgICAnPGEgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgcHVsbC1yaWdodCBzZWxlY3Qtd2VhdGhlci1sb2NhdGlvblwiPjxpIGNsYXNzPVwiaWNvbi1tYXAtbWFya2VyXCI+PC9pPiBTZWxlY3QgTG9jYXRpb248L2E+JytcbiAgICAnPC9kaXY+JytcbiAgJzwvZGl2Pic7XG5cbnZhciBHT09MRURSSVZFX1RSRUVfVEVNUExBVEUgPVxuICAnPGRpdiBzdHlsZT1cInBhZGRpbmc6MTVweCAwIDVweCAwO21hcmdpbi1ib3R0b206NXB4O2hlaWdodDogNTBweFwiPicrXG4gICAgJzxkaXYgY2xhc3M9XCJidG4tZ3JvdXAgcHVsbC1yaWdodFwiIGlkPVwidHJlZS1zdWItbWVudVwiPicrXG4gICAgICAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgZHJvcGRvd24tdG9nZ2xlXCIgZGF0YS10b2dnbGU9XCJkcm9wZG93blwiPicrXG4gICAgICAgICc8c3BhbiBpZD1cImxvYWRlZC10cmVlLW5hbWVcIj5EZWZhdWx0IFRyZWU8L3NwYW4+IDxzcGFuIGNsYXNzPVwiY2FyZXRcIj48L3NwYW4+JytcbiAgICAgICc8L2J1dHRvbj4nK1xuICAgICAgJzx1bCBjbGFzcz1cImRyb3Bkb3duLW1lbnVcIiByb2xlPVwibWVudVwiPicrXG4gICAgICAgICc8bGk+PGEgaWQ9XCJnZHJpdmUtdHJlZXBhbmVsLWxvYWRcIj48aSBjbGFzcz1cImljb24tY2xvdWQtZG93bmxvYWRcIj48L2k+IExvYWQgVHJlZTwvYT48L2xpPicrXG4gICAgICAgICc8bGk+PGEgaWQ9XCJnZHJpdmUtdHJlZXBhbmVsLXNhdmVcIj48aSBjbGFzcz1cImljb24tY2xvdWQtdXBsb2FkXCI+PC9pPiBTYXZlIFRyZWU8L2E+PC9saT4nK1xuICAgICAgICAnPGxpIHN0eWxlPVwiZGlzcGxheTpub25lXCI+PGEgaWQ9XCJzaGFyZS10cmVlLWJ0blwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCIgc3R5bGU9XCJkaXNwbGF5Om5vbmU7bWFyZ2luLWxlZnQ6MTBweFwiPjxpIGNsYXNzPVwiaWNvbi1zaGFyZVwiPjwvaT4gU2hhcmUgVHJlZTwvYT48L2xpPicrXG4gICAgICAnPC91bD4nK1xuICAnPC9kaXY+JytcbiAgJzxkaXYgc3R5bGU9XCJkaXNwbGF5Om5vbmVcIj48aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgaWQ9XCJjb21wYXJlLXRyZWVzXCIgLz4gQ29tcGFyZSBUcmVlczwvZGl2PicrXG4nPC9kaXY+JztcblxudmFyIElOUFVUX1RFTVBMQVRFID1cbiAgJzxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+JytcbiAgICAnPGxhYmVsIGZvcj1cInt7aWR9fVwiIGNsYXNzPVwiY29sLWxnLTQgY29udHJvbC1sYWJlbFwiPnt7bGFiZWx9fTwvbGFiZWw+JytcbiAgICAnPGRpdiBjbGFzcz1cImNvbC1sZy04XCI+JytcbiAgICAgICc8aW5wdXQgdHlwZT1cInt7dHlwZX19XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBpZD1cInt7aWR9fVwiIHN0eWxlPVwid2lkdGg6MjAwcHg7ZGlzcGxheTppbmxpbmUtYmxvY2tcIiB2YWx1ZT1cInt7dmFsdWV9fVwiPiZuYnNwOyZuYnNwO3t7dW5pdHN9fScrXG4gICAgICAnPHAgY2xhc3M9XCJoZWxwLWJsb2NrXCI+e3tkZXNjcmlwdGlvbn19PC9wPicgK1xuICAgICc8L2Rpdj4nK1xuICAnPC9kaXY+JztcblxudmFyIEFSUkFZX0lOUFVUX1RFTVBMQVRFID1cbiAgJzxkaXYgY2xhc3M9XCJjb2wtbGctNlwiPjxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+JytcbiAgICAnPGxhYmVsIGZvcj1cInt7aWR9fVwiIGNsYXNzPVwiY29sLWxnLTQgY29udHJvbC1sYWJlbFwiPnt7bGFiZWx9fTwvbGFiZWw+JytcbiAgICAnPGRpdiBjbGFzcz1cImNvbC1sZy04XCI+JytcbiAgICAgICd7e2lucHV0c319JytcbiAgICAgICc8cCBjbGFzcz1cImhlbHAtYmxvY2tcIj57e2Rlc2NyaXB0aW9ufX08L3A+JyArXG4gICAgJzwvZGl2PicrXG4gICc8L2Rpdj48L2Rpdj4nO1xuXG52YXIgdGFiSGVhZGVyID0gJzx1bCBjbGFzcz1cIm5hdiBuYXYtcGlsbHNcIiBpZD1cImlucHV0X3BpbGxzXCI+JztcbnZhciBjb250ZW50ID0gJzxkaXYgY2xhc3M9XCJ0YWItY29udGVudFwiPic7XG5cbnZhciB0cmVlSGVhZGVyID0gJzxkaXYgY2xhc3M9XCJwYW5lbC1ncm91cFwiIGlkPVwidHJlZS1hY2NvcmRpb25cIj4nO1xudmFyIFRSRUVfUEFORUxfVEVNUExBVEUgPSAnPGRpdiBjbGFzcz1cInBhbmVsIHBhbmVsLWRlZmF1bHRcIj4nK1xuICAgICAgICAnPGRpdiBjbGFzcz1cInBhbmVsLWhlYWRpbmdcIj4nK1xuICAgICAgICAgICAgJzxoNCBjbGFzcz1cInBhbmVsLXRpdGxlXCI+JytcbiAgICAgICAgICAgICAgICAnPGEgY2xhc3M9XCJhY2NvcmRpb24tdG9nZ2xlXCIgZGF0YS10b2dnbGU9XCJjb2xsYXBzZVwiIGRhdGEtcGFyZW50PVwiI3RyZWUtYWNjb3JkaW9uXCIgaHJlZj1cIiNjb2xsYXBzZXt7aWR9fVwiPicrXG4gICAgICAgICAgICAgICAgICAgICd7e3RpdGxlfX0nK1xuICAgICAgICAgICAgICAgICc8L2E+JytcbiAgICAgICAgICAgICc8L2g0PicrXG4gICAgICAgICc8L2Rpdj4nK1xuICAgICAgICAnPGRpdiBpZD1cImNvbGxhcHNle3tpZH19XCIgY2xhc3M9XCJwYW5lbC1jb2xsYXBzZSBjb2xsYXBzZVwiPicrXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cInBhbmVsLWJvZHlcIj57e2JvZHl9fTwvZGl2PicrXG4gICAgICAgICc8L2Rpdj4nK1xuICAgICAnPC9kaXY+JztcblxudmFyIGlucHV0cyA9IHt9O1xuXG4vLyBmb3Igd2VhdGhlciBkYXRhXG52YXIgY29scyA9IFtdO1xuXG52YXIgbWFwID0gbnVsbDtcblxuLyoqXG4gKiBPcHRpb25zIDpcbiAqICAgbW9kZWwgLSB0eXBlIG9mIG1vZGVsIHRvIGFwcGVuZCB0b1xuICogICBsYWJlbCAtIGF0dHJpYnV0ZSBsYWJlbFxuICogICB2YWx1ZSAtIGRlZmF1bHQgdmFsdWVcbiAqICAgZGVzY3JpcHRpb24gLSBkZXNjcmlwdGlvbiBvZiBhdHRyaWJ1dGVcbiAqICAgdW5pdHMgLSBhdHRyaWJ1dGUgdW5pdHNcbiAqL1xuZnVuY3Rpb24gX2FkZElucHV0KG9wdGlvbnMpIHtcbiAgaWYoICFpbnB1dHNbb3B0aW9ucy5tb2RlbF0gKSBpbnB1dHNbb3B0aW9ucy5tb2RlbF0gPSBbXTtcbiAgaW5wdXRzW29wdGlvbnMubW9kZWxdLnB1c2gob3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIF9jcmVhdGVXZWF0aGVySW5wdXRzKCkge1xuICBmb3IoIHZhciBhdHRyIGluIGFwcC5nZXRNb2RlbCgpLmdldERhdGFNb2RlbCgpLndlYXRoZXIgKSB7XG4gICAgaWYoIGF0dHIgIT0gXCJucmVsXCIgKSBjb2xzLnB1c2goYXR0cik7XG4gIH1cblxuICB2YXIgdGFibGUgPSAnPGRpdiBzdHlsZT1cInBhZGRpbmctdG9wOjI1cHhcIj48YSBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBwdWxsLXJpZ2h0XCIgaWQ9XCJsb2FkLXdlYXRoZXItYnRuXCI+PGkgY2xhc3M9XCJpY29uLXVwbG9hZC1hbHRcIj48L2k+IFVwbG9hZDwvYT4nK1xuICAgICAgICAnPGRpdiBjbGFzcz1cImJ0bi1ncm91cFwiIGlkPVwid2VhdGhlci1pbnB1dC10b2dnbGVcIj4nK1xuICAgICAgICAgICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBhY3RpdmVcIj5BdmVyYWdlczwvYnV0dG9uPicrXG4gICAgICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCI+QWN0dWFsPC9idXR0b24+JytcbiAgICAgICAgJzwvZGl2PicrXG4gICAgICAgICc8L2Rpdj4nK1xuICAgICAgICAnPGRpdiBpZD1cImN1c3RvbS13ZWF0aGVyLXBhbmVsXCIgc3R5bGU9XCJkaXNwbGF5Om5vbmU7bWFyZ2luLXRvcDoyMHB4XCI+PC9kaXY+JytcbiAgICAgICAgJzxkaXYgaWQ9XCJhdmVyYWdlLXdlYXRoZXItcGFuZWxcIj4nK1xuICAgICAgICAnPGRpdiBzdHlsZT1cInBhZGRpbmc6MTBweDtjb2xvcjojODg4XCI+U2VsZWN0IGxvY2F0aW9uIHRvIHNldCB0aGUgYXZlcmFnZSB3ZWF0aGVyIGRhdGE8L2Rpdj4nK1xuICAgICAgICAnPHRhYmxlIGNsYXNzPVwidGFibGUgdGFibGUtc3RyaXBlZCB0YWJsZS1jb25kZW5zZWQgd2VhdGhlci10YWJsZVwiIHN0eWxlPVwibWFyZ2luLXRvcDoyMHB4XCI+JztcblxuICB0YWJsZSArPSBcIjx0cj5cIjtcbiAgZm9yKCB2YXIgaSA9IDA7IGkgPCBjb2xzLmxlbmd0aDsgaSsrICkge1xuICAgIHRhYmxlICs9IFwiPHRkPlwiK2NvbHNbaV0rXCI8L3RkPlwiO1xuICB9XG4gIHRhYmxlICs9IFwiPC90cj5cIjtcblxuICBmb3IoIHZhciBpID0gMDsgaSA8IDEyOyBpKysgKSB7XG4gICAgdmFyIG0gPSAoaSsxKSsnJztcbiAgICBpZiggbS5sZW5ndGggPT0gMSApIG0gPSAnMCcrbTtcblxuICAgIHRhYmxlICs9IFwiPHRyPlwiO1xuICAgIGZvciggdmFyIGogPSAwOyBqIDwgY29scy5sZW5ndGg7IGorKyApIHtcbiAgICAgIGlmKCBqID09IDAgKSB7XG4gICAgICAgIHRhYmxlICs9IFwiPHRkPlwiKyhpKzEpK1wiPC90ZD5cIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRhYmxlICs9IFwiPHRkPjxpbnB1dCBjbGFzcz0nZm9ybS1jb250cm9sJyBpZD0naW5wdXQtd2VhdGhlci1cIitjb2xzW2pdK1wiLVwiK20rXCInIHR5cGU9J3RleHQnIC8+PC90ZD5cIjtcbiAgICAgIH1cbiAgICB9XG4gICAgdGFibGUgKz0gXCI8L3RyPlwiO1xuICB9XG4gIHJldHVybiB0YWJsZSsnPC90YWJsZT48ZGl2IGlkPVwiYXZlcmFnZS13ZWF0aGVyLWNoYXJ0XCI+PC9kaXY+PC9kaXY+JztcblxufVxuXG5mdW5jdGlvbiBfc2V0V2VhdGhlckRhdGEoKSB7XG4gIHZhciBsbCA9IGFwcC5xcyhcImxsXCIpO1xuICBpZiggbGwgKSB7XG4gICAgbGwgPSBsbC5zcGxpdChcIixcIik7XG4gICAgX3F1ZXJ5V2VhdGhlckRhdGEobGxbMF0sIGxsWzFdLCBmdW5jdGlvbigpIHtcbiAgICAgICAgYXBwLnJ1bk1vZGVsKCk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgJChcIiNjdXJyZW50LWxvY2F0aW9uXCIpLmh0bWwoXCJOb3QgU2V0XCIpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9xdWVyeVdlYXRoZXJEYXRhKGxuZywgbGF0LCBjYWxsYmFjaykge1xuICBnYSgnc2VuZCcsICdldmVudCcsICd1aScsICdpbnRlcmFjdGlvbicsICd3ZWF0aGVyLWRhdGEtcXVlcnknLCAxKTtcblxuICB2YXIgdXJsID0gXCJodHRwOi8vYWxkZXIuYmlvZW5lcmd5LmNhc2lsLnVjZGF2aXMuZWR1OjgwODAvdml6c291cmNlL3Jlc3Q/dmlldz1wb2ludFRvV2VhdGhlcihcIitsbmcrXCIsXCIrbGF0K1wiLDgxOTIpXCJcbiAgdmFyIHEgPSBuZXcgZ29vZ2xlLnZpc3VhbGl6YXRpb24uUXVlcnkodXJsKTtcbiAgdmFyIHJlc3BzID0gMDtcblxuICBmdW5jdGlvbiBjaGVja0RvbmUoKSB7XG4gICAgICByZXNwcysrO1xuICAgICAgaWYoIHJlc3BzID09IDIgJiYgY2FsbGJhY2sgKSBjYWxsYmFjaygpO1xuICB9XG5cbiAgcS5zZXRRdWVyeSgnU0VMRUNUIConKTtcbiAgcS5zZW5kKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICB2YXIgdGFibGUgPSBKU09OLnBhcnNlKHJlc3BvbnNlLmdldERhdGFUYWJsZSgpLnRvSlNPTigpKTtcblxuICAgIGZvciggdmFyIGkgPSAwOyBpIDwgdGFibGUucm93cy5sZW5ndGg7IGkrKyApIHtcbiAgICAgIHZhciBtID0gKGkrMSkrJyc7XG4gICAgICBpZiggbS5sZW5ndGggPT0gMSApIG0gPSAnMCcrbTtcblxuICAgICAgd2VhdGhlckF2ZXJhZ2VDaGFydERhdGFbbV0gPSB7fTtcbiAgICAgIGZvciggdmFyIGogPSAxOyBqIDwgdGFibGUuY29scy5sZW5ndGg7IGorKyApIHtcbiAgICAgICAgJChcIiNpbnB1dC13ZWF0aGVyLVwiK2NvbHNbal0rXCItXCIrbSkudmFsKHRhYmxlLnJvd3NbaV0uY1tqXSA/IHRhYmxlLnJvd3NbaV0uY1tqXS52IDogXCJcIik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlQXZlcmFnZUNoYXJ0KCk7XG4gICAgY2hlY2tEb25lKCk7XG4gIH0pO1xuXG4gIHZhciB1cmwgPSBcImh0dHA6Ly9hbGRlci5iaW9lbmVyZ3kuY2FzaWwudWNkYXZpcy5lZHU6ODA4MC92aXpzb3VyY2UvcmVzdD92aWV3PXBvaW50VG9TT0lMKFwiK2xuZytcIixcIitsYXQrXCIsODE5MilcIlxuICB2YXIgcSA9IG5ldyBnb29nbGUudmlzdWFsaXphdGlvbi5RdWVyeSh1cmwpO1xuICBxLnNldFF1ZXJ5KCdTRUxFQ1QgKicpO1xuICBxLnNlbmQoZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgIHZhciBlcnJvciA9IGZhbHNlO1xuICAgIHZhciB0YWJsZSA9IEpTT04ucGFyc2UocmVzcG9uc2UuZ2V0RGF0YVRhYmxlKCkudG9KU09OKCkpO1xuICAgIGZvciggdmFyIGkgPSAwOyBpIDwgdGFibGUuY29scy5sZW5ndGg7IGkrKyApIHtcbiAgICAgIGlmKCB0YWJsZS5yb3dzWzBdID09IG51bGwgKSB7XG4gICAgICAgIGVycm9yID0gdHJ1ZTtcbiAgICAgICAgYWxlcnQoXCJJbnZhbGlkIGxvY2F0aW9uIHNlbGVjdGVkXCIpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgdmFyIGtleSA9IHRhYmxlLmNvbHNbaV0uaWQ7XG4gICAgICBpZigga2V5ID09PSAnbWF4YXdzJyApIGtleSA9ICdtYXhBV1MnO1xuXG4gICAgICAkKFwiI2lucHV0LXNvaWwtXCIra2V5KS52YWwodGFibGUucm93c1swXS5jW2ldLnYpO1xuICAgIH1cblxuICAgIGlmKCAhZXJyb3IgKSBjaGVja0RvbmUoKTtcbiAgfSk7XG5cbiAgJChcIiNjdXJyZW50LWxvY2F0aW9uXCIpLmh0bWwobG5nK1wiLCBcIitsYXQrXCIgPGEgaHJlZj0nXCIrd2luZG93LmxvY2F0aW9uLmhyZWYucmVwbGFjZSgvIy4qLywnJykrXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIj9sbD1cIitsbmcrXCIsXCIrbGF0K1wiJyB0YXJnZXQ9J19ibGFuayc+PGkgY2xhc3M9J2ljb24tbGluayc+PC9pPjwvYT5cIik7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUF2ZXJhZ2VDaGFydCgpIHtcbiAgd2VhdGhlckF2ZXJhZ2VDaGFydERhdGEgPSB7fTtcblxuICBmb3IoIHZhciBpID0gMDsgaSA8IDEyOyBpKysgKSB7XG4gICAgdmFyIG0gPSAoaSsxKSsnJztcbiAgICBpZiggbS5sZW5ndGggPT0gMSApIG0gPSAnMCcrbTtcblxuICAgIHdlYXRoZXJBdmVyYWdlQ2hhcnREYXRhW21dID0ge307XG4gICAgZm9yKCB2YXIgaiA9IDE7IGogPCBjb2xzLmxlbmd0aDsgaisrICkge1xuICAgICAgdmFyIHZhbCA9ICQoXCIjaW5wdXQtd2VhdGhlci1cIitjb2xzW2pdK1wiLVwiK20pLnZhbCgpO1xuICAgICAgaWYoIHZhbCAmJiB2YWwubGVuZ3RoID4gMCApIHdlYXRoZXJBdmVyYWdlQ2hhcnREYXRhW21dW2NvbHNbal1dID0gcGFyc2VJbnQodmFsKTtcbiAgICAgIGVsc2Ugd2VhdGhlckF2ZXJhZ2VDaGFydERhdGFbbV1bY29sc1tqXV0gPSAwO1xuICAgIH1cbiAgfVxuICB3ZWF0aGVyQXZlcmFnZUNoYXJ0ID0gd2VhdGhlckNoYXJ0LmNyZWF0ZSgkKCcjYXZlcmFnZS13ZWF0aGVyLWNoYXJ0JylbMF0sIHdlYXRoZXJBdmVyYWdlQ2hhcnREYXRhKTtcbn1cblxuZnVuY3Rpb24gX3NlbGVjdFdlYXRoZXJMb2NhdGlvbigpIHtcbiAgaWYoICFtYXAgKSB7XG4gICAgJChcIiNzZWxlY3Qtd2VhdGhlci1tb2RhbFwiKS5tb2RhbCh7fSk7XG5cbiAgICAkKFwiI2xvY2F0ZS1idXR0b25cIikub24oJ2NsaWNrJywgX2dldExvY2F0aW9uKTtcblxuXG4gICAgLy8gd2FpdCBmb3IgdGhlIG1vZGFsIHRvIGluaXRcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICBpZiggb2ZmbGluZU1vZGUgKSByZXR1cm47XG5cbiAgICAgIG1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAoJChcIiNnbWFwXCIpWzBdLCB7XG4gICAgICAgIGNlbnRlciA6IG5ldyBnb29nbGUubWFwcy5MYXRMbmcoMzUsIC0xMjEpLFxuICAgICAgICB6b29tOiA1LFxuICAgICAgICBtYXBUeXBlSWQgOiBnb29nbGUubWFwcy5NYXBUeXBlSWQuUk9BRE1BUFxuICAgICAgfSk7XG5cbiAgICAgIHZhciBkZWZhdWx0U3R5bGUgPSB7XG4gICAgICAgICAgICBwb2x5Z29uT3B0aW9uczoge1xuICAgICAgICAgICAgICBzdHJva2VDb2xvciAgIDogXCIjMDAwMEZGXCIsXG4gICAgICAgICAgICAgIHN0cm9rZU9wYWNpdHkgOiAwLjUsXG4gICAgICAgICAgICAgIGZpbGxDb2xvciAgICAgOiAnI0ZFRkVGRScsXG4gICAgICAgICAgICAgIGZpbGxPcGFjaXR5ICAgOiAwLjJcbiAgICAgICAgICAgIH0sXG4gICAgICB9O1xuXG5cbiAgICAgIHZhciBkZWZhdWx0T3B0aW9ucyA9IHtcbiAgICAgICAgICBxdWVyeToge1xuICAgICAgICAgICAgc2VsZWN0OiAnYm91bmRhcnknLFxuICAgICAgICAgICAgZnJvbTogJzFoVjl2UUczU2MwSkxQZHVGcFdKenRmTEstZXg2Y2N5TWdfcHRFX3MnXG4gICAgICAgICAgfSxcbiAgICAgICAgICBzdHlsZXM6IFtkZWZhdWx0U3R5bGVdLFxuICAgICAgICAgIHN1cHByZXNzSW5mb1dpbmRvd3MgOiB0cnVlXG4gICAgICB9O1xuXG4gICAgICB2YXIgZnVzaW9uTGF5ZXIgPSBuZXcgZ29vZ2xlLm1hcHMuRnVzaW9uVGFibGVzTGF5ZXIoZGVmYXVsdE9wdGlvbnMpO1xuICAgICAgZnVzaW9uTGF5ZXIub3BhY2l0eSA9IC44O1xuICAgICAgZnVzaW9uTGF5ZXIuc2V0TWFwKG1hcCk7XG5cbiAgICAgIGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKG1hcCwgJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiggJCgnI2xvY2F0ZS1jYWNoZS1tb2RlJykuaXMoJzpjaGVja2VkJykgKSB7XG4gICAgICAgICAgYWxlcnQoJ1lvdSBtdXN0IGNsaWNrIG9uIGEgZ2VvbWV0cnkgdG8gY2FjaGUnKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBfcXVlcnlXZWF0aGVyRGF0YShlLmxhdExuZy5sbmcoKSwgZS5sYXRMbmcubGF0KCksIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgYXBwLnJ1bk1vZGVsKCk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAkKFwiI3NlbGVjdC13ZWF0aGVyLW1vZGFsXCIpLm1vZGFsKCdoaWRlJyk7XG4gICAgICB9KTtcbiAgICAgIGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKGZ1c2lvbkxheWVyLCAnY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmKCAkKCcjbG9jYXRlLWNhY2hlLW1vZGUnKS5pcygnOmNoZWNrZWQnKSApIHtcbiAgICAgICAgICBvZmZsaW5lLmNhY2hlVGlsZShlLCBmdXNpb25MYXllciwgZGVmYXVsdE9wdGlvbnMsIGRlZmF1bHRTdHlsZSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgX3F1ZXJ5V2VhdGhlckRhdGEoZS5sYXRMbmcubG5nKCksIGUubGF0TG5nLmxhdCgpLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgIGFwcC5ydW5Nb2RlbCgpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgJChcIiNzZWxlY3Qtd2VhdGhlci1tb2RhbFwiKS5tb2RhbCgnaGlkZScpO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIHNldHVwIGlucHV0IGZvciBjbGVhcmluZyBjYWNoZVxuICAgICAgICAgICQoJyNjbGVhci1jYWNoZWQtdGlsZXMnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICBvZmZsaW5lLmNsZWFyQ2FjaGUoKTtcbiAgICAgICAgICAgICAgb2ZmbGluZS5yZW5kZXJDYWNoZWRUaWxlc09uTWFwKGZ1c2lvbkxheWVyLCBkZWZhdWx0T3B0aW9ucywgZGVmYXVsdFN0eWxlKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgb2ZmbGluZS5yZW5kZXJDYWNoZWRUaWxlc09uTWFwKGZ1c2lvbkxheWVyLCBkZWZhdWx0T3B0aW9ucywgZGVmYXVsdFN0eWxlKTtcblxuICAgIH0sNTAwKTtcbiAgfSBlbHNlIHtcbiAgICAkKFwiI3NlbGVjdC13ZWF0aGVyLW1vZGFsXCIpLm1vZGFsKCdzaG93Jyk7XG5cbiAgICAvLyB3ZSBzZWVtIHRvIGJlIGhhbmdpbmcgc29tZXRpbWVzLi4uLlxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgIGdvb2dsZS5tYXBzLmV2ZW50LnRyaWdnZXIobWFwLCBcInJlc2l6ZVwiKTtcbiAgICB9LCA1MDApO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9nZXRMb2NhdGlvbigpIHtcbiAgaWYgKG5hdmlnYXRvci5nZW9sb2NhdGlvbikge1xuICAgIG5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24oc2hvd1Bvc2l0aW9uKTtcbiAgICAkKFwiI2xvY2F0ZS1idXR0b25cIikuYWRkQ2xhc3MoXCJidG4td2FybmluZ1wiKTtcbiAgfSBlbHNle1xuICAgIHdpbmRvdy5hbGVydChcIkdlb2xvY2F0aW9uIGlzIG5vdCBzdXBwb3J0ZWQgYnkgdGhpcyBicm93c2VyLlwiKTtcbiAgfVxuICBmdW5jdGlvbiBzaG93UG9zaXRpb24ocG9zaXRpb24pIHtcbiAgICAkKFwiI2xvY2F0ZS1idXR0b25cIikucmVtb3ZlQ2xhc3MoXCJidG4td2FyblwiKS5hZGRDbGFzcyhcImJ0bi1zdWNjZXNzXCIpO1xuICAgIG1hcC5zZXRab29tKDEwKTtcbiAgICBtYXAuc2V0Q2VudGVyKG5ldyBnb29nbGUubWFwcy5MYXRMbmcocG9zaXRpb24uY29vcmRzLmxhdGl0dWRlLCBwb3NpdGlvbi5jb29yZHMubG9uZ2l0dWRlKSk7XG4gICAgLy9fcXVlcnlXZWF0aGVyRGF0YShwb3NpdGlvbi5jb29yZHMubG9uZ2l0dWRlLCBwb3NpdGlvbi5jb29yZHMubGF0aXR1ZGUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9nZW5lcmF0ZUlucHV0cyhpLCB0eXBlLCBwcmVmaXgsIG5hbWUsIGF0dHJzKSB7XG4gIHZhciBpZCA9IHByZWZpeC5sZW5ndGggPiAwID8gcHJlZml4KyctJytuYW1lIDogJ2lucHV0LScrbmFtZTtcbiAgdmFyIGlucHV0ID0gJzxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCIgc3R5bGU9XCJtYXJnaW4tbGVmdDonKyhpKjIwKSsncHg7bWFyZ2luLXRvcDowcHg7bWFyZ2luLXJpZ2h0OjVweFwiPic7XG5cbiAgdmFyIHRyZWVib2R5ID0gXCJcIjtcblxuICBpZiggIShpID09IDEpICkge1xuICAgICAgaWYoIGkgIT0gMCApIGlucHV0ICs9ICc8bGFiZWwgZm9yPVwiJytpZCsnXCIgY2xhc3M9XCJjb250cm9sLWxhYmVsXCI+JytuYW1lICsnPC9sYWJlbD4nO1xuICAgICAgaW5wdXQgKz0gJzxkaXY+JztcbiAgfVxuXG5cbiAgICAgIGlmICggdHlwZW9mIGF0dHJzLnZhbHVlID09ICdvYmplY3QnICYmIGkgPT0gMSAgKSB7IC8vICYmIHR5cGUgPT0gJ3RyZWUnICkge1xuICAgICAgZm9yKCB2YXIga2V5IGluIGF0dHJzLnZhbHVlICkge1xuICAgICAgICAgICAgICB0cmVlYm9keSArPSBfZ2VuZXJhdGVJbnB1dHMoaSsxLCB0eXBlLCBpZCwga2V5LCBhdHRycy52YWx1ZVtrZXldKTtcbiAgICAgICAgICB9XG4gIH0gZWxzZSBpZiAoIHR5cGVvZiBhdHRycy52YWx1ZSA9PSAnb2JqZWN0JyApIHtcbiAgICAgIGlmKCBhdHRycy5kZXNjcmlwdGlvbiApIGlucHV0ICs9ICc8cCBjbGFzcz1cImhlbHAtYmxvY2tcIj4nK2F0dHJzLmRlc2NyaXB0aW9uKyc8L3A+JztcbiAgICAgICAgICBmb3IoIHZhciBrZXkgaW4gYXR0cnMudmFsdWUgKSB7XG4gICAgICAgICAgICAgIGlucHV0ICs9IF9nZW5lcmF0ZUlucHV0cyhpKzEsIHR5cGUsIGlkLCBrZXksIGF0dHJzLnZhbHVlW2tleV0pO1xuICAgICAgICAgIH1cbiAgfSBlbHNlIGlmICggKHR5cGVvZiBhdHRycy52YWx1ZSA9PSAnbnVtYmVyJyB8fCB0eXBlb2YgYXR0cnMudmFsdWUgPT0gJ3N0cmluZycpICYmIGkgPT0gMSApIHsgLy8gJiYgdHlwZSA9PSAndHJlZScgKSB7XG5cbiAgICAgIHRyZWVib2R5ICs9XG4gICAgICAgICAgJzxkaXY+PGlucHV0IHR5cGU9XCInKyhhdHRycy52YWx1ZSA9PSAnX2RhdGVfJyA/ICdkYXRlJyA6ICd0ZXh0JykrJ1wiICcrXG4gICAgICAgICAgKHR5cGU9PSdjb25zdGFudHMnPydkaXNhYmxlZCc6JycpKycgY2xhc3M9XCJmb3JtLWNvbnRyb2wgJyt0eXBlKydcIiBpZD1cIicrXG4gICAgICAgICAgaWQrJ1wiIHN0eWxlPVwid2lkdGg6MjAwcHg7ZGlzcGxheTppbmxpbmUtYmxvY2tcIiB2YWx1ZT1cIidcbiAgICAgICAgICAgICAgKyhhdHRycy52YWx1ZSA9PSAnX2RhdGVfJyA/ICcnIDogYXR0cnMudmFsdWUpKydcIj4mbmJzcDsmbmJzcDsnXG4gICAgICAgICAgICAgICsoYXR0cnMudW5pdHMgPyBhdHRycy51bml0cyA6ICcnKSsnPC9kaXY+JztcblxuICB9IGVsc2UgaWYgKCAgdHlwZW9mIGF0dHJzLnZhbHVlID09ICdzdHJpbmcnIHx8IHR5cGVvZiBhdHRycy52YWx1ZSA9PSAnbnVtYmVyJyApIHtcblxuICAgIGlucHV0ICs9ICc8ZGl2PjxpbnB1dCB0eXBlPVwiJysoYXR0cnMudmFsdWUgPT0gJ19kYXRlXycgPyAnZGF0ZScgOiAndGV4dCcpKydcIiAnXG4gICAgICAgICAgKyh0eXBlPT0nY29uc3RhbnRzJz8nZGlzYWJsZWQnOicnKSsnIGNsYXNzPVwiZm9ybS1jb250cm9sICcrdHlwZStcbiAgICAgICAgICAgJ1wiIGlkPVwiJytpZCsnXCIgc3R5bGU9XCJ3aWR0aDoyMDBweDtkaXNwbGF5OmlubGluZS1ibG9ja1wiIHZhbHVlPVwiJ1xuICAgICAgICAgICsoYXR0cnMudmFsdWUgPT0gJ19kYXRlXycgPyAnJyA6IGF0dHJzLnZhbHVlKSsnXCI+Jm5ic3A7Jm5ic3A7J1xuICAgICAgICAgICsoYXR0cnMudW5pdHMgPyBhdHRycy51bml0cyA6ICcnKSsnPC9kaXY+JztcblxuICAgIGlmKCBhdHRycy5kZXNjcmlwdGlvbiApIGlucHV0ICs9ICc8cCBjbGFzcz1cImhlbHAtYmxvY2tcIj4nK2F0dHJzLmRlc2NyaXB0aW9uKyc8L3A+JztcbiAgfVxuXG4gIGlmKCAhKGkgPT0gMSAvKiYmIHR5cGUgPT0gJ3RyZWUnKi8pICkge1xuICAgICAgaW5wdXQgKz0gJzwvZGl2PjwvZGl2Pic7XG4gIH0gZWxzZSB7XG4gICAgICBpbnB1dCArPSBUUkVFX1BBTkVMX1RFTVBMQVRFXG4gICAgICAgICAgICAgICAgICAucmVwbGFjZSgve3tpZH19L2csaWQpXG4gICAgICAgICAgICAgICAgICAucmVwbGFjZSgne3t0aXRsZX19JyxuYW1lK1wiIDxzcGFuIHN0eWxlPSdjb2xvcjojODg4O2ZvbnQtc2l6ZToxMnB4Jz4gLSBcIithdHRycy5kZXNjcmlwdGlvbitcIjwvc3Bhbj5cIilcbiAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKCd7e2JvZHl9fScsdHJlZWJvZHkpKyc8L2Rpdj4nXG4gIH1cblxuICByZXR1cm4gaW5wdXQ7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZShlbGUpIHtcbiAgd2VhdGhlckZpbGVSZWFkZXIuaW5pdCgpO1xuICB2YXIgbW9kZWwsIG0sIGF0dHIsIGNvbmZpZztcblxuICB2YXIgaW5wdXRzID0gJC5leHRlbmQodHJ1ZSwge30sIGFwcC5nZXRNb2RlbCgpLmdldERhdGFNb2RlbCgpKTtcblxuICBpbnB1dHNbJ3NldHVwJ10gPSB7fTtcbiAgZm9yKCBtb2RlbCBpbiBpbnB1dHMgKSB7XG4gICAgbSA9IGlucHV0c1ttb2RlbF07XG4gICAgZm9yKCBhdHRyIGluIG0gKSB7XG4gICAgICBjb25maWcgPSBtW2F0dHJdO1xuXG4gICAgICBpZiggdHlwZW9mIGNvbmZpZyA9PSAnb2JqZWN0JyApIHtcbiAgICAgICAgX2FkZElucHV0KHtcbiAgICAgICAgICBtb2RlbCAgICAgICA6IG1vZGVsLFxuICAgICAgICAgIGxhYmVsICAgICAgIDogYXR0cixcbiAgICAgICAgICBkZXNjcmlwdGlvbiA6IGNvbmZpZy5kZXNjcmlwdGlvbixcbiAgICAgICAgICB2YWx1ZSAgICAgICA6IGNvbmZpZy52YWx1ZSxcbiAgICAgICAgICB1bml0cyAgICAgICA6IGNvbmZpZy51bml0c1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIF9hZGRJbnB1dCh7XG4gICAgICAgICAgbW9kZWwgICAgICAgOiBtb2RlbCxcbiAgICAgICAgICBsYWJlbCAgICAgICA6IGF0dHJcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cblxuICBmb3IoIG1vZGVsIGluIGlucHV0cyApIHtcbiAgICBpZiggbW9kZWwgPT0gXCJwbGFudGF0aW9uX3N0YXRlXCIgKSBjb250aW51ZTtcblxuICAgIHRhYkhlYWRlciArPSAnPGxpPjxhIGhyZWY9XCIjaW5wdXRzXycrbW9kZWwrJ1wiIGlkPVwidGFiX2lucHV0c18nK21vZGVsKydcIiBkYXRhLXRvZ2dsZT1cInBpbGxcIj4nXG4gICAgICAgICAgICAgICAgK21vZGVsLnN1YnN0cigwLDEpLnRvVXBwZXJDYXNlKCkrbW9kZWwuc3Vic3RyKDEpLnRvTG93ZXJDYXNlKCkrJzwvYT48L2xpPic7XG4gICAgdmFyIGF0dHJpYnV0ZXMgPSBpbnB1dHNbbW9kZWxdO1xuXG4gICAgY29udGVudCArPSAnIDxkaXYgY2xhc3M9XCJ0YWItcGFuZSBmYWRlXCIgaWQ9XCJpbnB1dHNfJyttb2RlbCsnXCI+JztcblxuICAgIHZhciByb3cxID0gXCJcIjtcbiAgICB2YXIgcm93MiA9IFwiPGRpdiBjbGFzcz0nY29sLWxnLTY+XCI7XG5cbiAgICBpZiggbW9kZWwgPT0gJ3dlYXRoZXInICkge1xuICAgICAgY29udGVudCArPSBfY3JlYXRlV2VhdGhlcklucHV0cygpO1xuICAgIH0gZWxzZSBpZiggbW9kZWwgPT0gJ3NldHVwJyApIHtcbiAgICAgIGNvbnRlbnQgKz0gU0VUVVBfVEVNUExBVEU7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY29udGVudCArPSB0cmVlSGVhZGVyO1xuXG4gICAgICAgIC8vIGFkZCB0aGUgZ29vZ2xlIGRyaXZlIGJ0biBmcm9tIHRyZWVzXG4gICAgICAgIGlmKCBtb2RlbCA9PSd0cmVlJyApIHtcbiAgICAgICAgICBjb250ZW50ICs9IF9jcmVhdGVUcmVlSW5wdXQobW9kZWwsIGlucHV0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29udGVudCArPSBfZ2VuZXJhdGVJbnB1dHMoMCwgbW9kZWwsICcnLCBtb2RlbCwgaW5wdXRzW21vZGVsXSk7XG4gICAgICAgIH1cblxuICAgICAgY29udGVudCArPSAnPC9kaXY+JztcbiAgICB9XG5cblxuICAgIGNvbnRlbnQgKz0gJzwvZGl2Pic7XG4gIH1cbiAgY29udGVudCArPSAnPC9kaXY+JztcbiAgdGFiSGVhZGVyICs9IFwiPC91bD5cIjtcblxuICBlbGUuaHRtbCh0YWJIZWFkZXIrXCI8ZGl2IGNsYXNzPSdmb3JtLWhvcml6b250YWwnPlwiK2NvbnRlbnQrXCI8L2Rpdj5cIik7XG5cbiAgLy8gcnVuIHRoZSBtb2RlbCB3aGVuZXZlciBzb21lIGhpdHMgJ2VudGVyJ1xuICBlbGUuZmluZCgnaW5wdXQnKS5vbigna2V5dXAnLGZ1bmN0aW9uKGUpe1xuICAgIGlmKCBlLndoaWNoID09IDEzICkgYXBwLnJ1bk1vZGVsKCk7XG4gIH0pO1xuXG4gIC8vIGFkZCBjbGljayBoYW5kbGVyIGZvciBsb2FkaW5nIGEgdHJlZVxuICBlbGUuZmluZChcIiNnZHJpdmUtdHJlZXBhbmVsLWxvYWRcIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICBnZHJpdmUuc2hvd0xvYWRUcmVlUGFuZWwoKTtcbiAgfSk7XG4gIGVsZS5maW5kKFwiI2dkcml2ZS10cmVlcGFuZWwtc2F2ZVwiKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgIGdkcml2ZS5zaG93U2F2ZVRyZWVQYW5lbCgpO1xuICB9KTtcblxuICAvLyBzZXQgdHJlZSBpbnB1dCBoYW5kbGVyc1xuICAkKFwiI2NvbXBhcmUtdHJlZXNcIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICBpZiggJCh0aGlzKS5pcygnOmNoZWNrZWQnKSApIHtcbiAgICAgICQoXCIjc2luZ2xlLXRyZWUtY29udGVudFwiKS5oaWRlKCk7XG4gICAgICAkKFwiI2NvbXBhcmUtdHJlZS1jb250ZW50XCIpLnNob3coKTtcbiAgICAgICQoXCIjdHJlZS1zdWItbWVudVwiKS5oaWRlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICQoXCIjc2luZ2xlLXRyZWUtY29udGVudFwiKS5zaG93KCk7XG4gICAgICAkKFwiI2NvbXBhcmUtdHJlZS1jb250ZW50XCIpLmhpZGUoKTtcbiAgICAgICQoXCIjdHJlZS1zdWItbWVudVwiKS5zaG93KCk7XG4gICAgfVxuICB9KTtcblxuICAvLyBzZXQgcGlsbCBjbGljayBoYW5kbGVyc1xuICAkKCcjaW5wdXRfcGlsbHMgYScpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICQodGhpcykudGFiKCdzaG93JylcbiAgfSk7XG4gICQoJyN0YWJfaW5wdXRzX3dlYXRoZXInKS50YWIoJ3Nob3cnKTtcblxuICAkKCcuc2VsZWN0LXdlYXRoZXItbG9jYXRpb24nKS5vbignY2xpY2snLCBfc2VsZWN0V2VhdGhlckxvY2F0aW9uKTtcblxuXG4gICQoJyN3ZWF0aGVyUmVhZGVyLW1vZGFsJykubW9kYWwoe3Nob3c6ZmFsc2V9KTtcbiAgJCgnI2xvYWQtd2VhdGhlci1idG4nKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICQoJyN3ZWF0aGVyUmVhZGVyLW1vZGFsJykubW9kYWwoJ3Nob3cnKTtcbiAgfSk7XG5cbiAgJChcIiN3ZWF0aGVyLWlucHV0LXRvZ2dsZSAuYnRuXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgJCgnI3dlYXRoZXItaW5wdXQtdG9nZ2xlIC5idG4uYWN0aXZlJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuXG4gICAgaWYoICQodGhpcykuaHRtbCgpID09ICdBdmVyYWdlcycgKSB7XG4gICAgICAkKCcjYXZlcmFnZS13ZWF0aGVyLXBhbmVsJykuc2hvdygpO1xuICAgICAgJCgnI2N1c3RvbS13ZWF0aGVyLXBhbmVsJykuaGlkZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcHAuc2V0V2VhdGhlcigpO1xuICAgICAgJCgnI2F2ZXJhZ2Utd2VhdGhlci1wYW5lbCcpLmhpZGUoKTtcbiAgICAgICQoJyNjdXN0b20td2VhdGhlci1wYW5lbCcpLnNob3coKTtcbiAgICB9XG4gIH0pO1xuXG4gICQod2luZG93KS5vbigncmVzaXplJywgZnVuY3Rpb24oKXtcbiAgICBpZiggd2VhdGhlckF2ZXJhZ2VDaGFydCApe1xuICAgICAgd2VhdGhlckF2ZXJhZ2VDaGFydCA9IHdlYXRoZXJDaGFydC5jcmVhdGUoJCgnI2F2ZXJhZ2Utd2VhdGhlci1jaGFydCcpWzBdLCB3ZWF0aGVyQXZlcmFnZUNoYXJ0RGF0YSk7XG4gICAgfVxuICB9KTtcblxuICBfc2V0V2VhdGhlckRhdGEoKTtcbn1cblxuZnVuY3Rpb24gX2NyZWF0ZVRyZWVJbnB1dChtb2RlbCwgaW5wdXRzKSB7XG4gIHZhciBjb250ZW50ID0gXCJcIjtcbiAgY29udGVudCArPSBHT09MRURSSVZFX1RSRUVfVEVNUExBVEU7XG5cbiAgY29udGVudCArPSAnPGRpdiBpZD1cInNpbmdsZS10cmVlLWNvbnRlbnRcIj4nO1xuICBjb250ZW50ICs9IF9nZW5lcmF0ZUlucHV0cygwLCBtb2RlbCwgJycsIG1vZGVsLCBpbnB1dHNbbW9kZWxdKTtcbiAgY29udGVudCArPSAnPC9kaXY+JztcblxuICBjb250ZW50ICs9ICc8ZGl2IGlkPVwiY29tcGFyZS10cmVlLWNvbnRlbnRcIiBzdHlsZT1cImRpc3BsYXk6bm9uZVwiPicrXG4gICAgICAgICc8dWwgY2xhc3M9XCJuYXYgbmF2LXRhYnNcIj4nK1xuICAgICAgICAgICc8bGkgY2xhc3M9XCJhY3RpdmVcIj48YSBocmVmPVwiI3RyZWUxXCIgZGF0YS10b2dnbGU9XCJ0YWJcIj5UcmVlIDE8L2E+PC9saT4nK1xuICAgICAgICAgICAgJzxsaT48YSBocmVmPVwiI3RyZWUyXCIgZGF0YS10b2dnbGU9XCJ0YWJcIj5UcmVlIDI8L2E+PC9saT4nK1xuICAgICAgICAnPC91bD4nK1xuICAgICAgICAnPGRpdiBjbGFzcz1cInRhYi1jb250ZW50XCI+JytcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwidGFiLXBhbmUgYWN0aXZlXCIgaWQ9XCJ0cmVlMVwiPicrXG4gICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwid2VsbFwiIHN0eWxlPVwidGV4dC1hbGlnbjpjZW50ZXI7bWFyZ2luLXRvcDoxMHB4XCI+JytcbiAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImJ0bi1ncm91cFwiPicrXG4gICAgICAgICAgICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGFjdGl2ZVwiPkN1c3RvbTwvYnV0dG9uPicrXG4gICAgICAgICAgICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCI+U2VsZWN0IFRyZWU8L2J1dHRvbj4nK1xuICAgICAgICAgICAgICAnPC9kaXY+JytcbiAgICAgICAgICAgICAgJzwvZGl2PicrXG4gICAgICAgICAgICAgIF9nZW5lcmF0ZUlucHV0cygwLCBtb2RlbCwgJ3QxJywgbW9kZWwsIGlucHV0c1ttb2RlbF0pK1xuICAgICAgICAgICAgJzwvZGl2PicrXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cInRhYi1wYW5lIGFjdGl2ZVwiIGlkPVwidHJlZTJcIj4nK1xuICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cIndlbGxcIiBzdHlsZT1cInRleHQtYWxpZ246Y2VudGVyO21hcmdpbi10b3A6MTBweFwiID4nK1xuICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiYnRuLWdyb3VwXCI+JytcbiAgICAgICAgICAgICAgICAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgYWN0aXZlXCI+Q3VzdG9tPC9idXR0b24+JytcbiAgICAgICAgICAgICAgICAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIj5TZWxlY3QgVHJlZTwvYnV0dG9uPicrXG4gICAgICAgICAgICAgICc8L2Rpdj4nK1xuICAgICAgICAgICAgICAnPC9kaXY+JytcbiAgICAgICAgICAgICAgX2dlbmVyYXRlSW5wdXRzKDAsIG1vZGVsLCAndDInLCBtb2RlbCwgaW5wdXRzW21vZGVsXSkrXG4gICAgICAgICAgICAnPC9kaXY+JytcbiAgICAgICAgICAnPC9kaXY+JytcbiAgICAgICAgICc8L2Rpdj4nO1xuXG4gIHJldHVybiBjb250ZW50O1xufVxuXG5cbnJldHVybiB7XG4gIGNyZWF0ZSA6IGNyZWF0ZSxcbiAgdXBkYXRlQXZlcmFnZUNoYXJ0OiB1cGRhdGVBdmVyYWdlQ2hhcnRcbn07XG5cbn07XG4iLCJ2YXIgY29uZmlnID0gcmVxdWlyZSgnLi9jb25maWcnKTtcbnZhciBhcHAgPSByZXF1aXJlKCcuL2FwcCcpO1xuXG4vLyBTcGVjaWFsIFNhdWNlLi4uXG4vLyBiYXNpY2FsbHkgdGhlIGNvZGUgbG9hZGVkIGZyb20gR2l0SHViIGV4cGVjdHMgdGhlIGZvbGxvd2luZyB0byBleGlzdHMgaW4gdGhlIHdpbmRvdyBzY29wZVxuLy8gICBtM1BHSU9cbi8vICAgICAtIHJlYWRBbGxDb250YW50c1xuLy8gICAgIC0gcmVhZFdlYXRoZXJcbi8vICAgICAtIGR1bXBcbi8vICAgICAtIHJlYWRGcm9tSW5wdXRzXG4vLyBTbyB3ZSBpbmplY3QgZnVuY3Rpb25zIHRoYXQgaW50ZXJhY3Qgdy8gb3VyIFVJLCBtb2RlbCBpbiBubyB3YXkgY2FyZXNcbm1vZHVsZS5leHBvcnRzID0ge1xuICByZWFkIDogZnVuY3Rpb24obW9kZWwpIHtcbiAgICB0aGlzLm1vZGVsID0gbW9kZWw7XG5cbiAgICBtb2RlbC5kZWJ1ZyA9IHRydWU7XG5cbiAgICBpZiggIW1vZGVsLnBsYW50YXRpb24gKSBtb2RlbC5wbGFudGF0aW9uID0ge307XG4gICAgdGhpcy5yZWFkQWxsQ29uc3RhbnRzKG1vZGVsLnBsYW50YXRpb24pO1xuXG4gICAgaWYoICFtb2RlbC53ZWF0aGVyICkgbW9kZWwud2VhdGhlciA9IHt9O1xuICAgIGlmKCAhbW9kZWwubWFuYWdlICkgbW9kZWwubWFuYWdlID0ge307XG4gICAgaWYoICFtb2RlbC5jdXN0b21fd2VhdGhlciApIG1vZGVsLmN1c3RvbV93ZWF0aGVyID0ge307XG5cbiAgICB0aGlzLnJlYWRXZWF0aGVyKG1vZGVsLndlYXRoZXIsIG1vZGVsLm1hbmFnZSwgbW9kZWwuY3VzdG9tX3dlYXRoZXIpO1xuXG4gICAgZGVsZXRlIHRoaXMubW9kZWwubWFuYWdlLmNvcHBpY2VEYXRlcztcbiAgfSxcbiAgcmVhZEFsbENvbnN0YW50cyA6IGZ1bmN0aW9uKHBsYW50YXRpb24pIHtcbiAgICAgIHRoaXMucmVhZEZyb21JbnB1dHMoKTtcblxuICAgICAgLy9mb3IgKCB2YXIga2V5IGluIHRoaXMubW9kZWwucGxhbnRhdGlvbikge1xuICAgICAgLy8gICAgcGxhbnRhdGlvbltrZXldID0gdGhpcy5tb2RlbC5wbGFudGF0aW9uW2tleV07XG4gICAgICAvL31cblxuICAgICAgcGxhbnRhdGlvbi5jb3BwaWNlZFRyZWUgPSB0aGlzLm1vZGVsLnRyZWU7XG5cbiAgICAgIC8vIHNldHVwIHNlZWRsaW5nIFRyZWVcbiAgICAgIC8vIFRPRE86IGhhcmRjb2RlZCBmb3Igbm93LCB0aGlzIHNob3VsZG4ndCBiZVxuICAgICAgcGxhbnRhdGlvbi5zZWVkbGluZ1RyZWUgPSAkLmV4dGVuZCh0cnVlLCB7fSwgdGhpcy5tb2RlbC50cmVlKTtcbiAgICAgIHBsYW50YXRpb24uc2VlZGxpbmdUcmVlLnN0ZW1zUGVyU3R1bXAgPSAxO1xuICAgICAgcGxhbnRhdGlvbi5zZWVkbGluZ1RyZWUucGZzLnN0ZW1DbnQgPSAxO1xuICAgICAgcGxhbnRhdGlvbi5zZWVkbGluZ1RyZWUucm9vdFAgPSB7XG4gICAgICAgICAgTEFJVGFyZ2V0IDogMTAsXG4gICAgICAgICAgZWZmaWNpZW5jeSA6IDAuNixcbiAgICAgICAgICBmcmFjIDogMC4wMVxuICAgICAgfTtcbiAgfSxcblxuICByZWFkV2VhdGhlciA6IGZ1bmN0aW9uKHdlYXRoZXJNYXAsIG1hbmFnZSwgY3VzdG9tV2VhdGhlck1hcCkge1xuICAgICAgdmFyIGRhdGVQbGFudGVkID0gJChcIiNpbnB1dC1tYW5hZ2UtZGF0ZVBsYW50ZWRcIikudmFsKCk7XG4gICAgICBpZiAoZGF0ZVBsYW50ZWQgJiYgZGF0ZVBsYW50ZWQgIT0gXCJcIikge1xuICAgICAgICAgIG1hbmFnZS5kYXRlUGxhbnRlZCA9IG5ldyBEYXRlKCQoXCIjaW5wdXQtbWFuYWdlLWRhdGVQbGFudGVkXCIpLnZhbCgpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbWFuYWdlLmRhdGVQbGFudGVkID0gbmV3IERhdGUoKTtcbiAgICAgIH1cblxuICAgICAgdmFyIGRhdGVDb3BwaWNlZCA9ICQoXCIjaW5wdXQtbWFuYWdlLWRhdGVDb3BwaWNlZFwiKS52YWwoKTtcbiAgICAgIGlmIChkYXRlQ29wcGljZWQgJiYgZGF0ZUNvcHBpY2VkICE9IFwiXCIpIHtcbiAgICAgICAgICBtYW5hZ2UuZGF0ZUNvcHBpY2VkID0gbmV3IERhdGUoJChcIiNpbnB1dC1tYW5hZ2UtZGF0ZUNvcHBpY2VkXCIpLnZhbCgpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICAvLyBzZXQgZXJyb3IgY29uZGl0aW9uIDogVE9ET1xuICAgICAgfVxuXG4gICAgICB2YXIgRGF0ZUZpbmFsSGFydmVzdCA9ICQoXCIjaW5wdXQtbWFuYWdlLWRhdGVGaW5hbEhhcnZlc3RcIikudmFsKCk7XG4gICAgICBpZiAoRGF0ZUZpbmFsSGFydmVzdCAmJiBEYXRlRmluYWxIYXJ2ZXN0ICE9IFwiXCIpIHtcbiAgICAgICAgICBtYW5hZ2UuRGF0ZUZpbmFsSGFydmVzdCA9IG5ldyBEYXRlKCQoXCIjaW5wdXQtbWFuYWdlLWRhdGVGaW5hbEhhcnZlc3RcIikudmFsKCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgIC8vIHNldCBlcnJvciBjb25kaXRpb24gOiBUT0RPXG4gICAgICB9XG5cbiAgICAgIHZhciB5ZWFyc1BlckNvcHBpY2UgPSAkKFwiI2lucHV0LW1hbmFnZS1jb3BwaWNlSW50ZXJ2YWxcIikudmFsKCk7XG4gICAgICBpZiAoeWVhcnNQZXJDb3BwaWNlICYmIHllYXJzUGVyQ29wcGljZSAhPSBcIlwiKSB7XG4gICAgICAgICAgbWFuYWdlLnllYXJzUGVyQ29wcGljZSA9IHBhcnNlSW50KCQoXCIjaW5wdXQtbWFuYWdlLWNvcHBpY2VJbnRlcnZhbFwiKS52YWwoKSk7XG4gICAgICB9XG5cblxuICAgICAgZm9yICggdmFyIGkgPSAwOyBpIDwgMTI7IGkrKykge1xuICAgICAgICAgIHZhciBpdGVtID0ge1xuICAgICAgICAgICAgICBtb250aCA6IChpICsgMSlcbiAgICAgICAgICB9O1xuICAgICAgICAgIHZhciBtID0gKGkrMSkrJyc7XG4gICAgICAgICAgaWYoIG0ubGVuZ3RoID09PSAxICkgbSA9ICcwJyttO1xuXG4gICAgICAgICAgZm9yICggdmFyIGogPSAxOyBqIDwgY29uZmlnLmlucHV0cy53ZWF0aGVyLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgIHZhciBjID0gY29uZmlnLmlucHV0cy53ZWF0aGVyW2pdO1xuICAgICAgICAgICAgICBpdGVtW2NdID0gdGhpcy5fcmVhZFZhbCgkKFwiI2lucHV0LXdlYXRoZXItXCIgKyBjICsgXCItXCIgKyBtKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGl0ZW0ubnJlbCA9IGl0ZW0ucmFkIC8gMC4wMDM2O1xuXG4gICAgICAgICAgd2VhdGhlck1hcFttXSA9IGl0ZW07XG4gICAgICB9XG5cbiAgICAgIGlmKCB0aGlzLm1vZGVsLmN1c3RvbV93ZWF0aGVyICkge1xuICAgICAgICAgIGZvciggdmFyIGRhdGUgaW4gdGhpcy5tb2RlbC5jdXN0b21fd2VhdGhlciApIHtcbiAgICAgICAgICAgICAgdGhpcy5tb2RlbC5jdXN0b21fd2VhdGhlcltkYXRlXS5ucmVsID0gdGhpcy5tb2RlbC5jdXN0b21fd2VhdGhlcltkYXRlXS5yYWQgLyAwLjAwMzY7XG4gICAgICAgICAgICAgIC8vY3VzdG9tV2VhdGhlck1hcFtkYXRlXSA9IGN1c3RvbV93ZWF0aGVyW2RhdGVdO1xuICAgICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB3ZWF0aGVyTWFwO1xuICB9LFxuXG4gIC8vIHJlYWQgYSB2YWx1ZSBmcm9tIHRoZSBpbnB1dFxuICAvLyBpdCBoYXMgYSAnLCcgaXMgc2V0IGZvciB2YXJpYXRpb25cbiAgX3JlYWRWYWwgOiBmdW5jdGlvbihlbGUpIHtcbiAgICAgIHZhciB2YWwgPSBlbGUudmFsKCk7XG4gICAgICBpZiggdmFsLm1hdGNoKC9cXGQqLVxcZCotXFxkKiQvKSApIHtcbiAgICAgICAgICByZXR1cm4gdmFsO1xuICAgICAgfSBlbHNlIGlmKCB2YWwubWF0Y2goLy4qLC4qLykgKSB7XG4gICAgICAgICAgdmFsID0gdmFsLnJlcGxhY2UoL1xccy9nLCcnKS5zcGxpdChcIixcIik7XG4gICAgICAgICAgdmFyIGlkID0gZWxlLmF0dHIoXCJpZFwiKS5yZXBsYWNlKC9eaW5wdXQtLywnJykucmVwbGFjZSgvLS9nLCcuJyk7XG4gICAgICAgICAgdGhpcy5tb2RlbC52YXJpYXRpb25zW2lkXSA9IFtdO1xuICAgICAgICAgIGZvciggdmFyIGkgPSAwOyBpIDwgdmFsLmxlbmd0aDsgaSsrICkge1xuICAgICAgICAgICAgICB0aGlzLm1vZGVsLnZhcmlhdGlvbnNbaWRdLnB1c2gocGFyc2VGbG9hdCh2YWxbaV0pKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRoaXMubW9kZWwudmFyaWF0aW9uc1tpZF1bMF07XG4gICAgICB9XG4gICAgICByZXR1cm4gcGFyc2VGbG9hdCh2YWwpO1xuICB9LFxuXG4gIGR1bXAgOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgLy8gc2hvdWxkIGJlIG92ZXJ3cml0dGVuIGluIGFwcFxuICB9LFxuXG4gIHJlYWRGcm9tSW5wdXRzIDogZnVuY3Rpb24oKSB7XG4gICAgICAvLyByZWFkIHNvaWxcbiAgICAgIHRoaXMubW9kZWwuc29pbCA9IHt9O1xuICAgICAgdGhpcy5tb2RlbC5zb2lsLm1heEFXUyA9IHRoaXMuX3JlYWRWYWwoJChcIiNpbnB1dC1zb2lsLW1heEFXU1wiKSk7XG4gICAgICB0aGlzLm1vZGVsLnNvaWwuc3dwb3dlciA9IHRoaXMuX3JlYWRWYWwoJChcIiNpbnB1dC1zb2lsLXN3cG93ZXJcIikpO1xuICAgICAgdGhpcy5tb2RlbC5zb2lsLnN3Y29uc3QgPSB0aGlzLl9yZWFkVmFsKCQoXCIjaW5wdXQtc29pbC1zd2NvbnN0XCIpKTtcblxuICAgICAgdGhpcy5tb2RlbC5zZXR1cCA9IHtcbiAgICAgICAgZGF5c19pbl9pbnRlcnZhbCA6IHRoaXMuX3JlYWRWYWwoJChcIiNpbnB1dC1zZXR1cC1kYXlzX2luX2ludGVydmFsXCIpKVxuICAgICAgfTtcblxuICAgICAgLy8gcmVhZCBtYW5hZ2VcbiAgICAgIHRoaXMubW9kZWwubWFuYWdlID0ge1xuICAgICAgICAgIGNvcHBpY2UgOiBmYWxzZVxuICAgICAgfTtcbiAgICAgIHZhciBlbGVzID0gJChcIi5tYW5hZ2VcIik7XG4gICAgICBmb3IgKCB2YXIgaSA9IDA7IGkgPCBlbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdmFyIGVsZSA9ICQoZWxlc1tpXSk7XG4gICAgICAgICAgdGhpcy5tb2RlbC5tYW5hZ2VbZWxlLmF0dHIoXCJpZFwiKS5yZXBsYWNlKFwiaW5wdXQtbWFuYWdlLVwiLCBcIlwiKV0gPSB0aGlzLl9yZWFkVmFsKGVsZSk7XG4gICAgICB9XG5cbiAgICAgIC8vIHJlYWQgcGxhbnRhdGlvblxuICAgICAgaWYoICF0aGlzLm1vZGVsLnBsYW50YXRpb24gKSB0aGlzLm1vZGVsLnBsYW50YXRpb24gPSB7fTtcbiAgICAgIGVsZXMgPSAkKFwiLnBsYW50YXRpb25cIik7XG4gICAgICBmb3IgKCB2YXIgaSA9IDA7IGkgPCBlbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdmFyIGVsZSA9ICQoZWxlc1tpXSk7XG4gICAgICAgICAgdGhpcy5tb2RlbC5wbGFudGF0aW9uW2VsZS5hdHRyKFwiaWRcIikucmVwbGFjZShcImlucHV0LXBsYW50YXRpb24tXCIsIFwiXCIpXSA9IHRoaXMuX3JlYWRWYWwoZWxlKTtcbiAgICAgIH1cblxuICAgICAgLy8gcmVhZCB0cmVlXG4gICAgICB2YXIgdHJlZUlucHV0cyA9ICQoXCIudHJlZVwiKTtcbiAgICAgIHRoaXMubW9kZWwudHJlZSA9IHt9O1xuICAgICAgZm9yICggdmFyIGkgPSAwOyBpIDwgdHJlZUlucHV0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHZhciBlbGUgPSAkKHRyZWVJbnB1dHNbaV0pO1xuXG4gICAgICAgICAgdmFyIHBhcnRzID0gZWxlLmF0dHIoXCJpZFwiKS5yZXBsYWNlKFwiaW5wdXQtdHJlZS1cIiwgXCJcIikuc3BsaXQoXCItXCIpO1xuICAgICAgICAgIGlmIChwYXJ0cy5sZW5ndGggPT0gMSkge1xuICAgICAgICAgICAgICB0aGlzLm1vZGVsLnRyZWVbcGFydHNbMF1dID0gdGhpcy5fcmVhZFZhbChlbGUpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGlmICghdGhpcy5tb2RlbC50cmVlW3BhcnRzWzBdXSlcbiAgICAgICAgICAgICAgICAgIHRoaXMubW9kZWwudHJlZVtwYXJ0c1swXV0gPSB7fTtcbiAgICAgICAgICAgICAgdGhpcy5tb2RlbC50cmVlW3BhcnRzWzBdXVtwYXJ0c1sxXV0gPSB0aGlzLl9yZWFkVmFsKGVsZSk7XG4gICAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyByZWFkIHBsYW50YXRpb24gc3RhdGVcbiAgICAgIGlmKCAhdGhpcy5tb2RlbC5wbGFudGF0aW9uX3N0YXRlICkgdGhpcy5tb2RlbC5wbGFudGF0aW9uX3N0YXRlID0ge307XG4gICAgICBmb3IgKCB2YXIga2V5IGluIHRoaXMubW9kZWwuZ2V0RGF0YU1vZGVsKCkucGxhbnRhdGlvbl9zdGF0ZS52YWx1ZSApIHtcbiAgICAgICAgICB0aGlzLm1vZGVsLnBsYW50YXRpb25fc3RhdGVba2V5XSA9IC0xO1xuICAgICAgfVxuXG4gIH0sXG5cbiAgLy8gdGhpcyBpcyB0aGUgc25hcHNob3Qgd2Ugc2F2ZSB0byBnb29nbGUgZHJpdmVcbiAgZXhwb3J0U2V0dXAgOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMubW9kZWwudmFyaWF0aW9ucyA9IHt9O1xuICAgICAgdGhpcy5yZWFkRnJvbUlucHV0cygpO1xuICAgICAgdGhpcy5yZWFkV2VhdGhlcihbXSwge30sIHt9KTtcblxuICAgICAgdmFyIGV4ID0ge1xuICAgICAgICAgIHdlYXRoZXIgOiB0aGlzLm1vZGVsLndlYXRoZXIsXG4gICAgICAgICAgY3VzdG9tX3dlYXRoZXIgOiB0aGlzLm1vZGVsLmN1c3RvbV93ZWF0aGVyLFxuICAgICAgICAgIHNldHVwIDogdGhpcy5tb2RlbC5zZXR1cCxcbiAgICAgICAgICB0cmVlIDogdGhpcy5tb2RlbC50cmVlLFxuICAgICAgICAgIHBsYW50YXRpb24gOiB0aGlzLm1vZGVsLnBsYW50YXRpb24sXG4gICAgICAgICAgbWFuYWdlIDogdGhpcy5tb2RlbC5tYW5hZ2UsXG4gICAgICAgICAgc29pbCA6IHRoaXMubW9kZWwuc29pbCxcbiAgICAgICAgICBtYW5hZ2UgOiB0aGlzLm1vZGVsLm1hbmFnZSxcbiAgICAgICAgICBwbGFudGF0aW9uX3N0YXRlIDogdGhpcy5tb2RlbC5wbGFudGF0aW9uX3N0YXRlLFxuICAgICAgICAgIGNvbmZpZyA6IHtcbiAgICAgICAgICAgICAgY2hhcnRUeXBlSW5wdXQgOiAkKFwiI2NoYXJ0VHlwZUlucHV0XCIpLnZhbCgpLFxuICAgICAgICAgICAgICBkYXlzVG9SdW4gOiB0aGlzLmFwcC5kYXlzVG9SdW4oKSxcbiAgICAgICAgICAgICAgY3VycmVudExvY2F0aW9uIDogJChcIiNjdXJyZW50LWxvY2F0aW9uXCIpLmh0bWwoKSxcbiAgICAgICAgICAgICAgbG9hZGVkVHJlZSA6ICQoXCIjbG9hZGVkLXRyZWUtbmFtZVwiKS5odG1sKCksXG4gICAgICAgICAgICAgIHZlcnNpb24gOiB0aGlzLmFwcC5xcyhcInZlcnNpb25cIikgPyB0aGlzLmFwcC5xcyhcInZlcnNpb25cIikgOiBcIm1hc3RlclwiXG4gICAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBieSBkZWZhdWx0IHRoZSByZWFkIGZ1bmN0aW9uIHNldCB0aGUgdmFyaWF0aW9ucyB2YXJpYWJsZXMgYnV0IG9ubHlcbiAgICAgIC8vIHJldHVybnMgdGhlIGZpcnN0LCBzZXQgdGhlIHZhcmlhdGlvbiBwYXJhbXMgdG8gdGhlaXIgY29ycmVjdCB2YWx1ZXNcbiAgICAgIGZvciggdmFyIGtleSBpbiB0aGlzLm1vZGVsLnZhcmlhdGlvbnMgKSB7XG4gICAgICAgICAgdmFyIHBhcnRzID0ga2V5LnNwbGl0KFwiLlwiKTtcbiAgICAgICAgICB2YXIgcGFyYW0gPSBleDtcbiAgICAgICAgICBmb3IoIHZhciBpID0gMDsgaSA8IHBhcnRzLmxlbmd0aC0xOyBpKysgKSB7XG4gICAgICAgICAgICAgIHBhcmFtID0gcGFyYW1bcGFydHNbaV1dO1xuICAgICAgICAgIH1cbiAgICAgICAgICBwYXJhbVtwYXJ0c1twYXJ0cy5sZW5ndGgtMV1dID0gdGhpcy5tb2RlbC52YXJpYXRpb25zW2tleV0uam9pbihcIiwgXCIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZXg7XG4gIH0sXG4gIGxvYWRUcmVlIDogZnVuY3Rpb24odHJlZSkge1xuICAgICAgZm9yICggdmFyIHJvb3RLZXkgaW4gdHJlZSkge1xuICAgICAgICAgIGlmICh0eXBlb2YgdHJlZVtyb290S2V5XSAhPSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAkKFwiI2lucHV0LXRyZWUtXCIgKyByb290S2V5KS52YWwodHJlZVtyb290S2V5XSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZm9yICggdmFyIGNoaWxkS2V5IGluIHRyZWVbcm9vdEtleV0pIHtcbiAgICAgICAgICAgICAgICAgICQoXCIjaW5wdXQtdHJlZS1cIiArIHJvb3RLZXkgKyBcIi1cIiArIGNoaWxkS2V5KS52YWwodHJlZVtyb290S2V5XVtjaGlsZEtleV0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgfVxuICB9LFxuICBsb2FkU2V0dXAgOiBmdW5jdGlvbihmaWxlaWQsIHNldHVwLCBpc1J0KSB7XG5cbiAgICAgIC8vIGxvYWQgY29uZmlnXG4gICAgICBpZiAoc2V0dXAuY29uZmlnLmNoYXJ0VHlwZUlucHV0KSB7XG4gICAgICAgICAgdGhpcy5jaGFydHMudW5zZWxlY3RBbGwoKTtcbiAgICAgICAgICBmb3IgKCB2YXIgaSA9IDA7IGkgPCBzZXR1cC5jb25maWcuY2hhcnRUeXBlSW5wdXQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgdGhpcy5jaGFydHMuc2VsZWN0KHNldHVwLmNvbmZpZy5jaGFydFR5cGVJbnB1dFtpXSk7XG4gICAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHNldHVwLmNvbmZpZy5jdXJyZW50TG9jYXRpb24pIHtcbiAgICAgICAgICAkKFwiI2N1cnJlbnQtbG9jYXRpb25cIikuaHRtbChzZXR1cC5jb25maWcuY3VycmVudExvY2F0aW9uKTtcbiAgICAgIH1cbiAgICAgIGlmKCBzZXR1cC5jb25maWcubG9hZGVkVHJlZSApIHtcbiAgICAgICAgICAkKFwiI2xvYWRlZC10cmVlLW5hbWVcIikuaHRtbChzZXR1cC5jb25maWcubG9hZGVkVHJlZSkucGFyZW50KCkuc2hvdygpO1xuICAgICAgfVxuXG4gICAgICBpZiggc2V0dXAuc2V0dXAgJiYgc2V0dXAuc2V0dXAuZGF5c19pbl9pbnRlcnZhbCApIHtcbiAgICAgICAgJCgnI2lucHV0LXNldHVwLWRheXNfaW5faW50ZXJ2YWwnKS52YWwoc2V0dXAuc2V0dXAuZGF5c19pbl9pbnRlcnZhbCk7XG4gICAgICB9XG5cbiAgICAgIC8vIGxvYWQgd2VhdGhlclxuICAgICAgaWYoIEFycmF5LmlzQXJyYXkoc2V0dXAud2VhdGhlcikgKSB7XG4gICAgICAgIGZvciAoIHZhciBpID0gMDsgaSA8IHNldHVwLndlYXRoZXIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGZvciAoIHZhciBrZXkgaW4gc2V0dXAud2VhdGhlcltpXSkge1xuICAgICAgICAgICAgICAgIGlmIChrZXkgPT0gJ21vbnRoJylcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgaWYgKHNldHVwLndlYXRoZXJbaV1ba2V5XSAhPSBudWxsKVxuICAgICAgICAgICAgICAgICAgICAkKFwiI2lucHV0LXdlYXRoZXItXCIgKyBrZXkgKyBcIi1cIiArIGkpLnZhbChzZXR1cC53ZWF0aGVyW2ldW2tleV0pXG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAkKFwiI2lucHV0LXdlYXRoZXItXCIgKyBrZXkgKyBcIi1cIiArIGkpLnZhbChcIlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGluY0luZGV4ID0gZmFsc2UsIGluZGV4O1xuICAgICAgICBpZiggc2V0dXAud2VhdGhlclswXSAhPT0gdW5kZWZpbmVkIHx8IHNldHVwLndlYXRoZXJbJzAnXSAhPT0gdW5kZWZpbmVkICkge1xuICAgICAgICAgIGluY0luZGV4ID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoIHZhciBpIGluIHNldHVwLndlYXRoZXIgKSB7XG4gICAgICAgICAgICBmb3IgKCB2YXIga2V5IGluIHNldHVwLndlYXRoZXJbaV0pIHtcbiAgICAgICAgICAgICAgICBpZiAoa2V5ID09ICdtb250aCcpIGNvbnRpbnVlO1xuXG5cbiAgICAgICAgICAgICAgICBpZiggaW5jSW5kZXggKSBpbmRleCA9IChwYXJzZUludChpKSsxKSsnJztcbiAgICAgICAgICAgICAgICBlbHNlIGluZGV4ID0gaSsnJztcblxuICAgICAgICAgICAgICAgIGlmKCBpbmRleC5sZW5ndGggPT09IDEgKSBpbmRleCA9ICcwJytpbmRleDtcblxuICAgICAgICAgICAgICAgIGlmIChzZXR1cC53ZWF0aGVyW2ldW2tleV0gIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgJChcIiNpbnB1dC13ZWF0aGVyLVwiICsga2V5ICsgXCItXCIgKyBpbmRleCkudmFsKHNldHVwLndlYXRoZXJbaV1ba2V5XSlcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAkKFwiI2lucHV0LXdlYXRoZXItXCIgKyBrZXkgKyBcIi1cIiArIGluZGV4KS52YWwoXCJcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmKCBzZXR1cC5jdXN0b21fd2VhdGhlciApIHtcbiAgICAgICAgICB0aGlzLm1vZGVsLmN1c3RvbV93ZWF0aGVyID0gc2V0dXAuY3VzdG9tX3dlYXRoZXI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMubW9kZWwuY3VzdG9tX3dlYXRoZXIgPSB7fTtcbiAgICAgIH1cblxuICAgICAgLy8gY3JlYXRlIHRoZSBjaGFydFxuICAgICAgdGhpcy5pbnB1dEZvcm0udXBkYXRlQXZlcmFnZUNoYXJ0KCk7XG5cbiAgICAgIC8vIGxvYWQgdHJlZVxuICAgICAgdGhpcy5sb2FkVHJlZShzZXR1cC50cmVlKTtcblxuICAgICAgLy8gbG9hZCBwbGFudGluZyBwYXJhbXNcbiAgICAgIC8vIE5vdyBwYXJ0IG9mIG1hbmFnZS4uLi5cbiAgICAgIC8vIGZvXG4gICAgICBpZiAoc2V0dXAubWFuYWdlKSB7XG4gICAgICAgICAgdmFyIG1hcCA9IHtcbiAgICAgICAgICAgICAgXCJkYXRlUGxhbnRlZFwiIDogXCJEYXRlUGxhbnRlZFwiLFxuICAgICAgICAgICAgICBcImRhdGVDb3BwaWNlZFwiIDogXCJEYXRlQ29wcGljZWRcIixcbiAgICAgICAgICAgICAgXCJ5ZWFyc1BlckNvcHBpY2VcIiA6IFwiQ29wcGljZUludGVydmFsXCJcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBmb3IgKCB2YXIga2V5IGluIHNldHVwLm1hbmFnZSkge1xuICAgICAgICAgICAgICB2YXIgbmV3S2V5ID0ga2V5O1xuICAgICAgICAgICAgICBpZiggbWFwW2tleV0gKSBuZXdLZXkgPSBtYXBba2V5XTtcblxuICAgICAgICAgICAgICBpZiAodHlwZW9mIHNldHVwLm1hbmFnZVtrZXldID09ICdzdHJpbmcnKVxuICAgICAgICAgICAgICAgICAgJChcIiNpbnB1dC1tYW5hZ2UtXCIgKyBuZXdLZXkpLnZhbChzZXR1cC5tYW5hZ2Vba2V5XS5yZXBsYWNlKC9ULiovLCAnJykpO1xuICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAkKFwiI2lucHV0LW1hbmFnZS1cIiArIG5ld0tleSkudmFsKHNldHVwLm1hbmFnZVtrZXldKTtcbiAgICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIHRoaXMgdmFsdWUgaXMgZGVwcmVjYXRlZCwgc2V0IHRvIG5ldyBpbnB1dFxuICAgICAgaWYoIHNldHVwLmNvbmZpZy5kYXlzVG9SdW4gKSB7XG4gICAgICAgICAgdmFyIGQgPSBuZXcgRGF0ZShzZXR1cC5tYW5hZ2UuZGF0ZVBsYW50ZWQgfHwgc2V0dXAubWFuYWdlLkRhdGVQbGFudGVkKTtcbiAgICAgICAgICBkID0gbmV3IERhdGUobmV3IERhdGUoZCkuc2V0TW9udGgoZC5nZXRNb250aCgpK3BhcnNlSW50KHNldHVwLmNvbmZpZy5kYXlzVG9SdW4pKSk7XG4gICAgICAgICAgJChcIiNpbnB1dC1tYW5hZ2UtZGF0ZUZpbmFsSGFydmVzdFwiKS52YWwoZC50b0lTT1N0cmluZygpLnJlcGxhY2UoL1QuKi8sICcnKSk7XG4gICAgICB9XG5cblxuICAgICAgLy8gbG9hZCByZXN0XG4gICAgICB2YXIgaW5wdXRzID0gWyBcInBsYW50YXRpb25cIiwgXCJzb2lsXCIsIFwibWFuYWdlXCIgXTtcbiAgICAgIGZvciAoIHZhciBpID0gMDsgaSA8IGlucHV0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGZvciAoIHZhciBrZXkgaW4gc2V0dXBbaW5wdXRzW2ldXSkge1xuICAgICAgICAgICAgICBpZiAoa2V5ID09ICdtYXhBV1MnKSB7XG4gICAgICAgICAgICAgICAgICAkKFwiI2lucHV0LXNvaWwtbWF4QVdTXCIpLnZhbChzZXR1cC5zb2lsLm1heEFXUyk7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoIHR5cGVvZiBzZXR1cFtpbnB1dHNbaV1dW2tleV0gPT0gJ3N0cmluZycgJiYgc2V0dXBbaW5wdXRzW2ldXVtrZXldLm1hdGNoKC8uKlQuKlokLykgKSB7XG4gICAgICAgICAgICAgICAgICAkKFwiI2lucHV0LVwiICsgaW5wdXRzW2ldICsgXCItXCIgKyBrZXkpLnZhbChzZXR1cFtpbnB1dHNbaV1dW2tleV0ucmVwbGFjZSgvVC4qLywgJycpKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICQoXCIjaW5wdXQtXCIgKyBpbnB1dHNbaV0gKyBcIi1cIiArIGtleSkudmFsKHNldHVwW2lucHV0c1tpXV1ba2V5XSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLmFwcC5ydW5Nb2RlbChpc1J0KTtcbiAgfVxufTtcbiIsIlxuICAvLyBtdXN0IGluc3RhbGwgdGhpcyBmb3IgbmF0aXZlIHBob25lZ2FwIHN1cHBvcnQ6XG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9waG9uZWdhcC1idWlsZC9DaGlsZEJyb3dzZXJcblxudmFyIHdpbiA9IG51bGw7XG5cbi8qIHRoZSBrZXkgZm9yIHJlZnJlc2ggVG9rZW4gaW4gbG9jYWwgU3RvcmFnZSAqL1xudmFyIHRva2VuS2V5ID0gJ3JlZnJlc2hfdG9rZW4nO1xuXG4vKiBzdG9yZXMgdGhlIGFjY2Vzc1Rva2VuIGFmdGVyIHJldHJpZXZhbCBmcm9tIGdvb2dsZSBzZXJ2ZXIgKi9cbnZhciBhY2Nlc3NUb2tlbiA9IG51bGw7XG5cbi8qIHN0b3JlcyB0aGUgVGltZSB3aGVuIGFjY2VzcyB0b2tlbiB3YXMgbGFzdCByZWNlaXZlZCBmcm9tIHNlcnZlciAqL1xudmFyIGFjY2Vzc1Rva2VuVGltZSA9IG51bGw7XG5cbi8qIHN0b3JlcyBhY2Nlc3MgVG9rZW4ncyBFeHBpcnkgTGltaXQuIFVzZXMgNTggbWluLiBpbnN0ZWFkIG9mIDYwIG1pbi4gKi9cbnZhciBhY2Nlc3NUb2tlbkV4cGlyeUxpbWl0ID0gNTggKiA2MCAqIDEwMDA7XG5cbi8qIEEgdGVtcG9yYXJ5IHZhcmlhYmxlIHN0b3JpbmcgY2FsbGJhY2sgZnVuY3Rpb24gKi9cbnZhciBjYWxsYmFja0Z1bmMgPSBmYWxzZTtcblxuLy8gYXJlIHdlIHJ1bm5pbmcgbmF0aXZlIG9yIGJyb3dzZXIgbW9kZT9cbnZhciBpc05hdGl2ZSA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmLm1hdGNoKC9eZmlsZS4qLykgPyB0cnVlIDogZmFsc2U7XG5cbnZhciBDTElFTlRfSUQgPSBpc05hdGl2ZSA/XG4gICAgICAgIFwiMzQ0MTkwNzEzNDY1LWRpaW10ZmVyaDR0amIwMzE2OWJrbDlta29xdnEycnU5LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tXCIgOlxuICAgICAgICAgXCIzNDQxOTA3MTM0NjUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb21cIjtcblxudmFyIEFQUF9JRCA9IFwiMzQ0MTkwNzEzNDY1XCI7XG5cbnZhciBPQVVUSF9TQ09QRVMgPSAnaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vYXV0aC9kcml2ZS5maWxlICdcbiAgKyAnaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vYXV0aC9kcml2ZS5pbnN0YWxsICdcbiAgKyAnaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vYXV0aC91c2VyaW5mby5wcm9maWxlJztcblxuLyogY29uZmlnIHZhbHVlcyBmb3IgR29vZ2xlIEFQSSAoZ2FwaSkgKi9cbnZhciBnYXBpQ29uZmlnID0ge1xuICBlbmRwb2ludDogXCJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20vby9vYXV0aDIvYXV0aFwiLFxuICBlbmR0b2tlbjogXCJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20vby9vYXV0aDIvdG9rZW5cIiwgLy8gdG9rZW4gZW5kcG9pbnRcbiAgcmVkaXJlY3RfdXJpIDogXCJodHRwOi8vbG9jYWxob3N0XCIsXG4gIGNsaWVudF9zZWNyZXQgOiAnNnJPUTlsMGZ5bmgxMzdNUlhHSy1HX1pnJyxcbiAgcmVzcG9uc2VfdHlwZSA6IFwiY29kZVwiLFxuICBjbGllbnRfaWQgOiBDTElFTlRfSUQsXG4gIHN0YXRlIDogXCJnZHJpdmVpbml0XCIsXG4gIGFjY2Vzc190eXBlIDogXCJvZmZsaW5lXCIsXG4gIHNjb3BlIDogT0FVVEhfU0NPUEVTLFxuXG4gIC8qIEFzIGRlZmluZWQgaW4gdGhlIE9BdXRoIDIuMCBzcGVjaWZpY2F0aW9uLCB0aGlzIGZpZWxkIG11c3QgY29udGFpbiBhIHZhbHVlXG4gICAgICogb2YgXCJhdXRob3JpemF0aW9uX2NvZGVcIiBvciBcInJlZnJlc2hfdG9rZW5cIiAqL1xuICAgIGdyYW50VHlwZXM6IHsgQVVUSE9SSVpFOiBcImF1dGhvcml6YXRpb25fY29kZVwiLCBSRUZSRVNIOiBcInJlZnJlc2hfdG9rZW5cIiB9LFxuIH07XG5cbi8qKlxuICogRW51bSBmb3IgU3RhdHVzIHZhbHVlc1xuICpcbiAqIEBlbnVtIHtudW1iZXJ9XG4gKlxuICogU1VDQ0VTUyAtIFN1Y2Nlc3NmdWxseSBkYXRhIHJlY2VpdmVkIGZyb20gc2VydmVyXG4gKiBFUlJPUiAtIEVycm9yIG9jY3VycmVkIHdoZW4gdHJ5aW5nIHRvIHJlY2VpdmUgZnJvbSBzZXJ2ZXJcbiAqIE5PVF9ERVRFUk1JTkVEIC0gdW5kZXRlcm1pbmVkXG4gKi9cbnZhciBzdGF0dXMgPSB7XG4gICAgICAgIFNVQ0VTUzogMSxcbiAgICAgICAgRVJST1I6IC0xLFxuICAgICAgICBOT1RfREVURVJNSU5FRDogMFxufVxuXG5yZXF1ZXN0U3RhdHVzID0gMDtcblxuLyogc3RvcmVzIHRoZSBhdXRob3JpemF0aW9uIENvZGUgaW50ZXJuYWxseSAqL1xuYXV0aENvZGUgPSBmYWxzZTtcblxuLyogc3RvcmVzIHRoZSBlcnJvciBtZXNzYWdlIHdoZW4gYW4gZXJyb3IgaGFwcGVucyBmcm9tIGdvb2dsZSBzZXJ2ZXIgKi9cbmVycm9yTWVzc2FnZSA9IGZhbHNlO1xuXG52YXIgbG9nID0gZnVuY3Rpb24obXNnKSB7XG4gIGNvbnNvbGUubG9nKFwiKioqT0FVVEgqKio6IFwiK21zZyk7XG59XG5cbi8qKlxuICogQXR0ZW1wdHMgdG8gYXV0aG9yaXplIHVzZXIgdXNpbmcgT0F1dGhcbiAqIE9wZW5zIHVwIEFub3RoZXIgd2luZG93IHdoZXJlIHVzZXIgYWxsb3dzIGFjY2VzcyBvciBkZW5pZXMgaXQuXG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbEJhY2sgICBBIGNhbGxiYWNrIGZ1bmN0aW9uIHdoaWNoIGlzIGludm9rZWRcbiAqL1xudmFyIGF1dGhvcml6ZSA9IGZ1bmN0aW9uKGNhbGxCYWNrKSB7XG4gIGxvZyhcImF0dGVtcHRpbmcgdG8gYXV0aG9yaXplXCIpO1xuXG4gICAgdmFyIGF1dGhVcmkgPSBnYXBpQ29uZmlnLmVuZHBvaW50ICsgJz8nXG4gICAgKyAnc2NvcGU9JyArIGVuY29kZVVSSUNvbXBvbmVudChnYXBpQ29uZmlnLnNjb3BlKVxuICAgICsgJyYnICsgJ3JlZGlyZWN0X3VyaT0nICsgZW5jb2RlVVJJQ29tcG9uZW50KGdhcGlDb25maWcucmVkaXJlY3RfdXJpKVxuICAgICsgJyYnICsgJ3Jlc3BvbnNlX3R5cGU9JyArIGVuY29kZVVSSUNvbXBvbmVudChnYXBpQ29uZmlnLnJlc3BvbnNlX3R5cGUpXG4gICAgKyAnJicgKyAnY2xpZW50X2lkPScgKyBlbmNvZGVVUklDb21wb25lbnQoZ2FwaUNvbmZpZy5jbGllbnRfaWQpO1xuICAgIC8vKyAnJicgKyAnc3RhdGU9JyArIGVuY29kZVVSSUNvbXBvbmVudChnYXBpQ29uZmlnLnN0YXRlKVxuICAgIC8vKyAnJicgKyAnYWNjZXNzX3R5cGU9JyArIGVuY29kZVVSSUNvbXBvbmVudChnYXBpQ29uZmlnLmFjY2Vzc190eXBlKVxuICAgIC8vKyAnJicgKyAnYXBwcm92YWxfcHJvbXB0PWZvcmNlJzsgLy8gQFRPRE8gLSBjaGVjayBpZiB3ZSByZWFsbHkgbmVlZCB0aGlzIHBhcmFtXG5cbiAgICBjYWxsYmFja0Z1bmMgPSBjYWxsQmFjaztcbiAgICByZXF1ZXN0U3RhdHVzID0gc3RhdHVzLk5PVF9ERVRFUk1JTkVEO1xuXG5cblxuXG4gICAgbG9nKFwib3BlbmluZyBJbkFwcEJyb3dzZXJcIik7XG5cbiAgICB0cnkge1xuXG4gICAgICAvLyBOb3cgb3BlbiBuZXcgYnJvd3NlclxuICAgICAgd2luID0gd2luZG93Lm9wZW4oYXV0aFVyaSwgJ19ibGFuaycsICdsb2NhdGlvbj1ubyx0b29sYmFyPW5vJyk7XG5cbiAgICAgICQod2luKS5vbignbG9hZHN0YXJ0JyxmdW5jdGlvbihlKXtcbiAgICAgICAgbG9nKFwiSW5BcHBCcm93c2VyIGxvYWRzdGFydFwiKTtcbiAgICAgICAgY29uc29sZS5sb2coZS5vcmlnaW5hbEV2ZW50LnVybCk7XG4gICAgICAgIG9uQXV0aFVybENoYW5nZShlLm9yaWdpbmFsRXZlbnQudXJsKTtcbiAgICAgIH0pO1xuXG4gICAgICAvL3dpbmRvdy5wbHVnaW5zLmNoaWxkQnJvd3Nlci5zaG93V2ViUGFnZShhdXRoVXJpLCB7c2hvd0xvY2F0aW9uQmFyIDogdHJ1ZX0pO1xuICAgICAgLy93aW5kb3cucGx1Z2lucy5jaGlsZEJyb3dzZXIub25DbG9zZSA9IG9uQXV0aENsb3NlO1xuICAgICAgLy93aW5kb3cucGx1Z2lucy5jaGlsZEJyb3dzZXIub25Mb2NhdGlvbkNoYW5nZSA9IG9uQXV0aFVybENoYW5nZTtcbiAgICB9IGNhdGNoKGUpIHtcbiAgICAgIGxvZyhcIkVycm9yIG9wZW5pbmcgSW5BcHBCcm93c2VyXCIpO1xuICAgICAgbG9nKGUpO1xuICAgIH1cblxufTtcblxuaWYoICFpc05hdGl2ZSApIHtcbiAgYXV0aG9yaXplID0gZnVuY3Rpb24oY2FsbGJhY2ssIGltbWVkaWF0ZSkge1xuICBnYXBpLmF1dGguYXV0aG9yaXplKHtcbiAgICBjbGllbnRfaWQgOiBDTElFTlRfSUQsXG4gICAgc2NvcGUgOiBPQVVUSF9TQ09QRVMsXG4gICAgaW1tZWRpYXRlIDogaW1tZWRpYXRlXG4gIH0sIGZ1bmN0aW9uKCkge1xuICAgIGF1dGhDb2RlID0gZ2FwaS5hdXRoLmdldFRva2VuKCk7XG4gICAgY2FsbGJhY2soYXV0aENvZGUpO1xuICB9KTtcblxuICB9XG59XG5cbi8qIEF1dGggV2luZG93IGNsb3NlZCAqL1xudmFyIG9uQXV0aENsb3NlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJBdXRoIHdpbmRvdyBjbG9zZWRcIik7XG59O1xuXG4vKiBPQXV0aCBTdWNjZXNzZnVsbHkgZG9uZSAqL1xudmFyIG9uQXV0aFN1Y2Nlc3MgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgLy9jb25zb2xlLmxvZygnQXV0aCBTdWNjZXNzPycpO1xufTtcblxuLyoqXG4gKiBHZXRzIEludm9rZWQgd2hlbiB0aGUgVVJMIGNoYW5nZXMgb24gT0F1dGggYXV0aG9yaXphdGlvbiBwcm9jZXNzXG4gKlxuICogU3VjY2VzcyBVUkwgUGF0dGVybjpcbiAqIFwicmVkaXJlY3RfdXJpXCIgKyBcIj9jb2RlPVwiIFtzZWNyZXQgY29kZSB2YWxdXG4gKlxuICogU3VjY2VzcyBTYW1wbGUgVVJMOlxuICogaHR0cDovL2xvY2FsaG9zdC8/Y29kZT00L1dPcFJMUWZ2dmhIRTB0dU1VRERxbm43NmxDVFQuOG5YQzRJZWJNRUFVdUpKVm5MNDlDYzhBUUdyOGNRSVxuICpcbiAqIERlbmllZCBBY2Nlc3MgVVJMIFBhdHRlcm46IFwicmVkaXJlY3RfdXJpXCIgKyA/ZXJyb3I9YWNjZXNzX2RlbmllZFxuICogRGVuaWVkIEFjY2VzcyBTYW1wbGU6IGh0dHA6Ly9sb2NhbGhvc3QvP2Vycm9yPWFjY2Vzc19kZW5pZWRcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJpTG9jYXRpb24gVGhlIFVSSSBMb2NhdGlvblxuICovXG52YXIgb25BdXRoVXJsQ2hhbmdlID0gZnVuY3Rpb24odXJpTG9jYXRpb24pIHtcbiAgICBjb25zb2xlLmxvZyhcIkluQXBwQnJvd3NlciB1cmwgY2hhbmdlZCBcIit1cmlMb2NhdGlvbik7XG4gICAgaWYodXJpTG9jYXRpb24uaW5kZXhPZihcImNvZGU9XCIpICE9IC0xKSB7XG4gICAgICAgIHJlcXVlc3RTdGF0dXMgPSBzdGF0dXMuU1VDQ0VTUztcblxuICAgICAgICAvKiBTdG9yZSB0aGUgYXV0aENvZGUgdGVtcG9yYXJpbHkgKi9cbiAgICAgICAgYXV0aENvZGUgPSBnZXRQYXJhbWV0ZXJCeU5hbWUoXCJjb2RlXCIsIHVyaUxvY2F0aW9uKTtcbiAgICAgICAgbG9nKFwiRm91bmQgYXV0aCBjb2RlOiBcIithdXRoQ29kZSk7XG5cbiAgICAgICAgZ2V0UmVmcmVzaFRva2VuKGNhbGxiYWNrRnVuYyk7XG5cbiAgICAgICAgLy8gY2xvc2UgdGhlIGNoaWxkQnJvd3NlclxuICAgICAgICB3aW4uY2xvc2UoKTtcbiAgICB9IGVsc2UgaWYodXJpTG9jYXRpb24uaW5kZXhPZihcImVycm9yPVwiKSAhPSAtMSkgIHtcbiAgICAgICAgcmVxdWVzdFN0YXR1cyA9IHN0YXR1cy5FUlJPUjtcbiAgICAgICAgZXJyb3JNZXNzYWdlID0gZ2V0UGFyYW1ldGVyQnlOYW1lKFwiZXJyb3JcIiwgdXJpTG9jYXRpb24pO1xuICAgICAgICBjYWxsYmFja0Z1bmMoKTtcbiAgICAgICAgd2luLmNsb3NlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmVxdWVzdFN0YXR1cyA9IHN0YXR1cy5OT1RfREVURVJNSU5FRDtcbiAgICAgICAgLy9jYWxsYmFja0Z1bmMoKTtcbiAgICB9XG59O1xuXG5cbi8qKlxuKiBHZXRzIHRoZSBSZWZyZXNoIGZyb20gQWNjZXNzIFRva2VuLiBUaGlzIG1ldGhvZCBpcyBvbmx5IGNhbGxlZCBpbnRlcm5hbGx5LFxuKiBhbmQgb25jZSwgb25seSBhZnRlciB3aGVuIGF1dGhvcml6YXRpb24gb2YgQXBwbGljYXRpb24gaGFwcGVucy5cbipcbiogQHBhcmFtIHBhcmFtT2JqIEFuIE9iamVjdCBjb250YWluaW5nIGF1dGhvcml6YXRpb24gY29kZVxuKiBAcGFyYW0gcGFyYW1PYmouYXV0aF9jb2RlIFRoZSBBdXRob3JpemF0aW9uIENvZGUgZm9yIGdldHRpbmcgUmVmcmVzaCBUb2tlblxuKlxuKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBjYWxsYmFjayBmdW5jdGlvbiB3aGljaCBpcyB0byBiZSBpbnZva2VkIGFmdGVyXG4qICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3NmdWwgcmV0cmlldmFsIG9mIGRhdGEgZnJvbSBnb29nbGUncyBzZXJ2ZXJcbipcbiovXG52YXIgZ2V0UmVmcmVzaFRva2VuID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgY29uc29sZS5sb2coXCJhY2Nlc3MgcmVmcmVzaCB0b2tlblwiKTtcbiAgICQuYWpheCh7XG4gICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgdXJsOiBnYXBpQ29uZmlnLmVuZHRva2VuLFxuICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICBjbGllbnRfaWQgICAgOiBnYXBpQ29uZmlnLmNsaWVudF9pZCxcbiAgICAgICAgICAgICAgICAgICBjbGllbnRfc2VjcmV0OiBnYXBpQ29uZmlnLmNsaWVudF9zZWNyZXQsXG4gICAgICAgICAgICAgICAgICAgY29kZSAgICAgICAgIDogYXV0aENvZGUsXG4gICAgICAgICAgICAgICAgICAgcmVkaXJlY3RfdXJpIDogZ2FwaUNvbmZpZy5yZWRpcmVjdF91cmksXG4gICAgICAgICAgICAgICAgICAgZ3JhbnRfdHlwZSAgIDogZ2FwaUNvbmZpZy5ncmFudFR5cGVzLkFVVEhPUklaRVxuICAgICAgICAgICB9XG4gICAgfSlcbiAgICAuZG9uZShmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwic3VjY2VzcyBnZXR0aW5nIHJlZnJlc2ggdG9rZW5cIik7XG5cbiAgICAgICAgLyogdXBvbiBzdWNlc3MsIGRvIGEgY2FsbGJhY2sgd2l0aCB0aGUgZGF0YSByZWNlaXZlZCAqL1xuICAgICAgICAvLyB0ZW1wb3Jhcnkgc3RvcmluZyBhY2Nlc3MgdG9rZW5cbiAgICAgICAgYWNjZXNzVG9rZW4gICAgID0gZGF0YS5hY2Nlc3NfdG9rZW47XG4gICAgICAgIGFjY2Vzc1Rva2VuVGltZSA9IChuZXcgRGF0ZSgpKS5nZXRUaW1lKCk7XG5cbiAgICAgICAgLy8gc2V0IHRoZSB0b2tlbiBmb3IgdGhlIGpzIGFwaVxuICAgICAgICBnYXBpLmF1dGguc2V0VG9rZW4oZGF0YSk7XG5cbiAgICAgICAgLyogc2V0IHRoZSBlcnJvciBvZiBkYXRhIHRvIGZhbHNlLCBhcyBpdCB3YXMgc3VjY2Vzc2Z1bCAqL1xuICAgICAgICBkYXRhLmVycm9yID0gZmFsc2U7XG5cbiAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKHRva2VuS2V5LCBkYXRhLnJlZnJlc2hfdG9rZW4pO1xuXG4gICAgICAgIC8qIG5vdyBpbnZva2UgdGhlIGNhbGxiYWNrICovXG4gICAgICAgIGNhbGxiYWNrKHthY2Nlc3NfdG9rZW46IGFjY2Vzc1Rva2VufSk7XG4gICAgfSlcbiAgICAuZmFpbChmdW5jdGlvbih4aHIsIHRleHRTdGF0dXMpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKHtcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IHhoci5yZXNwb25zZVRleHRcbiAgICAgICAgICAgIH0pO1xuICAgIH0pXG4gICAgLmFsd2F5cyhmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJUb2tlbiByZXF1ZXN0IGNvbXBsZXRlXCIpO1xuICAgIH0pO1xufTtcblxuaWYoICFpc05hdGl2ZSApIHtcbiAgZ2V0UmVmcmVzaFRva2VuID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgZ2FwaS5hdXRoLmF1dGhvcml6ZSh7XG4gICAgY2xpZW50X2lkIDogQ0xJRU5UX0lELFxuICAgIHNjb3BlIDogT0FVVEhfU0NPUEVTLFxuICAgIGltbWVkaWF0ZSA6IHRydWVcbiAgfSwgZnVuY3Rpb24oKSB7XG4gICAgdG9rZW4gPSBnYXBpLmF1dGguZ2V0VG9rZW4oKTtcbiAgICBpZiggY2FsbGJhY2sgKSBjYWxsYmFjayh0b2tlbik7XG4gIH0pO1xuICB9XG59XG5cblxuLyoqXG4qIFRoaXMgbWV0aG9kIHNob3VsZCBPTkxZIGJlIGNhbGxlZCBsb2NhbGx5IGZyb20gd2l0aGluIHRoaXMgY2xhc3MuXG4qIFJldHVybnMgdGhlIFJlZnJlc2ggVG9rZW4gZnJvbSB0aGUgbG9jYWwgZGF0YWJhc2UuXG4qXG4qIEByZXR1cm4ge1N0cmluZ30gVGhlIHJlZnJlc2ggVG9rZW5cbipcbiovXG52YXIgZ2V0VG9rZW4gPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKHRva2VuS2V5KTtcbn07XG5cblxuLyoqXG4qIFRoaXMgbWV0aG9kIGlzIGludm9rZWQgZXh0ZXJuYWxseS4gSXQgcmV0cmlldmVzIHRoZSBBY2Nlc3MgVG9rZW4gYnkgYXQgZmlyc3RcbiogY2hlY2tpbmcgaWYgY3VycmVudCBhY2Nlc3MgdG9rZW4gaGFzIGV4cGlyZWQgb3Igbm90LiBJZiBpdHMgbm90IGV4cGlyZWQsIGl0XG4qIHNpbXBseSByZXR1cm5zIHRoYXQsIG90aGVyd2lzZSwgaXQgZ2V0cyB0aGUgcmVmcmVzaCBUb2tlbiBmcm9tIHRoZSBsb2NhbCBkYXRhYmFzZVxuKiAoYnkgaW52b2tpbmcgZ2V0VG9rZW4pIGFuZCB0aGVuIGNvbm5lY3Rpbmcgd2l0aCBHb29nbGUncyBTZXJ2ZXIgKHVzaW5nIE9BdXRoKVxuKiB0byBnZXQgdGhlIEFjY2VzcyBUb2tlbi5cbipcbiogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgICBBIGNhbGxCYWNrIGZ1bmN0aW9uIHdoaWNoIGlzIHRvIGJlIGludm9rZWQgYWZ0ZXJcbiogICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEgaXMgcmV0cmlldmVkIGZyb20gdGhlIGdvb2dsZSdzIHNlcnZlci4gVGhlIGRhdGFcbiogICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gZ29vZ2xlIHNlcnZlciBpcyBwYXNzZWQgdG8gY2FsbGJhY2sgYXMgYXJncy5cbipcbiovXG52YXIgZ2V0QWNjZXNzVG9rZW4gPSBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgdmFyIGN1cnJlbnRUaW1lID0gKG5ldyBEYXRlKCkpLmdldFRpbWUoKTtcblxuICAgY29uc29sZS5sb2coXCJnZXR0aW5nIGFjY2VzcyB0b2tlblwiKTtcblxuICAgLyogY2hlY2sgaWYgY3VycmVudCBUb2tlbiBoYXMgbm90IGV4cGlyZWQgKHN0aWxsIHZhbGlkKSAqL1xuICAgaWYgKGFjY2Vzc1Rva2VuICYmIGFjY2Vzc1Rva2VuICE9IGZhbHNlICYmXG4gICAgICAgICAgIGN1cnJlbnRUaW1lIDwgKGFjY2Vzc1Rva2VuVGltZSArIGFjY2Vzc1Rva2VuRXhwaXJ5TGltaXQpKSB7XG4gICAgICAgICAgIGNhbGxiYWNrKHsgYWNjZXNzX3Rva2VuOiBhY2Nlc3NUb2tlbiB9KTtcblxuICAgICAgICAgICByZXR1cm47XG4gICB9XG5cbiAgIGNvbnNvbGUubG9nKFwiQUNDRVNTIFRPS0VOIFBBUkFNUzogXCIrYWNjZXNzVG9rZW4rXCIgXCIrYWNjZXNzVG9rZW5UaW1lK1wiIFwiK2FjY2Vzc1Rva2VuRXhwaXJ5TGltaXQpO1xuXG4gICAvKiBlbHNlLCBnZXQgdGhlIHJlZnJlc2hUb2tlbiBmcm9tIGxvY2FsIHN0b3JhZ2UgYW5kIGdldCBhIG5ldyBhY2Nlc3MgVG9rZW4gKi9cbiAgIHZhciByZWZyZXNoVG9rZW4gPSBnZXRUb2tlbigpO1xuXG4gICAvLyAgIGNvbnNvbGUubG9nKFwiUmVmcmVzaCBUb2tlbiA+PiBcIiArIHJlZnJlc2hUb2tlbik7XG4gICAkLmFqYXgoe1xuICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgIHVybDogZ2FwaUNvbmZpZy5lbmR0b2tlbixcbiAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICBjbGllbnRfaWQgICAgOiBnYXBpQ29uZmlnLmNsaWVudF9pZCxcbiAgICAgICAgICAgICAgICAgIGNsaWVudF9zZWNyZXQ6IGdhcGlDb25maWcuY2xpZW50X3NlY3JldCxcbiAgICAgICAgICAgICAgICAgIHJlZnJlc2hfdG9rZW46IHJlZnJlc2hUb2tlbixcbiAgICAgICAgICAgICAgICAgIGdyYW50X3R5cGUgICA6IGdhcGlDb25maWcuZ3JhbnRUeXBlcy5SRUZSRVNILFxuICAgICAgICAgIH1cbiAgICB9KVxuICAgIC5kb25lKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIC8qIHVwb24gc3VjZXNzLCBkbyBhIGNhbGxiYWNrIHdpdGggdGhlIGRhdGEgcmVjZWl2ZWQgKi9cbiAgICAgICAgICAgIC8vIHRlbXBvcmFyeSBzdG9yaW5nIGFjY2VzcyB0b2tlblxuICAgICAgICAgICAgYWNjZXNzVG9rZW4gPSBkYXRhLmFjY2Vzc190b2tlbjtcbiAgICAgICAgICAgIGFjY2Vzc1Rva2VuVGltZSA9IChuZXcgRGF0ZSgpKS5nZXRUaW1lKCk7XG5cbiAgICAgICAgICAgIC8vIHNldCB0aGUgdG9rZW4gZm9yIHRoZSBqcyBhcGlcbiAgICAgICAgICAgIGdhcGkuYXV0aC5zZXRUb2tlbihkYXRhKTtcblxuICAgICAgICAgICAgLyogc2V0IHRoZSBlcnJvciB0byBmYWxzZSAqL1xuICAgICAgICAgICAgZGF0YS5lcnJvciA9IGZhbHNlO1xuICAgICAgICAgICAgY2FsbGJhY2soZGF0YSk7XG4gICAgICAgICAgIH0pXG4gICAgLmZhaWwoZnVuY3Rpb24oeGhyLCB0ZXh0U3RhdHVzKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlRva2VuIHJlcXVlc3QgZXJyb3IgPz8gPj5cIiArIHhoci5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgY2FsbGJhY2soe1xuICAgICAgICAgICAgICAgICAgICBlcnJvcjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogeGhyLnJlc3BvbnNlVGV4dFxuICAgICAgICAgICAgfSk7XG4gICAgfSlcbiAgICAuYWx3YXlzKGZ1bmN0aW9uKCkgeyAvL2NvbnNvbGUubG9nKFwiVG9rZW4gcmVxdWVzdCBjb21wbGV0ZVwiKTtcbiAgICB9KTtcbn07XG5cbmlmKCAhaXNOYXRpdmUgKSB7XG4gIGdldEFjY2Vzc1Rva2VuID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICAgdmFyIGN1cnJlbnRUaW1lID0gKG5ldyBEYXRlKCkpLmdldFRpbWUoKTtcblxuICAgICBpZiAoYWNjZXNzVG9rZW4gJiZcbiAgICAgICAgICAgICBjdXJyZW50VGltZSA8IChhY2Nlc3NUb2tlblRpbWUgKyBhY2Nlc3NUb2tlbkV4cGlyeUxpbWl0KSkge1xuICAgICAgICAgICAgIGNhbGxiYWNrKGFjY2Vzc1Rva2VuKTtcblxuICAgICAgICAgICAgIHJldHVybjtcbiAgICAgfVxuXG4gICAgZ2FwaS5hdXRoLmF1dGhvcml6ZSh7XG4gICAgY2xpZW50X2lkIDogQ0xJRU5UX0lELFxuICAgIHNjb3BlIDogT0FVVEhfU0NPUEVTLFxuICAgIGltbWVkaWF0ZSA6IHRydWVcbiAgfSwgZnVuY3Rpb24oKSB7XG4gICAgdG9rZW4gPSBnYXBpLmF1dGguZ2V0VG9rZW4oKTtcbiAgICBhY2Nlc3NUb2tlbiA9IHRva2VuO1xuICAgIGFjY2Vzc1Rva2VuVGltZSA9IChuZXcgRGF0ZSgpKS5nZXRUaW1lKCk7XG4gICAgaWYoIGNhbGxiYWNrICkgY2FsbGJhY2sodG9rZW4pO1xuICB9KTtcbiAgfVxufVxuXG5cblxuLyoqXG4qIFNhdmVzIHRoZSBSZWZyZXNoIFRva2VuIGluIGEgbG9jYWwgZGF0YWJhc2Ugb3IgbG9jYWxTdG9yYWdlXG4qIFRoaXMgbWV0aG9kIHNoYWxsIGJlIGludm9rZWQgZnJvbSBleHRlcm5hbGx5IG9ubHkgPGI+b25jZTwvYj4gYWZ0ZXIgYW5cbiogYXV0aG9yaXphdGlvbiBjb2RlIGlzIHJlY2VpdmVkIGZyb20gZ29vZ2xlJ3Mgc2VydmVyLiBUaGlzIG1ldGhvZFxuKiBjYWxscyB0aGUgb3RoZXIgbWV0aG9kIChnZXRSZWZyZXNoVG9rZW4pIHRvIGdldCB0aGUgcmVmcmVzaCBUb2tlbiBhbmRcbiogdGhlbiBzYXZlcyBpdCBsb2NhbGx5IG9uIGRhdGFiYXNlIGFuZCBpbnZva2VzIGEgY2FsbGJhY2sgZnVuY3Rpb25cbipcbiogQHBhcmFtIHRva2VuT2JqIEEgT2JqZWN0IGNvbnRhaW5pbmcgYXV0aG9yaXphdGlvbiBjb2RlXG4qIEBwYXJhbSB7U3RyaW5nfSB0b2tlbk9iai5hdXRoX2NvZGUgVGhlIGF1dGhvcml6YXRpb24gY29kZSBmcm9tIGdvb2dsZSdzIHNlcnZlclxuKlxuKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBUaGUgZnVuY3Rpb24gdG8gYmUgaW52b2tlZCB3aXRoIHBhcmFtZXRlcnNcbiovXG52YXIgc2F2ZVJlZnJlc2hUb2tlbiA9IGZ1bmN0aW9uKHRva2VuT2JqLCBjYWxsYmFjaykge1xuICAgICBnZXRSZWZyZXNoVG9rZW4odG9rZW5PYmosIGZ1bmN0aW9uKGRhdGEpIHtcblxuICAgICAgICAgICAgIC8qIGlmIHRoZXJlJ3Mgbm8gZXJyb3IgKi9cbiAgICAgICAgICAgICBpZiAoIWRhdGEuZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQFRPRE86IG1ha2UgYW5vdGhlciBtZXRob2Qgc2F2ZVRva2VuIHRvIGFic3RyYWN0IHRoZSBzdG9yaW5nIG9mIHRva2VuXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKHRva2VuS2V5LCBkYXRhLnJlZnJlc2hfdG9rZW4pO1xuICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICBjYWxsYmFjayhkYXRhKTtcbiAgICAgfSk7XG59O1xuXG5cblxuLyoqXG4qIENoZWNrcyBpZiB1c2VyIGhhcyBhdXRob3JpemVkIHRoZSBBcHAgb3Igbm90XG4qIEl0IGRvZXMgc28gYnkgY2hlY2tpbmcgaWYgdGhlcmUncyBhIHJlZnJlc2hfdG9rZW5cbiogYXZhaWxhYmxlIG9uIHRoZSBjdXJyZW50IGRhdGFiYXNlIHRhYmxlLlxuKlxuKiBAcmV0dXJuIHtCb29sZWFufSB0cnVlIGlmIGF1dGhvcml6ZWQsIGZhbHNlIG90aGVyd2lzZVxuKi9cbnZhciBpc0F1dGhvcml6ZWQgPSBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAgdmFyIHRva2VuVmFsdWUgPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0odG9rZW5LZXkpO1xuXG4gICAgICBjYWxsYmFjaygoKHRva2VuVmFsdWUgIT09IG51bGwpICYmICh0eXBlb2YgdG9rZW5WYWx1ZSAhPT0gJ3VuZGVmaW5lZCcpKSk7XG59O1xuXG5pZiggIWlzTmF0aXZlICkge1xuICBpc0F1dGhvcml6ZWQgPSBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgIGdhcGkuYXV0aC5hdXRob3JpemUoe1xuICAgIGNsaWVudF9pZCA6IENMSUVOVF9JRCxcbiAgICBzY29wZSA6IE9BVVRIX1NDT1BFUyxcbiAgICBpbW1lZGlhdGUgOiB0cnVlXG4gIH0sIGZ1bmN0aW9uKCkge1xuICAgIHRva2VuID0gZ2FwaS5hdXRoLmdldFRva2VuKCk7XG4gICAgaWYoIGNhbGxiYWNrICkgY2FsbGJhY2sodG9rZW4pO1xuICB9KTtcbiAgfVxufVxuXG5cbi8qKlxuKiBFeHRyYWN0cyB0aGUgY29kZSBmcm9tIHRoZSB1cmwuIENvcGllZCBmcm9tIG9ubGluZVxuKiBAVE9ETyBuZWVkcyB0byBiZSBzaW1wbGlmaWVkLlxuKlxuKiBAcGFyYW0gbmFtZSBUaGUgcGFyYW1ldGVyIHdob3NlIHZhbHVlIGlzIHRvIGJlIGdyYWJiZWQgZnJvbSB1cmxcbiogQHBhcmFtIHVybCAgVGhlIHVybCB0byBiZSBncmFiYmVkIGZyb20uXG4qXG4qIEByZXR1cm4gUmV0dXJucyB0aGUgVmFsdWUgY29ycmVzcG9uZGluZyB0byB0aGUgbmFtZSBwYXNzZWRcbiovXG52YXIgZ2V0UGFyYW1ldGVyQnlOYW1lID0gZnVuY3Rpb24obmFtZSwgdXJsKSB7XG4gIG5hbWUgPSBuYW1lLnJlcGxhY2UoL1tcXFtdLywgXCJcXFxcXFxbXCIpLnJlcGxhY2UoL1tcXF1dLywgXCJcXFxcXFxdXCIpO1xuICB2YXIgcmVnZXhTID0gXCJbXFxcXD8mXVwiICsgbmFtZSArIFwiPShbXiYjXSopXCI7XG4gIHZhciByZWdleCA9IG5ldyBSZWdFeHAocmVnZXhTKTtcbiAgdmFyIHJlc3VsdHMgPSByZWdleC5leGVjKHVybCk7XG5cbiAgaWYocmVzdWx0cyA9PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGVsc2VcbiAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KHJlc3VsdHNbMV0ucmVwbGFjZSgvXFwrL2csIFwiIFwiKSk7XG59O1xuXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBhdXRob3JpemUgOiBhdXRob3JpemUsXG4gIGlzQXV0aG9yaXplZCA6IGlzQXV0aG9yaXplZCxcbiAgZ2V0QWNjZXNzVG9rZW4gOiBnZXRBY2Nlc3NUb2tlbixcbiAgQVBQX0lEIDogQVBQX0lEXG59O1xuIiwidmFyIGFwcCA9IHJlcXVpcmUoJy4vYXBwJyk7XG5cbnZhciBjYWNoZWRUaWxlU3R5bGUgPSB7XG4gIHdoZXJlOiBcInBpZCBpbiAoKVwiLFxuICBwb2x5Z29uT3B0aW9uczoge1xuICAgIGZpbGxDb2xvcjogXCIjMDAwMDAwXCIsXG4gICAgc3Ryb2tlQ29sb3I6IFwiI0ZGMDAwMFwiLFxuICAgIHN0cm9rZVdlaWdodDogM1xuICB9XG59XG5cbnZhciBjYWNoZWRUaWxlcyA9IFtdO1xudmFyIGNhY2hlZFRpbGVzTG9hZGVkID0gZmFsc2U7XG52YXIgY2FjaGVkVGlsZVByZWZpeCA9ICdjYWNoZWRfdGl0bGVfJztcbnZhciBjYWNoaW5nID0gZmFsc2U7XG52YXIgc2F2ZUNhY2hlT25DbGlja1NldCA9IGZhbHNlO1xudmFyIGNNYXBEYXRhID0ge307XG5cbnZhciBjb2xzID0gW107XG52YXIgYXBwID0gbnVsbDtcblxuZnVuY3Rpb24gaW5pdCgpIHtcbiAgX2xvYWRGcm9tQ2FjaGUoKTtcbiAgX2xvYWRDYWNoZWRUaWxlcygpO1xufVxuXG5mdW5jdGlvbiBjbGVhckNhY2hlKCkge1xuICBpZiggIWNvbmZpcm0oJ0FyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBjbGVhciBhbGwgdGlsZSBkYXRhIGZyb20gdGhlIGNhY2hlPycpICkgcmV0dXJuO1xuXG4gIGZvciggdmFyIGtleSBpbiB3aW5kb3cubG9jYWxTdG9yYWdlICkge1xuICAgIGlmKCBrZXkuaW5kZXhPZihjYWNoZWRUaWxlUHJlZml4KSA+IC0xICkge1xuICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGtleSk7XG4gICAgfVxuICB9XG4gIGNhY2hlZFRpbGVzID0gW107XG59XG5cbi8vIGUgaXMgdGhlIGV2ZW50IG9iamVjdCBmcm9tIGdvb2dsZSBtYXBzXG5mdW5jdGlvbiBjYWNoZVRpbGUoZSwgZnVzaW9uTGF5ZXIsIGRlZmF1bHRPcHRpb25zLCBkZWZhdWx0U3R5bGUpIHtcbiAgaWYoICFzYXZlQ2FjaGVPbkNsaWNrU2V0ICkge1xuICAgIHNhdmVDYWNoZU9uQ2xpY2tTZXQgPSB0cnVlO1xuICAgICQoJyNsb2NhdGUtY2FjaGUtc2F2ZS1idG4nKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgX3NhdmVUaWxlKCk7XG4gICAgfSk7XG4gICAgJCgnI2xvY2F0ZS1jYWNoZS1tb2RlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgIGlmKCAhJCh0aGlzKS5pcygnY2hlY2tlZCcpICkgJCgnI2xvY2F0ZS1jYWNoZS1zYXZlLXBhbmVsJykuaGlkZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgaWYoIGNhY2hpbmcgKSByZXR1cm47XG4gIGNhY2hpbmcgPSB0cnVlO1xuXG4gIGNNYXBEYXRhID0ge1xuICAgIGZ1c2lvbkxheWVyIDogZnVzaW9uTGF5ZXIsXG4gICAgZGVmYXVsdE9wdGlvbnMgOiBkZWZhdWx0T3B0aW9ucyxcbiAgICBkZWZhdWx0U3R5bGUgOiBkZWZhdWx0U3R5bGUsXG4gICAgcGlkIDogIGUucm93LnBpZC52YWx1ZVxuICB9XG5cbiAgJCgnI2xvY2F0ZS1jYWNoZS1zYXZlLW5hbWUnKS52YWwoJycpO1xuICAkKCcjbG9jYXRlLWNhY2hlLW1vZGUtbG9hZGluZycpLnNob3coKTtcbiAgJCgnI2xvY2F0ZS1jYWNoZS1zYXZlLXBhbmVsJykuaGlkZSgpO1xuXG4gIF9sb2FkVGlsZShlLmxhdExuZy5sbmcoKSwgZS5sYXRMbmcubGF0KCksIGZ1bmN0aW9uKGRhdGEpe1xuICAgICQoJyNsb2NhdGUtY2FjaGUtc2F2ZS1wYW5lbCcpLnNob3coKTtcbiAgICAkKCcjbG9jYXRlLWNhY2hlLW1vZGUtbG9hZGluZycpLmhpZGUoKTtcblxuICAgICQoJyNsb2NhdGUtY2FjaGUtc2F2ZS1waWQnKS5odG1sKGNNYXBEYXRhLnBpZCk7XG4gICAgY01hcERhdGEuZGF0YSA9IGRhdGE7XG4gICAgY2FjaGluZyA9IGZhbHNlO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gcmVuZGVyKCkge1xuICBmb3IoIHZhciBhdHRyIGluIGFwcC5nZXRNb2RlbCgpLndlYXRoZXIgKSB7XG4gICAgaWYoIGF0dHIgIT0gXCJucmVsXCIgKSBjb2xzLnB1c2goYXR0cik7XG4gIH1cblxuICAvLyB0aGUgYWJvdXQgbW9kYWwgbGluayBpcyBjcmVhdGVkIGJlbG93LCBzbyB3aHkgbm90Li4uXG4gICQoXCIjYWJvdXQtbW9kYWxcIikubW9kYWwoe1xuICAgIHNob3cgOiBmYWxzZVxuICB9KTtcblxuICAvLyB0aGUgYWJvdXQgbW9kYWwgbGluayBpcyBjcmVhdGVkIGJlbG93LCBzbyB3aHkgbm90Li4uXG4gICQoXCIjaGVscC1tb2RhbFwiKS5tb2RhbCh7XG4gICAgc2hvdyA6IGZhbHNlXG4gIH0pO1xuXG4gIF9jcmVhdGVOYXZNZW51KCk7XG5cbiAgLy8gaGlkZSB0aGUgc2VsZWN0IHRyZWUgYnV0dG9uXG4gICQoJyN0cmVlLXN1Yi1tZW51JykucGFyZW50KCkuaGlkZSgpO1xuXG4gIC8vIGhpZGUgdGhlIHNlbGVjdG9yIGZvciB1cGxvYWRpbmcgd2VhdGhlciBkYXRhIGZyb20gYSBnb29nbGUgc3ByZWFkc2hlZXRcbiAgJCgnI3dlYXRoZXJSZWFkZXItc3ByZWFkc2hlZXQnKS5wYXJlbnQoKS5oaWRlKCk7XG5cbiAgLy8gc2hvdyB0aGUgY2FjaGUgdmVyc2lvbiBvZiB0aGUgbG9jYXRpb24gc2VsZWN0b3JcbiAgJCgnI3NlbGVjdC1sb2NhdGlvbi1vbmxpbmUnKS5oaWRlKCk7XG4gICQoJyNzZWxlY3QtbG9jYXRpb24tb2ZmbGluZScpLnNob3coKTtcblxuICAvLyBzZXQgdGhlIGxvY2F0aW9uIHNlbGVjdG9yIHVpIGxpc3QgYmFzZWQgb24gY2FjaGVkIHRpbGVzXG4gIF91cGRhdGVDYWNoZVRpbGVVaUxpc3QoKTtcbn1cblxuZnVuY3Rpb24gcmVuZGVyQ2FjaGVkVGlsZXNPbk1hcChmdXNpb25MYXllciwgZGVmYXVsdE9wdGlvbnMsIGRlZmF1bHRTdHlsZSkge1xuICBpZiggIWNhY2hlZFRpbGVzTG9hZGVkICkgX2xvYWRDYWNoZWRUaWxlcygpO1xuXG4gIGRlZmF1bHRPcHRpb25zLnN0eWxlcyA9IFtkZWZhdWx0U3R5bGVdO1xuXG4gIGlmKCBjYWNoZWRUaWxlcy5sZW5ndGggPiAwICkge1xuICAgIGNhY2hlZFRpbGVTdHlsZS53aGVyZSA9ICdwaWQgaW4gKCcrY2FjaGVkVGlsZXMuam9pbignLCcpKycpJztcbiAgICBkZWZhdWx0T3B0aW9ucy5zdHlsZXMucHVzaChjYWNoZWRUaWxlU3R5bGUpO1xuICB9XG5cbiAgZnVzaW9uTGF5ZXIuc2V0T3B0aW9ucyhkZWZhdWx0T3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIF9zYXZlVGlsZSgpIHtcbiAgdmFyIG5hbWUgPSAkKCcjbG9jYXRlLWNhY2hlLXNhdmUtbmFtZScpLnZhbCgpO1xuICBpZiggbmFtZS5sZW5ndGggPT0gMCApIHJldHVybiBhbGVydCgnUGxlYXNlIHByb3ZpZGUgYSBuYW1lJyk7XG5cbiAgY01hcERhdGEuZGF0YS5uYW1lID0gbmFtZTtcblxuICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oY2FjaGVkVGlsZVByZWZpeCtjTWFwRGF0YS5waWQsIEpTT04uc3RyaW5naWZ5KGNNYXBEYXRhLmRhdGEpKTtcblxuICBjYWNoZWRUaWxlcy5wdXNoKGNNYXBEYXRhLnBpZCk7XG4gIHJlbmRlckNhY2hlZFRpbGVzT25NYXAoY01hcERhdGEuZnVzaW9uTGF5ZXIsIGNNYXBEYXRhLmRlZmF1bHRPcHRpb25zLCBjTWFwRGF0YS5kZWZhdWx0U3R5bGUpO1xuICAkKCcjbG9jYXRlLWNhY2hlLXNhdmUtcGFuZWwnKS5oaWRlKCk7XG59XG5cbmZ1bmN0aW9uIF9sb2FkVGlsZShsbmcsIGxhdCwgY2FsbGJhY2spIHtcbiAgZ2EoJ3NlbmQnLCAnZXZlbnQnLCAndWknLCAnaW50ZXJhY3Rpb24nLCAndGlsZS1kYXRhLWNhY2hlJywgMSk7XG5cbiAgdmFyIHVybCA9IFwiaHR0cDovL2FsZGVyLmJpb2VuZXJneS5jYXNpbC51Y2RhdmlzLmVkdTo4MDgwL3ZpenNvdXJjZS9yZXN0P3ZpZXc9cG9pbnRUb1dlYXRoZXIoXCIrbG5nK1wiLFwiK2xhdCtcIiw4MTkyKVwiXG4gIHZhciBxID0gbmV3IGdvb2dsZS52aXN1YWxpemF0aW9uLlF1ZXJ5KHVybCk7XG4gIHZhciByZXNwcyA9IDA7XG4gIHZhciB3ZWF0aGVyVGFibGUgPSB7fTtcbiAgdmFyIHNvaWxUYWJsZSA9IHt9O1xuXG4gIGZ1bmN0aW9uIGNoZWNrRG9uZSgpIHtcbiAgICAgIHJlc3BzKys7XG4gICAgICBpZiggcmVzcHMgPT0gMiAmJiBjYWxsYmFjayApIGNhbGxiYWNrKHt3ZWF0aGVyOndlYXRoZXJUYWJsZSwgc29pbDpzb2lsVGFibGV9KTtcbiAgfVxuXG4gIHEuc2V0UXVlcnkoJ1NFTEVDVCAqJyk7XG4gIHEuc2VuZChmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgd2VhdGhlclRhYmxlID0gSlNPTi5wYXJzZShyZXNwb25zZS5nZXREYXRhVGFibGUoKS50b0pTT04oKSk7XG4gICAgY2hlY2tEb25lKCk7XG4gIH0pO1xuXG4gIHZhciB1cmwgPSBcImh0dHA6Ly9hbGRlci5iaW9lbmVyZ3kuY2FzaWwudWNkYXZpcy5lZHU6ODA4MC92aXpzb3VyY2UvcmVzdD92aWV3PXBvaW50VG9TT0lMKFwiK2xuZytcIixcIitsYXQrXCIsODE5MilcIlxuICB2YXIgcSA9IG5ldyBnb29nbGUudmlzdWFsaXphdGlvbi5RdWVyeSh1cmwpO1xuICBxLnNldFF1ZXJ5KCdTRUxFQ1QgKicpO1xuICBxLnNlbmQoZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgIHNvaWxUYWJsZSA9IEpTT04ucGFyc2UocmVzcG9uc2UuZ2V0RGF0YVRhYmxlKCkudG9KU09OKCkpO1xuICAgIGNoZWNrRG9uZSgpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gX3VwZGF0ZUNhY2hlVGlsZVVpTGlzdCgpIHtcbiAgaWYoIGNhY2hlZFRpbGVzLmxlbmd0aCA9PSAwICkge1xuICAgICQoJyNzZWxlY3QtbG9jYXRpb24tb2ZmbGluZS1ub25lJykuc2hvdygpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBsaXN0RWxlID0gJCgnI3NlbGVjdC1sb2NhdGlvbi1vZmZsaW5lLWxpc3QnKS5odG1sKCc8ZGl2PlNlbGVjdCBDYWNoZWQgVGlsZTwvZGl2PicpLCBlbGU7XG4gICQoJyNzZWxlY3QtbG9jYXRpb24tb2ZmbGluZS1ub25lJyk7XG4gIGZvciggdmFyIGkgPSAwOyBpIDwgY2FjaGVkVGlsZXMubGVuZ3RoOyBpKysgKSB7XG4gICAgdmFyIGpzb24gPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oY2FjaGVkVGlsZVByZWZpeCtjYWNoZWRUaWxlc1tpXSk7XG4gICAganNvbiA9IEpTT04ucGFyc2UoanNvbik7XG5cbiAgICBlbGUgPSAkKCc8ZGl2PjxhIGNhY2hlaWQ9XCInK2krJ1wiIHN0eWxlPVwiY3Vyc29yOnBvaW50ZXJcIj4nK2NhY2hlZFRpbGVzW2ldKyc6ICcranNvbi5uYW1lKyc8L2E+PC9kaXY+Jyk7XG4gICAgZWxlLmZpbmQoJ2EnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgIF9ydW5DYWNoZWRUaWxlKHBhcnNlSW50KCQodGhpcykuYXR0cignY2FjaGVpZCcpKSk7XG4gICAgfSk7XG4gICAgbGlzdEVsZS5hcHBlbmQoZWxlKVxuICB9XG59XG5cbmZ1bmN0aW9uIF9ydW5DYWNoZWRUaWxlKGluZGV4KSB7XG4gIHZhciBqc29uID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKGNhY2hlZFRpbGVQcmVmaXgrY2FjaGVkVGlsZXNbaW5kZXhdKTtcbiAganNvbiA9IEpTT04ucGFyc2UoanNvbik7XG5cbiAgZm9yKCB2YXIgaSA9IDA7IGkgPCBqc29uLndlYXRoZXIucm93cy5sZW5ndGg7IGkrKyApIHtcbiAgICB2YXIgbSA9IGkrJyc7XG4gICAgZm9yKCB2YXIgaiA9IDE7IGogPCBqc29uLndlYXRoZXIuY29scy5sZW5ndGg7IGorKyApIHtcbiAgICAgICQoXCIjaW5wdXQtd2VhdGhlci1cIitjb2xzW2pdK1wiLVwiK2kpLnZhbChqc29uLndlYXRoZXIucm93c1tpXS5jW2pdID8ganNvbi53ZWF0aGVyLnJvd3NbaV0uY1tqXS52IDogXCJcIik7XG4gICAgfVxuICB9XG5cblxuICBmb3IoIHZhciBpID0gMDsgaSA8IGpzb24uc29pbC5jb2xzLmxlbmd0aDsgaSsrICkge1xuICAgIGlmKCBqc29uLnNvaWwucm93c1swXSA9PSBudWxsICkgY29udGludWU7XG4gICAgJChcIiNpbnB1dC1zb2lsLVwiK2pzb24uc29pbC5jb2xzW2ldLmlkKS52YWwoanNvbi5zb2lsLnJvd3NbMF0uY1tpXS52KTtcbiAgfVxuXG4gICQoXCIjc2VsZWN0LXdlYXRoZXItbW9kYWxcIikubW9kYWwoJ2hpZGUnKTtcblxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgYXBwLnJ1bk1vZGVsKCk7XG4gIH0sIDUwMCk7XG59XG5cbmZ1bmN0aW9uIF9sb2FkQ2FjaGVkVGlsZXMoKSB7XG4gIGNhY2hlZFRpbGVzID0gW107XG4gIGZvciggdmFyIGtleSBpbiB3aW5kb3cubG9jYWxTdG9yYWdlICkge1xuICAgIGlmKCBrZXkuaW5kZXhPZihjYWNoZWRUaWxlUHJlZml4KSA+IC0xICkge1xuICAgICAgY2FjaGVkVGlsZXMucHVzaChrZXkucmVwbGFjZShjYWNoZWRUaWxlUHJlZml4LCcnKSk7XG4gICAgfVxuICB9XG4gIGNhY2hlZFRpbGVzTG9hZGVkID0gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gX2NyZWF0ZU5hdk1lbnUoKSB7XG4gIHZhciBidG4gPSAkKCc8bGkgY2xhc3M9XCJkcm9wZG93blwiPidcbiAgICAgICsgJzxhIGNsYXNzPVwiZHJvcGRvd24tdG9nZ2xlXCI+T0ZGTElORSBNT0RFPGIgY2xhc3M9XCJjYXJldFwiPjwvYj48L2E+J1xuICAgICAgKyAnPHVsIGNsYXNzPVwiZHJvcGRvd24tbWVudVwiPidcbiAgICAgICsgJzxsaT48YSBpZD1cImhlbHBcIj48aSBjbGFzcz1cImljb24tcXVlc3Rpb24tc2lnblwiPjwvaT4gSGVscDwvYT48L2xpPidcbiAgICAgICsgJzxsaT48YSBpZD1cImFib3V0XCI+PGkgY2xhc3M9XCJpY29uLWluZm8tc2lnblwiPjwvaT4gQWJvdXQ8L2E+PC9saT4nXG4gICAgICArICc8L3VsPjwvbGk+Jyk7XG5cbiAgLy8gc2V0IGNsaWNrIGhhbmRsZXJzIGZvciBwb3B1cFxuICBidG4uZmluZCgnYS5kcm9wZG93bi10b2dnbGUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICQodGhpcykucGFyZW50KCkudG9nZ2xlQ2xhc3MoJ29wZW4nKTtcbiAgfSk7XG5cbiAgLy8gYWJvdXQgY2xpY2sgaGFuZGxlclxuICBidG4uZmluZCgnI2Fib3V0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgYnRuLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XG4gICAgJChcIiNhYm91dC1tb2RhbFwiKS5tb2RhbCgnc2hvdycpO1xuICB9KTtcblxuICBidG4uZmluZCgnI2hlbHAnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICBidG4udG9nZ2xlQ2xhc3MoJ29wZW4nKTtcbiAgICBzaG93SGVscCgpO1xuICB9KTtcblxuICAvLyBhZGQgbWVudVxuICAkKFwiI2xvZ2luLWhlYWRlclwiKS5odG1sKFwiXCIpLmFwcGVuZChidG4pO1xufTtcblxuZnVuY3Rpb24gX2xvYWRGcm9tQ2FjaGUoKSB7XG4gICAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6ICdjYWNoZS9qc2FwaScsXG4gICAgICAgIGRhdGFUeXBlOiBcInNjcmlwdFwiLFxuICAgICAgICBjYWNoZSA6IHRydWUsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgJCgnaGVhZCcpLmFwcGVuZCggJCgnPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIHR5cGU9XCJ0ZXh0L2Nzc1wiIC8+JykuYXR0cignaHJlZicsICdjYWNoZS9jaGFydC5jc3MnKSApO1xuICAgICAgICAgICQoJ2hlYWQnKS5hcHBlbmQoICQoJzxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiB0eXBlPVwidGV4dC9jc3NcIiAvPicpLmF0dHIoJ2hyZWYnLCAnY2FjaGUvYW5ub3RhdGVkdGltZWxpbmUuY3NzJykgKTtcbiAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiAnY2FjaGUvY2hhcnQuanMnLFxuICAgICAgICAgICAgZGF0YVR5cGU6IFwic2NyaXB0XCIsXG4gICAgICAgICAgICBjYWNoZSA6IHRydWUsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICBjaGFydHNMb2FkZWQgPSB0cnVlO1xuICAgICAgICAgICAgICBpZiggY2hhcnRzQ2FsbGJhY2sgKSBjaGFydHNDYWxsYmFjaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGluaXQgOiBpbml0LFxuICByZW5kZXIgOiByZW5kZXIsXG4gIGNhY2hlVGlsZSA6IGNhY2hlVGlsZSxcbiAgcmVuZGVyQ2FjaGVkVGlsZXNPbk1hcCA6IHJlbmRlckNhY2hlZFRpbGVzT25NYXAsXG4gIGNsZWFyQ2FjaGUgOiBjbGVhckNhY2hlXG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIFZQRCA6IHtcbiAgICAgIGxhYmVsIDogXCJNZWFuIFZhcG9yIFByZXNzdXJlIERlZmljaXRcIixcbiAgICAgIHVuaXRzIDogXCJrUEFcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJ0aGUgZGlmZmVyZW5jZSAoZGVmaWNpdCkgYmV0d2VlbiB0aGUgYW1vdW50IG9mIG1vaXN0dXJlIGluIHRoZSBhaXIgYW5kIGhvdyBtdWNoIFwiICtcbiAgICAgIFx0XHRcIm1vaXN0dXJlIHRoZSBhaXIgY2FuIGhvbGQgd2hlbiBpdCBpcyBzYXR1cmF0ZWRcIlxuICB9LFxuICBmVlBEIDoge1xuICAgICAgbGFiZWwgOiBcIlZhcG9yIFByZXNzdXJlIERlZmljaXQgTW9kaWZpZXJcIixcbiAgICAgIHVuaXRzIDogXCJ1bml0bGVzc1wiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIkEgZW52aXJvbm1lbnRhbCBmYWN0b3IgZ3Jvd3RoIG1vZGlmaWVyXCJcbiAgfSxcbiAgZlQgOiB7XG4gICAgICBsYWJlbCA6IFwiVGVtcGVyYXR1cmUgTW9kaWZpZXJcIixcbiAgICAgIHVuaXRzIDogXCJ1bml0bGVzc1wiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIkEgZW52aXJvbm1lbnRhbCBmYWN0b3IgZ3Jvd3RoIG1vZGlmaWVyXCJcbiAgfSxcbiAgZkZyb3N0IDoge1xuICAgICAgbGFiZWwgOiBcIkZyb3N0IE1vZGlmaWVyXCIsXG4gICAgICB1bml0cyA6IFwidW5pdGxlc3NcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJOdW1iZXIgb2YgZnJvc3QgZGF5cyBncm93dGggbW9kaWZpZXJcIlxuICB9LFxuICBQQVIgOiB7XG4gICAgICBsYWJlbCA6IFwiTW9udGhseSBQaG90b3N5bnRoZXRpY2FsbHkgQWN0aXZlIFJhZGlhdGlvblwiLFxuICAgICAgdW5pdHMgOiBcIm1vbHMgLyBtXjIgbW9udGhcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJEZXNpZ25hdGVzIHRoZSBzcGVjdHJhbCByYW5nZSAod2F2ZSBiYW5kKSBvZiBzb2xhciByYWRpYXRpb24gZnJvbSA0MDAgdG8gNzAwIG5hbm9tZXRlcnMgXCIgK1xuICAgICAgXHRcdFwidGhhdCBwaG90b3N5bnRoZXRpYyBvcmdhbmlzbXMgYXJlIGFibGUgdG8gdXNlIGluIHRoZSBwcm9jZXNzIG9mIHBob3Rvc3ludGhlc2lzXCJcbiAgfSxcbiAgeFBQIDoge1xuICAgICAgbGFiZWwgOiBcIk1heGltdW0gUG90ZW50aWFsIFByaW1hcnkgUHJvZHVjdGlvblwiLFxuICAgICAgdW5pdHMgOiBcIk1ldHJpYyBUb25zIERyeSBNYXR0ZXIvaGFcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJcIlxuICB9LFxuICBJbnRjcHRuIDoge1xuICAgICAgbGFiZWwgOiBcIkNhbm9weSBSYWluZmFsbCBJbnRlcmNlcHRpb25cIixcbiAgICAgIHVuaXRzIDogXCJcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJQcmVjaXBpdGF0aW9uIHRoYXQgZG9lcyBub3QgcmVhY2ggdGhlIHNvaWwsIGJ1dCBpcyBpbnN0ZWFkIGludGVyY2VwdGVkIGJ5IHRoZSBsZWF2ZXMgYW5kIGJyYW5jaGVzIG9mIHBsYW50cyBhbmQgdGhlIGZvcmVzdCBmbG9vci5cIlxuICB9LFxuICBBU1cgOiB7XG4gICAgICBsYWJlbCA6IFwiQXZhaWxhYmxlIFNvaWwgV2F0ZXJcIixcbiAgICAgIHVuaXRzIDogXCJtbVwiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIlwiXG4gIH0sXG4gIEN1bUlycmlnIDoge1xuICAgICAgbGFiZWwgOiBcIkN1bXVsYXRpdmUgUmVxdWlyZWQgSXJyaWdhdGlvblwiLFxuICAgICAgdW5pdHMgOiBcIm1tL21vblwiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIlwiXG4gIH0sXG4gIElycmlnIDoge1xuICAgICAgbGFiZWwgOiBcIlJlcXVpcmVkIElycmlnYXRpb25cIixcbiAgICAgIHVuaXRzIDogXCJtbS9tb25cIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJcIlxuICB9LFxuICBTdGFuZEFnZSA6IHtcbiAgICAgIGxhYmVsIDogXCJTdGFuZCBBZ2VcIixcbiAgICAgIHVuaXRzIDogXCJcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJcIlxuICB9LFxuICBMQUkgOiB7XG4gICAgICBsYWJlbCA6IFwiTGVhZiBBcmVhIEluZGV4XCIsXG4gICAgICB1bml0cyA6IFwibTIgLyBtMlwiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIlRoZSBvbmUtc2lkZWQgZ3JlZW4gbGVhZiBhcmVhIHBlciB1bml0IGdyb3VuZCBzdXJmYWNlIGFyZWFcIlxuICB9LFxuICBDYW5Db25kIDoge1xuICAgICAgbGFiZWwgOiBcIkNhbm9weSBDb25kdWN0YW5jZVwiLFxuICAgICAgdW5pdHMgOiBcImdjLG0vc1wiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIlwiXG4gIH0sXG4gIFRyYW5zcCA6IHtcbiAgICAgIGxhYmVsIDogXCJDYW5vcHkgTW9udGhseSBUcmFuc3BpcmF0aW9uXCIsXG4gICAgICB1bml0cyA6IFwibW0vbW9uXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiV2F0ZXIgbW92ZW1lbnQgdGhyb3VnaCBhIHBsYW50IGFuZCBpdHMgZXZhcG9yYXRpb24gZnJvbSBhZXJpYWwgcGFydHNcIlxuICB9LFxuICBFVHIgOiB7XG4gICAgICBsYWJlbCA6IFwiRVRyXCIsXG4gICAgICB1bml0cyA6IFwibW1cIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJSZWZlcmVuY2UgZXZhcG90cmFuc3BpcmF0aW9uIGZvciBBbGZhbGZhXCJcbiAgfSxcbiAgS2MgOiB7XG4gICAgICBsYWJlbCA6IFwiS2NcIixcbiAgICAgIHVuaXRzIDogXCJcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJDcm9wIGNvZWZmaWNpZW50c1wiXG4gIH0sXG4gIGZTVyA6IHtcbiAgICAgIGxhYmVsIDogXCJTb2lsIFdhdGVyIE1vZGlmaWVyXCIsXG4gICAgICB1bml0cyA6IFwidW5pdGxlc3NcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJBIGVudmlyb25tZW50YWwgZmFjdG9yIGdyb3d0aCBtb2RpZmllclwiXG4gIH0sXG4gIGZBZ2UgOiB7XG4gICAgICBsYWJlbCA6IFwiU3RhbmQgYWdlXCIsXG4gICAgICB1bml0cyA6IFwidW5pdGxlc3NcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJBIGVudmlyb25tZW50YWwgZmFjdG9yIGdyb3d0aCBtb2RpZmllclwiXG4gIH0sXG4gIFBoeXNNb2QgOiB7XG4gICAgICBsYWJlbCA6IFwiXCIsXG4gICAgICB1bml0cyA6IFwidW5pdGxlc3NcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJQaHlzaW9sb2dpY2FsIE1vZGlmaWVyIHRvIENhbm9weSBDb25kdWN0YW5jZVwiXG4gIH0sXG4gIHBSIDoge1xuICAgICAgbGFiZWwgOiBcIlwiLFxuICAgICAgdW5pdHMgOiBcIlwiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIkFsb25nIHdpdGggYSBQaHlzaW9sb2dpYWwgcGFyYW1ldGVyLCBzcGVjaWZpZXMgdGhlIGFtb3VudCBvZiBuZXcgZ3Jvd3RoIGFsbG9jYXRlZCB0byB0aGUgcm9vdCBzeXN0ZW0sIGFuZCB0aGUgdHVybm92ZXIgcmF0ZS5cIlxuICB9LFxuICBwUyA6IHtcbiAgICAgIGxhYmVsIDogXCJcIixcbiAgICAgIHVuaXRzIDogXCJcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJEZWZpbmVzIHRoZSBmb2xpYWdlIHRvIHN0ZW0gKFdGL1dTKSBmcmFjdGlvbiBpbiBhbGxvY2F0aW5nIGFib3ZlZ3JvdW5kIGJpb21hc3Mgb2YgdGhlIHRyZWVcIlxuICB9LFxuICBsaXR0ZXJmYWxsIDoge1xuICAgICAgbGFiZWwgOiBcIlwiLFxuICAgICAgdW5pdHMgOiBcIlwiLFxuICAgICAgZGVzY3JpdGlvbiA6IFwiXCIsXG4gICAgICBhbHRGbk5hbWUgOiBcInRkcFwiXG4gIH0sXG4gIE5QUCA6IHtcbiAgICAgIGxhYmVsIDogXCJOZXQgQ2Fub3B5IFByb2R1Y3Rpb25cIixcbiAgICAgIHVuaXRzIDogXCJNZy9oYVwiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIlwiXG4gIH0sXG4gIFdGIDoge1xuICAgICAgbGFiZWwgOiBcIkxlYWYgQmlvbWFzc1wiLFxuICAgICAgdW5pdHMgOiBcIk1nL2hhXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiXCIsXG4gICAgICBmbiA6IGZ1bmN0aW9uKHByZV9XRiwgY3VyX2RXLCBjdXJfcEYsIGN1cl9saXR0ZXJmYWxsLCBwcmV2X1dGKSB7XG4gICAgICAgICAgcmV0dXJuIHByZXZfV0YgKyBjdXJfZFcgKiBjdXJfcEYgLSBjdXJfbGl0dGVyZmFsbCAqIHByZXZfV0ZcbiAgICAgIH1cbiAgfSxcbiAgV1IgOiB7XG4gICAgICBsYWJlbCA6IFwiUm9vdCBCaW9tYXNzXCIsXG4gICAgICB1bml0cyA6IFwiTWcvaGFcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJcIixcbiAgICAgIGZuIDogZnVuY3Rpb24ocHJldl9XUiwgY3VyX2RXLCBjdXJfcFIsIHR1cm5vdmVyLCBwcmV2X1dSLCBjdXJfUm9vdFApIHtcbiAgICAgICAgICByZXR1cm4gcHJldl9XUiArIGN1cl9kVyAqIGN1cl9wUiAtIHRyZWUucFIudHVybm92ZXIgKiBwcmV2X1dSIC0gY3VyX1Jvb3RQO1xuICAgICAgfVxuICB9LFxuICBXUyA6IHtcbiAgICAgIGxhYmVsIDogXCJTdGVtIEJpb21hc3NcIixcbiAgICAgIHVuaXRzIDogXCJNZy9oYVwiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIlwiLFxuICAgICAgZm4gOiBmdW5jdGlvbihwcmV2X1dTLCBjdXJfZFcsIGN1cl9wUykgeyByZXR1cm4gcHJldl9XUyArIGN1cl9kVyAqIGN1cl9wUyB9XG4gIH0sXG4gIFcgOiB7XG4gICAgICBsYWJlbCA6IFwiVG90YWwgQmlvbWFzc1wiLFxuICAgICAgdW5pdHMgOiBcIk1nL2hhXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiXCIsXG4gICAgICBmbiA6IGZ1bmN0aW9uKGN1cl9XRiwgY3VyX1dSLCBjdXJfV1MpIHsgcmV0dXJuIGN1cl9XRitjdXJfV1IrY3VyX1dTIH1cbiAgfVxufVxuIiwidmFyIG1vZGVsSU8gPSByZXF1aXJlKCcuLi9tb2RlbFJ1bkhhbmRsZXInKTtcbnZhciBhcHA7XG5cbnZhciBzaG93ID0gZnVuY3Rpb24ocmVzdWx0cykge1xuICB2YXIgaSwgejtcblxuICAvLyBzZWxlY3RlZCBpbiB0aGUgY2hhcnRzIG91dHB1dFxuICB2YXIgdmFycyA9ICQoXCIjY2hhcnRUeXBlSW5wdXRcIikudmFsKCk7XG5cbiAgLy8gZmluZCB0aGUgcm93cyB3ZSBjYXJlIGFib3V0XG4gIHZhciBjaGFydFJvd3MgPSB7fTtcbiAgZm9yKCBpID0gMDsgaSA8IHJlc3VsdHNbMF0uaGVhZGVyLmxlbmd0aDsgaSsrICkge1xuICAgICAgaWYoIHZhcnMuaW5kZXhPZihyZXN1bHRzWzBdLmhlYWRlcltpXSkgPiAtMSApIGNoYXJ0Um93c1tyZXN1bHRzWzBdLmhlYWRlcltpXV0gPSBpO1xuICB9XG5cbiAgdmFyIHRhYnMgPSAkKCc8dWwgY2xhc3M9XCJuYXYgbmF2LXBpbGxzXCIgaWQ9XCJyYXdPdXRwdXRUYWJzXCIgIGRhdGEtdGFicz1cInBpbGxcIj48L3VsPicpO1xuICB2YXIgY29udGVudHMgPSAkKCc8ZGl2IGNsYXNzPVwidGFiLWNvbnRlbnRcIiBzdHlsZT1cIm92ZXJmbG93OmF1dG87bWFyZ2luLXRvcDoxNXB4XCI+PC9kaXY+Jyk7XG5cbiAgZm9yKCBpID0gMDsgaSA8IHZhcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRhYnMuYXBwZW5kKCQoJzxsaSAnKyhpID09PSAwID8gJ2NsYXNzPVwiYWN0aXZlXCInIDogXCJcIikrJz48YSBocmVmPVwiI3Jhd291dCdcbiAgICAgICAgICArdmFyc1tpXSsnXCIgZGF0YS10b2dnbGU9XCJ0YWJcIj4nK3ZhcnNbaV0rJzwvYT48L2xpPicpKTtcblxuICAgICAgY29udGVudHMuYXBwZW5kKCQoJzxkaXYgY2xhc3M9XCJ0YWItcGFuZSAnICsgKGkgPT09IDAgPyAnYWN0aXZlJyA6IFwiXCIpXG4gICAgICAgICAgKyAnXCIgaWQ9XCJyYXdvdXQnICsgdmFyc1tpXSArICdcIj48L2Rpdj4nKSk7XG4gIH1cblxuICAkKFwiI291dHB1dC1jb250ZW50XCIpLmh0bWwoXCJcIikuYXBwZW5kKHRhYnMpLmFwcGVuZChjb250ZW50cyk7XG4gICQoXCIjcmF3T3V0cHV0VGFic1wiKS50YWIoKTtcblxuICBjc3ZSZXN1bHRzID0ge1xuICAgICAgY29uZmlnIDogbW9kZWxJTy5leHBvcnRTZXR1cCgpLFxuICAgICAgaW5wdXRzIDogW10sXG4gICAgICBoZWFkZXIgOiByZXN1bHRzWzBdLmhlYWRlcixcbiAgICAgIGRhdGEgOiB7fVxuICB9O1xuICBmb3IoIHZhciBpID0gMDsgaSA8IHJlc3VsdHMubGVuZ3RoOyBpKysgKSB7XG4gICAgY3N2UmVzdWx0cy5pbnB1dHMucHVzaChyZXN1bHRzW2ldLmlucHV0cyk7XG4gIH1cblxuICB2YXIgY0RhdGUgPSBuZXcgRGF0ZSgkKFwiI2lucHV0LW1hbmFnZS1kYXRlUGxhbnRlZFwiKS52YWwoKSk7XG5cbiAgdmFyIHRhYmxlLCByb3c7XG4gIGZvciggdmFyIGtleSBpbiBjaGFydFJvd3MgKSB7XG4gICAgICB0YWJsZSA9IFwiPHRhYmxlIGNsYXNzPSd0YWJsZSB0YWJsZS1zdHJpcGVkJz5cIjtcblxuICAgICAgY3N2UmVzdWx0cy5kYXRhW2tleV0gPSBbXTtcblxuXG4gICAgICAvLyBzZXQgaGVhZGVyIHJvd1xuICAgICAgdmFyIGN1cnJlbnRSb3cgPSBbXTtcbiAgICAgIGN1cnJlbnRSb3cucHVzaCgnZGF0ZScpO1xuICAgICAgLy9jdXJyZW50Um93LnB1c2goJ3N0ZXAnKTtcblxuICAgICAgdGFibGUgKz0gXCI8dHI+PHRoPkRhdGU8L3RoPjx0aD5TdGVwPC90aD5cIjtcblxuICAgICAgZm9yKCB6ID0gMDsgeiA8IHJlc3VsdHMubGVuZ3RoOyB6KysgKSB7XG4gICAgICAgICAgdGFibGUgKz0gXCI8dGg+XCI7XG4gICAgICAgICAgdmFyIHRtcCA9IFtdO1xuXG4gICAgICAgICAgZm9yKCB2YXIgbVR5cGUgaW4gcmVzdWx0c1t6XS5pbnB1dHMgKSB7XG4gICAgICAgICAgICAgIHRtcC5wdXNoKG1UeXBlK1wiPVwiK3Jlc3VsdHNbel0uaW5wdXRzW21UeXBlXSk7XG4gICAgICAgICAgICAgIHRhYmxlICs9IFwiPGRpdj5cIittVHlwZStcIj1cIityZXN1bHRzW3pdLmlucHV0c1ttVHlwZV0rXCI8L2Rpdj5cIjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiggdG1wLmxlbmd0aCA9PT0gMCApIHtcbiAgICAgICAgICAgICAgY3VycmVudFJvdy5wdXNoKGtleSk7XG4gICAgICAgICAgICAgIHRhYmxlICs9IGtleTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBjdXJyZW50Um93LnB1c2godG1wLmpvaW4oXCIgXCIpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGFibGUgKz0gXCI8L3RoPlwiO1xuICAgICAgfVxuICAgICAgdGFibGUgKz0gXCI8L3RyPlwiO1xuICAgICAgY3N2UmVzdWx0cy5kYXRhW2tleV0ucHVzaChjdXJyZW50Um93KTtcbiAgICAgIHZhciBjID0gMDtcblxuICAgICAgZm9yKCB2YXIgZGF0ZSBpbiByZXN1bHRzWzBdLm91dHB1dCApIHtcbiAgICAgICAgYysrO1xuICAgICAgICBjdXJyZW50Um93ID0gW107XG5cbiAgICAgICAgdGFibGUgKz0gXCI8dHI+PHRkPlwiK2RhdGUrXCI8L3RkPjx0ZD5cIitjK1wiPC90ZD5cIjtcblxuICAgICAgICBjdXJyZW50Um93LnB1c2goZGF0ZSk7XG4gICAgICAgIC8vY3VycmVudFJvdy5wdXNoKGMpO1xuXG4gICAgICAgIHZhciB2O1xuICAgICAgICBmb3IoIHogPSAwOyB6IDwgcmVzdWx0cy5sZW5ndGg7IHorKyApIHtcbiAgICAgICAgICBpZiggIXJlc3VsdHNbel0ub3V0cHV0W2RhdGVdICkge1xuICAgICAgICAgICAgdGFibGUgKz0gXCI8dGQ+PC90ZD5cIjtcbiAgICAgICAgICAgIGN1cnJlbnRSb3cucHVzaChudWxsKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdiA9IHJlc3VsdHNbel0ub3V0cHV0W2RhdGVdW2NoYXJ0Um93c1trZXldXTtcbiAgICAgICAgICAgIHRhYmxlICs9IFwiPHRkPlwiK3YrXCI8L3RkPlwiO1xuICAgICAgICAgICAgY3VycmVudFJvdy5wdXNoKHYpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0YWJsZSArPSBcIjwvdHI+XCI7XG5cbiAgICAgICAgY3N2UmVzdWx0cy5kYXRhW2tleV0ucHVzaChjdXJyZW50Um93KTtcbiAgICAgIH1cbiAgICAgICQoXCIjcmF3b3V0XCIgKyBrZXkpLmh0bWwodGFibGUrXCI8L3RhYmxlPlwiKTtcbiAgfVxuXG4gIGFwcC5zZXRDc3ZSZXN1bHRzKGNzdlJlc3VsdHMpO1xuXG4gIC8vIG1ha2Ugc3VyZSB3ZSBjYW4gc2VlIHRoZSBleHBvcnQgYnRuXG4gIGlmKCAhb2ZmbGluZU1vZGUgKSAkKFwiI3Nob3ctZXhwb3J0LWNzdlwiKS5zaG93KCk7XG5cbiAgcmV0dXJuIGNzdlJlc3VsdHM7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2hvdyA6IHNob3csXG4gIGluaXQgOiBmdW5jdGlvbihhKSB7XG4gICAgYXBwID0gYTtcbiAgfVxufTtcbiIsImZ1bmN0aW9uIHFzKGtleSkge1xuICBrZXkgPSBrZXkucmVwbGFjZSgvWyorP14kLlxcW1xcXXt9KCl8XFxcXFxcL10vZywgXCJcXFxcJCZcIik7XG4gIHZhciBtYXRjaCA9IGxvY2F0aW9uLnNlYXJjaC5tYXRjaChuZXcgUmVnRXhwKFwiWz8mXVwiICsga2V5ICsgXCI9KFteJl0rKSgmfCQpXCIpKTtcbiAgcmV0dXJuIG1hdGNoICYmIGRlY29kZVVSSUNvbXBvbmVudChtYXRjaFsxXS5yZXBsYWNlKC9cXCsvZywgXCIgXCIpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHFzIDogcXNcbn07XG4iLCJ2YXIgb3B0aW9ucyA9IHtcbiAgdGl0bGUgOiAnV2VhdGhlcicsXG4gIGhlaWdodCA6IDMwMCxcbiAgdkF4ZXM6IFt7XG4gICAgICAgICAgdGl0bGU6IFwiUmFkaWF0aW9uIChNSi9kYXkpOyBUZW1wZXJhdHVyZSAoXkMpOyBEZXcgUG9pbnQgKF5DKTsgRGF5bGlnaHQgKGgpXCIsXG4gICAgICAgICAgbWluVmFsdWUgOiAtNSxcbiAgICAgICAgICBtYXhWYWx1ZSA6IDM1XG4gICAgICAgIH0se1xuICAgICAgICAgIHRpdGxlOiBcIlByZWNpcGl0YXRpb24gKG1tKVwiLFxuICAgICAgICAgIG1pblZhbHVlIDogLTUwLFxuICAgICAgICAgIG1heFZhbHVlIDogMzUwXG4gICAgICAgIH1dLFxuICBoQXhpczoge3RpdGxlOiBcIk1vbnRoXCJ9LFxuICBzZXJpZXNUeXBlOiBcImJhcnNcIixcbiAgc2VyaWVzOiB7XG4gICAgICAwOiB7dHlwZTogXCJsaW5lXCIsIHRhcmdldEF4aXNJbmRleDowfSxcbiAgICAgIDE6IHt0eXBlOiBcImxpbmVcIiwgdGFyZ2V0QXhpc0luZGV4OjB9LFxuICAgICAgMjoge3R5cGU6IFwibGluZVwiLCB0YXJnZXRBeGlzSW5kZXg6MH0sXG4gICAgICAzOiB7dHlwZTogXCJhcmVhXCIsIHRhcmdldEF4aXNJbmRleDoxfSxcbiAgICAgIDQ6IHt0YXJnZXRBeGlzSW5kZXg6MH1cbiAgfVxufTtcblxuZnVuY3Rpb24gY3JlYXRlKHJvb3QsIGRhdGEpIHtcbiAgJChyb290KS5odG1sKCcnKTtcblxuICB2YXIgZHQgPSBuZXcgZ29vZ2xlLnZpc3VhbGl6YXRpb24uRGF0YVRhYmxlKCk7XG4gIGR0LmFkZENvbHVtbignc3RyaW5nJywgJ01vbnRoJyk7XG4gIGR0LmFkZENvbHVtbignbnVtYmVyJywgJ01pbiBUZW1wZXJhdHVyZScpO1xuICBkdC5hZGRDb2x1bW4oJ251bWJlcicsICdNYXggVGVtcGVyYXR1cmUnKTtcbiAgZHQuYWRkQ29sdW1uKCdudW1iZXInLCAnRGV3IFBvaW50Jyk7XG4gIGR0LmFkZENvbHVtbignbnVtYmVyJywgJ1ByZWNpcGl0YXRpb24nKTtcbiAgZHQuYWRkQ29sdW1uKCdudW1iZXInLCAnUmFkaWF0aW9uJyk7XG4gIGR0LmFkZENvbHVtbignbnVtYmVyJywgJ0RheWxpZ2h0Jyk7XG5cbiAgZm9yKCB2YXIgZGF0ZSBpbiBkYXRhICkge1xuICAgICAgdmFyIG9iaiA9IGRhdGFbZGF0ZV07XG4gICAgICBkdC5hZGRSb3coW1xuICAgICAgICAgIGRhdGUrJycsXG4gICAgICAgICAgb2JqLnRtaW4gfHwgMCxcbiAgICAgICAgICBvYmoudG1heCB8fCAwLFxuICAgICAgICAgIG9iai50ZG1lYW4gfHwgMCxcbiAgICAgICAgICBvYmoucHB0IHx8IDAsXG4gICAgICAgICAgb2JqLnJhZCB8fCAwLFxuICAgICAgICAgIG9iai5kYXlsaWdodCB8fCAwXG4gICAgICBdKTtcbiAgfVxuXG4gIHZhciBjaGFydCA9IG5ldyBnb29nbGUudmlzdWFsaXphdGlvbi5Db21ib0NoYXJ0KHJvb3QpO1xuICBjaGFydC5kcmF3KGR0LCBvcHRpb25zKTtcblxuICByZXR1cm4gY2hhcnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBjcmVhdGUgOiBjcmVhdGVcbn07XG4iLCJ2YXIgYXBwID0gcmVxdWlyZSgnLi4vYXBwJyk7XG5cbi8vIGFkZCBzcHJlYWRzaGVldCB2aXogc291cmNlXG4vLyBodHRwczovL3NwcmVhZHNoZWV0cy5nb29nbGUuY29tL3RxP3RxPXNlbGVjdCUyMComa2V5PTBBdjdjVVYtbzJRUVlkSFpGWVdKTk5XcFJTMWhJVldoR1FUaGxMV1p3WldjJnVzcD1kcml2ZV93ZWIjZ2lkPTBcblxuZnVuY3Rpb24gaW5pdCgpIHtcbnZhciBkcm9wWm9uZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkcm9wX3pvbmUnKTtcbmRyb3Bab25lLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJywgX2hhbmRsZURyYWdPdmVyLCBmYWxzZSk7XG5kcm9wWm9uZS5hZGRFdmVudExpc3RlbmVyKCdkcm9wJywgX2hhbmRsZUZpbGVTZWxlY3QsIGZhbHNlKTtcblxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZpbGVzJykuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgX2hhbmRsZUZpbGVTZWxlY3QsIGZhbHNlKTtcblxuICAgICQoJyNzcHJlYWRzaGVldC13ZWF0aGVyLWlucHV0LWJ0bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgIF9oYW5kbGVHb29nbGVTcHJlYWRzaGVldCgpO1xuICAgIH0pO1xuICAgICQoJyNzcHJlYWRzaGVldC13ZWF0aGVyLWlucHV0Jykub24oJ2tleXVwJywgZnVuY3Rpb24oZSl7XG4gICAgICAgIGlmKCBlLndoaWNoID09IDEzICkgX2hhbmRsZUdvb2dsZVNwcmVhZHNoZWV0KCk7XG4gICAgfSk7XG5cbiAgICAkKCcjd2VhdGhlclJlYWRlci1sb2NhbGZpbGUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICAkKCcjd2VhdGhlclJlYWRlci1sb2NhbGZpbGUtcGFuZWwnKS50b2dnbGUoJ3Nsb3cnKTtcbiAgICB9KTtcbiAgICAkKCcjd2VhdGhlclJlYWRlci1zcHJlYWRzaGVldCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgICQoJyN3ZWF0aGVyUmVhZGVyLXNwcmVhZHNoZWV0LXBhbmVsJykudG9nZ2xlKCdzbG93Jyk7XG4gICAgfSk7XG5cbn1cblxuZnVuY3Rpb24gX2hhbmRsZUdvb2dsZVNwcmVhZHNoZWV0KCkge1xuICAgIGdhKCdzZW5kJywgJ2V2ZW50JywgJ3VpJywgJ2ludGVyYWN0aW9uJywgJ2xvYWQtd2VhdGhlci1kcml2ZS1maWxlJywgMSk7XG5cbiAgICB2YXIgdmFsID0gJCgnI3NwcmVhZHNoZWV0LXdlYXRoZXItaW5wdXQnKS52YWwoKTtcbiAgICBpZiggdmFsLmxlbmd0aCA9PSAwICkgcmV0dXJuO1xuXG4gICAgaWYoICF2YWwubWF0Y2goL15odHRwLiovICkgKSB2YWwgPSAnaHR0cHM6Ly8nK3ZhbDtcblxuICAgIHZhciBmaWxlUGFuZWwgPSBuZXcgV2VhdGhlckZpbGUoKTtcbiAgICB2YXIgcm9vdCA9ICQoXCIjZmlsZV9saXN0XCIpO1xuICAgIGZpbGVQYW5lbC5pbml0RnJvbVVybCh2YWwsIHJvb3QpO1xuICAgICQoJyNzcHJlYWRzaGVldC13ZWF0aGVyLWlucHV0JykudmFsKCcnKTtcbn1cblxuZnVuY3Rpb24gX2hhbmRsZUZpbGVTZWxlY3QoZXZ0KSB7XG4gICAgZ2EoJ3NlbmQnLCAnZXZlbnQnLCAndWknLCAnaW50ZXJhY3Rpb24nLCAnbG9hZC13ZWF0aGVyLWxvY2FsLWZpbGUnLCAxKTtcblxuICBldnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gIHZhciBmaWxlcyA9IGV2dC5kYXRhVHJhbnNmZXIgPyBldnQuZGF0YVRyYW5zZmVyLmZpbGVzIDogZXZ0LnRhcmdldC5maWxlczsgLy8gRmlsZUxpc3Qgb2JqZWN0LlxuXG4gIC8vIGZpbGVzIGlzIGEgRmlsZUxpc3Qgb2YgRmlsZSBvYmplY3RzLiBMaXN0IHNvbWUgcHJvcGVydGllcy5cbiAgdmFyIHJvb3QgPSAkKFwiI2ZpbGVfbGlzdFwiKTtcbiAgZm9yICh2YXIgaSA9IDAsIGY7IGYgPSBmaWxlc1tpXTsgaSsrKSB7XG4gICAgdmFyIGZpbGVQYW5lbCA9IG5ldyBXZWF0aGVyRmlsZSgpO1xuICAgIGZpbGVQYW5lbC5pbml0KGYsIHJvb3QpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9oYW5kbGVEcmFnT3ZlcihldnQpIHtcbmV2dC5zdG9wUHJvcGFnYXRpb24oKTtcbmV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuZXZ0LmRhdGFUcmFuc2Zlci5kcm9wRWZmZWN0ID0gJ2NvcHknOyAvLyBFeHBsaWNpdGx5IHNob3cgdGhpcyBpcyBhIGNvcHkuXG59XG5cbi8vIG9uIGFkZCwgaWYgdGhlIGxpc3QgaXMgZW1wdHksIGxldCdzIGNsb3NlIHRoZSBwb3B1cFxuZnVuY3Rpb24gX29uQ29tcGxldGUoKSB7XG4gICAgaWYoICQoXCIjZmlsZV9saXN0XCIpLmNoaWxkcmVuKCkubGVuZ3RoID09IDAgKSB7XG4gICAgICAgICQoJyN3ZWF0aGVyUmVhZGVyLW1vZGFsJykubW9kYWwoJ2hpZGUnKTtcbiAgICB9XG59XG5cbnZhciBXZWF0aGVyRmlsZSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgaGVhZGVycyA9IHtcbiAgICAgICAgZGF0ZSAgICAgOiB7XG4gICAgICAgICAgICBsYWJlbCA6ICdEYXRlJyxcbiAgICAgICAgICAgIHVuaXRzIDogJ0RhdGUnLFxuICAgICAgICAgICAgY29sICAgOiAtMVxuICAgICAgICB9LFxuICAgICAgICB0bWluICAgICA6IHtcbiAgICAgICAgICAgIGxhYmVsIDogJ01pbiBUZW1wZXJhdHVyZScsXG4gICAgICAgICAgICB1bml0cyA6ICdDJyxcbiAgICAgICAgICAgIGNvbCAgIDogLTFcbiAgICAgICAgfSxcbiAgICAgICAgdG1heCAgICAgOiB7XG4gICAgICAgICAgICBsYWJlbCA6ICdNYXggVGVtcGVyYXR1cmUnLFxuICAgICAgICAgICAgdW5pdHMgOiAnQycsXG4gICAgICAgICAgICBjb2wgICA6IC0xXG4gICAgICAgIH0sXG4gICAgICAgIHRkbWVhbiAgIDoge1xuICAgICAgICAgICAgbGFiZWwgOiAnTWVhbiBUZW1wZXJhdHVyZScsXG4gICAgICAgICAgICB1bml0cyA6ICdDJyxcbiAgICAgICAgICAgIGNvbCAgIDogLTFcbiAgICAgICAgfSxcbiAgICAgICAgcHB0ICAgICAgOiB7XG4gICAgICAgICAgICBsYWJlbCA6ICdQcmVjaXBpdGlvbicsXG4gICAgICAgICAgICB1bml0cyA6ICdtbScsXG4gICAgICAgICAgICBjb2wgICA6IC0xXG4gICAgICAgIH0sXG4gICAgICAgIHJhZCAgICAgIDoge1xuICAgICAgICAgICAgbGFiZWwgOiAnUmFkaWF0aW9uJyxcbiAgICAgICAgICAgIHVuaXRzIDogJ01KIG0tMiBkYXktMScsXG4gICAgICAgICAgICBjb2wgICA6IC0xXG4gICAgICAgIH0sXG4gICAgICAgIGRheWxpZ2h0IDoge1xuICAgICAgICAgICAgbGFuZWwgOiAnRGF5bGlnaHQgSG91cnMnLFxuICAgICAgICAgICAgdW5pdHMgOiAnaG91cnMnLFxuICAgICAgICAgICAgY29sICAgOiAtMVxuICAgICAgICB9XG4gICAgfTtcblxuXG4gIHZhciBlbGUgPSAkKCc8ZGl2IHN0eWxlPVwidGV4dC1hbGlnbjogbGVmdFwiPicrXG4gICAgICAgICAgICAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbG9zZVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPiZ0aW1lczs8L2J1dHRvbj4nK1xuICAgICAgJzxkaXYgY2xhc3M9XCJmaWxlbmFtZVwiPjwvZGl2PicrXG4gICAgICAnPGRpdiBjbGFzcz1cInByb2dyZXNzXCI+JytcbiAgICAgICc8ZGl2IGNsYXNzPVwicHJvZ3Jlc3MtYmFyXCIgcm9sZT1cInByb2dyZXNzYmFyXCIgYXJpYS12YWx1ZW5vdz1cIjBcIiBhcmlhLXZhbHVlbWluPVwiMFwiIGFyaWEtdmFsdWVtYXg9XCIxMDBcIiBzdHlsZT1cIndpZHRoOiAwJTtcIj4nK1xuICAgICAgICAnPHNwYW4gY2xhc3M9XCJzci1vbmx5XCI+MCUgQ29tcGxldGU8L3NwYW4+JytcbiAgICAgICc8L2Rpdj4nK1xuICAgICc8L2Rpdj4nK1xuICAgICAgJzxkaXYgY2xhc3M9XCJzdGF0dXNcIj4nK1xuICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiZGF0ZS1yYW5nZVwiPjwvZGl2PicrXG4gICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJwcmV2aWV3LWRhdGFcIiBzdHlsZT1cImRpc3BsYXk6bm9uZVwiPicrXG4gICAgICAgICAgICAgICAgICAgICc8ZGl2PjxhIGNsYXNzPVwiYnRuIGJ0bi1saW5rIHByZXZpZXctZGF0YS1idG5cIj5QcmV2aWV3IERhdGE8L2E+PC9kaXY+JytcbiAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJwcmV2aWV3LWRhdGEtdGFibGVcIiBzdHlsZT1cImRpc3BsYXk6bm9uZVwiPjwvZGl2PicrXG4gICAgICAgICAgICAgICAgJzwvZGl2PicrXG4gICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJjb2wtc3RhdHVzXCIgc3R5bGU9XCJkaXNwbGF5Om5vbmVcIj48L2Rpdj4nK1xuICAgICAgICAgICAgICAgICc8ZGl2IHN0eWxlPVwiaGVpZ2h0OjUwcHhcIj4nK1xuICAgICAgICAgICAgICAgICAgICAnPGEgY2xhc3M9XCJidG4gYnRuLWxpbmsgbWFwLWRhdGEtYnRuXCI+TWFwIENTViBDb2x1bW5zPC9hPicrXG4gICAgICAgICAgICAgICAgICAgICc8YSBjbGFzcz1cImJ0biBidG4tc3VjY2VzcyBkaXNhYmxlZCBwdWxsLXJpZ2h0XCI+QWRkIERhdGE8L2E+JytcbiAgICAgICAgICAgICAgICAnPC9kaXY+JytcbiAgICAgICAgICAgICc8L2Rpdj4nK1xuICAgICc8L2Rpdj4nKTtcblxuICB2YXIgZGF0YSA9IHt9O1xuICAgIHZhciBjc3ZUYWJsZSA9IFtdO1xuXG4gICAgLy8gb25seSBhdXRvIGhpZGUgdGhlIGZpcnN0IHRpbWVcbiAgICB2YXIgYXV0b0hpZGUgPSB0cnVlO1xuXG4gIC8vIHRoZSBmaWxlIHJlYWRlciBvYmplY3QgYW5kIHRoZSBlbGVtZW50XG4gIGZ1bmN0aW9uIGluaXQoZmlsZSwgcm9vdEVsZSkge1xuICAgIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgIHJlYWRlci5vbmVycm9yID0gZXJyb3JIYW5kbGVyO1xuICAgIHJlYWRlci5vbnByb2dyZXNzID0gdXBkYXRlUHJvZ3Jlc3M7XG4gICAgcmVhZGVyLm9ubG9hZHN0YXJ0ID0gZnVuY3Rpb24oZSkge307XG4gICAgcmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgIGVsZS5maW5kKCcucHJvZ3Jlc3MnKS5yZW1vdmUoKTtcbiAgICAgIHBhcnNlKGUudGFyZ2V0LnJlc3VsdCk7XG4gICAgfVxuICAgIHJlYWRlci5yZWFkQXNUZXh0KGZpbGUpXG5cbiAgICBlbGUuZmluZCgnLmZpbGVuYW1lJykuaHRtbChnZXROYW1lKGZpbGUpKTtcbiAgICByb290RWxlLmFwcGVuZChlbGUpO1xuXG4gICAgICAgIF9zZXRIYW5kbGVycygpO1xuICB9XG5cbiAgICBmdW5jdGlvbiBpbml0RnJvbVVybCh1cmwsIHJvb3RFbGUpIHtcbiAgICAgICAgdmFyIHEgPSBuZXcgZ29vZ2xlLnZpc3VhbGl6YXRpb24uUXVlcnkodXJsKTtcbiAgICAgICAgZWxlLmZpbmQoJy5wcm9ncmVzcycpLmh0bWwoJ1F1ZXJ5aW5nIHNwcmVhZHNoZWV0Li4uJyk7XG5cbiAgICAgICAgdmFyIGtleSA9IGdldEtleSh1cmwpO1xuICAgICAgICBlbGUuZmluZCgnLmZpbGVuYW1lJykuaHRtbCgnPGgzIHN0eWxlPVwiYm9yZGVyLWJvdHRvbToxcHggc29saWQgI2VlZTtwYWRkaW5nOjE1cHggMCA0cHggMFwiPjxpIGNsYXNzPVwiaWNvbi10aW50XCI+PC9pPiAnK1xuICAgICAgICAgICAgJ0dvb2dsZSBTcHJlYWRzaGVldCcrKGtleS5sZW5ndGggPiAwID8gJzxiciAvPjxzcGFuIHN0eWxlPVwiY29sb3I6Izg4ODtmb250LXNpemU6MTRweFwiPicra2V5Kyc8L3NwYW4+JyA6ICcnKSsnPC9oMz4nKTtcblxuICAgICAgICByb290RWxlLmFwcGVuZChlbGUpO1xuXG4gICAgICAgIHEuc2V0UXVlcnkoJ1NFTEVDVCAqJyk7XG4gICAgICAgIHEuc2VuZChmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgICAgICAgICBlbGUuZmluZCgnLnByb2dyZXNzJykucmVtb3ZlKCk7XG5cbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5pc0Vycm9yKCkpIHtcbiAgICAgICAgICAgICAgICBzZXRFcnJvcignRXJyb3IgaW4gcXVlcnk6ICcgKyByZXNwb25zZS5nZXRNZXNzYWdlKCkgKyAnICcgKyByZXNwb25zZS5nZXREZXRhaWxlZE1lc3NhZ2UoKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwYXJzZShkdFRvQ3N2KHJlc3BvbnNlLmdldERhdGFUYWJsZSgpKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIF9zZXRIYW5kbGVycygpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIF9zZXRIYW5kbGVycygpIHtcbiAgICAgICAgZWxlLmZpbmQoJy5tYXAtZGF0YS1idG4nKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgZWxlLmZpbmQoJy5jb2wtc3RhdHVzJykudG9nZ2xlKCdzbG93Jyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGVsZS5maW5kKCcucHJldmlldy1kYXRhLWJ0bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBlbGUuZmluZCgnLnByZXZpZXctZGF0YS10YWJsZScpLnRvZ2dsZSgnc2xvdycpO1xuICAgICAgICB9KTtcblxuICAgICAgICBlbGUuZmluZCgnLmNsb3NlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGVsZS5yZW1vdmUoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZWxlLmZpbmQoJy5idG4tc3VjY2VzcycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBhcHAuc2V0V2VhdGhlcihkYXRhKTtcbiAgICAgICAgICAgIGVsZS5yZW1vdmUoKTtcbiAgICAgICAgICAgIF9vbkNvbXBsZXRlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGR0VG9Dc3YoZHQpIHtcbiAgICAgICAgdmFyIGFyciA9IFtbXV07XG5cbiAgICAgICAgZHQgPSBKU09OLnBhcnNlKGR0LnRvSlNPTigpKTtcbiAgICAgICAgZm9yKCB2YXIgaSA9IDA7IGkgPCBkdC5jb2xzLmxlbmd0aDsgaSsrICkge1xuICAgICAgICAgICAgYXJyWzBdLnB1c2goZHQuY29sc1tpXS5sYWJlbCk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IoIHZhciBpID0gMDsgaSA8IGR0LnJvd3MubGVuZ3RoOyBpKysgKSB7XG4gICAgICAgICAgICBhcnIucHVzaChbXSk7XG4gICAgICAgICAgICBmb3IoIHZhciBqID0gMDsgaiA8IGR0LnJvd3NbaV0uYy5sZW5ndGg7IGorKyApIHtcbiAgICAgICAgICAgICAgICBpZiggIWR0LnJvd3NbaV0uY1tqXSApIGFycltpKzFdLnB1c2goJycpO1xuICAgICAgICAgICAgICAgIGVsc2UgYXJyW2krMV0ucHVzaChkdC5yb3dzW2ldLmNbal0udik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgY3N2ID0gJyc7XG4gICAgICAgIGZvciggdmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrICkge1xuICAgICAgICAgICAgY3N2ICs9IGFycltpXS5qb2luKCcsJykrJ1xcbic7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY3N2O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEtleSh1cmwpIHtcbiAgICAgICAgdmFyIHBhcnRzID0gdXJsLnNwbGl0KCc/Jyk7XG4gICAgICAgIGlmKCBwYXJ0cy5sZW5ndGggPT0gMSApIHJldHVybiAnJztcblxuICAgICAgICBwYXJ0cyA9IHBhcnRzWzFdLnNwbGl0KCcmJyk7XG4gICAgICAgIGZvciggdmFyIGkgPSAwOyBpIDwgcGFydHMubGVuZ3RoOyBpKysgKSB7XG4gICAgICAgICAgICBpZiggcGFydHNbaV0uc3BsaXQoJz0nKVswXSA9PSAna2V5JyApIHJldHVybiBwYXJ0c1tpXS5zcGxpdCgnPScpWzFdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgZnVuY3Rpb24gZ2V0TmFtZShmKSB7XG4gICAgcmV0dXJuIFsnPGgzIHN0eWxlPVwiYm9yZGVyLWJvdHRvbToxcHggc29saWQgI2VlZTtwYWRkaW5nOjE1cHggMCA0cHggMFwiPjxpIGNsYXNzPVwiaWNvbi10aW50XCI+PC9pPiAnLCBmLm5hbWUsXG4gICAgICAgICAgICAgICAgJyA8c3BhbiBzdHlsZT1cImNvbG9yOiM4ODg7Zm9udC1zaXplOjE2cHhcIj4oJywgZi50eXBlIHx8ICduL2EnLFxuICAgICAgICAgICAgICAgICcpPC9zcGFuPiAtIDxzcGFuIHN0eWxlPVwiZm9udC1zaXplOjE2cHhcIj4nLCBmLnNpemUsICcgYnl0ZXM8L3NwYW4+JywgJzwvaDM+J10uam9pbignJyk7XG4gIH1cblxuICBmdW5jdGlvbiBwYXJzZShkYXRhKSB7XG4gICAgZGF0YSA9IGRhdGEucmVwbGFjZSgvXlxccypcXG4vZywnJykuc3BsaXQoJ1xcbicpO1xuXG4gICAgdmFyIHRhYmxlID0gW107XG4gICAgZm9yKCB2YXIgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrICkge1xuICAgICAgdGFibGUucHVzaChkYXRhW2ldLnNwbGl0KCcsJykpO1xuICAgIH1cblxuICAgICAgICBpZiggdGFibGUubGVuZ3RoID09IDAgKSByZXR1cm4gc2V0RXJyb3IoJ0ZpbGUgZGlkIG5vdCBjb250YWluIGFueSBpbmZvcm1hdGlvbi4nKTtcbiAgICAgICAgY3N2VGFibGUgPSB0YWJsZTtcblxuICAgICAgICBwYXJzZUhlYWRlcih0YWJsZVswXSk7XG4gICAgICAgIGdldERhdGVSYW5nZSgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldERhdGVSYW5nZSgpIHtcbiAgICAgICAgZWxlLmZpbmQoJy5kYXRlLXJhbmdlJykuaHRtbCgnJyk7XG4gICAgICAgIGlmKCBoZWFkZXJzLmRhdGUuY29sID09IC0xICkgcmV0dXJuIGVsZS5maW5kKCcuZGF0ZS1yYW5nZScpLmh0bWwoJ0RhdGUgY29sdW1uIG5lZWRzIHRvIGJlIG1hdGNoZWQuJyk7XG4gICAgICAgIGlmKCB0eXBlb2YgaGVhZGVycy5kYXRlLmNvbCA9PSAnc3RyaW5nJyApIGhlYWRlcnMuZGF0ZS5jb2wgPSBwYXJzZUludChoZWFkZXJzLmRhdGUuY29sKTtcblxuICAgICAgICB2YXIgZGF0ZXMgPSB7fTtcbiAgICAgICAgdmFyIGRpc3BsYXlEYXRlcyA9IFtdO1xuICAgICAgICBmb3IoIHZhciBpID0gMTsgaSA8IGNzdlRhYmxlLmxlbmd0aDsgaSsrICkge1xuICAgICAgICAgICAgaWYoIGhlYWRlcnMuZGF0ZS5jb2wgPCBjc3ZUYWJsZVtpXS5sZW5ndGggJiYgY3N2VGFibGVbaV0ubGVuZ3RoID49IDcgKcKge1xuICAgICAgICAgICAgICAgIHZhciBwID0gY3N2VGFibGVbaV1baGVhZGVycy5kYXRlLmNvbF0uc3BsaXQoXCItXCIpO1xuICAgICAgICAgICAgICAgIGlmKCBwLmxlbmd0aCAhPSAzICYmIHAubGVuZ3RoICE9IDIgKSByZXR1cm4gc2V0RXJyb3IoXCJEYXRlOiBcIitjc3ZUYWJsZVtpXVtoZWFkZXJzLmRhdGUuY29sXStcIiBpcyBub3QgYSB2YWxpZCBmb3JtYXQgKHl5eXktbW0tZGQgb3IgeXl5eS1tbSlcIik7XG5cbiAgICAgICAgICAgICAgICBpZiggIWRhdGVzW3BbMF1dICkgZGF0ZXNbcFswXV0gPSBbXTtcbiAgICAgICAgICAgICAgICB2YXIgbW1kZCA9IHBbMV07XG5cbiAgICAgICAgICAgICAgICBpZiggZGF0ZXNbcFswXV0uaW5kZXhPZihtbWRkKSAhPSAtMSApIHJldHVybiBzZXRFcnJvcihcIkRhdGU6IFwiK2NzdlRhYmxlW2ldW2hlYWRlcnMuZGF0ZS5jb2xdK1wiIGlzIGluIGRhdGFzZXQgdHdpY2VcIik7XG4gICAgICAgICAgICAgICAgZGF0ZXNbcFswXV0ucHVzaChtbWRkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZvciggdmFyIHllYXIgaW4gZGF0ZXMgKSB7XG4gICAgICAgICAgICBpZiggZGF0ZXNbeWVhcl0ubGVuZ3RoID09IDEyKSB7XG4gICAgICAgICAgICAgICAgZGlzcGxheURhdGVzLnB1c2goeWVhcik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRpc3BsYXlEYXRlcy5wdXNoKHllYXIrJyBbJytkYXRlc1t5ZWFyXS5qb2luKCcsICcpKyddJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBlbGUuZmluZCgnLmRhdGUtcmFuZ2UnKS5odG1sKCc8Yj5EYXRlIFJhbmdlOjwvYj4gJytkaXNwbGF5RGF0ZXMuam9pbignLCAnKSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VIZWFkZXIoaGVhZGVyUm93KSB7XG4gICAgICAgIHZhciBtYXRjaGVkID0gW107XG5cbiAgICAgICAgdmFyIGh0bWwgPSAnPHRhYmxlIGNsYXNzPVwidGFibGUgdGFibGUtc3RyaXBlZFwiPic7XG4gICAgICAgIGh0bWwgKz0gJzx0cj48dGg+S2V5PC90aD48dGg+Q29sdW1uICM8L3RoPjwvdHI+JztcblxuICAgICAgICBmb3IoIHZhciBrZXkgaW4gaGVhZGVycyApIHtcbiAgICAgICAgICAgIGlmKCBoZWFkZXJSb3cuaW5kZXhPZihrZXkpICE9IC0xICkge1xuICAgICAgICAgICAgICAgIGhlYWRlcnNba2V5XS5jb2wgPSBoZWFkZXJSb3cuaW5kZXhPZihrZXkpO1xuICAgICAgICAgICAgICAgIG1hdGNoZWQucHVzaChrZXkpO1xuICAgICAgICAgICAgICAgIGh0bWwgKz0gJzx0cj48dGQ+JytrZXkrJzwvdGQ+PHRkPjxzcGFuIGNsYXNzPVwibGFiZWwgbGFiZWwtc3VjY2Vzc1wiPicraGVhZGVyc1trZXldLmNvbCsnIDxpIGNsYXNzPVwiaWNvbi1va1wiPjwvaT48L3NwYW4+PC90ZD48L3RyPic7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGh0bWwgKz0gJzx0cj48dGQ+JytrZXkrJzwvdGQ+PHRkPjxzZWxlY3QgY2xhc3M9XCJzZWxlY3QtJytrZXkrJ1wiXCI+PC9zZWxlY3Q+PC90ZD48L3RyPic7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxlLmZpbmQoJy5jb2wtc3RhdHVzJykuaHRtbChodG1sKyc8L3RhYmxlPicpO1xuXG5cbiAgICAgICAgaWYoIG1hdGNoZWQubGVuZ3RoICE9IDcgKSB7XG4gICAgICAgICAgICAvLyBjcmVhdGUgc2VsZWN0IGVsZW1lbnQgZm9yIG1pc3NpbmcgY29sJ3NcbiAgICAgICAgICAgIGVsZS5maW5kKCcuc3RhdHVzIHNlbGVjdCcpLmFwcGVuZCgkKCc8b3B0aW9uIHZhbHVlPVwiXCI+W1NlbGVjdCBDb2x1bW5dPC9vcHRpb24+JykpO1xuXG4gICAgICAgICAgICAvLyBpZiBpdCdzIHJhZGlhdGlvbiwgYWRkIG9wdGlvbiBmb3IgY2FsY3VsYXRpbmdcbiAgICAgICAgICAgIC8vIFRPRE9cblxuICAgICAgICAgICAgLy8gYXBwZW5kIG1pc3NpbmcgY29sc1xuICAgICAgICAgICAgZm9yKCB2YXIgaSA9IDA7IGkgPCBoZWFkZXJSb3cubGVuZ3RoOyBpKysgKSB7XG4gICAgICAgICAgICAgICAgaWYoIG1hdGNoZWQuaW5kZXhPZihoZWFkZXJSb3dbaV0pID09IC0xICkge1xuICAgICAgICAgICAgICAgICAgICBlbGUuZmluZCgnLnN0YXR1cyBzZWxlY3QnKS5hcHBlbmQoJCgnPG9wdGlvbiB2YWx1ZT1cIicraSsnXCI+JytpKycgLSAnK2hlYWRlclJvd1tpXSsnPC9vcHRpb24+JykpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gc2V0IHRoZSBjaGFuZ2UgaGFuZGxlcnMgZm9yIHRoZSBzZWxlY3RvcnNcbiAgICAgICAgICAgIGVsZS5maW5kKCcuc3RhdHVzIHNlbGVjdCcpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS5maW5kKCdvcHRpb246c2VsZWN0ZWQnKS5hdHRyKCd2YWx1ZScpO1xuICAgICAgICAgICAgICAgIGlmKCB2YWwgIT0gJycgKSBoZWFkZXJzW3RoaXMuY2xhc3NOYW1lLnJlcGxhY2UoL3NlbGVjdC0vLCcnKV0uY29sID0gdmFsO1xuXG4gICAgICAgICAgICAgICAgLy8gaWYgYWxsIGNvbHVtbnMgYXJlIHNldCwgcmVtb3ZlIGRpc2FibGVkIGZyb20gYnRuXG4gICAgICAgICAgICAgICAgdmFyIHJlYWR5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBmb3IoIHZhciBrZXkgaW4gaGVhZGVycyApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYoIGhlYWRlcnNba2V5XS5jb2wgPT0gLTEgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWFkeSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiggcmVhZHkgKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKCBhdXRvSGlkZSApIGVsZS5maW5kKCcuY29sLXN0YXR1cycpLmhpZGUoJ3Nsb3cnKTtcbiAgICAgICAgICAgICAgICAgICAgb25SZWFkeSgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGEgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgZWxlLmZpbmQoJy5idG4tc3VjY2VzcycpLmFkZENsYXNzKCdkaXNhYmxlZCcpO1xuICAgICAgICAgICAgICAgICAgICBlbGUuZmluZCgnLnByZXZpZXctZGF0YScpLmhpZGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gc2hvdyB0aGUgdGFibGVcbiAgICAgICAgICAgIGVsZS5maW5kKCcuY29sLXN0YXR1cycpLnNob3coJ3Nsb3cnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG9uUmVhZHkoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uUmVhZHkoKSB7XG4gICAgICAgIGF1dG9IaWRlID0gZmFsc2U7XG4gICAgICAgIGVsZS5maW5kKCcuYnRuLXN1Y2Nlc3MnKS5yZW1vdmVDbGFzcygnZGlzYWJsZWQnKTtcbiAgICAgICAgc2V0RGF0YSgpO1xuICAgICAgICBzZXRQcmV2aWV3KCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0UHJldmlldygpIHtcbiAgICAgICAgZWxlLmZpbmQoJy5wcmV2aWV3LWRhdGEnKS5zaG93KCk7XG5cbiAgICAgICAgdmFyIGh0bWwgPSAnPHRhYmxlIGNsYXNzPVwidGFibGUgdGFibGUtc3RyaXBlZFwiPjx0cj48dGg+ZGF0ZTwvdGg+JztcbiAgICAgICAgZm9yKCB2YXIga2V5IGluIGhlYWRlcnMgKXtcbiAgICAgICAgICAgIGlmKCBrZXkgPT0gJ2RhdGUnICkgY29udGludWU7XG4gICAgICAgICAgICBodG1sICs9ICc8dGg+JytrZXkrJzwvdGg+JztcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBjID0gMDtcbiAgICAgICAgZm9yKCB2YXIgZGF0ZSBpbiBkYXRhICl7XG4gICAgICAgICAgICBpZiggYyA9PSAxMCApIHtcbiAgICAgICAgICAgICAgICBodG1sICs9ICc8dHI+PHRkIGNvbHNwYW49XCI3XCIgc3R5bGU9XCJ0ZXh0LWFsaWduOmNlbnRlclwiPi4uLjwvdGQ+PC90cj4nO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBodG1sICs9ICc8dHI+PHRkPicrZGF0ZSsnPC90ZD4nO1xuICAgICAgICAgICAgZm9yKCB2YXIga2V5IGluIGhlYWRlcnMgKXtcbiAgICAgICAgICAgICAgICBpZigga2V5ID09ICdkYXRlJyApIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGh0bWwgKz0gJzx0ZD4nK2RhdGFbZGF0ZV1ba2V5XSsnPC90ZD4nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaHRtbCArPSAnPC90cj4nO1xuXG4gICAgICAgICAgICBjKys7XG4gICAgICAgIH1cblxuICAgICAgICBlbGUuZmluZCgnLnByZXZpZXctZGF0YS10YWJsZScpLmh0bWwoaHRtbCk7XG4gICAgfVxuXG4gIC8vIHNldCB0aGUgbWFwIG9mIGNzdiBoZWFkZXJzXG4gIGZ1bmN0aW9uIHNldERhdGEoKSB7XG4gICAgICAgIGRhdGEgPSB7fTtcbiAgICAgICAgZm9yKCB2YXIgaSA9IDE7IGkgPCBjc3ZUYWJsZS5sZW5ndGg7IGkrKyApIHtcbiAgICAgICAgICAgIGlmKCBjc3ZUYWJsZVtpXS5sZW5ndGggPCA3ICkgY29udGludWU7IC8vIGJhZCByb3dcblxuICAgICAgICAgICAgdmFyIGRhdGUgPSBjc3ZUYWJsZVtpXVtoZWFkZXJzLmRhdGUuY29sXTtcblxuICAgICAgICAgICAgaWYoICFkYXRlICkgY29udGludWU7IC8vIGJhZCByb3dcblxuICAgICAgICAgICAgaWYoIGRhdGUuc3BsaXQoJy0nKS5sZW5ndGggPT0gMyApIGRhdGUgPSBkYXRlLnNwbGl0KFwiLVwiKS5zcGxpY2UoMCwyKS5qb2luKFwiLVwiKTtcbiAgICAgICAgICAgIGRhdGFbZGF0ZV0gPSB7fTtcblxuICAgICAgICAgICAgZm9yKCB2YXIga2V5IGluIGhlYWRlcnMgKSB7XG4gICAgICAgICAgICAgICAgaWYoIGtleSA9PSAnZGF0ZScgKSBjb250aW51ZTtcblxuICAgICAgICAgICAgICAgIGRhdGFbZGF0ZV1ba2V5XSA9IHBhcnNlRmxvYXQoY3N2VGFibGVbaV1baGVhZGVyc1trZXldLmNvbF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVQcm9ncmVzcyhldnQpIHtcbiAgICAvLyBldnQgaXMgYW4gUHJvZ3Jlc3NFdmVudC5cbiAgICBpZiAoZXZ0Lmxlbmd0aENvbXB1dGFibGUpIHtcbiAgICAgICAgdmFyIHBlcmNlbnRMb2FkZWQgPSBNYXRoLnJvdW5kKChldnQubG9hZGVkIC8gZXZ0LnRvdGFsKSAqIDEwMCk7XG4gICAgICAgIGVsZS5maW5kKCcucHJvZ3Jlc3MtYmFyJykuYXR0cignYXJpYS12YWx1ZW5vdycscGVyY2VudExvYWRlZCkud2lkdGgocGVyY2VudExvYWRlZCtcIiVcIik7XG4gICAgICAgIGVsZS5maW5kKCcuc3Itb25seScpLmh0bWwoTWF0aC5jZWlsKHBlcmNlbnRMb2FkZWQpKyclIENvbXBsZXRlJyk7XG4gICAgfVxufVxuXG4gIGZ1bmN0aW9uIGVycm9ySGFuZGxlcihldnQpIHtcbiAgICBzd2l0Y2goZXZ0LnRhcmdldC5lcnJvci5jb2RlKSB7XG4gICAgICBjYXNlIGV2dC50YXJnZXQuZXJyb3IuTk9UX0ZPVU5EX0VSUjpcbiAgICAgICAgc2V0RXJyb3IoJ0ZpbGUgTm90IEZvdW5kIScpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgZXZ0LnRhcmdldC5lcnJvci5OT1RfUkVBREFCTEVfRVJSOlxuICAgICAgICBzZXRFcnJvcignRmlsZSBpcyBub3QgcmVhZGFibGUnKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGV2dC50YXJnZXQuZXJyb3IuQUJPUlRfRVJSOlxuICAgICAgICBicmVhazsgLy8gbm9vcFxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgc2V0RXJyb3IoJ0FuIGVycm9yIG9jY3VycmVkIHJlYWRpbmcgdGhpcyBmaWxlLicpO1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBzZXRFcnJvcihtc2cpIHtcbiAgICAgIGVsZS5maW5kKCcuc3RhdHVzJykuaHRtbCgnPGRpdiBjbGFzcz1cImFsZXJ0IGFsZXJ0LWRhbmdlclwiPicrbXNnKyc8L2Rpdj4nKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgaW5pdCA6IGluaXQsXG4gICAgaW5pdEZyb21VcmwgOiBpbml0RnJvbVVybFxuICB9O1xuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgaW5pdCA6IGluaXRcbn07XG4iLCJ2YXIgY29uZmlnID0gcmVxdWlyZSgnLi4vY29uZmlnJyk7XG5cbi8vIG1ha2Ugc3VyZSBhbGwgdGhlIHdlYXRoZXIgaXMgc2V0LiAgIzEgdGhpbmcgcGVvcGxlIHdpbGwgbWVzcyB1cFxuZnVuY3Rpb24gY2hlY2sobW9kZWwpIHtcbiAgLy8gZmlyc3QgZ2V0IGN1cnJlbnQgbW9udGhzIHdlIGFyZSBnb2luZyB0byBydW4sXG4gIHZhciBzdGFydCA9ICQoXCIjaW5wdXQtbWFuYWdlLWRhdGVQbGFudGVkXCIpLnZhbCgpO1xuXG4gIHZhciBlbmQgPSAkKFwiI2lucHV0LW1hbmFnZS1kYXRlRmluYWxIYXJ2ZXN0XCIpLnZhbCgpLnNwbGl0KFwiLVwiKTtcbiAgdmFyIGVNb250aCA9IHBhcnNlSW50KGVuZFsxXSk7XG4gIHZhciBlWWVhciA9IHBhcnNlSW50KGVuZFswXSk7XG5cbiAgdmFyIGNEYXRlID0gbmV3IERhdGUoc3RhcnQpO1xuXG4gIC8vIG5vdyBzZWUgaWYgd2UgaGF2ZSBjdXN0b20gd2VhdGhlciBjb3ZlcmFnZVxuICB2YXIgaGFzQ292ZXJhZ2UgPSB0cnVlO1xuICB2YXIgY291bnQgPSAwO1xuICB3aGlsZSggY291bnQgPCAxMDAwMCApIHtcbiAgICAgIGlmKCAhbW9kZWwuY3VzdG9tX3dlYXRoZXIgKSB7XG4gICAgICAgICAgaGFzQ292ZXJhZ2UgPSBmYWxzZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgdmFyIG0gPSAoY0RhdGUuZ2V0TW9udGgoKSsxKSsnJztcbiAgICAgIHZhciB5ID0gY0RhdGUuZ2V0RnVsbFllYXIoKTtcbiAgICAgIGlmKCBtLmxlbmd0aCA9PSAxICkgbSA9ICcwJyttO1xuXG4gICAgICBpZiggY0RhdGUuZ2V0TW9udGgoKSsxID09IGVNb250aCAmJiB5ID09IGVZZWFyICkge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfSBlbHNlIGlmKCAhbW9kZWwuY3VzdG9tX3dlYXRoZXJbeSsnLScrbV0gKSB7XG4gICAgICAgICAgaGFzQ292ZXJhZ2UgPSBmYWxzZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgY0RhdGUuc2V0TW9udGgoY0RhdGUuZ2V0TW9udGgoKSsxKTtcbiAgICAgIGNvdW50Kys7XG4gIH1cblxuICBpZiggaGFzQ292ZXJhZ2UgKSByZXR1cm4gdHJ1ZTtcblxuICAvLyBpZiBub3QgbWFrZSBzdXJlIHdlIGhhdmUgYXZlcmFnZXMgc2VsZWN0ZWRcbiAgZm9yICggdmFyIGkgPSAwOyBpIDwgMTI7IGkrKykge1xuICAgIHZhciBtID0gKGkrMSkrJyc7XG4gICAgaWYoIG0ubGVuZ3RoID09IDEgKSBtID0gJzAnK207XG5cbiAgICAgIGZvciAoIHZhciBqID0gMTsgaiA8IGNvbmZpZy5pbnB1dHMud2VhdGhlci5sZW5ndGg7IGorKykge1xuICAgICAgICAgIHZhciBjID0gY29uZmlnLmlucHV0cy53ZWF0aGVyW2pdO1xuICAgICAgICAgIHZhciB2YWwgPSBwYXJzZUZsb2F0KCQoXCIjaW5wdXQtd2VhdGhlci1cIiArIGMgKyBcIi1cIiArIG0pLnZhbCgpKTtcbiAgICAgICAgICBpZiggIXZhbCAmJiB2YWwgIT09IDAgKSB7XG4gICAgICAgICAgICAgIGFsZXJ0KFwiTWlzc2luZyB3ZWF0aGVyIGRhdGE6IFwiK2MrXCIgZm9yIG1vbnRoIFwiK20rXCJcXG5cXG5cIitcbiAgICAgICAgICAgICAgICAgICAgXCJEaWQgeW91IHNlbGVjdCBhIGxvY2F0aW9uIChTZXR1cCkgYW5kL29yIGFyZSBhbGwgd2VhdGhlci9zb2lsIGZpZWxkcyBmaWxsZWQgb3V0P1wiKTtcbiAgICAgICAgICAgICAgJChcIiNydW5idG4sICNydW5idG4tc21cIikucmVtb3ZlQ2xhc3MoXCJkaXNhYmxlZFwiKS5odG1sKFwiPGkgY2xhc3M9J2ljb24tcGxheSc+PC9pPiBSdW5cIik7XG4gICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gc2V0KG1vZGVsLCBkYXRhKSB7XG4gIGlmKCAhbW9kZWwuY3VzdG9tX3dlYXRoZXIgKSBtb2RlbC5jdXN0b21fd2VhdGhlciA9IHt9O1xuXG4gIGlmKCBkYXRhICkge1xuICAgICAgZm9yKCB2YXIga2V5IGluIGRhdGEgKSB7XG5cbiAgICAgICAgICAvLyBjbGVhbiB1cCBkYXRlIGZvcm1hdFxuICAgICAgICAgIHZhciBkYXRlID0ga2V5LnJlcGxhY2UoL1teXFxkLV0vLCcnKTtcbiAgICAgICAgICB2YXIgcGFydHMgPSBkYXRlLnNwbGl0KCctJyk7XG5cbiAgICAgICAgICBpZiggcGFydHMubGVuZ3RoIDwgMiApIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGFsZXJ0KCdJbnZhbGlkIERhdGUgRm9ybWF0LiAgRGF0ZXMgc2hvdWxkIGJlIGluIFlZWVktTU0gZm9ybWF0Jyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICggcGFydHNbMV0ubGVuZ3RoICE9IDIgKSB7XG4gICAgICAgICAgICAgIGRhdGUgPSBwYXJ0c1swXStcIi0wXCIrcGFydHNbMV07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbW9kZWwuY3VzdG9tX3dlYXRoZXJbZGF0ZV0gPSBkYXRhW2tleV07XG4gICAgICB9XG4gIH1cblxuICAvLyBjcmVhdGUgYXJyYXkgc28gd2UgY2FuIHNvcnRcbiAgdmFyIGFyciA9IFtdO1xuICB2YXIgaGVhZGVycyA9IFsnZGF0ZSddO1xuICBmb3IoIHZhciBkYXRlIGluIG1vZGVsLmN1c3RvbV93ZWF0aGVyICkge1xuXG4gICAgICB2YXIgdCA9IFtkYXRlXTtcbiAgICAgIGZvciggdmFyIGtleSBpbiBtb2RlbC5jdXN0b21fd2VhdGhlcltkYXRlXSApIHtcbiAgICAgICAgICBpZigga2V5ID09ICducmVsJyApIGNvbnRpbnVlO1xuICAgICAgICAgIGlmKCBhcnIubGVuZ3RoID09PSAwICkgaGVhZGVycy5wdXNoKGtleSk7XG4gICAgICAgICAgdC5wdXNoKG1vZGVsLmN1c3RvbV93ZWF0aGVyW2RhdGVdW2tleV0pO1xuICAgICAgfVxuXG4gICAgICBhcnIucHVzaCh0KTtcbiAgfVxuXG4gIGlmKCBhcnIubGVuZ3RoID09PSAwICkge1xuICAgICAgJCgnI2N1c3RvbS13ZWF0aGVyLXBhbmVsJykuaHRtbChcIk5vIHdlYXRoZXIgZGF0YSBoYXMgYmVlbiB1cGxvYWRlZC5cIik7XG4gICAgICByZXR1cm47XG4gIH1cblxuICB2YXIgaHRtbCA9ICc8ZGl2IHN0eWxlPVwib3ZlcmZsb3c6YXV0bzttYXgtaGVpZ2h0OjYwMHB4XCI+PHRhYmxlIGNsYXNzPVwidGFibGUgdGFibGUtc3RyaXBlZFwiPjx0cj4nO1xuXG4gIGFyci5zb3J0KGZ1bmN0aW9uKGEsIGIpe1xuICAgICAgdmFyIGQxID0gbmV3IERhdGUoYVswXStcIi0wMVwiKS5nZXRUaW1lKCk7XG4gICAgICB2YXIgZDIgPSBuZXcgRGF0ZShiWzBdK1wiLTAxXCIpLmdldFRpbWUoKTtcblxuICAgICAgaWYoIGQxIDwgZDIgKSB7XG4gICAgICAgICAgcmV0dXJuIDE7XG4gICAgICB9IGVsc2UgaWYoIGQxID4gZDIgKSB7XG4gICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gMDtcbiAgfSk7XG5cbiAgZm9yKCB2YXIgaSA9IDA7IGkgPCBoZWFkZXJzLmxlbmd0aDsgaSsrICkge1xuICAgICAgaHRtbCArPSAnPHRoPicraGVhZGVyc1tpXSsnPC90aD4nO1xuICB9XG4gIGh0bWwgKz0gJzwvdHI+JztcblxuICBmb3IoIHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKyApIHtcbiAgICAgIGh0bWwgKz0gJzx0cj48dGQ+JythcnJbaV0uam9pbignPC90ZD48dGQ+JykrJzwvdGQ+PC90cj4nO1xuICB9XG5cbiAgJCgnI2N1c3RvbS13ZWF0aGVyLXBhbmVsJykuaHRtbChodG1sKyc8L3RhYmxlPjwvZGl2PjxkaXYgaWQ9XCJjdXN0b20td2VhdGhlci1jaGFydFwiPjwvZGl2PicpO1xuXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgIHdlYXRoZXJDdXN0b21DaGFydCA9IGNoYXJ0cy5jcmVhdGVXZWF0aGVyQ2hhcnQoJCgnI2N1c3RvbS13ZWF0aGVyLWNoYXJ0JylbMF0sIG1vZGVsLmN1c3RvbV93ZWF0aGVyKTtcbiAgfSwgMTAwMCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBzZXQgOiBzZXQsXG4gIGNoZWNrIDogY2hlY2tcbn07XG4iXX0=
