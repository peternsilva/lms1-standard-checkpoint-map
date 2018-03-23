const express = require('express')
const router = express.Router()
const knex = require('../knex')

// List all checkpoints and related standards
router.get('/cohort/:cohortId', (req, res, next) => {

  // Defense
  if( parseInt(req.params.cohortId) != req.params.cohortId ) {
    next()
  }

  knex
  .select({
    'unitId': 'units.id',
    'unitPosition': 'units.position',
    'unitTitle': 'units.title',
    'contentFileId': 'content_files.id',
    'standardId': 'standards.id',
    'standardDescription': 'standards.description'
  })
  .distinct()
  .from('units')
  .innerJoin('unit_files', 'units.id', 'unit_files.unit_id')
  .innerJoin('content_files', 'unit_files.content_file_id', 'content_files.id')
  .innerJoin('content_file_challenges', 'content_files.id', 'content_file_challenges.content_file_id')
  .innerJoin('challenges', 'content_file_challenges.challenge_id', 'challenges.id')
  .innerJoin('challenge_standards', 'challenges.id', 'challenge_standards.challenge_id')
  .innerJoin('standards', 'challenge_standards.standard_id', 'standards.id')
  .where({
    'units.cohort_id': req.params.cohortId,
    'unit_files.unit_file_type': 'Checkpoint'
  })
  .orderBy('units.position', 'asc')
  .then((result) => {

    // Defense
    if( result.length < 1 || result === undefined ) {
      next()
    }

    res.status(200).send(result)
  })
  .catch((err) => {
    next(err)
  })

})

// Return the URL to the checkpoint tied to a specific standardId and cohortId
router.get('/cohort/:cohortId/standard/:standardId', function(req, res, next) {

  // Defense
  if(
    parseInt(req.params.cohortId) != req.params.cohortId ||
    parseInt(req.params.standardId) != req.params.standardId
  ) {
    next()
  }

  knex
  .select({
    'unitId': 'units.id',
    'contentFileId': 'content_files.id'
  })
  .distinct()
  .from('units')
  .innerJoin('unit_files', 'units.id', 'unit_files.unit_id')
  .innerJoin('content_files', 'unit_files.content_file_id', 'content_files.id')
  .innerJoin('content_file_challenges', 'content_files.id', 'content_file_challenges.content_file_id')
  .innerJoin('challenges', 'content_file_challenges.challenge_id', 'challenges.id')
  .innerJoin('challenge_standards', 'challenges.id', 'challenge_standards.challenge_id')
  .innerJoin('standards', 'challenge_standards.standard_id', 'standards.id')
  .where({
    'units.cohort_id': req.params.cohortId,
    'unit_files.unit_file_type': 'Checkpoint',
    'standards.id': req.params.standardId
  })
  .limit(1)
  .then((result) => {

    // Defense
    if(
        result.length < 1 ||
        typeof result[0] !== 'object' ||
        !result[0].hasOwnProperty('unitId') ||
        !result[0].hasOwnProperty('contentFileId')
    ) {
      next()
    }

    let link = `https://learn.galvanize.com/cohorts/${req.params.cohortId}/units/${result[0].unitId}/content_files/${result[0].contentFileId}`
    res.status(200).send({link})
  })
  .catch((err) => {
    next(err)
  })

})

module.exports = router
