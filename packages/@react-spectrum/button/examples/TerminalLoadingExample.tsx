/**
 * Terminal Loading Feature Examples
 * 
 * This file demonstrates various ways to use the terminal loading
 * animation with React Spectrum Button components.
 */

import React, {useState} from 'react';
import {Button} from '@react-spectrum/button';
import {Flex} from '@react-spectrum/layout';
import {Heading, Text} from '@react-spectrum/text';
import {View} from '@react-spectrum/view';

export function TerminalLoadingExample() {
  const [basicLoading, setBasicLoading] = useState(false);
  const [customTextLoading, setCustomTextLoading] = useState(false);
  const [fastLoading, setFastLoading] = useState(false);
  const [customDotsLoading, setCustomDotsLoading] = useState(false);
  const [allCustomLoading, setAllCustomLoading] = useState(false);

  const simulateAsync = (setter: (value: boolean) => void, duration = 3000) => {
    setter(true);
    setTimeout(() => setter(false), duration);
  };

  return (
    <View padding="size-400">
      <Heading level={2} marginBottom="size-300">
        Terminal Loading Examples
      </Heading>

      {/* Basic Example */}
      <View marginBottom="size-400">
        <Heading level={3} marginBottom="size-200">
          Basic Terminal Loading
        </Heading>
        <Text marginBottom="size-200">
          Default terminal loading with "Loading" text and 4 dots
        </Text>
        <Button 
          variant="primary"
          isPending={basicLoading}
          loadingStyle="terminal"
          onPress={() => simulateAsync(setBasicLoading)}
        >
          Save Changes
        </Button>
      </View>

      {/* Custom Text */}
      <View marginBottom="size-400">
        <Heading level={3} marginBottom="size-200">
          Custom Loading Text
        </Heading>
        <Text marginBottom="size-200">
          Custom text with default speed and dots
        </Text>
        <Button 
          variant="accent"
          isPending={customTextLoading}
          loadingStyle="terminal"
          loadingText="Processing"
          onPress={() => simulateAsync(setCustomTextLoading)}
        >
          Process Data
        </Button>
      </View>

      {/* Fast Animation */}
      <View marginBottom="size-400">
        <Heading level={3} marginBottom="size-200">
          Fast Animation
        </Heading>
        <Text marginBottom="size-200">
          Faster animation speed (250ms per frame)
        </Text>
        <Button 
          variant="secondary"
          isPending={fastLoading}
          loadingStyle="terminal"
          loadingText="Uploading"
          loadingSpeed={250}
          onPress={() => simulateAsync(setFastLoading)}
        >
          Upload File
        </Button>
      </View>

      {/* Custom Dots */}
      <View marginBottom="size-400">
        <Heading level={3} marginBottom="size-200">
          Custom Dot Count
        </Heading>
        <Text marginBottom="size-200">
          Only 3 dots maximum for shorter animation
        </Text>
        <Button 
          variant="negative"
          isPending={customDotsLoading}
          loadingStyle="terminal"
          loadingText="Deleting"
          loadingDots={3}
          onPress={() => simulateAsync(setCustomDotsLoading)}
        >
          Delete Item
        </Button>
      </View>

      {/* Full Customization */}
      <View marginBottom="size-400">
        <Heading level={3} marginBottom="size-200">
          Full Customization
        </Heading>
        <Text marginBottom="size-200">
          Custom text, speed (400ms), and 5 dots
        </Text>
        <Button 
          variant="primary"
          isPending={allCustomLoading}
          loadingStyle="terminal"
          loadingText="Deploying"
          loadingSpeed={400}
          loadingDots={5}
          onPress={() => simulateAsync(setAllCustomLoading, 5000)}
        >
          Deploy Application
        </Button>
      </View>

      {/* Comparison */}
      <View marginBottom="size-400">
        <Heading level={3} marginBottom="size-200">
          Spinner vs Terminal Comparison
        </Heading>
        <Text marginBottom="size-200">
          Side-by-side comparison of loading styles
        </Text>
        <Flex gap="size-200">
          <Button 
            variant="primary"
            isPending={basicLoading}
            loadingStyle="spinner"
            onPress={() => simulateAsync(setBasicLoading)}
          >
            Spinner Loading
          </Button>
          <Button 
            variant="primary"
            isPending={basicLoading}
            loadingStyle="terminal"
            onPress={() => simulateAsync(setBasicLoading)}
          >
            Terminal Loading
          </Button>
        </Flex>
      </View>

      {/* Internationalization Examples */}
      <View marginBottom="size-400">
        <Heading level={3} marginBottom="size-200">
          Internationalization
        </Heading>
        <Text marginBottom="size-200">
          Terminal loading in different languages
        </Text>
        <Flex gap="size-200" wrap>
          <Button 
            variant="primary"
            isPending={basicLoading}
            loadingStyle="terminal"
            loadingText="Cargando"
            onPress={() => simulateAsync(setBasicLoading)}
          >
            Guardar (Spanish)
          </Button>
          <Button 
            variant="primary"
            isPending={basicLoading}
            loadingStyle="terminal"
            loadingText="Chargement"
            onPress={() => simulateAsync(setBasicLoading)}
          >
            Sauvegarder (French)
          </Button>
          <Button 
            variant="primary"
            isPending={basicLoading}
            loadingStyle="terminal"
            loadingText="読み込み中"
            onPress={() => simulateAsync(setBasicLoading)}
          >
            保存 (Japanese)
          </Button>
        </Flex>
      </View>

      {/* Real-world Use Cases */}
      <View>
        <Heading level={3} marginBottom="size-200">
          Real-world Use Cases
        </Heading>
        <Text marginBottom="size-200">
          Common scenarios where terminal loading works well
        </Text>
        <Flex direction="column" gap="size-200">
          <Flex gap="size-200">
            <Button 
              variant="accent"
              isPending={false}
              loadingStyle="terminal"
              loadingText="Compiling"
            >
              Build Project
            </Button>
            <Button 
              variant="primary"
              isPending={false}
              loadingStyle="terminal"
              loadingText="Installing"
              loadingDots={3}
            >
              Install Dependencies
            </Button>
            <Button 
              variant="secondary"
              isPending={false}
              loadingStyle="terminal"
              loadingText="Syncing"
              loadingSpeed={600}
            >
              Sync Database
            </Button>
          </Flex>
          <Flex gap="size-200">
            <Button 
              variant="negative"
              isPending={false}
              loadingStyle="terminal"
              loadingText="Cleaning"
              loadingSpeed={300}
            >
              Clean Cache
            </Button>
            <Button 
              variant="primary"
              isPending={false}
              loadingStyle="terminal"
              loadingText="Connecting"
              loadingDots={5}
            >
              Connect to Server
            </Button>
            <Button 
              variant="accent"
              isPending={false}
              loadingStyle="terminal"
              loadingText="Analyzing"
            >
              Run Analysis
            </Button>
          </Flex>
        </Flex>
      </View>
    </View>
  );
}

export default TerminalLoadingExample;