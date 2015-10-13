module.exports = {
  inputs : {
    weather : ['month','tmin','tmax','tdmean','ppt','rad','daylight']
  },
  outputs : ['VPD','fVPD','fT','fFrost','PAR','Intcptn','ASW','CumIrrig',
             'Irrig','StandAge','LAI','CanCond','Transp','ETr','Kc','fSW','fAge',
             'PhysMod','pR','pS','litterfall','xPP','NPP','WF','WR','WS','W'],
  debug : false,
  devmode : false,
  // these variables, when run with multiple different time steps, will draw
  // aggregate values to greatest step.
  // Ex: 1 and 30 days given.  Will chart every 30 days with value of every 30th
  // day multiplied by 30 for the daily step run.
  spread : ['xPP', 'NPP', 'PAR','Irrig', 'Transp','ETr','litterfall'],
};
