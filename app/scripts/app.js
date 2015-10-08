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
      coppiceDates : coppiceDates,
      days_in_interval : (this.dailyStep)?1:30.4
    };

    return this.runSetup(setup);
}

function runSetup(setup){
    var i, key, currentWeather, step, t;

    if( this.debug ) {
      t = new Date().getTime();
      console.log('days_in_interval: '+setup.days_in_interval);
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
      this.currentDate.setDate(this.manage.datePlanted.getDate() + step*setup.days_in_interval); // add a day to current date
//      this.currentDate.setDate(this.manage.datePlanted.getDate() + step*setup.days_in_interval); // add a day to current date

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
      nextStepResults = singleStep(this.plantation, this.soil, currentWeather, 
                                   this.manage, currentStepResults,setup.days_in_interval);
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
  c.VPD = fn.VPD(weather.tmin, weather.tmax, weather.tdmean);
  c.fVPD = fn.fVPD(tree.kG, c.VPD);

  c.fSW = fn.fSW(p.ASW, soil.maxAWS, soil.swconst, soil.swpower);
  c.fAge = fn.tdp(p.StandAge, tree.fAge);

  // fFrost is a cumulative Normal distribution, that approixmates the number of days (or parts of days) that
  // will be below 0, given a minimum temperature
  c.fFrost = fn.fFrost(weather.tmin);

  c.PAR = fn.PAR(weather.rad,days_in_interval); //  PAR in mols

  c.fT = fn.fT((weather.tmin + weather.tmax)/2, tree.fT);

  c.PhysMod = fn.PhysMod(c.fVPD, c.fSW, c.fAge);
  c.fNutr = fn.fNutr(tree.fN0, manage.fertility);
  c.xPP = fn.xPP(tree.y, c.PAR); // maximum potential Primary Production per month
  c.NPP = fn.NPP(p.coppiceAge, tree.fullCanAge, c.xPP, tree.k, p.LAI, c.fVPD, c.fSW, c.fAge, tree.alpha, c.fNutr, c.fT, c.fFrost);

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

  c.Transp = fn.Transp(weather.rad, days_in_interval,weather.daylight, c.VPD, tree.BLcond, c.CanCond);
  c.ETr = fn.ETr(weather.rad,weather.tmin,weather.tmax,weather.tdmean,days_in_interval);
  c.Kc = c.Transp/c.ETr;
  

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

function shouldCoppice(model, setup) {
  var next;
  var coppice_on;
  // do we have specific coppice dates set?
  if( setup.coppiceDates ) {
    for( var i = 0; i < setup.coppiceDates.length; i++ ) {
      var d = setup.coppiceDates[i];

      if (model.currentDate < d) {
        next = model.currentDate;
        next.setDate(next.getDate + setup.days_in_interval);
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

    if (model.currentDate < coppice_on) {
      next=new Date(model.currentDate);
      next.setDate(model.currentDate.getDate() + setup.days_in_interval);
      if ( coppice_on < next) {
        setup.yearToCoppice = setup.yearToCoppice+setup.coppiceInterval;
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

          model.dailyStep = config.daily;
          var months = monthsToRun();
          if( config.daily ) months = months * 30;

          try {
            model.run(months);
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

  var months = monthsToRun();
  if( config.daily ) months = months * 30;

  try {
    model.run(months);
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


  rawOutput.show(currentResults);
  charts.updateCharts(currentResults, true);

  setTimeout(function() {
      $("#runbtn, #runbtn-sm").removeClass("disabled").html("<i class='icon-play'></i> Run");
  }, 250);
};

module.exports = {
  init : init,
  googleDrive : gdrive,
  getModel : getModel,
  runModel : runModel,
  monthsToRun : monthsToRun,
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
             'PhysMod','pR','pS','litterfall','NPP','WF','WR','WS','W'],
  debug : false,
  devmode : false,
  daily : false
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
      if( setup.config.monthsToRun ) {
          var d = new Date(setup.manage.datePlanted || setup.manage.DatePlanted);
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
  for( i = 0; i < results[0].output[0].length; i++ ) {
      if( vars.indexOf(results[0].output[0][i]) > -1 ) chartRows[results[0].output[0][i]] = i;
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
      data : {}
  };

  var cDate = new Date($("#input-manage-datePlanted").val());

  var table, row;
  for( var key in chartRows ) {
      table = "<table class='table table-striped'>";

      csvResults.data[key] = [];

      for( var j = 0; j < results[0].output.length; j++ ){
          csvResults.data[key][j] = [];

          // set header row
          if( j === 0 ) {
              csvResults.data[key][j].push('month');
              csvResults.data[key][j].push('date');

              table += "<tr><th>Step</th><th>Date</th>";
              for( z = 0; z < results.length; z++ ) {
                  table += "<th>";
                  var tmp = [];

                  for( var mType in results[z].inputs ) {
                      tmp.push(mType+"="+results[z].inputs[mType]);
                      table += "<div>"+mType+"="+results[z].inputs[mType]+"</div>";
                  }

                  if( tmp.length === 0 ) {
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
              for( z = 0; z < results.length; z++ ) {
                  v = results[z].output[j][chartRows[key]];
                  table += "<td>"+v+"</td>";
                  csvResults.data[key][j].push(v);
              }
              table += "</tr>";
          }

      }
      $("#rawout" + key).html(table+"</table>");
  }

  app.setCsvResults(csvResults);

  // make sure we can see the export btn
  if( !offlineMode ) $("#show-export-csv").show();
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9wb3BsYXItM3BnLW1vZGVsL2luZGV4LmpzIiwiLi4vcG9wbGFyLTNwZy1tb2RlbC9saWIvZGF0YU1vZGVsL2NvbnN0YW50cy9pbmRleC5qcyIsIi4uL3BvcGxhci0zcGctbW9kZWwvbGliL2RhdGFNb2RlbC9pbmRleC5qcyIsIi4uL3BvcGxhci0zcGctbW9kZWwvbGliL2RhdGFNb2RlbC9tYW5hZ2UvaW5kZXguanMiLCIuLi9wb3BsYXItM3BnLW1vZGVsL2xpYi9kYXRhTW9kZWwvcGxhbnRhdGlvbi9pbmRleC5qcyIsIi4uL3BvcGxhci0zcGctbW9kZWwvbGliL2RhdGFNb2RlbC9wbGFudGF0aW9uX3N0YXRlL2luZGV4LmpzIiwiLi4vcG9wbGFyLTNwZy1tb2RlbC9saWIvZGF0YU1vZGVsL3NvaWwvaW5kZXguanMiLCIuLi9wb3BsYXItM3BnLW1vZGVsL2xpYi9kYXRhTW9kZWwvdHJlZS9jb25kdWN0YW5jZS5qcyIsIi4uL3BvcGxhci0zcGctbW9kZWwvbGliL2RhdGFNb2RlbC90cmVlL2ZhZ2UuanMiLCIuLi9wb3BsYXItM3BnLW1vZGVsL2xpYi9kYXRhTW9kZWwvdHJlZS9mdC5qcyIsIi4uL3BvcGxhci0zcGctbW9kZWwvbGliL2RhdGFNb2RlbC90cmVlL2luZGV4LmpzIiwiLi4vcG9wbGFyLTNwZy1tb2RlbC9saWIvZGF0YU1vZGVsL3RyZWUvaW50Y3B0bi5qcyIsIi4uL3BvcGxhci0zcGctbW9kZWwvbGliL2RhdGFNb2RlbC90cmVlL2xpdHRlcmZhbGwuanMiLCIuLi9wb3BsYXItM3BnLW1vZGVsL2xpYi9kYXRhTW9kZWwvdHJlZS9wZnMuanMiLCIuLi9wb3BsYXItM3BnLW1vZGVsL2xpYi9kYXRhTW9kZWwvdHJlZS9wci5qcyIsIi4uL3BvcGxhci0zcGctbW9kZWwvbGliL2RhdGFNb2RlbC90cmVlL3Jvb3RwLmpzIiwiLi4vcG9wbGFyLTNwZy1tb2RlbC9saWIvZGF0YU1vZGVsL3RyZWUvc2xhLmpzIiwiLi4vcG9wbGFyLTNwZy1tb2RlbC9saWIvZGF0YU1vZGVsL3dlYXRoZXIvaW5kZXguanMiLCIuLi9wb3BsYXItM3BnLW1vZGVsL2xpYi9mbi5qcyIsIi4uL3BvcGxhci0zcGctbW9kZWwvbGliL2lvLmpzIiwiLi4vcG9wbGFyLTNwZy1tb2RlbC9saWIvcnVuLmpzIiwiLi4vcG9wbGFyLTNwZy1tb2RlbC9saWIvdXRpbHMuanMiLCIuLi9wb3BsYXItM3BnLW1vZGVsL2xpYi92YWxpZGF0ZS5qcyIsImpzbGliL2FwcC5qcyIsImpzbGliL2NoYXJ0cy5qcyIsImpzbGliL2NvbmZpZy5qcyIsImpzbGliL2ZsYXNoYmxvY2stZGV0ZWN0b3IuanMiLCJqc2xpYi9nb29nbGVEcml2ZS9leHBvcnRUb0Nzdi5qcyIsImpzbGliL2dvb2dsZURyaXZlL2luZGV4LmpzIiwianNsaWIvZ29vZ2xlRHJpdmUvcmVhbHRpbWUuanMiLCJqc2xpYi9pbnB1dEZvcm0uanMiLCJqc2xpYi9tb2RlbFJ1bkhhbmRsZXIuanMiLCJqc2xpYi9vYXV0aC5qcyIsImpzbGliL29mZmxpbmUuanMiLCJqc2xpYi9vdXRwdXQvZGVmaW5pdGlvbnMuanMiLCJqc2xpYi9vdXRwdXQvcmF3LmpzIiwianNsaWIvdXRpbHMuanMiLCJqc2xpYi93ZWF0aGVyL2NoYXJ0LmpzIiwianNsaWIvd2VhdGhlci9maWxlUmVhZGVyLmpzIiwianNsaWIvd2VhdGhlci9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcExBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNWRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDallBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdFJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbGFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcElBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzcrQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMWlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNVQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6YkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9iQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgaW8gPSByZXF1aXJlKCcuL2xpYi9pbycpO1xudmFyIHJ1biA9IHJlcXVpcmUoJy4vbGliL3J1bicpKGlvKTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IHJ1bjtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGRlc2NyaXB0aW9uOiBcIlRoZXNlIGFyZSBjb25zdGFudHMuXCIsXG4gICAgdmFsdWU6IHtcbiAgICAgICAgYXNjZV9ldHJfd2luZHNwZWVkIDoge1xuICAgICAgICAgICAgdmFsdWU6IDIsXG4gICAgICAgICAgICB1bml0czogXCJtL3NcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkRlZmF1bHQgV2luZCBTcGVlZCB1c2VkIHRvIGNhbGN1bGF0ZSBFVHIgKGFuZCByZXN1bHRhbnQgS2MpIGZvciBNb2RlbC5cIlxuICAgICAgICB9LFxuICAgICAgICBkYXlzX3Blcl9tb250aDoge1xuICAgICAgICAgICAgdmFsdWU6IDMwLjQsXG4gICAgICAgICAgICB1bml0czogXCJkYXlzL21vXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJOdW1iZXIgb2YgRGF5cyBpbiBhbiBhdmVyYWdlIG1vbnRoXCJcbiAgICAgICAgfSxcbiAgICAgICAgZTIwOiB7XG4gICAgICAgICAgICB2YWx1ZTogMi4yLFxuICAgICAgICAgICAgdW5pdHM6IFwidnAvdFwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiUmF0ZSBvZiBjaGFuZ2Ugb2Ygc2F0dXJhdGVkIFZQIHdpdGggVCBhdCAyMENcIlxuICAgICAgICB9LFxuICAgICAgICByaG9BaXI6IHtcbiAgICAgICAgICAgIHZhbHVlOiAxLjIsXG4gICAgICAgICAgICB1bml0czogXCJrZy9tXjNcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkRlbnNpdHkgb2YgYWlyXCJcbiAgICAgICAgfSxcbiAgICAgICAgbGFtYmRhOiB7XG4gICAgICAgICAgICB2YWx1ZTogMjQ2MDAwMCxcbiAgICAgICAgICAgIHVuaXRzOiBcIkova2dcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkxhdGVudCBoZWF0IG9mIHZhcG91cmlzYXRpb24gb2YgaDJvXCJcbiAgICAgICAgfSxcbiAgICAgICAgVlBEY29udjoge1xuICAgICAgICAgICAgdmFsdWU6IDAuMDAwNjIyLFxuICAgICAgICAgICAgdW5pdHM6IFwiXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJDb252ZXJ0IFZQRCB0byBzYXR1cmF0aW9uIGRlZmljaXQgPSAxOC8yOS8xMDAwXCJcbiAgICAgICAgfSxcbiAgICAgICAgUWE6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtOTAsXG4gICAgICAgICAgICB1bml0czogXCJXL21eMlwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiSW50ZXJjZXB0IG9mIG5ldCByYWRpYXRpb24gdmVyc3VzIHNvbGFyIHJhZGlhdGlvbiByZWxhdGlvbnNoaXBcIlxuICAgICAgICB9LFxuICAgICAgICBRYjoge1xuICAgICAgICAgICAgdmFsdWU6IDAuOCxcbiAgICAgICAgICAgIHVuaXRzOiBcInVuaXRsZXNzXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJzbG9wZSBvZiBuZXQgdnMuIHNvbGFyIHJhZGlhdGlvbiByZWxhdGlvbnNoaXBcIlxuICAgICAgICB9LFxuICAgICAgICBnRE1fbW9sOiB7XG4gICAgICAgICAgICB2YWx1ZTogMjQsXG4gICAgICAgICAgICB1bml0czogXCJnL21vbChDKVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiTW9sZWN1bGFyIHdlaWdodCBvZiBkcnkgbWF0dGVyXCJcbiAgICAgICAgfSxcbiAgICAgICAgbW9sUEFSX01KOiB7XG4gICAgICAgICAgICB2YWx1ZTogMi4zLFxuICAgICAgICAgICAgdW5pdHM6IFwibW9sKEMpL01KXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJDb252ZXJzaW9uIG9mIHNvbGFyIHJhZGlhdGlvbiB0byBQQVJcIlxuICAgICAgICB9XG4gICAgfVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICB0cmVlIDogcmVxdWlyZSgnLi90cmVlJyksXG4gIHBsYW50YXRpb24gOiByZXF1aXJlKCcuL3BsYW50YXRpb24nKSxcbiAgcGxhbnRhdGlvbl9zdGF0ZSA6IHJlcXVpcmUoJy4vcGxhbnRhdGlvbl9zdGF0ZScpLFxuICBzb2lsIDogcmVxdWlyZSgnLi9zb2lsJyksXG4gIHdlYXRoZXIgOiByZXF1aXJlKCcuL3dlYXRoZXInKSxcbiAgbWFuYWdlIDogcmVxdWlyZSgnLi9tYW5hZ2UnKSxcbiAgY29uc3RhdHMgOiByZXF1aXJlKCcuL2NvbnN0YW50cycpXG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIGRlc2NyaXB0aW9uIDogXCJDcm9wIE1hbmFnZW1lbnQgUGFyYW1ldGVyc1wiLFxuICB2YWx1ZSA6IHtcbiAgICBpcnJpZ0ZyYWMgOiB7XG4gICAgICB2YWx1ZSA6IDEsXG4gICAgICB1bml0cyA6IFwiXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiSXJyaWdhdGlvbiBmcmFjdGlvbjogMSA9IGZ1bGx5IGlycmlnYXRlZCwgMCA9IG5vIGlycmlnYXRpb24uIEFueSB2YWx1ZXMgYmV0d2VlbiAwIGFuZCAxIGFyZSBhY2NlcHRhYmxlXCJcbiAgICB9LFxuICAgIGZlcnRpbGl0eSA6IHtcbiAgICAgIHZhbHVlIDogMC43LFxuICAgICAgdW5pdHMgOiBcIlwiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIlNvaWwgZmVydGlsaXR5XCJcbiAgICB9LFxuICAgIGRhdGVQbGFudGVkIDoge1xuICAgICAgICB2YWx1ZSA6IFwiX2RhdGVfXCIsXG4gICAgICAgIHVuaXRzIDogXCJkYXRlXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uIDogXCJEYXRlIHRoZSBjcm9wIHdhcyBwbGFudGVkXCJcbiAgICB9LFxuICAgIGRhdGVDb3BwaWNlZCA6IHtcbiAgICAgICAgcmVxdWlyZWQgOiBmYWxzZSxcbiAgICAgICAgdmFsdWUgOiBcIl9kYXRlX1wiLFxuICAgICAgICB1bml0cyA6IFwiZGF0ZVwiLFxuICAgICAgICBkZXNjcmlwdGlvbiA6IFwiRGF0ZSBvZiB0aGUgZmlyc3QgY29wcGljZVwiXG4gICAgfSxcbiAgICBjb3BwaWNlSW50ZXJ2YWwgOiB7XG4gICAgICAgIHJlcXVpcmVkIDogZmFsc2UsXG4gICAgICAgIHZhbHVlIDogMyxcbiAgICAgICAgdW5pdHMgOiBcIlllYXJzXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uIDogXCJIb3cgYWZ0ZXIgdGhlIGNyb3AgaXMgY29wcGljZWQgYWZ0ZXIgdGhlIGZpcnN0IGNvcHBpY2VcIlxuICAgIH0sXG4gICAgY29wcGljZURhdGVzIDoge1xuICAgICAgICByZXF1aXJlZCA6IGZhbHNlLFxuICAgICAgICB2YWx1ZSA6IFwiXCIsXG4gICAgICAgIHVuaXRzIDogXCJkYXRlXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uIDogXCJIb3cgYWZ0ZXIgdGhlIGNyb3AgaXMgY29wcGljZWQgYWZ0ZXIgdGhlIGZpcnN0IGNvcHBpY2VcIlxuICAgIH0sXG4gICAgZGF0ZUZpbmFsSGFydmVzdCA6IHtcbiAgICAgICAgcmVxdWlyZWQgOiBmYWxzZSxcbiAgICAgICAgdmFsdWUgOiBcIl9kYXRlX1wiLFxuICAgICAgICB1bml0cyA6IFwiZGF0ZVwiLFxuICAgICAgICBkZXNjcmlwdGlvbiA6IFwiRGF0ZSB3aGVuIHRoZSBjcm9wIGlzIGNvbXBsZXRlbHkgaGFydmVzdGVkXCJcbiAgICB9XG4gIH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBkZXNjcmlwdGlvbjogXCJHcmVlbndvb2QgUEcgVmFsdWVzIChkZWZhdWx0KVwiLFxuICAgIHZhbHVlOiB7XG4gICAgICAgIHR5cGU6IHtcbiAgICAgICAgICAgIHZhbHVlOiBcIlwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiXCIsXG4gICAgICAgICAgICByZXF1aXJlZCA6IGZhbHNlXG4gICAgICAgIH0sXG4gICAgICAgIFN0b2NraW5nRGVuc2l0eToge1xuICAgICAgICAgICAgdmFsdWU6IDM1ODcsXG4gICAgICAgICAgICB1bml0czogXCJUcmVlcy9oZWN0YXJcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIk51bWJlciBvZiB0cmVlcyBwbGFudGVkIHBlciBoZWN0YXJcIlxuICAgICAgICB9LFxuICAgICAgICBTZWVkbGluZ01hc3M6IHtcbiAgICAgICAgICAgIHZhbHVlOiAwLjAwMDQsXG4gICAgICAgICAgICB1bml0czogXCJrR1wiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiTWFzcyBvZiB0aGUgc2VlZGxpbmdcIlxuICAgICAgICB9LFxuICAgICAgICBwUzoge1xuICAgICAgICAgICAgdmFsdWU6IDAuMSxcbiAgICAgICAgICAgIHVuaXRzOiBcInVuaXRsZXNzXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJQcm9wb3J0aW9uIG9mIHNlZWRsaW5nIG1hc3MgZ29pbmcgaW50byBzdGVtXCJcbiAgICAgICAgfSxcbiAgICAgICAgcEY6IHtcbiAgICAgICAgICAgIHZhbHVlOiAwLFxuICAgICAgICAgICAgdW5pdHM6IFwidW5pdGxlc3NcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlByb3BvcnRpb24gb2Ygc2VlZGxpbmcgbWFzcyBnb2luZyBpbnRvIGZvbGlhZ2VcIlxuICAgICAgICB9LFxuICAgICAgICBwUjoge1xuICAgICAgICAgICAgdmFsdWU6IDAuOSxcbiAgICAgICAgICAgIHVuaXRzOiBcInVuaXRsZXNzXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJQcm9wb3J0aW9uIG9mIHNlZWRsaW5nIG1hc3MgZ29pbmcgaW50byByb290XCJcbiAgICAgICAgfVxuICAgIH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBkZXNjcmlwdGlvbjogXCJQbGFudGF0aW9uIHN0YXRlIGNsYXNzLCBjb250YWluaW5nIGFsbCBpbnRlbWVkaWF0ZSB2YWx1ZXMgYXQgZXZlcnkgdGltZXN0ZXAgb2YgdGhlIG1vZGVsXCIsXG4gICAgdmFsdWU6IHtcbiAgICAgICAgZmVlZHN0b2NrSGFydmVzdDoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwiXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJcIlxuICAgICAgICB9LFxuICAgICAgICBjb3BwaWNlQ291bnQ6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIlwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiXCJcbiAgICAgICAgfSxcbiAgICAgICAgY29wcGljZUFnZToge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwibW9udGhcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkFnZSBvZiB0cmVlIGF0IHRoZSB0aW1lIG9mIGNvcHBpY2VcIlxuICAgICAgICB9LFxuICAgICAgICBWUEQ6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOlwia1BBXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjpcIk1lYW4gdmFwb3IgcHJlc3N1cmUgZGVmaWNpdFwiXG4gICAgICAgIH0sXG4gICAgICAgIGZWUEQ6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzIDogXCJ1bml0bGVzc1wiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246XCJWYXBvciBQcmVzc3VyZSBEZWZpY2l0IE1vZGlmaWVyIChQb3BsYXIpXCJcbiAgICAgICAgfSxcbiAgICAgICAgZlQ6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOlwidW5pdGxlc3NcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOlwiVGVtcGVyYXR1cmUgbW9kaWZpZXJcIlxuICAgICAgICB9LFxuICAgICAgICBmRnJvc3Q6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzIDogXCJ1bml0bGVzc1wiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb24gOiBcIk51bWJlciBvZiBGcmVlemUgRGF5cyBNb2RpZmllclwiXG4gICAgICAgIH0sXG4gICAgICAgIGZOdXRyOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czpcInVuaXRsZXNzXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjpcIk51dHJpdGlvbmFsIEZyYWN0aW9uLCBtaWdodCBiZSBiYXNlZCBvbiBzb2lsIGFuZCBmZXJ0aWxpemVyIGF0IHNvbWUgcG9pbnRcIlxuICAgICAgICB9LFxuICAgICAgICBmU1c6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIlwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiU29pbCB3YXRlciBtb2RpZmllclwiXG4gICAgICAgIH0sXG4gICAgICAgIGZBZ2U6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIlwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiXCJcbiAgICAgICAgfSxcbiAgICAgICAgUEFSOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czpcIm1vbHNcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOlwiTW9udGhseSBQQVIgaW4gbW9scyAvIG1eMiBtb250aFwiXG4gICAgICAgIH0sXG4gICAgICAgIHhQUDoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwibWV0cmljIHRvbnMgRHJ5IE1hdHRlci9oYVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwibWF4aW11bSBwb3RlbnRpYWwgUHJpbWFyeSBQcm9kdWN0aW9uXCJcbiAgICAgICAgfSxcbiAgICAgICAgSW50Y3B0bjoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwidW5pdGxlc3NcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkNhbm9weSByYWluZmFsbCBpbnRlcmNlcHRpb25cIlxuICAgICAgICB9LFxuICAgICAgICBBU1c6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIm1tXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJBdmFpbGFibGUgc29pbCB3YXRlclwiXG4gICAgICAgIH0sXG4gICAgICAgIEN1bUlycmlnOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJtbVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQ3VtdWxhdGl2ZSBpcnJpZ2F0aW9uXCJcbiAgICAgICAgfSxcbiAgICAgICAgSXJyaWc6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIm1tL21vblwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiUmVxdWlyZWQgaXJyaWdhdGlvblwiXG4gICAgICAgIH0sXG4gICAgICAgIFN0YW5kQWdlOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJtb250aFwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQWdlIG9mIHRoZSB0cmVlXCJcbiAgICAgICAgfSxcbiAgICAgICAgTEFJOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkxlYWYgYXJlYSBpbmRleFwiXG4gICAgICAgIH0sXG4gICAgICAgIENhbkNvbmQ6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIlwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQ2Fub3B5IGNvbmR1Y3RhbmNlXCJcbiAgICAgICAgfSxcbiAgICAgICAgVHJhbnNwOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJtbS9tb25cIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkNhbm9weSBtb250aGx5IHRyYW5zcGlyYXRpb25cIlxuICAgICAgICB9LFxuICAgICAgICBFVHI6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIm1tXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJSZWZlcmVuY2UgKEFsZmFsZmEpIHRyYW5zcGlyYXRpb25cIlxuICAgICAgICB9LFxuICAgICAgICBLYzoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwiXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJDcm9wIENvZWZmaWNpZW50XCJcbiAgICAgICAgfSxcbiAgICAgICAgUGh5c01vZDoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwidW5pdGxlc3NcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlBoeXNpb2xvZ2ljYWwgTW9kaWZpZXIgdG8gY29uZHVjdGFuY2UgYW5kIEFQQVJ1XCJcbiAgICAgICAgfSxcbiAgICAgICAgcGZzOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlJhdGlvIG9mIGZvbGlhZ2UgdG8gc3RlbSBwYXJ0aXRpb25pbmdcIlxuICAgICAgICB9LFxuICAgICAgICBwUjoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwiXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJcIlxuICAgICAgICB9LFxuICAgICAgICBwUzoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwiXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJcIlxuICAgICAgICB9LFxuICAgICAgICBwRjoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwiXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJcIlxuICAgICAgICB9LFxuICAgICAgICBsaXR0ZXJmYWxsOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlwiXG4gICAgICAgIH0sXG4gICAgICAgIE5QUDoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwibWV0cmljIHRvbnMgRHJ5IE1hdHRlci9oYVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiTmV0IFByaW1hcnkgUHJvZHVjdGl2aXR5XCJcbiAgICAgICAgfSxcbiAgICAgICAgUm9vdFA6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIlwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiUm9vdCBwcm9kdWN0aXZpdHlcIlxuICAgICAgICB9LFxuICAgICAgICBkVzoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwiXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJcIlxuICAgICAgICB9LFxuICAgICAgICBXRjoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwiYmR0L2hhXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJGb2xpYWdlIHlpZWxkXCJcbiAgICAgICAgfSxcbiAgICAgICAgV1I6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcImJkdC9oYVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiUm9vdCB5aWVsZFwiXG4gICAgICAgIH0sXG4gICAgICAgIFdTOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJiZHQvaGFcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlN0ZW0geWllbGRcIlxuICAgICAgICB9LFxuICAgICAgICBXOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJiZHQvaGFcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlRvdGFsIHlpZWxkOiByb290ICsgc3RlbSArIGZvbGlhZ2VcIlxuICAgICAgICB9XG4gICAgfVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGRlc2NyaXB0aW9uOiBcIlNvaWwgaW5mb3JtYXRpb24gYmFzZWQgb24gY3VycmVudCBsb2NhdGlvblwiLFxuICAgIHZhbHVlOiB7XG4gICAgICAgIG1heEFXUzoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwiXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJNYXhpbXVtIGF2YWlsYWJsZSBzb2lsIHdhdGVyXCJcbiAgICAgICAgfSxcbiAgICAgICAgc3dwb3dlcjoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwiXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJwb3dlciBwYXJhbWV0ZXIgYmFzZWQgb24gY2xheSBjb250ZW50IG9mIHNvaWxcIlxuICAgICAgICB9LFxuICAgICAgICBzd2NvbnN0OiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImNvbnN0YW50IHBhcmFtZXRlciBiYXNlZCBvbiBjbGF5IGNvbnRlbnQgb2Ygc29pbFwiXG4gICAgICAgIH1cbiAgICB9XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgdW5pdHM6IFwiW2djIG0vc10/XCIsXG4gICAgZGVzY3JpcHRpb246IFwiQWxvbmcgd2l0aCBhIFBoeXNpb2xvZ2ljYWwgbW9kaWZlciwgc3BlY2lmaWVzIHRoZSBjYW5vcHkgY29uZHVjdGFuY2UuICBVc2VkIGluIGNhbGN1bGF0aW9uIG9mIHRyYW5zcGlyYXRpb25cIixcbiAgICB2YWx1ZToge1xuICAgICAgICBtbjoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiTWluaW11bSB2YWx1ZSwgd2hlbiBsYWk9MFwiLFxuICAgICAgICAgICAgdmFsdWU6IDAuMDAwMVxuICAgICAgICB9LFxuICAgICAgICBteDoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiTWF4aW11bSB2YWx1ZVwiLFxuICAgICAgICAgICAgdmFsdWU6IDAuMDJcbiAgICAgICAgfSxcbiAgICAgICAgbGFpOiB7XG4gICAgICAgICAgICB1bml0czogXCJbbV4yL21eMl1cIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkxlYWYgQXJlYSBJbmRleCB3aGVyZSBwYXJhbWV0ZXIgcmVhY2hlcyBhIG1heGltdW0gdmFsdWUuXCIsXG4gICAgICAgICAgICB2YWx1ZTogMi42XG4gICAgICAgIH1cbiAgICB9XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgdW5pdHM6IFwiZnJhY3Rpb25cIixcbiAgICBkZXNjcmlwdGlvbjogXCJTcGVjaWZpZXMgdGhlIGdyb3d0aCBsaW1pdGVyIGFzIGEgZnVuY3Rpb24gb2YgdGhlIHRyZWUgYWdlLiAgVGhpcyBpcyBhIHRpbWUgZGVwZW5kYW5jeSBwYXJhbWV0ZXIuICBUaGUgZ3JhcGggb2YgdGhlIGZ1bmN0aW9uIGlzIGF2YWlsYWJsZSBhdDogaHR0cHM6Ly93d3cuZGVzbW9zLmNvbS9jYWxjdWxhdG9yL3dhMHEyaWgxOGhcIixcbiAgICB2YWx1ZToge1xuICAgICAgICBmMDoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiVmFsdWUgYXQgSW5pdGlhbCBUaW1lXCIsXG4gICAgICAgICAgICB2YWx1ZTogMVxuICAgICAgICB9LFxuICAgICAgICBmMToge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiVmFsdWUgYXQgSW5maW5pdGUgVGltZVwiLFxuICAgICAgICAgICAgdmFsdWU6IDBcbiAgICAgICAgfSxcbiAgICAgICAgdG06IHtcbiAgICAgICAgICAgIHVuaXRzOiBcIlt5XVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiVGltZSBpbiB5ZWFycyB3aGVyZSB2YWx1ZSBpcyB0aGUgYXZlcmFnZSBvZiBmMCBhbmQgZjFcIixcbiAgICAgICAgICAgIHZhbHVlOiA0Ny41XG4gICAgICAgIH0sXG4gICAgICAgIG46IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIm4+PTE7IFBhcmFtZXRlciBzcGVjaWZpbmcgdGhlIHJhdGUgb2YgY2hhbmdlIGFyb3VuZCB0bS4gIG49MSBpcyBhcHByb3hpbWF0ZWx5IGEgbGluZWFyIGNoYW5nZSwgYXMgbiBpbmNyZWFzZXMsIGNoYW5nZSBiZWNvbWVzIG1vcmUgbG9jYWxpemVkIGFyb3VuZCB0bS5cIixcbiAgICAgICAgICAgIHZhbHVlOiAzLjVcbiAgICAgICAgfVxuICAgIH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBkZXNjcmlwdGlvbjogXCJTcGVjaWZpZXMgdGhlIHBhcmFtZXRlcnMgYWZmZWN0aW5nIHRlbXBlcmF0dXJlIG1vZGlmaWVyLCBmVC4gQSBncmFwaCBvZiBob3cgdGhlc2UgcGFyYW1ldGVycyBhZmZlY3QgdGhlIHRlbXBlcmF0dXJlIG1vZGlmaWVyIGlzIGZvdW5kIGhlcmU6IGh0dHBzOi8vd3d3LmRlc21vcy5jb20vY2FsY3VsYXRvci82OWl3cXRubDI4XCIsXG4gICAgdmFsdWU6IHtcbiAgICAgICAgbW46IHtcbiAgICAgICAgICAgIHVuaXRzOiBcIltDXVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiU3BlY2lmaWVzIHRoZSBtaW5pbXVtIHRlbXBlcmF0dXJlIG9mIHJlc3BpcmF0aW9uXCIsXG4gICAgICAgICAgICB2YWx1ZTogMFxuICAgICAgICB9LFxuICAgICAgICBvcHQ6IHtcbiAgICAgICAgICAgIHVuaXRzOiBcIltDXVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiU3BlY2lmaWVzIHRoZSBvcHRpbXVtIHRlbXBlcmF0dXJlIG9mIHJlc3BpcmF0aW9uXCIsXG4gICAgICAgICAgICB2YWx1ZTogMjBcbiAgICAgICAgfSxcbiAgICAgICAgbXg6IHtcbiAgICAgICAgICAgIHVuaXRzOiBcIltDXVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiU3BlY2lmaWVzIHRoZSBtYXhpbXVtIHRlbXBlcmF0dXJlIG9mIHJlc3BpcmF0aW9uXCIsXG4gICAgICAgICAgICB2YWx1ZTogNTBcbiAgICAgICAgfVxuICAgIH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBkZXNjcmlwdGlvbjogXCJUaGVzZSBzcGVjaWZ5IGdyb3d0aCBwYXJhbWV0ZXJzIHNwZWNpZmljIHRvIHRoZSBzcGVjaWVzIG9mIHRyZWUuXCIsXG4gICAgdmFsdWUgOiB7XG4gICAgICAgIGs6IHtcbiAgICAgICAgICAgIHVuaXRzOiBcInVuaXRsZXNzXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJSYWRpYXRpb24gRXh0aW5jdGlvbiBDb2VmZmljaWVudC5cIixcbiAgICAgICAgICAgIHZhbHVlOiAwLjVcbiAgICAgICAgfSxcbiAgICAgICAgZnVsbENhbkFnZToge1xuICAgICAgICAgICAgdW5pdHM6IFwiW3ldXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJZZWFyIHdoZXJlIHRyZWUgcmVhY2hlcyBmdWxsIENhbm9weSBDb3Zlci5cIixcbiAgICAgICAgICAgIHZhbHVlOiAxLjVcbiAgICAgICAgfSxcbiAgICAgICAga0c6IHtcbiAgICAgICAgICAgIHVuaXRzOiBcIltrUEFeLTFdXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJEZXRlcm1pbmVzIHRoZSByZXNwb25zZSBvZiB0aGUgY2Fub3B5IGNvbmR1Y3RhbmNlIHRvIHRoZSB2YXBvciBwcmVzc3VyZSBkZWZpY2l0LlwiLFxuICAgICAgICAgICAgdmFsdWU6IDAuNVxuICAgICAgICB9LFxuICAgICAgICBhbHBoYToge1xuICAgICAgICAgICAgdW5pdHM6IFwiW2tnL21vbCA/XVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQ2Fub3B5IHF1YW50dW0gZWZmaWNpZW5jeS5cIixcbiAgICAgICAgICAgIHZhbHVlOiAwLjA4XG4gICAgICAgIH0sXG4gICAgICAgIGZUIDogcmVxdWlyZSgnLi9mdCcpLFxuICAgICAgICBCTGNvbmQ6IHtcbiAgICAgICAgICAgIHVuaXRzOiBcIltdXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJDYW5vcHkgYm91bmRhcnkgbGF5ZXIgY29uZHVjdGFuY2UuIFVzZWQgaW4gdGhlIGNhbGN1YXRpb24gb2YgdHJhbnNwaXJhdGlvblwiLFxuICAgICAgICAgICAgdmFsdWU6IDAuMDRcbiAgICAgICAgfSxcbiAgICAgICAgZkFnZTogcmVxdWlyZSgnLi9mYWdlJyksXG4gICAgICAgIGZOMDoge1xuICAgICAgICAgICAgdW5pdHM6IFwiZnJhY3Rpb25cIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlVzZWQgaW4gdGhlIGNhbGN1bGF0aW9uIG9mIHRoZSBudXRyaXRpb25hbCBtb2RpZmllcixmTnV0ci4gIGZOdXRyIHJhbmdlcyBmcm9tIFtmTk8sMSkgYmFzZWQgb24gdGhlIGZlcnRpbGl0eSBpbmRleCB3aGljaCByYW5nZXMgZnJvbSAwIHRvIDEuICBXaGVuIGZOMD0xIGluZGljYXRlcyBmTnV0ciBpcyAxXCIsXG4gICAgICAgICAgICB2YWx1ZTogMC4yNlxuICAgICAgICB9LFxuICAgICAgICBTTEE6IHJlcXVpcmUoJy4vc2xhJyksXG4gICAgICAgIC8vQ2hlY2tVbml0c0NoYW5nZXRvbGluZWFyRnVuY3Rpb25cbiAgICAgICAgQ29uZHVjdGFuY2U6IHJlcXVpcmUoJy4vY29uZHVjdGFuY2UnKSxcbiAgICAgICAgSW50Y3B0bjogcmVxdWlyZSgnLi9pbnRjcHRuJyksXG4gICAgICAgIHk6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkFzc2ltaWxhdGlvbiB1c2UgZWZmaWNpZW5jeS4gIFVzZWQgaW4gY2FsY3VsYXRpb24gb2YgdGhlIE5QUC5cIixcbiAgICAgICAgICAgIHZhbHVlOiAwLjQ3XG4gICAgICAgIH0sXG4gICAgICAgIHBmczogcmVxdWlyZSgnLi9wZnMnKSxcbiAgICAgICAgcFI6IHJlcXVpcmUoJy4vcHInKSxcbiAgICAgICAgcm9vdFA6IHJlcXVpcmUoJy4vcm9vdHAnKSxcbiAgICAgICAgbGl0dGVyZmFsbDogcmVxdWlyZSgnLi9saXR0ZXJmYWxsJylcbiAgICB9XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgdW5pdHM6IFwiZnJhY3Rpb25cIixcbiAgICBkZXNjcmlwdGlvbjogXCJSYWluZmFsbCBpbnRlcmNlcHRpb24gZnJhY3Rpb24uICBBIGxpbmVhciBmdW5jdGlvbiB3LnIudC4gTEFJXCIsXG4gICAgdmFsdWU6IHtcbiAgICAgICAgbW46IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIk1pbmltdW0gdmFsdWUsIHdoZW4gbGFpPTBcIixcbiAgICAgICAgICAgIHZhbHVlOiAwXG4gICAgICAgIH0sXG4gICAgICAgIG14OiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJNYXhpbXVtIHZhbHVlXCIsXG4gICAgICAgICAgICB2YWx1ZTogMC4yNFxuICAgICAgICB9LFxuICAgICAgICBsYWk6IHtcbiAgICAgICAgICAgIHVuaXRzOiBcIlttXjIvbV4yXVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiTGVhZiBBcmVhIEluZGV4IHdoZXJlIHBhcmFtZXRlciByZWFjaGVzIGEgbWF4aW11bSB2YWx1ZS5cIixcbiAgICAgICAgICAgIHZhbHVlOiA3LjNcbiAgICAgICAgfVxuICAgIH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICB1bml0czogXCJmcmFjdGlvblwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIlNwZWNpZmllcyB0aGUgZnJhY3Rpb25hbCBtb250aGx5IGxvc3Mgb2YgZm9saWFnZS4gVGhpcyBpcyBhIHRpbWUgZGVwZW5kYW55IHBhcmFtZXRlci4gIFRoZSBncmFwaCBvZiB0aGUgZnVuY3Rpb24gaXMgYXZhaWxhYmxlIGF0OiBodHRwczovL3d3dy5kZXNtb3MuY29tL2NhbGN1bGF0b3IvNmlxOXBwZHFzN1wiLFxuICAgIHZhbHVlOiB7XG4gICAgICAgIGYwOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJWYWx1ZSBhdCBJbml0aWFsIFRpbWVcIixcbiAgICAgICAgICAgIHZhbHVlOiAwLjAwMTVcbiAgICAgICAgfSxcbiAgICAgICAgZjE6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlZhbHVlIGF0IEluZmluaXRlIFRpbWVcIixcbiAgICAgICAgICAgIHZhbHVlOiAwLjAzXG4gICAgICAgIH0sXG4gICAgICAgIHRtOiB7XG4gICAgICAgICAgICB1bml0czogXCJbeV1cIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlRpbWUgaW4geWVhcnMgd2hlcmUgdmFsdWUgaXMgdGhlIGF2ZXJhZ2Ugb2YgZjAgYW5kIGYxXCIsXG4gICAgICAgICAgICB2YWx1ZTogMlxuICAgICAgICB9LFxuICAgICAgICBuOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJuPj0xOyBQYXJhbWV0ZXIgc3BlY2lmaW5nIHRoZSByYXRlIG9mIGNoYW5nZSBhcm91bmQgdG0uICBuPTEgaXMgYXBwcm94aW1hdGVseSBhIGxpbmVhciBjaGFuZ2UsIGFzIG4gaW5jcmVhc2VzLCBjaGFuZ2UgYmVjb21lcyBtb3JlIGxvY2FsaXplZCBhcm91bmQgdG0uXCIsXG4gICAgICAgICAgICB2YWx1ZTogMi41XG4gICAgICAgIH1cbiAgICB9XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgdW5pdHM6IFwiZnJhY3Rpb25cIixcbiAgICBkZXNjcmlwdGlvbjogXCJUaGlzIGRlZmluZXMgdGhlIGZvbGlhZ2UgdG8gc3RlbSAoV0YvV1MpIGZyYWN0aW9uIGluIGFsbG9jYXRpbmcgYWJvdmVncm91bmQgYmlvbWFzcyBvZiB0aGUgdHJlZS4gVGhpcyBpcyBjYWxjdWxhdGVkIHdpdGggYSBwYWlyIG9mIGFsbG9tZXRyaWMgcG93ZXIgZXF1YXRpb25zLiAgVGhlIGZpcnN0IHJlbGF0ZXMgYmFzYWwgZGlhbWV0ZXIsIChET0IpIHRvIHRvdGFsIHdvb2R5IGJpb21hc3MsIHdoaWxlIHRoZSBzZWNvbmQgcmVsYXRlcyBET0IgdG8gcGZzLiAgVGhlIHBhcmFtZXRlcml6YXRpb24gb2YgdGhlIHJlbGF0aW9uc2hpcCBiZXR3ZWVuIERPQiBhbmQgd29vZHkgYmlvbWFzcyBpcyBpbnZlcnRlZCB0byBkZXRlcm1pbmUgdGhlIERPQiBmcm9tIHRoZSBtb2RlbGVkIHdvb2R5IGZyYWN0aW9uLiAgVGhpcyByZWxhdGlvbiBpcyBwbG90dGVkIGF0OiAuICBUaGUgbW9kZWwgYWxsb2NhdGVzIHRoZSBhcHByb3ByaWF0ZSBmcmFjdGlvbiBvZiB3b29kIGJhc2VkIG9uIHRoZSBTdG9ja2luZyBkZW5zaXR5IG9mIHRoZSBwbGFudGF0aW9uLiBET0IgcmF0aGVyIHRoYW4gREJIIGlzIHVzZWQgZm9yIGNvbXBhcmlzb24gb2YgdHJlZXMgd2l0aCBhIGhpZ2ggc3RlbUNudCBhbmQgcmFwaWQgY29wcGljaW5nIHZhbHVlLlwiLFxuICAgIHZhbHVlOiB7XG4gICAgICAgIHN0ZW1DbnQ6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkF2ZXJhZ2UgbnVtYmVyIG9mIHN0ZW1zIHBlciBzdHVtcFwiLFxuICAgICAgICAgICAgdmFsdWU6IDIuOFxuICAgICAgICB9LFxuICAgICAgICBzdGVtQzoge1xuICAgICAgICAgICAgdW5pdHM6IFwiW2NtXi0xXVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQ29uc3RhbnQgaW4gcmVsYXRpb24gb2YgRE9CIHRvIHdvb2R5IGJpb21hc3NcIixcbiAgICAgICAgICAgIHZhbHVlOiAwLjE4XG4gICAgICAgIH0sXG4gICAgICAgIHN0ZW1QOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJQb3dlciBpbiByZWxhdGlvbiBvZiBET0IgdG8gd29vZHkgYmlvbWFzcy5cIixcbiAgICAgICAgICAgIHZhbHVlOiAyLjRcbiAgICAgICAgfSxcbiAgICAgICAgcGZzTXg6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIk1heGltdW0gcG9zc2libGUgcGZzIHZhbHVlIGFsbG93ZWRcIixcbiAgICAgICAgICAgIHZhbHVlOiAyXG4gICAgICAgIH0sXG4gICAgICAgIHBmc1A6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlBvd2VyIGluIHJlbGF0aW9uIG9mIERCTyB0byBwZnNcIixcbiAgICAgICAgICAgIHZhbHVlOiAtMC43NzJcbiAgICAgICAgfSxcbiAgICAgICAgcGZzQzoge1xuICAgICAgICAgICAgdW5pdHM6IFwiW2NtXi0xXVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQ29uc3RhbnQgaW4gcmVsYXRpb24gb2YgRE9CIHRvIHBmcy5cIixcbiAgICAgICAgICAgIHZhbHVlOiAxLjNcbiAgICAgICAgfVxuICAgIH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICB1bml0czogXCJmcmFjdGlvblwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkFsb25nIHdpdGggYSBQaHlzaW9sb2dpYWwgcGFyYW1ldGVyLCBzcGVjaWZpZXMgdGhlIGFtb3VudCBvZiBuZXcgZ3Jvd3RoIGFsbG9jYXRlZCB0byB0aGUgcm9vdCBzeXN0ZW0sIGFuZCB0aGUgdHVybm92ZXIgcmF0ZS5cIixcbiAgICB2YWx1ZToge1xuICAgICAgICBtbjoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiTWluaW11bSBhbGxvY2F0aW9uIHRvIHRoZSByb290LCB3aGVuIHRoZSBwaHlzaW9sb2dhbCBwYXJhbWV0ZXIgaXMgMS5cIixcbiAgICAgICAgICAgIHZhbHVlOiAwLjE3XG4gICAgICAgIH0sXG4gICAgICAgIG14OiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJNYXhpbXVtIGFsbG9jYXRpb24gdG8gdGhlIHJvb3QsIHdoZW4gbTAuXCIsXG4gICAgICAgICAgICB2YWx1ZTogMC43XG4gICAgICAgIH0sXG4gICAgICAgIG0wOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJEZXBlbmRhbmNlIG9uIHRoZSBmZXJ0aWxpdHkgaW5kZXguIDAgaW5kaWNhdGVzIGZ1bGwgZGVwZW5kYW5jZSBvbiBmZXJ0aWxpdHksIDEgaW5kaWNhdGVzIGEgY29uc3RhbnQgYWxsb2NhdGlvbiwgaW5kZXBlbmRhbnQgb2YgZmVydGlsaXR5XCIsXG4gICAgICAgICAgICB2YWx1ZTogMC41XG4gICAgICAgIH0sXG4gICAgICAgIHR1cm5vdmVyOiB7XG4gICAgICAgICAgICB1bml0czogXCJbbW9udGheLTFdXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJTcGVjaWZpZXMgdGhlIG1vbnRobHkgcm9vdCB0dXJub3ZlciByYXRlLlwiLFxuICAgICAgICAgICAgdmFsdWU6IDAuMDJcbiAgICAgICAgfVxuICAgIH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBkZXNjcmlwdGlvbjogXCJUaGVzZSBwYXJhbWV0ZXJzIHNwZWNpZnkgcm9vdCBhbGxvY2F0aW9uIHRvIGdyb3d0aCBhZnRlciBjb3BwaWNpbmcuXCIsXG4gICAgdmFsdWUgOiB7XG4gICAgICBmcmFjOiB7XG4gICAgICAgICAgdW5pdHM6IFwiW21vbnRoXjFdXCIsXG4gICAgICAgICAgZGVzY3JpcHRpb246IFwiU3BlY2lmaWVzIHRoZSBmcmFjdGlvbmFsIGFtb3VudCBvZiByb290IGJpb21hc3MgdGhhdCBleGNlZWRzIHRoZSBhYm92ZWdyb3VuZCByZXF1aXJlbWVudHMgdGhhdCBjYW4gYmUgc3VwcGxpZWQgaW4gYSBnaXZlbiBtb250aC5cIixcbiAgICAgICAgICB2YWx1ZTogMC4yXG4gICAgICB9LFxuICAgICAgTEFJVGFyZ2V0OiB7XG4gICAgICAgICAgdW5pdHM6IFwiW21eMi9tXjJdXCIsXG4gICAgICAgICAgZGVzY3JpcHRpb246IFwiU3BlY2lmaWVzIGEgdGFyZ2V0IExBSSByYXRlLiAgVGhlIFRhcmdldCBMQUkgaXMgaW5jbHVkZWQgaW4gdGhlIGNhbGN1bGF0aW9uIG9mIGEgdGFyZ2V0IE5QUCwgYmFzZWQgb24gd2VhdGhlciBwYXJhbWF0ZXJzLiAgQmVsb3cgdGhpcyB0YXJnZXQsIHRoZSByb290cyB3aWxsIGNvbnRyaWJ1dGUgYmlvbWFzcyBpZiB0aGUgYmVsb3cgZ3JvdW5kIHJvb3QgbWFzcyBleGNlZWRzIHRoZSByZXF1aXJlbWVudHMgb2YgdGhlIGFib3ZlZ3JvdW5kIGJpb21hc3MuIFRoZSB0YXJnZXQgaXMgc3BlY2lmaWVkIGluIExBSSB0byB0aW1lIHJvb3QgY29udHJpYnV0aW9ucyB0byBwZXJpb2RzIG9mIGdyb3d0aFwiLFxuICAgICAgICAgIHZhbHVlOiAxMFxuICAgICAgfSxcbiAgICAgIGVmZmljaWVuY3k6IHtcbiAgICAgICAgICB1bml0czogXCJba2cva2ddXCIsXG4gICAgICAgICAgZGVzY3JpcHRpb246IFwiU3BlY2lmaWVzIHRoZSBlZmZpY2llbmN5IGluIGNvbnZlcnRpbmcgcm9vdCBiaW9tYXNzIGludG8gYWJvdmVncm91bmQgYmlvbWFzcy5cIixcbiAgICAgICAgICB2YWx1ZTogMC43XG4gICAgICB9XG4gICAgfVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHVuaXRzOiBcIlttXjIva2ddXCIsXG4gICAgZGVzY3JpcHRpb246IFwiU3BlY2lmaWVzIHRoZSBTcGVjaWZpYyBMZWFmIEFyZWEgYXMgYSBmdW5jdGlvbiBvZiB0aGUgdHJlZSBhZ2UuICBUaGlzIGlzIGEgdGltZSBkZXBlbmRhbmN5IHBhcmFtZXRlci4gIFVzZWQgaW4gdGhlIGNhbGN1bGF0aW9uIG9mIExBSS4gIFRoZSBncmFwaCBvZiB0aGUgZnVuY3Rpb24gaXMgYXZhaWxhYmxlIGF0OiBodHRwczovL3d3dy5kZXNtb3MuY29tL2NhbGN1bGF0b3Ivd2EwcTJpaDE4aFwiLFxuICAgIHZhbHVlOiB7XG4gICAgICAgIGYwOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJWYWx1ZSBhdCBJbml0aWFsIFRpbWVcIixcbiAgICAgICAgICAgIHZhbHVlOiAxOVxuICAgICAgICB9LFxuICAgICAgICBmMToge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiVmFsdWUgYXQgSW5maW5pdGUgVGltZVwiLFxuICAgICAgICAgICAgdmFsdWU6IDEwLjhcbiAgICAgICAgfSxcbiAgICAgICAgdG06IHtcbiAgICAgICAgICAgIHVuaXRzOiBcIlt5XVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiVGltZSBpbiB5ZWFycyB3aGVyZSB2YWx1ZSBpcyB0aGUgYXZlcmFnZSBvZiBmMCBhbmQgZjFcIixcbiAgICAgICAgICAgIHZhbHVlOiA1XG4gICAgICAgIH0sXG4gICAgICAgIG46IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIm4+PTE7IFBhcmFtZXRlciBzcGVjaWZpbmcgdGhlIHJhdGUgb2YgY2hhbmdlIGFyb3VuZCB0bS4gIG49MSBpcyBhcHByb3hpbWF0ZWx5IGEgbGluZWFyIGNoYW5nZSwgYXMgbiBpbmNyZWFzZXMsIGNoYW5nZSBiZWNvbWVzIG1vcmUgbG9jYWxpemVkIGFyb3VuZCB0bS5cIixcbiAgICAgICAgICAgIHZhbHVlOiAyXG4gICAgICAgIH1cbiAgICB9XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgbW9udGg6IHtcbiAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICB1bml0czogXCJ1bml0bGVzc1wiLFxuICAgICAgICBkZXNjcmlwdGlvbjogXCJUaGUgbW9udGggbnVtYmVyIHNpbmNlIHBsYW50aW5nXCJcbiAgICB9LFxuICAgIHRtaW46IHtcbiAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICB1bml0czogXCJDZWxjaXVzXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIk1pbmltdW0gdGVtcGVyYXR1cmUgZm9yIGdyb3d0aFwiXG4gICAgfSxcbiAgICB0bWF4OiB7XG4gICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgdW5pdHM6IFwiQ2VsY2l1c1wiLFxuICAgICAgICBkZXNjcmlwdGlvbjogXCJNYXhpbXVtIHRlbXBlcmF0dXJlIGZvciBncm93dGhcIlxuICAgIH0sXG4gICAgdGRtZWFuOiB7XG4gICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgdW5pdHM6IFwiQ2VsY2l1c1wiLFxuICAgICAgICBkZXNjcmlwdGlvbjogXCJEZXcgcG9pbnQgdGVtcGVyYXR1cmVcIlxuICAgIH0sXG4gICAgcHB0OiB7XG4gICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgdW5pdHM6IFwiXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIlByZWNpcGl0YXRpb25cIlxuICAgIH0sXG4gICAgcmFkOiB7XG4gICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgdW5pdHM6IFwiXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIlNvbGFyIHJhZGlhdGlvblwiXG4gICAgfSxcbiAgICBucmVsOiB7XG4gICAgICAgIHJlcXVpcmVkIDogZmFsc2UsIC8vIGNhbGN1YXRlZFxuICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgIHVuaXRzOiBcIlwiLFxuICAgICAgICBkZXNjcmlwdGlvbjogXCJcIlxuICAgIH0sXG4gICAgZGF5bGlnaHQ6IHtcbiAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICB1bml0czogXCJcIixcbiAgICAgICAgZGVzY3JpcHRpb246IFwiXCJcbiAgICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuLyoqXG5AbW9kdWxlIDNQRyBNb2R1bGVcbioqL1xuXG5cbi8qKlxuQ2xhc3MgZm9yIGFsbCB0aGUgZnVuY3Rpb25zIHRoYXQgcnVuIGluIGEgc2luZ2xlIHN0ZXAgb2YgdGhlIG1vZGVsXG5cbkBjbGFzcyBtb2R1bGUuZXhwb3J0c1xuKiovXG5cblxuLyoqXG5saXN0IG9mIGNvbnN0YW50cyB1c2VkIGZvciBjb21wdXRhdGlvbnNcblxuQGF0dHJpYnV0ZSBjb25zdGFudFxuKiovXG52YXIgY29uc3RhbnRzID0ge1xuICBhc2NlX2V0cl9lbGV2YXRpb246IHtcbiAgICB2YWx1ZTo1MDAsXG4gICAgdW5pdHM6J20vcycsXG4gICAgZGVzY3JpcHRpb246J0VzdGltYXRlZCBFbGV2YXRpb24gb2YgY2FsY3VsYXRpb24gb2YgRVRyIChhbmQgS2MpJ1xuICB9LFxuICBhc2NlX2V0cl93aW5kc3BlZWQ6IHtcbiAgICB2YWx1ZToyLFxuICAgIHVuaXRzOidtL3MnLFxuICAgIGRlc2NyaXB0aW9uOidDb25zdGFudCB3aW5kIHNwZWVkIGZvciBjYWxjdWxhdGlvbiBvZiBFVHIgKGFuZCBLYyknXG4gIH0sXG4gIGUyMDp7XG4gICAgICB2YWx1ZToyLjIsXG4gICAgICB1bml0czondnAvdCcsXG4gICAgICBkZXNjcmlwdGlvbjonUmF0ZSBvZiBjaGFuZ2Ugb2Ygc2F0dXJhdGVkIFZQIHdpdGggVCBhdCAyMEMnXG4gIH0sXG4gIHJob0Fpcjp7XG4gICAgICB2YWx1ZToxLjIsXG4gICAgICB1bml0czona2cvbV4zJyxcbiAgICAgIGRlc2NyaXB0aW9uOidEZW5zaXR5IG9mIGFpcidcbiAgfSxcbiAgbGFtYmRhOntcbiAgICAgIHZhbHVlOjI0NjAwMDAsXG4gICAgICB1bml0czonSi9rZycsXG4gICAgICBkZXNjcmlwdGlvbjonTGF0ZW50IGhlYXQgb2YgdmFwb3VyaXNhdGlvbiBvZiBoMm8nXG4gIH0sXG4gIFZQRGNvbnY6e1xuICAgICAgdmFsdWU6MC4wMDA2MjIsXG4gICAgICB1bml0czonPycsXG4gICAgICBkZXNjcmlwdGlvbjonQ29udmVydCBWUEQgdG8gc2F0dXJhdGlvbiBkZWZpY2l0ID0gMTgvMjkvMTAwMCdcbiAgfSxcbiAgUWE6e1xuICAgICAgdmFsdWU6LTkwLFxuICAgICAgdW5pdHM6J1cvbV4yJyxcbiAgICAgIGRlc2NyaXB0aW9uOidJbnRlcmNlcHQgb2YgbmV0IHJhZGlhdGlvbiB2ZXJzdXMgc29sYXIgcmFkaWF0aW9uIHJlbGF0aW9uc2hpcCdcbiAgfSxcbiAgUWI6e1xuICAgICAgdmFsdWU6MC44LFxuICAgICAgdW5pdHM6J3VuaXRsZXNzJyxcbiAgICAgIGRlc2NyaXB0aW9uOidzbG9wZSBvZiBuZXQgdnMuIHNvbGFyIHJhZGlhdGlvbiByZWxhdGlvbnNoaXAnXG4gIH0sXG4gIGdETV9tb2w6e1xuICAgICAgdmFsdWU6MjQsXG4gICAgICB1bml0czonZy9tb2woQyknLFxuICAgICAgZGVzY3JpcHRpb246J01vbGVjdWxhciB3ZWlnaHQgb2YgZHJ5IG1hdHRlcidcbiAgfSxcbiAgbW9sUEFSX01KOntcbiAgICAgIHZhbHVlOjIuMyxcbiAgICAgIHVuaXRzOidtb2woQykvTUonLFxuICAgICAgZGVzY3JpcHRpb246J0NvbnZlcnNpb24gb2Ygc29sYXIgcmFkaWF0aW9uIHRvIFBBUidcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMuY29uc3RhbnQgPSBjb25zdGFudDtcbmZ1bmN0aW9uIGNvbnN0YW50KGMpIHtcbiAgICByZXR1cm4gY29uc3RhbnRzW2NdLnZhbHVlO1xufVxuXG4vKipcblRpbWUgRGVwZW5kYW50IEF0dHJpYnV0ZSxcbnVuaXRzPSd2YXJpb3VzJyxcbmRlc2NyaXB0aW9uPSdUaGlzIGZ1bmN0aW9uIGNyZWF0ZXMgYSB0aW1lIGRlcGVuZGFudCBmdW5jdGlvbiB0aGF0IGRlY2F5c1xuKG9yIHJpc2VzIGZyb20gZjAgdG8gZjEuICBUaGUgdmFsdWUgKGYwK2YxKS8yIGlzIHJlYWNoZWQgYXQgdG0sXG5hbmQgdGhlIHNsb3BlIG9mIHRoZSBsaW5lIGF0IHRtIGlzIGdpdmVuIGJ5IHAuXG5AbWV0aG9kIHRkcFxuQHBhcmFtIHhcbkBwYXJhbSBmXG4qKi9cbm1vZHVsZS5leHBvcnRzLnRkcCA9IGZ1bmN0aW9uKHgsZikge1xuICB2YXIgcD1mLmYxICsgKGYuZjAtZi5mMSkqTWF0aC5leHAoLU1hdGgubG9nKDIpKk1hdGgucG93KCh4L2YudG0pLGYubikpO1xuICByZXR1cm4gcDtcbn07XG5cbi8qKlxuQG1ldGhvZCBsaW5cbkBwYXJhbSB4XG5AcGFyYW0gcFxuKi9cbm1vZHVsZS5leHBvcnRzLmxpbiA9IGZ1bmN0aW9uKHgsIHApe1xuICBpZiggeCA8IDAgKSB7XG4gICAgcmV0dXJuIHAubW47XG4gIH1cbiAgaWYoIHggPiBwLnhtYXggKSB7XG4gICAgcmV0dXJuIHAueG1heDtcbiAgfVxuICByZXR1cm4gcC5tbiArIChwLm14LXAubW4pKih4L3AueG1heCk7XG59O1xuXG4vKipcbnVuaXRzPSd1bml0bGVzcycsXG5kZXNjcmlwdGlvbj0nQ2Fub3B5IFJhaW5mYWxsIGludGVyY2VwdGlvbidcbkBtZXRob2QgSW50Y3B0blxuQHBhcmFtIGN1cl9MQUlcbkBwYXJhbSBjXG4qL1xubW9kdWxlLmV4cG9ydHMuSW50Y3B0biA9IGZ1bmN0aW9uKGN1cl9MQUksIGMpe1xuICByZXR1cm4gTWF0aC5tYXgoYy5tbixjLm1uICsgKGMubXggLSBjLm1uKSAqIE1hdGgubWluKDEgLCBjdXJfTEFJIC8gYy5sYWkpKTtcbn07XG5cbi8qKlxudW5pdHM9J21tJyxcbmRlc2NyaXB0aW9uPSdBdmFpbGFibGUgU29pbCBXYXRlcidcbkBtZXRob2QgQVNXXG5AcGFyYW0gbWF4QVNXXG5AcGFyYW0gcHJldl9BU1dcbkBwYXJhbSBkYXRlX3BwdFxuQHBhcmFtIGN1cl9UcmFuc3BcbkBwYXJhbSBjdXJfSW50Y3B0blxuQHBhcmFtIGN1cl9JcnJpZ1xuKi9cbm1vZHVsZS5leHBvcnRzLkFTVyA9IGZ1bmN0aW9uKG1heEFTVywgcHJldl9BU1csIGRhdGVfcHB0LCBjdXJfVHJhbnNwLCBjdXJfSW50Y3B0biwgY3VyX0lycmlnKXtcbiAgcmV0dXJuIE1hdGgubWluKG1heEFTVyoxMCwgTWF0aC5tYXgocHJldl9BU1cgKyBkYXRlX3BwdCAtIChjdXJfVHJhbnNwICsgY3VyX0ludGNwdG4gKiBkYXRlX3BwdCkgKyBjdXJfSXJyaWcsIDApKTtcbn07XG5cbi8vVE9ETzogZG91YmxlIGNoZWNrIHRoZSBhcHByb3ByaWF0ZSB1c2Ugb2YgdGRtZWFuIChkZXcgcG9pbnQgdGVtcClcbi8vVE9ETzogdGFrZSBjb25zdGFudHMgb3V0XG4vKipcbnVuaXRzPSdrUEEnLFxuZGVzY3JpcHRpb249J01lYW4gdmFwb3IgcHJlc3N1cmUgZGVmaWNpdCdcbkBtZXRob2QgVlBEXG5AcGFyYW0gZGF0ZV90bWluXG5AcGFyYW0gZGF0ZV90bWF4XG5AcGFyYW0gZGF0ZV90ZG1lYW5cbiovXG5tb2R1bGUuZXhwb3J0cy5WUEQgPSBmdW5jdGlvbihkYXRlX3RtaW4sIGRhdGVfdG1heCwgZGF0ZV90ZG1lYW4pe1xuICByZXR1cm4gKDAuNjEwOCAvIDIgKiAoTWF0aC5leHAoZGF0ZV90bWluICogMTcuMjcgLyAoZGF0ZV90bWluICsgMjM3LjMpICkgKyBNYXRoLmV4cChkYXRlX3RtYXggKiAxNy4yNyAvIChkYXRlX3RtYXggKyAyMzcuMykgKSApICkgLSAoMC42MTA4ICogTWF0aC5leHAoZGF0ZV90ZG1lYW4gKiAxNy4yNyAvIChkYXRlX3RkbWVhbiArIDIzNy4zKSApICk7XG59O1xuXG5cbi8qKlxudW5pdHMgPSB1bml0bGVzcyxcbmRlc2NyaXB0aW9uPSdWYXBvciBQcmVzc3VyZSBEZWZpY2l0IE1vZGlmaWVyIChQb3BsYXIpJ1xuQG1ldGhvZCBmVlBEXG5AcGFyYW0ga0dcbkBwYXJhbSBjdXJfVlBEXG4qL1xubW9kdWxlLmV4cG9ydHMuZlZQRCA9IGZ1bmN0aW9uKGtHLCBjdXJfVlBEKXtcbiAgcmV0dXJuIE1hdGguZXhwKC0xICoga0cgKiBjdXJfVlBEKTtcbn07XG5cbi8vVE9ETzogdGFrZSBjb25zdGFudHMgb3V0XG4vLyBtYWtlIGEgbWVhbmluZ2Z1bCB0ZW1wdmFyIG5hbWVcbi8qKlxudW5pdHMgPSB1bml0bGVzcyxcbmRlc2NyaXB0aW9uID0gJ051bWJlciBvZiBGcmVlemUgRGF5cyBNb2RpZmllcidcbkBtZXRob2QgZkZyb3N0XG5AcGFyYW0gZGF0ZV90bWluXG4qL1xubW9kdWxlLmV4cG9ydHMuZkZyb3N0ID0gZnVuY3Rpb24oZGF0ZV90bWluKSB7XG4gIHZhciB0ZW1wVmFyID0gLTEuMDtcblxuICBpZiggZGF0ZV90bWluID49IDAgKXtcbiAgICB0ZW1wVmFyID0gMS4wO1xuICB9IC8vZWxzZSAtMS4wXG5cbiAgcmV0dXJuIDAuNSAqICgxLjAgKyB0ZW1wVmFyICogTWF0aC5zcXJ0KDEgLSBNYXRoLmV4cCgtMSAqIE1hdGgucG93KCgwLjE3ICogZGF0ZV90bWluKSAsIDIpICogKDQgLyAzLjE0MTU5ICsgMC4xNCAqIE1hdGgucG93KCAoMC4xNyAqIGRhdGVfdG1pbikgLCAyKSApIC8gKDEgKyAwLjE0ICogTWF0aC5wb3coKDAuMTcgKiBkYXRlX3RtaW4pICwgMikgKSApICkgKTtcbn07XG5cbi8vVE9ETyAtIGJldHRlciBuYW1pbmc/OiB0bWluLCB0bWF4ID0gd2VhdGhlciBUb3B0LCBUbWF4LCBUbWluID0gdHJlZSBwYXJhbXNcbi8qKlxudW5pdHM9dW5pdGxlc3MsXG5kZXNjcmlwdGlvbj0nVGVtcGVyYXR1cmUgbW9kaWZpZXInXG5AbWV0aG9kIGZUXG5AcGFyYW0gdGF2Z1xuQHBhcmFtIGZUXG4qL1xubW9kdWxlLmV4cG9ydHMuZlQgPSBmdW5jdGlvbih0YXZnLCBmVCl7XG4gIHZhciBmO1xuICBpZih0YXZnIDw9IGZULm1uIHx8IHRhdmcgPj0gZlQubXgpe1xuICAgIGYgPSAwO1xuICB9IGVsc2Uge1xuICAgIGYgPSAoICh0YXZnIC0gZlQubW4pIC8gKGZULm9wdCAtIGZULm1uKSApICAqXG4gICAgICAgICAgIE1hdGgucG93ICggKCAoZlQubXggLSB0YXZnKSAvIChmVC5teCAtIGZULm9wdCkgKSxcbiAgICAgICAgICAgICAgICAgICAgICAoIChmVC5teCAtIGZULm9wdCkgLyAoZlQub3B0IC0gZlQubW4pIClcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgfVxuICByZXR1cm4oZik7XG59O1xuXG4vKipcbnVuaXRzPSdtbS9tb24nLFxuZGVzY3JpcHRpb249J1JlcXVpcmVkIElycmlnYXRpb24nXG5AbWV0aG9kIElycmlnXG5AcGFyYW0gaXJyaWdGcmFjXG5AcGFyYW0gY3VyX1RyYW5zcFxuQHBhcmFtIGN1cl9JbnRjcHRuXG5AcGFyYW0gZGF0ZV9wcHRcbiovXG5tb2R1bGUuZXhwb3J0cy5JcnJpZyA9IGZ1bmN0aW9uKGlycmlnRnJhYywgY3VyX1RyYW5zcCwgY3VyX0ludGNwdG4sIGRhdGVfcHB0KXtcbiAgICByZXR1cm4gTWF0aC5tYXgoMCwgaXJyaWdGcmFjICogKGN1cl9UcmFuc3AgLSAoMSAtIGN1cl9JbnRjcHRuKSAqIGRhdGVfcHB0KSApO1xufTtcblxuLy9UT0RPOiBnZXQgdW5pdHMgYW5kIGRlc2NyaXB0aW9uXG4vKipcbkBtZXRob2QgZlNXXG5AcGFyYW0gQVNXXG5AcGFyYW0gbWF4QVdTXG5AcGFyYW0gc3djb25zdFxuQHBhcmFtIHN3cG93ZXJcbiovXG5tb2R1bGUuZXhwb3J0cy5mU1cgPSBmdW5jdGlvbihBU1csIG1heEFXUywgc3djb25zdCwgc3dwb3dlcikge1xuICB2YXIgZlNXO1xuICBpZiggc3djb25zdCA9PT0gMCB8fCBtYXhBV1MgPT09IDAgKSB7XG4gICAgZlNXID0gMDtcbiAgfSBlbHNlIHtcbiAgICB2YXIgb21yID0gMSAtIChBU1cvMTApIC8gbWF4QVdTOyAvLyBPbmUgTWludXMgUmF0aW9cblxuICAgIGlmKG9tciA8IDAuMDAxKSB7XG4gICAgICBmU1cgPSAxO1xuICAgIH0gZWxzZSB7XG4gICAgICBmU1cgPSAoMS1NYXRoLnBvdyhvbXIsc3dwb3dlcikpLygxK01hdGgucG93KG9tci9zd2NvbnN0LHN3cG93ZXIpKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZTVztcbn07XG5cbi8qKlxudW5pdHM9J3VuaXRsZXNzJyxcbmRlc2NyaXB0aW9uPSdOdXRyaXRpb25hbCBGcmFjdGlvbiwgbWlnaHQgYmUgYmFzZWQgb24gc29pbCBhbmQgZmVydGlsaXplciBhdCBzb21lIHBvaW50J1xuQG1ldGhvZCBmTnV0clxuQHBhcmFtIGZOMFxuQHBhcmFtIEZSXG4qL1xubW9kdWxlLmV4cG9ydHMuZk51dHIgPSBmdW5jdGlvbihmTjAsIEZSKXtcbiAgcmV0dXJuIGZOMCArICgxIC0gZk4wKSAqIEZSO1xufTtcblxuLyoqXG5UT0RPOiB3aHkgJDMgaW4gbWFrZWZpbGUgLSBhc2sgYWJvdXQgaXRcbnVuaXRzPXVuaXRsZXNzXG5kZXNjcmlwdGlvbj0nUGh5c2lvbG9naWNhbCBNb2RpZmllciB0byBjb25kdWN0YW5jZSBhbmQgQVBBUnUnXG5AbWV0aG9kIFBoeXNNb2RcbkBwYXJhbSBjdXJfZlZQRFxuQHBhcmFtIGN1cl9mU1dcbkBwYXJhbSBjdXJfZkFnZVxuKi9cbm1vZHVsZS5leHBvcnRzLlBoeXNNb2QgPSBmdW5jdGlvbihjdXJfZlZQRCwgY3VyX2ZTVywgY3VyX2ZBZ2Upe1xuICAgcmV0dXJuIE1hdGgubWluKGN1cl9mVlBEICwgY3VyX2ZTVykgKiBjdXJfZkFnZTtcbn07XG5cbi8qKlxudW5pdHM9J2djLG0vcycsXG5kZXNjcmlwdGlvbj0nQ2Fub3B5IENvbmR1Y3RhbmNlJ1xuQG1ldGhvZCBDYW5Db25kXG5AcGFyYW0gUGh5c01vZFxuQHBhcmFtIExBSVxuQHBhcmFtIGNvbmRcbiovXG5tb2R1bGUuZXhwb3J0cy5DYW5Db25kID0gZnVuY3Rpb24oUGh5c01vZCwgTEFJLCBjb25kKXtcbiAgIHJldHVybiBNYXRoLm1heChjb25kLm1uICwgY29uZC5teCAqIFBoeXNNb2QgKiBNYXRoLm1pbigxICwgTEFJIC8gY29uZC5sYWkpICk7XG59O1xuXG4vKipcbnVuaXRzPSdtbS9tb24nIHdoaWNoIGlzIGFsc28ga2cvbTIvbW9uXG5kZXNjcmlwdGlvbj0nQ2Fub3B5IE1vbnRobHkgVHJhbnNwaXJhdGlvbidcbkBtZXRob2QgVHJhbnNwXG5AcGFyYW0gZGF0ZV9ucmVsXG5AcGFyYW0gZGF5c1xuQHBhcmFtIGRhdGVfZGF5bGlnaHRcbkBwYXJhbSBjdXJfVlBEXG5AcGFyYW0gQkxjb25kXG5AcGFyYW0gY3VyX0NhbkNvbmRcbiovXG5tb2R1bGUuZXhwb3J0cy5UcmFuc3AgPSBmdW5jdGlvbihkYXRlX25yZWwsIGRheXMsIGRhdGVfZGF5bGlnaHQsIGN1cl9WUEQsIEJMY29uZCwgY3VyX0NhbkNvbmQpe1xuICB2YXIgVlBEY29udiA9IGNvbnN0YW50KCdWUERjb252Jyk7XG4gIHZhciBsYW1iZGEgPSBjb25zdGFudCgnbGFtYmRhJyk7XG4gIHZhciByaG9BaXIgPSBjb25zdGFudCgncmhvQWlyJyk7XG4gIHZhciBlMjAgPSBjb25zdGFudCgnZTIwJyk7XG4gIHZhciBRYSA9IGNvbnN0YW50KCdRYScpO1xuICB2YXIgUWIgPSBjb25zdGFudCgnUWInKTtcblxuICAvLyBkYXRlX2RheWxpZ2h0ID0gaG91cnNcbiAgLy8gbnJlbCBpcyBpbiBNSi9tXjIvZGF5IGNvbnZlcnQgdG8gV2gvbV4yL2RheVxuICB2YXIgbmV0UmFkID0gUWEgKyBRYiAqICgoZGF0ZV9ucmVsICogMjc3Ljc3OCkgLyBkYXRlX2RheWxpZ2h0KTtcbiAgdmFyIGRlZlRlcm0gPSByaG9BaXIgKiBsYW1iZGEgKiBWUERjb252ICogY3VyX1ZQRCAqIEJMY29uZDtcbiAgdmFyIGRpdiA9IDEgKyBlMjAgKyBCTGNvbmQgLyBjdXJfQ2FuQ29uZDtcblxuICAvLyBDb252ZXJ0IGRheWxpZ2h0IHRvIHNlY3MuXG4gIHJldHVybiBkYXlzICogKCAoZTIwICogbmV0UmFkICsgZGVmVGVybSApIC8gZGl2ICkgKiBkYXRlX2RheWxpZ2h0ICogMzYwMCAvIGxhbWJkYTtcbn07XG5cbi8qKlxudW5pdHM9J21tL21vbicgd2hpY2ggaXMgYWxzbyBrZy9tMi9tb25cbmRlc2NyaXB0aW9uPSdFVHInXG5AbWV0aG9kIEVUclxuQHBhcmFtIFJzIChNSi9tMi9kYXkpXG5AcGFyYW0gZGF5c1xuQHBhcmFtIFRtICh0bWluK3RtYXgpLzJcbkBwYXJhbSBjdXJfVlBEID0gKGVzLWVhKVxuQHBhcmFtIGVsZXZhdGlvbiAobSlcbkBwYXJhbSB3aW5kX3NwZWVkIChtL3MpXG4qL1xuXG5tb2R1bGUuZXhwb3J0cy5FVHIgPSBmdW5jdGlvbihScyx0bWluLHRtYXgsdGRtZWFuLGRheXMsWix1Mil7XG4gIHUyID0gdHlwZW9mIHUyICE9PSAndW5kZWZpbmVkJyA/IHUyIDogY29uc3RhbnQoJ2FzY2VfZXRyX3dpbmRzcGVlZCcpO1xuICBaID0gdHlwZW9mIFogIT09ICd1bmRlZmluZWQnID8gWiA6IGNvbnN0YW50KCdhc2NlX2V0cl9lbGV2YXRpb24nKTtcblxuICAvLyBGQU8gNTYgQ3JvcCBFdmFwb3JhdGlvblxuICB2YXIgcHN5Y2hyb21ldHJpY19jb25zdGFudCA9IGZ1bmN0aW9uKHopIHtcbiAgICB2YXIgUD0xMDEuMyAqIE1hdGgucG93KCgyOTMgLSAoMC4wMDY1KSp6KS8yOTMsNS4yNik7XG4gICAgZyA9IDAuNjY1KiBNYXRoLnBvdygxMCwtMykqUDtcbiAgICByZXR1cm4gZztcbiAgfTtcblxuICB2YXIgc2xvcGVfb2Zfc2F0dXJhdGlvbl92YXBvcl9wcmVzc3VyZT0gZnVuY3Rpb24oVG0pIHtcbiAgICByZXR1cm4gNDA5OC4xNyAqIDAuNjEwOCAqIE1hdGguZXhwKFRtICogMTcuMjcgLyAoVG0gKyAyMzcuMykpIC8gTWF0aC5wb3coKFRtICsyMzcuMyksMilcbiAgfTtcblxuICB2YXIgdnAgPSBmdW5jdGlvbihUKSB7XG4gICAgcmV0dXJuIDAuNjEwOCAqIE1hdGguZXhwKFQgKiAxNy4yNyAvIChUICsgMjM3LjMpKTsgXG4gIH07XG5cbiAgdmFyIFJubCA9IGZ1bmN0aW9uKHRtaW4sdG1heCx0ZG1lYW4sSykge1xuICAgIHJldHVybiAtKDEuMzUgKiBLIC0gMC4zNSkgKiAoMC4zNCAtIDAuMTQgKiBNYXRoLnNxcnQodnAodGRtZWFuKSkpICogTWF0aC5wb3coNC45MywtMDkpICogKChNYXRoLnBvdyh0bWluICsyNzMuMTYsNCkgKyBNYXRoLnBvdyh0bWF4ICsgMjczLjE2LDQpKSAvIDIpO1xuICB9XG4gIC8vMC40MDggKiBkZWx0YSAqICggUm4gLSBHKSArIHBzeWNoICogKENuIC8gKFQgKyAyNzMpKSAqIHUyICogKGVzIC1lYSApIC8gKGRlbHRhICsgcHN5Y2ggKiAoMSArIENkICogdTIgKSlcbiAgLy8gRVRyOntDbjoxNjAwLENkOjAuMzh9LEVUbzp7Q246OTAwLENkPTAuMzR9XG4gIC8vUm4gPSBNSiAvIG0yIGRheSA9PiBkYXRlX25yZWwgKE1KL21eMi9kYXkpXG4gIC8vRz0wXG4gIC8vdTIgPSBtL3NcbiAgLy8gVCA9IG1lYW4gVCAoQylcbiAgLy8gKGVzLWVhKSA9IHNhdHVyYXRpb24gVmFwb3IgUHJlc3N1cmUgKEtwYSkgPT4gY3VyX1ZQRFxuICB2YXIgVG09KHRtaW4rdG1heCkvMjtcbiAgdmFyIENuPTE2MDA7XG4gIHZhciBDZD0wLjM4O1xuICB2YXIgVlBEID0gKCh2cCh0bWluKSt2cCh0bWF4KSkvMiktdnAodGRtZWFuKTtcbiAgdmFyIGcgPSBwc3ljaHJvbWV0cmljX2NvbnN0YW50KFopO1xuICB2YXIgRCA9IHNsb3BlX29mX3NhdHVyYXRpb25fdmFwb3JfcHJlc3N1cmUoVG0pO1xuICB2YXIgUm5sID0gUm5sKHRtaW4sdG1heCx0ZG1lYW4sMS4wKTtcbiAgUm5sID0tOTAgLyAyNzcuMDtcbiAgdmFyIHJhZCA9IDAuNDA4ICogRCAqIChScyAqICgxIC0gMC4yMykgKyBSbmwpOyBcbiAgdmFyIGRlZiA9IGcgKiAoQ24vKFRtKzI3MykpICogdTIgKiBWUEQ7XG4gIHZhciBkaXYgPSBEICsgZyAqICgxICsgQ2QqdTIpO1xuICB2YXIgRVRyID0gKHJhZCtkZWYpL2RpdjtcbiAvLyBjb25zb2xlLmxvZyh7VG06VG0sRDpELFJubDpSbmwsUnM6UnMsRVRyOkVUcn0pXG4gIC8vIENvbnZlcnQgZGF5bGlnaHQgdG8gc2Vjcy5cbiAgcmV0dXJuIGRheXMgKiBFVHI7XG59O1xuXG4vL1RPRE86IGRlc2NyaXB0aW9uXG4vKipcbnVuaXRzPSdtZXRyaWMgdG9ucyBEcnkgTWF0dGVyL2hhJyxcbkBtZXRob2QgTlBQXG5AcGFyYW0gcHJldl9TdGFuZEFnZVxuQHBhcmFtIGZ1bGxDYW5BZ2VcbkBwYXJhbSB4UFBcbkBwYXJhbSBrXG5AcGFyYW0gcHJldl9MQUlcbkBwYXJhbSBmVlBEXG5AcGFyYW0gZlNXXG5AcGFyYW0gZkFnZVxuQHBhcmFtIGFscGhhXG5AcGFyYW0gZk51dHJcbkBwYXJhbSBmVFxuQHBhcmFtIGZGcm9zdFxuKi9cbm1vZHVsZS5leHBvcnRzLk5QUCA9IGZ1bmN0aW9uKHByZXZfU3RhbmRBZ2UsIGZ1bGxDYW5BZ2UsIHhQUCwgaywgcHJldl9MQUksIGZWUEQsIGZTVywgZkFnZSwgYWxwaGEsIGZOdXRyLCBmVCwgZkZyb3N0KXtcbiAgdmFyIENhbkNvdmVyID0gMTtcbiAgaWYoIHByZXZfU3RhbmRBZ2UgPCBmdWxsQ2FuQWdlICl7XG4gICAgQ2FuQ292ZXIgPSBwcmV2X1N0YW5kQWdlIC8gZnVsbENhbkFnZTtcbiAgfVxuXG4gIHJldHVybiB4UFAgKiAoMSAtIChNYXRoLmV4cCgtayAqIHByZXZfTEFJKSApICkgKiBDYW5Db3ZlciAqIE1hdGgubWluKGZWUEQgLCBmU1cpICogZkFnZSAqIGFscGhhICogZk51dHIgKiBmVCAqIGZGcm9zdDtcbn07XG5cbi8vVE9ETzogdW5pdHMgYW5kIGRlc2NyaXB0aW9uXG4vKipcbkBtZXRob2QgcFJcbkBwYXJhbSBjdXJfUGh5c01vZFxuQHBhcmFtIGN1cl9wUlxuQHBhcmFtIEZSXG5AcGFyYW0gcFJcbiovXG5tb2R1bGUuZXhwb3J0cy5wUiA9IGZ1bmN0aW9uKGN1cl9QaHlzTW9kLCBjdXJfcFIsRlIscFIpe1xuICB2YXIgcCA9KHBSLm14ICogcFIubW4pIC9cbiAgICAgICAgIChwUi5tbiArIChwUi5teCAtIHBSLm1uKSAqIGN1cl9QaHlzTW9kICogKHBSLm0wICsgKDEgLSBwUi5tMCkgKiBGUikgKTtcblxuICAvLyBUaGlzIHdhcyBhZGRlZCBieSBxdWlubiB0byBsaW1pdCByb290IGdyb3d0aC5cbiAgcmV0dXJuIHAgKiBNYXRoLnBvdyhwL2N1cl9wUiwyKTtcbn07XG5cblxuLy9UT0RPOiBtb2xzIG9yIG1vbHMgcGVyIG1eMj9cbi8qKlxudW5pdHM9bW9sc1xuZGVzY3JpcHRpb249J01vbnRobHkgUEFSIGluIG1vbHMgLyBtXjIgbW9udGgnXG5tb2xQQVJfTUogW21vbC9NSl0gaXMgYSBjb25zdGFudCBDb252ZXJzaW9uIG9mIHNvbGFyIHJhZGlhdGlvbiB0byBQQVJcbkBtZXRob2QgUEFSXG5AcGFyYW0gZGF0ZV9yYWRcbkBwYXJhbSBtb2xQQVJfTUpcbiovXG5tb2R1bGUuZXhwb3J0cy5QQVIgPSBmdW5jdGlvbihkYXRlX3JhZCwgZGF5cywgbW9sUEFSX01KKSB7XG4gIGlmKCBtb2xQQVJfTUogPT09IG51bGwgfHwgbW9sUEFSX01KID09PSB1bmRlZmluZWQgKSB7XG4gICAgbW9sUEFSX01KID0gY29uc3RhbnQoJ21vbFBBUl9NSicpO1xuICB9XG5cbiAgcmV0dXJuIGRhdGVfcmFkICogbW9sUEFSX01KICogZGF5cztcbn07XG5cbi8qKlxudW5pdHM9J21ldHJpYyB0b25zIERyeSBNYXR0ZXIvaGEnLFxuZGVzY3JpcHRpb249J21heGltdW0gcG90ZW50aWFsIFByaW1hcnkgUHJvZHVjdGlvbiBbdERNIC8gaGEgbW9udGhdLFxuTk9URTogMTAwMDAvMTBeNiBbaGEvbTJdW3REbS9nRE1dXG5nR01fbW9sIFtnL21vbF0gaXMgdGhlIG1vbGVjdWxhciB3ZWlnaHQgb2YgZHJ5IG1hdHRlclxuQG1ldGhvZCB4UFBcbkBwYXJhbSB5XG5AcGFyYW0gY3VyX1BBUlxuQHBhcmFtIGdETV9tb2xcbiovXG5tb2R1bGUuZXhwb3J0cy54UFAgPSBmdW5jdGlvbih5LCBjdXJfUEFSLCBnRE1fbW9sKXtcbiAgICBpZiggZ0RNX21vbCA9PT0gbnVsbCB8fCBnRE1fbW9sID09PSB1bmRlZmluZWQgKSB7XG4gICAgICBnRE1fbW9sID0gY29uc3RhbnQoJ2dETV9tb2wnKTtcbiAgICB9XG5cbiAgICByZXR1cm4geSAqIGN1cl9QQVIgKiBnRE1fbW9sIC8gMTAwO1xufTtcblxuLyoqKiBGVU5DVElPTlMgRk9SIENPUFBJQ0lORyAqL1xuLyoqXG5jb3BwaWNlIHJlbGF0ZWQgZnVuY3Rpb25zXG5AbWV0aG9kIGNvcHBpY2VcbiovXG5tb2R1bGUuZXhwb3J0cy5jb3BwaWNlID0ge1xuICAvLyBDb3BwaWNlIEZ1bmN0aW9ucyBhcmUgYmFzZWQgb24gRGlhbWV0ZXIgb24gU3R1bXAsIE5PVCBEQkguXG4gIC8vIENhbGN1bGF0ZXMgdGhlIHBmcyBiYXNlZCBvbiB0aGUgc3RlbSB3ZWlnaHQgaW4gS0dcbiAgcGZzIDogZnVuY3Rpb24oc3RlbSwgcCkge1xuICAgIHZhciBhdkRPQiA9IE1hdGgucG93KCAoIHN0ZW0gLyBwLnN0ZW1DbnQgLyBwLnN0ZW1DKSAsICgxIC8gcC5zdGVtUCkgKTtcbiAgICB2YXIgcHBmcz0gcC5wZnNDICogTWF0aC5wb3coYXZET0IgLCBwLnBmc1ApO1xuXG4gICAgcmV0dXJuIE1hdGgubWluKHAucGZzTXgscHBmcyk7XG4gIH0sXG5cbiAgLy8gQ2FsY3VsYXRlcyB0aGUgcGZzIGJhc2VkIG9uIHN0ZW0gd2l0aCBpbiBHLiAgVXNlcyB2b2x1bWUgSW5kZXggYXMgZ3VpZGVcbiAgcGZzX3ZpYV9WSSA6IGZ1bmN0aW9uIChzdGVtRywgd3NWSSwgbGFWSSwgU0xBKSB7XG4gICAgaWYgKHN0ZW1HIDwgMTApIHtcbiAgICAgIHN0ZW1HID0gMTA7XG4gICAgfVxuICAgIHZhciBWSSA9IE1hdGgucG93KCAoc3RlbUcgLyB3c1ZJLnN0ZW1zX3Blcl9zdHVtcCAvIHdzVkkuY29uc3RhbnQpLCgxIC8gd3NWSS5wb3dlcikgKTtcblxuICAgIC8vIEFkZCB1cCBmb3IgYWxsIHN0ZW1zXG4gICAgdmFyIGxhID0gbGFWSS5jb25zdGFudCAqIE1hdGgucG93KFZJLGxhVkkucG93ZXIpICogd3NWSS5zdGVtc19wZXJfc3R1bXA7XG4gICAgdmFyIHdmID0gMTAwMCAqIChsYSAvIFNMQSk7ICAvLyBGb2lsYWdlIFdlaWdodCBpbiBnO1xuICAgIHZhciBwZnMgPSB3Zi9zdGVtRztcbiAgICByZXR1cm4gcGZzO1xuICB9LFxuXG4gIFJvb3RQIDogZnVuY3Rpb24oY3VyX25wcCwgY3VyX25wcFRhcmdldCwgV1IsVyxwUngsZnJhYykge1xuICAgIHZhciBucHBSZXMgPSBjdXJfbnBwVGFyZ2V0IC0gY3VyX25wcDtcbiAgICB2YXIgcm9vdFBQO1xuICAgIGlmKCBucHBSZXMgPiAwICYmIFdSL1cgPiBwUnggKSB7XG4gICAgICAgIHJvb3RQUCA9IE1hdGgubWluKG5wcFJlcywgV1IqKFdSL1cgLSBwUngpKmZyYWMpO1xuICAgIH0gZWxzZSB7XG4gICAgICByb290UFAgPSAwO1xuICAgIH1cblxuICAgIHJldHVybiByb290UFA7XG4gIH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgcmVhZCA6IGZ1bmN0aW9uKG1vZGVsKSB7XG4gICAgLy8gVE9ETyA6IGltcGxlbWVudFxuICAgIC8vIFlvdSBuZWVkIHRvIHNldCB5b3VyIElPIGhlcmUgYW5kIG1ha2Ugc3VyZSBhbGwgcGFyYW1ldGVycyBmb3IgbW9kZWwgYXJlIGNvcnJlY3RseSBzZXRcbiAgfSxcbiAgZHVtcCA6IGZ1bmN0aW9uKCkge1xuICAgIC8vIFRPRE8gOiBpbXBsZW1lbnRcbiAgfVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGZuID0gcmVxdWlyZSgnLi9mbicpO1xudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xudmFyIGRhdGFNb2RlbCA9IHJlcXVpcmUoJy4vZGF0YU1vZGVsJyk7XG52YXIgdmFsaWRhdGUgPSByZXF1aXJlKCcuL3ZhbGlkYXRlJyk7XG5cbmZ1bmN0aW9uIHJ1bihsZW5ndGhPZkdyb3d0aCkge1xuXG4gICAgdmFyIHllYXJUb0NvcHBpY2U7IC8veWVhciBvZiB0aGUgZmlyc3Qgb3Igc3Vic2VxdWVudCBoYXJ2ZXN0c1xuICAgIHZhciBjb3BwaWNlSW50ZXJ2YWw7IC8vdGhlICMgb2YgbW9udGhzIGluIGEgc2luZ2xlIGNvcHBpY2UgY3ljbGVcbiAgICB2YXIgbW9udGhUb0NvcHBpY2U7IC8vYXQgd2hpY2ggbW9udGggdGhlIGhhcnZlc3QgaXMgdG8gYmUgcGVyZm9ybWVkIDo6IGN1cnJlbnRseSB0aGUgdHJlZSB3aWxsIGJlIGN1dCBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoYXQgbW9udGhcbiAgICB2YXIgY29wcGljZURhdGVzO1xuXG4gICAgLy8gaGVscGVyLCBub3QgcmVxdWlyZWQuICB5b3UgY2FuIHJlZ2lzdGVyIGNhbGxiYWNrIHRvIHNldCBwYXJhbWV0ZXJzIHdoZW5ldmVyIHJ1biBpcyBjYWxsZWRcbiAgICB0aGlzLmlvLnJlYWQodGhpcyk7XG5cbiAgICAvLyBtYWtlIHN1cmUgbW9kZWwgaW5wdXRzIGFyZSB2YWxpZCBiZWZvcmUgd2UgcHJvY2VlZCBhbnkgZnVydGhlclxuICAgIHZhbGlkYXRlKHRoaXMpO1xuXG4gICAgdGhpcy5jdXJyZW50RGF0ZSA9IG5ldyBEYXRlKHRoaXMubWFuYWdlLmRhdGVQbGFudGVkKTtcbiAgICAvL3ZhciBwbGFudGVkTW9udGggPSB0aGlzLmN1cnJlbnREYXRlLmdldE1vbnRoKCk7XG4gICAgLy92YXIgY3VycmVudE1vbnRoID0gdGhpcy5jdXJyZW50RGF0ZS5nZXRNb250aCgpO1xuXG4gICAgLy9UT0RPOiB0ZXN0IG5vIGRhdGVjb3BwaWNlIGFzIGlucHV0XG4gICAgaWYgKCB0aGlzLm1hbmFnZS5kYXRlQ29wcGljZWQgIT09IHVuZGVmaW5lZCApe1xuICAgICAgeWVhclRvQ29wcGljZSA9IHRoaXMubWFuYWdlLmRhdGVDb3BwaWNlZC5nZXRGdWxsWWVhcigpO1xuICAgICAgbW9udGhUb0NvcHBpY2UgPSB0aGlzLm1hbmFnZS5kYXRlQ29wcGljZWQuZ2V0TW9udGgoKTtcbiAgICAgIGNvcHBpY2VJbnRlcnZhbCA9IHRoaXMubWFuYWdlLnllYXJzUGVyQ29wcGljZTtcbiAgICB9XG5cbiAgICBpZiggdGhpcy5tYW5hZ2UuY29wcGljZURhdGVzICE9PSB1bmRlZmluZWQgKSB7XG4gICAgICBjb3BwaWNlRGF0ZXMgPSBbXTtcblxuICAgICAgZm9yKCB2YXIgaSA9IDA7IGkgPCB0aGlzLm1hbmFnZS5jb3BwaWNlRGF0ZXMubGVuZ3RoOyBpKysgKSB7XG4gICAgICAgIHZhciBwYXJ0cyA9IHRoaXMubWFuYWdlLmNvcHBpY2VEYXRlc1tpXS5zcGxpdCgnLScpO1xuXG4gICAgICAgIHZhciBkID0gMTU7XG4gICAgICAgIGlmKCBwYXJ0cy5sZW5ndGggPiAyICkge1xuICAgICAgICAgIGQgPSBwYXJzZUludChwYXJ0c1syXSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb3BwaWNlRGF0ZXMucHVzaChuZXcgRGF0ZShwYXJzZUludChwYXJ0c1swXSksIHBhcnNlSW50KHBhcnRzWzFdKS0xLCBkKSk7XG4gICAgICB9XG4gICAgfVxuXG5cbiAgICAvLyBpbml0IG1hbmFnZSBuc1xuICAgIHRoaXMubWFuYWdlLmNvcHBpY2UgPSBmYWxzZTtcblxuICAgIGlmKCB0aGlzLmRlYnVnICkge1xuICAgICAgY29uc29sZS5sb2codGhpcy5jdXJyZW50RGF0ZSk7XG4gICAgfVxuXG4gICAgdmFyIHNldHVwID0ge1xuICAgICAgbGVuZ3RoT2ZHcm93dGggOiBsZW5ndGhPZkdyb3d0aCxcbiAgICAgIHllYXJUb0NvcHBpY2UgOiB5ZWFyVG9Db3BwaWNlLFxuICAgICAgbW9udGhUb0NvcHBpY2UgOiBtb250aFRvQ29wcGljZSxcbiAgICAgIGNvcHBpY2VJbnRlcnZhbCA6IGNvcHBpY2VJbnRlcnZhbCxcbiAgICAgIGNvcHBpY2VEYXRlcyA6IGNvcHBpY2VEYXRlcyxcbiAgICAgIGRheXNfaW5faW50ZXJ2YWwgOiAodGhpcy5kYWlseVN0ZXApPzE6MzAuNFxuICAgIH07XG5cbiAgICByZXR1cm4gdGhpcy5ydW5TZXR1cChzZXR1cCk7XG59XG5cbmZ1bmN0aW9uIHJ1blNldHVwKHNldHVwKXtcbiAgICB2YXIgaSwga2V5LCBjdXJyZW50V2VhdGhlciwgc3RlcCwgdDtcblxuICAgIGlmKCB0aGlzLmRlYnVnICkge1xuICAgICAgdCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgY29uc29sZS5sb2coJ2RheXNfaW5faW50ZXJ2YWw6ICcrc2V0dXAuZGF5c19pbl9pbnRlcnZhbCk7XG4gICAgfVxuXG4gICAgdmFyIG0gPSAodGhpcy5jdXJyZW50RGF0ZS5nZXRNb250aCgpKzEpKycnO1xuICAgIGlmKCBtLmxlbmd0aCA9PT0gMSApIHtcbiAgICAgIG0gPSAnMCcrbTtcbiAgICB9XG5cbiAgICB2YXIgZCA9ICh0aGlzLmN1cnJlbnREYXRlLmdldERhdGUoKSkrJyc7XG4gICAgaWYoIGQubGVuZ3RoID09PSAxICkge1xuICAgICAgZCA9ICcwJytkO1xuICAgIH1cblxuICAgIC8vdmFyIGN1cnJlbnRXZWF0aGVyID0gZ2V0V2VhdGhlcih0aGlzLCBzZXR1cCwgbSwgZCk7XG4gICAgdmFyIGZpcnN0U3RlcFJlc3VsdHMgPSBpbml0KHRoaXMucGxhbnRhdGlvbiwgdGhpcy5zb2lsKTtcblxuICAgIHZhciBrZXlzSW5PcmRlciA9IFtdO1xuICAgIHZhciBoZWFkZXIgPSBbJ2RhdGUnXTtcbiAgICBmb3IoIGtleSBpbiBkYXRhTW9kZWwucGxhbnRhdGlvbl9zdGF0ZS52YWx1ZSApIHtcbiAgICAgIGtleXNJbk9yZGVyLnB1c2goa2V5KTtcbiAgICAgIGhlYWRlci5wdXNoKGtleSk7XG4gICAgfVxuXG4gICAgZmlyc3RTdGVwUmVzdWx0cy5EYXRlID0gdGhpcy5jdXJyZW50RGF0ZS5nZXRGdWxsWWVhcigpKyctJyttKyctJytkO1xuXG4gICAgdmFyIHJvd3MgPSBbXTsgLy90aGVzZSB3aWxsIGJlY29tZSByb3dzXG4gICAgcm93cy5wdXNoKGhlYWRlcik7XG5cbiAgICB2YXIgZmlyc3RSb3cgPSBbZmlyc3RTdGVwUmVzdWx0cy5EYXRlXTtcbiAgICBmb3IoIGkgPSAwOyBpIDwga2V5c0luT3JkZXIubGVuZ3RoOyBpKyspe1xuICAgICAga2V5ID0ga2V5c0luT3JkZXJbaV07XG4gICAgICBmaXJzdFJvdy5wdXNoKGZpcnN0U3RlcFJlc3VsdHNba2V5XSk7XG4gICAgfVxuICAgIHJvd3MucHVzaChmaXJzdFJvdyk7XG5cbiAgICB2YXIgY3VycmVudFN0ZXBSZXN1bHRzID0gZmlyc3RTdGVwUmVzdWx0cztcbiAgICB2YXIgbmV4dFN0ZXBSZXN1bHRzO1xuXG4gICAgZm9yKHN0ZXAgPSAxOyBzdGVwIDwgc2V0dXAubGVuZ3RoT2ZHcm93dGg7IHN0ZXArKykge1xuICAgICAgdGhpcy5jdXJyZW50RGF0ZSA9IG5ldyBEYXRlKHRoaXMubWFuYWdlLmRhdGVQbGFudGVkKTtcbiAgICAgIHRoaXMuY3VycmVudERhdGUuc2V0RGF0ZSh0aGlzLm1hbmFnZS5kYXRlUGxhbnRlZC5nZXREYXRlKCkgKyBzdGVwKnNldHVwLmRheXNfaW5faW50ZXJ2YWwpOyAvLyBhZGQgYSBkYXkgdG8gY3VycmVudCBkYXRlXG4vLyAgICAgIHRoaXMuY3VycmVudERhdGUuc2V0RGF0ZSh0aGlzLm1hbmFnZS5kYXRlUGxhbnRlZC5nZXREYXRlKCkgKyBzdGVwKnNldHVwLmRheXNfaW5faW50ZXJ2YWwpOyAvLyBhZGQgYSBkYXkgdG8gY3VycmVudCBkYXRlXG5cbiAgICAgIGlmKCBzaG91bGRDb3BwaWNlKHRoaXMsIHNldHVwKSApIHtcbiAgICAgICAgaWYoIHRoaXMuZGVidWcgKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ1RpbWUgdG8gQ29wcGljZSEnKTtcbiAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmN1cnJlbnREYXRlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubWFuYWdlLmNvcHBpY2UgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5tYW5hZ2UuY29wcGljZSA9IGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBtID0gKHRoaXMuY3VycmVudERhdGUuZ2V0TW9udGgoKSsxKSsnJztcbiAgICAgIGlmKCBtLmxlbmd0aCA9PT0gMSApIHtcbiAgICAgICAgbSA9ICcwJyttO1xuICAgICAgfVxuXG4gICAgICBkID0gdGhpcy5jdXJyZW50RGF0ZS5nZXREYXRlKCkrJyc7XG4gICAgICBpZiggZC5sZW5ndGggPT09IDEgKSB7XG4gICAgICAgIGQgPSAnMCcrZDtcbiAgICAgIH1cblxuICAgICAgY3VycmVudFdlYXRoZXIgPSBnZXRXZWF0aGVyKHRoaXMsIHNldHVwLCBtLCBkKTtcblxuICAgICAgLy9UT0RPOiBzd2l0Y2ggdXAgdHJlZXMgaGVyZSB3aGVuIGFmdGVyIHRoZSBmaXJzdCBoYXJ2ZXN0XG4gICAgICBuZXh0U3RlcFJlc3VsdHMgPSBzaW5nbGVTdGVwKHRoaXMucGxhbnRhdGlvbiwgdGhpcy5zb2lsLCBjdXJyZW50V2VhdGhlciwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFuYWdlLCBjdXJyZW50U3RlcFJlc3VsdHMsc2V0dXAuZGF5c19pbl9pbnRlcnZhbCk7XG4gICAgICBuZXh0U3RlcFJlc3VsdHMuRGF0ZSA9IHRoaXMuY3VycmVudERhdGUuZ2V0RnVsbFllYXIoKSsnLScrbSsnLScrZDtcblxuICAgICAgdmFyIHRoaXNSb3cgPSBbbmV4dFN0ZXBSZXN1bHRzLkRhdGVdO1xuICAgICAgZm9yKCBpID0gMDsgaSA8IGtleXNJbk9yZGVyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGtleSA9IGtleXNJbk9yZGVyW2ldO1xuICAgICAgICB0aGlzUm93LnB1c2gobmV4dFN0ZXBSZXN1bHRzW2tleV0pO1xuICAgICAgfVxuXG4gICAgICBjdXJyZW50U3RlcFJlc3VsdHMgPSBuZXh0U3RlcFJlc3VsdHM7XG4gICAgICByb3dzLnB1c2godGhpc1Jvdyk7XG4gICAgfVxuXG4gICAgdGhpcy5pby5kdW1wKHJvd3MpO1xuXG4gICAgaWYoIHRoaXMuZGVidWcgKSB7XG4gICAgICBjb25zb2xlLmxvZyhzdGVwKTtcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMuY3VycmVudERhdGUpO1xuICAgICAgY29uc29sZS5sb2coKG5ldyBEYXRlKCkuZ2V0VGltZSgpLXQpKydtcycpO1xuICAgIH1cblxuICAgIHJldHVybiByb3dzO1xufVxuXG5mdW5jdGlvbiBzaW5nbGVTdGVwKHBsYW50YXRpb24sIHNvaWwsIHdlYXRoZXIsIG1hbmFnZSwgcCwgZGF5c19pbl9pbnRlcnZhbCkgeyAvL3AgPSBwcmV2aW91cyBzdGF0ZVxuICB2YXIgYyA9IHt9OyAvL2N1cnJlbnQgc3RhdGVcblxuICBpZiggbWFuYWdlLmNvcHBpY2UgPT09IHRydWUgKSB7IC8vY2hhbmdlIHRoaXMgZ3V5IGZvciB0aGUgbW9udGggd2hlbiBjb3BwaWNlXG4gICAgLy8gQWRkIGluIGEgc3R1bXAgbWFyZ2luLi4uLlxuICAgIGMuZmVlZHN0b2NrSGFydmVzdCA9IHAuZmVlZHN0b2NrSGFydmVzdCArIHAuV1M7XG4gICAgYy5jb3BwaWNlQ291bnQgPSBwLmNvcHBpY2VDb3VudCArIDE7XG4gICAgYy5jb3BwaWNlQWdlID0gMDtcbiAgICBwLkxBSSA9IDA7XG4gICAgcC5XUyA9IDA7XG4gICAgcC5XRiA9IDA7XG4gICAgcC5XID0gcC5XUjtcbiAgfSBlbHNlIHtcbiAgICBjLmZlZWRzdG9ja0hhcnZlc3QgPSBwLmZlZWRzdG9ja0hhcnZlc3Q7XG4gICAgYy5jb3BwaWNlQ291bnQgPSBwLmNvcHBpY2VDb3VudDtcbiAgICBjLmNvcHBpY2VBZ2UgPSBwLmNvcHBpY2VBZ2UgKyBkYXlzX2luX2ludGVydmFsLzM2NS4wO1xuICB9XG5cbiAgdmFyIHRyZWU7IC8vdHJlZVxuICBpZiggYy5jb3BwaWNlQ291bnQgPT09IDAgKSB7IC8vVE9ETzogY2hlY2sgdGhlIGNhc2Ugd2hlcmUgd2Ugc3RhcnQgd2l0aCBhIGNvcHBpY2VkIG11bHRpIHN0dW1wIHRyZWVcbiAgICAgIHRyZWUgPSBwbGFudGF0aW9uLnNlZWRsaW5nVHJlZTtcbiAgfSBlbHNlIHtcbiAgICAgIHRyZWUgPSBwbGFudGF0aW9uLmNvcHBpY2VkVHJlZTtcbiAgfVxuXG4gIGMuU3RhbmRBZ2UgPSBwLlN0YW5kQWdlICsgZGF5c19pbl9pbnRlcnZhbC8zNjUuMDtcbiAgdmFyIHNsYSA9IGZuLnRkcChwLlN0YW5kQWdlLCB0cmVlLlNMQSk7XG4gIGMuTEFJID0gcC5XRiAqIDAuMSAqIHNsYTsgLy8gTGFuZHNidXJnIGVxIDkuNVxuICBjLlZQRCA9IGZuLlZQRCh3ZWF0aGVyLnRtaW4sIHdlYXRoZXIudG1heCwgd2VhdGhlci50ZG1lYW4pO1xuICBjLmZWUEQgPSBmbi5mVlBEKHRyZWUua0csIGMuVlBEKTtcblxuICBjLmZTVyA9IGZuLmZTVyhwLkFTVywgc29pbC5tYXhBV1MsIHNvaWwuc3djb25zdCwgc29pbC5zd3Bvd2VyKTtcbiAgYy5mQWdlID0gZm4udGRwKHAuU3RhbmRBZ2UsIHRyZWUuZkFnZSk7XG5cbiAgLy8gZkZyb3N0IGlzIGEgY3VtdWxhdGl2ZSBOb3JtYWwgZGlzdHJpYnV0aW9uLCB0aGF0IGFwcHJvaXhtYXRlcyB0aGUgbnVtYmVyIG9mIGRheXMgKG9yIHBhcnRzIG9mIGRheXMpIHRoYXRcbiAgLy8gd2lsbCBiZSBiZWxvdyAwLCBnaXZlbiBhIG1pbmltdW0gdGVtcGVyYXR1cmVcbiAgYy5mRnJvc3QgPSBmbi5mRnJvc3Qod2VhdGhlci50bWluKTtcblxuICBjLlBBUiA9IGZuLlBBUih3ZWF0aGVyLnJhZCxkYXlzX2luX2ludGVydmFsKTsgLy8gIFBBUiBpbiBtb2xzXG5cbiAgYy5mVCA9IGZuLmZUKCh3ZWF0aGVyLnRtaW4gKyB3ZWF0aGVyLnRtYXgpLzIsIHRyZWUuZlQpO1xuXG4gIGMuUGh5c01vZCA9IGZuLlBoeXNNb2QoYy5mVlBELCBjLmZTVywgYy5mQWdlKTtcbiAgYy5mTnV0ciA9IGZuLmZOdXRyKHRyZWUuZk4wLCBtYW5hZ2UuZmVydGlsaXR5KTtcbiAgYy54UFAgPSBmbi54UFAodHJlZS55LCBjLlBBUik7IC8vIG1heGltdW0gcG90ZW50aWFsIFByaW1hcnkgUHJvZHVjdGlvbiBwZXIgbW9udGhcbiAgYy5OUFAgPSBmbi5OUFAocC5jb3BwaWNlQWdlLCB0cmVlLmZ1bGxDYW5BZ2UsIGMueFBQLCB0cmVlLmssIHAuTEFJLCBjLmZWUEQsIGMuZlNXLCBjLmZBZ2UsIHRyZWUuYWxwaGEsIGMuZk51dHIsIGMuZlQsIGMuZkZyb3N0KTtcblxuICB2YXIgTlBQX3RhcmdldCA9IGZuLk5QUCh0cmVlLmZ1bGxDYW5BZ2UsIHRyZWUuZnVsbENhbkFnZSwgYy54UFAsIHRyZWUuaywgdHJlZS5yb290UC5MQUlUYXJnZXQsIGMuZlZQRCwgYy5mU1csIGMuZkFnZSwgdHJlZS5hbHBoYSwgYy5mTnV0ciwgYy5mVCwgYy5mRnJvc3QpO1xuICBjLlJvb3RQID0gZm4uY29wcGljZS5Sb290UChjLk5QUCwgTlBQX3RhcmdldCwgcC5XUiwgcC5XLCB0cmVlLnBSLm14LCB0cmVlLnJvb3RQLmZyYWMpO1xuXG4gIGlmICh0cmVlLmxhVkkgJiYgdHJlZS5sYVZJLmNvbnN0YW50ICkgeyAvLyBUZXN0IGZvciB0aGF0IGZ1bmN0aW9uXG4gICAgYy5wZnMgPSBmbi5jb3BwaWNlLnBmc192aWFfVkkocC5XUyoxMDAwMDAwL3BsYW50YXRpb24uU3RvY2tpbmdEZW5zaXR5LCB0cmVlLndzVkksdHJlZS5sYVZJLHNsYSk7XG4gIH0gZWxzZSB7XG4gICAgYy5wZnMgPSBmbi5jb3BwaWNlLnBmcyhwLldTKjEwMDAvcGxhbnRhdGlvbi5TdG9ja2luZ0RlbnNpdHksIHRyZWUucGZzKTtcbiAgfVxuXG4gIGMuZFcgPSBjLk5QUCArIHRyZWUucm9vdFAuZWZmaWNpZW5jeSAqIGMuUm9vdFA7XG5cbiAgYy5JbnRjcHRuID0gZm4uSW50Y3B0bihjLkxBSSwgdHJlZS5JbnRjcHRuKTtcbiAgYy5DYW5Db25kID0gZm4uQ2FuQ29uZChjLlBoeXNNb2QsIGMuTEFJLCB0cmVlLkNvbmR1Y3RhbmNlKTtcblxuICBjLnBSID0gZm4ucFIoYy5QaHlzTW9kLCBwLldSL3AuVywgbWFuYWdlLmZlcnRpbGl0eSwgdHJlZS5wUik7XG4gIGMubGl0dGVyZmFsbCA9IGZuLnRkcChwLlN0YW5kQWdlLCB0cmVlLmxpdHRlcmZhbGwpO1xuXG4gIGMuVHJhbnNwID0gZm4uVHJhbnNwKHdlYXRoZXIucmFkLCBkYXlzX2luX2ludGVydmFsLHdlYXRoZXIuZGF5bGlnaHQsIGMuVlBELCB0cmVlLkJMY29uZCwgYy5DYW5Db25kKTtcbiAgYy5FVHIgPSBmbi5FVHIod2VhdGhlci5yYWQsd2VhdGhlci50bWluLHdlYXRoZXIudG1heCx3ZWF0aGVyLnRkbWVhbixkYXlzX2luX2ludGVydmFsKTtcbiAgYy5LYyA9IGMuVHJhbnNwL2MuRVRyO1xuICBcblxuICAvLyBDYWxjdWxhdGVkIGZyb20gcGZzXG4gIGMucFMgPSAoMSAtIGMucFIpIC8gKDEgKyBjLnBmcyApO1xuICBjLnBGID0gKDEgLSBjLnBSKSAvICgxICsgMS9jLnBmcyApO1xuXG4gIGMuSXJyaWcgPSBmbi5JcnJpZyhtYW5hZ2UuaXJyaWdGcmFjLCBjLlRyYW5zcCwgYy5JbnRjcHRuLCB3ZWF0aGVyLnBwdCk7XG4gIGMuQ3VtSXJyaWcgPSBwLkN1bUlycmlnICsgYy5JcnJpZztcblxuICBjLkFTVyA9IGZuLkFTVyhzb2lsLm1heEFXUywgcC5BU1csIHdlYXRoZXIucHB0LCBjLlRyYW5zcCwgYy5JbnRjcHRuLCBjLklycmlnKTsgLy9mb3Igc29tZSByZWFzb24gc3BlbGxlZCBtYXhBV1NcblxuICBjLldGID0gcC5XRiArIGMuZFcgKiBjLnBGIC0gYy5saXR0ZXJmYWxsICogcC5XRjtcbiAgLy8gSW5jbHVkZSBjb250cmlidXRpb24gb2YgUm9vdFAgLy8gRXJyb3IgaW4gb2xkIGNvZGUgIVxuICBjLldSID0gcC5XUiArIGMuZFcgKiBjLnBSIC0gdHJlZS5wUi50dXJub3ZlciAqIHAuV1IgLSBjLlJvb3RQO1xuICBjLldTID0gcC5XUyArIGMuZFcgKiBjLnBTO1xuICBjLlcgPSBjLldGK2MuV1IrYy5XUztcblxuICByZXR1cm4gYztcbn1cblxuZnVuY3Rpb24gaW5pdChwbGFudGF0aW9uLCBzb2lsKSB7XG4gIHZhciBwID0ge307XG4gIHZhciB0cmVlID0gcGxhbnRhdGlvbi5zZWVkbGluZ1RyZWU7IC8vVE9ETzogZGVjaWRlIHRoZSBjYXNlIHdoZXJlIHdlIHN0YXJ0IHdpdGggYSBjb3BwaWNlZCB0cmVlP1xuXG4gIHAuZmVlZHN0b2NrSGFydmVzdD0wO1xuICBwLmNvcHBpY2VDb3VudD0wO1xuICBwLmNvcHBpY2VBZ2UgPSAwO1xuXG4gIHAuQ3VtSXJyaWcgPSAwO1xuICBwLmRXID0gMDtcbiAgcC5XID0gcGxhbnRhdGlvbi5TdG9ja2luZ0RlbnNpdHkgKiBwbGFudGF0aW9uLlNlZWRsaW5nTWFzcztcbiAgcC5XRiA9IHBsYW50YXRpb24ucEYgKiBwLlc7XG4gIHAuV1MgPSBwbGFudGF0aW9uLnBTICogcC5XO1xuICBwLldSID0gcGxhbnRhdGlvbi5wUiAqIHAuVztcbiAgcC5BU1cgPSAwLjggKiAxMCAqIHNvaWwubWF4QVdTOyAvLyBUaGUgMTAgaXMgYmVjYXVzZSBtYXhBV1MgaXMgaW4gY20gYW5kIEFTVyBpbiBtbSAoPykgV2h5ICg/KVxuICBwLlN0YW5kQWdlID0gMDtcblxuICB0cmVlID0gcGxhbnRhdGlvbi5zZWVkbGluZ1RyZWU7XG5cbiAgLy8gc2xhID0gU3BlY2lmaWMgTGVhZiBBcmVhXG4gIHZhciBzbGEgPSBmbi50ZHAocC5TdGFuZEFnZSx0cmVlLlNMQSk7XG5cbiAgcC5MQUkgPSBwLldGICogMC4xICogc2xhOyAvLyBMYW5kc2J1cmcgZXEgOS41XG5cbiAgLy8gVGhlc2UgYXJlbid0IHVzZWQgc28gY2FuIGJlIHNldCB0byBhbnl0aGluZzsgIFRoZXkgYXJlIHNldCB0byBtYXRjaCB0aGUgcG9zdGdyZXMgdHlwZVxuICBwLlZQRCAgICAgICAgPSAwO1xuICBwLmZWUEQgICAgICAgPSAwO1xuICBwLmZUICAgICAgICAgPSAwO1xuICBwLmZGcm9zdCAgICAgPSAwO1xuICBwLmZOdXRyICAgICAgPSAwO1xuICBwLmZTVyAgICAgICAgPSAwO1xuICBwLmZBZ2UgICAgICAgPSAwO1xuICBwLlBBUiAgICAgICAgPSAwO1xuICBwLnhQUCAgICAgICAgPSAwO1xuICBwLkludGNwdG4gICAgPSAwO1xuICBwLklycmlnICAgICAgPSAwO1xuICBwLkNhbkNvbmQgICAgPSAwO1xuICBwLlRyYW5zcCAgICAgPSAwO1xuICBwLlBoeXNNb2QgICAgPSAwO1xuICBwLnBmcyAgICAgICAgPSAwO1xuICBwLnBSICAgICAgICAgPSAwO1xuICBwLnBTICAgICAgICAgPSAwO1xuICBwLnBGICAgICAgICAgPSAwO1xuICBwLmxpdHRlcmZhbGwgPSAwO1xuICBwLk5QUCAgICAgICAgPSAwO1xuICBwLlJvb3RQICAgICAgPSAwO1xuXG4gIHJldHVybiBwO1xufVxuXG4vLyBUaGlzIGFjdHVhbGx5IG5lZWQgdG8gd29yayBiZXR0ZXIuICBJZiB0aGUgd2VhdGhlciBkb2Vzbid0IG1hdGNoXG4vLyB0aGUgc3RlcHMsIHdlIG5lZWQgdG8gZmluZCB0aGUgY2xvc2VzdCB2YWx1ZSB0byB3aGF0IHdlIGFyZSBsb29raW5nIGZvclxuZnVuY3Rpb24gZ2V0V2VhdGhlcihtb2RlbCwgc2V0dXAsIG1vbnRoLCBkYXkpIHtcblxuICAgIGlmKCBtb2RlbC53ZWF0aGVyW21vZGVsLmN1cnJlbnREYXRlLmdldEZ1bGxZZWFyKCkrJy0nK21vbnRoKyctJytkYXldICE9PSB1bmRlZmluZWQgKSB7XG4gICAgICByZXR1cm4gbW9kZWwud2VhdGhlclttb2RlbC5jdXJyZW50RGF0ZS5nZXRGdWxsWWVhcigpKyctJyttb250aCsnLScrZGF5XTtcbiAgICB9XG5cbiAgICAvLyBtb2RlbGxlZCBkYWlseVxuICAgIGlmKCBtb2RlbC53ZWF0aGVyW21vbnRoKyctJytkYXldICE9PSB1bmRlZmluZWQgKSB7XG4gICAgICByZXR1cm4gbW9kZWwud2VhdGhlclttb250aCsnLScrZGF5XTtcbiAgICB9XG5cbiAgICAvLyBhY3R1YWxcbiAgICBpZiggbW9kZWwud2VhdGhlclttb2RlbC5jdXJyZW50RGF0ZS5nZXRGdWxsWWVhcigpKyctJyttb250aF0gIT09IHVuZGVmaW5lZCApIHtcbiAgICAgIHJldHVybiBtb2RlbC53ZWF0aGVyW21vZGVsLmN1cnJlbnREYXRlLmdldEZ1bGxZZWFyKCkrJy0nK21vbnRoXTtcbiAgICB9XG5cbiAgLy8gbW9kZWxsZWQgTW9udGhseVxuICBpZiggbW9kZWwud2VhdGhlclttb250aF0gIT09IHVuZGVmaW5lZCApIHtcbiAgICByZXR1cm4gbW9kZWwud2VhdGhlclttb250aF07XG4gIH1cblxuICB0aHJvdyAnUnVudGltZSBFcnJvcjogbm8gd2VhdGhlciBmb3VuZCBmb3IgbW9udGg6ICcrbW9udGg7XG59XG5cbmZ1bmN0aW9uIHNob3VsZENvcHBpY2UobW9kZWwsIHNldHVwKSB7XG4gIHZhciBuZXh0O1xuICB2YXIgY29wcGljZV9vbjtcbiAgLy8gZG8gd2UgaGF2ZSBzcGVjaWZpYyBjb3BwaWNlIGRhdGVzIHNldD9cbiAgaWYoIHNldHVwLmNvcHBpY2VEYXRlcyApIHtcbiAgICBmb3IoIHZhciBpID0gMDsgaSA8IHNldHVwLmNvcHBpY2VEYXRlcy5sZW5ndGg7IGkrKyApIHtcbiAgICAgIHZhciBkID0gc2V0dXAuY29wcGljZURhdGVzW2ldO1xuXG4gICAgICBpZiAobW9kZWwuY3VycmVudERhdGUgPCBkKSB7XG4gICAgICAgIG5leHQgPSBtb2RlbC5jdXJyZW50RGF0ZTtcbiAgICAgICAgbmV4dC5zZXREYXRlKG5leHQuZ2V0RGF0ZSArIHNldHVwLmRheXNfaW5faW50ZXJ2YWwpO1xuICAgICAgICBpZiAoIGQgPCBuZXh0KSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgY29wcGljZV9vbiA9IG5ldyBEYXRlKCk7XG4gICAgY29wcGljZV9vbi5zZXRZZWFyKHNldHVwLnllYXJUb0NvcHBpY2UpO1xuICAgIGNvcHBpY2Vfb24uc2V0TW9udGgoc2V0dXAubW9udGhUb0NvcHBpY2UpO1xuICAgIGNvcHBpY2Vfb24uc2V0RGF0ZSgxNSk7XG5cbiAgICBpZiAobW9kZWwuY3VycmVudERhdGUgPCBjb3BwaWNlX29uKSB7XG4gICAgICBuZXh0PW5ldyBEYXRlKG1vZGVsLmN1cnJlbnREYXRlKTtcbiAgICAgIG5leHQuc2V0RGF0ZShtb2RlbC5jdXJyZW50RGF0ZS5nZXREYXRlKCkgKyBzZXR1cC5kYXlzX2luX2ludGVydmFsKTtcbiAgICAgIGlmICggY29wcGljZV9vbiA8IG5leHQpIHtcbiAgICAgICAgc2V0dXAueWVhclRvQ29wcGljZSA9IHNldHVwLnllYXJUb0NvcHBpY2Urc2V0dXAuY29wcGljZUludGVydmFsO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiBnZXRGdW5jdGlvbihuYW1lKSB7XG4gIGlmKCBmbltuYW1lXSApIHtcbiAgICByZXR1cm4gZm5bbmFtZV07XG4gIH0gZWxzZSBpZiggZm4uY29wcGljZVtuYW1lXSApIHtcbiAgICByZXR1cm4gZm4uY29wcGljZVtuYW1lXTtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpbykge1xuICByZXR1cm4ge1xuICAgIGlvIDogaW8sXG4gICAgcnVuIDogcnVuLFxuICAgIHNpbmdsZVN0ZXAgOiBzaW5nbGVTdGVwLFxuICAgIHJ1blNldHVwIDogcnVuU2V0dXAsXG4gICAgaW5pdCA6IGluaXQsXG4gICAgZ2V0RnVuY3Rpb24gOiBnZXRGdW5jdGlvbixcbiAgICBzZXRJTyA6IGZ1bmN0aW9uKGlvKSB7XG4gICAgICB0aGlzLmlvID0gaW87XG4gICAgfSxcbiAgICBnZXREYXRhTW9kZWwgOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBkYXRhTW9kZWw7XG4gICAgfVxuICB9O1xufTtcbiIsImZ1bmN0aW9uIGVudigpIHtcbiAgaWYoIHR5cGVvZiBwbHY4ICE9PSAndW5kZWZpbmVkJyApIHJldHVybiBcInBsdjhcIjtcbiAgaWYoIHR5cGVvZiBMb2dnZXIgIT09ICd1bmRlZmluZWQnICkgcmV0dXJuIFwiYXBwc2NyaXB0XCI7XG4gIGlmKCB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykgcmV0dXJuIFwibm9kZVwiO1xufVxuXG5mdW5jdGlvbiBsb2cobXNnKSB7XG4gIHZhciBlID0gZW52KCk7XG4gIGlmKCBlID09IFwicGx2OFwiICkgcGx2OC5lbG9nKE5PVElDRSwgJ25vdGljZScsIG1zZyk7XG4gIGVsc2UgaWYoIGUgPT0gXCJhcHBzY3JpcHRcIiApIExvZ2dlci5sb2cobXNnKTtcbiAgZWxzZSBjb25zb2xlLmxvZyhtc2cpO1xufVxuXG5mdW5jdGlvbiBjbG9uZShvYmopIHtcbiAgaWYgKG51bGwgPT0gb2JqIHx8IFwib2JqZWN0XCIgIT0gdHlwZW9mIG9iaikgcmV0dXJuIG9iajtcbiAgdmFyIGNvcHkgPSBvYmouY29uc3RydWN0b3IoKTtcbiAgZm9yICh2YXIgYXR0ciBpbiBvYmopIHtcbiAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGF0dHIpKSBjb3B5W2F0dHJdID0gb2JqW2F0dHJdO1xuICB9XG4gIHJldHVybiBjb3B5O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZW52IDogZW52LFxuICBsb2cgOiBsb2csXG4gIGNsb25lIDogY2xvbmVcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuLypcbiAqIFZhbGlkYXRlIGEgbW9kZWwgcnVuIHNldHVwLiAgdGhyb3cgZXJyb3IgaXMgYmFkbmVzcy5cbiAqL1xudmFyIGRhdGFNb2RlbCA9IHJlcXVpcmUoJy4vZGF0YU1vZGVsJyk7XG52YXIgcGFyYW1FcnJvciA9ICdWYWxpZGF0aW9uIEVycm9yOiAnO1xuXG52YXIgdmFsaWRXZWF0aGVyS2V5cyA9IFtcbiAgL15cXGRcXGRcXGRcXGQtXFxkXFxkJC8sIC8vIHNwZWNpZmljIHdlYXRoZXIgWVlZWS1NTSBmb3IgbW9udGhseSB0aW1lc3RlcFxuICAvXlxcZFxcZCQvLCAvLyBtb2RlbGxlZCBvciBhdmVyYWdlIHdlYXRoZXIgTU0gZm9yIG1vbnRobHkgdGltZXN0ZXBcbiAgL15cXGRcXGRcXGRcXGQtXFxkXFxkLVxcZFxcZCQvLCAvLyBzcGVjaWZpYyB3ZWF0aGVyIFlZWVktTU0tREQgZm9yIGRhaWx5IHRpbWVzdGVwXG4gIC9eXFxkXFxkLVxcZFxcZCQvIC8vIG1vZGVsbGVkIG9yIGF2ZXJhZ2Ugd2VhdGhlciBNTS1ERCBmb3IgZGFpbHkgdGltZXN0ZXBcbl07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obW9kZWwpIHtcbiAgdmFsaWRhdGVQbGFudGF0aW9uKG1vZGVsKTtcbiAgdmFsaWRhdGVNYW5hZ2UobW9kZWwpO1xuICB2YWxpZGF0ZVdlYXRoZXIobW9kZWwpO1xuICB2YWxpZGF0ZVNvaWwobW9kZWwpO1xufTtcblxuZnVuY3Rpb24gdmFsaWRhdGVNYW5hZ2UobW9kZWwpIHtcbiAgaWYoICFtb2RlbC5tYW5hZ2UgKSB7XG4gICAgdGhyb3cgcGFyYW1FcnJvcisnbWFuYWdlIGlzIG5vdCBkZWZpbmllZCc7XG4gIH1cblxuICB2YWxpZGF0ZU1vZGVsKGRhdGFNb2RlbC5tYW5hZ2UsIG1vZGVsLm1hbmFnZSwgJ21hbmFnZScpO1xuXG4gIGlmKCBtb2RlbC5tYW5hZ2UuY29wcGljZURhdGVzICkge1xuICAgIGlmKCAhQXJyYXkuaXNBcnJheShtb2RlbC5tYW5hZ2UuY29wcGljZURhdGVzKSApIHtcbiAgICAgIHRocm93IHBhcmFtRXJyb3IrJ21hbmFnZS5jb3BwaWNlRGF0ZXMgc2hvdWxkIGJlIGFuIGFycmF5IG9mIGRhdGUgc3RyaW5ncy4nO1xuICAgIH1cblxuICAgIGZvciggdmFyIGkgPSAwOyBpIDwgbW9kZWwubWFuYWdlLmNvcHBpY2VEYXRlcy5sZW5ndGg7IGkrKyApIHtcbiAgICAgIGlmKCBtb2RlbC5tYW5hZ2UuY29wcGljZURhdGVzW2ldLm1hdGNoKCdeXFxkXFxkXFxkXFxkLVxcZFxcZCQnKSB8fCBtb2RlbC5tYW5hZ2UuY29wcGljZURhdGVzW2ldLm1hdGNoKCdeXFxkXFxkXFxkXFxkLVxcZFxcZC1cXGRcXGQkJykgKSB7XG4gICAgICAgIHRocm93IHBhcmFtRXJyb3IrJyBpbnZhbGlkIG1hbmFnZS5jb3BwaWNlRGF0ZXMgZm9ybWF0ICcrbW9kZWwubWFuYWdlLmNvcHBpY2VEYXRlc1tpXSsnLiBzaG91bGQgYmUgWVlZWS1NTSBmb3JtYXQuJztcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG5cbiAgICBpZiggbW9kZWwubWFuYWdlLmRhdGVDb3BwaWNlZCA9PT0gdW5kZWZpbmVkICkge1xuICAgICAgdGhyb3cgcGFyYW1FcnJvcisnIG1hbmFnZS5kYXRlQ29wcGljZWQgcmVxdWlyZWQgaWYgbWFuYWdlLmNvcHBpY2VEYXRlcyBub3QgcHJvdmlkZWQnO1xuICAgIH1cbiAgICBpZiggbW9kZWwubWFuYWdlLnllYXJzUGVyQ29wcGljZSA9PT0gdW5kZWZpbmVkICkge1xuICAgICAgdGhyb3cgcGFyYW1FcnJvcisnIG1hbmFnZS55ZWFyc1BlckNvcHBpY2UgcmVxdWlyZWQgaWYgbWFuYWdlLmNvcHBpY2VEYXRlcyBub3QgcHJvdmlkZWQnO1xuICAgIH1cblxuICB9XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlV2VhdGhlcihtb2RlbCkge1xuICBpZiggIW1vZGVsLndlYXRoZXIgKSB7XG4gICAgdGhyb3cgcGFyYW1FcnJvcisnTm8gd2VhdGhlciBkZWZpbmVkJztcbiAgfVxuXG4gIGZvciggdmFyIGtleSBpbiBtb2RlbC53ZWF0aGVyICkge1xuICAgIHZhciBmb3VuZCA9IGZhbHNlO1xuICAgIGZvciggdmFyIGkgPSAwOyBpIDwgdmFsaWRXZWF0aGVyS2V5cy5sZW5ndGg7IGkrKyApIHtcbiAgICAgIGlmKCBrZXkubWF0Y2godmFsaWRXZWF0aGVyS2V5c1tpXSkgKSB7XG4gICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYoICFmb3VuZCApIHtcbiAgICAgIHRocm93IHBhcmFtRXJyb3IrJyBpbnZhbGlkIHdlYXRoZXIga2V5OiAnK2tleTtcbiAgICB9XG5cbiAgICB2YWxpZGF0ZU1vZGVsKGRhdGFNb2RlbC53ZWF0aGVyLCBtb2RlbC53ZWF0aGVyW2tleV0sICd3ZWF0aGVyJyk7XG4gIH1cbn1cblxuXG5mdW5jdGlvbiB2YWxpZGF0ZVNvaWwobW9kZWwpIHtcbiAgaWYoICFtb2RlbC5zb2lsICkge1xuICAgIHRocm93IHBhcmFtRXJyb3IrJ3NvaWwgaXMgbm90IGRlZmluaWVkJztcbiAgfVxuXG4gIHZhbGlkYXRlTW9kZWwoZGF0YU1vZGVsLnNvaWwsIG1vZGVsLnNvaWwsICdzb2lsJyk7XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlUGxhbnRhdGlvbihtb2RlbCkge1xuICBpZiggIW1vZGVsLnBsYW50YXRpb24gKSB7XG4gICAgdGhyb3cgcGFyYW1FcnJvcisncGxhbnRhdGlvbiBpcyBub3QgZGVmaW5pZWQnO1xuICB9XG4gIHZhbGlkYXRlTW9kZWwoZGF0YU1vZGVsLnBsYW50YXRpb24sIG1vZGVsLnBsYW50YXRpb24sICdwbGFudGF0aW9uJyk7XG5cbiAgaWYoICFtb2RlbC5wbGFudGF0aW9uLnNlZWRsaW5nVHJlZSApIHtcbiAgICB0aHJvdyBwYXJhbUVycm9yKydwbGFudGF0aW9uLnNlZWRsaW5nVHJlZSBpcyBub3QgZGVmaW5pZWQnO1xuICB9XG4gIHZhbGlkYXRlTW9kZWwoZGF0YU1vZGVsLnRyZWUsIG1vZGVsLnBsYW50YXRpb24uc2VlZGxpbmdUcmVlLCAncGxhbnRhdGlvbi5zZWVkbGluZ1RyZWUnKTtcblxuICBpZiggIW1vZGVsLnBsYW50YXRpb24uY29wcGljZWRUcmVlICkge1xuICAgIHRocm93IHBhcmFtRXJyb3IrJ3BsYW50YXRpb24uY29wcGljZWRUcmVlIGlzIG5vdCBkZWZpbmllZCc7XG4gIH1cbiAgdmFsaWRhdGVNb2RlbChkYXRhTW9kZWwudHJlZSwgbW9kZWwucGxhbnRhdGlvbi5jb3BwaWNlZFRyZWUsICdwbGFudGF0aW9uLmNvcHBpY2VkVHJlZScpO1xufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZU1vZGVsKGRhdGFNb2RlbCwgbW9kZWwsIG5hbWUpIHtcbiAgdmFyIGtleSwgaXRlbTtcblxuICBmb3IoIGtleSBpbiBkYXRhTW9kZWwudmFsdWUgKSB7XG4gICAgaXRlbSA9IGRhdGFNb2RlbC52YWx1ZVtrZXldO1xuICAgIGlmKCBpdGVtLnJlcXVpcmVkID09PSBmYWxzZSApIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGlmKCBtb2RlbFtrZXldID09PSB1bmRlZmluZWQgKSB7XG4gICAgICB0aHJvdyBwYXJhbUVycm9yK25hbWUrJy4nK2tleSsnIGlzIG1pc3NpbmcgJytcbiAgICAgICAgICAgIChpdGVtLmRlc2NyaXB0aW9uID8gJygnK2l0ZW0uZGVzY3JpcHRpb24rJyknIDogJycpO1xuICAgIH1cblxuICAgIGlmKCB0eXBlb2YgaXRlbS52YWx1ZSA9PT0gJ29iamVjdCcgKSB7XG4gICAgICB2YWxpZGF0ZU1vZGVsKGl0ZW0sIG1vZGVsW2tleV0sIG5hbWUrJy4nK2tleSk7XG4gICAgfVxuICB9XG59XG4iLCJ2YXIgZ2RyaXZlID0gcmVxdWlyZSgnLi9nb29nbGVEcml2ZScpO1xudmFyIGV4cG9ydFRvQ3N2ID0gcmVxdWlyZSgnLi9nb29nbGVEcml2ZS9leHBvcnRUb0NzdicpO1xudmFyIG9mZmxpbmUgPSByZXF1aXJlKCcuL29mZmxpbmUnKTtcbnZhciBjb25maWcgPSByZXF1aXJlKCcuL2NvbmZpZycpO1xudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xudmFyIHJhd091dHB1dCA9IHJlcXVpcmUoJy4vb3V0cHV0L3JhdycpO1xudmFyIHdlYXRoZXIgPSByZXF1aXJlKCcuL3dlYXRoZXInKTtcbnZhciB3ZWF0aGVyQ2hhcnQgPSByZXF1aXJlKCcuL3dlYXRoZXIvY2hhcnQnKTtcbnZhciBmbGFzaGJsb2NrRGV0ZWN0b3IgPSByZXF1aXJlKCcuL2ZsYXNoYmxvY2stZGV0ZWN0b3InKTtcbnZhciBpbnB1dEZvcm0gPSByZXF1aXJlKCcuL2lucHV0Rm9ybScpO1xudmFyIGNoYXJ0cyA9IHJlcXVpcmUoJy4vY2hhcnRzJyk7XG5cbi8vIGltcG9ydCAzcGcgbW9kZWxcbnZhciBtb2RlbCA9IHJlcXVpcmUoJy4uLy4uL3BvcGxhci0zcGctbW9kZWwnKTtcblxuLy8gd2lyZSBpbiBhcHAgaGFuZGxlcnMgdG8gbW9kZWxcbnZhciBtb2RlbElPID0gcmVxdWlyZSgnLi9tb2RlbFJ1bkhhbmRsZXInKTtcbm1vZGVsLnNldElPKG1vZGVsSU8pO1xuXG52YXIgcnVuQ2FsbGJhY2ssIHdlYXRoZXJDdXN0b21DaGFydDtcblxuXG4vLyByb3cgcmF3IGRhdGEgZG9lcyBhIGxvdCBvZiBwcm9jZXNzaW5nIG9mIHRoZSByZXN1bHRzIGFuZCB0aGUgY3VycmVudCBzdGF0ZSBvZiB3aGF0J3Ncbi8vIGJlaW5nIGRpc3BsYXllZC4gIEdvIGFoZWFkIGFuIHNldHVwIHRoZSBjc3YgZGF0YSBhdCB0aGlzIHBvaW50LCB0aGVuIGlmIHRoZSB1c2VyXG4vLyBkZWNpZGVzIHRvIGV4cG9ydCwgd2UgYXJlIGFsbCBzZXQgdG8gdG87XG52YXIgY3N2UmVzdWx0cyA9IG51bGw7XG5cblxudmFyIGluaXQgPSBmdW5jdGlvbihjYWxsYmFjaykge1xuICAvLyB0aGVzZSB3ZSBkb24ndCB3YW50IHRvIHNldHVwIHVudGlsIGRvbSBpcyByZWFkeVxuICBpbnB1dEZvcm0gPSBpbnB1dEZvcm0odGhpcyk7XG5cbiAgY2hhcnRzLnNldEFwcCh0aGlzKTtcbiAgZ2RyaXZlLnNldEFwcCh0aGlzKTtcblxuICBtb2RlbElPLmFwcCA9IHRoaXM7XG4gIG1vZGVsSU8ubW9kZWwgPSBtb2RlbDtcbiAgbW9kZWxJTy5jaGFydHMgPSBjaGFydHM7XG4gIG1vZGVsSU8uaW5wdXRGb3JtID0gaW5wdXRGb3JtO1xuXG4gIC8vIGNoZWNrIGlmIGZsYXNoIGlzIGluc3RhbGxlZC4gIElmIG5vdCwgaGlkZSB0aGUgY2hhcnQgdHlwZSB0b2dnbGUuXG4gIGZsYXNoYmxvY2tEZXRlY3RvcihmdW5jdGlvbih2YWwpe1xuICAgICAgaWYoIHZhbCA+IDAgKSAkKFwiI2NoYXJ0LXR5cGUtYnRuLWdyb3VwXCIpLmhpZGUoKTtcbiAgfSk7XG5cbiAgcmF3T3V0cHV0LmluaXQodGhpcyk7XG5cbiAgLy8gc2V0dXAgZXhwb3J0IG1vZGFsXG4gIGV4cG9ydFRvQ3N2LmluaXQoKTtcbiAgJChcIiNleHBvcnQtY3N2XCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICBleHBvcnRUb0Nzdi5ydW4oY3N2UmVzdWx0cyk7XG4gIH0pO1xuXG4gIHZhciBlbGUgPSAkKFwiI2lucHV0cy1jb250ZW50XCIpO1xuICBpbnB1dEZvcm0uY3JlYXRlKGVsZSk7XG5cbiAgJChcIiNydW5idG4sICNydW5idG4tc21cIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICBydW5Nb2RlbCgpO1xuICB9KTtcblxuICAvLyBpbml0aWFsaXplIHRoZSBjaGFydHNcbiAgY2hhcnRzLmluaXQoKTtcblxuICAvLyBzZXQgZGVmYXVsdCBjb25maWdcbiAgJChcIiNpbnB1dC1tYW5hZ2UtZGF0ZVBsYW50ZWRcIikudmFsKG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5yZXBsYWNlKC9ULiovLCcnKSk7XG4gICQoXCIjaW5wdXQtbWFuYWdlLWRhdGVDb3BwaWNlZFwiKS52YWwobmV3IERhdGUobmV3IERhdGUoKS5nZXRUaW1lKCkrKDg2NDAwMDAwKjIqMzY1KSkudG9JU09TdHJpbmcoKS5yZXBsYWNlKC9ULiovLCcnKSk7XG4gICQoXCIjaW5wdXQtbWFuYWdlLWRhdGVGaW5hbEhhcnZlc3RcIikudmFsKG5ldyBEYXRlKG5ldyBEYXRlKCkuZ2V0VGltZSgpKyg4NjQwMDAwMCoxMCozNjUpKS50b0lTT1N0cmluZygpLnJlcGxhY2UoL1QuKi8sJycpKTtcblxuICAvLyBzZXR1cCBuaWNlIHNjcm9sbGluZ1xuICAkKCcuYXBwLW5hdicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcbiAgICAgICAgICBzY3JvbGxUb3A6ICQodGhpcy5oYXNoKS5vZmZzZXQoKS50b3AtNTVcbiAgICAgICB9LCA3MDApO1xuICB9KTtcblxuICAvLyBtYWtlIHN1cmUgZXZlcnl0aGluZyBmaXRzIHRvIHNjcmVlblxuICAkKHdpbmRvdykucmVzaXplKGZ1bmN0aW9uKCl7XG4gICAgICBjaGFydHMucmVzaXplKCk7XG5cbiAgICAgIGlmKCB3ZWF0aGVyQ3VzdG9tQ2hhcnQgKSB7XG4gICAgICAgICAgd2VhdGhlckN1c3RvbUNoYXJ0ID0gd2VhdGhlckNoYXJ0LmNyZWF0ZSgkKCcjY3VzdG9tLXdlYXRoZXItY2hhcnQnKVswXSwgbW9kZWwuY3VzdG9tX3dlYXRoZXIpO1xuICAgICAgfVxuICB9KTtcblxuICBjYWxsYmFjaygpO1xufTtcblxudmFyIGdldE1vZGVsID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBtb2RlbDtcbn07XG5cbnZhciBnZXRPdXRwdXRzID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBvdXRwdXRzO1xufTtcblxudmFyIHJ1bkNvbXBsZXRlID0gZnVuY3Rpb24ocm93cykge1xuICBpZiAoIHJ1bkNhbGxiYWNrICkgcnVuQ2FsbGJhY2socm93cyk7XG4gIGlmKCBoaWRlSW5pdExvYWRpbmcgKSBoaWRlSW5pdExvYWRpbmcoKTtcbiAgcnVuQ2FsbGJhY2sgPSBudWxsO1xufTtcbm1vZGVsSU8uZHVtcCA9IHJ1bkNvbXBsZXRlO1xuXG52YXIgbW9udGhzVG9SdW4gPSBmdW5jdGlvbigpIHtcbiAgdmFyIGQxID0gJChcIiNpbnB1dC1tYW5hZ2UtZGF0ZVBsYW50ZWRcIikudmFsKCk7XG4gIGlmIChkMSAmJiBkMSAhPT0gXCJcIikge1xuICAgICAgZDEgPSBuZXcgRGF0ZSgkKFwiI2lucHV0LW1hbmFnZS1kYXRlUGxhbnRlZFwiKS52YWwoKSk7XG4gIH0gZWxzZSB7XG4gICAgICBkMSA9IG5ldyBEYXRlKCk7XG4gIH1cblxuICB2YXIgZDIgPSAkKFwiI2lucHV0LW1hbmFnZS1kYXRlRmluYWxIYXJ2ZXN0XCIpLnZhbCgpO1xuICBpZiAoZDIgJiYgZDIgIT09IFwiXCIpIHtcbiAgICAgIGQyID0gbmV3IERhdGUoJChcIiNpbnB1dC1tYW5hZ2UtZGF0ZUZpbmFsSGFydmVzdFwiKS52YWwoKSk7XG4gIH0gZWxzZSB7XG4gICAgICBkMiA9IG5ldyBEYXRlKCk7XG4gIH1cblxuICB2YXIgbW9udGhzO1xuICBtb250aHMgPSAoZDIuZ2V0RnVsbFllYXIoKSAtIGQxLmdldEZ1bGxZZWFyKCkpICogMTI7XG4gIG1vbnRocyAtPSBkMS5nZXRNb250aCgpICsgMTtcbiAgbW9udGhzICs9IGQyLmdldE1vbnRoKCk7XG4gIHJldHVybiBtb250aHMgPD0gMCA/IDEgOiBtb250aHMrMTtcbn07XG5cblxudmFyIHJ1bk1vZGVsID0gZnVuY3Rpb24oaXNSdCkge1xuXG4gIGlmICgkKFwiI3J1bmJ0biwgI3J1bmJ0bi1zbVwiKS5oYXNDbGFzcyhcImRpc2FibGVkXCIpKSByZXR1cm47XG4gICQoXCIjcnVuYnRuLCAjcnVuYnRuLXNtXCIpLmFkZENsYXNzKFwiZGlzYWJsZWRcIikuaHRtbChcIlJ1bm5pbmcuLi5cIik7XG5cbiAgaWYoICF3ZWF0aGVyLmNoZWNrKG1vZGVsKSApIHJldHVybjtcblxuICAvLyBsZXQgVUkgcHJvY2VzcyBmb3IgYSBzZWMgYmVmb3JlIHdlIHRhbmsgaXRcbiAgLy8gVE9ETzogdGhpcyBzaG91bGQgYmUgcHJlZm9ybWVkIHcvIGEgd2Vid29ya2VyXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICBnYSgnc2VuZCcsICdldmVudCcsICd1aScsICdpbnRlcmFjdGlvbicsICdtb2RlbC1ydW4nLCAxKTtcblxuICAgICAgLy8gcmVhZCBldmVyeXRoaW5nIHNvIHRoZSB2YXJpYXRpb25zIGFyZSBzZXRcbiAgICAgIG1vZGVsLnZhcmlhdGlvbnMgPSB7fTtcbiAgICAgIG1vZGVsSU8ucmVhZEZyb21JbnB1dHMoKTtcblxuICAgICAgLy8gbWFrZSBzdXJlIHdlIGFyZSBvbmx5IHNldHRpbmcgMiB2YXJpYXRpb24gcGFyYW1ldGVyc1xuICAgICAgdmFyIHBhcmFtcyA9IFtdO1xuICAgICAgZm9yKCB2YXIga2V5IGluIG1vZGVsLnZhcmlhdGlvbnMgKSBwYXJhbXMucHVzaChrZXkpO1xuICAgICAgaWYoIHBhcmFtcy5sZW5ndGggPiAyICkge1xuICAgICAgICAgIGFsZXJ0KFwiVGhlcmUgaXMgYSBsaW1pdCBvZiAyIHZhcmlhdGlvbiBwYXJhbWV0ZXJzIHBlciBydW4uICBDdXJyZW50bHkgeW91IGFyZSB2YXJ5aW5nIFwiK1xuICAgICAgICAgICAgICAgIFwidGhlIGZvbGxvd2luZyBwYXJhbWV0ZXJzOlxcblxcbiAtXCIrcGFyYW1zLmpvaW4oXCJcXG4gLVwiKSk7XG4gICAgICAgICAgJChcIiNydW5idG4sICNydW5idG4tc21cIikucmVtb3ZlQ2xhc3MoXCJkaXNhYmxlZFwiKS5odG1sKFwiPGkgY2xhc3M9J2ljb24tcGxheSc+PC9pPiBSdW5cIik7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBsZXQgdGhlIHdvcmxkIGtub3cgd2hhdCB3ZSBhcmUgZG9pbmdcbiAgICAgIGlmKCAhaXNSdCApIGdkcml2ZS5ydW5Nb2RlbFJ0KCk7XG5cbiAgICAgIC8vIHNob3cgd2hhdCB3ZSBhcmUgZG9pbmdcbiAgICAgICQoXCIjdmFyaWF0aW9uQW5hbHlzaXNTdGF0dXNcIikuaHRtbChcIjxiPlwiKyhwYXJhbXMubGVuZ3RoID09IDAgPyBcIk5vbmVcIiA6IHBhcmFtcy5qb2luKFwiLCBcIikpK1wiPC9iPlwiKTtcblxuICAgICAgLy8gd2UgYXJlIG9ubHkgcnVubmluZyBvbmNlXG4gICAgICBpZiAoIHBhcmFtcy5sZW5ndGggPT09IDAgKSB7XG4gICAgICAgICAgZ2EoJ3NlbmQnLCAnZXZlbnQnLCAndWknLCAnaW50ZXJhY3Rpb24nLCAnbW9kZWwtcnVuLXNpbmdsZVBhcmFtJywgMSk7XG5cbiAgICAgICAgICBydW5DYWxsYmFjayA9IGZ1bmN0aW9uKHJvd3MpIHtcbiAgICAgICAgICAgICAgc2hvd1Jlc3VsdHMocm93cyk7XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIG1vZGVsLmRhaWx5U3RlcCA9IGNvbmZpZy5kYWlseTtcbiAgICAgICAgICB2YXIgbW9udGhzID0gbW9udGhzVG9SdW4oKTtcbiAgICAgICAgICBpZiggY29uZmlnLmRhaWx5ICkgbW9udGhzID0gbW9udGhzICogMzA7XG5cbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgbW9kZWwucnVuKG1vbnRocyk7XG4gICAgICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgICAgICBkZWJ1Z2dlcjtcbiAgICAgICAgICAgIGFsZXJ0KGUpO1xuICAgICAgICAgIH1cblxuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgIGdhKCdzZW5kJywgJ2V2ZW50JywgJ3VpJywgJ2ludGVyYWN0aW9uJywgJ21vZGVsLXJ1bi12YXJpYXRpb24nLCAxKTtcblxuICAgICAgICAgIC8vIHNldCB2YXJpYXRpb24gb3JkZXJcbiAgICAgICAgICB2YXIgcnVucyA9IFtdO1xuICAgICAgICAgIGZvciggdmFyIGkgPSAwOyBpIDwgbW9kZWwudmFyaWF0aW9uc1twYXJhbXNbMF1dLmxlbmd0aDsgaSsrICkge1xuICAgICAgICAgICAgICB2YXIgb2JqID0ge1xuICAgICAgICAgICAgICAgICAgaW5wdXRzIDoge30sXG4gICAgICAgICAgICAgICAgICBvdXRwdXQgOiBudWxsXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIG9iai5pbnB1dHNbcGFyYW1zWzBdXSA9IG1vZGVsLnZhcmlhdGlvbnNbcGFyYW1zWzBdXVtpXTtcbiAgICAgICAgICAgICAgaWYoIHBhcmFtcy5sZW5ndGggPiAxICkge1xuICAgICAgICAgICAgICAgICAgZm9yKCB2YXIgaiA9IDA7IGogPCBtb2RlbC52YXJpYXRpb25zW3BhcmFtc1sxXV0ubGVuZ3RoOyBqKysgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgdmFyIHQgPSAkLmV4dGVuZCh0cnVlLCB7fSwgb2JqKTtcbiAgICAgICAgICAgICAgICAgICAgICB0LmlucHV0c1twYXJhbXNbMV1dID0gbW9kZWwudmFyaWF0aW9uc1twYXJhbXNbMV1dW2pdO1xuICAgICAgICAgICAgICAgICAgICAgIHJ1bnMucHVzaCh0KTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHJ1bnMucHVzaChvYmopO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcnVuVmFyaWF0aW9uKDAsIHJ1bnMpO1xuICAgICAgfVxuICB9LCAyNTApO1xufTtcblxuLy8gcnVuIGEgc2luZ2xlIHZhcmlhdGlvbiwgd2hlbiBtdWx0aXBsZSBpbnB1dHMgZm9yIGEgc2luZ2xlIHBhcmFtZXRlciBoYXZlXG4vLyBiZWVuIGdpdmVuXG52YXIgcnVuVmFyaWF0aW9uID0gZnVuY3Rpb24oaW5kZXgsIHJ1bnMpIHtcbiAgLy8gc2V0IGlucHV0IHZhcmlhYmxlcyBmb3IgcnVuXG4gIHZhciBydW4gPSBydW5zW2luZGV4XTtcbiAgZm9yKCB2YXIga2V5IGluIHJ1bi5pbnB1dHMgKSB7XG4gICAgICAkKFwiI2lucHV0LVwiK2tleS5yZXBsYWNlKC9cXC4vZywgJy0nKSkudmFsKHJ1bi5pbnB1dHNba2V5XSk7XG4gIH1cblxuICBydW5DYWxsYmFjayA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgIHJ1bnNbaW5kZXhdLm91dHB1dCA9IGRhdGE7XG4gICAgICBpbmRleCsrO1xuXG5cbiAgICAgIGlmIChydW5zLmxlbmd0aCA9PSBpbmRleCkge1xuICAgICAgICAgIC8vIHJlc2V0IHRoZSBjb25zdGFudCB0byB0aGUgZmlyc3QgdmFsdWVcbiAgICAgICAgICBmb3IoIHZhciBrZXkgaW4gbW9kZWwudmFyaWF0aW9ucyApIHtcbiAgICAgICAgICAgICAgJChcIiNpbnB1dC1cIitrZXkucmVwbGFjZSgvXFwuL2csICctJykpLnZhbChtb2RlbC52YXJpYXRpb25zW2tleV0uam9pbihcIiwgXCIpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgc2hvd1Jlc3VsdHMocnVucyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJ1blZhcmlhdGlvbihpbmRleCwgcnVucyk7XG4gICAgICB9XG4gIH07XG5cbiAgdmFyIG1vbnRocyA9IG1vbnRoc1RvUnVuKCk7XG4gIGlmKCBjb25maWcuZGFpbHkgKSBtb250aHMgPSBtb250aHMgKiAzMDtcblxuICB0cnkge1xuICAgIG1vZGVsLnJ1bihtb250aHMpO1xuICB9IGNhdGNoKGUpIHtcbiAgICBkZWJ1Z2dlcjtcbiAgICBhbGVydChlKTtcbiAgfVxufTtcblxuXG52YXIgc2hvd1Jlc3VsdHMgPSBmdW5jdGlvbihyZXN1bHQpIHtcbiAgdmFyIGN1cnJlbnRSZXN1bHRzO1xuICBpZiggcmVzdWx0WzBdIGluc3RhbmNlb2YgQXJyYXkgKSB7XG4gICAgICBjdXJyZW50UmVzdWx0cyA9IFt7XG4gICAgICAgICAgc2luZ2xlUnVuIDogdHJ1ZSxcbiAgICAgICAgICBpbnB1dHMgOiB7fSxcbiAgICAgICAgICBvdXRwdXQgOiByZXN1bHRcbiAgICAgIH1dO1xuICB9IGVsc2Uge1xuICAgIGN1cnJlbnRSZXN1bHRzID0gcmVzdWx0O1xuICB9XG5cblxuICByYXdPdXRwdXQuc2hvdyhjdXJyZW50UmVzdWx0cyk7XG4gIGNoYXJ0cy51cGRhdGVDaGFydHMoY3VycmVudFJlc3VsdHMsIHRydWUpO1xuXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAkKFwiI3J1bmJ0biwgI3J1bmJ0bi1zbVwiKS5yZW1vdmVDbGFzcyhcImRpc2FibGVkXCIpLmh0bWwoXCI8aSBjbGFzcz0naWNvbi1wbGF5Jz48L2k+IFJ1blwiKTtcbiAgfSwgMjUwKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBpbml0IDogaW5pdCxcbiAgZ29vZ2xlRHJpdmUgOiBnZHJpdmUsXG4gIGdldE1vZGVsIDogZ2V0TW9kZWwsXG4gIHJ1bk1vZGVsIDogcnVuTW9kZWwsXG4gIG1vbnRoc1RvUnVuIDogbW9udGhzVG9SdW4sXG4gIC8vIHRoZSByYXcgbW9kdWxlIGFjdHVhbGx5IGNyZWF0ZXMgdGhpcyBzZXR1cFxuICBzZXRDc3ZSZXN1bHRzIDogZnVuY3Rpb24oY3N2KSB7XG4gICAgY3N2UmVzdWx0cyA9IGNzdjtcbiAgfSxcbiAgcXMgOiB1dGlscy5xcyxcbiAgZ2V0TW9kZWxJTyA6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBtb2RlbElPO1xuICB9XG59O1xuIiwidmFyIG91dHB1dERlZmluaXRpb25zID0gcmVxdWlyZSgnLi9vdXRwdXQvZGVmaW5pdGlvbnMnKTtcbnZhciByYXcgPSByZXF1aXJlKCcuL291dHB1dC9yYXcnKTtcbnZhciBjb25maWcgPSByZXF1aXJlKCcuL2NvbmZpZycpO1xudmFyIGFwcDtcblxuLy8gb25seSBkcmF3IGNoYXJ0cyBpZiB3aWR0aCBoYXMgY2hhbmdlZFxudmFyIGNXaWR0aCA9IDA7XG5cbi8vIHRoZXJlIGlzIG5vIHdheSB0byBnZXQgdGhlIGNvbG9ycyBmb3IgdGhlIGxlZ2VuZHMgKHRvIG1ha2UgeW91ciBvd24pXG4vLyB0aGlzIHBvc3Q6XG4vLyBnaXZlcyB0aGVzZSB2YWx1ZXMuICBUaGlzIGlzIGEgSEFDSywgaWYgdGhleSBldmVyIGNoYW5nZSwgd2UgbmVlZCB0byB1cGRhdGVcbnZhciBnb29nbGVDaGFydENvbG9ycyA9IFtcIiMzMzY2Y2NcIixcIiNkYzM5MTJcIixcIiNmZjk5MDBcIixcIiMxMDk2MThcIixcIiM5OTAwOTlcIixcIiMwMDk5YzZcIixcbiAgICAgICAgICAgICAgICAgICAgICBcIiNkZDQ0NzdcIixcIiM2NmFhMDBcIixcIiNiODJlMmVcIixcIiMzMTYzOTVcIixcIiM5OTQ0OTlcIixcIiMyMmFhOTlcIixcbiAgICAgICAgICAgICAgICAgICAgICBcIiNhYWFhMTFcIixcIiM2NjMzY2NcIixcIiNlNjczMDBcIixcIiM4YjA3MDdcIixcIiM2NTEwNjdcIixcIiMzMjkyNjJcIixcbiAgICAgICAgICAgICAgICAgICAgICBcIiM1NTc0YTZcIixcIiMzYjNlYWNcIixcIiNiNzczMjJcIixcIiMxNmQ2MjBcIixcIiNiOTEzODNcIixcIiNmNDM1OWVcIixcbiAgICAgICAgICAgICAgICAgICAgICBcIiM5YzU5MzVcIixcIiNhOWM0MTNcIixcIiMyYTc3OGRcIixcIiM2NjhkMWNcIixcIiNiZWE0MTNcIixcIiMwYzU5MjJcIlxuICAgICAgICAgICAgICAgICAgICAgICxcIiM3NDM0MTFcIl07XG5cbi8vIHRlbXBsYXRlIGZvciB0aGUgcG9wdXBcbnZhciBzbGlkZXJQb3B1cCA9ICQoXG4gICAgICBcIjxkaXYgY2xhc3M9J3NsaWRlLXBvcHVwJz5cIiArXG4gICAgICAgICAgXCI8aSBjbGFzcz0naWNvbi1yZW1vdmUtY2lyY2xlIHB1bGwtcmlnaHQgc2xpZGUtcG9wdXAtY2xvc2UnPjwvaT5cIitcbiAgICAgICAgICBcIjxkaXYgaWQ9J2Nhcm91c2VsJyBjbGFzcz0nb3dsLWNhcm91c2VsIG93bC10aGVtZScgc3R5bGU9J21hcmdpbi10b3A6MTVweCc+PC9kaXY+XCIgK1xuXHRcIjwvZGl2PlwiKTtcblxudmFyIHNsaWRlclBvcHVwQmcgPSAkKFwiPGRpdiBjbGFzcz0nc2xpZGUtcG9wdXAtYmcnPiZuYnNwOzwvZGl2PlwiKTtcblxuLy8gb25seSBkcmF3IGNoYXJ0cyBpZiBzb21lb25lIGhhcyBjbGljayBhIGNoZWNrYm94XG52YXIgY2hhbmdlcyA9IGZhbHNlO1xuXG4vLyB3aGVuIHNpemluZywgd2FpdCBhIH4zMDBtcyBiZWZvcmUgdHJpZ2dlcmluZyByZWRyYXdcbnZhciByZXNpemVUaW1lciA9IC0xO1xuXG52YXIgY2hhcnRUeXBlU2VsZWN0b3IsIGNoYXJ0Q2hlY2tib3hlcywgY0RhdGE7XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG5cbiAgJChcIiNzaG93LWNoYXJ0c3BvcHVwLWJ0blwiKS5vbignY2xpY2snLGZ1bmN0aW9uKCkge1xuICAgICAgc2hvd1BvcHVwKCk7XG4gIH0pO1xuXG4gIC8vIHNldHVwIGNoYXJ0IHNlbGVjdG9yc1xuICAkKFwiI2NoYXJ0LW1vZGFsXCIpLm1vZGFsKHtzaG93OmZhbHNlfSk7XG5cbiAgLy8gc2V0IHBvcHVwIGNsaWNrIGhhbmRsZXJzXG4gICQoXCIjY2hhcnRUeXBlLXNlbGVjdEFsbFwiKS5vbignY2xpY2snLHNlbGVjdEFsbCk7XG4gICQoXCIjY2hhcnRUeXBlLXVuc2VsZWN0QWxsXCIpLm9uKCdjbGljaycsdW5zZWxlY3RBbGwpO1xuXG4gIGNoYXJ0VHlwZVNlbGVjdG9yID0gJChcIiNjaGFydFR5cGVJbnB1dFwiKTtcbiAgY2hhcnRDaGVja2JveGVzID0gJChcIiNjaGFydFNlbGVjdGlvbnNcIik7XG5cbiAgdmFyIGMxID0gJChcIiNjaGFydFNlbGVjdGlvbnMtYzFcIik7XG4gIHZhciBjMiA9ICQoXCIjY2hhcnRTZWxlY3Rpb25zLWMyXCIpO1xuICBmb3IoIHZhciBpID0gMDsgaSA8IGNvbmZpZy5vdXRwdXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgdmFsID0gY29uZmlnLm91dHB1dHNbaV07XG4gICAgICBjaGFydFR5cGVTZWxlY3Rvci5hcHBlbmQoJChcIjxvcHRpb24gdmFsdWU9J1wiICsgdmFsICsgXCInIFwiXG4gICAgICAgICAgICAgICsgKHZhbCA9PSAnV1InIHx8IHZhbCA9PSAnV1MnIHx8IHZhbCA9PSAnV0YnID8gJ3NlbGVjdGVkJyA6ICcnKVxuICAgICAgICAgICAgICArIFwiPlwiICsgdmFsICsgXCI8L29wdGlvbj5cIikpO1xuXG4gICAgICBpZiggaSAlIDIgPT0gMCApIHtcbiAgICAgICAgICBjMS5hcHBlbmQoJCgnPGRpdiBjbGFzcz1cImNoZWNrYm94XCI+PGxhYmVsPjxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIidcbiAgICAgICAgICAgICAgICAgICsgKHZhbCA9PSAnV1InIHx8IHZhbCA9PSAnV1MnIHx8IHZhbCA9PSAnV0YnID8gJ2NoZWNrZWQ9XCJjaGVja2VkXCInIDogJycpXG4gICAgICAgICAgICAgICAgICArICcgdmFsdWU9XCInK3ZhbCsnXCI+ICcrX2NyZWF0ZURlc2NyaXB0aW9uKHZhbCkrJzwvZGl2PicpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYzIuYXBwZW5kKCQoJzxkaXYgY2xhc3M9XCJjaGVja2JveFwiPjxsYWJlbD48aW5wdXQgdHlwZT1cImNoZWNrYm94XCInXG4gICAgICAgICAgICAgICAgICArICh2YWwgPT0gJ1dSJyB8fCB2YWwgPT0gJ1dTJyB8fCB2YWwgPT0gJ1dGJyA/ICdjaGVja2VkPVwiY2hlY2tlZFwiJyA6ICcnKVxuICAgICAgICAgICAgICAgICAgKyAnIHZhbHVlPVwiJyt2YWwrJ1wiPiAnK19jcmVhdGVEZXNjcmlwdGlvbih2YWwpKyc8L2Rpdj4nKSk7XG4gICAgICB9XG4gIH1cblxuICBjaGFydENoZWNrYm94ZXMuZmluZChcIi5mbi10b2dnbGVcIikub24oJ2NsaWNrJyxmdW5jdGlvbigpe1xuICAgICAgJChcIiNcIiskKHRoaXMpLmF0dHIoXCJkYXRhdGFyZ2V0XCIpKS50b2dnbGUoJ3Nsb3cnKTtcbiAgfSk7XG5cbiAgY2hhcnRDaGVja2JveGVzLmZpbmQoXCJpbnB1dFt0eXBlPWNoZWNrYm94XVwiKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgIGlmKCAkKHRoaXMpLmlzKFwiOmNoZWNrZWRcIikgKSBzZWxlY3QoJCh0aGlzKS5hdHRyKFwidmFsdWVcIikpO1xuICAgICAgZWxzZSB1bnNlbGVjdCgkKHRoaXMpLmF0dHIoXCJ2YWx1ZVwiKSk7XG4gIH0pO1xuXG4gICQoXCIjc2VsZWN0LWNoYXJ0cy1idG4sICNzZWxlY3QtY2hhcnRzLXRpdGxlLWJ0blwiKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgJChcIiNjaGFydC1tb2RhbFwiKS5tb2RhbCgnc2hvdycpO1xuICAgICAgY2hhbmdlcyA9IGZhbHNlO1xuICB9KTtcblxuICAkKFwiLmNoYXJ0LW1vZGFsLWNsb3NlXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAkKFwiI2NoYXJ0LW1vZGFsXCIpLm1vZGFsKCdoaWRlJyk7XG4gICAgICBpZiggY2hhbmdlcyAmJiBjRGF0YSApIHtcbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgIHVwZGF0ZUNoYXJ0cygpO1xuICAgICAgICAgICAgICAvLyB1cGRhdGUgcmF3IGRhdGEgYXMgd2VsbFxuICAgICAgICAgICAgICByYXcuc2hvdyhjRGF0YSk7XG4gICAgICAgICAgfSw0MDApO1xuXG4gICAgICB9XG4gIH0pO1xuXG4gICQoXCIuY2hhcnQtdHlwZS10b2dnbGVcIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgIGlmKCAhJCh0aGlzKS5oYXNDbGFzcyhcImFjdGl2ZVwiKSApIHtcbiAgICAgICAgICAkKFwiLmNoYXJ0LXR5cGUtdG9nZ2xlLmFjdGl2ZVwiKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcbiAgICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKFwiYWN0aXZlXCIpO1xuICAgICAgICAgIHVwZGF0ZUNoYXJ0cygpO1xuICAgICAgfVxuICB9KTtcbn1cblxuLy8gbWFrZSBzdXJlIGFuZCBlbmQgbGFiZWwgdGFnXG5mdW5jdGlvbiBfY3JlYXRlRGVzY3JpcHRpb24odmFsKSB7XG4gIGlmKCAhb3V0cHV0RGVmaW5pdGlvbnNbdmFsXSApIHJldHVybiBcIjxiPlwiK3ZhbCtcIjwvYj48L2xhYmVsPlwiO1xuXG4gIHZhciBkZXNjID0gb3V0cHV0RGVmaW5pdGlvbnNbdmFsXTtcbiAgdmFyIGxhYmVsID0gZGVzYy5sYWJlbCAmJiBkZXNjLmxhYmVsLmxlbmd0aCA+IDAgPyBcIiAtIFwiK2Rlc2MubGFiZWwgOiBcIlwiO1xuICB2YXIgdW5pdHMgPSBkZXNjLnVuaXRzICYmIGRlc2MudW5pdHMubGVuZ3RoID4gMCA/IFwiIFtcIitkZXNjLnVuaXRzK1wiXVwiIDogXCJcIjtcblxuICB2YXIgbGFiZWwgPSBcIjxiPlwiK3ZhbCtcIjwvYj48c3BhbiBzdHlsZT0nZm9udC1zaXplOjEycHgnPlwiK2xhYmVsK3VuaXRzK1wiPC9zcGFuPjwvbGFiZWw+XCI7XG4gIHZhciBoYXNEZXNjID0gZGVzYy5kZXNjcmlwdGlvbiAmJiBkZXNjLmRlc2NyaXB0aW9uLmxlbmd0aCA+IDA7XG4gIGlmKCBoYXNEZXNjICkge1xuICAgICAgbGFiZWwgKz0gXCI8ZGl2IHN0eWxlPSdmb250LXNpemU6MTFweDtjb2xvcjojODg4O2ZvbnQtc3R5bGU6aXRhbGljJz5cIitkZXNjLmRlc2NyaXB0aW9uO1xuICB9XG5cbiAgdmFyIGZOYW1lID0gZGVzYy5hbHRGbk5hbWUgfHwgdmFsO1xuICB2YXIgZm4gPSBhcHAuZ2V0TW9kZWwoKS5nZXRGdW5jdGlvbihmTmFtZSk7XG5cbiAgaWYoIGZuIHx8IGRlc2MuZm4gKSB7XG4gICAgICBpZiggIWhhc0Rlc2MgKSBsYWJlbCArPSBcIjxkaXYgc3R5bGU9J2ZvbnQtc2l6ZToxMXB4Jz5cIjtcbiAgICAgIGxhYmVsICs9IFwiIDxhIHN0eWxlPSdmb250LXN0eWxlOm5vcm1hbDtjdXJzb3I6cG9pbnRlcicgZGF0YXRhcmdldD0nZm4tZGVzYy1cIit2YWwrXCInIGNsYXNzPSdmbi10b2dnbGUnPmZuKCk8L2E+PC9kaXY+XCI7XG5cbiAgICAgIGxhYmVsICs9IFwiPGRpdiBpZD0nZm4tZGVzYy1cIit2YWwrXCInIHN0eWxlPSdkaXNwbGF5Om5vbmU7Zm9udC1zaXplOjExcHg7b3ZlcmZsb3c6YXV0bycgY2xhc3M9J3dlbGwgd2VsbC1zbSc+XCIrXG4gICAgICAgICAgICAgICAgICAoZm58fGRlc2MuZm4pLnRvU3RyaW5nKCkucmVwbGFjZSgvIC9nLCcmbmJzcDsnKS5yZXBsYWNlKC9cXG4vZywnPGJyIC8+JykrXCI8L2Rpdj5cIjtcbiAgfSBlbHNlIGlmICggaGFzRGVzYyApIHtcbiAgICAgIGxhYmVsICs9IFwiPC9kaXY+XCI7XG4gIH1cblxuICAvLyBUT0RPOiBhZGQgZm4gd2VsbFxuICByZXR1cm4gbGFiZWwrXCI8YnIgLz5cIjtcbn1cblxuZnVuY3Rpb24gc2VsZWN0KHZhbCkge1xuICBjaGFydFR5cGVTZWxlY3Rvci5maW5kKFwib3B0aW9uW3ZhbHVlPVwiK3ZhbCtcIl1cIikuYXR0cihcInNlbGVjdGVkXCIsXCJzZWxlY3RlZFwiKTtcbiAgY2hhcnRDaGVja2JveGVzLmZpbmQoXCJpbnB1dFt2YWx1ZT1cIit2YWwrXCJdXCIpLnByb3AoXCJjaGVja2VkXCIsdHJ1ZSk7XG4gIGNoYW5nZXMgPSB0cnVlO1xufVxuXG5mdW5jdGlvbiB1bnNlbGVjdCh2YWwpIHtcbiAgY2hhcnRUeXBlU2VsZWN0b3IuZmluZChcIm9wdGlvblt2YWx1ZT1cIit2YWwrXCJdXCIpLnJlbW92ZUF0dHIoXCJzZWxlY3RlZFwiKTtcbiAgY2hhcnRDaGVja2JveGVzLmZpbmQoXCJpbnB1dFt2YWx1ZT1cIit2YWwrXCJdXCIpLnByb3AoXCJjaGVja2VkXCIsZmFsc2UpO1xuICBjaGFuZ2VzID0gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gc2VsZWN0QWxsKCkge1xuICBmb3IoIHZhciBpID0gMDsgaSA8IGNvbmZpZy5vdXRwdXRzLmxlbmd0aDsgaSsrKSBzZWxlY3QoY29uZmlnLm91dHB1dHNbaV0pO1xufVxuXG5mdW5jdGlvbiB1bnNlbGVjdEFsbCgpIHtcbiAgZm9yKCB2YXIgaSA9IDA7IGkgPCBjb25maWcub3V0cHV0cy5sZW5ndGg7IGkrKykgdW5zZWxlY3QoY29uZmlnLm91dHB1dHNbaV0pO1xufVxuXG5mdW5jdGlvbiByZW1vdmUoZWxlKSB7XG4gIGVsZS5wYXJlbnQoKS5oaWRlKCdzbG93JywgZnVuY3Rpb24oKXtcbiAgICAgIGVsZS5wYXJlbnQoKS5yZW1vdmUoKTtcbiAgICAgIHVuc2VsZWN0KGVsZS5hdHRyKCd0eXBlJykpO1xuICB9KTtcblxufVxuXG5mdW5jdGlvbiBwcmludChjaGFydENvbnRhaW5lcikge1xuICBnYSgnc2VuZCcsICdldmVudCcsICd1aScsICdpbnRlcmFjdGlvbicsICdwcmludC1jaGFydCcsIDEpO1xuXG5cbnZhciBkaXNwX3NldHRpbmc9XCJ0b29sYmFyPXllcyxsb2NhdGlvbj1ubyxkaXJlY3Rvcmllcz15ZXMsbWVudWJhcj15ZXMsXCI7XG4gIGRpc3Bfc2V0dGluZys9XCJzY3JvbGxiYXJzPXllcyx3aWR0aD04MDAsIGhlaWdodD02MDAsIGxlZnQ9MjUsIHRvcD0yNVwiO1xuXG4gIHZhciBzdmcgPSBjaGFydENvbnRhaW5lci5maW5kKFwic3ZnXCIpO1xuICB2YXIgaHRtbCA9IGNoYXJ0Q29udGFpbmVyLmZpbmQoXCJkaXZcIikuaHRtbCgpO1xuXG4gIHZhciBkb2NwcmludD13aW5kb3cub3BlbihcIlwiLFwiXCIsZGlzcF9zZXR0aW5nKTtcbiAgZG9jcHJpbnQuZG9jdW1lbnQub3BlbigpO1xuICBkb2NwcmludC5kb2N1bWVudC53cml0ZSgnPGh0bWw+PGhlYWQ+PHRpdGxlPjwvdGl0bGU+Jyk7XG4gIGRvY3ByaW50LmRvY3VtZW50LndyaXRlKCc8L2hlYWQ+PGJvZHkgbWFyZ2lud2lkdGg9XCIwXCIgbWFyZ2luaGVpZ2h0PVwiMFwiIG9uTG9hZD1cInNlbGYucHJpbnQoKVwiPjxjZW50ZXI+Jyk7XG4gIGRvY3ByaW50LmRvY3VtZW50LndyaXRlKGh0bWwpO1xuICBkb2NwcmludC5kb2N1bWVudC53cml0ZSgnPC9jZW50ZXI+PC9ib2R5PjwvaHRtbD4nKTtcbiAgZG9jcHJpbnQuZG9jdW1lbnQuY2xvc2UoKTtcbiAgZG9jcHJpbnQuZm9jdXMoKTtcblxufVxuXG5cbmZ1bmN0aW9uIHNldERhdGEoZGF0YSkge1xuICBjRGF0YSA9IGRhdGE7XG59XG5cbi8vIGJhc2ljYWxseSByZWRyYXcgZXZlcnl0aGluZ1xuZnVuY3Rpb24gcmVzaXplKCkge1xuICAvLyByZXF1aXJlIG1vcmUgdGhhbiBhIDMwIHBpeGVsIHdpZHRoIGNoYW5nZSAoc28gd2UgZG9uJ3QgcmVkcmF3IHcvIHNjcm9sbCBiYXJzIGFkZGVkKVxuICB2YXIgd2luV2lkdGggPSAkKHdpbmRvdykud2lkdGgoKTtcbiAgaWYoIGNXaWR0aCA+IHdpbldpZHRoIC0gMTUgJiYgY1dpZHRoIDwgd2luV2lkdGggKyAxNSApIHJldHVybjtcbiAgY1dpZHRoID0gd2luV2lkdGg7XG5cbiAgaWYoIHJlc2l6ZVRpbWVyICE9IC0xICkgY2xlYXJUaW1lb3V0KHJlc2l6ZVRpbWVyKTtcbiAgcmVzaXplVGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgcmVzaXplVGltZXIgPSAtMTtcbiAgICAgIHVwZGF0ZUNoYXJ0cygpO1xuICB9LDMwMCk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUNoYXJ0cyhyZXN1bHRzLCBhbmltYXRlKSB7XG4gIGlmKCByZXN1bHRzICkgc2V0RGF0YShyZXN1bHRzKTtcbiAgaWYoICFjRGF0YSApIHJldHVybjtcblxuICAkKFwiI3Nob3ctY2hhcnRzcG9wdXAtYnRuXCIpLnNob3coKTtcblxuICAvLyBjcmVhdGUgYSBsZWdlbmQgaWYgdGhlcmUgaXMgbW9yZSB0aGFuIG9uZSBydW5cbiAgdmFyIGxlZ2VuZCA9IFwiXCI7XG4gIGlmKCAhY0RhdGFbMF0uc2luZ2xlUnVuICkge1xuICAgICAgdmFyIGMxID0gXCJcIjtcbiAgICAgIHZhciBjMiA9IFwiXCI7XG4gICAgICBmb3IoIHZhciBpID0gMDsgaSA8IGNEYXRhLmxlbmd0aDsgaSsrICkge1xuICAgICAgICAgIHZhciBlbGUgPSBcIjxkaXYgc3R5bGU9J21pbi1oZWlnaHQ6NDBweDttYXJnaW4tYm90dG9tOjEwcHgnPjxkaXYgY2xhc3M9J2xlZ2VuZC1zcXVhcmUnIHN0eWxlPSdiYWNrZ3JvdW5kLWNvbG9yOlwiK2dvb2dsZUNoYXJ0Q29sb3JzW2ldK1wiJz4mbmJzcDs8L2Rpdj5cIjtcbiAgICAgICAgICBmb3IoIHZhciBtVHlwZSBpbiBjRGF0YVtpXS5pbnB1dHMgKSB7XG4gICAgICAgICAgICAgIGVsZSArPSBcIjxkaXYgY2xhc3M9J2xlZ2VuZC10ZXh0Jz5cIittVHlwZStcIj1cIitjRGF0YVtpXS5pbnB1dHNbbVR5cGVdK1wiPC9kaXY+XCI7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYoIGkgJSAyID09IDAgKSBjMSArPSBlbGUgKyBcIjwvZGl2PlwiXG4gICAgICAgICAgZWxzZSBjMiArPSBlbGUgKyBcIjwvZGl2PlwiXG4gICAgICB9XG4gICAgICBsZWdlbmQgPSBcIjxkaXY+PGEgaWQ9J2xlZ2VuZC1wYW5lbC10b2dnbGUnIHN0eWxlPSdtYXJnaW4tbGVmdDo1cHg7Y3Vyc29yOnBvaW50ZXInPkxlZ2VuZDwvYT48L2Rpdj5cIitcbiAgICAgICAgICAgICAgIFwiPGRpdiBzdHlsZT0nYm9yZGVyLWJvdHRvbToxcHggc29saWQgI2VlZTtwYWRkaW5nLWJvdHRvbTo1cHg7bWFyZ2luLWJvdHRvbToxNXB4Jz5cIitcbiAgICAgICAgICAgICAgIFwiPGRpdiBjbGFzcz0ncm93JyBpZD0nbGVnZW5kLXBhbmVsJz48ZGl2IGNsYXNzPSdjb2wtc20tNic+XCIrYzErXCI8L2Rpdj5cIitcbiAgICAgICAgICAgICAgIFwiPGRpdiBjbGFzcz0nY29sLXNtLTYnPlwiK2MyK1wiPC9kaXY+XCIrXG4gICAgICAgICAgICAgICBcIjwvZGl2PjwvZGl2PlwiO1xuICB9XG4gICQoXCIjY2hhcnQtY29udGVudFwiKS5odG1sKGxlZ2VuZCk7XG4gICQoXCIjbGVnZW5kLXBhbmVsLXRvZ2dsZVwiKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgJChcIiNsZWdlbmQtcGFuZWxcIikudG9nZ2xlKFwic2xvd1wiKTtcbiAgfSk7XG5cblxuICB2YXIgdHlwZXMgPSBjaGFydFR5cGVTZWxlY3Rvci52YWwoKTtcbiAgZm9yICggdmFyIGkgPSAwOyBpIDwgdHlwZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIF9zaG93TWFpbkNoYXJ0KHR5cGVzW2ldLCBhbmltYXRlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBzaG93UG9wdXAoKSB7XG4gIGdhKCdzZW5kJywgJ2V2ZW50JywgJ3VpJywgJ2ludGVyYWN0aW9uJywgJ3Nob3ctY2hhcnQtcG9wdXAnLCAxKTtcblxuXG4gIHNsaWRlclBvcHVwLmZpbmQoXCIub3dsLXRoZW1lXCIpLmh0bWwoXCJcIik7XG4gICQoJ2JvZHknKS5zY3JvbGxUb3AoMCkuY3NzKCdvdmVyZmxvdycsJ2hpZGRlbicpLmFwcGVuZChzbGlkZXJQb3B1cEJnKS5hcHBlbmQoc2xpZGVyUG9wdXApO1xuXG4gIC8vIHRoaXMgY291bGQgY2FzZSBiYWRuZXNzLi4uLiAgd2h5IGRvZXNuJ3QgaXQgbGl2ZSB3aGVuIHJlbW92ZWQgZnJvbSBET00/XG4gIHNsaWRlclBvcHVwLmZpbmQoJy5zbGlkZS1wb3B1cC1jbG9zZScpLm9uKCdjbGljaycsZnVuY3Rpb24oKXtcbiAgICAgIGhpZGVQb3B1cCgpO1xuICB9KTtcblxuICB2YXIgdHlwZXMgPSBjaGFydFR5cGVTZWxlY3Rvci52YWwoKTtcbiAgZm9yICggdmFyIGkgPSAwOyBpIDwgdHlwZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIF9zaG93UG9wdXBDaGFydCh0eXBlc1tpXSk7XG4gIH1cblxuICAkKCcjY2Fyb3VzZWwnKS5vd2xDYXJvdXNlbCh7XG4gICAgICBuYXZpZ2F0aW9uIDogdHJ1ZSwgLy8gU2hvdyBuZXh0IGFuZCBwcmV2IGJ1dHRvbnNcbiAgICAgIHNsaWRlU3BlZWQgOiAzMDAsXG4gICAgICBwYWdpbmF0aW9uU3BlZWQgOiA0MDAsXG4gICAgICBzaW5nbGVJdGVtOnRydWVcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGhpZGVQb3B1cCgpIHtcbiAgc2xpZGVyUG9wdXBCZy5yZW1vdmUoKTtcbiAgc2xpZGVyUG9wdXAucmVtb3ZlKCk7XG4gICQoJ2JvZHknKS5jc3MoJ292ZXJmbG93JywnYXV0bycpO1xufVxuXG5mdW5jdGlvbiBfc2hvd01haW5DaGFydCh0eXBlLCBhbmltYXRlKSB7XG4gIHZhciBjaGFydFR5cGUgPSAkKFwiLmNoYXJ0LXR5cGUtdG9nZ2xlLmFjdGl2ZVwiKS5hdHRyKFwidmFsdWVcIik7XG4gIHZhciBwYW5lbCA9ICQoXCI8ZGl2IC8+XCIpO1xuICB2YXIgb3V0ZXJQYW5lbCA9ICQoXCI8ZGl2PlwiK1xuICBcdFwiPGEgY2xhc3M9J2J0biBidG4teHMgYnRuLWRlZmF1bHQnIHN0eWxlPSdcIisoY2hhcnRUeXBlICE9IFwidGltZWxpbmVcIiA/IFwicG9zaXRpb246YWJzb2x1dGU7ei1pbmRleDoxMDttYXJnaW46MCAwIC0yMHB4IDIwcHhcIiA6IFwibWFyZ2luLWJvdHRvbTo1cHhcIikrXG4gICAgICBcIicgdHlwZT0nXCIrdHlwZStcIic+XCIgK1xuICBcdFwiPGkgY2xhc3M9J2ljb24tcmVtb3ZlJz48L2k+IFwiK3R5cGUrXCI8L2E+PC9kaXY+XCIpO1xuICBvdXRlclBhbmVsLmZpbmQoXCJhXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgcmVtb3ZlKCQodGhpcykpO1xuICB9KTtcbiAgaWYoIGNoYXJ0VHlwZSA9PSBcInRpbWVsaW5lXCIgKSBvdXRlclBhbmVsLmNzcyhcIm1hcmdpbi1ib3R0b21cIixcIjIwcHhcIik7XG4gICQoXCIjY2hhcnQtY29udGVudFwiKS5hcHBlbmQob3V0ZXJQYW5lbC5hcHBlbmQocGFuZWwpKTtcbiAgX2NyZWF0ZUNoYXJ0KHR5cGUsIGNoYXJ0VHlwZSwgcGFuZWwsIGZhbHNlLCBudWxsLCBhbmltYXRlKTtcbn1cblxuZnVuY3Rpb24gX3Nob3dQb3B1cENoYXJ0KHR5cGUpIHtcbiAgdmFyIHBhbmVsID0gJChcIjxkaXYgY2xhc3M9J2l0ZW0nPjwvZGl2PlwiKTtcblxuICB2YXIgcHJpbnRCdG4gPSAkKFwiPGEgY2xhc3M9J2J0biBidG4tc20gYnRuLWRlZmF1bHQnIHN0eWxlPSdtYXJnaW4tbGVmdDoxNnB4Jz48aSBjbGFzcz0naWNvbi1wcmludCc+PC9pPiBQcmludDwvYT5cIikub24oJ2NsaWNrJyxmdW5jdGlvbigpe1xuICAgICBwcmludChjaGFydFBhbmVsKTtcbiAgfSk7XG4gIHBhbmVsLmFwcGVuZChwcmludEJ0bik7XG5cbiAgdmFyIGNoYXJ0UGFuZWwgPSAkKFwiPGRpdj48L2Rpdj5cIik7XG4gIHBhbmVsLmFwcGVuZChjaGFydFBhbmVsKTtcblxuICBzbGlkZXJQb3B1cC5maW5kKFwiLm93bC10aGVtZVwiKS5hcHBlbmQocGFuZWwpO1xuICBfY3JlYXRlQ2hhcnQodHlwZSwgJ2xpbmUnLCBjaGFydFBhbmVsLCB0cnVlLCBbTWF0aC5yb3VuZCgkKHdpbmRvdykud2lkdGgoKSouODgpLCBNYXRoLnJvdW5kKCgkKHdpbmRvdykuaGVpZ2h0KCkqLjkwKS0xMjUpXSk7XG59XG5cbmZ1bmN0aW9uIF9jcmVhdGVDaGFydCh0eXBlLCBjaGFydFR5cGUsIHBhbmVsLCBzaG93TGVnZW5kLCBzaXplLCBhbmltYXRlKSB7XG4gIHZhciBjb2wgPSAwO1xuXG4gIHZhciBkdCA9IG5ldyBnb29nbGUudmlzdWFsaXphdGlvbi5EYXRhVGFibGUoKTtcblxuICBpZiggY2hhcnRUeXBlID09ICd0aW1lbGluZScgKSB7XG4gICAgICBkdC5hZGRDb2x1bW4oJ2RhdGUnLCAnTW9udGgnKTtcbiAgfSBlbHNlIHtcbiAgICAgIC8vZHQuYWRkQ29sdW1uKCdudW1iZXInLCAnTW9udGgnKTtcbiAgICAgIGR0LmFkZENvbHVtbignc3RyaW5nJywgJ01vbnRoJyk7XG4gIH1cblxuICAvLyBzZXQgdGhlIGZpcnN0IGNvbHVtblxuICBpZiggIWNEYXRhWzBdLnNpbmdsZVJ1biApIHtcbiAgICAgIGZvciggdmFyIGkgPSAwOyBpIDwgY0RhdGEubGVuZ3RoOyBpKysgKSB7XG4gICAgICAgICAgdmFyIGxhYmVsID0gXCJcIjtcbiAgICAgICAgICBmb3IoIHZhciBrZXkgaW4gY0RhdGFbaV0uaW5wdXRzICkge1xuICAgICAgICAgICAgICBsYWJlbCArPSBrZXkucmVwbGFjZSgvLipcXC4vLCcnKStcIj1cIitjRGF0YVtpXS5pbnB1dHNba2V5XStcIiBcXG5cIjtcbiAgICAgICAgICB9XG4gICAgICAgICAgbGFiZWwgPSBsYWJlbC5yZXBsYWNlKC8sXFxzJC8sJycpO1xuICAgICAgICAgIGR0LmFkZENvbHVtbignbnVtYmVyJywgbGFiZWwpO1xuICAgICAgfVxuICB9IGVsc2Uge1xuICAgICAgZHQuYWRkQ29sdW1uKCdudW1iZXInLCB0eXBlKTtcbiAgfVxuXG4gIC8vIGZpbmQgdGhlIGNvbHVtbiB3ZSB3YW50IHRvIGNoYXJ0XG4gIGZvciAoIHZhciBpID0gMDsgaSA8IGNEYXRhWzBdLm91dHB1dFswXS5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGNEYXRhWzBdLm91dHB1dFswXVtpXSA9PSB0eXBlKSB7XG4gICAgICAgICAgY29sID0gaTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgfVxuXG4gIHZhciBjRGF0ZSA9IG5ldyBEYXRlKCQoXCIjaW5wdXQtbWFuYWdlLWRhdGVQbGFudGVkXCIpLnZhbCgpKTtcblxuICB2YXIgZGF0YSA9IFtdO1xuICB2YXIgbWF4ID0gMDtcbiAgLy8gY3JlYXRlIHRoZSBbXVtdIGFycmF5IGZvciB0aGUgZ29vZ2xlIGNoYXJ0XG4gIGZvciAoIHZhciBpID0gMTsgaSA8IGNEYXRhWzBdLm91dHB1dC5sZW5ndGg7IGkrKykge1xuICAgICAgLy9pZiAodHlwZW9mIGNEYXRhWzBdLm91dHB1dFtpXVtjb2xdID09PSAnc3RyaW5nJykgY29udGludWU7XG5cbiAgICAgIHZhciByb3cgPSBbXTtcblxuICAgICAgLy92YXIgZGF0ZSA9IG5ldyBEYXRlKGNEYXRlLmdldFllYXIoKSsxOTAwLCBjRGF0ZS5nZXRNb250aCgpK2ksIGNEYXRlLmdldERhdGUoKSk7XG4gICAgICBpZiggY2hhcnRUeXBlID09IFwidGltZWxpbmVcIiApIHtcbiAgICAgICAgICAvLyBhZGQgb24gbW9udGhcbiAgICAgICAgICByb3cucHVzaChuZXcgRGF0ZShjRGF0YVswXS5vdXRwdXRbaV1bMF0pKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcm93LnB1c2goY0RhdGFbMF0ub3V0cHV0W2ldWzBdKTtcbiAgICAgIH1cblxuICAgICAgZm9yICggdmFyIGogPSAwOyBqIDwgY0RhdGEubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICBpZiggY0RhdGFbal0ub3V0cHV0W2ldW2NvbF0gPiBtYXggKSBtYXggPSBjRGF0YVtqXS5vdXRwdXRbaV1bY29sXTtcbiAgICAgICAgICByb3cucHVzaChjRGF0YVtqXS5vdXRwdXRbaV1bY29sXSk7XG4gICAgICB9XG5cbiAgICAgIGRhdGEucHVzaChyb3cpO1xuICB9XG5cbiAgZHQuYWRkUm93cyhkYXRhKTtcblxuICBpZiggb3V0cHV0RGVmaW5pdGlvbnNbdHlwZV0gKSB7XG4gICAgICB2YXIgZGVzYyA9IG91dHB1dERlZmluaXRpb25zW3R5cGVdO1xuICAgICAgdmFyIGxhYmVsID0gZGVzYy5sYWJlbCAmJiBkZXNjLmxhYmVsLmxlbmd0aCA+IDAgPyBcIiAtIFwiK2Rlc2MubGFiZWwgOiBcIlwiO1xuICAgICAgdmFyIHVuaXRzID0gZGVzYy51bml0cyAmJiBkZXNjLnVuaXRzLmxlbmd0aCA+IDAgPyBcIiBbXCIrZGVzYy51bml0cytcIl1cIiA6IFwiXCI7XG4gICAgICB0eXBlID0gdHlwZStsYWJlbCt1bml0cztcbiAgfVxuXG5cbiAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICAgICAgdkF4aXMgOiB7XG4gICAgICAgICAgICAgIHRpdGxlIDogdHlwZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgaEF4aXMgOiB7XG4gICAgICAgICAgICAgIHRpdGxlIDogXCJNb250aFwiXG4gICAgICAgICAgfVxuICB9XG4gIGlmKCAhc2hvd0xlZ2VuZCApIG9wdGlvbnMubGVnZW5kID0ge3Bvc2l0aW9uOlwibm9uZVwifTtcblxuICBpZiggc2l6ZSApIHtcbiAgICAgIG9wdGlvbnMud2lkdGggPSBzaXplWzBdO1xuICAgICAgb3B0aW9ucy5oZWlnaHQgPSBzaXplWzFdO1xuICB9IGVsc2Uge1xuICAgICAgb3B0aW9ucy53aWR0aCA9IHBhbmVsLndpZHRoKCk7XG4gICAgICBvcHRpb25zLmhlaWdodCA9IG9wdGlvbnMud2lkdGgqLjQ7XG4gIH1cbiAgcGFuZWwud2lkdGgob3B0aW9ucy53aWR0aCkuaGVpZ2h0KG9wdGlvbnMuaGVpZ2h0KTtcblxuICBpZiggY2hhcnRUeXBlID09ICd0aW1lbGluZScgKSB7XG4gICAgICBvcHRpb25zLmRpc3BsYXlBbm5vdGF0aW9ucyA9IHRydWU7XG4gICAgICB2YXIgY2hhcnQgPSBuZXcgZ29vZ2xlLnZpc3VhbGl6YXRpb24uQW5ub3RhdGVkVGltZUxpbmUocGFuZWxbMF0pO1xuICAgICAgY2hhcnQuZHJhdyhkdCwgb3B0aW9ucyk7XG4gIH0gZWxzZSB7XG4gICAgICB2YXIgY2hhcnQgPSBuZXcgZ29vZ2xlLnZpc3VhbGl6YXRpb24uTGluZUNoYXJ0KHBhbmVsWzBdKTtcbiAgICAgIGNoYXJ0LmRyYXcoZHQsIG9wdGlvbnMpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBzZXRBcHAgOiBmdW5jdGlvbihhKSB7XG4gICAgYXBwID0gYTtcbiAgfSxcbiAgICBpbml0IDogaW5pdCxcbiAgICBzZXREYXRhIDogc2V0RGF0YSxcbiAgICBzZWxlY3QgOiBzZWxlY3QsXG4gICAgdW5zZWxlY3QgOiB1bnNlbGVjdCxcbiAgICBzZWxlY3RBbGwgOiBzZWxlY3RBbGwsXG4gICAgdW5zZWxlY3RBbGwgOiB1bnNlbGVjdEFsbCxcbiAgICB1cGRhdGVDaGFydHMgOiB1cGRhdGVDaGFydHMsXG4gICAgcmVtb3ZlIDogcmVtb3ZlLFxuICAgIHNob3dQb3B1cDogc2hvd1BvcHVwLFxuICAgIGhpZGVQb3B1cDogaGlkZVBvcHVwLFxuICAgIHJlc2l6ZSA6IHJlc2l6ZVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBpbnB1dHMgOiB7XG4gICAgd2VhdGhlciA6IFsnbW9udGgnLCd0bWluJywndG1heCcsJ3RkbWVhbicsJ3BwdCcsJ3JhZCcsJ2RheWxpZ2h0J11cbiAgfSxcbiAgb3V0cHV0cyA6IFsnVlBEJywnZlZQRCcsJ2ZUJywnZkZyb3N0JywnUEFSJywnSW50Y3B0bicsJ0FTVycsJ0N1bUlycmlnJyxcbiAgICAgICAgICAgICAnSXJyaWcnLCdTdGFuZEFnZScsJ0xBSScsJ0NhbkNvbmQnLCdUcmFuc3AnLCdFVHInLCdLYycsJ2ZTVycsJ2ZBZ2UnLFxuICAgICAgICAgICAgICdQaHlzTW9kJywncFInLCdwUycsJ2xpdHRlcmZhbGwnLCdOUFAnLCdXRicsJ1dSJywnV1MnLCdXJ10sXG4gIGRlYnVnIDogZmFsc2UsXG4gIGRldm1vZGUgOiBmYWxzZSxcbiAgZGFpbHkgOiBmYWxzZVxufTtcbiIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9icm93c2Vyc3RhY2svZmxhc2hibG9jay1kZXRlY3RvclxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGNhbGxiYWNrTWV0aG9kKXtcbiAgICB2YXIgcmV0dXJuX3ZhbHVlID0gMDtcblxuICAgIGlmKG5hdmlnYXRvci5wbHVnaW5zW1wiU2hvY2t3YXZlIEZsYXNoXCJdKSB7XG4gICAgICAgICAgZW1iZWRfbGVuZ3RoID0gJCgnZW1iZWQnKS5sZW5ndGg7XG4gICAgICAgICAgb2JqZWN0X2xlbmd0aCA9ICQoJ29iamVjdCcpLmxlbmd0aDtcblxuICAgICAgICAgIGlmKChlbWJlZF9sZW5ndGggPiAwKSB8fCAob2JqZWN0X2xlbmd0aCA+IDApKSB7XG4gICAgICAgICAgICAgIC8qIE1hYyAvIENocm9tZSB1c2luZyBGbGFzaEJsb2NrICsgTWFjIC8gU2FmYXJpIHVzaW5nIEFkQmxvY2sgKi9cbiAgICAgICAgICAgICAgJCgnb2JqZWN0LCBlbWJlZCcpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKCQodGhpcykuY3NzKCdkaXNwbGF5JykgPT09ICdub25lJyl7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5fdmFsdWUgPSAyO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8qIE1hYyAvIEZpcmVmb3ggdXNpbmcgRmxhc2hCbG9jayAqL1xuICAgICAgICAgICAgICBpZiggJCgnZGl2W2JnaW5hY3RpdmVdJykubGVuZ3RoID4gMCApe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm5fdmFsdWUgPSAyO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgIH0gZWxzZSBpZihuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ01TSUUnKSA+IC0xKSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgbmV3IEFjdGl2ZVhPYmplY3QoJ1Nob2Nrd2F2ZUZsYXNoLlNob2Nrd2F2ZUZsYXNoJyk7XG4gICAgICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgICAgICAgIHJldHVybl92YWx1ZSA9IDI7XG4gICAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgICAgLyogSWYgZmxhc2ggaXMgbm90IGluc3RhbGxlZCAqL1xuICAgICAgICAgIHJldHVybl92YWx1ZSA9IDE7XG4gICAgfVxuXG4gICAgaWYoY2FsbGJhY2tNZXRob2QgJiYgdHlwZW9mKGNhbGxiYWNrTWV0aG9kKSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgY2FsbGJhY2tNZXRob2QocmV0dXJuX3ZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiByZXR1cm5fdmFsdWU7XG4gICAgfVxufTtcbiIsIi8qXG4gKiBTYXZlIHRvIGdvb2dsZSBkcml2ZSAoZXhwb3J0IGFzIENTVilcbiAqL1xuXG52YXIgZ2RyaXZlID0gcmVxdWlyZSgnLi9pbmRleCcpO1xuXG5mdW5jdGlvbiBpbml0KCkge1xuICAkKFwiI2V4cG9ydC1tb2RhbFwiKS5tb2RhbCh7XG4gICAgc2hvdyA6IGZhbHNlXG4gIH0pO1xuXG4gICQoXCIjc2hvdy1leHBvcnQtY3N2XCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgX3NldE1lc3NhZ2UobnVsbCk7XG5cbiAgICAkKFwiI2V4cG9ydC1uYW1lXCIpLnZhbChcIjNQRyBNb2RlbCBSZXN1bHRzIChcIituZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkucmVwbGFjZSgvVC8sJyAnKS5yZXBsYWNlKC9cXC5cXGQqWi8sJycpK1wiKVwiKTtcbiAgICAkKFwiI2V4cG9ydC1tb2RhbFwiKS5tb2RhbCgnc2hvdycpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gX3NldE1lc3NhZ2UobXNnLCB0eXBlLCBwcm9ncmVzcykge1xuICBpZiggIW1zZyApIHtcbiAgICByZXR1cm4gJChcIiNleHBvcnQtbXNnXCIpLmhpZGUoKTtcbiAgfVxuICAkKFwiI2V4cG9ydC1tc2dcIikuc2hvdygpO1xuXG4gIGlmKCBwcm9ncmVzcyApIHtcbiAgICAkKFwiI2V4cG9ydC1tc2ctcHJvZ3Jlc3NcIikuc2hvdygpO1xuICB9IGVsc2Uge1xuICAgICQoXCIjZXhwb3J0LW1zZy1wcm9ncmVzc1wiKS5oaWRlKCk7XG4gIH1cblxuICAkKCcjZXhwb3J0LW1zZycpLmF0dHIoXCJjbGFzc1wiLCdhbGVydCBhbGVydC0nK3R5cGUpO1xuICAkKCcjZXhwb3J0LW1zZy10ZXh0JykuaHRtbChtc2cpO1xufVxuXG5mdW5jdGlvbiBfdXBkYXRlUHJvZ3Jlc3MoaW5kZXgsIHRvdGFsKSB7XG4gIHBlcmNlbnQgPSAxMDAgKiAoIGluZGV4IC8gdG90YWwgKTtcbiAgJChcIiNleHBvcnQtbXNnLXByb2dyZXNzLWJhclwiKS5hdHRyKFwiYXJpYS12YWx1ZW5vd1wiLCBwZXJjZW50KS5jc3MoXCJ3aWR0aFwiLHBlcmNlbnQrXCIlXCIpO1xufVxuXG4vLyBzZWUgaWYgYW4gZXJyb3IgZXhpc3RzLCBpZiBzbywgc2V0IHN0YXRlXG5mdW5jdGlvbiBfY2hlY2tFcnJvcihmaWxlKSB7XG4gIHZhciBlcnJvck1lc3NhZ2UgPSBudWxsO1xuICBpZiggIWZpbGUgKSBlcnJvck1lc3NhZ2UgPSBcIkVycm9yIGNyZWF0aW5nIGZpbGUgb24gR29vZ2xlIERyaXZlIDooXCI7XG4gIGlmKCBmaWxlLmVycm9yICkgZXJyb3JNZXNzYWdlID0gZmlsZS5tZXNzYWdlO1xuXG4gIGlmKCBlcnJvck1lc3NhZ2UgKSB7XG4gICAgX3NldE1lc3NhZ2UoZXJyb3JNZXNzYWdlLCBcImRhbmdlclwiKTtcbiAgICAkKFwiI2V4cG9ydC1jc3ZcIikucmVtb3ZlQ2xhc3MoXCJkaXNhYmxlZFwiKS5odG1sKFwiRXhwb3J0XCIpO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuICAvLyBleHBvcnQgYXMgY3N2XG5mdW5jdGlvbiBydW4ocmVzdWx0cykge1xuICBnYSgnc2VuZCcsICdldmVudCcsICd1aScsICdpbnRlcmFjdGlvbicsICdleHBvcnQtZHJpdmUtY3N2JywgMSk7XG5cbiAgJChcIiNleHBvcnQtY3N2XCIpLmFkZENsYXNzKFwiZGlzYWJsZWRcIikuaHRtbChcIkV4cG9ydGluZy4uLlwiKTtcblxuICB2YXIgbmFtZSA9ICQoXCIjZXhwb3J0LW5hbWVcIikudmFsKCk7XG4gIGlmKCBuYW1lLmxlbmd0aCA9PT0gMCApIHtcbiAgICBfc2V0TWVzc2FnZShcIlBsZWFzZSBwcm92aWRlIGEgZm9sZGVyIG5hbWVcIiwgXCJkYW5nZXJcIik7XG4gICAgJChcIiNleHBvcnQtY3N2XCIpLnJlbW92ZUNsYXNzKFwiZGlzYWJsZWRcIikuaHRtbChcIkV4cG9ydFwiKTtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgZGF0YSA9IHJlc3VsdHMuZGF0YTtcblxuICAvLyBjcmVhdGUgYSBsaXN0IHNvIHdlIGNhbiByZWN1cnNpdmVseSBpdGVyYXRlXG4gIHZhciBrZXlzID0gW107XG4gIGZvciggdmFyIGtleSBpbiBkYXRhICkga2V5cy5wdXNoKGtleSk7XG5cbiAgLy8gY3JlYXRlIGZvbGRlclxuICBfc2V0TWVzc2FnZShcIkNyZWF0aW5nIGV4cG9ydCBmb2xkZXIuLi5cIiwgXCJpbmZvXCIsIHRydWUpO1xuICBfdXBkYXRlUHJvZ3Jlc3MoMSwga2V5cy5sZW5ndGgrMik7XG4gIGdkcml2ZS5zYXZlRmlsZShuYW1lLFwiQUhCIDNQRyBNb2RlbCBSZXN1bHRzXCIsXCJhcHBsaWNhdGlvbi92bmQuZ29vZ2xlLWFwcHMuZm9sZGVyXCIsXCJcIixmdW5jdGlvbihmaWxlKXtcbiAgICBpZiggX2NoZWNrRXJyb3IoZmlsZSkgKSByZXR1cm47XG4gICAgdmFyIHBhcmVudCA9IGZpbGUuaWQ7XG4gICAgX3VwZGF0ZVByb2dyZXNzKDIsIGtleXMubGVuZ3RoKzIpO1xuXG4gICAgLy8gY3JlYXRlIGEgbmljZSBmaWxlIGRlc2NyaWJpbmcgdGhlIGN1cnJlbnQgZXhwb3J0XG4gICAgX3NldE1lc3NhZ2UoXCJDcmVhdGluZyBjb25maWcgZmlsZS4uLlwiLCBcImluZm9cIiwgdHJ1ZSk7XG4gICAgZGVsZXRlIHJlc3VsdHMuY29uZmlnLnBsYW50YXRpb25fc3RhdGU7XG4gICAgdmFyIGNvbmZpZyA9IEpTT04uc3RyaW5naWZ5KHJlc3VsdHMuY29uZmlnLG51bGwsXCIgIFwiKTtcbiAgICBnZHJpdmUuc2F2ZUZpbGUoXCJjb25maWcudHh0XCIsXCJBSEIgM1BHIE1vZGVsIC0gUnVuIENvbmZpZ3VyYXRpb25cIixcInRleHQvcGxhaW5cIixjb25maWcsZnVuY3Rpb24oZmlsZSl7XG4gICAgICBpZiggX2NoZWNrRXJyb3IoZmlsZSkgKSByZXR1cm47XG4gICAgICBfdXBkYXRlUHJvZ3Jlc3MoMywga2V5cy5sZW5ndGgrMik7XG5cbiAgICAgIF9jcmVhdGVFeHBvcnQoMCwga2V5cywgZGF0YSwgcGFyZW50KTtcbiAgICB9LHtwYXJlbnQ6IHBhcmVudH0pXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBfY3JlYXRlRXhwb3J0KGluZGV4LCBrZXlzLCBkYXRhLCBwYXJlbnQpIHtcblxuICAvLyB3ZSBhcmUgYWxsIGRvbmUgOilcbiAgaWYoIGluZGV4ID09IGtleXMubGVuZ3RoICkge1xuICAgIF91cGRhdGVQcm9ncmVzcygxLCAxKTtcbiAgICBfc2V0TWVzc2FnZShcIkV4cG9ydCBTdWNjZXNzZnVsLjxiciAvPjxhIGhyZWY9J2h0dHBzOi8vZHJpdmUuZ29vZ2xlLmNvbS8jZm9sZGVycy9cIiArIHBhcmVudCArXG4gICAgICAgICAgXCInIHRhcmdldD0nX2JsYW5rJz48aSBjbGFzcz0naWNvbi1leHRlcm5hbC1saW5rLXNpZ24nPjwvaT4gT3BlbiBpbiBHb29nbGUgRHJpdmU8L2E+XCIsIFwic3VjY2Vzc1wiKTtcbiAgICAkKFwiI2V4cG9ydC1jc3ZcIikucmVtb3ZlQ2xhc3MoXCJkaXNhYmxlZFwiKS5odG1sKFwiRXhwb3J0XCIpO1xuICB9IGVsc2Uge1xuXG4gICAgdmFyIGtleSA9IGtleXNbaW5kZXhdO1xuICAgIHZhciBjc3YgPSBcIlwiO1xuXG4gICAgLy8gVE9ETzogYWRkIG1vbnRoIGFuZCBkYXRlXG5cbiAgICBmb3IoIHZhciBpID0gMDsgaSA8IGRhdGFba2V5XS5sZW5ndGg7IGkrKyApIHtcbiAgICAgIGlmKCBkYXRhW2tleV1baV0ubGVuZ3RoID09PSAwICkgY29udGludWU7IC8vIGlnbm9yZSB0aGUgYmxhbmsgcm93c1xuXG4gICAgICBmb3IoIHZhciBqID0gMDsgaiA8IGRhdGFba2V5XVtpXS5sZW5ndGg7IGorKyApIGNzdiArPSBkYXRhW2tleV1baV1bal0rXCIsXCI7XG4gICAgICBjc3YgPSBjc3YucmVwbGFjZSgvLCQvLCcnKStcIlxcblwiO1xuICAgIH1cblxuICAgIF9zZXRNZXNzYWdlKFwiQ3JlYXRpbmcgXCIra2V5c1tpbmRleF0rXCIuY3N2Li4uIFwiLCBcImluZm9cIiwgdHJ1ZSk7XG4gICAgZ2RyaXZlLnNhdmVGaWxlKGtleXNbaW5kZXhdK1wiLmNzdlwiLFwiXCIsXCJ0ZXh0L2NzdlwiLGNzdixmdW5jdGlvbihmaWxlKXtcbiAgICAgIGlmKCBfY2hlY2tFcnJvcihmaWxlKSApIHJldHVybjtcblxuICAgICAgX3VwZGF0ZVByb2dyZXNzKGluZGV4KzQsIGtleXMubGVuZ3RoKzIpO1xuXG4gICAgICBpbmRleCsrO1xuICAgICAgX2NyZWF0ZUV4cG9ydChpbmRleCwga2V5cywgZGF0YSwgcGFyZW50KTtcbiAgICB9LHtjb252ZXJ0OiB0cnVlLCBwYXJlbnQ6IHBhcmVudH0pO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBydW4gOiBydW4sXG4gIGluaXQgOiBpbml0XG59O1xuIiwidmFyIE9hdXRoID0gcmVxdWlyZSgnLi4vb2F1dGgnKTtcbnZhciBnZHJpdmVSVCA9IHJlcXVpcmUoJy4vcmVhbHRpbWUnKTtcbnZhciBtb2RlbElPID0gcmVxdWlyZSgnLi4vbW9kZWxSdW5IYW5kbGVyJyk7XG52YXIgYXBwO1xuXG5cbnZhciBNSU1FX1RZUEUgPSBcImFwcGxpY2F0aW9uL3ZuZC5haGItM3BnLnJ1blwiO1xudmFyIFRSRUVfTUlNRV9UWVBFID0gXCJhcHBsaWNhdGlvbi92bmQuYWhiLTNwZy50cmVlXCI7XG52YXIgRFJJVkVfQVBJX1ZFUlNJT04gPSBcInYyXCI7XG5cbi8vIGdvb2dsZSBvYXV0aCBhY2Nlc3MgdG9rZW5cbnZhciB0b2tlbiA9IFwiXCI7XG5cbi8vIGN1cnJlbnRseSBsb2FkZWQgZ2RyaXZlIGZpbGUgaWRcbnZhciBsb2FkZWRGaWxlID0gbnVsbDtcbi8vIGxpc3Qgb2YgY3VycmVudGx5IGxvYWRlZCBmaWxlcyAobWV0YWRhdGEpXG52YXIgZmlsZUxpc3QgPSBbXTtcbi8vIGdvb2dsZSBkcml2ZSBzaGFyZSBjbGllbnRcbnZhciBjbGllbnQgPSBudWxsO1xuXG4vLyBsb2FkZWQgdHJlZSBhbmQgbWFuYWdlbWVudFxudmFyIGxvYWRlZFRyZWUgPSBudWxsO1xuLy8gbGlzdCBvZiBjdXJyZW50bHkgbG9hZGVkIHRyZWUgZmlsZXMgKG1ldGFkYXRhKVxudmFyIHRyZWVMaXN0ID0gW107XG5cbi8vIGN1cnJlbnQgTUlNRSBUWVBFIHdlIGFyZSBzYXZpbmdcbnZhciBzYXZlTWltZVR5cGUgPSBcIlwiO1xuXG5mdW5jdGlvbiBzZXRBcHAoYSkge1xuICBhcHAgPSBhO1xuICBnZHJpdmVSVC5zZXRBcHAoYXBwKTtcbn1cblxuLyoqKlxuICogIEluaXRpYWxpemUgZ29vZ2xlIGRyaXZlIHBhbmVscywgYnRucyBhbmQgbG9naW5cbiAqKiovXG5mdW5jdGlvbiBpbml0KGNhbGxiYWNrKSB7XG4gIC8vIGluaXQgYm9vdHN0cmFwIG1vZGFsXG4gICQoXCIjc2F2ZS1tb2RhbFwiKS5tb2RhbCh7XG4gICAgc2hvdyA6IGZhbHNlXG4gIH0pO1xuXG4gIC8vIGluaXQgYm9vdHN0cmFwIG1vZGFsXG4gICQoXCIjbG9hZC1tb2RhbFwiKS5tb2RhbCh7XG4gICAgc2hvdyA6IGZhbHNlXG4gIH0pO1xuXG4gIC8vIHRoZSBhYm91dCBtb2RhbCBsaW5rIGlzIGNyZWF0ZWQgYmVsb3csIHNvIHdoeSBub3QuLi5cbiAgJChcIiNhYm91dC1tb2RhbFwiKS5tb2RhbCh7XG4gICAgc2hvdyA6IGZhbHNlXG4gIH0pO1xuXG4gIC8vIHRoZSBhYm91dCBtb2RhbCBsaW5rIGlzIGNyZWF0ZWQgYmVsb3csIHNvIHdoeSBub3QuLi5cbiAgJChcIiNoZWxwLW1vZGFsXCIpLm1vZGFsKHtcbiAgICBzaG93IDogZmFsc2VcbiAgfSk7XG5cbiAgLy8gc2V0IHRoZSAndXBkYXRlJyBidG4gY2xpY2sgaGFuZGxlclxuICAkKFwiI3NhdmUtdXBkYXRlLWJ0blwiKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICBfdXBkYXRlQ3VycmVudEZpbGUoKTtcbiAgfSk7XG5cbiAgLy8gc2V0IHRoZSAnbmV3JyBidG4gY2xpY2sgaGFuZGxlclxuICAkKFwiI3NhdmUtbmV3LWJ0blwiKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICBfc2F2ZU5ld0ZpbGUoKTtcbiAgfSk7XG5cbiAgLy8gY3JlYXRlIHRoZSB0b3AgcmlnaHQgbWVudVxuICBfY3JlYXRlTG9naW5CdG4oKTtcblxuICAvLyBsb2FkIHRoZSBnb29nbGUgYXV0aCBhbmQgZHJpdmUgYXBpJ3NcbiAgX2xvYWRBcGkoZnVuY3Rpb24oKSB7XG4gICAgLy8gaWYgdGhlIHVzZXIgaXMgYXV0aG9yaXplZCBncmFiIHRoZSByZWZyZXNoIHRva2VuXG4gICAgT2F1dGguaXNBdXRob3JpemVkKGZ1bmN0aW9uKHJlZnJlc2hUb2tlbil7XG4gICAgICAvLyBpZiB0aGVyZSBpcyBubyByZWZyZXNoIHRva2VuLCBsZWF2ZSwgd2UgYXJlIGluaXRpYWxpemVkXG4gICAgICBpZiggIXJlZnJlc2hUb2tlbiApIHJldHVybiBjYWxsYmFjaygpO1xuXG4gICAgICAvLyBpZiB3ZSBoYXZlIGEgcmVmZXNoIHRva2VuLCB0aGVuIHVzZXIgaXMgYWxsIHNldCxcbiAgICAgIC8vIGdldCBhIG5ldyBhY2Nlc3MgdG9rZW4gc28gd2UgY2FuIHN0YXJ0IHVzaW5nIHRoZSBhcGknc1xuICAgICAgLy8gZ3JhYiB0aGVpciBpbmZvcm1hdGlvbiBhbmQgZGlzcGxheVxuICAgICAgT2F1dGguZ2V0QWNjZXNzVG9rZW4oZnVuY3Rpb24odCl7XG4gICAgICAgIHRva2VuID0gdDtcbiAgICAgICAgaWYoIHRva2VuICkgX3NldFVzZXJJbmZvKCk7XG4gICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vIGNoZWNrIGlmIGFjY2VzcyB0b2tlbiBoYXMgZXhwaXJlZFxuICAgIHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgX2NoZWNrVG9rZW4oKTtcbiAgICB9LCAxMDAwICogNSAqIDYwKTtcbiAgfSk7XG5cbiAgLy8gc2V0dXAgdGhlIHRyZWUgJ3NoYXJlJyBidG5cbiAgJChcIiNzaGFyZS10cmVlLWJ0blwiKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgIC8vIHNlZSBpZiB3ZSBoYXZlIGEgc2hhcmUgY2xpZW50XG4gICAgaWYoIGNsaWVudCA9PSBudWxsICkge1xuICAgICAgLy8gbm8gY2xpZW50LCBsb2FkIGFwaVxuICAgICAgZ2FwaS5sb2FkKCdkcml2ZS1zaGFyZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgIC8vIG9uIGxvYWQsIHNob3cgdGhlIHNoYXJlIHBvcHVwIHdpdGggdGhlIGN1cnJlbnQgdHJlZVxuICAgICAgICAgY2xpZW50ID0gbmV3IGdhcGkuZHJpdmUuc2hhcmUuU2hhcmVDbGllbnQoT2F1dGguQVBQX0lEKTtcbiAgICAgICAgICBjbGllbnQuc2V0SXRlbUlkcyhbbG9hZGVkVHJlZV0pO1xuICAgICAgICAgY2xpZW50LnNob3dTZXR0aW5nc0RpYWxvZygpO1xuICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyB3ZSBoYXZlIGEgY2xpZW50LCBzaG93IHRoZSBzaGFyZSBwb3B1cCB3aXRoIGN1cnJlbnQgdHJlZVxuICAgICAgY2xpZW50LnNldEl0ZW1JZHMoW2xvYWRlZEZpbGVdKTtcbiAgICAgICBjbGllbnQuc2hvd1NldHRpbmdzRGlhbG9nKCk7XG4gICAgfVxuICB9KTtcblxufVxuXG4vKioqXG4gKiBTYXZlIHRoZSBjdXJyZW50IG1vZGVsIGFzIGEgbmV3IGdvb2dsZSBkcml2ZSBmaWxlXG4gKioqL1xuZnVuY3Rpb24gX3NhdmVOZXdGaWxlKCkge1xuICBnYSgnc2VuZCcsICdldmVudCcsICd1aScsICdpbnRlcmFjdGlvbicsICdzYXZlLWRyaXZlLWZpbGUnLCAxKTtcblxuICAvLyBncmFiIHRoZSBuYW1lIG9mIHRoZSBuZXcgZmlsZVxuICB2YXIgbmFtZSA9ICQoXCIjc2F2ZS1uYW1lLWlucHV0XCIpLnZhbCgpO1xuICBpZiggbmFtZS5sZW5ndGggPT0gMCApIHsgLy8gd2UgYWx3YXlzIHdhbnQgYSBuYW1lLCBhbGVydCBhbmQgcXVpdFxuICAgIF9zZXRTYXZlTWVzc2FnZSgnUGxlYXNlIHByb3ZpZGUgYSBmaWxlbmFtZS4nLCdpbmZvJyk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gc2VlIHdoYXQga2luZCBvZiBmaWxlIHdlIGFyZSBjcmVhdGluZyBiYXNlZCBvbiB0aGUgc2F2ZU1pbWVUeXBlIHZhclxuICBpZiggc2F2ZU1pbWVUeXBlID09IE1JTUVfVFlQRSApIHtcbiAgICBkYXRhID0gbW9kZWxJTy5leHBvcnRTZXR1cCgpO1xuICB9IGVsc2UgaWYgKCBzYXZlTWltZVR5cGUgPT0gVFJFRV9NSU1FX1RZUEUgKSB7XG4gICAgZGF0YSA9IG1vZGVsSU8uZXhwb3J0U2V0dXAoKS50cmVlO1xuICB9IGVsc2UgeyAvLyBiYWRuZXNzXG4gICAgYWxlcnQoXCJVbmtub3duIE1JTUVfVFlQRTogXCIrc2F2ZU1pbWVUeXBlKTtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBzZXQgdGhlIHVzZXIga25vdyB3aGF0IHdlIGFyZSBkb2luZ1xuICBfc2V0U2F2ZU1lc3NhZ2UoJzxpIGNsYXNzPVwiaWNvbi1zcGlubmVyIGljb24tc3BpblwiPjwvaT4gU2F2aW5nIEZpbGUuLi4nLCdpbmZvJyk7XG5cbiAgLy8gc2F2ZSB0aGUgZmlsZVxuICBzYXZlRmlsZShuYW1lLFxuICAgICAgJChcIiNzYXZlLWRlc2NyaXB0aW9uLWlucHV0XCIpLnZhbCgpLFxuICAgICAgc2F2ZU1pbWVUeXBlLFxuICAgICAgZGF0YSxcbiAgICAgIGZ1bmN0aW9uKHJlc3ApIHtcbiAgICAgICAgLy8gbGV0IHRoZSB1c2VyIGtub3cgd2hhdCBoYXBwZW5lZFxuICAgICAgICBpZiggcmVzcC5lcnJvciApIHJldHVybiBfc2V0U2F2ZU1lc3NhZ2UoJ0ZhaWxlZCB0byBzYXZlIHRvIEdvb2dsZSBEcml2ZSA6KCcsJ2RhbmdlcicpO1xuICAgICAgICBlbHNlIF9zZXRTYXZlTWVzc2FnZSgnU3VjZXNzZnVsbHkgc2F2ZWQuJywnc3VjY2VzcycpO1xuXG4gICAgICAgIC8vIHdhaXQgYSB0aWNrIHRvIGhpZGUgdGhlIHBvcHVwLCBzbyB1c2VyIHNlZXMgc3VjY2VzcyBtZXNzYWdlXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAkKFwiI3NhdmUtbW9kYWxcIikubW9kYWwoJ2hpZGUnKTtcbiAgICAgICAgfSwxNTAwKTtcblxuICAgICAgICAvLyBzaG93IHRoZSBzaGFyZSBidG5cbiAgICAgICAgaWYoIHNhdmVNaW1lVHlwZSA9PSBNSU1FX1RZUEUgKSB7XG4gICAgICAgICAgLy8gd2UgaGF2ZSBhIG5ldyBmaWxlLCB1cGRhdGUgb3VyIGxpc3RcbiAgICAgICAgICBfdXBkYXRlRmlsZUxpc3QoKTtcblxuICAgICAgICAgIC8vIHNob3cgdGhlIHNoYXJlIGJ0bnNcbiAgICAgICAgICAkKFwiI3NoYXJlLWJ0blwiKS5wYXJlbnQoKS5zaG93KCk7XG4gICAgICAgICAgJChcIiNvcGVuLWluLWRyaXZlXCIpLmF0dHIoXCJocmVmXCIsXCJodHRwczovL2RvY3MuZ29vZ2xlLmNvbS9maWxlL2QvXCIrcmVzcC5pZCkucGFyZW50KCkuc2hvdygpO1xuXG4gICAgICAgICAgLy8gc2V0IHRoZSBsb2FkZWQgZmlsZSBpZFxuICAgICAgICAgIGxvYWRlZEZpbGUgPSByZXNwLmlkO1xuICAgICAgICB9IGVsc2UgaWYgKCBzYXZlTWltZVR5cGUgPT0gVFJFRV9NSU1FX1RZUEUgKSB7XG4gICAgICAgICAgLy8gd2UgaGF2ZSBhIG5ldyB0cmVlLCB1cGRhdGUgdGhlIGxpc3RcbiAgICAgICAgICBfdXBkYXRlVHJlZUxpc3QoKTtcblxuICAgICAgICAgIC8vIHNob3cgdGhlIHRyZWUgc2hhcmUgYnRuc1xuICAgICAgICAgICQoXCIjc2hhcmUtdHJlZS1idG5cIikuc2hvdygpO1xuICAgICAgICAgICQoXCIjbG9hZGVkLXRyZWUtbmFtZVwiKS5odG1sKG5hbWUpLnBhcmVudCgpLnNob3coKTtcblxuICAgICAgICAgIC8vIHNldCB0aGUgbG9hZGVkIHRyZWVzXG4gICAgICAgICAgbG9hZGVkVHJlZSA9IHJlc3AuaWQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgKTtcbn1cblxuLyoqKlxuICogVXBkYXRlIHRoZSBjdXJyZW50bHkgbG9hZGVkIGdvb2dsZSBkcml2ZSBmaWxlXG4gKioqL1xuZnVuY3Rpb24gX3VwZGF0ZUN1cnJlbnRGaWxlKCkge1xuICBnYSgnc2VuZCcsICdldmVudCcsICd1aScsICdpbnRlcmFjdGlvbicsICd1cGRhdGUtZHJpdmUtZmlsZScsIDEpO1xuXG4gIC8vIGxldCB0aGUgdXNlciBrbm93IHdoYXQgd2UgYXJlIGRvaW5nXG4gIF9zZXRTYXZlTWVzc2FnZSgnPGkgY2xhc3M9XCJpY29uLXNwaW5uZXIgaWNvbi1zcGluXCI+PC9pPiBVcGRhdGluZy4uLicsJ2luZm8nKTtcblxuICB2YXIgZmlsZSA9IHt9O1xuICB2YXIgZGF0YSA9IHt9O1xuXG4gIC8vIGdyYWIgdGhlIGNvcnJlbnQgZGF0YSBhbmQgZmlsZWlkIGJhc2VkIG9uIG1pbWVUeXBlXG4gIGlmKCBzYXZlTWltZVR5cGUgPT0gTUlNRV9UWVBFICkge1xuICAgIGZpbGUgPSBsb2FkZWRGaWxlO1xuICAgIGRhdGEgPSBtb2RlbElPLmV4cG9ydFNldHVwKCk7XG4gIH0gZWxzZSBpZiAoIHNhdmVNaW1lVHlwZSA9PSBUUkVFX01JTUVfVFlQRSApIHtcbiAgICBmaWxlID0gbG9hZGVkVHJlZTtcbiAgICBkYXRhID0gbW9kZWxJTy5leHBvcnRTZXR1cCgpLnRyZWU7XG4gIH0gZWxzZSB7IC8vIGJhZG5lc3NcbiAgICBhbGVydChcIlVua25vd24gTUlNRV9UWVBFOiBcIitzYXZlTWltZVR5cGUpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIHVwZGF0ZSB0aGUgZ29vZ2xlIGRyaXZlIGZpbGVcbiAgdXBkYXRlRmlsZShmaWxlLFxuICAgICAgZGF0YSxcbiAgICAgIGZ1bmN0aW9uKHJlc3Ape1xuICAgICAgICAvLyBsZXQgdGhlIHVzZXIga25vdyB3aGF0IGhhcHBlbmVkXG4gICAgICAgIGlmKCByZXNwLmVycm9yICkgcmV0dXJuIF9zZXRTYXZlTWVzc2FnZSgnRmFpbGVkIHRvIHVwZGF0ZSBvbiBHb29nbGUgRHJpdmUgOignLCdkYW5nZXInKTtcbiAgICAgICAgZWxzZSBfc2V0U2F2ZU1lc3NhZ2UoJ1VwZGF0ZSBTdWNjZXNzZnVsLicsJ3N1Y2Nlc3MnKTtcblxuICAgICAgICAvLyB3YWl0IGEgdGljayBzbyB0aGUgdXNlciBrbm93cyB1cGRhdGUgd2FzIHN1Y2Nlc3NcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICQoXCIjc2F2ZS1tb2RhbFwiKS5tb2RhbCgnaGlkZScpO1xuICAgICAgICB9LDE1MDApO1xuXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgbGlzdCBmb3Igd2hhdGV2ZXIgdHlwZSB3YXMgdXBkYXRlZFxuICAgICAgICBpZiggc2F2ZU1pbWVUeXBlID09IE1JTUVfVFlQRSApIHtcbiAgICAgICAgICBfdXBkYXRlRmlsZUxpc3QoKTtcbiAgICAgICAgfSBlbHNlIGlmICggc2F2ZU1pbWVUeXBlID09IFRSRUVfTUlNRV9UWVBFICkge1xuICAgICAgICAgIF91cGRhdGVUcmVlTGlzdCgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICk7XG59XG5cbi8qKipcbiAqIHNldCBhIG1lc3NhZ2UgZm9yIHRoZSAnbG9hZCBmcm9tIGRyaXZlJyBwb3B1cC5cbiAqICB0eXBlIC0gYm9vc3RyYXAgYWxlcnQgdHlwZVxuICoqKi9cbmZ1bmN0aW9uIF9zZXRMb2FkTWVzc2FnZShtc2csIHR5cGUpIHtcbiAgaWYoICFtc2cgKSByZXR1cm4gJChcIiNnZHJpdmUtZmlsZS1tc2dcIikuaHRtbChcIlwiKTtcbiAgJCgnI2dkcml2ZS1maWxlLW1zZycpLmh0bWwoJzxkaXYgY2xhc3M9XCJhbGVydCBhbGVydC0nK3R5cGUrJ1wiPicrbXNnKyc8L2Rpdj4nKTtcbn1cblxuLyoqKlxuICogc2V0IGEgbWVzc2FnZSBmb3IgdGhlICdzYXZlIHRvIGRyaXZlJyBwb3B1cFxuICogdHlwZSAtIGJvb3N0cmFwIGFsZXJ0IHR5cGVcbiAqKiovXG5mdW5jdGlvbiBfc2V0U2F2ZU1lc3NhZ2UobXNnLCB0eXBlKSB7XG4gIGlmKCAhbXNnICkgcmV0dXJuICQoXCIjZ2RyaXZlLXNhdmUtbXNnXCIpLmh0bWwoXCJcIik7XG4gICQoJyNnZHJpdmUtc2F2ZS1tc2cnKS5odG1sKCc8ZGl2IGNsYXNzPVwiYWxlcnQgYWxlcnQtJyt0eXBlKydcIj4nK21zZysnPC9kaXY+Jyk7XG59XG5cbi8qKipcbiAqIGNyZWF0ZSB0aGUgdG9wIHJpZ2h0IG1lbnUuIFRoaXMgbWVudSBpcyBmb3Igd2hlbiB0aGUgdXNlciBpcyBub3QgbG9nZ2VkIGluXG4gKioqL1xuZnVuY3Rpb24gX2NyZWF0ZUxvZ2luQnRuKCkge1xuICB2YXIgYnRuID0gJCgnPGxpIGNsYXNzPVwiZHJvcGRvd25cIj4nXG4gICAgICArICc8YSBjbGFzcz1cImRyb3Bkb3duLXRvZ2dsZVwiIHN0eWxlPVwiY3Vyc29yOnBvaW50ZXJcIj5Mb2dpbjxiIGNsYXNzPVwiY2FyZXRcIj48L2I+PC9hPidcbiAgICAgICsgJzx1bCBjbGFzcz1cImRyb3Bkb3duLW1lbnVcIj4nXG4gICAgICArICc8bGk+PGEgaWQ9XCJoZWxwXCI+PGkgY2xhc3M9XCJpY29uLXF1ZXN0aW9uLXNpZ25cIj48L2k+IEhlbHA8L2E+PC9saT4nXG4gICAgICArICc8bGk+PGEgaWQ9XCJhYm91dFwiPjxpIGNsYXNzPVwiaWNvbi1pbmZvLXNpZ25cIj48L2k+IEFib3V0PC9hPjwvbGk+J1xuICAgICAgKyAnPGxpPjxhIGlkPVwibG9naW4td2l0aC1nb29nbGVcIj48aSBjbGFzcz1cImljb24tc2lnbmluXCI+PC9pPiBMb2dpbiB3aXRoIEdvb2dsZTwvYT48L2xpPidcbiAgICAgICsgJzwvdWw+PC9saT4nKTtcblxuICAvLyBzZXQgY2xpY2sgaGFuZGxlcnMgZm9yIHBvcHVwXG4gIGJ0bi5maW5kKCdhLmRyb3Bkb3duLXRvZ2dsZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgJCh0aGlzKS5wYXJlbnQoKS50b2dnbGVDbGFzcygnb3BlbicpO1xuICB9KTtcblxuICAvLyBhYm91dCBjbGljayBoYW5kbGVyXG4gIGJ0bi5maW5kKCcjYWJvdXQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICBidG4udG9nZ2xlQ2xhc3MoJ29wZW4nKTtcbiAgICAkKFwiI2Fib3V0LW1vZGFsXCIpLm1vZGFsKCdzaG93Jyk7XG4gIH0pO1xuXG4gIGJ0bi5maW5kKCcjaGVscCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgIGJ0bi50b2dnbGVDbGFzcygnb3BlbicpO1xuICAgIHNob3dIZWxwKCk7XG4gIH0pO1xuXG4gIC8vIGxvZ2luIGNsaWNrIGhhbmRsZXJcbiAgYnRuLmZpbmQoJyNsb2dpbi13aXRoLWdvb2dsZScpLm9uKCdjbGljaycsZnVuY3Rpb24oKSB7XG4gICAgZ2EoJ3NlbmQnLCAnZXZlbnQnLCAndWknLCAnaW50ZXJhY3Rpb24nLCAndXNlci1sb2dpbicsIDEpO1xuICAgIGJ0bi50b2dnbGVDbGFzcygnb3BlbicpO1xuICAgIHNpZ25JbihmdW5jdGlvbih0b2tlbikge1xuICAgICAgX3NldFVzZXJJbmZvKCk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIC8vIGFkZCBtZW51XG4gICQoXCIjbG9naW4taGVhZGVyXCIpLmh0bWwoXCJcIikuYXBwZW5kKGJ0bik7XG59O1xuXG4vKioqXG4gKiBDcmVhdGUgdGhlIHRvcCByaWdodCBtZW51IGZvciB3aGVuIHRoZSB1c2VyIGlzIGxvZ2dlZCBpblxuICoqKi9cbmZ1bmN0aW9uIF9jcmVhdGVMb2dvdXRCdG4odXNlcmRhdGEpIHtcbiAgLy8gc2V0IGJ0biBodG1sXG4gIHZhciBidG4gPSAkKCc8bGkgY2xhc3M9XCJkcm9wZG93blwiPidcbiAgICAgICsgJzxhIGNsYXNzPVwiZHJvcGRvd24tdG9nZ2xlXCIgc3R5bGU9XCJjdXJzb3I6cG9pbnRlclwiPjxpbWcgY2xhc3M9XCJpbWctcm91bmRlZFwiIHNyYz1cIicrdXNlcmRhdGEucGljdHVyZVxuICAgICAgKyAnXCIgc3R5bGU9XCJtYXJnaW46LTVweCA1cHggLTVweCAwO3dpZHRoOjI4cHg7aGVpZ2h0OjI4cHg7Ym9yZGVyOjFweCBzb2xpZCB3aGl0ZVwiIC8+ICcgKyB1c2VyZGF0YS5uYW1lXG4gICAgICArICc8YiBjbGFzcz1cImNhcmV0XCI+PC9iPjwvYT4nICsgJzx1bCBjbGFzcz1cImRyb3Bkb3duLW1lbnVcIj4nXG4gICAgICArICc8bGk+PGEgaWQ9XCJzYXZlXCI+PGkgY2xhc3M9XCJpY29uLWNsb3VkLXVwbG9hZFwiPjwvaT4gU2F2ZSBNb2RlbDwvYT48L2xpPidcbiAgICAgICsgJzxsaSBzdHlsZT1cImRpc3BsYXk6bm9uZVwiPjxhIGlkPVwic2hhcmUtYnRuXCI+PGkgY2xhc3M9XCJpY29uLXNoYXJlXCI+PC9pPiBTaGFyZSBNb2RlbDwvYT48L2xpPidcbiAgICAgICsgJzxsaSBzdHlsZT1cImRpc3BsYXk6bm9uZVwiPjxhIGlkPVwib3Blbi1pbi1kcml2ZVwiIHRhcmdldD1cIl9ibGFua1wiPjxpIGNsYXNzPVwiaWNvbi1leHRlcm5hbC1saW5rLXNpZ25cIj48L2k+IE9wZW4gaW4gR29vZ2xlIERyaXZlPC9hPjwvbGk+J1xuICAgICAgKyAnPGxpPjxhIGlkPVwibG9hZFwiPjxpIGNsYXNzPVwiaWNvbi1jbG91ZC1kb3dubG9hZFwiPjwvaT4gTG9hZCBNb2RlbDwvYT48L2xpPidcbiAgICAgICsgJzxsaT48YSBpZD1cImhlbHBcIj48aSBjbGFzcz1cImljb24tcXVlc3Rpb24tc2lnblwiPjwvaT4gSGVscDwvYT48L2xpPidcbiAgICAgICsgJzxsaT48YSBpZD1cImFib3V0XCI+PGkgY2xhc3M9XCJpY29uLWluZm8tc2lnblwiPjwvaT4gQWJvdXQ8L2E+PC9saT4nXG4gICAgICArICc8bGk+PGEgaWQ9XCJsb2dvdXRcIj48aSBjbGFzcz1cImljb24tc2lnbm91dFwiPjwvaT4gTG9nb3V0PC9hPjwvbGk+J1xuICAgICAgKyAnPC91bD48L2xpPicpO1xuXG4gIC8vIGFkZCBjbGljayBoYW5kbGVyIHRvIHNob3cgbWVudVxuICBidG4uZmluZCgnYS5kcm9wZG93bi10b2dnbGUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICQodGhpcykucGFyZW50KCkudG9nZ2xlQ2xhc3MoJ29wZW4nKTtcbiAgfSk7XG5cbiAgLy8gc2hvdyB0aGUgc2F2ZSBwb3B1cFxuICBidG4uZmluZCgnI3NhdmUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAvLyBzZXQgdGhlIGN1cnJlbnQgc2F2ZSBtaW1lVHlwZVxuICAgIHNhdmVNaW1lVHlwZSA9IE1JTUVfVFlQRTtcblxuICAgIC8vIGxldCB0aGUgdXNlciBrbm93IHdoYXQgdHlwIHRoZXkgYXJlIHNhdmluZ1xuICAgICQoXCIjZ2RyaXZlLXNhdmUtc3ViaGVhZGVyXCIpLmh0bWwoXCI8aDU+U2F2ZSBNb2RlbDwvaDU+XCIpO1xuXG4gICAgYnRuLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XG5cbiAgICAvLyBpZiB0aGUgZmlsZSBpcyBsb2FkZWQsIHNob3cgdGhlIHVwZGF0ZSBwYW5lbFxuICAgIGlmKCBsb2FkZWRGaWxlICE9IG51bGwpIHtcbiAgICAgIC8vIGdyYWIgdGhlIGN1cnJlbnQgZmlsZXMgbWV0YWRhdGFcbiAgICAgIHZhciBmaWxlID0ge307XG4gICAgICBmb3IoIHZhciBpID0gMDsgaSA8IGZpbGVMaXN0Lmxlbmd0aDsgaSsrICkge1xuICAgICAgICBpZiggZmlsZUxpc3RbaV0uaWQgPT0gbG9hZGVkRmlsZSkge1xuICAgICAgICAgIGZpbGUgPSBmaWxlTGlzdFtpXTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBzaG93IHRoZSB1cGRhdGUgcGFuZWxcbiAgICAgICQoXCIjc2F2ZS11cGRhdGUtcGFuZWxcIikuc2hvdygpO1xuXG4gICAgICAvLyByZW5kZXIgdGhlIGZpbGVzIG1ldGFkYXRhIGluIHRoZSB1cGRhdGUgcGFuZWxcbiAgICAgIHZhciBkID0gbmV3IERhdGUoZmlsZS5tb2RpZmllZERhdGUpO1xuICAgICAgJChcIiNzYXZlLXVwZGF0ZS1wYW5lbC1pbm5lclwiKS5odG1sKFwiPGI+XCIrZmlsZS50aXRsZStcIjwvYj48YnIgLz5cIiArXG4gICAgICAgICAgXCI8c3BhbiBzdHlsZT0nY29sb3I6Izg4OCc+XCIrZmlsZS5kZXNjcmlwdGlvbitcIjwvc3Bhbj48YnIgLz5cIitcbiAgICAgICAgICBcIjxzcGFuIHN0eWxlPSdmb250LXN0eWxlOml0YWxpYztmb250LXNpemU6MTFweDsnPkxhc3QgTW9kaWZpZWQ6IFwiICtcbiAgICAgICAgICBkLnRvRGF0ZVN0cmluZygpK1wiIFwiK2QudG9Mb2NhbGVUaW1lU3RyaW5nKCkrXCIgYnkgXCIrZmlsZS5sYXN0TW9kaWZ5aW5nVXNlck5hbWUrXCI8L3NwYW4+PGJyIC8+XCIrXG4gICAgICAgICAgXCI8YSBocmVmPSdodHRwczovL2RyaXZlLmdvb2dsZS5jb20vZmlsZS9kL1wiK2ZpbGUuaWQrXCInJyB0YXJnZXQ9J19ibGFuayc+PGkgY2xhc3M9J2ljb24tbGluayc+PC9pPiBcIiArXG4gICAgICAgICAgXCJMaW5rIHRvIFNoYXJlPC9hPiA8c3BhbiBzdHlsZT0nY29sb3I6Izg4OCc+KG11c3QgaGF2ZSBwZXJtaXNzaW9uKTwvc3Bhbj48YnIgLz48YnIgLz5cIik7XG4gICAgfSBlbHNlIHtcbiAgICAgICQoXCIjc2F2ZS11cGRhdGUtcGFuZWxcIikuaGlkZSgpO1xuICAgIH1cblxuICAgIC8vIGNsZWFyIGFueSBtZXNzYWdlXG4gICAgX3NldFNhdmVNZXNzYWdlKG51bGwpO1xuXG4gICAgLy8gc2hvdyB0aGUgc2F2ZSBwb3B1cFxuICAgICQoXCIjc2F2ZS1tb2RhbFwiKS5tb2RhbCgnc2hvdycpO1xuICB9KTtcblxuICAvLyBjbGljayBoYW5kbGVyIGZvciBzaGFyZSBidG5cbiAgYnRuLmZpbmQoXCIjc2hhcmUtYnRuXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgZ2EoJ3NlbmQnLCAnZXZlbnQnLCAndWknLCAnaW50ZXJhY3Rpb24nLCAnb3Blbi1kcml2ZS1zaGFyZScsIDEpO1xuXG4gICAgLy8gaGFzIHRoZSBzaGFyZSBjbGllbnQgYmVlbiBsb2FkZWRcbiAgICBpZiggY2xpZW50ID09IG51bGwgKSB7XG4gICAgICAvLyBsb2FkIHRoZSBzaGFyZSBwb3B1cFxuICAgICAgZ2FwaS5sb2FkKCdkcml2ZS1zaGFyZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgIC8vIGNyZWF0ZSBhbmQgc2hvdyB0aGUgc2hhcmUgcG9wdXBcbiAgICAgICAgIGNsaWVudCA9IG5ldyBnYXBpLmRyaXZlLnNoYXJlLlNoYXJlQ2xpZW50KE9hdXRoLkFQUF9JRCk7XG4gICAgICAgICAgY2xpZW50LnNldEl0ZW1JZHMoW2xvYWRlZEZpbGVdKTtcbiAgICAgICAgIGNsaWVudC5zaG93U2V0dGluZ3NEaWFsb2coKTtcbiAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gc2hvdyB0aGUgc2hhcmUgcG9wdXBcbiAgICAgIGNsaWVudC5zZXRJdGVtSWRzKFtsb2FkZWRGaWxlXSk7XG4gICAgICAgY2xpZW50LnNob3dTZXR0aW5nc0RpYWxvZygpO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gc2hvdyBhYm91dCBwYW5lbFxuICBidG4uZmluZCgnI2Fib3V0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgYnRuLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XG4gICAgJChcIiNhYm91dC1tb2RhbFwiKS5tb2RhbCgnc2hvdycpO1xuICB9KTtcblxuICBidG4uZmluZCgnI2hlbHAnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICBidG4udG9nZ2xlQ2xhc3MoJ29wZW4nKTtcbiAgICBzaG93SGVscCgpO1xuICB9KTtcblxuICAvLyBzaG93IHRoZSAnbG9hZCBmcm9tIGRyaXZlJyBwYW5lbFxuICBidG4uZmluZCgnI2xvYWQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICBidG4udG9nZ2xlQ2xhc3MoJ29wZW4nKTtcblxuICAgIC8vIGhpZGUgYW55IGV4aXN0aW5nIG1lc3NhZ2VcbiAgICBfc2V0TG9hZE1lc3NhZ2UobnVsbCk7XG5cbiAgICAvLyByZW5kZXIgdGhlIG1vZGVsIGZpbGVzIGluIHRoZSBwb3B1cCBmaWxlc1xuICAgIF9zaG93RHJpdmVGaWxlcygpO1xuXG4gICAgLy8gc2hvdyB0aGUgbW9kYWxcbiAgICAkKFwiI2xvYWQtbW9kYWxcIikubW9kYWwoJ3Nob3cnKTtcbiAgfSk7XG5cbiAgLy8gbG9hZCB0aGUgdXNlciBvdXRcbiAgYnRuLmZpbmQoJyNsb2dvdXQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICBnYSgnc2VuZCcsICdldmVudCcsICd1aScsICdpbnRlcmFjdGlvbicsICd1c2VyLWxvZ291dCcsIDEpO1xuXG4gICAgYnRuLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XG5cbiAgICAvLyBraWxsIHRoZSBhY2Nlc3MgdG9rZW5cbiAgICB0b2tlbiA9IG51bGw7XG5cbiAgICAvLyB1cGRhdGUgdGhlIG1lbnUgcGFuZWxcbiAgICBfY3JlYXRlTG9naW5CdG4oKTtcbiAgfSk7XG5cbiAgLy8gYXR0YWNoIHRoZSBtZW51XG4gICQoXCIjbG9naW4taGVhZGVyXCIpLmh0bWwoXCJcIikuYXBwZW5kKGJ0bik7XG59O1xuXG4vKioqXG4gKiAgUmVxdWVzdCB0aGUgdXNlcidzIGluZm9ybWF0aW9uLiAgV2hlbiBsb2FkZWQsIHVwZGF0ZSB0aGUgdG9wIHJpZ2h0IG1lbnVcbiAqKiovXG5mdW5jdGlvbiBfc2V0VXNlckluZm8oKSB7XG4gIC8vIGxvYWQgdXNlciBuYW1lXG4gICQuYWpheCh7XG4gICAgdXJsIDogXCJodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9vYXV0aDIvdjEvdXNlcmluZm9cIixcbiAgICBiZWZvcmVTZW5kIDogZnVuY3Rpb24ocmVxdWVzdCkge1xuICAgICAgLy8gYWx3YXlzIHNldCB5b3VyIGFjY2VzcyBzdG9rZW5cbiAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihcIkF1dGhvcml6YXRpb25cIiwnQmVhcmVyICcrIHRva2VuLmFjY2Vzc190b2tlbik7XG4gICAgfSxcbiAgICBzdWNjZXNzIDogZnVuY3Rpb24oZGF0YSwgc3RhdHVzLHhocikge1xuICAgICAgLy8gcGFyc2UgeW91ciBqc29uIHJlc3BvbnNlXG4gICAgICB0cnkge1xuICAgICAgICBkYXRhID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHt9XG5cbiAgICAgIC8vIHVwZGF0ZSB0b3AgcmlnaHQgbWVudVxuICAgICAgX2NyZWF0ZUxvZ291dEJ0bihkYXRhKTtcblxuICAgICAgLy8gc2V0IHRvIHdpbmRvdyBzY29wZVxuICAgICAgd2luZG93LnVzZXJpbmZvID0gZGF0YTtcbiAgICB9LFxuICAgIGVycm9yIDogZnVuY3Rpb24oKSB7XG4gICAgICAvLyBUT0RPOiBzaG91bGQgd2UgYWxlcnQgdGhpcz9cbiAgICB9XG4gIH0pO1xuXG4gIC8vIGxvYWQgdXNlciBmaWxlcywgdHJlZXNcbiAgX3VwZGF0ZUZpbGVMaXN0KCk7XG4gIF91cGRhdGVUcmVlTGlzdCgpO1xufVxuXG4vKioqXG4gKiAgU2VhcmNoIGZvciB0aGUgdXNlcnMgbW9kZWxzXG4gKlxuICogVE9ETzogYWRkIHNlYXJjaCB0byB0aGUgZm9sbG93aW5nIGZ1bmN0aW9ucyxcbiAqICBsaW1pdCB0byAxMCByZXN1bHRzXG4gKioqL1xuZnVuY3Rpb24gX3VwZGF0ZUZpbGVMaXN0KCkge1xuICBsaXN0RmlsZXMoXCJtaW1lVHlwZSA9ICdcIitNSU1FX1RZUEUrXCInXCIsIGZ1bmN0aW9uKHJlc3Ape1xuICAgIGZpbGVMaXN0ID0gcmVzcC5yZXN1bHQuaXRlbXM7XG4gIH0pO1xufVxuXG4vKioqXG4gKiAgU2VhcmNoIGZvciB0aGUgdXNlcnMgdHJlZXNcbiAqXG4gKiBUT0RPOiBhZGQgc2VhcmNoIHRvIHRoZSBmb2xsb3dpbmcgZnVuY3Rpb25zLFxuICogIGxpbWl0IHRvIDEwIHJlc3VsdHNcbiAqKiovXG5mdW5jdGlvbiBfdXBkYXRlVHJlZUxpc3QoKSB7XG4gIGxpc3RGaWxlcyhcIm1pbWVUeXBlID0gJ1wiK1RSRUVfTUlNRV9UWVBFK1wiJ1wiLCBmdW5jdGlvbihyZXNwKXtcbiAgICB0cmVlTGlzdCA9IHJlc3AucmVzdWx0Lml0ZW1zO1xuICB9KTtcbn1cblxuLyoqKlxuICogIFJlbmRlciB0aGUgdXNlcnMgY3VycmVudCBtb2RlbHMgb250byB0aGUgJ2xvYWQgZnJvbSBkcml2ZScgcG9wdXBcbiAqKiovXG5mdW5jdGlvbiBfc2hvd0RyaXZlRmlsZXMoKSB7XG4gIC8vIGlmIHRoZXkgaGF2ZSBubyBmaWxlcywgc2F5IHNvIGFuZCBnZXQgb3V0IG9mIGhlcmVcbiAgaWYoICFmaWxlTGlzdCApIHJldHVybiAkKFwiI2dkcml2ZS1maWxlLWxpc3RcIikuaHRtbChcIjxsaT5ObyBGaWxlczwvbGk+XCIpO1xuICBpZiggZmlsZUxpc3QubGVuZ3RoID09IDAgKSByZXR1cm4gJChcIiNnZHJpdmUtZmlsZS1saXN0XCIpLmh0bWwoXCI8bGk+Tm8gRmlsZXM8L2xpPlwiKTtcblxuICAvLyBzaG93IGEgdGl0bGUsIHRoZXJlIGFyZSBtdWx0aXBsZSB0eXBlcyB0aGF0IGNhbiBiZSBsb2FkZWQgZnJvbSBkcml2ZVxuICAkKFwiI2dkcml2ZS1maWxlLWxpc3RcIikuaHRtbChcIjxoND5TZWxlY3QgRmlsZTwvaDQ+XCIpO1xuXG4gIC8vIGNyZWF0ZSB0aGUgbGlzdCBlbGVtZW50cyBmb3IgZWFjaCBmaWxlcyBtZXRhZGF0YVxuICBmb3IoIHZhciBpID0gMDsgaSA8IGZpbGVMaXN0Lmxlbmd0aDsgaSsrICkge1xuICAgIHZhciBpdGVtID0gZmlsZUxpc3RbaV07XG4gICAgdmFyIGQgPSBuZXcgRGF0ZShpdGVtLm1vZGlmaWVkRGF0ZSk7XG4gICAgJChcIiNnZHJpdmUtZmlsZS1saXN0XCIpLmFwcGVuZChcbiAgICAgICQoXCI8bGkgY2xhc3M9J2xpc3QtZ3JvdXAtaXRlbSc+PGEgaWQ9J1wiK2l0ZW0uaWQrXCInIHVybD0nXCIraXRlbS5kb3dubG9hZFVybCtcIicgc3R5bGU9J2N1cnNvcjpwb2ludGVyJz48aSBjbGFzcz0naWNvbi1maWxlJz48L2k+IFwiK2l0ZW0udGl0bGUrXCI8L2E+XCIgK1xuICAgICAgICBcIjxkaXYgc3R5bGU9J2NvbG9yOiM4ODg7cGFkZGluZzogNXB4IDAgMCAxMHB4Jz5cIitpdGVtLmRlc2NyaXB0aW9uK1wiPC9kaXY+XCIrXG4gICAgICAgIFwiPGRpdiBzdHlsZT0nZm9udC1zdHlsZTppdGFsaWM7Zm9udC1zaXplOjExcHg7cGFkZGluZy1sZWZ0OjEwcHgnPkxhc3QgTW9kaWZpZWQ6IFwiK2QudG9EYXRlU3RyaW5nKCkrXCIgXCIrZC50b0xvY2FsZVRpbWVTdHJpbmcoKStcIiBieSBcIitpdGVtLmxhc3RNb2RpZnlpbmdVc2VyTmFtZStcIjxkaXY+PC9saT5cIlxuICAgICAgICApXG4gICAgKTtcbiAgfVxuXG4gIC8vIGFkZCBjbGljayBoYW5kbGVyIGZvciBlYWNoIGZpbGVcbiAgJChcIiNnZHJpdmUtZmlsZS1saXN0IGFcIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICBnYSgnc2VuZCcsICdldmVudCcsICd1aScsICdpbnRlcmFjdGlvbicsICdsb2FkLWRyaXZlLW1vZGVsJywgMSk7XG5cbiAgICB2YXIgaWQgPSAkKHRoaXMpLmF0dHIoXCJpZFwiKTtcblxuICAgIC8vIGxldCB0aGUgdXNlciBrbm93IHdoYXQgd2UgYXJlIGRvaW5nXG4gICAgX3NldExvYWRNZXNzYWdlKCc8aSBjbGFzcz1cImljb24tc3Bpbm5lciBpY29uLXNwaW5cIj48L2k+IExvYWRpbmcgRmlsZS4uLicsJ2luZm8nKTtcblxuICAgIC8vIGdyYWIgdGhlIGZpdmUgZnJvbSBkcml2ZVxuICAgIGdldEZpbGUoaWQsICQodGhpcykuYXR0cihcInVybFwiKSwgZnVuY3Rpb24oZmlsZSkge1xuICAgICAgLy8gaWYgYmFkbmVzcywgbGV0IHRoZSB1c2VyIGtub3dcbiAgICAgIGlmKCAhZmlsZSAgKSByZXR1cm4gX3NldExvYWRNZXNzYWdlKCdGYWlsZWQgdG8gbG9hZCBmaWxlIGZyb20gR29vZ2xlIERyaXZlIDooJywnZGFuZ2VyJyk7XG4gICAgICBpZiggZmlsZS5lcnJvciAgKSByZXR1cm4gX3NldExvYWRNZXNzYWdlKCdGYWlsZWQgdG8gbG9hZCBmaWxlIGZyb20gR29vZ2xlIERyaXZlIDooJywnZGFuZ2VyJyk7XG5cbiAgICAgIC8vIGhpZGUgYW55IGxvYWRlZCB0cmVlcyxcbiAgICAgICQoXCIjc2hhcmUtdHJlZS1idG5cIikuaGlkZSgpO1xuICAgICAgJChcIiNsb2FkZWQtdHJlZS1uYW1lXCIpLmh0bWwoXCJcIikucGFyZW50KCkuaGlkZSgpO1xuICAgICAgbG9hZGVkVHJlZSA9IG51bGw7XG5cbiAgICAgIC8vIGxldCB0aGUgdXNlciBrbm93IHdlIGFyZSBhbGwgZ29vZFxuICAgICAgX3NldExvYWRNZXNzYWdlKCdGaWxlIExvYWRlZC4nLCdzdWNjZXNzJyk7XG5cbiAgICAgIC8vIHNldCB0aGUgbG9hZGVkIGZpbGUgaWRcbiAgICAgIGxvYWRlZEZpbGUgPSBpZDtcblxuICAgICAgLy8gc2V0IHRoZSBsb2FkZWQgZmlsZSBuYW1lXG4gICAgICBmb3IoIHZhciBpID0gMDsgaSA8IGZpbGVMaXN0Lmxlbmd0aDsgaSsrICkge1xuICAgICAgICBpZiggaWQgPT0gZmlsZUxpc3RbaV0uaWQgKSB7XG4gICAgICAgICAgJChcIiNsb2FkZWQtbW9kZWwtdGl0bGVcIikuaHRtbChcIjxzcGFuIHN0eWxlPSdjb2xvcjojMzMzJz5Mb2FkZWQgTW9kZWwgPC9zcGFuPiBcIitmaWxlTGlzdFtpXS50aXRsZSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gc2hvdyB0aGUgc2hhcmUgYnRuXG4gICAgICAkKFwiI3NoYXJlLWJ0blwiKS5wYXJlbnQoKS5zaG93KCk7XG4gICAgICAkKFwiI29wZW4taW4tZHJpdmVcIikuYXR0cihcImhyZWZcIixcImh0dHBzOi8vZG9jcy5nb29nbGUuY29tL2ZpbGUvZC9cIitpZCkucGFyZW50KCkuc2hvdygpO1xuXG4gICAgICAvLyBzZXR1cCBtb2RlbFxuICAgICAgbW9kZWxJTy5sb2FkU2V0dXAoaWQsIGZpbGUpO1xuXG4gICAgICAvLyBzZXR1cCByZWFsdGltZSBldmVudHNcbiAgICAgIGdkcml2ZVJULmluaXRSdEFwaShsb2FkZWRGaWxlKTtcblxuICAgICAgLy8gd2FpdCBhIHRpY2sgc28gdXNlciBjYW4gc2VlIHN1Y2Nlc3MgbWVzc2FnZVxuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAvLyBoaWRlIHRoZSBtb2RhbFxuICAgICAgICAkKFwiI2xvYWQtbW9kYWxcIikubW9kYWwoJ2hpZGUnKTtcbiAgICAgIH0sMTUwMCk7XG5cbiAgICB9KTtcbiAgfSk7XG59XG5cbi8qKipcbiAqICBSZW5kZXIgdGhlIHVzZXJzIGN1cnJlbnQgdHJlZXMgb250byB0aGUgJ2xvYWQgZnJvbSBkcml2ZScgcG9wdXBcbiAqKiovXG5mdW5jdGlvbiBfc2hvd1RyZWVGaWxlcygpIHtcbiAgLy8gdXBkYXRlIHRoZSBsaXN0IGhlYWRlciwgbGV0IHVzZXIga25vdyB3aGF0IHRoZXkgYXJlIHNlbGVjdGluZ1xuICAkKFwiI2dkcml2ZS1maWxlLWxpc3RcIikuaHRtbChcIlwiKTtcbiAgJChcIiNnZHJpdmUtZmlsZS1saXN0XCIpLmFwcGVuZCgkKFwiPGxpIGNsYXNzPSdsaXN0LWdyb3VwLWl0ZW0nPjxoNT5TZWxlY3QgVHJlZTwvaDU+PC9saT5cIikpO1xuXG4gIC8vIGlmIHRoZXJlIGFyZSBubyB0cmVlcywgc2F5IHNvIGFuZCBnZXQgb3V0IG9mIGhlcmVcbiAgaWYoICF0cmVlTGlzdCApIHJldHVybiAkKFwiI2dkcml2ZS1maWxlLWxpc3RcIikuYXBwZW5kKCQoXCI8bGkgY2xhc3M9J2xpc3QtZ3JvdXAtaXRlbSc+Tm8gVHJlZXMgQXZhaWxhYmxlPC9saT5cIikpO1xuICBpZiggdHJlZUxpc3QubGVuZ3RoID09IDAgKSByZXR1cm4gJChcIiNnZHJpdmUtZmlsZS1saXN0XCIpLmFwcGVuZCgkKFwiPGxpIGNsYXNzPSdsaXN0LWdyb3VwLWl0ZW0nPk5vIFRyZWVzIEF2YWlsYWJsZTwvbGk+XCIpKTtcblxuICAvLyBjcmVhdGUgdGhlIHRyZWUgbGlzdCBlbGVtZW50c1xuICBmb3IoIHZhciBpID0gMDsgaSA8IHRyZWVMaXN0Lmxlbmd0aDsgaSsrICkge1xuICAgIHZhciBpdGVtID0gdHJlZUxpc3RbaV07XG4gICAgdmFyIGQgPSBuZXcgRGF0ZShpdGVtLm1vZGlmaWVkRGF0ZSk7XG4gICAgJChcIiNnZHJpdmUtZmlsZS1saXN0XCIpLmFwcGVuZChcbiAgICAgICQoXCI8bGkgY2xhc3M9J2xpc3QtZ3JvdXAtaXRlbSc+PGEgaWQ9J1wiK2l0ZW0uaWQrXCInIG5hbWU9J1wiK2l0ZW0udGl0bGUrXCInIHVybD0nXCIraXRlbS5kb3dubG9hZFVybCtcIicgc3R5bGU9J2N1cnNvcjpwb2ludGVyJz48aSBjbGFzcz0naWNvbi1sZWFmJz48L2k+IFwiK2l0ZW0udGl0bGUrXCI8L2E+XCIgK1xuICAgICAgICBcIjxkaXYgc3R5bGU9J2NvbG9yOiM4ODg7cGFkZGluZzogNXB4IDAgMCAxMHB4Jz5cIitpdGVtLmRlc2NyaXB0aW9uK1wiPC9kaXY+XCIrXG4gICAgICAgIFwiPGRpdiBzdHlsZT0nZm9udC1zdHlsZTppdGFsaWM7Zm9udC1zaXplOjExcHg7cGFkZGluZy1sZWZ0OjEwcHgnPkxhc3QgTW9kaWZpZWQ6IFwiK2QudG9EYXRlU3RyaW5nKCkrXCIgXCIrZC50b0xvY2FsZVRpbWVTdHJpbmcoKStcIiBieSBcIitpdGVtLmxhc3RNb2RpZnlpbmdVc2VyTmFtZStcIjxkaXY+PC9saT5cIlxuICAgICAgICApXG4gICAgKTtcbiAgfVxuXG4gIC8vIGFkZCBjbGljayBoYW5kbGVyIGZvciB0aXRsZXNcbiAgJChcIiNnZHJpdmUtZmlsZS1saXN0IGFcIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICBnYSgnc2VuZCcsICdldmVudCcsICd1aScsICdpbnRlcmFjdGlvbicsICdsb2FkLWRyaXZlLXRyZWUnLCAxKTtcblxuICAgIHZhciBpZCA9ICQodGhpcykuYXR0cihcImlkXCIpO1xuICAgIHZhciBuYW1lID0gJCh0aGlzKS5hdHRyKFwibmFtZVwiKTtcblxuICAgIC8vIHRlbGwgdGhlIHVzZXIgd2UgYXJlIGxvYWRpbmdcbiAgICBfc2V0TG9hZE1lc3NhZ2UoJzxpIGNsYXNzPVwiaWNvbi1zcGlubmVyIGljb24tc3BpblwiPjwvaT4gTG9hZGluZyBUcmVlLi4uJywnaW5mbycpO1xuXG4gICAgLy8gbG9hZCBmaWxlIGZyb20gZHJpdmVcbiAgICBnZXRGaWxlKGlkLCAkKHRoaXMpLmF0dHIoXCJ1cmxcIiksIGZ1bmN0aW9uKGZpbGUpIHtcbiAgICAgIC8vIGlmIGJhZG5lc3MsIGxldCB1c2VyIGtub3dcbiAgICAgIGlmKCAhZmlsZSAgKSByZXR1cm4gX3NldExvYWRNZXNzYWdlKCdGYWlsZWQgdG8gbG9hZCB0cmVlIGZyb20gR29vZ2xlIERyaXZlIDooJywnZGFuZ2VyJyk7XG4gICAgICBpZiggZmlsZS5lcnJvciAgKSByZXR1cm4gX3NldExvYWRNZXNzYWdlKCdGYWlsZWQgdG8gbG9hZCB0cmVlIGZyb20gR29vZ2xlIERyaXZlIDooJywnZGFuZ2VyJyk7XG5cbiAgICAgIC8vIHNob3cgdGhlIHRyZWUgc2hhcmluZyBidG5zXG4gICAgICAkKFwiI3NoYXJlLXRyZWUtYnRuXCIpLnNob3coKTtcbiAgICAgICQoXCIjbG9hZGVkLXRyZWUtbmFtZVwiKS5odG1sKG5hbWUpLnBhcmVudCgpLnNob3coKTtcblxuICAgICAgLy8gbGV0IHRoZSB1c2VyIGtub3cgd2UgYXJlIHN1Y2Nlc2Z1bGxcbiAgICAgIF9zZXRMb2FkTWVzc2FnZSgnVHJlZSBMb2FkZWQuJywnc3VjY2VzcycpO1xuXG4gICAgICAvLyBzZXQgdGhlIGxvYWRlZCB0cmVlIGlkXG4gICAgICBsb2FkZWRUcmVlID0gaWQ7XG5cbiAgICAgIC8vIGxvYWRlZCB0cmVlIGludG8gbW9kZWwgLyBVSVxuICAgICAgbW9kZWxJTy5sb2FkVHJlZShmaWxlKTtcblxuICAgICAgLy8gd2FpdCBhIHNlYyBzbyB1c2VyIGNhbiBzZWUgc3VjY2VzcyBtZXNzYWdlXG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICQoXCIjbG9hZC1tb2RhbFwiKS5tb2RhbCgnaGlkZScpO1xuICAgICAgfSwxNTAwKTtcblxuICAgIH0pO1xuICB9KTtcbn1cblxuLyoqKlxuICogIHNob3cgdGhlIHVzZXIgdGhlIGxvYWQgdHJlZSBwb3B1cFxuICoqKi9cbmZ1bmN0aW9uIHNob3dMb2FkVHJlZVBhbmVsKCkge1xuICAvLyByZW5kZXIgdGhlIHRyZWVzIGludG8gdGhlIHBvcHVwIGxpc3RcbiAgX3Nob3dUcmVlRmlsZXMoKTtcbiAgLy8gY2xlYXIgYW55IG1lc3NhZ2VzXG4gIF9zZXRMb2FkTWVzc2FnZShudWxsKTtcbiAgLy8gc2hvdyB0aGUgcG9wdXBcbiAgJChcIiNsb2FkLW1vZGFsXCIpLm1vZGFsKCdzaG93Jyk7XG59XG5cbi8qKipcbiAqICBzaG93IHRoZSB1c2VyIHRoZSBzYXZlIHRyZWUgcG9wdXBcbiAqKiovXG5mdW5jdGlvbiBzaG93U2F2ZVRyZWVQYW5lbCgpIHtcbiAgLy8gc2V0IHRoZSBjdXJyZW50IG1pbWVUeXBlIHdlIGFyZSBzYXZpbmdcbiAgc2F2ZU1pbWVUeXBlID0gVFJFRV9NSU1FX1RZUEU7XG5cbiAgLy8gc2V0IHRoZSBoZWFkZXIgc28gdXNlciBrbm93cyB3aGF0IHR5cGUgdGhleSBhcmUgc2F2aW5nXG4gICQoXCIjZ2RyaXZlLXNhdmUtc3ViaGVhZGVyXCIpLmh0bWwoXCI8aDU+U2F2ZSBUcmVlPC9oNT5cIik7XG5cbiAgLy8gaWYgdGhlcmUgaXMgYSBjdXJyZW50IHRyZWUsIHNob3cgdGhlIHVwZGF0ZSBwYW5lbFxuICBpZiggbG9hZGVkVHJlZSAhPSBudWxsKSB7XG4gICAgLy8gZmluZCB0aGUgY3VycmVudCB0cmVlIGJhc2VkIG9uIGlkXG4gICAgdmFyIHRyZWUgPSB7fTtcbiAgICBmb3IoIHZhciBpID0gMDsgaSA8IHRyZWVMaXN0Lmxlbmd0aDsgaSsrICkge1xuICAgICAgaWYoIHRyZWVMaXN0W2ldLmlkID09IGxvYWRlZFRyZWUpIHtcbiAgICAgICAgdHJlZSA9IHRyZWVMaXN0W2ldO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBzaG93IHRoZSB1cGRhdGUgcGFuZWxcbiAgICAkKFwiI3NhdmUtdXBkYXRlLXBhbmVsXCIpLnNob3coKTtcblxuICAgIC8vIHJlbmRlciB0cmVlIG1ldGFkYXRhIG9uIHVwZGF0ZSBwYW5lbFxuICAgIHZhciBkID0gbmV3IERhdGUodHJlZS5tb2RpZmllZERhdGUpO1xuICAgICQoXCIjc2F2ZS11cGRhdGUtcGFuZWwtaW5uZXJcIikuaHRtbChcIjxiPlwiK3RyZWUudGl0bGUrXCI8L2I+PGJyIC8+XCIgK1xuICAgICAgICBcIjxzcGFuIHN0eWxlPSdjb2xvcjojODg4Jz5cIit0cmVlLmRlc2NyaXB0aW9uK1wiPC9zcGFuPjxiciAvPlwiK1xuICAgICAgICBcIjxzcGFuIHN0eWxlPSdmb250LXN0eWxlOml0YWxpYztmb250LXNpemU6MTFweDsnPkxhc3QgTW9kaWZpZWQ6IFwiICtcbiAgICAgICAgZC50b0RhdGVTdHJpbmcoKStcIiBcIitkLnRvTG9jYWxlVGltZVN0cmluZygpK1wiIGJ5IFwiK3RyZWUubGFzdE1vZGlmeWluZ1VzZXJOYW1lK1wiPC9zcGFuPjxiciAvPlwiK1xuICAgICAgICBcIjxhIGhyZWY9J2h0dHBzOi8vZHJpdmUuZ29vZ2xlLmNvbS9maWxlL2QvXCIrdHJlZS5pZCtcIicnIHRhcmdldD0nX2JsYW5rJz48aSBjbGFzcz0naWNvbi1saW5rJz48L2k+IE9wZW4gaW4gR29vZ2xlIERyaXZlPC9hPlwiKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBkb24ndCBzaG93IHRoZSB1cGRhdGUgcGFuZWwsIHRoaXMgaXMgYSBuZXcgdHJlZVxuICAgICQoXCIjc2F2ZS11cGRhdGUtcGFuZWxcIikuaGlkZSgpO1xuICB9XG5cbiAgLy8gY2xlYXIgYW55IG1lc3NhZ2VcbiAgX3NldFNhdmVNZXNzYWdlKG51bGwpO1xuXG4gIC8vIHNob3cgdGhlIHBvcHVwXG4gICQoXCIjc2F2ZS1tb2RhbFwiKS5tb2RhbCgnc2hvdycpO1xufVxuXG4vKioqXG4gKiBMb2FkIGEgbW9kZWwgYmFzZWQgb24gcGFzc2VkIGlkLiAgVGhpcyBmdW5jdGlvbiBpcyByZWFsbHkgb25seSBmb3IgbG9hZGluZyBtb2RlbCBvbiBzdGFydCwgd2hlbiBhIGZpbGUgaWRcbiAqIGhhcyBiZWVuIHBhc3NlZCBpbiB0aGUgdXJsIGVpdGhlciBmcm9tIGdvb2dsZSBkcml2ZSBvciBmcm9tIHRoZSA/ZmlsZT1pZCB1cmwuXG4gKioqL1xudmFyIGxvZ2luTW9kYWxJbml0ID0gZmFsc2U7XG5mdW5jdGlvbiBsb2FkKGlkLCBsb2FkRm4pIHtcbiAgLy8gaWYgd2UgZG9uJ3QgaGF2ZSBhbiBhY2Nlc3MgdG9rZW4sIHdlIG5lZWQgdG8gc2lnbiBpbiBmaXJzdFxuICAvLyBUT0RPOiBpZiB0aGlzIGlzIGEgcHVibGljIGZpbGUsIHRoZXJlIGlzIG5vIHJlYXNvbiB0byBzaWduIGluLi4uIHNvbHV0aW9uP1xuICBpZiggIXRva2VuICkge1xuXG4gICAgaWYoICFsb2dpbk1vZGFsSW5pdCApIHtcbiAgICAgICQoJyNnb29nbGUtbW9kYWwtbG9naW4nKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICAvLyBzaWduIHRoZSB1c2VyIGluIChmb3JjZSBvYXV0aCBwb3B1cClcbiAgICAgICAgc2lnbkluKGZ1bmN0aW9uKHRva2VuKSB7XG4gICAgICAgICAgJCgnI2xvZ2luLW1vZGFsJykubW9kYWwoJ2hpZGUnKTtcblxuICAgICAgICAgIC8vIHNldCB0aGUgdXNlciBpbmZvcm1hdGlvbiBpbiB0b3AgbGVmdFxuICAgICAgICAgIF9zZXRVc2VySW5mbygpO1xuXG4gICAgICAgICAgaWYoIGxvYWRGbiApIGxvYWRGbigpO1xuXG4gICAgICAgICAgZ2V0RmlsZU1ldGFkYXRhKGlkLCBmdW5jdGlvbihtZXRhZGF0YSl7XG4gICAgICAgICAgICBnZXRGaWxlKGlkLCBtZXRhZGF0YS5kb3dubG9hZFVybCwgZnVuY3Rpb24oZmlsZSkge1xuICAgICAgICAgICAgICBfb25Jbml0RmlsZUxvYWRlZChtZXRhZGF0YSxmaWxlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgICQoJyNsb2dpbi1tb2RhbCcpLm1vZGFsKCk7XG4gICAgICBsb2dpbk1vZGFsSW5pdCA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgICQoJyNsb2dpbi1tb2RhbCcpLm1vZGFsKCdzaG93Jyk7XG4gICAgfVxuXG4gIH0gZWxzZSB7XG4gICAgaWYoIGxvYWRGbiApIGxvYWRGbigpO1xuXG4gICAgZ2V0RmlsZU1ldGFkYXRhKGlkLCBmdW5jdGlvbihtZXRhZGF0YSl7XG4gICAgICBnZXRGaWxlKGlkLCBtZXRhZGF0YS5kb3dubG9hZFVybCwgZnVuY3Rpb24oZmlsZSkge1xuICAgICAgICBfb25Jbml0RmlsZUxvYWRlZChtZXRhZGF0YSxmaWxlKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG5cbi8qKipcbiAqIEluaXRpYWxpemUgVUkgLyBtb2RlbCB3aGVuIGEgZmlsZSBpcyBsb2FkZWQgYXQgc3RhcnRcbiAqKiovXG5mdW5jdGlvbiBfb25Jbml0RmlsZUxvYWRlZChtZXRhZGF0YSwgZmlsZSkge1xuICAvLyBiYWRkbmVzcywgbGV0IHRoZSB1c2VyIGtub3dcbiAgaWYoICFmaWxlICkge1xuICAgIGlmKCBoaWRlSW5pdExvYWRpbmcgKSBoaWRlSW5pdExvYWRpbmcoKTtcbiAgICByZXR1cm4gYWxlcnQoXCJGYWlsZWQgdG8gbG9hZCBmcm9tIEdvb2dsZSBEcml2ZSA6L1wiKTtcbiAgfVxuXG4gIC8vIG1ldGFkYXRhIGZhaWxlZCB0byBsb2FkLCBtb3JlIGJhZG5lc3NcbiAgaWYoIG1ldGFkYXRhLmNvZGUgPT0gNDA0ICkge1xuICAgIGlmKCBoaWRlSW5pdExvYWRpbmcgKSBoaWRlSW5pdExvYWRpbmcoKTtcbiAgICByZXR1cm4gYWxlcnQoXCJHb29nbGUgRHJpdmU6IFwiK21ldGFkYXRhLm1lc3NhZ2UpO1xuICB9XG5cbiAgLy8gd2UgbG9hZGVkIGEgbW9kZWwsIHNldHVwIGFuZCBydW5cbiAgaWYoIG1ldGFkYXRhLm1pbWVUeXBlID09IE1JTUVfVFlQRSApIHtcbiAgICAvLyBzZXQgdGhlIGN1cnJlbnRseSBsb2FkZWQgZmlsZSBpZFxuICAgIGxvYWRlZEZpbGUgPSBtZXRhZGF0YS5pZDtcblxuICAgIC8vIHNob3cgdGhlIHNoYXJlIGJ0blxuICAgICQoXCIjc2hhcmUtYnRuXCIpLnBhcmVudCgpLnNob3coKTtcbiAgICAkKFwiI29wZW4taW4tZHJpdmVcIikuYXR0cihcImhyZWZcIixcImh0dHBzOi8vZG9jcy5nb29nbGUuY29tL2ZpbGUvZC9cIittZXRhZGF0YS5pZCkucGFyZW50KCkuc2hvdygpO1xuXG4gICAgLy8gc2hvdyB0aXRsZVxuICAgICQoXCIjbG9hZGVkLW1vZGVsLXRpdGxlXCIpLmh0bWwoXCI8c3BhbiBzdHlsZT0nY29sb3I6IzMzMyc+TG9hZGVkIE1vZGVsIDwvc3Bhbj4gXCIrbWV0YWRhdGEudGl0bGUpO1xuXG4gICAgLy8gc2V0dXAgbW9kZWxcbiAgICBtb2RlbElPLmxvYWRTZXR1cChtZXRhZGF0YS5pZCwgZmlsZSk7XG5cbiAgICAvLyBzZXR1cCByZWFsdGltZSBldmVudHNcbiAgICBnZHJpdmVSVC5pbml0UnRBcGkobG9hZGVkRmlsZSk7XG4gIH0gZWxzZSBpZiAoIG1ldGFkYXRhLm1pbWVUeXBlID09IFRSRUVfTUlNRV9UWVBFICkgeyAvLyB3ZSBsb2FkZWQgYSB0cmVlXG4gICAgLy8gc2V0IHRoZSBsb2FkZWQgdHJlZSBpZFxuICAgIGxvYWRlZFRyZWUgPSBtZXRhZGF0YS5pZDtcblxuICAgIC8vIHNob3cgdGhlIHNoYXJlIGJ0blxuICAgICQoXCIjc2hhcmUtdHJlZS1idG5cIikuc2hvdygpO1xuICAgICQoXCIjbG9hZGVkLXRyZWUtbmFtZVwiKS5odG1sKG1ldGFkYXRhLnRpdGxlKS5wYXJlbnQoKS5zaG93KCk7XG5cbiAgICAvLyBzZXQgdGhlIGxvYWRlZCB0cmVlXG4gICAgbW9kZWxJTy5sb2FkVHJlZShmaWxlKTtcblxuICAgIC8vIGhpZGUgdGhlIGxvYWRpbmcgcG9wdXBcbiAgICBpZiggaGlkZUluaXRMb2FkaW5nICkgaGlkZUluaXRMb2FkaW5nKCk7XG4gIH0gZWxzZSB7XG4gICAgYWxlcnQoXCJMb2FkZWQgdW5rbm93biBmaWxlIHR5cGUgZnJvbSBHb29nbGUgRHJpdmU6IFwiK21ldGFkYXRhLm1pbWVUeXBlKTtcbiAgfVxufVxuXG4vKioqXG4gKiB0b2tlbnMgZXhwaXJlLCBldmVyeSBvbmNlIGluIGF3aGlsZSBjaGVjayB0aGUgY3VycmVudCB0b2tlbiBoYXNuJ3RcbiAqIGlmIGl0IGhhcywgdGhlbiB1cGRhdGVcbiAqKiovXG5mdW5jdGlvbiBfY2hlY2tUb2tlbigpIHtcbiAgLy8gaWdub3JlIGlmIHRoZXJlIGlzIG5vIHRva2VuXG4gIGlmICghdG9rZW4pIHJldHVybjtcblxuICAvLyBvdGhlcndpc2UsIGxvb2sgdG8gdXBkYXRlIHRoZSBhY2Nlc3MgdG9rZW5cbiAgT2F1dGguZ2V0QWNjZXNzVG9rZW4oZnVuY3Rpb24odCkge1xuICAgIGlmKCB0ICE9IG51bGwgKSB0b2tlbiA9IHQ7XG4gIH0pO1xufTtcblxuLyoqKlxuICogaXMgdGhlIGN1cnJlbnQgdXNlciBzaWduZWQgaW4/XG4gKioqL1xuZnVuY3Rpb24gY2hlY2tTaWduZWRJbihjYWxsYmFjaykge1xuICAvLyBpZiBpc0F1dGhlcml6ZWQgcmV0dXJucyBhIHRva2VuLCB1c2VyIGlzIGxvZ2dlZCBpblxuICBPYXV0aC5pc0F1dGhvcml6ZWQoZnVuY3Rpb24odG9rZW4pe1xuICAgIGlmICh0b2tlbiAhPSBudWxsKSBjYWxsYmFjayh0cnVlKTtcbiAgICBlbHNlIGNhbGxiYWNrKGZhbHNlKTtcbiAgfSk7XG59O1xuXG4vKioqXG4gKiBTaWduIGEgdXNlciBpbiB1c2luZyB0aGUgT2F1dGggY2xhc3NcbiAqKiovXG5mdW5jdGlvbiBzaWduSW4oY2FsbGJhY2spIHtcbiAgT2F1dGguYXV0aG9yaXplKGZ1bmN0aW9uKHQpe1xuICAgIHRva2VuID0gdDtcbiAgICBpZiAodG9rZW4gIT0gbnVsbCkge1xuICAgICAgaWYoIHQuZXJyb3IgKSByZXR1cm4gY2FsbGJhY2soZmFsc2UpO1xuICAgICAgY2FsbGJhY2sodHJ1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNhbGxiYWNrKGZhbHNlKTtcbiAgICB9XG4gIH0pXG59O1xuXG4vKioqXG4gKiBBY2Nlc3MgbWV0aG9kIGZvciB0b2tlblxuICoqKi9cbmZ1bmN0aW9uIGdldFRva2VuKCkge1xuICByZXR1cm4gdG9rZW47XG59O1xuXG4vKioqXG4gKiBMb2FkIHRoZSBnb29nbGUgZHJpdmUgYXBpIGNvZGVcbiAqKiovXG5mdW5jdGlvbiBfbG9hZEFwaShjYWxsYmFjaykge1xuICBnYXBpLmNsaWVudC5sb2FkKFwiZHJpdmVcIiwgRFJJVkVfQVBJX1ZFUlNJT04sIGZ1bmN0aW9uKCkge1xuICAgIGNhbGxiYWNrKCk7XG4gIH0pO1xufTtcblxuLyoqKlxuICogR2V0IGEgbGlzdCBvZiBmaWxlIG1ldGFkYXRhIGZyb20gZ29vZ2xlIGRyaXZlIGJhc2VkIG9uIHF1ZXJ5XG4gKioqL1xuZnVuY3Rpb24gbGlzdEZpbGVzKHF1ZXJ5LCBjYWxsYmFjaykge1xuICBnYXBpLmNsaWVudC5kcml2ZS5maWxlcy5saXN0KHtcbiAgICBxIDogcXVlcnkgKyBcIiBhbmQgdHJhc2hlZCA9IGZhbHNlXCJcbiAgfSkuZXhlY3V0ZShmdW5jdGlvbihyZXNwKSB7XG4gICAgY2FsbGJhY2socmVzcCk7XG4gIH0pO1xufTtcblxuLyoqKlxuICogR2V0IGEgc2luZ2xlIGZpbGVzIG1ldGFkYXRhIGJhc2VkIG9uIGlkXG4gKioqL1xuZnVuY3Rpb24gZ2V0RmlsZU1ldGFkYXRhKGlkLCBjYWxsYmFjaykge1xuICBnYXBpLmNsaWVudC5kcml2ZS5maWxlcy5nZXQoe1xuICAgICdmaWxlSWQnIDogaWRcbiAgfSkuZXhlY3V0ZShmdW5jdGlvbihyZXNwKSB7XG4gICAgY2FsbGJhY2socmVzcCk7XG4gIH0pO1xufTtcblxuLyoqKlxuICogIEFjdHVhbGx5IGxvYWQgYSBmaWxlcyBkYXRhLiAgVGhlIHVybCB0byBkbyB0aGlzIGlzIHByb3ZpZGVkIGluIGEgZmlsZXMgbWV0YWRhdGEuXG4gKioqL1xuZnVuY3Rpb24gZ2V0RmlsZShpZCwgZG93bmxvYWRVcmwsIGNhbGxiYWNrKSB7XG4gICQuYWpheCh7XG4gICAgdXJsIDogZG93bmxvYWRVcmwsXG4gICAgYmVmb3JlU2VuZCA6IGZ1bmN0aW9uKHJlcXVlc3QpIHtcbiAgICAgIC8vIHNldCBhY2Nlc3MgdG9rZW4gaW4gaGVhZGVyXG4gICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoXCJBdXRob3JpemF0aW9uXCIsICdCZWFyZXIgJysgdG9rZW4uYWNjZXNzX3Rva2VuKTtcbiAgICB9LFxuICAgIHN1Y2Nlc3MgOiBmdW5jdGlvbihkYXRhLCBzdGF0dXMsIHhocikge1xuICAgICAgLy8gcGFyc2UgdGhlIHJlc3BvbnNlICh3ZSBvbmx5IHN0b3JlIGpzb24gaW4gdGhlIGdvb2dsZSBkcml2ZSlcbiAgICAgIHRyeSB7XG4gICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgfSBjYXRjaCAoZSkge31cblxuICAgICAgY2FsbGJhY2soZGF0YSwgaWQpO1xuICAgIH0sXG4gICAgZXJyb3IgOiBmdW5jdGlvbigpIHtcbiAgICAgIGNhbGxiYWNrKHtcbiAgICAgICAgZXJyb3IgOiB0cnVlLFxuICAgICAgICBtZXNzYWdlIDogXCJGYWlsZWQgdG8gbG9hZCBmaWxlIGZyb20gR29vZ2xlIERyaXZlXCJcbiAgICAgIH0pO1xuXG4gICAgfVxuICB9KTtcbn07XG5cbi8qKipcbiAqIFNhdmUganNvbiB0byBnb29nbGUgZHJpdmVcbiAqKiovXG5mdW5jdGlvbiBzYXZlRmlsZShuYW1lLCBkZXNjcmlwdGlvbiwgbWltZVR5cGUsIGpzb24sIGNhbGxiYWNrLCBvcHRpb25zKSB7XG4gIGlmKCAhb3B0aW9ucyApIG9wdGlvbnMgPSB7fVxuXG4gIHZhciBib3VuZGFyeSA9ICctLS0tLS0tMzE0MTU5MjY1MzU4OTc5MzIzODQ2JztcbiAgdmFyIGRlbGltaXRlciA9IFwiXFxyXFxuLS1cIiArIGJvdW5kYXJ5ICsgXCJcXHJcXG5cIjtcbiAgdmFyIGNsb3NlX2RlbGltID0gXCJcXHJcXG4tLVwiICsgYm91bmRhcnkgKyBcIi0tXCI7XG5cbiAgdmFyIG1ldGFkYXRhID0ge1xuICAgICd0aXRsZScgOiBuYW1lLFxuICAgICdkZXNjcmlwdGlvbicgOiBkZXNjcmlwdGlvbixcbiAgICAnbWltZVR5cGUnIDogbWltZVR5cGVcbiAgfTtcblxuICAvLyBpZiB3ZSB3YW50IHRvIHNhdmUgdGhlIGZpbGUgdG8gYSBzcGVjaWZpZWQgZm9sZGVyXG4gIGlmKCBvcHRpb25zLnBhcmVudCApIHtcbiAgICBtZXRhZGF0YS5wYXJlbnRzID0gW3tpZDogb3B0aW9ucy5wYXJlbnR9XTtcbiAgfVxuXG4gIC8vIGlmIHRoZSBqc29uIGlzIHJlYWxseSBhbiBvYmplY3QsIHR1cm4gaXQgdG8gYSBzdHJpbmdcbiAgaWYgKHR5cGVvZiBqc29uID09ICdvYmplY3QnKSBqc29uID0gSlNPTi5zdHJpbmdpZnkoanNvbik7XG5cbiAgLy8gZGF0YSBuZWVkcyB0byBiZSBiYXNlNjQgZW5jb2RlZCBmb3IgdGhlIFBPU1RcbiAgdmFyIGJhc2U2NERhdGEgPSBidG9hKGpzb24pO1xuXG4gIC8vIGNyZWF0ZSBvdXIgbXVsdGlwYXJ0IFBPU1QgcmVxdWVzdFxuICB2YXIgbXVsdGlwYXJ0UmVxdWVzdEJvZHkgPSBkZWxpbWl0ZXJcbiAgICAgICsgJ0NvbnRlbnQtVHlwZTogYXBwbGljYXRpb24vanNvblxcclxcblxcclxcbidcbiAgICAgICsgSlNPTi5zdHJpbmdpZnkobWV0YWRhdGEpO1xuXG4gIGlmKCBqc29uLmxlbmd0aCA+IDAgKSB7XG4gICAgbXVsdGlwYXJ0UmVxdWVzdEJvZHkgKz0gZGVsaW1pdGVyICsgJ0NvbnRlbnQtVHlwZTogJ1xuICAgICAgKyBtaW1lVHlwZSArICdcXHJcXG4nICsgJ0NvbnRlbnQtVHJhbnNmZXItRW5jb2Rpbmc6IGJhc2U2NFxcclxcbidcbiAgICAgICsgJ1xcclxcbicgKyBiYXNlNjREYXRhO1xuICB9XG4gIG11bHRpcGFydFJlcXVlc3RCb2R5ICs9IGNsb3NlX2RlbGltO1xuXG4gICAgIC8vIHNldHVwIFBPU1QgcmVxdWVzdFxuICAgICAvLyBpZiB0aGUgb3B0aW9ucy5jb252ZXI9dHJ1ZSBmbGFnIGlzIHNldCwgZ29vZ2xlIGF0dGVtcHRzIHRvIGNvbnZlcnQgdGhlIGZpbGUgdG9cbiAgICAgLy8gYSBnb29nbGUgZG9jIGZpbGUuICBNb3N0bHksIHdlIHVzZSB0aGlzIGZvciBleHBvcnRpbmcgY3N2IC0+IEdvb2dsZSBTcHJlYWRzaGVldHNcbiAgdmFyIHJlcXVlc3QgPSBnYXBpLmNsaWVudC5yZXF1ZXN0KHtcbiAgICAncGF0aCcgOiAnL3VwbG9hZC9kcml2ZS92Mi9maWxlcycgKyAoIG9wdGlvbnMuY29udmVydCA/ICc/Y29udmVydD10cnVlJyA6ICcnKSxcbiAgICAnbWV0aG9kJyA6ICdQT1NUJyxcbiAgICAncGFyYW1zJyA6IHtcbiAgICAgICd1cGxvYWRUeXBlJyA6ICdtdWx0aXBhcnQnXG4gICAgfSxcbiAgICAnaGVhZGVycycgOiB7XG4gICAgICAnQ29udGVudC1UeXBlJyA6ICdtdWx0aXBhcnQvbWl4ZWQ7IGJvdW5kYXJ5PVwiJyArIGJvdW5kYXJ5ICsgJ1wiJ1xuICAgIH0sXG4gICAgJ2JvZHknIDogbXVsdGlwYXJ0UmVxdWVzdEJvZHlcbiAgfSk7XG5cbiAgLy8gc2VuZCB0aGUgcmVxdWVzdFxuICByZXF1ZXN0LmV4ZWN1dGUoZnVuY3Rpb24ocmVzcCkge1xuICAgIGlmIChyZXNwLmlkKVxuICAgICAgY2FsbGJhY2socmVzcCk7XG4gICAgZWxzZVxuICAgICAgY2FsbGJhY2soe1xuICAgICAgICBlcnJvciA6IHRydWUsXG4gICAgICAgIG1lc3NhZ2UgOiBcIkZhaWxlZCB0byBzYXZlXCJcbiAgICAgIH0pO1xuICB9KTtcbn07XG5cbi8qKipcbiAqIFVwZGF0ZSBhIGZpbGUgYmFzZWQgb24gaWQgYW5kIGdpdmVuIGpzb24gZGF0YVxuICoqKi9cbmZ1bmN0aW9uIHVwZGF0ZUZpbGUoZmlsZUlkLCBqc29uLCBjYWxsYmFjaykge1xuICAvLyBzdGFydCBjcmVhdGluZyB0aGUgbXVsdGlwYXJ0IFBPU1QgcmVxdWVzdFxuICB2YXIgYm91bmRhcnkgPSAnLS0tLS0tLTMxNDE1OTI2NTM1ODk3OTMyMzg0Nic7XG4gIHZhciBkZWxpbWl0ZXIgPSBcIlxcclxcbi0tXCIgKyBib3VuZGFyeSArIFwiXFxyXFxuXCI7XG4gIHZhciBjbG9zZV9kZWxpbSA9IFwiXFxyXFxuLS1cIiArIGJvdW5kYXJ5ICsgXCItLVwiO1xuXG4gIHZhciBtZXRhZGF0YSA9IHt9O1xuXG4gIC8vIHN0cmluaWZ5IHRoZW4gYmFzZTY0IGVuY29kZSB0aGVuIG9iamVjdFxuICAgIHZhciBiYXNlNjREYXRhID0gYnRvYShKU09OLnN0cmluZ2lmeShqc29uKSk7XG5cbiAgICAvLyBzZXQgdXAgdGhlIFBPU1QgYm9keVxuICAgIHZhciBtdWx0aXBhcnRSZXF1ZXN0Qm9keSA9XG4gICAgICBkZWxpbWl0ZXIgK1xuICAgICAgICAnQ29udGVudC1UeXBlOiBhcHBsaWNhdGlvbi9qc29uXFxyXFxuXFxyXFxuJyArXG4gICAgICAgIEpTT04uc3RyaW5naWZ5KG1ldGFkYXRhKSArXG4gICAgICAgIGRlbGltaXRlciArXG4gICAgICAgICdDb250ZW50LVR5cGU6ICcgKyBNSU1FX1RZUEUgKyAnXFxyXFxuJyArXG4gICAgICAgICdDb250ZW50LVRyYW5zZmVyLUVuY29kaW5nOiBiYXNlNjRcXHJcXG4nICtcbiAgICAgICAgJ1xcclxcbicgK1xuICAgICAgICBiYXNlNjREYXRhICtcbiAgICAgICAgY2xvc2VfZGVsaW07XG5cbiAgLy8gc2V0dXAgUE9TVCByZXF1ZXN0XG4gICAgdmFyIHJlcXVlc3QgPSBnYXBpLmNsaWVudC5yZXF1ZXN0KHtcbiAgICAgICAgJ3BhdGgnOiAnL3VwbG9hZC9kcml2ZS92Mi9maWxlcy8nK2ZpbGVJZCxcbiAgICAgICAgJ21ldGhvZCc6ICdQVVQnLFxuICAgICAgICAncGFyYW1zJzogeyd1cGxvYWRUeXBlJzogJ211bHRpcGFydCd9LFxuICAgICAgICAnaGVhZGVycyc6IHtcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ211bHRpcGFydC9taXhlZDsgYm91bmRhcnk9XCInICsgYm91bmRhcnkgKyAnXCInXG4gICAgICAgIH0sXG4gICAgICAgICdib2R5JzogbXVsdGlwYXJ0UmVxdWVzdEJvZHl9KTtcblxuICAgIC8vIHNldCByZXF1ZXN0XG4gICAgcmVxdWVzdC5leGVjdXRlKGZ1bmN0aW9uKHJlc3Ape1xuICAgICAgaWYoIHJlc3AuaWQgKSB7XG4gICAgICAgIGNhbGxiYWNrKHJlc3ApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2FsbGJhY2soe1xuICAgICAgICBlcnJvciA6IHRydWUsXG4gICAgICAgIG1lc3NhZ2UgOiBcIkZhaWxlZCB0byB1cGRhdGVcIlxuICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIHJ1bk1vZGVsUnQoKSB7XG4gIGlmKCBvZmZsaW5lTW9kZSApIHJldHVybjtcbiAgZ2EoJ3NlbmQnLCAnZXZlbnQnLCAndWknLCAnaW50ZXJhY3Rpb24nLCAncnVuLW1vZGVsLXJlbW90ZScsIDEpO1xuICBnZHJpdmVSVC5ydW5Nb2RlbFJ0KCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBpbml0IDogaW5pdCxcbiAgY2hlY2tTaWduZWRJbiA6IGNoZWNrU2lnbmVkSW4sXG4gIHNpZ25JbiA6IHNpZ25JbixcbiAgZ2V0VG9rZW4gOiBnZXRUb2tlbixcbiAgbGlzdEZpbGVzIDogbGlzdEZpbGVzLFxuICBnZXRGaWxlTWV0YWRhdGEgOiBnZXRGaWxlTWV0YWRhdGEsXG4gIGxvYWQgOiBsb2FkLFxuICBzYXZlRmlsZTogc2F2ZUZpbGUsXG4gIHNob3dMb2FkVHJlZVBhbmVsIDogc2hvd0xvYWRUcmVlUGFuZWwsXG4gIHNob3dTYXZlVHJlZVBhbmVsIDogc2hvd1NhdmVUcmVlUGFuZWwsXG4gIHJ1bk1vZGVsUnQgOiBydW5Nb2RlbFJ0LFxuICBzZXRBcHAgOiBzZXRBcHAsXG5cbiAgTUlNRV9UWVBFIDogTUlNRV9UWVBFXG59O1xuIiwiLy8gUkVBTFRJTUUgKHJ0KSBPYmplY3RzXG4vLyBydCBqc29uIGZpZWxkLCB1c2VkIHRvIHNlbmQgdXBkYXRlcyB0byBwZWVyc1xudmFyIHJ0SnNvbiA9IG51bGw7XG4vLyBydCBkb2N1bWVudFxudmFyIHJ0RG9jID0gbnVsbDtcbi8vIGhhcyB0aGUgcnQgYXBpIGJlZW4gbG9hZGVkP1xudmFyIF9ydExvYWRlZCA9IGZhbHNlO1xuLy8gdGltZXIgdG8gYnVmZmVyIHRoZSBmaXJpbmcgb2YgdXBkYXRlcyBmcm9tIHJ0IGV2ZW50c1xudmFyIF9ydFRpbWVyID0gLTE7XG5cbi8vIGxpc3Qgb2YgY3VycmVudCBydCBlZGl0cyB0byBpbnB1dCBmaWxlc1xudmFyIHJ0RWRpdHMgPSB7fTtcbi8vIGdvb2dsZSBkcml2ZSBydCBtb2RlbCAtIG1hcFxudmFyIGxpdmVFZGl0cyA9IG51bGw7XG4vLyBsb2NhbCBsb2NrIG9uIGFuIGVsZW1lbnRcbnZhciBsb2NrID0ge307XG5cbnZhciBhcHA7XG5cbi8vIGxvYWRlZCBmaWxlIGlkXG52YXIgbG9hZGVkRmlsZTtcblxuLyoqKlxuICogU2V0dXAgdGhlIHJ0IGFwaSBmb3IgdGhlIGN1cnJlbnQgZmlsZS4gIFRoaXMgd2lsbCBhY3R1YWxseSBsb2FkIHRoZSBhcGkgaWYgbmVlZGVkXG4gKioqL1xuZnVuY3Rpb24gaW5pdFJ0QXBpKGZpbGUpIHtcbiAgcnRKc29uID0gbnVsbDsgLy8ga2lsbCBvZmYgYW55IG9sZCBsaXN0bmVyc1xuICBsb2FkZWRGaWxlID0gZmlsZTtcblxuICAvLyBjbG9zZSBhbnkgb2xkIGNvbm5lY3Rpb25cbiAgaWYoIHJ0RG9jICkgcnREb2MuY2xvc2UoKTtcblxuICAvLyBnZXQgb3V0IG9mIGhlcmUgaWYgd2UgZG9uJ3QgaGF2ZSBhIGxvYWRlZCBmaWxlXG4gIGlmKCBsb2FkZWRGaWxlID09IG51bGwgKSByZXR1cm47XG5cbiAgLy8gbG9hZCBhcGkgaWYgbmVlZGVkXG4gIGlmKCAhX3J0TG9hZGVkICkge1xuICAgIGdhcGkubG9hZCgnZHJpdmUtcmVhbHRpbWUnLCBmdW5jdGlvbigpe1xuICAgICAgLy8gc2V0dXAgcnQgaG9va3NcbiAgICAgIF9ydExvYWRlZCA9IHRydWU7XG4gICAgICBfbG9hZFJ0RmlsZSgpO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIC8vIHNldHVwIHJ0IGhvb2tzXG4gICAgX2xvYWRSdEZpbGUoKTtcbiAgfVxuXG4gIC8vIHNldHVwIGlucHV0IGhhbmRsZXJzXG4gICQoJyNpbnB1dHMgaW5wdXQnKS5vbignZm9jdXMnLGZ1bmN0aW9uKGUpe1xuICAgIHZhciBlbGUgPSAkKGUudGFyZ2V0KTtcbiAgICBfc2V0TG9jYWxMb2NrKHtcbiAgICAgIGlkICAgICAgICA6IGVsZS5hdHRyKFwiaWRcIiksXG4gICAgICB2YWx1ZSAgICAgOiBlbGUudmFsKCksXG4gICAgICB0aW1lc3RhbXAgOiBuZXcgRGF0ZSgpLmdldFRpbWUoKSxcbiAgICAgIHVzZXIgICAgICA6IHdpbmRvdy51c2VyaW5mbyA/IHdpbmRvdy51c2VyaW5mby5uYW1lIDogXCJ1bmtub3duXCJcbiAgICB9KTtcbiAgfSk7XG4gICQoJyNpbnB1dHMgaW5wdXQnKS5vbignYmx1cicsZnVuY3Rpb24oZSl7XG4gICAgX3JlbW92ZUxvY2FsTG9jaygkKGUudGFyZ2V0KS5hdHRyKFwiaWRcIikpO1xuICB9KTtcbiAgJCgnI2lucHV0cyBpbnB1dCcpLm9uKCdrZXl1cCcsZnVuY3Rpb24oZSl7XG4gICAgaWYoIGUud2hpY2ggPT0gMTMgKSByZXR1cm47XG4gICAgdmFyIGVsZSA9ICQoZS50YXJnZXQpO1xuICAgIF91cGRhdGVMb2NhbExvY2soZWxlLmF0dHIoXCJpZFwiKSwgZWxlLnZhbCgpKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIF9zZXRMb2NhbExvY2sobG9jaykge1xuICAvLyBUT0RPOiB0aGlzIHNob3VsZCBtYXJrIHRoZSBjdXJyZW50IGxvY2tcbiAgaWYoIGxpdmVFZGl0cy5oYXNbbG9jay5pZF0gKSByZXR1cm47XG4gIGxpdmVFZGl0cy5zZXQobG9jay5pZCwgbG9jayk7XG59XG5cbmZ1bmN0aW9uIF91cGRhdGVMb2NhbExvY2soaWQsIHZhbCkge1xuICB2YXIgbG9jayA9IHtcbiAgICBpZCA6IGlkLFxuICAgIHZhbHVlIDogdmFsLFxuICAgIHRpbWVzdGFtcCA6IG5ldyBEYXRlKCkuZ2V0VGltZSgpLFxuICAgIHVzZXIgICAgICA6IHdpbmRvdy51c2VyaW5mbyA/IHdpbmRvdy51c2VyaW5mby5uYW1lIDogXCJ1bmtub3duXCJcbiAgfVxuXG4gIGxpdmVFZGl0cy5zZXQoaWQsIGxvY2spO1xufVxuXG5mdW5jdGlvbiBfcmVtb3ZlTG9jYWxMb2NrKGlkKSB7XG4gIGxpdmVFZGl0cy5kZWxldGUoaWQpO1xufVxuXG5mdW5jdGlvbiBfcmVtb3ZlUmVtb3RlTG9jayhsb2NrKSB7XG4gICQoXCIjXCIrbG9jay5pZCkucmVtb3ZlQXR0cihcImRpc2FibGVkXCIpO1xuICAkKFwiI1wiK2xvY2suaWQrXCItZWRpdGluZ1wiKS5yZW1vdmUoKTtcbiAgZGVsZXRlIHJ0RWRpdHNbbG9jay5pZF07XG59XG5cbmZ1bmN0aW9uIF91cGRhdGVMb2NrKGxvY2spIHtcbiAgJChcIiNcIitsb2NrLmlkKS52YWwobG9jay52YWx1ZSkuYXR0cihcImRpc2FibGVkXCIsXCJkaXNhYmxlZFwiKTtcbiAgaWYoICQoXCIjXCIrbG9jay5pZCtcIi1lZGl0aW5nXCIpLmxlbmd0aCA9PSAwICkge1xuICAgICQoXCIjXCIrbG9jay5pZCkucGFyZW50KCkuYWZ0ZXIoXCI8c3BhbiBpZD0nXCIrbG9jay5pZCtcIi1lZGl0aW5nJyBjbGFzcz0nbGFiZWwgbGFiZWwtd2FybmluZyc+PC9zcGFuPlwiKTtcbiAgfVxuICAkKFwiI1wiK2xvY2suaWQrXCItZWRpdGluZ1wiKS5odG1sKGxvY2sudXNlcik7XG4gIHJ0RWRpdHNbbG9jay5pZF0gPSBsb2NrO1xufVxuXG4vKioqXG4gKiBVcGRhdGUgdGhlIGxpc3Qgb2YgcmVhbHRpbWUgZWRpdHMgYXMgd2VsbCBhcyB0aGUgaW5wdXQgVUkgYmFzZWQgb24gdGhlIHJ0RG9jIGV2ZW50XG4gKiBUT0RPOiB0aGlzIGlzIGEgYml0IG5hc3R5IHJpZ2h0IG5vd1xuICoqL1xuZnVuY3Rpb24gX3VwZGF0ZVJ0RWRpdHMoZSkge1xuICBpZiggZS5pc0xvY2FsICkgcmV0dXJuO1xuXG4gIHZhciBrZXlzID0gbGl2ZUVkaXRzLmtleXMoKTtcblxuICAvLyByZW1vdmUgb2xkIHRpbWVzdGFtcHMgVE9ET1xuICAvKmZvciggdmFyIGkgPSAwOyBpIDwgdmFsdWVzLmxlbmd0aDsgaSsrICkge1xuICAgIGlmKCBub3cgLSB2YWx1ZXNbaV0udGltZXN0YW1wID4gMTAwMCAqIDYwICkge1xuICAgICAgX3JlbW92ZUxvY2sodmFsdWVzW2ldKTsgLy8gZG9lcyB0aGlzIGZpcmUgdXBkYXRlcz9cbiAgICB9XG4gIH0qL1xuXG5cbiAgLy8gc2V0IG5ldyBlZGl0c1xuICBmb3IoIHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKysgKSB7XG4gICAgX3VwZGF0ZUxvY2sobGl2ZUVkaXRzLmdldChrZXlzW2ldKSk7XG4gIH1cblxuICAvLyByZW1vdmUgb2xkIGVkaXRzXG4gIGZvciggdmFyIGtleSBpbiBydEVkaXRzICkge1xuICAgIGlmKCBrZXlzLmluZGV4T2Yoa2V5KSA9PSAtMSApIHtcbiAgICAgIF9yZW1vdmVSZW1vdGVMb2NrKHJ0RWRpdHNba2V5XSk7XG4gICAgfVxuICB9XG59XG5cbi8qKipcbiAqICBTZXR1cCB0aGUgcnQgaG9va3MgZm9yIHRoZSBjdXJyZW50IGZpbGUuICBUaGUgYXBpIG5lZWRzIHRvIGFscmVhZHkgYmUgbG9hZGVkXG4gKioqL1xuZnVuY3Rpb24gX2xvYWRSdEZpbGUoKSB7XG4gIC8vIGdldCB0aGUgcnQgZG9jXG4gIGdhcGkuZHJpdmUucmVhbHRpbWUubG9hZChsb2FkZWRGaWxlLFxuICAgIC8vIHJ0IGRvYyBsb2FkZWRcbiAgICBmdW5jdGlvbihmaWxlKXtcbiAgICAgIHJ0RG9jID0gZmlsZTtcblxuICAgICAgLy8gZ2V0IG91ciBydCBhdHRyaWJ1dGUuICBUcmlnZ2VyaW5nIGNoYW5nZXMgb24gcnRKc29uIHdpbGwgcHVzaCBldmVudHNcbiAgICAgIC8vIHRvIGFsbCBsaXN0ZW5pbmcgY2xpZW50c1xuICAgICAgdmFyIGpzb24gPSBmaWxlLmdldE1vZGVsKCkuZ2V0Um9vdCgpLmdldChcImpzb25cIik7XG4gICAgICBsaXZlRWRpdHMgPSBmaWxlLmdldE1vZGVsKCkuZ2V0Um9vdCgpLmdldChcImxpdmVFZGl0c1wiKTtcblxuICAgICAgLy8gaWYgdGhlcmUgaXMgbm8ganNvbiBhdHRyLCB3ZSBuZWVkIHRvIGluaXRpYWxpemUgdGhlIG1vZGVsXG4gICAgICBpZigganNvbiA9PSBudWxsIHx8IGxpdmVFZGl0cyA9PSBudWxsKSB7XG4gICAgICAgIC8vIGluaXRpYWxpemUgb3VyIHJ0IG1vZGVsXG4gICAgICAgIF9vblJ0TW9kZWxMb2FkKGZpbGUuZ2V0TW9kZWwoKSk7XG4gICAgICAgIC8vIGdyYWIgcnQganNvbiBhdHRyIG5vdyB0aGF0IHdlIGFyZSBpbml0aWFsaXplZFxuICAgICAgICBqc29uID0gZmlsZS5nZXRNb2RlbCgpLmdldFJvb3QoKS5nZXQoXCJqc29uXCIpO1xuICAgICAgICBsaXZlRWRpdHMgPSBmaWxlLmdldE1vZGVsKCkuZ2V0Um9vdCgpLmdldChcImxpdmVFZGl0c1wiKTtcbiAgICAgIH1cblxuICAgICAgLy8gYmFkbmVzcyBoYXBwZW5lZCA6KFxuICAgICAgaWYoICFqc29uICkgcmV0dXJuIGNvbnNvbGUubG9nKFwiRmFpbGVkIHRvIGNvbm5lY3QgdG8gcnQganNvblwiKTtcbiAgICAgIC8vIHNldCB0aGF0IGF0dHIgZ2xvYmFsIHRvIGNsYXNzXG4gICAgICBydEpzb24gPSBqc29uO1xuXG4gICAgICAvLyBnZXQgY3VycmVudCBsaXN0IG9mIHVzZXJzXG4gICAgICB2YXIgdXNlcnMgPSBmaWxlLmdldENvbGxhYm9yYXRvcnMoKTtcblxuICAgICAgLy8gYWRkIGV2ZW50IGxpc3RlbmVycyBmb3Igd2hlbiBwZW9wbGUgY29tZSBhbmQgZ29cbiAgICAgIGZpbGUuYWRkRXZlbnRMaXN0ZW5lcihnYXBpLmRyaXZlLnJlYWx0aW1lLkV2ZW50VHlwZS5DT0xMQUJPUkFUT1JfSk9JTkVELCBmdW5jdGlvbihlKXtcbiAgICAgICAgdXNlcnMgPSBmaWxlLmdldENvbGxhYm9yYXRvcnMoKTtcbiAgICAgICAgX3VwZGF0ZUFjdGl2ZVVzZXJzKHVzZXJzKTtcbiAgICAgIH0pO1xuICAgICAgZmlsZS5hZGRFdmVudExpc3RlbmVyKGdhcGkuZHJpdmUucmVhbHRpbWUuRXZlbnRUeXBlLkNPTExBQk9SQVRPUl9MRUZULCBmdW5jdGlvbihlKXtcbiAgICAgICAgdXNlcnMgPSBmaWxlLmdldENvbGxhYm9yYXRvcnMoKTtcbiAgICAgICAgX3VwZGF0ZUFjdGl2ZVVzZXJzKHVzZXJzKTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyBhZGQgZXZlbnQgbGlzdGVuZXJzIGZvciB0aGUgcnRKc29uIG9iamVjdFxuICAgICAgLy8gd2hlbiB0aGlzIHVwZGF0ZXMsIHdlIHdhbnQgdG8gcmUtcnVuIHRoZSBtb2RlbFxuICAgICAganNvbi5hZGRFdmVudExpc3RlbmVyKGdhcGkuZHJpdmUucmVhbHRpbWUuRXZlbnRUeXBlLlRFWFRfSU5TRVJURUQsIGZ1bmN0aW9uKGUpe1xuICAgICAgICBpZiggZS5pc0xvY2FsICkgcmV0dXJuO1xuICAgICAgICBfcmVydW5SdCh1c2VycywgZS51c2VySWQpO1xuICAgICAgICB9KTtcbiAgICAgICAganNvbi5hZGRFdmVudExpc3RlbmVyKGdhcGkuZHJpdmUucmVhbHRpbWUuRXZlbnRUeXBlLlRFWFRfREVMRVRFRCwgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgaWYoIGUuaXNMb2NhbCApIHJldHVybjtcbiAgICAgICAgICBfcmVydW5SdCh1c2VycywgZS51c2VySWQpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBsaXZlIGVkaXQgdXBkYXRlc1xuICAgICAgICAgICAgICBsaXZlRWRpdHMuYWRkRXZlbnRMaXN0ZW5lcihnYXBpLmRyaXZlLnJlYWx0aW1lLkV2ZW50VHlwZS5WQUxVRV9DSEFOR0VELCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgICAgICAgICBfdXBkYXRlUnRFZGl0cyhlKTtcbiAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gc2hvdyB3aG8gaXMgbGlzdGVuaW5nXG4gICAgICAgIF91cGRhdGVBY3RpdmVVc2Vycyh1c2Vycyk7XG5cbiAgICAgICAgLy8gc2V0IGlucHV0IGhhbmRsZXJzIGZvciBydCBldmVudHNcbiAgICB9LFxuICAgIC8vIG1vZGVsIGxvYWRlZFxuICAgIGZ1bmN0aW9uKG1vZGVsKXtcbiAgICAgIF9vblJ0TW9kZWxMb2FkKG1vZGVsKTtcbiAgICB9LFxuICAgIC8vIGVycm9yc1xuICAgIGZ1bmN0aW9uKGVycikge1xuICAgICAgY29uc29sZS5sb2coXCJSVCBFUlJPUlM6IFwiKTtcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgfVxuICApO1xufVxuXG5cbi8qKipcbiAqIFVwZGF0ZSB0aGUgZGlzcGxheSBvZiBhY3RpdmUgdXNlcnMgZm9yIHRoZSBtb2RlbC5cbiAqKiovXG5mdW5jdGlvbiBfdXBkYXRlQWN0aXZlVXNlcnModXNlcnMpIHtcbiAgLy8gaWYgaXQncyBqdXN0IHVzLCBkb24ndCBzaG93IGFueXRoaW5nXG4gIGlmKCAhdXNlcnMgKSByZXR1cm4gJChcIiNhY3RpdmUtdXNlcnNcIikuaHRtbChcIlwiKTtcbiAgaWYoIHVzZXJzLmxlbmd0aCA8PSAxICkgcmV0dXJuICQoXCIjYWN0aXZlLXVzZXJzXCIpLmh0bWwoXCJcIik7XG5cbiAgLy8gd2Ugb25seSB3YW50IHVuaXF1ZSB1c2Vyc1xuICB2YXIgdW5pcXVlID0gW107XG4gIHZhciB1dXNlcnMgPSBbXTtcbiAgZm9yKCB2YXIgaSA9IDA7IGkgPCB1c2Vycy5sZW5ndGg7IGkrKyApIHtcbiAgICBpZiggdW5pcXVlLmluZGV4T2YodXNlcnNbaV0udXNlcklkKSA9PSAtMSApIHtcbiAgICAgIHVuaXF1ZS5wdXNoKHVzZXJzW2ldLnVzZXJJZCk7XG4gICAgICB1dXNlcnMucHVzaCh1c2Vyc1tpXSk7XG4gICAgfVxuICB9XG4gIGlmKCB1dXNlcnMubGVuZ3RoIDw9IDEgKSByZXR1cm4gJChcIiNhY3RpdmUtdXNlcnNcIikuaHRtbChcIlwiKTtcblxuICAvLyBhZGQgcGljIG9mIHVzZXIgdG8gZGlzcGxheSBwYW5lbFxuICB2YXIgaHRtbCA9IFwiQWN0aXZlIFVzZXJzIFwiO1xuICBmb3IoIHZhciBpID0gMDsgaSA8IHV1c2Vycy5sZW5ndGg7IGkrKyApIHtcbiAgICBpZiggdXVzZXJzW2ldLnBob3RvVXJsICkge1xuICAgICAgaHRtbCArPSBcIjxpbWcgc3JjPSdcIit1dXNlcnNbaV0ucGhvdG9VcmwrXCInIHRpdGxlPSdcIit1dXNlcnNbaV0uZGlzcGxheU5hbWUrXCInIHN0eWxlPSdtYXJnaW46MCA1cHg7d2lkdGg6MzJweDtoZWlnaHQ6MzJweCcgY2xhc3M9J2ltZy1yb3VuZGVkJyAvPiBcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgaHRtbCArPSBcIjxzcGFuIHN0eWxlPSd3aWR0aDozMnB4O2hlaWdodDozMnB4O21hcmdpbjowIDVweDtiYWNrZ3JvdW5kLWNvbG9yOlwiK3V1c2Vyc1tpXS5jb2xvcitcIicgdGl0bGU9J1wiK3V1c2Vyc1tpXS5kaXNwbGF5TmFtZStcIicgPjwvc3Bhbj4gXCI7XG4gICAgfVxuICB9XG4gICQoXCIjYWN0aXZlLXVzZXJzXCIpLmh0bWwoaHRtbCk7XG59XG5cbi8qKipcbiAgICogIFJlLXJ1biB0aGUgbW9kZWwuICBFdmVudHMgY2FuIGNvbWUgaW4gcXVpY2tseSBpbiBtYW55IHBhcnRzLiAgQnVmZmVyIHRoZSBldmVudHMgc28gd2UgZG9uJ3QgcmUtcnVuIHRoZSBtb2RlbCB0b28gbWFueSB0aW1lcy5cbiAgICoqKi9cbmZ1bmN0aW9uIF9yZXJ1blJ0KHVzZXJzLCB1c2VySWQpIHtcbiAgLy8gdGhpcyBpcyBiYWRuZXNzXG4gIGlmKCAhcnRKc29uICkgcmV0dXJuO1xuXG4gIC8vIGNsZWFyIGFueSBxdWV1ZWQgcnVuXG4gIGlmKCBfcnRUaW1lciAhPSAtMSApIGNsZWFyVGltZW91dChfcnRUaW1lcik7XG5cbiAgLy8gcXVldWUgdXAgYSBydW4gYW5kIHdhaXQgdG8gbWFrZSBzdXJlIHRoZXJlIGFyZSBubyB1cGRhdGVzXG4gIF9ydFRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgIF9ydFRpbWVyID0gLTE7XG5cbiAgICAvLyBmaW5kIHRoZSB1c2VyIHdobyBpcyBydW5uaW5nIHRoZSBtb2RlbCBhbmQgZGlwbGF5IHBvcHVwIG9mIHRoYXQgdXNlcnMgaW5mb3JtYXRpb25cbiAgICBmb3IoIHZhciBpID0gMDsgaSA8IHVzZXJzLmxlbmd0aDsgaSsrICkge1xuICAgICAgaWYoIHVzZXJzW2ldLnVzZXJJZCA9PSB1c2VySWQgKSB7XG4gICAgICAgIHZhciBwYW5lbCA9ICQoXCI8ZGl2IGNsYXNzPSdpbml0LWxvYWRpbmctb3V0ZXInID48ZGl2IGNsYXNzPSdpbml0LWxvYWRpbmcnIHN0eWxlPSd3aWR0aDo0MDBweCc+IFwiK1xuICAgICAgICAgICAgICAgICh1c2Vyc1tpXS5waG90b1VybCA/IFwiPGltZyBzcmM9J1wiK3VzZXJzW2ldLnBob3RvVXJsK1wiJyAvPiBcIiA6IFwiXCIpK3VzZXJzW2ldLmRpc3BsYXlOYW1lK1wiIGlzIHVwZGF0aW5nIHRoZSBtb2RlbC4uLjwvZGl2PjwvZGl2PlwiKTtcbiAgICAgICAgICAgICQoXCJib2R5XCIpLmFwcGVuZChwYW5lbCk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgcGFuZWwuY3NzKFwib3BhY2l0eVwiLFwiLjlcIik7XG4gICAgICAgICAgICB9LDUwKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBwYW5lbC5yZW1vdmUoKTtcbiAgICAgICAgICAgIH0sIDM1MDApO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gcGFyc2UgdGhlIG5ldyBtb2RlbCBkYXRhIGFuZCBsb2FkIGl0IGFzIG91ciBjdXJyZW50IHNldHVwXG4gICAgdmFyIGRhdGEgPSBKU09OLnBhcnNlKHJ0SnNvbi5nZXRUZXh0KCkpO1xuICAgIGFwcC5nZXRNb2RlbElPKCkubG9hZFNldHVwKGxvYWRlZEZpbGUsIGRhdGEsIHRydWUpO1xuICB9LCAzMDApO1xufVxuXG4vKioqXG4gKiBpbml0aWFsaXplIGEgbmV3IHJ0IG1vZGVsXG4gKioqL1xuZnVuY3Rpb24gX29uUnRNb2RlbExvYWQobW9kZWwpIHtcbiAgLy8gY3VycmVudGx5IHdlIGp1c3Qgd2FudCB0byB1c2UgdGhpcyBzaW5nbGUgYXR0cmlidXRlIHRvIGJyb2FkY2FzdCBldmVudHNcbiAgdmFyIGpzb24gPSBtb2RlbC5nZXRSb290KCkuZ2V0KFwianNvblwiKTtcbiAgaWYoIGpzb24gPT0gbnVsbCApIHtcbiAgICB2YXIgc3RyaW5nID0gbW9kZWwuY3JlYXRlU3RyaW5nKFwie31cIik7XG4gICAgbW9kZWwuZ2V0Um9vdCgpLnNldChcImpzb25cIiwgc3RyaW5nKTtcbiAgfVxuXG4gIHZhciBsaXZlRWRpdHMgPSBtb2RlbC5nZXRSb290KCkuZ2V0KFwibGl2ZUVkaXRzXCIpO1xuICBpZiggbGl2ZUVkaXRzID09IG51bGwgKSB7XG4gICAgdmFyIGZpZWxkID0gbW9kZWwuY3JlYXRlTWFwKCk7XG4gICAgbW9kZWwuZ2V0Um9vdCgpLnNldChcImxpdmVFZGl0c1wiLCBmaWVsZCk7XG4gIH1cblxufVxuXG4vKioqXG4gKiBsZXQgdGhlIHdvcmxkIGtub3cgd2hhdCB3ZSBhcmUgZG9pbmcgOilcbiAqIFRoaXMgc2hvdWxkIGJlIGNhbGxlZCB3aGVuIGEgbG9jYWwgdXNlciBydW5zIHRoZSBtb2RlbC4gIEl0IHVwZGF0ZXMgdGhlICdqc29uJ1xuICogYXR0cmlidXRlIHdoaWNoIGlzIHRoZW4gYnJvYWRjYXN0IHRvIGFsbCBsaXN0ZW5pbmcgcGFydGllc1xuICoqKi9cbmZ1bmN0aW9uIHJ1bk1vZGVsUnQoKSB7XG4gIGlmKCBydEpzb24gKSBydEpzb24uc2V0VGV4dChKU09OLnN0cmluZ2lmeSggYXBwLmdldE1vZGVsSU8oKS5leHBvcnRTZXR1cCgpICkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgcnVuTW9kZWxSdCA6IHJ1bk1vZGVsUnQsXG4gIGluaXRSdEFwaSAgOiBpbml0UnRBcGksXG4gIHNldEFwcCA6IGZ1bmN0aW9uKGFwcGxpY2F0aW9uKSB7XG4gICAgYXBwID0gYXBwbGljYXRpb247XG4gIH1cbn07XG4iLCJ2YXIgb2ZmbGluZSA9IHJlcXVpcmUoJy4vb2ZmbGluZScpO1xudmFyIGdkcml2ZSA9IHJlcXVpcmUoJy4vZ29vZ2xlRHJpdmUnKTtcbnZhciBjaGFydHMgPSByZXF1aXJlKCcuL2NoYXJ0cycpO1xudmFyIHdlYXRoZXJDaGFydCA9IHJlcXVpcmUoJy4vd2VhdGhlci9jaGFydCcpO1xudmFyIHdlYXRoZXJGaWxlUmVhZGVyID0gcmVxdWlyZSgnLi93ZWF0aGVyL2ZpbGVSZWFkZXInKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihhcHApIHtcblxudmFyIHdlYXRoZXJBdmVyYWdlQ2hhcnQgPSBudWxsO1xudmFyIHdlYXRoZXJBdmVyYWdlQ2hhcnREYXRhID0ge307XG5cbnZhciBTRVRVUF9URU1QTEFURSA9XG4gICc8ZGl2PicrXG4gICc8aDQ+Q2hhcnQgT3B0aW9uczwvaDQ+JytcbiAgJzxkaXY+JytcbiAgICAgICc8dGFibGUgY2xhc3M9XCJ0YWJsZVwiPicrXG4gICAgICAgICAgJzx0cj4nK1xuICAgICAgICAgICAgICAnPHRkIHN0eWxlPVwid2lkdGg6NTAlXCI+T3V0cHV0IHZhcmlhYmxlKHMpIHRvIGNoYXJ0IDwvdGQ+JytcbiAgICAgICAgICAgICAgJzx0ZD4gPGEgaWQ9XCJzZWxlY3QtY2hhcnRzLWJ0blwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCI+U2VsZWN0IENoYXJ0czwvYT48L3RkPicrXG4gICAgICAgICAgJzwvdHI+JytcbiAgICAgICAgICAnPHRyPicrXG4gICAgICAgICAgICAgICc8dGQgc3R5bGU9XCJ3aWR0aDo1MCVcIj5WYXJpYXRpb24gYW5hbHlzaXMgcGFyYW1ldGVyKHMpIDwvdGQ+JytcbiAgICAgICAgICAgICAgJzx0ZD48ZGl2IGlkPVwidmFyaWF0aW9uQW5hbHlzaXNTdGF0dXNcIj5Ob25lPC9kaXY+PC90ZD4nK1xuICAgICAgICAgICc8L3RyPicrXG4gICAgICAnPC90YWJsZT4nK1xuICAnPC9kaXY+JytcbiAgJzxoND5Mb2NhdGlvbjwvaDQ+JytcbiAgICc8ZGl2IHN0eWxlPVwiYm9yZGVyLXRvcDoxcHggc29saWQgI2RkZDtwYWRkaW5nOjhweDtoZWlnaHQ6NjBweFwiPicrXG4gICAgICc8c3BhbiBpZD1cImN1cnJlbnQtbG9jYXRpb25cIiBzdHlsZT1cImNvbG9yOiM4ODhcIj48L3NwYW4+JytcbiAgICAgJzxhIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IHB1bGwtcmlnaHQgc2VsZWN0LXdlYXRoZXItbG9jYXRpb25cIj48aSBjbGFzcz1cImljb24tbWFwLW1hcmtlclwiPjwvaT4gU2VsZWN0IExvY2F0aW9uPC9hPicrXG4gICAgICc8L2Rpdj4nK1xuICAgICAnPGRpdj4nO1xuXG52YXIgR09PTEVEUklWRV9UUkVFX1RFTVBMQVRFID1cbiAgJzxkaXYgc3R5bGU9XCJwYWRkaW5nOjE1cHggMCA1cHggMDttYXJnaW4tYm90dG9tOjVweDtoZWlnaHQ6IDUwcHhcIj4nK1xuICAgICc8ZGl2IGNsYXNzPVwiYnRuLWdyb3VwIHB1bGwtcmlnaHRcIiBpZD1cInRyZWUtc3ViLW1lbnVcIj4nK1xuICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGRyb3Bkb3duLXRvZ2dsZVwiIGRhdGEtdG9nZ2xlPVwiZHJvcGRvd25cIj4nK1xuICAgICAgICAnPHNwYW4gaWQ9XCJsb2FkZWQtdHJlZS1uYW1lXCI+RGVmYXVsdCBUcmVlPC9zcGFuPiA8c3BhbiBjbGFzcz1cImNhcmV0XCI+PC9zcGFuPicrXG4gICAgICAnPC9idXR0b24+JytcbiAgICAgICc8dWwgY2xhc3M9XCJkcm9wZG93bi1tZW51XCIgcm9sZT1cIm1lbnVcIj4nK1xuICAgICAgICAnPGxpPjxhIGlkPVwiZ2RyaXZlLXRyZWVwYW5lbC1sb2FkXCI+PGkgY2xhc3M9XCJpY29uLWNsb3VkLWRvd25sb2FkXCI+PC9pPiBMb2FkIFRyZWU8L2E+PC9saT4nK1xuICAgICAgICAnPGxpPjxhIGlkPVwiZ2RyaXZlLXRyZWVwYW5lbC1zYXZlXCI+PGkgY2xhc3M9XCJpY29uLWNsb3VkLXVwbG9hZFwiPjwvaT4gU2F2ZSBUcmVlPC9hPjwvbGk+JytcbiAgICAgICAgJzxsaSBzdHlsZT1cImRpc3BsYXk6bm9uZVwiPjxhIGlkPVwic2hhcmUtdHJlZS1idG5cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiIHN0eWxlPVwiZGlzcGxheTpub25lO21hcmdpbi1sZWZ0OjEwcHhcIj48aSBjbGFzcz1cImljb24tc2hhcmVcIj48L2k+IFNoYXJlIFRyZWU8L2E+PC9saT4nK1xuICAgICAgJzwvdWw+JytcbiAgJzwvZGl2PicrXG4gICc8ZGl2IHN0eWxlPVwiZGlzcGxheTpub25lXCI+PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGlkPVwiY29tcGFyZS10cmVlc1wiIC8+IENvbXBhcmUgVHJlZXM8L2Rpdj4nK1xuJzwvZGl2Pic7XG5cbnZhciBJTlBVVF9URU1QTEFURSA9XG4gICc8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPicrXG4gICAgJzxsYWJlbCBmb3I9XCJ7e2lkfX1cIiBjbGFzcz1cImNvbC1sZy00IGNvbnRyb2wtbGFiZWxcIj57e2xhYmVsfX08L2xhYmVsPicrXG4gICAgJzxkaXYgY2xhc3M9XCJjb2wtbGctOFwiPicrXG4gICAgICAnPGlucHV0IHR5cGU9XCJ7e3R5cGV9fVwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgaWQ9XCJ7e2lkfX1cIiBzdHlsZT1cIndpZHRoOjIwMHB4O2Rpc3BsYXk6aW5saW5lLWJsb2NrXCIgdmFsdWU9XCJ7e3ZhbHVlfX1cIj4mbmJzcDsmbmJzcDt7e3VuaXRzfX0nK1xuICAgICAgJzxwIGNsYXNzPVwiaGVscC1ibG9ja1wiPnt7ZGVzY3JpcHRpb259fTwvcD4nICtcbiAgICAnPC9kaXY+JytcbiAgJzwvZGl2Pic7XG5cbnZhciBBUlJBWV9JTlBVVF9URU1QTEFURSA9XG4gICc8ZGl2IGNsYXNzPVwiY29sLWxnLTZcIj48ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPicrXG4gICAgJzxsYWJlbCBmb3I9XCJ7e2lkfX1cIiBjbGFzcz1cImNvbC1sZy00IGNvbnRyb2wtbGFiZWxcIj57e2xhYmVsfX08L2xhYmVsPicrXG4gICAgJzxkaXYgY2xhc3M9XCJjb2wtbGctOFwiPicrXG4gICAgICAne3tpbnB1dHN9fScrXG4gICAgICAnPHAgY2xhc3M9XCJoZWxwLWJsb2NrXCI+e3tkZXNjcmlwdGlvbn19PC9wPicgK1xuICAgICc8L2Rpdj4nK1xuICAnPC9kaXY+PC9kaXY+JztcblxudmFyIHRhYkhlYWRlciA9ICc8dWwgY2xhc3M9XCJuYXYgbmF2LXBpbGxzXCIgaWQ9XCJpbnB1dF9waWxsc1wiPic7XG52YXIgY29udGVudCA9ICc8ZGl2IGNsYXNzPVwidGFiLWNvbnRlbnRcIj4nO1xuXG52YXIgdHJlZUhlYWRlciA9ICc8ZGl2IGNsYXNzPVwicGFuZWwtZ3JvdXBcIiBpZD1cInRyZWUtYWNjb3JkaW9uXCI+JztcbnZhciBUUkVFX1BBTkVMX1RFTVBMQVRFID0gJzxkaXYgY2xhc3M9XCJwYW5lbCBwYW5lbC1kZWZhdWx0XCI+JytcbiAgICAgICAgJzxkaXYgY2xhc3M9XCJwYW5lbC1oZWFkaW5nXCI+JytcbiAgICAgICAgICAgICc8aDQgY2xhc3M9XCJwYW5lbC10aXRsZVwiPicrXG4gICAgICAgICAgICAgICAgJzxhIGNsYXNzPVwiYWNjb3JkaW9uLXRvZ2dsZVwiIGRhdGEtdG9nZ2xlPVwiY29sbGFwc2VcIiBkYXRhLXBhcmVudD1cIiN0cmVlLWFjY29yZGlvblwiIGhyZWY9XCIjY29sbGFwc2V7e2lkfX1cIj4nK1xuICAgICAgICAgICAgICAgICAgICAne3t0aXRsZX19JytcbiAgICAgICAgICAgICAgICAnPC9hPicrXG4gICAgICAgICAgICAnPC9oND4nK1xuICAgICAgICAnPC9kaXY+JytcbiAgICAgICAgJzxkaXYgaWQ9XCJjb2xsYXBzZXt7aWR9fVwiIGNsYXNzPVwicGFuZWwtY29sbGFwc2UgY29sbGFwc2VcIj4nK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJwYW5lbC1ib2R5XCI+e3tib2R5fX08L2Rpdj4nK1xuICAgICAgICAnPC9kaXY+JytcbiAgICAgJzwvZGl2Pic7XG5cbnZhciBpbnB1dHMgPSB7fTtcblxuLy8gZm9yIHdlYXRoZXIgZGF0YVxudmFyIGNvbHMgPSBbXTtcblxudmFyIG1hcCA9IG51bGw7XG5cbi8qKlxuICogT3B0aW9ucyA6XG4gKiAgIG1vZGVsIC0gdHlwZSBvZiBtb2RlbCB0byBhcHBlbmQgdG9cbiAqICAgbGFiZWwgLSBhdHRyaWJ1dGUgbGFiZWxcbiAqICAgdmFsdWUgLSBkZWZhdWx0IHZhbHVlXG4gKiAgIGRlc2NyaXB0aW9uIC0gZGVzY3JpcHRpb24gb2YgYXR0cmlidXRlXG4gKiAgIHVuaXRzIC0gYXR0cmlidXRlIHVuaXRzXG4gKi9cbmZ1bmN0aW9uIF9hZGRJbnB1dChvcHRpb25zKSB7XG4gIGlmKCAhaW5wdXRzW29wdGlvbnMubW9kZWxdICkgaW5wdXRzW29wdGlvbnMubW9kZWxdID0gW107XG4gIGlucHV0c1tvcHRpb25zLm1vZGVsXS5wdXNoKG9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiBfY3JlYXRlV2VhdGhlcklucHV0cygpIHtcbiAgZm9yKCB2YXIgYXR0ciBpbiBhcHAuZ2V0TW9kZWwoKS5nZXREYXRhTW9kZWwoKS53ZWF0aGVyICkge1xuICAgIGlmKCBhdHRyICE9IFwibnJlbFwiICkgY29scy5wdXNoKGF0dHIpO1xuICB9XG5cbiAgdmFyIHRhYmxlID0gJzxkaXYgc3R5bGU9XCJwYWRkaW5nLXRvcDoyNXB4XCI+PGEgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgcHVsbC1yaWdodFwiIGlkPVwibG9hZC13ZWF0aGVyLWJ0blwiPjxpIGNsYXNzPVwiaWNvbi11cGxvYWQtYWx0XCI+PC9pPiBVcGxvYWQ8L2E+JytcbiAgICAgICAgJzxkaXYgY2xhc3M9XCJidG4tZ3JvdXBcIiBpZD1cIndlYXRoZXItaW5wdXQtdG9nZ2xlXCI+JytcbiAgICAgICAgICAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgYWN0aXZlXCI+QXZlcmFnZXM8L2J1dHRvbj4nK1xuICAgICAgICAgICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiPkFjdHVhbDwvYnV0dG9uPicrXG4gICAgICAgICc8L2Rpdj4nK1xuICAgICAgICAnPC9kaXY+JytcbiAgICAgICAgJzxkaXYgaWQ9XCJjdXN0b20td2VhdGhlci1wYW5lbFwiIHN0eWxlPVwiZGlzcGxheTpub25lO21hcmdpbi10b3A6MjBweFwiPjwvZGl2PicrXG4gICAgICAgICc8ZGl2IGlkPVwiYXZlcmFnZS13ZWF0aGVyLXBhbmVsXCI+JytcbiAgICAgICAgJzxkaXYgc3R5bGU9XCJwYWRkaW5nOjEwcHg7Y29sb3I6Izg4OFwiPlNlbGVjdCBsb2NhdGlvbiB0byBzZXQgdGhlIGF2ZXJhZ2Ugd2VhdGhlciBkYXRhPC9kaXY+JytcbiAgICAgICAgJzx0YWJsZSBjbGFzcz1cInRhYmxlIHRhYmxlLXN0cmlwZWQgdGFibGUtY29uZGVuc2VkIHdlYXRoZXItdGFibGVcIiBzdHlsZT1cIm1hcmdpbi10b3A6MjBweFwiPic7XG5cbiAgdGFibGUgKz0gXCI8dHI+XCI7XG4gIGZvciggdmFyIGkgPSAwOyBpIDwgY29scy5sZW5ndGg7IGkrKyApIHtcbiAgICB0YWJsZSArPSBcIjx0ZD5cIitjb2xzW2ldK1wiPC90ZD5cIjtcbiAgfVxuICB0YWJsZSArPSBcIjwvdHI+XCI7XG5cbiAgZm9yKCB2YXIgaSA9IDA7IGkgPCAxMjsgaSsrICkge1xuICAgIHZhciBtID0gKGkrMSkrJyc7XG4gICAgaWYoIG0ubGVuZ3RoID09IDEgKSBtID0gJzAnK207XG5cbiAgICB0YWJsZSArPSBcIjx0cj5cIjtcbiAgICBmb3IoIHZhciBqID0gMDsgaiA8IGNvbHMubGVuZ3RoOyBqKysgKSB7XG4gICAgICBpZiggaiA9PSAwICkge1xuICAgICAgICB0YWJsZSArPSBcIjx0ZD5cIisoaSsxKStcIjwvdGQ+XCI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0YWJsZSArPSBcIjx0ZD48aW5wdXQgY2xhc3M9J2Zvcm0tY29udHJvbCcgaWQ9J2lucHV0LXdlYXRoZXItXCIrY29sc1tqXStcIi1cIittK1wiJyB0eXBlPSd0ZXh0JyAvPjwvdGQ+XCI7XG4gICAgICB9XG4gICAgfVxuICAgIHRhYmxlICs9IFwiPC90cj5cIjtcbiAgfVxuICByZXR1cm4gdGFibGUrJzwvdGFibGU+PGRpdiBpZD1cImF2ZXJhZ2Utd2VhdGhlci1jaGFydFwiPjwvZGl2PjwvZGl2Pic7XG5cbn1cblxuZnVuY3Rpb24gX3NldFdlYXRoZXJEYXRhKCkge1xuICB2YXIgbGwgPSBhcHAucXMoXCJsbFwiKTtcbiAgaWYoIGxsICkge1xuICAgIGxsID0gbGwuc3BsaXQoXCIsXCIpO1xuICAgIF9xdWVyeVdlYXRoZXJEYXRhKGxsWzBdLCBsbFsxXSwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGFwcC5ydW5Nb2RlbCgpO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgICQoXCIjY3VycmVudC1sb2NhdGlvblwiKS5odG1sKFwiTm90IFNldFwiKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfcXVlcnlXZWF0aGVyRGF0YShsbmcsIGxhdCwgY2FsbGJhY2spIHtcbiAgZ2EoJ3NlbmQnLCAnZXZlbnQnLCAndWknLCAnaW50ZXJhY3Rpb24nLCAnd2VhdGhlci1kYXRhLXF1ZXJ5JywgMSk7XG5cbiAgdmFyIHVybCA9IFwiaHR0cDovL2FsZGVyLmJpb2VuZXJneS5jYXNpbC51Y2RhdmlzLmVkdTo4MDgwL3ZpenNvdXJjZS9yZXN0P3ZpZXc9cG9pbnRUb1dlYXRoZXIoXCIrbG5nK1wiLFwiK2xhdCtcIiw4MTkyKVwiXG4gIHZhciBxID0gbmV3IGdvb2dsZS52aXN1YWxpemF0aW9uLlF1ZXJ5KHVybCk7XG4gIHZhciByZXNwcyA9IDA7XG5cbiAgZnVuY3Rpb24gY2hlY2tEb25lKCkge1xuICAgICAgcmVzcHMrKztcbiAgICAgIGlmKCByZXNwcyA9PSAyICYmIGNhbGxiYWNrICkgY2FsbGJhY2soKTtcbiAgfVxuXG4gIHEuc2V0UXVlcnkoJ1NFTEVDVCAqJyk7XG4gIHEuc2VuZChmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgdmFyIHRhYmxlID0gSlNPTi5wYXJzZShyZXNwb25zZS5nZXREYXRhVGFibGUoKS50b0pTT04oKSk7XG5cbiAgICBmb3IoIHZhciBpID0gMDsgaSA8IHRhYmxlLnJvd3MubGVuZ3RoOyBpKysgKSB7XG4gICAgICB2YXIgbSA9IChpKzEpKycnO1xuICAgICAgaWYoIG0ubGVuZ3RoID09IDEgKSBtID0gJzAnK207XG5cbiAgICAgIHdlYXRoZXJBdmVyYWdlQ2hhcnREYXRhW21dID0ge307XG4gICAgICBmb3IoIHZhciBqID0gMTsgaiA8IHRhYmxlLmNvbHMubGVuZ3RoOyBqKysgKSB7XG4gICAgICAgICQoXCIjaW5wdXQtd2VhdGhlci1cIitjb2xzW2pdK1wiLVwiK20pLnZhbCh0YWJsZS5yb3dzW2ldLmNbal0gPyB0YWJsZS5yb3dzW2ldLmNbal0udiA6IFwiXCIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZUF2ZXJhZ2VDaGFydCgpO1xuICAgIGNoZWNrRG9uZSgpO1xuICB9KTtcblxuICB2YXIgdXJsID0gXCJodHRwOi8vYWxkZXIuYmlvZW5lcmd5LmNhc2lsLnVjZGF2aXMuZWR1OjgwODAvdml6c291cmNlL3Jlc3Q/dmlldz1wb2ludFRvU09JTChcIitsbmcrXCIsXCIrbGF0K1wiLDgxOTIpXCJcbiAgdmFyIHEgPSBuZXcgZ29vZ2xlLnZpc3VhbGl6YXRpb24uUXVlcnkodXJsKTtcbiAgcS5zZXRRdWVyeSgnU0VMRUNUIConKTtcbiAgcS5zZW5kKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICB2YXIgZXJyb3IgPSBmYWxzZTtcbiAgICB2YXIgdGFibGUgPSBKU09OLnBhcnNlKHJlc3BvbnNlLmdldERhdGFUYWJsZSgpLnRvSlNPTigpKTtcbiAgICBmb3IoIHZhciBpID0gMDsgaSA8IHRhYmxlLmNvbHMubGVuZ3RoOyBpKysgKSB7XG4gICAgICBpZiggdGFibGUucm93c1swXSA9PSBudWxsICkge1xuICAgICAgICBlcnJvciA9IHRydWU7XG4gICAgICAgIGFsZXJ0KFwiSW52YWxpZCBsb2NhdGlvbiBzZWxlY3RlZFwiKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIHZhciBrZXkgPSB0YWJsZS5jb2xzW2ldLmlkO1xuICAgICAgaWYoIGtleSA9PT0gJ21heGF3cycgKSBrZXkgPSAnbWF4QVdTJztcblxuICAgICAgJChcIiNpbnB1dC1zb2lsLVwiK2tleSkudmFsKHRhYmxlLnJvd3NbMF0uY1tpXS52KTtcbiAgICB9XG5cbiAgICBpZiggIWVycm9yICkgY2hlY2tEb25lKCk7XG4gIH0pO1xuXG4gICQoXCIjY3VycmVudC1sb2NhdGlvblwiKS5odG1sKGxuZytcIiwgXCIrbGF0K1wiIDxhIGhyZWY9J1wiK3dpbmRvdy5sb2NhdGlvbi5ocmVmLnJlcGxhY2UoLyMuKi8sJycpK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCI/bGw9XCIrbG5nK1wiLFwiK2xhdCtcIicgdGFyZ2V0PSdfYmxhbmsnPjxpIGNsYXNzPSdpY29uLWxpbmsnPjwvaT48L2E+XCIpO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVBdmVyYWdlQ2hhcnQoKSB7XG4gIHdlYXRoZXJBdmVyYWdlQ2hhcnREYXRhID0ge307XG5cbiAgZm9yKCB2YXIgaSA9IDA7IGkgPCAxMjsgaSsrICkge1xuICAgIHZhciBtID0gKGkrMSkrJyc7XG4gICAgaWYoIG0ubGVuZ3RoID09IDEgKSBtID0gJzAnK207XG5cbiAgICB3ZWF0aGVyQXZlcmFnZUNoYXJ0RGF0YVttXSA9IHt9O1xuICAgIGZvciggdmFyIGogPSAxOyBqIDwgY29scy5sZW5ndGg7IGorKyApIHtcbiAgICAgIHZhciB2YWwgPSAkKFwiI2lucHV0LXdlYXRoZXItXCIrY29sc1tqXStcIi1cIittKS52YWwoKTtcbiAgICAgIGlmKCB2YWwgJiYgdmFsLmxlbmd0aCA+IDAgKSB3ZWF0aGVyQXZlcmFnZUNoYXJ0RGF0YVttXVtjb2xzW2pdXSA9IHBhcnNlSW50KHZhbCk7XG4gICAgICBlbHNlIHdlYXRoZXJBdmVyYWdlQ2hhcnREYXRhW21dW2NvbHNbal1dID0gMDtcbiAgICB9XG4gIH1cbiAgd2VhdGhlckF2ZXJhZ2VDaGFydCA9IHdlYXRoZXJDaGFydC5jcmVhdGUoJCgnI2F2ZXJhZ2Utd2VhdGhlci1jaGFydCcpWzBdLCB3ZWF0aGVyQXZlcmFnZUNoYXJ0RGF0YSk7XG59XG5cbmZ1bmN0aW9uIF9zZWxlY3RXZWF0aGVyTG9jYXRpb24oKSB7XG4gIGlmKCAhbWFwICkge1xuICAgICQoXCIjc2VsZWN0LXdlYXRoZXItbW9kYWxcIikubW9kYWwoe30pO1xuXG4gICAgJChcIiNsb2NhdGUtYnV0dG9uXCIpLm9uKCdjbGljaycsIF9nZXRMb2NhdGlvbik7XG5cblxuICAgIC8vIHdhaXQgZm9yIHRoZSBtb2RhbCB0byBpbml0XG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgaWYoIG9mZmxpbmVNb2RlICkgcmV0dXJuO1xuXG4gICAgICBtYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKCQoXCIjZ21hcFwiKVswXSwge1xuICAgICAgICBjZW50ZXIgOiBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKDM1LCAtMTIxKSxcbiAgICAgICAgem9vbTogNSxcbiAgICAgICAgbWFwVHlwZUlkIDogZ29vZ2xlLm1hcHMuTWFwVHlwZUlkLlJPQURNQVBcbiAgICAgIH0pO1xuXG4gICAgICB2YXIgZGVmYXVsdFN0eWxlID0ge1xuICAgICAgICAgICAgcG9seWdvbk9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgc3Ryb2tlQ29sb3IgICA6IFwiIzAwMDBGRlwiLFxuICAgICAgICAgICAgICBzdHJva2VPcGFjaXR5IDogMC41LFxuICAgICAgICAgICAgICBmaWxsQ29sb3IgICAgIDogJyNGRUZFRkUnLFxuICAgICAgICAgICAgICBmaWxsT3BhY2l0eSAgIDogMC4yXG4gICAgICAgICAgICB9LFxuICAgICAgfTtcblxuXG4gICAgICB2YXIgZGVmYXVsdE9wdGlvbnMgPSB7XG4gICAgICAgICAgcXVlcnk6IHtcbiAgICAgICAgICAgIHNlbGVjdDogJ2JvdW5kYXJ5JyxcbiAgICAgICAgICAgIGZyb206ICcxaFY5dlFHM1NjMEpMUGR1RnBXSnp0ZkxLLWV4NmNjeU1nX3B0RV9zJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAgc3R5bGVzOiBbZGVmYXVsdFN0eWxlXSxcbiAgICAgICAgICBzdXBwcmVzc0luZm9XaW5kb3dzIDogdHJ1ZVxuICAgICAgfTtcblxuICAgICAgdmFyIGZ1c2lvbkxheWVyID0gbmV3IGdvb2dsZS5tYXBzLkZ1c2lvblRhYmxlc0xheWVyKGRlZmF1bHRPcHRpb25zKTtcbiAgICAgIGZ1c2lvbkxheWVyLm9wYWNpdHkgPSAuODtcbiAgICAgIGZ1c2lvbkxheWVyLnNldE1hcChtYXApO1xuXG4gICAgICBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihtYXAsICdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYoICQoJyNsb2NhdGUtY2FjaGUtbW9kZScpLmlzKCc6Y2hlY2tlZCcpICkge1xuICAgICAgICAgIGFsZXJ0KCdZb3UgbXVzdCBjbGljayBvbiBhIGdlb21ldHJ5IHRvIGNhY2hlJyk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgX3F1ZXJ5V2VhdGhlckRhdGEoZS5sYXRMbmcubG5nKCksIGUubGF0TG5nLmxhdCgpLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgIGFwcC5ydW5Nb2RlbCgpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgJChcIiNzZWxlY3Qtd2VhdGhlci1tb2RhbFwiKS5tb2RhbCgnaGlkZScpO1xuICAgICAgfSk7XG4gICAgICBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihmdXNpb25MYXllciwgJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiggJCgnI2xvY2F0ZS1jYWNoZS1tb2RlJykuaXMoJzpjaGVja2VkJykgKSB7XG4gICAgICAgICAgb2ZmbGluZS5jYWNoZVRpbGUoZSwgZnVzaW9uTGF5ZXIsIGRlZmF1bHRPcHRpb25zLCBkZWZhdWx0U3R5bGUpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIF9xdWVyeVdlYXRoZXJEYXRhKGUubGF0TG5nLmxuZygpLCBlLmxhdExuZy5sYXQoKSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICBhcHAucnVuTW9kZWwoKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICQoXCIjc2VsZWN0LXdlYXRoZXItbW9kYWxcIikubW9kYWwoJ2hpZGUnKTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyBzZXR1cCBpbnB1dCBmb3IgY2xlYXJpbmcgY2FjaGVcbiAgICAgICAgICAkKCcjY2xlYXItY2FjaGVkLXRpbGVzJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgb2ZmbGluZS5jbGVhckNhY2hlKCk7XG4gICAgICAgICAgICAgIG9mZmxpbmUucmVuZGVyQ2FjaGVkVGlsZXNPbk1hcChmdXNpb25MYXllciwgZGVmYXVsdE9wdGlvbnMsIGRlZmF1bHRTdHlsZSk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgIG9mZmxpbmUucmVuZGVyQ2FjaGVkVGlsZXNPbk1hcChmdXNpb25MYXllciwgZGVmYXVsdE9wdGlvbnMsIGRlZmF1bHRTdHlsZSk7XG5cbiAgICB9LDUwMCk7XG4gIH0gZWxzZSB7XG4gICAgJChcIiNzZWxlY3Qtd2VhdGhlci1tb2RhbFwiKS5tb2RhbCgnc2hvdycpO1xuXG4gICAgLy8gd2Ugc2VlbSB0byBiZSBoYW5naW5nIHNvbWV0aW1lcy4uLi5cbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICBnb29nbGUubWFwcy5ldmVudC50cmlnZ2VyKG1hcCwgXCJyZXNpemVcIik7XG4gICAgfSwgNTAwKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfZ2V0TG9jYXRpb24oKSB7XG4gIGlmIChuYXZpZ2F0b3IuZ2VvbG9jYXRpb24pIHtcbiAgICBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24uZ2V0Q3VycmVudFBvc2l0aW9uKHNob3dQb3NpdGlvbik7XG4gICAgJChcIiNsb2NhdGUtYnV0dG9uXCIpLmFkZENsYXNzKFwiYnRuLXdhcm5pbmdcIik7XG4gIH0gZWxzZXtcbiAgICB3aW5kb3cuYWxlcnQoXCJHZW9sb2NhdGlvbiBpcyBub3Qgc3VwcG9ydGVkIGJ5IHRoaXMgYnJvd3Nlci5cIik7XG4gIH1cbiAgZnVuY3Rpb24gc2hvd1Bvc2l0aW9uKHBvc2l0aW9uKSB7XG4gICAgJChcIiNsb2NhdGUtYnV0dG9uXCIpLnJlbW92ZUNsYXNzKFwiYnRuLXdhcm5cIikuYWRkQ2xhc3MoXCJidG4tc3VjY2Vzc1wiKTtcbiAgICBtYXAuc2V0Wm9vbSgxMCk7XG4gICAgbWFwLnNldENlbnRlcihuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKHBvc2l0aW9uLmNvb3Jkcy5sYXRpdHVkZSwgcG9zaXRpb24uY29vcmRzLmxvbmdpdHVkZSkpO1xuICAgIC8vX3F1ZXJ5V2VhdGhlckRhdGEocG9zaXRpb24uY29vcmRzLmxvbmdpdHVkZSwgcG9zaXRpb24uY29vcmRzLmxhdGl0dWRlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfZ2VuZXJhdGVJbnB1dHMoaSwgdHlwZSwgcHJlZml4LCBuYW1lLCBhdHRycykge1xuICB2YXIgaWQgPSBwcmVmaXgubGVuZ3RoID4gMCA/IHByZWZpeCsnLScrbmFtZSA6ICdpbnB1dC0nK25hbWU7XG4gIHZhciBpbnB1dCA9ICc8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiIHN0eWxlPVwibWFyZ2luLWxlZnQ6JysoaSoyMCkrJ3B4O21hcmdpbi10b3A6MHB4O21hcmdpbi1yaWdodDo1cHhcIj4nO1xuXG4gIHZhciB0cmVlYm9keSA9IFwiXCI7XG5cbiAgaWYoICEoaSA9PSAxKSApIHtcbiAgICAgIGlmKCBpICE9IDAgKSBpbnB1dCArPSAnPGxhYmVsIGZvcj1cIicraWQrJ1wiIGNsYXNzPVwiY29udHJvbC1sYWJlbFwiPicrbmFtZSArJzwvbGFiZWw+JztcbiAgICAgIGlucHV0ICs9ICc8ZGl2Pic7XG4gIH1cblxuXG4gICAgICBpZiAoIHR5cGVvZiBhdHRycy52YWx1ZSA9PSAnb2JqZWN0JyAmJiBpID09IDEgICkgeyAvLyAmJiB0eXBlID09ICd0cmVlJyApIHtcbiAgICAgIGZvciggdmFyIGtleSBpbiBhdHRycy52YWx1ZSApIHtcbiAgICAgICAgICAgICAgdHJlZWJvZHkgKz0gX2dlbmVyYXRlSW5wdXRzKGkrMSwgdHlwZSwgaWQsIGtleSwgYXR0cnMudmFsdWVba2V5XSk7XG4gICAgICAgICAgfVxuICB9IGVsc2UgaWYgKCB0eXBlb2YgYXR0cnMudmFsdWUgPT0gJ29iamVjdCcgKSB7XG4gICAgICBpZiggYXR0cnMuZGVzY3JpcHRpb24gKSBpbnB1dCArPSAnPHAgY2xhc3M9XCJoZWxwLWJsb2NrXCI+JythdHRycy5kZXNjcmlwdGlvbisnPC9wPic7XG4gICAgICAgICAgZm9yKCB2YXIga2V5IGluIGF0dHJzLnZhbHVlICkge1xuICAgICAgICAgICAgICBpbnB1dCArPSBfZ2VuZXJhdGVJbnB1dHMoaSsxLCB0eXBlLCBpZCwga2V5LCBhdHRycy52YWx1ZVtrZXldKTtcbiAgICAgICAgICB9XG4gIH0gZWxzZSBpZiAoICh0eXBlb2YgYXR0cnMudmFsdWUgPT0gJ251bWJlcicgfHwgdHlwZW9mIGF0dHJzLnZhbHVlID09ICdzdHJpbmcnKSAmJiBpID09IDEgKSB7IC8vICYmIHR5cGUgPT0gJ3RyZWUnICkge1xuXG4gICAgICB0cmVlYm9keSArPVxuICAgICAgICAgICc8ZGl2PjxpbnB1dCB0eXBlPVwiJysoYXR0cnMudmFsdWUgPT0gJ19kYXRlXycgPyAnZGF0ZScgOiAndGV4dCcpKydcIiAnK1xuICAgICAgICAgICh0eXBlPT0nY29uc3RhbnRzJz8nZGlzYWJsZWQnOicnKSsnIGNsYXNzPVwiZm9ybS1jb250cm9sICcrdHlwZSsnXCIgaWQ9XCInK1xuICAgICAgICAgIGlkKydcIiBzdHlsZT1cIndpZHRoOjIwMHB4O2Rpc3BsYXk6aW5saW5lLWJsb2NrXCIgdmFsdWU9XCInXG4gICAgICAgICAgICAgICsoYXR0cnMudmFsdWUgPT0gJ19kYXRlXycgPyAnJyA6IGF0dHJzLnZhbHVlKSsnXCI+Jm5ic3A7Jm5ic3A7J1xuICAgICAgICAgICAgICArKGF0dHJzLnVuaXRzID8gYXR0cnMudW5pdHMgOiAnJykrJzwvZGl2Pic7XG5cbiAgfSBlbHNlIGlmICggIHR5cGVvZiBhdHRycy52YWx1ZSA9PSAnc3RyaW5nJyB8fCB0eXBlb2YgYXR0cnMudmFsdWUgPT0gJ251bWJlcicgKSB7XG5cbiAgICBpbnB1dCArPSAnPGRpdj48aW5wdXQgdHlwZT1cIicrKGF0dHJzLnZhbHVlID09ICdfZGF0ZV8nID8gJ2RhdGUnIDogJ3RleHQnKSsnXCIgJ1xuICAgICAgICAgICsodHlwZT09J2NvbnN0YW50cyc/J2Rpc2FibGVkJzonJykrJyBjbGFzcz1cImZvcm0tY29udHJvbCAnK3R5cGUrXG4gICAgICAgICAgICdcIiBpZD1cIicraWQrJ1wiIHN0eWxlPVwid2lkdGg6MjAwcHg7ZGlzcGxheTppbmxpbmUtYmxvY2tcIiB2YWx1ZT1cIidcbiAgICAgICAgICArKGF0dHJzLnZhbHVlID09ICdfZGF0ZV8nID8gJycgOiBhdHRycy52YWx1ZSkrJ1wiPiZuYnNwOyZuYnNwOydcbiAgICAgICAgICArKGF0dHJzLnVuaXRzID8gYXR0cnMudW5pdHMgOiAnJykrJzwvZGl2Pic7XG5cbiAgICBpZiggYXR0cnMuZGVzY3JpcHRpb24gKSBpbnB1dCArPSAnPHAgY2xhc3M9XCJoZWxwLWJsb2NrXCI+JythdHRycy5kZXNjcmlwdGlvbisnPC9wPic7XG4gIH1cblxuICBpZiggIShpID09IDEgLyomJiB0eXBlID09ICd0cmVlJyovKSApIHtcbiAgICAgIGlucHV0ICs9ICc8L2Rpdj48L2Rpdj4nO1xuICB9IGVsc2Uge1xuICAgICAgaW5wdXQgKz0gVFJFRV9QQU5FTF9URU1QTEFURVxuICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL3t7aWR9fS9nLGlkKVxuICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoJ3t7dGl0bGV9fScsbmFtZStcIiA8c3BhbiBzdHlsZT0nY29sb3I6Izg4ODtmb250LXNpemU6MTJweCc+IC0gXCIrYXR0cnMuZGVzY3JpcHRpb24rXCI8L3NwYW4+XCIpXG4gICAgICAgICAgICAgICAgICAucmVwbGFjZSgne3tib2R5fX0nLHRyZWVib2R5KSsnPC9kaXY+J1xuICB9XG5cbiAgcmV0dXJuIGlucHV0O1xufVxuXG5mdW5jdGlvbiBjcmVhdGUoZWxlKSB7XG4gIHdlYXRoZXJGaWxlUmVhZGVyLmluaXQoKTtcbiAgdmFyIG1vZGVsLCBtLCBhdHRyLCBjb25maWc7XG5cbiAgdmFyIGlucHV0cyA9ICQuZXh0ZW5kKHRydWUsIHt9LCBhcHAuZ2V0TW9kZWwoKS5nZXREYXRhTW9kZWwoKSk7XG5cbiAgaW5wdXRzWydzZXR1cCddID0ge307XG4gIGZvciggbW9kZWwgaW4gaW5wdXRzICkge1xuICAgIG0gPSBpbnB1dHNbbW9kZWxdO1xuICAgIGZvciggYXR0ciBpbiBtICkge1xuICAgICAgY29uZmlnID0gbVthdHRyXTtcblxuICAgICAgaWYoIHR5cGVvZiBjb25maWcgPT0gJ29iamVjdCcgKSB7XG4gICAgICAgIF9hZGRJbnB1dCh7XG4gICAgICAgICAgbW9kZWwgICAgICAgOiBtb2RlbCxcbiAgICAgICAgICBsYWJlbCAgICAgICA6IGF0dHIsXG4gICAgICAgICAgZGVzY3JpcHRpb24gOiBjb25maWcuZGVzY3JpcHRpb24sXG4gICAgICAgICAgdmFsdWUgICAgICAgOiBjb25maWcudmFsdWUsXG4gICAgICAgICAgdW5pdHMgICAgICAgOiBjb25maWcudW5pdHNcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBfYWRkSW5wdXQoe1xuICAgICAgICAgIG1vZGVsICAgICAgIDogbW9kZWwsXG4gICAgICAgICAgbGFiZWwgICAgICAgOiBhdHRyXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG5cbiAgZm9yKCBtb2RlbCBpbiBpbnB1dHMgKSB7XG4gICAgaWYoIG1vZGVsID09IFwicGxhbnRhdGlvbl9zdGF0ZVwiICkgY29udGludWU7XG5cbiAgICB0YWJIZWFkZXIgKz0gJzxsaT48YSBocmVmPVwiI2lucHV0c18nK21vZGVsKydcIiBpZD1cInRhYl9pbnB1dHNfJyttb2RlbCsnXCIgZGF0YS10b2dnbGU9XCJwaWxsXCI+J1xuICAgICAgICAgICAgICAgICttb2RlbC5zdWJzdHIoMCwxKS50b1VwcGVyQ2FzZSgpK21vZGVsLnN1YnN0cigxKS50b0xvd2VyQ2FzZSgpKyc8L2E+PC9saT4nO1xuICAgIHZhciBhdHRyaWJ1dGVzID0gaW5wdXRzW21vZGVsXTtcblxuICAgIGNvbnRlbnQgKz0gJyA8ZGl2IGNsYXNzPVwidGFiLXBhbmUgZmFkZVwiIGlkPVwiaW5wdXRzXycrbW9kZWwrJ1wiPic7XG5cbiAgICB2YXIgcm93MSA9IFwiXCI7XG4gICAgdmFyIHJvdzIgPSBcIjxkaXYgY2xhc3M9J2NvbC1sZy02PlwiO1xuXG4gICAgaWYoIG1vZGVsID09ICd3ZWF0aGVyJyApIHtcbiAgICAgIGNvbnRlbnQgKz0gX2NyZWF0ZVdlYXRoZXJJbnB1dHMoKTtcbiAgICB9IGVsc2UgaWYoIG1vZGVsID09ICdzZXR1cCcgKSB7XG4gICAgICBjb250ZW50ICs9IFNFVFVQX1RFTVBMQVRFO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnRlbnQgKz0gdHJlZUhlYWRlcjtcblxuICAgICAgICAvLyBhZGQgdGhlIGdvb2dsZSBkcml2ZSBidG4gZnJvbSB0cmVlc1xuICAgICAgICBpZiggbW9kZWwgPT0ndHJlZScgKSB7XG4gICAgICAgICAgY29udGVudCArPSBfY3JlYXRlVHJlZUlucHV0KG1vZGVsLCBpbnB1dHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnRlbnQgKz0gX2dlbmVyYXRlSW5wdXRzKDAsIG1vZGVsLCAnJywgbW9kZWwsIGlucHV0c1ttb2RlbF0pO1xuICAgICAgICB9XG5cbiAgICAgIGNvbnRlbnQgKz0gJzwvZGl2Pic7XG4gICAgfVxuXG5cbiAgICBjb250ZW50ICs9ICc8L2Rpdj4nO1xuICB9XG4gIGNvbnRlbnQgKz0gJzwvZGl2Pic7XG4gIHRhYkhlYWRlciArPSBcIjwvdWw+XCI7XG5cbiAgZWxlLmh0bWwodGFiSGVhZGVyK1wiPGRpdiBjbGFzcz0nZm9ybS1ob3Jpem9udGFsJz5cIitjb250ZW50K1wiPC9kaXY+XCIpO1xuXG4gIC8vIHJ1biB0aGUgbW9kZWwgd2hlbmV2ZXIgc29tZSBoaXRzICdlbnRlcidcbiAgZWxlLmZpbmQoJ2lucHV0Jykub24oJ2tleXVwJyxmdW5jdGlvbihlKXtcbiAgICBpZiggZS53aGljaCA9PSAxMyApIGFwcC5ydW5Nb2RlbCgpO1xuICB9KTtcblxuICAvLyBhZGQgY2xpY2sgaGFuZGxlciBmb3IgbG9hZGluZyBhIHRyZWVcbiAgZWxlLmZpbmQoXCIjZ2RyaXZlLXRyZWVwYW5lbC1sb2FkXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgZ2RyaXZlLnNob3dMb2FkVHJlZVBhbmVsKCk7XG4gIH0pO1xuICBlbGUuZmluZChcIiNnZHJpdmUtdHJlZXBhbmVsLXNhdmVcIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICBnZHJpdmUuc2hvd1NhdmVUcmVlUGFuZWwoKTtcbiAgfSk7XG5cbiAgLy8gc2V0IHRyZWUgaW5wdXQgaGFuZGxlcnNcbiAgJChcIiNjb21wYXJlLXRyZWVzXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgaWYoICQodGhpcykuaXMoJzpjaGVja2VkJykgKSB7XG4gICAgICAkKFwiI3NpbmdsZS10cmVlLWNvbnRlbnRcIikuaGlkZSgpO1xuICAgICAgJChcIiNjb21wYXJlLXRyZWUtY29udGVudFwiKS5zaG93KCk7XG4gICAgICAkKFwiI3RyZWUtc3ViLW1lbnVcIikuaGlkZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAkKFwiI3NpbmdsZS10cmVlLWNvbnRlbnRcIikuc2hvdygpO1xuICAgICAgJChcIiNjb21wYXJlLXRyZWUtY29udGVudFwiKS5oaWRlKCk7XG4gICAgICAkKFwiI3RyZWUtc3ViLW1lbnVcIikuc2hvdygpO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gc2V0IHBpbGwgY2xpY2sgaGFuZGxlcnNcbiAgJCgnI2lucHV0X3BpbGxzIGEnKS5jbGljayhmdW5jdGlvbiAoZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAkKHRoaXMpLnRhYignc2hvdycpXG4gIH0pO1xuICAkKCcjdGFiX2lucHV0c193ZWF0aGVyJykudGFiKCdzaG93Jyk7XG5cbiAgJCgnLnNlbGVjdC13ZWF0aGVyLWxvY2F0aW9uJykub24oJ2NsaWNrJywgX3NlbGVjdFdlYXRoZXJMb2NhdGlvbik7XG5cblxuICAkKCcjd2VhdGhlclJlYWRlci1tb2RhbCcpLm1vZGFsKHtzaG93OmZhbHNlfSk7XG4gICQoJyNsb2FkLXdlYXRoZXItYnRuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAkKCcjd2VhdGhlclJlYWRlci1tb2RhbCcpLm1vZGFsKCdzaG93Jyk7XG4gIH0pO1xuXG4gICQoXCIjd2VhdGhlci1pbnB1dC10b2dnbGUgLmJ0blwiKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICQoJyN3ZWF0aGVyLWlucHV0LXRvZ2dsZSAuYnRuLmFjdGl2ZScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAkKHRoaXMpLmFkZENsYXNzKCdhY3RpdmUnKTtcblxuICAgIGlmKCAkKHRoaXMpLmh0bWwoKSA9PSAnQXZlcmFnZXMnICkge1xuICAgICAgJCgnI2F2ZXJhZ2Utd2VhdGhlci1wYW5lbCcpLnNob3coKTtcbiAgICAgICQoJyNjdXN0b20td2VhdGhlci1wYW5lbCcpLmhpZGUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBwLnNldFdlYXRoZXIoKTtcbiAgICAgICQoJyNhdmVyYWdlLXdlYXRoZXItcGFuZWwnKS5oaWRlKCk7XG4gICAgICAkKCcjY3VzdG9tLXdlYXRoZXItcGFuZWwnKS5zaG93KCk7XG4gICAgfVxuICB9KTtcblxuICAkKHdpbmRvdykub24oJ3Jlc2l6ZScsIGZ1bmN0aW9uKCl7XG4gICAgaWYoIHdlYXRoZXJBdmVyYWdlQ2hhcnQgKXtcbiAgICAgIHdlYXRoZXJBdmVyYWdlQ2hhcnQgPSB3ZWF0aGVyQ2hhcnQuY3JlYXRlKCQoJyNhdmVyYWdlLXdlYXRoZXItY2hhcnQnKVswXSwgd2VhdGhlckF2ZXJhZ2VDaGFydERhdGEpO1xuICAgIH1cbiAgfSk7XG5cbiAgX3NldFdlYXRoZXJEYXRhKCk7XG59XG5cbmZ1bmN0aW9uIF9jcmVhdGVUcmVlSW5wdXQobW9kZWwsIGlucHV0cykge1xuICB2YXIgY29udGVudCA9IFwiXCI7XG4gIGNvbnRlbnQgKz0gR09PTEVEUklWRV9UUkVFX1RFTVBMQVRFO1xuXG4gIGNvbnRlbnQgKz0gJzxkaXYgaWQ9XCJzaW5nbGUtdHJlZS1jb250ZW50XCI+JztcbiAgY29udGVudCArPSBfZ2VuZXJhdGVJbnB1dHMoMCwgbW9kZWwsICcnLCBtb2RlbCwgaW5wdXRzW21vZGVsXSk7XG4gIGNvbnRlbnQgKz0gJzwvZGl2Pic7XG5cbiAgY29udGVudCArPSAnPGRpdiBpZD1cImNvbXBhcmUtdHJlZS1jb250ZW50XCIgc3R5bGU9XCJkaXNwbGF5Om5vbmVcIj4nK1xuICAgICAgICAnPHVsIGNsYXNzPVwibmF2IG5hdi10YWJzXCI+JytcbiAgICAgICAgICAnPGxpIGNsYXNzPVwiYWN0aXZlXCI+PGEgaHJlZj1cIiN0cmVlMVwiIGRhdGEtdG9nZ2xlPVwidGFiXCI+VHJlZSAxPC9hPjwvbGk+JytcbiAgICAgICAgICAgICc8bGk+PGEgaHJlZj1cIiN0cmVlMlwiIGRhdGEtdG9nZ2xlPVwidGFiXCI+VHJlZSAyPC9hPjwvbGk+JytcbiAgICAgICAgJzwvdWw+JytcbiAgICAgICAgJzxkaXYgY2xhc3M9XCJ0YWItY29udGVudFwiPicrXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cInRhYi1wYW5lIGFjdGl2ZVwiIGlkPVwidHJlZTFcIj4nK1xuICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cIndlbGxcIiBzdHlsZT1cInRleHQtYWxpZ246Y2VudGVyO21hcmdpbi10b3A6MTBweFwiPicrXG4gICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJidG4tZ3JvdXBcIj4nK1xuICAgICAgICAgICAgICAgICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBhY3RpdmVcIj5DdXN0b208L2J1dHRvbj4nK1xuICAgICAgICAgICAgICAgICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiPlNlbGVjdCBUcmVlPC9idXR0b24+JytcbiAgICAgICAgICAgICAgJzwvZGl2PicrXG4gICAgICAgICAgICAgICc8L2Rpdj4nK1xuICAgICAgICAgICAgICBfZ2VuZXJhdGVJbnB1dHMoMCwgbW9kZWwsICd0MScsIG1vZGVsLCBpbnB1dHNbbW9kZWxdKStcbiAgICAgICAgICAgICc8L2Rpdj4nK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJ0YWItcGFuZSBhY3RpdmVcIiBpZD1cInRyZWUyXCI+JytcbiAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJ3ZWxsXCIgc3R5bGU9XCJ0ZXh0LWFsaWduOmNlbnRlcjttYXJnaW4tdG9wOjEwcHhcIiA+JytcbiAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImJ0bi1ncm91cFwiPicrXG4gICAgICAgICAgICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGFjdGl2ZVwiPkN1c3RvbTwvYnV0dG9uPicrXG4gICAgICAgICAgICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCI+U2VsZWN0IFRyZWU8L2J1dHRvbj4nK1xuICAgICAgICAgICAgICAnPC9kaXY+JytcbiAgICAgICAgICAgICAgJzwvZGl2PicrXG4gICAgICAgICAgICAgIF9nZW5lcmF0ZUlucHV0cygwLCBtb2RlbCwgJ3QyJywgbW9kZWwsIGlucHV0c1ttb2RlbF0pK1xuICAgICAgICAgICAgJzwvZGl2PicrXG4gICAgICAgICAgJzwvZGl2PicrXG4gICAgICAgICAnPC9kaXY+JztcblxuICByZXR1cm4gY29udGVudDtcbn1cblxuXG5yZXR1cm4ge1xuICBjcmVhdGUgOiBjcmVhdGUsXG4gIHVwZGF0ZUF2ZXJhZ2VDaGFydDogdXBkYXRlQXZlcmFnZUNoYXJ0XG59O1xuXG59O1xuIiwidmFyIGNvbmZpZyA9IHJlcXVpcmUoJy4vY29uZmlnJyk7XG52YXIgYXBwID0gcmVxdWlyZSgnLi9hcHAnKTtcblxuLy8gU3BlY2lhbCBTYXVjZS4uLlxuLy8gYmFzaWNhbGx5IHRoZSBjb2RlIGxvYWRlZCBmcm9tIEdpdEh1YiBleHBlY3RzIHRoZSBmb2xsb3dpbmcgdG8gZXhpc3RzIGluIHRoZSB3aW5kb3cgc2NvcGVcbi8vICAgbTNQR0lPXG4vLyAgICAgLSByZWFkQWxsQ29udGFudHNcbi8vICAgICAtIHJlYWRXZWF0aGVyXG4vLyAgICAgLSBkdW1wXG4vLyAgICAgLSByZWFkRnJvbUlucHV0c1xuLy8gU28gd2UgaW5qZWN0IGZ1bmN0aW9ucyB0aGF0IGludGVyYWN0IHcvIG91ciBVSSwgbW9kZWwgaW4gbm8gd2F5IGNhcmVzXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgcmVhZCA6IGZ1bmN0aW9uKG1vZGVsKSB7XG4gICAgdGhpcy5tb2RlbCA9IG1vZGVsO1xuXG4gICAgbW9kZWwuZGVidWcgPSB0cnVlO1xuXG4gICAgaWYoICFtb2RlbC5wbGFudGF0aW9uICkgbW9kZWwucGxhbnRhdGlvbiA9IHt9O1xuICAgIHRoaXMucmVhZEFsbENvbnN0YW50cyhtb2RlbC5wbGFudGF0aW9uKTtcblxuICAgIGlmKCAhbW9kZWwud2VhdGhlciApIG1vZGVsLndlYXRoZXIgPSB7fTtcbiAgICBpZiggIW1vZGVsLm1hbmFnZSApIG1vZGVsLm1hbmFnZSA9IHt9O1xuICAgIGlmKCAhbW9kZWwuY3VzdG9tX3dlYXRoZXIgKSBtb2RlbC5jdXN0b21fd2VhdGhlciA9IHt9O1xuXG4gICAgdGhpcy5yZWFkV2VhdGhlcihtb2RlbC53ZWF0aGVyLCBtb2RlbC5tYW5hZ2UsIG1vZGVsLmN1c3RvbV93ZWF0aGVyKTtcblxuICAgIGRlbGV0ZSB0aGlzLm1vZGVsLm1hbmFnZS5jb3BwaWNlRGF0ZXM7XG4gIH0sXG4gIHJlYWRBbGxDb25zdGFudHMgOiBmdW5jdGlvbihwbGFudGF0aW9uKSB7XG4gICAgICB0aGlzLnJlYWRGcm9tSW5wdXRzKCk7XG5cbiAgICAgIC8vZm9yICggdmFyIGtleSBpbiB0aGlzLm1vZGVsLnBsYW50YXRpb24pIHtcbiAgICAgIC8vICAgIHBsYW50YXRpb25ba2V5XSA9IHRoaXMubW9kZWwucGxhbnRhdGlvbltrZXldO1xuICAgICAgLy99XG5cbiAgICAgIHBsYW50YXRpb24uY29wcGljZWRUcmVlID0gdGhpcy5tb2RlbC50cmVlO1xuXG4gICAgICAvLyBzZXR1cCBzZWVkbGluZyBUcmVlXG4gICAgICAvLyBUT0RPOiBoYXJkY29kZWQgZm9yIG5vdywgdGhpcyBzaG91bGRuJ3QgYmVcbiAgICAgIHBsYW50YXRpb24uc2VlZGxpbmdUcmVlID0gJC5leHRlbmQodHJ1ZSwge30sIHRoaXMubW9kZWwudHJlZSk7XG4gICAgICBwbGFudGF0aW9uLnNlZWRsaW5nVHJlZS5zdGVtc1BlclN0dW1wID0gMTtcbiAgICAgIHBsYW50YXRpb24uc2VlZGxpbmdUcmVlLnBmcy5zdGVtQ250ID0gMTtcbiAgICAgIHBsYW50YXRpb24uc2VlZGxpbmdUcmVlLnJvb3RQID0ge1xuICAgICAgICAgIExBSVRhcmdldCA6IDEwLFxuICAgICAgICAgIGVmZmljaWVuY3kgOiAwLjYsXG4gICAgICAgICAgZnJhYyA6IDAuMDFcbiAgICAgIH07XG4gIH0sXG5cbiAgcmVhZFdlYXRoZXIgOiBmdW5jdGlvbih3ZWF0aGVyTWFwLCBtYW5hZ2UsIGN1c3RvbVdlYXRoZXJNYXApIHtcbiAgICAgIHZhciBkYXRlUGxhbnRlZCA9ICQoXCIjaW5wdXQtbWFuYWdlLWRhdGVQbGFudGVkXCIpLnZhbCgpO1xuICAgICAgaWYgKGRhdGVQbGFudGVkICYmIGRhdGVQbGFudGVkICE9IFwiXCIpIHtcbiAgICAgICAgICBtYW5hZ2UuZGF0ZVBsYW50ZWQgPSBuZXcgRGF0ZSgkKFwiI2lucHV0LW1hbmFnZS1kYXRlUGxhbnRlZFwiKS52YWwoKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgIG1hbmFnZS5kYXRlUGxhbnRlZCA9IG5ldyBEYXRlKCk7XG4gICAgICB9XG5cbiAgICAgIHZhciBkYXRlQ29wcGljZWQgPSAkKFwiI2lucHV0LW1hbmFnZS1kYXRlQ29wcGljZWRcIikudmFsKCk7XG4gICAgICBpZiAoZGF0ZUNvcHBpY2VkICYmIGRhdGVDb3BwaWNlZCAhPSBcIlwiKSB7XG4gICAgICAgICAgbWFuYWdlLmRhdGVDb3BwaWNlZCA9IG5ldyBEYXRlKCQoXCIjaW5wdXQtbWFuYWdlLWRhdGVDb3BwaWNlZFwiKS52YWwoKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgLy8gc2V0IGVycm9yIGNvbmRpdGlvbiA6IFRPRE9cbiAgICAgIH1cblxuICAgICAgdmFyIERhdGVGaW5hbEhhcnZlc3QgPSAkKFwiI2lucHV0LW1hbmFnZS1kYXRlRmluYWxIYXJ2ZXN0XCIpLnZhbCgpO1xuICAgICAgaWYgKERhdGVGaW5hbEhhcnZlc3QgJiYgRGF0ZUZpbmFsSGFydmVzdCAhPSBcIlwiKSB7XG4gICAgICAgICAgbWFuYWdlLkRhdGVGaW5hbEhhcnZlc3QgPSBuZXcgRGF0ZSgkKFwiI2lucHV0LW1hbmFnZS1kYXRlRmluYWxIYXJ2ZXN0XCIpLnZhbCgpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICAvLyBzZXQgZXJyb3IgY29uZGl0aW9uIDogVE9ET1xuICAgICAgfVxuXG4gICAgICB2YXIgeWVhcnNQZXJDb3BwaWNlID0gJChcIiNpbnB1dC1tYW5hZ2UtY29wcGljZUludGVydmFsXCIpLnZhbCgpO1xuICAgICAgaWYgKHllYXJzUGVyQ29wcGljZSAmJiB5ZWFyc1BlckNvcHBpY2UgIT0gXCJcIikge1xuICAgICAgICAgIG1hbmFnZS55ZWFyc1BlckNvcHBpY2UgPSBwYXJzZUludCgkKFwiI2lucHV0LW1hbmFnZS1jb3BwaWNlSW50ZXJ2YWxcIikudmFsKCkpO1xuICAgICAgfVxuXG5cbiAgICAgIGZvciAoIHZhciBpID0gMDsgaSA8IDEyOyBpKyspIHtcbiAgICAgICAgICB2YXIgaXRlbSA9IHtcbiAgICAgICAgICAgICAgbW9udGggOiAoaSArIDEpXG4gICAgICAgICAgfTtcbiAgICAgICAgICB2YXIgbSA9IChpKzEpKycnO1xuICAgICAgICAgIGlmKCBtLmxlbmd0aCA9PT0gMSApIG0gPSAnMCcrbTtcblxuICAgICAgICAgIGZvciAoIHZhciBqID0gMTsgaiA8IGNvbmZpZy5pbnB1dHMud2VhdGhlci5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICB2YXIgYyA9IGNvbmZpZy5pbnB1dHMud2VhdGhlcltqXTtcbiAgICAgICAgICAgICAgaXRlbVtjXSA9IHRoaXMuX3JlYWRWYWwoJChcIiNpbnB1dC13ZWF0aGVyLVwiICsgYyArIFwiLVwiICsgbSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpdGVtLm5yZWwgPSBpdGVtLnJhZCAvIDAuMDAzNjtcblxuICAgICAgICAgIHdlYXRoZXJNYXBbbV0gPSBpdGVtO1xuICAgICAgfVxuXG4gICAgICBpZiggdGhpcy5tb2RlbC5jdXN0b21fd2VhdGhlciApIHtcbiAgICAgICAgICBmb3IoIHZhciBkYXRlIGluIHRoaXMubW9kZWwuY3VzdG9tX3dlYXRoZXIgKSB7XG4gICAgICAgICAgICAgIHRoaXMubW9kZWwuY3VzdG9tX3dlYXRoZXJbZGF0ZV0ubnJlbCA9IHRoaXMubW9kZWwuY3VzdG9tX3dlYXRoZXJbZGF0ZV0ucmFkIC8gMC4wMDM2O1xuICAgICAgICAgICAgICAvL2N1c3RvbVdlYXRoZXJNYXBbZGF0ZV0gPSBjdXN0b21fd2VhdGhlcltkYXRlXTtcbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gd2VhdGhlck1hcDtcbiAgfSxcblxuICAvLyByZWFkIGEgdmFsdWUgZnJvbSB0aGUgaW5wdXRcbiAgLy8gaXQgaGFzIGEgJywnIGlzIHNldCBmb3IgdmFyaWF0aW9uXG4gIF9yZWFkVmFsIDogZnVuY3Rpb24oZWxlKSB7XG4gICAgICB2YXIgdmFsID0gZWxlLnZhbCgpO1xuICAgICAgaWYoIHZhbC5tYXRjaCgvXFxkKi1cXGQqLVxcZCokLykgKSB7XG4gICAgICAgICAgcmV0dXJuIHZhbDtcbiAgICAgIH0gZWxzZSBpZiggdmFsLm1hdGNoKC8uKiwuKi8pICkge1xuICAgICAgICAgIHZhbCA9IHZhbC5yZXBsYWNlKC9cXHMvZywnJykuc3BsaXQoXCIsXCIpO1xuICAgICAgICAgIHZhciBpZCA9IGVsZS5hdHRyKFwiaWRcIikucmVwbGFjZSgvXmlucHV0LS8sJycpLnJlcGxhY2UoLy0vZywnLicpO1xuICAgICAgICAgIHRoaXMubW9kZWwudmFyaWF0aW9uc1tpZF0gPSBbXTtcbiAgICAgICAgICBmb3IoIHZhciBpID0gMDsgaSA8IHZhbC5sZW5ndGg7IGkrKyApIHtcbiAgICAgICAgICAgICAgdGhpcy5tb2RlbC52YXJpYXRpb25zW2lkXS5wdXNoKHBhcnNlRmxvYXQodmFsW2ldKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0aGlzLm1vZGVsLnZhcmlhdGlvbnNbaWRdWzBdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHBhcnNlRmxvYXQodmFsKTtcbiAgfSxcblxuICBkdW1wIDogZnVuY3Rpb24oZGF0YSkge1xuICAgIC8vIHNob3VsZCBiZSBvdmVyd3JpdHRlbiBpbiBhcHBcbiAgfSxcblxuICByZWFkRnJvbUlucHV0cyA6IGZ1bmN0aW9uKCkge1xuICAgICAgLy8gcmVhZCBzb2lsXG4gICAgICB0aGlzLm1vZGVsLnNvaWwgPSB7fTtcbiAgICAgIHRoaXMubW9kZWwuc29pbC5tYXhBV1MgPSB0aGlzLl9yZWFkVmFsKCQoXCIjaW5wdXQtc29pbC1tYXhBV1NcIikpO1xuICAgICAgdGhpcy5tb2RlbC5zb2lsLnN3cG93ZXIgPSB0aGlzLl9yZWFkVmFsKCQoXCIjaW5wdXQtc29pbC1zd3Bvd2VyXCIpKTtcbiAgICAgIHRoaXMubW9kZWwuc29pbC5zd2NvbnN0ID0gdGhpcy5fcmVhZFZhbCgkKFwiI2lucHV0LXNvaWwtc3djb25zdFwiKSk7XG5cbiAgICAgIC8vIHJlYWQgbWFuYWdlXG4gICAgICB0aGlzLm1vZGVsLm1hbmFnZSA9IHtcbiAgICAgICAgICBjb3BwaWNlIDogZmFsc2VcbiAgICAgIH07XG4gICAgICB2YXIgZWxlcyA9ICQoXCIubWFuYWdlXCIpO1xuICAgICAgZm9yICggdmFyIGkgPSAwOyBpIDwgZWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHZhciBlbGUgPSAkKGVsZXNbaV0pO1xuICAgICAgICAgIHRoaXMubW9kZWwubWFuYWdlW2VsZS5hdHRyKFwiaWRcIikucmVwbGFjZShcImlucHV0LW1hbmFnZS1cIiwgXCJcIildID0gdGhpcy5fcmVhZFZhbChlbGUpO1xuICAgICAgfVxuXG4gICAgICAvLyByZWFkIHBsYW50YXRpb25cbiAgICAgIGlmKCAhdGhpcy5tb2RlbC5wbGFudGF0aW9uICkgdGhpcy5tb2RlbC5wbGFudGF0aW9uID0ge307XG4gICAgICBlbGVzID0gJChcIi5wbGFudGF0aW9uXCIpO1xuICAgICAgZm9yICggdmFyIGkgPSAwOyBpIDwgZWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHZhciBlbGUgPSAkKGVsZXNbaV0pO1xuICAgICAgICAgIHRoaXMubW9kZWwucGxhbnRhdGlvbltlbGUuYXR0cihcImlkXCIpLnJlcGxhY2UoXCJpbnB1dC1wbGFudGF0aW9uLVwiLCBcIlwiKV0gPSB0aGlzLl9yZWFkVmFsKGVsZSk7XG4gICAgICB9XG5cbiAgICAgIC8vIHJlYWQgdHJlZVxuICAgICAgdmFyIHRyZWVJbnB1dHMgPSAkKFwiLnRyZWVcIik7XG4gICAgICB0aGlzLm1vZGVsLnRyZWUgPSB7fTtcbiAgICAgIGZvciAoIHZhciBpID0gMDsgaSA8IHRyZWVJbnB1dHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB2YXIgZWxlID0gJCh0cmVlSW5wdXRzW2ldKTtcblxuICAgICAgICAgIHZhciBwYXJ0cyA9IGVsZS5hdHRyKFwiaWRcIikucmVwbGFjZShcImlucHV0LXRyZWUtXCIsIFwiXCIpLnNwbGl0KFwiLVwiKTtcbiAgICAgICAgICBpZiAocGFydHMubGVuZ3RoID09IDEpIHtcbiAgICAgICAgICAgICAgdGhpcy5tb2RlbC50cmVlW3BhcnRzWzBdXSA9IHRoaXMuX3JlYWRWYWwoZWxlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBpZiAoIXRoaXMubW9kZWwudHJlZVtwYXJ0c1swXV0pXG4gICAgICAgICAgICAgICAgICB0aGlzLm1vZGVsLnRyZWVbcGFydHNbMF1dID0ge307XG4gICAgICAgICAgICAgIHRoaXMubW9kZWwudHJlZVtwYXJ0c1swXV1bcGFydHNbMV1dID0gdGhpcy5fcmVhZFZhbChlbGUpO1xuICAgICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gcmVhZCBwbGFudGF0aW9uIHN0YXRlXG4gICAgICBpZiggIXRoaXMubW9kZWwucGxhbnRhdGlvbl9zdGF0ZSApIHRoaXMubW9kZWwucGxhbnRhdGlvbl9zdGF0ZSA9IHt9O1xuICAgICAgZm9yICggdmFyIGtleSBpbiB0aGlzLm1vZGVsLmdldERhdGFNb2RlbCgpLnBsYW50YXRpb25fc3RhdGUudmFsdWUgKSB7XG4gICAgICAgICAgdGhpcy5tb2RlbC5wbGFudGF0aW9uX3N0YXRlW2tleV0gPSAtMTtcbiAgICAgIH1cblxuICB9LFxuXG4gIC8vIHRoaXMgaXMgdGhlIHNuYXBzaG90IHdlIHNhdmUgdG8gZ29vZ2xlIGRyaXZlXG4gIGV4cG9ydFNldHVwIDogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLm1vZGVsLnZhcmlhdGlvbnMgPSB7fTtcbiAgICAgIHRoaXMucmVhZEZyb21JbnB1dHMoKTtcbiAgICAgIHRoaXMucmVhZFdlYXRoZXIoW10sIHt9LCB7fSk7XG5cbiAgICAgIHZhciBleCA9IHtcbiAgICAgICAgICB3ZWF0aGVyIDogdGhpcy5tb2RlbC53ZWF0aGVyLFxuICAgICAgICAgIGN1c3RvbV93ZWF0aGVyIDogdGhpcy5tb2RlbC5jdXN0b21fd2VhdGhlcixcbiAgICAgICAgICB0cmVlIDogdGhpcy5tb2RlbC50cmVlLFxuICAgICAgICAgIHBsYW50YXRpb24gOiB0aGlzLm1vZGVsLnBsYW50YXRpb24sXG4gICAgICAgICAgbWFuYWdlIDogdGhpcy5tb2RlbC5tYW5hZ2UsXG4gICAgICAgICAgc29pbCA6IHRoaXMubW9kZWwuc29pbCxcbiAgICAgICAgICBtYW5hZ2UgOiB0aGlzLm1vZGVsLm1hbmFnZSxcbiAgICAgICAgICBwbGFudGF0aW9uX3N0YXRlIDogdGhpcy5tb2RlbC5wbGFudGF0aW9uX3N0YXRlLFxuICAgICAgICAgIGNvbmZpZyA6IHtcbiAgICAgICAgICAgICAgY2hhcnRUeXBlSW5wdXQgOiAkKFwiI2NoYXJ0VHlwZUlucHV0XCIpLnZhbCgpLFxuICAgICAgICAgICAgICBtb250aHNUb1J1biA6IHRoaXMuYXBwLm1vbnRoc1RvUnVuKCksXG4gICAgICAgICAgICAgIGN1cnJlbnRMb2NhdGlvbiA6ICQoXCIjY3VycmVudC1sb2NhdGlvblwiKS5odG1sKCksXG4gICAgICAgICAgICAgIGxvYWRlZFRyZWUgOiAkKFwiI2xvYWRlZC10cmVlLW5hbWVcIikuaHRtbCgpLFxuICAgICAgICAgICAgICB2ZXJzaW9uIDogdGhpcy5hcHAucXMoXCJ2ZXJzaW9uXCIpID8gdGhpcy5hcHAucXMoXCJ2ZXJzaW9uXCIpIDogXCJtYXN0ZXJcIlxuICAgICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gYnkgZGVmYXVsdCB0aGUgcmVhZCBmdW5jdGlvbiBzZXQgdGhlIHZhcmlhdGlvbnMgdmFyaWFibGVzIGJ1dCBvbmx5XG4gICAgICAvLyByZXR1cm5zIHRoZSBmaXJzdCwgc2V0IHRoZSB2YXJpYXRpb24gcGFyYW1zIHRvIHRoZWlyIGNvcnJlY3QgdmFsdWVzXG4gICAgICBmb3IoIHZhciBrZXkgaW4gdGhpcy5tb2RlbC52YXJpYXRpb25zICkge1xuICAgICAgICAgIHZhciBwYXJ0cyA9IGtleS5zcGxpdChcIi5cIik7XG4gICAgICAgICAgdmFyIHBhcmFtID0gZXg7XG4gICAgICAgICAgZm9yKCB2YXIgaSA9IDA7IGkgPCBwYXJ0cy5sZW5ndGgtMTsgaSsrICkge1xuICAgICAgICAgICAgICBwYXJhbSA9IHBhcmFtW3BhcnRzW2ldXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcGFyYW1bcGFydHNbcGFydHMubGVuZ3RoLTFdXSA9IHRoaXMubW9kZWwudmFyaWF0aW9uc1trZXldLmpvaW4oXCIsIFwiKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGV4O1xuICB9LFxuICBsb2FkVHJlZSA6IGZ1bmN0aW9uKHRyZWUpIHtcbiAgICAgIGZvciAoIHZhciByb290S2V5IGluIHRyZWUpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIHRyZWVbcm9vdEtleV0gIT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgJChcIiNpbnB1dC10cmVlLVwiICsgcm9vdEtleSkudmFsKHRyZWVbcm9vdEtleV0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGZvciAoIHZhciBjaGlsZEtleSBpbiB0cmVlW3Jvb3RLZXldKSB7XG4gICAgICAgICAgICAgICAgICAkKFwiI2lucHV0LXRyZWUtXCIgKyByb290S2V5ICsgXCItXCIgKyBjaGlsZEtleSkudmFsKHRyZWVbcm9vdEtleV1bY2hpbGRLZXldKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgIH1cbiAgfSxcbiAgbG9hZFNldHVwIDogZnVuY3Rpb24oZmlsZWlkLCBzZXR1cCwgaXNSdCkge1xuXG4gICAgICAvLyBsb2FkIGNvbmZpZ1xuICAgICAgaWYgKHNldHVwLmNvbmZpZy5jaGFydFR5cGVJbnB1dCkge1xuICAgICAgICAgIHRoaXMuY2hhcnRzLnVuc2VsZWN0QWxsKCk7XG4gICAgICAgICAgZm9yICggdmFyIGkgPSAwOyBpIDwgc2V0dXAuY29uZmlnLmNoYXJ0VHlwZUlucHV0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgIHRoaXMuY2hhcnRzLnNlbGVjdChzZXR1cC5jb25maWcuY2hhcnRUeXBlSW5wdXRbaV0pO1xuICAgICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzZXR1cC5jb25maWcuY3VycmVudExvY2F0aW9uKSB7XG4gICAgICAgICAgJChcIiNjdXJyZW50LWxvY2F0aW9uXCIpLmh0bWwoc2V0dXAuY29uZmlnLmN1cnJlbnRMb2NhdGlvbik7XG4gICAgICB9XG4gICAgICBpZiggc2V0dXAuY29uZmlnLmxvYWRlZFRyZWUgKSB7XG4gICAgICAgICAgJChcIiNsb2FkZWQtdHJlZS1uYW1lXCIpLmh0bWwoc2V0dXAuY29uZmlnLmxvYWRlZFRyZWUpLnBhcmVudCgpLnNob3coKTtcbiAgICAgIH1cblxuICAgICAgLy8gbG9hZCB3ZWF0aGVyXG4gICAgICBpZiggQXJyYXkuaXNBcnJheShzZXR1cC53ZWF0aGVyKSApIHtcbiAgICAgICAgZm9yICggdmFyIGkgPSAwOyBpIDwgc2V0dXAud2VhdGhlci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgZm9yICggdmFyIGtleSBpbiBzZXR1cC53ZWF0aGVyW2ldKSB7XG4gICAgICAgICAgICAgICAgaWYgKGtleSA9PSAnbW9udGgnKVxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBpZiAoc2V0dXAud2VhdGhlcltpXVtrZXldICE9IG51bGwpXG4gICAgICAgICAgICAgICAgICAgICQoXCIjaW5wdXQtd2VhdGhlci1cIiArIGtleSArIFwiLVwiICsgaSkudmFsKHNldHVwLndlYXRoZXJbaV1ba2V5XSlcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICQoXCIjaW5wdXQtd2VhdGhlci1cIiArIGtleSArIFwiLVwiICsgaSkudmFsKFwiXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgaW5jSW5kZXggPSBmYWxzZSwgaW5kZXg7XG4gICAgICAgIGlmKCBzZXR1cC53ZWF0aGVyWzBdICE9PSB1bmRlZmluZWQgfHwgc2V0dXAud2VhdGhlclsnMCddICE9PSB1bmRlZmluZWQgKSB7XG4gICAgICAgICAgaW5jSW5kZXggPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yICggdmFyIGkgaW4gc2V0dXAud2VhdGhlciApIHtcbiAgICAgICAgICAgIGZvciAoIHZhciBrZXkgaW4gc2V0dXAud2VhdGhlcltpXSkge1xuICAgICAgICAgICAgICAgIGlmIChrZXkgPT0gJ21vbnRoJykgY29udGludWU7XG5cblxuICAgICAgICAgICAgICAgIGlmKCBpbmNJbmRleCApIGluZGV4ID0gKHBhcnNlSW50KGkpKzEpKycnO1xuICAgICAgICAgICAgICAgIGVsc2UgaW5kZXggPSBpKycnO1xuXG4gICAgICAgICAgICAgICAgaWYoIGluZGV4Lmxlbmd0aCA9PT0gMSApIGluZGV4ID0gJzAnK2luZGV4O1xuXG4gICAgICAgICAgICAgICAgaWYgKHNldHVwLndlYXRoZXJbaV1ba2V5XSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAkKFwiI2lucHV0LXdlYXRoZXItXCIgKyBrZXkgKyBcIi1cIiArIGluZGV4KS52YWwoc2V0dXAud2VhdGhlcltpXVtrZXldKVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICQoXCIjaW5wdXQtd2VhdGhlci1cIiArIGtleSArIFwiLVwiICsgaW5kZXgpLnZhbChcIlwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYoIHNldHVwLmN1c3RvbV93ZWF0aGVyICkge1xuICAgICAgICAgIHRoaXMubW9kZWwuY3VzdG9tX3dlYXRoZXIgPSBzZXR1cC5jdXN0b21fd2VhdGhlcjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5tb2RlbC5jdXN0b21fd2VhdGhlciA9IHt9O1xuICAgICAgfVxuXG4gICAgICAvLyBjcmVhdGUgdGhlIGNoYXJ0XG4gICAgICB0aGlzLmlucHV0Rm9ybS51cGRhdGVBdmVyYWdlQ2hhcnQoKTtcblxuICAgICAgLy8gbG9hZCB0cmVlXG4gICAgICB0aGlzLmxvYWRUcmVlKHNldHVwLnRyZWUpO1xuXG4gICAgICAvLyBsb2FkIHBsYW50aW5nIHBhcmFtc1xuICAgICAgLy8gTm93IHBhcnQgb2YgbWFuYWdlLi4uLlxuICAgICAgLy8gZm9cbiAgICAgIGlmIChzZXR1cC5tYW5hZ2UpIHtcbiAgICAgICAgICB2YXIgbWFwID0ge1xuICAgICAgICAgICAgICBcImRhdGVQbGFudGVkXCIgOiBcIkRhdGVQbGFudGVkXCIsXG4gICAgICAgICAgICAgIFwiZGF0ZUNvcHBpY2VkXCIgOiBcIkRhdGVDb3BwaWNlZFwiLFxuICAgICAgICAgICAgICBcInllYXJzUGVyQ29wcGljZVwiIDogXCJDb3BwaWNlSW50ZXJ2YWxcIlxuICAgICAgICAgIH1cblxuICAgICAgICAgIGZvciAoIHZhciBrZXkgaW4gc2V0dXAubWFuYWdlKSB7XG4gICAgICAgICAgICAgIHZhciBuZXdLZXkgPSBrZXk7XG4gICAgICAgICAgICAgIGlmKCBtYXBba2V5XSApIG5ld0tleSA9IG1hcFtrZXldO1xuXG4gICAgICAgICAgICAgIGlmICh0eXBlb2Ygc2V0dXAubWFuYWdlW2tleV0gPT0gJ3N0cmluZycpXG4gICAgICAgICAgICAgICAgICAkKFwiI2lucHV0LW1hbmFnZS1cIiArIG5ld0tleSkudmFsKHNldHVwLm1hbmFnZVtrZXldLnJlcGxhY2UoL1QuKi8sICcnKSk7XG4gICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICQoXCIjaW5wdXQtbWFuYWdlLVwiICsgbmV3S2V5KS52YWwoc2V0dXAubWFuYWdlW2tleV0pO1xuICAgICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gdGhpcyB2YWx1ZSBpcyBkZXByZWNhdGVkLCBzZXQgdG8gbmV3IGlucHV0XG4gICAgICBpZiggc2V0dXAuY29uZmlnLm1vbnRoc1RvUnVuICkge1xuICAgICAgICAgIHZhciBkID0gbmV3IERhdGUoc2V0dXAubWFuYWdlLmRhdGVQbGFudGVkIHx8IHNldHVwLm1hbmFnZS5EYXRlUGxhbnRlZCk7XG4gICAgICAgICAgZCA9IG5ldyBEYXRlKG5ldyBEYXRlKGQpLnNldE1vbnRoKGQuZ2V0TW9udGgoKStwYXJzZUludChzZXR1cC5jb25maWcubW9udGhzVG9SdW4pKSk7XG4gICAgICAgICAgJChcIiNpbnB1dC1tYW5hZ2UtZGF0ZUZpbmFsSGFydmVzdFwiKS52YWwoZC50b0lTT1N0cmluZygpLnJlcGxhY2UoL1QuKi8sICcnKSk7XG4gICAgICB9XG5cblxuICAgICAgLy8gbG9hZCByZXN0XG4gICAgICB2YXIgaW5wdXRzID0gWyBcInBsYW50YXRpb25cIiwgXCJzb2lsXCIsIFwibWFuYWdlXCIgXTtcbiAgICAgIGZvciAoIHZhciBpID0gMDsgaSA8IGlucHV0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGZvciAoIHZhciBrZXkgaW4gc2V0dXBbaW5wdXRzW2ldXSkge1xuICAgICAgICAgICAgICBpZiAoa2V5ID09ICdtYXhBV1MnKSB7XG4gICAgICAgICAgICAgICAgICAkKFwiI2lucHV0LXNvaWwtbWF4QVdTXCIpLnZhbChzZXR1cC5zb2lsLm1heEFXUyk7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoIHR5cGVvZiBzZXR1cFtpbnB1dHNbaV1dW2tleV0gPT0gJ3N0cmluZycgJiYgc2V0dXBbaW5wdXRzW2ldXVtrZXldLm1hdGNoKC8uKlQuKlokLykgKSB7XG4gICAgICAgICAgICAgICAgICAkKFwiI2lucHV0LVwiICsgaW5wdXRzW2ldICsgXCItXCIgKyBrZXkpLnZhbChzZXR1cFtpbnB1dHNbaV1dW2tleV0ucmVwbGFjZSgvVC4qLywgJycpKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICQoXCIjaW5wdXQtXCIgKyBpbnB1dHNbaV0gKyBcIi1cIiArIGtleSkudmFsKHNldHVwW2lucHV0c1tpXV1ba2V5XSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLmFwcC5ydW5Nb2RlbChpc1J0KTtcbiAgfVxufTtcbiIsIlxuICAvLyBtdXN0IGluc3RhbGwgdGhpcyBmb3IgbmF0aXZlIHBob25lZ2FwIHN1cHBvcnQ6XG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9waG9uZWdhcC1idWlsZC9DaGlsZEJyb3dzZXJcblxudmFyIHdpbiA9IG51bGw7XG5cbi8qIHRoZSBrZXkgZm9yIHJlZnJlc2ggVG9rZW4gaW4gbG9jYWwgU3RvcmFnZSAqL1xudmFyIHRva2VuS2V5ID0gJ3JlZnJlc2hfdG9rZW4nO1xuXG4vKiBzdG9yZXMgdGhlIGFjY2Vzc1Rva2VuIGFmdGVyIHJldHJpZXZhbCBmcm9tIGdvb2dsZSBzZXJ2ZXIgKi9cbnZhciBhY2Nlc3NUb2tlbiA9IG51bGw7XG5cbi8qIHN0b3JlcyB0aGUgVGltZSB3aGVuIGFjY2VzcyB0b2tlbiB3YXMgbGFzdCByZWNlaXZlZCBmcm9tIHNlcnZlciAqL1xudmFyIGFjY2Vzc1Rva2VuVGltZSA9IG51bGw7XG5cbi8qIHN0b3JlcyBhY2Nlc3MgVG9rZW4ncyBFeHBpcnkgTGltaXQuIFVzZXMgNTggbWluLiBpbnN0ZWFkIG9mIDYwIG1pbi4gKi9cbnZhciBhY2Nlc3NUb2tlbkV4cGlyeUxpbWl0ID0gNTggKiA2MCAqIDEwMDA7XG5cbi8qIEEgdGVtcG9yYXJ5IHZhcmlhYmxlIHN0b3JpbmcgY2FsbGJhY2sgZnVuY3Rpb24gKi9cbnZhciBjYWxsYmFja0Z1bmMgPSBmYWxzZTtcblxuLy8gYXJlIHdlIHJ1bm5pbmcgbmF0aXZlIG9yIGJyb3dzZXIgbW9kZT9cbnZhciBpc05hdGl2ZSA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmLm1hdGNoKC9eZmlsZS4qLykgPyB0cnVlIDogZmFsc2U7XG5cbnZhciBDTElFTlRfSUQgPSBpc05hdGl2ZSA/XG4gICAgICAgIFwiMzQ0MTkwNzEzNDY1LWRpaW10ZmVyaDR0amIwMzE2OWJrbDlta29xdnEycnU5LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tXCIgOlxuICAgICAgICAgXCIzNDQxOTA3MTM0NjUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb21cIjtcblxudmFyIEFQUF9JRCA9IFwiMzQ0MTkwNzEzNDY1XCI7XG5cbnZhciBPQVVUSF9TQ09QRVMgPSAnaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vYXV0aC9kcml2ZS5maWxlICdcbiAgKyAnaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vYXV0aC9kcml2ZS5pbnN0YWxsICdcbiAgKyAnaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vYXV0aC91c2VyaW5mby5wcm9maWxlJztcblxuLyogY29uZmlnIHZhbHVlcyBmb3IgR29vZ2xlIEFQSSAoZ2FwaSkgKi9cbnZhciBnYXBpQ29uZmlnID0ge1xuICBlbmRwb2ludDogXCJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20vby9vYXV0aDIvYXV0aFwiLFxuICBlbmR0b2tlbjogXCJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20vby9vYXV0aDIvdG9rZW5cIiwgLy8gdG9rZW4gZW5kcG9pbnRcbiAgcmVkaXJlY3RfdXJpIDogXCJodHRwOi8vbG9jYWxob3N0XCIsXG4gIGNsaWVudF9zZWNyZXQgOiAnNnJPUTlsMGZ5bmgxMzdNUlhHSy1HX1pnJyxcbiAgcmVzcG9uc2VfdHlwZSA6IFwiY29kZVwiLFxuICBjbGllbnRfaWQgOiBDTElFTlRfSUQsXG4gIHN0YXRlIDogXCJnZHJpdmVpbml0XCIsXG4gIGFjY2Vzc190eXBlIDogXCJvZmZsaW5lXCIsXG4gIHNjb3BlIDogT0FVVEhfU0NPUEVTLFxuXG4gIC8qIEFzIGRlZmluZWQgaW4gdGhlIE9BdXRoIDIuMCBzcGVjaWZpY2F0aW9uLCB0aGlzIGZpZWxkIG11c3QgY29udGFpbiBhIHZhbHVlXG4gICAgICogb2YgXCJhdXRob3JpemF0aW9uX2NvZGVcIiBvciBcInJlZnJlc2hfdG9rZW5cIiAqL1xuICAgIGdyYW50VHlwZXM6IHsgQVVUSE9SSVpFOiBcImF1dGhvcml6YXRpb25fY29kZVwiLCBSRUZSRVNIOiBcInJlZnJlc2hfdG9rZW5cIiB9LFxuIH07XG5cbi8qKlxuICogRW51bSBmb3IgU3RhdHVzIHZhbHVlc1xuICpcbiAqIEBlbnVtIHtudW1iZXJ9XG4gKlxuICogU1VDQ0VTUyAtIFN1Y2Nlc3NmdWxseSBkYXRhIHJlY2VpdmVkIGZyb20gc2VydmVyXG4gKiBFUlJPUiAtIEVycm9yIG9jY3VycmVkIHdoZW4gdHJ5aW5nIHRvIHJlY2VpdmUgZnJvbSBzZXJ2ZXJcbiAqIE5PVF9ERVRFUk1JTkVEIC0gdW5kZXRlcm1pbmVkXG4gKi9cbnZhciBzdGF0dXMgPSB7XG4gICAgICAgIFNVQ0VTUzogMSxcbiAgICAgICAgRVJST1I6IC0xLFxuICAgICAgICBOT1RfREVURVJNSU5FRDogMFxufVxuXG5yZXF1ZXN0U3RhdHVzID0gMDtcblxuLyogc3RvcmVzIHRoZSBhdXRob3JpemF0aW9uIENvZGUgaW50ZXJuYWxseSAqL1xuYXV0aENvZGUgPSBmYWxzZTtcblxuLyogc3RvcmVzIHRoZSBlcnJvciBtZXNzYWdlIHdoZW4gYW4gZXJyb3IgaGFwcGVucyBmcm9tIGdvb2dsZSBzZXJ2ZXIgKi9cbmVycm9yTWVzc2FnZSA9IGZhbHNlO1xuXG52YXIgbG9nID0gZnVuY3Rpb24obXNnKSB7XG4gIGNvbnNvbGUubG9nKFwiKioqT0FVVEgqKio6IFwiK21zZyk7XG59XG5cbi8qKlxuICogQXR0ZW1wdHMgdG8gYXV0aG9yaXplIHVzZXIgdXNpbmcgT0F1dGhcbiAqIE9wZW5zIHVwIEFub3RoZXIgd2luZG93IHdoZXJlIHVzZXIgYWxsb3dzIGFjY2VzcyBvciBkZW5pZXMgaXQuXG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbEJhY2sgICBBIGNhbGxiYWNrIGZ1bmN0aW9uIHdoaWNoIGlzIGludm9rZWRcbiAqL1xudmFyIGF1dGhvcml6ZSA9IGZ1bmN0aW9uKGNhbGxCYWNrKSB7XG4gIGxvZyhcImF0dGVtcHRpbmcgdG8gYXV0aG9yaXplXCIpO1xuXG4gICAgdmFyIGF1dGhVcmkgPSBnYXBpQ29uZmlnLmVuZHBvaW50ICsgJz8nXG4gICAgKyAnc2NvcGU9JyArIGVuY29kZVVSSUNvbXBvbmVudChnYXBpQ29uZmlnLnNjb3BlKVxuICAgICsgJyYnICsgJ3JlZGlyZWN0X3VyaT0nICsgZW5jb2RlVVJJQ29tcG9uZW50KGdhcGlDb25maWcucmVkaXJlY3RfdXJpKVxuICAgICsgJyYnICsgJ3Jlc3BvbnNlX3R5cGU9JyArIGVuY29kZVVSSUNvbXBvbmVudChnYXBpQ29uZmlnLnJlc3BvbnNlX3R5cGUpXG4gICAgKyAnJicgKyAnY2xpZW50X2lkPScgKyBlbmNvZGVVUklDb21wb25lbnQoZ2FwaUNvbmZpZy5jbGllbnRfaWQpO1xuICAgIC8vKyAnJicgKyAnc3RhdGU9JyArIGVuY29kZVVSSUNvbXBvbmVudChnYXBpQ29uZmlnLnN0YXRlKVxuICAgIC8vKyAnJicgKyAnYWNjZXNzX3R5cGU9JyArIGVuY29kZVVSSUNvbXBvbmVudChnYXBpQ29uZmlnLmFjY2Vzc190eXBlKVxuICAgIC8vKyAnJicgKyAnYXBwcm92YWxfcHJvbXB0PWZvcmNlJzsgLy8gQFRPRE8gLSBjaGVjayBpZiB3ZSByZWFsbHkgbmVlZCB0aGlzIHBhcmFtXG5cbiAgICBjYWxsYmFja0Z1bmMgPSBjYWxsQmFjaztcbiAgICByZXF1ZXN0U3RhdHVzID0gc3RhdHVzLk5PVF9ERVRFUk1JTkVEO1xuXG5cblxuXG4gICAgbG9nKFwib3BlbmluZyBJbkFwcEJyb3dzZXJcIik7XG5cbiAgICB0cnkge1xuXG4gICAgICAvLyBOb3cgb3BlbiBuZXcgYnJvd3NlclxuICAgICAgd2luID0gd2luZG93Lm9wZW4oYXV0aFVyaSwgJ19ibGFuaycsICdsb2NhdGlvbj1ubyx0b29sYmFyPW5vJyk7XG5cbiAgICAgICQod2luKS5vbignbG9hZHN0YXJ0JyxmdW5jdGlvbihlKXtcbiAgICAgICAgbG9nKFwiSW5BcHBCcm93c2VyIGxvYWRzdGFydFwiKTtcbiAgICAgICAgY29uc29sZS5sb2coZS5vcmlnaW5hbEV2ZW50LnVybCk7XG4gICAgICAgIG9uQXV0aFVybENoYW5nZShlLm9yaWdpbmFsRXZlbnQudXJsKTtcbiAgICAgIH0pO1xuXG4gICAgICAvL3dpbmRvdy5wbHVnaW5zLmNoaWxkQnJvd3Nlci5zaG93V2ViUGFnZShhdXRoVXJpLCB7c2hvd0xvY2F0aW9uQmFyIDogdHJ1ZX0pO1xuICAgICAgLy93aW5kb3cucGx1Z2lucy5jaGlsZEJyb3dzZXIub25DbG9zZSA9IG9uQXV0aENsb3NlO1xuICAgICAgLy93aW5kb3cucGx1Z2lucy5jaGlsZEJyb3dzZXIub25Mb2NhdGlvbkNoYW5nZSA9IG9uQXV0aFVybENoYW5nZTtcbiAgICB9IGNhdGNoKGUpIHtcbiAgICAgIGxvZyhcIkVycm9yIG9wZW5pbmcgSW5BcHBCcm93c2VyXCIpO1xuICAgICAgbG9nKGUpO1xuICAgIH1cblxufTtcblxuaWYoICFpc05hdGl2ZSApIHtcbiAgYXV0aG9yaXplID0gZnVuY3Rpb24oY2FsbGJhY2ssIGltbWVkaWF0ZSkge1xuICBnYXBpLmF1dGguYXV0aG9yaXplKHtcbiAgICBjbGllbnRfaWQgOiBDTElFTlRfSUQsXG4gICAgc2NvcGUgOiBPQVVUSF9TQ09QRVMsXG4gICAgaW1tZWRpYXRlIDogaW1tZWRpYXRlXG4gIH0sIGZ1bmN0aW9uKCkge1xuICAgIGF1dGhDb2RlID0gZ2FwaS5hdXRoLmdldFRva2VuKCk7XG4gICAgY2FsbGJhY2soYXV0aENvZGUpO1xuICB9KTtcblxuICB9XG59XG5cbi8qIEF1dGggV2luZG93IGNsb3NlZCAqL1xudmFyIG9uQXV0aENsb3NlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJBdXRoIHdpbmRvdyBjbG9zZWRcIik7XG59O1xuXG4vKiBPQXV0aCBTdWNjZXNzZnVsbHkgZG9uZSAqL1xudmFyIG9uQXV0aFN1Y2Nlc3MgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgLy9jb25zb2xlLmxvZygnQXV0aCBTdWNjZXNzPycpO1xufTtcblxuLyoqXG4gKiBHZXRzIEludm9rZWQgd2hlbiB0aGUgVVJMIGNoYW5nZXMgb24gT0F1dGggYXV0aG9yaXphdGlvbiBwcm9jZXNzXG4gKlxuICogU3VjY2VzcyBVUkwgUGF0dGVybjpcbiAqIFwicmVkaXJlY3RfdXJpXCIgKyBcIj9jb2RlPVwiIFtzZWNyZXQgY29kZSB2YWxdXG4gKlxuICogU3VjY2VzcyBTYW1wbGUgVVJMOlxuICogaHR0cDovL2xvY2FsaG9zdC8/Y29kZT00L1dPcFJMUWZ2dmhIRTB0dU1VRERxbm43NmxDVFQuOG5YQzRJZWJNRUFVdUpKVm5MNDlDYzhBUUdyOGNRSVxuICpcbiAqIERlbmllZCBBY2Nlc3MgVVJMIFBhdHRlcm46IFwicmVkaXJlY3RfdXJpXCIgKyA/ZXJyb3I9YWNjZXNzX2RlbmllZFxuICogRGVuaWVkIEFjY2VzcyBTYW1wbGU6IGh0dHA6Ly9sb2NhbGhvc3QvP2Vycm9yPWFjY2Vzc19kZW5pZWRcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJpTG9jYXRpb24gVGhlIFVSSSBMb2NhdGlvblxuICovXG52YXIgb25BdXRoVXJsQ2hhbmdlID0gZnVuY3Rpb24odXJpTG9jYXRpb24pIHtcbiAgICBjb25zb2xlLmxvZyhcIkluQXBwQnJvd3NlciB1cmwgY2hhbmdlZCBcIit1cmlMb2NhdGlvbik7XG4gICAgaWYodXJpTG9jYXRpb24uaW5kZXhPZihcImNvZGU9XCIpICE9IC0xKSB7XG4gICAgICAgIHJlcXVlc3RTdGF0dXMgPSBzdGF0dXMuU1VDQ0VTUztcblxuICAgICAgICAvKiBTdG9yZSB0aGUgYXV0aENvZGUgdGVtcG9yYXJpbHkgKi9cbiAgICAgICAgYXV0aENvZGUgPSBnZXRQYXJhbWV0ZXJCeU5hbWUoXCJjb2RlXCIsIHVyaUxvY2F0aW9uKTtcbiAgICAgICAgbG9nKFwiRm91bmQgYXV0aCBjb2RlOiBcIithdXRoQ29kZSk7XG5cbiAgICAgICAgZ2V0UmVmcmVzaFRva2VuKGNhbGxiYWNrRnVuYyk7XG5cbiAgICAgICAgLy8gY2xvc2UgdGhlIGNoaWxkQnJvd3NlclxuICAgICAgICB3aW4uY2xvc2UoKTtcbiAgICB9IGVsc2UgaWYodXJpTG9jYXRpb24uaW5kZXhPZihcImVycm9yPVwiKSAhPSAtMSkgIHtcbiAgICAgICAgcmVxdWVzdFN0YXR1cyA9IHN0YXR1cy5FUlJPUjtcbiAgICAgICAgZXJyb3JNZXNzYWdlID0gZ2V0UGFyYW1ldGVyQnlOYW1lKFwiZXJyb3JcIiwgdXJpTG9jYXRpb24pO1xuICAgICAgICBjYWxsYmFja0Z1bmMoKTtcbiAgICAgICAgd2luLmNsb3NlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmVxdWVzdFN0YXR1cyA9IHN0YXR1cy5OT1RfREVURVJNSU5FRDtcbiAgICAgICAgLy9jYWxsYmFja0Z1bmMoKTtcbiAgICB9XG59O1xuXG5cbi8qKlxuKiBHZXRzIHRoZSBSZWZyZXNoIGZyb20gQWNjZXNzIFRva2VuLiBUaGlzIG1ldGhvZCBpcyBvbmx5IGNhbGxlZCBpbnRlcm5hbGx5LFxuKiBhbmQgb25jZSwgb25seSBhZnRlciB3aGVuIGF1dGhvcml6YXRpb24gb2YgQXBwbGljYXRpb24gaGFwcGVucy5cbipcbiogQHBhcmFtIHBhcmFtT2JqIEFuIE9iamVjdCBjb250YWluaW5nIGF1dGhvcml6YXRpb24gY29kZVxuKiBAcGFyYW0gcGFyYW1PYmouYXV0aF9jb2RlIFRoZSBBdXRob3JpemF0aW9uIENvZGUgZm9yIGdldHRpbmcgUmVmcmVzaCBUb2tlblxuKlxuKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBjYWxsYmFjayBmdW5jdGlvbiB3aGljaCBpcyB0byBiZSBpbnZva2VkIGFmdGVyXG4qICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3NmdWwgcmV0cmlldmFsIG9mIGRhdGEgZnJvbSBnb29nbGUncyBzZXJ2ZXJcbipcbiovXG52YXIgZ2V0UmVmcmVzaFRva2VuID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgY29uc29sZS5sb2coXCJhY2Nlc3MgcmVmcmVzaCB0b2tlblwiKTtcbiAgICQuYWpheCh7XG4gICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgdXJsOiBnYXBpQ29uZmlnLmVuZHRva2VuLFxuICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICBjbGllbnRfaWQgICAgOiBnYXBpQ29uZmlnLmNsaWVudF9pZCxcbiAgICAgICAgICAgICAgICAgICBjbGllbnRfc2VjcmV0OiBnYXBpQ29uZmlnLmNsaWVudF9zZWNyZXQsXG4gICAgICAgICAgICAgICAgICAgY29kZSAgICAgICAgIDogYXV0aENvZGUsXG4gICAgICAgICAgICAgICAgICAgcmVkaXJlY3RfdXJpIDogZ2FwaUNvbmZpZy5yZWRpcmVjdF91cmksXG4gICAgICAgICAgICAgICAgICAgZ3JhbnRfdHlwZSAgIDogZ2FwaUNvbmZpZy5ncmFudFR5cGVzLkFVVEhPUklaRVxuICAgICAgICAgICB9XG4gICAgfSlcbiAgICAuZG9uZShmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwic3VjY2VzcyBnZXR0aW5nIHJlZnJlc2ggdG9rZW5cIik7XG5cbiAgICAgICAgLyogdXBvbiBzdWNlc3MsIGRvIGEgY2FsbGJhY2sgd2l0aCB0aGUgZGF0YSByZWNlaXZlZCAqL1xuICAgICAgICAvLyB0ZW1wb3Jhcnkgc3RvcmluZyBhY2Nlc3MgdG9rZW5cbiAgICAgICAgYWNjZXNzVG9rZW4gICAgID0gZGF0YS5hY2Nlc3NfdG9rZW47XG4gICAgICAgIGFjY2Vzc1Rva2VuVGltZSA9IChuZXcgRGF0ZSgpKS5nZXRUaW1lKCk7XG5cbiAgICAgICAgLy8gc2V0IHRoZSB0b2tlbiBmb3IgdGhlIGpzIGFwaVxuICAgICAgICBnYXBpLmF1dGguc2V0VG9rZW4oZGF0YSk7XG5cbiAgICAgICAgLyogc2V0IHRoZSBlcnJvciBvZiBkYXRhIHRvIGZhbHNlLCBhcyBpdCB3YXMgc3VjY2Vzc2Z1bCAqL1xuICAgICAgICBkYXRhLmVycm9yID0gZmFsc2U7XG5cbiAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKHRva2VuS2V5LCBkYXRhLnJlZnJlc2hfdG9rZW4pO1xuXG4gICAgICAgIC8qIG5vdyBpbnZva2UgdGhlIGNhbGxiYWNrICovXG4gICAgICAgIGNhbGxiYWNrKHthY2Nlc3NfdG9rZW46IGFjY2Vzc1Rva2VufSk7XG4gICAgfSlcbiAgICAuZmFpbChmdW5jdGlvbih4aHIsIHRleHRTdGF0dXMpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKHtcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IHhoci5yZXNwb25zZVRleHRcbiAgICAgICAgICAgIH0pO1xuICAgIH0pXG4gICAgLmFsd2F5cyhmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJUb2tlbiByZXF1ZXN0IGNvbXBsZXRlXCIpO1xuICAgIH0pO1xufTtcblxuaWYoICFpc05hdGl2ZSApIHtcbiAgZ2V0UmVmcmVzaFRva2VuID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgZ2FwaS5hdXRoLmF1dGhvcml6ZSh7XG4gICAgY2xpZW50X2lkIDogQ0xJRU5UX0lELFxuICAgIHNjb3BlIDogT0FVVEhfU0NPUEVTLFxuICAgIGltbWVkaWF0ZSA6IHRydWVcbiAgfSwgZnVuY3Rpb24oKSB7XG4gICAgdG9rZW4gPSBnYXBpLmF1dGguZ2V0VG9rZW4oKTtcbiAgICBpZiggY2FsbGJhY2sgKSBjYWxsYmFjayh0b2tlbik7XG4gIH0pO1xuICB9XG59XG5cblxuLyoqXG4qIFRoaXMgbWV0aG9kIHNob3VsZCBPTkxZIGJlIGNhbGxlZCBsb2NhbGx5IGZyb20gd2l0aGluIHRoaXMgY2xhc3MuXG4qIFJldHVybnMgdGhlIFJlZnJlc2ggVG9rZW4gZnJvbSB0aGUgbG9jYWwgZGF0YWJhc2UuXG4qXG4qIEByZXR1cm4ge1N0cmluZ30gVGhlIHJlZnJlc2ggVG9rZW5cbipcbiovXG52YXIgZ2V0VG9rZW4gPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKHRva2VuS2V5KTtcbn07XG5cblxuLyoqXG4qIFRoaXMgbWV0aG9kIGlzIGludm9rZWQgZXh0ZXJuYWxseS4gSXQgcmV0cmlldmVzIHRoZSBBY2Nlc3MgVG9rZW4gYnkgYXQgZmlyc3RcbiogY2hlY2tpbmcgaWYgY3VycmVudCBhY2Nlc3MgdG9rZW4gaGFzIGV4cGlyZWQgb3Igbm90LiBJZiBpdHMgbm90IGV4cGlyZWQsIGl0XG4qIHNpbXBseSByZXR1cm5zIHRoYXQsIG90aGVyd2lzZSwgaXQgZ2V0cyB0aGUgcmVmcmVzaCBUb2tlbiBmcm9tIHRoZSBsb2NhbCBkYXRhYmFzZVxuKiAoYnkgaW52b2tpbmcgZ2V0VG9rZW4pIGFuZCB0aGVuIGNvbm5lY3Rpbmcgd2l0aCBHb29nbGUncyBTZXJ2ZXIgKHVzaW5nIE9BdXRoKVxuKiB0byBnZXQgdGhlIEFjY2VzcyBUb2tlbi5cbipcbiogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgICBBIGNhbGxCYWNrIGZ1bmN0aW9uIHdoaWNoIGlzIHRvIGJlIGludm9rZWQgYWZ0ZXJcbiogICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEgaXMgcmV0cmlldmVkIGZyb20gdGhlIGdvb2dsZSdzIHNlcnZlci4gVGhlIGRhdGFcbiogICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gZ29vZ2xlIHNlcnZlciBpcyBwYXNzZWQgdG8gY2FsbGJhY2sgYXMgYXJncy5cbipcbiovXG52YXIgZ2V0QWNjZXNzVG9rZW4gPSBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgdmFyIGN1cnJlbnRUaW1lID0gKG5ldyBEYXRlKCkpLmdldFRpbWUoKTtcblxuICAgY29uc29sZS5sb2coXCJnZXR0aW5nIGFjY2VzcyB0b2tlblwiKTtcblxuICAgLyogY2hlY2sgaWYgY3VycmVudCBUb2tlbiBoYXMgbm90IGV4cGlyZWQgKHN0aWxsIHZhbGlkKSAqL1xuICAgaWYgKGFjY2Vzc1Rva2VuICYmIGFjY2Vzc1Rva2VuICE9IGZhbHNlICYmXG4gICAgICAgICAgIGN1cnJlbnRUaW1lIDwgKGFjY2Vzc1Rva2VuVGltZSArIGFjY2Vzc1Rva2VuRXhwaXJ5TGltaXQpKSB7XG4gICAgICAgICAgIGNhbGxiYWNrKHsgYWNjZXNzX3Rva2VuOiBhY2Nlc3NUb2tlbiB9KTtcblxuICAgICAgICAgICByZXR1cm47XG4gICB9XG5cbiAgIGNvbnNvbGUubG9nKFwiQUNDRVNTIFRPS0VOIFBBUkFNUzogXCIrYWNjZXNzVG9rZW4rXCIgXCIrYWNjZXNzVG9rZW5UaW1lK1wiIFwiK2FjY2Vzc1Rva2VuRXhwaXJ5TGltaXQpO1xuXG4gICAvKiBlbHNlLCBnZXQgdGhlIHJlZnJlc2hUb2tlbiBmcm9tIGxvY2FsIHN0b3JhZ2UgYW5kIGdldCBhIG5ldyBhY2Nlc3MgVG9rZW4gKi9cbiAgIHZhciByZWZyZXNoVG9rZW4gPSBnZXRUb2tlbigpO1xuXG4gICAvLyAgIGNvbnNvbGUubG9nKFwiUmVmcmVzaCBUb2tlbiA+PiBcIiArIHJlZnJlc2hUb2tlbik7XG4gICAkLmFqYXgoe1xuICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgIHVybDogZ2FwaUNvbmZpZy5lbmR0b2tlbixcbiAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICBjbGllbnRfaWQgICAgOiBnYXBpQ29uZmlnLmNsaWVudF9pZCxcbiAgICAgICAgICAgICAgICAgIGNsaWVudF9zZWNyZXQ6IGdhcGlDb25maWcuY2xpZW50X3NlY3JldCxcbiAgICAgICAgICAgICAgICAgIHJlZnJlc2hfdG9rZW46IHJlZnJlc2hUb2tlbixcbiAgICAgICAgICAgICAgICAgIGdyYW50X3R5cGUgICA6IGdhcGlDb25maWcuZ3JhbnRUeXBlcy5SRUZSRVNILFxuICAgICAgICAgIH1cbiAgICB9KVxuICAgIC5kb25lKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIC8qIHVwb24gc3VjZXNzLCBkbyBhIGNhbGxiYWNrIHdpdGggdGhlIGRhdGEgcmVjZWl2ZWQgKi9cbiAgICAgICAgICAgIC8vIHRlbXBvcmFyeSBzdG9yaW5nIGFjY2VzcyB0b2tlblxuICAgICAgICAgICAgYWNjZXNzVG9rZW4gPSBkYXRhLmFjY2Vzc190b2tlbjtcbiAgICAgICAgICAgIGFjY2Vzc1Rva2VuVGltZSA9IChuZXcgRGF0ZSgpKS5nZXRUaW1lKCk7XG5cbiAgICAgICAgICAgIC8vIHNldCB0aGUgdG9rZW4gZm9yIHRoZSBqcyBhcGlcbiAgICAgICAgICAgIGdhcGkuYXV0aC5zZXRUb2tlbihkYXRhKTtcblxuICAgICAgICAgICAgLyogc2V0IHRoZSBlcnJvciB0byBmYWxzZSAqL1xuICAgICAgICAgICAgZGF0YS5lcnJvciA9IGZhbHNlO1xuICAgICAgICAgICAgY2FsbGJhY2soZGF0YSk7XG4gICAgICAgICAgIH0pXG4gICAgLmZhaWwoZnVuY3Rpb24oeGhyLCB0ZXh0U3RhdHVzKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlRva2VuIHJlcXVlc3QgZXJyb3IgPz8gPj5cIiArIHhoci5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgY2FsbGJhY2soe1xuICAgICAgICAgICAgICAgICAgICBlcnJvcjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogeGhyLnJlc3BvbnNlVGV4dFxuICAgICAgICAgICAgfSk7XG4gICAgfSlcbiAgICAuYWx3YXlzKGZ1bmN0aW9uKCkgeyAvL2NvbnNvbGUubG9nKFwiVG9rZW4gcmVxdWVzdCBjb21wbGV0ZVwiKTtcbiAgICB9KTtcbn07XG5cbmlmKCAhaXNOYXRpdmUgKSB7XG4gIGdldEFjY2Vzc1Rva2VuID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICAgdmFyIGN1cnJlbnRUaW1lID0gKG5ldyBEYXRlKCkpLmdldFRpbWUoKTtcblxuICAgICBpZiAoYWNjZXNzVG9rZW4gJiZcbiAgICAgICAgICAgICBjdXJyZW50VGltZSA8IChhY2Nlc3NUb2tlblRpbWUgKyBhY2Nlc3NUb2tlbkV4cGlyeUxpbWl0KSkge1xuICAgICAgICAgICAgIGNhbGxiYWNrKGFjY2Vzc1Rva2VuKTtcblxuICAgICAgICAgICAgIHJldHVybjtcbiAgICAgfVxuXG4gICAgZ2FwaS5hdXRoLmF1dGhvcml6ZSh7XG4gICAgY2xpZW50X2lkIDogQ0xJRU5UX0lELFxuICAgIHNjb3BlIDogT0FVVEhfU0NPUEVTLFxuICAgIGltbWVkaWF0ZSA6IHRydWVcbiAgfSwgZnVuY3Rpb24oKSB7XG4gICAgdG9rZW4gPSBnYXBpLmF1dGguZ2V0VG9rZW4oKTtcbiAgICBhY2Nlc3NUb2tlbiA9IHRva2VuO1xuICAgIGFjY2Vzc1Rva2VuVGltZSA9IChuZXcgRGF0ZSgpKS5nZXRUaW1lKCk7XG4gICAgaWYoIGNhbGxiYWNrICkgY2FsbGJhY2sodG9rZW4pO1xuICB9KTtcbiAgfVxufVxuXG5cblxuLyoqXG4qIFNhdmVzIHRoZSBSZWZyZXNoIFRva2VuIGluIGEgbG9jYWwgZGF0YWJhc2Ugb3IgbG9jYWxTdG9yYWdlXG4qIFRoaXMgbWV0aG9kIHNoYWxsIGJlIGludm9rZWQgZnJvbSBleHRlcm5hbGx5IG9ubHkgPGI+b25jZTwvYj4gYWZ0ZXIgYW5cbiogYXV0aG9yaXphdGlvbiBjb2RlIGlzIHJlY2VpdmVkIGZyb20gZ29vZ2xlJ3Mgc2VydmVyLiBUaGlzIG1ldGhvZFxuKiBjYWxscyB0aGUgb3RoZXIgbWV0aG9kIChnZXRSZWZyZXNoVG9rZW4pIHRvIGdldCB0aGUgcmVmcmVzaCBUb2tlbiBhbmRcbiogdGhlbiBzYXZlcyBpdCBsb2NhbGx5IG9uIGRhdGFiYXNlIGFuZCBpbnZva2VzIGEgY2FsbGJhY2sgZnVuY3Rpb25cbipcbiogQHBhcmFtIHRva2VuT2JqIEEgT2JqZWN0IGNvbnRhaW5pbmcgYXV0aG9yaXphdGlvbiBjb2RlXG4qIEBwYXJhbSB7U3RyaW5nfSB0b2tlbk9iai5hdXRoX2NvZGUgVGhlIGF1dGhvcml6YXRpb24gY29kZSBmcm9tIGdvb2dsZSdzIHNlcnZlclxuKlxuKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBUaGUgZnVuY3Rpb24gdG8gYmUgaW52b2tlZCB3aXRoIHBhcmFtZXRlcnNcbiovXG52YXIgc2F2ZVJlZnJlc2hUb2tlbiA9IGZ1bmN0aW9uKHRva2VuT2JqLCBjYWxsYmFjaykge1xuICAgICBnZXRSZWZyZXNoVG9rZW4odG9rZW5PYmosIGZ1bmN0aW9uKGRhdGEpIHtcblxuICAgICAgICAgICAgIC8qIGlmIHRoZXJlJ3Mgbm8gZXJyb3IgKi9cbiAgICAgICAgICAgICBpZiAoIWRhdGEuZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQFRPRE86IG1ha2UgYW5vdGhlciBtZXRob2Qgc2F2ZVRva2VuIHRvIGFic3RyYWN0IHRoZSBzdG9yaW5nIG9mIHRva2VuXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKHRva2VuS2V5LCBkYXRhLnJlZnJlc2hfdG9rZW4pO1xuICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICBjYWxsYmFjayhkYXRhKTtcbiAgICAgfSk7XG59O1xuXG5cblxuLyoqXG4qIENoZWNrcyBpZiB1c2VyIGhhcyBhdXRob3JpemVkIHRoZSBBcHAgb3Igbm90XG4qIEl0IGRvZXMgc28gYnkgY2hlY2tpbmcgaWYgdGhlcmUncyBhIHJlZnJlc2hfdG9rZW5cbiogYXZhaWxhYmxlIG9uIHRoZSBjdXJyZW50IGRhdGFiYXNlIHRhYmxlLlxuKlxuKiBAcmV0dXJuIHtCb29sZWFufSB0cnVlIGlmIGF1dGhvcml6ZWQsIGZhbHNlIG90aGVyd2lzZVxuKi9cbnZhciBpc0F1dGhvcml6ZWQgPSBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAgdmFyIHRva2VuVmFsdWUgPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0odG9rZW5LZXkpO1xuXG4gICAgICBjYWxsYmFjaygoKHRva2VuVmFsdWUgIT09IG51bGwpICYmICh0eXBlb2YgdG9rZW5WYWx1ZSAhPT0gJ3VuZGVmaW5lZCcpKSk7XG59O1xuXG5pZiggIWlzTmF0aXZlICkge1xuICBpc0F1dGhvcml6ZWQgPSBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgIGdhcGkuYXV0aC5hdXRob3JpemUoe1xuICAgIGNsaWVudF9pZCA6IENMSUVOVF9JRCxcbiAgICBzY29wZSA6IE9BVVRIX1NDT1BFUyxcbiAgICBpbW1lZGlhdGUgOiB0cnVlXG4gIH0sIGZ1bmN0aW9uKCkge1xuICAgIHRva2VuID0gZ2FwaS5hdXRoLmdldFRva2VuKCk7XG4gICAgaWYoIGNhbGxiYWNrICkgY2FsbGJhY2sodG9rZW4pO1xuICB9KTtcbiAgfVxufVxuXG5cbi8qKlxuKiBFeHRyYWN0cyB0aGUgY29kZSBmcm9tIHRoZSB1cmwuIENvcGllZCBmcm9tIG9ubGluZVxuKiBAVE9ETyBuZWVkcyB0byBiZSBzaW1wbGlmaWVkLlxuKlxuKiBAcGFyYW0gbmFtZSBUaGUgcGFyYW1ldGVyIHdob3NlIHZhbHVlIGlzIHRvIGJlIGdyYWJiZWQgZnJvbSB1cmxcbiogQHBhcmFtIHVybCAgVGhlIHVybCB0byBiZSBncmFiYmVkIGZyb20uXG4qXG4qIEByZXR1cm4gUmV0dXJucyB0aGUgVmFsdWUgY29ycmVzcG9uZGluZyB0byB0aGUgbmFtZSBwYXNzZWRcbiovXG52YXIgZ2V0UGFyYW1ldGVyQnlOYW1lID0gZnVuY3Rpb24obmFtZSwgdXJsKSB7XG4gIG5hbWUgPSBuYW1lLnJlcGxhY2UoL1tcXFtdLywgXCJcXFxcXFxbXCIpLnJlcGxhY2UoL1tcXF1dLywgXCJcXFxcXFxdXCIpO1xuICB2YXIgcmVnZXhTID0gXCJbXFxcXD8mXVwiICsgbmFtZSArIFwiPShbXiYjXSopXCI7XG4gIHZhciByZWdleCA9IG5ldyBSZWdFeHAocmVnZXhTKTtcbiAgdmFyIHJlc3VsdHMgPSByZWdleC5leGVjKHVybCk7XG5cbiAgaWYocmVzdWx0cyA9PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGVsc2VcbiAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KHJlc3VsdHNbMV0ucmVwbGFjZSgvXFwrL2csIFwiIFwiKSk7XG59O1xuXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBhdXRob3JpemUgOiBhdXRob3JpemUsXG4gIGlzQXV0aG9yaXplZCA6IGlzQXV0aG9yaXplZCxcbiAgZ2V0QWNjZXNzVG9rZW4gOiBnZXRBY2Nlc3NUb2tlbixcbiAgQVBQX0lEIDogQVBQX0lEXG59O1xuIiwidmFyIGFwcCA9IHJlcXVpcmUoJy4vYXBwJyk7XG5cbnZhciBjYWNoZWRUaWxlU3R5bGUgPSB7XG4gIHdoZXJlOiBcInBpZCBpbiAoKVwiLFxuICBwb2x5Z29uT3B0aW9uczoge1xuICAgIGZpbGxDb2xvcjogXCIjMDAwMDAwXCIsXG4gICAgc3Ryb2tlQ29sb3I6IFwiI0ZGMDAwMFwiLFxuICAgIHN0cm9rZVdlaWdodDogM1xuICB9XG59XG5cbnZhciBjYWNoZWRUaWxlcyA9IFtdO1xudmFyIGNhY2hlZFRpbGVzTG9hZGVkID0gZmFsc2U7XG52YXIgY2FjaGVkVGlsZVByZWZpeCA9ICdjYWNoZWRfdGl0bGVfJztcbnZhciBjYWNoaW5nID0gZmFsc2U7XG52YXIgc2F2ZUNhY2hlT25DbGlja1NldCA9IGZhbHNlO1xudmFyIGNNYXBEYXRhID0ge307XG5cbnZhciBjb2xzID0gW107XG52YXIgYXBwID0gbnVsbDtcblxuZnVuY3Rpb24gaW5pdCgpIHtcbiAgX2xvYWRGcm9tQ2FjaGUoKTtcbiAgX2xvYWRDYWNoZWRUaWxlcygpO1xufVxuXG5mdW5jdGlvbiBjbGVhckNhY2hlKCkge1xuICBpZiggIWNvbmZpcm0oJ0FyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBjbGVhciBhbGwgdGlsZSBkYXRhIGZyb20gdGhlIGNhY2hlPycpICkgcmV0dXJuO1xuXG4gIGZvciggdmFyIGtleSBpbiB3aW5kb3cubG9jYWxTdG9yYWdlICkge1xuICAgIGlmKCBrZXkuaW5kZXhPZihjYWNoZWRUaWxlUHJlZml4KSA+IC0xICkge1xuICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGtleSk7XG4gICAgfVxuICB9XG4gIGNhY2hlZFRpbGVzID0gW107XG59XG5cbi8vIGUgaXMgdGhlIGV2ZW50IG9iamVjdCBmcm9tIGdvb2dsZSBtYXBzXG5mdW5jdGlvbiBjYWNoZVRpbGUoZSwgZnVzaW9uTGF5ZXIsIGRlZmF1bHRPcHRpb25zLCBkZWZhdWx0U3R5bGUpIHtcbiAgaWYoICFzYXZlQ2FjaGVPbkNsaWNrU2V0ICkge1xuICAgIHNhdmVDYWNoZU9uQ2xpY2tTZXQgPSB0cnVlO1xuICAgICQoJyNsb2NhdGUtY2FjaGUtc2F2ZS1idG4nKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgX3NhdmVUaWxlKCk7XG4gICAgfSk7XG4gICAgJCgnI2xvY2F0ZS1jYWNoZS1tb2RlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgIGlmKCAhJCh0aGlzKS5pcygnY2hlY2tlZCcpICkgJCgnI2xvY2F0ZS1jYWNoZS1zYXZlLXBhbmVsJykuaGlkZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgaWYoIGNhY2hpbmcgKSByZXR1cm47XG4gIGNhY2hpbmcgPSB0cnVlO1xuXG4gIGNNYXBEYXRhID0ge1xuICAgIGZ1c2lvbkxheWVyIDogZnVzaW9uTGF5ZXIsXG4gICAgZGVmYXVsdE9wdGlvbnMgOiBkZWZhdWx0T3B0aW9ucyxcbiAgICBkZWZhdWx0U3R5bGUgOiBkZWZhdWx0U3R5bGUsXG4gICAgcGlkIDogIGUucm93LnBpZC52YWx1ZVxuICB9XG5cbiAgJCgnI2xvY2F0ZS1jYWNoZS1zYXZlLW5hbWUnKS52YWwoJycpO1xuICAkKCcjbG9jYXRlLWNhY2hlLW1vZGUtbG9hZGluZycpLnNob3coKTtcbiAgJCgnI2xvY2F0ZS1jYWNoZS1zYXZlLXBhbmVsJykuaGlkZSgpO1xuXG4gIF9sb2FkVGlsZShlLmxhdExuZy5sbmcoKSwgZS5sYXRMbmcubGF0KCksIGZ1bmN0aW9uKGRhdGEpe1xuICAgICQoJyNsb2NhdGUtY2FjaGUtc2F2ZS1wYW5lbCcpLnNob3coKTtcbiAgICAkKCcjbG9jYXRlLWNhY2hlLW1vZGUtbG9hZGluZycpLmhpZGUoKTtcblxuICAgICQoJyNsb2NhdGUtY2FjaGUtc2F2ZS1waWQnKS5odG1sKGNNYXBEYXRhLnBpZCk7XG4gICAgY01hcERhdGEuZGF0YSA9IGRhdGE7XG4gICAgY2FjaGluZyA9IGZhbHNlO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gcmVuZGVyKCkge1xuICBmb3IoIHZhciBhdHRyIGluIGFwcC5nZXRNb2RlbCgpLndlYXRoZXIgKSB7XG4gICAgaWYoIGF0dHIgIT0gXCJucmVsXCIgKSBjb2xzLnB1c2goYXR0cik7XG4gIH1cblxuICAvLyB0aGUgYWJvdXQgbW9kYWwgbGluayBpcyBjcmVhdGVkIGJlbG93LCBzbyB3aHkgbm90Li4uXG4gICQoXCIjYWJvdXQtbW9kYWxcIikubW9kYWwoe1xuICAgIHNob3cgOiBmYWxzZVxuICB9KTtcblxuICAvLyB0aGUgYWJvdXQgbW9kYWwgbGluayBpcyBjcmVhdGVkIGJlbG93LCBzbyB3aHkgbm90Li4uXG4gICQoXCIjaGVscC1tb2RhbFwiKS5tb2RhbCh7XG4gICAgc2hvdyA6IGZhbHNlXG4gIH0pO1xuXG4gIF9jcmVhdGVOYXZNZW51KCk7XG5cbiAgLy8gaGlkZSB0aGUgc2VsZWN0IHRyZWUgYnV0dG9uXG4gICQoJyN0cmVlLXN1Yi1tZW51JykucGFyZW50KCkuaGlkZSgpO1xuXG4gIC8vIGhpZGUgdGhlIHNlbGVjdG9yIGZvciB1cGxvYWRpbmcgd2VhdGhlciBkYXRhIGZyb20gYSBnb29nbGUgc3ByZWFkc2hlZXRcbiAgJCgnI3dlYXRoZXJSZWFkZXItc3ByZWFkc2hlZXQnKS5wYXJlbnQoKS5oaWRlKCk7XG5cbiAgLy8gc2hvdyB0aGUgY2FjaGUgdmVyc2lvbiBvZiB0aGUgbG9jYXRpb24gc2VsZWN0b3JcbiAgJCgnI3NlbGVjdC1sb2NhdGlvbi1vbmxpbmUnKS5oaWRlKCk7XG4gICQoJyNzZWxlY3QtbG9jYXRpb24tb2ZmbGluZScpLnNob3coKTtcblxuICAvLyBzZXQgdGhlIGxvY2F0aW9uIHNlbGVjdG9yIHVpIGxpc3QgYmFzZWQgb24gY2FjaGVkIHRpbGVzXG4gIF91cGRhdGVDYWNoZVRpbGVVaUxpc3QoKTtcbn1cblxuZnVuY3Rpb24gcmVuZGVyQ2FjaGVkVGlsZXNPbk1hcChmdXNpb25MYXllciwgZGVmYXVsdE9wdGlvbnMsIGRlZmF1bHRTdHlsZSkge1xuICBpZiggIWNhY2hlZFRpbGVzTG9hZGVkICkgX2xvYWRDYWNoZWRUaWxlcygpO1xuXG4gIGRlZmF1bHRPcHRpb25zLnN0eWxlcyA9IFtkZWZhdWx0U3R5bGVdO1xuXG4gIGlmKCBjYWNoZWRUaWxlcy5sZW5ndGggPiAwICkge1xuICAgIGNhY2hlZFRpbGVTdHlsZS53aGVyZSA9ICdwaWQgaW4gKCcrY2FjaGVkVGlsZXMuam9pbignLCcpKycpJztcbiAgICBkZWZhdWx0T3B0aW9ucy5zdHlsZXMucHVzaChjYWNoZWRUaWxlU3R5bGUpO1xuICB9XG5cbiAgZnVzaW9uTGF5ZXIuc2V0T3B0aW9ucyhkZWZhdWx0T3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIF9zYXZlVGlsZSgpIHtcbiAgdmFyIG5hbWUgPSAkKCcjbG9jYXRlLWNhY2hlLXNhdmUtbmFtZScpLnZhbCgpO1xuICBpZiggbmFtZS5sZW5ndGggPT0gMCApIHJldHVybiBhbGVydCgnUGxlYXNlIHByb3ZpZGUgYSBuYW1lJyk7XG5cbiAgY01hcERhdGEuZGF0YS5uYW1lID0gbmFtZTtcblxuICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oY2FjaGVkVGlsZVByZWZpeCtjTWFwRGF0YS5waWQsIEpTT04uc3RyaW5naWZ5KGNNYXBEYXRhLmRhdGEpKTtcblxuICBjYWNoZWRUaWxlcy5wdXNoKGNNYXBEYXRhLnBpZCk7XG4gIHJlbmRlckNhY2hlZFRpbGVzT25NYXAoY01hcERhdGEuZnVzaW9uTGF5ZXIsIGNNYXBEYXRhLmRlZmF1bHRPcHRpb25zLCBjTWFwRGF0YS5kZWZhdWx0U3R5bGUpO1xuICAkKCcjbG9jYXRlLWNhY2hlLXNhdmUtcGFuZWwnKS5oaWRlKCk7XG59XG5cbmZ1bmN0aW9uIF9sb2FkVGlsZShsbmcsIGxhdCwgY2FsbGJhY2spIHtcbiAgZ2EoJ3NlbmQnLCAnZXZlbnQnLCAndWknLCAnaW50ZXJhY3Rpb24nLCAndGlsZS1kYXRhLWNhY2hlJywgMSk7XG5cbiAgdmFyIHVybCA9IFwiaHR0cDovL2FsZGVyLmJpb2VuZXJneS5jYXNpbC51Y2RhdmlzLmVkdTo4MDgwL3ZpenNvdXJjZS9yZXN0P3ZpZXc9cG9pbnRUb1dlYXRoZXIoXCIrbG5nK1wiLFwiK2xhdCtcIiw4MTkyKVwiXG4gIHZhciBxID0gbmV3IGdvb2dsZS52aXN1YWxpemF0aW9uLlF1ZXJ5KHVybCk7XG4gIHZhciByZXNwcyA9IDA7XG4gIHZhciB3ZWF0aGVyVGFibGUgPSB7fTtcbiAgdmFyIHNvaWxUYWJsZSA9IHt9O1xuXG4gIGZ1bmN0aW9uIGNoZWNrRG9uZSgpIHtcbiAgICAgIHJlc3BzKys7XG4gICAgICBpZiggcmVzcHMgPT0gMiAmJiBjYWxsYmFjayApIGNhbGxiYWNrKHt3ZWF0aGVyOndlYXRoZXJUYWJsZSwgc29pbDpzb2lsVGFibGV9KTtcbiAgfVxuXG4gIHEuc2V0UXVlcnkoJ1NFTEVDVCAqJyk7XG4gIHEuc2VuZChmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgd2VhdGhlclRhYmxlID0gSlNPTi5wYXJzZShyZXNwb25zZS5nZXREYXRhVGFibGUoKS50b0pTT04oKSk7XG4gICAgY2hlY2tEb25lKCk7XG4gIH0pO1xuXG4gIHZhciB1cmwgPSBcImh0dHA6Ly9hbGRlci5iaW9lbmVyZ3kuY2FzaWwudWNkYXZpcy5lZHU6ODA4MC92aXpzb3VyY2UvcmVzdD92aWV3PXBvaW50VG9TT0lMKFwiK2xuZytcIixcIitsYXQrXCIsODE5MilcIlxuICB2YXIgcSA9IG5ldyBnb29nbGUudmlzdWFsaXphdGlvbi5RdWVyeSh1cmwpO1xuICBxLnNldFF1ZXJ5KCdTRUxFQ1QgKicpO1xuICBxLnNlbmQoZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgIHNvaWxUYWJsZSA9IEpTT04ucGFyc2UocmVzcG9uc2UuZ2V0RGF0YVRhYmxlKCkudG9KU09OKCkpO1xuICAgIGNoZWNrRG9uZSgpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gX3VwZGF0ZUNhY2hlVGlsZVVpTGlzdCgpIHtcbiAgaWYoIGNhY2hlZFRpbGVzLmxlbmd0aCA9PSAwICkge1xuICAgICQoJyNzZWxlY3QtbG9jYXRpb24tb2ZmbGluZS1ub25lJykuc2hvdygpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBsaXN0RWxlID0gJCgnI3NlbGVjdC1sb2NhdGlvbi1vZmZsaW5lLWxpc3QnKS5odG1sKCc8ZGl2PlNlbGVjdCBDYWNoZWQgVGlsZTwvZGl2PicpLCBlbGU7XG4gICQoJyNzZWxlY3QtbG9jYXRpb24tb2ZmbGluZS1ub25lJyk7XG4gIGZvciggdmFyIGkgPSAwOyBpIDwgY2FjaGVkVGlsZXMubGVuZ3RoOyBpKysgKSB7XG4gICAgdmFyIGpzb24gPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oY2FjaGVkVGlsZVByZWZpeCtjYWNoZWRUaWxlc1tpXSk7XG4gICAganNvbiA9IEpTT04ucGFyc2UoanNvbik7XG5cbiAgICBlbGUgPSAkKCc8ZGl2PjxhIGNhY2hlaWQ9XCInK2krJ1wiIHN0eWxlPVwiY3Vyc29yOnBvaW50ZXJcIj4nK2NhY2hlZFRpbGVzW2ldKyc6ICcranNvbi5uYW1lKyc8L2E+PC9kaXY+Jyk7XG4gICAgZWxlLmZpbmQoJ2EnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgIF9ydW5DYWNoZWRUaWxlKHBhcnNlSW50KCQodGhpcykuYXR0cignY2FjaGVpZCcpKSk7XG4gICAgfSk7XG4gICAgbGlzdEVsZS5hcHBlbmQoZWxlKVxuICB9XG59XG5cbmZ1bmN0aW9uIF9ydW5DYWNoZWRUaWxlKGluZGV4KSB7XG4gIHZhciBqc29uID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKGNhY2hlZFRpbGVQcmVmaXgrY2FjaGVkVGlsZXNbaW5kZXhdKTtcbiAganNvbiA9IEpTT04ucGFyc2UoanNvbik7XG5cbiAgZm9yKCB2YXIgaSA9IDA7IGkgPCBqc29uLndlYXRoZXIucm93cy5sZW5ndGg7IGkrKyApIHtcbiAgICB2YXIgbSA9IGkrJyc7XG4gICAgZm9yKCB2YXIgaiA9IDE7IGogPCBqc29uLndlYXRoZXIuY29scy5sZW5ndGg7IGorKyApIHtcbiAgICAgICQoXCIjaW5wdXQtd2VhdGhlci1cIitjb2xzW2pdK1wiLVwiK2kpLnZhbChqc29uLndlYXRoZXIucm93c1tpXS5jW2pdID8ganNvbi53ZWF0aGVyLnJvd3NbaV0uY1tqXS52IDogXCJcIik7XG4gICAgfVxuICB9XG5cblxuICBmb3IoIHZhciBpID0gMDsgaSA8IGpzb24uc29pbC5jb2xzLmxlbmd0aDsgaSsrICkge1xuICAgIGlmKCBqc29uLnNvaWwucm93c1swXSA9PSBudWxsICkgY29udGludWU7XG4gICAgJChcIiNpbnB1dC1zb2lsLVwiK2pzb24uc29pbC5jb2xzW2ldLmlkKS52YWwoanNvbi5zb2lsLnJvd3NbMF0uY1tpXS52KTtcbiAgfVxuXG4gICQoXCIjc2VsZWN0LXdlYXRoZXItbW9kYWxcIikubW9kYWwoJ2hpZGUnKTtcblxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgYXBwLnJ1bk1vZGVsKCk7XG4gIH0sIDUwMCk7XG59XG5cbmZ1bmN0aW9uIF9sb2FkQ2FjaGVkVGlsZXMoKSB7XG4gIGNhY2hlZFRpbGVzID0gW107XG4gIGZvciggdmFyIGtleSBpbiB3aW5kb3cubG9jYWxTdG9yYWdlICkge1xuICAgIGlmKCBrZXkuaW5kZXhPZihjYWNoZWRUaWxlUHJlZml4KSA+IC0xICkge1xuICAgICAgY2FjaGVkVGlsZXMucHVzaChrZXkucmVwbGFjZShjYWNoZWRUaWxlUHJlZml4LCcnKSk7XG4gICAgfVxuICB9XG4gIGNhY2hlZFRpbGVzTG9hZGVkID0gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gX2NyZWF0ZU5hdk1lbnUoKSB7XG4gIHZhciBidG4gPSAkKCc8bGkgY2xhc3M9XCJkcm9wZG93blwiPidcbiAgICAgICsgJzxhIGNsYXNzPVwiZHJvcGRvd24tdG9nZ2xlXCI+T0ZGTElORSBNT0RFPGIgY2xhc3M9XCJjYXJldFwiPjwvYj48L2E+J1xuICAgICAgKyAnPHVsIGNsYXNzPVwiZHJvcGRvd24tbWVudVwiPidcbiAgICAgICsgJzxsaT48YSBpZD1cImhlbHBcIj48aSBjbGFzcz1cImljb24tcXVlc3Rpb24tc2lnblwiPjwvaT4gSGVscDwvYT48L2xpPidcbiAgICAgICsgJzxsaT48YSBpZD1cImFib3V0XCI+PGkgY2xhc3M9XCJpY29uLWluZm8tc2lnblwiPjwvaT4gQWJvdXQ8L2E+PC9saT4nXG4gICAgICArICc8L3VsPjwvbGk+Jyk7XG5cbiAgLy8gc2V0IGNsaWNrIGhhbmRsZXJzIGZvciBwb3B1cFxuICBidG4uZmluZCgnYS5kcm9wZG93bi10b2dnbGUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICQodGhpcykucGFyZW50KCkudG9nZ2xlQ2xhc3MoJ29wZW4nKTtcbiAgfSk7XG5cbiAgLy8gYWJvdXQgY2xpY2sgaGFuZGxlclxuICBidG4uZmluZCgnI2Fib3V0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgYnRuLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XG4gICAgJChcIiNhYm91dC1tb2RhbFwiKS5tb2RhbCgnc2hvdycpO1xuICB9KTtcblxuICBidG4uZmluZCgnI2hlbHAnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICBidG4udG9nZ2xlQ2xhc3MoJ29wZW4nKTtcbiAgICBzaG93SGVscCgpO1xuICB9KTtcblxuICAvLyBhZGQgbWVudVxuICAkKFwiI2xvZ2luLWhlYWRlclwiKS5odG1sKFwiXCIpLmFwcGVuZChidG4pO1xufTtcblxuZnVuY3Rpb24gX2xvYWRGcm9tQ2FjaGUoKSB7XG4gICAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6ICdjYWNoZS9qc2FwaScsXG4gICAgICAgIGRhdGFUeXBlOiBcInNjcmlwdFwiLFxuICAgICAgICBjYWNoZSA6IHRydWUsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgJCgnaGVhZCcpLmFwcGVuZCggJCgnPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIHR5cGU9XCJ0ZXh0L2Nzc1wiIC8+JykuYXR0cignaHJlZicsICdjYWNoZS9jaGFydC5jc3MnKSApO1xuICAgICAgICAgICQoJ2hlYWQnKS5hcHBlbmQoICQoJzxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiB0eXBlPVwidGV4dC9jc3NcIiAvPicpLmF0dHIoJ2hyZWYnLCAnY2FjaGUvYW5ub3RhdGVkdGltZWxpbmUuY3NzJykgKTtcbiAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiAnY2FjaGUvY2hhcnQuanMnLFxuICAgICAgICAgICAgZGF0YVR5cGU6IFwic2NyaXB0XCIsXG4gICAgICAgICAgICBjYWNoZSA6IHRydWUsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICBjaGFydHNMb2FkZWQgPSB0cnVlO1xuICAgICAgICAgICAgICBpZiggY2hhcnRzQ2FsbGJhY2sgKSBjaGFydHNDYWxsYmFjaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGluaXQgOiBpbml0LFxuICByZW5kZXIgOiByZW5kZXIsXG4gIGNhY2hlVGlsZSA6IGNhY2hlVGlsZSxcbiAgcmVuZGVyQ2FjaGVkVGlsZXNPbk1hcCA6IHJlbmRlckNhY2hlZFRpbGVzT25NYXAsXG4gIGNsZWFyQ2FjaGUgOiBjbGVhckNhY2hlXG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIFZQRCA6IHtcbiAgICAgIGxhYmVsIDogXCJNZWFuIFZhcG9yIFByZXNzdXJlIERlZmljaXRcIixcbiAgICAgIHVuaXRzIDogXCJrUEFcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJ0aGUgZGlmZmVyZW5jZSAoZGVmaWNpdCkgYmV0d2VlbiB0aGUgYW1vdW50IG9mIG1vaXN0dXJlIGluIHRoZSBhaXIgYW5kIGhvdyBtdWNoIFwiICtcbiAgICAgIFx0XHRcIm1vaXN0dXJlIHRoZSBhaXIgY2FuIGhvbGQgd2hlbiBpdCBpcyBzYXR1cmF0ZWRcIlxuICB9LFxuICBmVlBEIDoge1xuICAgICAgbGFiZWwgOiBcIlZhcG9yIFByZXNzdXJlIERlZmljaXQgTW9kaWZpZXJcIixcbiAgICAgIHVuaXRzIDogXCJ1bml0bGVzc1wiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIkEgZW52aXJvbm1lbnRhbCBmYWN0b3IgZ3Jvd3RoIG1vZGlmaWVyXCJcbiAgfSxcbiAgZlQgOiB7XG4gICAgICBsYWJlbCA6IFwiVGVtcGVyYXR1cmUgTW9kaWZpZXJcIixcbiAgICAgIHVuaXRzIDogXCJ1bml0bGVzc1wiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIkEgZW52aXJvbm1lbnRhbCBmYWN0b3IgZ3Jvd3RoIG1vZGlmaWVyXCJcbiAgfSxcbiAgZkZyb3N0IDoge1xuICAgICAgbGFiZWwgOiBcIkZyb3N0IE1vZGlmaWVyXCIsXG4gICAgICB1bml0cyA6IFwidW5pdGxlc3NcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJOdW1iZXIgb2YgZnJvc3QgZGF5cyBncm93dGggbW9kaWZpZXJcIlxuICB9LFxuICBQQVIgOiB7XG4gICAgICBsYWJlbCA6IFwiTW9udGhseSBQaG90b3N5bnRoZXRpY2FsbHkgQWN0aXZlIFJhZGlhdGlvblwiLFxuICAgICAgdW5pdHMgOiBcIm1vbHMgLyBtXjIgbW9udGhcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJEZXNpZ25hdGVzIHRoZSBzcGVjdHJhbCByYW5nZSAod2F2ZSBiYW5kKSBvZiBzb2xhciByYWRpYXRpb24gZnJvbSA0MDAgdG8gNzAwIG5hbm9tZXRlcnMgXCIgK1xuICAgICAgXHRcdFwidGhhdCBwaG90b3N5bnRoZXRpYyBvcmdhbmlzbXMgYXJlIGFibGUgdG8gdXNlIGluIHRoZSBwcm9jZXNzIG9mIHBob3Rvc3ludGhlc2lzXCJcbiAgfSxcbiAgeFBQIDoge1xuICAgICAgbGFiZWwgOiBcIk1heGltdW0gUG90ZW50aWFsIFByaW1hcnkgUHJvZHVjdGlvblwiLFxuICAgICAgdW5pdHMgOiBcIk1ldHJpYyBUb25zIERyeSBNYXR0ZXIvaGFcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJcIlxuICB9LFxuICBJbnRjcHRuIDoge1xuICAgICAgbGFiZWwgOiBcIkNhbm9weSBSYWluZmFsbCBJbnRlcmNlcHRpb25cIixcbiAgICAgIHVuaXRzIDogXCJcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJQcmVjaXBpdGF0aW9uIHRoYXQgZG9lcyBub3QgcmVhY2ggdGhlIHNvaWwsIGJ1dCBpcyBpbnN0ZWFkIGludGVyY2VwdGVkIGJ5IHRoZSBsZWF2ZXMgYW5kIGJyYW5jaGVzIG9mIHBsYW50cyBhbmQgdGhlIGZvcmVzdCBmbG9vci5cIlxuICB9LFxuICBBU1cgOiB7XG4gICAgICBsYWJlbCA6IFwiQXZhaWxhYmxlIFNvaWwgV2F0ZXJcIixcbiAgICAgIHVuaXRzIDogXCJtbVwiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIlwiXG4gIH0sXG4gIEN1bUlycmlnIDoge1xuICAgICAgbGFiZWwgOiBcIkN1bXVsYXRpdmUgUmVxdWlyZWQgSXJyaWdhdGlvblwiLFxuICAgICAgdW5pdHMgOiBcIm1tL21vblwiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIlwiXG4gIH0sXG4gIElycmlnIDoge1xuICAgICAgbGFiZWwgOiBcIlJlcXVpcmVkIElycmlnYXRpb25cIixcbiAgICAgIHVuaXRzIDogXCJtbS9tb25cIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJcIlxuICB9LFxuICBTdGFuZEFnZSA6IHtcbiAgICAgIGxhYmVsIDogXCJTdGFuZCBBZ2VcIixcbiAgICAgIHVuaXRzIDogXCJcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJcIlxuICB9LFxuICBMQUkgOiB7XG4gICAgICBsYWJlbCA6IFwiTGVhZiBBcmVhIEluZGV4XCIsXG4gICAgICB1bml0cyA6IFwibTIgLyBtMlwiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIlRoZSBvbmUtc2lkZWQgZ3JlZW4gbGVhZiBhcmVhIHBlciB1bml0IGdyb3VuZCBzdXJmYWNlIGFyZWFcIlxuICB9LFxuICBDYW5Db25kIDoge1xuICAgICAgbGFiZWwgOiBcIkNhbm9weSBDb25kdWN0YW5jZVwiLFxuICAgICAgdW5pdHMgOiBcImdjLG0vc1wiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIlwiXG4gIH0sXG4gIFRyYW5zcCA6IHtcbiAgICAgIGxhYmVsIDogXCJDYW5vcHkgTW9udGhseSBUcmFuc3BpcmF0aW9uXCIsXG4gICAgICB1bml0cyA6IFwibW0vbW9uXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiV2F0ZXIgbW92ZW1lbnQgdGhyb3VnaCBhIHBsYW50IGFuZCBpdHMgZXZhcG9yYXRpb24gZnJvbSBhZXJpYWwgcGFydHNcIlxuICB9LFxuICBFVHIgOiB7XG4gICAgICBsYWJlbCA6IFwiRVRyXCIsXG4gICAgICB1bml0cyA6IFwibW1cIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJSZWZlcmVuY2UgZXZhcG90cmFuc3BpcmF0aW9uIGZvciBBbGZhbGZhXCJcbiAgfSxcbiAgS2MgOiB7XG4gICAgICBsYWJlbCA6IFwiS2NcIixcbiAgICAgIHVuaXRzIDogXCJcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJDcm9wIGNvZWZmaWNpZW50c1wiXG4gIH0sXG4gIGZTVyA6IHtcbiAgICAgIGxhYmVsIDogXCJTb2lsIFdhdGVyIE1vZGlmaWVyXCIsXG4gICAgICB1bml0cyA6IFwidW5pdGxlc3NcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJBIGVudmlyb25tZW50YWwgZmFjdG9yIGdyb3d0aCBtb2RpZmllclwiXG4gIH0sXG4gIGZBZ2UgOiB7XG4gICAgICBsYWJlbCA6IFwiU3RhbmQgYWdlXCIsXG4gICAgICB1bml0cyA6IFwidW5pdGxlc3NcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJBIGVudmlyb25tZW50YWwgZmFjdG9yIGdyb3d0aCBtb2RpZmllclwiXG4gIH0sXG4gIFBoeXNNb2QgOiB7XG4gICAgICBsYWJlbCA6IFwiXCIsXG4gICAgICB1bml0cyA6IFwidW5pdGxlc3NcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJQaHlzaW9sb2dpY2FsIE1vZGlmaWVyIHRvIENhbm9weSBDb25kdWN0YW5jZVwiXG4gIH0sXG4gIHBSIDoge1xuICAgICAgbGFiZWwgOiBcIlwiLFxuICAgICAgdW5pdHMgOiBcIlwiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIkFsb25nIHdpdGggYSBQaHlzaW9sb2dpYWwgcGFyYW1ldGVyLCBzcGVjaWZpZXMgdGhlIGFtb3VudCBvZiBuZXcgZ3Jvd3RoIGFsbG9jYXRlZCB0byB0aGUgcm9vdCBzeXN0ZW0sIGFuZCB0aGUgdHVybm92ZXIgcmF0ZS5cIlxuICB9LFxuICBwUyA6IHtcbiAgICAgIGxhYmVsIDogXCJcIixcbiAgICAgIHVuaXRzIDogXCJcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJEZWZpbmVzIHRoZSBmb2xpYWdlIHRvIHN0ZW0gKFdGL1dTKSBmcmFjdGlvbiBpbiBhbGxvY2F0aW5nIGFib3ZlZ3JvdW5kIGJpb21hc3Mgb2YgdGhlIHRyZWVcIlxuICB9LFxuICBsaXR0ZXJmYWxsIDoge1xuICAgICAgbGFiZWwgOiBcIlwiLFxuICAgICAgdW5pdHMgOiBcIlwiLFxuICAgICAgZGVzY3JpdGlvbiA6IFwiXCIsXG4gICAgICBhbHRGbk5hbWUgOiBcInRkcFwiXG4gIH0sXG4gIE5QUCA6IHtcbiAgICAgIGxhYmVsIDogXCJOZXQgQ2Fub3B5IFByb2R1Y3Rpb25cIixcbiAgICAgIHVuaXRzIDogXCJNZy9oYVwiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIlwiXG4gIH0sXG4gIFdGIDoge1xuICAgICAgbGFiZWwgOiBcIkxlYWYgQmlvbWFzc1wiLFxuICAgICAgdW5pdHMgOiBcIk1nL2hhXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiXCIsXG4gICAgICBmbiA6IGZ1bmN0aW9uKHByZV9XRiwgY3VyX2RXLCBjdXJfcEYsIGN1cl9saXR0ZXJmYWxsLCBwcmV2X1dGKSB7XG4gICAgICAgICAgcmV0dXJuIHByZXZfV0YgKyBjdXJfZFcgKiBjdXJfcEYgLSBjdXJfbGl0dGVyZmFsbCAqIHByZXZfV0ZcbiAgICAgIH1cbiAgfSxcbiAgV1IgOiB7XG4gICAgICBsYWJlbCA6IFwiUm9vdCBCaW9tYXNzXCIsXG4gICAgICB1bml0cyA6IFwiTWcvaGFcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJcIixcbiAgICAgIGZuIDogZnVuY3Rpb24ocHJldl9XUiwgY3VyX2RXLCBjdXJfcFIsIHR1cm5vdmVyLCBwcmV2X1dSLCBjdXJfUm9vdFApIHtcbiAgICAgICAgICByZXR1cm4gcHJldl9XUiArIGN1cl9kVyAqIGN1cl9wUiAtIHRyZWUucFIudHVybm92ZXIgKiBwcmV2X1dSIC0gY3VyX1Jvb3RQO1xuICAgICAgfVxuICB9LFxuICBXUyA6IHtcbiAgICAgIGxhYmVsIDogXCJTdGVtIEJpb21hc3NcIixcbiAgICAgIHVuaXRzIDogXCJNZy9oYVwiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIlwiLFxuICAgICAgZm4gOiBmdW5jdGlvbihwcmV2X1dTLCBjdXJfZFcsIGN1cl9wUykgeyByZXR1cm4gcHJldl9XUyArIGN1cl9kVyAqIGN1cl9wUyB9XG4gIH0sXG4gIFcgOiB7XG4gICAgICBsYWJlbCA6IFwiVG90YWwgQmlvbWFzc1wiLFxuICAgICAgdW5pdHMgOiBcIk1nL2hhXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiXCIsXG4gICAgICBmbiA6IGZ1bmN0aW9uKGN1cl9XRiwgY3VyX1dSLCBjdXJfV1MpIHsgcmV0dXJuIGN1cl9XRitjdXJfV1IrY3VyX1dTIH1cbiAgfVxufVxuIiwidmFyIG1vZGVsSU8gPSByZXF1aXJlKCcuLi9tb2RlbFJ1bkhhbmRsZXInKTtcbnZhciBhcHA7XG5cbnZhciBzaG93ID0gZnVuY3Rpb24ocmVzdWx0cykge1xuICB2YXIgaSwgejtcblxuICAvLyBzZWxlY3RlZCBpbiB0aGUgY2hhcnRzIG91dHB1dFxuICB2YXIgdmFycyA9ICQoXCIjY2hhcnRUeXBlSW5wdXRcIikudmFsKCk7XG5cbiAgLy8gZmluZCB0aGUgcm93cyB3ZSBjYXJlIGFib3V0XG4gIHZhciBjaGFydFJvd3MgPSB7fTtcbiAgZm9yKCBpID0gMDsgaSA8IHJlc3VsdHNbMF0ub3V0cHV0WzBdLmxlbmd0aDsgaSsrICkge1xuICAgICAgaWYoIHZhcnMuaW5kZXhPZihyZXN1bHRzWzBdLm91dHB1dFswXVtpXSkgPiAtMSApIGNoYXJ0Um93c1tyZXN1bHRzWzBdLm91dHB1dFswXVtpXV0gPSBpO1xuICB9XG5cbiAgdmFyIHRhYnMgPSAkKCc8dWwgY2xhc3M9XCJuYXYgbmF2LXBpbGxzXCIgaWQ9XCJyYXdPdXRwdXRUYWJzXCIgIGRhdGEtdGFicz1cInBpbGxcIj48L3VsPicpO1xuICB2YXIgY29udGVudHMgPSAkKCc8ZGl2IGNsYXNzPVwidGFiLWNvbnRlbnRcIiBzdHlsZT1cIm92ZXJmbG93OmF1dG87bWFyZ2luLXRvcDoxNXB4XCI+PC9kaXY+Jyk7XG5cbiAgZm9yKCBpID0gMDsgaSA8IHZhcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRhYnMuYXBwZW5kKCQoJzxsaSAnKyhpID09PSAwID8gJ2NsYXNzPVwiYWN0aXZlXCInIDogXCJcIikrJz48YSBocmVmPVwiI3Jhd291dCdcbiAgICAgICAgICArdmFyc1tpXSsnXCIgZGF0YS10b2dnbGU9XCJ0YWJcIj4nK3ZhcnNbaV0rJzwvYT48L2xpPicpKTtcblxuICAgICAgY29udGVudHMuYXBwZW5kKCQoJzxkaXYgY2xhc3M9XCJ0YWItcGFuZSAnICsgKGkgPT09IDAgPyAnYWN0aXZlJyA6IFwiXCIpXG4gICAgICAgICAgKyAnXCIgaWQ9XCJyYXdvdXQnICsgdmFyc1tpXSArICdcIj48L2Rpdj4nKSk7XG4gIH1cblxuICAkKFwiI291dHB1dC1jb250ZW50XCIpLmh0bWwoXCJcIikuYXBwZW5kKHRhYnMpLmFwcGVuZChjb250ZW50cyk7XG4gICQoXCIjcmF3T3V0cHV0VGFic1wiKS50YWIoKTtcblxuICBjc3ZSZXN1bHRzID0ge1xuICAgICAgY29uZmlnIDogbW9kZWxJTy5leHBvcnRTZXR1cCgpLFxuICAgICAgZGF0YSA6IHt9XG4gIH07XG5cbiAgdmFyIGNEYXRlID0gbmV3IERhdGUoJChcIiNpbnB1dC1tYW5hZ2UtZGF0ZVBsYW50ZWRcIikudmFsKCkpO1xuXG4gIHZhciB0YWJsZSwgcm93O1xuICBmb3IoIHZhciBrZXkgaW4gY2hhcnRSb3dzICkge1xuICAgICAgdGFibGUgPSBcIjx0YWJsZSBjbGFzcz0ndGFibGUgdGFibGUtc3RyaXBlZCc+XCI7XG5cbiAgICAgIGNzdlJlc3VsdHMuZGF0YVtrZXldID0gW107XG5cbiAgICAgIGZvciggdmFyIGogPSAwOyBqIDwgcmVzdWx0c1swXS5vdXRwdXQubGVuZ3RoOyBqKysgKXtcbiAgICAgICAgICBjc3ZSZXN1bHRzLmRhdGFba2V5XVtqXSA9IFtdO1xuXG4gICAgICAgICAgLy8gc2V0IGhlYWRlciByb3dcbiAgICAgICAgICBpZiggaiA9PT0gMCApIHtcbiAgICAgICAgICAgICAgY3N2UmVzdWx0cy5kYXRhW2tleV1bal0ucHVzaCgnbW9udGgnKTtcbiAgICAgICAgICAgICAgY3N2UmVzdWx0cy5kYXRhW2tleV1bal0ucHVzaCgnZGF0ZScpO1xuXG4gICAgICAgICAgICAgIHRhYmxlICs9IFwiPHRyPjx0aD5TdGVwPC90aD48dGg+RGF0ZTwvdGg+XCI7XG4gICAgICAgICAgICAgIGZvciggeiA9IDA7IHogPCByZXN1bHRzLmxlbmd0aDsgeisrICkge1xuICAgICAgICAgICAgICAgICAgdGFibGUgKz0gXCI8dGg+XCI7XG4gICAgICAgICAgICAgICAgICB2YXIgdG1wID0gW107XG5cbiAgICAgICAgICAgICAgICAgIGZvciggdmFyIG1UeXBlIGluIHJlc3VsdHNbel0uaW5wdXRzICkge1xuICAgICAgICAgICAgICAgICAgICAgIHRtcC5wdXNoKG1UeXBlK1wiPVwiK3Jlc3VsdHNbel0uaW5wdXRzW21UeXBlXSk7XG4gICAgICAgICAgICAgICAgICAgICAgdGFibGUgKz0gXCI8ZGl2PlwiK21UeXBlK1wiPVwiK3Jlc3VsdHNbel0uaW5wdXRzW21UeXBlXStcIjwvZGl2PlwiO1xuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICBpZiggdG1wLmxlbmd0aCA9PT0gMCApIHtcbiAgICAgICAgICAgICAgICAgICAgICBjc3ZSZXN1bHRzLmRhdGFba2V5XVtqXS5wdXNoKGtleSk7XG4gICAgICAgICAgICAgICAgICAgICAgdGFibGUgKz0ga2V5O1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICBjc3ZSZXN1bHRzLmRhdGFba2V5XVtqXS5wdXNoKHRtcC5qb2luKFwiIFwiKSk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB0YWJsZSArPSBcIjwvdGg+XCI7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICB0YWJsZSArPSBcIjwvdHI+XCI7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgLy92YXIgZGF0ZSA9IG5ldyBEYXRlKGNEYXRlLmdldFllYXIoKSsxOTAwLCBjRGF0ZS5nZXRNb250aCgpK2osIGNEYXRlLmdldERhdGUoKSk7XG4gICAgICAgICAgICAgIC8vdmFyIG0gPSBkYXRlLmdldE1vbnRoKCkrMTtcbiAgICAgICAgICAgICAgLy9pZiggbSA8IDEwICkgbSA9ICcwJyttO1xuXG4gICAgICAgICAgICAgIHRhYmxlICs9IFwiPHRyPjx0ZD5cIitqK1wiPC90ZD48dGQ+XCIrcmVzdWx0c1swXS5vdXRwdXRbal1bMF0rJzwvdGQ+JztcblxuICAgICAgICAgICAgICBjc3ZSZXN1bHRzLmRhdGFba2V5XVtqXS5wdXNoKGopO1xuICAgICAgICAgICAgICBjc3ZSZXN1bHRzLmRhdGFba2V5XVtqXS5wdXNoKHJlc3VsdHNbMF0ub3V0cHV0W2pdWzBdKTtcblxuICAgICAgICAgICAgICB2YXIgdjtcbiAgICAgICAgICAgICAgZm9yKCB6ID0gMDsgeiA8IHJlc3VsdHMubGVuZ3RoOyB6KysgKSB7XG4gICAgICAgICAgICAgICAgICB2ID0gcmVzdWx0c1t6XS5vdXRwdXRbal1bY2hhcnRSb3dzW2tleV1dO1xuICAgICAgICAgICAgICAgICAgdGFibGUgKz0gXCI8dGQ+XCIrditcIjwvdGQ+XCI7XG4gICAgICAgICAgICAgICAgICBjc3ZSZXN1bHRzLmRhdGFba2V5XVtqXS5wdXNoKHYpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHRhYmxlICs9IFwiPC90cj5cIjtcbiAgICAgICAgICB9XG5cbiAgICAgIH1cbiAgICAgICQoXCIjcmF3b3V0XCIgKyBrZXkpLmh0bWwodGFibGUrXCI8L3RhYmxlPlwiKTtcbiAgfVxuXG4gIGFwcC5zZXRDc3ZSZXN1bHRzKGNzdlJlc3VsdHMpO1xuXG4gIC8vIG1ha2Ugc3VyZSB3ZSBjYW4gc2VlIHRoZSBleHBvcnQgYnRuXG4gIGlmKCAhb2ZmbGluZU1vZGUgKSAkKFwiI3Nob3ctZXhwb3J0LWNzdlwiKS5zaG93KCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2hvdyA6IHNob3csXG4gIGluaXQgOiBmdW5jdGlvbihhKSB7XG4gICAgYXBwID0gYTtcbiAgfVxufTtcbiIsImZ1bmN0aW9uIHFzKGtleSkge1xuICBrZXkgPSBrZXkucmVwbGFjZSgvWyorP14kLlxcW1xcXXt9KCl8XFxcXFxcL10vZywgXCJcXFxcJCZcIik7XG4gIHZhciBtYXRjaCA9IGxvY2F0aW9uLnNlYXJjaC5tYXRjaChuZXcgUmVnRXhwKFwiWz8mXVwiICsga2V5ICsgXCI9KFteJl0rKSgmfCQpXCIpKTtcbiAgcmV0dXJuIG1hdGNoICYmIGRlY29kZVVSSUNvbXBvbmVudChtYXRjaFsxXS5yZXBsYWNlKC9cXCsvZywgXCIgXCIpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHFzIDogcXNcbn07XG4iLCJ2YXIgb3B0aW9ucyA9IHtcbiAgdGl0bGUgOiAnV2VhdGhlcicsXG4gIGhlaWdodCA6IDMwMCxcbiAgdkF4ZXM6IFt7XG4gICAgICAgICAgdGl0bGU6IFwiUmFkaWF0aW9uIChNSi9kYXkpOyBUZW1wZXJhdHVyZSAoXkMpOyBEZXcgUG9pbnQgKF5DKTsgRGF5bGlnaHQgKGgpXCIsXG4gICAgICAgICAgbWluVmFsdWUgOiAtNSxcbiAgICAgICAgICBtYXhWYWx1ZSA6IDM1XG4gICAgICAgIH0se1xuICAgICAgICAgIHRpdGxlOiBcIlByZWNpcGl0YXRpb24gKG1tKVwiLFxuICAgICAgICAgIG1pblZhbHVlIDogLTUwLFxuICAgICAgICAgIG1heFZhbHVlIDogMzUwXG4gICAgICAgIH1dLFxuICBoQXhpczoge3RpdGxlOiBcIk1vbnRoXCJ9LFxuICBzZXJpZXNUeXBlOiBcImJhcnNcIixcbiAgc2VyaWVzOiB7XG4gICAgICAwOiB7dHlwZTogXCJsaW5lXCIsIHRhcmdldEF4aXNJbmRleDowfSxcbiAgICAgIDE6IHt0eXBlOiBcImxpbmVcIiwgdGFyZ2V0QXhpc0luZGV4OjB9LFxuICAgICAgMjoge3R5cGU6IFwibGluZVwiLCB0YXJnZXRBeGlzSW5kZXg6MH0sXG4gICAgICAzOiB7dHlwZTogXCJhcmVhXCIsIHRhcmdldEF4aXNJbmRleDoxfSxcbiAgICAgIDQ6IHt0YXJnZXRBeGlzSW5kZXg6MH1cbiAgfVxufTtcblxuZnVuY3Rpb24gY3JlYXRlKHJvb3QsIGRhdGEpIHtcbiAgJChyb290KS5odG1sKCcnKTtcblxuICB2YXIgZHQgPSBuZXcgZ29vZ2xlLnZpc3VhbGl6YXRpb24uRGF0YVRhYmxlKCk7XG4gIGR0LmFkZENvbHVtbignc3RyaW5nJywgJ01vbnRoJyk7XG4gIGR0LmFkZENvbHVtbignbnVtYmVyJywgJ01pbiBUZW1wZXJhdHVyZScpO1xuICBkdC5hZGRDb2x1bW4oJ251bWJlcicsICdNYXggVGVtcGVyYXR1cmUnKTtcbiAgZHQuYWRkQ29sdW1uKCdudW1iZXInLCAnRGV3IFBvaW50Jyk7XG4gIGR0LmFkZENvbHVtbignbnVtYmVyJywgJ1ByZWNpcGl0YXRpb24nKTtcbiAgZHQuYWRkQ29sdW1uKCdudW1iZXInLCAnUmFkaWF0aW9uJyk7XG4gIGR0LmFkZENvbHVtbignbnVtYmVyJywgJ0RheWxpZ2h0Jyk7XG5cbiAgZm9yKCB2YXIgZGF0ZSBpbiBkYXRhICkge1xuICAgICAgdmFyIG9iaiA9IGRhdGFbZGF0ZV07XG4gICAgICBkdC5hZGRSb3coW1xuICAgICAgICAgIGRhdGUrJycsXG4gICAgICAgICAgb2JqLnRtaW4gfHwgMCxcbiAgICAgICAgICBvYmoudG1heCB8fCAwLFxuICAgICAgICAgIG9iai50ZG1lYW4gfHwgMCxcbiAgICAgICAgICBvYmoucHB0IHx8IDAsXG4gICAgICAgICAgb2JqLnJhZCB8fCAwLFxuICAgICAgICAgIG9iai5kYXlsaWdodCB8fCAwXG4gICAgICBdKTtcbiAgfVxuXG4gIHZhciBjaGFydCA9IG5ldyBnb29nbGUudmlzdWFsaXphdGlvbi5Db21ib0NoYXJ0KHJvb3QpO1xuICBjaGFydC5kcmF3KGR0LCBvcHRpb25zKTtcblxuICByZXR1cm4gY2hhcnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBjcmVhdGUgOiBjcmVhdGVcbn07XG4iLCJ2YXIgYXBwID0gcmVxdWlyZSgnLi4vYXBwJyk7XG5cbi8vIGFkZCBzcHJlYWRzaGVldCB2aXogc291cmNlXG4vLyBodHRwczovL3NwcmVhZHNoZWV0cy5nb29nbGUuY29tL3RxP3RxPXNlbGVjdCUyMComa2V5PTBBdjdjVVYtbzJRUVlkSFpGWVdKTk5XcFJTMWhJVldoR1FUaGxMV1p3WldjJnVzcD1kcml2ZV93ZWIjZ2lkPTBcblxuZnVuY3Rpb24gaW5pdCgpIHtcbnZhciBkcm9wWm9uZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkcm9wX3pvbmUnKTtcbmRyb3Bab25lLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJywgX2hhbmRsZURyYWdPdmVyLCBmYWxzZSk7XG5kcm9wWm9uZS5hZGRFdmVudExpc3RlbmVyKCdkcm9wJywgX2hhbmRsZUZpbGVTZWxlY3QsIGZhbHNlKTtcblxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZpbGVzJykuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgX2hhbmRsZUZpbGVTZWxlY3QsIGZhbHNlKTtcblxuICAgICQoJyNzcHJlYWRzaGVldC13ZWF0aGVyLWlucHV0LWJ0bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgIF9oYW5kbGVHb29nbGVTcHJlYWRzaGVldCgpO1xuICAgIH0pO1xuICAgICQoJyNzcHJlYWRzaGVldC13ZWF0aGVyLWlucHV0Jykub24oJ2tleXVwJywgZnVuY3Rpb24oZSl7XG4gICAgICAgIGlmKCBlLndoaWNoID09IDEzICkgX2hhbmRsZUdvb2dsZVNwcmVhZHNoZWV0KCk7XG4gICAgfSk7XG5cbiAgICAkKCcjd2VhdGhlclJlYWRlci1sb2NhbGZpbGUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICAkKCcjd2VhdGhlclJlYWRlci1sb2NhbGZpbGUtcGFuZWwnKS50b2dnbGUoJ3Nsb3cnKTtcbiAgICB9KTtcbiAgICAkKCcjd2VhdGhlclJlYWRlci1zcHJlYWRzaGVldCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgICQoJyN3ZWF0aGVyUmVhZGVyLXNwcmVhZHNoZWV0LXBhbmVsJykudG9nZ2xlKCdzbG93Jyk7XG4gICAgfSk7XG5cbn1cblxuZnVuY3Rpb24gX2hhbmRsZUdvb2dsZVNwcmVhZHNoZWV0KCkge1xuICAgIGdhKCdzZW5kJywgJ2V2ZW50JywgJ3VpJywgJ2ludGVyYWN0aW9uJywgJ2xvYWQtd2VhdGhlci1kcml2ZS1maWxlJywgMSk7XG5cbiAgICB2YXIgdmFsID0gJCgnI3NwcmVhZHNoZWV0LXdlYXRoZXItaW5wdXQnKS52YWwoKTtcbiAgICBpZiggdmFsLmxlbmd0aCA9PSAwICkgcmV0dXJuO1xuXG4gICAgaWYoICF2YWwubWF0Y2goL15odHRwLiovICkgKSB2YWwgPSAnaHR0cHM6Ly8nK3ZhbDtcblxuICAgIHZhciBmaWxlUGFuZWwgPSBuZXcgV2VhdGhlckZpbGUoKTtcbiAgICB2YXIgcm9vdCA9ICQoXCIjZmlsZV9saXN0XCIpO1xuICAgIGZpbGVQYW5lbC5pbml0RnJvbVVybCh2YWwsIHJvb3QpO1xuICAgICQoJyNzcHJlYWRzaGVldC13ZWF0aGVyLWlucHV0JykudmFsKCcnKTtcbn1cblxuZnVuY3Rpb24gX2hhbmRsZUZpbGVTZWxlY3QoZXZ0KSB7XG4gICAgZ2EoJ3NlbmQnLCAnZXZlbnQnLCAndWknLCAnaW50ZXJhY3Rpb24nLCAnbG9hZC13ZWF0aGVyLWxvY2FsLWZpbGUnLCAxKTtcblxuICBldnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gIHZhciBmaWxlcyA9IGV2dC5kYXRhVHJhbnNmZXIgPyBldnQuZGF0YVRyYW5zZmVyLmZpbGVzIDogZXZ0LnRhcmdldC5maWxlczsgLy8gRmlsZUxpc3Qgb2JqZWN0LlxuXG4gIC8vIGZpbGVzIGlzIGEgRmlsZUxpc3Qgb2YgRmlsZSBvYmplY3RzLiBMaXN0IHNvbWUgcHJvcGVydGllcy5cbiAgdmFyIHJvb3QgPSAkKFwiI2ZpbGVfbGlzdFwiKTtcbiAgZm9yICh2YXIgaSA9IDAsIGY7IGYgPSBmaWxlc1tpXTsgaSsrKSB7XG4gICAgdmFyIGZpbGVQYW5lbCA9IG5ldyBXZWF0aGVyRmlsZSgpO1xuICAgIGZpbGVQYW5lbC5pbml0KGYsIHJvb3QpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9oYW5kbGVEcmFnT3ZlcihldnQpIHtcbmV2dC5zdG9wUHJvcGFnYXRpb24oKTtcbmV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuZXZ0LmRhdGFUcmFuc2Zlci5kcm9wRWZmZWN0ID0gJ2NvcHknOyAvLyBFeHBsaWNpdGx5IHNob3cgdGhpcyBpcyBhIGNvcHkuXG59XG5cbi8vIG9uIGFkZCwgaWYgdGhlIGxpc3QgaXMgZW1wdHksIGxldCdzIGNsb3NlIHRoZSBwb3B1cFxuZnVuY3Rpb24gX29uQ29tcGxldGUoKSB7XG4gICAgaWYoICQoXCIjZmlsZV9saXN0XCIpLmNoaWxkcmVuKCkubGVuZ3RoID09IDAgKSB7XG4gICAgICAgICQoJyN3ZWF0aGVyUmVhZGVyLW1vZGFsJykubW9kYWwoJ2hpZGUnKTtcbiAgICB9XG59XG5cbnZhciBXZWF0aGVyRmlsZSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgaGVhZGVycyA9IHtcbiAgICAgICAgZGF0ZSAgICAgOiB7XG4gICAgICAgICAgICBsYWJlbCA6ICdEYXRlJyxcbiAgICAgICAgICAgIHVuaXRzIDogJ0RhdGUnLFxuICAgICAgICAgICAgY29sICAgOiAtMVxuICAgICAgICB9LFxuICAgICAgICB0bWluICAgICA6IHtcbiAgICAgICAgICAgIGxhYmVsIDogJ01pbiBUZW1wZXJhdHVyZScsXG4gICAgICAgICAgICB1bml0cyA6ICdDJyxcbiAgICAgICAgICAgIGNvbCAgIDogLTFcbiAgICAgICAgfSxcbiAgICAgICAgdG1heCAgICAgOiB7XG4gICAgICAgICAgICBsYWJlbCA6ICdNYXggVGVtcGVyYXR1cmUnLFxuICAgICAgICAgICAgdW5pdHMgOiAnQycsXG4gICAgICAgICAgICBjb2wgICA6IC0xXG4gICAgICAgIH0sXG4gICAgICAgIHRkbWVhbiAgIDoge1xuICAgICAgICAgICAgbGFiZWwgOiAnTWVhbiBUZW1wZXJhdHVyZScsXG4gICAgICAgICAgICB1bml0cyA6ICdDJyxcbiAgICAgICAgICAgIGNvbCAgIDogLTFcbiAgICAgICAgfSxcbiAgICAgICAgcHB0ICAgICAgOiB7XG4gICAgICAgICAgICBsYWJlbCA6ICdQcmVjaXBpdGlvbicsXG4gICAgICAgICAgICB1bml0cyA6ICdtbScsXG4gICAgICAgICAgICBjb2wgICA6IC0xXG4gICAgICAgIH0sXG4gICAgICAgIHJhZCAgICAgIDoge1xuICAgICAgICAgICAgbGFiZWwgOiAnUmFkaWF0aW9uJyxcbiAgICAgICAgICAgIHVuaXRzIDogJ01KIG0tMiBkYXktMScsXG4gICAgICAgICAgICBjb2wgICA6IC0xXG4gICAgICAgIH0sXG4gICAgICAgIGRheWxpZ2h0IDoge1xuICAgICAgICAgICAgbGFuZWwgOiAnRGF5bGlnaHQgSG91cnMnLFxuICAgICAgICAgICAgdW5pdHMgOiAnaG91cnMnLFxuICAgICAgICAgICAgY29sICAgOiAtMVxuICAgICAgICB9XG4gICAgfTtcblxuXG4gIHZhciBlbGUgPSAkKCc8ZGl2IHN0eWxlPVwidGV4dC1hbGlnbjogbGVmdFwiPicrXG4gICAgICAgICAgICAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbG9zZVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPiZ0aW1lczs8L2J1dHRvbj4nK1xuICAgICAgJzxkaXYgY2xhc3M9XCJmaWxlbmFtZVwiPjwvZGl2PicrXG4gICAgICAnPGRpdiBjbGFzcz1cInByb2dyZXNzXCI+JytcbiAgICAgICc8ZGl2IGNsYXNzPVwicHJvZ3Jlc3MtYmFyXCIgcm9sZT1cInByb2dyZXNzYmFyXCIgYXJpYS12YWx1ZW5vdz1cIjBcIiBhcmlhLXZhbHVlbWluPVwiMFwiIGFyaWEtdmFsdWVtYXg9XCIxMDBcIiBzdHlsZT1cIndpZHRoOiAwJTtcIj4nK1xuICAgICAgICAnPHNwYW4gY2xhc3M9XCJzci1vbmx5XCI+MCUgQ29tcGxldGU8L3NwYW4+JytcbiAgICAgICc8L2Rpdj4nK1xuICAgICc8L2Rpdj4nK1xuICAgICAgJzxkaXYgY2xhc3M9XCJzdGF0dXNcIj4nK1xuICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiZGF0ZS1yYW5nZVwiPjwvZGl2PicrXG4gICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJwcmV2aWV3LWRhdGFcIiBzdHlsZT1cImRpc3BsYXk6bm9uZVwiPicrXG4gICAgICAgICAgICAgICAgICAgICc8ZGl2PjxhIGNsYXNzPVwiYnRuIGJ0bi1saW5rIHByZXZpZXctZGF0YS1idG5cIj5QcmV2aWV3IERhdGE8L2E+PC9kaXY+JytcbiAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJwcmV2aWV3LWRhdGEtdGFibGVcIiBzdHlsZT1cImRpc3BsYXk6bm9uZVwiPjwvZGl2PicrXG4gICAgICAgICAgICAgICAgJzwvZGl2PicrXG4gICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJjb2wtc3RhdHVzXCIgc3R5bGU9XCJkaXNwbGF5Om5vbmVcIj48L2Rpdj4nK1xuICAgICAgICAgICAgICAgICc8ZGl2IHN0eWxlPVwiaGVpZ2h0OjUwcHhcIj4nK1xuICAgICAgICAgICAgICAgICAgICAnPGEgY2xhc3M9XCJidG4gYnRuLWxpbmsgbWFwLWRhdGEtYnRuXCI+TWFwIENTViBDb2x1bW5zPC9hPicrXG4gICAgICAgICAgICAgICAgICAgICc8YSBjbGFzcz1cImJ0biBidG4tc3VjY2VzcyBkaXNhYmxlZCBwdWxsLXJpZ2h0XCI+QWRkIERhdGE8L2E+JytcbiAgICAgICAgICAgICAgICAnPC9kaXY+JytcbiAgICAgICAgICAgICc8L2Rpdj4nK1xuICAgICc8L2Rpdj4nKTtcblxuICB2YXIgZGF0YSA9IHt9O1xuICAgIHZhciBjc3ZUYWJsZSA9IFtdO1xuXG4gICAgLy8gb25seSBhdXRvIGhpZGUgdGhlIGZpcnN0IHRpbWVcbiAgICB2YXIgYXV0b0hpZGUgPSB0cnVlO1xuXG4gIC8vIHRoZSBmaWxlIHJlYWRlciBvYmplY3QgYW5kIHRoZSBlbGVtZW50XG4gIGZ1bmN0aW9uIGluaXQoZmlsZSwgcm9vdEVsZSkge1xuICAgIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgIHJlYWRlci5vbmVycm9yID0gZXJyb3JIYW5kbGVyO1xuICAgIHJlYWRlci5vbnByb2dyZXNzID0gdXBkYXRlUHJvZ3Jlc3M7XG4gICAgcmVhZGVyLm9ubG9hZHN0YXJ0ID0gZnVuY3Rpb24oZSkge307XG4gICAgcmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgIGVsZS5maW5kKCcucHJvZ3Jlc3MnKS5yZW1vdmUoKTtcbiAgICAgIHBhcnNlKGUudGFyZ2V0LnJlc3VsdCk7XG4gICAgfVxuICAgIHJlYWRlci5yZWFkQXNUZXh0KGZpbGUpXG5cbiAgICBlbGUuZmluZCgnLmZpbGVuYW1lJykuaHRtbChnZXROYW1lKGZpbGUpKTtcbiAgICByb290RWxlLmFwcGVuZChlbGUpO1xuXG4gICAgICAgIF9zZXRIYW5kbGVycygpO1xuICB9XG5cbiAgICBmdW5jdGlvbiBpbml0RnJvbVVybCh1cmwsIHJvb3RFbGUpIHtcbiAgICAgICAgdmFyIHEgPSBuZXcgZ29vZ2xlLnZpc3VhbGl6YXRpb24uUXVlcnkodXJsKTtcbiAgICAgICAgZWxlLmZpbmQoJy5wcm9ncmVzcycpLmh0bWwoJ1F1ZXJ5aW5nIHNwcmVhZHNoZWV0Li4uJyk7XG5cbiAgICAgICAgdmFyIGtleSA9IGdldEtleSh1cmwpO1xuICAgICAgICBlbGUuZmluZCgnLmZpbGVuYW1lJykuaHRtbCgnPGgzIHN0eWxlPVwiYm9yZGVyLWJvdHRvbToxcHggc29saWQgI2VlZTtwYWRkaW5nOjE1cHggMCA0cHggMFwiPjxpIGNsYXNzPVwiaWNvbi10aW50XCI+PC9pPiAnK1xuICAgICAgICAgICAgJ0dvb2dsZSBTcHJlYWRzaGVldCcrKGtleS5sZW5ndGggPiAwID8gJzxiciAvPjxzcGFuIHN0eWxlPVwiY29sb3I6Izg4ODtmb250LXNpemU6MTRweFwiPicra2V5Kyc8L3NwYW4+JyA6ICcnKSsnPC9oMz4nKTtcblxuICAgICAgICByb290RWxlLmFwcGVuZChlbGUpO1xuXG4gICAgICAgIHEuc2V0UXVlcnkoJ1NFTEVDVCAqJyk7XG4gICAgICAgIHEuc2VuZChmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgICAgICAgICBlbGUuZmluZCgnLnByb2dyZXNzJykucmVtb3ZlKCk7XG5cbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5pc0Vycm9yKCkpIHtcbiAgICAgICAgICAgICAgICBzZXRFcnJvcignRXJyb3IgaW4gcXVlcnk6ICcgKyByZXNwb25zZS5nZXRNZXNzYWdlKCkgKyAnICcgKyByZXNwb25zZS5nZXREZXRhaWxlZE1lc3NhZ2UoKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwYXJzZShkdFRvQ3N2KHJlc3BvbnNlLmdldERhdGFUYWJsZSgpKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIF9zZXRIYW5kbGVycygpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIF9zZXRIYW5kbGVycygpIHtcbiAgICAgICAgZWxlLmZpbmQoJy5tYXAtZGF0YS1idG4nKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgZWxlLmZpbmQoJy5jb2wtc3RhdHVzJykudG9nZ2xlKCdzbG93Jyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGVsZS5maW5kKCcucHJldmlldy1kYXRhLWJ0bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBlbGUuZmluZCgnLnByZXZpZXctZGF0YS10YWJsZScpLnRvZ2dsZSgnc2xvdycpO1xuICAgICAgICB9KTtcblxuICAgICAgICBlbGUuZmluZCgnLmNsb3NlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGVsZS5yZW1vdmUoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZWxlLmZpbmQoJy5idG4tc3VjY2VzcycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBhcHAuc2V0V2VhdGhlcihkYXRhKTtcbiAgICAgICAgICAgIGVsZS5yZW1vdmUoKTtcbiAgICAgICAgICAgIF9vbkNvbXBsZXRlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGR0VG9Dc3YoZHQpIHtcbiAgICAgICAgdmFyIGFyciA9IFtbXV07XG5cbiAgICAgICAgZHQgPSBKU09OLnBhcnNlKGR0LnRvSlNPTigpKTtcbiAgICAgICAgZm9yKCB2YXIgaSA9IDA7IGkgPCBkdC5jb2xzLmxlbmd0aDsgaSsrICkge1xuICAgICAgICAgICAgYXJyWzBdLnB1c2goZHQuY29sc1tpXS5sYWJlbCk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IoIHZhciBpID0gMDsgaSA8IGR0LnJvd3MubGVuZ3RoOyBpKysgKSB7XG4gICAgICAgICAgICBhcnIucHVzaChbXSk7XG4gICAgICAgICAgICBmb3IoIHZhciBqID0gMDsgaiA8IGR0LnJvd3NbaV0uYy5sZW5ndGg7IGorKyApIHtcbiAgICAgICAgICAgICAgICBpZiggIWR0LnJvd3NbaV0uY1tqXSApIGFycltpKzFdLnB1c2goJycpO1xuICAgICAgICAgICAgICAgIGVsc2UgYXJyW2krMV0ucHVzaChkdC5yb3dzW2ldLmNbal0udik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgY3N2ID0gJyc7XG4gICAgICAgIGZvciggdmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrICkge1xuICAgICAgICAgICAgY3N2ICs9IGFycltpXS5qb2luKCcsJykrJ1xcbic7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY3N2O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEtleSh1cmwpIHtcbiAgICAgICAgdmFyIHBhcnRzID0gdXJsLnNwbGl0KCc/Jyk7XG4gICAgICAgIGlmKCBwYXJ0cy5sZW5ndGggPT0gMSApIHJldHVybiAnJztcblxuICAgICAgICBwYXJ0cyA9IHBhcnRzWzFdLnNwbGl0KCcmJyk7XG4gICAgICAgIGZvciggdmFyIGkgPSAwOyBpIDwgcGFydHMubGVuZ3RoOyBpKysgKSB7XG4gICAgICAgICAgICBpZiggcGFydHNbaV0uc3BsaXQoJz0nKVswXSA9PSAna2V5JyApIHJldHVybiBwYXJ0c1tpXS5zcGxpdCgnPScpWzFdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgZnVuY3Rpb24gZ2V0TmFtZShmKSB7XG4gICAgcmV0dXJuIFsnPGgzIHN0eWxlPVwiYm9yZGVyLWJvdHRvbToxcHggc29saWQgI2VlZTtwYWRkaW5nOjE1cHggMCA0cHggMFwiPjxpIGNsYXNzPVwiaWNvbi10aW50XCI+PC9pPiAnLCBmLm5hbWUsXG4gICAgICAgICAgICAgICAgJyA8c3BhbiBzdHlsZT1cImNvbG9yOiM4ODg7Zm9udC1zaXplOjE2cHhcIj4oJywgZi50eXBlIHx8ICduL2EnLFxuICAgICAgICAgICAgICAgICcpPC9zcGFuPiAtIDxzcGFuIHN0eWxlPVwiZm9udC1zaXplOjE2cHhcIj4nLCBmLnNpemUsICcgYnl0ZXM8L3NwYW4+JywgJzwvaDM+J10uam9pbignJyk7XG4gIH1cblxuICBmdW5jdGlvbiBwYXJzZShkYXRhKSB7XG4gICAgZGF0YSA9IGRhdGEucmVwbGFjZSgvXlxccypcXG4vZywnJykuc3BsaXQoJ1xcbicpO1xuXG4gICAgdmFyIHRhYmxlID0gW107XG4gICAgZm9yKCB2YXIgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrICkge1xuICAgICAgdGFibGUucHVzaChkYXRhW2ldLnNwbGl0KCcsJykpO1xuICAgIH1cblxuICAgICAgICBpZiggdGFibGUubGVuZ3RoID09IDAgKSByZXR1cm4gc2V0RXJyb3IoJ0ZpbGUgZGlkIG5vdCBjb250YWluIGFueSBpbmZvcm1hdGlvbi4nKTtcbiAgICAgICAgY3N2VGFibGUgPSB0YWJsZTtcblxuICAgICAgICBwYXJzZUhlYWRlcih0YWJsZVswXSk7XG4gICAgICAgIGdldERhdGVSYW5nZSgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldERhdGVSYW5nZSgpIHtcbiAgICAgICAgZWxlLmZpbmQoJy5kYXRlLXJhbmdlJykuaHRtbCgnJyk7XG4gICAgICAgIGlmKCBoZWFkZXJzLmRhdGUuY29sID09IC0xICkgcmV0dXJuIGVsZS5maW5kKCcuZGF0ZS1yYW5nZScpLmh0bWwoJ0RhdGUgY29sdW1uIG5lZWRzIHRvIGJlIG1hdGNoZWQuJyk7XG4gICAgICAgIGlmKCB0eXBlb2YgaGVhZGVycy5kYXRlLmNvbCA9PSAnc3RyaW5nJyApIGhlYWRlcnMuZGF0ZS5jb2wgPSBwYXJzZUludChoZWFkZXJzLmRhdGUuY29sKTtcblxuICAgICAgICB2YXIgZGF0ZXMgPSB7fTtcbiAgICAgICAgdmFyIGRpc3BsYXlEYXRlcyA9IFtdO1xuICAgICAgICBmb3IoIHZhciBpID0gMTsgaSA8IGNzdlRhYmxlLmxlbmd0aDsgaSsrICkge1xuICAgICAgICAgICAgaWYoIGhlYWRlcnMuZGF0ZS5jb2wgPCBjc3ZUYWJsZVtpXS5sZW5ndGggJiYgY3N2VGFibGVbaV0ubGVuZ3RoID49IDcgKcKge1xuICAgICAgICAgICAgICAgIHZhciBwID0gY3N2VGFibGVbaV1baGVhZGVycy5kYXRlLmNvbF0uc3BsaXQoXCItXCIpO1xuICAgICAgICAgICAgICAgIGlmKCBwLmxlbmd0aCAhPSAzICYmIHAubGVuZ3RoICE9IDIgKSByZXR1cm4gc2V0RXJyb3IoXCJEYXRlOiBcIitjc3ZUYWJsZVtpXVtoZWFkZXJzLmRhdGUuY29sXStcIiBpcyBub3QgYSB2YWxpZCBmb3JtYXQgKHl5eXktbW0tZGQgb3IgeXl5eS1tbSlcIik7XG5cbiAgICAgICAgICAgICAgICBpZiggIWRhdGVzW3BbMF1dICkgZGF0ZXNbcFswXV0gPSBbXTtcbiAgICAgICAgICAgICAgICB2YXIgbW1kZCA9IHBbMV07XG5cbiAgICAgICAgICAgICAgICBpZiggZGF0ZXNbcFswXV0uaW5kZXhPZihtbWRkKSAhPSAtMSApIHJldHVybiBzZXRFcnJvcihcIkRhdGU6IFwiK2NzdlRhYmxlW2ldW2hlYWRlcnMuZGF0ZS5jb2xdK1wiIGlzIGluIGRhdGFzZXQgdHdpY2VcIik7XG4gICAgICAgICAgICAgICAgZGF0ZXNbcFswXV0ucHVzaChtbWRkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZvciggdmFyIHllYXIgaW4gZGF0ZXMgKSB7XG4gICAgICAgICAgICBpZiggZGF0ZXNbeWVhcl0ubGVuZ3RoID09IDEyKSB7XG4gICAgICAgICAgICAgICAgZGlzcGxheURhdGVzLnB1c2goeWVhcik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRpc3BsYXlEYXRlcy5wdXNoKHllYXIrJyBbJytkYXRlc1t5ZWFyXS5qb2luKCcsICcpKyddJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBlbGUuZmluZCgnLmRhdGUtcmFuZ2UnKS5odG1sKCc8Yj5EYXRlIFJhbmdlOjwvYj4gJytkaXNwbGF5RGF0ZXMuam9pbignLCAnKSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VIZWFkZXIoaGVhZGVyUm93KSB7XG4gICAgICAgIHZhciBtYXRjaGVkID0gW107XG5cbiAgICAgICAgdmFyIGh0bWwgPSAnPHRhYmxlIGNsYXNzPVwidGFibGUgdGFibGUtc3RyaXBlZFwiPic7XG4gICAgICAgIGh0bWwgKz0gJzx0cj48dGg+S2V5PC90aD48dGg+Q29sdW1uICM8L3RoPjwvdHI+JztcblxuICAgICAgICBmb3IoIHZhciBrZXkgaW4gaGVhZGVycyApIHtcbiAgICAgICAgICAgIGlmKCBoZWFkZXJSb3cuaW5kZXhPZihrZXkpICE9IC0xICkge1xuICAgICAgICAgICAgICAgIGhlYWRlcnNba2V5XS5jb2wgPSBoZWFkZXJSb3cuaW5kZXhPZihrZXkpO1xuICAgICAgICAgICAgICAgIG1hdGNoZWQucHVzaChrZXkpO1xuICAgICAgICAgICAgICAgIGh0bWwgKz0gJzx0cj48dGQ+JytrZXkrJzwvdGQ+PHRkPjxzcGFuIGNsYXNzPVwibGFiZWwgbGFiZWwtc3VjY2Vzc1wiPicraGVhZGVyc1trZXldLmNvbCsnIDxpIGNsYXNzPVwiaWNvbi1va1wiPjwvaT48L3NwYW4+PC90ZD48L3RyPic7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGh0bWwgKz0gJzx0cj48dGQ+JytrZXkrJzwvdGQ+PHRkPjxzZWxlY3QgY2xhc3M9XCJzZWxlY3QtJytrZXkrJ1wiXCI+PC9zZWxlY3Q+PC90ZD48L3RyPic7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxlLmZpbmQoJy5jb2wtc3RhdHVzJykuaHRtbChodG1sKyc8L3RhYmxlPicpO1xuXG5cbiAgICAgICAgaWYoIG1hdGNoZWQubGVuZ3RoICE9IDcgKSB7XG4gICAgICAgICAgICAvLyBjcmVhdGUgc2VsZWN0IGVsZW1lbnQgZm9yIG1pc3NpbmcgY29sJ3NcbiAgICAgICAgICAgIGVsZS5maW5kKCcuc3RhdHVzIHNlbGVjdCcpLmFwcGVuZCgkKCc8b3B0aW9uIHZhbHVlPVwiXCI+W1NlbGVjdCBDb2x1bW5dPC9vcHRpb24+JykpO1xuXG4gICAgICAgICAgICAvLyBpZiBpdCdzIHJhZGlhdGlvbiwgYWRkIG9wdGlvbiBmb3IgY2FsY3VsYXRpbmdcbiAgICAgICAgICAgIC8vIFRPRE9cblxuICAgICAgICAgICAgLy8gYXBwZW5kIG1pc3NpbmcgY29sc1xuICAgICAgICAgICAgZm9yKCB2YXIgaSA9IDA7IGkgPCBoZWFkZXJSb3cubGVuZ3RoOyBpKysgKSB7XG4gICAgICAgICAgICAgICAgaWYoIG1hdGNoZWQuaW5kZXhPZihoZWFkZXJSb3dbaV0pID09IC0xICkge1xuICAgICAgICAgICAgICAgICAgICBlbGUuZmluZCgnLnN0YXR1cyBzZWxlY3QnKS5hcHBlbmQoJCgnPG9wdGlvbiB2YWx1ZT1cIicraSsnXCI+JytpKycgLSAnK2hlYWRlclJvd1tpXSsnPC9vcHRpb24+JykpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gc2V0IHRoZSBjaGFuZ2UgaGFuZGxlcnMgZm9yIHRoZSBzZWxlY3RvcnNcbiAgICAgICAgICAgIGVsZS5maW5kKCcuc3RhdHVzIHNlbGVjdCcpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS5maW5kKCdvcHRpb246c2VsZWN0ZWQnKS5hdHRyKCd2YWx1ZScpO1xuICAgICAgICAgICAgICAgIGlmKCB2YWwgIT0gJycgKSBoZWFkZXJzW3RoaXMuY2xhc3NOYW1lLnJlcGxhY2UoL3NlbGVjdC0vLCcnKV0uY29sID0gdmFsO1xuXG4gICAgICAgICAgICAgICAgLy8gaWYgYWxsIGNvbHVtbnMgYXJlIHNldCwgcmVtb3ZlIGRpc2FibGVkIGZyb20gYnRuXG4gICAgICAgICAgICAgICAgdmFyIHJlYWR5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBmb3IoIHZhciBrZXkgaW4gaGVhZGVycyApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYoIGhlYWRlcnNba2V5XS5jb2wgPT0gLTEgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWFkeSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiggcmVhZHkgKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKCBhdXRvSGlkZSApIGVsZS5maW5kKCcuY29sLXN0YXR1cycpLmhpZGUoJ3Nsb3cnKTtcbiAgICAgICAgICAgICAgICAgICAgb25SZWFkeSgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGEgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgZWxlLmZpbmQoJy5idG4tc3VjY2VzcycpLmFkZENsYXNzKCdkaXNhYmxlZCcpO1xuICAgICAgICAgICAgICAgICAgICBlbGUuZmluZCgnLnByZXZpZXctZGF0YScpLmhpZGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gc2hvdyB0aGUgdGFibGVcbiAgICAgICAgICAgIGVsZS5maW5kKCcuY29sLXN0YXR1cycpLnNob3coJ3Nsb3cnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG9uUmVhZHkoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uUmVhZHkoKSB7XG4gICAgICAgIGF1dG9IaWRlID0gZmFsc2U7XG4gICAgICAgIGVsZS5maW5kKCcuYnRuLXN1Y2Nlc3MnKS5yZW1vdmVDbGFzcygnZGlzYWJsZWQnKTtcbiAgICAgICAgc2V0RGF0YSgpO1xuICAgICAgICBzZXRQcmV2aWV3KCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0UHJldmlldygpIHtcbiAgICAgICAgZWxlLmZpbmQoJy5wcmV2aWV3LWRhdGEnKS5zaG93KCk7XG5cbiAgICAgICAgdmFyIGh0bWwgPSAnPHRhYmxlIGNsYXNzPVwidGFibGUgdGFibGUtc3RyaXBlZFwiPjx0cj48dGg+ZGF0ZTwvdGg+JztcbiAgICAgICAgZm9yKCB2YXIga2V5IGluIGhlYWRlcnMgKXtcbiAgICAgICAgICAgIGlmKCBrZXkgPT0gJ2RhdGUnICkgY29udGludWU7XG4gICAgICAgICAgICBodG1sICs9ICc8dGg+JytrZXkrJzwvdGg+JztcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBjID0gMDtcbiAgICAgICAgZm9yKCB2YXIgZGF0ZSBpbiBkYXRhICl7XG4gICAgICAgICAgICBpZiggYyA9PSAxMCApIHtcbiAgICAgICAgICAgICAgICBodG1sICs9ICc8dHI+PHRkIGNvbHNwYW49XCI3XCIgc3R5bGU9XCJ0ZXh0LWFsaWduOmNlbnRlclwiPi4uLjwvdGQ+PC90cj4nO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBodG1sICs9ICc8dHI+PHRkPicrZGF0ZSsnPC90ZD4nO1xuICAgICAgICAgICAgZm9yKCB2YXIga2V5IGluIGhlYWRlcnMgKXtcbiAgICAgICAgICAgICAgICBpZigga2V5ID09ICdkYXRlJyApIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGh0bWwgKz0gJzx0ZD4nK2RhdGFbZGF0ZV1ba2V5XSsnPC90ZD4nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaHRtbCArPSAnPC90cj4nO1xuXG4gICAgICAgICAgICBjKys7XG4gICAgICAgIH1cblxuICAgICAgICBlbGUuZmluZCgnLnByZXZpZXctZGF0YS10YWJsZScpLmh0bWwoaHRtbCk7XG4gICAgfVxuXG4gIC8vIHNldCB0aGUgbWFwIG9mIGNzdiBoZWFkZXJzXG4gIGZ1bmN0aW9uIHNldERhdGEoKSB7XG4gICAgICAgIGRhdGEgPSB7fTtcbiAgICAgICAgZm9yKCB2YXIgaSA9IDE7IGkgPCBjc3ZUYWJsZS5sZW5ndGg7IGkrKyApIHtcbiAgICAgICAgICAgIGlmKCBjc3ZUYWJsZVtpXS5sZW5ndGggPCA3ICkgY29udGludWU7IC8vIGJhZCByb3dcblxuICAgICAgICAgICAgdmFyIGRhdGUgPSBjc3ZUYWJsZVtpXVtoZWFkZXJzLmRhdGUuY29sXTtcblxuICAgICAgICAgICAgaWYoICFkYXRlICkgY29udGludWU7IC8vIGJhZCByb3dcblxuICAgICAgICAgICAgaWYoIGRhdGUuc3BsaXQoJy0nKS5sZW5ndGggPT0gMyApIGRhdGUgPSBkYXRlLnNwbGl0KFwiLVwiKS5zcGxpY2UoMCwyKS5qb2luKFwiLVwiKTtcbiAgICAgICAgICAgIGRhdGFbZGF0ZV0gPSB7fTtcblxuICAgICAgICAgICAgZm9yKCB2YXIga2V5IGluIGhlYWRlcnMgKSB7XG4gICAgICAgICAgICAgICAgaWYoIGtleSA9PSAnZGF0ZScgKSBjb250aW51ZTtcblxuICAgICAgICAgICAgICAgIGRhdGFbZGF0ZV1ba2V5XSA9IHBhcnNlRmxvYXQoY3N2VGFibGVbaV1baGVhZGVyc1trZXldLmNvbF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVQcm9ncmVzcyhldnQpIHtcbiAgICAvLyBldnQgaXMgYW4gUHJvZ3Jlc3NFdmVudC5cbiAgICBpZiAoZXZ0Lmxlbmd0aENvbXB1dGFibGUpIHtcbiAgICAgICAgdmFyIHBlcmNlbnRMb2FkZWQgPSBNYXRoLnJvdW5kKChldnQubG9hZGVkIC8gZXZ0LnRvdGFsKSAqIDEwMCk7XG4gICAgICAgIGVsZS5maW5kKCcucHJvZ3Jlc3MtYmFyJykuYXR0cignYXJpYS12YWx1ZW5vdycscGVyY2VudExvYWRlZCkud2lkdGgocGVyY2VudExvYWRlZCtcIiVcIik7XG4gICAgICAgIGVsZS5maW5kKCcuc3Itb25seScpLmh0bWwoTWF0aC5jZWlsKHBlcmNlbnRMb2FkZWQpKyclIENvbXBsZXRlJyk7XG4gICAgfVxufVxuXG4gIGZ1bmN0aW9uIGVycm9ySGFuZGxlcihldnQpIHtcbiAgICBzd2l0Y2goZXZ0LnRhcmdldC5lcnJvci5jb2RlKSB7XG4gICAgICBjYXNlIGV2dC50YXJnZXQuZXJyb3IuTk9UX0ZPVU5EX0VSUjpcbiAgICAgICAgc2V0RXJyb3IoJ0ZpbGUgTm90IEZvdW5kIScpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgZXZ0LnRhcmdldC5lcnJvci5OT1RfUkVBREFCTEVfRVJSOlxuICAgICAgICBzZXRFcnJvcignRmlsZSBpcyBub3QgcmVhZGFibGUnKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGV2dC50YXJnZXQuZXJyb3IuQUJPUlRfRVJSOlxuICAgICAgICBicmVhazsgLy8gbm9vcFxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgc2V0RXJyb3IoJ0FuIGVycm9yIG9jY3VycmVkIHJlYWRpbmcgdGhpcyBmaWxlLicpO1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBzZXRFcnJvcihtc2cpIHtcbiAgICAgIGVsZS5maW5kKCcuc3RhdHVzJykuaHRtbCgnPGRpdiBjbGFzcz1cImFsZXJ0IGFsZXJ0LWRhbmdlclwiPicrbXNnKyc8L2Rpdj4nKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgaW5pdCA6IGluaXQsXG4gICAgaW5pdEZyb21VcmwgOiBpbml0RnJvbVVybFxuICB9O1xuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgaW5pdCA6IGluaXRcbn07XG4iLCJ2YXIgY29uZmlnID0gcmVxdWlyZSgnLi4vY29uZmlnJyk7XG5cbi8vIG1ha2Ugc3VyZSBhbGwgdGhlIHdlYXRoZXIgaXMgc2V0LiAgIzEgdGhpbmcgcGVvcGxlIHdpbGwgbWVzcyB1cFxuZnVuY3Rpb24gY2hlY2sobW9kZWwpIHtcbiAgLy8gZmlyc3QgZ2V0IGN1cnJlbnQgbW9udGhzIHdlIGFyZSBnb2luZyB0byBydW4sXG4gIHZhciBzdGFydCA9ICQoXCIjaW5wdXQtbWFuYWdlLWRhdGVQbGFudGVkXCIpLnZhbCgpO1xuXG4gIHZhciBlbmQgPSAkKFwiI2lucHV0LW1hbmFnZS1kYXRlRmluYWxIYXJ2ZXN0XCIpLnZhbCgpLnNwbGl0KFwiLVwiKTtcbiAgdmFyIGVNb250aCA9IHBhcnNlSW50KGVuZFsxXSk7XG4gIHZhciBlWWVhciA9IHBhcnNlSW50KGVuZFswXSk7XG5cbiAgdmFyIGNEYXRlID0gbmV3IERhdGUoc3RhcnQpO1xuXG4gIC8vIG5vdyBzZWUgaWYgd2UgaGF2ZSBjdXN0b20gd2VhdGhlciBjb3ZlcmFnZVxuICB2YXIgaGFzQ292ZXJhZ2UgPSB0cnVlO1xuICB2YXIgY291bnQgPSAwO1xuICB3aGlsZSggY291bnQgPCAxMDAwMCApIHtcbiAgICAgIGlmKCAhbW9kZWwuY3VzdG9tX3dlYXRoZXIgKSB7XG4gICAgICAgICAgaGFzQ292ZXJhZ2UgPSBmYWxzZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgdmFyIG0gPSAoY0RhdGUuZ2V0TW9udGgoKSsxKSsnJztcbiAgICAgIHZhciB5ID0gY0RhdGUuZ2V0RnVsbFllYXIoKTtcbiAgICAgIGlmKCBtLmxlbmd0aCA9PSAxICkgbSA9ICcwJyttO1xuXG4gICAgICBpZiggY0RhdGUuZ2V0TW9udGgoKSsxID09IGVNb250aCAmJiB5ID09IGVZZWFyICkge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfSBlbHNlIGlmKCAhbW9kZWwuY3VzdG9tX3dlYXRoZXJbeSsnLScrbV0gKSB7XG4gICAgICAgICAgaGFzQ292ZXJhZ2UgPSBmYWxzZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgY0RhdGUuc2V0TW9udGgoY0RhdGUuZ2V0TW9udGgoKSsxKTtcbiAgICAgIGNvdW50Kys7XG4gIH1cblxuICBpZiggaGFzQ292ZXJhZ2UgKSByZXR1cm4gdHJ1ZTtcblxuICAvLyBpZiBub3QgbWFrZSBzdXJlIHdlIGhhdmUgYXZlcmFnZXMgc2VsZWN0ZWRcbiAgZm9yICggdmFyIGkgPSAwOyBpIDwgMTI7IGkrKykge1xuICAgIHZhciBtID0gKGkrMSkrJyc7XG4gICAgaWYoIG0ubGVuZ3RoID09IDEgKSBtID0gJzAnK207XG5cbiAgICAgIGZvciAoIHZhciBqID0gMTsgaiA8IGNvbmZpZy5pbnB1dHMud2VhdGhlci5sZW5ndGg7IGorKykge1xuICAgICAgICAgIHZhciBjID0gY29uZmlnLmlucHV0cy53ZWF0aGVyW2pdO1xuICAgICAgICAgIHZhciB2YWwgPSBwYXJzZUZsb2F0KCQoXCIjaW5wdXQtd2VhdGhlci1cIiArIGMgKyBcIi1cIiArIG0pLnZhbCgpKTtcbiAgICAgICAgICBpZiggIXZhbCAmJiB2YWwgIT09IDAgKSB7XG4gICAgICAgICAgICAgIGFsZXJ0KFwiTWlzc2luZyB3ZWF0aGVyIGRhdGE6IFwiK2MrXCIgZm9yIG1vbnRoIFwiK20rXCJcXG5cXG5cIitcbiAgICAgICAgICAgICAgICAgICAgXCJEaWQgeW91IHNlbGVjdCBhIGxvY2F0aW9uIChTZXR1cCkgYW5kL29yIGFyZSBhbGwgd2VhdGhlci9zb2lsIGZpZWxkcyBmaWxsZWQgb3V0P1wiKTtcbiAgICAgICAgICAgICAgJChcIiNydW5idG4sICNydW5idG4tc21cIikucmVtb3ZlQ2xhc3MoXCJkaXNhYmxlZFwiKS5odG1sKFwiPGkgY2xhc3M9J2ljb24tcGxheSc+PC9pPiBSdW5cIik7XG4gICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gc2V0KG1vZGVsLCBkYXRhKSB7XG4gIGlmKCAhbW9kZWwuY3VzdG9tX3dlYXRoZXIgKSBtb2RlbC5jdXN0b21fd2VhdGhlciA9IHt9O1xuXG4gIGlmKCBkYXRhICkge1xuICAgICAgZm9yKCB2YXIga2V5IGluIGRhdGEgKSB7XG5cbiAgICAgICAgICAvLyBjbGVhbiB1cCBkYXRlIGZvcm1hdFxuICAgICAgICAgIHZhciBkYXRlID0ga2V5LnJlcGxhY2UoL1teXFxkLV0vLCcnKTtcbiAgICAgICAgICB2YXIgcGFydHMgPSBkYXRlLnNwbGl0KCctJyk7XG5cbiAgICAgICAgICBpZiggcGFydHMubGVuZ3RoIDwgMiApIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGFsZXJ0KCdJbnZhbGlkIERhdGUgRm9ybWF0LiAgRGF0ZXMgc2hvdWxkIGJlIGluIFlZWVktTU0gZm9ybWF0Jyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICggcGFydHNbMV0ubGVuZ3RoICE9IDIgKSB7XG4gICAgICAgICAgICAgIGRhdGUgPSBwYXJ0c1swXStcIi0wXCIrcGFydHNbMV07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbW9kZWwuY3VzdG9tX3dlYXRoZXJbZGF0ZV0gPSBkYXRhW2tleV07XG4gICAgICB9XG4gIH1cblxuICAvLyBjcmVhdGUgYXJyYXkgc28gd2UgY2FuIHNvcnRcbiAgdmFyIGFyciA9IFtdO1xuICB2YXIgaGVhZGVycyA9IFsnZGF0ZSddO1xuICBmb3IoIHZhciBkYXRlIGluIG1vZGVsLmN1c3RvbV93ZWF0aGVyICkge1xuXG4gICAgICB2YXIgdCA9IFtkYXRlXTtcbiAgICAgIGZvciggdmFyIGtleSBpbiBtb2RlbC5jdXN0b21fd2VhdGhlcltkYXRlXSApIHtcbiAgICAgICAgICBpZigga2V5ID09ICducmVsJyApIGNvbnRpbnVlO1xuICAgICAgICAgIGlmKCBhcnIubGVuZ3RoID09PSAwICkgaGVhZGVycy5wdXNoKGtleSk7XG4gICAgICAgICAgdC5wdXNoKG1vZGVsLmN1c3RvbV93ZWF0aGVyW2RhdGVdW2tleV0pO1xuICAgICAgfVxuXG4gICAgICBhcnIucHVzaCh0KTtcbiAgfVxuXG4gIGlmKCBhcnIubGVuZ3RoID09PSAwICkge1xuICAgICAgJCgnI2N1c3RvbS13ZWF0aGVyLXBhbmVsJykuaHRtbChcIk5vIHdlYXRoZXIgZGF0YSBoYXMgYmVlbiB1cGxvYWRlZC5cIik7XG4gICAgICByZXR1cm47XG4gIH1cblxuICB2YXIgaHRtbCA9ICc8ZGl2IHN0eWxlPVwib3ZlcmZsb3c6YXV0bzttYXgtaGVpZ2h0OjYwMHB4XCI+PHRhYmxlIGNsYXNzPVwidGFibGUgdGFibGUtc3RyaXBlZFwiPjx0cj4nO1xuXG4gIGFyci5zb3J0KGZ1bmN0aW9uKGEsIGIpe1xuICAgICAgdmFyIGQxID0gbmV3IERhdGUoYVswXStcIi0wMVwiKS5nZXRUaW1lKCk7XG4gICAgICB2YXIgZDIgPSBuZXcgRGF0ZShiWzBdK1wiLTAxXCIpLmdldFRpbWUoKTtcblxuICAgICAgaWYoIGQxIDwgZDIgKSB7XG4gICAgICAgICAgcmV0dXJuIDE7XG4gICAgICB9IGVsc2UgaWYoIGQxID4gZDIgKSB7XG4gICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gMDtcbiAgfSk7XG5cbiAgZm9yKCB2YXIgaSA9IDA7IGkgPCBoZWFkZXJzLmxlbmd0aDsgaSsrICkge1xuICAgICAgaHRtbCArPSAnPHRoPicraGVhZGVyc1tpXSsnPC90aD4nO1xuICB9XG4gIGh0bWwgKz0gJzwvdHI+JztcblxuICBmb3IoIHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKyApIHtcbiAgICAgIGh0bWwgKz0gJzx0cj48dGQ+JythcnJbaV0uam9pbignPC90ZD48dGQ+JykrJzwvdGQ+PC90cj4nO1xuICB9XG5cbiAgJCgnI2N1c3RvbS13ZWF0aGVyLXBhbmVsJykuaHRtbChodG1sKyc8L3RhYmxlPjwvZGl2PjxkaXYgaWQ9XCJjdXN0b20td2VhdGhlci1jaGFydFwiPjwvZGl2PicpO1xuXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgIHdlYXRoZXJDdXN0b21DaGFydCA9IGNoYXJ0cy5jcmVhdGVXZWF0aGVyQ2hhcnQoJCgnI2N1c3RvbS13ZWF0aGVyLWNoYXJ0JylbMF0sIG1vZGVsLmN1c3RvbV93ZWF0aGVyKTtcbiAgfSwgMTAwMCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBzZXQgOiBzZXQsXG4gIGNoZWNrIDogY2hlY2tcbn07XG4iXX0=
