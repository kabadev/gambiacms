"use client";
import React from "react";
import { SpecialZoomLevel, Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { toolbarPlugin } from "@react-pdf-viewer/toolbar";
import "@react-pdf-viewer/toolbar/lib/styles/index.css";
import { Button } from "./ui/button";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  ZoomInIcon,
  ZoomOutIcon,
} from "lucide-react";
import Spinner from "./Spinner";
import ErrorMessage from "./ErrorMessage";
// import { downloadPdf } from "@/util/help";

const PdfResder = ({
  source,
  fileName,
}: {
  source: string;
  fileName: string;
}) => {
  const toolbarPluginInstance = toolbarPlugin();
  const { Toolbar } = toolbarPluginInstance;

  const downloadPdfHandler = async () => {
    // downloadPdf(source, fileName);
  };

  return (
    <Worker
      workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
    >
      <div className="flex flex-col h-full">
        <div className="overflow-hidden">
          <Viewer
            fileUrl={source}
            defaultScale={SpecialZoomLevel.ActualSize}
            plugins={[toolbarPluginInstance]}
            renderLoader={RenderSpinner}
            renderError={RenderError}
          />
        </div>
        <Toolbar>
          {({
            CurrentScale,
            GoToNextPage,
            GoToPreviousPage,
            NumberOfPages,
            ZoomIn,
            ZoomOut,
            CurrentPageLabel,
          }) => (
            <div className="flex w-full items-start justify-between p-4 transition duration-300 border-t border-base-200 dark:border-invert-700">
              <div className="flex items-center gap-3 max-md:hidden ">
                <GoToPreviousPage>
                  {(props) => (
                    <Button
                      className="grid flex-shrink-0 transition duration-300 rounded-md focus:ring-2 ring-primary-400 place-items-center focus:outline-none hover:bg-base-100 dark:hover:bg-invert-800"
                      onClick={props.onClick}
                      disabled={props.isDisabled}
                    >
                      <ChevronUpIcon className="w-5 h-5" />
                    </Button>
                  )}
                </GoToPreviousPage>
                <div className="items-center flex gap-2 text-base-600 dark:text-invertz-400">
                  <CurrentPageLabel /> <span>/</span>
                  <div className="grid bg-background flex-shrink-0 transition duration-300 rounded-md focus:ring-2 ring-primary-400 place-items-center focus:outline-none hover:bg-base-100 dark:hover:bg-invert-800">
                    <NumberOfPages />
                  </div>
                </div>
                <GoToNextPage>
                  {(props) => (
                    <Button
                      className="grid flex-shrink-0 transition duration-300 rounded-md focus:ring-2 ring-primary-400 place-items-center focus:outline-none hover:bg-base-100 dark:hover:bg-invert-800"
                      onClick={props.onClick}
                      disabled={props.isDisabled}
                    >
                      <ChevronDownIcon className="w-5 h-5" />
                    </Button>
                  )}
                </GoToNextPage>
              </div>
              <Button onClick={downloadPdfHandler} className="self-center">
                Download
              </Button>
              <div className="flex items-center">
                <ZoomOut>
                  {(props) => (
                    <Button
                      onClick={props.onClick}
                      className="grid flex-shrink-0 transition duration-300 rounded-md focus:ring-2 ring-primary-400 place-items-center focus:outline-none hover:bg-base-100 dark:hover:bg-invert-800"
                    >
                      <ZoomOutIcon className="w-5 h-5" />
                    </Button>
                  )}
                </ZoomOut>
                <div className="text-center w-14 text-base-600 dark:text-invert-400">
                  <CurrentScale>
                    {(props) => (
                      <span>{`${Math.round(props.scale * 100)}%`}</span>
                    )}
                  </CurrentScale>
                </div>
                <ZoomIn>
                  {(props) => (
                    <Button
                      onClick={props.onClick}
                      className="grid flex-shrink-0 transition duration-300 rounded-md focus:ring-2 ring-primary-400 place-items-center focus:outline-none hover:bg-base-100 dark:hover:bg-invert-800"
                    >
                      <ZoomInIcon className="w-5 h-5 " />
                    </Button>
                  )}
                </ZoomIn>
              </div>
            </div>
          )}
        </Toolbar>
      </div>
    </Worker>
  );
};

function RenderSpinner() {
  return <Spinner className="w-8 h-8 text-primary-600 dark:text-primary-500" />;
}

function RenderError(error: any) {
  let message = "";
  switch (error.name) {
    case "InvalidPDFException":
      message = "The document is invalid or corrupted";
      break;
    case "MissingPDFException":
      message = "The document is missing";
      break;
    case "UnexpectedResponseException":
      message = "Unexpected server response";
      break;
    default:
      message = "Cannot load the document";
  }

  return <ErrorMessage title={error.name} text={message} />;
}

export default PdfResder;
