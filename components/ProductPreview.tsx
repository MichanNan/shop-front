"use client";

import { Product } from "@/types";
import React, { Fragment, useContext } from "react";

import Gallery from "./Gallery";
import { Dialog, Transition } from "@headlessui/react";

import IconButton from "./IconButton";
import { X } from "lucide-react";
import { previewContext } from "@/hooks/usePreview";

interface ProductPreviewProps {
  item: Product | undefined;
}
const ProductPreview: React.FC<ProductPreviewProps> = ({ item }) => {
  const previewCtx = useContext(previewContext);
  console.log(previewCtx.isOpen);
  return (
    <Transition show={previewCtx.isOpen} appear as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={previewCtx.onClose}>
        <div className="fixed inset-0 bg-black bg-opacity-50" />
        <div className="fixed inset-0 overflow-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-3xl overflow-hidden rounded-lg text-left align-middle">
                <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                  <div className="absolute right-4 top-4">
                    <IconButton
                      onClick={previewCtx.onClose}
                      icon={<X size={15} />}
                    />
                  </div>
                  <Gallery product={item} isPreview />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ProductPreview;