# accord.ion

Ion is an simple async data driven testing tool built on mocha and chai.

**Purpose**: Test Node.js promises with less code!

Write tests like this...

```
test(getUserAsync, () => {
  await given({ id: 'user-id' }).expect({  });
});
```

Inspired by [sazerac](https://github.com/sazeracjs/sazerac).
