Product Issues/Improvements: 
- There is no option in the front end for the user to create/edit or delete the list
- The information icon next to a task takes the user back to the root
- The user is able to create a task with an empty space, there should be input validation here
- There is no maximum number of characters allowed for creating a task, so the text overflows and the user has to scroll the width to be able to delete it. This can be improved by truncating the text and implementing a max character amount with input validation
- The tasks appear in order of creation at the moment, this can be improved by giving the user the ability to rearrange by drag and drop
- More user feedback will improve the app, such as success/error messages when creating/deleting a task/list. Or to ask for confirmation of user's intention before deleting a list
- Once the user ticks the checkbox next to a task it remains on the list in position. This can be improved by either moving it to the bottom of the list, and/or striking through the text. Also an archive functionality can be implemented.
- Add new task functionality is at the bottom of the list, so as the list grows the user will need to scroll down to interact with this. This can be improved by adding a button to allow the user to create a new task or bring the add new task functionality to the top of the list.


Code Issues seen when testing:
- no unit tests
- Backend returns a 500 for input errors instead of 400
- html is returned instead of a json when an error occurs
- Test "exports an Express app" found in "api.test.js" is checking whether the type of api module is a function. This test is not checking what the title says. Proving it is a function does not assert that it is an express app
- Api docs endpoint does not show the swagger pages, which would be very useful for testing
- create new list does not return a 201 to the user, instead returns a 200
- The properties dueAt and Url are being used when creating a task, however this info is not displayed to the user in the fe
- data.json is overwritten every time a change occurs


