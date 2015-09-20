Issues = new Meteor.Collection("issues");

if (Meteor.isClient) {

Template.IssueOverview.helpers({
    criticalIssueNumber: function(){
        return Issues.find({_issuePriority: "1"}).count();
    },
    mediumIssueNumber: function(){
        return Issues.find({_issuePriority: "2"}).count();
    },
    normalIssueNumber: function(){
        return Issues.find({_issuePriority: "3"}).count();
    },
    totalIssueNumber: function(){
        return Issues.find({_isDone: false}).count();
    }
}); 

Template.NewIssueForm.events({
   "submit form": function(event, template){
       event.preventDefault();
       var title = template.find("[name=IssueTitle]").value;
       var body = template.find("[name=IssueBody]").value;
       var priority = template.find("[name=IssuePriority]").value;
           Issues.insert({
           _createdAt: new Date,
           _issueTitle: title,
           _issueBody: body,
           _issuePriority: priority,
           _isDone: false,
           _resolutionText: false
       });
        var form = template.find("form");
        form.reset();
   } 
});

Template.Issues.helpers({
    issueList: function(){
        return Issues.find({}, {
            sort: {_issuePriority: 1 }
        });
    }
});

Template.IndividualIssue.helpers({
    issueSeverityClass: function(){
        switch(this._issuePriority){
            case "999":
                return "panel-default";
                break;
            case "1":
                return "panel-danger";
                break;
            case "2":
                return "panel-warning";
                break;
            case "3":
                return "panel-success";
                break;
        } 
    },
    
    issueTitle: function(){
        return this._issueTitle;
    },
    
    issueBody: function(){
        return this._issueBody;
    },
    
    issueSeverity: function(){
        switch(this._issuePriority){
            case "1":
                return "Critical";
                break;
            case "2":
                return "Medium";
                break;
            case "3":
                return "Normal";
                break;
            case "999":
                return "Resolved";
                break;
    }},
    
    issueDate: function() {
        return this._createdAt;
    },
    
    resolutionStatus: function(){
        switch(this._isDone){
            case false:
                return "No";
                break;
            case true:
                return "Yes";
                break;
        }
    },
    
    resolutionText: function(){
       var fullText = this._resolutionText;
        return this._resolutionText ? fullText : "Yet to be resolved";
        }
});

Template.IndividualIssue.events({
    "click [name=ResolveButton]": function(event, template){
        event.preventDefault();
        var id = this._id;
        var resolution = prompt("Please enter resolution notes");
        
        Issues.update({_id:id},{
         $set: {
             _isDone: true,
             _issuePriority: "999",
             _resolutionText: resolution,
             }   
        })
    },
});
    
}

if (Meteor.isServer) {

}
