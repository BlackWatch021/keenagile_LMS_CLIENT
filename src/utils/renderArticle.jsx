import React from "react";
import parse from "html-react-parser"; // Import the parser
import { File, Files } from "lucide-react";
import { Highlight, themes } from "prism-react-renderer";
// import theme from "prism-react-renderer/themes/github";

// Render function for custom tag handling
const renderContent = (htmlString) => {
  return parse(htmlString, {
    replace: (domNode) => {
      // console.log({ domNode });
      // console.log({ name: domNode.name, attributes: domNode.attribs });

      if (domNode.name === "pre") {
        const copyToClipBoard = (input, buttonId) => {
          navigator.clipboard.writeText(input).then(() => {
            const button = document.getElementById(buttonId);
            if (button) {
              const icon = button.querySelector(".copy-icon");
              const feedback = button.querySelector(".copy-feedback");

              if (icon) icon.style.display = "none"; // Hide the icon
              if (feedback) {
                feedback.innerText = "Copied!";
                feedback.style.display = "inline"; // Show the feedback text
              }

              setTimeout(() => {
                if (icon) icon.style.display = "inline"; // Show the icon again
                if (feedback) feedback.style.display = "none"; // Hide the feedback text
              }, 1000); // 1 second delay
            }
          });
        };

        const codeContent = domNode.children[0].children[0].data;
        const buttonId = `copy-btn-${Math.random().toString(36).substr(2, 9)}`;

        return (
          <Highlight
            theme={themes.shadesOfPurple}
            code={codeContent}
            language="tsx"
          >
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
              <pre className={`${className} relative`} style={style}>
                {tokens.map((line, i) => (
                  <div key={i} {...getLineProps({ line })}>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </div>
                ))}
                <button
                  id={buttonId}
                  className="copy_code"
                  onClick={() => copyToClipBoard(codeContent, buttonId)}
                >
                  <Files
                    size={22}
                    className="text-green-500 drop-shadow-sm copy-icon"
                  />
                  <span
                    className="copy-feedback"
                    style={{ display: "none" }}
                  ></span>
                </button>
              </pre>
            )}
          </Highlight>
        );
      }

      if (domNode.name === "oembed") {
        const videoUrl = domNode.attribs.url;

        // Check if it's a YouTube URL and convert it to the embed format
        const youtubeEmbedUrl = videoUrl.includes("youtube.com")
          ? videoUrl.replace("watch?v=", "embed/")
          : videoUrl;

        return (
          <iframe
            style={{}}
            src={youtubeEmbedUrl}
            // width="90%"
            height="500"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        );
      }

      //   if (domNode.name === "blockquote") {
      //     // console.log({ name: domNode.name, domNode });
      //     return (
      //       <blockquote className="my-custom-blockquote-class">
      //         {domNode.children.map((el, index) => (
      //           <p key={index}>{el.children[0].data}</p>
      //         ))}
      //       </blockquote>
      //     );
      //   }

      // You can add more custom element handlers as needed
      if (domNode.name === "video") {
        // console.log(domNode.name, domNode.attribs.width);
        const { src, type } = domNode.children[1].attribs;
        return (
          <video muted controls className="responsive-video" style={{}}>
            <source src={src} type={type} />
          </video>
        );
      }

      //FOR IMAGES and FOR THEIR RIGHT,LEFT,CENTER ALIGNMENT

      if (domNode.name === "figure") {
        // console.log("from figure if statement", domNode.name, domNode);
        if (domNode.attribs.class.includes("image")) {
          const { src, alt, srcset, width } = domNode.children[0].attribs;
          // CHECKING FOR IMAGE ALIGNMENT
          const align = domNode.attribs.class.includes("left")
            ? { marginRight: "auto" }
            : domNode.attribs.class.includes("right")
            ? { marginLeft: "auto" }
            : { marginRight: "auto", marginLeft: "auto" };
          // console.log({ align });
          // console.log({ width, src });
          const checkWidth = "500px" || "90%";
          return (
            // <div style={{ margin: "5px 0px" }}>
            <>
              <img src={src} alt={alt} style={align} />
              {domNode.children[1]?.name === "figcaption" ? (
                <figcaption style={align}>
                  {domNode.children[1].children[0].data}
                </figcaption>
              ) : (
                <></>
              )}
            </>
            // </div>
          );
        }
      }
      //IN CASE IMAGE IS WRAPPED INSIDE <p> TAG.
      if (domNode.name === "p" && domNode.children[0].name === "img") {
        // console.log("from p if statement for img tag", domNode.name, domNode);
        const { src, alt, srcset, width } = domNode.children[0].attribs;
        return (
          <>
            <img
              src={src}
              alt={alt}
              style={{ marginLeft: "auto", marginRight: "auto" }}
            />
          </>
        );
      }

      //TABEL RIGHT,LEFT,CENTER ALIGNMENT
      // if (
      //   domNode.name === "figure" &&
      //   domNode.attribs.class.includes("table")
      // ) {
      //   const align = domNode.attribs.style.includes("left")
      //     ? { marginRight: "auto" }
      //     : domNode.attribs.style.includes("right")
      //     ? { marginLeft: "auto" }
      //     : { marginRight: "auto", marginLeft: "auto" };
      //   console.log({ name: domNode.name, domNode }, align);

      //   return <table style={align}></table>;
      // }

      //MANAGING VIDEOS AND IFRAMES INSIDE TABLE
      if (domNode.name === "td") {
        //check for alignment

        const align = domNode.attribs.style?.includes("center")
          ? { marginRight: "auto", marginLeft: "auto" }
          : domNode.attribs.style?.includes("right")
          ? { marginLeft: "auto" }
          : { marginRight: "auto" };

        // Iterate over the children of td
        const videoElement = domNode.children?.find((el) =>
          el.attribs?.class?.includes("video")
        );

        // If a video element is found, extract the src and type from the source tag
        if (videoElement) {
          const { src, type } = videoElement.children[1].attribs;

          // Return the video element
          return (
            <td>
              <video muted controls className="responsive-video" style={align}>
                <source src={src} type={type} />
              </video>
            </td>
          );
        }

        // Check if it's an oembed element (for YouTube or similar)
        const oembedElement = domNode?.children?.[0]?.children?.[0];
        if (oembedElement?.name === "oembed") {
          const videoUrl = oembedElement.attribs.url;

          // Check if it's a YouTube URL and convert it to the embed format
          const youtubeEmbedUrl = videoUrl.includes("youtube.com")
            ? videoUrl.replace("watch?v=", "embed/")
            : videoUrl;

          return (
            <td>
              <iframe
                src={youtubeEmbedUrl}
                style={align}
                height="500"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </td>
          );
        }

        // If neither video nor oembed, return nothing
      }
    },
  });
};

export default renderContent;
