M8 D2 HOMEWORK
Using a TDD approach, starting from today’s project, build a simple service that allows you to build your custom store.

Start from today’s project: fork the repo and create a develop branch
Write these tests and their implementation:
When retrieving the /products/:id endpoint:
expect requests to be 404 with a non-existing id
expect requests to return the correct product with a valid id
When deleting the /products/:id endpoint:
expect successful 204 response code
expect 404 with a non-existing id
When updating a /product/:id endpoint with new data:
expect requests to be accepted.
expect 404 with a non-existing id
Expect the response.body.name to be changed
Expect the typeof name in response.body to be “string”
When tests are in place, create a Continuous Delivery pipeline on Heroku for this project
deploy the current master in production
Activate automatic builds for the development app from the develop branch
Don’t forget to add all TEST, REVIEW, STAGING and PRODUCTION environment vars.
Remember to keep three separate apps:

Review automatically deployed from develop branch.
Staging automatically deployed from master branch.
Production deployed when promoted from staging.
We’ll promote your staging app to production together during debrief.

Good luck! :D

