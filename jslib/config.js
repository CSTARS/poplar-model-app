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
