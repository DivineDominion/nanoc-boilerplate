# What's this

This is my personal boilerplate setup for nanoc websites.

*   [nanoc3](nanoc.stoneship.org), static website generator
*   [html5boilerplate](http://html5boilerplate.com/)

# Deployment

I assume you're public html folder is called `htdocs/` and you can create new folders below your domains folder but outside `htdocs/`.

*   initialize bare production git repository on the server:

        $ git init --bare ~/doms/example.com/git
*   you'll want automatic updates when you push to the server.  Use git's own
    `post-receive` hook:

        # add to ~/doms/example.com/git/hooks/post-receive
        echo "Updating website ..."
        cd /the/full/path/to/doms/example.com/htdocs || exit
        unset GIT_DIR
        git pull origin 
        echo "Update complete."

    Make it executable:

        $ chmod +x post-receive

*   initialize git repository in `htdocs/`.  This will point to the bare
    repository on the server and check out the current version:
    
        # given you're in ~/doms/example.com/htdocs
        $ git init
        $ git remote add origin ../git
        
        # setup branch to pull from:
        $ git config branch.master.remote origin
        $ git config branch.master.merge refs/heads/deploy
*   setup production server locally:

        $ git remote add production ssh://user@example.com/~/doms/example.com/git/
        $ git remote show production
*   commit changes locally and put them on the server:
        
        $ git commit
        $ git push production`
