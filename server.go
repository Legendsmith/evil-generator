// Quick and dirty webserver for offline development/testing.

package main

import (
	"flag"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"path"
	"regexp"
)

func main() {
	var (
		portNumber int
	)

	cwd, err := os.Getwd()
	if err != nil {
		fmt.Println("Getwd failure: %v", err)
		os.Exit(1)
	}

	flag.IntVar(&portNumber, "p", 8888, "Listen port number")
	flag.Parse()

	fmt.Printf("Listen 0.0.0.0:%d...\n", portNumber)
	port := ":" + fmt.Sprint(portNumber)

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		url := r.URL

		matched, err := regexp.Match("/$", []byte(url.Path))
		if err != nil {
			fmt.Println("Path find error")
			return
		}

		if matched {
			url.Path += "index.html"
		}

		requestPath := cwd + url.Path

		// Mimick Python
		fmt.Printf("%v\n", requestPath)
		_, statErr := os.Stat(requestPath)
		if statErr != nil {
			w.WriteHeader(404)
			w.Header().Set("Content-Type", "text/plain")
			w.Write([]byte(fmt.Sprintf("%v\n", statErr)))
			return
		}

		// Bare minimum
		ext := path.Ext(requestPath)
		switch ext {
		case ".txt":
			w.Header().Set("Content-Type", "text/plain")

		case ".html":
			w.Header().Set("Content-Type", "text/html")

		case ".gif":
			w.Header().Set("Content-Type", "image/gif")

		case ".jpg":
			w.Header().Set("Content-Type", "image/jpeg")
		case ".png":
			w.Header().Set("Content-Type", "image/png")

		case ".js":
			// text/javascript?
			w.Header().Set("Content-Type", "application/javascript")

		// json
		case ".json":
			w.Header().Set("Content-Type", "application/json")

		// css
		case ".css":
			w.Header().Set("Content-Type", "text/css")

		// Default to download.
		default:
			w.Header().Set("Content-Type", "application/octet-stream")
		}

		// OK
		w.WriteHeader(200)

		buf, _ := ioutil.ReadFile(requestPath)
		w.Write(buf)
	})
	http.ListenAndServe(port, nil)
}
