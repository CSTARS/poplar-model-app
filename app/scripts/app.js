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

var daysToRun = function() {
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
  return days <= 0 ? 1 : days;
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


          var days = daysToRun();

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

  var days = daysToRun();

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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9wb3BsYXItM3BnLW1vZGVsL2luZGV4LmpzIiwiLi4vcG9wbGFyLTNwZy1tb2RlbC9saWIvZGF0YU1vZGVsL2NvbnN0YW50cy9pbmRleC5qcyIsIi4uL3BvcGxhci0zcGctbW9kZWwvbGliL2RhdGFNb2RlbC9pbmRleC5qcyIsIi4uL3BvcGxhci0zcGctbW9kZWwvbGliL2RhdGFNb2RlbC9tYW5hZ2UvaW5kZXguanMiLCIuLi9wb3BsYXItM3BnLW1vZGVsL2xpYi9kYXRhTW9kZWwvcGxhbnRhdGlvbi9pbmRleC5qcyIsIi4uL3BvcGxhci0zcGctbW9kZWwvbGliL2RhdGFNb2RlbC9wbGFudGF0aW9uX3N0YXRlL2luZGV4LmpzIiwiLi4vcG9wbGFyLTNwZy1tb2RlbC9saWIvZGF0YU1vZGVsL3NvaWwvaW5kZXguanMiLCIuLi9wb3BsYXItM3BnLW1vZGVsL2xpYi9kYXRhTW9kZWwvdHJlZS9jb25kdWN0YW5jZS5qcyIsIi4uL3BvcGxhci0zcGctbW9kZWwvbGliL2RhdGFNb2RlbC90cmVlL2ZhZ2UuanMiLCIuLi9wb3BsYXItM3BnLW1vZGVsL2xpYi9kYXRhTW9kZWwvdHJlZS9mdC5qcyIsIi4uL3BvcGxhci0zcGctbW9kZWwvbGliL2RhdGFNb2RlbC90cmVlL2luZGV4LmpzIiwiLi4vcG9wbGFyLTNwZy1tb2RlbC9saWIvZGF0YU1vZGVsL3RyZWUvaW50Y3B0bi5qcyIsIi4uL3BvcGxhci0zcGctbW9kZWwvbGliL2RhdGFNb2RlbC90cmVlL2xpdHRlcmZhbGwuanMiLCIuLi9wb3BsYXItM3BnLW1vZGVsL2xpYi9kYXRhTW9kZWwvdHJlZS9wZnMuanMiLCIuLi9wb3BsYXItM3BnLW1vZGVsL2xpYi9kYXRhTW9kZWwvdHJlZS9wci5qcyIsIi4uL3BvcGxhci0zcGctbW9kZWwvbGliL2RhdGFNb2RlbC90cmVlL3Jvb3RwLmpzIiwiLi4vcG9wbGFyLTNwZy1tb2RlbC9saWIvZGF0YU1vZGVsL3RyZWUvc2xhLmpzIiwiLi4vcG9wbGFyLTNwZy1tb2RlbC9saWIvZGF0YU1vZGVsL3dlYXRoZXIvaW5kZXguanMiLCIuLi9wb3BsYXItM3BnLW1vZGVsL2xpYi9mbi5qcyIsIi4uL3BvcGxhci0zcGctbW9kZWwvbGliL2lvLmpzIiwiLi4vcG9wbGFyLTNwZy1tb2RlbC9saWIvcnVuLmpzIiwiLi4vcG9wbGFyLTNwZy1tb2RlbC9saWIvdXRpbHMuanMiLCIuLi9wb3BsYXItM3BnLW1vZGVsL2xpYi92YWxpZGF0ZS5qcyIsImpzbGliL2FwcC5qcyIsImpzbGliL2NoYXJ0cy5qcyIsImpzbGliL2NvbmZpZy5qcyIsImpzbGliL2ZsYXNoYmxvY2stZGV0ZWN0b3IuanMiLCJqc2xpYi9nb29nbGVEcml2ZS9leHBvcnRUb0Nzdi5qcyIsImpzbGliL2dvb2dsZURyaXZlL2luZGV4LmpzIiwianNsaWIvZ29vZ2xlRHJpdmUvcmVhbHRpbWUuanMiLCJqc2xpYi9pbnB1dEZvcm0uanMiLCJqc2xpYi9tb2RlbFJ1bkhhbmRsZXIuanMiLCJqc2xpYi9vYXV0aC5qcyIsImpzbGliL29mZmxpbmUuanMiLCJqc2xpYi9vdXRwdXQvZGVmaW5pdGlvbnMuanMiLCJqc2xpYi9vdXRwdXQvcmF3LmpzIiwianNsaWIvdXRpbHMuanMiLCJqc2xpYi93ZWF0aGVyL2NoYXJ0LmpzIiwianNsaWIvd2VhdGhlci9maWxlUmVhZGVyLmpzIiwianNsaWIvd2VhdGhlci9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcExBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZlQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1WUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hhQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzkrQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcFZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3piQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN1FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBpbyA9IHJlcXVpcmUoJy4vbGliL2lvJyk7XG52YXIgcnVuID0gcmVxdWlyZSgnLi9saWIvcnVuJykoaW8pO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gcnVuO1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZGVzY3JpcHRpb246IFwiVGhlc2UgYXJlIGNvbnN0YW50cy5cIixcbiAgICB2YWx1ZToge1xuICAgICAgICBhc2NlX2V0cl93aW5kc3BlZWQgOiB7XG4gICAgICAgICAgICB2YWx1ZTogMixcbiAgICAgICAgICAgIHVuaXRzOiBcIm0vc1wiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiRGVmYXVsdCBXaW5kIFNwZWVkIHVzZWQgdG8gY2FsY3VsYXRlIEVUciAoYW5kIHJlc3VsdGFudCBLYykgZm9yIE1vZGVsLlwiXG4gICAgICAgIH0sXG4gICAgICAgIGRheXNfcGVyX21vbnRoOiB7XG4gICAgICAgICAgICB2YWx1ZTogMzAuNCxcbiAgICAgICAgICAgIHVuaXRzOiBcImRheXMvbW9cIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIk51bWJlciBvZiBEYXlzIGluIGFuIGF2ZXJhZ2UgbW9udGhcIlxuICAgICAgICB9LFxuICAgICAgICBlMjA6IHtcbiAgICAgICAgICAgIHZhbHVlOiAyLjIsXG4gICAgICAgICAgICB1bml0czogXCJ2cC90XCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJSYXRlIG9mIGNoYW5nZSBvZiBzYXR1cmF0ZWQgVlAgd2l0aCBUIGF0IDIwQ1wiXG4gICAgICAgIH0sXG4gICAgICAgIHJob0Fpcjoge1xuICAgICAgICAgICAgdmFsdWU6IDEuMixcbiAgICAgICAgICAgIHVuaXRzOiBcImtnL21eM1wiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiRGVuc2l0eSBvZiBhaXJcIlxuICAgICAgICB9LFxuICAgICAgICBsYW1iZGE6IHtcbiAgICAgICAgICAgIHZhbHVlOiAyNDYwMDAwLFxuICAgICAgICAgICAgdW5pdHM6IFwiSi9rZ1wiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiTGF0ZW50IGhlYXQgb2YgdmFwb3VyaXNhdGlvbiBvZiBoMm9cIlxuICAgICAgICB9LFxuICAgICAgICBWUERjb252OiB7XG4gICAgICAgICAgICB2YWx1ZTogMC4wMDA2MjIsXG4gICAgICAgICAgICB1bml0czogXCJcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkNvbnZlcnQgVlBEIHRvIHNhdHVyYXRpb24gZGVmaWNpdCA9IDE4LzI5LzEwMDBcIlxuICAgICAgICB9LFxuICAgICAgICBRYToge1xuICAgICAgICAgICAgdmFsdWU6IC05MCxcbiAgICAgICAgICAgIHVuaXRzOiBcIlcvbV4yXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJJbnRlcmNlcHQgb2YgbmV0IHJhZGlhdGlvbiB2ZXJzdXMgc29sYXIgcmFkaWF0aW9uIHJlbGF0aW9uc2hpcFwiXG4gICAgICAgIH0sXG4gICAgICAgIFFiOiB7XG4gICAgICAgICAgICB2YWx1ZTogMC44LFxuICAgICAgICAgICAgdW5pdHM6IFwidW5pdGxlc3NcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcInNsb3BlIG9mIG5ldCB2cy4gc29sYXIgcmFkaWF0aW9uIHJlbGF0aW9uc2hpcFwiXG4gICAgICAgIH0sXG4gICAgICAgIGdETV9tb2w6IHtcbiAgICAgICAgICAgIHZhbHVlOiAyNCxcbiAgICAgICAgICAgIHVuaXRzOiBcImcvbW9sKEMpXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJNb2xlY3VsYXIgd2VpZ2h0IG9mIGRyeSBtYXR0ZXJcIlxuICAgICAgICB9LFxuICAgICAgICBtb2xQQVJfTUo6IHtcbiAgICAgICAgICAgIHZhbHVlOiAyLjMsXG4gICAgICAgICAgICB1bml0czogXCJtb2woQykvTUpcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkNvbnZlcnNpb24gb2Ygc29sYXIgcmFkaWF0aW9uIHRvIFBBUlwiXG4gICAgICAgIH1cbiAgICB9XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIHRyZWUgOiByZXF1aXJlKCcuL3RyZWUnKSxcbiAgcGxhbnRhdGlvbiA6IHJlcXVpcmUoJy4vcGxhbnRhdGlvbicpLFxuICBwbGFudGF0aW9uX3N0YXRlIDogcmVxdWlyZSgnLi9wbGFudGF0aW9uX3N0YXRlJyksXG4gIHNvaWwgOiByZXF1aXJlKCcuL3NvaWwnKSxcbiAgd2VhdGhlciA6IHJlcXVpcmUoJy4vd2VhdGhlcicpLFxuICBtYW5hZ2UgOiByZXF1aXJlKCcuL21hbmFnZScpLFxuICBjb25zdGF0cyA6IHJlcXVpcmUoJy4vY29uc3RhbnRzJylcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgZGVzY3JpcHRpb24gOiBcIkNyb3AgTWFuYWdlbWVudCBQYXJhbWV0ZXJzXCIsXG4gIHZhbHVlIDoge1xuICAgIGlycmlnRnJhYyA6IHtcbiAgICAgIHZhbHVlIDogMSxcbiAgICAgIHVuaXRzIDogXCJcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJJcnJpZ2F0aW9uIGZyYWN0aW9uOiAxID0gZnVsbHkgaXJyaWdhdGVkLCAwID0gbm8gaXJyaWdhdGlvbi4gQW55IHZhbHVlcyBiZXR3ZWVuIDAgYW5kIDEgYXJlIGFjY2VwdGFibGVcIlxuICAgIH0sXG4gICAgZmVydGlsaXR5IDoge1xuICAgICAgdmFsdWUgOiAwLjcsXG4gICAgICB1bml0cyA6IFwiXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiU29pbCBmZXJ0aWxpdHlcIlxuICAgIH0sXG4gICAgZGF0ZVBsYW50ZWQgOiB7XG4gICAgICAgIHZhbHVlIDogXCJfZGF0ZV9cIixcbiAgICAgICAgdW5pdHMgOiBcImRhdGVcIixcbiAgICAgICAgZGVzY3JpcHRpb24gOiBcIkRhdGUgdGhlIGNyb3Agd2FzIHBsYW50ZWRcIlxuICAgIH0sXG4gICAgZGF0ZUNvcHBpY2VkIDoge1xuICAgICAgICByZXF1aXJlZCA6IGZhbHNlLFxuICAgICAgICB2YWx1ZSA6IFwiX2RhdGVfXCIsXG4gICAgICAgIHVuaXRzIDogXCJkYXRlXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uIDogXCJEYXRlIG9mIHRoZSBmaXJzdCBjb3BwaWNlXCJcbiAgICB9LFxuICAgIGNvcHBpY2VJbnRlcnZhbCA6IHtcbiAgICAgICAgcmVxdWlyZWQgOiBmYWxzZSxcbiAgICAgICAgdmFsdWUgOiAzLFxuICAgICAgICB1bml0cyA6IFwiWWVhcnNcIixcbiAgICAgICAgZGVzY3JpcHRpb24gOiBcIkhvdyBhZnRlciB0aGUgY3JvcCBpcyBjb3BwaWNlZCBhZnRlciB0aGUgZmlyc3QgY29wcGljZVwiXG4gICAgfSxcbiAgICBjb3BwaWNlRGF0ZXMgOiB7XG4gICAgICAgIHJlcXVpcmVkIDogZmFsc2UsXG4gICAgICAgIHZhbHVlIDogXCJcIixcbiAgICAgICAgdW5pdHMgOiBcImRhdGVcIixcbiAgICAgICAgZGVzY3JpcHRpb24gOiBcIkhvdyBhZnRlciB0aGUgY3JvcCBpcyBjb3BwaWNlZCBhZnRlciB0aGUgZmlyc3QgY29wcGljZVwiXG4gICAgfSxcbiAgICBkYXRlRmluYWxIYXJ2ZXN0IDoge1xuICAgICAgICByZXF1aXJlZCA6IGZhbHNlLFxuICAgICAgICB2YWx1ZSA6IFwiX2RhdGVfXCIsXG4gICAgICAgIHVuaXRzIDogXCJkYXRlXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uIDogXCJEYXRlIHdoZW4gdGhlIGNyb3AgaXMgY29tcGxldGVseSBoYXJ2ZXN0ZWRcIlxuICAgIH1cbiAgfVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGRlc2NyaXB0aW9uOiBcIkdyZWVud29vZCBQRyBWYWx1ZXMgKGRlZmF1bHQpXCIsXG4gICAgdmFsdWU6IHtcbiAgICAgICAgdHlwZToge1xuICAgICAgICAgICAgdmFsdWU6IFwiXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJcIixcbiAgICAgICAgICAgIHJlcXVpcmVkIDogZmFsc2VcbiAgICAgICAgfSxcbiAgICAgICAgU3RvY2tpbmdEZW5zaXR5OiB7XG4gICAgICAgICAgICB2YWx1ZTogMzU4NyxcbiAgICAgICAgICAgIHVuaXRzOiBcIlRyZWVzL2hlY3RhclwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiTnVtYmVyIG9mIHRyZWVzIHBsYW50ZWQgcGVyIGhlY3RhclwiXG4gICAgICAgIH0sXG4gICAgICAgIFNlZWRsaW5nTWFzczoge1xuICAgICAgICAgICAgdmFsdWU6IDAuMDAwNCxcbiAgICAgICAgICAgIHVuaXRzOiBcImtHXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJNYXNzIG9mIHRoZSBzZWVkbGluZ1wiXG4gICAgICAgIH0sXG4gICAgICAgIHBTOiB7XG4gICAgICAgICAgICB2YWx1ZTogMC4xLFxuICAgICAgICAgICAgdW5pdHM6IFwidW5pdGxlc3NcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlByb3BvcnRpb24gb2Ygc2VlZGxpbmcgbWFzcyBnb2luZyBpbnRvIHN0ZW1cIlxuICAgICAgICB9LFxuICAgICAgICBwRjoge1xuICAgICAgICAgICAgdmFsdWU6IDAsXG4gICAgICAgICAgICB1bml0czogXCJ1bml0bGVzc1wiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiUHJvcG9ydGlvbiBvZiBzZWVkbGluZyBtYXNzIGdvaW5nIGludG8gZm9saWFnZVwiXG4gICAgICAgIH0sXG4gICAgICAgIHBSOiB7XG4gICAgICAgICAgICB2YWx1ZTogMC45LFxuICAgICAgICAgICAgdW5pdHM6IFwidW5pdGxlc3NcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlByb3BvcnRpb24gb2Ygc2VlZGxpbmcgbWFzcyBnb2luZyBpbnRvIHJvb3RcIlxuICAgICAgICB9XG4gICAgfVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGRlc2NyaXB0aW9uOiBcIlBsYW50YXRpb24gc3RhdGUgY2xhc3MsIGNvbnRhaW5pbmcgYWxsIGludGVtZWRpYXRlIHZhbHVlcyBhdCBldmVyeSB0aW1lc3RlcCBvZiB0aGUgbW9kZWxcIixcbiAgICB2YWx1ZToge1xuICAgICAgICBmZWVkc3RvY2tIYXJ2ZXN0OiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlwiXG4gICAgICAgIH0sXG4gICAgICAgIGNvcHBpY2VDb3VudDoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwiXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJcIlxuICAgICAgICB9LFxuICAgICAgICBjb3BwaWNlQWdlOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJtb250aFwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQWdlIG9mIHRyZWUgYXQgdGhlIHRpbWUgb2YgY29wcGljZVwiXG4gICAgICAgIH0sXG4gICAgICAgIFZQRDoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6XCJrUEFcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOlwiTWVhbiB2YXBvciBwcmVzc3VyZSBkZWZpY2l0XCJcbiAgICAgICAgfSxcbiAgICAgICAgZlZQRDoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHMgOiBcInVuaXRsZXNzXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjpcIlZhcG9yIFByZXNzdXJlIERlZmljaXQgTW9kaWZpZXIgKFBvcGxhcilcIlxuICAgICAgICB9LFxuICAgICAgICBmVDoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6XCJ1bml0bGVzc1wiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246XCJUZW1wZXJhdHVyZSBtb2RpZmllclwiXG4gICAgICAgIH0sXG4gICAgICAgIGZGcm9zdDoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHMgOiBcInVuaXRsZXNzXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbiA6IFwiTnVtYmVyIG9mIEZyZWV6ZSBEYXlzIE1vZGlmaWVyXCJcbiAgICAgICAgfSxcbiAgICAgICAgZk51dHI6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOlwidW5pdGxlc3NcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOlwiTnV0cml0aW9uYWwgRnJhY3Rpb24sIG1pZ2h0IGJlIGJhc2VkIG9uIHNvaWwgYW5kIGZlcnRpbGl6ZXIgYXQgc29tZSBwb2ludFwiXG4gICAgICAgIH0sXG4gICAgICAgIGZTVzoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwiXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJTb2lsIHdhdGVyIG1vZGlmaWVyXCJcbiAgICAgICAgfSxcbiAgICAgICAgZkFnZToge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwiXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJcIlxuICAgICAgICB9LFxuICAgICAgICBQQVI6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOlwibW9sc1wiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246XCJNb250aGx5IFBBUiBpbiBtb2xzIC8gbV4yIG1vbnRoXCJcbiAgICAgICAgfSxcbiAgICAgICAgeFBQOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJtZXRyaWMgdG9ucyBEcnkgTWF0dGVyL2hhXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJtYXhpbXVtIHBvdGVudGlhbCBQcmltYXJ5IFByb2R1Y3Rpb25cIlxuICAgICAgICB9LFxuICAgICAgICBJbnRjcHRuOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJ1bml0bGVzc1wiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQ2Fub3B5IHJhaW5mYWxsIGludGVyY2VwdGlvblwiXG4gICAgICAgIH0sXG4gICAgICAgIEFTVzoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwibW1cIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkF2YWlsYWJsZSBzb2lsIHdhdGVyXCJcbiAgICAgICAgfSxcbiAgICAgICAgQ3VtSXJyaWc6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIm1tXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJDdW11bGF0aXZlIGlycmlnYXRpb25cIlxuICAgICAgICB9LFxuICAgICAgICBJcnJpZzoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwibW0vbW9uXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJSZXF1aXJlZCBpcnJpZ2F0aW9uXCJcbiAgICAgICAgfSxcbiAgICAgICAgU3RhbmRBZ2U6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIm1vbnRoXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJBZ2Ugb2YgdGhlIHRyZWVcIlxuICAgICAgICB9LFxuICAgICAgICBMQUk6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIlwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiTGVhZiBhcmVhIGluZGV4XCJcbiAgICAgICAgfSxcbiAgICAgICAgQ2FuQ29uZDoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwiXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJDYW5vcHkgY29uZHVjdGFuY2VcIlxuICAgICAgICB9LFxuICAgICAgICBUcmFuc3A6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIm1tL21vblwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQ2Fub3B5IG1vbnRobHkgdHJhbnNwaXJhdGlvblwiXG4gICAgICAgIH0sXG4gICAgICAgIEVUcjoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwibW1cIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlJlZmVyZW5jZSAoQWxmYWxmYSkgdHJhbnNwaXJhdGlvblwiXG4gICAgICAgIH0sXG4gICAgICAgIEtjOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkNyb3AgQ29lZmZpY2llbnRcIlxuICAgICAgICB9LFxuICAgICAgICBQaHlzTW9kOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJ1bml0bGVzc1wiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiUGh5c2lvbG9naWNhbCBNb2RpZmllciB0byBjb25kdWN0YW5jZSBhbmQgQVBBUnVcIlxuICAgICAgICB9LFxuICAgICAgICBwZnM6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIlwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiUmF0aW8gb2YgZm9saWFnZSB0byBzdGVtIHBhcnRpdGlvbmluZ1wiXG4gICAgICAgIH0sXG4gICAgICAgIHBSOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlwiXG4gICAgICAgIH0sXG4gICAgICAgIHBTOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlwiXG4gICAgICAgIH0sXG4gICAgICAgIHBGOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlwiXG4gICAgICAgIH0sXG4gICAgICAgIGxpdHRlcmZhbGw6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIlwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiXCJcbiAgICAgICAgfSxcbiAgICAgICAgTlBQOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJtZXRyaWMgdG9ucyBEcnkgTWF0dGVyL2hhXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJOZXQgUHJpbWFyeSBQcm9kdWN0aXZpdHlcIlxuICAgICAgICB9LFxuICAgICAgICBSb290UDoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwiXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJSb290IHByb2R1Y3Rpdml0eVwiXG4gICAgICAgIH0sXG4gICAgICAgIGRXOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlwiXG4gICAgICAgIH0sXG4gICAgICAgIFdGOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJiZHQvaGFcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkZvbGlhZ2UgeWllbGRcIlxuICAgICAgICB9LFxuICAgICAgICBXUjoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwiYmR0L2hhXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJSb290IHlpZWxkXCJcbiAgICAgICAgfSxcbiAgICAgICAgV1M6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcImJkdC9oYVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiU3RlbSB5aWVsZFwiXG4gICAgICAgIH0sXG4gICAgICAgIFc6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcImJkdC9oYVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiVG90YWwgeWllbGQ6IHJvb3QgKyBzdGVtICsgZm9saWFnZVwiXG4gICAgICAgIH1cbiAgICB9XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZGVzY3JpcHRpb246IFwiU29pbCBpbmZvcm1hdGlvbiBiYXNlZCBvbiBjdXJyZW50IGxvY2F0aW9uXCIsXG4gICAgdmFsdWU6IHtcbiAgICAgICAgbWF4QVdTOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIk1heGltdW0gYXZhaWxhYmxlIHNvaWwgd2F0ZXJcIlxuICAgICAgICB9LFxuICAgICAgICBzd3Bvd2VyOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcInBvd2VyIHBhcmFtZXRlciBiYXNlZCBvbiBjbGF5IGNvbnRlbnQgb2Ygc29pbFwiXG4gICAgICAgIH0sXG4gICAgICAgIHN3Y29uc3Q6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIlwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiY29uc3RhbnQgcGFyYW1ldGVyIGJhc2VkIG9uIGNsYXkgY29udGVudCBvZiBzb2lsXCJcbiAgICAgICAgfVxuICAgIH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICB1bml0czogXCJbZ2MgbS9zXT9cIixcbiAgICBkZXNjcmlwdGlvbjogXCJBbG9uZyB3aXRoIGEgUGh5c2lvbG9naWNhbCBtb2RpZmVyLCBzcGVjaWZpZXMgdGhlIGNhbm9weSBjb25kdWN0YW5jZS4gIFVzZWQgaW4gY2FsY3VsYXRpb24gb2YgdHJhbnNwaXJhdGlvblwiLFxuICAgIHZhbHVlOiB7XG4gICAgICAgIG1uOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJNaW5pbXVtIHZhbHVlLCB3aGVuIGxhaT0wXCIsXG4gICAgICAgICAgICB2YWx1ZTogMC4wMDAxXG4gICAgICAgIH0sXG4gICAgICAgIG14OiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJNYXhpbXVtIHZhbHVlXCIsXG4gICAgICAgICAgICB2YWx1ZTogMC4wMlxuICAgICAgICB9LFxuICAgICAgICBsYWk6IHtcbiAgICAgICAgICAgIHVuaXRzOiBcIlttXjIvbV4yXVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiTGVhZiBBcmVhIEluZGV4IHdoZXJlIHBhcmFtZXRlciByZWFjaGVzIGEgbWF4aW11bSB2YWx1ZS5cIixcbiAgICAgICAgICAgIHZhbHVlOiAyLjZcbiAgICAgICAgfVxuICAgIH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICB1bml0czogXCJmcmFjdGlvblwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIlNwZWNpZmllcyB0aGUgZ3Jvd3RoIGxpbWl0ZXIgYXMgYSBmdW5jdGlvbiBvZiB0aGUgdHJlZSBhZ2UuICBUaGlzIGlzIGEgdGltZSBkZXBlbmRhbmN5IHBhcmFtZXRlci4gIFRoZSBncmFwaCBvZiB0aGUgZnVuY3Rpb24gaXMgYXZhaWxhYmxlIGF0OiBodHRwczovL3d3dy5kZXNtb3MuY29tL2NhbGN1bGF0b3Ivd2EwcTJpaDE4aFwiLFxuICAgIHZhbHVlOiB7XG4gICAgICAgIGYwOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJWYWx1ZSBhdCBJbml0aWFsIFRpbWVcIixcbiAgICAgICAgICAgIHZhbHVlOiAxXG4gICAgICAgIH0sXG4gICAgICAgIGYxOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJWYWx1ZSBhdCBJbmZpbml0ZSBUaW1lXCIsXG4gICAgICAgICAgICB2YWx1ZTogMFxuICAgICAgICB9LFxuICAgICAgICB0bToge1xuICAgICAgICAgICAgdW5pdHM6IFwiW3ldXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJUaW1lIGluIHllYXJzIHdoZXJlIHZhbHVlIGlzIHRoZSBhdmVyYWdlIG9mIGYwIGFuZCBmMVwiLFxuICAgICAgICAgICAgdmFsdWU6IDQ3LjVcbiAgICAgICAgfSxcbiAgICAgICAgbjoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwibj49MTsgUGFyYW1ldGVyIHNwZWNpZmluZyB0aGUgcmF0ZSBvZiBjaGFuZ2UgYXJvdW5kIHRtLiAgbj0xIGlzIGFwcHJveGltYXRlbHkgYSBsaW5lYXIgY2hhbmdlLCBhcyBuIGluY3JlYXNlcywgY2hhbmdlIGJlY29tZXMgbW9yZSBsb2NhbGl6ZWQgYXJvdW5kIHRtLlwiLFxuICAgICAgICAgICAgdmFsdWU6IDMuNVxuICAgICAgICB9XG4gICAgfVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGRlc2NyaXB0aW9uOiBcIlNwZWNpZmllcyB0aGUgcGFyYW1ldGVycyBhZmZlY3RpbmcgdGVtcGVyYXR1cmUgbW9kaWZpZXIsIGZULiBBIGdyYXBoIG9mIGhvdyB0aGVzZSBwYXJhbWV0ZXJzIGFmZmVjdCB0aGUgdGVtcGVyYXR1cmUgbW9kaWZpZXIgaXMgZm91bmQgaGVyZTogaHR0cHM6Ly93d3cuZGVzbW9zLmNvbS9jYWxjdWxhdG9yLzY5aXdxdG5sMjhcIixcbiAgICB2YWx1ZToge1xuICAgICAgICBtbjoge1xuICAgICAgICAgICAgdW5pdHM6IFwiW0NdXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJTcGVjaWZpZXMgdGhlIG1pbmltdW0gdGVtcGVyYXR1cmUgb2YgcmVzcGlyYXRpb25cIixcbiAgICAgICAgICAgIHZhbHVlOiAwXG4gICAgICAgIH0sXG4gICAgICAgIG9wdDoge1xuICAgICAgICAgICAgdW5pdHM6IFwiW0NdXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJTcGVjaWZpZXMgdGhlIG9wdGltdW0gdGVtcGVyYXR1cmUgb2YgcmVzcGlyYXRpb25cIixcbiAgICAgICAgICAgIHZhbHVlOiAyMFxuICAgICAgICB9LFxuICAgICAgICBteDoge1xuICAgICAgICAgICAgdW5pdHM6IFwiW0NdXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJTcGVjaWZpZXMgdGhlIG1heGltdW0gdGVtcGVyYXR1cmUgb2YgcmVzcGlyYXRpb25cIixcbiAgICAgICAgICAgIHZhbHVlOiA1MFxuICAgICAgICB9XG4gICAgfVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGRlc2NyaXB0aW9uOiBcIlRoZXNlIHNwZWNpZnkgZ3Jvd3RoIHBhcmFtZXRlcnMgc3BlY2lmaWMgdG8gdGhlIHNwZWNpZXMgb2YgdHJlZS5cIixcbiAgICB2YWx1ZSA6IHtcbiAgICAgICAgazoge1xuICAgICAgICAgICAgdW5pdHM6IFwidW5pdGxlc3NcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlJhZGlhdGlvbiBFeHRpbmN0aW9uIENvZWZmaWNpZW50LlwiLFxuICAgICAgICAgICAgdmFsdWU6IDAuNVxuICAgICAgICB9LFxuICAgICAgICBmdWxsQ2FuQWdlOiB7XG4gICAgICAgICAgICB1bml0czogXCJbeV1cIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlllYXIgd2hlcmUgdHJlZSByZWFjaGVzIGZ1bGwgQ2Fub3B5IENvdmVyLlwiLFxuICAgICAgICAgICAgdmFsdWU6IDEuNVxuICAgICAgICB9LFxuICAgICAgICBrRzoge1xuICAgICAgICAgICAgdW5pdHM6IFwiW2tQQV4tMV1cIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkRldGVybWluZXMgdGhlIHJlc3BvbnNlIG9mIHRoZSBjYW5vcHkgY29uZHVjdGFuY2UgdG8gdGhlIHZhcG9yIHByZXNzdXJlIGRlZmljaXQuXCIsXG4gICAgICAgICAgICB2YWx1ZTogMC41XG4gICAgICAgIH0sXG4gICAgICAgIGFscGhhOiB7XG4gICAgICAgICAgICB1bml0czogXCJba2cvbW9sID9dXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJDYW5vcHkgcXVhbnR1bSBlZmZpY2llbmN5LlwiLFxuICAgICAgICAgICAgdmFsdWU6IDAuMDhcbiAgICAgICAgfSxcbiAgICAgICAgZlQgOiByZXF1aXJlKCcuL2Z0JyksXG4gICAgICAgIEJMY29uZDoge1xuICAgICAgICAgICAgdW5pdHM6IFwiW11cIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkNhbm9weSBib3VuZGFyeSBsYXllciBjb25kdWN0YW5jZS4gVXNlZCBpbiB0aGUgY2FsY3VhdGlvbiBvZiB0cmFuc3BpcmF0aW9uXCIsXG4gICAgICAgICAgICB2YWx1ZTogMC4wNFxuICAgICAgICB9LFxuICAgICAgICBmQWdlOiByZXF1aXJlKCcuL2ZhZ2UnKSxcbiAgICAgICAgZk4wOiB7XG4gICAgICAgICAgICB1bml0czogXCJmcmFjdGlvblwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiVXNlZCBpbiB0aGUgY2FsY3VsYXRpb24gb2YgdGhlIG51dHJpdGlvbmFsIG1vZGlmaWVyLGZOdXRyLiAgZk51dHIgcmFuZ2VzIGZyb20gW2ZOTywxKSBiYXNlZCBvbiB0aGUgZmVydGlsaXR5IGluZGV4IHdoaWNoIHJhbmdlcyBmcm9tIDAgdG8gMS4gIFdoZW4gZk4wPTEgaW5kaWNhdGVzIGZOdXRyIGlzIDFcIixcbiAgICAgICAgICAgIHZhbHVlOiAwLjI2XG4gICAgICAgIH0sXG4gICAgICAgIFNMQTogcmVxdWlyZSgnLi9zbGEnKSxcbiAgICAgICAgLy9DaGVja1VuaXRzQ2hhbmdldG9saW5lYXJGdW5jdGlvblxuICAgICAgICBDb25kdWN0YW5jZTogcmVxdWlyZSgnLi9jb25kdWN0YW5jZScpLFxuICAgICAgICBJbnRjcHRuOiByZXF1aXJlKCcuL2ludGNwdG4nKSxcbiAgICAgICAgeToge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQXNzaW1pbGF0aW9uIHVzZSBlZmZpY2llbmN5LiAgVXNlZCBpbiBjYWxjdWxhdGlvbiBvZiB0aGUgTlBQLlwiLFxuICAgICAgICAgICAgdmFsdWU6IDAuNDdcbiAgICAgICAgfSxcbiAgICAgICAgcGZzOiByZXF1aXJlKCcuL3BmcycpLFxuICAgICAgICBwUjogcmVxdWlyZSgnLi9wcicpLFxuICAgICAgICByb290UDogcmVxdWlyZSgnLi9yb290cCcpLFxuICAgICAgICBsaXR0ZXJmYWxsOiByZXF1aXJlKCcuL2xpdHRlcmZhbGwnKVxuICAgIH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICB1bml0czogXCJmcmFjdGlvblwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIlJhaW5mYWxsIGludGVyY2VwdGlvbiBmcmFjdGlvbi4gIEEgbGluZWFyIGZ1bmN0aW9uIHcuci50LiBMQUlcIixcbiAgICB2YWx1ZToge1xuICAgICAgICBtbjoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiTWluaW11bSB2YWx1ZSwgd2hlbiBsYWk9MFwiLFxuICAgICAgICAgICAgdmFsdWU6IDBcbiAgICAgICAgfSxcbiAgICAgICAgbXg6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIk1heGltdW0gdmFsdWVcIixcbiAgICAgICAgICAgIHZhbHVlOiAwLjI0XG4gICAgICAgIH0sXG4gICAgICAgIGxhaToge1xuICAgICAgICAgICAgdW5pdHM6IFwiW21eMi9tXjJdXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJMZWFmIEFyZWEgSW5kZXggd2hlcmUgcGFyYW1ldGVyIHJlYWNoZXMgYSBtYXhpbXVtIHZhbHVlLlwiLFxuICAgICAgICAgICAgdmFsdWU6IDcuM1xuICAgICAgICB9XG4gICAgfVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHVuaXRzOiBcImZyYWN0aW9uXCIsXG4gICAgZGVzY3JpcHRpb246IFwiU3BlY2lmaWVzIHRoZSBmcmFjdGlvbmFsIG1vbnRobHkgbG9zcyBvZiBmb2xpYWdlLiBUaGlzIGlzIGEgdGltZSBkZXBlbmRhbnkgcGFyYW1ldGVyLiAgVGhlIGdyYXBoIG9mIHRoZSBmdW5jdGlvbiBpcyBhdmFpbGFibGUgYXQ6IGh0dHBzOi8vd3d3LmRlc21vcy5jb20vY2FsY3VsYXRvci82aXE5cHBkcXM3XCIsXG4gICAgdmFsdWU6IHtcbiAgICAgICAgZjA6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlZhbHVlIGF0IEluaXRpYWwgVGltZVwiLFxuICAgICAgICAgICAgdmFsdWU6IDAuMDAxNVxuICAgICAgICB9LFxuICAgICAgICBmMToge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiVmFsdWUgYXQgSW5maW5pdGUgVGltZVwiLFxuICAgICAgICAgICAgdmFsdWU6IDAuMDNcbiAgICAgICAgfSxcbiAgICAgICAgdG06IHtcbiAgICAgICAgICAgIHVuaXRzOiBcIlt5XVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiVGltZSBpbiB5ZWFycyB3aGVyZSB2YWx1ZSBpcyB0aGUgYXZlcmFnZSBvZiBmMCBhbmQgZjFcIixcbiAgICAgICAgICAgIHZhbHVlOiAyXG4gICAgICAgIH0sXG4gICAgICAgIG46IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIm4+PTE7IFBhcmFtZXRlciBzcGVjaWZpbmcgdGhlIHJhdGUgb2YgY2hhbmdlIGFyb3VuZCB0bS4gIG49MSBpcyBhcHByb3hpbWF0ZWx5IGEgbGluZWFyIGNoYW5nZSwgYXMgbiBpbmNyZWFzZXMsIGNoYW5nZSBiZWNvbWVzIG1vcmUgbG9jYWxpemVkIGFyb3VuZCB0bS5cIixcbiAgICAgICAgICAgIHZhbHVlOiAyLjVcbiAgICAgICAgfVxuICAgIH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICB1bml0czogXCJmcmFjdGlvblwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIlRoaXMgZGVmaW5lcyB0aGUgZm9saWFnZSB0byBzdGVtIChXRi9XUykgZnJhY3Rpb24gaW4gYWxsb2NhdGluZyBhYm92ZWdyb3VuZCBiaW9tYXNzIG9mIHRoZSB0cmVlLiBUaGlzIGlzIGNhbGN1bGF0ZWQgd2l0aCBhIHBhaXIgb2YgYWxsb21ldHJpYyBwb3dlciBlcXVhdGlvbnMuICBUaGUgZmlyc3QgcmVsYXRlcyBiYXNhbCBkaWFtZXRlciwgKERPQikgdG8gdG90YWwgd29vZHkgYmlvbWFzcywgd2hpbGUgdGhlIHNlY29uZCByZWxhdGVzIERPQiB0byBwZnMuICBUaGUgcGFyYW1ldGVyaXphdGlvbiBvZiB0aGUgcmVsYXRpb25zaGlwIGJldHdlZW4gRE9CIGFuZCB3b29keSBiaW9tYXNzIGlzIGludmVydGVkIHRvIGRldGVybWluZSB0aGUgRE9CIGZyb20gdGhlIG1vZGVsZWQgd29vZHkgZnJhY3Rpb24uICBUaGlzIHJlbGF0aW9uIGlzIHBsb3R0ZWQgYXQ6IC4gIFRoZSBtb2RlbCBhbGxvY2F0ZXMgdGhlIGFwcHJvcHJpYXRlIGZyYWN0aW9uIG9mIHdvb2QgYmFzZWQgb24gdGhlIFN0b2NraW5nIGRlbnNpdHkgb2YgdGhlIHBsYW50YXRpb24uIERPQiByYXRoZXIgdGhhbiBEQkggaXMgdXNlZCBmb3IgY29tcGFyaXNvbiBvZiB0cmVlcyB3aXRoIGEgaGlnaCBzdGVtQ250IGFuZCByYXBpZCBjb3BwaWNpbmcgdmFsdWUuXCIsXG4gICAgdmFsdWU6IHtcbiAgICAgICAgc3RlbUNudDoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQXZlcmFnZSBudW1iZXIgb2Ygc3RlbXMgcGVyIHN0dW1wXCIsXG4gICAgICAgICAgICB2YWx1ZTogMi44XG4gICAgICAgIH0sXG4gICAgICAgIHN0ZW1DOiB7XG4gICAgICAgICAgICB1bml0czogXCJbY21eLTFdXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJDb25zdGFudCBpbiByZWxhdGlvbiBvZiBET0IgdG8gd29vZHkgYmlvbWFzc1wiLFxuICAgICAgICAgICAgdmFsdWU6IDAuMThcbiAgICAgICAgfSxcbiAgICAgICAgc3RlbVA6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlBvd2VyIGluIHJlbGF0aW9uIG9mIERPQiB0byB3b29keSBiaW9tYXNzLlwiLFxuICAgICAgICAgICAgdmFsdWU6IDIuNFxuICAgICAgICB9LFxuICAgICAgICBwZnNNeDoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiTWF4aW11bSBwb3NzaWJsZSBwZnMgdmFsdWUgYWxsb3dlZFwiLFxuICAgICAgICAgICAgdmFsdWU6IDJcbiAgICAgICAgfSxcbiAgICAgICAgcGZzUDoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiUG93ZXIgaW4gcmVsYXRpb24gb2YgREJPIHRvIHBmc1wiLFxuICAgICAgICAgICAgdmFsdWU6IC0wLjc3MlxuICAgICAgICB9LFxuICAgICAgICBwZnNDOiB7XG4gICAgICAgICAgICB1bml0czogXCJbY21eLTFdXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJDb25zdGFudCBpbiByZWxhdGlvbiBvZiBET0IgdG8gcGZzLlwiLFxuICAgICAgICAgICAgdmFsdWU6IDEuM1xuICAgICAgICB9XG4gICAgfVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHVuaXRzOiBcImZyYWN0aW9uXCIsXG4gICAgZGVzY3JpcHRpb246IFwiQWxvbmcgd2l0aCBhIFBoeXNpb2xvZ2lhbCBwYXJhbWV0ZXIsIHNwZWNpZmllcyB0aGUgYW1vdW50IG9mIG5ldyBncm93dGggYWxsb2NhdGVkIHRvIHRoZSByb290IHN5c3RlbSwgYW5kIHRoZSB0dXJub3ZlciByYXRlLlwiLFxuICAgIHZhbHVlOiB7XG4gICAgICAgIG1uOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJNaW5pbXVtIGFsbG9jYXRpb24gdG8gdGhlIHJvb3QsIHdoZW4gdGhlIHBoeXNpb2xvZ2FsIHBhcmFtZXRlciBpcyAxLlwiLFxuICAgICAgICAgICAgdmFsdWU6IDAuMTdcbiAgICAgICAgfSxcbiAgICAgICAgbXg6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIk1heGltdW0gYWxsb2NhdGlvbiB0byB0aGUgcm9vdCwgd2hlbiBtMC5cIixcbiAgICAgICAgICAgIHZhbHVlOiAwLjdcbiAgICAgICAgfSxcbiAgICAgICAgbTA6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkRlcGVuZGFuY2Ugb24gdGhlIGZlcnRpbGl0eSBpbmRleC4gMCBpbmRpY2F0ZXMgZnVsbCBkZXBlbmRhbmNlIG9uIGZlcnRpbGl0eSwgMSBpbmRpY2F0ZXMgYSBjb25zdGFudCBhbGxvY2F0aW9uLCBpbmRlcGVuZGFudCBvZiBmZXJ0aWxpdHlcIixcbiAgICAgICAgICAgIHZhbHVlOiAwLjVcbiAgICAgICAgfSxcbiAgICAgICAgdHVybm92ZXI6IHtcbiAgICAgICAgICAgIHVuaXRzOiBcIlttb250aF4tMV1cIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlNwZWNpZmllcyB0aGUgbW9udGhseSByb290IHR1cm5vdmVyIHJhdGUuXCIsXG4gICAgICAgICAgICB2YWx1ZTogMC4wMlxuICAgICAgICB9XG4gICAgfVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGRlc2NyaXB0aW9uOiBcIlRoZXNlIHBhcmFtZXRlcnMgc3BlY2lmeSByb290IGFsbG9jYXRpb24gdG8gZ3Jvd3RoIGFmdGVyIGNvcHBpY2luZy5cIixcbiAgICB2YWx1ZSA6IHtcbiAgICAgIGZyYWM6IHtcbiAgICAgICAgICB1bml0czogXCJbbW9udGheMV1cIixcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJTcGVjaWZpZXMgdGhlIGZyYWN0aW9uYWwgYW1vdW50IG9mIHJvb3QgYmlvbWFzcyB0aGF0IGV4Y2VlZHMgdGhlIGFib3ZlZ3JvdW5kIHJlcXVpcmVtZW50cyB0aGF0IGNhbiBiZSBzdXBwbGllZCBpbiBhIGdpdmVuIG1vbnRoLlwiLFxuICAgICAgICAgIHZhbHVlOiAwLjJcbiAgICAgIH0sXG4gICAgICBMQUlUYXJnZXQ6IHtcbiAgICAgICAgICB1bml0czogXCJbbV4yL21eMl1cIixcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJTcGVjaWZpZXMgYSB0YXJnZXQgTEFJIHJhdGUuICBUaGUgVGFyZ2V0IExBSSBpcyBpbmNsdWRlZCBpbiB0aGUgY2FsY3VsYXRpb24gb2YgYSB0YXJnZXQgTlBQLCBiYXNlZCBvbiB3ZWF0aGVyIHBhcmFtYXRlcnMuICBCZWxvdyB0aGlzIHRhcmdldCwgdGhlIHJvb3RzIHdpbGwgY29udHJpYnV0ZSBiaW9tYXNzIGlmIHRoZSBiZWxvdyBncm91bmQgcm9vdCBtYXNzIGV4Y2VlZHMgdGhlIHJlcXVpcmVtZW50cyBvZiB0aGUgYWJvdmVncm91bmQgYmlvbWFzcy4gVGhlIHRhcmdldCBpcyBzcGVjaWZpZWQgaW4gTEFJIHRvIHRpbWUgcm9vdCBjb250cmlidXRpb25zIHRvIHBlcmlvZHMgb2YgZ3Jvd3RoXCIsXG4gICAgICAgICAgdmFsdWU6IDEwXG4gICAgICB9LFxuICAgICAgZWZmaWNpZW5jeToge1xuICAgICAgICAgIHVuaXRzOiBcIltrZy9rZ11cIixcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJTcGVjaWZpZXMgdGhlIGVmZmljaWVuY3kgaW4gY29udmVydGluZyByb290IGJpb21hc3MgaW50byBhYm92ZWdyb3VuZCBiaW9tYXNzLlwiLFxuICAgICAgICAgIHZhbHVlOiAwLjdcbiAgICAgIH1cbiAgICB9XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgdW5pdHM6IFwiW21eMi9rZ11cIixcbiAgICBkZXNjcmlwdGlvbjogXCJTcGVjaWZpZXMgdGhlIFNwZWNpZmljIExlYWYgQXJlYSBhcyBhIGZ1bmN0aW9uIG9mIHRoZSB0cmVlIGFnZS4gIFRoaXMgaXMgYSB0aW1lIGRlcGVuZGFuY3kgcGFyYW1ldGVyLiAgVXNlZCBpbiB0aGUgY2FsY3VsYXRpb24gb2YgTEFJLiAgVGhlIGdyYXBoIG9mIHRoZSBmdW5jdGlvbiBpcyBhdmFpbGFibGUgYXQ6IGh0dHBzOi8vd3d3LmRlc21vcy5jb20vY2FsY3VsYXRvci93YTBxMmloMThoXCIsXG4gICAgdmFsdWU6IHtcbiAgICAgICAgZjA6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlZhbHVlIGF0IEluaXRpYWwgVGltZVwiLFxuICAgICAgICAgICAgdmFsdWU6IDE5XG4gICAgICAgIH0sXG4gICAgICAgIGYxOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJWYWx1ZSBhdCBJbmZpbml0ZSBUaW1lXCIsXG4gICAgICAgICAgICB2YWx1ZTogMTAuOFxuICAgICAgICB9LFxuICAgICAgICB0bToge1xuICAgICAgICAgICAgdW5pdHM6IFwiW3ldXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJUaW1lIGluIHllYXJzIHdoZXJlIHZhbHVlIGlzIHRoZSBhdmVyYWdlIG9mIGYwIGFuZCBmMVwiLFxuICAgICAgICAgICAgdmFsdWU6IDVcbiAgICAgICAgfSxcbiAgICAgICAgbjoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwibj49MTsgUGFyYW1ldGVyIHNwZWNpZmluZyB0aGUgcmF0ZSBvZiBjaGFuZ2UgYXJvdW5kIHRtLiAgbj0xIGlzIGFwcHJveGltYXRlbHkgYSBsaW5lYXIgY2hhbmdlLCBhcyBuIGluY3JlYXNlcywgY2hhbmdlIGJlY29tZXMgbW9yZSBsb2NhbGl6ZWQgYXJvdW5kIHRtLlwiLFxuICAgICAgICAgICAgdmFsdWU6IDJcbiAgICAgICAgfVxuICAgIH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBtb250aDoge1xuICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgIHVuaXRzOiBcInVuaXRsZXNzXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIlRoZSBtb250aCBudW1iZXIgc2luY2UgcGxhbnRpbmdcIlxuICAgIH0sXG4gICAgdG1pbjoge1xuICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgIHVuaXRzOiBcIkNlbGNpdXNcIixcbiAgICAgICAgZGVzY3JpcHRpb246IFwiTWluaW11bSB0ZW1wZXJhdHVyZSBmb3IgZ3Jvd3RoXCJcbiAgICB9LFxuICAgIHRtYXg6IHtcbiAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICB1bml0czogXCJDZWxjaXVzXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIk1heGltdW0gdGVtcGVyYXR1cmUgZm9yIGdyb3d0aFwiXG4gICAgfSxcbiAgICB0ZG1lYW46IHtcbiAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICB1bml0czogXCJDZWxjaXVzXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIkRldyBwb2ludCB0ZW1wZXJhdHVyZVwiXG4gICAgfSxcbiAgICBwcHQ6IHtcbiAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICB1bml0czogXCJcIixcbiAgICAgICAgZGVzY3JpcHRpb246IFwiUHJlY2lwaXRhdGlvblwiXG4gICAgfSxcbiAgICByYWQ6IHtcbiAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICB1bml0czogXCJcIixcbiAgICAgICAgZGVzY3JpcHRpb246IFwiU29sYXIgcmFkaWF0aW9uXCJcbiAgICB9LFxuICAgIG5yZWw6IHtcbiAgICAgICAgcmVxdWlyZWQgOiBmYWxzZSwgLy8gY2FsY3VhdGVkXG4gICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgdW5pdHM6IFwiXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIlwiXG4gICAgfSxcbiAgICBkYXlsaWdodDoge1xuICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgIHVuaXRzOiBcIlwiLFxuICAgICAgICBkZXNjcmlwdGlvbjogXCJcIlxuICAgIH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG4vKipcbkBtb2R1bGUgM1BHIE1vZHVsZVxuKiovXG5cblxuLyoqXG5DbGFzcyBmb3IgYWxsIHRoZSBmdW5jdGlvbnMgdGhhdCBydW4gaW4gYSBzaW5nbGUgc3RlcCBvZiB0aGUgbW9kZWxcblxuQGNsYXNzIG1vZHVsZS5leHBvcnRzXG4qKi9cblxuXG4vKipcbmxpc3Qgb2YgY29uc3RhbnRzIHVzZWQgZm9yIGNvbXB1dGF0aW9uc1xuXG5AYXR0cmlidXRlIGNvbnN0YW50XG4qKi9cbnZhciBjb25zdGFudHMgPSB7XG4gIGFzY2VfZXRyX2VsZXZhdGlvbjoge1xuICAgIHZhbHVlOjUwMCxcbiAgICB1bml0czonbS9zJyxcbiAgICBkZXNjcmlwdGlvbjonRXN0aW1hdGVkIEVsZXZhdGlvbiBvZiBjYWxjdWxhdGlvbiBvZiBFVHIgKGFuZCBLYyknXG4gIH0sXG4gIGFzY2VfZXRyX3dpbmRzcGVlZDoge1xuICAgIHZhbHVlOjIsXG4gICAgdW5pdHM6J20vcycsXG4gICAgZGVzY3JpcHRpb246J0NvbnN0YW50IHdpbmQgc3BlZWQgZm9yIGNhbGN1bGF0aW9uIG9mIEVUciAoYW5kIEtjKSdcbiAgfSxcbiAgZTIwOntcbiAgICAgIHZhbHVlOjIuMixcbiAgICAgIHVuaXRzOid2cC90JyxcbiAgICAgIGRlc2NyaXB0aW9uOidSYXRlIG9mIGNoYW5nZSBvZiBzYXR1cmF0ZWQgVlAgd2l0aCBUIGF0IDIwQydcbiAgfSxcbiAgcmhvQWlyOntcbiAgICAgIHZhbHVlOjEuMixcbiAgICAgIHVuaXRzOidrZy9tXjMnLFxuICAgICAgZGVzY3JpcHRpb246J0RlbnNpdHkgb2YgYWlyJ1xuICB9LFxuICBsYW1iZGE6e1xuICAgICAgdmFsdWU6MjQ2MDAwMCxcbiAgICAgIHVuaXRzOidKL2tnJyxcbiAgICAgIGRlc2NyaXB0aW9uOidMYXRlbnQgaGVhdCBvZiB2YXBvdXJpc2F0aW9uIG9mIGgybydcbiAgfSxcbiAgVlBEY29udjp7XG4gICAgICB2YWx1ZTowLjAwMDYyMixcbiAgICAgIHVuaXRzOic/JyxcbiAgICAgIGRlc2NyaXB0aW9uOidDb252ZXJ0IFZQRCB0byBzYXR1cmF0aW9uIGRlZmljaXQgPSAxOC8yOS8xMDAwJ1xuICB9LFxuICBRYTp7XG4gICAgICB2YWx1ZTotOTAsXG4gICAgICB1bml0czonVy9tXjInLFxuICAgICAgZGVzY3JpcHRpb246J0ludGVyY2VwdCBvZiBuZXQgcmFkaWF0aW9uIHZlcnN1cyBzb2xhciByYWRpYXRpb24gcmVsYXRpb25zaGlwJ1xuICB9LFxuICBRYjp7XG4gICAgICB2YWx1ZTowLjgsXG4gICAgICB1bml0czondW5pdGxlc3MnLFxuICAgICAgZGVzY3JpcHRpb246J3Nsb3BlIG9mIG5ldCB2cy4gc29sYXIgcmFkaWF0aW9uIHJlbGF0aW9uc2hpcCdcbiAgfSxcbiAgZ0RNX21vbDp7XG4gICAgICB2YWx1ZToyNCxcbiAgICAgIHVuaXRzOidnL21vbChDKScsXG4gICAgICBkZXNjcmlwdGlvbjonTW9sZWN1bGFyIHdlaWdodCBvZiBkcnkgbWF0dGVyJ1xuICB9LFxuICBtb2xQQVJfTUo6e1xuICAgICAgdmFsdWU6Mi4zLFxuICAgICAgdW5pdHM6J21vbChDKS9NSicsXG4gICAgICBkZXNjcmlwdGlvbjonQ29udmVyc2lvbiBvZiBzb2xhciByYWRpYXRpb24gdG8gUEFSJ1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cy5jb25zdGFudCA9IGNvbnN0YW50O1xuZnVuY3Rpb24gY29uc3RhbnQoYykge1xuICAgIHJldHVybiBjb25zdGFudHNbY10udmFsdWU7XG59XG5cbi8qKlxuVGltZSBEZXBlbmRhbnQgQXR0cmlidXRlLFxudW5pdHM9J3ZhcmlvdXMnLFxuZGVzY3JpcHRpb249J1RoaXMgZnVuY3Rpb24gY3JlYXRlcyBhIHRpbWUgZGVwZW5kYW50IGZ1bmN0aW9uIHRoYXQgZGVjYXlzXG4ob3IgcmlzZXMgZnJvbSBmMCB0byBmMS4gIFRoZSB2YWx1ZSAoZjArZjEpLzIgaXMgcmVhY2hlZCBhdCB0bSxcbmFuZCB0aGUgc2xvcGUgb2YgdGhlIGxpbmUgYXQgdG0gaXMgZ2l2ZW4gYnkgcC5cbkBtZXRob2QgdGRwXG5AcGFyYW0geFxuQHBhcmFtIGZcbioqL1xubW9kdWxlLmV4cG9ydHMudGRwID0gZnVuY3Rpb24oeCwgZikge1xuICB2YXIgcCA9IGYuZjEgK1xuICAgICAgICAgIChmLmYwIC0gZi5mMSkgKlxuICAgICAgICAgIE1hdGguZXhwKCAtTWF0aC5sb2coMikgKiBNYXRoLnBvdyggKHgvZi50bSksIGYubiApKTtcbiAgcmV0dXJuIHA7XG59O1xuXG4vKipcbkBtZXRob2QgbGluXG5AcGFyYW0geFxuQHBhcmFtIHBcbiovXG5tb2R1bGUuZXhwb3J0cy5saW4gPSBmdW5jdGlvbih4LCBwKXtcbiAgaWYoIHggPCAwICkge1xuICAgIHJldHVybiBwLm1uO1xuICB9XG4gIGlmKCB4ID4gcC54bWF4ICkge1xuICAgIHJldHVybiBwLnhtYXg7XG4gIH1cbiAgcmV0dXJuIHAubW4gKyAocC5teC1wLm1uKSooeC9wLnhtYXgpO1xufTtcblxuLyoqXG51bml0cz0ndW5pdGxlc3MnLFxuZGVzY3JpcHRpb249J0Nhbm9weSBSYWluZmFsbCBpbnRlcmNlcHRpb24nXG5AbWV0aG9kIEludGNwdG5cbkBwYXJhbSBjdXJfTEFJXG5AcGFyYW0gY1xuKi9cbm1vZHVsZS5leHBvcnRzLkludGNwdG4gPSBmdW5jdGlvbihjdXJfTEFJLCBjKXtcbiAgcmV0dXJuIE1hdGgubWF4KGMubW4sYy5tbiArIChjLm14IC0gYy5tbikgKiBNYXRoLm1pbigxICwgY3VyX0xBSSAvIGMubGFpKSk7XG59O1xuXG4vKipcbnVuaXRzPSdtbScsXG5kZXNjcmlwdGlvbj0nQXZhaWxhYmxlIFNvaWwgV2F0ZXInXG5AbWV0aG9kIEFTV1xuQHBhcmFtIG1heEFTV1xuQHBhcmFtIHByZXZfQVNXXG5AcGFyYW0gZGF0ZV9wcHRcbkBwYXJhbSBjdXJfVHJhbnNwXG5AcGFyYW0gY3VyX0ludGNwdG5cbkBwYXJhbSBjdXJfSXJyaWdcbiovXG5tb2R1bGUuZXhwb3J0cy5BU1cgPSBmdW5jdGlvbihtYXhBU1csIHByZXZfQVNXLCBkYXRlX3BwdCwgY3VyX1RyYW5zcCwgY3VyX0ludGNwdG4sIGN1cl9JcnJpZyl7XG4gIHJldHVybiBNYXRoLm1pbihtYXhBU1cqMTAsIE1hdGgubWF4KHByZXZfQVNXICsgZGF0ZV9wcHQgLSAoY3VyX1RyYW5zcCArIGN1cl9JbnRjcHRuICogZGF0ZV9wcHQpICsgY3VyX0lycmlnLCAwKSk7XG59O1xuXG4vL1RPRE86IGRvdWJsZSBjaGVjayB0aGUgYXBwcm9wcmlhdGUgdXNlIG9mIHRkbWVhbiAoZGV3IHBvaW50IHRlbXApXG4vL1RPRE86IHRha2UgY29uc3RhbnRzIG91dFxuLyoqXG51bml0cz0na1BBJyxcbmRlc2NyaXB0aW9uPSdNZWFuIHZhcG9yIHByZXNzdXJlIGRlZmljaXQnXG5AbWV0aG9kIFZQRFxuQHBhcmFtIGRhdGVfdG1pblxuQHBhcmFtIGRhdGVfdG1heFxuQHBhcmFtIGRhdGVfdGRtZWFuXG4qL1xubW9kdWxlLmV4cG9ydHMuVlBEID0gZnVuY3Rpb24oZGF0ZV90bWluLCBkYXRlX3RtYXgsIGRhdGVfdGRtZWFuKXtcbiAgdmFyIHQgPSAoMC42MTA4IC9cbiAgICAgICAgICAgIDIgKlxuICAgICAgICAgICAgKFxuICAgICAgICAgICAgICBNYXRoLmV4cChkYXRlX3RtaW4gKiAxNy4yNyAvIChkYXRlX3RtaW4gKyAyMzcuMykgKSArXG4gICAgICAgICAgICAgIE1hdGguZXhwKGRhdGVfdG1heCAqIDE3LjI3IC8gKGRhdGVfdG1heCArIDIzNy4zKSApXG4gICAgICAgICAgICApXG4gICAgICAgICAgKSAtXG4gICAgICAgICAgKCAwLjYxMDggKlxuICAgICAgICAgICAgTWF0aC5leHAoZGF0ZV90ZG1lYW4gKiAxNy4yNyAvIChkYXRlX3RkbWVhbiArIDIzNy4zKSApXG4gICAgICAgICAgKTtcbiAgcmV0dXJuIHQ7XG59O1xuXG4vKipcbnVuaXRzID0gdW5pdGxlc3MsXG5kZXNjcmlwdGlvbj0nVmFwb3IgUHJlc3N1cmUgRGVmaWNpdCBNb2RpZmllciAoUG9wbGFyKSdcbkBtZXRob2QgZlZQRFxuQHBhcmFtIGtHXG5AcGFyYW0gY3VyX1ZQRFxuKi9cbm1vZHVsZS5leHBvcnRzLmZWUEQgPSBmdW5jdGlvbihrRywgY3VyX1ZQRCl7XG4gIHJldHVybiBNYXRoLmV4cCgtMSAqIGtHICogY3VyX1ZQRCk7XG59O1xuXG4vL1RPRE86IHRha2UgY29uc3RhbnRzIG91dFxuLy8gbWFrZSBhIG1lYW5pbmdmdWwgdGVtcHZhciBuYW1lXG4vKipcbnVuaXRzID0gdW5pdGxlc3MsXG5kZXNjcmlwdGlvbiA9ICdOdW1iZXIgb2YgRnJlZXplIERheXMgTW9kaWZpZXInXG5AbWV0aG9kIGZGcm9zdFxuQHBhcmFtIGRhdGVfdG1pblxuKi9cbm1vZHVsZS5leHBvcnRzLmZGcm9zdCA9IGZ1bmN0aW9uKGRhdGVfdG1pbikge1xuICB2YXIgdGVtcFZhciA9IC0xLjA7XG5cbiAgaWYoIGRhdGVfdG1pbiA+PSAwICl7XG4gICAgdGVtcFZhciA9IDEuMDtcbiAgfSAvL2Vsc2UgLTEuMFxuXG4gIHJldHVybiAwLjUgKiAoMS4wICsgdGVtcFZhciAqIE1hdGguc3FydCgxIC0gTWF0aC5leHAoLTEgKiBNYXRoLnBvdygoMC4xNyAqIGRhdGVfdG1pbikgLCAyKSAqICg0IC8gMy4xNDE1OSArIDAuMTQgKiBNYXRoLnBvdyggKDAuMTcgKiBkYXRlX3RtaW4pICwgMikgKSAvICgxICsgMC4xNCAqIE1hdGgucG93KCgwLjE3ICogZGF0ZV90bWluKSAsIDIpICkgKSApICk7XG59O1xuXG4vL1RPRE8gLSBiZXR0ZXIgbmFtaW5nPzogdG1pbiwgdG1heCA9IHdlYXRoZXIgVG9wdCwgVG1heCwgVG1pbiA9IHRyZWUgcGFyYW1zXG4vKipcbnVuaXRzPXVuaXRsZXNzLFxuZGVzY3JpcHRpb249J1RlbXBlcmF0dXJlIG1vZGlmaWVyJ1xuQG1ldGhvZCBmVFxuQHBhcmFtIHRhdmdcbkBwYXJhbSBmVFxuKi9cbm1vZHVsZS5leHBvcnRzLmZUID0gZnVuY3Rpb24odGF2ZywgZlQpe1xuICB2YXIgZjtcbiAgaWYodGF2ZyA8PSBmVC5tbiB8fCB0YXZnID49IGZULm14KXtcbiAgICBmID0gMDtcbiAgfSBlbHNlIHtcbiAgICBmID0gKCAodGF2ZyAtIGZULm1uKSAvIChmVC5vcHQgLSBmVC5tbikgKSAgKlxuICAgICAgICAgICBNYXRoLnBvdyAoICggKGZULm14IC0gdGF2ZykgLyAoZlQubXggLSBmVC5vcHQpICksXG4gICAgICAgICAgICAgICAgICAgICAgKCAoZlQubXggLSBmVC5vcHQpIC8gKGZULm9wdCAtIGZULm1uKSApXG4gICAgICAgICAgICAgICAgICAgICk7XG4gIH1cbiAgcmV0dXJuKGYpO1xufTtcblxuLyoqXG51bml0cz0nbW0vbW9uJyxcbmRlc2NyaXB0aW9uPSdSZXF1aXJlZCBJcnJpZ2F0aW9uJ1xuQG1ldGhvZCBJcnJpZ1xuQHBhcmFtIGlycmlnRnJhY1xuQHBhcmFtIGN1cl9UcmFuc3BcbkBwYXJhbSBjdXJfSW50Y3B0blxuQHBhcmFtIGRhdGVfcHB0XG4qL1xubW9kdWxlLmV4cG9ydHMuSXJyaWcgPSBmdW5jdGlvbihpcnJpZ0ZyYWMsIGN1cl9UcmFuc3AsIGN1cl9JbnRjcHRuLCBkYXRlX3BwdCl7XG4gICAgcmV0dXJuIE1hdGgubWF4KDAsIGlycmlnRnJhYyAqIChjdXJfVHJhbnNwIC0gKDEgLSBjdXJfSW50Y3B0bikgKiBkYXRlX3BwdCkgKTtcbn07XG5cbi8vVE9ETzogZ2V0IHVuaXRzIGFuZCBkZXNjcmlwdGlvblxuLyoqXG5AbWV0aG9kIGZTV1xuQHBhcmFtIEFTV1xuQHBhcmFtIG1heEFXU1xuQHBhcmFtIHN3Y29uc3RcbkBwYXJhbSBzd3Bvd2VyXG4qL1xubW9kdWxlLmV4cG9ydHMuZlNXID0gZnVuY3Rpb24oQVNXLCBtYXhBV1MsIHN3Y29uc3QsIHN3cG93ZXIpIHtcbiAgdmFyIGZTVztcbiAgaWYoIHN3Y29uc3QgPT09IDAgfHwgbWF4QVdTID09PSAwICkge1xuICAgIGZTVyA9IDA7XG4gIH0gZWxzZSB7XG4gICAgdmFyIG9tciA9IDEgLSAoQVNXLzEwKSAvIG1heEFXUzsgLy8gT25lIE1pbnVzIFJhdGlvXG5cbiAgICBpZihvbXIgPCAwLjAwMSkge1xuICAgICAgZlNXID0gMTtcbiAgICB9IGVsc2Uge1xuICAgICAgZlNXID0gKDEtTWF0aC5wb3cob21yLHN3cG93ZXIpKS8oMStNYXRoLnBvdyhvbXIvc3djb25zdCxzd3Bvd2VyKSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBmU1c7XG59O1xuXG4vKipcbnVuaXRzPSd1bml0bGVzcycsXG5kZXNjcmlwdGlvbj0nTnV0cml0aW9uYWwgRnJhY3Rpb24sIG1pZ2h0IGJlIGJhc2VkIG9uIHNvaWwgYW5kIGZlcnRpbGl6ZXIgYXQgc29tZSBwb2ludCdcbkBtZXRob2QgZk51dHJcbkBwYXJhbSBmTjBcbkBwYXJhbSBGUlxuKi9cbm1vZHVsZS5leHBvcnRzLmZOdXRyID0gZnVuY3Rpb24oZk4wLCBGUil7XG4gIHJldHVybiBmTjAgKyAoMSAtIGZOMCkgKiBGUjtcbn07XG5cbi8qKlxuVE9ETzogd2h5ICQzIGluIG1ha2VmaWxlIC0gYXNrIGFib3V0IGl0XG51bml0cz11bml0bGVzc1xuZGVzY3JpcHRpb249J1BoeXNpb2xvZ2ljYWwgTW9kaWZpZXIgdG8gY29uZHVjdGFuY2UgYW5kIEFQQVJ1J1xuQG1ldGhvZCBQaHlzTW9kXG5AcGFyYW0gY3VyX2ZWUERcbkBwYXJhbSBjdXJfZlNXXG5AcGFyYW0gY3VyX2ZBZ2VcbiovXG5tb2R1bGUuZXhwb3J0cy5QaHlzTW9kID0gZnVuY3Rpb24oY3VyX2ZWUEQsIGN1cl9mU1csIGN1cl9mQWdlKXtcbiAgIHJldHVybiBNYXRoLm1pbihjdXJfZlZQRCAsIGN1cl9mU1cpICogY3VyX2ZBZ2U7XG59O1xuXG4vKipcbnVuaXRzPSdnYyxtL3MnLFxuZGVzY3JpcHRpb249J0Nhbm9weSBDb25kdWN0YW5jZSdcbkBtZXRob2QgQ2FuQ29uZFxuQHBhcmFtIFBoeXNNb2RcbkBwYXJhbSBMQUlcbkBwYXJhbSBjb25kXG4qL1xubW9kdWxlLmV4cG9ydHMuQ2FuQ29uZCA9IGZ1bmN0aW9uKFBoeXNNb2QsIExBSSwgY29uZCl7XG4gICByZXR1cm4gTWF0aC5tYXgoY29uZC5tbiAsIGNvbmQubXggKiBQaHlzTW9kICogTWF0aC5taW4oMSAsIExBSSAvIGNvbmQubGFpKSApO1xufTtcblxuLyoqXG51bml0cz0nbW0vbW9uJyB3aGljaCBpcyBhbHNvIGtnL20yL21vblxuZGVzY3JpcHRpb249J0Nhbm9weSBNb250aGx5IFRyYW5zcGlyYXRpb24nXG5AbWV0aG9kIFRyYW5zcFxuQHBhcmFtIGRhdGVfbnJlbFxuQHBhcmFtIGRheXNcbkBwYXJhbSBkYXRlX2RheWxpZ2h0XG5AcGFyYW0gY3VyX1ZQRFxuQHBhcmFtIEJMY29uZFxuQHBhcmFtIGN1cl9DYW5Db25kXG4qL1xubW9kdWxlLmV4cG9ydHMuVHJhbnNwID0gZnVuY3Rpb24oZGF0ZV9ucmVsLCBkYXlzLCBkYXRlX2RheWxpZ2h0LCBjdXJfVlBELCBCTGNvbmQsIGN1cl9DYW5Db25kKXtcbiAgdmFyIFZQRGNvbnYgPSBjb25zdGFudCgnVlBEY29udicpO1xuICB2YXIgbGFtYmRhID0gY29uc3RhbnQoJ2xhbWJkYScpO1xuICB2YXIgcmhvQWlyID0gY29uc3RhbnQoJ3Job0FpcicpO1xuICB2YXIgZTIwID0gY29uc3RhbnQoJ2UyMCcpO1xuICB2YXIgUWEgPSBjb25zdGFudCgnUWEnKTtcbiAgdmFyIFFiID0gY29uc3RhbnQoJ1FiJyk7XG5cbiAgLy8gZGF0ZV9kYXlsaWdodCA9IGhvdXJzXG4gIC8vIG5yZWwgaXMgaW4gTUovbV4yL2RheSBjb252ZXJ0IHRvIFdoL21eMi9kYXlcbiAgdmFyIG5ldFJhZCA9IFFhICsgUWIgKiAoKGRhdGVfbnJlbCAqIDI3Ny43NzgpIC8gZGF0ZV9kYXlsaWdodCk7XG4gIHZhciBkZWZUZXJtID0gcmhvQWlyICogbGFtYmRhICogVlBEY29udiAqIGN1cl9WUEQgKiBCTGNvbmQ7XG4gIHZhciBkaXYgPSAxICsgZTIwICsgQkxjb25kIC8gY3VyX0NhbkNvbmQ7XG5cbiAgLy8gQ29udmVydCBkYXlsaWdodCB0byBzZWNzLlxuICByZXR1cm4gZGF5cyAqICggKGUyMCAqIG5ldFJhZCArIGRlZlRlcm0gKSAvIGRpdiApICogZGF0ZV9kYXlsaWdodCAqIDM2MDAgLyBsYW1iZGE7XG59O1xuXG4vKipcbnVuaXRzPSdtbS9tb24nIHdoaWNoIGlzIGFsc28ga2cvbTIvbW9uXG5kZXNjcmlwdGlvbj0nRVRyJ1xuQG1ldGhvZCBFVHJcbkBwYXJhbSBScyAoTUovbTIvZGF5KVxuQHBhcmFtIGRheXNcbkBwYXJhbSBUbSAodG1pbit0bWF4KS8yXG5AcGFyYW0gY3VyX1ZQRCA9IChlcy1lYSlcbkBwYXJhbSBlbGV2YXRpb24gKG0pXG5AcGFyYW0gd2luZF9zcGVlZCAobS9zKVxuKi9cblxubW9kdWxlLmV4cG9ydHMuRVRyID0gZnVuY3Rpb24oUnMsdG1pbix0bWF4LHRkbWVhbixkYXlzLFosdTIpe1xuICB1MiA9IHR5cGVvZiB1MiAhPT0gJ3VuZGVmaW5lZCcgPyB1MiA6IGNvbnN0YW50KCdhc2NlX2V0cl93aW5kc3BlZWQnKTtcbiAgWiA9IHR5cGVvZiBaICE9PSAndW5kZWZpbmVkJyA/IFogOiBjb25zdGFudCgnYXNjZV9ldHJfZWxldmF0aW9uJyk7XG5cbiAgLy8gRkFPIDU2IENyb3AgRXZhcG9yYXRpb25cbiAgdmFyIHBzeWNocm9tZXRyaWNfY29uc3RhbnQgPSBmdW5jdGlvbih6KSB7XG4gICAgdmFyIFA9MTAxLjMgKiBNYXRoLnBvdygoMjkzIC0gKDAuMDA2NSkqeikvMjkzLDUuMjYpO1xuICAgIGcgPSAwLjY2NSogTWF0aC5wb3coMTAsLTMpKlA7XG4gICAgcmV0dXJuIGc7XG4gIH07XG5cbiAgdmFyIHNsb3BlX29mX3NhdHVyYXRpb25fdmFwb3JfcHJlc3N1cmU9IGZ1bmN0aW9uKFRtKSB7XG4gICAgcmV0dXJuIDQwOTguMTcgKiAwLjYxMDggKiBNYXRoLmV4cChUbSAqIDE3LjI3IC8gKFRtICsgMjM3LjMpKSAvIE1hdGgucG93KChUbSArMjM3LjMpLDIpXG4gIH07XG5cbiAgdmFyIHZwID0gZnVuY3Rpb24oVCkge1xuICAgIHJldHVybiAwLjYxMDggKiBNYXRoLmV4cChUICogMTcuMjcgLyAoVCArIDIzNy4zKSk7XG4gIH07XG5cbiAgdmFyIFJubCA9IGZ1bmN0aW9uKHRtaW4sdG1heCx0ZG1lYW4sSykge1xuICAgIHJldHVybiAtKDEuMzUgKiBLIC0gMC4zNSkgKiAoMC4zNCAtIDAuMTQgKiBNYXRoLnNxcnQodnAodGRtZWFuKSkpICogTWF0aC5wb3coNC45MywtMDkpICogKChNYXRoLnBvdyh0bWluICsyNzMuMTYsNCkgKyBNYXRoLnBvdyh0bWF4ICsgMjczLjE2LDQpKSAvIDIpO1xuICB9XG4gIC8vMC40MDggKiBkZWx0YSAqICggUm4gLSBHKSArIHBzeWNoICogKENuIC8gKFQgKyAyNzMpKSAqIHUyICogKGVzIC1lYSApIC8gKGRlbHRhICsgcHN5Y2ggKiAoMSArIENkICogdTIgKSlcbiAgLy8gRVRyOntDbjoxNjAwLENkOjAuMzh9LEVUbzp7Q246OTAwLENkPTAuMzR9XG4gIC8vUm4gPSBNSiAvIG0yIGRheSA9PiBkYXRlX25yZWwgKE1KL21eMi9kYXkpXG4gIC8vRz0wXG4gIC8vdTIgPSBtL3NcbiAgLy8gVCA9IG1lYW4gVCAoQylcbiAgLy8gKGVzLWVhKSA9IHNhdHVyYXRpb24gVmFwb3IgUHJlc3N1cmUgKEtwYSkgPT4gY3VyX1ZQRFxuICB2YXIgVG09KHRtaW4rdG1heCkvMjtcbiAgdmFyIENuPTE2MDA7XG4gIHZhciBDZD0wLjM4O1xuICB2YXIgVlBEID0gKCh2cCh0bWluKSt2cCh0bWF4KSkvMiktdnAodGRtZWFuKTtcbiAgdmFyIGcgPSBwc3ljaHJvbWV0cmljX2NvbnN0YW50KFopO1xuICB2YXIgRCA9IHNsb3BlX29mX3NhdHVyYXRpb25fdmFwb3JfcHJlc3N1cmUoVG0pO1xuICB2YXIgUm5sID0gUm5sKHRtaW4sdG1heCx0ZG1lYW4sMS4wKTtcbiAgUm5sID0tOTAgLyAyNzcuMDtcbiAgdmFyIHJhZCA9IDAuNDA4ICogRCAqIChScyAqICgxIC0gMC4yMykgKyBSbmwpO1xuICB2YXIgZGVmID0gZyAqIChDbi8oVG0rMjczKSkgKiB1MiAqIFZQRDtcbiAgdmFyIGRpdiA9IEQgKyBnICogKDEgKyBDZCp1Mik7XG4gIHZhciBFVHIgPSAocmFkK2RlZikvZGl2O1xuIC8vIGNvbnNvbGUubG9nKHtUbTpUbSxEOkQsUm5sOlJubCxSczpScyxFVHI6RVRyfSlcbiAgLy8gQ29udmVydCBkYXlsaWdodCB0byBzZWNzLlxuICByZXR1cm4gZGF5cyAqIEVUcjtcbn07XG5cbi8vVE9ETzogZGVzY3JpcHRpb25cbi8qKlxudW5pdHM9J21ldHJpYyB0b25zIERyeSBNYXR0ZXIvaGEnLFxuQG1ldGhvZCBOUFBcbkBwYXJhbSBwcmV2X1N0YW5kQWdlXG5AcGFyYW0gZnVsbENhbkFnZVxuQHBhcmFtIHhQUFxuQHBhcmFtIGtcbkBwYXJhbSBwcmV2X0xBSVxuQHBhcmFtIGZWUERcbkBwYXJhbSBmU1dcbkBwYXJhbSBmQWdlXG5AcGFyYW0gYWxwaGFcbkBwYXJhbSBmTnV0clxuQHBhcmFtIGZUXG5AcGFyYW0gZkZyb3N0XG4qL1xubW9kdWxlLmV4cG9ydHMuTlBQID0gZnVuY3Rpb24ocHJldl9TdGFuZEFnZSwgZnVsbENhbkFnZSwgeFBQLCBrLCBwcmV2X0xBSSwgZlZQRCwgZlNXLCBmQWdlLCBhbHBoYSwgZk51dHIsIGZULCBmRnJvc3Qpe1xuICB2YXIgQ2FuQ292ZXIgPSAxO1xuICBpZiggcHJldl9TdGFuZEFnZSA8IGZ1bGxDYW5BZ2UgKXtcbiAgICBDYW5Db3ZlciA9IHByZXZfU3RhbmRBZ2UgLyBmdWxsQ2FuQWdlO1xuICB9XG5cbiAgcmV0dXJuIHhQUCAqICgxIC0gKE1hdGguZXhwKC1rICogcHJldl9MQUkpICkgKSAqIENhbkNvdmVyICogTWF0aC5taW4oZlZQRCAsIGZTVykgKiBmQWdlICogYWxwaGEgKiBmTnV0ciAqIGZUICogZkZyb3N0O1xufTtcblxuLy9UT0RPOiB1bml0cyBhbmQgZGVzY3JpcHRpb25cbi8qKlxuQG1ldGhvZCBwUlxuQHBhcmFtIGN1cl9QaHlzTW9kXG5AcGFyYW0gY3VyX3BSXG5AcGFyYW0gRlJcbkBwYXJhbSBwUlxuKi9cbm1vZHVsZS5leHBvcnRzLnBSID0gZnVuY3Rpb24oY3VyX1BoeXNNb2QsIGN1cl9wUixGUixwUil7XG4gIHZhciBwID0ocFIubXggKiBwUi5tbikgL1xuICAgICAgICAgKHBSLm1uICsgKHBSLm14IC0gcFIubW4pICogY3VyX1BoeXNNb2QgKiAocFIubTAgKyAoMSAtIHBSLm0wKSAqIEZSKSApO1xuXG4gIC8vIFRoaXMgd2FzIGFkZGVkIGJ5IHF1aW5uIHRvIGxpbWl0IHJvb3QgZ3Jvd3RoLlxuICByZXR1cm4gcCAqIE1hdGgucG93KHAvY3VyX3BSLDIpO1xufTtcblxuXG4vL1RPRE86IG1vbHMgb3IgbW9scyBwZXIgbV4yP1xuLyoqXG51bml0cz1tb2xzXG5kZXNjcmlwdGlvbj0nTW9udGhseSBQQVIgaW4gbW9scyAvIG1eMiBtb250aCdcbm1vbFBBUl9NSiBbbW9sL01KXSBpcyBhIGNvbnN0YW50IENvbnZlcnNpb24gb2Ygc29sYXIgcmFkaWF0aW9uIHRvIFBBUlxuQG1ldGhvZCBQQVJcbkBwYXJhbSBkYXRlX3JhZFxuQHBhcmFtIG1vbFBBUl9NSlxuKi9cbm1vZHVsZS5leHBvcnRzLlBBUiA9IGZ1bmN0aW9uKGRhdGVfcmFkLCBkYXlzLCBtb2xQQVJfTUopIHtcbiAgaWYoIG1vbFBBUl9NSiA9PT0gbnVsbCB8fCBtb2xQQVJfTUogPT09IHVuZGVmaW5lZCApIHtcbiAgICBtb2xQQVJfTUogPSBjb25zdGFudCgnbW9sUEFSX01KJyk7XG4gIH1cblxuICByZXR1cm4gZGF0ZV9yYWQgKiBtb2xQQVJfTUogKiBkYXlzO1xufTtcblxuLyoqXG51bml0cz0nbWV0cmljIHRvbnMgRHJ5IE1hdHRlci9oYScsXG5kZXNjcmlwdGlvbj0nbWF4aW11bSBwb3RlbnRpYWwgUHJpbWFyeSBQcm9kdWN0aW9uIFt0RE0gLyBoYSBtb250aF0sXG5OT1RFOiAxMDAwMC8xMF42IFtoYS9tMl1bdERtL2dETV1cbmdHTV9tb2wgW2cvbW9sXSBpcyB0aGUgbW9sZWN1bGFyIHdlaWdodCBvZiBkcnkgbWF0dGVyXG5AbWV0aG9kIHhQUFxuQHBhcmFtIHlcbkBwYXJhbSBjdXJfUEFSXG5AcGFyYW0gZ0RNX21vbFxuKi9cbm1vZHVsZS5leHBvcnRzLnhQUCA9IGZ1bmN0aW9uKHksIGN1cl9QQVIsIGdETV9tb2wpe1xuICAgIGlmKCBnRE1fbW9sID09PSBudWxsIHx8IGdETV9tb2wgPT09IHVuZGVmaW5lZCApIHtcbiAgICAgIGdETV9tb2wgPSBjb25zdGFudCgnZ0RNX21vbCcpO1xuICAgIH1cblxuICAgIHJldHVybiB5ICogY3VyX1BBUiAqIGdETV9tb2wgLyAxMDA7XG59O1xuXG4vKioqIEZVTkNUSU9OUyBGT1IgQ09QUElDSU5HICovXG4vKipcbmNvcHBpY2UgcmVsYXRlZCBmdW5jdGlvbnNcbkBtZXRob2QgY29wcGljZVxuKi9cbm1vZHVsZS5leHBvcnRzLmNvcHBpY2UgPSB7XG4gIC8vIENvcHBpY2UgRnVuY3Rpb25zIGFyZSBiYXNlZCBvbiBEaWFtZXRlciBvbiBTdHVtcCwgTk9UIERCSC5cbiAgLy8gQ2FsY3VsYXRlcyB0aGUgcGZzIGJhc2VkIG9uIHRoZSBzdGVtIHdlaWdodCBpbiBLR1xuICBwZnMgOiBmdW5jdGlvbihzdGVtLCBwKSB7XG4gICAgdmFyIGF2RE9CID0gTWF0aC5wb3coICggc3RlbSAvIHAuc3RlbUNudCAvIHAuc3RlbUMpICwgKDEgLyBwLnN0ZW1QKSApO1xuICAgIHZhciBwcGZzPSBwLnBmc0MgKiBNYXRoLnBvdyhhdkRPQiAsIHAucGZzUCk7XG5cbiAgICByZXR1cm4gTWF0aC5taW4ocC5wZnNNeCxwcGZzKTtcbiAgfSxcblxuICAvLyBDYWxjdWxhdGVzIHRoZSBwZnMgYmFzZWQgb24gc3RlbSB3aXRoIGluIEcuICBVc2VzIHZvbHVtZSBJbmRleCBhcyBndWlkZVxuICBwZnNfdmlhX1ZJIDogZnVuY3Rpb24gKHN0ZW1HLCB3c1ZJLCBsYVZJLCBTTEEpIHtcbiAgICBpZiAoc3RlbUcgPCAxMCkge1xuICAgICAgc3RlbUcgPSAxMDtcbiAgICB9XG4gICAgdmFyIFZJID0gTWF0aC5wb3coIChzdGVtRyAvIHdzVkkuc3RlbXNfcGVyX3N0dW1wIC8gd3NWSS5jb25zdGFudCksKDEgLyB3c1ZJLnBvd2VyKSApO1xuXG4gICAgLy8gQWRkIHVwIGZvciBhbGwgc3RlbXNcbiAgICB2YXIgbGEgPSBsYVZJLmNvbnN0YW50ICogTWF0aC5wb3coVkksbGFWSS5wb3dlcikgKiB3c1ZJLnN0ZW1zX3Blcl9zdHVtcDtcbiAgICB2YXIgd2YgPSAxMDAwICogKGxhIC8gU0xBKTsgIC8vIEZvaWxhZ2UgV2VpZ2h0IGluIGc7XG4gICAgdmFyIHBmcyA9IHdmL3N0ZW1HO1xuICAgIHJldHVybiBwZnM7XG4gIH0sXG5cbiAgUm9vdFAgOiBmdW5jdGlvbihjdXJfbnBwLCBjdXJfbnBwVGFyZ2V0LCBXUixXLHBSeCxmcmFjKSB7XG4gICAgdmFyIG5wcFJlcyA9IGN1cl9ucHBUYXJnZXQgLSBjdXJfbnBwO1xuICAgIHZhciByb290UFA7XG4gICAgaWYoIG5wcFJlcyA+IDAgJiYgV1IvVyA+IHBSeCApIHtcbiAgICAgICAgcm9vdFBQID0gTWF0aC5taW4obnBwUmVzLCBXUiooV1IvVyAtIHBSeCkqZnJhYyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJvb3RQUCA9IDA7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJvb3RQUDtcbiAgfVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICByZWFkIDogZnVuY3Rpb24obW9kZWwpIHtcbiAgICAvLyBUT0RPIDogaW1wbGVtZW50XG4gICAgLy8gWW91IG5lZWQgdG8gc2V0IHlvdXIgSU8gaGVyZSBhbmQgbWFrZSBzdXJlIGFsbCBwYXJhbWV0ZXJzIGZvciBtb2RlbCBhcmUgY29ycmVjdGx5IHNldFxuICB9LFxuICBkdW1wIDogZnVuY3Rpb24oKSB7XG4gICAgLy8gVE9ETyA6IGltcGxlbWVudFxuICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZm4gPSByZXF1aXJlKCcuL2ZuJyk7XG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIgZGF0YU1vZGVsID0gcmVxdWlyZSgnLi9kYXRhTW9kZWwnKTtcbnZhciB2YWxpZGF0ZSA9IHJlcXVpcmUoJy4vdmFsaWRhdGUnKTtcblxuZnVuY3Rpb24gcnVuKGxlbmd0aE9mR3Jvd3RoKSB7XG5cbiAgICB2YXIgeWVhclRvQ29wcGljZTsgLy95ZWFyIG9mIHRoZSBmaXJzdCBvciBzdWJzZXF1ZW50IGhhcnZlc3RzXG4gICAgdmFyIGNvcHBpY2VJbnRlcnZhbDsgLy90aGUgIyBvZiBtb250aHMgaW4gYSBzaW5nbGUgY29wcGljZSBjeWNsZVxuICAgIHZhciBtb250aFRvQ29wcGljZTsgLy9hdCB3aGljaCBtb250aCB0aGUgaGFydmVzdCBpcyB0byBiZSBwZXJmb3JtZWQgOjogY3VycmVudGx5IHRoZSB0cmVlIHdpbGwgYmUgY3V0IGF0IHRoZSBiZWdpbm5pbmcgb2YgdGhhdCBtb250aFxuICAgIHZhciBjb3BwaWNlRGF0ZXM7XG5cbiAgICAvLyBoZWxwZXIsIG5vdCByZXF1aXJlZC4gIHlvdSBjYW4gcmVnaXN0ZXIgY2FsbGJhY2sgdG8gc2V0IHBhcmFtZXRlcnMgd2hlbmV2ZXIgcnVuIGlzIGNhbGxlZFxuICAgIHRoaXMuaW8ucmVhZCh0aGlzKTtcblxuICAgIC8vIG1ha2Ugc3VyZSBtb2RlbCBpbnB1dHMgYXJlIHZhbGlkIGJlZm9yZSB3ZSBwcm9jZWVkIGFueSBmdXJ0aGVyXG4gICAgdmFsaWRhdGUodGhpcyk7XG5cbiAgICB0aGlzLmN1cnJlbnREYXRlID0gbmV3IERhdGUodGhpcy5tYW5hZ2UuZGF0ZVBsYW50ZWQpO1xuICAgIC8vdmFyIHBsYW50ZWRNb250aCA9IHRoaXMuY3VycmVudERhdGUuZ2V0TW9udGgoKTtcbiAgICAvL3ZhciBjdXJyZW50TW9udGggPSB0aGlzLmN1cnJlbnREYXRlLmdldE1vbnRoKCk7XG5cbiAgICAvL1RPRE86IHRlc3Qgbm8gZGF0ZWNvcHBpY2UgYXMgaW5wdXRcbiAgICBpZiAoIHRoaXMubWFuYWdlLmRhdGVDb3BwaWNlZCAhPT0gdW5kZWZpbmVkICl7XG4gICAgICB5ZWFyVG9Db3BwaWNlID0gdGhpcy5tYW5hZ2UuZGF0ZUNvcHBpY2VkLmdldEZ1bGxZZWFyKCk7XG4gICAgICBtb250aFRvQ29wcGljZSA9IHRoaXMubWFuYWdlLmRhdGVDb3BwaWNlZC5nZXRNb250aCgpO1xuICAgICAgY29wcGljZUludGVydmFsID0gdGhpcy5tYW5hZ2UueWVhcnNQZXJDb3BwaWNlO1xuICAgIH1cblxuICAgIGlmKCB0aGlzLm1hbmFnZS5jb3BwaWNlRGF0ZXMgIT09IHVuZGVmaW5lZCApIHtcbiAgICAgIGNvcHBpY2VEYXRlcyA9IFtdO1xuXG4gICAgICBmb3IoIHZhciBpID0gMDsgaSA8IHRoaXMubWFuYWdlLmNvcHBpY2VEYXRlcy5sZW5ndGg7IGkrKyApIHtcbiAgICAgICAgdmFyIHBhcnRzID0gdGhpcy5tYW5hZ2UuY29wcGljZURhdGVzW2ldLnNwbGl0KCctJyk7XG5cbiAgICAgICAgdmFyIGQgPSAxNTtcbiAgICAgICAgaWYoIHBhcnRzLmxlbmd0aCA+IDIgKSB7XG4gICAgICAgICAgZCA9IHBhcnNlSW50KHBhcnRzWzJdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvcHBpY2VEYXRlcy5wdXNoKG5ldyBEYXRlKHBhcnNlSW50KHBhcnRzWzBdKSwgcGFyc2VJbnQocGFydHNbMV0pLTEsIGQpKTtcbiAgICAgIH1cbiAgICB9XG5cblxuICAgIC8vIGluaXQgbWFuYWdlIG5zXG4gICAgdGhpcy5tYW5hZ2UuY29wcGljZSA9IGZhbHNlO1xuXG4gICAgaWYoIHRoaXMuZGVidWcgKSB7XG4gICAgICBjb25zb2xlLmxvZyh0aGlzLmN1cnJlbnREYXRlKTtcbiAgICB9XG5cbiAgICB2YXIgc2V0dXAgPSB7XG4gICAgICBsZW5ndGhPZkdyb3d0aCA6IGxlbmd0aE9mR3Jvd3RoLFxuICAgICAgeWVhclRvQ29wcGljZSA6IHllYXJUb0NvcHBpY2UsXG4gICAgICBtb250aFRvQ29wcGljZSA6IG1vbnRoVG9Db3BwaWNlLFxuICAgICAgY29wcGljZUludGVydmFsIDogY29wcGljZUludGVydmFsLFxuICAgICAgY29wcGljZURhdGVzIDogY29wcGljZURhdGVzXG4gICAgfTtcblxuICAgIHJldHVybiB0aGlzLnJ1blNldHVwKHNldHVwKTtcbn1cblxuZnVuY3Rpb24gcnVuU2V0dXAoc2V0dXApe1xuICAgIHZhciBpLCBrZXksIGN1cnJlbnRXZWF0aGVyLCBzdGVwLCB0O1xuXG4gICAgdmFyIGRheXNfaW5faW50ZXJ2YWwgPSAodGhpcy5zZXR1cCAmJiB0aGlzLnNldHVwLmRheXNfaW5faW50ZXJ2YWwpID8gdGhpcy5zZXR1cC5kYXlzX2luX2ludGVydmFsIDogMTtcblxuICAgIGlmKCB0aGlzLmRlYnVnICkge1xuICAgICAgdCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgY29uc29sZS5sb2coJ2RheXNfaW5faW50ZXJ2YWw6ICcrIGRheXNfaW5faW50ZXJ2YWwpO1xuICAgIH1cblxuICAgIHZhciBtID0gKHRoaXMuY3VycmVudERhdGUuZ2V0TW9udGgoKSsxKSsnJztcbiAgICBpZiggbS5sZW5ndGggPT09IDEgKSB7XG4gICAgICBtID0gJzAnK207XG4gICAgfVxuXG4gICAgdmFyIGQgPSAodGhpcy5jdXJyZW50RGF0ZS5nZXREYXRlKCkpKycnO1xuICAgIGlmKCBkLmxlbmd0aCA9PT0gMSApIHtcbiAgICAgIGQgPSAnMCcrZDtcbiAgICB9XG5cbiAgICAvL3ZhciBjdXJyZW50V2VhdGhlciA9IGdldFdlYXRoZXIodGhpcywgc2V0dXAsIG0sIGQpO1xuICAgIHZhciBmaXJzdFN0ZXBSZXN1bHRzID0gaW5pdCh0aGlzLnBsYW50YXRpb24sIHRoaXMuc29pbCk7XG5cbiAgICB2YXIga2V5c0luT3JkZXIgPSBbXTtcbiAgICB2YXIgaGVhZGVyID0gWydkYXRlJ107XG4gICAgZm9yKCBrZXkgaW4gZGF0YU1vZGVsLnBsYW50YXRpb25fc3RhdGUudmFsdWUgKSB7XG4gICAgICBrZXlzSW5PcmRlci5wdXNoKGtleSk7XG4gICAgICBoZWFkZXIucHVzaChrZXkpO1xuICAgIH1cblxuICAgIGZpcnN0U3RlcFJlc3VsdHMuRGF0ZSA9IHRoaXMuY3VycmVudERhdGUuZ2V0RnVsbFllYXIoKSsnLScrbSsnLScrZDtcblxuICAgIHZhciByb3dzID0gW107IC8vdGhlc2Ugd2lsbCBiZWNvbWUgcm93c1xuICAgIHJvd3MucHVzaChoZWFkZXIpO1xuXG4gICAgdmFyIGZpcnN0Um93ID0gW2ZpcnN0U3RlcFJlc3VsdHMuRGF0ZV07XG4gICAgZm9yKCBpID0gMDsgaSA8IGtleXNJbk9yZGVyLmxlbmd0aDsgaSsrKXtcbiAgICAgIGtleSA9IGtleXNJbk9yZGVyW2ldO1xuICAgICAgZmlyc3RSb3cucHVzaChmaXJzdFN0ZXBSZXN1bHRzW2tleV0pO1xuICAgIH1cbiAgICByb3dzLnB1c2goZmlyc3RSb3cpO1xuXG4gICAgdmFyIGN1cnJlbnRTdGVwUmVzdWx0cyA9IGZpcnN0U3RlcFJlc3VsdHM7XG4gICAgdmFyIG5leHRTdGVwUmVzdWx0cztcblxuICAgIGZvcihzdGVwID0gMTsgc3RlcCA8IHNldHVwLmxlbmd0aE9mR3Jvd3RoOyBzdGVwKyspIHtcbiAgICAgIHRoaXMuY3VycmVudERhdGUgPSBuZXcgRGF0ZSh0aGlzLm1hbmFnZS5kYXRlUGxhbnRlZCk7XG4gICAgICB0aGlzLmN1cnJlbnREYXRlLnNldERhdGUodGhpcy5tYW5hZ2UuZGF0ZVBsYW50ZWQuZ2V0RGF0ZSgpICsgc3RlcCAqIGRheXNfaW5faW50ZXJ2YWwpOyAvLyBhZGQgYSBkYXkgdG8gY3VycmVudCBkYXRlXG4vLyAgICAgIHRoaXMuY3VycmVudERhdGUuc2V0RGF0ZSh0aGlzLm1hbmFnZS5kYXRlUGxhbnRlZC5nZXREYXRlKCkgKyBzdGVwKnNldHVwLmRheXNfaW5faW50ZXJ2YWwpOyAvLyBhZGQgYSBkYXkgdG8gY3VycmVudCBkYXRlXG5cbiAgICAgIGlmKCBzaG91bGRDb3BwaWNlKHRoaXMsIHNldHVwLCBkYXlzX2luX2ludGVydmFsKSApIHtcbiAgICAgICAgaWYoIHRoaXMuZGVidWcgKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ1RpbWUgdG8gQ29wcGljZSEnKTtcbiAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmN1cnJlbnREYXRlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubWFuYWdlLmNvcHBpY2UgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5tYW5hZ2UuY29wcGljZSA9IGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBtID0gKHRoaXMuY3VycmVudERhdGUuZ2V0TW9udGgoKSsxKSsnJztcbiAgICAgIGlmKCBtLmxlbmd0aCA9PT0gMSApIHtcbiAgICAgICAgbSA9ICcwJyttO1xuICAgICAgfVxuXG4gICAgICBkID0gdGhpcy5jdXJyZW50RGF0ZS5nZXREYXRlKCkrJyc7XG4gICAgICBpZiggZC5sZW5ndGggPT09IDEgKSB7XG4gICAgICAgIGQgPSAnMCcrZDtcbiAgICAgIH1cblxuICAgICAgY3VycmVudFdlYXRoZXIgPSBnZXRXZWF0aGVyKHRoaXMsIHNldHVwLCBtLCBkKTtcblxuICAgICAgLy9UT0RPOiBzd2l0Y2ggdXAgdHJlZXMgaGVyZSB3aGVuIGFmdGVyIHRoZSBmaXJzdCBoYXJ2ZXN0XG4gICAgICBuZXh0U3RlcFJlc3VsdHMgPSBzaW5nbGVTdGVwKHRoaXMucGxhbnRhdGlvbiwgdGhpcy5zb2lsLCBjdXJyZW50V2VhdGhlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYW5hZ2UsIGN1cnJlbnRTdGVwUmVzdWx0cywgZGF5c19pbl9pbnRlcnZhbCk7XG4gICAgICBuZXh0U3RlcFJlc3VsdHMuRGF0ZSA9IHRoaXMuY3VycmVudERhdGUuZ2V0RnVsbFllYXIoKSsnLScrbSsnLScrZDtcblxuICAgICAgdmFyIHRoaXNSb3cgPSBbbmV4dFN0ZXBSZXN1bHRzLkRhdGVdO1xuICAgICAgZm9yKCBpID0gMDsgaSA8IGtleXNJbk9yZGVyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGtleSA9IGtleXNJbk9yZGVyW2ldO1xuICAgICAgICB0aGlzUm93LnB1c2gobmV4dFN0ZXBSZXN1bHRzW2tleV0pO1xuICAgICAgfVxuXG4gICAgICBjdXJyZW50U3RlcFJlc3VsdHMgPSBuZXh0U3RlcFJlc3VsdHM7XG4gICAgICByb3dzLnB1c2godGhpc1Jvdyk7XG4gICAgfVxuXG4gICAgdGhpcy5pby5kdW1wKHJvd3MpO1xuXG4gICAgaWYoIHRoaXMuZGVidWcgKSB7XG4gICAgICBjb25zb2xlLmxvZyhzdGVwKTtcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMuY3VycmVudERhdGUpO1xuICAgICAgY29uc29sZS5sb2coKG5ldyBEYXRlKCkuZ2V0VGltZSgpLXQpKydtcycpO1xuICAgIH1cblxuICAgIHJldHVybiByb3dzO1xufVxuXG5mdW5jdGlvbiBzaW5nbGVTdGVwKHBsYW50YXRpb24sIHNvaWwsIHdlYXRoZXIsIG1hbmFnZSwgcCwgZGF5c19pbl9pbnRlcnZhbCkgeyAvL3AgPSBwcmV2aW91cyBzdGF0ZVxuICB2YXIgYyA9IHt9OyAvL2N1cnJlbnQgc3RhdGVcblxuICBpZiggbWFuYWdlLmNvcHBpY2UgPT09IHRydWUgKSB7IC8vY2hhbmdlIHRoaXMgZ3V5IGZvciB0aGUgbW9udGggd2hlbiBjb3BwaWNlXG4gICAgLy8gQWRkIGluIGEgc3R1bXAgbWFyZ2luLi4uLlxuICAgIGMuZmVlZHN0b2NrSGFydmVzdCA9IHAuZmVlZHN0b2NrSGFydmVzdCArIHAuV1M7XG4gICAgYy5jb3BwaWNlQ291bnQgPSBwLmNvcHBpY2VDb3VudCArIDE7XG4gICAgYy5jb3BwaWNlQWdlID0gMDtcbiAgICBwLkxBSSA9IDA7XG4gICAgcC5XUyA9IDA7XG4gICAgcC5XRiA9IDA7XG4gICAgcC5XID0gcC5XUjtcbiAgfSBlbHNlIHtcbiAgICBjLmZlZWRzdG9ja0hhcnZlc3QgPSBwLmZlZWRzdG9ja0hhcnZlc3Q7XG4gICAgYy5jb3BwaWNlQ291bnQgPSBwLmNvcHBpY2VDb3VudDtcbiAgICBjLmNvcHBpY2VBZ2UgPSBwLmNvcHBpY2VBZ2UgKyBkYXlzX2luX2ludGVydmFsLzM2NS4wO1xuICB9XG5cbiAgdmFyIHRyZWU7IC8vdHJlZVxuICBpZiggYy5jb3BwaWNlQ291bnQgPT09IDAgKSB7IC8vVE9ETzogY2hlY2sgdGhlIGNhc2Ugd2hlcmUgd2Ugc3RhcnQgd2l0aCBhIGNvcHBpY2VkIG11bHRpIHN0dW1wIHRyZWVcbiAgICAgIHRyZWUgPSBwbGFudGF0aW9uLnNlZWRsaW5nVHJlZTtcbiAgfSBlbHNlIHtcbiAgICAgIHRyZWUgPSBwbGFudGF0aW9uLmNvcHBpY2VkVHJlZTtcbiAgfVxuXG4gIGMuU3RhbmRBZ2UgPSBwLlN0YW5kQWdlICsgZGF5c19pbl9pbnRlcnZhbC8zNjUuMDtcbiAgdmFyIHNsYSA9IGZuLnRkcChwLlN0YW5kQWdlLCB0cmVlLlNMQSk7XG4gIGMuTEFJID0gcC5XRiAqIDAuMSAqIHNsYTsgLy8gTGFuZHNidXJnIGVxIDkuNVxuXG4gIC8vIEpNIC0gUGVyIHNlY3Rpb24gMi4xICBMYW5kc2JlcmcvV2FyaW5nXG4gIGMuVlBEID0gZm4uVlBEKHdlYXRoZXIudG1pbiwgd2VhdGhlci50bWF4LCB3ZWF0aGVyLnRkbWVhbik7XG4gIC8vYy5WUEQgPSBmbi5WUEQod2VhdGhlci50bWluLCB3ZWF0aGVyLnRtYXgsIHdlYXRoZXIudGRtZWFuLCBkYXlzX2luX2ludGVydmFsKTtcblxuXG4gIGMuZlZQRCA9IGZuLmZWUEQodHJlZS5rRywgYy5WUEQpO1xuXG4gIGMuZlNXID0gZm4uZlNXKHAuQVNXLCBzb2lsLm1heEFXUywgc29pbC5zd2NvbnN0LCBzb2lsLnN3cG93ZXIpO1xuICBjLmZBZ2UgPSBmbi50ZHAocC5TdGFuZEFnZSwgdHJlZS5mQWdlKTtcblxuICAvLyBmRnJvc3QgaXMgYSBjdW11bGF0aXZlIE5vcm1hbCBkaXN0cmlidXRpb24sIHRoYXQgYXBwcm9peG1hdGVzIHRoZSBudW1iZXIgb2YgZGF5cyAob3IgcGFydHMgb2YgZGF5cykgdGhhdFxuICAvLyB3aWxsIGJlIGJlbG93IDAsIGdpdmVuIGEgbWluaW11bSB0ZW1wZXJhdHVyZVxuICBjLmZGcm9zdCA9IGZuLmZGcm9zdCh3ZWF0aGVyLnRtaW4pO1xuXG4gIGMuUEFSID0gZm4uUEFSKHdlYXRoZXIucmFkLCBkYXlzX2luX2ludGVydmFsKTsgLy8gIFBBUiBpbiBtb2xzXG5cbiAgYy5mVCA9IGZuLmZUKCh3ZWF0aGVyLnRtaW4gKyB3ZWF0aGVyLnRtYXgpLzIsIHRyZWUuZlQpO1xuXG4gIGMuUGh5c01vZCA9IGZuLlBoeXNNb2QoYy5mVlBELCBjLmZTVywgYy5mQWdlKTtcbiAgYy5mTnV0ciA9IGZuLmZOdXRyKHRyZWUuZk4wLCBtYW5hZ2UuZmVydGlsaXR5KTtcbiAgYy54UFAgPSBmbi54UFAodHJlZS55LCBjLlBBUik7IC8vIG1heGltdW0gcG90ZW50aWFsIFByaW1hcnkgUHJvZHVjdGlvbiBwZXIgbW9udGhcbiAgYy5OUFAgPSBmbi5OUFAocC5jb3BwaWNlQWdlLCB0cmVlLmZ1bGxDYW5BZ2UsIGMueFBQLCB0cmVlLmssIHAuTEFJLCBjLmZWUEQsIGMuZlNXLCBjLmZBZ2UsIHRyZWUuYWxwaGEsIGMuZk51dHIsIGMuZlQsIGMuZkZyb3N0KTtcblxuICB2YXIgTlBQX3RhcmdldCA9IGZuLk5QUCh0cmVlLmZ1bGxDYW5BZ2UsIHRyZWUuZnVsbENhbkFnZSwgYy54UFAsIHRyZWUuaywgdHJlZS5yb290UC5MQUlUYXJnZXQsIGMuZlZQRCwgYy5mU1csIGMuZkFnZSwgdHJlZS5hbHBoYSwgYy5mTnV0ciwgYy5mVCwgYy5mRnJvc3QpO1xuLy8gSk1cbiAgYy5Sb290UCA9IGZuLmNvcHBpY2UuUm9vdFAoYy5OUFAsIE5QUF90YXJnZXQsIHAuV1IsIHAuVywgdHJlZS5wUi5teCwgdHJlZS5yb290UC5mcmFjICogKGRheXNfaW5faW50ZXJ2YWwgLyAzMC40KSk7XG5cbiAgaWYgKHRyZWUubGFWSSAmJiB0cmVlLmxhVkkuY29uc3RhbnQgKSB7IC8vIFRlc3QgZm9yIHRoYXQgZnVuY3Rpb25cbiAgICBjLnBmcyA9IGZuLmNvcHBpY2UucGZzX3ZpYV9WSShwLldTKjEwMDAwMDAvcGxhbnRhdGlvbi5TdG9ja2luZ0RlbnNpdHksIHRyZWUud3NWSSx0cmVlLmxhVkksc2xhKTtcbiAgfSBlbHNlIHtcbiAgICBjLnBmcyA9IGZuLmNvcHBpY2UucGZzKHAuV1MqMTAwMC9wbGFudGF0aW9uLlN0b2NraW5nRGVuc2l0eSwgdHJlZS5wZnMpO1xuICB9XG5cbiAgYy5kVyA9IGMuTlBQICsgdHJlZS5yb290UC5lZmZpY2llbmN5ICogYy5Sb290UDtcblxuICBjLkludGNwdG4gPSBmbi5JbnRjcHRuKGMuTEFJLCB0cmVlLkludGNwdG4pO1xuICBjLkNhbkNvbmQgPSBmbi5DYW5Db25kKGMuUGh5c01vZCwgYy5MQUksIHRyZWUuQ29uZHVjdGFuY2UpO1xuXG4gIGMucFIgPSBmbi5wUihjLlBoeXNNb2QsIHAuV1IvcC5XLCBtYW5hZ2UuZmVydGlsaXR5LCB0cmVlLnBSKTtcblxuICAvLyBKTSAtIHRyZWUgbGl0dGVyZmFsbCBpcyBhIG1vbnRobHkgcGFyYW1ldGVyLlxuICBjLmxpdHRlcmZhbGwgPSBmbi50ZHAocC5TdGFuZEFnZSwgdHJlZS5saXR0ZXJmYWxsKSAqIChkYXlzX2luX2ludGVydmFsIC8gMzAuNCk7XG5cbiAgYy5UcmFuc3AgPSBmbi5UcmFuc3Aod2VhdGhlci5yYWQsIGRheXNfaW5faW50ZXJ2YWwsIHdlYXRoZXIuZGF5bGlnaHQsIGMuVlBELCB0cmVlLkJMY29uZCwgYy5DYW5Db25kKTtcbiAgYy5FVHIgPSBmbi5FVHIod2VhdGhlci5yYWQsIHdlYXRoZXIudG1pbiwgd2VhdGhlci50bWF4LCB3ZWF0aGVyLnRkbWVhbiwgZGF5c19pbl9pbnRlcnZhbCk7XG4gIGMuS2MgPSBjLlRyYW5zcC9jLkVUcjtcblxuXG4gIC8vIENhbGN1bGF0ZWQgZnJvbSBwZnNcbiAgYy5wUyA9ICgxIC0gYy5wUikgLyAoMSArIGMucGZzICk7XG4gIGMucEYgPSAoMSAtIGMucFIpIC8gKDEgKyAxL2MucGZzICk7XG5cbiAgYy5JcnJpZyA9IGZuLklycmlnKG1hbmFnZS5pcnJpZ0ZyYWMsIGMuVHJhbnNwLCBjLkludGNwdG4sIHdlYXRoZXIucHB0KTtcbiAgYy5DdW1JcnJpZyA9IHAuQ3VtSXJyaWcgKyBjLklycmlnO1xuXG4gIGMuQVNXID0gZm4uQVNXKHNvaWwubWF4QVdTLCBwLkFTVywgd2VhdGhlci5wcHQsIGMuVHJhbnNwLCBjLkludGNwdG4sIGMuSXJyaWcpOyAvL2ZvciBzb21lIHJlYXNvbiBzcGVsbGVkIG1heEFXU1xuXG4gIGMuV0YgPSBwLldGICsgYy5kVyAqIGMucEYgLSBjLmxpdHRlcmZhbGwgKiBwLldGO1xuICAvLyBJbmNsdWRlIGNvbnRyaWJ1dGlvbiBvZiBSb290UCAvLyBFcnJvciBpbiBvbGQgY29kZSAhXG4gIGMuV1IgPSBwLldSICsgYy5kVyAqIGMucFIgLSAodHJlZS5wUi50dXJub3ZlciAqIChkYXlzX2luX2ludGVydmFsIC8gMzAuNCkpICogcC5XUiAtIGMuUm9vdFA7XG4gIGMuV1MgPSBwLldTICsgYy5kVyAqIGMucFM7XG4gIGMuVyA9IGMuV0YrYy5XUitjLldTO1xuXG4gIHJldHVybiBjO1xufVxuXG5mdW5jdGlvbiBpbml0KHBsYW50YXRpb24sIHNvaWwpIHtcbiAgdmFyIHAgPSB7fTtcbiAgdmFyIHRyZWUgPSBwbGFudGF0aW9uLnNlZWRsaW5nVHJlZTsgLy9UT0RPOiBkZWNpZGUgdGhlIGNhc2Ugd2hlcmUgd2Ugc3RhcnQgd2l0aCBhIGNvcHBpY2VkIHRyZWU/XG5cbiAgcC5mZWVkc3RvY2tIYXJ2ZXN0PTA7XG4gIHAuY29wcGljZUNvdW50PTA7XG4gIHAuY29wcGljZUFnZSA9IDA7XG5cbiAgcC5DdW1JcnJpZyA9IDA7XG4gIHAuZFcgPSAwO1xuICBwLlcgPSBwbGFudGF0aW9uLlN0b2NraW5nRGVuc2l0eSAqIHBsYW50YXRpb24uU2VlZGxpbmdNYXNzO1xuICBwLldGID0gcGxhbnRhdGlvbi5wRiAqIHAuVztcbiAgcC5XUyA9IHBsYW50YXRpb24ucFMgKiBwLlc7XG4gIHAuV1IgPSBwbGFudGF0aW9uLnBSICogcC5XO1xuICBwLkFTVyA9IDAuOCAqIDEwICogc29pbC5tYXhBV1M7IC8vIFRoZSAxMCBpcyBiZWNhdXNlIG1heEFXUyBpcyBpbiBjbSBhbmQgQVNXIGluIG1tICg/KSBXaHkgKD8pXG4gIHAuU3RhbmRBZ2UgPSAwO1xuXG4gIHRyZWUgPSBwbGFudGF0aW9uLnNlZWRsaW5nVHJlZTtcblxuICAvLyBzbGEgPSBTcGVjaWZpYyBMZWFmIEFyZWFcbiAgdmFyIHNsYSA9IGZuLnRkcChwLlN0YW5kQWdlLHRyZWUuU0xBKTtcblxuICBwLkxBSSA9IHAuV0YgKiAwLjEgKiBzbGE7IC8vIExhbmRzYnVyZyBlcSA5LjVcblxuICAvLyBUaGVzZSBhcmVuJ3QgdXNlZCBzbyBjYW4gYmUgc2V0IHRvIGFueXRoaW5nOyAgVGhleSBhcmUgc2V0IHRvIG1hdGNoIHRoZSBwb3N0Z3JlcyB0eXBlXG4gIHAuVlBEICAgICAgICA9IDA7XG4gIHAuZlZQRCAgICAgICA9IDA7XG4gIHAuZlQgICAgICAgICA9IDA7XG4gIHAuZkZyb3N0ICAgICA9IDA7XG4gIHAuZk51dHIgICAgICA9IDA7XG4gIHAuZlNXICAgICAgICA9IDA7XG4gIHAuZkFnZSAgICAgICA9IDA7XG4gIHAuUEFSICAgICAgICA9IDA7XG4gIHAueFBQICAgICAgICA9IDA7XG4gIHAuSW50Y3B0biAgICA9IDA7XG4gIHAuSXJyaWcgICAgICA9IDA7XG4gIHAuQ2FuQ29uZCAgICA9IDA7XG4gIHAuVHJhbnNwICAgICA9IDA7XG4gIHAuUGh5c01vZCAgICA9IDA7XG4gIHAucGZzICAgICAgICA9IDA7XG4gIHAucFIgICAgICAgICA9IDA7XG4gIHAucFMgICAgICAgICA9IDA7XG4gIHAucEYgICAgICAgICA9IDA7XG4gIHAubGl0dGVyZmFsbCA9IDA7XG4gIHAuTlBQICAgICAgICA9IDA7XG4gIHAuUm9vdFAgICAgICA9IDA7XG5cbiAgcmV0dXJuIHA7XG59XG5cbi8vIFRoaXMgYWN0dWFsbHkgbmVlZCB0byB3b3JrIGJldHRlci4gIElmIHRoZSB3ZWF0aGVyIGRvZXNuJ3QgbWF0Y2hcbi8vIHRoZSBzdGVwcywgd2UgbmVlZCB0byBmaW5kIHRoZSBjbG9zZXN0IHZhbHVlIHRvIHdoYXQgd2UgYXJlIGxvb2tpbmcgZm9yXG5mdW5jdGlvbiBnZXRXZWF0aGVyKG1vZGVsLCBzZXR1cCwgbW9udGgsIGRheSkge1xuXG4gICAgaWYoIG1vZGVsLndlYXRoZXJbbW9kZWwuY3VycmVudERhdGUuZ2V0RnVsbFllYXIoKSsnLScrbW9udGgrJy0nK2RheV0gIT09IHVuZGVmaW5lZCApIHtcbiAgICAgIHJldHVybiBtb2RlbC53ZWF0aGVyW21vZGVsLmN1cnJlbnREYXRlLmdldEZ1bGxZZWFyKCkrJy0nK21vbnRoKyctJytkYXldO1xuICAgIH1cblxuICAgIC8vIG1vZGVsbGVkIGRhaWx5XG4gICAgaWYoIG1vZGVsLndlYXRoZXJbbW9udGgrJy0nK2RheV0gIT09IHVuZGVmaW5lZCApIHtcbiAgICAgIHJldHVybiBtb2RlbC53ZWF0aGVyW21vbnRoKyctJytkYXldO1xuICAgIH1cblxuICAgIC8vIGFjdHVhbFxuICAgIGlmKCBtb2RlbC53ZWF0aGVyW21vZGVsLmN1cnJlbnREYXRlLmdldEZ1bGxZZWFyKCkrJy0nK21vbnRoXSAhPT0gdW5kZWZpbmVkICkge1xuICAgICAgcmV0dXJuIG1vZGVsLndlYXRoZXJbbW9kZWwuY3VycmVudERhdGUuZ2V0RnVsbFllYXIoKSsnLScrbW9udGhdO1xuICAgIH1cblxuICAvLyBtb2RlbGxlZCBNb250aGx5XG4gIGlmKCBtb2RlbC53ZWF0aGVyW21vbnRoXSAhPT0gdW5kZWZpbmVkICkge1xuICAgIHJldHVybiBtb2RlbC53ZWF0aGVyW21vbnRoXTtcbiAgfVxuXG4gIHRocm93ICdSdW50aW1lIEVycm9yOiBubyB3ZWF0aGVyIGZvdW5kIGZvciBtb250aDogJyttb250aDtcbn1cblxuZnVuY3Rpb24gc2hvdWxkQ29wcGljZShtb2RlbCwgc2V0dXAsIGRheXNfaW5faW50ZXJ2YWwpIHtcbiAgdmFyIG5leHQ7XG4gIHZhciBjb3BwaWNlX29uO1xuICAvLyBkbyB3ZSBoYXZlIHNwZWNpZmljIGNvcHBpY2UgZGF0ZXMgc2V0P1xuICBpZiggc2V0dXAuY29wcGljZURhdGVzICkge1xuXG4gICAgZm9yKCB2YXIgaSA9IDA7IGkgPCBzZXR1cC5jb3BwaWNlRGF0ZXMubGVuZ3RoOyBpKysgKSB7XG4gICAgICB2YXIgZCA9IHNldHVwLmNvcHBpY2VEYXRlc1tpXTtcblxuICAgICAgaWYgKG1vZGVsLmN1cnJlbnREYXRlIDwgZCkge1xuICAgICAgICBuZXh0ID0gbW9kZWwuY3VycmVudERhdGU7XG4gICAgICAgIG5leHQuc2V0RGF0ZShuZXh0LmdldERhdGUgKyBkYXlzX2luX2ludGVydmFsKTtcbiAgICAgICAgaWYgKCBkIDwgbmV4dCkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGNvcHBpY2Vfb24gPSBuZXcgRGF0ZSgpO1xuICAgIGNvcHBpY2Vfb24uc2V0WWVhcihzZXR1cC55ZWFyVG9Db3BwaWNlKTtcbiAgICBjb3BwaWNlX29uLnNldE1vbnRoKHNldHVwLm1vbnRoVG9Db3BwaWNlKTtcbiAgICBjb3BwaWNlX29uLnNldERhdGUoMTUpO1xuXG4gICAgaWYoIG1vZGVsLmN1cnJlbnREYXRlLmdldFRpbWUoKSA8IGNvcHBpY2Vfb24uZ2V0VGltZSgpICkge1xuICAgICAgbmV4dCA9IG5ldyBEYXRlKG1vZGVsLmN1cnJlbnREYXRlKTtcbiAgICAgIG5leHQuc2V0RGF0ZShtb2RlbC5jdXJyZW50RGF0ZS5nZXREYXRlKCkgKyBkYXlzX2luX2ludGVydmFsKTtcblxuICAgICAgaWYgKCBjb3BwaWNlX29uLmdldFRpbWUoKSA8IG5leHQuZ2V0VGltZSgpKSB7XG4gICAgICAgIHNldHVwLnllYXJUb0NvcHBpY2UgPSBzZXR1cC55ZWFyVG9Db3BwaWNlICsgc2V0dXAuY29wcGljZUludGVydmFsO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiBnZXRGdW5jdGlvbihuYW1lKSB7XG4gIGlmKCBmbltuYW1lXSApIHtcbiAgICByZXR1cm4gZm5bbmFtZV07XG4gIH0gZWxzZSBpZiggZm4uY29wcGljZVtuYW1lXSApIHtcbiAgICByZXR1cm4gZm4uY29wcGljZVtuYW1lXTtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpbykge1xuICByZXR1cm4ge1xuICAgIGlvIDogaW8sXG4gICAgcnVuIDogcnVuLFxuICAgIHNpbmdsZVN0ZXAgOiBzaW5nbGVTdGVwLFxuICAgIHJ1blNldHVwIDogcnVuU2V0dXAsXG4gICAgaW5pdCA6IGluaXQsXG4gICAgZ2V0RnVuY3Rpb24gOiBnZXRGdW5jdGlvbixcbiAgICBzZXRJTyA6IGZ1bmN0aW9uKGlvKSB7XG4gICAgICB0aGlzLmlvID0gaW87XG4gICAgfSxcbiAgICBnZXREYXRhTW9kZWwgOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBkYXRhTW9kZWw7XG4gICAgfVxuICB9O1xufTtcbiIsImZ1bmN0aW9uIGVudigpIHtcbiAgaWYoIHR5cGVvZiBwbHY4ICE9PSAndW5kZWZpbmVkJyApIHJldHVybiBcInBsdjhcIjtcbiAgaWYoIHR5cGVvZiBMb2dnZXIgIT09ICd1bmRlZmluZWQnICkgcmV0dXJuIFwiYXBwc2NyaXB0XCI7XG4gIGlmKCB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykgcmV0dXJuIFwibm9kZVwiO1xufVxuXG5mdW5jdGlvbiBsb2cobXNnKSB7XG4gIHZhciBlID0gZW52KCk7XG4gIGlmKCBlID09IFwicGx2OFwiICkgcGx2OC5lbG9nKE5PVElDRSwgJ25vdGljZScsIG1zZyk7XG4gIGVsc2UgaWYoIGUgPT0gXCJhcHBzY3JpcHRcIiApIExvZ2dlci5sb2cobXNnKTtcbiAgZWxzZSBjb25zb2xlLmxvZyhtc2cpO1xufVxuXG5mdW5jdGlvbiBjbG9uZShvYmopIHtcbiAgaWYgKG51bGwgPT0gb2JqIHx8IFwib2JqZWN0XCIgIT0gdHlwZW9mIG9iaikgcmV0dXJuIG9iajtcbiAgdmFyIGNvcHkgPSBvYmouY29uc3RydWN0b3IoKTtcbiAgZm9yICh2YXIgYXR0ciBpbiBvYmopIHtcbiAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGF0dHIpKSBjb3B5W2F0dHJdID0gb2JqW2F0dHJdO1xuICB9XG4gIHJldHVybiBjb3B5O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZW52IDogZW52LFxuICBsb2cgOiBsb2csXG4gIGNsb25lIDogY2xvbmVcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuLypcbiAqIFZhbGlkYXRlIGEgbW9kZWwgcnVuIHNldHVwLiAgdGhyb3cgZXJyb3IgaXMgYmFkbmVzcy5cbiAqL1xudmFyIGRhdGFNb2RlbCA9IHJlcXVpcmUoJy4vZGF0YU1vZGVsJyk7XG52YXIgcGFyYW1FcnJvciA9ICdWYWxpZGF0aW9uIEVycm9yOiAnO1xuXG52YXIgdmFsaWRXZWF0aGVyS2V5cyA9IFtcbiAgL15cXGRcXGRcXGRcXGQtXFxkXFxkJC8sIC8vIHNwZWNpZmljIHdlYXRoZXIgWVlZWS1NTSBmb3IgbW9udGhseSB0aW1lc3RlcFxuICAvXlxcZFxcZCQvLCAvLyBtb2RlbGxlZCBvciBhdmVyYWdlIHdlYXRoZXIgTU0gZm9yIG1vbnRobHkgdGltZXN0ZXBcbiAgL15cXGRcXGRcXGRcXGQtXFxkXFxkLVxcZFxcZCQvLCAvLyBzcGVjaWZpYyB3ZWF0aGVyIFlZWVktTU0tREQgZm9yIGRhaWx5IHRpbWVzdGVwXG4gIC9eXFxkXFxkLVxcZFxcZCQvIC8vIG1vZGVsbGVkIG9yIGF2ZXJhZ2Ugd2VhdGhlciBNTS1ERCBmb3IgZGFpbHkgdGltZXN0ZXBcbl07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obW9kZWwpIHtcbiAgdmFsaWRhdGVQbGFudGF0aW9uKG1vZGVsKTtcbiAgdmFsaWRhdGVNYW5hZ2UobW9kZWwpO1xuICB2YWxpZGF0ZVdlYXRoZXIobW9kZWwpO1xuICB2YWxpZGF0ZVNvaWwobW9kZWwpO1xufTtcblxuZnVuY3Rpb24gdmFsaWRhdGVNYW5hZ2UobW9kZWwpIHtcbiAgaWYoICFtb2RlbC5tYW5hZ2UgKSB7XG4gICAgdGhyb3cgcGFyYW1FcnJvcisnbWFuYWdlIGlzIG5vdCBkZWZpbmllZCc7XG4gIH1cblxuICB2YWxpZGF0ZU1vZGVsKGRhdGFNb2RlbC5tYW5hZ2UsIG1vZGVsLm1hbmFnZSwgJ21hbmFnZScpO1xuXG4gIGlmKCBtb2RlbC5tYW5hZ2UuY29wcGljZURhdGVzICkge1xuICAgIGlmKCAhQXJyYXkuaXNBcnJheShtb2RlbC5tYW5hZ2UuY29wcGljZURhdGVzKSApIHtcbiAgICAgIHRocm93IHBhcmFtRXJyb3IrJ21hbmFnZS5jb3BwaWNlRGF0ZXMgc2hvdWxkIGJlIGFuIGFycmF5IG9mIGRhdGUgc3RyaW5ncy4nO1xuICAgIH1cblxuICAgIGZvciggdmFyIGkgPSAwOyBpIDwgbW9kZWwubWFuYWdlLmNvcHBpY2VEYXRlcy5sZW5ndGg7IGkrKyApIHtcbiAgICAgIGlmKCBtb2RlbC5tYW5hZ2UuY29wcGljZURhdGVzW2ldLm1hdGNoKCdeXFxkXFxkXFxkXFxkLVxcZFxcZCQnKSB8fCBtb2RlbC5tYW5hZ2UuY29wcGljZURhdGVzW2ldLm1hdGNoKCdeXFxkXFxkXFxkXFxkLVxcZFxcZC1cXGRcXGQkJykgKSB7XG4gICAgICAgIHRocm93IHBhcmFtRXJyb3IrJyBpbnZhbGlkIG1hbmFnZS5jb3BwaWNlRGF0ZXMgZm9ybWF0ICcrbW9kZWwubWFuYWdlLmNvcHBpY2VEYXRlc1tpXSsnLiBzaG91bGQgYmUgWVlZWS1NTSBmb3JtYXQuJztcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG5cbiAgICBpZiggbW9kZWwubWFuYWdlLmRhdGVDb3BwaWNlZCA9PT0gdW5kZWZpbmVkICkge1xuICAgICAgdGhyb3cgcGFyYW1FcnJvcisnIG1hbmFnZS5kYXRlQ29wcGljZWQgcmVxdWlyZWQgaWYgbWFuYWdlLmNvcHBpY2VEYXRlcyBub3QgcHJvdmlkZWQnO1xuICAgIH1cbiAgICBpZiggbW9kZWwubWFuYWdlLnllYXJzUGVyQ29wcGljZSA9PT0gdW5kZWZpbmVkICkge1xuICAgICAgdGhyb3cgcGFyYW1FcnJvcisnIG1hbmFnZS55ZWFyc1BlckNvcHBpY2UgcmVxdWlyZWQgaWYgbWFuYWdlLmNvcHBpY2VEYXRlcyBub3QgcHJvdmlkZWQnO1xuICAgIH1cblxuICB9XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlV2VhdGhlcihtb2RlbCkge1xuICBpZiggIW1vZGVsLndlYXRoZXIgKSB7XG4gICAgdGhyb3cgcGFyYW1FcnJvcisnTm8gd2VhdGhlciBkZWZpbmVkJztcbiAgfVxuXG4gIGZvciggdmFyIGtleSBpbiBtb2RlbC53ZWF0aGVyICkge1xuICAgIHZhciBmb3VuZCA9IGZhbHNlO1xuICAgIGZvciggdmFyIGkgPSAwOyBpIDwgdmFsaWRXZWF0aGVyS2V5cy5sZW5ndGg7IGkrKyApIHtcbiAgICAgIGlmKCBrZXkubWF0Y2godmFsaWRXZWF0aGVyS2V5c1tpXSkgKSB7XG4gICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYoICFmb3VuZCApIHtcbiAgICAgIHRocm93IHBhcmFtRXJyb3IrJyBpbnZhbGlkIHdlYXRoZXIga2V5OiAnK2tleTtcbiAgICB9XG5cbiAgICB2YWxpZGF0ZU1vZGVsKGRhdGFNb2RlbC53ZWF0aGVyLCBtb2RlbC53ZWF0aGVyW2tleV0sICd3ZWF0aGVyJyk7XG4gIH1cbn1cblxuXG5mdW5jdGlvbiB2YWxpZGF0ZVNvaWwobW9kZWwpIHtcbiAgaWYoICFtb2RlbC5zb2lsICkge1xuICAgIHRocm93IHBhcmFtRXJyb3IrJ3NvaWwgaXMgbm90IGRlZmluaWVkJztcbiAgfVxuXG4gIHZhbGlkYXRlTW9kZWwoZGF0YU1vZGVsLnNvaWwsIG1vZGVsLnNvaWwsICdzb2lsJyk7XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlUGxhbnRhdGlvbihtb2RlbCkge1xuICBpZiggIW1vZGVsLnBsYW50YXRpb24gKSB7XG4gICAgdGhyb3cgcGFyYW1FcnJvcisncGxhbnRhdGlvbiBpcyBub3QgZGVmaW5pZWQnO1xuICB9XG4gIHZhbGlkYXRlTW9kZWwoZGF0YU1vZGVsLnBsYW50YXRpb24sIG1vZGVsLnBsYW50YXRpb24sICdwbGFudGF0aW9uJyk7XG5cbiAgaWYoICFtb2RlbC5wbGFudGF0aW9uLnNlZWRsaW5nVHJlZSApIHtcbiAgICB0aHJvdyBwYXJhbUVycm9yKydwbGFudGF0aW9uLnNlZWRsaW5nVHJlZSBpcyBub3QgZGVmaW5pZWQnO1xuICB9XG4gIHZhbGlkYXRlTW9kZWwoZGF0YU1vZGVsLnRyZWUsIG1vZGVsLnBsYW50YXRpb24uc2VlZGxpbmdUcmVlLCAncGxhbnRhdGlvbi5zZWVkbGluZ1RyZWUnKTtcblxuICBpZiggIW1vZGVsLnBsYW50YXRpb24uY29wcGljZWRUcmVlICkge1xuICAgIHRocm93IHBhcmFtRXJyb3IrJ3BsYW50YXRpb24uY29wcGljZWRUcmVlIGlzIG5vdCBkZWZpbmllZCc7XG4gIH1cbiAgdmFsaWRhdGVNb2RlbChkYXRhTW9kZWwudHJlZSwgbW9kZWwucGxhbnRhdGlvbi5jb3BwaWNlZFRyZWUsICdwbGFudGF0aW9uLmNvcHBpY2VkVHJlZScpO1xufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZU1vZGVsKGRhdGFNb2RlbCwgbW9kZWwsIG5hbWUpIHtcbiAgdmFyIGtleSwgaXRlbTtcblxuICBmb3IoIGtleSBpbiBkYXRhTW9kZWwudmFsdWUgKSB7XG4gICAgaXRlbSA9IGRhdGFNb2RlbC52YWx1ZVtrZXldO1xuICAgIGlmKCBpdGVtLnJlcXVpcmVkID09PSBmYWxzZSApIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGlmKCBtb2RlbFtrZXldID09PSB1bmRlZmluZWQgKSB7XG4gICAgICB0aHJvdyBwYXJhbUVycm9yK25hbWUrJy4nK2tleSsnIGlzIG1pc3NpbmcgJytcbiAgICAgICAgICAgIChpdGVtLmRlc2NyaXB0aW9uID8gJygnK2l0ZW0uZGVzY3JpcHRpb24rJyknIDogJycpO1xuICAgIH1cblxuICAgIGlmKCB0eXBlb2YgaXRlbS52YWx1ZSA9PT0gJ29iamVjdCcgKSB7XG4gICAgICB2YWxpZGF0ZU1vZGVsKGl0ZW0sIG1vZGVsW2tleV0sIG5hbWUrJy4nK2tleSk7XG4gICAgfVxuICB9XG59XG4iLCJ2YXIgZ2RyaXZlID0gcmVxdWlyZSgnLi9nb29nbGVEcml2ZScpO1xudmFyIGV4cG9ydFRvQ3N2ID0gcmVxdWlyZSgnLi9nb29nbGVEcml2ZS9leHBvcnRUb0NzdicpO1xudmFyIG9mZmxpbmUgPSByZXF1aXJlKCcuL29mZmxpbmUnKTtcbnZhciBjb25maWcgPSByZXF1aXJlKCcuL2NvbmZpZycpO1xudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xudmFyIHJhd091dHB1dCA9IHJlcXVpcmUoJy4vb3V0cHV0L3JhdycpO1xudmFyIHdlYXRoZXIgPSByZXF1aXJlKCcuL3dlYXRoZXInKTtcbnZhciB3ZWF0aGVyQ2hhcnQgPSByZXF1aXJlKCcuL3dlYXRoZXIvY2hhcnQnKTtcbnZhciBmbGFzaGJsb2NrRGV0ZWN0b3IgPSByZXF1aXJlKCcuL2ZsYXNoYmxvY2stZGV0ZWN0b3InKTtcbnZhciBpbnB1dEZvcm0gPSByZXF1aXJlKCcuL2lucHV0Rm9ybScpO1xudmFyIGNoYXJ0cyA9IHJlcXVpcmUoJy4vY2hhcnRzJyk7XG5cbi8vIGltcG9ydCAzcGcgbW9kZWxcbnZhciBtb2RlbCA9IHJlcXVpcmUoJy4uLy4uL3BvcGxhci0zcGctbW9kZWwnKTtcblxuLy8gd2lyZSBpbiBhcHAgaGFuZGxlcnMgdG8gbW9kZWxcbnZhciBtb2RlbElPID0gcmVxdWlyZSgnLi9tb2RlbFJ1bkhhbmRsZXInKTtcbm1vZGVsLnNldElPKG1vZGVsSU8pO1xuXG52YXIgcnVuQ2FsbGJhY2ssIHdlYXRoZXJDdXN0b21DaGFydDtcblxuXG4vLyByb3cgcmF3IGRhdGEgZG9lcyBhIGxvdCBvZiBwcm9jZXNzaW5nIG9mIHRoZSByZXN1bHRzIGFuZCB0aGUgY3VycmVudCBzdGF0ZSBvZiB3aGF0J3Ncbi8vIGJlaW5nIGRpc3BsYXllZC4gIEdvIGFoZWFkIGFuIHNldHVwIHRoZSBjc3YgZGF0YSBhdCB0aGlzIHBvaW50LCB0aGVuIGlmIHRoZSB1c2VyXG4vLyBkZWNpZGVzIHRvIGV4cG9ydCwgd2UgYXJlIGFsbCBzZXQgdG8gdG87XG52YXIgY3N2UmVzdWx0cyA9IG51bGw7XG5cblxudmFyIGluaXQgPSBmdW5jdGlvbihjYWxsYmFjaykge1xuICAvLyB0aGVzZSB3ZSBkb24ndCB3YW50IHRvIHNldHVwIHVudGlsIGRvbSBpcyByZWFkeVxuICBpbnB1dEZvcm0gPSBpbnB1dEZvcm0odGhpcyk7XG5cbiAgY2hhcnRzLnNldEFwcCh0aGlzKTtcbiAgZ2RyaXZlLnNldEFwcCh0aGlzKTtcblxuICBtb2RlbElPLmFwcCA9IHRoaXM7XG4gIG1vZGVsSU8ubW9kZWwgPSBtb2RlbDtcbiAgbW9kZWxJTy5jaGFydHMgPSBjaGFydHM7XG4gIG1vZGVsSU8uaW5wdXRGb3JtID0gaW5wdXRGb3JtO1xuXG4gIC8vIGNoZWNrIGlmIGZsYXNoIGlzIGluc3RhbGxlZC4gIElmIG5vdCwgaGlkZSB0aGUgY2hhcnQgdHlwZSB0b2dnbGUuXG4gIGZsYXNoYmxvY2tEZXRlY3RvcihmdW5jdGlvbih2YWwpe1xuICAgICAgaWYoIHZhbCA+IDAgKSAkKFwiI2NoYXJ0LXR5cGUtYnRuLWdyb3VwXCIpLmhpZGUoKTtcbiAgfSk7XG5cbiAgcmF3T3V0cHV0LmluaXQodGhpcyk7XG5cbiAgLy8gc2V0dXAgZXhwb3J0IG1vZGFsXG4gIGV4cG9ydFRvQ3N2LmluaXQoKTtcbiAgJChcIiNleHBvcnQtY3N2XCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICBleHBvcnRUb0Nzdi5ydW4oY3N2UmVzdWx0cyk7XG4gIH0pO1xuXG4gIHZhciBlbGUgPSAkKFwiI2lucHV0cy1jb250ZW50XCIpO1xuICBpbnB1dEZvcm0uY3JlYXRlKGVsZSk7XG5cbiAgJChcIiNydW5idG4sICNydW5idG4tc21cIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICBydW5Nb2RlbCgpO1xuICB9KTtcblxuICAvLyBpbml0aWFsaXplIHRoZSBjaGFydHNcbiAgY2hhcnRzLmluaXQoKTtcblxuICAvLyBzZXQgZGVmYXVsdCBjb25maWdcbiAgJChcIiNpbnB1dC1tYW5hZ2UtZGF0ZVBsYW50ZWRcIikudmFsKG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5yZXBsYWNlKC9ULiovLCcnKSk7XG4gICQoXCIjaW5wdXQtbWFuYWdlLWRhdGVDb3BwaWNlZFwiKS52YWwobmV3IERhdGUobmV3IERhdGUoKS5nZXRUaW1lKCkrKDg2NDAwMDAwKjIqMzY1KSkudG9JU09TdHJpbmcoKS5yZXBsYWNlKC9ULiovLCcnKSk7XG4gICQoXCIjaW5wdXQtbWFuYWdlLWRhdGVGaW5hbEhhcnZlc3RcIikudmFsKG5ldyBEYXRlKG5ldyBEYXRlKCkuZ2V0VGltZSgpKyg4NjQwMDAwMCoxMCozNjUpKS50b0lTT1N0cmluZygpLnJlcGxhY2UoL1QuKi8sJycpKTtcblxuICAvLyBzZXR1cCBuaWNlIHNjcm9sbGluZ1xuICAkKCcuYXBwLW5hdicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcbiAgICAgICAgICBzY3JvbGxUb3A6ICQodGhpcy5oYXNoKS5vZmZzZXQoKS50b3AtNTVcbiAgICAgICB9LCA3MDApO1xuICB9KTtcblxuICAvLyBtYWtlIHN1cmUgZXZlcnl0aGluZyBmaXRzIHRvIHNjcmVlblxuICAkKHdpbmRvdykucmVzaXplKGZ1bmN0aW9uKCl7XG4gICAgICBjaGFydHMucmVzaXplKCk7XG5cbiAgICAgIGlmKCB3ZWF0aGVyQ3VzdG9tQ2hhcnQgKSB7XG4gICAgICAgICAgd2VhdGhlckN1c3RvbUNoYXJ0ID0gd2VhdGhlckNoYXJ0LmNyZWF0ZSgkKCcjY3VzdG9tLXdlYXRoZXItY2hhcnQnKVswXSwgbW9kZWwuY3VzdG9tX3dlYXRoZXIpO1xuICAgICAgfVxuICB9KTtcblxuICBjYWxsYmFjaygpO1xufTtcblxudmFyIGdldE1vZGVsID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBtb2RlbDtcbn07XG5cbnZhciBnZXRPdXRwdXRzID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBvdXRwdXRzO1xufTtcblxudmFyIHJ1bkNvbXBsZXRlID0gZnVuY3Rpb24ocm93cykge1xuICBpZiAoIHJ1bkNhbGxiYWNrICkgcnVuQ2FsbGJhY2socm93cyk7XG4gIGlmKCBoaWRlSW5pdExvYWRpbmcgKSBoaWRlSW5pdExvYWRpbmcoKTtcbiAgcnVuQ2FsbGJhY2sgPSBudWxsO1xufTtcbm1vZGVsSU8uZHVtcCA9IHJ1bkNvbXBsZXRlO1xuXG52YXIgZGF5c1RvUnVuID0gZnVuY3Rpb24oKSB7XG4gIHZhciBkMSA9ICQoXCIjaW5wdXQtbWFuYWdlLWRhdGVQbGFudGVkXCIpLnZhbCgpO1xuICBpZiAoZDEgJiYgZDEgIT09IFwiXCIpIHtcbiAgICAgIGQxID0gbmV3IERhdGUoJChcIiNpbnB1dC1tYW5hZ2UtZGF0ZVBsYW50ZWRcIikudmFsKCkpO1xuICB9IGVsc2Uge1xuICAgICAgZDEgPSBuZXcgRGF0ZSgpO1xuICB9XG5cbiAgdmFyIGQyID0gJChcIiNpbnB1dC1tYW5hZ2UtZGF0ZUZpbmFsSGFydmVzdFwiKS52YWwoKTtcbiAgaWYgKGQyICYmIGQyICE9PSBcIlwiKSB7XG4gICAgICBkMiA9IG5ldyBEYXRlKCQoXCIjaW5wdXQtbWFuYWdlLWRhdGVGaW5hbEhhcnZlc3RcIikudmFsKCkpO1xuICB9IGVsc2Uge1xuICAgICAgZDIgPSBuZXcgRGF0ZSgpO1xuICB9XG5cbiAgdmFyIG9uZURheSA9IDI0KjYwKjYwKjEwMDA7XG4gIHZhciBkYXlzID0gTWF0aC5yb3VuZChNYXRoLmFicygoZDEuZ2V0VGltZSgpIC0gZDIuZ2V0VGltZSgpKS8ob25lRGF5KSkpO1xuICByZXR1cm4gZGF5cyA8PSAwID8gMSA6IGRheXM7XG59O1xuXG5cbnZhciBydW5Nb2RlbCA9IGZ1bmN0aW9uKGlzUnQpIHtcblxuICBpZiAoJChcIiNydW5idG4sICNydW5idG4tc21cIikuaGFzQ2xhc3MoXCJkaXNhYmxlZFwiKSkgcmV0dXJuO1xuICAkKFwiI3J1bmJ0biwgI3J1bmJ0bi1zbVwiKS5hZGRDbGFzcyhcImRpc2FibGVkXCIpLmh0bWwoXCJSdW5uaW5nLi4uXCIpO1xuXG4gIGlmKCAhd2VhdGhlci5jaGVjayhtb2RlbCkgKSByZXR1cm47XG5cbiAgLy8gbGV0IFVJIHByb2Nlc3MgZm9yIGEgc2VjIGJlZm9yZSB3ZSB0YW5rIGl0XG4gIC8vIFRPRE86IHRoaXMgc2hvdWxkIGJlIHByZWZvcm1lZCB3LyBhIHdlYndvcmtlclxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgZ2EoJ3NlbmQnLCAnZXZlbnQnLCAndWknLCAnaW50ZXJhY3Rpb24nLCAnbW9kZWwtcnVuJywgMSk7XG5cbiAgICAgIC8vIHJlYWQgZXZlcnl0aGluZyBzbyB0aGUgdmFyaWF0aW9ucyBhcmUgc2V0XG4gICAgICBtb2RlbC52YXJpYXRpb25zID0ge307XG4gICAgICBtb2RlbElPLnJlYWRGcm9tSW5wdXRzKCk7XG5cbiAgICAgIC8vIG1ha2Ugc3VyZSB3ZSBhcmUgb25seSBzZXR0aW5nIDIgdmFyaWF0aW9uIHBhcmFtZXRlcnNcbiAgICAgIHZhciBwYXJhbXMgPSBbXTtcbiAgICAgIGZvciggdmFyIGtleSBpbiBtb2RlbC52YXJpYXRpb25zICkgcGFyYW1zLnB1c2goa2V5KTtcbiAgICAgIGlmKCBwYXJhbXMubGVuZ3RoID4gMiApIHtcbiAgICAgICAgICBhbGVydChcIlRoZXJlIGlzIGEgbGltaXQgb2YgMiB2YXJpYXRpb24gcGFyYW1ldGVycyBwZXIgcnVuLiAgQ3VycmVudGx5IHlvdSBhcmUgdmFyeWluZyBcIitcbiAgICAgICAgICAgICAgICBcInRoZSBmb2xsb3dpbmcgcGFyYW1ldGVyczpcXG5cXG4gLVwiK3BhcmFtcy5qb2luKFwiXFxuIC1cIikpO1xuICAgICAgICAgICQoXCIjcnVuYnRuLCAjcnVuYnRuLXNtXCIpLnJlbW92ZUNsYXNzKFwiZGlzYWJsZWRcIikuaHRtbChcIjxpIGNsYXNzPSdpY29uLXBsYXknPjwvaT4gUnVuXCIpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gbGV0IHRoZSB3b3JsZCBrbm93IHdoYXQgd2UgYXJlIGRvaW5nXG4gICAgICBpZiggIWlzUnQgKSBnZHJpdmUucnVuTW9kZWxSdCgpO1xuXG4gICAgICAvLyBzaG93IHdoYXQgd2UgYXJlIGRvaW5nXG4gICAgICAkKFwiI3ZhcmlhdGlvbkFuYWx5c2lzU3RhdHVzXCIpLmh0bWwoXCI8Yj5cIisocGFyYW1zLmxlbmd0aCA9PSAwID8gXCJOb25lXCIgOiBwYXJhbXMuam9pbihcIiwgXCIpKStcIjwvYj5cIik7XG5cbiAgICAgIC8vIHdlIGFyZSBvbmx5IHJ1bm5pbmcgb25jZVxuICAgICAgaWYgKCBwYXJhbXMubGVuZ3RoID09PSAwICkge1xuICAgICAgICAgIGdhKCdzZW5kJywgJ2V2ZW50JywgJ3VpJywgJ2ludGVyYWN0aW9uJywgJ21vZGVsLXJ1bi1zaW5nbGVQYXJhbScsIDEpO1xuXG4gICAgICAgICAgcnVuQ2FsbGJhY2sgPSBmdW5jdGlvbihyb3dzKSB7XG4gICAgICAgICAgICAgIHNob3dSZXN1bHRzKHJvd3MpO1xuICAgICAgICAgIH07XG5cblxuICAgICAgICAgIHZhciBkYXlzID0gZGF5c1RvUnVuKCk7XG5cbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgbW9kZWwucnVuKGRheXMpO1xuICAgICAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICAgICAgZGVidWdnZXI7XG4gICAgICAgICAgICBhbGVydChlKTtcbiAgICAgICAgICB9XG5cblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBnYSgnc2VuZCcsICdldmVudCcsICd1aScsICdpbnRlcmFjdGlvbicsICdtb2RlbC1ydW4tdmFyaWF0aW9uJywgMSk7XG5cbiAgICAgICAgICAvLyBzZXQgdmFyaWF0aW9uIG9yZGVyXG4gICAgICAgICAgdmFyIHJ1bnMgPSBbXTtcbiAgICAgICAgICBmb3IoIHZhciBpID0gMDsgaSA8IG1vZGVsLnZhcmlhdGlvbnNbcGFyYW1zWzBdXS5sZW5ndGg7IGkrKyApIHtcbiAgICAgICAgICAgICAgdmFyIG9iaiA9IHtcbiAgICAgICAgICAgICAgICAgIGlucHV0cyA6IHt9LFxuICAgICAgICAgICAgICAgICAgb3V0cHV0IDogbnVsbFxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICBvYmouaW5wdXRzW3BhcmFtc1swXV0gPSBtb2RlbC52YXJpYXRpb25zW3BhcmFtc1swXV1baV07XG4gICAgICAgICAgICAgIGlmKCBwYXJhbXMubGVuZ3RoID4gMSApIHtcbiAgICAgICAgICAgICAgICAgIGZvciggdmFyIGogPSAwOyBqIDwgbW9kZWwudmFyaWF0aW9uc1twYXJhbXNbMV1dLmxlbmd0aDsgaisrICkge1xuICAgICAgICAgICAgICAgICAgICAgIHZhciB0ID0gJC5leHRlbmQodHJ1ZSwge30sIG9iaik7XG4gICAgICAgICAgICAgICAgICAgICAgdC5pbnB1dHNbcGFyYW1zWzFdXSA9IG1vZGVsLnZhcmlhdGlvbnNbcGFyYW1zWzFdXVtqXTtcbiAgICAgICAgICAgICAgICAgICAgICBydW5zLnB1c2godCk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBydW5zLnB1c2gob2JqKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHJ1blZhcmlhdGlvbigwLCBydW5zKTtcbiAgICAgIH1cbiAgfSwgMjUwKTtcbn07XG5cbi8vIHJ1biBhIHNpbmdsZSB2YXJpYXRpb24sIHdoZW4gbXVsdGlwbGUgaW5wdXRzIGZvciBhIHNpbmdsZSBwYXJhbWV0ZXIgaGF2ZVxuLy8gYmVlbiBnaXZlblxudmFyIHJ1blZhcmlhdGlvbiA9IGZ1bmN0aW9uKGluZGV4LCBydW5zKSB7XG5cbiAgLy8gc2V0IGlucHV0IHZhcmlhYmxlcyBmb3IgcnVuXG4gIHZhciBydW4gPSBydW5zW2luZGV4XTtcbiAgZm9yKCB2YXIga2V5IGluIHJ1bi5pbnB1dHMgKSB7XG4gICAgICAkKFwiI2lucHV0LVwiK2tleS5yZXBsYWNlKC9cXC4vZywgJy0nKSkudmFsKHJ1bi5pbnB1dHNba2V5XSk7XG4gIH1cblxuICBydW5DYWxsYmFjayA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgIHJ1bnNbaW5kZXhdLm91dHB1dCA9IGRhdGE7XG4gICAgICBpbmRleCsrO1xuXG5cbiAgICAgIGlmIChydW5zLmxlbmd0aCA9PSBpbmRleCkge1xuICAgICAgICAgIC8vIHJlc2V0IHRoZSBjb25zdGFudCB0byB0aGUgZmlyc3QgdmFsdWVcbiAgICAgICAgICBmb3IoIHZhciBrZXkgaW4gbW9kZWwudmFyaWF0aW9ucyApIHtcbiAgICAgICAgICAgICAgJChcIiNpbnB1dC1cIitrZXkucmVwbGFjZSgvXFwuL2csICctJykpLnZhbChtb2RlbC52YXJpYXRpb25zW2tleV0uam9pbihcIiwgXCIpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgc2hvd1Jlc3VsdHMocnVucyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJ1blZhcmlhdGlvbihpbmRleCwgcnVucyk7XG4gICAgICB9XG4gIH07XG5cbiAgdmFyIGRheXMgPSBkYXlzVG9SdW4oKTtcblxuICB0cnkge1xuICAgIG1vZGVsLnJ1bihkYXlzKTtcbiAgfSBjYXRjaChlKSB7XG4gICAgZGVidWdnZXI7XG4gICAgYWxlcnQoZSk7XG4gIH1cbn07XG5cblxudmFyIHNob3dSZXN1bHRzID0gZnVuY3Rpb24ocmVzdWx0KSB7XG4gIHZhciBjdXJyZW50UmVzdWx0cztcbiAgaWYoIHJlc3VsdFswXSBpbnN0YW5jZW9mIEFycmF5ICkge1xuICAgICAgY3VycmVudFJlc3VsdHMgPSBbe1xuICAgICAgICAgIHNpbmdsZVJ1biA6IHRydWUsXG4gICAgICAgICAgaW5wdXRzIDoge30sXG4gICAgICAgICAgb3V0cHV0IDogcmVzdWx0XG4gICAgICB9XTtcbiAgfSBlbHNlIHtcbiAgICBjdXJyZW50UmVzdWx0cyA9IHJlc3VsdDtcbiAgfVxuXG5cbiAgLy8gdHJhbnNwb3NlIGFsbCByZXN1bHRzIHRvIGhhc2ggYnkgZGF0ZVxuICBmb3IoIHZhciBpID0gMDsgaSA8IGN1cnJlbnRSZXN1bHRzLmxlbmd0aDsgaSsrICkge1xuICAgIHZhciBkYXRlSGFzaCA9IHt9O1xuICAgIHZhciByID0gY3VycmVudFJlc3VsdHNbaV07XG4gICAgci50b3RhbFN0ZXBzID0gci5vdXRwdXQubGVuZ3RoO1xuICAgIGZvciggdmFyIGogPSAxOyBqIDwgci5vdXRwdXQubGVuZ3RoOyBqKysgKSB7XG4gICAgICBkYXRlSGFzaFtyLm91dHB1dFtqXVswXV0gPSByLm91dHB1dFtqXTtcbiAgICB9XG4gICAgci5oZWFkZXIgPSByLm91dHB1dFswXTtcbiAgICByLm91dHB1dCA9IGRhdGVIYXNoO1xuICB9XG5cbiAgLy8gc29ydCBieSBtb3N0IHRvIGxlYXN0IHN0ZXBzXG4gIGN1cnJlbnRSZXN1bHRzLnNvcnQoZnVuY3Rpb24oYSwgYil7XG4gICAgaWYoIGEudG90YWxTdGVwcyA+IGIudG90YWxTdGVwcyApIHJldHVybiAxO1xuICAgIGlmKCBhLnRvdGFsU3RlcHMgPCBiLnRvdGFsU3RlcHMgKSByZXR1cm4gLTE7XG4gICAgcmV0dXJuIDA7XG4gIH0pO1xuXG4gIHJhd091dHB1dC5zaG93KGN1cnJlbnRSZXN1bHRzKTtcbiAgY2hhcnRzLnVwZGF0ZUNoYXJ0cyhjc3ZSZXN1bHRzLCB0cnVlKTtcblxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgJChcIiNydW5idG4sICNydW5idG4tc21cIikucmVtb3ZlQ2xhc3MoXCJkaXNhYmxlZFwiKS5odG1sKFwiPGkgY2xhc3M9J2ljb24tcGxheSc+PC9pPiBSdW5cIik7XG4gIH0sIDI1MCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgaW5pdCA6IGluaXQsXG4gIGdvb2dsZURyaXZlIDogZ2RyaXZlLFxuICBnZXRNb2RlbCA6IGdldE1vZGVsLFxuICBydW5Nb2RlbCA6IHJ1bk1vZGVsLFxuICBkYXlzVG9SdW4gOiBkYXlzVG9SdW4sXG4gIC8vIHRoZSByYXcgbW9kdWxlIGFjdHVhbGx5IGNyZWF0ZXMgdGhpcyBzZXR1cFxuICBzZXRDc3ZSZXN1bHRzIDogZnVuY3Rpb24oY3N2KSB7XG4gICAgY3N2UmVzdWx0cyA9IGNzdjtcbiAgfSxcbiAgcXMgOiB1dGlscy5xcyxcbiAgZ2V0TW9kZWxJTyA6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBtb2RlbElPO1xuICB9XG59O1xuIiwidmFyIG91dHB1dERlZmluaXRpb25zID0gcmVxdWlyZSgnLi9vdXRwdXQvZGVmaW5pdGlvbnMnKTtcbnZhciByYXcgPSByZXF1aXJlKCcuL291dHB1dC9yYXcnKTtcbnZhciBjb25maWcgPSByZXF1aXJlKCcuL2NvbmZpZycpO1xudmFyIGFwcDtcblxuLy8gb25seSBkcmF3IGNoYXJ0cyBpZiB3aWR0aCBoYXMgY2hhbmdlZFxudmFyIGNXaWR0aCA9IDA7XG5cbi8vIHRoZXJlIGlzIG5vIHdheSB0byBnZXQgdGhlIGNvbG9ycyBmb3IgdGhlIGxlZ2VuZHMgKHRvIG1ha2UgeW91ciBvd24pXG4vLyB0aGlzIHBvc3Q6XG4vLyBnaXZlcyB0aGVzZSB2YWx1ZXMuICBUaGlzIGlzIGEgSEFDSywgaWYgdGhleSBldmVyIGNoYW5nZSwgd2UgbmVlZCB0byB1cGRhdGVcbnZhciBnb29nbGVDaGFydENvbG9ycyA9IFtcIiMzMzY2Y2NcIixcIiNkYzM5MTJcIixcIiNmZjk5MDBcIixcIiMxMDk2MThcIixcIiM5OTAwOTlcIixcIiMwMDk5YzZcIixcbiAgICAgICAgICAgICAgICAgICAgICBcIiNkZDQ0NzdcIixcIiM2NmFhMDBcIixcIiNiODJlMmVcIixcIiMzMTYzOTVcIixcIiM5OTQ0OTlcIixcIiMyMmFhOTlcIixcbiAgICAgICAgICAgICAgICAgICAgICBcIiNhYWFhMTFcIixcIiM2NjMzY2NcIixcIiNlNjczMDBcIixcIiM4YjA3MDdcIixcIiM2NTEwNjdcIixcIiMzMjkyNjJcIixcbiAgICAgICAgICAgICAgICAgICAgICBcIiM1NTc0YTZcIixcIiMzYjNlYWNcIixcIiNiNzczMjJcIixcIiMxNmQ2MjBcIixcIiNiOTEzODNcIixcIiNmNDM1OWVcIixcbiAgICAgICAgICAgICAgICAgICAgICBcIiM5YzU5MzVcIixcIiNhOWM0MTNcIixcIiMyYTc3OGRcIixcIiM2NjhkMWNcIixcIiNiZWE0MTNcIixcIiMwYzU5MjJcIlxuICAgICAgICAgICAgICAgICAgICAgICxcIiM3NDM0MTFcIl07XG5cbi8vIHRlbXBsYXRlIGZvciB0aGUgcG9wdXBcbnZhciBzbGlkZXJQb3B1cCA9ICQoXG4gICAgICBcIjxkaXYgY2xhc3M9J3NsaWRlLXBvcHVwJz5cIiArXG4gICAgICAgICAgXCI8aSBjbGFzcz0naWNvbi1yZW1vdmUtY2lyY2xlIHB1bGwtcmlnaHQgc2xpZGUtcG9wdXAtY2xvc2UnPjwvaT5cIitcbiAgICAgICAgICBcIjxkaXYgaWQ9J2Nhcm91c2VsJyBjbGFzcz0nb3dsLWNhcm91c2VsIG93bC10aGVtZScgc3R5bGU9J21hcmdpbi10b3A6MTVweCc+PC9kaXY+XCIgK1xuXHRcIjwvZGl2PlwiKTtcblxudmFyIHNsaWRlclBvcHVwQmcgPSAkKFwiPGRpdiBjbGFzcz0nc2xpZGUtcG9wdXAtYmcnPiZuYnNwOzwvZGl2PlwiKTtcblxuLy8gb25seSBkcmF3IGNoYXJ0cyBpZiBzb21lb25lIGhhcyBjbGljayBhIGNoZWNrYm94XG52YXIgY2hhbmdlcyA9IGZhbHNlO1xuXG4vLyB3aGVuIHNpemluZywgd2FpdCBhIH4zMDBtcyBiZWZvcmUgdHJpZ2dlcmluZyByZWRyYXdcbnZhciByZXNpemVUaW1lciA9IC0xO1xuXG52YXIgY2hhcnRUeXBlU2VsZWN0b3IsIGNoYXJ0Q2hlY2tib3hlcywgY0RhdGE7XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG5cbiAgJChcIiNzaG93LWNoYXJ0c3BvcHVwLWJ0blwiKS5vbignY2xpY2snLGZ1bmN0aW9uKCkge1xuICAgICAgc2hvd1BvcHVwKCk7XG4gIH0pO1xuXG4gIC8vIHNldHVwIGNoYXJ0IHNlbGVjdG9yc1xuICAkKFwiI2NoYXJ0LW1vZGFsXCIpLm1vZGFsKHtzaG93OmZhbHNlfSk7XG5cbiAgLy8gc2V0IHBvcHVwIGNsaWNrIGhhbmRsZXJzXG4gICQoXCIjY2hhcnRUeXBlLXNlbGVjdEFsbFwiKS5vbignY2xpY2snLHNlbGVjdEFsbCk7XG4gICQoXCIjY2hhcnRUeXBlLXVuc2VsZWN0QWxsXCIpLm9uKCdjbGljaycsdW5zZWxlY3RBbGwpO1xuXG4gIGNoYXJ0VHlwZVNlbGVjdG9yID0gJChcIiNjaGFydFR5cGVJbnB1dFwiKTtcbiAgY2hhcnRDaGVja2JveGVzID0gJChcIiNjaGFydFNlbGVjdGlvbnNcIik7XG5cbiAgdmFyIGMxID0gJChcIiNjaGFydFNlbGVjdGlvbnMtYzFcIik7XG4gIHZhciBjMiA9ICQoXCIjY2hhcnRTZWxlY3Rpb25zLWMyXCIpO1xuICBmb3IoIHZhciBpID0gMDsgaSA8IGNvbmZpZy5vdXRwdXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgdmFsID0gY29uZmlnLm91dHB1dHNbaV07XG4gICAgICBjaGFydFR5cGVTZWxlY3Rvci5hcHBlbmQoJChcIjxvcHRpb24gdmFsdWU9J1wiICsgdmFsICsgXCInIFwiXG4gICAgICAgICAgICAgICsgKHZhbCA9PSAnV1InIHx8IHZhbCA9PSAnV1MnIHx8IHZhbCA9PSAnV0YnID8gJ3NlbGVjdGVkJyA6ICcnKVxuICAgICAgICAgICAgICArIFwiPlwiICsgdmFsICsgXCI8L29wdGlvbj5cIikpO1xuXG4gICAgICBpZiggaSAlIDIgPT0gMCApIHtcbiAgICAgICAgICBjMS5hcHBlbmQoJCgnPGRpdiBjbGFzcz1cImNoZWNrYm94XCI+PGxhYmVsPjxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIidcbiAgICAgICAgICAgICAgICAgICsgKHZhbCA9PSAnV1InIHx8IHZhbCA9PSAnV1MnIHx8IHZhbCA9PSAnV0YnID8gJ2NoZWNrZWQ9XCJjaGVja2VkXCInIDogJycpXG4gICAgICAgICAgICAgICAgICArICcgdmFsdWU9XCInK3ZhbCsnXCI+ICcrX2NyZWF0ZURlc2NyaXB0aW9uKHZhbCkrJzwvZGl2PicpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYzIuYXBwZW5kKCQoJzxkaXYgY2xhc3M9XCJjaGVja2JveFwiPjxsYWJlbD48aW5wdXQgdHlwZT1cImNoZWNrYm94XCInXG4gICAgICAgICAgICAgICAgICArICh2YWwgPT0gJ1dSJyB8fCB2YWwgPT0gJ1dTJyB8fCB2YWwgPT0gJ1dGJyA/ICdjaGVja2VkPVwiY2hlY2tlZFwiJyA6ICcnKVxuICAgICAgICAgICAgICAgICAgKyAnIHZhbHVlPVwiJyt2YWwrJ1wiPiAnK19jcmVhdGVEZXNjcmlwdGlvbih2YWwpKyc8L2Rpdj4nKSk7XG4gICAgICB9XG4gIH1cblxuICBjaGFydENoZWNrYm94ZXMuZmluZChcIi5mbi10b2dnbGVcIikub24oJ2NsaWNrJyxmdW5jdGlvbigpe1xuICAgICAgJChcIiNcIiskKHRoaXMpLmF0dHIoXCJkYXRhdGFyZ2V0XCIpKS50b2dnbGUoJ3Nsb3cnKTtcbiAgfSk7XG5cbiAgY2hhcnRDaGVja2JveGVzLmZpbmQoXCJpbnB1dFt0eXBlPWNoZWNrYm94XVwiKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgIGlmKCAkKHRoaXMpLmlzKFwiOmNoZWNrZWRcIikgKSBzZWxlY3QoJCh0aGlzKS5hdHRyKFwidmFsdWVcIikpO1xuICAgICAgZWxzZSB1bnNlbGVjdCgkKHRoaXMpLmF0dHIoXCJ2YWx1ZVwiKSk7XG4gIH0pO1xuXG4gICQoXCIjc2VsZWN0LWNoYXJ0cy1idG4sICNzZWxlY3QtY2hhcnRzLXRpdGxlLWJ0blwiKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgJChcIiNjaGFydC1tb2RhbFwiKS5tb2RhbCgnc2hvdycpO1xuICAgICAgY2hhbmdlcyA9IGZhbHNlO1xuICB9KTtcblxuICAkKFwiLmNoYXJ0LW1vZGFsLWNsb3NlXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAkKFwiI2NoYXJ0LW1vZGFsXCIpLm1vZGFsKCdoaWRlJyk7XG4gICAgICBpZiggY2hhbmdlcyAmJiBjRGF0YSApIHtcbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgIHVwZGF0ZUNoYXJ0cygpO1xuICAgICAgICAgICAgICAvLyB1cGRhdGUgcmF3IGRhdGEgYXMgd2VsbFxuICAgICAgICAgICAgICByYXcuc2hvdyhjRGF0YSk7XG4gICAgICAgICAgfSw0MDApO1xuXG4gICAgICB9XG4gIH0pO1xuXG4gICQoXCIuY2hhcnQtdHlwZS10b2dnbGVcIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgIGlmKCAhJCh0aGlzKS5oYXNDbGFzcyhcImFjdGl2ZVwiKSApIHtcbiAgICAgICAgICAkKFwiLmNoYXJ0LXR5cGUtdG9nZ2xlLmFjdGl2ZVwiKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcbiAgICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKFwiYWN0aXZlXCIpO1xuICAgICAgICAgIHVwZGF0ZUNoYXJ0cygpO1xuICAgICAgfVxuICB9KTtcbn1cblxuLy8gbWFrZSBzdXJlIGFuZCBlbmQgbGFiZWwgdGFnXG5mdW5jdGlvbiBfY3JlYXRlRGVzY3JpcHRpb24odmFsKSB7XG4gIGlmKCAhb3V0cHV0RGVmaW5pdGlvbnNbdmFsXSApIHJldHVybiBcIjxiPlwiK3ZhbCtcIjwvYj48L2xhYmVsPlwiO1xuXG4gIHZhciBkZXNjID0gb3V0cHV0RGVmaW5pdGlvbnNbdmFsXTtcbiAgdmFyIGxhYmVsID0gZGVzYy5sYWJlbCAmJiBkZXNjLmxhYmVsLmxlbmd0aCA+IDAgPyBcIiAtIFwiK2Rlc2MubGFiZWwgOiBcIlwiO1xuICB2YXIgdW5pdHMgPSBkZXNjLnVuaXRzICYmIGRlc2MudW5pdHMubGVuZ3RoID4gMCA/IFwiIFtcIitkZXNjLnVuaXRzK1wiXVwiIDogXCJcIjtcblxuICB2YXIgbGFiZWwgPSBcIjxiPlwiK3ZhbCtcIjwvYj48c3BhbiBzdHlsZT0nZm9udC1zaXplOjEycHgnPlwiK2xhYmVsK3VuaXRzK1wiPC9zcGFuPjwvbGFiZWw+XCI7XG4gIHZhciBoYXNEZXNjID0gZGVzYy5kZXNjcmlwdGlvbiAmJiBkZXNjLmRlc2NyaXB0aW9uLmxlbmd0aCA+IDA7XG4gIGlmKCBoYXNEZXNjICkge1xuICAgICAgbGFiZWwgKz0gXCI8ZGl2IHN0eWxlPSdmb250LXNpemU6MTFweDtjb2xvcjojODg4O2ZvbnQtc3R5bGU6aXRhbGljJz5cIitkZXNjLmRlc2NyaXB0aW9uO1xuICB9XG5cbiAgdmFyIGZOYW1lID0gZGVzYy5hbHRGbk5hbWUgfHwgdmFsO1xuICB2YXIgZm4gPSBhcHAuZ2V0TW9kZWwoKS5nZXRGdW5jdGlvbihmTmFtZSk7XG5cbiAgaWYoIGZuIHx8IGRlc2MuZm4gKSB7XG4gICAgICBpZiggIWhhc0Rlc2MgKSBsYWJlbCArPSBcIjxkaXYgc3R5bGU9J2ZvbnQtc2l6ZToxMXB4Jz5cIjtcbiAgICAgIGxhYmVsICs9IFwiIDxhIHN0eWxlPSdmb250LXN0eWxlOm5vcm1hbDtjdXJzb3I6cG9pbnRlcicgZGF0YXRhcmdldD0nZm4tZGVzYy1cIit2YWwrXCInIGNsYXNzPSdmbi10b2dnbGUnPmZuKCk8L2E+PC9kaXY+XCI7XG5cbiAgICAgIGxhYmVsICs9IFwiPGRpdiBpZD0nZm4tZGVzYy1cIit2YWwrXCInIHN0eWxlPSdkaXNwbGF5Om5vbmU7Zm9udC1zaXplOjExcHg7b3ZlcmZsb3c6YXV0bycgY2xhc3M9J3dlbGwgd2VsbC1zbSc+XCIrXG4gICAgICAgICAgICAgICAgICAoZm58fGRlc2MuZm4pLnRvU3RyaW5nKCkucmVwbGFjZSgvIC9nLCcmbmJzcDsnKS5yZXBsYWNlKC9cXG4vZywnPGJyIC8+JykrXCI8L2Rpdj5cIjtcbiAgfSBlbHNlIGlmICggaGFzRGVzYyApIHtcbiAgICAgIGxhYmVsICs9IFwiPC9kaXY+XCI7XG4gIH1cblxuICAvLyBUT0RPOiBhZGQgZm4gd2VsbFxuICByZXR1cm4gbGFiZWwrXCI8YnIgLz5cIjtcbn1cblxuZnVuY3Rpb24gc2VsZWN0KHZhbCkge1xuICBjaGFydFR5cGVTZWxlY3Rvci5maW5kKFwib3B0aW9uW3ZhbHVlPVwiK3ZhbCtcIl1cIikuYXR0cihcInNlbGVjdGVkXCIsXCJzZWxlY3RlZFwiKTtcbiAgY2hhcnRDaGVja2JveGVzLmZpbmQoXCJpbnB1dFt2YWx1ZT1cIit2YWwrXCJdXCIpLnByb3AoXCJjaGVja2VkXCIsdHJ1ZSk7XG4gIGNoYW5nZXMgPSB0cnVlO1xufVxuXG5mdW5jdGlvbiB1bnNlbGVjdCh2YWwpIHtcbiAgY2hhcnRUeXBlU2VsZWN0b3IuZmluZChcIm9wdGlvblt2YWx1ZT1cIit2YWwrXCJdXCIpLnJlbW92ZUF0dHIoXCJzZWxlY3RlZFwiKTtcbiAgY2hhcnRDaGVja2JveGVzLmZpbmQoXCJpbnB1dFt2YWx1ZT1cIit2YWwrXCJdXCIpLnByb3AoXCJjaGVja2VkXCIsZmFsc2UpO1xuICBjaGFuZ2VzID0gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gc2VsZWN0QWxsKCkge1xuICBmb3IoIHZhciBpID0gMDsgaSA8IGNvbmZpZy5vdXRwdXRzLmxlbmd0aDsgaSsrKSBzZWxlY3QoY29uZmlnLm91dHB1dHNbaV0pO1xufVxuXG5mdW5jdGlvbiB1bnNlbGVjdEFsbCgpIHtcbiAgZm9yKCB2YXIgaSA9IDA7IGkgPCBjb25maWcub3V0cHV0cy5sZW5ndGg7IGkrKykgdW5zZWxlY3QoY29uZmlnLm91dHB1dHNbaV0pO1xufVxuXG5mdW5jdGlvbiByZW1vdmUoZWxlKSB7XG4gIGVsZS5wYXJlbnQoKS5oaWRlKCdzbG93JywgZnVuY3Rpb24oKXtcbiAgICAgIGVsZS5wYXJlbnQoKS5yZW1vdmUoKTtcbiAgICAgIHVuc2VsZWN0KGVsZS5hdHRyKCd0eXBlJykpO1xuICB9KTtcblxufVxuXG5mdW5jdGlvbiBwcmludChjaGFydENvbnRhaW5lcikge1xuICBnYSgnc2VuZCcsICdldmVudCcsICd1aScsICdpbnRlcmFjdGlvbicsICdwcmludC1jaGFydCcsIDEpO1xuXG5cbnZhciBkaXNwX3NldHRpbmc9XCJ0b29sYmFyPXllcyxsb2NhdGlvbj1ubyxkaXJlY3Rvcmllcz15ZXMsbWVudWJhcj15ZXMsXCI7XG4gIGRpc3Bfc2V0dGluZys9XCJzY3JvbGxiYXJzPXllcyx3aWR0aD04MDAsIGhlaWdodD02MDAsIGxlZnQ9MjUsIHRvcD0yNVwiO1xuXG4gIHZhciBzdmcgPSBjaGFydENvbnRhaW5lci5maW5kKFwic3ZnXCIpO1xuICB2YXIgaHRtbCA9IGNoYXJ0Q29udGFpbmVyLmZpbmQoXCJkaXZcIikuaHRtbCgpO1xuXG4gIHZhciBkb2NwcmludD13aW5kb3cub3BlbihcIlwiLFwiXCIsZGlzcF9zZXR0aW5nKTtcbiAgZG9jcHJpbnQuZG9jdW1lbnQub3BlbigpO1xuICBkb2NwcmludC5kb2N1bWVudC53cml0ZSgnPGh0bWw+PGhlYWQ+PHRpdGxlPjwvdGl0bGU+Jyk7XG4gIGRvY3ByaW50LmRvY3VtZW50LndyaXRlKCc8L2hlYWQ+PGJvZHkgbWFyZ2lud2lkdGg9XCIwXCIgbWFyZ2luaGVpZ2h0PVwiMFwiIG9uTG9hZD1cInNlbGYucHJpbnQoKVwiPjxjZW50ZXI+Jyk7XG4gIGRvY3ByaW50LmRvY3VtZW50LndyaXRlKGh0bWwpO1xuICBkb2NwcmludC5kb2N1bWVudC53cml0ZSgnPC9jZW50ZXI+PC9ib2R5PjwvaHRtbD4nKTtcbiAgZG9jcHJpbnQuZG9jdW1lbnQuY2xvc2UoKTtcbiAgZG9jcHJpbnQuZm9jdXMoKTtcblxufVxuXG5cbmZ1bmN0aW9uIHNldERhdGEoZGF0YSkge1xuICBjRGF0YSA9IGRhdGE7XG59XG5cbi8vIGJhc2ljYWxseSByZWRyYXcgZXZlcnl0aGluZ1xuZnVuY3Rpb24gcmVzaXplKCkge1xuICAvLyByZXF1aXJlIG1vcmUgdGhhbiBhIDMwIHBpeGVsIHdpZHRoIGNoYW5nZSAoc28gd2UgZG9uJ3QgcmVkcmF3IHcvIHNjcm9sbCBiYXJzIGFkZGVkKVxuICB2YXIgd2luV2lkdGggPSAkKHdpbmRvdykud2lkdGgoKTtcbiAgaWYoIGNXaWR0aCA+IHdpbldpZHRoIC0gMTUgJiYgY1dpZHRoIDwgd2luV2lkdGggKyAxNSApIHJldHVybjtcbiAgY1dpZHRoID0gd2luV2lkdGg7XG5cbiAgaWYoIHJlc2l6ZVRpbWVyICE9IC0xICkgY2xlYXJUaW1lb3V0KHJlc2l6ZVRpbWVyKTtcbiAgcmVzaXplVGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgcmVzaXplVGltZXIgPSAtMTtcbiAgICAgIHVwZGF0ZUNoYXJ0cygpO1xuICB9LDMwMCk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUNoYXJ0cyhyZXN1bHRzLCBhbmltYXRlKSB7XG4gIGlmKCByZXN1bHRzICkgc2V0RGF0YShyZXN1bHRzKTtcbiAgaWYoICFjRGF0YSApIHJldHVybjtcblxuICAkKFwiI3Nob3ctY2hhcnRzcG9wdXAtYnRuXCIpLnNob3coKTtcblxuICAvLyBjcmVhdGUgYSBsZWdlbmQgaWYgdGhlcmUgaXMgbW9yZSB0aGFuIG9uZSBydW5cbiAgdmFyIGxlZ2VuZCA9IFwiXCI7XG4gIGlmKCBjRGF0YS5pbnB1dHMubGVuZ3RoID4gMSApIHtcbiAgICAgIHZhciBjMSA9IFwiXCI7XG4gICAgICB2YXIgYzIgPSBcIlwiO1xuICAgICAgZm9yKCB2YXIgaSA9IDA7IGkgPCBjRGF0YS5pbnB1dHMubGVuZ3RoOyBpKysgKSB7XG4gICAgICAgICAgdmFyIGVsZSA9IFwiPGRpdiBzdHlsZT0nbWluLWhlaWdodDo0MHB4O21hcmdpbi1ib3R0b206MTBweCc+PGRpdiBjbGFzcz0nbGVnZW5kLXNxdWFyZScgc3R5bGU9J2JhY2tncm91bmQtY29sb3I6XCIrZ29vZ2xlQ2hhcnRDb2xvcnNbaV0rXCInPiZuYnNwOzwvZGl2PlwiO1xuICAgICAgICAgIGZvciggdmFyIG1UeXBlIGluIGNEYXRhLmlucHV0c1tpXSApIHtcbiAgICAgICAgICAgICAgZWxlICs9IFwiPGRpdiBjbGFzcz0nbGVnZW5kLXRleHQnPlwiK21UeXBlK1wiPVwiK2NEYXRhLmlucHV0c1tpXVttVHlwZV0rXCI8L2Rpdj5cIjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiggaSAlIDIgPT0gMCApIGMxICs9IGVsZSArIFwiPC9kaXY+XCJcbiAgICAgICAgICBlbHNlIGMyICs9IGVsZSArIFwiPC9kaXY+XCJcbiAgICAgIH1cbiAgICAgIGxlZ2VuZCA9IFwiPGRpdj48YSBpZD0nbGVnZW5kLXBhbmVsLXRvZ2dsZScgc3R5bGU9J21hcmdpbi1sZWZ0OjVweDtjdXJzb3I6cG9pbnRlcic+TGVnZW5kPC9hPjwvZGl2PlwiK1xuICAgICAgICAgICAgICAgXCI8ZGl2IHN0eWxlPSdib3JkZXItYm90dG9tOjFweCBzb2xpZCAjZWVlO3BhZGRpbmctYm90dG9tOjVweDttYXJnaW4tYm90dG9tOjE1cHgnPlwiK1xuICAgICAgICAgICAgICAgXCI8ZGl2IGNsYXNzPSdyb3cnIGlkPSdsZWdlbmQtcGFuZWwnPjxkaXYgY2xhc3M9J2NvbC1zbS02Jz5cIitjMStcIjwvZGl2PlwiK1xuICAgICAgICAgICAgICAgXCI8ZGl2IGNsYXNzPSdjb2wtc20tNic+XCIrYzIrXCI8L2Rpdj5cIitcbiAgICAgICAgICAgICAgIFwiPC9kaXY+PC9kaXY+XCI7XG4gIH1cbiAgJChcIiNjaGFydC1jb250ZW50XCIpLmh0bWwobGVnZW5kKTtcbiAgJChcIiNsZWdlbmQtcGFuZWwtdG9nZ2xlXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAkKFwiI2xlZ2VuZC1wYW5lbFwiKS50b2dnbGUoXCJzbG93XCIpO1xuICB9KTtcblxuXG4gIHZhciB0eXBlcyA9IGNoYXJ0VHlwZVNlbGVjdG9yLnZhbCgpO1xuICBmb3IgKCB2YXIgaSA9IDA7IGkgPCB0eXBlcy5sZW5ndGg7IGkrKykge1xuICAgICAgX3Nob3dNYWluQ2hhcnQodHlwZXNbaV0sIGFuaW1hdGUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHNob3dQb3B1cCgpIHtcbiAgZ2EoJ3NlbmQnLCAnZXZlbnQnLCAndWknLCAnaW50ZXJhY3Rpb24nLCAnc2hvdy1jaGFydC1wb3B1cCcsIDEpO1xuXG5cbiAgc2xpZGVyUG9wdXAuZmluZChcIi5vd2wtdGhlbWVcIikuaHRtbChcIlwiKTtcbiAgJCgnYm9keScpLnNjcm9sbFRvcCgwKS5jc3MoJ292ZXJmbG93JywnaGlkZGVuJykuYXBwZW5kKHNsaWRlclBvcHVwQmcpLmFwcGVuZChzbGlkZXJQb3B1cCk7XG5cbiAgLy8gdGhpcyBjb3VsZCBjYXNlIGJhZG5lc3MuLi4uICB3aHkgZG9lc24ndCBpdCBsaXZlIHdoZW4gcmVtb3ZlZCBmcm9tIERPTT9cbiAgc2xpZGVyUG9wdXAuZmluZCgnLnNsaWRlLXBvcHVwLWNsb3NlJykub24oJ2NsaWNrJyxmdW5jdGlvbigpe1xuICAgICAgaGlkZVBvcHVwKCk7XG4gIH0pO1xuXG4gIHZhciB0eXBlcyA9IGNoYXJ0VHlwZVNlbGVjdG9yLnZhbCgpO1xuICBmb3IgKCB2YXIgaSA9IDA7IGkgPCB0eXBlcy5sZW5ndGg7IGkrKykge1xuICAgICAgX3Nob3dQb3B1cENoYXJ0KHR5cGVzW2ldKTtcbiAgfVxuXG4gICQoJyNjYXJvdXNlbCcpLm93bENhcm91c2VsKHtcbiAgICAgIG5hdmlnYXRpb24gOiB0cnVlLCAvLyBTaG93IG5leHQgYW5kIHByZXYgYnV0dG9uc1xuICAgICAgc2xpZGVTcGVlZCA6IDMwMCxcbiAgICAgIHBhZ2luYXRpb25TcGVlZCA6IDQwMCxcbiAgICAgIHNpbmdsZUl0ZW06dHJ1ZVxuICB9KTtcbn1cblxuZnVuY3Rpb24gaGlkZVBvcHVwKCkge1xuICBzbGlkZXJQb3B1cEJnLnJlbW92ZSgpO1xuICBzbGlkZXJQb3B1cC5yZW1vdmUoKTtcbiAgJCgnYm9keScpLmNzcygnb3ZlcmZsb3cnLCdhdXRvJyk7XG59XG5cbmZ1bmN0aW9uIF9zaG93TWFpbkNoYXJ0KHR5cGUsIGFuaW1hdGUpIHtcbiAgdmFyIGNoYXJ0VHlwZSA9ICQoXCIuY2hhcnQtdHlwZS10b2dnbGUuYWN0aXZlXCIpLmF0dHIoXCJ2YWx1ZVwiKTtcbiAgdmFyIHBhbmVsID0gJChcIjxkaXYgLz5cIik7XG4gIHZhciBvdXRlclBhbmVsID0gJChcIjxkaXY+XCIrXG4gIFx0XCI8YSBjbGFzcz0nYnRuIGJ0bi14cyBidG4tZGVmYXVsdCcgc3R5bGU9J1wiKyhjaGFydFR5cGUgIT0gXCJ0aW1lbGluZVwiID8gXCJwb3NpdGlvbjphYnNvbHV0ZTt6LWluZGV4OjEwO21hcmdpbjowIDAgLTIwcHggMjBweFwiIDogXCJtYXJnaW4tYm90dG9tOjVweFwiKStcbiAgICAgIFwiJyB0eXBlPSdcIit0eXBlK1wiJz5cIiArXG4gIFx0XCI8aSBjbGFzcz0naWNvbi1yZW1vdmUnPjwvaT4gXCIrdHlwZStcIjwvYT48L2Rpdj5cIik7XG4gIG91dGVyUGFuZWwuZmluZChcImFcIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICByZW1vdmUoJCh0aGlzKSk7XG4gIH0pO1xuICBpZiggY2hhcnRUeXBlID09IFwidGltZWxpbmVcIiApIG91dGVyUGFuZWwuY3NzKFwibWFyZ2luLWJvdHRvbVwiLFwiMjBweFwiKTtcbiAgJChcIiNjaGFydC1jb250ZW50XCIpLmFwcGVuZChvdXRlclBhbmVsLmFwcGVuZChwYW5lbCkpO1xuICBfY3JlYXRlQ2hhcnQodHlwZSwgY2hhcnRUeXBlLCBwYW5lbCwgZmFsc2UsIG51bGwsIGFuaW1hdGUpO1xufVxuXG5mdW5jdGlvbiBfc2hvd1BvcHVwQ2hhcnQodHlwZSkge1xuICB2YXIgcGFuZWwgPSAkKFwiPGRpdiBjbGFzcz0naXRlbSc+PC9kaXY+XCIpO1xuXG4gIHZhciBwcmludEJ0biA9ICQoXCI8YSBjbGFzcz0nYnRuIGJ0bi1zbSBidG4tZGVmYXVsdCcgc3R5bGU9J21hcmdpbi1sZWZ0OjE2cHgnPjxpIGNsYXNzPSdpY29uLXByaW50Jz48L2k+IFByaW50PC9hPlwiKS5vbignY2xpY2snLGZ1bmN0aW9uKCl7XG4gICAgIHByaW50KGNoYXJ0UGFuZWwpO1xuICB9KTtcbiAgcGFuZWwuYXBwZW5kKHByaW50QnRuKTtcblxuICB2YXIgY2hhcnRQYW5lbCA9ICQoXCI8ZGl2PjwvZGl2PlwiKTtcbiAgcGFuZWwuYXBwZW5kKGNoYXJ0UGFuZWwpO1xuXG4gIHNsaWRlclBvcHVwLmZpbmQoXCIub3dsLXRoZW1lXCIpLmFwcGVuZChwYW5lbCk7XG4gIF9jcmVhdGVDaGFydCh0eXBlLCAnbGluZScsIGNoYXJ0UGFuZWwsIHRydWUsIFtNYXRoLnJvdW5kKCQod2luZG93KS53aWR0aCgpKi44OCksIE1hdGgucm91bmQoKCQod2luZG93KS5oZWlnaHQoKSouOTApLTEyNSldKTtcbn1cblxuZnVuY3Rpb24gX2NyZWF0ZUNoYXJ0KHR5cGUsIGNoYXJ0VHlwZSwgcGFuZWwsIHNob3dMZWdlbmQsIHNpemUsIGFuaW1hdGUpIHtcbiAgdmFyIGNvbCA9IDA7XG5cbiAgLyp2YXIgZHQgPSBuZXcgZ29vZ2xlLnZpc3VhbGl6YXRpb24uRGF0YVRhYmxlKCk7XG5cbiAgaWYoIGNoYXJ0VHlwZSA9PSAndGltZWxpbmUnICkge1xuICAgICAgZHQuYWRkQ29sdW1uKCdkYXRlJywgJ01vbnRoJyk7XG4gIH0gZWxzZSB7XG4gICAgICAvL2R0LmFkZENvbHVtbignbnVtYmVyJywgJ01vbnRoJyk7XG4gICAgICBkdC5hZGRDb2x1bW4oJ3N0cmluZycsICdNb250aCcpO1xuICB9XG5cbiAgLy8gc2V0IHRoZSBmaXJzdCBjb2x1bW5cbiAgaWYoICFjRGF0YVswXS5zaW5nbGVSdW4gKSB7XG4gICAgICBmb3IoIHZhciBpID0gMDsgaSA8IGNEYXRhLmxlbmd0aDsgaSsrICkge1xuICAgICAgICAgIHZhciBsYWJlbCA9IFwiXCI7XG4gICAgICAgICAgZm9yKCB2YXIga2V5IGluIGNEYXRhW2ldLmlucHV0cyApIHtcbiAgICAgICAgICAgICAgbGFiZWwgKz0ga2V5LnJlcGxhY2UoLy4qXFwuLywnJykrXCI9XCIrY0RhdGFbaV0uaW5wdXRzW2tleV0rXCIgXFxuXCI7XG4gICAgICAgICAgfVxuICAgICAgICAgIGxhYmVsID0gbGFiZWwucmVwbGFjZSgvLFxccyQvLCcnKTtcbiAgICAgICAgICBkdC5hZGRDb2x1bW4oJ251bWJlcicsIGxhYmVsKTtcbiAgICAgIH1cbiAgfSBlbHNlIHtcbiAgICAgIGR0LmFkZENvbHVtbignbnVtYmVyJywgdHlwZSk7XG4gIH1cblxuICAvLyBmaW5kIHRoZSBjb2x1bW4gd2Ugd2FudCB0byBjaGFydFxuICBmb3IgKCB2YXIgaSA9IDA7IGkgPCBjRGF0YVswXS5vdXRwdXRbMF0ubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChjRGF0YVswXS5vdXRwdXRbMF1baV0gPT0gdHlwZSkge1xuICAgICAgICAgIGNvbCA9IGk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gIH0qL1xuXG4gIC8qdmFyIGNEYXRlID0gbmV3IERhdGUoJChcIiNpbnB1dC1tYW5hZ2UtZGF0ZVBsYW50ZWRcIikudmFsKCkpO1xuXG4gIHZhciBkYXRhID0gW107XG4gIHZhciBtYXggPSAwO1xuICAvLyBjcmVhdGUgdGhlIFtdW10gYXJyYXkgZm9yIHRoZSBnb29nbGUgY2hhcnRcbiAgZm9yICggdmFyIGkgPSAxOyBpIDwgY0RhdGFbMF0ub3V0cHV0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAvL2lmICh0eXBlb2YgY0RhdGFbMF0ub3V0cHV0W2ldW2NvbF0gPT09ICdzdHJpbmcnKSBjb250aW51ZTtcblxuICAgICAgdmFyIHJvdyA9IFtdO1xuXG4gICAgICAvL3ZhciBkYXRlID0gbmV3IERhdGUoY0RhdGUuZ2V0WWVhcigpKzE5MDAsIGNEYXRlLmdldE1vbnRoKCkraSwgY0RhdGUuZ2V0RGF0ZSgpKTtcbiAgICAgIGlmKCBjaGFydFR5cGUgPT0gXCJ0aW1lbGluZVwiICkge1xuICAgICAgICAgIC8vIGFkZCBvbiBtb250aFxuICAgICAgICAgIHJvdy5wdXNoKG5ldyBEYXRlKGNEYXRhWzBdLm91dHB1dFtpXVswXSkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByb3cucHVzaChjRGF0YVswXS5vdXRwdXRbaV1bMF0pO1xuICAgICAgfVxuXG4gICAgICBmb3IgKCB2YXIgaiA9IDA7IGogPCBjRGF0YS5sZW5ndGg7IGorKykge1xuICAgICAgICAgIGlmKCBjRGF0YVtqXS5vdXRwdXRbaV1bY29sXSA+IG1heCApIG1heCA9IGNEYXRhW2pdLm91dHB1dFtpXVtjb2xdO1xuICAgICAgICAgIHJvdy5wdXNoKGNEYXRhW2pdLm91dHB1dFtpXVtjb2xdKTtcbiAgICAgIH1cblxuICAgICAgZGF0YS5wdXNoKHJvdyk7XG4gIH1cblxuICBkdC5hZGRSb3dzKGRhdGEpOyovXG5cblxuXG4gIHZhciBkdCA9IGdvb2dsZS52aXN1YWxpemF0aW9uLmFycmF5VG9EYXRhVGFibGUoY0RhdGEuZGF0YVt0eXBlXSk7XG5cblxuICBpZiggb3V0cHV0RGVmaW5pdGlvbnNbdHlwZV0gKSB7XG4gICAgICB2YXIgZGVzYyA9IG91dHB1dERlZmluaXRpb25zW3R5cGVdO1xuICAgICAgdmFyIGxhYmVsID0gZGVzYy5sYWJlbCAmJiBkZXNjLmxhYmVsLmxlbmd0aCA+IDAgPyBcIiAtIFwiK2Rlc2MubGFiZWwgOiBcIlwiO1xuICAgICAgdmFyIHVuaXRzID0gZGVzYy51bml0cyAmJiBkZXNjLnVuaXRzLmxlbmd0aCA+IDAgPyBcIiBbXCIrZGVzYy51bml0cytcIl1cIiA6IFwiXCI7XG4gICAgICB0eXBlID0gdHlwZStsYWJlbCt1bml0cztcbiAgfVxuXG5cbiAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICB2QXhpcyA6IHtcbiAgICAgICAgICB0aXRsZSA6IHR5cGVcbiAgICAgIH0sXG4gICAgICBoQXhpcyA6IHtcbiAgICAgICAgICB0aXRsZSA6IFwiXCJcbiAgICAgIH0sXG4gICAgICBpbnRlcnBvbGF0ZU51bGxzIDogdHJ1ZVxuICB9O1xuICBpZiggIXNob3dMZWdlbmQgKSBvcHRpb25zLmxlZ2VuZCA9IHtwb3NpdGlvbjpcIm5vbmVcIn07XG5cbiAgaWYoIHNpemUgKSB7XG4gICAgICBvcHRpb25zLndpZHRoID0gc2l6ZVswXTtcbiAgICAgIG9wdGlvbnMuaGVpZ2h0ID0gc2l6ZVsxXTtcbiAgfSBlbHNlIHtcbiAgICAgIG9wdGlvbnMud2lkdGggPSBwYW5lbC53aWR0aCgpO1xuICAgICAgb3B0aW9ucy5oZWlnaHQgPSBvcHRpb25zLndpZHRoKi40O1xuICB9XG4gIHBhbmVsLndpZHRoKG9wdGlvbnMud2lkdGgpLmhlaWdodChvcHRpb25zLmhlaWdodCk7XG5cbiAgaWYoIGNoYXJ0VHlwZSA9PSAndGltZWxpbmUnICkge1xuICAgICAgb3B0aW9ucy5kaXNwbGF5QW5ub3RhdGlvbnMgPSB0cnVlO1xuICAgICAgdmFyIGNoYXJ0ID0gbmV3IGdvb2dsZS52aXN1YWxpemF0aW9uLkFubm90YXRlZFRpbWVMaW5lKHBhbmVsWzBdKTtcbiAgICAgIGNoYXJ0LmRyYXcoZHQsIG9wdGlvbnMpO1xuICB9IGVsc2Uge1xuICAgICAgdmFyIGNoYXJ0ID0gbmV3IGdvb2dsZS52aXN1YWxpemF0aW9uLkxpbmVDaGFydChwYW5lbFswXSk7XG4gICAgICBjaGFydC5kcmF3KGR0LCBvcHRpb25zKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2V0QXBwIDogZnVuY3Rpb24oYSkge1xuICAgIGFwcCA9IGE7XG4gIH0sXG4gICAgaW5pdCA6IGluaXQsXG4gICAgc2V0RGF0YSA6IHNldERhdGEsXG4gICAgc2VsZWN0IDogc2VsZWN0LFxuICAgIHVuc2VsZWN0IDogdW5zZWxlY3QsXG4gICAgc2VsZWN0QWxsIDogc2VsZWN0QWxsLFxuICAgIHVuc2VsZWN0QWxsIDogdW5zZWxlY3RBbGwsXG4gICAgdXBkYXRlQ2hhcnRzIDogdXBkYXRlQ2hhcnRzLFxuICAgIHJlbW92ZSA6IHJlbW92ZSxcbiAgICBzaG93UG9wdXA6IHNob3dQb3B1cCxcbiAgICBoaWRlUG9wdXA6IGhpZGVQb3B1cCxcbiAgICByZXNpemUgOiByZXNpemVcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgaW5wdXRzIDoge1xuICAgIHdlYXRoZXIgOiBbJ21vbnRoJywndG1pbicsJ3RtYXgnLCd0ZG1lYW4nLCdwcHQnLCdyYWQnLCdkYXlsaWdodCddXG4gIH0sXG4gIG91dHB1dHMgOiBbJ1ZQRCcsJ2ZWUEQnLCdmVCcsJ2ZGcm9zdCcsJ1BBUicsJ0ludGNwdG4nLCdBU1cnLCdDdW1JcnJpZycsXG4gICAgICAgICAgICAgJ0lycmlnJywnU3RhbmRBZ2UnLCdMQUknLCdDYW5Db25kJywnVHJhbnNwJywnRVRyJywnS2MnLCdmU1cnLCdmQWdlJyxcbiAgICAgICAgICAgICAnUGh5c01vZCcsJ3BSJywncFMnLCdsaXR0ZXJmYWxsJywneFBQJywnTlBQJywnV0YnLCdXUicsJ1dTJywnVyddLFxuICBkZWJ1ZyA6IGZhbHNlLFxuICBkZXZtb2RlIDogZmFsc2UsXG4gIGRhaWx5IDogdHJ1ZVxufTtcbiIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9icm93c2Vyc3RhY2svZmxhc2hibG9jay1kZXRlY3RvclxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGNhbGxiYWNrTWV0aG9kKXtcbiAgICB2YXIgcmV0dXJuX3ZhbHVlID0gMDtcblxuICAgIGlmKG5hdmlnYXRvci5wbHVnaW5zW1wiU2hvY2t3YXZlIEZsYXNoXCJdKSB7XG4gICAgICAgICAgZW1iZWRfbGVuZ3RoID0gJCgnZW1iZWQnKS5sZW5ndGg7XG4gICAgICAgICAgb2JqZWN0X2xlbmd0aCA9ICQoJ29iamVjdCcpLmxlbmd0aDtcblxuICAgICAgICAgIGlmKChlbWJlZF9sZW5ndGggPiAwKSB8fCAob2JqZWN0X2xlbmd0aCA+IDApKSB7XG4gICAgICAgICAgICAgIC8qIE1hYyAvIENocm9tZSB1c2luZyBGbGFzaEJsb2NrICsgTWFjIC8gU2FmYXJpIHVzaW5nIEFkQmxvY2sgKi9cbiAgICAgICAgICAgICAgJCgnb2JqZWN0LCBlbWJlZCcpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKCQodGhpcykuY3NzKCdkaXNwbGF5JykgPT09ICdub25lJyl7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5fdmFsdWUgPSAyO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8qIE1hYyAvIEZpcmVmb3ggdXNpbmcgRmxhc2hCbG9jayAqL1xuICAgICAgICAgICAgICBpZiggJCgnZGl2W2JnaW5hY3RpdmVdJykubGVuZ3RoID4gMCApe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm5fdmFsdWUgPSAyO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgIH0gZWxzZSBpZihuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ01TSUUnKSA+IC0xKSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgbmV3IEFjdGl2ZVhPYmplY3QoJ1Nob2Nrd2F2ZUZsYXNoLlNob2Nrd2F2ZUZsYXNoJyk7XG4gICAgICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgICAgICAgIHJldHVybl92YWx1ZSA9IDI7XG4gICAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgICAgLyogSWYgZmxhc2ggaXMgbm90IGluc3RhbGxlZCAqL1xuICAgICAgICAgIHJldHVybl92YWx1ZSA9IDE7XG4gICAgfVxuXG4gICAgaWYoY2FsbGJhY2tNZXRob2QgJiYgdHlwZW9mKGNhbGxiYWNrTWV0aG9kKSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgY2FsbGJhY2tNZXRob2QocmV0dXJuX3ZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiByZXR1cm5fdmFsdWU7XG4gICAgfVxufTtcbiIsIi8qXG4gKiBTYXZlIHRvIGdvb2dsZSBkcml2ZSAoZXhwb3J0IGFzIENTVilcbiAqL1xuXG52YXIgZ2RyaXZlID0gcmVxdWlyZSgnLi9pbmRleCcpO1xuXG5mdW5jdGlvbiBpbml0KCkge1xuICAkKFwiI2V4cG9ydC1tb2RhbFwiKS5tb2RhbCh7XG4gICAgc2hvdyA6IGZhbHNlXG4gIH0pO1xuXG4gICQoXCIjc2hvdy1leHBvcnQtY3N2XCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgX3NldE1lc3NhZ2UobnVsbCk7XG5cbiAgICAkKFwiI2V4cG9ydC1uYW1lXCIpLnZhbChcIjNQRyBNb2RlbCBSZXN1bHRzIChcIituZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkucmVwbGFjZSgvVC8sJyAnKS5yZXBsYWNlKC9cXC5cXGQqWi8sJycpK1wiKVwiKTtcbiAgICAkKFwiI2V4cG9ydC1tb2RhbFwiKS5tb2RhbCgnc2hvdycpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gX3NldE1lc3NhZ2UobXNnLCB0eXBlLCBwcm9ncmVzcykge1xuICBpZiggIW1zZyApIHtcbiAgICByZXR1cm4gJChcIiNleHBvcnQtbXNnXCIpLmhpZGUoKTtcbiAgfVxuICAkKFwiI2V4cG9ydC1tc2dcIikuc2hvdygpO1xuXG4gIGlmKCBwcm9ncmVzcyApIHtcbiAgICAkKFwiI2V4cG9ydC1tc2ctcHJvZ3Jlc3NcIikuc2hvdygpO1xuICB9IGVsc2Uge1xuICAgICQoXCIjZXhwb3J0LW1zZy1wcm9ncmVzc1wiKS5oaWRlKCk7XG4gIH1cblxuICAkKCcjZXhwb3J0LW1zZycpLmF0dHIoXCJjbGFzc1wiLCdhbGVydCBhbGVydC0nK3R5cGUpO1xuICAkKCcjZXhwb3J0LW1zZy10ZXh0JykuaHRtbChtc2cpO1xufVxuXG5mdW5jdGlvbiBfdXBkYXRlUHJvZ3Jlc3MoaW5kZXgsIHRvdGFsKSB7XG4gIHBlcmNlbnQgPSAxMDAgKiAoIGluZGV4IC8gdG90YWwgKTtcbiAgJChcIiNleHBvcnQtbXNnLXByb2dyZXNzLWJhclwiKS5hdHRyKFwiYXJpYS12YWx1ZW5vd1wiLCBwZXJjZW50KS5jc3MoXCJ3aWR0aFwiLHBlcmNlbnQrXCIlXCIpO1xufVxuXG4vLyBzZWUgaWYgYW4gZXJyb3IgZXhpc3RzLCBpZiBzbywgc2V0IHN0YXRlXG5mdW5jdGlvbiBfY2hlY2tFcnJvcihmaWxlKSB7XG4gIHZhciBlcnJvck1lc3NhZ2UgPSBudWxsO1xuICBpZiggIWZpbGUgKSBlcnJvck1lc3NhZ2UgPSBcIkVycm9yIGNyZWF0aW5nIGZpbGUgb24gR29vZ2xlIERyaXZlIDooXCI7XG4gIGlmKCBmaWxlLmVycm9yICkgZXJyb3JNZXNzYWdlID0gZmlsZS5tZXNzYWdlO1xuXG4gIGlmKCBlcnJvck1lc3NhZ2UgKSB7XG4gICAgX3NldE1lc3NhZ2UoZXJyb3JNZXNzYWdlLCBcImRhbmdlclwiKTtcbiAgICAkKFwiI2V4cG9ydC1jc3ZcIikucmVtb3ZlQ2xhc3MoXCJkaXNhYmxlZFwiKS5odG1sKFwiRXhwb3J0XCIpO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuICAvLyBleHBvcnQgYXMgY3N2XG5mdW5jdGlvbiBydW4ocmVzdWx0cykge1xuICBnYSgnc2VuZCcsICdldmVudCcsICd1aScsICdpbnRlcmFjdGlvbicsICdleHBvcnQtZHJpdmUtY3N2JywgMSk7XG5cbiAgJChcIiNleHBvcnQtY3N2XCIpLmFkZENsYXNzKFwiZGlzYWJsZWRcIikuaHRtbChcIkV4cG9ydGluZy4uLlwiKTtcblxuICB2YXIgbmFtZSA9ICQoXCIjZXhwb3J0LW5hbWVcIikudmFsKCk7XG4gIGlmKCBuYW1lLmxlbmd0aCA9PT0gMCApIHtcbiAgICBfc2V0TWVzc2FnZShcIlBsZWFzZSBwcm92aWRlIGEgZm9sZGVyIG5hbWVcIiwgXCJkYW5nZXJcIik7XG4gICAgJChcIiNleHBvcnQtY3N2XCIpLnJlbW92ZUNsYXNzKFwiZGlzYWJsZWRcIikuaHRtbChcIkV4cG9ydFwiKTtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgZGF0YSA9IHJlc3VsdHMuZGF0YTtcblxuICAvLyBjcmVhdGUgYSBsaXN0IHNvIHdlIGNhbiByZWN1cnNpdmVseSBpdGVyYXRlXG4gIHZhciBrZXlzID0gW107XG4gIGZvciggdmFyIGtleSBpbiBkYXRhICkga2V5cy5wdXNoKGtleSk7XG5cbiAgLy8gY3JlYXRlIGZvbGRlclxuICBfc2V0TWVzc2FnZShcIkNyZWF0aW5nIGV4cG9ydCBmb2xkZXIuLi5cIiwgXCJpbmZvXCIsIHRydWUpO1xuICBfdXBkYXRlUHJvZ3Jlc3MoMSwga2V5cy5sZW5ndGgrMik7XG4gIGdkcml2ZS5zYXZlRmlsZShuYW1lLFwiQUhCIDNQRyBNb2RlbCBSZXN1bHRzXCIsXCJhcHBsaWNhdGlvbi92bmQuZ29vZ2xlLWFwcHMuZm9sZGVyXCIsXCJcIixmdW5jdGlvbihmaWxlKXtcbiAgICBpZiggX2NoZWNrRXJyb3IoZmlsZSkgKSByZXR1cm47XG4gICAgdmFyIHBhcmVudCA9IGZpbGUuaWQ7XG4gICAgX3VwZGF0ZVByb2dyZXNzKDIsIGtleXMubGVuZ3RoKzIpO1xuXG4gICAgLy8gY3JlYXRlIGEgbmljZSBmaWxlIGRlc2NyaWJpbmcgdGhlIGN1cnJlbnQgZXhwb3J0XG4gICAgX3NldE1lc3NhZ2UoXCJDcmVhdGluZyBjb25maWcgZmlsZS4uLlwiLCBcImluZm9cIiwgdHJ1ZSk7XG4gICAgZGVsZXRlIHJlc3VsdHMuY29uZmlnLnBsYW50YXRpb25fc3RhdGU7XG4gICAgdmFyIGNvbmZpZyA9IEpTT04uc3RyaW5naWZ5KHJlc3VsdHMuY29uZmlnLG51bGwsXCIgIFwiKTtcbiAgICBnZHJpdmUuc2F2ZUZpbGUoXCJjb25maWcudHh0XCIsXCJBSEIgM1BHIE1vZGVsIC0gUnVuIENvbmZpZ3VyYXRpb25cIixcInRleHQvcGxhaW5cIixjb25maWcsZnVuY3Rpb24oZmlsZSl7XG4gICAgICBpZiggX2NoZWNrRXJyb3IoZmlsZSkgKSByZXR1cm47XG4gICAgICBfdXBkYXRlUHJvZ3Jlc3MoMywga2V5cy5sZW5ndGgrMik7XG5cbiAgICAgIF9jcmVhdGVFeHBvcnQoMCwga2V5cywgZGF0YSwgcGFyZW50KTtcbiAgICB9LHtwYXJlbnQ6IHBhcmVudH0pXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBfY3JlYXRlRXhwb3J0KGluZGV4LCBrZXlzLCBkYXRhLCBwYXJlbnQpIHtcblxuICAvLyB3ZSBhcmUgYWxsIGRvbmUgOilcbiAgaWYoIGluZGV4ID09IGtleXMubGVuZ3RoICkge1xuICAgIF91cGRhdGVQcm9ncmVzcygxLCAxKTtcbiAgICBfc2V0TWVzc2FnZShcIkV4cG9ydCBTdWNjZXNzZnVsLjxiciAvPjxhIGhyZWY9J2h0dHBzOi8vZHJpdmUuZ29vZ2xlLmNvbS8jZm9sZGVycy9cIiArIHBhcmVudCArXG4gICAgICAgICAgXCInIHRhcmdldD0nX2JsYW5rJz48aSBjbGFzcz0naWNvbi1leHRlcm5hbC1saW5rLXNpZ24nPjwvaT4gT3BlbiBpbiBHb29nbGUgRHJpdmU8L2E+XCIsIFwic3VjY2Vzc1wiKTtcbiAgICAkKFwiI2V4cG9ydC1jc3ZcIikucmVtb3ZlQ2xhc3MoXCJkaXNhYmxlZFwiKS5odG1sKFwiRXhwb3J0XCIpO1xuICB9IGVsc2Uge1xuXG4gICAgdmFyIGtleSA9IGtleXNbaW5kZXhdO1xuICAgIHZhciBjc3YgPSBcIlwiO1xuXG4gICAgLy8gVE9ETzogYWRkIG1vbnRoIGFuZCBkYXRlXG5cbiAgICBmb3IoIHZhciBpID0gMDsgaSA8IGRhdGFba2V5XS5sZW5ndGg7IGkrKyApIHtcbiAgICAgIGlmKCBkYXRhW2tleV1baV0ubGVuZ3RoID09PSAwICkgY29udGludWU7IC8vIGlnbm9yZSB0aGUgYmxhbmsgcm93c1xuXG4gICAgICBmb3IoIHZhciBqID0gMDsgaiA8IGRhdGFba2V5XVtpXS5sZW5ndGg7IGorKyApIGNzdiArPSBkYXRhW2tleV1baV1bal0rXCIsXCI7XG4gICAgICBjc3YgPSBjc3YucmVwbGFjZSgvLCQvLCcnKStcIlxcblwiO1xuICAgIH1cblxuICAgIF9zZXRNZXNzYWdlKFwiQ3JlYXRpbmcgXCIra2V5c1tpbmRleF0rXCIuY3N2Li4uIFwiLCBcImluZm9cIiwgdHJ1ZSk7XG4gICAgZ2RyaXZlLnNhdmVGaWxlKGtleXNbaW5kZXhdK1wiLmNzdlwiLFwiXCIsXCJ0ZXh0L2NzdlwiLGNzdixmdW5jdGlvbihmaWxlKXtcbiAgICAgIGlmKCBfY2hlY2tFcnJvcihmaWxlKSApIHJldHVybjtcblxuICAgICAgX3VwZGF0ZVByb2dyZXNzKGluZGV4KzQsIGtleXMubGVuZ3RoKzIpO1xuXG4gICAgICBpbmRleCsrO1xuICAgICAgX2NyZWF0ZUV4cG9ydChpbmRleCwga2V5cywgZGF0YSwgcGFyZW50KTtcbiAgICB9LHtjb252ZXJ0OiB0cnVlLCBwYXJlbnQ6IHBhcmVudH0pO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBydW4gOiBydW4sXG4gIGluaXQgOiBpbml0XG59O1xuIiwidmFyIE9hdXRoID0gcmVxdWlyZSgnLi4vb2F1dGgnKTtcbnZhciBnZHJpdmVSVCA9IHJlcXVpcmUoJy4vcmVhbHRpbWUnKTtcbnZhciBtb2RlbElPID0gcmVxdWlyZSgnLi4vbW9kZWxSdW5IYW5kbGVyJyk7XG52YXIgYXBwO1xuXG5cbnZhciBNSU1FX1RZUEUgPSBcImFwcGxpY2F0aW9uL3ZuZC5haGItM3BnLnJ1blwiO1xudmFyIFRSRUVfTUlNRV9UWVBFID0gXCJhcHBsaWNhdGlvbi92bmQuYWhiLTNwZy50cmVlXCI7XG52YXIgRFJJVkVfQVBJX1ZFUlNJT04gPSBcInYyXCI7XG5cbi8vIGdvb2dsZSBvYXV0aCBhY2Nlc3MgdG9rZW5cbnZhciB0b2tlbiA9IFwiXCI7XG5cbi8vIGN1cnJlbnRseSBsb2FkZWQgZ2RyaXZlIGZpbGUgaWRcbnZhciBsb2FkZWRGaWxlID0gbnVsbDtcbi8vIGxpc3Qgb2YgY3VycmVudGx5IGxvYWRlZCBmaWxlcyAobWV0YWRhdGEpXG52YXIgZmlsZUxpc3QgPSBbXTtcbi8vIGdvb2dsZSBkcml2ZSBzaGFyZSBjbGllbnRcbnZhciBjbGllbnQgPSBudWxsO1xuXG4vLyBsb2FkZWQgdHJlZSBhbmQgbWFuYWdlbWVudFxudmFyIGxvYWRlZFRyZWUgPSBudWxsO1xuLy8gbGlzdCBvZiBjdXJyZW50bHkgbG9hZGVkIHRyZWUgZmlsZXMgKG1ldGFkYXRhKVxudmFyIHRyZWVMaXN0ID0gW107XG5cbi8vIGN1cnJlbnQgTUlNRSBUWVBFIHdlIGFyZSBzYXZpbmdcbnZhciBzYXZlTWltZVR5cGUgPSBcIlwiO1xuXG5mdW5jdGlvbiBzZXRBcHAoYSkge1xuICBhcHAgPSBhO1xuICBnZHJpdmVSVC5zZXRBcHAoYXBwKTtcbn1cblxuLyoqKlxuICogIEluaXRpYWxpemUgZ29vZ2xlIGRyaXZlIHBhbmVscywgYnRucyBhbmQgbG9naW5cbiAqKiovXG5mdW5jdGlvbiBpbml0KGNhbGxiYWNrKSB7XG4gIC8vIGluaXQgYm9vdHN0cmFwIG1vZGFsXG4gICQoXCIjc2F2ZS1tb2RhbFwiKS5tb2RhbCh7XG4gICAgc2hvdyA6IGZhbHNlXG4gIH0pO1xuXG4gIC8vIGluaXQgYm9vdHN0cmFwIG1vZGFsXG4gICQoXCIjbG9hZC1tb2RhbFwiKS5tb2RhbCh7XG4gICAgc2hvdyA6IGZhbHNlXG4gIH0pO1xuXG4gIC8vIHRoZSBhYm91dCBtb2RhbCBsaW5rIGlzIGNyZWF0ZWQgYmVsb3csIHNvIHdoeSBub3QuLi5cbiAgJChcIiNhYm91dC1tb2RhbFwiKS5tb2RhbCh7XG4gICAgc2hvdyA6IGZhbHNlXG4gIH0pO1xuXG4gIC8vIHRoZSBhYm91dCBtb2RhbCBsaW5rIGlzIGNyZWF0ZWQgYmVsb3csIHNvIHdoeSBub3QuLi5cbiAgJChcIiNoZWxwLW1vZGFsXCIpLm1vZGFsKHtcbiAgICBzaG93IDogZmFsc2VcbiAgfSk7XG5cbiAgLy8gc2V0IHRoZSAndXBkYXRlJyBidG4gY2xpY2sgaGFuZGxlclxuICAkKFwiI3NhdmUtdXBkYXRlLWJ0blwiKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICBfdXBkYXRlQ3VycmVudEZpbGUoKTtcbiAgfSk7XG5cbiAgLy8gc2V0IHRoZSAnbmV3JyBidG4gY2xpY2sgaGFuZGxlclxuICAkKFwiI3NhdmUtbmV3LWJ0blwiKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICBfc2F2ZU5ld0ZpbGUoKTtcbiAgfSk7XG5cbiAgLy8gY3JlYXRlIHRoZSB0b3AgcmlnaHQgbWVudVxuICBfY3JlYXRlTG9naW5CdG4oKTtcblxuICAvLyBsb2FkIHRoZSBnb29nbGUgYXV0aCBhbmQgZHJpdmUgYXBpJ3NcbiAgX2xvYWRBcGkoZnVuY3Rpb24oKSB7XG4gICAgLy8gaWYgdGhlIHVzZXIgaXMgYXV0aG9yaXplZCBncmFiIHRoZSByZWZyZXNoIHRva2VuXG4gICAgT2F1dGguaXNBdXRob3JpemVkKGZ1bmN0aW9uKHJlZnJlc2hUb2tlbil7XG4gICAgICAvLyBpZiB0aGVyZSBpcyBubyByZWZyZXNoIHRva2VuLCBsZWF2ZSwgd2UgYXJlIGluaXRpYWxpemVkXG4gICAgICBpZiggIXJlZnJlc2hUb2tlbiApIHJldHVybiBjYWxsYmFjaygpO1xuXG4gICAgICAvLyBpZiB3ZSBoYXZlIGEgcmVmZXNoIHRva2VuLCB0aGVuIHVzZXIgaXMgYWxsIHNldCxcbiAgICAgIC8vIGdldCBhIG5ldyBhY2Nlc3MgdG9rZW4gc28gd2UgY2FuIHN0YXJ0IHVzaW5nIHRoZSBhcGknc1xuICAgICAgLy8gZ3JhYiB0aGVpciBpbmZvcm1hdGlvbiBhbmQgZGlzcGxheVxuICAgICAgT2F1dGguZ2V0QWNjZXNzVG9rZW4oZnVuY3Rpb24odCl7XG4gICAgICAgIHRva2VuID0gdDtcbiAgICAgICAgaWYoIHRva2VuICkgX3NldFVzZXJJbmZvKCk7XG4gICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vIGNoZWNrIGlmIGFjY2VzcyB0b2tlbiBoYXMgZXhwaXJlZFxuICAgIHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgX2NoZWNrVG9rZW4oKTtcbiAgICB9LCAxMDAwICogNSAqIDYwKTtcbiAgfSk7XG5cbiAgLy8gc2V0dXAgdGhlIHRyZWUgJ3NoYXJlJyBidG5cbiAgJChcIiNzaGFyZS10cmVlLWJ0blwiKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgIC8vIHNlZSBpZiB3ZSBoYXZlIGEgc2hhcmUgY2xpZW50XG4gICAgaWYoIGNsaWVudCA9PSBudWxsICkge1xuICAgICAgLy8gbm8gY2xpZW50LCBsb2FkIGFwaVxuICAgICAgZ2FwaS5sb2FkKCdkcml2ZS1zaGFyZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgIC8vIG9uIGxvYWQsIHNob3cgdGhlIHNoYXJlIHBvcHVwIHdpdGggdGhlIGN1cnJlbnQgdHJlZVxuICAgICAgICAgY2xpZW50ID0gbmV3IGdhcGkuZHJpdmUuc2hhcmUuU2hhcmVDbGllbnQoT2F1dGguQVBQX0lEKTtcbiAgICAgICAgICBjbGllbnQuc2V0SXRlbUlkcyhbbG9hZGVkVHJlZV0pO1xuICAgICAgICAgY2xpZW50LnNob3dTZXR0aW5nc0RpYWxvZygpO1xuICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyB3ZSBoYXZlIGEgY2xpZW50LCBzaG93IHRoZSBzaGFyZSBwb3B1cCB3aXRoIGN1cnJlbnQgdHJlZVxuICAgICAgY2xpZW50LnNldEl0ZW1JZHMoW2xvYWRlZEZpbGVdKTtcbiAgICAgICBjbGllbnQuc2hvd1NldHRpbmdzRGlhbG9nKCk7XG4gICAgfVxuICB9KTtcblxufVxuXG4vKioqXG4gKiBTYXZlIHRoZSBjdXJyZW50IG1vZGVsIGFzIGEgbmV3IGdvb2dsZSBkcml2ZSBmaWxlXG4gKioqL1xuZnVuY3Rpb24gX3NhdmVOZXdGaWxlKCkge1xuICBnYSgnc2VuZCcsICdldmVudCcsICd1aScsICdpbnRlcmFjdGlvbicsICdzYXZlLWRyaXZlLWZpbGUnLCAxKTtcblxuICAvLyBncmFiIHRoZSBuYW1lIG9mIHRoZSBuZXcgZmlsZVxuICB2YXIgbmFtZSA9ICQoXCIjc2F2ZS1uYW1lLWlucHV0XCIpLnZhbCgpO1xuICBpZiggbmFtZS5sZW5ndGggPT0gMCApIHsgLy8gd2UgYWx3YXlzIHdhbnQgYSBuYW1lLCBhbGVydCBhbmQgcXVpdFxuICAgIF9zZXRTYXZlTWVzc2FnZSgnUGxlYXNlIHByb3ZpZGUgYSBmaWxlbmFtZS4nLCdpbmZvJyk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gc2VlIHdoYXQga2luZCBvZiBmaWxlIHdlIGFyZSBjcmVhdGluZyBiYXNlZCBvbiB0aGUgc2F2ZU1pbWVUeXBlIHZhclxuICBpZiggc2F2ZU1pbWVUeXBlID09IE1JTUVfVFlQRSApIHtcbiAgICBkYXRhID0gbW9kZWxJTy5leHBvcnRTZXR1cCgpO1xuICB9IGVsc2UgaWYgKCBzYXZlTWltZVR5cGUgPT0gVFJFRV9NSU1FX1RZUEUgKSB7XG4gICAgZGF0YSA9IG1vZGVsSU8uZXhwb3J0U2V0dXAoKS50cmVlO1xuICB9IGVsc2UgeyAvLyBiYWRuZXNzXG4gICAgYWxlcnQoXCJVbmtub3duIE1JTUVfVFlQRTogXCIrc2F2ZU1pbWVUeXBlKTtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBzZXQgdGhlIHVzZXIga25vdyB3aGF0IHdlIGFyZSBkb2luZ1xuICBfc2V0U2F2ZU1lc3NhZ2UoJzxpIGNsYXNzPVwiaWNvbi1zcGlubmVyIGljb24tc3BpblwiPjwvaT4gU2F2aW5nIEZpbGUuLi4nLCdpbmZvJyk7XG5cbiAgLy8gc2F2ZSB0aGUgZmlsZVxuICBzYXZlRmlsZShuYW1lLFxuICAgICAgJChcIiNzYXZlLWRlc2NyaXB0aW9uLWlucHV0XCIpLnZhbCgpLFxuICAgICAgc2F2ZU1pbWVUeXBlLFxuICAgICAgZGF0YSxcbiAgICAgIGZ1bmN0aW9uKHJlc3ApIHtcbiAgICAgICAgLy8gbGV0IHRoZSB1c2VyIGtub3cgd2hhdCBoYXBwZW5lZFxuICAgICAgICBpZiggcmVzcC5lcnJvciApIHJldHVybiBfc2V0U2F2ZU1lc3NhZ2UoJ0ZhaWxlZCB0byBzYXZlIHRvIEdvb2dsZSBEcml2ZSA6KCcsJ2RhbmdlcicpO1xuICAgICAgICBlbHNlIF9zZXRTYXZlTWVzc2FnZSgnU3VjZXNzZnVsbHkgc2F2ZWQuJywnc3VjY2VzcycpO1xuXG4gICAgICAgIC8vIHdhaXQgYSB0aWNrIHRvIGhpZGUgdGhlIHBvcHVwLCBzbyB1c2VyIHNlZXMgc3VjY2VzcyBtZXNzYWdlXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAkKFwiI3NhdmUtbW9kYWxcIikubW9kYWwoJ2hpZGUnKTtcbiAgICAgICAgfSwxNTAwKTtcblxuICAgICAgICAvLyBzaG93IHRoZSBzaGFyZSBidG5cbiAgICAgICAgaWYoIHNhdmVNaW1lVHlwZSA9PSBNSU1FX1RZUEUgKSB7XG4gICAgICAgICAgLy8gd2UgaGF2ZSBhIG5ldyBmaWxlLCB1cGRhdGUgb3VyIGxpc3RcbiAgICAgICAgICBfdXBkYXRlRmlsZUxpc3QoKTtcblxuICAgICAgICAgIC8vIHNob3cgdGhlIHNoYXJlIGJ0bnNcbiAgICAgICAgICAkKFwiI3NoYXJlLWJ0blwiKS5wYXJlbnQoKS5zaG93KCk7XG4gICAgICAgICAgJChcIiNvcGVuLWluLWRyaXZlXCIpLmF0dHIoXCJocmVmXCIsXCJodHRwczovL2RvY3MuZ29vZ2xlLmNvbS9maWxlL2QvXCIrcmVzcC5pZCkucGFyZW50KCkuc2hvdygpO1xuXG4gICAgICAgICAgLy8gc2V0IHRoZSBsb2FkZWQgZmlsZSBpZFxuICAgICAgICAgIGxvYWRlZEZpbGUgPSByZXNwLmlkO1xuICAgICAgICB9IGVsc2UgaWYgKCBzYXZlTWltZVR5cGUgPT0gVFJFRV9NSU1FX1RZUEUgKSB7XG4gICAgICAgICAgLy8gd2UgaGF2ZSBhIG5ldyB0cmVlLCB1cGRhdGUgdGhlIGxpc3RcbiAgICAgICAgICBfdXBkYXRlVHJlZUxpc3QoKTtcblxuICAgICAgICAgIC8vIHNob3cgdGhlIHRyZWUgc2hhcmUgYnRuc1xuICAgICAgICAgICQoXCIjc2hhcmUtdHJlZS1idG5cIikuc2hvdygpO1xuICAgICAgICAgICQoXCIjbG9hZGVkLXRyZWUtbmFtZVwiKS5odG1sKG5hbWUpLnBhcmVudCgpLnNob3coKTtcblxuICAgICAgICAgIC8vIHNldCB0aGUgbG9hZGVkIHRyZWVzXG4gICAgICAgICAgbG9hZGVkVHJlZSA9IHJlc3AuaWQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgKTtcbn1cblxuLyoqKlxuICogVXBkYXRlIHRoZSBjdXJyZW50bHkgbG9hZGVkIGdvb2dsZSBkcml2ZSBmaWxlXG4gKioqL1xuZnVuY3Rpb24gX3VwZGF0ZUN1cnJlbnRGaWxlKCkge1xuICBnYSgnc2VuZCcsICdldmVudCcsICd1aScsICdpbnRlcmFjdGlvbicsICd1cGRhdGUtZHJpdmUtZmlsZScsIDEpO1xuXG4gIC8vIGxldCB0aGUgdXNlciBrbm93IHdoYXQgd2UgYXJlIGRvaW5nXG4gIF9zZXRTYXZlTWVzc2FnZSgnPGkgY2xhc3M9XCJpY29uLXNwaW5uZXIgaWNvbi1zcGluXCI+PC9pPiBVcGRhdGluZy4uLicsJ2luZm8nKTtcblxuICB2YXIgZmlsZSA9IHt9O1xuICB2YXIgZGF0YSA9IHt9O1xuXG4gIC8vIGdyYWIgdGhlIGNvcnJlbnQgZGF0YSBhbmQgZmlsZWlkIGJhc2VkIG9uIG1pbWVUeXBlXG4gIGlmKCBzYXZlTWltZVR5cGUgPT0gTUlNRV9UWVBFICkge1xuICAgIGZpbGUgPSBsb2FkZWRGaWxlO1xuICAgIGRhdGEgPSBtb2RlbElPLmV4cG9ydFNldHVwKCk7XG4gIH0gZWxzZSBpZiAoIHNhdmVNaW1lVHlwZSA9PSBUUkVFX01JTUVfVFlQRSApIHtcbiAgICBmaWxlID0gbG9hZGVkVHJlZTtcbiAgICBkYXRhID0gbW9kZWxJTy5leHBvcnRTZXR1cCgpLnRyZWU7XG4gIH0gZWxzZSB7IC8vIGJhZG5lc3NcbiAgICBhbGVydChcIlVua25vd24gTUlNRV9UWVBFOiBcIitzYXZlTWltZVR5cGUpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIHVwZGF0ZSB0aGUgZ29vZ2xlIGRyaXZlIGZpbGVcbiAgdXBkYXRlRmlsZShmaWxlLFxuICAgICAgZGF0YSxcbiAgICAgIGZ1bmN0aW9uKHJlc3Ape1xuICAgICAgICAvLyBsZXQgdGhlIHVzZXIga25vdyB3aGF0IGhhcHBlbmVkXG4gICAgICAgIGlmKCByZXNwLmVycm9yICkgcmV0dXJuIF9zZXRTYXZlTWVzc2FnZSgnRmFpbGVkIHRvIHVwZGF0ZSBvbiBHb29nbGUgRHJpdmUgOignLCdkYW5nZXInKTtcbiAgICAgICAgZWxzZSBfc2V0U2F2ZU1lc3NhZ2UoJ1VwZGF0ZSBTdWNjZXNzZnVsLicsJ3N1Y2Nlc3MnKTtcblxuICAgICAgICAvLyB3YWl0IGEgdGljayBzbyB0aGUgdXNlciBrbm93cyB1cGRhdGUgd2FzIHN1Y2Nlc3NcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICQoXCIjc2F2ZS1tb2RhbFwiKS5tb2RhbCgnaGlkZScpO1xuICAgICAgICB9LDE1MDApO1xuXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgbGlzdCBmb3Igd2hhdGV2ZXIgdHlwZSB3YXMgdXBkYXRlZFxuICAgICAgICBpZiggc2F2ZU1pbWVUeXBlID09IE1JTUVfVFlQRSApIHtcbiAgICAgICAgICBfdXBkYXRlRmlsZUxpc3QoKTtcbiAgICAgICAgfSBlbHNlIGlmICggc2F2ZU1pbWVUeXBlID09IFRSRUVfTUlNRV9UWVBFICkge1xuICAgICAgICAgIF91cGRhdGVUcmVlTGlzdCgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICk7XG59XG5cbi8qKipcbiAqIHNldCBhIG1lc3NhZ2UgZm9yIHRoZSAnbG9hZCBmcm9tIGRyaXZlJyBwb3B1cC5cbiAqICB0eXBlIC0gYm9vc3RyYXAgYWxlcnQgdHlwZVxuICoqKi9cbmZ1bmN0aW9uIF9zZXRMb2FkTWVzc2FnZShtc2csIHR5cGUpIHtcbiAgaWYoICFtc2cgKSByZXR1cm4gJChcIiNnZHJpdmUtZmlsZS1tc2dcIikuaHRtbChcIlwiKTtcbiAgJCgnI2dkcml2ZS1maWxlLW1zZycpLmh0bWwoJzxkaXYgY2xhc3M9XCJhbGVydCBhbGVydC0nK3R5cGUrJ1wiPicrbXNnKyc8L2Rpdj4nKTtcbn1cblxuLyoqKlxuICogc2V0IGEgbWVzc2FnZSBmb3IgdGhlICdzYXZlIHRvIGRyaXZlJyBwb3B1cFxuICogdHlwZSAtIGJvb3N0cmFwIGFsZXJ0IHR5cGVcbiAqKiovXG5mdW5jdGlvbiBfc2V0U2F2ZU1lc3NhZ2UobXNnLCB0eXBlKSB7XG4gIGlmKCAhbXNnICkgcmV0dXJuICQoXCIjZ2RyaXZlLXNhdmUtbXNnXCIpLmh0bWwoXCJcIik7XG4gICQoJyNnZHJpdmUtc2F2ZS1tc2cnKS5odG1sKCc8ZGl2IGNsYXNzPVwiYWxlcnQgYWxlcnQtJyt0eXBlKydcIj4nK21zZysnPC9kaXY+Jyk7XG59XG5cbi8qKipcbiAqIGNyZWF0ZSB0aGUgdG9wIHJpZ2h0IG1lbnUuIFRoaXMgbWVudSBpcyBmb3Igd2hlbiB0aGUgdXNlciBpcyBub3QgbG9nZ2VkIGluXG4gKioqL1xuZnVuY3Rpb24gX2NyZWF0ZUxvZ2luQnRuKCkge1xuICB2YXIgYnRuID0gJCgnPGxpIGNsYXNzPVwiZHJvcGRvd25cIj4nXG4gICAgICArICc8YSBjbGFzcz1cImRyb3Bkb3duLXRvZ2dsZVwiIHN0eWxlPVwiY3Vyc29yOnBvaW50ZXJcIj5Mb2dpbjxiIGNsYXNzPVwiY2FyZXRcIj48L2I+PC9hPidcbiAgICAgICsgJzx1bCBjbGFzcz1cImRyb3Bkb3duLW1lbnVcIj4nXG4gICAgICArICc8bGk+PGEgaWQ9XCJoZWxwXCI+PGkgY2xhc3M9XCJpY29uLXF1ZXN0aW9uLXNpZ25cIj48L2k+IEhlbHA8L2E+PC9saT4nXG4gICAgICArICc8bGk+PGEgaWQ9XCJhYm91dFwiPjxpIGNsYXNzPVwiaWNvbi1pbmZvLXNpZ25cIj48L2k+IEFib3V0PC9hPjwvbGk+J1xuICAgICAgKyAnPGxpPjxhIGlkPVwibG9naW4td2l0aC1nb29nbGVcIj48aSBjbGFzcz1cImljb24tc2lnbmluXCI+PC9pPiBMb2dpbiB3aXRoIEdvb2dsZTwvYT48L2xpPidcbiAgICAgICsgJzwvdWw+PC9saT4nKTtcblxuICAvLyBzZXQgY2xpY2sgaGFuZGxlcnMgZm9yIHBvcHVwXG4gIGJ0bi5maW5kKCdhLmRyb3Bkb3duLXRvZ2dsZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgJCh0aGlzKS5wYXJlbnQoKS50b2dnbGVDbGFzcygnb3BlbicpO1xuICB9KTtcblxuICAvLyBhYm91dCBjbGljayBoYW5kbGVyXG4gIGJ0bi5maW5kKCcjYWJvdXQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICBidG4udG9nZ2xlQ2xhc3MoJ29wZW4nKTtcbiAgICAkKFwiI2Fib3V0LW1vZGFsXCIpLm1vZGFsKCdzaG93Jyk7XG4gIH0pO1xuXG4gIGJ0bi5maW5kKCcjaGVscCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgIGJ0bi50b2dnbGVDbGFzcygnb3BlbicpO1xuICAgIHNob3dIZWxwKCk7XG4gIH0pO1xuXG4gIC8vIGxvZ2luIGNsaWNrIGhhbmRsZXJcbiAgYnRuLmZpbmQoJyNsb2dpbi13aXRoLWdvb2dsZScpLm9uKCdjbGljaycsZnVuY3Rpb24oKSB7XG4gICAgZ2EoJ3NlbmQnLCAnZXZlbnQnLCAndWknLCAnaW50ZXJhY3Rpb24nLCAndXNlci1sb2dpbicsIDEpO1xuICAgIGJ0bi50b2dnbGVDbGFzcygnb3BlbicpO1xuICAgIHNpZ25JbihmdW5jdGlvbih0b2tlbikge1xuICAgICAgX3NldFVzZXJJbmZvKCk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIC8vIGFkZCBtZW51XG4gICQoXCIjbG9naW4taGVhZGVyXCIpLmh0bWwoXCJcIikuYXBwZW5kKGJ0bik7XG59O1xuXG4vKioqXG4gKiBDcmVhdGUgdGhlIHRvcCByaWdodCBtZW51IGZvciB3aGVuIHRoZSB1c2VyIGlzIGxvZ2dlZCBpblxuICoqKi9cbmZ1bmN0aW9uIF9jcmVhdGVMb2dvdXRCdG4odXNlcmRhdGEpIHtcbiAgLy8gc2V0IGJ0biBodG1sXG4gIHZhciBidG4gPSAkKCc8bGkgY2xhc3M9XCJkcm9wZG93blwiPidcbiAgICAgICsgJzxhIGNsYXNzPVwiZHJvcGRvd24tdG9nZ2xlXCIgc3R5bGU9XCJjdXJzb3I6cG9pbnRlclwiPjxpbWcgY2xhc3M9XCJpbWctcm91bmRlZFwiIHNyYz1cIicrdXNlcmRhdGEucGljdHVyZVxuICAgICAgKyAnXCIgc3R5bGU9XCJtYXJnaW46LTVweCA1cHggLTVweCAwO3dpZHRoOjI4cHg7aGVpZ2h0OjI4cHg7Ym9yZGVyOjFweCBzb2xpZCB3aGl0ZVwiIC8+ICcgKyB1c2VyZGF0YS5uYW1lXG4gICAgICArICc8YiBjbGFzcz1cImNhcmV0XCI+PC9iPjwvYT4nICsgJzx1bCBjbGFzcz1cImRyb3Bkb3duLW1lbnVcIj4nXG4gICAgICArICc8bGk+PGEgaWQ9XCJzYXZlXCI+PGkgY2xhc3M9XCJpY29uLWNsb3VkLXVwbG9hZFwiPjwvaT4gU2F2ZSBNb2RlbDwvYT48L2xpPidcbiAgICAgICsgJzxsaSBzdHlsZT1cImRpc3BsYXk6bm9uZVwiPjxhIGlkPVwic2hhcmUtYnRuXCI+PGkgY2xhc3M9XCJpY29uLXNoYXJlXCI+PC9pPiBTaGFyZSBNb2RlbDwvYT48L2xpPidcbiAgICAgICsgJzxsaSBzdHlsZT1cImRpc3BsYXk6bm9uZVwiPjxhIGlkPVwib3Blbi1pbi1kcml2ZVwiIHRhcmdldD1cIl9ibGFua1wiPjxpIGNsYXNzPVwiaWNvbi1leHRlcm5hbC1saW5rLXNpZ25cIj48L2k+IE9wZW4gaW4gR29vZ2xlIERyaXZlPC9hPjwvbGk+J1xuICAgICAgKyAnPGxpPjxhIGlkPVwibG9hZFwiPjxpIGNsYXNzPVwiaWNvbi1jbG91ZC1kb3dubG9hZFwiPjwvaT4gTG9hZCBNb2RlbDwvYT48L2xpPidcbiAgICAgICsgJzxsaT48YSBpZD1cImhlbHBcIj48aSBjbGFzcz1cImljb24tcXVlc3Rpb24tc2lnblwiPjwvaT4gSGVscDwvYT48L2xpPidcbiAgICAgICsgJzxsaT48YSBpZD1cImFib3V0XCI+PGkgY2xhc3M9XCJpY29uLWluZm8tc2lnblwiPjwvaT4gQWJvdXQ8L2E+PC9saT4nXG4gICAgICArICc8bGk+PGEgaWQ9XCJsb2dvdXRcIj48aSBjbGFzcz1cImljb24tc2lnbm91dFwiPjwvaT4gTG9nb3V0PC9hPjwvbGk+J1xuICAgICAgKyAnPC91bD48L2xpPicpO1xuXG4gIC8vIGFkZCBjbGljayBoYW5kbGVyIHRvIHNob3cgbWVudVxuICBidG4uZmluZCgnYS5kcm9wZG93bi10b2dnbGUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICQodGhpcykucGFyZW50KCkudG9nZ2xlQ2xhc3MoJ29wZW4nKTtcbiAgfSk7XG5cbiAgLy8gc2hvdyB0aGUgc2F2ZSBwb3B1cFxuICBidG4uZmluZCgnI3NhdmUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAvLyBzZXQgdGhlIGN1cnJlbnQgc2F2ZSBtaW1lVHlwZVxuICAgIHNhdmVNaW1lVHlwZSA9IE1JTUVfVFlQRTtcblxuICAgIC8vIGxldCB0aGUgdXNlciBrbm93IHdoYXQgdHlwIHRoZXkgYXJlIHNhdmluZ1xuICAgICQoXCIjZ2RyaXZlLXNhdmUtc3ViaGVhZGVyXCIpLmh0bWwoXCI8aDU+U2F2ZSBNb2RlbDwvaDU+XCIpO1xuXG4gICAgYnRuLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XG5cbiAgICAvLyBpZiB0aGUgZmlsZSBpcyBsb2FkZWQsIHNob3cgdGhlIHVwZGF0ZSBwYW5lbFxuICAgIGlmKCBsb2FkZWRGaWxlICE9IG51bGwpIHtcbiAgICAgIC8vIGdyYWIgdGhlIGN1cnJlbnQgZmlsZXMgbWV0YWRhdGFcbiAgICAgIHZhciBmaWxlID0ge307XG4gICAgICBmb3IoIHZhciBpID0gMDsgaSA8IGZpbGVMaXN0Lmxlbmd0aDsgaSsrICkge1xuICAgICAgICBpZiggZmlsZUxpc3RbaV0uaWQgPT0gbG9hZGVkRmlsZSkge1xuICAgICAgICAgIGZpbGUgPSBmaWxlTGlzdFtpXTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBzaG93IHRoZSB1cGRhdGUgcGFuZWxcbiAgICAgICQoXCIjc2F2ZS11cGRhdGUtcGFuZWxcIikuc2hvdygpO1xuXG4gICAgICAvLyByZW5kZXIgdGhlIGZpbGVzIG1ldGFkYXRhIGluIHRoZSB1cGRhdGUgcGFuZWxcbiAgICAgIHZhciBkID0gbmV3IERhdGUoZmlsZS5tb2RpZmllZERhdGUpO1xuICAgICAgJChcIiNzYXZlLXVwZGF0ZS1wYW5lbC1pbm5lclwiKS5odG1sKFwiPGI+XCIrZmlsZS50aXRsZStcIjwvYj48YnIgLz5cIiArXG4gICAgICAgICAgXCI8c3BhbiBzdHlsZT0nY29sb3I6Izg4OCc+XCIrZmlsZS5kZXNjcmlwdGlvbitcIjwvc3Bhbj48YnIgLz5cIitcbiAgICAgICAgICBcIjxzcGFuIHN0eWxlPSdmb250LXN0eWxlOml0YWxpYztmb250LXNpemU6MTFweDsnPkxhc3QgTW9kaWZpZWQ6IFwiICtcbiAgICAgICAgICBkLnRvRGF0ZVN0cmluZygpK1wiIFwiK2QudG9Mb2NhbGVUaW1lU3RyaW5nKCkrXCIgYnkgXCIrZmlsZS5sYXN0TW9kaWZ5aW5nVXNlck5hbWUrXCI8L3NwYW4+PGJyIC8+XCIrXG4gICAgICAgICAgXCI8YSBocmVmPSdodHRwczovL2RyaXZlLmdvb2dsZS5jb20vZmlsZS9kL1wiK2ZpbGUuaWQrXCInJyB0YXJnZXQ9J19ibGFuayc+PGkgY2xhc3M9J2ljb24tbGluayc+PC9pPiBcIiArXG4gICAgICAgICAgXCJMaW5rIHRvIFNoYXJlPC9hPiA8c3BhbiBzdHlsZT0nY29sb3I6Izg4OCc+KG11c3QgaGF2ZSBwZXJtaXNzaW9uKTwvc3Bhbj48YnIgLz48YnIgLz5cIik7XG4gICAgfSBlbHNlIHtcbiAgICAgICQoXCIjc2F2ZS11cGRhdGUtcGFuZWxcIikuaGlkZSgpO1xuICAgIH1cblxuICAgIC8vIGNsZWFyIGFueSBtZXNzYWdlXG4gICAgX3NldFNhdmVNZXNzYWdlKG51bGwpO1xuXG4gICAgLy8gc2hvdyB0aGUgc2F2ZSBwb3B1cFxuICAgICQoXCIjc2F2ZS1tb2RhbFwiKS5tb2RhbCgnc2hvdycpO1xuICB9KTtcblxuICAvLyBjbGljayBoYW5kbGVyIGZvciBzaGFyZSBidG5cbiAgYnRuLmZpbmQoXCIjc2hhcmUtYnRuXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgZ2EoJ3NlbmQnLCAnZXZlbnQnLCAndWknLCAnaW50ZXJhY3Rpb24nLCAnb3Blbi1kcml2ZS1zaGFyZScsIDEpO1xuXG4gICAgLy8gaGFzIHRoZSBzaGFyZSBjbGllbnQgYmVlbiBsb2FkZWRcbiAgICBpZiggY2xpZW50ID09IG51bGwgKSB7XG4gICAgICAvLyBsb2FkIHRoZSBzaGFyZSBwb3B1cFxuICAgICAgZ2FwaS5sb2FkKCdkcml2ZS1zaGFyZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgIC8vIGNyZWF0ZSBhbmQgc2hvdyB0aGUgc2hhcmUgcG9wdXBcbiAgICAgICAgIGNsaWVudCA9IG5ldyBnYXBpLmRyaXZlLnNoYXJlLlNoYXJlQ2xpZW50KE9hdXRoLkFQUF9JRCk7XG4gICAgICAgICAgY2xpZW50LnNldEl0ZW1JZHMoW2xvYWRlZEZpbGVdKTtcbiAgICAgICAgIGNsaWVudC5zaG93U2V0dGluZ3NEaWFsb2coKTtcbiAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gc2hvdyB0aGUgc2hhcmUgcG9wdXBcbiAgICAgIGNsaWVudC5zZXRJdGVtSWRzKFtsb2FkZWRGaWxlXSk7XG4gICAgICAgY2xpZW50LnNob3dTZXR0aW5nc0RpYWxvZygpO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gc2hvdyBhYm91dCBwYW5lbFxuICBidG4uZmluZCgnI2Fib3V0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgYnRuLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XG4gICAgJChcIiNhYm91dC1tb2RhbFwiKS5tb2RhbCgnc2hvdycpO1xuICB9KTtcblxuICBidG4uZmluZCgnI2hlbHAnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICBidG4udG9nZ2xlQ2xhc3MoJ29wZW4nKTtcbiAgICBzaG93SGVscCgpO1xuICB9KTtcblxuICAvLyBzaG93IHRoZSAnbG9hZCBmcm9tIGRyaXZlJyBwYW5lbFxuICBidG4uZmluZCgnI2xvYWQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICBidG4udG9nZ2xlQ2xhc3MoJ29wZW4nKTtcblxuICAgIC8vIGhpZGUgYW55IGV4aXN0aW5nIG1lc3NhZ2VcbiAgICBfc2V0TG9hZE1lc3NhZ2UobnVsbCk7XG5cbiAgICAvLyByZW5kZXIgdGhlIG1vZGVsIGZpbGVzIGluIHRoZSBwb3B1cCBmaWxlc1xuICAgIF9zaG93RHJpdmVGaWxlcygpO1xuXG4gICAgLy8gc2hvdyB0aGUgbW9kYWxcbiAgICAkKFwiI2xvYWQtbW9kYWxcIikubW9kYWwoJ3Nob3cnKTtcbiAgfSk7XG5cbiAgLy8gbG9hZCB0aGUgdXNlciBvdXRcbiAgYnRuLmZpbmQoJyNsb2dvdXQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICBnYSgnc2VuZCcsICdldmVudCcsICd1aScsICdpbnRlcmFjdGlvbicsICd1c2VyLWxvZ291dCcsIDEpO1xuXG4gICAgYnRuLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XG5cbiAgICAvLyBraWxsIHRoZSBhY2Nlc3MgdG9rZW5cbiAgICB0b2tlbiA9IG51bGw7XG5cbiAgICAvLyB1cGRhdGUgdGhlIG1lbnUgcGFuZWxcbiAgICBfY3JlYXRlTG9naW5CdG4oKTtcbiAgfSk7XG5cbiAgLy8gYXR0YWNoIHRoZSBtZW51XG4gICQoXCIjbG9naW4taGVhZGVyXCIpLmh0bWwoXCJcIikuYXBwZW5kKGJ0bik7XG59O1xuXG4vKioqXG4gKiAgUmVxdWVzdCB0aGUgdXNlcidzIGluZm9ybWF0aW9uLiAgV2hlbiBsb2FkZWQsIHVwZGF0ZSB0aGUgdG9wIHJpZ2h0IG1lbnVcbiAqKiovXG5mdW5jdGlvbiBfc2V0VXNlckluZm8oKSB7XG4gIC8vIGxvYWQgdXNlciBuYW1lXG4gICQuYWpheCh7XG4gICAgdXJsIDogXCJodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9vYXV0aDIvdjEvdXNlcmluZm9cIixcbiAgICBiZWZvcmVTZW5kIDogZnVuY3Rpb24ocmVxdWVzdCkge1xuICAgICAgLy8gYWx3YXlzIHNldCB5b3VyIGFjY2VzcyBzdG9rZW5cbiAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihcIkF1dGhvcml6YXRpb25cIiwnQmVhcmVyICcrIHRva2VuLmFjY2Vzc190b2tlbik7XG4gICAgfSxcbiAgICBzdWNjZXNzIDogZnVuY3Rpb24oZGF0YSwgc3RhdHVzLHhocikge1xuICAgICAgLy8gcGFyc2UgeW91ciBqc29uIHJlc3BvbnNlXG4gICAgICB0cnkge1xuICAgICAgICBkYXRhID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHt9XG5cbiAgICAgIC8vIHVwZGF0ZSB0b3AgcmlnaHQgbWVudVxuICAgICAgX2NyZWF0ZUxvZ291dEJ0bihkYXRhKTtcblxuICAgICAgLy8gc2V0IHRvIHdpbmRvdyBzY29wZVxuICAgICAgd2luZG93LnVzZXJpbmZvID0gZGF0YTtcbiAgICB9LFxuICAgIGVycm9yIDogZnVuY3Rpb24oKSB7XG4gICAgICAvLyBUT0RPOiBzaG91bGQgd2UgYWxlcnQgdGhpcz9cbiAgICB9XG4gIH0pO1xuXG4gIC8vIGxvYWQgdXNlciBmaWxlcywgdHJlZXNcbiAgX3VwZGF0ZUZpbGVMaXN0KCk7XG4gIF91cGRhdGVUcmVlTGlzdCgpO1xufVxuXG4vKioqXG4gKiAgU2VhcmNoIGZvciB0aGUgdXNlcnMgbW9kZWxzXG4gKlxuICogVE9ETzogYWRkIHNlYXJjaCB0byB0aGUgZm9sbG93aW5nIGZ1bmN0aW9ucyxcbiAqICBsaW1pdCB0byAxMCByZXN1bHRzXG4gKioqL1xuZnVuY3Rpb24gX3VwZGF0ZUZpbGVMaXN0KCkge1xuICBsaXN0RmlsZXMoXCJtaW1lVHlwZSA9ICdcIitNSU1FX1RZUEUrXCInXCIsIGZ1bmN0aW9uKHJlc3Ape1xuICAgIGZpbGVMaXN0ID0gcmVzcC5yZXN1bHQuaXRlbXM7XG4gIH0pO1xufVxuXG4vKioqXG4gKiAgU2VhcmNoIGZvciB0aGUgdXNlcnMgdHJlZXNcbiAqXG4gKiBUT0RPOiBhZGQgc2VhcmNoIHRvIHRoZSBmb2xsb3dpbmcgZnVuY3Rpb25zLFxuICogIGxpbWl0IHRvIDEwIHJlc3VsdHNcbiAqKiovXG5mdW5jdGlvbiBfdXBkYXRlVHJlZUxpc3QoKSB7XG4gIGxpc3RGaWxlcyhcIm1pbWVUeXBlID0gJ1wiK1RSRUVfTUlNRV9UWVBFK1wiJ1wiLCBmdW5jdGlvbihyZXNwKXtcbiAgICB0cmVlTGlzdCA9IHJlc3AucmVzdWx0Lml0ZW1zO1xuICB9KTtcbn1cblxuLyoqKlxuICogIFJlbmRlciB0aGUgdXNlcnMgY3VycmVudCBtb2RlbHMgb250byB0aGUgJ2xvYWQgZnJvbSBkcml2ZScgcG9wdXBcbiAqKiovXG5mdW5jdGlvbiBfc2hvd0RyaXZlRmlsZXMoKSB7XG4gIC8vIGlmIHRoZXkgaGF2ZSBubyBmaWxlcywgc2F5IHNvIGFuZCBnZXQgb3V0IG9mIGhlcmVcbiAgaWYoICFmaWxlTGlzdCApIHJldHVybiAkKFwiI2dkcml2ZS1maWxlLWxpc3RcIikuaHRtbChcIjxsaT5ObyBGaWxlczwvbGk+XCIpO1xuICBpZiggZmlsZUxpc3QubGVuZ3RoID09IDAgKSByZXR1cm4gJChcIiNnZHJpdmUtZmlsZS1saXN0XCIpLmh0bWwoXCI8bGk+Tm8gRmlsZXM8L2xpPlwiKTtcblxuICAvLyBzaG93IGEgdGl0bGUsIHRoZXJlIGFyZSBtdWx0aXBsZSB0eXBlcyB0aGF0IGNhbiBiZSBsb2FkZWQgZnJvbSBkcml2ZVxuICAkKFwiI2dkcml2ZS1maWxlLWxpc3RcIikuaHRtbChcIjxoND5TZWxlY3QgRmlsZTwvaDQ+XCIpO1xuXG4gIC8vIGNyZWF0ZSB0aGUgbGlzdCBlbGVtZW50cyBmb3IgZWFjaCBmaWxlcyBtZXRhZGF0YVxuICBmb3IoIHZhciBpID0gMDsgaSA8IGZpbGVMaXN0Lmxlbmd0aDsgaSsrICkge1xuICAgIHZhciBpdGVtID0gZmlsZUxpc3RbaV07XG4gICAgdmFyIGQgPSBuZXcgRGF0ZShpdGVtLm1vZGlmaWVkRGF0ZSk7XG4gICAgJChcIiNnZHJpdmUtZmlsZS1saXN0XCIpLmFwcGVuZChcbiAgICAgICQoXCI8bGkgY2xhc3M9J2xpc3QtZ3JvdXAtaXRlbSc+PGEgaWQ9J1wiK2l0ZW0uaWQrXCInIHVybD0nXCIraXRlbS5kb3dubG9hZFVybCtcIicgc3R5bGU9J2N1cnNvcjpwb2ludGVyJz48aSBjbGFzcz0naWNvbi1maWxlJz48L2k+IFwiK2l0ZW0udGl0bGUrXCI8L2E+XCIgK1xuICAgICAgICBcIjxkaXYgc3R5bGU9J2NvbG9yOiM4ODg7cGFkZGluZzogNXB4IDAgMCAxMHB4Jz5cIitpdGVtLmRlc2NyaXB0aW9uK1wiPC9kaXY+XCIrXG4gICAgICAgIFwiPGRpdiBzdHlsZT0nZm9udC1zdHlsZTppdGFsaWM7Zm9udC1zaXplOjExcHg7cGFkZGluZy1sZWZ0OjEwcHgnPkxhc3QgTW9kaWZpZWQ6IFwiK2QudG9EYXRlU3RyaW5nKCkrXCIgXCIrZC50b0xvY2FsZVRpbWVTdHJpbmcoKStcIiBieSBcIitpdGVtLmxhc3RNb2RpZnlpbmdVc2VyTmFtZStcIjxkaXY+PC9saT5cIlxuICAgICAgICApXG4gICAgKTtcbiAgfVxuXG4gIC8vIGFkZCBjbGljayBoYW5kbGVyIGZvciBlYWNoIGZpbGVcbiAgJChcIiNnZHJpdmUtZmlsZS1saXN0IGFcIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICBnYSgnc2VuZCcsICdldmVudCcsICd1aScsICdpbnRlcmFjdGlvbicsICdsb2FkLWRyaXZlLW1vZGVsJywgMSk7XG5cbiAgICB2YXIgaWQgPSAkKHRoaXMpLmF0dHIoXCJpZFwiKTtcblxuICAgIC8vIGxldCB0aGUgdXNlciBrbm93IHdoYXQgd2UgYXJlIGRvaW5nXG4gICAgX3NldExvYWRNZXNzYWdlKCc8aSBjbGFzcz1cImljb24tc3Bpbm5lciBpY29uLXNwaW5cIj48L2k+IExvYWRpbmcgRmlsZS4uLicsJ2luZm8nKTtcblxuICAgIC8vIGdyYWIgdGhlIGZpdmUgZnJvbSBkcml2ZVxuICAgIGdldEZpbGUoaWQsICQodGhpcykuYXR0cihcInVybFwiKSwgZnVuY3Rpb24oZmlsZSkge1xuICAgICAgLy8gaWYgYmFkbmVzcywgbGV0IHRoZSB1c2VyIGtub3dcbiAgICAgIGlmKCAhZmlsZSAgKSByZXR1cm4gX3NldExvYWRNZXNzYWdlKCdGYWlsZWQgdG8gbG9hZCBmaWxlIGZyb20gR29vZ2xlIERyaXZlIDooJywnZGFuZ2VyJyk7XG4gICAgICBpZiggZmlsZS5lcnJvciAgKSByZXR1cm4gX3NldExvYWRNZXNzYWdlKCdGYWlsZWQgdG8gbG9hZCBmaWxlIGZyb20gR29vZ2xlIERyaXZlIDooJywnZGFuZ2VyJyk7XG5cbiAgICAgIC8vIGhpZGUgYW55IGxvYWRlZCB0cmVlcyxcbiAgICAgICQoXCIjc2hhcmUtdHJlZS1idG5cIikuaGlkZSgpO1xuICAgICAgJChcIiNsb2FkZWQtdHJlZS1uYW1lXCIpLmh0bWwoXCJcIikucGFyZW50KCkuaGlkZSgpO1xuICAgICAgbG9hZGVkVHJlZSA9IG51bGw7XG5cbiAgICAgIC8vIGxldCB0aGUgdXNlciBrbm93IHdlIGFyZSBhbGwgZ29vZFxuICAgICAgX3NldExvYWRNZXNzYWdlKCdGaWxlIExvYWRlZC4nLCdzdWNjZXNzJyk7XG5cbiAgICAgIC8vIHNldCB0aGUgbG9hZGVkIGZpbGUgaWRcbiAgICAgIGxvYWRlZEZpbGUgPSBpZDtcblxuICAgICAgLy8gc2V0IHRoZSBsb2FkZWQgZmlsZSBuYW1lXG4gICAgICBmb3IoIHZhciBpID0gMDsgaSA8IGZpbGVMaXN0Lmxlbmd0aDsgaSsrICkge1xuICAgICAgICBpZiggaWQgPT0gZmlsZUxpc3RbaV0uaWQgKSB7XG4gICAgICAgICAgJChcIiNsb2FkZWQtbW9kZWwtdGl0bGVcIikuaHRtbChcIjxzcGFuIHN0eWxlPSdjb2xvcjojMzMzJz5Mb2FkZWQgTW9kZWwgPC9zcGFuPiBcIitmaWxlTGlzdFtpXS50aXRsZSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gc2hvdyB0aGUgc2hhcmUgYnRuXG4gICAgICAkKFwiI3NoYXJlLWJ0blwiKS5wYXJlbnQoKS5zaG93KCk7XG4gICAgICAkKFwiI29wZW4taW4tZHJpdmVcIikuYXR0cihcImhyZWZcIixcImh0dHBzOi8vZG9jcy5nb29nbGUuY29tL2ZpbGUvZC9cIitpZCkucGFyZW50KCkuc2hvdygpO1xuXG4gICAgICAvLyBzZXR1cCBtb2RlbFxuICAgICAgbW9kZWxJTy5sb2FkU2V0dXAoaWQsIGZpbGUpO1xuXG4gICAgICAvLyBzZXR1cCByZWFsdGltZSBldmVudHNcbiAgICAgIGdkcml2ZVJULmluaXRSdEFwaShsb2FkZWRGaWxlKTtcblxuICAgICAgLy8gd2FpdCBhIHRpY2sgc28gdXNlciBjYW4gc2VlIHN1Y2Nlc3MgbWVzc2FnZVxuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAvLyBoaWRlIHRoZSBtb2RhbFxuICAgICAgICAkKFwiI2xvYWQtbW9kYWxcIikubW9kYWwoJ2hpZGUnKTtcbiAgICAgIH0sMTUwMCk7XG5cbiAgICB9KTtcbiAgfSk7XG59XG5cbi8qKipcbiAqICBSZW5kZXIgdGhlIHVzZXJzIGN1cnJlbnQgdHJlZXMgb250byB0aGUgJ2xvYWQgZnJvbSBkcml2ZScgcG9wdXBcbiAqKiovXG5mdW5jdGlvbiBfc2hvd1RyZWVGaWxlcygpIHtcbiAgLy8gdXBkYXRlIHRoZSBsaXN0IGhlYWRlciwgbGV0IHVzZXIga25vdyB3aGF0IHRoZXkgYXJlIHNlbGVjdGluZ1xuICAkKFwiI2dkcml2ZS1maWxlLWxpc3RcIikuaHRtbChcIlwiKTtcbiAgJChcIiNnZHJpdmUtZmlsZS1saXN0XCIpLmFwcGVuZCgkKFwiPGxpIGNsYXNzPSdsaXN0LWdyb3VwLWl0ZW0nPjxoNT5TZWxlY3QgVHJlZTwvaDU+PC9saT5cIikpO1xuXG4gIC8vIGlmIHRoZXJlIGFyZSBubyB0cmVlcywgc2F5IHNvIGFuZCBnZXQgb3V0IG9mIGhlcmVcbiAgaWYoICF0cmVlTGlzdCApIHJldHVybiAkKFwiI2dkcml2ZS1maWxlLWxpc3RcIikuYXBwZW5kKCQoXCI8bGkgY2xhc3M9J2xpc3QtZ3JvdXAtaXRlbSc+Tm8gVHJlZXMgQXZhaWxhYmxlPC9saT5cIikpO1xuICBpZiggdHJlZUxpc3QubGVuZ3RoID09IDAgKSByZXR1cm4gJChcIiNnZHJpdmUtZmlsZS1saXN0XCIpLmFwcGVuZCgkKFwiPGxpIGNsYXNzPSdsaXN0LWdyb3VwLWl0ZW0nPk5vIFRyZWVzIEF2YWlsYWJsZTwvbGk+XCIpKTtcblxuICAvLyBjcmVhdGUgdGhlIHRyZWUgbGlzdCBlbGVtZW50c1xuICBmb3IoIHZhciBpID0gMDsgaSA8IHRyZWVMaXN0Lmxlbmd0aDsgaSsrICkge1xuICAgIHZhciBpdGVtID0gdHJlZUxpc3RbaV07XG4gICAgdmFyIGQgPSBuZXcgRGF0ZShpdGVtLm1vZGlmaWVkRGF0ZSk7XG4gICAgJChcIiNnZHJpdmUtZmlsZS1saXN0XCIpLmFwcGVuZChcbiAgICAgICQoXCI8bGkgY2xhc3M9J2xpc3QtZ3JvdXAtaXRlbSc+PGEgaWQ9J1wiK2l0ZW0uaWQrXCInIG5hbWU9J1wiK2l0ZW0udGl0bGUrXCInIHVybD0nXCIraXRlbS5kb3dubG9hZFVybCtcIicgc3R5bGU9J2N1cnNvcjpwb2ludGVyJz48aSBjbGFzcz0naWNvbi1sZWFmJz48L2k+IFwiK2l0ZW0udGl0bGUrXCI8L2E+XCIgK1xuICAgICAgICBcIjxkaXYgc3R5bGU9J2NvbG9yOiM4ODg7cGFkZGluZzogNXB4IDAgMCAxMHB4Jz5cIitpdGVtLmRlc2NyaXB0aW9uK1wiPC9kaXY+XCIrXG4gICAgICAgIFwiPGRpdiBzdHlsZT0nZm9udC1zdHlsZTppdGFsaWM7Zm9udC1zaXplOjExcHg7cGFkZGluZy1sZWZ0OjEwcHgnPkxhc3QgTW9kaWZpZWQ6IFwiK2QudG9EYXRlU3RyaW5nKCkrXCIgXCIrZC50b0xvY2FsZVRpbWVTdHJpbmcoKStcIiBieSBcIitpdGVtLmxhc3RNb2RpZnlpbmdVc2VyTmFtZStcIjxkaXY+PC9saT5cIlxuICAgICAgICApXG4gICAgKTtcbiAgfVxuXG4gIC8vIGFkZCBjbGljayBoYW5kbGVyIGZvciB0aXRsZXNcbiAgJChcIiNnZHJpdmUtZmlsZS1saXN0IGFcIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICBnYSgnc2VuZCcsICdldmVudCcsICd1aScsICdpbnRlcmFjdGlvbicsICdsb2FkLWRyaXZlLXRyZWUnLCAxKTtcblxuICAgIHZhciBpZCA9ICQodGhpcykuYXR0cihcImlkXCIpO1xuICAgIHZhciBuYW1lID0gJCh0aGlzKS5hdHRyKFwibmFtZVwiKTtcblxuICAgIC8vIHRlbGwgdGhlIHVzZXIgd2UgYXJlIGxvYWRpbmdcbiAgICBfc2V0TG9hZE1lc3NhZ2UoJzxpIGNsYXNzPVwiaWNvbi1zcGlubmVyIGljb24tc3BpblwiPjwvaT4gTG9hZGluZyBUcmVlLi4uJywnaW5mbycpO1xuXG4gICAgLy8gbG9hZCBmaWxlIGZyb20gZHJpdmVcbiAgICBnZXRGaWxlKGlkLCAkKHRoaXMpLmF0dHIoXCJ1cmxcIiksIGZ1bmN0aW9uKGZpbGUpIHtcbiAgICAgIC8vIGlmIGJhZG5lc3MsIGxldCB1c2VyIGtub3dcbiAgICAgIGlmKCAhZmlsZSAgKSByZXR1cm4gX3NldExvYWRNZXNzYWdlKCdGYWlsZWQgdG8gbG9hZCB0cmVlIGZyb20gR29vZ2xlIERyaXZlIDooJywnZGFuZ2VyJyk7XG4gICAgICBpZiggZmlsZS5lcnJvciAgKSByZXR1cm4gX3NldExvYWRNZXNzYWdlKCdGYWlsZWQgdG8gbG9hZCB0cmVlIGZyb20gR29vZ2xlIERyaXZlIDooJywnZGFuZ2VyJyk7XG5cbiAgICAgIC8vIHNob3cgdGhlIHRyZWUgc2hhcmluZyBidG5zXG4gICAgICAkKFwiI3NoYXJlLXRyZWUtYnRuXCIpLnNob3coKTtcbiAgICAgICQoXCIjbG9hZGVkLXRyZWUtbmFtZVwiKS5odG1sKG5hbWUpLnBhcmVudCgpLnNob3coKTtcblxuICAgICAgLy8gbGV0IHRoZSB1c2VyIGtub3cgd2UgYXJlIHN1Y2Nlc2Z1bGxcbiAgICAgIF9zZXRMb2FkTWVzc2FnZSgnVHJlZSBMb2FkZWQuJywnc3VjY2VzcycpO1xuXG4gICAgICAvLyBzZXQgdGhlIGxvYWRlZCB0cmVlIGlkXG4gICAgICBsb2FkZWRUcmVlID0gaWQ7XG5cbiAgICAgIC8vIGxvYWRlZCB0cmVlIGludG8gbW9kZWwgLyBVSVxuICAgICAgbW9kZWxJTy5sb2FkVHJlZShmaWxlKTtcblxuICAgICAgLy8gd2FpdCBhIHNlYyBzbyB1c2VyIGNhbiBzZWUgc3VjY2VzcyBtZXNzYWdlXG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICQoXCIjbG9hZC1tb2RhbFwiKS5tb2RhbCgnaGlkZScpO1xuICAgICAgfSwxNTAwKTtcblxuICAgIH0pO1xuICB9KTtcbn1cblxuLyoqKlxuICogIHNob3cgdGhlIHVzZXIgdGhlIGxvYWQgdHJlZSBwb3B1cFxuICoqKi9cbmZ1bmN0aW9uIHNob3dMb2FkVHJlZVBhbmVsKCkge1xuICAvLyByZW5kZXIgdGhlIHRyZWVzIGludG8gdGhlIHBvcHVwIGxpc3RcbiAgX3Nob3dUcmVlRmlsZXMoKTtcbiAgLy8gY2xlYXIgYW55IG1lc3NhZ2VzXG4gIF9zZXRMb2FkTWVzc2FnZShudWxsKTtcbiAgLy8gc2hvdyB0aGUgcG9wdXBcbiAgJChcIiNsb2FkLW1vZGFsXCIpLm1vZGFsKCdzaG93Jyk7XG59XG5cbi8qKipcbiAqICBzaG93IHRoZSB1c2VyIHRoZSBzYXZlIHRyZWUgcG9wdXBcbiAqKiovXG5mdW5jdGlvbiBzaG93U2F2ZVRyZWVQYW5lbCgpIHtcbiAgLy8gc2V0IHRoZSBjdXJyZW50IG1pbWVUeXBlIHdlIGFyZSBzYXZpbmdcbiAgc2F2ZU1pbWVUeXBlID0gVFJFRV9NSU1FX1RZUEU7XG5cbiAgLy8gc2V0IHRoZSBoZWFkZXIgc28gdXNlciBrbm93cyB3aGF0IHR5cGUgdGhleSBhcmUgc2F2aW5nXG4gICQoXCIjZ2RyaXZlLXNhdmUtc3ViaGVhZGVyXCIpLmh0bWwoXCI8aDU+U2F2ZSBUcmVlPC9oNT5cIik7XG5cbiAgLy8gaWYgdGhlcmUgaXMgYSBjdXJyZW50IHRyZWUsIHNob3cgdGhlIHVwZGF0ZSBwYW5lbFxuICBpZiggbG9hZGVkVHJlZSAhPSBudWxsKSB7XG4gICAgLy8gZmluZCB0aGUgY3VycmVudCB0cmVlIGJhc2VkIG9uIGlkXG4gICAgdmFyIHRyZWUgPSB7fTtcbiAgICBmb3IoIHZhciBpID0gMDsgaSA8IHRyZWVMaXN0Lmxlbmd0aDsgaSsrICkge1xuICAgICAgaWYoIHRyZWVMaXN0W2ldLmlkID09IGxvYWRlZFRyZWUpIHtcbiAgICAgICAgdHJlZSA9IHRyZWVMaXN0W2ldO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBzaG93IHRoZSB1cGRhdGUgcGFuZWxcbiAgICAkKFwiI3NhdmUtdXBkYXRlLXBhbmVsXCIpLnNob3coKTtcblxuICAgIC8vIHJlbmRlciB0cmVlIG1ldGFkYXRhIG9uIHVwZGF0ZSBwYW5lbFxuICAgIHZhciBkID0gbmV3IERhdGUodHJlZS5tb2RpZmllZERhdGUpO1xuICAgICQoXCIjc2F2ZS11cGRhdGUtcGFuZWwtaW5uZXJcIikuaHRtbChcIjxiPlwiK3RyZWUudGl0bGUrXCI8L2I+PGJyIC8+XCIgK1xuICAgICAgICBcIjxzcGFuIHN0eWxlPSdjb2xvcjojODg4Jz5cIit0cmVlLmRlc2NyaXB0aW9uK1wiPC9zcGFuPjxiciAvPlwiK1xuICAgICAgICBcIjxzcGFuIHN0eWxlPSdmb250LXN0eWxlOml0YWxpYztmb250LXNpemU6MTFweDsnPkxhc3QgTW9kaWZpZWQ6IFwiICtcbiAgICAgICAgZC50b0RhdGVTdHJpbmcoKStcIiBcIitkLnRvTG9jYWxlVGltZVN0cmluZygpK1wiIGJ5IFwiK3RyZWUubGFzdE1vZGlmeWluZ1VzZXJOYW1lK1wiPC9zcGFuPjxiciAvPlwiK1xuICAgICAgICBcIjxhIGhyZWY9J2h0dHBzOi8vZHJpdmUuZ29vZ2xlLmNvbS9maWxlL2QvXCIrdHJlZS5pZCtcIicnIHRhcmdldD0nX2JsYW5rJz48aSBjbGFzcz0naWNvbi1saW5rJz48L2k+IE9wZW4gaW4gR29vZ2xlIERyaXZlPC9hPlwiKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBkb24ndCBzaG93IHRoZSB1cGRhdGUgcGFuZWwsIHRoaXMgaXMgYSBuZXcgdHJlZVxuICAgICQoXCIjc2F2ZS11cGRhdGUtcGFuZWxcIikuaGlkZSgpO1xuICB9XG5cbiAgLy8gY2xlYXIgYW55IG1lc3NhZ2VcbiAgX3NldFNhdmVNZXNzYWdlKG51bGwpO1xuXG4gIC8vIHNob3cgdGhlIHBvcHVwXG4gICQoXCIjc2F2ZS1tb2RhbFwiKS5tb2RhbCgnc2hvdycpO1xufVxuXG4vKioqXG4gKiBMb2FkIGEgbW9kZWwgYmFzZWQgb24gcGFzc2VkIGlkLiAgVGhpcyBmdW5jdGlvbiBpcyByZWFsbHkgb25seSBmb3IgbG9hZGluZyBtb2RlbCBvbiBzdGFydCwgd2hlbiBhIGZpbGUgaWRcbiAqIGhhcyBiZWVuIHBhc3NlZCBpbiB0aGUgdXJsIGVpdGhlciBmcm9tIGdvb2dsZSBkcml2ZSBvciBmcm9tIHRoZSA/ZmlsZT1pZCB1cmwuXG4gKioqL1xudmFyIGxvZ2luTW9kYWxJbml0ID0gZmFsc2U7XG5mdW5jdGlvbiBsb2FkKGlkLCBsb2FkRm4pIHtcblxuICAvLyBpZiB3ZSBkb24ndCBoYXZlIGFuIGFjY2VzcyB0b2tlbiwgd2UgbmVlZCB0byBzaWduIGluIGZpcnN0XG4gIC8vIFRPRE86IGlmIHRoaXMgaXMgYSBwdWJsaWMgZmlsZSwgdGhlcmUgaXMgbm8gcmVhc29uIHRvIHNpZ24gaW4uLi4gc29sdXRpb24/XG4gIGlmKCAhdG9rZW4gKSB7XG5cbiAgICBpZiggIWxvZ2luTW9kYWxJbml0ICkge1xuICAgICAgJCgnI2dvb2dsZS1tb2RhbC1sb2dpbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgIC8vIHNpZ24gdGhlIHVzZXIgaW4gKGZvcmNlIG9hdXRoIHBvcHVwKVxuICAgICAgICBzaWduSW4oZnVuY3Rpb24odG9rZW4pIHtcbiAgICAgICAgICAkKCcjbG9naW4tbW9kYWwnKS5tb2RhbCgnaGlkZScpO1xuXG4gICAgICAgICAgLy8gc2V0IHRoZSB1c2VyIGluZm9ybWF0aW9uIGluIHRvcCBsZWZ0XG4gICAgICAgICAgX3NldFVzZXJJbmZvKCk7XG5cbiAgICAgICAgICBpZiggbG9hZEZuICkgbG9hZEZuKCk7XG5cbiAgICAgICAgICBnZXRGaWxlTWV0YWRhdGEoaWQsIGZ1bmN0aW9uKG1ldGFkYXRhKXtcbiAgICAgICAgICAgIGdldEZpbGUoaWQsIG1ldGFkYXRhLmRvd25sb2FkVXJsLCBmdW5jdGlvbihmaWxlKSB7XG4gICAgICAgICAgICAgIF9vbkluaXRGaWxlTG9hZGVkKG1ldGFkYXRhLGZpbGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgJCgnI2xvZ2luLW1vZGFsJykubW9kYWwoKTtcbiAgICAgIGxvZ2luTW9kYWxJbml0ID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgJCgnI2xvZ2luLW1vZGFsJykubW9kYWwoJ3Nob3cnKTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICBpZiggbG9hZEZuICkgbG9hZEZuKCk7XG5cbiAgICBnZXRGaWxlTWV0YWRhdGEoaWQsIGZ1bmN0aW9uKG1ldGFkYXRhKXtcbiAgICAgIGdldEZpbGUoaWQsIG1ldGFkYXRhLmRvd25sb2FkVXJsLCBmdW5jdGlvbihmaWxlKSB7XG4gICAgICAgIF9vbkluaXRGaWxlTG9hZGVkKG1ldGFkYXRhLGZpbGUpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cblxuLyoqKlxuICogSW5pdGlhbGl6ZSBVSSAvIG1vZGVsIHdoZW4gYSBmaWxlIGlzIGxvYWRlZCBhdCBzdGFydFxuICoqKi9cbmZ1bmN0aW9uIF9vbkluaXRGaWxlTG9hZGVkKG1ldGFkYXRhLCBmaWxlKSB7XG4gIC8vIGJhZGRuZXNzLCBsZXQgdGhlIHVzZXIga25vd1xuICBpZiggIWZpbGUgKSB7XG4gICAgaWYoIGhpZGVJbml0TG9hZGluZyApIGhpZGVJbml0TG9hZGluZygpO1xuICAgIHJldHVybiBhbGVydChcIkZhaWxlZCB0byBsb2FkIGZyb20gR29vZ2xlIERyaXZlIDovXCIpO1xuICB9XG5cbiAgLy8gbWV0YWRhdGEgZmFpbGVkIHRvIGxvYWQsIG1vcmUgYmFkbmVzc1xuICBpZiggbWV0YWRhdGEuY29kZSA9PSA0MDQgKSB7XG4gICAgaWYoIGhpZGVJbml0TG9hZGluZyApIGhpZGVJbml0TG9hZGluZygpO1xuICAgIHJldHVybiBhbGVydChcIkdvb2dsZSBEcml2ZTogXCIrbWV0YWRhdGEubWVzc2FnZSk7XG4gIH1cblxuICAvLyB3ZSBsb2FkZWQgYSBtb2RlbCwgc2V0dXAgYW5kIHJ1blxuICBpZiggbWV0YWRhdGEubWltZVR5cGUgPT0gTUlNRV9UWVBFICkge1xuICAgIC8vIHNldCB0aGUgY3VycmVudGx5IGxvYWRlZCBmaWxlIGlkXG4gICAgbG9hZGVkRmlsZSA9IG1ldGFkYXRhLmlkO1xuXG4gICAgLy8gc2hvdyB0aGUgc2hhcmUgYnRuXG4gICAgJChcIiNzaGFyZS1idG5cIikucGFyZW50KCkuc2hvdygpO1xuICAgICQoXCIjb3Blbi1pbi1kcml2ZVwiKS5hdHRyKFwiaHJlZlwiLFwiaHR0cHM6Ly9kb2NzLmdvb2dsZS5jb20vZmlsZS9kL1wiK21ldGFkYXRhLmlkKS5wYXJlbnQoKS5zaG93KCk7XG5cbiAgICAvLyBzaG93IHRpdGxlXG4gICAgJChcIiNsb2FkZWQtbW9kZWwtdGl0bGVcIikuaHRtbChcIjxzcGFuIHN0eWxlPSdjb2xvcjojMzMzJz5Mb2FkZWQgTW9kZWwgPC9zcGFuPiBcIittZXRhZGF0YS50aXRsZSk7XG5cbiAgICAvLyBzZXR1cCBtb2RlbFxuICAgIG1vZGVsSU8ubG9hZFNldHVwKG1ldGFkYXRhLmlkLCBmaWxlKTtcblxuICAgIC8vIHNldHVwIHJlYWx0aW1lIGV2ZW50c1xuICAgIGdkcml2ZVJULmluaXRSdEFwaShsb2FkZWRGaWxlKTtcbiAgfSBlbHNlIGlmICggbWV0YWRhdGEubWltZVR5cGUgPT0gVFJFRV9NSU1FX1RZUEUgKSB7IC8vIHdlIGxvYWRlZCBhIHRyZWVcbiAgICAvLyBzZXQgdGhlIGxvYWRlZCB0cmVlIGlkXG4gICAgbG9hZGVkVHJlZSA9IG1ldGFkYXRhLmlkO1xuXG4gICAgLy8gc2hvdyB0aGUgc2hhcmUgYnRuXG4gICAgJChcIiNzaGFyZS10cmVlLWJ0blwiKS5zaG93KCk7XG4gICAgJChcIiNsb2FkZWQtdHJlZS1uYW1lXCIpLmh0bWwobWV0YWRhdGEudGl0bGUpLnBhcmVudCgpLnNob3coKTtcblxuICAgIC8vIHNldCB0aGUgbG9hZGVkIHRyZWVcbiAgICBtb2RlbElPLmxvYWRUcmVlKGZpbGUpO1xuXG4gICAgLy8gaGlkZSB0aGUgbG9hZGluZyBwb3B1cFxuICAgIGlmKCBoaWRlSW5pdExvYWRpbmcgKSBoaWRlSW5pdExvYWRpbmcoKTtcbiAgfSBlbHNlIHtcbiAgICBhbGVydChcIkxvYWRlZCB1bmtub3duIGZpbGUgdHlwZSBmcm9tIEdvb2dsZSBEcml2ZTogXCIrbWV0YWRhdGEubWltZVR5cGUpO1xuICB9XG59XG5cbi8qKipcbiAqIHRva2VucyBleHBpcmUsIGV2ZXJ5IG9uY2UgaW4gYXdoaWxlIGNoZWNrIHRoZSBjdXJyZW50IHRva2VuIGhhc24ndFxuICogaWYgaXQgaGFzLCB0aGVuIHVwZGF0ZVxuICoqKi9cbmZ1bmN0aW9uIF9jaGVja1Rva2VuKCkge1xuICAvLyBpZ25vcmUgaWYgdGhlcmUgaXMgbm8gdG9rZW5cbiAgaWYgKCF0b2tlbikgcmV0dXJuO1xuXG4gIC8vIG90aGVyd2lzZSwgbG9vayB0byB1cGRhdGUgdGhlIGFjY2VzcyB0b2tlblxuICBPYXV0aC5nZXRBY2Nlc3NUb2tlbihmdW5jdGlvbih0KSB7XG4gICAgaWYoIHQgIT0gbnVsbCApIHRva2VuID0gdDtcbiAgfSk7XG59O1xuXG4vKioqXG4gKiBpcyB0aGUgY3VycmVudCB1c2VyIHNpZ25lZCBpbj9cbiAqKiovXG5mdW5jdGlvbiBjaGVja1NpZ25lZEluKGNhbGxiYWNrKSB7XG4gIC8vIGlmIGlzQXV0aGVyaXplZCByZXR1cm5zIGEgdG9rZW4sIHVzZXIgaXMgbG9nZ2VkIGluXG4gIE9hdXRoLmlzQXV0aG9yaXplZChmdW5jdGlvbih0b2tlbil7XG4gICAgaWYgKHRva2VuICE9IG51bGwpIGNhbGxiYWNrKHRydWUpO1xuICAgIGVsc2UgY2FsbGJhY2soZmFsc2UpO1xuICB9KTtcbn07XG5cbi8qKipcbiAqIFNpZ24gYSB1c2VyIGluIHVzaW5nIHRoZSBPYXV0aCBjbGFzc1xuICoqKi9cbmZ1bmN0aW9uIHNpZ25JbihjYWxsYmFjaykge1xuICBPYXV0aC5hdXRob3JpemUoZnVuY3Rpb24odCl7XG4gICAgdG9rZW4gPSB0O1xuICAgIGlmICh0b2tlbiAhPSBudWxsKSB7XG4gICAgICBpZiggdC5lcnJvciApIHJldHVybiBjYWxsYmFjayhmYWxzZSk7XG4gICAgICBjYWxsYmFjayh0cnVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2FsbGJhY2soZmFsc2UpO1xuICAgIH1cbiAgfSlcbn07XG5cbi8qKipcbiAqIEFjY2VzcyBtZXRob2QgZm9yIHRva2VuXG4gKioqL1xuZnVuY3Rpb24gZ2V0VG9rZW4oKSB7XG4gIHJldHVybiB0b2tlbjtcbn07XG5cbi8qKipcbiAqIExvYWQgdGhlIGdvb2dsZSBkcml2ZSBhcGkgY29kZVxuICoqKi9cbmZ1bmN0aW9uIF9sb2FkQXBpKGNhbGxiYWNrKSB7XG4gIGdhcGkuY2xpZW50LmxvYWQoXCJkcml2ZVwiLCBEUklWRV9BUElfVkVSU0lPTiwgZnVuY3Rpb24oKSB7XG4gICAgY2FsbGJhY2soKTtcbiAgfSk7XG59O1xuXG4vKioqXG4gKiBHZXQgYSBsaXN0IG9mIGZpbGUgbWV0YWRhdGEgZnJvbSBnb29nbGUgZHJpdmUgYmFzZWQgb24gcXVlcnlcbiAqKiovXG5mdW5jdGlvbiBsaXN0RmlsZXMocXVlcnksIGNhbGxiYWNrKSB7XG4gIGdhcGkuY2xpZW50LmRyaXZlLmZpbGVzLmxpc3Qoe1xuICAgIHEgOiBxdWVyeSArIFwiIGFuZCB0cmFzaGVkID0gZmFsc2VcIlxuICB9KS5leGVjdXRlKGZ1bmN0aW9uKHJlc3ApIHtcbiAgICBjYWxsYmFjayhyZXNwKTtcbiAgfSk7XG59O1xuXG4vKioqXG4gKiBHZXQgYSBzaW5nbGUgZmlsZXMgbWV0YWRhdGEgYmFzZWQgb24gaWRcbiAqKiovXG5mdW5jdGlvbiBnZXRGaWxlTWV0YWRhdGEoaWQsIGNhbGxiYWNrKSB7XG4gIGdhcGkuY2xpZW50LmRyaXZlLmZpbGVzLmdldCh7XG4gICAgJ2ZpbGVJZCcgOiBpZFxuICB9KS5leGVjdXRlKGZ1bmN0aW9uKHJlc3ApIHtcbiAgICBjYWxsYmFjayhyZXNwKTtcbiAgfSk7XG59O1xuXG4vKioqXG4gKiAgQWN0dWFsbHkgbG9hZCBhIGZpbGVzIGRhdGEuICBUaGUgdXJsIHRvIGRvIHRoaXMgaXMgcHJvdmlkZWQgaW4gYSBmaWxlcyBtZXRhZGF0YS5cbiAqKiovXG5mdW5jdGlvbiBnZXRGaWxlKGlkLCBkb3dubG9hZFVybCwgY2FsbGJhY2spIHtcbiAgJC5hamF4KHtcbiAgICB1cmwgOiBkb3dubG9hZFVybCxcbiAgICBiZWZvcmVTZW5kIDogZnVuY3Rpb24ocmVxdWVzdCkge1xuICAgICAgLy8gc2V0IGFjY2VzcyB0b2tlbiBpbiBoZWFkZXJcbiAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihcIkF1dGhvcml6YXRpb25cIiwgJ0JlYXJlciAnKyB0b2tlbi5hY2Nlc3NfdG9rZW4pO1xuICAgIH0sXG4gICAgc3VjY2VzcyA6IGZ1bmN0aW9uKGRhdGEsIHN0YXR1cywgeGhyKSB7XG4gICAgICAvLyBwYXJzZSB0aGUgcmVzcG9uc2UgKHdlIG9ubHkgc3RvcmUganNvbiBpbiB0aGUgZ29vZ2xlIGRyaXZlKVxuICAgICAgdHJ5IHtcbiAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICB9IGNhdGNoIChlKSB7fVxuXG4gICAgICBjYWxsYmFjayhkYXRhLCBpZCk7XG4gICAgfSxcbiAgICBlcnJvciA6IGZ1bmN0aW9uKCkge1xuICAgICAgY2FsbGJhY2soe1xuICAgICAgICBlcnJvciA6IHRydWUsXG4gICAgICAgIG1lc3NhZ2UgOiBcIkZhaWxlZCB0byBsb2FkIGZpbGUgZnJvbSBHb29nbGUgRHJpdmVcIlxuICAgICAgfSk7XG5cbiAgICB9XG4gIH0pO1xufTtcblxuLyoqKlxuICogU2F2ZSBqc29uIHRvIGdvb2dsZSBkcml2ZVxuICoqKi9cbmZ1bmN0aW9uIHNhdmVGaWxlKG5hbWUsIGRlc2NyaXB0aW9uLCBtaW1lVHlwZSwganNvbiwgY2FsbGJhY2ssIG9wdGlvbnMpIHtcbiAgaWYoICFvcHRpb25zICkgb3B0aW9ucyA9IHt9XG5cbiAgdmFyIGJvdW5kYXJ5ID0gJy0tLS0tLS0zMTQxNTkyNjUzNTg5NzkzMjM4NDYnO1xuICB2YXIgZGVsaW1pdGVyID0gXCJcXHJcXG4tLVwiICsgYm91bmRhcnkgKyBcIlxcclxcblwiO1xuICB2YXIgY2xvc2VfZGVsaW0gPSBcIlxcclxcbi0tXCIgKyBib3VuZGFyeSArIFwiLS1cIjtcblxuICB2YXIgbWV0YWRhdGEgPSB7XG4gICAgJ3RpdGxlJyA6IG5hbWUsXG4gICAgJ2Rlc2NyaXB0aW9uJyA6IGRlc2NyaXB0aW9uLFxuICAgICdtaW1lVHlwZScgOiBtaW1lVHlwZVxuICB9O1xuXG4gIC8vIGlmIHdlIHdhbnQgdG8gc2F2ZSB0aGUgZmlsZSB0byBhIHNwZWNpZmllZCBmb2xkZXJcbiAgaWYoIG9wdGlvbnMucGFyZW50ICkge1xuICAgIG1ldGFkYXRhLnBhcmVudHMgPSBbe2lkOiBvcHRpb25zLnBhcmVudH1dO1xuICB9XG5cbiAgLy8gaWYgdGhlIGpzb24gaXMgcmVhbGx5IGFuIG9iamVjdCwgdHVybiBpdCB0byBhIHN0cmluZ1xuICBpZiAodHlwZW9mIGpzb24gPT0gJ29iamVjdCcpIGpzb24gPSBKU09OLnN0cmluZ2lmeShqc29uKTtcblxuICAvLyBkYXRhIG5lZWRzIHRvIGJlIGJhc2U2NCBlbmNvZGVkIGZvciB0aGUgUE9TVFxuICB2YXIgYmFzZTY0RGF0YSA9IGJ0b2EoanNvbik7XG5cbiAgLy8gY3JlYXRlIG91ciBtdWx0aXBhcnQgUE9TVCByZXF1ZXN0XG4gIHZhciBtdWx0aXBhcnRSZXF1ZXN0Qm9keSA9IGRlbGltaXRlclxuICAgICAgKyAnQ29udGVudC1UeXBlOiBhcHBsaWNhdGlvbi9qc29uXFxyXFxuXFxyXFxuJ1xuICAgICAgKyBKU09OLnN0cmluZ2lmeShtZXRhZGF0YSk7XG5cbiAgaWYoIGpzb24ubGVuZ3RoID4gMCApIHtcbiAgICBtdWx0aXBhcnRSZXF1ZXN0Qm9keSArPSBkZWxpbWl0ZXIgKyAnQ29udGVudC1UeXBlOiAnXG4gICAgICArIG1pbWVUeXBlICsgJ1xcclxcbicgKyAnQ29udGVudC1UcmFuc2Zlci1FbmNvZGluZzogYmFzZTY0XFxyXFxuJ1xuICAgICAgKyAnXFxyXFxuJyArIGJhc2U2NERhdGE7XG4gIH1cbiAgbXVsdGlwYXJ0UmVxdWVzdEJvZHkgKz0gY2xvc2VfZGVsaW07XG5cbiAgICAgLy8gc2V0dXAgUE9TVCByZXF1ZXN0XG4gICAgIC8vIGlmIHRoZSBvcHRpb25zLmNvbnZlcj10cnVlIGZsYWcgaXMgc2V0LCBnb29nbGUgYXR0ZW1wdHMgdG8gY29udmVydCB0aGUgZmlsZSB0b1xuICAgICAvLyBhIGdvb2dsZSBkb2MgZmlsZS4gIE1vc3RseSwgd2UgdXNlIHRoaXMgZm9yIGV4cG9ydGluZyBjc3YgLT4gR29vZ2xlIFNwcmVhZHNoZWV0c1xuICB2YXIgcmVxdWVzdCA9IGdhcGkuY2xpZW50LnJlcXVlc3Qoe1xuICAgICdwYXRoJyA6ICcvdXBsb2FkL2RyaXZlL3YyL2ZpbGVzJyArICggb3B0aW9ucy5jb252ZXJ0ID8gJz9jb252ZXJ0PXRydWUnIDogJycpLFxuICAgICdtZXRob2QnIDogJ1BPU1QnLFxuICAgICdwYXJhbXMnIDoge1xuICAgICAgJ3VwbG9hZFR5cGUnIDogJ211bHRpcGFydCdcbiAgICB9LFxuICAgICdoZWFkZXJzJyA6IHtcbiAgICAgICdDb250ZW50LVR5cGUnIDogJ211bHRpcGFydC9taXhlZDsgYm91bmRhcnk9XCInICsgYm91bmRhcnkgKyAnXCInXG4gICAgfSxcbiAgICAnYm9keScgOiBtdWx0aXBhcnRSZXF1ZXN0Qm9keVxuICB9KTtcblxuICAvLyBzZW5kIHRoZSByZXF1ZXN0XG4gIHJlcXVlc3QuZXhlY3V0ZShmdW5jdGlvbihyZXNwKSB7XG4gICAgaWYgKHJlc3AuaWQpXG4gICAgICBjYWxsYmFjayhyZXNwKTtcbiAgICBlbHNlXG4gICAgICBjYWxsYmFjayh7XG4gICAgICAgIGVycm9yIDogdHJ1ZSxcbiAgICAgICAgbWVzc2FnZSA6IFwiRmFpbGVkIHRvIHNhdmVcIlxuICAgICAgfSk7XG4gIH0pO1xufTtcblxuLyoqKlxuICogVXBkYXRlIGEgZmlsZSBiYXNlZCBvbiBpZCBhbmQgZ2l2ZW4ganNvbiBkYXRhXG4gKioqL1xuZnVuY3Rpb24gdXBkYXRlRmlsZShmaWxlSWQsIGpzb24sIGNhbGxiYWNrKSB7XG4gIC8vIHN0YXJ0IGNyZWF0aW5nIHRoZSBtdWx0aXBhcnQgUE9TVCByZXF1ZXN0XG4gIHZhciBib3VuZGFyeSA9ICctLS0tLS0tMzE0MTU5MjY1MzU4OTc5MzIzODQ2JztcbiAgdmFyIGRlbGltaXRlciA9IFwiXFxyXFxuLS1cIiArIGJvdW5kYXJ5ICsgXCJcXHJcXG5cIjtcbiAgdmFyIGNsb3NlX2RlbGltID0gXCJcXHJcXG4tLVwiICsgYm91bmRhcnkgKyBcIi0tXCI7XG5cbiAgdmFyIG1ldGFkYXRhID0ge307XG5cbiAgLy8gc3RyaW5pZnkgdGhlbiBiYXNlNjQgZW5jb2RlIHRoZW4gb2JqZWN0XG4gICAgdmFyIGJhc2U2NERhdGEgPSBidG9hKEpTT04uc3RyaW5naWZ5KGpzb24pKTtcblxuICAgIC8vIHNldCB1cCB0aGUgUE9TVCBib2R5XG4gICAgdmFyIG11bHRpcGFydFJlcXVlc3RCb2R5ID1cbiAgICAgIGRlbGltaXRlciArXG4gICAgICAgICdDb250ZW50LVR5cGU6IGFwcGxpY2F0aW9uL2pzb25cXHJcXG5cXHJcXG4nICtcbiAgICAgICAgSlNPTi5zdHJpbmdpZnkobWV0YWRhdGEpICtcbiAgICAgICAgZGVsaW1pdGVyICtcbiAgICAgICAgJ0NvbnRlbnQtVHlwZTogJyArIE1JTUVfVFlQRSArICdcXHJcXG4nICtcbiAgICAgICAgJ0NvbnRlbnQtVHJhbnNmZXItRW5jb2Rpbmc6IGJhc2U2NFxcclxcbicgK1xuICAgICAgICAnXFxyXFxuJyArXG4gICAgICAgIGJhc2U2NERhdGEgK1xuICAgICAgICBjbG9zZV9kZWxpbTtcblxuICAvLyBzZXR1cCBQT1NUIHJlcXVlc3RcbiAgICB2YXIgcmVxdWVzdCA9IGdhcGkuY2xpZW50LnJlcXVlc3Qoe1xuICAgICAgICAncGF0aCc6ICcvdXBsb2FkL2RyaXZlL3YyL2ZpbGVzLycrZmlsZUlkLFxuICAgICAgICAnbWV0aG9kJzogJ1BVVCcsXG4gICAgICAgICdwYXJhbXMnOiB7J3VwbG9hZFR5cGUnOiAnbXVsdGlwYXJ0J30sXG4gICAgICAgICdoZWFkZXJzJzoge1xuICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnbXVsdGlwYXJ0L21peGVkOyBib3VuZGFyeT1cIicgKyBib3VuZGFyeSArICdcIidcbiAgICAgICAgfSxcbiAgICAgICAgJ2JvZHknOiBtdWx0aXBhcnRSZXF1ZXN0Qm9keX0pO1xuXG4gICAgLy8gc2V0IHJlcXVlc3RcbiAgICByZXF1ZXN0LmV4ZWN1dGUoZnVuY3Rpb24ocmVzcCl7XG4gICAgICBpZiggcmVzcC5pZCApIHtcbiAgICAgICAgY2FsbGJhY2socmVzcCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjYWxsYmFjayh7XG4gICAgICAgIGVycm9yIDogdHJ1ZSxcbiAgICAgICAgbWVzc2FnZSA6IFwiRmFpbGVkIHRvIHVwZGF0ZVwiXG4gICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gcnVuTW9kZWxSdCgpIHtcbiAgaWYoIG9mZmxpbmVNb2RlICkgcmV0dXJuO1xuICBnYSgnc2VuZCcsICdldmVudCcsICd1aScsICdpbnRlcmFjdGlvbicsICdydW4tbW9kZWwtcmVtb3RlJywgMSk7XG4gIGdkcml2ZVJULnJ1bk1vZGVsUnQoKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGluaXQgOiBpbml0LFxuICBjaGVja1NpZ25lZEluIDogY2hlY2tTaWduZWRJbixcbiAgc2lnbkluIDogc2lnbkluLFxuICBnZXRUb2tlbiA6IGdldFRva2VuLFxuICBsaXN0RmlsZXMgOiBsaXN0RmlsZXMsXG4gIGdldEZpbGVNZXRhZGF0YSA6IGdldEZpbGVNZXRhZGF0YSxcbiAgbG9hZCA6IGxvYWQsXG4gIHNhdmVGaWxlOiBzYXZlRmlsZSxcbiAgc2hvd0xvYWRUcmVlUGFuZWwgOiBzaG93TG9hZFRyZWVQYW5lbCxcbiAgc2hvd1NhdmVUcmVlUGFuZWwgOiBzaG93U2F2ZVRyZWVQYW5lbCxcbiAgcnVuTW9kZWxSdCA6IHJ1bk1vZGVsUnQsXG4gIHNldEFwcCA6IHNldEFwcCxcblxuICBNSU1FX1RZUEUgOiBNSU1FX1RZUEVcbn07XG4iLCIvLyBSRUFMVElNRSAocnQpIE9iamVjdHNcbi8vIHJ0IGpzb24gZmllbGQsIHVzZWQgdG8gc2VuZCB1cGRhdGVzIHRvIHBlZXJzXG52YXIgcnRKc29uID0gbnVsbDtcbi8vIHJ0IGRvY3VtZW50XG52YXIgcnREb2MgPSBudWxsO1xuLy8gaGFzIHRoZSBydCBhcGkgYmVlbiBsb2FkZWQ/XG52YXIgX3J0TG9hZGVkID0gZmFsc2U7XG4vLyB0aW1lciB0byBidWZmZXIgdGhlIGZpcmluZyBvZiB1cGRhdGVzIGZyb20gcnQgZXZlbnRzXG52YXIgX3J0VGltZXIgPSAtMTtcblxuLy8gbGlzdCBvZiBjdXJyZW50IHJ0IGVkaXRzIHRvIGlucHV0IGZpbGVzXG52YXIgcnRFZGl0cyA9IHt9O1xuLy8gZ29vZ2xlIGRyaXZlIHJ0IG1vZGVsIC0gbWFwXG52YXIgbGl2ZUVkaXRzID0gbnVsbDtcbi8vIGxvY2FsIGxvY2sgb24gYW4gZWxlbWVudFxudmFyIGxvY2sgPSB7fTtcblxudmFyIGFwcDtcblxuLy8gbG9hZGVkIGZpbGUgaWRcbnZhciBsb2FkZWRGaWxlO1xuXG4vKioqXG4gKiBTZXR1cCB0aGUgcnQgYXBpIGZvciB0aGUgY3VycmVudCBmaWxlLiAgVGhpcyB3aWxsIGFjdHVhbGx5IGxvYWQgdGhlIGFwaSBpZiBuZWVkZWRcbiAqKiovXG5mdW5jdGlvbiBpbml0UnRBcGkoZmlsZSkge1xuICBydEpzb24gPSBudWxsOyAvLyBraWxsIG9mZiBhbnkgb2xkIGxpc3RuZXJzXG4gIGxvYWRlZEZpbGUgPSBmaWxlO1xuXG4gIC8vIGNsb3NlIGFueSBvbGQgY29ubmVjdGlvblxuICBpZiggcnREb2MgKSBydERvYy5jbG9zZSgpO1xuXG4gIC8vIGdldCBvdXQgb2YgaGVyZSBpZiB3ZSBkb24ndCBoYXZlIGEgbG9hZGVkIGZpbGVcbiAgaWYoIGxvYWRlZEZpbGUgPT0gbnVsbCApIHJldHVybjtcblxuICAvLyBsb2FkIGFwaSBpZiBuZWVkZWRcbiAgaWYoICFfcnRMb2FkZWQgKSB7XG4gICAgZ2FwaS5sb2FkKCdkcml2ZS1yZWFsdGltZScsIGZ1bmN0aW9uKCl7XG4gICAgICAvLyBzZXR1cCBydCBob29rc1xuICAgICAgX3J0TG9hZGVkID0gdHJ1ZTtcbiAgICAgIF9sb2FkUnRGaWxlKCk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgLy8gc2V0dXAgcnQgaG9va3NcbiAgICBfbG9hZFJ0RmlsZSgpO1xuICB9XG5cbiAgLy8gc2V0dXAgaW5wdXQgaGFuZGxlcnNcbiAgJCgnI2lucHV0cyBpbnB1dCcpLm9uKCdmb2N1cycsZnVuY3Rpb24oZSl7XG4gICAgdmFyIGVsZSA9ICQoZS50YXJnZXQpO1xuICAgIF9zZXRMb2NhbExvY2soe1xuICAgICAgaWQgICAgICAgIDogZWxlLmF0dHIoXCJpZFwiKSxcbiAgICAgIHZhbHVlICAgICA6IGVsZS52YWwoKSxcbiAgICAgIHRpbWVzdGFtcCA6IG5ldyBEYXRlKCkuZ2V0VGltZSgpLFxuICAgICAgdXNlciAgICAgIDogd2luZG93LnVzZXJpbmZvID8gd2luZG93LnVzZXJpbmZvLm5hbWUgOiBcInVua25vd25cIlxuICAgIH0pO1xuICB9KTtcbiAgJCgnI2lucHV0cyBpbnB1dCcpLm9uKCdibHVyJyxmdW5jdGlvbihlKXtcbiAgICBfcmVtb3ZlTG9jYWxMb2NrKCQoZS50YXJnZXQpLmF0dHIoXCJpZFwiKSk7XG4gIH0pO1xuICAkKCcjaW5wdXRzIGlucHV0Jykub24oJ2tleXVwJyxmdW5jdGlvbihlKXtcbiAgICBpZiggZS53aGljaCA9PSAxMyApIHJldHVybjtcbiAgICB2YXIgZWxlID0gJChlLnRhcmdldCk7XG4gICAgX3VwZGF0ZUxvY2FsTG9jayhlbGUuYXR0cihcImlkXCIpLCBlbGUudmFsKCkpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gX3NldExvY2FsTG9jayhsb2NrKSB7XG4gIC8vIFRPRE86IHRoaXMgc2hvdWxkIG1hcmsgdGhlIGN1cnJlbnQgbG9ja1xuICBpZiggbGl2ZUVkaXRzLmhhc1tsb2NrLmlkXSApIHJldHVybjtcbiAgbGl2ZUVkaXRzLnNldChsb2NrLmlkLCBsb2NrKTtcbn1cblxuZnVuY3Rpb24gX3VwZGF0ZUxvY2FsTG9jayhpZCwgdmFsKSB7XG4gIHZhciBsb2NrID0ge1xuICAgIGlkIDogaWQsXG4gICAgdmFsdWUgOiB2YWwsXG4gICAgdGltZXN0YW1wIDogbmV3IERhdGUoKS5nZXRUaW1lKCksXG4gICAgdXNlciAgICAgIDogd2luZG93LnVzZXJpbmZvID8gd2luZG93LnVzZXJpbmZvLm5hbWUgOiBcInVua25vd25cIlxuICB9XG5cbiAgbGl2ZUVkaXRzLnNldChpZCwgbG9jayk7XG59XG5cbmZ1bmN0aW9uIF9yZW1vdmVMb2NhbExvY2soaWQpIHtcbiAgbGl2ZUVkaXRzLmRlbGV0ZShpZCk7XG59XG5cbmZ1bmN0aW9uIF9yZW1vdmVSZW1vdGVMb2NrKGxvY2spIHtcbiAgJChcIiNcIitsb2NrLmlkKS5yZW1vdmVBdHRyKFwiZGlzYWJsZWRcIik7XG4gICQoXCIjXCIrbG9jay5pZCtcIi1lZGl0aW5nXCIpLnJlbW92ZSgpO1xuICBkZWxldGUgcnRFZGl0c1tsb2NrLmlkXTtcbn1cblxuZnVuY3Rpb24gX3VwZGF0ZUxvY2sobG9jaykge1xuICAkKFwiI1wiK2xvY2suaWQpLnZhbChsb2NrLnZhbHVlKS5hdHRyKFwiZGlzYWJsZWRcIixcImRpc2FibGVkXCIpO1xuICBpZiggJChcIiNcIitsb2NrLmlkK1wiLWVkaXRpbmdcIikubGVuZ3RoID09IDAgKSB7XG4gICAgJChcIiNcIitsb2NrLmlkKS5wYXJlbnQoKS5hZnRlcihcIjxzcGFuIGlkPSdcIitsb2NrLmlkK1wiLWVkaXRpbmcnIGNsYXNzPSdsYWJlbCBsYWJlbC13YXJuaW5nJz48L3NwYW4+XCIpO1xuICB9XG4gICQoXCIjXCIrbG9jay5pZCtcIi1lZGl0aW5nXCIpLmh0bWwobG9jay51c2VyKTtcbiAgcnRFZGl0c1tsb2NrLmlkXSA9IGxvY2s7XG59XG5cbi8qKipcbiAqIFVwZGF0ZSB0aGUgbGlzdCBvZiByZWFsdGltZSBlZGl0cyBhcyB3ZWxsIGFzIHRoZSBpbnB1dCBVSSBiYXNlZCBvbiB0aGUgcnREb2MgZXZlbnRcbiAqIFRPRE86IHRoaXMgaXMgYSBiaXQgbmFzdHkgcmlnaHQgbm93XG4gKiovXG5mdW5jdGlvbiBfdXBkYXRlUnRFZGl0cyhlKSB7XG4gIGlmKCBlLmlzTG9jYWwgKSByZXR1cm47XG5cbiAgdmFyIGtleXMgPSBsaXZlRWRpdHMua2V5cygpO1xuXG4gIC8vIHJlbW92ZSBvbGQgdGltZXN0YW1wcyBUT0RPXG4gIC8qZm9yKCB2YXIgaSA9IDA7IGkgPCB2YWx1ZXMubGVuZ3RoOyBpKysgKSB7XG4gICAgaWYoIG5vdyAtIHZhbHVlc1tpXS50aW1lc3RhbXAgPiAxMDAwICogNjAgKSB7XG4gICAgICBfcmVtb3ZlTG9jayh2YWx1ZXNbaV0pOyAvLyBkb2VzIHRoaXMgZmlyZSB1cGRhdGVzP1xuICAgIH1cbiAgfSovXG5cblxuICAvLyBzZXQgbmV3IGVkaXRzXG4gIGZvciggdmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKyApIHtcbiAgICBfdXBkYXRlTG9jayhsaXZlRWRpdHMuZ2V0KGtleXNbaV0pKTtcbiAgfVxuXG4gIC8vIHJlbW92ZSBvbGQgZWRpdHNcbiAgZm9yKCB2YXIga2V5IGluIHJ0RWRpdHMgKSB7XG4gICAgaWYoIGtleXMuaW5kZXhPZihrZXkpID09IC0xICkge1xuICAgICAgX3JlbW92ZVJlbW90ZUxvY2socnRFZGl0c1trZXldKTtcbiAgICB9XG4gIH1cbn1cblxuLyoqKlxuICogIFNldHVwIHRoZSBydCBob29rcyBmb3IgdGhlIGN1cnJlbnQgZmlsZS4gIFRoZSBhcGkgbmVlZHMgdG8gYWxyZWFkeSBiZSBsb2FkZWRcbiAqKiovXG5mdW5jdGlvbiBfbG9hZFJ0RmlsZSgpIHtcbiAgLy8gZ2V0IHRoZSBydCBkb2NcbiAgZ2FwaS5kcml2ZS5yZWFsdGltZS5sb2FkKGxvYWRlZEZpbGUsXG4gICAgLy8gcnQgZG9jIGxvYWRlZFxuICAgIGZ1bmN0aW9uKGZpbGUpe1xuICAgICAgcnREb2MgPSBmaWxlO1xuXG4gICAgICAvLyBnZXQgb3VyIHJ0IGF0dHJpYnV0ZS4gIFRyaWdnZXJpbmcgY2hhbmdlcyBvbiBydEpzb24gd2lsbCBwdXNoIGV2ZW50c1xuICAgICAgLy8gdG8gYWxsIGxpc3RlbmluZyBjbGllbnRzXG4gICAgICB2YXIganNvbiA9IGZpbGUuZ2V0TW9kZWwoKS5nZXRSb290KCkuZ2V0KFwianNvblwiKTtcbiAgICAgIGxpdmVFZGl0cyA9IGZpbGUuZ2V0TW9kZWwoKS5nZXRSb290KCkuZ2V0KFwibGl2ZUVkaXRzXCIpO1xuXG4gICAgICAvLyBpZiB0aGVyZSBpcyBubyBqc29uIGF0dHIsIHdlIG5lZWQgdG8gaW5pdGlhbGl6ZSB0aGUgbW9kZWxcbiAgICAgIGlmKCBqc29uID09IG51bGwgfHwgbGl2ZUVkaXRzID09IG51bGwpIHtcbiAgICAgICAgLy8gaW5pdGlhbGl6ZSBvdXIgcnQgbW9kZWxcbiAgICAgICAgX29uUnRNb2RlbExvYWQoZmlsZS5nZXRNb2RlbCgpKTtcbiAgICAgICAgLy8gZ3JhYiBydCBqc29uIGF0dHIgbm93IHRoYXQgd2UgYXJlIGluaXRpYWxpemVkXG4gICAgICAgIGpzb24gPSBmaWxlLmdldE1vZGVsKCkuZ2V0Um9vdCgpLmdldChcImpzb25cIik7XG4gICAgICAgIGxpdmVFZGl0cyA9IGZpbGUuZ2V0TW9kZWwoKS5nZXRSb290KCkuZ2V0KFwibGl2ZUVkaXRzXCIpO1xuICAgICAgfVxuXG4gICAgICAvLyBiYWRuZXNzIGhhcHBlbmVkIDooXG4gICAgICBpZiggIWpzb24gKSByZXR1cm4gY29uc29sZS5sb2coXCJGYWlsZWQgdG8gY29ubmVjdCB0byBydCBqc29uXCIpO1xuICAgICAgLy8gc2V0IHRoYXQgYXR0ciBnbG9iYWwgdG8gY2xhc3NcbiAgICAgIHJ0SnNvbiA9IGpzb247XG5cbiAgICAgIC8vIGdldCBjdXJyZW50IGxpc3Qgb2YgdXNlcnNcbiAgICAgIHZhciB1c2VycyA9IGZpbGUuZ2V0Q29sbGFib3JhdG9ycygpO1xuXG4gICAgICAvLyBhZGQgZXZlbnQgbGlzdGVuZXJzIGZvciB3aGVuIHBlb3BsZSBjb21lIGFuZCBnb1xuICAgICAgZmlsZS5hZGRFdmVudExpc3RlbmVyKGdhcGkuZHJpdmUucmVhbHRpbWUuRXZlbnRUeXBlLkNPTExBQk9SQVRPUl9KT0lORUQsIGZ1bmN0aW9uKGUpe1xuICAgICAgICB1c2VycyA9IGZpbGUuZ2V0Q29sbGFib3JhdG9ycygpO1xuICAgICAgICBfdXBkYXRlQWN0aXZlVXNlcnModXNlcnMpO1xuICAgICAgfSk7XG4gICAgICBmaWxlLmFkZEV2ZW50TGlzdGVuZXIoZ2FwaS5kcml2ZS5yZWFsdGltZS5FdmVudFR5cGUuQ09MTEFCT1JBVE9SX0xFRlQsIGZ1bmN0aW9uKGUpe1xuICAgICAgICB1c2VycyA9IGZpbGUuZ2V0Q29sbGFib3JhdG9ycygpO1xuICAgICAgICBfdXBkYXRlQWN0aXZlVXNlcnModXNlcnMpO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIGFkZCBldmVudCBsaXN0ZW5lcnMgZm9yIHRoZSBydEpzb24gb2JqZWN0XG4gICAgICAvLyB3aGVuIHRoaXMgdXBkYXRlcywgd2Ugd2FudCB0byByZS1ydW4gdGhlIG1vZGVsXG4gICAgICBqc29uLmFkZEV2ZW50TGlzdGVuZXIoZ2FwaS5kcml2ZS5yZWFsdGltZS5FdmVudFR5cGUuVEVYVF9JTlNFUlRFRCwgZnVuY3Rpb24oZSl7XG4gICAgICAgIGlmKCBlLmlzTG9jYWwgKSByZXR1cm47XG4gICAgICAgIF9yZXJ1blJ0KHVzZXJzLCBlLnVzZXJJZCk7XG4gICAgICAgIH0pO1xuICAgICAgICBqc29uLmFkZEV2ZW50TGlzdGVuZXIoZ2FwaS5kcml2ZS5yZWFsdGltZS5FdmVudFR5cGUuVEVYVF9ERUxFVEVELCBmdW5jdGlvbihlKXtcbiAgICAgICAgICBpZiggZS5pc0xvY2FsICkgcmV0dXJuO1xuICAgICAgICAgIF9yZXJ1blJ0KHVzZXJzLCBlLnVzZXJJZCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGxpdmUgZWRpdCB1cGRhdGVzXG4gICAgICAgICAgICAgIGxpdmVFZGl0cy5hZGRFdmVudExpc3RlbmVyKGdhcGkuZHJpdmUucmVhbHRpbWUuRXZlbnRUeXBlLlZBTFVFX0NIQU5HRUQsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgICAgICAgIF91cGRhdGVSdEVkaXRzKGUpO1xuICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAvLyBzaG93IHdobyBpcyBsaXN0ZW5pbmdcbiAgICAgICAgX3VwZGF0ZUFjdGl2ZVVzZXJzKHVzZXJzKTtcblxuICAgICAgICAvLyBzZXQgaW5wdXQgaGFuZGxlcnMgZm9yIHJ0IGV2ZW50c1xuICAgIH0sXG4gICAgLy8gbW9kZWwgbG9hZGVkXG4gICAgZnVuY3Rpb24obW9kZWwpe1xuICAgICAgX29uUnRNb2RlbExvYWQobW9kZWwpO1xuICAgIH0sXG4gICAgLy8gZXJyb3JzXG4gICAgZnVuY3Rpb24oZXJyKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIlJUIEVSUk9SUzogXCIpO1xuICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICB9XG4gICk7XG59XG5cblxuLyoqKlxuICogVXBkYXRlIHRoZSBkaXNwbGF5IG9mIGFjdGl2ZSB1c2VycyBmb3IgdGhlIG1vZGVsLlxuICoqKi9cbmZ1bmN0aW9uIF91cGRhdGVBY3RpdmVVc2Vycyh1c2Vycykge1xuICAvLyBpZiBpdCdzIGp1c3QgdXMsIGRvbid0IHNob3cgYW55dGhpbmdcbiAgaWYoICF1c2VycyApIHJldHVybiAkKFwiI2FjdGl2ZS11c2Vyc1wiKS5odG1sKFwiXCIpO1xuICBpZiggdXNlcnMubGVuZ3RoIDw9IDEgKSByZXR1cm4gJChcIiNhY3RpdmUtdXNlcnNcIikuaHRtbChcIlwiKTtcblxuICAvLyB3ZSBvbmx5IHdhbnQgdW5pcXVlIHVzZXJzXG4gIHZhciB1bmlxdWUgPSBbXTtcbiAgdmFyIHV1c2VycyA9IFtdO1xuICBmb3IoIHZhciBpID0gMDsgaSA8IHVzZXJzLmxlbmd0aDsgaSsrICkge1xuICAgIGlmKCB1bmlxdWUuaW5kZXhPZih1c2Vyc1tpXS51c2VySWQpID09IC0xICkge1xuICAgICAgdW5pcXVlLnB1c2godXNlcnNbaV0udXNlcklkKTtcbiAgICAgIHV1c2Vycy5wdXNoKHVzZXJzW2ldKTtcbiAgICB9XG4gIH1cbiAgaWYoIHV1c2Vycy5sZW5ndGggPD0gMSApIHJldHVybiAkKFwiI2FjdGl2ZS11c2Vyc1wiKS5odG1sKFwiXCIpO1xuXG4gIC8vIGFkZCBwaWMgb2YgdXNlciB0byBkaXNwbGF5IHBhbmVsXG4gIHZhciBodG1sID0gXCJBY3RpdmUgVXNlcnMgXCI7XG4gIGZvciggdmFyIGkgPSAwOyBpIDwgdXVzZXJzLmxlbmd0aDsgaSsrICkge1xuICAgIGlmKCB1dXNlcnNbaV0ucGhvdG9VcmwgKSB7XG4gICAgICBodG1sICs9IFwiPGltZyBzcmM9J1wiK3V1c2Vyc1tpXS5waG90b1VybCtcIicgdGl0bGU9J1wiK3V1c2Vyc1tpXS5kaXNwbGF5TmFtZStcIicgc3R5bGU9J21hcmdpbjowIDVweDt3aWR0aDozMnB4O2hlaWdodDozMnB4JyBjbGFzcz0naW1nLXJvdW5kZWQnIC8+IFwiO1xuICAgIH0gZWxzZSB7XG4gICAgICBodG1sICs9IFwiPHNwYW4gc3R5bGU9J3dpZHRoOjMycHg7aGVpZ2h0OjMycHg7bWFyZ2luOjAgNXB4O2JhY2tncm91bmQtY29sb3I6XCIrdXVzZXJzW2ldLmNvbG9yK1wiJyB0aXRsZT0nXCIrdXVzZXJzW2ldLmRpc3BsYXlOYW1lK1wiJyA+PC9zcGFuPiBcIjtcbiAgICB9XG4gIH1cbiAgJChcIiNhY3RpdmUtdXNlcnNcIikuaHRtbChodG1sKTtcbn1cblxuLyoqKlxuICAgKiAgUmUtcnVuIHRoZSBtb2RlbC4gIEV2ZW50cyBjYW4gY29tZSBpbiBxdWlja2x5IGluIG1hbnkgcGFydHMuICBCdWZmZXIgdGhlIGV2ZW50cyBzbyB3ZSBkb24ndCByZS1ydW4gdGhlIG1vZGVsIHRvbyBtYW55IHRpbWVzLlxuICAgKioqL1xuZnVuY3Rpb24gX3JlcnVuUnQodXNlcnMsIHVzZXJJZCkge1xuICAvLyB0aGlzIGlzIGJhZG5lc3NcbiAgaWYoICFydEpzb24gKSByZXR1cm47XG5cbiAgLy8gY2xlYXIgYW55IHF1ZXVlZCBydW5cbiAgaWYoIF9ydFRpbWVyICE9IC0xICkgY2xlYXJUaW1lb3V0KF9ydFRpbWVyKTtcblxuICAvLyBxdWV1ZSB1cCBhIHJ1biBhbmQgd2FpdCB0byBtYWtlIHN1cmUgdGhlcmUgYXJlIG5vIHVwZGF0ZXNcbiAgX3J0VGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgX3J0VGltZXIgPSAtMTtcblxuICAgIC8vIGZpbmQgdGhlIHVzZXIgd2hvIGlzIHJ1bm5pbmcgdGhlIG1vZGVsIGFuZCBkaXBsYXkgcG9wdXAgb2YgdGhhdCB1c2VycyBpbmZvcm1hdGlvblxuICAgIGZvciggdmFyIGkgPSAwOyBpIDwgdXNlcnMubGVuZ3RoOyBpKysgKSB7XG4gICAgICBpZiggdXNlcnNbaV0udXNlcklkID09IHVzZXJJZCApIHtcbiAgICAgICAgdmFyIHBhbmVsID0gJChcIjxkaXYgY2xhc3M9J2luaXQtbG9hZGluZy1vdXRlcicgPjxkaXYgY2xhc3M9J2luaXQtbG9hZGluZycgc3R5bGU9J3dpZHRoOjQwMHB4Jz4gXCIrXG4gICAgICAgICAgICAgICAgKHVzZXJzW2ldLnBob3RvVXJsID8gXCI8aW1nIHNyYz0nXCIrdXNlcnNbaV0ucGhvdG9VcmwrXCInIC8+IFwiIDogXCJcIikrdXNlcnNbaV0uZGlzcGxheU5hbWUrXCIgaXMgdXBkYXRpbmcgdGhlIG1vZGVsLi4uPC9kaXY+PC9kaXY+XCIpO1xuICAgICAgICAgICAgJChcImJvZHlcIikuYXBwZW5kKHBhbmVsKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBwYW5lbC5jc3MoXCJvcGFjaXR5XCIsXCIuOVwiKTtcbiAgICAgICAgICAgIH0sNTApO1xuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHBhbmVsLnJlbW92ZSgpO1xuICAgICAgICAgICAgfSwgMzUwMCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBwYXJzZSB0aGUgbmV3IG1vZGVsIGRhdGEgYW5kIGxvYWQgaXQgYXMgb3VyIGN1cnJlbnQgc2V0dXBcbiAgICB2YXIgZGF0YSA9IEpTT04ucGFyc2UocnRKc29uLmdldFRleHQoKSk7XG4gICAgYXBwLmdldE1vZGVsSU8oKS5sb2FkU2V0dXAobG9hZGVkRmlsZSwgZGF0YSwgdHJ1ZSk7XG4gIH0sIDMwMCk7XG59XG5cbi8qKipcbiAqIGluaXRpYWxpemUgYSBuZXcgcnQgbW9kZWxcbiAqKiovXG5mdW5jdGlvbiBfb25SdE1vZGVsTG9hZChtb2RlbCkge1xuICAvLyBjdXJyZW50bHkgd2UganVzdCB3YW50IHRvIHVzZSB0aGlzIHNpbmdsZSBhdHRyaWJ1dGUgdG8gYnJvYWRjYXN0IGV2ZW50c1xuICB2YXIganNvbiA9IG1vZGVsLmdldFJvb3QoKS5nZXQoXCJqc29uXCIpO1xuICBpZigganNvbiA9PSBudWxsICkge1xuICAgIHZhciBzdHJpbmcgPSBtb2RlbC5jcmVhdGVTdHJpbmcoXCJ7fVwiKTtcbiAgICBtb2RlbC5nZXRSb290KCkuc2V0KFwianNvblwiLCBzdHJpbmcpO1xuICB9XG5cbiAgdmFyIGxpdmVFZGl0cyA9IG1vZGVsLmdldFJvb3QoKS5nZXQoXCJsaXZlRWRpdHNcIik7XG4gIGlmKCBsaXZlRWRpdHMgPT0gbnVsbCApIHtcbiAgICB2YXIgZmllbGQgPSBtb2RlbC5jcmVhdGVNYXAoKTtcbiAgICBtb2RlbC5nZXRSb290KCkuc2V0KFwibGl2ZUVkaXRzXCIsIGZpZWxkKTtcbiAgfVxuXG59XG5cbi8qKipcbiAqIGxldCB0aGUgd29ybGQga25vdyB3aGF0IHdlIGFyZSBkb2luZyA6KVxuICogVGhpcyBzaG91bGQgYmUgY2FsbGVkIHdoZW4gYSBsb2NhbCB1c2VyIHJ1bnMgdGhlIG1vZGVsLiAgSXQgdXBkYXRlcyB0aGUgJ2pzb24nXG4gKiBhdHRyaWJ1dGUgd2hpY2ggaXMgdGhlbiBicm9hZGNhc3QgdG8gYWxsIGxpc3RlbmluZyBwYXJ0aWVzXG4gKioqL1xuZnVuY3Rpb24gcnVuTW9kZWxSdCgpIHtcbiAgaWYoIHJ0SnNvbiApIHJ0SnNvbi5zZXRUZXh0KEpTT04uc3RyaW5naWZ5KCBhcHAuZ2V0TW9kZWxJTygpLmV4cG9ydFNldHVwKCkgKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBydW5Nb2RlbFJ0IDogcnVuTW9kZWxSdCxcbiAgaW5pdFJ0QXBpICA6IGluaXRSdEFwaSxcbiAgc2V0QXBwIDogZnVuY3Rpb24oYXBwbGljYXRpb24pIHtcbiAgICBhcHAgPSBhcHBsaWNhdGlvbjtcbiAgfVxufTtcbiIsInZhciBvZmZsaW5lID0gcmVxdWlyZSgnLi9vZmZsaW5lJyk7XG52YXIgZ2RyaXZlID0gcmVxdWlyZSgnLi9nb29nbGVEcml2ZScpO1xudmFyIGNoYXJ0cyA9IHJlcXVpcmUoJy4vY2hhcnRzJyk7XG52YXIgd2VhdGhlckNoYXJ0ID0gcmVxdWlyZSgnLi93ZWF0aGVyL2NoYXJ0Jyk7XG52YXIgd2VhdGhlckZpbGVSZWFkZXIgPSByZXF1aXJlKCcuL3dlYXRoZXIvZmlsZVJlYWRlcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGFwcCkge1xuXG52YXIgd2VhdGhlckF2ZXJhZ2VDaGFydCA9IG51bGw7XG52YXIgd2VhdGhlckF2ZXJhZ2VDaGFydERhdGEgPSB7fTtcblxudmFyIFNFVFVQX1RFTVBMQVRFID1cbiAgJzxkaXY+JytcbiAgJzxoND5DaGFydCBPcHRpb25zPC9oND4nK1xuICAnPGRpdj4nK1xuICAgICAgJzx0YWJsZSBjbGFzcz1cInRhYmxlXCI+JytcbiAgICAgICAgICAnPHRyPicrXG4gICAgICAgICAgICAgICc8dGQgc3R5bGU9XCJ3aWR0aDo1MCVcIj5PdXRwdXQgdmFyaWFibGUocykgdG8gY2hhcnQgPC90ZD4nK1xuICAgICAgICAgICAgICAnPHRkPiA8YSBpZD1cInNlbGVjdC1jaGFydHMtYnRuXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIj5TZWxlY3QgQ2hhcnRzPC9hPjwvdGQ+JytcbiAgICAgICAgICAnPC90cj4nK1xuICAgICAgICAgICc8dHI+JytcbiAgICAgICAgICAgICAgJzx0ZCBzdHlsZT1cIndpZHRoOjUwJVwiPlZhcmlhdGlvbiBhbmFseXNpcyBwYXJhbWV0ZXIocykgPC90ZD4nK1xuICAgICAgICAgICAgICAnPHRkPjxkaXYgaWQ9XCJ2YXJpYXRpb25BbmFseXNpc1N0YXR1c1wiPk5vbmU8L2Rpdj48L3RkPicrXG4gICAgICAgICAgJzwvdHI+JytcbiAgICAgICc8L3RhYmxlPicrXG4gICc8L2Rpdj4nK1xuICAnPGg0PlRpbWUgU3RlcDwvaDQ+JytcbiAgICc8ZGl2IHN0eWxlPVwiYm9yZGVyLXRvcDoxcHggc29saWQgI2RkZDtwYWRkaW5nOjhweDtoZWlnaHQ6NjBweFwiPicrXG4gICAgICc8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPicrXG4gICAgICAgJzxsYWJlbCBmb3I9XCJpbnB1dC1zZXR1cC1kYXlzX2luX2ludGVydmFsXCIgY2xhc3M9XCJjb2wtbGctNCBjb250cm9sLWxhYmVsXCI+RGF5cyBpbiBJbnRlcnZhbDwvbGFiZWw+JytcbiAgICAgICAnPGRpdiBjbGFzcz1cImNvbC1sZy04XCI+JytcbiAgICAgICAgICc8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cImlucHV0LXNldHVwLWRheXNfaW5faW50ZXJ2YWxcIiAgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiB2YWx1ZT1cIjFcIi8+JytcbiAgICAgICAgICc8cCBjbGFzcz1cImhlbHAtYmxvY2tcIj5Ib3cgbWFueSBkYXlzIGFyZSBpbiBlYWNoIHN0ZXAgb2YgdGhlIG1vZGVsPC9wPicgK1xuICAgICAgICc8L2Rpdj4nK1xuICAgICAnPC9kaXY+JytcbiAgICc8L2Rpdj4nK1xuICAgJzxoND5Mb2NhdGlvbjwvaDQ+JytcbiAgICc8ZGl2IHN0eWxlPVwiYm9yZGVyLXRvcDoxcHggc29saWQgI2RkZDtwYWRkaW5nOjhweDtoZWlnaHQ6NjBweFwiPicrXG4gICAgICc8c3BhbiBpZD1cImN1cnJlbnQtbG9jYXRpb25cIiBzdHlsZT1cImNvbG9yOiM4ODhcIj48L3NwYW4+JytcbiAgICAgJzxhIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IHB1bGwtcmlnaHQgc2VsZWN0LXdlYXRoZXItbG9jYXRpb25cIj48aSBjbGFzcz1cImljb24tbWFwLW1hcmtlclwiPjwvaT4gU2VsZWN0IExvY2F0aW9uPC9hPicrXG4gICAgJzwvZGl2PicrXG4gICc8L2Rpdj4nO1xuXG52YXIgR09PTEVEUklWRV9UUkVFX1RFTVBMQVRFID1cbiAgJzxkaXYgc3R5bGU9XCJwYWRkaW5nOjE1cHggMCA1cHggMDttYXJnaW4tYm90dG9tOjVweDtoZWlnaHQ6IDUwcHhcIj4nK1xuICAgICc8ZGl2IGNsYXNzPVwiYnRuLWdyb3VwIHB1bGwtcmlnaHRcIiBpZD1cInRyZWUtc3ViLW1lbnVcIj4nK1xuICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGRyb3Bkb3duLXRvZ2dsZVwiIGRhdGEtdG9nZ2xlPVwiZHJvcGRvd25cIj4nK1xuICAgICAgICAnPHNwYW4gaWQ9XCJsb2FkZWQtdHJlZS1uYW1lXCI+RGVmYXVsdCBUcmVlPC9zcGFuPiA8c3BhbiBjbGFzcz1cImNhcmV0XCI+PC9zcGFuPicrXG4gICAgICAnPC9idXR0b24+JytcbiAgICAgICc8dWwgY2xhc3M9XCJkcm9wZG93bi1tZW51XCIgcm9sZT1cIm1lbnVcIj4nK1xuICAgICAgICAnPGxpPjxhIGlkPVwiZ2RyaXZlLXRyZWVwYW5lbC1sb2FkXCI+PGkgY2xhc3M9XCJpY29uLWNsb3VkLWRvd25sb2FkXCI+PC9pPiBMb2FkIFRyZWU8L2E+PC9saT4nK1xuICAgICAgICAnPGxpPjxhIGlkPVwiZ2RyaXZlLXRyZWVwYW5lbC1zYXZlXCI+PGkgY2xhc3M9XCJpY29uLWNsb3VkLXVwbG9hZFwiPjwvaT4gU2F2ZSBUcmVlPC9hPjwvbGk+JytcbiAgICAgICAgJzxsaSBzdHlsZT1cImRpc3BsYXk6bm9uZVwiPjxhIGlkPVwic2hhcmUtdHJlZS1idG5cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiIHN0eWxlPVwiZGlzcGxheTpub25lO21hcmdpbi1sZWZ0OjEwcHhcIj48aSBjbGFzcz1cImljb24tc2hhcmVcIj48L2k+IFNoYXJlIFRyZWU8L2E+PC9saT4nK1xuICAgICAgJzwvdWw+JytcbiAgJzwvZGl2PicrXG4gICc8ZGl2IHN0eWxlPVwiZGlzcGxheTpub25lXCI+PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGlkPVwiY29tcGFyZS10cmVlc1wiIC8+IENvbXBhcmUgVHJlZXM8L2Rpdj4nK1xuJzwvZGl2Pic7XG5cbnZhciBJTlBVVF9URU1QTEFURSA9XG4gICc8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPicrXG4gICAgJzxsYWJlbCBmb3I9XCJ7e2lkfX1cIiBjbGFzcz1cImNvbC1sZy00IGNvbnRyb2wtbGFiZWxcIj57e2xhYmVsfX08L2xhYmVsPicrXG4gICAgJzxkaXYgY2xhc3M9XCJjb2wtbGctOFwiPicrXG4gICAgICAnPGlucHV0IHR5cGU9XCJ7e3R5cGV9fVwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgaWQ9XCJ7e2lkfX1cIiBzdHlsZT1cIndpZHRoOjIwMHB4O2Rpc3BsYXk6aW5saW5lLWJsb2NrXCIgdmFsdWU9XCJ7e3ZhbHVlfX1cIj4mbmJzcDsmbmJzcDt7e3VuaXRzfX0nK1xuICAgICAgJzxwIGNsYXNzPVwiaGVscC1ibG9ja1wiPnt7ZGVzY3JpcHRpb259fTwvcD4nICtcbiAgICAnPC9kaXY+JytcbiAgJzwvZGl2Pic7XG5cbnZhciBBUlJBWV9JTlBVVF9URU1QTEFURSA9XG4gICc8ZGl2IGNsYXNzPVwiY29sLWxnLTZcIj48ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPicrXG4gICAgJzxsYWJlbCBmb3I9XCJ7e2lkfX1cIiBjbGFzcz1cImNvbC1sZy00IGNvbnRyb2wtbGFiZWxcIj57e2xhYmVsfX08L2xhYmVsPicrXG4gICAgJzxkaXYgY2xhc3M9XCJjb2wtbGctOFwiPicrXG4gICAgICAne3tpbnB1dHN9fScrXG4gICAgICAnPHAgY2xhc3M9XCJoZWxwLWJsb2NrXCI+e3tkZXNjcmlwdGlvbn19PC9wPicgK1xuICAgICc8L2Rpdj4nK1xuICAnPC9kaXY+PC9kaXY+JztcblxudmFyIHRhYkhlYWRlciA9ICc8dWwgY2xhc3M9XCJuYXYgbmF2LXBpbGxzXCIgaWQ9XCJpbnB1dF9waWxsc1wiPic7XG52YXIgY29udGVudCA9ICc8ZGl2IGNsYXNzPVwidGFiLWNvbnRlbnRcIj4nO1xuXG52YXIgdHJlZUhlYWRlciA9ICc8ZGl2IGNsYXNzPVwicGFuZWwtZ3JvdXBcIiBpZD1cInRyZWUtYWNjb3JkaW9uXCI+JztcbnZhciBUUkVFX1BBTkVMX1RFTVBMQVRFID0gJzxkaXYgY2xhc3M9XCJwYW5lbCBwYW5lbC1kZWZhdWx0XCI+JytcbiAgICAgICAgJzxkaXYgY2xhc3M9XCJwYW5lbC1oZWFkaW5nXCI+JytcbiAgICAgICAgICAgICc8aDQgY2xhc3M9XCJwYW5lbC10aXRsZVwiPicrXG4gICAgICAgICAgICAgICAgJzxhIGNsYXNzPVwiYWNjb3JkaW9uLXRvZ2dsZVwiIGRhdGEtdG9nZ2xlPVwiY29sbGFwc2VcIiBkYXRhLXBhcmVudD1cIiN0cmVlLWFjY29yZGlvblwiIGhyZWY9XCIjY29sbGFwc2V7e2lkfX1cIj4nK1xuICAgICAgICAgICAgICAgICAgICAne3t0aXRsZX19JytcbiAgICAgICAgICAgICAgICAnPC9hPicrXG4gICAgICAgICAgICAnPC9oND4nK1xuICAgICAgICAnPC9kaXY+JytcbiAgICAgICAgJzxkaXYgaWQ9XCJjb2xsYXBzZXt7aWR9fVwiIGNsYXNzPVwicGFuZWwtY29sbGFwc2UgY29sbGFwc2VcIj4nK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJwYW5lbC1ib2R5XCI+e3tib2R5fX08L2Rpdj4nK1xuICAgICAgICAnPC9kaXY+JytcbiAgICAgJzwvZGl2Pic7XG5cbnZhciBpbnB1dHMgPSB7fTtcblxuLy8gZm9yIHdlYXRoZXIgZGF0YVxudmFyIGNvbHMgPSBbXTtcblxudmFyIG1hcCA9IG51bGw7XG5cbi8qKlxuICogT3B0aW9ucyA6XG4gKiAgIG1vZGVsIC0gdHlwZSBvZiBtb2RlbCB0byBhcHBlbmQgdG9cbiAqICAgbGFiZWwgLSBhdHRyaWJ1dGUgbGFiZWxcbiAqICAgdmFsdWUgLSBkZWZhdWx0IHZhbHVlXG4gKiAgIGRlc2NyaXB0aW9uIC0gZGVzY3JpcHRpb24gb2YgYXR0cmlidXRlXG4gKiAgIHVuaXRzIC0gYXR0cmlidXRlIHVuaXRzXG4gKi9cbmZ1bmN0aW9uIF9hZGRJbnB1dChvcHRpb25zKSB7XG4gIGlmKCAhaW5wdXRzW29wdGlvbnMubW9kZWxdICkgaW5wdXRzW29wdGlvbnMubW9kZWxdID0gW107XG4gIGlucHV0c1tvcHRpb25zLm1vZGVsXS5wdXNoKG9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiBfY3JlYXRlV2VhdGhlcklucHV0cygpIHtcbiAgZm9yKCB2YXIgYXR0ciBpbiBhcHAuZ2V0TW9kZWwoKS5nZXREYXRhTW9kZWwoKS53ZWF0aGVyICkge1xuICAgIGlmKCBhdHRyICE9IFwibnJlbFwiICkgY29scy5wdXNoKGF0dHIpO1xuICB9XG5cbiAgdmFyIHRhYmxlID0gJzxkaXYgc3R5bGU9XCJwYWRkaW5nLXRvcDoyNXB4XCI+PGEgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgcHVsbC1yaWdodFwiIGlkPVwibG9hZC13ZWF0aGVyLWJ0blwiPjxpIGNsYXNzPVwiaWNvbi11cGxvYWQtYWx0XCI+PC9pPiBVcGxvYWQ8L2E+JytcbiAgICAgICAgJzxkaXYgY2xhc3M9XCJidG4tZ3JvdXBcIiBpZD1cIndlYXRoZXItaW5wdXQtdG9nZ2xlXCI+JytcbiAgICAgICAgICAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgYWN0aXZlXCI+QXZlcmFnZXM8L2J1dHRvbj4nK1xuICAgICAgICAgICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiPkFjdHVhbDwvYnV0dG9uPicrXG4gICAgICAgICc8L2Rpdj4nK1xuICAgICAgICAnPC9kaXY+JytcbiAgICAgICAgJzxkaXYgaWQ9XCJjdXN0b20td2VhdGhlci1wYW5lbFwiIHN0eWxlPVwiZGlzcGxheTpub25lO21hcmdpbi10b3A6MjBweFwiPjwvZGl2PicrXG4gICAgICAgICc8ZGl2IGlkPVwiYXZlcmFnZS13ZWF0aGVyLXBhbmVsXCI+JytcbiAgICAgICAgJzxkaXYgc3R5bGU9XCJwYWRkaW5nOjEwcHg7Y29sb3I6Izg4OFwiPlNlbGVjdCBsb2NhdGlvbiB0byBzZXQgdGhlIGF2ZXJhZ2Ugd2VhdGhlciBkYXRhPC9kaXY+JytcbiAgICAgICAgJzx0YWJsZSBjbGFzcz1cInRhYmxlIHRhYmxlLXN0cmlwZWQgdGFibGUtY29uZGVuc2VkIHdlYXRoZXItdGFibGVcIiBzdHlsZT1cIm1hcmdpbi10b3A6MjBweFwiPic7XG5cbiAgdGFibGUgKz0gXCI8dHI+XCI7XG4gIGZvciggdmFyIGkgPSAwOyBpIDwgY29scy5sZW5ndGg7IGkrKyApIHtcbiAgICB0YWJsZSArPSBcIjx0ZD5cIitjb2xzW2ldK1wiPC90ZD5cIjtcbiAgfVxuICB0YWJsZSArPSBcIjwvdHI+XCI7XG5cbiAgZm9yKCB2YXIgaSA9IDA7IGkgPCAxMjsgaSsrICkge1xuICAgIHZhciBtID0gKGkrMSkrJyc7XG4gICAgaWYoIG0ubGVuZ3RoID09IDEgKSBtID0gJzAnK207XG5cbiAgICB0YWJsZSArPSBcIjx0cj5cIjtcbiAgICBmb3IoIHZhciBqID0gMDsgaiA8IGNvbHMubGVuZ3RoOyBqKysgKSB7XG4gICAgICBpZiggaiA9PSAwICkge1xuICAgICAgICB0YWJsZSArPSBcIjx0ZD5cIisoaSsxKStcIjwvdGQ+XCI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0YWJsZSArPSBcIjx0ZD48aW5wdXQgY2xhc3M9J2Zvcm0tY29udHJvbCcgaWQ9J2lucHV0LXdlYXRoZXItXCIrY29sc1tqXStcIi1cIittK1wiJyB0eXBlPSd0ZXh0JyAvPjwvdGQ+XCI7XG4gICAgICB9XG4gICAgfVxuICAgIHRhYmxlICs9IFwiPC90cj5cIjtcbiAgfVxuICByZXR1cm4gdGFibGUrJzwvdGFibGU+PGRpdiBpZD1cImF2ZXJhZ2Utd2VhdGhlci1jaGFydFwiPjwvZGl2PjwvZGl2Pic7XG5cbn1cblxuZnVuY3Rpb24gX3NldFdlYXRoZXJEYXRhKCkge1xuICB2YXIgbGwgPSBhcHAucXMoXCJsbFwiKTtcbiAgaWYoIGxsICkge1xuICAgIGxsID0gbGwuc3BsaXQoXCIsXCIpO1xuICAgIF9xdWVyeVdlYXRoZXJEYXRhKGxsWzBdLCBsbFsxXSwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGFwcC5ydW5Nb2RlbCgpO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgICQoXCIjY3VycmVudC1sb2NhdGlvblwiKS5odG1sKFwiTm90IFNldFwiKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfcXVlcnlXZWF0aGVyRGF0YShsbmcsIGxhdCwgY2FsbGJhY2spIHtcbiAgZ2EoJ3NlbmQnLCAnZXZlbnQnLCAndWknLCAnaW50ZXJhY3Rpb24nLCAnd2VhdGhlci1kYXRhLXF1ZXJ5JywgMSk7XG5cbiAgdmFyIHVybCA9IFwiaHR0cDovL2FsZGVyLmJpb2VuZXJneS5jYXNpbC51Y2RhdmlzLmVkdTo4MDgwL3ZpenNvdXJjZS9yZXN0P3ZpZXc9cG9pbnRUb1dlYXRoZXIoXCIrbG5nK1wiLFwiK2xhdCtcIiw4MTkyKVwiXG4gIHZhciBxID0gbmV3IGdvb2dsZS52aXN1YWxpemF0aW9uLlF1ZXJ5KHVybCk7XG4gIHZhciByZXNwcyA9IDA7XG5cbiAgZnVuY3Rpb24gY2hlY2tEb25lKCkge1xuICAgICAgcmVzcHMrKztcbiAgICAgIGlmKCByZXNwcyA9PSAyICYmIGNhbGxiYWNrICkgY2FsbGJhY2soKTtcbiAgfVxuXG4gIHEuc2V0UXVlcnkoJ1NFTEVDVCAqJyk7XG4gIHEuc2VuZChmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgdmFyIHRhYmxlID0gSlNPTi5wYXJzZShyZXNwb25zZS5nZXREYXRhVGFibGUoKS50b0pTT04oKSk7XG5cbiAgICBmb3IoIHZhciBpID0gMDsgaSA8IHRhYmxlLnJvd3MubGVuZ3RoOyBpKysgKSB7XG4gICAgICB2YXIgbSA9IChpKzEpKycnO1xuICAgICAgaWYoIG0ubGVuZ3RoID09IDEgKSBtID0gJzAnK207XG5cbiAgICAgIHdlYXRoZXJBdmVyYWdlQ2hhcnREYXRhW21dID0ge307XG4gICAgICBmb3IoIHZhciBqID0gMTsgaiA8IHRhYmxlLmNvbHMubGVuZ3RoOyBqKysgKSB7XG4gICAgICAgICQoXCIjaW5wdXQtd2VhdGhlci1cIitjb2xzW2pdK1wiLVwiK20pLnZhbCh0YWJsZS5yb3dzW2ldLmNbal0gPyB0YWJsZS5yb3dzW2ldLmNbal0udiA6IFwiXCIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZUF2ZXJhZ2VDaGFydCgpO1xuICAgIGNoZWNrRG9uZSgpO1xuICB9KTtcblxuICB2YXIgdXJsID0gXCJodHRwOi8vYWxkZXIuYmlvZW5lcmd5LmNhc2lsLnVjZGF2aXMuZWR1OjgwODAvdml6c291cmNlL3Jlc3Q/dmlldz1wb2ludFRvU09JTChcIitsbmcrXCIsXCIrbGF0K1wiLDgxOTIpXCJcbiAgdmFyIHEgPSBuZXcgZ29vZ2xlLnZpc3VhbGl6YXRpb24uUXVlcnkodXJsKTtcbiAgcS5zZXRRdWVyeSgnU0VMRUNUIConKTtcbiAgcS5zZW5kKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICB2YXIgZXJyb3IgPSBmYWxzZTtcbiAgICB2YXIgdGFibGUgPSBKU09OLnBhcnNlKHJlc3BvbnNlLmdldERhdGFUYWJsZSgpLnRvSlNPTigpKTtcbiAgICBmb3IoIHZhciBpID0gMDsgaSA8IHRhYmxlLmNvbHMubGVuZ3RoOyBpKysgKSB7XG4gICAgICBpZiggdGFibGUucm93c1swXSA9PSBudWxsICkge1xuICAgICAgICBlcnJvciA9IHRydWU7XG4gICAgICAgIGFsZXJ0KFwiSW52YWxpZCBsb2NhdGlvbiBzZWxlY3RlZFwiKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIHZhciBrZXkgPSB0YWJsZS5jb2xzW2ldLmlkO1xuICAgICAgaWYoIGtleSA9PT0gJ21heGF3cycgKSBrZXkgPSAnbWF4QVdTJztcblxuICAgICAgJChcIiNpbnB1dC1zb2lsLVwiK2tleSkudmFsKHRhYmxlLnJvd3NbMF0uY1tpXS52KTtcbiAgICB9XG5cbiAgICBpZiggIWVycm9yICkgY2hlY2tEb25lKCk7XG4gIH0pO1xuXG4gICQoXCIjY3VycmVudC1sb2NhdGlvblwiKS5odG1sKGxuZytcIiwgXCIrbGF0K1wiIDxhIGhyZWY9J1wiK3dpbmRvdy5sb2NhdGlvbi5ocmVmLnJlcGxhY2UoLyMuKi8sJycpK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCI/bGw9XCIrbG5nK1wiLFwiK2xhdCtcIicgdGFyZ2V0PSdfYmxhbmsnPjxpIGNsYXNzPSdpY29uLWxpbmsnPjwvaT48L2E+XCIpO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVBdmVyYWdlQ2hhcnQoKSB7XG4gIHdlYXRoZXJBdmVyYWdlQ2hhcnREYXRhID0ge307XG5cbiAgZm9yKCB2YXIgaSA9IDA7IGkgPCAxMjsgaSsrICkge1xuICAgIHZhciBtID0gKGkrMSkrJyc7XG4gICAgaWYoIG0ubGVuZ3RoID09IDEgKSBtID0gJzAnK207XG5cbiAgICB3ZWF0aGVyQXZlcmFnZUNoYXJ0RGF0YVttXSA9IHt9O1xuICAgIGZvciggdmFyIGogPSAxOyBqIDwgY29scy5sZW5ndGg7IGorKyApIHtcbiAgICAgIHZhciB2YWwgPSAkKFwiI2lucHV0LXdlYXRoZXItXCIrY29sc1tqXStcIi1cIittKS52YWwoKTtcbiAgICAgIGlmKCB2YWwgJiYgdmFsLmxlbmd0aCA+IDAgKSB3ZWF0aGVyQXZlcmFnZUNoYXJ0RGF0YVttXVtjb2xzW2pdXSA9IHBhcnNlSW50KHZhbCk7XG4gICAgICBlbHNlIHdlYXRoZXJBdmVyYWdlQ2hhcnREYXRhW21dW2NvbHNbal1dID0gMDtcbiAgICB9XG4gIH1cbiAgd2VhdGhlckF2ZXJhZ2VDaGFydCA9IHdlYXRoZXJDaGFydC5jcmVhdGUoJCgnI2F2ZXJhZ2Utd2VhdGhlci1jaGFydCcpWzBdLCB3ZWF0aGVyQXZlcmFnZUNoYXJ0RGF0YSk7XG59XG5cbmZ1bmN0aW9uIF9zZWxlY3RXZWF0aGVyTG9jYXRpb24oKSB7XG4gIGlmKCAhbWFwICkge1xuICAgICQoXCIjc2VsZWN0LXdlYXRoZXItbW9kYWxcIikubW9kYWwoe30pO1xuXG4gICAgJChcIiNsb2NhdGUtYnV0dG9uXCIpLm9uKCdjbGljaycsIF9nZXRMb2NhdGlvbik7XG5cblxuICAgIC8vIHdhaXQgZm9yIHRoZSBtb2RhbCB0byBpbml0XG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgaWYoIG9mZmxpbmVNb2RlICkgcmV0dXJuO1xuXG4gICAgICBtYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKCQoXCIjZ21hcFwiKVswXSwge1xuICAgICAgICBjZW50ZXIgOiBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKDM1LCAtMTIxKSxcbiAgICAgICAgem9vbTogNSxcbiAgICAgICAgbWFwVHlwZUlkIDogZ29vZ2xlLm1hcHMuTWFwVHlwZUlkLlJPQURNQVBcbiAgICAgIH0pO1xuXG4gICAgICB2YXIgZGVmYXVsdFN0eWxlID0ge1xuICAgICAgICAgICAgcG9seWdvbk9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgc3Ryb2tlQ29sb3IgICA6IFwiIzAwMDBGRlwiLFxuICAgICAgICAgICAgICBzdHJva2VPcGFjaXR5IDogMC41LFxuICAgICAgICAgICAgICBmaWxsQ29sb3IgICAgIDogJyNGRUZFRkUnLFxuICAgICAgICAgICAgICBmaWxsT3BhY2l0eSAgIDogMC4yXG4gICAgICAgICAgICB9LFxuICAgICAgfTtcblxuXG4gICAgICB2YXIgZGVmYXVsdE9wdGlvbnMgPSB7XG4gICAgICAgICAgcXVlcnk6IHtcbiAgICAgICAgICAgIHNlbGVjdDogJ2JvdW5kYXJ5JyxcbiAgICAgICAgICAgIGZyb206ICcxaFY5dlFHM1NjMEpMUGR1RnBXSnp0ZkxLLWV4NmNjeU1nX3B0RV9zJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAgc3R5bGVzOiBbZGVmYXVsdFN0eWxlXSxcbiAgICAgICAgICBzdXBwcmVzc0luZm9XaW5kb3dzIDogdHJ1ZVxuICAgICAgfTtcblxuICAgICAgdmFyIGZ1c2lvbkxheWVyID0gbmV3IGdvb2dsZS5tYXBzLkZ1c2lvblRhYmxlc0xheWVyKGRlZmF1bHRPcHRpb25zKTtcbiAgICAgIGZ1c2lvbkxheWVyLm9wYWNpdHkgPSAuODtcbiAgICAgIGZ1c2lvbkxheWVyLnNldE1hcChtYXApO1xuXG4gICAgICBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihtYXAsICdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYoICQoJyNsb2NhdGUtY2FjaGUtbW9kZScpLmlzKCc6Y2hlY2tlZCcpICkge1xuICAgICAgICAgIGFsZXJ0KCdZb3UgbXVzdCBjbGljayBvbiBhIGdlb21ldHJ5IHRvIGNhY2hlJyk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgX3F1ZXJ5V2VhdGhlckRhdGEoZS5sYXRMbmcubG5nKCksIGUubGF0TG5nLmxhdCgpLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgIGFwcC5ydW5Nb2RlbCgpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgJChcIiNzZWxlY3Qtd2VhdGhlci1tb2RhbFwiKS5tb2RhbCgnaGlkZScpO1xuICAgICAgfSk7XG4gICAgICBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihmdXNpb25MYXllciwgJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiggJCgnI2xvY2F0ZS1jYWNoZS1tb2RlJykuaXMoJzpjaGVja2VkJykgKSB7XG4gICAgICAgICAgb2ZmbGluZS5jYWNoZVRpbGUoZSwgZnVzaW9uTGF5ZXIsIGRlZmF1bHRPcHRpb25zLCBkZWZhdWx0U3R5bGUpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIF9xdWVyeVdlYXRoZXJEYXRhKGUubGF0TG5nLmxuZygpLCBlLmxhdExuZy5sYXQoKSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICBhcHAucnVuTW9kZWwoKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICQoXCIjc2VsZWN0LXdlYXRoZXItbW9kYWxcIikubW9kYWwoJ2hpZGUnKTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyBzZXR1cCBpbnB1dCBmb3IgY2xlYXJpbmcgY2FjaGVcbiAgICAgICAgICAkKCcjY2xlYXItY2FjaGVkLXRpbGVzJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgb2ZmbGluZS5jbGVhckNhY2hlKCk7XG4gICAgICAgICAgICAgIG9mZmxpbmUucmVuZGVyQ2FjaGVkVGlsZXNPbk1hcChmdXNpb25MYXllciwgZGVmYXVsdE9wdGlvbnMsIGRlZmF1bHRTdHlsZSk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgIG9mZmxpbmUucmVuZGVyQ2FjaGVkVGlsZXNPbk1hcChmdXNpb25MYXllciwgZGVmYXVsdE9wdGlvbnMsIGRlZmF1bHRTdHlsZSk7XG5cbiAgICB9LDUwMCk7XG4gIH0gZWxzZSB7XG4gICAgJChcIiNzZWxlY3Qtd2VhdGhlci1tb2RhbFwiKS5tb2RhbCgnc2hvdycpO1xuXG4gICAgLy8gd2Ugc2VlbSB0byBiZSBoYW5naW5nIHNvbWV0aW1lcy4uLi5cbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICBnb29nbGUubWFwcy5ldmVudC50cmlnZ2VyKG1hcCwgXCJyZXNpemVcIik7XG4gICAgfSwgNTAwKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfZ2V0TG9jYXRpb24oKSB7XG4gIGlmIChuYXZpZ2F0b3IuZ2VvbG9jYXRpb24pIHtcbiAgICBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24uZ2V0Q3VycmVudFBvc2l0aW9uKHNob3dQb3NpdGlvbik7XG4gICAgJChcIiNsb2NhdGUtYnV0dG9uXCIpLmFkZENsYXNzKFwiYnRuLXdhcm5pbmdcIik7XG4gIH0gZWxzZXtcbiAgICB3aW5kb3cuYWxlcnQoXCJHZW9sb2NhdGlvbiBpcyBub3Qgc3VwcG9ydGVkIGJ5IHRoaXMgYnJvd3Nlci5cIik7XG4gIH1cbiAgZnVuY3Rpb24gc2hvd1Bvc2l0aW9uKHBvc2l0aW9uKSB7XG4gICAgJChcIiNsb2NhdGUtYnV0dG9uXCIpLnJlbW92ZUNsYXNzKFwiYnRuLXdhcm5cIikuYWRkQ2xhc3MoXCJidG4tc3VjY2Vzc1wiKTtcbiAgICBtYXAuc2V0Wm9vbSgxMCk7XG4gICAgbWFwLnNldENlbnRlcihuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKHBvc2l0aW9uLmNvb3Jkcy5sYXRpdHVkZSwgcG9zaXRpb24uY29vcmRzLmxvbmdpdHVkZSkpO1xuICAgIC8vX3F1ZXJ5V2VhdGhlckRhdGEocG9zaXRpb24uY29vcmRzLmxvbmdpdHVkZSwgcG9zaXRpb24uY29vcmRzLmxhdGl0dWRlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfZ2VuZXJhdGVJbnB1dHMoaSwgdHlwZSwgcHJlZml4LCBuYW1lLCBhdHRycykge1xuICB2YXIgaWQgPSBwcmVmaXgubGVuZ3RoID4gMCA/IHByZWZpeCsnLScrbmFtZSA6ICdpbnB1dC0nK25hbWU7XG4gIHZhciBpbnB1dCA9ICc8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiIHN0eWxlPVwibWFyZ2luLWxlZnQ6JysoaSoyMCkrJ3B4O21hcmdpbi10b3A6MHB4O21hcmdpbi1yaWdodDo1cHhcIj4nO1xuXG4gIHZhciB0cmVlYm9keSA9IFwiXCI7XG5cbiAgaWYoICEoaSA9PSAxKSApIHtcbiAgICAgIGlmKCBpICE9IDAgKSBpbnB1dCArPSAnPGxhYmVsIGZvcj1cIicraWQrJ1wiIGNsYXNzPVwiY29udHJvbC1sYWJlbFwiPicrbmFtZSArJzwvbGFiZWw+JztcbiAgICAgIGlucHV0ICs9ICc8ZGl2Pic7XG4gIH1cblxuXG4gICAgICBpZiAoIHR5cGVvZiBhdHRycy52YWx1ZSA9PSAnb2JqZWN0JyAmJiBpID09IDEgICkgeyAvLyAmJiB0eXBlID09ICd0cmVlJyApIHtcbiAgICAgIGZvciggdmFyIGtleSBpbiBhdHRycy52YWx1ZSApIHtcbiAgICAgICAgICAgICAgdHJlZWJvZHkgKz0gX2dlbmVyYXRlSW5wdXRzKGkrMSwgdHlwZSwgaWQsIGtleSwgYXR0cnMudmFsdWVba2V5XSk7XG4gICAgICAgICAgfVxuICB9IGVsc2UgaWYgKCB0eXBlb2YgYXR0cnMudmFsdWUgPT0gJ29iamVjdCcgKSB7XG4gICAgICBpZiggYXR0cnMuZGVzY3JpcHRpb24gKSBpbnB1dCArPSAnPHAgY2xhc3M9XCJoZWxwLWJsb2NrXCI+JythdHRycy5kZXNjcmlwdGlvbisnPC9wPic7XG4gICAgICAgICAgZm9yKCB2YXIga2V5IGluIGF0dHJzLnZhbHVlICkge1xuICAgICAgICAgICAgICBpbnB1dCArPSBfZ2VuZXJhdGVJbnB1dHMoaSsxLCB0eXBlLCBpZCwga2V5LCBhdHRycy52YWx1ZVtrZXldKTtcbiAgICAgICAgICB9XG4gIH0gZWxzZSBpZiAoICh0eXBlb2YgYXR0cnMudmFsdWUgPT0gJ251bWJlcicgfHwgdHlwZW9mIGF0dHJzLnZhbHVlID09ICdzdHJpbmcnKSAmJiBpID09IDEgKSB7IC8vICYmIHR5cGUgPT0gJ3RyZWUnICkge1xuXG4gICAgICB0cmVlYm9keSArPVxuICAgICAgICAgICc8ZGl2PjxpbnB1dCB0eXBlPVwiJysoYXR0cnMudmFsdWUgPT0gJ19kYXRlXycgPyAnZGF0ZScgOiAndGV4dCcpKydcIiAnK1xuICAgICAgICAgICh0eXBlPT0nY29uc3RhbnRzJz8nZGlzYWJsZWQnOicnKSsnIGNsYXNzPVwiZm9ybS1jb250cm9sICcrdHlwZSsnXCIgaWQ9XCInK1xuICAgICAgICAgIGlkKydcIiBzdHlsZT1cIndpZHRoOjIwMHB4O2Rpc3BsYXk6aW5saW5lLWJsb2NrXCIgdmFsdWU9XCInXG4gICAgICAgICAgICAgICsoYXR0cnMudmFsdWUgPT0gJ19kYXRlXycgPyAnJyA6IGF0dHJzLnZhbHVlKSsnXCI+Jm5ic3A7Jm5ic3A7J1xuICAgICAgICAgICAgICArKGF0dHJzLnVuaXRzID8gYXR0cnMudW5pdHMgOiAnJykrJzwvZGl2Pic7XG5cbiAgfSBlbHNlIGlmICggIHR5cGVvZiBhdHRycy52YWx1ZSA9PSAnc3RyaW5nJyB8fCB0eXBlb2YgYXR0cnMudmFsdWUgPT0gJ251bWJlcicgKSB7XG5cbiAgICBpbnB1dCArPSAnPGRpdj48aW5wdXQgdHlwZT1cIicrKGF0dHJzLnZhbHVlID09ICdfZGF0ZV8nID8gJ2RhdGUnIDogJ3RleHQnKSsnXCIgJ1xuICAgICAgICAgICsodHlwZT09J2NvbnN0YW50cyc/J2Rpc2FibGVkJzonJykrJyBjbGFzcz1cImZvcm0tY29udHJvbCAnK3R5cGUrXG4gICAgICAgICAgICdcIiBpZD1cIicraWQrJ1wiIHN0eWxlPVwid2lkdGg6MjAwcHg7ZGlzcGxheTppbmxpbmUtYmxvY2tcIiB2YWx1ZT1cIidcbiAgICAgICAgICArKGF0dHJzLnZhbHVlID09ICdfZGF0ZV8nID8gJycgOiBhdHRycy52YWx1ZSkrJ1wiPiZuYnNwOyZuYnNwOydcbiAgICAgICAgICArKGF0dHJzLnVuaXRzID8gYXR0cnMudW5pdHMgOiAnJykrJzwvZGl2Pic7XG5cbiAgICBpZiggYXR0cnMuZGVzY3JpcHRpb24gKSBpbnB1dCArPSAnPHAgY2xhc3M9XCJoZWxwLWJsb2NrXCI+JythdHRycy5kZXNjcmlwdGlvbisnPC9wPic7XG4gIH1cblxuICBpZiggIShpID09IDEgLyomJiB0eXBlID09ICd0cmVlJyovKSApIHtcbiAgICAgIGlucHV0ICs9ICc8L2Rpdj48L2Rpdj4nO1xuICB9IGVsc2Uge1xuICAgICAgaW5wdXQgKz0gVFJFRV9QQU5FTF9URU1QTEFURVxuICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL3t7aWR9fS9nLGlkKVxuICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoJ3t7dGl0bGV9fScsbmFtZStcIiA8c3BhbiBzdHlsZT0nY29sb3I6Izg4ODtmb250LXNpemU6MTJweCc+IC0gXCIrYXR0cnMuZGVzY3JpcHRpb24rXCI8L3NwYW4+XCIpXG4gICAgICAgICAgICAgICAgICAucmVwbGFjZSgne3tib2R5fX0nLHRyZWVib2R5KSsnPC9kaXY+J1xuICB9XG5cbiAgcmV0dXJuIGlucHV0O1xufVxuXG5mdW5jdGlvbiBjcmVhdGUoZWxlKSB7XG4gIHdlYXRoZXJGaWxlUmVhZGVyLmluaXQoKTtcbiAgdmFyIG1vZGVsLCBtLCBhdHRyLCBjb25maWc7XG5cbiAgdmFyIGlucHV0cyA9ICQuZXh0ZW5kKHRydWUsIHt9LCBhcHAuZ2V0TW9kZWwoKS5nZXREYXRhTW9kZWwoKSk7XG5cbiAgaW5wdXRzWydzZXR1cCddID0ge307XG4gIGZvciggbW9kZWwgaW4gaW5wdXRzICkge1xuICAgIG0gPSBpbnB1dHNbbW9kZWxdO1xuICAgIGZvciggYXR0ciBpbiBtICkge1xuICAgICAgY29uZmlnID0gbVthdHRyXTtcblxuICAgICAgaWYoIHR5cGVvZiBjb25maWcgPT0gJ29iamVjdCcgKSB7XG4gICAgICAgIF9hZGRJbnB1dCh7XG4gICAgICAgICAgbW9kZWwgICAgICAgOiBtb2RlbCxcbiAgICAgICAgICBsYWJlbCAgICAgICA6IGF0dHIsXG4gICAgICAgICAgZGVzY3JpcHRpb24gOiBjb25maWcuZGVzY3JpcHRpb24sXG4gICAgICAgICAgdmFsdWUgICAgICAgOiBjb25maWcudmFsdWUsXG4gICAgICAgICAgdW5pdHMgICAgICAgOiBjb25maWcudW5pdHNcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBfYWRkSW5wdXQoe1xuICAgICAgICAgIG1vZGVsICAgICAgIDogbW9kZWwsXG4gICAgICAgICAgbGFiZWwgICAgICAgOiBhdHRyXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG5cbiAgZm9yKCBtb2RlbCBpbiBpbnB1dHMgKSB7XG4gICAgaWYoIG1vZGVsID09IFwicGxhbnRhdGlvbl9zdGF0ZVwiICkgY29udGludWU7XG5cbiAgICB0YWJIZWFkZXIgKz0gJzxsaT48YSBocmVmPVwiI2lucHV0c18nK21vZGVsKydcIiBpZD1cInRhYl9pbnB1dHNfJyttb2RlbCsnXCIgZGF0YS10b2dnbGU9XCJwaWxsXCI+J1xuICAgICAgICAgICAgICAgICttb2RlbC5zdWJzdHIoMCwxKS50b1VwcGVyQ2FzZSgpK21vZGVsLnN1YnN0cigxKS50b0xvd2VyQ2FzZSgpKyc8L2E+PC9saT4nO1xuICAgIHZhciBhdHRyaWJ1dGVzID0gaW5wdXRzW21vZGVsXTtcblxuICAgIGNvbnRlbnQgKz0gJyA8ZGl2IGNsYXNzPVwidGFiLXBhbmUgZmFkZVwiIGlkPVwiaW5wdXRzXycrbW9kZWwrJ1wiPic7XG5cbiAgICB2YXIgcm93MSA9IFwiXCI7XG4gICAgdmFyIHJvdzIgPSBcIjxkaXYgY2xhc3M9J2NvbC1sZy02PlwiO1xuXG4gICAgaWYoIG1vZGVsID09ICd3ZWF0aGVyJyApIHtcbiAgICAgIGNvbnRlbnQgKz0gX2NyZWF0ZVdlYXRoZXJJbnB1dHMoKTtcbiAgICB9IGVsc2UgaWYoIG1vZGVsID09ICdzZXR1cCcgKSB7XG4gICAgICBjb250ZW50ICs9IFNFVFVQX1RFTVBMQVRFO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnRlbnQgKz0gdHJlZUhlYWRlcjtcblxuICAgICAgICAvLyBhZGQgdGhlIGdvb2dsZSBkcml2ZSBidG4gZnJvbSB0cmVlc1xuICAgICAgICBpZiggbW9kZWwgPT0ndHJlZScgKSB7XG4gICAgICAgICAgY29udGVudCArPSBfY3JlYXRlVHJlZUlucHV0KG1vZGVsLCBpbnB1dHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnRlbnQgKz0gX2dlbmVyYXRlSW5wdXRzKDAsIG1vZGVsLCAnJywgbW9kZWwsIGlucHV0c1ttb2RlbF0pO1xuICAgICAgICB9XG5cbiAgICAgIGNvbnRlbnQgKz0gJzwvZGl2Pic7XG4gICAgfVxuXG5cbiAgICBjb250ZW50ICs9ICc8L2Rpdj4nO1xuICB9XG4gIGNvbnRlbnQgKz0gJzwvZGl2Pic7XG4gIHRhYkhlYWRlciArPSBcIjwvdWw+XCI7XG5cbiAgZWxlLmh0bWwodGFiSGVhZGVyK1wiPGRpdiBjbGFzcz0nZm9ybS1ob3Jpem9udGFsJz5cIitjb250ZW50K1wiPC9kaXY+XCIpO1xuXG4gIC8vIHJ1biB0aGUgbW9kZWwgd2hlbmV2ZXIgc29tZSBoaXRzICdlbnRlcidcbiAgZWxlLmZpbmQoJ2lucHV0Jykub24oJ2tleXVwJyxmdW5jdGlvbihlKXtcbiAgICBpZiggZS53aGljaCA9PSAxMyApIGFwcC5ydW5Nb2RlbCgpO1xuICB9KTtcblxuICAvLyBhZGQgY2xpY2sgaGFuZGxlciBmb3IgbG9hZGluZyBhIHRyZWVcbiAgZWxlLmZpbmQoXCIjZ2RyaXZlLXRyZWVwYW5lbC1sb2FkXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgZ2RyaXZlLnNob3dMb2FkVHJlZVBhbmVsKCk7XG4gIH0pO1xuICBlbGUuZmluZChcIiNnZHJpdmUtdHJlZXBhbmVsLXNhdmVcIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICBnZHJpdmUuc2hvd1NhdmVUcmVlUGFuZWwoKTtcbiAgfSk7XG5cbiAgLy8gc2V0IHRyZWUgaW5wdXQgaGFuZGxlcnNcbiAgJChcIiNjb21wYXJlLXRyZWVzXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgaWYoICQodGhpcykuaXMoJzpjaGVja2VkJykgKSB7XG4gICAgICAkKFwiI3NpbmdsZS10cmVlLWNvbnRlbnRcIikuaGlkZSgpO1xuICAgICAgJChcIiNjb21wYXJlLXRyZWUtY29udGVudFwiKS5zaG93KCk7XG4gICAgICAkKFwiI3RyZWUtc3ViLW1lbnVcIikuaGlkZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAkKFwiI3NpbmdsZS10cmVlLWNvbnRlbnRcIikuc2hvdygpO1xuICAgICAgJChcIiNjb21wYXJlLXRyZWUtY29udGVudFwiKS5oaWRlKCk7XG4gICAgICAkKFwiI3RyZWUtc3ViLW1lbnVcIikuc2hvdygpO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gc2V0IHBpbGwgY2xpY2sgaGFuZGxlcnNcbiAgJCgnI2lucHV0X3BpbGxzIGEnKS5jbGljayhmdW5jdGlvbiAoZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAkKHRoaXMpLnRhYignc2hvdycpXG4gIH0pO1xuICAkKCcjdGFiX2lucHV0c193ZWF0aGVyJykudGFiKCdzaG93Jyk7XG5cbiAgJCgnLnNlbGVjdC13ZWF0aGVyLWxvY2F0aW9uJykub24oJ2NsaWNrJywgX3NlbGVjdFdlYXRoZXJMb2NhdGlvbik7XG5cblxuICAkKCcjd2VhdGhlclJlYWRlci1tb2RhbCcpLm1vZGFsKHtzaG93OmZhbHNlfSk7XG4gICQoJyNsb2FkLXdlYXRoZXItYnRuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAkKCcjd2VhdGhlclJlYWRlci1tb2RhbCcpLm1vZGFsKCdzaG93Jyk7XG4gIH0pO1xuXG4gICQoXCIjd2VhdGhlci1pbnB1dC10b2dnbGUgLmJ0blwiKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICQoJyN3ZWF0aGVyLWlucHV0LXRvZ2dsZSAuYnRuLmFjdGl2ZScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAkKHRoaXMpLmFkZENsYXNzKCdhY3RpdmUnKTtcblxuICAgIGlmKCAkKHRoaXMpLmh0bWwoKSA9PSAnQXZlcmFnZXMnICkge1xuICAgICAgJCgnI2F2ZXJhZ2Utd2VhdGhlci1wYW5lbCcpLnNob3coKTtcbiAgICAgICQoJyNjdXN0b20td2VhdGhlci1wYW5lbCcpLmhpZGUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBwLnNldFdlYXRoZXIoKTtcbiAgICAgICQoJyNhdmVyYWdlLXdlYXRoZXItcGFuZWwnKS5oaWRlKCk7XG4gICAgICAkKCcjY3VzdG9tLXdlYXRoZXItcGFuZWwnKS5zaG93KCk7XG4gICAgfVxuICB9KTtcblxuICAkKHdpbmRvdykub24oJ3Jlc2l6ZScsIGZ1bmN0aW9uKCl7XG4gICAgaWYoIHdlYXRoZXJBdmVyYWdlQ2hhcnQgKXtcbiAgICAgIHdlYXRoZXJBdmVyYWdlQ2hhcnQgPSB3ZWF0aGVyQ2hhcnQuY3JlYXRlKCQoJyNhdmVyYWdlLXdlYXRoZXItY2hhcnQnKVswXSwgd2VhdGhlckF2ZXJhZ2VDaGFydERhdGEpO1xuICAgIH1cbiAgfSk7XG5cbiAgX3NldFdlYXRoZXJEYXRhKCk7XG59XG5cbmZ1bmN0aW9uIF9jcmVhdGVUcmVlSW5wdXQobW9kZWwsIGlucHV0cykge1xuICB2YXIgY29udGVudCA9IFwiXCI7XG4gIGNvbnRlbnQgKz0gR09PTEVEUklWRV9UUkVFX1RFTVBMQVRFO1xuXG4gIGNvbnRlbnQgKz0gJzxkaXYgaWQ9XCJzaW5nbGUtdHJlZS1jb250ZW50XCI+JztcbiAgY29udGVudCArPSBfZ2VuZXJhdGVJbnB1dHMoMCwgbW9kZWwsICcnLCBtb2RlbCwgaW5wdXRzW21vZGVsXSk7XG4gIGNvbnRlbnQgKz0gJzwvZGl2Pic7XG5cbiAgY29udGVudCArPSAnPGRpdiBpZD1cImNvbXBhcmUtdHJlZS1jb250ZW50XCIgc3R5bGU9XCJkaXNwbGF5Om5vbmVcIj4nK1xuICAgICAgICAnPHVsIGNsYXNzPVwibmF2IG5hdi10YWJzXCI+JytcbiAgICAgICAgICAnPGxpIGNsYXNzPVwiYWN0aXZlXCI+PGEgaHJlZj1cIiN0cmVlMVwiIGRhdGEtdG9nZ2xlPVwidGFiXCI+VHJlZSAxPC9hPjwvbGk+JytcbiAgICAgICAgICAgICc8bGk+PGEgaHJlZj1cIiN0cmVlMlwiIGRhdGEtdG9nZ2xlPVwidGFiXCI+VHJlZSAyPC9hPjwvbGk+JytcbiAgICAgICAgJzwvdWw+JytcbiAgICAgICAgJzxkaXYgY2xhc3M9XCJ0YWItY29udGVudFwiPicrXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cInRhYi1wYW5lIGFjdGl2ZVwiIGlkPVwidHJlZTFcIj4nK1xuICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cIndlbGxcIiBzdHlsZT1cInRleHQtYWxpZ246Y2VudGVyO21hcmdpbi10b3A6MTBweFwiPicrXG4gICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJidG4tZ3JvdXBcIj4nK1xuICAgICAgICAgICAgICAgICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBhY3RpdmVcIj5DdXN0b208L2J1dHRvbj4nK1xuICAgICAgICAgICAgICAgICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiPlNlbGVjdCBUcmVlPC9idXR0b24+JytcbiAgICAgICAgICAgICAgJzwvZGl2PicrXG4gICAgICAgICAgICAgICc8L2Rpdj4nK1xuICAgICAgICAgICAgICBfZ2VuZXJhdGVJbnB1dHMoMCwgbW9kZWwsICd0MScsIG1vZGVsLCBpbnB1dHNbbW9kZWxdKStcbiAgICAgICAgICAgICc8L2Rpdj4nK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJ0YWItcGFuZSBhY3RpdmVcIiBpZD1cInRyZWUyXCI+JytcbiAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJ3ZWxsXCIgc3R5bGU9XCJ0ZXh0LWFsaWduOmNlbnRlcjttYXJnaW4tdG9wOjEwcHhcIiA+JytcbiAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImJ0bi1ncm91cFwiPicrXG4gICAgICAgICAgICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGFjdGl2ZVwiPkN1c3RvbTwvYnV0dG9uPicrXG4gICAgICAgICAgICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCI+U2VsZWN0IFRyZWU8L2J1dHRvbj4nK1xuICAgICAgICAgICAgICAnPC9kaXY+JytcbiAgICAgICAgICAgICAgJzwvZGl2PicrXG4gICAgICAgICAgICAgIF9nZW5lcmF0ZUlucHV0cygwLCBtb2RlbCwgJ3QyJywgbW9kZWwsIGlucHV0c1ttb2RlbF0pK1xuICAgICAgICAgICAgJzwvZGl2PicrXG4gICAgICAgICAgJzwvZGl2PicrXG4gICAgICAgICAnPC9kaXY+JztcblxuICByZXR1cm4gY29udGVudDtcbn1cblxuXG5yZXR1cm4ge1xuICBjcmVhdGUgOiBjcmVhdGUsXG4gIHVwZGF0ZUF2ZXJhZ2VDaGFydDogdXBkYXRlQXZlcmFnZUNoYXJ0XG59O1xuXG59O1xuIiwidmFyIGNvbmZpZyA9IHJlcXVpcmUoJy4vY29uZmlnJyk7XG52YXIgYXBwID0gcmVxdWlyZSgnLi9hcHAnKTtcblxuLy8gU3BlY2lhbCBTYXVjZS4uLlxuLy8gYmFzaWNhbGx5IHRoZSBjb2RlIGxvYWRlZCBmcm9tIEdpdEh1YiBleHBlY3RzIHRoZSBmb2xsb3dpbmcgdG8gZXhpc3RzIGluIHRoZSB3aW5kb3cgc2NvcGVcbi8vICAgbTNQR0lPXG4vLyAgICAgLSByZWFkQWxsQ29udGFudHNcbi8vICAgICAtIHJlYWRXZWF0aGVyXG4vLyAgICAgLSBkdW1wXG4vLyAgICAgLSByZWFkRnJvbUlucHV0c1xuLy8gU28gd2UgaW5qZWN0IGZ1bmN0aW9ucyB0aGF0IGludGVyYWN0IHcvIG91ciBVSSwgbW9kZWwgaW4gbm8gd2F5IGNhcmVzXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgcmVhZCA6IGZ1bmN0aW9uKG1vZGVsKSB7XG4gICAgdGhpcy5tb2RlbCA9IG1vZGVsO1xuXG4gICAgbW9kZWwuZGVidWcgPSB0cnVlO1xuXG4gICAgaWYoICFtb2RlbC5wbGFudGF0aW9uICkgbW9kZWwucGxhbnRhdGlvbiA9IHt9O1xuICAgIHRoaXMucmVhZEFsbENvbnN0YW50cyhtb2RlbC5wbGFudGF0aW9uKTtcblxuICAgIGlmKCAhbW9kZWwud2VhdGhlciApIG1vZGVsLndlYXRoZXIgPSB7fTtcbiAgICBpZiggIW1vZGVsLm1hbmFnZSApIG1vZGVsLm1hbmFnZSA9IHt9O1xuICAgIGlmKCAhbW9kZWwuY3VzdG9tX3dlYXRoZXIgKSBtb2RlbC5jdXN0b21fd2VhdGhlciA9IHt9O1xuXG4gICAgdGhpcy5yZWFkV2VhdGhlcihtb2RlbC53ZWF0aGVyLCBtb2RlbC5tYW5hZ2UsIG1vZGVsLmN1c3RvbV93ZWF0aGVyKTtcblxuICAgIGRlbGV0ZSB0aGlzLm1vZGVsLm1hbmFnZS5jb3BwaWNlRGF0ZXM7XG4gIH0sXG4gIHJlYWRBbGxDb25zdGFudHMgOiBmdW5jdGlvbihwbGFudGF0aW9uKSB7XG4gICAgICB0aGlzLnJlYWRGcm9tSW5wdXRzKCk7XG5cbiAgICAgIC8vZm9yICggdmFyIGtleSBpbiB0aGlzLm1vZGVsLnBsYW50YXRpb24pIHtcbiAgICAgIC8vICAgIHBsYW50YXRpb25ba2V5XSA9IHRoaXMubW9kZWwucGxhbnRhdGlvbltrZXldO1xuICAgICAgLy99XG5cbiAgICAgIHBsYW50YXRpb24uY29wcGljZWRUcmVlID0gdGhpcy5tb2RlbC50cmVlO1xuXG4gICAgICAvLyBzZXR1cCBzZWVkbGluZyBUcmVlXG4gICAgICAvLyBUT0RPOiBoYXJkY29kZWQgZm9yIG5vdywgdGhpcyBzaG91bGRuJ3QgYmVcbiAgICAgIHBsYW50YXRpb24uc2VlZGxpbmdUcmVlID0gJC5leHRlbmQodHJ1ZSwge30sIHRoaXMubW9kZWwudHJlZSk7XG4gICAgICBwbGFudGF0aW9uLnNlZWRsaW5nVHJlZS5zdGVtc1BlclN0dW1wID0gMTtcbiAgICAgIHBsYW50YXRpb24uc2VlZGxpbmdUcmVlLnBmcy5zdGVtQ250ID0gMTtcbiAgICAgIHBsYW50YXRpb24uc2VlZGxpbmdUcmVlLnJvb3RQID0ge1xuICAgICAgICAgIExBSVRhcmdldCA6IDEwLFxuICAgICAgICAgIGVmZmljaWVuY3kgOiAwLjYsXG4gICAgICAgICAgZnJhYyA6IDAuMDFcbiAgICAgIH07XG4gIH0sXG5cbiAgcmVhZFdlYXRoZXIgOiBmdW5jdGlvbih3ZWF0aGVyTWFwLCBtYW5hZ2UsIGN1c3RvbVdlYXRoZXJNYXApIHtcbiAgICAgIHZhciBkYXRlUGxhbnRlZCA9ICQoXCIjaW5wdXQtbWFuYWdlLWRhdGVQbGFudGVkXCIpLnZhbCgpO1xuICAgICAgaWYgKGRhdGVQbGFudGVkICYmIGRhdGVQbGFudGVkICE9IFwiXCIpIHtcbiAgICAgICAgICBtYW5hZ2UuZGF0ZVBsYW50ZWQgPSBuZXcgRGF0ZSgkKFwiI2lucHV0LW1hbmFnZS1kYXRlUGxhbnRlZFwiKS52YWwoKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgIG1hbmFnZS5kYXRlUGxhbnRlZCA9IG5ldyBEYXRlKCk7XG4gICAgICB9XG5cbiAgICAgIHZhciBkYXRlQ29wcGljZWQgPSAkKFwiI2lucHV0LW1hbmFnZS1kYXRlQ29wcGljZWRcIikudmFsKCk7XG4gICAgICBpZiAoZGF0ZUNvcHBpY2VkICYmIGRhdGVDb3BwaWNlZCAhPSBcIlwiKSB7XG4gICAgICAgICAgbWFuYWdlLmRhdGVDb3BwaWNlZCA9IG5ldyBEYXRlKCQoXCIjaW5wdXQtbWFuYWdlLWRhdGVDb3BwaWNlZFwiKS52YWwoKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgLy8gc2V0IGVycm9yIGNvbmRpdGlvbiA6IFRPRE9cbiAgICAgIH1cblxuICAgICAgdmFyIERhdGVGaW5hbEhhcnZlc3QgPSAkKFwiI2lucHV0LW1hbmFnZS1kYXRlRmluYWxIYXJ2ZXN0XCIpLnZhbCgpO1xuICAgICAgaWYgKERhdGVGaW5hbEhhcnZlc3QgJiYgRGF0ZUZpbmFsSGFydmVzdCAhPSBcIlwiKSB7XG4gICAgICAgICAgbWFuYWdlLkRhdGVGaW5hbEhhcnZlc3QgPSBuZXcgRGF0ZSgkKFwiI2lucHV0LW1hbmFnZS1kYXRlRmluYWxIYXJ2ZXN0XCIpLnZhbCgpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICAvLyBzZXQgZXJyb3IgY29uZGl0aW9uIDogVE9ET1xuICAgICAgfVxuXG4gICAgICB2YXIgeWVhcnNQZXJDb3BwaWNlID0gJChcIiNpbnB1dC1tYW5hZ2UtY29wcGljZUludGVydmFsXCIpLnZhbCgpO1xuICAgICAgaWYgKHllYXJzUGVyQ29wcGljZSAmJiB5ZWFyc1BlckNvcHBpY2UgIT0gXCJcIikge1xuICAgICAgICAgIG1hbmFnZS55ZWFyc1BlckNvcHBpY2UgPSBwYXJzZUludCgkKFwiI2lucHV0LW1hbmFnZS1jb3BwaWNlSW50ZXJ2YWxcIikudmFsKCkpO1xuICAgICAgfVxuXG5cbiAgICAgIGZvciAoIHZhciBpID0gMDsgaSA8IDEyOyBpKyspIHtcbiAgICAgICAgICB2YXIgaXRlbSA9IHtcbiAgICAgICAgICAgICAgbW9udGggOiAoaSArIDEpXG4gICAgICAgICAgfTtcbiAgICAgICAgICB2YXIgbSA9IChpKzEpKycnO1xuICAgICAgICAgIGlmKCBtLmxlbmd0aCA9PT0gMSApIG0gPSAnMCcrbTtcblxuICAgICAgICAgIGZvciAoIHZhciBqID0gMTsgaiA8IGNvbmZpZy5pbnB1dHMud2VhdGhlci5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICB2YXIgYyA9IGNvbmZpZy5pbnB1dHMud2VhdGhlcltqXTtcbiAgICAgICAgICAgICAgaXRlbVtjXSA9IHRoaXMuX3JlYWRWYWwoJChcIiNpbnB1dC13ZWF0aGVyLVwiICsgYyArIFwiLVwiICsgbSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpdGVtLm5yZWwgPSBpdGVtLnJhZCAvIDAuMDAzNjtcblxuICAgICAgICAgIHdlYXRoZXJNYXBbbV0gPSBpdGVtO1xuICAgICAgfVxuXG4gICAgICBpZiggdGhpcy5tb2RlbC5jdXN0b21fd2VhdGhlciApIHtcbiAgICAgICAgICBmb3IoIHZhciBkYXRlIGluIHRoaXMubW9kZWwuY3VzdG9tX3dlYXRoZXIgKSB7XG4gICAgICAgICAgICAgIHRoaXMubW9kZWwuY3VzdG9tX3dlYXRoZXJbZGF0ZV0ubnJlbCA9IHRoaXMubW9kZWwuY3VzdG9tX3dlYXRoZXJbZGF0ZV0ucmFkIC8gMC4wMDM2O1xuICAgICAgICAgICAgICAvL2N1c3RvbVdlYXRoZXJNYXBbZGF0ZV0gPSBjdXN0b21fd2VhdGhlcltkYXRlXTtcbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gd2VhdGhlck1hcDtcbiAgfSxcblxuICAvLyByZWFkIGEgdmFsdWUgZnJvbSB0aGUgaW5wdXRcbiAgLy8gaXQgaGFzIGEgJywnIGlzIHNldCBmb3IgdmFyaWF0aW9uXG4gIF9yZWFkVmFsIDogZnVuY3Rpb24oZWxlKSB7XG4gICAgICB2YXIgdmFsID0gZWxlLnZhbCgpO1xuICAgICAgaWYoIHZhbC5tYXRjaCgvXFxkKi1cXGQqLVxcZCokLykgKSB7XG4gICAgICAgICAgcmV0dXJuIHZhbDtcbiAgICAgIH0gZWxzZSBpZiggdmFsLm1hdGNoKC8uKiwuKi8pICkge1xuICAgICAgICAgIHZhbCA9IHZhbC5yZXBsYWNlKC9cXHMvZywnJykuc3BsaXQoXCIsXCIpO1xuICAgICAgICAgIHZhciBpZCA9IGVsZS5hdHRyKFwiaWRcIikucmVwbGFjZSgvXmlucHV0LS8sJycpLnJlcGxhY2UoLy0vZywnLicpO1xuICAgICAgICAgIHRoaXMubW9kZWwudmFyaWF0aW9uc1tpZF0gPSBbXTtcbiAgICAgICAgICBmb3IoIHZhciBpID0gMDsgaSA8IHZhbC5sZW5ndGg7IGkrKyApIHtcbiAgICAgICAgICAgICAgdGhpcy5tb2RlbC52YXJpYXRpb25zW2lkXS5wdXNoKHBhcnNlRmxvYXQodmFsW2ldKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0aGlzLm1vZGVsLnZhcmlhdGlvbnNbaWRdWzBdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHBhcnNlRmxvYXQodmFsKTtcbiAgfSxcblxuICBkdW1wIDogZnVuY3Rpb24oZGF0YSkge1xuICAgIC8vIHNob3VsZCBiZSBvdmVyd3JpdHRlbiBpbiBhcHBcbiAgfSxcblxuICByZWFkRnJvbUlucHV0cyA6IGZ1bmN0aW9uKCkge1xuICAgICAgLy8gcmVhZCBzb2lsXG4gICAgICB0aGlzLm1vZGVsLnNvaWwgPSB7fTtcbiAgICAgIHRoaXMubW9kZWwuc29pbC5tYXhBV1MgPSB0aGlzLl9yZWFkVmFsKCQoXCIjaW5wdXQtc29pbC1tYXhBV1NcIikpO1xuICAgICAgdGhpcy5tb2RlbC5zb2lsLnN3cG93ZXIgPSB0aGlzLl9yZWFkVmFsKCQoXCIjaW5wdXQtc29pbC1zd3Bvd2VyXCIpKTtcbiAgICAgIHRoaXMubW9kZWwuc29pbC5zd2NvbnN0ID0gdGhpcy5fcmVhZFZhbCgkKFwiI2lucHV0LXNvaWwtc3djb25zdFwiKSk7XG5cbiAgICAgIHRoaXMubW9kZWwuc2V0dXAgPSB7XG4gICAgICAgIGRheXNfaW5faW50ZXJ2YWwgOiB0aGlzLl9yZWFkVmFsKCQoXCIjaW5wdXQtc2V0dXAtZGF5c19pbl9pbnRlcnZhbFwiKSlcbiAgICAgIH07XG5cbiAgICAgIC8vIHJlYWQgbWFuYWdlXG4gICAgICB0aGlzLm1vZGVsLm1hbmFnZSA9IHtcbiAgICAgICAgICBjb3BwaWNlIDogZmFsc2VcbiAgICAgIH07XG4gICAgICB2YXIgZWxlcyA9ICQoXCIubWFuYWdlXCIpO1xuICAgICAgZm9yICggdmFyIGkgPSAwOyBpIDwgZWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHZhciBlbGUgPSAkKGVsZXNbaV0pO1xuICAgICAgICAgIHRoaXMubW9kZWwubWFuYWdlW2VsZS5hdHRyKFwiaWRcIikucmVwbGFjZShcImlucHV0LW1hbmFnZS1cIiwgXCJcIildID0gdGhpcy5fcmVhZFZhbChlbGUpO1xuICAgICAgfVxuXG4gICAgICAvLyByZWFkIHBsYW50YXRpb25cbiAgICAgIGlmKCAhdGhpcy5tb2RlbC5wbGFudGF0aW9uICkgdGhpcy5tb2RlbC5wbGFudGF0aW9uID0ge307XG4gICAgICBlbGVzID0gJChcIi5wbGFudGF0aW9uXCIpO1xuICAgICAgZm9yICggdmFyIGkgPSAwOyBpIDwgZWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHZhciBlbGUgPSAkKGVsZXNbaV0pO1xuICAgICAgICAgIHRoaXMubW9kZWwucGxhbnRhdGlvbltlbGUuYXR0cihcImlkXCIpLnJlcGxhY2UoXCJpbnB1dC1wbGFudGF0aW9uLVwiLCBcIlwiKV0gPSB0aGlzLl9yZWFkVmFsKGVsZSk7XG4gICAgICB9XG5cbiAgICAgIC8vIHJlYWQgdHJlZVxuICAgICAgdmFyIHRyZWVJbnB1dHMgPSAkKFwiLnRyZWVcIik7XG4gICAgICB0aGlzLm1vZGVsLnRyZWUgPSB7fTtcbiAgICAgIGZvciAoIHZhciBpID0gMDsgaSA8IHRyZWVJbnB1dHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB2YXIgZWxlID0gJCh0cmVlSW5wdXRzW2ldKTtcblxuICAgICAgICAgIHZhciBwYXJ0cyA9IGVsZS5hdHRyKFwiaWRcIikucmVwbGFjZShcImlucHV0LXRyZWUtXCIsIFwiXCIpLnNwbGl0KFwiLVwiKTtcbiAgICAgICAgICBpZiAocGFydHMubGVuZ3RoID09IDEpIHtcbiAgICAgICAgICAgICAgdGhpcy5tb2RlbC50cmVlW3BhcnRzWzBdXSA9IHRoaXMuX3JlYWRWYWwoZWxlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBpZiAoIXRoaXMubW9kZWwudHJlZVtwYXJ0c1swXV0pXG4gICAgICAgICAgICAgICAgICB0aGlzLm1vZGVsLnRyZWVbcGFydHNbMF1dID0ge307XG4gICAgICAgICAgICAgIHRoaXMubW9kZWwudHJlZVtwYXJ0c1swXV1bcGFydHNbMV1dID0gdGhpcy5fcmVhZFZhbChlbGUpO1xuICAgICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gcmVhZCBwbGFudGF0aW9uIHN0YXRlXG4gICAgICBpZiggIXRoaXMubW9kZWwucGxhbnRhdGlvbl9zdGF0ZSApIHRoaXMubW9kZWwucGxhbnRhdGlvbl9zdGF0ZSA9IHt9O1xuICAgICAgZm9yICggdmFyIGtleSBpbiB0aGlzLm1vZGVsLmdldERhdGFNb2RlbCgpLnBsYW50YXRpb25fc3RhdGUudmFsdWUgKSB7XG4gICAgICAgICAgdGhpcy5tb2RlbC5wbGFudGF0aW9uX3N0YXRlW2tleV0gPSAtMTtcbiAgICAgIH1cblxuICB9LFxuXG4gIC8vIHRoaXMgaXMgdGhlIHNuYXBzaG90IHdlIHNhdmUgdG8gZ29vZ2xlIGRyaXZlXG4gIGV4cG9ydFNldHVwIDogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLm1vZGVsLnZhcmlhdGlvbnMgPSB7fTtcbiAgICAgIHRoaXMucmVhZEZyb21JbnB1dHMoKTtcbiAgICAgIHRoaXMucmVhZFdlYXRoZXIoW10sIHt9LCB7fSk7XG5cbiAgICAgIHZhciBleCA9IHtcbiAgICAgICAgICB3ZWF0aGVyIDogdGhpcy5tb2RlbC53ZWF0aGVyLFxuICAgICAgICAgIGN1c3RvbV93ZWF0aGVyIDogdGhpcy5tb2RlbC5jdXN0b21fd2VhdGhlcixcbiAgICAgICAgICBzZXR1cCA6IHRoaXMubW9kZWwuc2V0dXAsXG4gICAgICAgICAgdHJlZSA6IHRoaXMubW9kZWwudHJlZSxcbiAgICAgICAgICBwbGFudGF0aW9uIDogdGhpcy5tb2RlbC5wbGFudGF0aW9uLFxuICAgICAgICAgIG1hbmFnZSA6IHRoaXMubW9kZWwubWFuYWdlLFxuICAgICAgICAgIHNvaWwgOiB0aGlzLm1vZGVsLnNvaWwsXG4gICAgICAgICAgbWFuYWdlIDogdGhpcy5tb2RlbC5tYW5hZ2UsXG4gICAgICAgICAgcGxhbnRhdGlvbl9zdGF0ZSA6IHRoaXMubW9kZWwucGxhbnRhdGlvbl9zdGF0ZSxcbiAgICAgICAgICBjb25maWcgOiB7XG4gICAgICAgICAgICAgIGNoYXJ0VHlwZUlucHV0IDogJChcIiNjaGFydFR5cGVJbnB1dFwiKS52YWwoKSxcbiAgICAgICAgICAgICAgZGF5c1RvUnVuIDogdGhpcy5hcHAuZGF5c1RvUnVuKCksXG4gICAgICAgICAgICAgIGN1cnJlbnRMb2NhdGlvbiA6ICQoXCIjY3VycmVudC1sb2NhdGlvblwiKS5odG1sKCksXG4gICAgICAgICAgICAgIGxvYWRlZFRyZWUgOiAkKFwiI2xvYWRlZC10cmVlLW5hbWVcIikuaHRtbCgpLFxuICAgICAgICAgICAgICB2ZXJzaW9uIDogdGhpcy5hcHAucXMoXCJ2ZXJzaW9uXCIpID8gdGhpcy5hcHAucXMoXCJ2ZXJzaW9uXCIpIDogXCJtYXN0ZXJcIlxuICAgICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gYnkgZGVmYXVsdCB0aGUgcmVhZCBmdW5jdGlvbiBzZXQgdGhlIHZhcmlhdGlvbnMgdmFyaWFibGVzIGJ1dCBvbmx5XG4gICAgICAvLyByZXR1cm5zIHRoZSBmaXJzdCwgc2V0IHRoZSB2YXJpYXRpb24gcGFyYW1zIHRvIHRoZWlyIGNvcnJlY3QgdmFsdWVzXG4gICAgICBmb3IoIHZhciBrZXkgaW4gdGhpcy5tb2RlbC52YXJpYXRpb25zICkge1xuICAgICAgICAgIHZhciBwYXJ0cyA9IGtleS5zcGxpdChcIi5cIik7XG4gICAgICAgICAgdmFyIHBhcmFtID0gZXg7XG4gICAgICAgICAgZm9yKCB2YXIgaSA9IDA7IGkgPCBwYXJ0cy5sZW5ndGgtMTsgaSsrICkge1xuICAgICAgICAgICAgICBwYXJhbSA9IHBhcmFtW3BhcnRzW2ldXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcGFyYW1bcGFydHNbcGFydHMubGVuZ3RoLTFdXSA9IHRoaXMubW9kZWwudmFyaWF0aW9uc1trZXldLmpvaW4oXCIsIFwiKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGV4O1xuICB9LFxuICBsb2FkVHJlZSA6IGZ1bmN0aW9uKHRyZWUpIHtcbiAgICAgIGZvciAoIHZhciByb290S2V5IGluIHRyZWUpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIHRyZWVbcm9vdEtleV0gIT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgJChcIiNpbnB1dC10cmVlLVwiICsgcm9vdEtleSkudmFsKHRyZWVbcm9vdEtleV0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGZvciAoIHZhciBjaGlsZEtleSBpbiB0cmVlW3Jvb3RLZXldKSB7XG4gICAgICAgICAgICAgICAgICAkKFwiI2lucHV0LXRyZWUtXCIgKyByb290S2V5ICsgXCItXCIgKyBjaGlsZEtleSkudmFsKHRyZWVbcm9vdEtleV1bY2hpbGRLZXldKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgIH1cbiAgfSxcbiAgbG9hZFNldHVwIDogZnVuY3Rpb24oZmlsZWlkLCBzZXR1cCwgaXNSdCkge1xuXG4gICAgICAvLyBsb2FkIGNvbmZpZ1xuICAgICAgaWYgKHNldHVwLmNvbmZpZy5jaGFydFR5cGVJbnB1dCkge1xuICAgICAgICAgIHRoaXMuY2hhcnRzLnVuc2VsZWN0QWxsKCk7XG4gICAgICAgICAgZm9yICggdmFyIGkgPSAwOyBpIDwgc2V0dXAuY29uZmlnLmNoYXJ0VHlwZUlucHV0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgIHRoaXMuY2hhcnRzLnNlbGVjdChzZXR1cC5jb25maWcuY2hhcnRUeXBlSW5wdXRbaV0pO1xuICAgICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzZXR1cC5jb25maWcuY3VycmVudExvY2F0aW9uKSB7XG4gICAgICAgICAgJChcIiNjdXJyZW50LWxvY2F0aW9uXCIpLmh0bWwoc2V0dXAuY29uZmlnLmN1cnJlbnRMb2NhdGlvbik7XG4gICAgICB9XG4gICAgICBpZiggc2V0dXAuY29uZmlnLmxvYWRlZFRyZWUgKSB7XG4gICAgICAgICAgJChcIiNsb2FkZWQtdHJlZS1uYW1lXCIpLmh0bWwoc2V0dXAuY29uZmlnLmxvYWRlZFRyZWUpLnBhcmVudCgpLnNob3coKTtcbiAgICAgIH1cblxuICAgICAgaWYoIHNldHVwLnNldHVwICYmIHNldHVwLnNldHVwLmRheXNfaW5faW50ZXJ2YWwgKSB7XG4gICAgICAgICQoJyNpbnB1dC1zZXR1cC1kYXlzX2luX2ludGVydmFsJykudmFsKHNldHVwLnNldHVwLmRheXNfaW5faW50ZXJ2YWwpO1xuICAgICAgfVxuXG4gICAgICAvLyBsb2FkIHdlYXRoZXJcbiAgICAgIGlmKCBBcnJheS5pc0FycmF5KHNldHVwLndlYXRoZXIpICkge1xuICAgICAgICBmb3IgKCB2YXIgaSA9IDA7IGkgPCBzZXR1cC53ZWF0aGVyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBmb3IgKCB2YXIga2V5IGluIHNldHVwLndlYXRoZXJbaV0pIHtcbiAgICAgICAgICAgICAgICBpZiAoa2V5ID09ICdtb250aCcpXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGlmIChzZXR1cC53ZWF0aGVyW2ldW2tleV0gIT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAgJChcIiNpbnB1dC13ZWF0aGVyLVwiICsga2V5ICsgXCItXCIgKyBpKS52YWwoc2V0dXAud2VhdGhlcltpXVtrZXldKVxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgJChcIiNpbnB1dC13ZWF0aGVyLVwiICsga2V5ICsgXCItXCIgKyBpKS52YWwoXCJcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBpbmNJbmRleCA9IGZhbHNlLCBpbmRleDtcbiAgICAgICAgaWYoIHNldHVwLndlYXRoZXJbMF0gIT09IHVuZGVmaW5lZCB8fCBzZXR1cC53ZWF0aGVyWycwJ10gIT09IHVuZGVmaW5lZCApIHtcbiAgICAgICAgICBpbmNJbmRleCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKCB2YXIgaSBpbiBzZXR1cC53ZWF0aGVyICkge1xuICAgICAgICAgICAgZm9yICggdmFyIGtleSBpbiBzZXR1cC53ZWF0aGVyW2ldKSB7XG4gICAgICAgICAgICAgICAgaWYgKGtleSA9PSAnbW9udGgnKSBjb250aW51ZTtcblxuXG4gICAgICAgICAgICAgICAgaWYoIGluY0luZGV4ICkgaW5kZXggPSAocGFyc2VJbnQoaSkrMSkrJyc7XG4gICAgICAgICAgICAgICAgZWxzZSBpbmRleCA9IGkrJyc7XG5cbiAgICAgICAgICAgICAgICBpZiggaW5kZXgubGVuZ3RoID09PSAxICkgaW5kZXggPSAnMCcraW5kZXg7XG5cbiAgICAgICAgICAgICAgICBpZiAoc2V0dXAud2VhdGhlcltpXVtrZXldICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICQoXCIjaW5wdXQtd2VhdGhlci1cIiArIGtleSArIFwiLVwiICsgaW5kZXgpLnZhbChzZXR1cC53ZWF0aGVyW2ldW2tleV0pXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgJChcIiNpbnB1dC13ZWF0aGVyLVwiICsga2V5ICsgXCItXCIgKyBpbmRleCkudmFsKFwiXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiggc2V0dXAuY3VzdG9tX3dlYXRoZXIgKSB7XG4gICAgICAgICAgdGhpcy5tb2RlbC5jdXN0b21fd2VhdGhlciA9IHNldHVwLmN1c3RvbV93ZWF0aGVyO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLm1vZGVsLmN1c3RvbV93ZWF0aGVyID0ge307XG4gICAgICB9XG5cbiAgICAgIC8vIGNyZWF0ZSB0aGUgY2hhcnRcbiAgICAgIHRoaXMuaW5wdXRGb3JtLnVwZGF0ZUF2ZXJhZ2VDaGFydCgpO1xuXG4gICAgICAvLyBsb2FkIHRyZWVcbiAgICAgIHRoaXMubG9hZFRyZWUoc2V0dXAudHJlZSk7XG5cbiAgICAgIC8vIGxvYWQgcGxhbnRpbmcgcGFyYW1zXG4gICAgICAvLyBOb3cgcGFydCBvZiBtYW5hZ2UuLi4uXG4gICAgICAvLyBmb1xuICAgICAgaWYgKHNldHVwLm1hbmFnZSkge1xuICAgICAgICAgIHZhciBtYXAgPSB7XG4gICAgICAgICAgICAgIFwiZGF0ZVBsYW50ZWRcIiA6IFwiRGF0ZVBsYW50ZWRcIixcbiAgICAgICAgICAgICAgXCJkYXRlQ29wcGljZWRcIiA6IFwiRGF0ZUNvcHBpY2VkXCIsXG4gICAgICAgICAgICAgIFwieWVhcnNQZXJDb3BwaWNlXCIgOiBcIkNvcHBpY2VJbnRlcnZhbFwiXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZm9yICggdmFyIGtleSBpbiBzZXR1cC5tYW5hZ2UpIHtcbiAgICAgICAgICAgICAgdmFyIG5ld0tleSA9IGtleTtcbiAgICAgICAgICAgICAgaWYoIG1hcFtrZXldICkgbmV3S2V5ID0gbWFwW2tleV07XG5cbiAgICAgICAgICAgICAgaWYgKHR5cGVvZiBzZXR1cC5tYW5hZ2Vba2V5XSA9PSAnc3RyaW5nJylcbiAgICAgICAgICAgICAgICAgICQoXCIjaW5wdXQtbWFuYWdlLVwiICsgbmV3S2V5KS52YWwoc2V0dXAubWFuYWdlW2tleV0ucmVwbGFjZSgvVC4qLywgJycpKTtcbiAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgJChcIiNpbnB1dC1tYW5hZ2UtXCIgKyBuZXdLZXkpLnZhbChzZXR1cC5tYW5hZ2Vba2V5XSk7XG4gICAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyB0aGlzIHZhbHVlIGlzIGRlcHJlY2F0ZWQsIHNldCB0byBuZXcgaW5wdXRcbiAgICAgIGlmKCBzZXR1cC5jb25maWcuZGF5c1RvUnVuICkge1xuICAgICAgICAgIHZhciBkID0gbmV3IERhdGUoc2V0dXAubWFuYWdlLmRhdGVQbGFudGVkIHx8IHNldHVwLm1hbmFnZS5EYXRlUGxhbnRlZCk7XG4gICAgICAgICAgZCA9IG5ldyBEYXRlKG5ldyBEYXRlKGQpLnNldE1vbnRoKGQuZ2V0TW9udGgoKStwYXJzZUludChzZXR1cC5jb25maWcuZGF5c1RvUnVuKSkpO1xuICAgICAgICAgICQoXCIjaW5wdXQtbWFuYWdlLWRhdGVGaW5hbEhhcnZlc3RcIikudmFsKGQudG9JU09TdHJpbmcoKS5yZXBsYWNlKC9ULiovLCAnJykpO1xuICAgICAgfVxuXG5cbiAgICAgIC8vIGxvYWQgcmVzdFxuICAgICAgdmFyIGlucHV0cyA9IFsgXCJwbGFudGF0aW9uXCIsIFwic29pbFwiLCBcIm1hbmFnZVwiIF07XG4gICAgICBmb3IgKCB2YXIgaSA9IDA7IGkgPCBpbnB1dHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBmb3IgKCB2YXIga2V5IGluIHNldHVwW2lucHV0c1tpXV0pIHtcbiAgICAgICAgICAgICAgaWYgKGtleSA9PSAnbWF4QVdTJykge1xuICAgICAgICAgICAgICAgICAgJChcIiNpbnB1dC1zb2lsLW1heEFXU1wiKS52YWwoc2V0dXAuc29pbC5tYXhBV1MpO1xuICAgICAgICAgICAgICB9IGVsc2UgaWYgKCB0eXBlb2Ygc2V0dXBbaW5wdXRzW2ldXVtrZXldID09ICdzdHJpbmcnICYmIHNldHVwW2lucHV0c1tpXV1ba2V5XS5tYXRjaCgvLipULipaJC8pICkge1xuICAgICAgICAgICAgICAgICAgJChcIiNpbnB1dC1cIiArIGlucHV0c1tpXSArIFwiLVwiICsga2V5KS52YWwoc2V0dXBbaW5wdXRzW2ldXVtrZXldLnJlcGxhY2UoL1QuKi8sICcnKSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAkKFwiI2lucHV0LVwiICsgaW5wdXRzW2ldICsgXCItXCIgKyBrZXkpLnZhbChzZXR1cFtpbnB1dHNbaV1dW2tleV0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy5hcHAucnVuTW9kZWwoaXNSdCk7XG4gIH1cbn07XG4iLCJcbiAgLy8gbXVzdCBpbnN0YWxsIHRoaXMgZm9yIG5hdGl2ZSBwaG9uZWdhcCBzdXBwb3J0OlxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vcGhvbmVnYXAtYnVpbGQvQ2hpbGRCcm93c2VyXG5cbnZhciB3aW4gPSBudWxsO1xuXG4vKiB0aGUga2V5IGZvciByZWZyZXNoIFRva2VuIGluIGxvY2FsIFN0b3JhZ2UgKi9cbnZhciB0b2tlbktleSA9ICdyZWZyZXNoX3Rva2VuJztcblxuLyogc3RvcmVzIHRoZSBhY2Nlc3NUb2tlbiBhZnRlciByZXRyaWV2YWwgZnJvbSBnb29nbGUgc2VydmVyICovXG52YXIgYWNjZXNzVG9rZW4gPSBudWxsO1xuXG4vKiBzdG9yZXMgdGhlIFRpbWUgd2hlbiBhY2Nlc3MgdG9rZW4gd2FzIGxhc3QgcmVjZWl2ZWQgZnJvbSBzZXJ2ZXIgKi9cbnZhciBhY2Nlc3NUb2tlblRpbWUgPSBudWxsO1xuXG4vKiBzdG9yZXMgYWNjZXNzIFRva2VuJ3MgRXhwaXJ5IExpbWl0LiBVc2VzIDU4IG1pbi4gaW5zdGVhZCBvZiA2MCBtaW4uICovXG52YXIgYWNjZXNzVG9rZW5FeHBpcnlMaW1pdCA9IDU4ICogNjAgKiAxMDAwO1xuXG4vKiBBIHRlbXBvcmFyeSB2YXJpYWJsZSBzdG9yaW5nIGNhbGxiYWNrIGZ1bmN0aW9uICovXG52YXIgY2FsbGJhY2tGdW5jID0gZmFsc2U7XG5cbi8vIGFyZSB3ZSBydW5uaW5nIG5hdGl2ZSBvciBicm93c2VyIG1vZGU/XG52YXIgaXNOYXRpdmUgPSB3aW5kb3cubG9jYXRpb24uaHJlZi5tYXRjaCgvXmZpbGUuKi8pID8gdHJ1ZSA6IGZhbHNlO1xuXG52YXIgQ0xJRU5UX0lEID0gaXNOYXRpdmUgP1xuICAgICAgICBcIjM0NDE5MDcxMzQ2NS1kaWltdGZlcmg0dGpiMDMxNjlia2w5bWtvcXZxMnJ1OS5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbVwiIDpcbiAgICAgICAgIFwiMzQ0MTkwNzEzNDY1LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tXCI7XG5cbnZhciBBUFBfSUQgPSBcIjM0NDE5MDcxMzQ2NVwiO1xuXG52YXIgT0FVVEhfU0NPUEVTID0gJ2h0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2F1dGgvZHJpdmUuZmlsZSAnXG4gICsgJ2h0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2F1dGgvZHJpdmUuaW5zdGFsbCAnXG4gICsgJ2h0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2F1dGgvdXNlcmluZm8ucHJvZmlsZSc7XG5cbi8qIGNvbmZpZyB2YWx1ZXMgZm9yIEdvb2dsZSBBUEkgKGdhcGkpICovXG52YXIgZ2FwaUNvbmZpZyA9IHtcbiAgZW5kcG9pbnQ6IFwiaHR0cHM6Ly9hY2NvdW50cy5nb29nbGUuY29tL28vb2F1dGgyL2F1dGhcIixcbiAgZW5kdG9rZW46IFwiaHR0cHM6Ly9hY2NvdW50cy5nb29nbGUuY29tL28vb2F1dGgyL3Rva2VuXCIsIC8vIHRva2VuIGVuZHBvaW50XG4gIHJlZGlyZWN0X3VyaSA6IFwiaHR0cDovL2xvY2FsaG9zdFwiLFxuICBjbGllbnRfc2VjcmV0IDogJzZyT1E5bDBmeW5oMTM3TVJYR0stR19aZycsXG4gIHJlc3BvbnNlX3R5cGUgOiBcImNvZGVcIixcbiAgY2xpZW50X2lkIDogQ0xJRU5UX0lELFxuICBzdGF0ZSA6IFwiZ2RyaXZlaW5pdFwiLFxuICBhY2Nlc3NfdHlwZSA6IFwib2ZmbGluZVwiLFxuICBzY29wZSA6IE9BVVRIX1NDT1BFUyxcblxuICAvKiBBcyBkZWZpbmVkIGluIHRoZSBPQXV0aCAyLjAgc3BlY2lmaWNhdGlvbiwgdGhpcyBmaWVsZCBtdXN0IGNvbnRhaW4gYSB2YWx1ZVxuICAgICAqIG9mIFwiYXV0aG9yaXphdGlvbl9jb2RlXCIgb3IgXCJyZWZyZXNoX3Rva2VuXCIgKi9cbiAgICBncmFudFR5cGVzOiB7IEFVVEhPUklaRTogXCJhdXRob3JpemF0aW9uX2NvZGVcIiwgUkVGUkVTSDogXCJyZWZyZXNoX3Rva2VuXCIgfSxcbiB9O1xuXG4vKipcbiAqIEVudW0gZm9yIFN0YXR1cyB2YWx1ZXNcbiAqXG4gKiBAZW51bSB7bnVtYmVyfVxuICpcbiAqIFNVQ0NFU1MgLSBTdWNjZXNzZnVsbHkgZGF0YSByZWNlaXZlZCBmcm9tIHNlcnZlclxuICogRVJST1IgLSBFcnJvciBvY2N1cnJlZCB3aGVuIHRyeWluZyB0byByZWNlaXZlIGZyb20gc2VydmVyXG4gKiBOT1RfREVURVJNSU5FRCAtIHVuZGV0ZXJtaW5lZFxuICovXG52YXIgc3RhdHVzID0ge1xuICAgICAgICBTVUNFU1M6IDEsXG4gICAgICAgIEVSUk9SOiAtMSxcbiAgICAgICAgTk9UX0RFVEVSTUlORUQ6IDBcbn1cblxucmVxdWVzdFN0YXR1cyA9IDA7XG5cbi8qIHN0b3JlcyB0aGUgYXV0aG9yaXphdGlvbiBDb2RlIGludGVybmFsbHkgKi9cbmF1dGhDb2RlID0gZmFsc2U7XG5cbi8qIHN0b3JlcyB0aGUgZXJyb3IgbWVzc2FnZSB3aGVuIGFuIGVycm9yIGhhcHBlbnMgZnJvbSBnb29nbGUgc2VydmVyICovXG5lcnJvck1lc3NhZ2UgPSBmYWxzZTtcblxudmFyIGxvZyA9IGZ1bmN0aW9uKG1zZykge1xuICBjb25zb2xlLmxvZyhcIioqKk9BVVRIKioqOiBcIittc2cpO1xufVxuXG4vKipcbiAqIEF0dGVtcHRzIHRvIGF1dGhvcml6ZSB1c2VyIHVzaW5nIE9BdXRoXG4gKiBPcGVucyB1cCBBbm90aGVyIHdpbmRvdyB3aGVyZSB1c2VyIGFsbG93cyBhY2Nlc3Mgb3IgZGVuaWVzIGl0LlxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxCYWNrICAgQSBjYWxsYmFjayBmdW5jdGlvbiB3aGljaCBpcyBpbnZva2VkXG4gKi9cbnZhciBhdXRob3JpemUgPSBmdW5jdGlvbihjYWxsQmFjaykge1xuICBsb2coXCJhdHRlbXB0aW5nIHRvIGF1dGhvcml6ZVwiKTtcblxuICAgIHZhciBhdXRoVXJpID0gZ2FwaUNvbmZpZy5lbmRwb2ludCArICc/J1xuICAgICsgJ3Njb3BlPScgKyBlbmNvZGVVUklDb21wb25lbnQoZ2FwaUNvbmZpZy5zY29wZSlcbiAgICArICcmJyArICdyZWRpcmVjdF91cmk9JyArIGVuY29kZVVSSUNvbXBvbmVudChnYXBpQ29uZmlnLnJlZGlyZWN0X3VyaSlcbiAgICArICcmJyArICdyZXNwb25zZV90eXBlPScgKyBlbmNvZGVVUklDb21wb25lbnQoZ2FwaUNvbmZpZy5yZXNwb25zZV90eXBlKVxuICAgICsgJyYnICsgJ2NsaWVudF9pZD0nICsgZW5jb2RlVVJJQ29tcG9uZW50KGdhcGlDb25maWcuY2xpZW50X2lkKTtcbiAgICAvLysgJyYnICsgJ3N0YXRlPScgKyBlbmNvZGVVUklDb21wb25lbnQoZ2FwaUNvbmZpZy5zdGF0ZSlcbiAgICAvLysgJyYnICsgJ2FjY2Vzc190eXBlPScgKyBlbmNvZGVVUklDb21wb25lbnQoZ2FwaUNvbmZpZy5hY2Nlc3NfdHlwZSlcbiAgICAvLysgJyYnICsgJ2FwcHJvdmFsX3Byb21wdD1mb3JjZSc7IC8vIEBUT0RPIC0gY2hlY2sgaWYgd2UgcmVhbGx5IG5lZWQgdGhpcyBwYXJhbVxuXG4gICAgY2FsbGJhY2tGdW5jID0gY2FsbEJhY2s7XG4gICAgcmVxdWVzdFN0YXR1cyA9IHN0YXR1cy5OT1RfREVURVJNSU5FRDtcblxuXG5cblxuICAgIGxvZyhcIm9wZW5pbmcgSW5BcHBCcm93c2VyXCIpO1xuXG4gICAgdHJ5IHtcblxuICAgICAgLy8gTm93IG9wZW4gbmV3IGJyb3dzZXJcbiAgICAgIHdpbiA9IHdpbmRvdy5vcGVuKGF1dGhVcmksICdfYmxhbmsnLCAnbG9jYXRpb249bm8sdG9vbGJhcj1ubycpO1xuXG4gICAgICAkKHdpbikub24oJ2xvYWRzdGFydCcsZnVuY3Rpb24oZSl7XG4gICAgICAgIGxvZyhcIkluQXBwQnJvd3NlciBsb2Fkc3RhcnRcIik7XG4gICAgICAgIGNvbnNvbGUubG9nKGUub3JpZ2luYWxFdmVudC51cmwpO1xuICAgICAgICBvbkF1dGhVcmxDaGFuZ2UoZS5vcmlnaW5hbEV2ZW50LnVybCk7XG4gICAgICB9KTtcblxuICAgICAgLy93aW5kb3cucGx1Z2lucy5jaGlsZEJyb3dzZXIuc2hvd1dlYlBhZ2UoYXV0aFVyaSwge3Nob3dMb2NhdGlvbkJhciA6IHRydWV9KTtcbiAgICAgIC8vd2luZG93LnBsdWdpbnMuY2hpbGRCcm93c2VyLm9uQ2xvc2UgPSBvbkF1dGhDbG9zZTtcbiAgICAgIC8vd2luZG93LnBsdWdpbnMuY2hpbGRCcm93c2VyLm9uTG9jYXRpb25DaGFuZ2UgPSBvbkF1dGhVcmxDaGFuZ2U7XG4gICAgfSBjYXRjaChlKSB7XG4gICAgICBsb2coXCJFcnJvciBvcGVuaW5nIEluQXBwQnJvd3NlclwiKTtcbiAgICAgIGxvZyhlKTtcbiAgICB9XG5cbn07XG5cbmlmKCAhaXNOYXRpdmUgKSB7XG4gIGF1dGhvcml6ZSA9IGZ1bmN0aW9uKGNhbGxiYWNrLCBpbW1lZGlhdGUpIHtcbiAgZ2FwaS5hdXRoLmF1dGhvcml6ZSh7XG4gICAgY2xpZW50X2lkIDogQ0xJRU5UX0lELFxuICAgIHNjb3BlIDogT0FVVEhfU0NPUEVTLFxuICAgIGltbWVkaWF0ZSA6IGltbWVkaWF0ZVxuICB9LCBmdW5jdGlvbigpIHtcbiAgICBhdXRoQ29kZSA9IGdhcGkuYXV0aC5nZXRUb2tlbigpO1xuICAgIGNhbGxiYWNrKGF1dGhDb2RlKTtcbiAgfSk7XG5cbiAgfVxufVxuXG4vKiBBdXRoIFdpbmRvdyBjbG9zZWQgKi9cbnZhciBvbkF1dGhDbG9zZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAvL2NvbnNvbGUubG9nKFwiQXV0aCB3aW5kb3cgY2xvc2VkXCIpO1xufTtcblxuLyogT0F1dGggU3VjY2Vzc2Z1bGx5IGRvbmUgKi9cbnZhciBvbkF1dGhTdWNjZXNzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vY29uc29sZS5sb2coJ0F1dGggU3VjY2Vzcz8nKTtcbn07XG5cbi8qKlxuICogR2V0cyBJbnZva2VkIHdoZW4gdGhlIFVSTCBjaGFuZ2VzIG9uIE9BdXRoIGF1dGhvcml6YXRpb24gcHJvY2Vzc1xuICpcbiAqIFN1Y2Nlc3MgVVJMIFBhdHRlcm46XG4gKiBcInJlZGlyZWN0X3VyaVwiICsgXCI/Y29kZT1cIiBbc2VjcmV0IGNvZGUgdmFsXVxuICpcbiAqIFN1Y2Nlc3MgU2FtcGxlIFVSTDpcbiAqIGh0dHA6Ly9sb2NhbGhvc3QvP2NvZGU9NC9XT3BSTFFmdnZoSEUwdHVNVUREcW5uNzZsQ1RULjhuWEM0SWViTUVBVXVKSlZuTDQ5Q2M4QVFHcjhjUUlcbiAqXG4gKiBEZW5pZWQgQWNjZXNzIFVSTCBQYXR0ZXJuOiBcInJlZGlyZWN0X3VyaVwiICsgP2Vycm9yPWFjY2Vzc19kZW5pZWRcbiAqIERlbmllZCBBY2Nlc3MgU2FtcGxlOiBodHRwOi8vbG9jYWxob3N0Lz9lcnJvcj1hY2Nlc3NfZGVuaWVkXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVyaUxvY2F0aW9uIFRoZSBVUkkgTG9jYXRpb25cbiAqL1xudmFyIG9uQXV0aFVybENoYW5nZSA9IGZ1bmN0aW9uKHVyaUxvY2F0aW9uKSB7XG4gICAgY29uc29sZS5sb2coXCJJbkFwcEJyb3dzZXIgdXJsIGNoYW5nZWQgXCIrdXJpTG9jYXRpb24pO1xuICAgIGlmKHVyaUxvY2F0aW9uLmluZGV4T2YoXCJjb2RlPVwiKSAhPSAtMSkge1xuICAgICAgICByZXF1ZXN0U3RhdHVzID0gc3RhdHVzLlNVQ0NFU1M7XG5cbiAgICAgICAgLyogU3RvcmUgdGhlIGF1dGhDb2RlIHRlbXBvcmFyaWx5ICovXG4gICAgICAgIGF1dGhDb2RlID0gZ2V0UGFyYW1ldGVyQnlOYW1lKFwiY29kZVwiLCB1cmlMb2NhdGlvbik7XG4gICAgICAgIGxvZyhcIkZvdW5kIGF1dGggY29kZTogXCIrYXV0aENvZGUpO1xuXG4gICAgICAgIGdldFJlZnJlc2hUb2tlbihjYWxsYmFja0Z1bmMpO1xuXG4gICAgICAgIC8vIGNsb3NlIHRoZSBjaGlsZEJyb3dzZXJcbiAgICAgICAgd2luLmNsb3NlKCk7XG4gICAgfSBlbHNlIGlmKHVyaUxvY2F0aW9uLmluZGV4T2YoXCJlcnJvcj1cIikgIT0gLTEpICB7XG4gICAgICAgIHJlcXVlc3RTdGF0dXMgPSBzdGF0dXMuRVJST1I7XG4gICAgICAgIGVycm9yTWVzc2FnZSA9IGdldFBhcmFtZXRlckJ5TmFtZShcImVycm9yXCIsIHVyaUxvY2F0aW9uKTtcbiAgICAgICAgY2FsbGJhY2tGdW5jKCk7XG4gICAgICAgIHdpbi5jbG9zZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJlcXVlc3RTdGF0dXMgPSBzdGF0dXMuTk9UX0RFVEVSTUlORUQ7XG4gICAgICAgIC8vY2FsbGJhY2tGdW5jKCk7XG4gICAgfVxufTtcblxuXG4vKipcbiogR2V0cyB0aGUgUmVmcmVzaCBmcm9tIEFjY2VzcyBUb2tlbi4gVGhpcyBtZXRob2QgaXMgb25seSBjYWxsZWQgaW50ZXJuYWxseSxcbiogYW5kIG9uY2UsIG9ubHkgYWZ0ZXIgd2hlbiBhdXRob3JpemF0aW9uIG9mIEFwcGxpY2F0aW9uIGhhcHBlbnMuXG4qXG4qIEBwYXJhbSBwYXJhbU9iaiBBbiBPYmplY3QgY29udGFpbmluZyBhdXRob3JpemF0aW9uIGNvZGVcbiogQHBhcmFtIHBhcmFtT2JqLmF1dGhfY29kZSBUaGUgQXV0aG9yaXphdGlvbiBDb2RlIGZvciBnZXR0aW5nIFJlZnJlc2ggVG9rZW5cbipcbiogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgY2FsbGJhY2sgZnVuY3Rpb24gd2hpY2ggaXMgdG8gYmUgaW52b2tlZCBhZnRlclxuKiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzZnVsIHJldHJpZXZhbCBvZiBkYXRhIGZyb20gZ29vZ2xlJ3Mgc2VydmVyXG4qXG4qL1xudmFyIGdldFJlZnJlc2hUb2tlbiA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gIGNvbnNvbGUubG9nKFwiYWNjZXNzIHJlZnJlc2ggdG9rZW5cIik7XG4gICAkLmFqYXgoe1xuICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgIHVybDogZ2FwaUNvbmZpZy5lbmR0b2tlbixcbiAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgY2xpZW50X2lkICAgIDogZ2FwaUNvbmZpZy5jbGllbnRfaWQsXG4gICAgICAgICAgICAgICAgICAgY2xpZW50X3NlY3JldDogZ2FwaUNvbmZpZy5jbGllbnRfc2VjcmV0LFxuICAgICAgICAgICAgICAgICAgIGNvZGUgICAgICAgICA6IGF1dGhDb2RlLFxuICAgICAgICAgICAgICAgICAgIHJlZGlyZWN0X3VyaSA6IGdhcGlDb25maWcucmVkaXJlY3RfdXJpLFxuICAgICAgICAgICAgICAgICAgIGdyYW50X3R5cGUgICA6IGdhcGlDb25maWcuZ3JhbnRUeXBlcy5BVVRIT1JJWkVcbiAgICAgICAgICAgfVxuICAgIH0pXG4gICAgLmRvbmUoZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcInN1Y2Nlc3MgZ2V0dGluZyByZWZyZXNoIHRva2VuXCIpO1xuXG4gICAgICAgIC8qIHVwb24gc3VjZXNzLCBkbyBhIGNhbGxiYWNrIHdpdGggdGhlIGRhdGEgcmVjZWl2ZWQgKi9cbiAgICAgICAgLy8gdGVtcG9yYXJ5IHN0b3JpbmcgYWNjZXNzIHRva2VuXG4gICAgICAgIGFjY2Vzc1Rva2VuICAgICA9IGRhdGEuYWNjZXNzX3Rva2VuO1xuICAgICAgICBhY2Nlc3NUb2tlblRpbWUgPSAobmV3IERhdGUoKSkuZ2V0VGltZSgpO1xuXG4gICAgICAgIC8vIHNldCB0aGUgdG9rZW4gZm9yIHRoZSBqcyBhcGlcbiAgICAgICAgZ2FwaS5hdXRoLnNldFRva2VuKGRhdGEpO1xuXG4gICAgICAgIC8qIHNldCB0aGUgZXJyb3Igb2YgZGF0YSB0byBmYWxzZSwgYXMgaXQgd2FzIHN1Y2Nlc3NmdWwgKi9cbiAgICAgICAgZGF0YS5lcnJvciA9IGZhbHNlO1xuXG4gICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0b2tlbktleSwgZGF0YS5yZWZyZXNoX3Rva2VuKTtcblxuICAgICAgICAvKiBub3cgaW52b2tlIHRoZSBjYWxsYmFjayAqL1xuICAgICAgICBjYWxsYmFjayh7YWNjZXNzX3Rva2VuOiBhY2Nlc3NUb2tlbn0pO1xuICAgIH0pXG4gICAgLmZhaWwoZnVuY3Rpb24oeGhyLCB0ZXh0U3RhdHVzKSB7XG4gICAgICAgICAgICBjYWxsYmFjayh7XG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiB4aHIucmVzcG9uc2VUZXh0XG4gICAgICAgICAgICB9KTtcbiAgICB9KVxuICAgIC5hbHdheXMoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiVG9rZW4gcmVxdWVzdCBjb21wbGV0ZVwiKTtcbiAgICB9KTtcbn07XG5cbmlmKCAhaXNOYXRpdmUgKSB7XG4gIGdldFJlZnJlc2hUb2tlbiA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gIGdhcGkuYXV0aC5hdXRob3JpemUoe1xuICAgIGNsaWVudF9pZCA6IENMSUVOVF9JRCxcbiAgICBzY29wZSA6IE9BVVRIX1NDT1BFUyxcbiAgICBpbW1lZGlhdGUgOiB0cnVlXG4gIH0sIGZ1bmN0aW9uKCkge1xuICAgIHRva2VuID0gZ2FwaS5hdXRoLmdldFRva2VuKCk7XG4gICAgaWYoIGNhbGxiYWNrICkgY2FsbGJhY2sodG9rZW4pO1xuICB9KTtcbiAgfVxufVxuXG5cbi8qKlxuKiBUaGlzIG1ldGhvZCBzaG91bGQgT05MWSBiZSBjYWxsZWQgbG9jYWxseSBmcm9tIHdpdGhpbiB0aGlzIGNsYXNzLlxuKiBSZXR1cm5zIHRoZSBSZWZyZXNoIFRva2VuIGZyb20gdGhlIGxvY2FsIGRhdGFiYXNlLlxuKlxuKiBAcmV0dXJuIHtTdHJpbmd9IFRoZSByZWZyZXNoIFRva2VuXG4qXG4qL1xudmFyIGdldFRva2VuID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSh0b2tlbktleSk7XG59O1xuXG5cbi8qKlxuKiBUaGlzIG1ldGhvZCBpcyBpbnZva2VkIGV4dGVybmFsbHkuIEl0IHJldHJpZXZlcyB0aGUgQWNjZXNzIFRva2VuIGJ5IGF0IGZpcnN0XG4qIGNoZWNraW5nIGlmIGN1cnJlbnQgYWNjZXNzIHRva2VuIGhhcyBleHBpcmVkIG9yIG5vdC4gSWYgaXRzIG5vdCBleHBpcmVkLCBpdFxuKiBzaW1wbHkgcmV0dXJucyB0aGF0LCBvdGhlcndpc2UsIGl0IGdldHMgdGhlIHJlZnJlc2ggVG9rZW4gZnJvbSB0aGUgbG9jYWwgZGF0YWJhc2VcbiogKGJ5IGludm9raW5nIGdldFRva2VuKSBhbmQgdGhlbiBjb25uZWN0aW5nIHdpdGggR29vZ2xlJ3MgU2VydmVyICh1c2luZyBPQXV0aClcbiogdG8gZ2V0IHRoZSBBY2Nlc3MgVG9rZW4uXG4qXG4qIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrICAgQSBjYWxsQmFjayBmdW5jdGlvbiB3aGljaCBpcyB0byBiZSBpbnZva2VkIGFmdGVyXG4qICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhIGlzIHJldHJpZXZlZCBmcm9tIHRoZSBnb29nbGUncyBzZXJ2ZXIuIFRoZSBkYXRhXG4qICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tIGdvb2dsZSBzZXJ2ZXIgaXMgcGFzc2VkIHRvIGNhbGxiYWNrIGFzIGFyZ3MuXG4qXG4qL1xudmFyIGdldEFjY2Vzc1Rva2VuID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgIHZhciBjdXJyZW50VGltZSA9IChuZXcgRGF0ZSgpKS5nZXRUaW1lKCk7XG5cbiAgIGNvbnNvbGUubG9nKFwiZ2V0dGluZyBhY2Nlc3MgdG9rZW5cIik7XG5cbiAgIC8qIGNoZWNrIGlmIGN1cnJlbnQgVG9rZW4gaGFzIG5vdCBleHBpcmVkIChzdGlsbCB2YWxpZCkgKi9cbiAgIGlmIChhY2Nlc3NUb2tlbiAmJiBhY2Nlc3NUb2tlbiAhPSBmYWxzZSAmJlxuICAgICAgICAgICBjdXJyZW50VGltZSA8IChhY2Nlc3NUb2tlblRpbWUgKyBhY2Nlc3NUb2tlbkV4cGlyeUxpbWl0KSkge1xuICAgICAgICAgICBjYWxsYmFjayh7IGFjY2Vzc190b2tlbjogYWNjZXNzVG9rZW4gfSk7XG5cbiAgICAgICAgICAgcmV0dXJuO1xuICAgfVxuXG4gICBjb25zb2xlLmxvZyhcIkFDQ0VTUyBUT0tFTiBQQVJBTVM6IFwiK2FjY2Vzc1Rva2VuK1wiIFwiK2FjY2Vzc1Rva2VuVGltZStcIiBcIithY2Nlc3NUb2tlbkV4cGlyeUxpbWl0KTtcblxuICAgLyogZWxzZSwgZ2V0IHRoZSByZWZyZXNoVG9rZW4gZnJvbSBsb2NhbCBzdG9yYWdlIGFuZCBnZXQgYSBuZXcgYWNjZXNzIFRva2VuICovXG4gICB2YXIgcmVmcmVzaFRva2VuID0gZ2V0VG9rZW4oKTtcblxuICAgLy8gICBjb25zb2xlLmxvZyhcIlJlZnJlc2ggVG9rZW4gPj4gXCIgKyByZWZyZXNoVG9rZW4pO1xuICAgJC5hamF4KHtcbiAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICB1cmw6IGdhcGlDb25maWcuZW5kdG9rZW4sXG4gICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgY2xpZW50X2lkICAgIDogZ2FwaUNvbmZpZy5jbGllbnRfaWQsXG4gICAgICAgICAgICAgICAgICBjbGllbnRfc2VjcmV0OiBnYXBpQ29uZmlnLmNsaWVudF9zZWNyZXQsXG4gICAgICAgICAgICAgICAgICByZWZyZXNoX3Rva2VuOiByZWZyZXNoVG9rZW4sXG4gICAgICAgICAgICAgICAgICBncmFudF90eXBlICAgOiBnYXBpQ29uZmlnLmdyYW50VHlwZXMuUkVGUkVTSCxcbiAgICAgICAgICB9XG4gICAgfSlcbiAgICAuZG9uZShmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAvKiB1cG9uIHN1Y2VzcywgZG8gYSBjYWxsYmFjayB3aXRoIHRoZSBkYXRhIHJlY2VpdmVkICovXG4gICAgICAgICAgICAvLyB0ZW1wb3Jhcnkgc3RvcmluZyBhY2Nlc3MgdG9rZW5cbiAgICAgICAgICAgIGFjY2Vzc1Rva2VuID0gZGF0YS5hY2Nlc3NfdG9rZW47XG4gICAgICAgICAgICBhY2Nlc3NUb2tlblRpbWUgPSAobmV3IERhdGUoKSkuZ2V0VGltZSgpO1xuXG4gICAgICAgICAgICAvLyBzZXQgdGhlIHRva2VuIGZvciB0aGUganMgYXBpXG4gICAgICAgICAgICBnYXBpLmF1dGguc2V0VG9rZW4oZGF0YSk7XG5cbiAgICAgICAgICAgIC8qIHNldCB0aGUgZXJyb3IgdG8gZmFsc2UgKi9cbiAgICAgICAgICAgIGRhdGEuZXJyb3IgPSBmYWxzZTtcbiAgICAgICAgICAgIGNhbGxiYWNrKGRhdGEpO1xuICAgICAgICAgICB9KVxuICAgIC5mYWlsKGZ1bmN0aW9uKHhociwgdGV4dFN0YXR1cykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJUb2tlbiByZXF1ZXN0IGVycm9yID8/ID4+XCIgKyB4aHIucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICAgIGNhbGxiYWNrKHtcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IHhoci5yZXNwb25zZVRleHRcbiAgICAgICAgICAgIH0pO1xuICAgIH0pXG4gICAgLmFsd2F5cyhmdW5jdGlvbigpIHsgLy9jb25zb2xlLmxvZyhcIlRva2VuIHJlcXVlc3QgY29tcGxldGVcIik7XG4gICAgfSk7XG59O1xuXG5pZiggIWlzTmF0aXZlICkge1xuICBnZXRBY2Nlc3NUb2tlbiA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgIHZhciBjdXJyZW50VGltZSA9IChuZXcgRGF0ZSgpKS5nZXRUaW1lKCk7XG5cbiAgICAgaWYgKGFjY2Vzc1Rva2VuICYmXG4gICAgICAgICAgICAgY3VycmVudFRpbWUgPCAoYWNjZXNzVG9rZW5UaW1lICsgYWNjZXNzVG9rZW5FeHBpcnlMaW1pdCkpIHtcbiAgICAgICAgICAgICBjYWxsYmFjayhhY2Nlc3NUb2tlbik7XG5cbiAgICAgICAgICAgICByZXR1cm47XG4gICAgIH1cblxuICAgIGdhcGkuYXV0aC5hdXRob3JpemUoe1xuICAgIGNsaWVudF9pZCA6IENMSUVOVF9JRCxcbiAgICBzY29wZSA6IE9BVVRIX1NDT1BFUyxcbiAgICBpbW1lZGlhdGUgOiB0cnVlXG4gIH0sIGZ1bmN0aW9uKCkge1xuICAgIHRva2VuID0gZ2FwaS5hdXRoLmdldFRva2VuKCk7XG4gICAgYWNjZXNzVG9rZW4gPSB0b2tlbjtcbiAgICBhY2Nlc3NUb2tlblRpbWUgPSAobmV3IERhdGUoKSkuZ2V0VGltZSgpO1xuICAgIGlmKCBjYWxsYmFjayApIGNhbGxiYWNrKHRva2VuKTtcbiAgfSk7XG4gIH1cbn1cblxuXG5cbi8qKlxuKiBTYXZlcyB0aGUgUmVmcmVzaCBUb2tlbiBpbiBhIGxvY2FsIGRhdGFiYXNlIG9yIGxvY2FsU3RvcmFnZVxuKiBUaGlzIG1ldGhvZCBzaGFsbCBiZSBpbnZva2VkIGZyb20gZXh0ZXJuYWxseSBvbmx5IDxiPm9uY2U8L2I+IGFmdGVyIGFuXG4qIGF1dGhvcml6YXRpb24gY29kZSBpcyByZWNlaXZlZCBmcm9tIGdvb2dsZSdzIHNlcnZlci4gVGhpcyBtZXRob2RcbiogY2FsbHMgdGhlIG90aGVyIG1ldGhvZCAoZ2V0UmVmcmVzaFRva2VuKSB0byBnZXQgdGhlIHJlZnJlc2ggVG9rZW4gYW5kXG4qIHRoZW4gc2F2ZXMgaXQgbG9jYWxseSBvbiBkYXRhYmFzZSBhbmQgaW52b2tlcyBhIGNhbGxiYWNrIGZ1bmN0aW9uXG4qXG4qIEBwYXJhbSB0b2tlbk9iaiBBIE9iamVjdCBjb250YWluaW5nIGF1dGhvcml6YXRpb24gY29kZVxuKiBAcGFyYW0ge1N0cmluZ30gdG9rZW5PYmouYXV0aF9jb2RlIFRoZSBhdXRob3JpemF0aW9uIGNvZGUgZnJvbSBnb29nbGUncyBzZXJ2ZXJcbipcbiogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgVGhlIGZ1bmN0aW9uIHRvIGJlIGludm9rZWQgd2l0aCBwYXJhbWV0ZXJzXG4qL1xudmFyIHNhdmVSZWZyZXNoVG9rZW4gPSBmdW5jdGlvbih0b2tlbk9iaiwgY2FsbGJhY2spIHtcbiAgICAgZ2V0UmVmcmVzaFRva2VuKHRva2VuT2JqLCBmdW5jdGlvbihkYXRhKSB7XG5cbiAgICAgICAgICAgICAvKiBpZiB0aGVyZSdzIG5vIGVycm9yICovXG4gICAgICAgICAgICAgaWYgKCFkYXRhLmVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEBUT0RPOiBtYWtlIGFub3RoZXIgbWV0aG9kIHNhdmVUb2tlbiB0byBhYnN0cmFjdCB0aGUgc3RvcmluZyBvZiB0b2tlblxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0b2tlbktleSwgZGF0YS5yZWZyZXNoX3Rva2VuKTtcbiAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgY2FsbGJhY2soZGF0YSk7XG4gICAgIH0pO1xufTtcblxuXG5cbi8qKlxuKiBDaGVja3MgaWYgdXNlciBoYXMgYXV0aG9yaXplZCB0aGUgQXBwIG9yIG5vdFxuKiBJdCBkb2VzIHNvIGJ5IGNoZWNraW5nIGlmIHRoZXJlJ3MgYSByZWZyZXNoX3Rva2VuXG4qIGF2YWlsYWJsZSBvbiB0aGUgY3VycmVudCBkYXRhYmFzZSB0YWJsZS5cbipcbiogQHJldHVybiB7Qm9vbGVhbn0gdHJ1ZSBpZiBhdXRob3JpemVkLCBmYWxzZSBvdGhlcndpc2VcbiovXG52YXIgaXNBdXRob3JpemVkID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICAgIHZhciB0b2tlblZhbHVlID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKHRva2VuS2V5KTtcblxuICAgICAgY2FsbGJhY2soKCh0b2tlblZhbHVlICE9PSBudWxsKSAmJiAodHlwZW9mIHRva2VuVmFsdWUgIT09ICd1bmRlZmluZWQnKSkpO1xufTtcblxuaWYoICFpc05hdGl2ZSApIHtcbiAgaXNBdXRob3JpemVkID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICBnYXBpLmF1dGguYXV0aG9yaXplKHtcbiAgICBjbGllbnRfaWQgOiBDTElFTlRfSUQsXG4gICAgc2NvcGUgOiBPQVVUSF9TQ09QRVMsXG4gICAgaW1tZWRpYXRlIDogdHJ1ZVxuICB9LCBmdW5jdGlvbigpIHtcbiAgICB0b2tlbiA9IGdhcGkuYXV0aC5nZXRUb2tlbigpO1xuICAgIGlmKCBjYWxsYmFjayApIGNhbGxiYWNrKHRva2VuKTtcbiAgfSk7XG4gIH1cbn1cblxuXG4vKipcbiogRXh0cmFjdHMgdGhlIGNvZGUgZnJvbSB0aGUgdXJsLiBDb3BpZWQgZnJvbSBvbmxpbmVcbiogQFRPRE8gbmVlZHMgdG8gYmUgc2ltcGxpZmllZC5cbipcbiogQHBhcmFtIG5hbWUgVGhlIHBhcmFtZXRlciB3aG9zZSB2YWx1ZSBpcyB0byBiZSBncmFiYmVkIGZyb20gdXJsXG4qIEBwYXJhbSB1cmwgIFRoZSB1cmwgdG8gYmUgZ3JhYmJlZCBmcm9tLlxuKlxuKiBAcmV0dXJuIFJldHVybnMgdGhlIFZhbHVlIGNvcnJlc3BvbmRpbmcgdG8gdGhlIG5hbWUgcGFzc2VkXG4qL1xudmFyIGdldFBhcmFtZXRlckJ5TmFtZSA9IGZ1bmN0aW9uKG5hbWUsIHVybCkge1xuICBuYW1lID0gbmFtZS5yZXBsYWNlKC9bXFxbXS8sIFwiXFxcXFxcW1wiKS5yZXBsYWNlKC9bXFxdXS8sIFwiXFxcXFxcXVwiKTtcbiAgdmFyIHJlZ2V4UyA9IFwiW1xcXFw/Jl1cIiArIG5hbWUgKyBcIj0oW14mI10qKVwiO1xuICB2YXIgcmVnZXggPSBuZXcgUmVnRXhwKHJlZ2V4Uyk7XG4gIHZhciByZXN1bHRzID0gcmVnZXguZXhlYyh1cmwpO1xuXG4gIGlmKHJlc3VsdHMgPT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBlbHNlXG4gICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChyZXN1bHRzWzFdLnJlcGxhY2UoL1xcKy9nLCBcIiBcIikpO1xufTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgYXV0aG9yaXplIDogYXV0aG9yaXplLFxuICBpc0F1dGhvcml6ZWQgOiBpc0F1dGhvcml6ZWQsXG4gIGdldEFjY2Vzc1Rva2VuIDogZ2V0QWNjZXNzVG9rZW4sXG4gIEFQUF9JRCA6IEFQUF9JRFxufTtcbiIsInZhciBhcHAgPSByZXF1aXJlKCcuL2FwcCcpO1xuXG52YXIgY2FjaGVkVGlsZVN0eWxlID0ge1xuICB3aGVyZTogXCJwaWQgaW4gKClcIixcbiAgcG9seWdvbk9wdGlvbnM6IHtcbiAgICBmaWxsQ29sb3I6IFwiIzAwMDAwMFwiLFxuICAgIHN0cm9rZUNvbG9yOiBcIiNGRjAwMDBcIixcbiAgICBzdHJva2VXZWlnaHQ6IDNcbiAgfVxufVxuXG52YXIgY2FjaGVkVGlsZXMgPSBbXTtcbnZhciBjYWNoZWRUaWxlc0xvYWRlZCA9IGZhbHNlO1xudmFyIGNhY2hlZFRpbGVQcmVmaXggPSAnY2FjaGVkX3RpdGxlXyc7XG52YXIgY2FjaGluZyA9IGZhbHNlO1xudmFyIHNhdmVDYWNoZU9uQ2xpY2tTZXQgPSBmYWxzZTtcbnZhciBjTWFwRGF0YSA9IHt9O1xuXG52YXIgY29scyA9IFtdO1xudmFyIGFwcCA9IG51bGw7XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gIF9sb2FkRnJvbUNhY2hlKCk7XG4gIF9sb2FkQ2FjaGVkVGlsZXMoKTtcbn1cblxuZnVuY3Rpb24gY2xlYXJDYWNoZSgpIHtcbiAgaWYoICFjb25maXJtKCdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gY2xlYXIgYWxsIHRpbGUgZGF0YSBmcm9tIHRoZSBjYWNoZT8nKSApIHJldHVybjtcblxuICBmb3IoIHZhciBrZXkgaW4gd2luZG93LmxvY2FsU3RvcmFnZSApIHtcbiAgICBpZigga2V5LmluZGV4T2YoY2FjaGVkVGlsZVByZWZpeCkgPiAtMSApIHtcbiAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpO1xuICAgIH1cbiAgfVxuICBjYWNoZWRUaWxlcyA9IFtdO1xufVxuXG4vLyBlIGlzIHRoZSBldmVudCBvYmplY3QgZnJvbSBnb29nbGUgbWFwc1xuZnVuY3Rpb24gY2FjaGVUaWxlKGUsIGZ1c2lvbkxheWVyLCBkZWZhdWx0T3B0aW9ucywgZGVmYXVsdFN0eWxlKSB7XG4gIGlmKCAhc2F2ZUNhY2hlT25DbGlja1NldCApIHtcbiAgICBzYXZlQ2FjaGVPbkNsaWNrU2V0ID0gdHJ1ZTtcbiAgICAkKCcjbG9jYXRlLWNhY2hlLXNhdmUtYnRuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgIF9zYXZlVGlsZSgpO1xuICAgIH0pO1xuICAgICQoJyNsb2NhdGUtY2FjaGUtbW9kZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICBpZiggISQodGhpcykuaXMoJ2NoZWNrZWQnKSApICQoJyNsb2NhdGUtY2FjaGUtc2F2ZS1wYW5lbCcpLmhpZGUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIGlmKCBjYWNoaW5nICkgcmV0dXJuO1xuICBjYWNoaW5nID0gdHJ1ZTtcblxuICBjTWFwRGF0YSA9IHtcbiAgICBmdXNpb25MYXllciA6IGZ1c2lvbkxheWVyLFxuICAgIGRlZmF1bHRPcHRpb25zIDogZGVmYXVsdE9wdGlvbnMsXG4gICAgZGVmYXVsdFN0eWxlIDogZGVmYXVsdFN0eWxlLFxuICAgIHBpZCA6ICBlLnJvdy5waWQudmFsdWVcbiAgfVxuXG4gICQoJyNsb2NhdGUtY2FjaGUtc2F2ZS1uYW1lJykudmFsKCcnKTtcbiAgJCgnI2xvY2F0ZS1jYWNoZS1tb2RlLWxvYWRpbmcnKS5zaG93KCk7XG4gICQoJyNsb2NhdGUtY2FjaGUtc2F2ZS1wYW5lbCcpLmhpZGUoKTtcblxuICBfbG9hZFRpbGUoZS5sYXRMbmcubG5nKCksIGUubGF0TG5nLmxhdCgpLCBmdW5jdGlvbihkYXRhKXtcbiAgICAkKCcjbG9jYXRlLWNhY2hlLXNhdmUtcGFuZWwnKS5zaG93KCk7XG4gICAgJCgnI2xvY2F0ZS1jYWNoZS1tb2RlLWxvYWRpbmcnKS5oaWRlKCk7XG5cbiAgICAkKCcjbG9jYXRlLWNhY2hlLXNhdmUtcGlkJykuaHRtbChjTWFwRGF0YS5waWQpO1xuICAgIGNNYXBEYXRhLmRhdGEgPSBkYXRhO1xuICAgIGNhY2hpbmcgPSBmYWxzZTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgZm9yKCB2YXIgYXR0ciBpbiBhcHAuZ2V0TW9kZWwoKS53ZWF0aGVyICkge1xuICAgIGlmKCBhdHRyICE9IFwibnJlbFwiICkgY29scy5wdXNoKGF0dHIpO1xuICB9XG5cbiAgLy8gdGhlIGFib3V0IG1vZGFsIGxpbmsgaXMgY3JlYXRlZCBiZWxvdywgc28gd2h5IG5vdC4uLlxuICAkKFwiI2Fib3V0LW1vZGFsXCIpLm1vZGFsKHtcbiAgICBzaG93IDogZmFsc2VcbiAgfSk7XG5cbiAgLy8gdGhlIGFib3V0IG1vZGFsIGxpbmsgaXMgY3JlYXRlZCBiZWxvdywgc28gd2h5IG5vdC4uLlxuICAkKFwiI2hlbHAtbW9kYWxcIikubW9kYWwoe1xuICAgIHNob3cgOiBmYWxzZVxuICB9KTtcblxuICBfY3JlYXRlTmF2TWVudSgpO1xuXG4gIC8vIGhpZGUgdGhlIHNlbGVjdCB0cmVlIGJ1dHRvblxuICAkKCcjdHJlZS1zdWItbWVudScpLnBhcmVudCgpLmhpZGUoKTtcblxuICAvLyBoaWRlIHRoZSBzZWxlY3RvciBmb3IgdXBsb2FkaW5nIHdlYXRoZXIgZGF0YSBmcm9tIGEgZ29vZ2xlIHNwcmVhZHNoZWV0XG4gICQoJyN3ZWF0aGVyUmVhZGVyLXNwcmVhZHNoZWV0JykucGFyZW50KCkuaGlkZSgpO1xuXG4gIC8vIHNob3cgdGhlIGNhY2hlIHZlcnNpb24gb2YgdGhlIGxvY2F0aW9uIHNlbGVjdG9yXG4gICQoJyNzZWxlY3QtbG9jYXRpb24tb25saW5lJykuaGlkZSgpO1xuICAkKCcjc2VsZWN0LWxvY2F0aW9uLW9mZmxpbmUnKS5zaG93KCk7XG5cbiAgLy8gc2V0IHRoZSBsb2NhdGlvbiBzZWxlY3RvciB1aSBsaXN0IGJhc2VkIG9uIGNhY2hlZCB0aWxlc1xuICBfdXBkYXRlQ2FjaGVUaWxlVWlMaXN0KCk7XG59XG5cbmZ1bmN0aW9uIHJlbmRlckNhY2hlZFRpbGVzT25NYXAoZnVzaW9uTGF5ZXIsIGRlZmF1bHRPcHRpb25zLCBkZWZhdWx0U3R5bGUpIHtcbiAgaWYoICFjYWNoZWRUaWxlc0xvYWRlZCApIF9sb2FkQ2FjaGVkVGlsZXMoKTtcblxuICBkZWZhdWx0T3B0aW9ucy5zdHlsZXMgPSBbZGVmYXVsdFN0eWxlXTtcblxuICBpZiggY2FjaGVkVGlsZXMubGVuZ3RoID4gMCApIHtcbiAgICBjYWNoZWRUaWxlU3R5bGUud2hlcmUgPSAncGlkIGluICgnK2NhY2hlZFRpbGVzLmpvaW4oJywnKSsnKSc7XG4gICAgZGVmYXVsdE9wdGlvbnMuc3R5bGVzLnB1c2goY2FjaGVkVGlsZVN0eWxlKTtcbiAgfVxuXG4gIGZ1c2lvbkxheWVyLnNldE9wdGlvbnMoZGVmYXVsdE9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiBfc2F2ZVRpbGUoKSB7XG4gIHZhciBuYW1lID0gJCgnI2xvY2F0ZS1jYWNoZS1zYXZlLW5hbWUnKS52YWwoKTtcbiAgaWYoIG5hbWUubGVuZ3RoID09IDAgKSByZXR1cm4gYWxlcnQoJ1BsZWFzZSBwcm92aWRlIGEgbmFtZScpO1xuXG4gIGNNYXBEYXRhLmRhdGEubmFtZSA9IG5hbWU7XG5cbiAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKGNhY2hlZFRpbGVQcmVmaXgrY01hcERhdGEucGlkLCBKU09OLnN0cmluZ2lmeShjTWFwRGF0YS5kYXRhKSk7XG5cbiAgY2FjaGVkVGlsZXMucHVzaChjTWFwRGF0YS5waWQpO1xuICByZW5kZXJDYWNoZWRUaWxlc09uTWFwKGNNYXBEYXRhLmZ1c2lvbkxheWVyLCBjTWFwRGF0YS5kZWZhdWx0T3B0aW9ucywgY01hcERhdGEuZGVmYXVsdFN0eWxlKTtcbiAgJCgnI2xvY2F0ZS1jYWNoZS1zYXZlLXBhbmVsJykuaGlkZSgpO1xufVxuXG5mdW5jdGlvbiBfbG9hZFRpbGUobG5nLCBsYXQsIGNhbGxiYWNrKSB7XG4gIGdhKCdzZW5kJywgJ2V2ZW50JywgJ3VpJywgJ2ludGVyYWN0aW9uJywgJ3RpbGUtZGF0YS1jYWNoZScsIDEpO1xuXG4gIHZhciB1cmwgPSBcImh0dHA6Ly9hbGRlci5iaW9lbmVyZ3kuY2FzaWwudWNkYXZpcy5lZHU6ODA4MC92aXpzb3VyY2UvcmVzdD92aWV3PXBvaW50VG9XZWF0aGVyKFwiK2xuZytcIixcIitsYXQrXCIsODE5MilcIlxuICB2YXIgcSA9IG5ldyBnb29nbGUudmlzdWFsaXphdGlvbi5RdWVyeSh1cmwpO1xuICB2YXIgcmVzcHMgPSAwO1xuICB2YXIgd2VhdGhlclRhYmxlID0ge307XG4gIHZhciBzb2lsVGFibGUgPSB7fTtcblxuICBmdW5jdGlvbiBjaGVja0RvbmUoKSB7XG4gICAgICByZXNwcysrO1xuICAgICAgaWYoIHJlc3BzID09IDIgJiYgY2FsbGJhY2sgKSBjYWxsYmFjayh7d2VhdGhlcjp3ZWF0aGVyVGFibGUsIHNvaWw6c29pbFRhYmxlfSk7XG4gIH1cblxuICBxLnNldFF1ZXJ5KCdTRUxFQ1QgKicpO1xuICBxLnNlbmQoZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgIHdlYXRoZXJUYWJsZSA9IEpTT04ucGFyc2UocmVzcG9uc2UuZ2V0RGF0YVRhYmxlKCkudG9KU09OKCkpO1xuICAgIGNoZWNrRG9uZSgpO1xuICB9KTtcblxuICB2YXIgdXJsID0gXCJodHRwOi8vYWxkZXIuYmlvZW5lcmd5LmNhc2lsLnVjZGF2aXMuZWR1OjgwODAvdml6c291cmNlL3Jlc3Q/dmlldz1wb2ludFRvU09JTChcIitsbmcrXCIsXCIrbGF0K1wiLDgxOTIpXCJcbiAgdmFyIHEgPSBuZXcgZ29vZ2xlLnZpc3VhbGl6YXRpb24uUXVlcnkodXJsKTtcbiAgcS5zZXRRdWVyeSgnU0VMRUNUIConKTtcbiAgcS5zZW5kKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICBzb2lsVGFibGUgPSBKU09OLnBhcnNlKHJlc3BvbnNlLmdldERhdGFUYWJsZSgpLnRvSlNPTigpKTtcbiAgICBjaGVja0RvbmUoKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIF91cGRhdGVDYWNoZVRpbGVVaUxpc3QoKSB7XG4gIGlmKCBjYWNoZWRUaWxlcy5sZW5ndGggPT0gMCApIHtcbiAgICAkKCcjc2VsZWN0LWxvY2F0aW9uLW9mZmxpbmUtbm9uZScpLnNob3coKTtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgbGlzdEVsZSA9ICQoJyNzZWxlY3QtbG9jYXRpb24tb2ZmbGluZS1saXN0JykuaHRtbCgnPGRpdj5TZWxlY3QgQ2FjaGVkIFRpbGU8L2Rpdj4nKSwgZWxlO1xuICAkKCcjc2VsZWN0LWxvY2F0aW9uLW9mZmxpbmUtbm9uZScpO1xuICBmb3IoIHZhciBpID0gMDsgaSA8IGNhY2hlZFRpbGVzLmxlbmd0aDsgaSsrICkge1xuICAgIHZhciBqc29uID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKGNhY2hlZFRpbGVQcmVmaXgrY2FjaGVkVGlsZXNbaV0pO1xuICAgIGpzb24gPSBKU09OLnBhcnNlKGpzb24pO1xuXG4gICAgZWxlID0gJCgnPGRpdj48YSBjYWNoZWlkPVwiJytpKydcIiBzdHlsZT1cImN1cnNvcjpwb2ludGVyXCI+JytjYWNoZWRUaWxlc1tpXSsnOiAnK2pzb24ubmFtZSsnPC9hPjwvZGl2PicpO1xuICAgIGVsZS5maW5kKCdhJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICBfcnVuQ2FjaGVkVGlsZShwYXJzZUludCgkKHRoaXMpLmF0dHIoJ2NhY2hlaWQnKSkpO1xuICAgIH0pO1xuICAgIGxpc3RFbGUuYXBwZW5kKGVsZSlcbiAgfVxufVxuXG5mdW5jdGlvbiBfcnVuQ2FjaGVkVGlsZShpbmRleCkge1xuICB2YXIganNvbiA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShjYWNoZWRUaWxlUHJlZml4K2NhY2hlZFRpbGVzW2luZGV4XSk7XG4gIGpzb24gPSBKU09OLnBhcnNlKGpzb24pO1xuXG4gIGZvciggdmFyIGkgPSAwOyBpIDwganNvbi53ZWF0aGVyLnJvd3MubGVuZ3RoOyBpKysgKSB7XG4gICAgdmFyIG0gPSBpKycnO1xuICAgIGZvciggdmFyIGogPSAxOyBqIDwganNvbi53ZWF0aGVyLmNvbHMubGVuZ3RoOyBqKysgKSB7XG4gICAgICAkKFwiI2lucHV0LXdlYXRoZXItXCIrY29sc1tqXStcIi1cIitpKS52YWwoanNvbi53ZWF0aGVyLnJvd3NbaV0uY1tqXSA/IGpzb24ud2VhdGhlci5yb3dzW2ldLmNbal0udiA6IFwiXCIpO1xuICAgIH1cbiAgfVxuXG5cbiAgZm9yKCB2YXIgaSA9IDA7IGkgPCBqc29uLnNvaWwuY29scy5sZW5ndGg7IGkrKyApIHtcbiAgICBpZigganNvbi5zb2lsLnJvd3NbMF0gPT0gbnVsbCApIGNvbnRpbnVlO1xuICAgICQoXCIjaW5wdXQtc29pbC1cIitqc29uLnNvaWwuY29sc1tpXS5pZCkudmFsKGpzb24uc29pbC5yb3dzWzBdLmNbaV0udik7XG4gIH1cblxuICAkKFwiI3NlbGVjdC13ZWF0aGVyLW1vZGFsXCIpLm1vZGFsKCdoaWRlJyk7XG5cbiAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgIGFwcC5ydW5Nb2RlbCgpO1xuICB9LCA1MDApO1xufVxuXG5mdW5jdGlvbiBfbG9hZENhY2hlZFRpbGVzKCkge1xuICBjYWNoZWRUaWxlcyA9IFtdO1xuICBmb3IoIHZhciBrZXkgaW4gd2luZG93LmxvY2FsU3RvcmFnZSApIHtcbiAgICBpZigga2V5LmluZGV4T2YoY2FjaGVkVGlsZVByZWZpeCkgPiAtMSApIHtcbiAgICAgIGNhY2hlZFRpbGVzLnB1c2goa2V5LnJlcGxhY2UoY2FjaGVkVGlsZVByZWZpeCwnJykpO1xuICAgIH1cbiAgfVxuICBjYWNoZWRUaWxlc0xvYWRlZCA9IHRydWU7XG59XG5cbmZ1bmN0aW9uIF9jcmVhdGVOYXZNZW51KCkge1xuICB2YXIgYnRuID0gJCgnPGxpIGNsYXNzPVwiZHJvcGRvd25cIj4nXG4gICAgICArICc8YSBjbGFzcz1cImRyb3Bkb3duLXRvZ2dsZVwiPk9GRkxJTkUgTU9ERTxiIGNsYXNzPVwiY2FyZXRcIj48L2I+PC9hPidcbiAgICAgICsgJzx1bCBjbGFzcz1cImRyb3Bkb3duLW1lbnVcIj4nXG4gICAgICArICc8bGk+PGEgaWQ9XCJoZWxwXCI+PGkgY2xhc3M9XCJpY29uLXF1ZXN0aW9uLXNpZ25cIj48L2k+IEhlbHA8L2E+PC9saT4nXG4gICAgICArICc8bGk+PGEgaWQ9XCJhYm91dFwiPjxpIGNsYXNzPVwiaWNvbi1pbmZvLXNpZ25cIj48L2k+IEFib3V0PC9hPjwvbGk+J1xuICAgICAgKyAnPC91bD48L2xpPicpO1xuXG4gIC8vIHNldCBjbGljayBoYW5kbGVycyBmb3IgcG9wdXBcbiAgYnRuLmZpbmQoJ2EuZHJvcGRvd24tdG9nZ2xlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAkKHRoaXMpLnBhcmVudCgpLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XG4gIH0pO1xuXG4gIC8vIGFib3V0IGNsaWNrIGhhbmRsZXJcbiAgYnRuLmZpbmQoJyNhYm91dCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgIGJ0bi50b2dnbGVDbGFzcygnb3BlbicpO1xuICAgICQoXCIjYWJvdXQtbW9kYWxcIikubW9kYWwoJ3Nob3cnKTtcbiAgfSk7XG5cbiAgYnRuLmZpbmQoJyNoZWxwJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgYnRuLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XG4gICAgc2hvd0hlbHAoKTtcbiAgfSk7XG5cbiAgLy8gYWRkIG1lbnVcbiAgJChcIiNsb2dpbi1oZWFkZXJcIikuaHRtbChcIlwiKS5hcHBlbmQoYnRuKTtcbn07XG5cbmZ1bmN0aW9uIF9sb2FkRnJvbUNhY2hlKCkge1xuICAgICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiAnY2FjaGUvanNhcGknLFxuICAgICAgICBkYXRhVHlwZTogXCJzY3JpcHRcIixcbiAgICAgICAgY2FjaGUgOiB0cnVlLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbigpe1xuICAgICAgICAgICQoJ2hlYWQnKS5hcHBlbmQoICQoJzxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiB0eXBlPVwidGV4dC9jc3NcIiAvPicpLmF0dHIoJ2hyZWYnLCAnY2FjaGUvY2hhcnQuY3NzJykgKTtcbiAgICAgICAgICAkKCdoZWFkJykuYXBwZW5kKCAkKCc8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgdHlwZT1cInRleHQvY3NzXCIgLz4nKS5hdHRyKCdocmVmJywgJ2NhY2hlL2Fubm90YXRlZHRpbWVsaW5lLmNzcycpICk7XG4gICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogJ2NhY2hlL2NoYXJ0LmpzJyxcbiAgICAgICAgICAgIGRhdGFUeXBlOiBcInNjcmlwdFwiLFxuICAgICAgICAgICAgY2FjaGUgOiB0cnVlLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgY2hhcnRzTG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgaWYoIGNoYXJ0c0NhbGxiYWNrICkgY2hhcnRzQ2FsbGJhY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBpbml0IDogaW5pdCxcbiAgcmVuZGVyIDogcmVuZGVyLFxuICBjYWNoZVRpbGUgOiBjYWNoZVRpbGUsXG4gIHJlbmRlckNhY2hlZFRpbGVzT25NYXAgOiByZW5kZXJDYWNoZWRUaWxlc09uTWFwLFxuICBjbGVhckNhY2hlIDogY2xlYXJDYWNoZVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBWUEQgOiB7XG4gICAgICBsYWJlbCA6IFwiTWVhbiBWYXBvciBQcmVzc3VyZSBEZWZpY2l0XCIsXG4gICAgICB1bml0cyA6IFwia1BBXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwidGhlIGRpZmZlcmVuY2UgKGRlZmljaXQpIGJldHdlZW4gdGhlIGFtb3VudCBvZiBtb2lzdHVyZSBpbiB0aGUgYWlyIGFuZCBob3cgbXVjaCBcIiArXG4gICAgICBcdFx0XCJtb2lzdHVyZSB0aGUgYWlyIGNhbiBob2xkIHdoZW4gaXQgaXMgc2F0dXJhdGVkXCJcbiAgfSxcbiAgZlZQRCA6IHtcbiAgICAgIGxhYmVsIDogXCJWYXBvciBQcmVzc3VyZSBEZWZpY2l0IE1vZGlmaWVyXCIsXG4gICAgICB1bml0cyA6IFwidW5pdGxlc3NcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJBIGVudmlyb25tZW50YWwgZmFjdG9yIGdyb3d0aCBtb2RpZmllclwiXG4gIH0sXG4gIGZUIDoge1xuICAgICAgbGFiZWwgOiBcIlRlbXBlcmF0dXJlIE1vZGlmaWVyXCIsXG4gICAgICB1bml0cyA6IFwidW5pdGxlc3NcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJBIGVudmlyb25tZW50YWwgZmFjdG9yIGdyb3d0aCBtb2RpZmllclwiXG4gIH0sXG4gIGZGcm9zdCA6IHtcbiAgICAgIGxhYmVsIDogXCJGcm9zdCBNb2RpZmllclwiLFxuICAgICAgdW5pdHMgOiBcInVuaXRsZXNzXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiTnVtYmVyIG9mIGZyb3N0IGRheXMgZ3Jvd3RoIG1vZGlmaWVyXCJcbiAgfSxcbiAgUEFSIDoge1xuICAgICAgbGFiZWwgOiBcIk1vbnRobHkgUGhvdG9zeW50aGV0aWNhbGx5IEFjdGl2ZSBSYWRpYXRpb25cIixcbiAgICAgIHVuaXRzIDogXCJtb2xzIC8gbV4yIG1vbnRoXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiRGVzaWduYXRlcyB0aGUgc3BlY3RyYWwgcmFuZ2UgKHdhdmUgYmFuZCkgb2Ygc29sYXIgcmFkaWF0aW9uIGZyb20gNDAwIHRvIDcwMCBuYW5vbWV0ZXJzIFwiICtcbiAgICAgIFx0XHRcInRoYXQgcGhvdG9zeW50aGV0aWMgb3JnYW5pc21zIGFyZSBhYmxlIHRvIHVzZSBpbiB0aGUgcHJvY2VzcyBvZiBwaG90b3N5bnRoZXNpc1wiXG4gIH0sXG4gIHhQUCA6IHtcbiAgICAgIGxhYmVsIDogXCJNYXhpbXVtIFBvdGVudGlhbCBQcmltYXJ5IFByb2R1Y3Rpb25cIixcbiAgICAgIHVuaXRzIDogXCJNZXRyaWMgVG9ucyBEcnkgTWF0dGVyL2hhXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiXCJcbiAgfSxcbiAgSW50Y3B0biA6IHtcbiAgICAgIGxhYmVsIDogXCJDYW5vcHkgUmFpbmZhbGwgSW50ZXJjZXB0aW9uXCIsXG4gICAgICB1bml0cyA6IFwiXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiUHJlY2lwaXRhdGlvbiB0aGF0IGRvZXMgbm90IHJlYWNoIHRoZSBzb2lsLCBidXQgaXMgaW5zdGVhZCBpbnRlcmNlcHRlZCBieSB0aGUgbGVhdmVzIGFuZCBicmFuY2hlcyBvZiBwbGFudHMgYW5kIHRoZSBmb3Jlc3QgZmxvb3IuXCJcbiAgfSxcbiAgQVNXIDoge1xuICAgICAgbGFiZWwgOiBcIkF2YWlsYWJsZSBTb2lsIFdhdGVyXCIsXG4gICAgICB1bml0cyA6IFwibW1cIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJcIlxuICB9LFxuICBDdW1JcnJpZyA6IHtcbiAgICAgIGxhYmVsIDogXCJDdW11bGF0aXZlIFJlcXVpcmVkIElycmlnYXRpb25cIixcbiAgICAgIHVuaXRzIDogXCJtbS9tb25cIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJcIlxuICB9LFxuICBJcnJpZyA6IHtcbiAgICAgIGxhYmVsIDogXCJSZXF1aXJlZCBJcnJpZ2F0aW9uXCIsXG4gICAgICB1bml0cyA6IFwibW0vbW9uXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiXCJcbiAgfSxcbiAgU3RhbmRBZ2UgOiB7XG4gICAgICBsYWJlbCA6IFwiU3RhbmQgQWdlXCIsXG4gICAgICB1bml0cyA6IFwiXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiXCJcbiAgfSxcbiAgTEFJIDoge1xuICAgICAgbGFiZWwgOiBcIkxlYWYgQXJlYSBJbmRleFwiLFxuICAgICAgdW5pdHMgOiBcIm0yIC8gbTJcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJUaGUgb25lLXNpZGVkIGdyZWVuIGxlYWYgYXJlYSBwZXIgdW5pdCBncm91bmQgc3VyZmFjZSBhcmVhXCJcbiAgfSxcbiAgQ2FuQ29uZCA6IHtcbiAgICAgIGxhYmVsIDogXCJDYW5vcHkgQ29uZHVjdGFuY2VcIixcbiAgICAgIHVuaXRzIDogXCJnYyxtL3NcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJcIlxuICB9LFxuICBUcmFuc3AgOiB7XG4gICAgICBsYWJlbCA6IFwiQ2Fub3B5IE1vbnRobHkgVHJhbnNwaXJhdGlvblwiLFxuICAgICAgdW5pdHMgOiBcIm1tL21vblwiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIldhdGVyIG1vdmVtZW50IHRocm91Z2ggYSBwbGFudCBhbmQgaXRzIGV2YXBvcmF0aW9uIGZyb20gYWVyaWFsIHBhcnRzXCJcbiAgfSxcbiAgRVRyIDoge1xuICAgICAgbGFiZWwgOiBcIkVUclwiLFxuICAgICAgdW5pdHMgOiBcIm1tXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiUmVmZXJlbmNlIGV2YXBvdHJhbnNwaXJhdGlvbiBmb3IgQWxmYWxmYVwiXG4gIH0sXG4gIEtjIDoge1xuICAgICAgbGFiZWwgOiBcIktjXCIsXG4gICAgICB1bml0cyA6IFwiXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiQ3JvcCBjb2VmZmljaWVudHNcIlxuICB9LFxuICBmU1cgOiB7XG4gICAgICBsYWJlbCA6IFwiU29pbCBXYXRlciBNb2RpZmllclwiLFxuICAgICAgdW5pdHMgOiBcInVuaXRsZXNzXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiQSBlbnZpcm9ubWVudGFsIGZhY3RvciBncm93dGggbW9kaWZpZXJcIlxuICB9LFxuICBmQWdlIDoge1xuICAgICAgbGFiZWwgOiBcIlN0YW5kIGFnZVwiLFxuICAgICAgdW5pdHMgOiBcInVuaXRsZXNzXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiQSBlbnZpcm9ubWVudGFsIGZhY3RvciBncm93dGggbW9kaWZpZXJcIlxuICB9LFxuICBQaHlzTW9kIDoge1xuICAgICAgbGFiZWwgOiBcIlwiLFxuICAgICAgdW5pdHMgOiBcInVuaXRsZXNzXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiUGh5c2lvbG9naWNhbCBNb2RpZmllciB0byBDYW5vcHkgQ29uZHVjdGFuY2VcIlxuICB9LFxuICBwUiA6IHtcbiAgICAgIGxhYmVsIDogXCJcIixcbiAgICAgIHVuaXRzIDogXCJcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJBbG9uZyB3aXRoIGEgUGh5c2lvbG9naWFsIHBhcmFtZXRlciwgc3BlY2lmaWVzIHRoZSBhbW91bnQgb2YgbmV3IGdyb3d0aCBhbGxvY2F0ZWQgdG8gdGhlIHJvb3Qgc3lzdGVtLCBhbmQgdGhlIHR1cm5vdmVyIHJhdGUuXCJcbiAgfSxcbiAgcFMgOiB7XG4gICAgICBsYWJlbCA6IFwiXCIsXG4gICAgICB1bml0cyA6IFwiXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiRGVmaW5lcyB0aGUgZm9saWFnZSB0byBzdGVtIChXRi9XUykgZnJhY3Rpb24gaW4gYWxsb2NhdGluZyBhYm92ZWdyb3VuZCBiaW9tYXNzIG9mIHRoZSB0cmVlXCJcbiAgfSxcbiAgbGl0dGVyZmFsbCA6IHtcbiAgICAgIGxhYmVsIDogXCJcIixcbiAgICAgIHVuaXRzIDogXCJcIixcbiAgICAgIGRlc2NyaXRpb24gOiBcIlwiLFxuICAgICAgYWx0Rm5OYW1lIDogXCJ0ZHBcIlxuICB9LFxuICBOUFAgOiB7XG4gICAgICBsYWJlbCA6IFwiTmV0IENhbm9weSBQcm9kdWN0aW9uXCIsXG4gICAgICB1bml0cyA6IFwiTWcvaGFcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJcIlxuICB9LFxuICBXRiA6IHtcbiAgICAgIGxhYmVsIDogXCJMZWFmIEJpb21hc3NcIixcbiAgICAgIHVuaXRzIDogXCJNZy9oYVwiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIlwiLFxuICAgICAgZm4gOiBmdW5jdGlvbihwcmVfV0YsIGN1cl9kVywgY3VyX3BGLCBjdXJfbGl0dGVyZmFsbCwgcHJldl9XRikge1xuICAgICAgICAgIHJldHVybiBwcmV2X1dGICsgY3VyX2RXICogY3VyX3BGIC0gY3VyX2xpdHRlcmZhbGwgKiBwcmV2X1dGXG4gICAgICB9XG4gIH0sXG4gIFdSIDoge1xuICAgICAgbGFiZWwgOiBcIlJvb3QgQmlvbWFzc1wiLFxuICAgICAgdW5pdHMgOiBcIk1nL2hhXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiXCIsXG4gICAgICBmbiA6IGZ1bmN0aW9uKHByZXZfV1IsIGN1cl9kVywgY3VyX3BSLCB0dXJub3ZlciwgcHJldl9XUiwgY3VyX1Jvb3RQKSB7XG4gICAgICAgICAgcmV0dXJuIHByZXZfV1IgKyBjdXJfZFcgKiBjdXJfcFIgLSB0cmVlLnBSLnR1cm5vdmVyICogcHJldl9XUiAtIGN1cl9Sb290UDtcbiAgICAgIH1cbiAgfSxcbiAgV1MgOiB7XG4gICAgICBsYWJlbCA6IFwiU3RlbSBCaW9tYXNzXCIsXG4gICAgICB1bml0cyA6IFwiTWcvaGFcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJcIixcbiAgICAgIGZuIDogZnVuY3Rpb24ocHJldl9XUywgY3VyX2RXLCBjdXJfcFMpIHsgcmV0dXJuIHByZXZfV1MgKyBjdXJfZFcgKiBjdXJfcFMgfVxuICB9LFxuICBXIDoge1xuICAgICAgbGFiZWwgOiBcIlRvdGFsIEJpb21hc3NcIixcbiAgICAgIHVuaXRzIDogXCJNZy9oYVwiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIlwiLFxuICAgICAgZm4gOiBmdW5jdGlvbihjdXJfV0YsIGN1cl9XUiwgY3VyX1dTKSB7IHJldHVybiBjdXJfV0YrY3VyX1dSK2N1cl9XUyB9XG4gIH1cbn1cbiIsInZhciBtb2RlbElPID0gcmVxdWlyZSgnLi4vbW9kZWxSdW5IYW5kbGVyJyk7XG52YXIgYXBwO1xuXG52YXIgc2hvdyA9IGZ1bmN0aW9uKHJlc3VsdHMpIHtcbiAgdmFyIGksIHo7XG5cbiAgLy8gc2VsZWN0ZWQgaW4gdGhlIGNoYXJ0cyBvdXRwdXRcbiAgdmFyIHZhcnMgPSAkKFwiI2NoYXJ0VHlwZUlucHV0XCIpLnZhbCgpO1xuXG4gIC8vIGZpbmQgdGhlIHJvd3Mgd2UgY2FyZSBhYm91dFxuICB2YXIgY2hhcnRSb3dzID0ge307XG4gIGZvciggaSA9IDA7IGkgPCByZXN1bHRzWzBdLmhlYWRlci5sZW5ndGg7IGkrKyApIHtcbiAgICAgIGlmKCB2YXJzLmluZGV4T2YocmVzdWx0c1swXS5oZWFkZXJbaV0pID4gLTEgKSBjaGFydFJvd3NbcmVzdWx0c1swXS5oZWFkZXJbaV1dID0gaTtcbiAgfVxuXG4gIHZhciB0YWJzID0gJCgnPHVsIGNsYXNzPVwibmF2IG5hdi1waWxsc1wiIGlkPVwicmF3T3V0cHV0VGFic1wiICBkYXRhLXRhYnM9XCJwaWxsXCI+PC91bD4nKTtcbiAgdmFyIGNvbnRlbnRzID0gJCgnPGRpdiBjbGFzcz1cInRhYi1jb250ZW50XCIgc3R5bGU9XCJvdmVyZmxvdzphdXRvO21hcmdpbi10b3A6MTVweFwiPjwvZGl2PicpO1xuXG4gIGZvciggaSA9IDA7IGkgPCB2YXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0YWJzLmFwcGVuZCgkKCc8bGkgJysoaSA9PT0gMCA/ICdjbGFzcz1cImFjdGl2ZVwiJyA6IFwiXCIpKyc+PGEgaHJlZj1cIiNyYXdvdXQnXG4gICAgICAgICAgK3ZhcnNbaV0rJ1wiIGRhdGEtdG9nZ2xlPVwidGFiXCI+Jyt2YXJzW2ldKyc8L2E+PC9saT4nKSk7XG5cbiAgICAgIGNvbnRlbnRzLmFwcGVuZCgkKCc8ZGl2IGNsYXNzPVwidGFiLXBhbmUgJyArIChpID09PSAwID8gJ2FjdGl2ZScgOiBcIlwiKVxuICAgICAgICAgICsgJ1wiIGlkPVwicmF3b3V0JyArIHZhcnNbaV0gKyAnXCI+PC9kaXY+JykpO1xuICB9XG5cbiAgJChcIiNvdXRwdXQtY29udGVudFwiKS5odG1sKFwiXCIpLmFwcGVuZCh0YWJzKS5hcHBlbmQoY29udGVudHMpO1xuICAkKFwiI3Jhd091dHB1dFRhYnNcIikudGFiKCk7XG5cbiAgY3N2UmVzdWx0cyA9IHtcbiAgICAgIGNvbmZpZyA6IG1vZGVsSU8uZXhwb3J0U2V0dXAoKSxcbiAgICAgIGlucHV0cyA6IFtdLFxuICAgICAgaGVhZGVyIDogcmVzdWx0c1swXS5oZWFkZXIsXG4gICAgICBkYXRhIDoge31cbiAgfTtcbiAgZm9yKCB2YXIgaSA9IDA7IGkgPCByZXN1bHRzLmxlbmd0aDsgaSsrICkge1xuICAgIGNzdlJlc3VsdHMuaW5wdXRzLnB1c2gocmVzdWx0c1tpXS5pbnB1dHMpO1xuICB9XG5cbiAgdmFyIGNEYXRlID0gbmV3IERhdGUoJChcIiNpbnB1dC1tYW5hZ2UtZGF0ZVBsYW50ZWRcIikudmFsKCkpO1xuXG4gIHZhciB0YWJsZSwgcm93O1xuICBmb3IoIHZhciBrZXkgaW4gY2hhcnRSb3dzICkge1xuICAgICAgdGFibGUgPSBcIjx0YWJsZSBjbGFzcz0ndGFibGUgdGFibGUtc3RyaXBlZCc+XCI7XG5cbiAgICAgIGNzdlJlc3VsdHMuZGF0YVtrZXldID0gW107XG5cblxuICAgICAgLy8gc2V0IGhlYWRlciByb3dcbiAgICAgIHZhciBjdXJyZW50Um93ID0gW107XG4gICAgICBjdXJyZW50Um93LnB1c2goJ2RhdGUnKTtcbiAgICAgIC8vY3VycmVudFJvdy5wdXNoKCdzdGVwJyk7XG5cbiAgICAgIHRhYmxlICs9IFwiPHRyPjx0aD5EYXRlPC90aD48dGg+U3RlcDwvdGg+XCI7XG5cbiAgICAgIGZvciggeiA9IDA7IHogPCByZXN1bHRzLmxlbmd0aDsgeisrICkge1xuICAgICAgICAgIHRhYmxlICs9IFwiPHRoPlwiO1xuICAgICAgICAgIHZhciB0bXAgPSBbXTtcblxuICAgICAgICAgIGZvciggdmFyIG1UeXBlIGluIHJlc3VsdHNbel0uaW5wdXRzICkge1xuICAgICAgICAgICAgICB0bXAucHVzaChtVHlwZStcIj1cIityZXN1bHRzW3pdLmlucHV0c1ttVHlwZV0pO1xuICAgICAgICAgICAgICB0YWJsZSArPSBcIjxkaXY+XCIrbVR5cGUrXCI9XCIrcmVzdWx0c1t6XS5pbnB1dHNbbVR5cGVdK1wiPC9kaXY+XCI7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYoIHRtcC5sZW5ndGggPT09IDAgKSB7XG4gICAgICAgICAgICAgIGN1cnJlbnRSb3cucHVzaChrZXkpO1xuICAgICAgICAgICAgICB0YWJsZSArPSBrZXk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY3VycmVudFJvdy5wdXNoKHRtcC5qb2luKFwiIFwiKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRhYmxlICs9IFwiPC90aD5cIjtcbiAgICAgIH1cbiAgICAgIHRhYmxlICs9IFwiPC90cj5cIjtcbiAgICAgIGNzdlJlc3VsdHMuZGF0YVtrZXldLnB1c2goY3VycmVudFJvdyk7XG4gICAgICB2YXIgYyA9IDA7XG5cbiAgICAgIGZvciggdmFyIGRhdGUgaW4gcmVzdWx0c1swXS5vdXRwdXQgKSB7XG4gICAgICAgIGMrKztcbiAgICAgICAgY3VycmVudFJvdyA9IFtdO1xuXG4gICAgICAgIHRhYmxlICs9IFwiPHRyPjx0ZD5cIitkYXRlK1wiPC90ZD48dGQ+XCIrYytcIjwvdGQ+XCI7XG5cbiAgICAgICAgY3VycmVudFJvdy5wdXNoKGRhdGUpO1xuICAgICAgICAvL2N1cnJlbnRSb3cucHVzaChjKTtcblxuICAgICAgICB2YXIgdjtcbiAgICAgICAgZm9yKCB6ID0gMDsgeiA8IHJlc3VsdHMubGVuZ3RoOyB6KysgKSB7XG4gICAgICAgICAgaWYoICFyZXN1bHRzW3pdLm91dHB1dFtkYXRlXSApIHtcbiAgICAgICAgICAgIHRhYmxlICs9IFwiPHRkPjwvdGQ+XCI7XG4gICAgICAgICAgICBjdXJyZW50Um93LnB1c2gobnVsbCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHYgPSByZXN1bHRzW3pdLm91dHB1dFtkYXRlXVtjaGFydFJvd3Nba2V5XV07XG4gICAgICAgICAgICB0YWJsZSArPSBcIjx0ZD5cIit2K1wiPC90ZD5cIjtcbiAgICAgICAgICAgIGN1cnJlbnRSb3cucHVzaCh2KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGFibGUgKz0gXCI8L3RyPlwiO1xuXG4gICAgICAgIGNzdlJlc3VsdHMuZGF0YVtrZXldLnB1c2goY3VycmVudFJvdyk7XG4gICAgICB9XG4gICAgICAkKFwiI3Jhd291dFwiICsga2V5KS5odG1sKHRhYmxlK1wiPC90YWJsZT5cIik7XG4gIH1cblxuICBhcHAuc2V0Q3N2UmVzdWx0cyhjc3ZSZXN1bHRzKTtcblxuICAvLyBtYWtlIHN1cmUgd2UgY2FuIHNlZSB0aGUgZXhwb3J0IGJ0blxuICBpZiggIW9mZmxpbmVNb2RlICkgJChcIiNzaG93LWV4cG9ydC1jc3ZcIikuc2hvdygpO1xuXG4gIHJldHVybiBjc3ZSZXN1bHRzO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNob3cgOiBzaG93LFxuICBpbml0IDogZnVuY3Rpb24oYSkge1xuICAgIGFwcCA9IGE7XG4gIH1cbn07XG4iLCJmdW5jdGlvbiBxcyhrZXkpIHtcbiAga2V5ID0ga2V5LnJlcGxhY2UoL1sqKz9eJC5cXFtcXF17fSgpfFxcXFxcXC9dL2csIFwiXFxcXCQmXCIpO1xuICB2YXIgbWF0Y2ggPSBsb2NhdGlvbi5zZWFyY2gubWF0Y2gobmV3IFJlZ0V4cChcIls/Jl1cIiArIGtleSArIFwiPShbXiZdKykoJnwkKVwiKSk7XG4gIHJldHVybiBtYXRjaCAmJiBkZWNvZGVVUklDb21wb25lbnQobWF0Y2hbMV0ucmVwbGFjZSgvXFwrL2csIFwiIFwiKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBxcyA6IHFzXG59O1xuIiwidmFyIG9wdGlvbnMgPSB7XG4gIHRpdGxlIDogJ1dlYXRoZXInLFxuICBoZWlnaHQgOiAzMDAsXG4gIHZBeGVzOiBbe1xuICAgICAgICAgIHRpdGxlOiBcIlJhZGlhdGlvbiAoTUovZGF5KTsgVGVtcGVyYXR1cmUgKF5DKTsgRGV3IFBvaW50ICheQyk7IERheWxpZ2h0IChoKVwiLFxuICAgICAgICAgIG1pblZhbHVlIDogLTUsXG4gICAgICAgICAgbWF4VmFsdWUgOiAzNVxuICAgICAgICB9LHtcbiAgICAgICAgICB0aXRsZTogXCJQcmVjaXBpdGF0aW9uIChtbSlcIixcbiAgICAgICAgICBtaW5WYWx1ZSA6IC01MCxcbiAgICAgICAgICBtYXhWYWx1ZSA6IDM1MFxuICAgICAgICB9XSxcbiAgaEF4aXM6IHt0aXRsZTogXCJNb250aFwifSxcbiAgc2VyaWVzVHlwZTogXCJiYXJzXCIsXG4gIHNlcmllczoge1xuICAgICAgMDoge3R5cGU6IFwibGluZVwiLCB0YXJnZXRBeGlzSW5kZXg6MH0sXG4gICAgICAxOiB7dHlwZTogXCJsaW5lXCIsIHRhcmdldEF4aXNJbmRleDowfSxcbiAgICAgIDI6IHt0eXBlOiBcImxpbmVcIiwgdGFyZ2V0QXhpc0luZGV4OjB9LFxuICAgICAgMzoge3R5cGU6IFwiYXJlYVwiLCB0YXJnZXRBeGlzSW5kZXg6MX0sXG4gICAgICA0OiB7dGFyZ2V0QXhpc0luZGV4OjB9XG4gIH1cbn07XG5cbmZ1bmN0aW9uIGNyZWF0ZShyb290LCBkYXRhKSB7XG4gICQocm9vdCkuaHRtbCgnJyk7XG5cbiAgdmFyIGR0ID0gbmV3IGdvb2dsZS52aXN1YWxpemF0aW9uLkRhdGFUYWJsZSgpO1xuICBkdC5hZGRDb2x1bW4oJ3N0cmluZycsICdNb250aCcpO1xuICBkdC5hZGRDb2x1bW4oJ251bWJlcicsICdNaW4gVGVtcGVyYXR1cmUnKTtcbiAgZHQuYWRkQ29sdW1uKCdudW1iZXInLCAnTWF4IFRlbXBlcmF0dXJlJyk7XG4gIGR0LmFkZENvbHVtbignbnVtYmVyJywgJ0RldyBQb2ludCcpO1xuICBkdC5hZGRDb2x1bW4oJ251bWJlcicsICdQcmVjaXBpdGF0aW9uJyk7XG4gIGR0LmFkZENvbHVtbignbnVtYmVyJywgJ1JhZGlhdGlvbicpO1xuICBkdC5hZGRDb2x1bW4oJ251bWJlcicsICdEYXlsaWdodCcpO1xuXG4gIGZvciggdmFyIGRhdGUgaW4gZGF0YSApIHtcbiAgICAgIHZhciBvYmogPSBkYXRhW2RhdGVdO1xuICAgICAgZHQuYWRkUm93KFtcbiAgICAgICAgICBkYXRlKycnLFxuICAgICAgICAgIG9iai50bWluIHx8IDAsXG4gICAgICAgICAgb2JqLnRtYXggfHwgMCxcbiAgICAgICAgICBvYmoudGRtZWFuIHx8IDAsXG4gICAgICAgICAgb2JqLnBwdCB8fCAwLFxuICAgICAgICAgIG9iai5yYWQgfHwgMCxcbiAgICAgICAgICBvYmouZGF5bGlnaHQgfHwgMFxuICAgICAgXSk7XG4gIH1cblxuICB2YXIgY2hhcnQgPSBuZXcgZ29vZ2xlLnZpc3VhbGl6YXRpb24uQ29tYm9DaGFydChyb290KTtcbiAgY2hhcnQuZHJhdyhkdCwgb3B0aW9ucyk7XG5cbiAgcmV0dXJuIGNoYXJ0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgY3JlYXRlIDogY3JlYXRlXG59O1xuIiwidmFyIGFwcCA9IHJlcXVpcmUoJy4uL2FwcCcpO1xuXG4vLyBhZGQgc3ByZWFkc2hlZXQgdml6IHNvdXJjZVxuLy8gaHR0cHM6Ly9zcHJlYWRzaGVldHMuZ29vZ2xlLmNvbS90cT90cT1zZWxlY3QlMjAqJmtleT0wQXY3Y1VWLW8yUVFZZEhaRllXSk5OV3BSUzFoSVZXaEdRVGhsTFdad1pXYyZ1c3A9ZHJpdmVfd2ViI2dpZD0wXG5cbmZ1bmN0aW9uIGluaXQoKSB7XG52YXIgZHJvcFpvbmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZHJvcF96b25lJyk7XG5kcm9wWm9uZS5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIF9oYW5kbGVEcmFnT3ZlciwgZmFsc2UpO1xuZHJvcFpvbmUuYWRkRXZlbnRMaXN0ZW5lcignZHJvcCcsIF9oYW5kbGVGaWxlU2VsZWN0LCBmYWxzZSk7XG5cbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaWxlcycpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIF9oYW5kbGVGaWxlU2VsZWN0LCBmYWxzZSk7XG5cbiAgICAkKCcjc3ByZWFkc2hlZXQtd2VhdGhlci1pbnB1dC1idG4nKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICBfaGFuZGxlR29vZ2xlU3ByZWFkc2hlZXQoKTtcbiAgICB9KTtcbiAgICAkKCcjc3ByZWFkc2hlZXQtd2VhdGhlci1pbnB1dCcpLm9uKCdrZXl1cCcsIGZ1bmN0aW9uKGUpe1xuICAgICAgICBpZiggZS53aGljaCA9PSAxMyApIF9oYW5kbGVHb29nbGVTcHJlYWRzaGVldCgpO1xuICAgIH0pO1xuXG4gICAgJCgnI3dlYXRoZXJSZWFkZXItbG9jYWxmaWxlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgJCgnI3dlYXRoZXJSZWFkZXItbG9jYWxmaWxlLXBhbmVsJykudG9nZ2xlKCdzbG93Jyk7XG4gICAgfSk7XG4gICAgJCgnI3dlYXRoZXJSZWFkZXItc3ByZWFkc2hlZXQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICAkKCcjd2VhdGhlclJlYWRlci1zcHJlYWRzaGVldC1wYW5lbCcpLnRvZ2dsZSgnc2xvdycpO1xuICAgIH0pO1xuXG59XG5cbmZ1bmN0aW9uIF9oYW5kbGVHb29nbGVTcHJlYWRzaGVldCgpIHtcbiAgICBnYSgnc2VuZCcsICdldmVudCcsICd1aScsICdpbnRlcmFjdGlvbicsICdsb2FkLXdlYXRoZXItZHJpdmUtZmlsZScsIDEpO1xuXG4gICAgdmFyIHZhbCA9ICQoJyNzcHJlYWRzaGVldC13ZWF0aGVyLWlucHV0JykudmFsKCk7XG4gICAgaWYoIHZhbC5sZW5ndGggPT0gMCApIHJldHVybjtcblxuICAgIGlmKCAhdmFsLm1hdGNoKC9eaHR0cC4qLyApICkgdmFsID0gJ2h0dHBzOi8vJyt2YWw7XG5cbiAgICB2YXIgZmlsZVBhbmVsID0gbmV3IFdlYXRoZXJGaWxlKCk7XG4gICAgdmFyIHJvb3QgPSAkKFwiI2ZpbGVfbGlzdFwiKTtcbiAgICBmaWxlUGFuZWwuaW5pdEZyb21VcmwodmFsLCByb290KTtcbiAgICAkKCcjc3ByZWFkc2hlZXQtd2VhdGhlci1pbnB1dCcpLnZhbCgnJyk7XG59XG5cbmZ1bmN0aW9uIF9oYW5kbGVGaWxlU2VsZWN0KGV2dCkge1xuICAgIGdhKCdzZW5kJywgJ2V2ZW50JywgJ3VpJywgJ2ludGVyYWN0aW9uJywgJ2xvYWQtd2VhdGhlci1sb2NhbC1maWxlJywgMSk7XG5cbiAgZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xuICBldnQucHJldmVudERlZmF1bHQoKTtcblxuICB2YXIgZmlsZXMgPSBldnQuZGF0YVRyYW5zZmVyID8gZXZ0LmRhdGFUcmFuc2Zlci5maWxlcyA6IGV2dC50YXJnZXQuZmlsZXM7IC8vIEZpbGVMaXN0IG9iamVjdC5cblxuICAvLyBmaWxlcyBpcyBhIEZpbGVMaXN0IG9mIEZpbGUgb2JqZWN0cy4gTGlzdCBzb21lIHByb3BlcnRpZXMuXG4gIHZhciByb290ID0gJChcIiNmaWxlX2xpc3RcIik7XG4gIGZvciAodmFyIGkgPSAwLCBmOyBmID0gZmlsZXNbaV07IGkrKykge1xuICAgIHZhciBmaWxlUGFuZWwgPSBuZXcgV2VhdGhlckZpbGUoKTtcbiAgICBmaWxlUGFuZWwuaW5pdChmLCByb290KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfaGFuZGxlRHJhZ092ZXIoZXZ0KSB7XG5ldnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5ldnQucHJldmVudERlZmF1bHQoKTtcbmV2dC5kYXRhVHJhbnNmZXIuZHJvcEVmZmVjdCA9ICdjb3B5JzsgLy8gRXhwbGljaXRseSBzaG93IHRoaXMgaXMgYSBjb3B5LlxufVxuXG4vLyBvbiBhZGQsIGlmIHRoZSBsaXN0IGlzIGVtcHR5LCBsZXQncyBjbG9zZSB0aGUgcG9wdXBcbmZ1bmN0aW9uIF9vbkNvbXBsZXRlKCkge1xuICAgIGlmKCAkKFwiI2ZpbGVfbGlzdFwiKS5jaGlsZHJlbigpLmxlbmd0aCA9PSAwICkge1xuICAgICAgICAkKCcjd2VhdGhlclJlYWRlci1tb2RhbCcpLm1vZGFsKCdoaWRlJyk7XG4gICAgfVxufVxuXG52YXIgV2VhdGhlckZpbGUgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGhlYWRlcnMgPSB7XG4gICAgICAgIGRhdGUgICAgIDoge1xuICAgICAgICAgICAgbGFiZWwgOiAnRGF0ZScsXG4gICAgICAgICAgICB1bml0cyA6ICdEYXRlJyxcbiAgICAgICAgICAgIGNvbCAgIDogLTFcbiAgICAgICAgfSxcbiAgICAgICAgdG1pbiAgICAgOiB7XG4gICAgICAgICAgICBsYWJlbCA6ICdNaW4gVGVtcGVyYXR1cmUnLFxuICAgICAgICAgICAgdW5pdHMgOiAnQycsXG4gICAgICAgICAgICBjb2wgICA6IC0xXG4gICAgICAgIH0sXG4gICAgICAgIHRtYXggICAgIDoge1xuICAgICAgICAgICAgbGFiZWwgOiAnTWF4IFRlbXBlcmF0dXJlJyxcbiAgICAgICAgICAgIHVuaXRzIDogJ0MnLFxuICAgICAgICAgICAgY29sICAgOiAtMVxuICAgICAgICB9LFxuICAgICAgICB0ZG1lYW4gICA6IHtcbiAgICAgICAgICAgIGxhYmVsIDogJ01lYW4gVGVtcGVyYXR1cmUnLFxuICAgICAgICAgICAgdW5pdHMgOiAnQycsXG4gICAgICAgICAgICBjb2wgICA6IC0xXG4gICAgICAgIH0sXG4gICAgICAgIHBwdCAgICAgIDoge1xuICAgICAgICAgICAgbGFiZWwgOiAnUHJlY2lwaXRpb24nLFxuICAgICAgICAgICAgdW5pdHMgOiAnbW0nLFxuICAgICAgICAgICAgY29sICAgOiAtMVxuICAgICAgICB9LFxuICAgICAgICByYWQgICAgICA6IHtcbiAgICAgICAgICAgIGxhYmVsIDogJ1JhZGlhdGlvbicsXG4gICAgICAgICAgICB1bml0cyA6ICdNSiBtLTIgZGF5LTEnLFxuICAgICAgICAgICAgY29sICAgOiAtMVxuICAgICAgICB9LFxuICAgICAgICBkYXlsaWdodCA6IHtcbiAgICAgICAgICAgIGxhbmVsIDogJ0RheWxpZ2h0IEhvdXJzJyxcbiAgICAgICAgICAgIHVuaXRzIDogJ2hvdXJzJyxcbiAgICAgICAgICAgIGNvbCAgIDogLTFcbiAgICAgICAgfVxuICAgIH07XG5cblxuICB2YXIgZWxlID0gJCgnPGRpdiBzdHlsZT1cInRleHQtYWxpZ246IGxlZnRcIj4nK1xuICAgICAgICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiY2xvc2VcIiBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9idXR0b24+JytcbiAgICAgICc8ZGl2IGNsYXNzPVwiZmlsZW5hbWVcIj48L2Rpdj4nK1xuICAgICAgJzxkaXYgY2xhc3M9XCJwcm9ncmVzc1wiPicrXG4gICAgICAnPGRpdiBjbGFzcz1cInByb2dyZXNzLWJhclwiIHJvbGU9XCJwcm9ncmVzc2JhclwiIGFyaWEtdmFsdWVub3c9XCIwXCIgYXJpYS12YWx1ZW1pbj1cIjBcIiBhcmlhLXZhbHVlbWF4PVwiMTAwXCIgc3R5bGU9XCJ3aWR0aDogMCU7XCI+JytcbiAgICAgICAgJzxzcGFuIGNsYXNzPVwic3Itb25seVwiPjAlIENvbXBsZXRlPC9zcGFuPicrXG4gICAgICAnPC9kaXY+JytcbiAgICAnPC9kaXY+JytcbiAgICAgICc8ZGl2IGNsYXNzPVwic3RhdHVzXCI+JytcbiAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImRhdGUtcmFuZ2VcIj48L2Rpdj4nK1xuICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwicHJldmlldy1kYXRhXCIgc3R5bGU9XCJkaXNwbGF5Om5vbmVcIj4nK1xuICAgICAgICAgICAgICAgICAgICAnPGRpdj48YSBjbGFzcz1cImJ0biBidG4tbGluayBwcmV2aWV3LWRhdGEtYnRuXCI+UHJldmlldyBEYXRhPC9hPjwvZGl2PicrXG4gICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwicHJldmlldy1kYXRhLXRhYmxlXCIgc3R5bGU9XCJkaXNwbGF5Om5vbmVcIj48L2Rpdj4nK1xuICAgICAgICAgICAgICAgICc8L2Rpdj4nK1xuICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiY29sLXN0YXR1c1wiIHN0eWxlPVwiZGlzcGxheTpub25lXCI+PC9kaXY+JytcbiAgICAgICAgICAgICAgICAnPGRpdiBzdHlsZT1cImhlaWdodDo1MHB4XCI+JytcbiAgICAgICAgICAgICAgICAgICAgJzxhIGNsYXNzPVwiYnRuIGJ0bi1saW5rIG1hcC1kYXRhLWJ0blwiPk1hcCBDU1YgQ29sdW1uczwvYT4nK1xuICAgICAgICAgICAgICAgICAgICAnPGEgY2xhc3M9XCJidG4gYnRuLXN1Y2Nlc3MgZGlzYWJsZWQgcHVsbC1yaWdodFwiPkFkZCBEYXRhPC9hPicrXG4gICAgICAgICAgICAgICAgJzwvZGl2PicrXG4gICAgICAgICAgICAnPC9kaXY+JytcbiAgICAnPC9kaXY+Jyk7XG5cbiAgdmFyIGRhdGEgPSB7fTtcbiAgICB2YXIgY3N2VGFibGUgPSBbXTtcblxuICAgIC8vIG9ubHkgYXV0byBoaWRlIHRoZSBmaXJzdCB0aW1lXG4gICAgdmFyIGF1dG9IaWRlID0gdHJ1ZTtcblxuICAvLyB0aGUgZmlsZSByZWFkZXIgb2JqZWN0IGFuZCB0aGUgZWxlbWVudFxuICBmdW5jdGlvbiBpbml0KGZpbGUsIHJvb3RFbGUpIHtcbiAgICB2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICByZWFkZXIub25lcnJvciA9IGVycm9ySGFuZGxlcjtcbiAgICByZWFkZXIub25wcm9ncmVzcyA9IHVwZGF0ZVByb2dyZXNzO1xuICAgIHJlYWRlci5vbmxvYWRzdGFydCA9IGZ1bmN0aW9uKGUpIHt9O1xuICAgIHJlYWRlci5vbmxvYWQgPSBmdW5jdGlvbihlKSB7XG4gICAgICBlbGUuZmluZCgnLnByb2dyZXNzJykucmVtb3ZlKCk7XG4gICAgICBwYXJzZShlLnRhcmdldC5yZXN1bHQpO1xuICAgIH1cbiAgICByZWFkZXIucmVhZEFzVGV4dChmaWxlKVxuXG4gICAgZWxlLmZpbmQoJy5maWxlbmFtZScpLmh0bWwoZ2V0TmFtZShmaWxlKSk7XG4gICAgcm9vdEVsZS5hcHBlbmQoZWxlKTtcblxuICAgICAgICBfc2V0SGFuZGxlcnMoKTtcbiAgfVxuXG4gICAgZnVuY3Rpb24gaW5pdEZyb21VcmwodXJsLCByb290RWxlKSB7XG4gICAgICAgIHZhciBxID0gbmV3IGdvb2dsZS52aXN1YWxpemF0aW9uLlF1ZXJ5KHVybCk7XG4gICAgICAgIGVsZS5maW5kKCcucHJvZ3Jlc3MnKS5odG1sKCdRdWVyeWluZyBzcHJlYWRzaGVldC4uLicpO1xuXG4gICAgICAgIHZhciBrZXkgPSBnZXRLZXkodXJsKTtcbiAgICAgICAgZWxlLmZpbmQoJy5maWxlbmFtZScpLmh0bWwoJzxoMyBzdHlsZT1cImJvcmRlci1ib3R0b206MXB4IHNvbGlkICNlZWU7cGFkZGluZzoxNXB4IDAgNHB4IDBcIj48aSBjbGFzcz1cImljb24tdGludFwiPjwvaT4gJytcbiAgICAgICAgICAgICdHb29nbGUgU3ByZWFkc2hlZXQnKyhrZXkubGVuZ3RoID4gMCA/ICc8YnIgLz48c3BhbiBzdHlsZT1cImNvbG9yOiM4ODg7Zm9udC1zaXplOjE0cHhcIj4nK2tleSsnPC9zcGFuPicgOiAnJykrJzwvaDM+Jyk7XG5cbiAgICAgICAgcm9vdEVsZS5hcHBlbmQoZWxlKTtcblxuICAgICAgICBxLnNldFF1ZXJ5KCdTRUxFQ1QgKicpO1xuICAgICAgICBxLnNlbmQoZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgICAgICAgICAgZWxlLmZpbmQoJy5wcm9ncmVzcycpLnJlbW92ZSgpO1xuXG4gICAgICAgICAgICBpZiAocmVzcG9uc2UuaXNFcnJvcigpKSB7XG4gICAgICAgICAgICAgICAgc2V0RXJyb3IoJ0Vycm9yIGluIHF1ZXJ5OiAnICsgcmVzcG9uc2UuZ2V0TWVzc2FnZSgpICsgJyAnICsgcmVzcG9uc2UuZ2V0RGV0YWlsZWRNZXNzYWdlKCkpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcGFyc2UoZHRUb0NzdihyZXNwb25zZS5nZXREYXRhVGFibGUoKSkpO1xuICAgICAgICB9KTtcblxuICAgICAgICBfc2V0SGFuZGxlcnMoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBfc2V0SGFuZGxlcnMoKSB7XG4gICAgICAgIGVsZS5maW5kKCcubWFwLWRhdGEtYnRuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGVsZS5maW5kKCcuY29sLXN0YXR1cycpLnRvZ2dsZSgnc2xvdycpO1xuICAgICAgICB9KTtcblxuICAgICAgICBlbGUuZmluZCgnLnByZXZpZXctZGF0YS1idG4nKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgZWxlLmZpbmQoJy5wcmV2aWV3LWRhdGEtdGFibGUnKS50b2dnbGUoJ3Nsb3cnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZWxlLmZpbmQoJy5jbG9zZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBlbGUucmVtb3ZlKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGVsZS5maW5kKCcuYnRuLXN1Y2Nlc3MnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgYXBwLnNldFdlYXRoZXIoZGF0YSk7XG4gICAgICAgICAgICBlbGUucmVtb3ZlKCk7XG4gICAgICAgICAgICBfb25Db21wbGV0ZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkdFRvQ3N2KGR0KSB7XG4gICAgICAgIHZhciBhcnIgPSBbW11dO1xuXG4gICAgICAgIGR0ID0gSlNPTi5wYXJzZShkdC50b0pTT04oKSk7XG4gICAgICAgIGZvciggdmFyIGkgPSAwOyBpIDwgZHQuY29scy5sZW5ndGg7IGkrKyApIHtcbiAgICAgICAgICAgIGFyclswXS5wdXNoKGR0LmNvbHNbaV0ubGFiZWwpO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yKCB2YXIgaSA9IDA7IGkgPCBkdC5yb3dzLmxlbmd0aDsgaSsrICkge1xuICAgICAgICAgICAgYXJyLnB1c2goW10pO1xuICAgICAgICAgICAgZm9yKCB2YXIgaiA9IDA7IGogPCBkdC5yb3dzW2ldLmMubGVuZ3RoOyBqKysgKSB7XG4gICAgICAgICAgICAgICAgaWYoICFkdC5yb3dzW2ldLmNbal0gKSBhcnJbaSsxXS5wdXNoKCcnKTtcbiAgICAgICAgICAgICAgICBlbHNlIGFycltpKzFdLnB1c2goZHQucm93c1tpXS5jW2pdLnYpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGNzdiA9ICcnO1xuICAgICAgICBmb3IoIHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKyApIHtcbiAgICAgICAgICAgIGNzdiArPSBhcnJbaV0uam9pbignLCcpKydcXG4nO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNzdjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRLZXkodXJsKSB7XG4gICAgICAgIHZhciBwYXJ0cyA9IHVybC5zcGxpdCgnPycpO1xuICAgICAgICBpZiggcGFydHMubGVuZ3RoID09IDEgKSByZXR1cm4gJyc7XG5cbiAgICAgICAgcGFydHMgPSBwYXJ0c1sxXS5zcGxpdCgnJicpO1xuICAgICAgICBmb3IoIHZhciBpID0gMDsgaSA8IHBhcnRzLmxlbmd0aDsgaSsrICkge1xuICAgICAgICAgICAgaWYoIHBhcnRzW2ldLnNwbGl0KCc9JylbMF0gPT0gJ2tleScgKSByZXR1cm4gcGFydHNbaV0uc3BsaXQoJz0nKVsxXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gIGZ1bmN0aW9uIGdldE5hbWUoZikge1xuICAgIHJldHVybiBbJzxoMyBzdHlsZT1cImJvcmRlci1ib3R0b206MXB4IHNvbGlkICNlZWU7cGFkZGluZzoxNXB4IDAgNHB4IDBcIj48aSBjbGFzcz1cImljb24tdGludFwiPjwvaT4gJywgZi5uYW1lLFxuICAgICAgICAgICAgICAgICcgPHNwYW4gc3R5bGU9XCJjb2xvcjojODg4O2ZvbnQtc2l6ZToxNnB4XCI+KCcsIGYudHlwZSB8fCAnbi9hJyxcbiAgICAgICAgICAgICAgICAnKTwvc3Bhbj4gLSA8c3BhbiBzdHlsZT1cImZvbnQtc2l6ZToxNnB4XCI+JywgZi5zaXplLCAnIGJ5dGVzPC9zcGFuPicsICc8L2gzPiddLmpvaW4oJycpO1xuICB9XG5cbiAgZnVuY3Rpb24gcGFyc2UoZGF0YSkge1xuICAgIGRhdGEgPSBkYXRhLnJlcGxhY2UoL15cXHMqXFxuL2csJycpLnNwbGl0KCdcXG4nKTtcblxuICAgIHZhciB0YWJsZSA9IFtdO1xuICAgIGZvciggdmFyIGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKyApIHtcbiAgICAgIHRhYmxlLnB1c2goZGF0YVtpXS5zcGxpdCgnLCcpKTtcbiAgICB9XG5cbiAgICAgICAgaWYoIHRhYmxlLmxlbmd0aCA9PSAwICkgcmV0dXJuIHNldEVycm9yKCdGaWxlIGRpZCBub3QgY29udGFpbiBhbnkgaW5mb3JtYXRpb24uJyk7XG4gICAgICAgIGNzdlRhYmxlID0gdGFibGU7XG5cbiAgICAgICAgcGFyc2VIZWFkZXIodGFibGVbMF0pO1xuICAgICAgICBnZXREYXRlUmFuZ2UoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXREYXRlUmFuZ2UoKSB7XG4gICAgICAgIGVsZS5maW5kKCcuZGF0ZS1yYW5nZScpLmh0bWwoJycpO1xuICAgICAgICBpZiggaGVhZGVycy5kYXRlLmNvbCA9PSAtMSApIHJldHVybiBlbGUuZmluZCgnLmRhdGUtcmFuZ2UnKS5odG1sKCdEYXRlIGNvbHVtbiBuZWVkcyB0byBiZSBtYXRjaGVkLicpO1xuICAgICAgICBpZiggdHlwZW9mIGhlYWRlcnMuZGF0ZS5jb2wgPT0gJ3N0cmluZycgKSBoZWFkZXJzLmRhdGUuY29sID0gcGFyc2VJbnQoaGVhZGVycy5kYXRlLmNvbCk7XG5cbiAgICAgICAgdmFyIGRhdGVzID0ge307XG4gICAgICAgIHZhciBkaXNwbGF5RGF0ZXMgPSBbXTtcbiAgICAgICAgZm9yKCB2YXIgaSA9IDE7IGkgPCBjc3ZUYWJsZS5sZW5ndGg7IGkrKyApIHtcbiAgICAgICAgICAgIGlmKCBoZWFkZXJzLmRhdGUuY29sIDwgY3N2VGFibGVbaV0ubGVuZ3RoICYmIGNzdlRhYmxlW2ldLmxlbmd0aCA+PSA3ICnCoHtcbiAgICAgICAgICAgICAgICB2YXIgcCA9IGNzdlRhYmxlW2ldW2hlYWRlcnMuZGF0ZS5jb2xdLnNwbGl0KFwiLVwiKTtcbiAgICAgICAgICAgICAgICBpZiggcC5sZW5ndGggIT0gMyAmJiBwLmxlbmd0aCAhPSAyICkgcmV0dXJuIHNldEVycm9yKFwiRGF0ZTogXCIrY3N2VGFibGVbaV1baGVhZGVycy5kYXRlLmNvbF0rXCIgaXMgbm90IGEgdmFsaWQgZm9ybWF0ICh5eXl5LW1tLWRkIG9yIHl5eXktbW0pXCIpO1xuXG4gICAgICAgICAgICAgICAgaWYoICFkYXRlc1twWzBdXSApIGRhdGVzW3BbMF1dID0gW107XG4gICAgICAgICAgICAgICAgdmFyIG1tZGQgPSBwWzFdO1xuXG4gICAgICAgICAgICAgICAgaWYoIGRhdGVzW3BbMF1dLmluZGV4T2YobW1kZCkgIT0gLTEgKSByZXR1cm4gc2V0RXJyb3IoXCJEYXRlOiBcIitjc3ZUYWJsZVtpXVtoZWFkZXJzLmRhdGUuY29sXStcIiBpcyBpbiBkYXRhc2V0IHR3aWNlXCIpO1xuICAgICAgICAgICAgICAgIGRhdGVzW3BbMF1dLnB1c2gobW1kZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmb3IoIHZhciB5ZWFyIGluIGRhdGVzICkge1xuICAgICAgICAgICAgaWYoIGRhdGVzW3llYXJdLmxlbmd0aCA9PSAxMikge1xuICAgICAgICAgICAgICAgIGRpc3BsYXlEYXRlcy5wdXNoKHllYXIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5RGF0ZXMucHVzaCh5ZWFyKycgWycrZGF0ZXNbeWVhcl0uam9pbignLCAnKSsnXScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZWxlLmZpbmQoJy5kYXRlLXJhbmdlJykuaHRtbCgnPGI+RGF0ZSBSYW5nZTo8L2I+ICcrZGlzcGxheURhdGVzLmpvaW4oJywgJykpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhcnNlSGVhZGVyKGhlYWRlclJvdykge1xuICAgICAgICB2YXIgbWF0Y2hlZCA9IFtdO1xuXG4gICAgICAgIHZhciBodG1sID0gJzx0YWJsZSBjbGFzcz1cInRhYmxlIHRhYmxlLXN0cmlwZWRcIj4nO1xuICAgICAgICBodG1sICs9ICc8dHI+PHRoPktleTwvdGg+PHRoPkNvbHVtbiAjPC90aD48L3RyPic7XG5cbiAgICAgICAgZm9yKCB2YXIga2V5IGluIGhlYWRlcnMgKSB7XG4gICAgICAgICAgICBpZiggaGVhZGVyUm93LmluZGV4T2Yoa2V5KSAhPSAtMSApIHtcbiAgICAgICAgICAgICAgICBoZWFkZXJzW2tleV0uY29sID0gaGVhZGVyUm93LmluZGV4T2Yoa2V5KTtcbiAgICAgICAgICAgICAgICBtYXRjaGVkLnB1c2goa2V5KTtcbiAgICAgICAgICAgICAgICBodG1sICs9ICc8dHI+PHRkPicra2V5Kyc8L3RkPjx0ZD48c3BhbiBjbGFzcz1cImxhYmVsIGxhYmVsLXN1Y2Nlc3NcIj4nK2hlYWRlcnNba2V5XS5jb2wrJyA8aSBjbGFzcz1cImljb24tb2tcIj48L2k+PC9zcGFuPjwvdGQ+PC90cj4nO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBodG1sICs9ICc8dHI+PHRkPicra2V5Kyc8L3RkPjx0ZD48c2VsZWN0IGNsYXNzPVwic2VsZWN0LScra2V5KydcIlwiPjwvc2VsZWN0PjwvdGQ+PC90cj4nO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsZS5maW5kKCcuY29sLXN0YXR1cycpLmh0bWwoaHRtbCsnPC90YWJsZT4nKTtcblxuXG4gICAgICAgIGlmKCBtYXRjaGVkLmxlbmd0aCAhPSA3ICkge1xuICAgICAgICAgICAgLy8gY3JlYXRlIHNlbGVjdCBlbGVtZW50IGZvciBtaXNzaW5nIGNvbCdzXG4gICAgICAgICAgICBlbGUuZmluZCgnLnN0YXR1cyBzZWxlY3QnKS5hcHBlbmQoJCgnPG9wdGlvbiB2YWx1ZT1cIlwiPltTZWxlY3QgQ29sdW1uXTwvb3B0aW9uPicpKTtcblxuICAgICAgICAgICAgLy8gaWYgaXQncyByYWRpYXRpb24sIGFkZCBvcHRpb24gZm9yIGNhbGN1bGF0aW5nXG4gICAgICAgICAgICAvLyBUT0RPXG5cbiAgICAgICAgICAgIC8vIGFwcGVuZCBtaXNzaW5nIGNvbHNcbiAgICAgICAgICAgIGZvciggdmFyIGkgPSAwOyBpIDwgaGVhZGVyUm93Lmxlbmd0aDsgaSsrICkge1xuICAgICAgICAgICAgICAgIGlmKCBtYXRjaGVkLmluZGV4T2YoaGVhZGVyUm93W2ldKSA9PSAtMSApIHtcbiAgICAgICAgICAgICAgICAgICAgZWxlLmZpbmQoJy5zdGF0dXMgc2VsZWN0JykuYXBwZW5kKCQoJzxvcHRpb24gdmFsdWU9XCInK2krJ1wiPicraSsnIC0gJytoZWFkZXJSb3dbaV0rJzwvb3B0aW9uPicpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHNldCB0aGUgY2hhbmdlIGhhbmRsZXJzIGZvciB0aGUgc2VsZWN0b3JzXG4gICAgICAgICAgICBlbGUuZmluZCgnLnN0YXR1cyBzZWxlY3QnKS5vbignY2hhbmdlJywgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICAgICAgdmFyIHZhbCA9ICQodGhpcykuZmluZCgnb3B0aW9uOnNlbGVjdGVkJykuYXR0cigndmFsdWUnKTtcbiAgICAgICAgICAgICAgICBpZiggdmFsICE9ICcnICkgaGVhZGVyc1t0aGlzLmNsYXNzTmFtZS5yZXBsYWNlKC9zZWxlY3QtLywnJyldLmNvbCA9IHZhbDtcblxuICAgICAgICAgICAgICAgIC8vIGlmIGFsbCBjb2x1bW5zIGFyZSBzZXQsIHJlbW92ZSBkaXNhYmxlZCBmcm9tIGJ0blxuICAgICAgICAgICAgICAgIHZhciByZWFkeSA9IHRydWU7XG4gICAgICAgICAgICAgICAgZm9yKCB2YXIga2V5IGluIGhlYWRlcnMgKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKCBoZWFkZXJzW2tleV0uY29sID09IC0xICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVhZHkgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYoIHJlYWR5ICkge1xuICAgICAgICAgICAgICAgICAgICBpZiggYXV0b0hpZGUgKSBlbGUuZmluZCgnLmNvbC1zdGF0dXMnKS5oaWRlKCdzbG93Jyk7XG4gICAgICAgICAgICAgICAgICAgIG9uUmVhZHkoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBkYXRhID0ge307XG4gICAgICAgICAgICAgICAgICAgIGVsZS5maW5kKCcuYnRuLXN1Y2Nlc3MnKS5hZGRDbGFzcygnZGlzYWJsZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgZWxlLmZpbmQoJy5wcmV2aWV3LWRhdGEnKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIHNob3cgdGhlIHRhYmxlXG4gICAgICAgICAgICBlbGUuZmluZCgnLmNvbC1zdGF0dXMnKS5zaG93KCdzbG93Jyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvblJlYWR5KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvblJlYWR5KCkge1xuICAgICAgICBhdXRvSGlkZSA9IGZhbHNlO1xuICAgICAgICBlbGUuZmluZCgnLmJ0bi1zdWNjZXNzJykucmVtb3ZlQ2xhc3MoJ2Rpc2FibGVkJyk7XG4gICAgICAgIHNldERhdGEoKTtcbiAgICAgICAgc2V0UHJldmlldygpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldFByZXZpZXcoKSB7XG4gICAgICAgIGVsZS5maW5kKCcucHJldmlldy1kYXRhJykuc2hvdygpO1xuXG4gICAgICAgIHZhciBodG1sID0gJzx0YWJsZSBjbGFzcz1cInRhYmxlIHRhYmxlLXN0cmlwZWRcIj48dHI+PHRoPmRhdGU8L3RoPic7XG4gICAgICAgIGZvciggdmFyIGtleSBpbiBoZWFkZXJzICl7XG4gICAgICAgICAgICBpZigga2V5ID09ICdkYXRlJyApIGNvbnRpbnVlO1xuICAgICAgICAgICAgaHRtbCArPSAnPHRoPicra2V5Kyc8L3RoPic7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgYyA9IDA7XG4gICAgICAgIGZvciggdmFyIGRhdGUgaW4gZGF0YSApe1xuICAgICAgICAgICAgaWYoIGMgPT0gMTAgKSB7XG4gICAgICAgICAgICAgICAgaHRtbCArPSAnPHRyPjx0ZCBjb2xzcGFuPVwiN1wiIHN0eWxlPVwidGV4dC1hbGlnbjpjZW50ZXJcIj4uLi48L3RkPjwvdHI+JztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaHRtbCArPSAnPHRyPjx0ZD4nK2RhdGUrJzwvdGQ+JztcbiAgICAgICAgICAgIGZvciggdmFyIGtleSBpbiBoZWFkZXJzICl7XG4gICAgICAgICAgICAgICAgaWYoIGtleSA9PSAnZGF0ZScgKSBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBodG1sICs9ICc8dGQ+JytkYXRhW2RhdGVdW2tleV0rJzwvdGQ+JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGh0bWwgKz0gJzwvdHI+JztcblxuICAgICAgICAgICAgYysrO1xuICAgICAgICB9XG5cbiAgICAgICAgZWxlLmZpbmQoJy5wcmV2aWV3LWRhdGEtdGFibGUnKS5odG1sKGh0bWwpO1xuICAgIH1cblxuICAvLyBzZXQgdGhlIG1hcCBvZiBjc3YgaGVhZGVyc1xuICBmdW5jdGlvbiBzZXREYXRhKCkge1xuICAgICAgICBkYXRhID0ge307XG4gICAgICAgIGZvciggdmFyIGkgPSAxOyBpIDwgY3N2VGFibGUubGVuZ3RoOyBpKysgKSB7XG4gICAgICAgICAgICBpZiggY3N2VGFibGVbaV0ubGVuZ3RoIDwgNyApIGNvbnRpbnVlOyAvLyBiYWQgcm93XG5cbiAgICAgICAgICAgIHZhciBkYXRlID0gY3N2VGFibGVbaV1baGVhZGVycy5kYXRlLmNvbF07XG5cbiAgICAgICAgICAgIGlmKCAhZGF0ZSApIGNvbnRpbnVlOyAvLyBiYWQgcm93XG5cbiAgICAgICAgICAgIGlmKCBkYXRlLnNwbGl0KCctJykubGVuZ3RoID09IDMgKSBkYXRlID0gZGF0ZS5zcGxpdChcIi1cIikuc3BsaWNlKDAsMikuam9pbihcIi1cIik7XG4gICAgICAgICAgICBkYXRhW2RhdGVdID0ge307XG5cbiAgICAgICAgICAgIGZvciggdmFyIGtleSBpbiBoZWFkZXJzICkge1xuICAgICAgICAgICAgICAgIGlmKCBrZXkgPT0gJ2RhdGUnICkgY29udGludWU7XG5cbiAgICAgICAgICAgICAgICBkYXRhW2RhdGVdW2tleV0gPSBwYXJzZUZsb2F0KGNzdlRhYmxlW2ldW2hlYWRlcnNba2V5XS5jb2xdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlUHJvZ3Jlc3MoZXZ0KSB7XG4gICAgLy8gZXZ0IGlzIGFuIFByb2dyZXNzRXZlbnQuXG4gICAgaWYgKGV2dC5sZW5ndGhDb21wdXRhYmxlKSB7XG4gICAgICAgIHZhciBwZXJjZW50TG9hZGVkID0gTWF0aC5yb3VuZCgoZXZ0LmxvYWRlZCAvIGV2dC50b3RhbCkgKiAxMDApO1xuICAgICAgICBlbGUuZmluZCgnLnByb2dyZXNzLWJhcicpLmF0dHIoJ2FyaWEtdmFsdWVub3cnLHBlcmNlbnRMb2FkZWQpLndpZHRoKHBlcmNlbnRMb2FkZWQrXCIlXCIpO1xuICAgICAgICBlbGUuZmluZCgnLnNyLW9ubHknKS5odG1sKE1hdGguY2VpbChwZXJjZW50TG9hZGVkKSsnJSBDb21wbGV0ZScpO1xuICAgIH1cbn1cblxuICBmdW5jdGlvbiBlcnJvckhhbmRsZXIoZXZ0KSB7XG4gICAgc3dpdGNoKGV2dC50YXJnZXQuZXJyb3IuY29kZSkge1xuICAgICAgY2FzZSBldnQudGFyZ2V0LmVycm9yLk5PVF9GT1VORF9FUlI6XG4gICAgICAgIHNldEVycm9yKCdGaWxlIE5vdCBGb3VuZCEnKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGV2dC50YXJnZXQuZXJyb3IuTk9UX1JFQURBQkxFX0VSUjpcbiAgICAgICAgc2V0RXJyb3IoJ0ZpbGUgaXMgbm90IHJlYWRhYmxlJyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBldnQudGFyZ2V0LmVycm9yLkFCT1JUX0VSUjpcbiAgICAgICAgYnJlYWs7IC8vIG5vb3BcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHNldEVycm9yKCdBbiBlcnJvciBvY2N1cnJlZCByZWFkaW5nIHRoaXMgZmlsZS4nKTtcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gc2V0RXJyb3IobXNnKSB7XG4gICAgICBlbGUuZmluZCgnLnN0YXR1cycpLmh0bWwoJzxkaXYgY2xhc3M9XCJhbGVydCBhbGVydC1kYW5nZXJcIj4nK21zZysnPC9kaXY+Jyk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGluaXQgOiBpbml0LFxuICAgIGluaXRGcm9tVXJsIDogaW5pdEZyb21VcmxcbiAgfTtcblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGluaXQgOiBpbml0XG59O1xuIiwidmFyIGNvbmZpZyA9IHJlcXVpcmUoJy4uL2NvbmZpZycpO1xuXG4vLyBtYWtlIHN1cmUgYWxsIHRoZSB3ZWF0aGVyIGlzIHNldC4gICMxIHRoaW5nIHBlb3BsZSB3aWxsIG1lc3MgdXBcbmZ1bmN0aW9uIGNoZWNrKG1vZGVsKSB7XG4gIC8vIGZpcnN0IGdldCBjdXJyZW50IG1vbnRocyB3ZSBhcmUgZ29pbmcgdG8gcnVuLFxuICB2YXIgc3RhcnQgPSAkKFwiI2lucHV0LW1hbmFnZS1kYXRlUGxhbnRlZFwiKS52YWwoKTtcblxuICB2YXIgZW5kID0gJChcIiNpbnB1dC1tYW5hZ2UtZGF0ZUZpbmFsSGFydmVzdFwiKS52YWwoKS5zcGxpdChcIi1cIik7XG4gIHZhciBlTW9udGggPSBwYXJzZUludChlbmRbMV0pO1xuICB2YXIgZVllYXIgPSBwYXJzZUludChlbmRbMF0pO1xuXG4gIHZhciBjRGF0ZSA9IG5ldyBEYXRlKHN0YXJ0KTtcblxuICAvLyBub3cgc2VlIGlmIHdlIGhhdmUgY3VzdG9tIHdlYXRoZXIgY292ZXJhZ2VcbiAgdmFyIGhhc0NvdmVyYWdlID0gdHJ1ZTtcbiAgdmFyIGNvdW50ID0gMDtcbiAgd2hpbGUoIGNvdW50IDwgMTAwMDAgKSB7XG4gICAgICBpZiggIW1vZGVsLmN1c3RvbV93ZWF0aGVyICkge1xuICAgICAgICAgIGhhc0NvdmVyYWdlID0gZmFsc2U7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIHZhciBtID0gKGNEYXRlLmdldE1vbnRoKCkrMSkrJyc7XG4gICAgICB2YXIgeSA9IGNEYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgICBpZiggbS5sZW5ndGggPT0gMSApIG0gPSAnMCcrbTtcblxuICAgICAgaWYoIGNEYXRlLmdldE1vbnRoKCkrMSA9PSBlTW9udGggJiYgeSA9PSBlWWVhciApIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH0gZWxzZSBpZiggIW1vZGVsLmN1c3RvbV93ZWF0aGVyW3krJy0nK21dICkge1xuICAgICAgICAgIGhhc0NvdmVyYWdlID0gZmFsc2U7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGNEYXRlLnNldE1vbnRoKGNEYXRlLmdldE1vbnRoKCkrMSk7XG4gICAgICBjb3VudCsrO1xuICB9XG5cbiAgaWYoIGhhc0NvdmVyYWdlICkgcmV0dXJuIHRydWU7XG5cbiAgLy8gaWYgbm90IG1ha2Ugc3VyZSB3ZSBoYXZlIGF2ZXJhZ2VzIHNlbGVjdGVkXG4gIGZvciAoIHZhciBpID0gMDsgaSA8IDEyOyBpKyspIHtcbiAgICB2YXIgbSA9IChpKzEpKycnO1xuICAgIGlmKCBtLmxlbmd0aCA9PSAxICkgbSA9ICcwJyttO1xuXG4gICAgICBmb3IgKCB2YXIgaiA9IDE7IGogPCBjb25maWcuaW5wdXRzLndlYXRoZXIubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICB2YXIgYyA9IGNvbmZpZy5pbnB1dHMud2VhdGhlcltqXTtcbiAgICAgICAgICB2YXIgdmFsID0gcGFyc2VGbG9hdCgkKFwiI2lucHV0LXdlYXRoZXItXCIgKyBjICsgXCItXCIgKyBtKS52YWwoKSk7XG4gICAgICAgICAgaWYoICF2YWwgJiYgdmFsICE9PSAwICkge1xuICAgICAgICAgICAgICBhbGVydChcIk1pc3Npbmcgd2VhdGhlciBkYXRhOiBcIitjK1wiIGZvciBtb250aCBcIittK1wiXFxuXFxuXCIrXG4gICAgICAgICAgICAgICAgICAgIFwiRGlkIHlvdSBzZWxlY3QgYSBsb2NhdGlvbiAoU2V0dXApIGFuZC9vciBhcmUgYWxsIHdlYXRoZXIvc29pbCBmaWVsZHMgZmlsbGVkIG91dD9cIik7XG4gICAgICAgICAgICAgICQoXCIjcnVuYnRuLCAjcnVuYnRuLXNtXCIpLnJlbW92ZUNsYXNzKFwiZGlzYWJsZWRcIikuaHRtbChcIjxpIGNsYXNzPSdpY29uLXBsYXknPjwvaT4gUnVuXCIpO1xuICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgfVxuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIHNldChtb2RlbCwgZGF0YSkge1xuICBpZiggIW1vZGVsLmN1c3RvbV93ZWF0aGVyICkgbW9kZWwuY3VzdG9tX3dlYXRoZXIgPSB7fTtcblxuICBpZiggZGF0YSApIHtcbiAgICAgIGZvciggdmFyIGtleSBpbiBkYXRhICkge1xuXG4gICAgICAgICAgLy8gY2xlYW4gdXAgZGF0ZSBmb3JtYXRcbiAgICAgICAgICB2YXIgZGF0ZSA9IGtleS5yZXBsYWNlKC9bXlxcZC1dLywnJyk7XG4gICAgICAgICAgdmFyIHBhcnRzID0gZGF0ZS5zcGxpdCgnLScpO1xuXG4gICAgICAgICAgaWYoIHBhcnRzLmxlbmd0aCA8IDIgKSB7XG4gICAgICAgICAgICAgIHJldHVybiBhbGVydCgnSW52YWxpZCBEYXRlIEZvcm1hdC4gIERhdGVzIHNob3VsZCBiZSBpbiBZWVlZLU1NIGZvcm1hdCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIHBhcnRzWzFdLmxlbmd0aCAhPSAyICkge1xuICAgICAgICAgICAgICBkYXRlID0gcGFydHNbMF0rXCItMFwiK3BhcnRzWzFdO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIG1vZGVsLmN1c3RvbV93ZWF0aGVyW2RhdGVdID0gZGF0YVtrZXldO1xuICAgICAgfVxuICB9XG5cbiAgLy8gY3JlYXRlIGFycmF5IHNvIHdlIGNhbiBzb3J0XG4gIHZhciBhcnIgPSBbXTtcbiAgdmFyIGhlYWRlcnMgPSBbJ2RhdGUnXTtcbiAgZm9yKCB2YXIgZGF0ZSBpbiBtb2RlbC5jdXN0b21fd2VhdGhlciApIHtcblxuICAgICAgdmFyIHQgPSBbZGF0ZV07XG4gICAgICBmb3IoIHZhciBrZXkgaW4gbW9kZWwuY3VzdG9tX3dlYXRoZXJbZGF0ZV0gKSB7XG4gICAgICAgICAgaWYoIGtleSA9PSAnbnJlbCcgKSBjb250aW51ZTtcbiAgICAgICAgICBpZiggYXJyLmxlbmd0aCA9PT0gMCApIGhlYWRlcnMucHVzaChrZXkpO1xuICAgICAgICAgIHQucHVzaChtb2RlbC5jdXN0b21fd2VhdGhlcltkYXRlXVtrZXldKTtcbiAgICAgIH1cblxuICAgICAgYXJyLnB1c2godCk7XG4gIH1cblxuICBpZiggYXJyLmxlbmd0aCA9PT0gMCApIHtcbiAgICAgICQoJyNjdXN0b20td2VhdGhlci1wYW5lbCcpLmh0bWwoXCJObyB3ZWF0aGVyIGRhdGEgaGFzIGJlZW4gdXBsb2FkZWQuXCIpO1xuICAgICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIGh0bWwgPSAnPGRpdiBzdHlsZT1cIm92ZXJmbG93OmF1dG87bWF4LWhlaWdodDo2MDBweFwiPjx0YWJsZSBjbGFzcz1cInRhYmxlIHRhYmxlLXN0cmlwZWRcIj48dHI+JztcblxuICBhcnIuc29ydChmdW5jdGlvbihhLCBiKXtcbiAgICAgIHZhciBkMSA9IG5ldyBEYXRlKGFbMF0rXCItMDFcIikuZ2V0VGltZSgpO1xuICAgICAgdmFyIGQyID0gbmV3IERhdGUoYlswXStcIi0wMVwiKS5nZXRUaW1lKCk7XG5cbiAgICAgIGlmKCBkMSA8IGQyICkge1xuICAgICAgICAgIHJldHVybiAxO1xuICAgICAgfSBlbHNlIGlmKCBkMSA+IGQyICkge1xuICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIDA7XG4gIH0pO1xuXG4gIGZvciggdmFyIGkgPSAwOyBpIDwgaGVhZGVycy5sZW5ndGg7IGkrKyApIHtcbiAgICAgIGh0bWwgKz0gJzx0aD4nK2hlYWRlcnNbaV0rJzwvdGg+JztcbiAgfVxuICBodG1sICs9ICc8L3RyPic7XG5cbiAgZm9yKCB2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKysgKSB7XG4gICAgICBodG1sICs9ICc8dHI+PHRkPicrYXJyW2ldLmpvaW4oJzwvdGQ+PHRkPicpKyc8L3RkPjwvdHI+JztcbiAgfVxuXG4gICQoJyNjdXN0b20td2VhdGhlci1wYW5lbCcpLmh0bWwoaHRtbCsnPC90YWJsZT48L2Rpdj48ZGl2IGlkPVwiY3VzdG9tLXdlYXRoZXItY2hhcnRcIj48L2Rpdj4nKTtcblxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICB3ZWF0aGVyQ3VzdG9tQ2hhcnQgPSBjaGFydHMuY3JlYXRlV2VhdGhlckNoYXJ0KCQoJyNjdXN0b20td2VhdGhlci1jaGFydCcpWzBdLCBtb2RlbC5jdXN0b21fd2VhdGhlcik7XG4gIH0sIDEwMDApO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2V0IDogc2V0LFxuICBjaGVjayA6IGNoZWNrXG59O1xuIl19
