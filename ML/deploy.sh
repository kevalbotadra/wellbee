#!/usr/bin/env bash
gcloud builds submit --tag gcr.io/wellbee-312321/wellbee-main && gcloud run deploy --image gcr.io/wellbee-312321/wellbee-main