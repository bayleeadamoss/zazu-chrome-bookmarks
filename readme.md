## Chrome Bookmarks

Chrome bookmark searcher for Zazu.

## Installing

Add the package to your plugins array in `./zazurc.js`.

~~~ javascript
'tinytacoteam/zazu-chrome-bookmarks',
~~~

By default we look for your default profile located at:

~~~
/Users/bschmeisser/Library/Application Support/Google/Chrome/Default/Bookmarks
~~~

To overwrite it, set the `file` variable:

~~~ javascript
{
  name: 'tinytacoteam/zazu-chrome-bookmarks',
  variables: {
    file: '~/Library/Application Support/Google/Chrome/Profile 1/Bookmarks',
  },
}
~~~
