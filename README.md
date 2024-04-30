# Gigapay API Documentation

Based on [slate docs](https://github.com/slatedocs/slate).

### Running the development server

```
$ docker run --rm --name slate -p 4567:4567 -v $(pwd)/source:/srv/slate/source slatedocs/slate serve
```

### Deploying

```
$ docker run --rm --name slate -v $(pwd)/build:/srv/slate/build -v $(pwd)/source:/srv/slate/source slatedocs/slate build
$ ./deploy.sh --push-only
```
